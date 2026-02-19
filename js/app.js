fetch('/web_ph_2026/scripts/pdfs.json')
    .then(reponse => reponse.json())
    .then(journaux => {

        const annees = [...new Set(journaux.map(j => j.year))].sort((a, b) => b - a);

        const journauxAnneeMax = journaux.filter(j => j.year === annees[0]);
        const dernierNumero = journauxAnneeMax[journauxAnneeMax.length - 1];

        document.getElementById('une-titre').textContent = `${dernierNumero.label} (${dernierNumero.year})`;
        document.getElementById('une-bouton').href = dernierNumero.file;

        const zoneArchives = document.getElementById('zone-archives');
        zoneArchives.innerHTML = '';

        annees.forEach(annee => {
            zoneArchives.innerHTML += `<h3 class="titre-annee">Année ${annee}</h3>`;

            const journauxDeLannee = journaux.filter(j => j.year === annee).reverse();

            let conteneurCartes = `<div class="grille-annee">`;
            
            journauxDeLannee.forEach(journal => {
                conteneurCartes += `
                    <div class="carte-journal">
                        <div class="icone-pdf">PDF</div>
                        <div class="infos-journal">
                            <h4>${journal.label}</h4>
                            <a href="${journal.file}" target="_blank" class="bouton-lire">Ouvrir</a>
                        </div>
                    </div>
                `;
            });
            
            conteneurCartes += `</div>`; 
            zoneArchives.innerHTML += conteneurCartes; 
        });

    })
    .catch(erreur => {
        console.error("Erreur :", erreur);
        document.getElementById('une-titre').textContent = "Erreur de chargement des données.";
    });