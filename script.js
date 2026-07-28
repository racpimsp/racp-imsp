/* =====================================================================
   RACP-IMSP — interactions (v2)
   Nouveautés : barre de progression, en-tête réactif, apparitions en
   cascade, effet "spotlight" sur les cartes, messages d'état intégrés.
   Sécurité : honeypot anti-spam, validation renforcée, liste blanche
   des champs envoyés à Supabase, version du SDK épinglée, liens
   externes durcis (noopener noreferrer).
   ===================================================================== */
(function () {
  "use strict";

  var SUPABASE_ESM = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =====================  SÉCURITÉ  ===================== */

  /* Liens externes : garantit noopener+noreferrer sur tout target=_blank */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    var rel = (a.getAttribute("rel") || "").split(/\s+/);
    ["noopener", "noreferrer"].forEach(function (t) {
      if (rel.indexOf(t) === -1) rel.push(t);
    });
    a.setAttribute("rel", rel.join(" ").trim());
  });

  /* Année automatique du pied de page (évite un copyright périmé) */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Honeypot anti-spam : champ caché ignoré par les humains.
     Formspree rejette silencieusement toute soumission où il est rempli. */
  function addHoneypot(form) {
    if (form.querySelector('input[name="_gotcha"]')) return;
    var hp = document.createElement("input");
    hp.type = "text";
    hp.name = "_gotcha";
    hp.tabIndex = -1;
    hp.autocomplete = "off";
    hp.setAttribute("aria-hidden", "true");
    hp.style.cssText = "position:absolute;left:-9999px;height:0;width:0;opacity:0;pointer-events:none";
    form.appendChild(hp);
    form.dataset.t0 = String(Date.now());
  }
  function botDetected(form) {
    var hp = form.querySelector('input[name="_gotcha"]');
    if (hp && hp.value) return true;                       // champ piège rempli
    var t0 = parseInt(form.dataset.t0 || "0", 10);
    if (t0 && Date.now() - t0 < 2500) return true;         // soumission < 2,5 s
    return false;
  }
  document.querySelectorAll("form[data-newsletter],form[data-contact],form[data-multistep]")
    .forEach(addHoneypot);

  /* Validation e-mail plus stricte que type=email seul */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  function validEmail(v) { return EMAIL_RE.test(String(v || "").trim()); }

  /* Nettoyage basique des valeurs texte avant envoi (longueur bornée) */
  function clean(v, max) {
    return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max || 2000);
  }

  /* Message d'état intégré (remplace les alert()) */
  function formNotice(form, msg, kind) {
    var n = form.querySelector(".form-alert");
    if (!n) {
      n = document.createElement("p");
      n.className = "form-alert";
      n.setAttribute("role", "alert");
      form.appendChild(n);
    }
    n.textContent = msg;
    n.dataset.kind = kind || "error";
    n.classList.add("show");
    if (kind === "ok") setTimeout(function () { n.classList.remove("show"); }, 5000);
  }

  /* =====================  NAVIGATION  ===================== */

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    /* Échap referme le menu mobile */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* En-tête réactif au défilement + barre de progression de lecture */
  var header = document.querySelector(".site-header");
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || 0;
      if (header) header.classList.toggle("scrolled", y > 12);
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
      if (toTop) toTop.classList.toggle("show", y > 600);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* =====================  ANIMATIONS  ===================== */

  /* Apparitions au défilement, en cascade au sein d'un même parent */
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach(function (el) {
    var siblings = el.parentElement
      ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
    var i = Array.prototype.indexOf.call(siblings, el);
    if (i > 0 && !reduceMotion) el.style.transitionDelay = Math.min(i * 90, 360) + "ms";
  });
  if ("IntersectionObserver" in window && reveals.length) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Compteurs animés */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var end = parseInt(el.getAttribute("data-count"), 10) || 0;
        if (reduceMotion) { el.textContent = end.toLocaleString("fr-FR"); co.unobserve(el); return; }
        var dur = 1100, t0 = null;
        function tick(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
          el.textContent = Math.floor(eased * end).toLocaleString("fr-FR");
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        /* Filet de sécurité : garantit la valeur finale exacte même si l'animation
           est interrompue (onglet en arrière-plan, rAF ralenti). */
        setTimeout(function () { el.textContent = end.toLocaleString("fr-FR"); }, dur + 500);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* Effet "spotlight" : halo qui suit le curseur sur les cartes */
  if (!reduceMotion && window.matchMedia && window.matchMedia("(pointer:fine)").matches) {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card, .res, .quote");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* Bouton retour en haut */
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Revenir en haut de la page");
  toTop.innerHTML = "&#8593;";
  document.body.appendChild(toTop);
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
  onScroll();

  /* =====================  NEWSLETTER  ===================== */

  document.querySelectorAll("form[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (botDetected(form)) { form.classList.add("sent"); return; } /* leurre silencieux */
      var input = form.querySelector('input[type="email"]');
      if (!input || !validEmail(input.value)) {
        if (input) { input.focus(); input.setAttribute("aria-invalid", "true"); }
        formNotice(form, "Merci d'indiquer une adresse e-mail valide.");
        return;
      }
      input.removeAttribute("aria-invalid");
      var endpoint = form.getAttribute("data-endpoint");
      var payload = { email: clean(input.value, 254), source: "site-newsletter" };
      function done() { form.classList.add("sent"); }
      if (endpoint && endpoint.indexOf("VOTRE_") === -1) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }).then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          done();
        }).catch(function () {
          formNotice(form, "L'inscription a échoué. Réessayez dans un instant.");
        });
      } else {
        done(); /* mode démonstration : aucun backend branché */
      }
    });
  });

  /* =====================  HERO : DIAPORAMA  ===================== */

  document.querySelectorAll("[data-hero-slideshow]").forEach(function (box) {
    var slides = Array.prototype.slice.call(box.querySelectorAll("img"));
    if (slides.length < 2) return;
    var caption = document.querySelector("[data-hero-caption]");
    var figure = box.closest(".hero-figure");
    var idx = 0;

    var dots = document.createElement("div");
    dots.className = "hero-dots";
    slides.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Voir la photo " + (i + 1));
      if (i === 0) b.className = "is-active";
      b.addEventListener("click", function () { go(i); restart(); });
      dots.appendChild(b);
    });
    if (figure) figure.appendChild(dots);

    function go(n) {
      slides[idx].classList.remove("is-active");
      dots.children[idx].classList.remove("is-active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("is-active");
      dots.children[idx].classList.add("is-active");
      if (caption && slides[idx].dataset.cap) caption.textContent = slides[idx].dataset.cap;
    }

    var timer = null;
    function start() { if (!reduceMotion) timer = setInterval(function () { go(idx + 1); }, 4800); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }
    if (figure) {
      figure.addEventListener("mouseenter", stop);
      figure.addEventListener("mouseleave", start);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    start();
  });

  /* =====================  FORMULAIRE DE CONTACT  ===================== */

  document.querySelectorAll("form[data-contact]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var done = form.querySelector(".contact-done");
      var endpoint = form.getAttribute("data-endpoint");
      function finish() {
        form.querySelectorAll(".field, button[type=submit]").forEach(function (el) { el.style.display = "none"; });
        if (done) done.hidden = false;
      }
      if (botDetected(form)) { finish(); return; } /* leurre silencieux */
      var email = form.querySelector('input[type="email"]');
      if (email && !validEmail(email.value)) {
        email.focus();
        formNotice(form, "Merci d'indiquer une adresse e-mail valide.");
        return;
      }
      var payload = {};
      new FormData(form).forEach(function (v, k) {
        if (k === "_gotcha") return;
        payload[k] = clean(v, 4000);
      });
      btn.disabled = true;
      btn.textContent = "Envoi…";
      function fail() {
        btn.disabled = false;
        btn.textContent = "Réessayer";
        formNotice(form, "L'envoi a échoué. Vérifiez votre connexion et réessayez.");
      }
      if (endpoint && endpoint.indexOf("VOTRE_") === -1) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); finish(); })
          .catch(function () { fail(); });
      } else {
        setTimeout(finish, 400); /* démonstration */
      }
    });
  });

  /* =====================  FORMULAIRES MULTI-ÉTAPES  ===================== */

  /* Liste blanche des colonnes acceptées par table : tout champ inattendu
     est écarté avant l'envoi à Supabase. */
  var TABLE_COLUMNS = {
    mentor_applications: [
      "prenom", "nom", "email", "whatsapp", "promotion", "filiere", "pays", "fuseau",
      "parcours", "expertise", "description", "motivation", "dispo_h", "capacite",
      "canaux", "charte", "rgpd"
    ],
    mentee_applications: [
      "prenom", "nom", "email", "whatsapp", "ville", "niveau", "filiere_visee",
      "ecoles_cibles", "objectifs", "difficultes", "description", "dispo", "canal",
      "charte", "rgpd", "parental"
    ]
  };

  document.querySelectorAll("form[data-multistep]").forEach(function (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll(".fstep"));
    var segs = form.querySelectorAll(".progress .seg");
    var prevBtn = form.querySelector("[data-prev]");
    var nextBtn = form.querySelector("[data-next]");
    var submitBtn = form.querySelector("[data-submit]");
    var done = form.querySelector(".form-done");
    var idx = 0;

    function paint() {
      steps.forEach(function (s, i) { s.classList.toggle("active", i === idx); });
      segs.forEach(function (seg, i) {
        seg.classList.toggle("done", i < idx);
        seg.classList.toggle("current", i === idx);
      });
      prevBtn.style.visibility = idx === 0 ? "hidden" : "visible";
      var last = idx === steps.length - 1;
      nextBtn.style.display = last ? "none" : "inline-flex";
      submitBtn.style.display = last ? "inline-flex" : "none";
      form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    function validate(step) {
      var ok = true;
      step.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field") || input.closest(".choice-group");
        var valid = input.type === "checkbox" ? input.checked : String(input.value).trim() !== "";
        if (input.type === "radio") {
          valid = !!form.querySelector('input[name="' + input.name + '"]:checked');
        }
        if (valid && input.type === "email") valid = validEmail(input.value);
        if (field) field.classList.toggle("invalid", !valid);
        if (!valid && ok) { input.focus(); }
        if (!valid) ok = false;
      });
      return ok;
    }

    nextBtn.addEventListener("click", function () {
      if (validate(steps[idx])) { idx = Math.min(idx + 1, steps.length - 1); paint(); }
    });
    prevBtn.addEventListener("click", function () { idx = Math.max(idx - 1, 0); paint(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(steps[idx])) return;
      var endpoint = form.getAttribute("data-endpoint");
      var table = form.getAttribute("data-table");
      var cfg = window.RACP_SUPABASE || {};
      function finish() {
        form.querySelector(".form-body").style.display = "none";
        form.querySelector(".form-nav").style.display = "none";
        if (done) done.style.display = "block";
      }
      if (botDetected(form)) { finish(); return; } /* leurre silencieux */

      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi…";
      function fail(msg) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Réessayer";
        formNotice(form, msg || "L'envoi a échoué. Vérifiez votre connexion et réessayez.");
      }

      /* 1) Enregistrement direct dans Supabase (si configuré) */
      if (cfg.url && cfg.anon && table && TABLE_COLUMNS[table]) {
        submitToSupabase(form, table, cfg).then(finish).catch(function (err) {
          console.error("Supabase :", err);
          fail("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
        });
        return;
      }

      /* 2) Repli Formspree (si une vraie URL est renseignée) */
      var payload = {};
      new FormData(form).forEach(function (v, k) {
        if (k === "_gotcha") return;
        payload[k] = clean(v, 4000);
      });
      if (endpoint && endpoint.indexOf("VOTRE_") === -1) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }).then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          finish();
        }).catch(function () { fail(); });
        return;
      }

      /* 3) Mode démonstration : aucun backend branché. */
      setTimeout(finish, 500);
    });

    paint();
  });

  /* Enregistrement d'une candidature dans Supabase.
     Les champs sont nettoyés puis filtrés par la liste blanche de la table. */
  function submitToSupabase(form, table, cfg) {
    var raw = {};
    new FormData(form).forEach(function (v, k) { raw[k] = v; });
    delete raw._gotcha;

    /* Cases « canaux » du parrain -> tableau texte */
    var canaux = [];
    ["canal_whatsapp", "canal_visio", "canal_email"].forEach(function (k) {
      if (raw[k]) { canaux.push(clean(raw[k], 40)); delete raw[k]; }
    });
    if (canaux.length) raw.canaux = canaux;

    /* Disponibilité (parrain) « 1 h / mois » -> entier borné.
       On extrait le nombre où qu'il soit dans le libellé ; « Plus de 2 h / mois »
       est traité comme la borne supérieure (2 + 1 = 3) au lieu de retomber à 1. */
    if (table === "mentor_applications" && "dispo" in raw) {
      var dispoTxt = String(raw.dispo);
      var dispoMatch = dispoTxt.match(/\d+/);
      var dispoH = dispoMatch ? parseInt(dispoMatch[0], 10) : 1;
      if (/plus/i.test(dispoTxt)) dispoH += 1;
      raw.dispo_h = Math.min(Math.max(dispoH, 1), 40);
      delete raw.dispo;
    }
    if ("capacite" in raw) {
      raw.capacite = Math.min(Math.max(parseInt(raw.capacite, 10) || 1, 1), 10);
    }

    /* Cases à cocher -> booléens (présent = coché) */
    ["charte", "rgpd", "parental"].forEach(function (k) { if (k in raw) raw[k] = true; });

    /* Nettoyage des chaînes + liste blanche des colonnes */
    var allowed = TABLE_COLUMNS[table] || [];
    var row = {};
    Object.keys(raw).forEach(function (k) {
      if (allowed.indexOf(k) === -1) return;
      var v = raw[k];
      row[k] = (typeof v === "string") ? clean(v, 4000) : v;
    });
    if (row.email && !validEmail(row.email)) {
      return Promise.reject(new Error("email invalide"));
    }

    return import(SUPABASE_ESM).then(function (m) {
      var sb = m.createClient(cfg.url, cfg.anon);
      return sb.from(table).insert(row).then(function (res) {
        if (res.error) throw res.error;
        return true;
      });
    });
  }
})();
