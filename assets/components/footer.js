/*
|--------------------------------------------------------------------------
| Signal Labs Shared Footer Component
|--------------------------------------------------------------------------
| Hotfix: Home v0.9.7
| Purpose: Remove duplicate footer bottom-strip metadata from shared-footer pages.
|--------------------------------------------------------------------------
| Pages using #sl-footer inherit this component automatically.
|--------------------------------------------------------------------------
*/

(function () {
    "use strict";

    const DEFAULTS = {
        page: "home",
        title: "Signal Labs",
        version: "v0.9.7",
        status: "Active Development",
        statusTitle: "Status",
        statusBody: "All systems operational. We are constantly improving and adding new tools.",
        statusLink: "/status/",
        statusLinkText: "View Status"
    };

    const STATUS_TITLES = {
        home: "Status",
        paycheck: "Paycheck Status",
        "pay-planner": "Pay Planner Status",
        overtime: "Overtime Status",
        timeoff: "Time Off Status"
    };

    function readMeta() {
        const dataset = document.body ? document.body.dataset : {};

        const page = dataset.slPage || DEFAULTS.page;

        return {
            page,
            title: dataset.slTitle || DEFAULTS.title,
            version: dataset.slVersion || DEFAULTS.version,
            status: dataset.slStatus || DEFAULTS.status,
            statusTitle: dataset.slStatusTitle || STATUS_TITLES[page] || DEFAULTS.statusTitle,
            statusBody: dataset.slStatusBody || DEFAULTS.statusBody,
            statusLink: dataset.slStatusLink || DEFAULTS.statusLink,
            statusLinkText: dataset.slStatusLinkText || DEFAULTS.statusLinkText
        };
    }

    function renderFooter(meta) {
        return `
<footer class="sl-footer" aria-label="Signal Labs footer">
    <div class="sl-footer-main">
        <section class="sl-footer-brand" aria-label="Signal Labs">
            <div class="sl-footer-brand-row">
                <span class="sl-footer-logo" aria-hidden="true">▧</span>
                <strong>Signal Labs</strong>
            </div>
            <p>Useful tools without the noise. Lightweight calculators and planning tools built for real-life decisions.</p>
        </section>

        <nav class="sl-footer-links" aria-label="Resources">
            <h2>Resources</h2>
            <a href="/changelog/">Changelog</a>
            <a href="/roadmap/">Roadmap</a>
            <a href="/how-to/">How To</a>
        </nav>

        <nav class="sl-footer-links" aria-label="Support">
            <h2>Support</h2>
            <a href="/report-issue/">Report an Issue</a>
            <a href="/request-feature/">Request a Feature</a>
            <a href="/contact/">Contact</a>
        </nav>

        <nav class="sl-footer-links" aria-label="About">
            <h2>About</h2>
            <a href="/about/">About Signal Labs</a>
            <a href="/privacy/">Privacy Policy</a>
            <a href="/terms/">Terms of Use</a>
        </nav>

        <section class="sl-footer-status-card" aria-label="${meta.statusTitle}">
            <h2>${meta.statusTitle}</h2>
            <p class="sl-status-pill"><span aria-hidden="true"></span>${meta.status}</p>
            <p>${meta.statusBody}</p>
            <a class="sl-footer-status-link" href="${meta.statusLink}">${meta.statusLinkText} →</a>
        </section>
    </div>

    <div class="sl-footer-bottom">
        <p>© 2026 Signal Labs · ${meta.version}</p>
    </div>
</footer>`;
    }

    function mountFooter() {
        const footerMount = document.getElementById("sl-footer");

        if (!footerMount) {
            return;
        }

        footerMount.innerHTML = renderFooter(readMeta());
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mountFooter);
    } else {
        mountFooter();
    }
})();
