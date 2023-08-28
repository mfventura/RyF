export default class RyFItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ryf", "sheet", "item"],
      width: 320,
      height: 450,
      resizable: true,
      tabs: [
              {
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "habilidades",
              },
            ],
    });
  }

  getData() {
    const superData = super.getData();
    const data = superData.data;
    const settings = this.loadSettings();
    data.settings = settings;
    data.system.descripcion = TextEditor.enrichHTML(data.system.descripcion, {
      async: false,
    });
    return data;
  }

  get template() {
    return `systems/ryf/templates/items/${this.item.type}.html`;
  }

  //Load settings that are used in the actor sheet
  loadSettings() {
    let settings = {};
    settings.charismaEnabled = game.settings.get("ryf", "charismaEnabled");
    return settings;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".item-create").click(this._onItemCreate.bind(this));
    html.find(".effect-create").click(this._onCreateEffect.bind(this));
  }

  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system["type"];
    // Finally, create the item!
    return Item.create(itemData, { parent: this.item });
    console.log(this.item.system.efectos);
  }

  _onCreateEffect(event){
  console.log(this)
  console.log(event)
  let effect = this.item.createEmbeddedDocuments("ActiveEffect", [{
                label: game.i18n.localize("RYF.EffectNew"),
                icon: "icons/svg/aura.svg",
                origin: this.uuid,
                "duration.rounds": undefined,
                disabled: true
              }]);
  console.log(effect)
  }
}
