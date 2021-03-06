import * as actionFSM from './state-machines/actionFSM';
import * as aimFSM from './state-machines/aimFSM';
import * as lockFSM from './state-machines/lockFSM';
import * as actorInput from './actor/input';
import * as actorUI from './actor/ui';

export function createActor(game, id, x, y, is_dummy = false) {
  let new_actor = game.physics.add.group();
  new_actor.id = id;
  new_actor.x = x;
  new_actor.y = y;
  new_actor.is_dummy = is_dummy;
  new_actor.speed = 150;
  new_actor.run_multiplier = 1.4;
  new_actor.dodge_multiplier = 3;
  new_actor.reach = 2;
  new_actor.facingRight = true;
  new_actor.health = {
    value: 5,
    text: game.add.text(450, 50 + (id * 25), `Player ${id} Health: 5`, { font: '16px Courier', fill: '#00ff00' }),
  };
  new_actor.attack_strength = {
    light_attacking: 1,
    heavy_attacking: 2,
  };

  // controls
  new_actor.input = actorInput.createInput(game, new_actor);
  // ui
  new_actor.ui = actorUI.createUI(game, new_actor, new_actor.x, new_actor.y);
  new_actor.ui.init(new_actor);
  // state machines
  new_actor.states = {
    actions: new actionFSM.FSM({actor: new_actor}),
    aim: new aimFSM.FSM,
    lock: new lockFSM.FSM,
  }
  // update
  new_actor.update = (game) => {
    new_actor.input.update(new_actor);
    // new_actor.ui.update(new_actor);

    switch (new_actor.states.lock.state) {
      case 'locked':
        lockFSM.locked(new_actor);
        break;
      case 'unlocked':
        lockFSM.unlocked(new_actor);
        if (!new_actor.states.aim.is('up')) { new_actor.states.aim.aimUp(); }
        break;
    }

    let currentState = new_actor.states.actions.state;
    // console.log(currentState)
    switch (currentState) {
      case 'standing':
        actionFSM[currentState](new_actor);
        break;
      case 'moving':
        actionFSM[currentState](new_actor);
        break;
      case 'light_attacking':
        if (new_actor.is_dummy) { new_actor.states.actions.stand(); }
        actionFSM[currentState](new_actor);
        break;
      case 'heavy_attacking':
        if (new_actor.is_dummy) { new_actor.states.actions.stand(); }
        actionFSM[currentState](new_actor);
        break;
      case 'taking_hit':
        actionFSM[currentState](new_actor);
        break;
      case 'taking_parry':
        actionFSM[currentState](new_actor);
        break;
      case 'taking_parry_stance':
        actionFSM[currentState](new_actor);
        break;
      case 'parrying':
        actionFSM[currentState](new_actor);
        break;
      case 'blocking':
        actionFSM[currentState](new_actor);
        break;
      case 'dodging':
        actionFSM[currentState](new_actor);
        break;
      case 'dodge_recovering':
        actionFSM[currentState](new_actor);
        break;
      case 'rolling':
        actionFSM[currentState](new_actor);
        break;
      case 'dead':
        actionFSM[currentState](new_actor);
        break;
    }

    actionFSM.global(new_actor);

    if (new_actor.states.lock.is('locked')) {
      switch (new_actor.states.aim.state) {
        case 'up':
          aimFSM.aimingUp(game, 'up', new_actor);
          break;
        case 'left':
          aimFSM.aimingLeft(game, 'left', new_actor);
          break;
        case 'right':
          aimFSM.aimingRight(game, 'right', new_actor);
          break;
      }
    }

  }
  //end update
  return new_actor;
};
