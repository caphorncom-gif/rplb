-- ============================================
-- SCHEMA SUPABASE - RPLB ÉLECTRICITÉ
-- ============================================

-- 1. TABLE: pages
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image TEXT,
  content JSONB,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABLE: services
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  icon TEXT,  -- Nom de l'icône Lucide
  short_description TEXT,
  description TEXT NOT NULL,
  features JSONB,  -- Liste des points forts
  price_info TEXT,  -- "À partir de X€" ou "Sur devis"
  image TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABLE: realisations (photos avant/après)
CREATE TABLE realisations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  service_id UUID REFERENCES services(id),
  before_image TEXT,
  after_image TEXT,
  location TEXT,  -- "Compiègne, Oise"
  date DATE,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABLE: testimonials (avis clients)
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_location TEXT,  -- "Longueil-Sainte-Marie"
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  service_type TEXT,  -- Ex: "Dépannage", "Installation"
  date DATE DEFAULT CURRENT_DATE,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABLE: articles (blog)
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT DEFAULT 'RPLB Électricité',
  category TEXT,  -- "Conseils", "Actualités", "Réglementation"
  tags TEXT[],
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABLE: contact_requests (demandes de devis/contact)
CREATE TABLE contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  service_type TEXT,  -- Service demandé
  urgency TEXT,  -- "Urgence", "Sous 48h", "Planifier"
  message TEXT NOT NULL,
  budget_range TEXT,
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABLE: certifications (labels, assurances)
CREATE TABLE certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,  -- "Qualifelec", "RGE", "Decennale"
  description TEXT,
  badge_image TEXT,
  certificate_number TEXT,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0
);

-- 8. TABLE: site_settings
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TABLE: urgent_numbers (numéros d'urgence)
CREATE TABLE urgent_numbers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,  -- "Urgence 24/7"
  phone TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true
);

-- 10. TABLE: media
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  folder TEXT DEFAULT 'general',  -- 'services', 'realisations', 'team'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. TABLE: admin_users
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  avatar_url TEXT,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE realisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE urgent_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour contenu publié
CREATE POLICY "Pages publiques" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Services actifs" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Réalisations publiques" ON realisations FOR SELECT USING (true);
CREATE POLICY "Avis approuvés" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Articles publiés" ON articles FOR SELECT USING (is_published = true);
CREATE POLICY "Certifications actives" ON certifications FOR SELECT USING (is_active = true);

-- Écriture admin
CREATE POLICY "Admin tout accès pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin tout accès services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin tout accès realisations" ON realisations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin tout accès testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin tout accès articles" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin lecture contact_requests" ON contact_requests FOR SELECT USING (auth.role() = 'authenticated');

-- Contact public
CREATE POLICY "Création contact public" ON contact_requests FOR INSERT WITH CHECK (true);

-- Numéros d'urgence publics
CREATE POLICY "Numéros d'urgence publics" ON urgent_numbers FOR SELECT USING (is_active = true);

-- Admin users (pas d'accès public, seulement authentifié)
CREATE POLICY "Admin accès admin_users" ON admin_users FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- DONNÉES INITIALES
-- ============================================

-- Page d'accueil
INSERT INTO pages (slug, title, meta_title, meta_description, hero_title, hero_subtitle, is_published) VALUES
('home', 'Accueil', 'RPLB Électricité - Électricien Longueil-Sainte-Marie (60)', 
 'Électricien professionnel à Longueil-Sainte-Marie. Installation, dépannage, rénovation électrique. Intervention rapide dans l''Oise. Devis gratuit.',
 'Votre électricien de confiance dans l''Oise',
 'Installation • Dépannage • Rénovation • Domotique - Intervention rapide du lundi au vendredi',
 true);

-- Services
INSERT INTO services (slug, title, icon, short_description, description, price_info, order_index, is_active) VALUES
('depannage-electrique', 'Dépannage Électrique', 'Zap', 
 'Intervention rapide du lundi au vendredi pour tous vos problèmes électriques',
 'Panne de courant, disjoncteur qui saute, prise défectueuse ? Notre équipe intervient rapidement pour diagnostiquer et réparer vos installations électriques. Disponibles du lundi au vendredi pour les urgences.',
 'À partir de 60€',
 1, true),

('installation-electrique-neuve', 'Installation Neuve', 'Home', 
 'Installation électrique complète pour construction neuve',
 'Conception et installation de votre système électrique complet selon les normes NF C 15-100. Tableaux électriques, prises, éclairage, chauffage électrique.',
 'Sur devis',
 2, true),

('renovation-electrique', 'Rénovation Électrique', 'RefreshCw', 
 'Mise aux normes et rénovation de votre installation',
 'Rénovation complète ou partielle de votre installation électrique. Mise aux normes NF C 15-100, remplacement tableau électrique, ajout de prises et circuits.',
 'Sur devis',
 3, true),

('domotique', 'Domotique & Maison Connectée', 'Smartphone', 
 'Automatisez votre maison pour plus de confort et d''économies',
 'Installation de solutions domotiques : éclairage intelligent, volets automatiques, thermostat connecté, gestion énergétique. Contrôlez votre maison depuis votre smartphone.',
 'À partir de 500€',
 4, true),

('climatisation', 'Climatisation', 'Wind', 
 'Installation et maintenance de climatisation réversible',
 'Installation de climatiseurs réversibles (chaud/froid) pour votre confort toute l''année. Entretien et dépannage de systèmes existants.',
 'Sur devis',
 5, true),

('alarme-videosurveillance', 'Alarme & Vidéosurveillance', 'Shield', 
 'Sécurisez votre habitation avec des systèmes modernes',
 'Installation de systèmes d''alarme connectés et de vidéosurveillance. Caméras IP, détecteurs, sirènes. Consultation à distance sur smartphone.',
 'À partir de 800€',
 6, true),

('borne-recharge-vehicule-electrique', 'Borne de Recharge Véhicule Électrique', 'BatteryCharging', 
 'Installation de bornes de recharge pour voitures électriques',
 'Installation de wallbox pour la recharge de votre véhicule électrique. Aide aux subventions. Compatible avec toutes marques de véhicules.',
 'À partir de 1200€ (hors aide)',
 7, true);

-- Certifications
INSERT INTO certifications (name, description, is_active, order_index) VALUES
('Qualifelec', 'Qualification professionnelle des entreprises d''électricité', true, 1),
('Assurance Décennale', 'Garantie décennale pour vos travaux', true, 2),
('RGE', 'Reconnu Garant de l''Environnement', true, 3);

-- Numéro d'urgence
INSERT INTO urgent_numbers (title, phone, description, is_active) VALUES
('Urgence', '03 XX XX XX XX', 'Dépannage électrique urgent - Intervention rapide du lundi au vendredi', true);

-- Paramètres du site
INSERT INTO site_settings (key, value, description) VALUES
('site_info', '{
  "company_name": "RPLB Électricité",
  "siret": "XXX XXX XXX XXXXX",
  "email": "contact@rplb-electricite.fr",
  "phone": "03 XX XX XX XX",
  "mobile": "06 XX XX XX XX",
  "address": "Longueil-Sainte-Marie, 60126",
  "intervention_zone": "Longueil-Sainte-Marie, Compiègne, Oise (60)"
}', 'Informations générales'),

('social_media', '{
  "facebook": "https://facebook.com/rplb-electricite",
  "instagram": "",
  "linkedin": ""
}', 'Réseaux sociaux'),

('business_hours', '{
  "monday": "8h-18h",
  "tuesday": "8h-18h",
  "wednesday": "8h-18h",
  "thursday": "8h-18h",
  "friday": "8h-18h",
  "saturday": "9h-12h",
  "sunday": "Urgences uniquement"
}', 'Horaires'),

('seo_local', '{
  "zones": ["Longueil-Sainte-Marie", "Compiègne", "Verberie", "Pont-Sainte-Maxence", "Crépy-en-Valois"],
  "keywords": ["électricien", "dépannage électrique", "installation électrique", "rénovation électrique", "Oise"]
}', 'SEO Local');

