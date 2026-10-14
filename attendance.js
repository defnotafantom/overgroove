/** Calcola le disponibilità dei membri attuali, ignorando dati salvati incoerenti. */
function computeDayStats(votes, members, slots) {
  const tallies = Object.fromEntries(slots.map((slot) => [slot, 0]));
  const usersInSlot = Object.fromEntries(slots.map((slot) => [slot, []]));
  const validSlots = new Set(slots);
  const activeMembers = new Set(members.map((member) => member.name).filter(Boolean));
  const votedMembersList = [];
  const savedVotes = votes && typeof votes === 'object' ? votes : {};

  for (const name of activeMembers) {
    const saved = savedVotes[name];
    const selected = Array.isArray(saved) ? [...new Set(saved.filter((slot) => validSlots.has(slot)))] : [];
    if (!selected.length) continue;
    votedMembersList.push(name);
    for (const slot of selected) {
      tallies[slot] += 1;
      usersInSlot[slot].push(name);
    }
  }

  let bestSlot = null;
  let maxVotes = 0;
  for (const slot of slots) {
    if (tallies[slot] > maxVotes) {
      maxVotes = tallies[slot];
      bestSlot = slot;
    }
  }
  const totalVoted = votedMembersList.length;
  const status = totalVoted === 0 ? 'pending' : maxVotes >= Math.ceil(activeMembers.size / 2) ? 'go' : 'no';
  return { status, bestSlot, maxVotes, totalVoted, votedMembersList, tallies, usersInSlot };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { computeDayStats };
