function characterInfo() {
  elf.info();
  orc.info();
  tv("\n");
}

/* 골드  */
function getReward() {
  elf.gold = elf.gold + orc.gold;
  tv(orc.gold + "골드를 얻었습니다.\n")
}

/* 공격력 (랜덤) */
function getRandomAttackValue(attack) {
  attack = attack + 1;
  var random = Math.floor(Math.random() * attack);
  return random;
}

function endBattle() {
  tv("\n전투 종료\n");
  elf.currentExp = elf.currentExp + orc.exp;
  tv(orc.name + "가 " + elf.name + "에게 경험치 " + orc.exp + "을 주고 죽었습니다.\n")
  getReward();
  currentMode = "대기"
  tvGameObjectClear();
}


/* 전투 정보 */
function procBattleTurn() {

  var monsterAttack = getRandomAttackValue(orc.attack);
  var characterAttack = getRandomAttackValue(elf.attack);

  orc.currentHp = orc.currentHp - characterAttack;
  tv(orc.name + "가 " + elf.name + "에게 " + characterAttack + "의 피해를 받았습니다.\n")
  elf.currentHp = elf.currentHp - monsterAttack;
  tv(elf.name + "가 " + orc.name + "에게 " + monsterAttack + "의 피해를 받았습니다.\n")

  if (orc.currentHp <= 0 || elf.currentHp <= 0) {
    characterInfo();
    endBattle();
    return false;
  }
  else {
    characterInfo();
    return true;
  }
}

function turn() {
  if (currentMode == "전투") {
    procBattleTurn();
  } else {
    procNormalTurn();
  }
  turnCount++;
  itTurn.value = turnCount;
  console.log("현재 턴 : " + turnCount);
}


function procNormalTurn() {
  tv("특별한 것은 보이지 않는다.\n");
}

function screenMessageBoxScrollToBot() {
  screenMessageBox.scrollTop = screenMessageBox.scrollHeight;
}

function moveEast() {
  tv("동쪽으로 이동");
  turn();
}
function moveWest() {
  tv("서쪽으로 이동");
  turn();
}
function moveNorth() {
  tv("남쪽으로 이동");
  turn();
}
function moveSouth() {
  tv("북쪽으로 이동");
  turn();
}
function moveUp() {
  tv("위쪽으로 이동");
  turn();
}
function moveDown() {
  tv("아래쪽으로 이동");
  turn();
}

function getCurrentRoomObject() {
  for (var i = 0; i < roomArray.length; i++) {
    if (roomArray[i].id == currentRoomId) {
      return roomArray[i];
    }
  }
}
function displayRoomInfo() {
  getCurrentRoomObject().displayRoomInfo();
}