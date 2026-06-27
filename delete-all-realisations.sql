-- Script pour supprimer TOUTES les réalisations existantes
-- ⚠️ ATTENTION : Cette action est irréversible !

DELETE FROM realisations;

-- Vérification : compter les réalisations restantes (devrait être 0)
SELECT COUNT(*) as nombre_realisations FROM realisations;

