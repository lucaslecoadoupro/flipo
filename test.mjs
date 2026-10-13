// Vérifie les fonctions pures d'index.html : node test.mjs
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const core=html.slice(html.indexOf('/* CORE START'),html.indexOf('/* CORE END'));
const COLOR_KEYS=['teal','blue'];
const f=new Function('COLOR_KEYS',core+';return {parseCSV,csvCards,parseCards,toRaw,grade,mergeImport,groupByDeck};')(COLOR_KEYS);

// CSV : ; Excel FR, BOM, guillemets, retour à la ligne dans une cellule, en-têtes dans le désordre
let rows=f.parseCSV('﻿verso;Recto;Catégorie\r\n"Prise de la ""Bastille""";1789;Dates\r\n"deux\nlignes";X;\r\n;vide;\n');
assert.deepEqual(rows[1],['Prise de la "Bastille"','1789','Dates']);
assert.equal(rows[2][0],'deux\nlignes');
let p=f.csvCards(rows);
assert.equal(p.cards.length,2);
assert.equal(p.cards[0].q,'1789');assert.equal(p.cards[0].a,'Prise de la "Bastille"');assert.equal(p.cards[0].cat,'Dates');
assert.deepEqual(p.errs,[4]);
// Sans en-tête, séparateur virgule
p=f.csvCards(f.parseCSV('dog,chien\ncat,chat,"a, b"\n'));
assert.equal(p.cards.length,2);assert.equal(p.cards[1].ex,'a, b');assert.equal(p.hasDeck,false);
// Colonne paquet → plusieurs paquets
p=f.csvCards(f.parseCSV('paquet\trecto\tverso\tclasse\nA\t1\tun\t4e\nB\t2\tdeux\t\nA\t3\ttrois\t\n'));
let g=f.groupByDeck(p.cards,'');
assert.deepEqual(g.map(x=>[x.title,x.cards.length,x.level]),[['A',2,'4e'],['B',1,'']]);

// Fusion : ajout au paquet existant du même prof, pas à celui d'un collègue, sans doublon
const decks=[{id:'a',title:'A',owner:'moi',cards:[{q:'1',a:'un'}]},{id:'b',title:'B',owner:'collegue',cards:[]}];
const res=f.mergeImport(decks,g,'moi');
assert.equal(decks[0].cards.length,2);
assert.equal(decks[1].cards.length,0);
assert.equal(decks.length,3);assert.equal(decks[2].id,'b-2');assert.equal(decks[2].published,false);assert.equal(decks[2].owner,'moi');
assert.deepEqual(res.map(r=>[r.isNew,r.added,r.skipped]),[[false,1,1],[true,1,0]]);

// Saisie texte, aller-retour
const t=f.parseCards('## Dates\n1789 = Prise | 14 juillet\nbizarre\n1789 = doublon\nA = B = C');
assert.equal(t.ok.length,3);assert.equal(t.errs.length,1);assert.deepEqual(t.dups,['1789']);
assert.equal(t.ok[2].a,'B = C');
assert.deepEqual(f.parseCards(f.toRaw(t.ok)).ok,t.ok);

// Correction
assert.equal(f.grade('el movil','el móvil',true).r,'accent');
assert.equal(f.grade('el movil','el móvil',false).r,'ok');
assert.equal(f.grade('móvil','el móvil / el celular',true).r,'accent');
assert.equal(f.grade('el celular','el móvil / el celular',true).r,'ok');
assert.equal(f.grade('ordinateur',"l'ordinateur",false).r,'accent');
assert.equal(f.grade('chat','chien',false).r,'ko');
console.log('OK');
