/* Bannière de consentement — pilote Google Tag Manager via Consent Mode v2.
 *
 * L'état par défaut « denied » est posé dans _includes/gtm.html, AVANT le
 * chargement de gtm.js. Ce fichier ne fait qu'une chose : passer à « granted »
 * quand le visiteur accepte, et rendre un refus réellement effectif.
 *
 * Un refus ne déclenche aucun appel : l'état reste celui posé par défaut.
 */
(function () {
    var STORAGE_KEY = 'pep-consent';

    var GRANTED = {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted'
    };

    var DENIED = {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied'
    };

    var banner = document.getElementById('banniere-cookies');
    var scrim = document.getElementById('fond-banniere-cookies');
    var accept = document.getElementById('btn-accepter-cookies');
    var refuse = document.getElementById('btn-refuser-cookies');

    if (!banner || !accept || !refuse) return;

    function read() {
        try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function write(value) {
        try { window.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* mode privé strict */ }
    }

    // Les clés `cookies-acceptés` / `cookies-refusés` ont été posées par une
    // bannière dont le refus n'avait aucun effet, et les finalités ont changé
    // depuis (ajout du conteneur GTM). Ce consentement n'est pas réutilisable :
    // on l'efface et on redemande.
    try {
        if (localStorage.getItem('cookies-acceptés') || localStorage.getItem('cookies-refusés')) {
            localStorage.removeItem('cookies-acceptés');
            localStorage.removeItem('cookies-refusés');
        }
    } catch (e) {}

    function show() {
        banner.classList.add('actif');
        if (scrim) scrim.classList.add('actif');
        accept.focus();
    }

    function hide() {
        banner.classList.remove('actif');
        if (scrim) scrim.classList.remove('actif');
    }

    function updateConsent(state) {
        if (typeof window.gtag === 'function') window.gtag('consent', 'update', state);
    }

    // Consent Mode empêche les dépôts à venir mais n'efface pas ceux déjà faits.
    // Un retrait doit valoir pour le passé comme pour l'avenir.
    function clearMeasurementCookies() {
        var host = window.location.hostname;
        var scopes = ['', host, '.' + host];
        var parts = host.split('.');
        if (parts.length > 2) scopes.push('.' + parts.slice(-2).join('.'));

        document.cookie.split(';').forEach(function (entry) {
            var name = entry.split('=')[0].trim();
            if (!/^(_ga|_gid|_gat|_gcl|_dc_gtm)/.test(name)) return;
            scopes.forEach(function (domain) {
                document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
            });
        });
    }

    accept.addEventListener('click', function () {
        write('granted');
        updateConsent(GRANTED);
        hide();
    });

    refuse.addEventListener('click', function () {
        var wasGranted = read() === 'granted';
        write('denied');
        updateConsent(DENIED);
        clearMeasurementCookies();
        hide();
        // Les tags déjà déclenchés sur cette page ne peuvent pas être rappelés
        // autrement qu'en la rechargeant sans eux.
        if (wasGranted) window.location.reload();
    });

    if (!read()) show();

    // « Gérer mes cookies » du pied de page : la CNIL demande que le retrait
    // soit aussi simple que l'accord. Le conteneur est `hidden` dans le HTML et
    // n'apparaît qu'ici, pour ne pas exposer un bouton sans JavaScript derrière.
    var reopen = document.querySelector('.pep-consent-reopen');

    if (reopen) {
        reopen.hidden = false;
        reopen.addEventListener('click', function () { show(); });
    }

    window.pepOpenCookieBanner = show;
}());
