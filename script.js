/* =========================================================
   Migdalia Valadez — Psicóloga
   JavaScript principal (vanilla, sin dependencias)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Menú hamburguesa (móvil) ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    /* Cerrar el menú al elegir una opción */
    var navLinks = primaryNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  /* ---------- Acordeón de preguntas frecuentes ---------- */
  var faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(function (button) {
    var answer = button.parentElement.nextElementSibling;

    button.addEventListener('click', function () {
      var isOpen = button.getAttribute('aria-expanded') === 'true';

      /* Cerrar cualquier otra pregunta abierta */
      faqButtons.forEach(function (otherButton) {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          otherButton.parentElement.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isOpen) {
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Animación de entrada al hacer scroll ---------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Si el navegador no soporta IntersectionObserver, mostrar todo directamente */
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* =========================================================
     TRACKING DE CLICS (Google Ads / GA4)
     -----------------------------------------------------------
     Los elementos clave del sitio ya tienen el atributo
     data-track con un nombre de evento:
       - hero_agendar
       - sobre_mi_agendar
       - presencial_horarios
       - online_horarios
       - whatsapp_contacto
       - maps_ubicacion

     Cuando Google Analytics 4 / Google Tag Manager estén
     instalados (ver comentarios en index.html), descomenta
     el bloque de abajo para enviar estos eventos a dataLayer.
     ========================================================= */

  var trackedEls = document.querySelectorAll('[data-track]');
  trackedEls.forEach(function (el) {
    el.addEventListener('click', function () {
      var eventName = el.getAttribute('data-track');

      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({
      //   event: eventName
      // });

      /* Log temporal para verificar que el evento se dispara.
         Puedes quitar esta línea cuando actives GA4/GTM. */
      console.log('[tracking]', eventName);
    });
  });

});
