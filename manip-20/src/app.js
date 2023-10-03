export class Tabs {
    static setSelectedtab(tab) {
        document.querySelector('section.main-content.visible').classList.remove('visible');
        document.querySelector(`section#${tab}`).classList.add('visible');
    }
}
