import test from 'node:test';
import assert from 'node:assert/strict';
import {original,validateCalendar} from '../src/data.js';
test('built-in calendar has 31 complete tasks',()=>{assert.equal(original.days.length,31);for(const d of original.days){assert.ok(d.title);assert.ok(d.text);assert.ok(d.icon)}});
test('import produces a separate custom calendar',()=>{const copy=validateCalendar(original);assert.equal(copy.id,'custom');copy.days[0].title='Changed';assert.notEqual(original.days[0].title,'Changed')});
test('rejects invalid and oversized imports',()=>{for(const input of [null,{}, {title:'',days:[]},{title:'x',days:Array(32).fill({title:'a',text:''})},{title:'x',days:[{title:'x',text:2}]}])assert.throws(()=>validateCalendar(input))});
test('accepts a one-day calendar and supplies defaults',()=>{const c=validateCalendar({title:'  Мой календарь  ',days:[{title:'Чай',text:'Приготовить чай'}]});assert.equal(c.title,'Мой календарь');assert.equal(c.days[0].icon,'✦');assert.equal(c.description,'')});
