<template>
    <div class="card">
      <div class="card-background">
        <div class="card-frame">
          <div class="frame-header">
            <h1 class="frame-header--name">Rotting Regisaur</h1>
            <div class="icon-container">
              <i class="ms ms-2" id="mana-cost"></i>
              <i class="ms ms-b" id="mana-symbol"></i>
            </div>
          </div>
          <img src="https://github.com/ChristopherDalziel/Vanilla-JS-Projects/blob/master/magicCard/assets/card-art.jpg?raw=true" class="card-artwork" />

          <h2 class="frame-header--sub">
            Creature — Zombie Dinosaur
            <span class="frame-header--sub__set-icon">
              <div class="frame-header--sub__set-icon--letter">M</div>
              <div class="frame-header--sub__set-icon--number">20</div></span
            >
          </h2>

          <div class="card-frame-text-area">
            <p class="card-frame-description">
              At the beginning of your upkeep,
              <br />discard a card
            </p>
            <div class="card-frame-description-break"></div>
            <p class="card-frame-description-quote">
              "Now, that's a zombie!"
              <br />
              — Modriss of Zargoth Fen
            </p>
            <span class="card-frame-hp-container">
              <div class="card-info--right__hp">7/6</div>
            </span>
          </div>

          <div class="card-info">
            <div class="card-info--left">
              <p>111/280 R</p>
              <p>
                M20 - EN
                <img
                  class="paintbrush"
                  src="https://image.ibb.co/e2VxAS/paintbrush_white.png"
                  alt="paintbrush icon"
                />
                Randy Vargas
              </p>
            </div>

            <div class="card-info--center__orb"></div>
            <div class="card-info--right">™ & © 2019 Wizards of the Coast</div>
          </div>
        </div>
      </div>
    </div>

</template>

<style lang="scss" scoped>
$card-border-color: #181411;
$border-color: #313131;
$frame-color: #e1e0e5;
$header-background-color: #b3aeb2;
$text-area-texture-color: #edecf1;
$background-texture: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
  url("https://github.com/ChristopherDalziel/Vanilla-JS-Projects/blob/master/magicCard/assets/texture.jpg?raw=true");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card {
  border: 1px solid $border-color;
  width: 500px;
  height: 696px;
  margin: 0 auto;
  margin-top: 56px;
  border-radius: 25px;
  box-shadow: -8px 9px 16px -3px #000;
  background-color: $card-border-color;

  &-background {
    background-image: url("https://github.com/ChristopherDalziel/Vanilla-JS-Projects/blob/master/magicCard/assets/mtg-black-background.jpg?raw=true");
    background-size: auto 696px;
    background-repeat: no-repeat;
    height: 90%;
    margin: 20px;
    border-radius: 10px 10px 25px 25px;
  }

  &-frame {
    z-index: 1;
    position: relative;
    height: 110%;
    max-width: 96%;
    left: 2%;
    top: 0.5%;
    right: 2%;
    display: flex;
    flex-direction: column;

    &-text-area {
      margin: 0 auto;
      width: 97.5%;
      font-size: 24px;
      height: 35%;
      border: 1px solid $border-color;
      background-image: url("https://github.com/ChristopherDalziel/Vanilla-JS-Projects/blob/master/magicCard/assets/texture.jpg?raw=trueg");
      background-repeat: repeat-y;
      box-shadow: 0 0 0 5px $border-color, -3px 3px 2px 5px #000;
    }

    &-description {
      margin: 14% 0 0 2%;

      &-break {
        margin: 1% 2%;
        height: 1px;
        background: $border-color;
        background: -webkit-gradient(
          linear,
          0 0,
          100% 0,
          from(#eee),
          to(#eee),
          color-stop(50%, $border-color)
        );
      }

      &-quote {
        font-style: italic;
        margin: 1% 0 0 2%;
      }
    }

    &-hp-container {
      display: flex;
      justify-content: flex-end;
      z-index: 1;
      width: 102%;
    }
  }

  &-artwork {
    z-index: -1;
    text-align: center;
    margin: 0 auto;
    width: 97.5%;
    max-height: 55%;
    overflow: hidden;
    border-left: 2px solid #000;
    border-bottom: 6px solid #000;
    box-shadow: 0 0 0 5px $border-color, -3px 3px 2px 5px #000;
  }

  &-info {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 900px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #eee;
    width: 100%;

    &--left {
      margin-top: 2.5%;
      font-size: 10px;
    }

    &--center {
      &__orb {
        border-radius: 60%;
        flex-basis: 41px;
        height: 21px;
        position: relative;
        bottom: 11px;
        z-index: 2;
        background-color: #000;
        background-image: url("https://github.com/ChristopherDalziel/Vanilla-JS-Projects/blob/master/magicCard/assets/holo.png?raw=true");
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: 0 0 0 4px #171314;
      }
    }

    &--right {
      margin-top: 4.75%;
      font-size: 10px;

      &__hp {
        display: flex;
        justify-content: center;
        font-family: "Beleren Bold";
        margin: 9.9% 0 0 0;
        border: 1px solid $border-color;
        border-radius: 18px/40px;
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.4)
          ),
          url("https://github.com/ChristopherDalziel/Vanilla-JS-Projects/blob/master/magicCard/assets/texture.jpg?raw=true");
        padding: 2px 10px;
        width: 65px;
        height: 31px;
        box-shadow: inset -2px 2px 1px $border-color, inset 1px -1px 0 #fff;
        z-index: 2;
      }
    }
  }
}

.icon-container {
  display: flex;
}

.frame-header {
  font-family: "Beleren Bold";
  display: flex;
  justify-content: space-between;
  border-left: 2px solid $border-color;
  border-top: 1px solid $border-color;
  border-right: 1px solid $border-color;
  margin-top: 6px;
  border-radius: 18px/40px;
  padding-left: 10px;
  background-image: $background-texture;
  box-shadow: 0 0 0 2px #000, 0 0 0 5px $border-color, -3px 3px 2px 5px #000;

  &--name {
  }

  &--sub {
    z-index: 1;
    font-family: "Beleren Bold";
    font-size: 20px;
    height: 31px;
    border-left: 2px solid $border-color;
    border-top: 1px solid $border-color;
    border-right: 1px solid $border-color;
    border-radius: 18px/40px;
    background-image: $background-texture;
    padding: 10px 5px 7px 5px;
    box-shadow: 0 0 0 5px $border-color, -3px 3px 2px 5px #000;

    &__set-icon {
      display: flex;
      justify-content: flex-end;
      width: 53px;
      height: 25px;
      font-family: "Beleren Bold";
      font-size: 23px;
      border: 1px solid $border-color;
      border-radius: 18px/40px;
      margin: 5px 0;
      padding: 0 3px;
      background: rgb(0, 0, 0);
      background: linear-gradient(
        117deg,
        rgba(0, 0, 0, 0.8533788515406162) 0%,
        rgba(226, 209, 87, 1) 35%,
        rgba(226, 209, 87, 1) 72%,
        rgba(0, 0, 0, 0.8337710084033614) 100%
      );

      &__letter {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 4px;
        padding-right: 1px;
        transform: scale(1.3, 1);
      }

      &__number {
        font-size: 17px;
      }
    }
  }
}

#mana-symbol,
#mana-cost {
  font-size: 18px;
  padding: 0px 2px;
  background: #c5c0c6;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: -0.05em 0.12em 0px 0 black;
  margin-right: 5px;
  height: 20px;
  align-self: center;
}

.paintbrush {
  max-width: 10px;
}

</style>