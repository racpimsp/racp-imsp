/* RACP-IMSP — interactions */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
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
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
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

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var end = parseInt(el.getAttribute("data-count"), 10) || 0;
        var dur = 1100, t0 = null;
        function tick(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.floor(p * end).toLocaleString("fr-FR");
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- Back to top ---- */
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Revenir en haut de la page");
  toTop.innerHTML = "↑";
  document.body.appendChild(toTop);
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  /* ---- Newsletter signup ---- */
  document.querySelectorAll("form[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim() || input.validity.typeMismatch) {
        if (input) input.focus();
        return;
      }
      var endpoint = form.getAttribute("data-endpoint");
      var payload = { email: input.value.trim(), source: "site-newsletter" };
      function done() { form.classList.add("sent"); }
      if (endpoint && endpoint.indexOf("VOTRE_") === -1) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }).then(done).catch(function () {
          alert("L'inscription a échoué. Réessayez dans un instant.");
        });
      } else {
        console.log("Newsletter (démo) :", payload);
        done();
      }
    });
  });

  /* ---- Hero : diaporama campus (crossfade + points) ---- */
  document.querySelectorAll("[data-hero-slideshow]").forEach(function (box) {
    var slides = Array.prototype.slice.call(box.querySelectorAll("img"));
    if (slides.length < 2) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    function start() { if (!reduce) timer = setInterval(function () { go(idx + 1); }, 4800); }
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

  /* ---- Contact form (Formspree, reste sur la page) ---- */
  document.querySelectorAll("form[data-contact]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var done = form.querySelector(".contact-done");
      var endpoint = form.getAttribute("data-endpoint");
      var payload = Object.fromEntries(new FormData(form).entries());
      btn.disabled = true;
      btn.textContent = "Envoi…";
      function finish() {
        form.querySelectorAll(".field, button[type=submit]").forEach(function (el) { el.style.display = "none"; });
        if (done) done.hidden = false;
      }
      function fail() {
        btn.disabled = false;
        btn.textContent = "Réessayer";
        alert("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
      }
      if (endpoint && endpoint.indexOf("VOTRE_") === -1) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); finish(); })
          .catch(function () { fail(); });
      } else {
        console.log("Contact (démo) :", payload);
        setTimeout(finish, 400);
      }
    });
  });

  /* ---- Multi-step forms ---- */
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
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function validate(step) {
      var ok = true;
      step.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field") || input.closest(".choice-group");
        var valid = input.type === "checkbox" ? input.checked : String(input.value).trim() !== "";
        if (input.type === "radio") {
          valid = !!form.querySelector('input[name="' + input.name + '"]:checked');
        }
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
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi…";

      function finish() {
        form.querySelector(".form-body").style.display = "none";
        form.querySelector(".form-nav").style.display = "none";
        if (done) done.style.display = "block";
      }
      function fail(msg) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Réessayer";
        alert(msg || "L'envoi a échoué. Vérifiez votre connexion et réessayez.");
      }

      // 1) Enregistrement direct dans Supabase (si configuré)
      if (cfg.url && cfg.anon && table) {
        submitToSupabase(form, table, cfg).then(finish).catch(function (err) {
          console.error("Supabase :", err);
          fail("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
        });
        return;
      }

      // 2) Repli Formspree (si une vraie URL est renseignée)
      var payload = Object.fromEntries(new FormData(form).entries());
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

      // 3) Mode démonstration : aucun backend branché.
      console.log("Candidature (démo) :", payload);
      setTimeout(finish, 500);
    });

    paint();
  });

  /* ---- Enregistrement d'une candidature dans Supabase ----
     Aligne les champs du formulaire sur les colonnes des tables
     mentor_applications / mentee_applications. */
  function submitToSupabase(form, table, cfg) {
    var row = Object.fromEntries(new FormData(form).entries());

    // Cases « canaux » du parrain -> tableau texte
    var canaux = [];
    ["canal_whatsapp", "canal_visio", "canal_email"].forEach(function (k) {
      if (row[k]) { canaux.push(row[k]); delete row[k]; }
    });
    if (canaux.length) row.canaux = canaux;

    // Disponibilité (parrain) « 1 h / mois » -> entier
    if (table === "mentor_applications" && "dispo" in row) {
      row.dispo_h = parseInt(row.dispo, 10) || 1;
      delete row.dispo;
    }
    if ("capacite" in row) { row.capacite = parseInt(row.capacite, 10) || 1; }

    // Cases à cocher -> booléens (présent = coché)
    ["charte", "rgpd", "parental"].forEach(function (k) { if (k in row) row[k] = true; });

    return import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm").then(function (m) {
      var sb = m.createClient(cfg.url, cfg.anon);
      return sb.from(table).insert(row).then(function (res) {
        if (res.error) throw res.error;
        return true;
      });
    });
  }
})();
