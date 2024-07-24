if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('Service Worker enregistré avec succès:', registration.scope);
            }, function(error) {
                console.log('L\'enregistrement du Service Worker a échoué:', error);
            });
    });
}


let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
});

installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt().then((choiceResult) => {
        // Attendre la réponse de l'utilisateur
        if (choiceResult.outcome === 'accepted') {
            console.log('Utilisateur a accepté l\'installation');
        } else {
            console.log('Utilisateur a refusé l\'installation');
            // Ré-afficher le bouton si l'utilisateur refuse
            installButton.style.display = 'block';
        }
        deferredPrompt = null;
    }).catch((error) => {
        console.error('Erreur lors de l\'affichage de l\'invite d\'installation:', error);
    });
});

// Vérifier si l'application est déjà installée
window.addEventListener('appinstalled', (evt) => {
    console.log('L\'application a été installée', evt);
    installButton.style.display = 'none';
});