import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'; // Vérifie si le mode maintenance est activé
  const url = request.url;

  // Vérifier si la page actuelle est la page de maintenance
  const isMaintenancePage = url.includes('/maintenance');

  // Vérifier la présence du cookie X-Authorized et sa valeur
  const xAuthorizedCookie = request.cookies.get('X-Authorized');

  // Vérifier si le cookie X-Authorized est défini et égal à 'true'
  const isAuthorized = xAuthorizedCookie?.value === 'true'; // Utilise `.value` pour accéder à la valeur du cookie
  
  // Si le mode maintenance est activé et que l'utilisateur n'est pas sur la page de maintenance
  // et qu'il n'est pas autorisé, rediriger vers la page de maintenance
  if (maintenanceMode && !isAuthorized && !isMaintenancePage) {
    console.log("isAuthorized");
    console.log(isAuthorized);
    return NextResponse.redirect(new URL('/maintenance', url));
  }

  // Si l'utilisateur est autorisé ou si le mode maintenance est désactivé, continuer l'accès
  return NextResponse.next();
}

// Configuration des pages à matcher
export const config = {
  matcher: [
    '/', '/auth', '/maintenance', '/articles', '/historique', '/forme-juridique', '/actionnariat',
    '/mission', '/notre-equipe', '/organisation', '/relation-clientele', '/privatisation',
    '/financement-des-entreprises', '/gestion-des-portefeuilles', '/gestion-du-registre-des-actionnaires',
    '/intermediation', '/emissions-demprunts-prives', '/emissions-demprunts-publics', '/capacite-de-placement-de-titre',
    '/publications', '/souscription', '/nous-contacter', '/foire-aux-questions', '/notre-actualite'
  ],
};
