export function onNavLinkClick({ target }) {
    // 1. Supprimer la classe active sur tous les éléments corerspondants à la classe .nav-link
    document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
    // 2. Ajouter la classe .active au target
    target.classList.add('active');
}
