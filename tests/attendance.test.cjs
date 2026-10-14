const test = require('node:test');
const assert = require('node:assert/strict');
const { computeDayStats } = require('../attendance.js');
const members = ['A','B','C','D'].map(name => ({name}));
const slots = ['18:00','19:00'];
test('senza disponibilità valide la giornata resta in attesa',()=>{
 for(const votes of [{},null,{A:['inesistente']},{A:'18:00'}]){
  const result=computeDayStats(votes,members,slots);assert.equal(result.status,'pending');assert.equal(result.totalVoted,0);
 }
});
test('due persone su quattro confermano la stessa fascia; una sola non basta',()=>{
 assert.equal(computeDayStats({A:['18:00']},members,slots).status,'no');
 const result=computeDayStats({A:['18:00'],B:['18:00'],C:['19:00']},members,slots);
 assert.equal(result.status,'go');assert.equal(result.bestSlot,'18:00');assert.equal(result.maxVotes,2);assert.equal(result.totalVoted,3);
});
test('voti di membri rimossi e duplicati non possono creare una maggioranza',()=>{
 const result=computeDayStats({A:['18:00','18:00'],ExMembro:['18:00']},members,slots);
 assert.equal(result.status,'no');assert.equal(result.maxVotes,1);assert.deepEqual(result.usersInSlot['18:00'],['A']);
});
test('un pareggio mantiene l’ordine delle fasce e conta le persone una volta',()=>{
 const result=computeDayStats({A:slots,B:slots},members,slots);
 assert.equal(result.bestSlot,'18:00');assert.equal(result.totalVoted,2);assert.equal(result.maxVotes,2);
});
