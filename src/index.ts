import skills from "./skills.json"

const result: Record<string, string[]> = {};
skills.forEach(skill => {
    result[skill.name] = skill.stats
})

function addNotableProperties() {
    const cards = document.querySelectorAll('.resultset .row');

    cards.forEach((card) => {
        const enchantMods = card.querySelectorAll('.enchantMod .lc.s');
        enchantMods.forEach(enchantMod => {
            if (!enchantMod.innerHTML.startsWith('Allocates') || enchantMod.getAttribute('data-trade-tooltip')) {
                return;
            }
            const skillName = enchantMod.innerHTML.substring(10);
            if (result[skillName]) {
                const content = card.querySelector('.content');
                const separator = document.createElement('div');
                separator.className = 'separator';
                content?.appendChild(separator);
                const notable = document.createElement('div');
                const header = document.createElement('span');
                header.className = 'colourAugmented';
                header.innerHTML = skillName;
                notable.appendChild(header)
                result[skillName].forEach(item => {
                    notable.appendChild(document.createElement('br'));
                    notable.appendChild(document.createTextNode(item));
                });
                content?.appendChild(notable);
                enchantMod.setAttribute('data-trade-tooltip', '1')
            }
        })
    });
}

const mainObserver = new MutationObserver(() => {
    const resultSet = document.querySelector('.resultset');
    if (resultSet) {
        const resultSetObserver = new MutationObserver(() => {
            addNotableProperties();
        });
        resultSetObserver.observe(resultSet, {childList: true, subtree: false});
        addNotableProperties();
    }
});

mainObserver.observe(document.body, {childList: true, subtree: true});
