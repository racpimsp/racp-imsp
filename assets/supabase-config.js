/* =====================================================================
   RACP-IMSP — Configuration du back-office (Supabase)
   ---------------------------------------------------------------------
   Renseignez ces deux valeurs pour activer l'enregistrement des
   candidatures de mentorat dans votre base Supabase. Elles alimentent
   À LA FOIS les formulaires (devenir-parrain / devenir-filleul) ET
   l'espace coordinateur (admin/index.html).

   Où les trouver : Supabase → votre projet → Project Settings → API
     • url  = "Project URL"        (ex. https://abcd1234.supabase.co)
     • anon = "anon public" key    (clé publique, sans danger côté client)

   Laissez les deux vides pour conserver le mode démonstration
   (ou le repli Formspree configuré sur chaque formulaire).
   ===================================================================== */
window.RACP_SUPABASE = {
  url:  "",
  anon: ""
};
