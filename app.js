new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    display: false,
    attacks: [],
  },
  computed: {},
  watch: {},
  methods: {
    startGame: function () {
      this.display = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.attacks = [];
    },
    firstAttack: function () {
      let damage = this.calDamage(7, 12);
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      
      damage = this.calDamage(2, 7);
      this.playerHealth -= damage;
      this.checkWin();
    
      this.attacks.push({
        isPlayer:true,
        text: `PLAYER HITS MONSTER FOR ${damage}`
      });
      this.constantMonsterAttack();

    },
    specialAttack: function () {
      let damage = this.calDamage(10, 20);
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }

      this.constantMonsterAttack();

      this.attacks.push({
        isPlayer:true,
        text: `PLAYER HITS MONSTER HARD FOR ${damage}`
      });
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.constantMonsterAttack();
      this.attacks.push({
        isPlayer:true,
        text: `PLAYER HITS MONSTER AND HEAL FOR 10`
      });
    },
    giveUp: function () {
      this.display = false;
      this.attacks = [];
    },
    constantMonsterAttack: function () {
      damage = this.calDamage(2, 7);
      this.playerHealth -= damage;
      this.checkWin();

      this.attacks.push({
        isPlayer:false,
        text: `MONSTER HITS PLAYER FOR  ${damage}`
        // \n PLAYER HITS MONSTER FOR ${damage}`
      });
    },
    calDamage: function (min, max) {
      return (damage = Math.max(Math.floor(Math.random() * max) + 1, min));
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("Nice, you won. New game?")) {
          this.startGame();
          this.attacks = [];
        } else {
          this.display = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("Opsss, you lost")) {
          this.startGame();
          this.attacks = [];
        } else {
          this.display = false;
        }
        return true;
      }
      return false;
    },
  },
});
