/*
|--------------------------------------------------------------------------
| Signal Labs Shared Footer Component
|--------------------------------------------------------------------------
| Version: Home v0.9.9.1
| Theme: Public Page Version Sync Resolution
|--------------------------------------------------------------------------
| Purpose:
| - Read existing page metadata using data-signal-* attributes.
| - Keep Home/public pages synced to the current Home version.
| - Preserve independent tool versions for Paycheck and Pay Planner.
| - Leave Overtime and Time Off unchanged until migration.
|--------------------------------------------------------------------------
*/

(function () {
    "use strict";

    const HOME_VERSION = "v0.9.9.1";

    const HOME_PUBLIC_PAGES = new Set([
        "home",
        "about",
        "changelog",
        "contact",
        "how-to",
        "privacy",
        "report-issue",
        "request-feature",
        "roadmap",
        "status",
        "terms"
    ]);

    const STATUS_TITLES = {
        home: "Status",
        paycheck: "Paycheck Status",
        "pay-planner": "Pay Planner Status",
        overtime: "Overtime Status",
        timeoff: "Time Off Status"
    };

    function getPathPage() {
        const cleanedPath = window.location.pathname.replace(/^\/+|\/+$/g, "");

        if (!cleanedPath) {
            return "home";
        }

        return cleanedPath.split("/")[0] || "home";
    }

    function readDataset() {
        return document.body ? document.body.dataset : {};
    }

    function readPage(dataset) {
        return dataset.signalPage || dataset.slPage || getPathPage();
    }

    function readVersion(dataset, page) {
        if (HOME_PUBLIC_PAGES.has(page)) {
            return HOME_VERSION;
        }

        return dataset.signalVersion || dataset.slVersion || HOME_VERSION;
    }

    function readStatus(dataset) {
        return dataset.signalStatus || dataset.slStatus || "Active Development";
    }

    function readStatusBody(dataset) {
        return dataset.signalStatusBody || dataset.slStatusBody || "All systems operational. We are constantly improving and adding new tools.";
    }

    function readStatusTitle(dataset, page) {
        return dataset.signalStatusTitle || dataset.slStatusTitle || STATUS_TITLES[page] || "Status";
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
            <a class="sl-footer-status-link" href="/status/">View Status →</a>
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

        const dataset = readDataset();
        const page = readPage(dataset);

        footerMount.innerHTML = renderFooter({
            page,
            version: readVersion(dataset, page),
            status: readStatus(dataset),
            statusBody: readStatusBody(dataset),
            statusTitle: readStatusTitle(dataset, page)
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mountFooter);
    } else {
        mountFooter();
    }
})();
