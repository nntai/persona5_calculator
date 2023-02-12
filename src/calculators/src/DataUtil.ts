/// <reference path="../data/Data5.ts"/>
/// <reference path="../data/PersonaData.ts"/>
/// <reference path="../data/SkillData.ts"/>
/// <reference path="../data/ItemData.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
import { PersonaData, personaMap } from '../data/PersonaData';
import { SkillData, skillMap } from '../data/SkillData';
import { arcana2Combos, specialCombos } from '../data/Data5';
import { itemMap } from '../data/ItemData';

function addStatProperties(persona: PersonaData): void {
  persona.strength = persona.stats[0];
  persona.magic = persona.stats[1];
  persona.endurance = persona.stats[2];
  persona.agility = persona.stats[3];
  persona.luck = persona.stats[4];
}

function addElementProperties(persona: PersonaData): void {
  const properties = ['physical', 'gun', 'fire', 'ice', 'electric', 'wind', 'psychic', 'nuclear', 'bless', 'curse'];
  const elemsValue = { 'wk': 0, '-': 1, 'rs': 2, 'nu': 3, 'rp': 4, 'ab': 5 };
  for (let i = 0; i < properties.length; i++) {
    persona[properties[i]] = persona.elems[i];
    persona[`${properties[i]}Value`] = elemsValue[persona.elems[i]];
  }
}

function isDlcPersonaOwned(dlcPersona: string): boolean {
  if (!localStorage.dlcPersona)
    return false;

  return JSON.parse(localStorage.dlcPersona)[dlcPersona] === true;
}

/**
 * List of persona with DLC persona potentially removed based on user config
 */
const customPersonaList: PersonaData[] = (() => {
  const arr = [];
  for (const key in personaMap) {
    if (personaMap.hasOwnProperty(key)) {
      const persona = personaMap[key];
      if (persona.dlc && !isDlcPersonaOwned(key))
        continue;

      persona.name = key;
      addStatProperties(persona);
      addElementProperties(persona);
      arr.push(persona);
    }
  }
  return arr;
})();

const calculateFullPersonaList: () => PersonaData[] = () => {
  console.log('🚀 ~ file: DataUtil.ts:70 ~ calculateFullPersonaList');
  const arr = [];
  for (const key in personaMap) {
    if (personaMap.hasOwnProperty(key)) {
      const persona = personaMap[key];
      persona.name = key;
      addStatProperties(persona);
      addElementProperties(persona);
      arr.push(persona);
    }
  }
  return arr;
};

const skillList: SkillData[] = (() => {
  const arr = [];
  for (const key in skillMap) {
    if (skillMap.hasOwnProperty(key)) {
      const skill = skillMap[key];
      skill.name = key;
      skill.elemDisplay = capitalizeFirstLetter(skill.element);
      skill.costDisplay = getSkillCost(skill);
      skill.personaDisplay = getSkillPersonaList(skill);
      if (skill.talk)
        skill.talkDisplay = createPersonaLink(skill.talk);

      if (skill.fuse) {
        if (typeof skill.fuse === 'string') {
          skill.fuseDisplay = createPersonaLink(skill.fuse);
        }
        else { // it's an array
          const arr = [];
          for (let i = 0; i < skill.fuse.length; i++)
            arr.push(createPersonaLink(skill.fuse[i]));

          skill.fuseDisplay = arr.join(', ');
        }
      }
      arr.push(skill);
    }
  }
  return arr;
})();

/**
 * Persona by arcana based on customPersonaList
 */
const customPersonaeByArcana: { [arcana: string]: PersonaData[] } = (() => {
  const personaeByArcana_: Record<string, PersonaData[]> = {};
  for (let i = 0; i < customPersonaList.length; i++) {
    const persona = customPersonaList[i];
    if (!personaeByArcana_[persona.arcana])
      personaeByArcana_[persona.arcana] = [];

    personaeByArcana_[persona.arcana].push(persona);
  }

  for (const key in personaeByArcana_)
    personaeByArcana_[key].sort((a, b) => a.level - b.level);

  // Make sure this is always there regardless of DLC setting
  if (!personaeByArcana_.World)
    personaeByArcana_.World = [];

  return personaeByArcana_;
})();

const arcanaMap = (() => {
  const map = {} as Record<string, Record<string, string>>;
  for (let i = 0; i < arcana2Combos.length; i++) {
    const combo = arcana2Combos[i];
    if (!map[combo.source[0]])
      map[combo.source[0]] = {};
    map[combo.source[0]][combo.source[1]] = combo.result;

    if (!map[combo.source[1]])
      map[combo.source[1]] = {};
    map[combo.source[1]][combo.source[0]] = combo.result;
  }
  return map;
})();

const getResultArcana = (arcana1: string, arcana2: string) => {
  return arcanaMap[arcana1][arcana2];
};

const special2Combos = (() => {
  const combos = [];
  for (let i = 0; i < specialCombos.length; i++) {
    if (specialCombos[i].sources.length == 2)
      combos.push(specialCombos[i]);
  }
  return combos;
})();

function getElems(personaName: string) {
  const elems = personaMap[personaName].elems;
  for (let i = 0; i < elems.length; i++) {
    if (elems[i] == 'wk')
      elems[i] = 'Weak';
    else if (elems[i] == 'rs')
      elems[i] = 'Resist';
    else if (elems[i] == 'ab')
      elems[i] = 'Absorb';
    else if (elems[i] == 'rp')
      elems[i] = 'Repel';
    else if (elems[i] == 'nu')
      elems[i] = 'Null';
  }
  return elems;
}

function getSkills(personaName: string) {
  const skills = personaMap[personaName].skills;
  const sorted = [];
  for (const name in skills) {
    if (skills.hasOwnProperty(name))
      sorted.push([name, skills[name]]);
  }

  sorted.sort((a, b) => {
    return a[1] - b[1];
  });

  const resSkills = [];
  for (let i = 0; i < sorted.length; i++) {
    const skillData = skillMap[sorted[i][0]];
    resSkills.push({
      name: sorted[i][0],
      level: sorted[i][1],
      description: skillData.effect,
      unique: skillData.unique,
      elem: capitalizeFirstLetter(skillData.element),
      cost: getSkillCost(skillData),
    });
  }

  if (personaMap[personaName].trait) {
    const traitData = skillMap[personaMap[personaName].trait];
    resSkills.unshift({
      name: personaMap[personaName].trait,
      level: 0,
      description: traitData.effect,
      unique: traitData.unique,
      elem: 'Trait',
      cost: '-',
    });
  }

  return resSkills;
}

function getSkillCardInfo(skillCard: string) {
  const skillData = [];
  const skill = skillMap[skillCard];
  skillData.push({
    name: skillCard,
    description: skill.effect,
    elem: capitalizeFirstLetter(skill.element),
    cost: getSkillCost(skill),
  });

  return skillData;
}
function getItem(itemName: string) {
  const itemData = [];
  const item = itemMap[itemName];
  itemData.push({
    skillCard: item.skillCard,
    name: itemName,
    type: item.type,
    description: item.description,
  });

  return itemData;
}

function getSkillPersonaList(skill: SkillData): string {
  const arr = [];
  for (const key in skill.personas) {
    if (skill.personas.hasOwnProperty(key)) {
      const level = skill.personas[key];
      const keyHref = createPersonaLink(key);
      arr.push(keyHref + (level !== 0 ? ` (${level})` : ''));
    }
  }
  let str = arr.join(', ');
  if (skill.note)
    str = (str ? (`${str}. `) : '') + skill.note;

  return str;
}

function createPersonaLink(personaName: string): string {
  return `<a href='#/persona/${personaName}'>${personaName}</a>`;
}

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getSkillCost(skill: SkillData) {
  if (skill.element !== 'passive' && skill.element !== 'trait') {
    if (skill.cost < 100)
      return `${String(skill.cost)}% HP`;

    else
      return `${String(skill.cost / 100)} SP`;
  }
  else {
    return '-';
  }
}

export {
  customPersonaList,
  special2Combos,
  getResultArcana,
  calculateFullPersonaList,
};