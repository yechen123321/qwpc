<template>
  <div class="cont">
    <div data-target="1" class="slide slide--1">
      <div class="slide__text slide__text--1">quis risus</div>
      <div class="slide__bg"></div>
      <div class="slide__img">
        <div class="slide__close"></div>
        <div class="slide__img-wrapper"></div>
      </div>
      <div class="slide__bg-dark"></div>
      <a
        href="https://twitter.com/mrspok407"
        target="_blank"
        class="icon-link icon-link--twitter"
      >
      </a>
    </div>

    <div data-target="2" class="slide slide--2">
      <div class="slide__text">Lorem ipsum</div>
      <div class="slide__bg"></div>
      <div class="slide__img">
        <div class="slide__close"></div>
        <div class="slide__img-wrapper"></div>
      </div>
      <div class="slide__bg-dark"></div>
      <a
        href="https://twitter.com/mrspok407"
        target="_blank"
        class="icon-link icon-link--twitter"
      >
      </a>
    </div>

    <div data-target="3" class="slide slide--3">
      <div class="slide__text">Sed tincidunt</div>
      <div class="slide__bg"></div>
      <div class="slide__img">
        <div class="slide__close"></div>
        <div class="slide__img-wrapper"></div>
      </div>
      <div class="slide__bg-dark"></div>
      <a
        href="https://twitter.com/mrspok407"
        target="_blank"
        class="icon-link icon-link--twitter"
      >
      </a>
    </div>

    <div data-target="4" class="slide slide--4">
      <div class="slide__text">Vivamus dui</div>
      <div class="slide__bg"></div>
      <div class="slide__img">
        <div class="slide__close"></div>
        <div class="slide__img-wrapper"></div>
      </div>
      <div class="slide__bg-dark"></div>
      <a
        href="https://twitter.com/mrspok407"
        target="_blank"
        class="icon-link icon-link--twitter"
      >
      </a>
    </div>

    <div data-target="5" class="slide slide--5">
      <div class="slide__text">Viva</div>
      <div class="slide__bg"></div>
      <div class="slide__img">
        <div class="slide__close"></div>
        <div class="slide__img-wrapper"></div>
      </div>
      <div class="slide__bg-dark"></div>
      <a
        href="https://twitter.com/mrspok407"
        target="_blank"
        class="icon-link icon-link--twitter"
      >
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$grayBg: #161616;

$numSlides: 5;
$imgDist: -150 * 1px;

$bgSpd: 950 * 1ms;
$imgSpd: 2000 * 1ms;

$bgPics: (
  url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/snow-forest.jpg")
    center center no-repeat,
  url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/desert.jpg") center
    center no-repeat,
  url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/lonely-tree.jpg")
    center center no-repeat,
  url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/road.jpeg") center
    center no-repeat,
  url("https://www.nps.gov/lacl/learn/nature/images/Mountains-page_-Image-w-cred-cap_-1200w_-Neacola-CRL00222_3.jpg")
    center center no-repeat
);

@mixin mediaMaxW($width) {
  @media screen and (max-width: $width) {
    @content;
  }
}

.cont {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
  overflow: hidden;
  cursor: pointer;
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: center left;
    width: 100%;
    height: 100%;
    background-color: $grayBg;
    z-index: 1;
    transition: $bgSpd;
    will-change: transform;
  }

  &__img {
    position: relative;
    height: 100%;

    &-wrapper {
      position: absolute;
      top: -10%;
      left: -10%;
      width: 125%;
      height: 120%;
      transform: translate3d(0, 0, 0);
      transition: $bgSpd;
      will-change: transform;
    }
  }
  &__close {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 100px;
    height: 100px;
    z-index: 0;
    opacity: 0;
    cursor: pointer;
    transition: opacity 200ms, z-index 0ms 200ms;
    &:after,
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 115px;
      height: 20px;
      border-radius: 20px;
      background-color: #fff;
      transition: 500ms 500ms;
      @include mediaMaxW(960px) {
        width: 75px;
        height: 15px;
      }
    }
    &:after {
      transform-origin: center left;
      transform: rotate(45deg) scale(0, 0);
    }
    &:before {
      left: -33px;
      transform-origin: center right;
      transform: rotate(-45deg) scale(0, 0);
      transition: 500ms 650ms;
      @include mediaMaxW(960px) {
        left: -21px;
      }
    }
  }
  &__bg-dark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 350ms;
    z-index: 2;
  }
  &__text {
    position: absolute;
    top: 50%;
    left: 5%;
    width: 23%;
    text-transform: uppercase;
    word-wrap: break-word;
    color: #fff;
    font: {
      size: 45px;
      weight: 800;
    }
    transform: translate3d(0, -50%, 0) rotate(0.01deg);
    will-change: transform, opacity;
    transition: 750ms;
    opacity: 0;
    z-index: 1;
    @include mediaMaxW(960px) {
      font: {
        size: 30px;
      }
    }
    &--1 {
      left: 8%;
    }
  }
}

.slide {
  left: 100%;
}

@each $item in $bgPics {
  $i: index($bgPics, $item);
  .slide--#{$i} {
    z-index: $i - 1;
    .slide__img-wrapper {
      background: $item;
      background-size: cover;
    }
  }
}

.icon-link--twitter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  opacity: 0;
  z-index: -1;

  img {
    width: 100%;
  }
}

.icon-show {
  opacity: 1;
  z-index: 5;
}

.active {
  .slide--1 {
    .slide__bg {
      transform: scale(0, 1);
      transition: $bgSpd;
    }
    .slide__img-wrapper {
      transform: translate3d($imgDist, 0, 0);
      transition: $imgSpd;
    }
  }
  @for $i from 1 through $numSlides {
    .slide--#{$i} {
      transform: translate3d(
        (-100% / $numSlides) * ($numSlides - ($i - 1)),
        0,
        0
      );
      transition: transform $bgSpd $bgSpd * (($i - 1) * 1.3);
      .slide__bg {
        transform: scale(0, 1);
        transition: $bgSpd * 2 $bgSpd * (($i - 1) * 1.3);
      }
      .slide__img-wrapper {
        transform: translate3d($imgDist, 0, 0);
        transition: $imgSpd $bgSpd * (($i - 1) * 1.3);
      }
    }
  }
}

.show-close {
  z-index: 4;
  opacity: 1;
  &:after {
    transform: rotate(45deg) scale(1, 1);
  }
  &:before {
    transform: rotate(-45deg) scale(1, 1);
  }
}

html {
  box-sizing: border-box;
  font-family: "Open-Sans", sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}
</style>


<script>
import $ from 'jquery';
$(document).ready(function() {
	const $cont = $('.cont');
	const $slide = $('.slide');
	const $closeBtn = $('.slide__close')
	const $text = $('.slide__text');
	const $iconTwitter = $('.icon-link--twitter');
	const numSlides = 5;
	const initialAnimDur = 7131;
	const animDelay = 1000;
	let initialAnim = true;
	let clickAnim = false;
	
	$(document).on('click', '.slide__bg-dark', function() {
		if (initialAnim || clickAnim) return;
		let _this = $(this).parent();
		let target = +_this.attr('data-target');
		clickAnim = true;
		
		_this.css({
			'transform': 'translate3d(-100%, 0, 0)',
			'transition': '750ms',
			'cursor': 'default'
		})
		
		_this.find('.slide__img-wrapper').css({
			'transform': 'translate3d(0, 0, 0) scale(.95, .95)',
			'transition': '2000ms'
		})
		
		for(let i = target, length = $slide.length; i < length; i++) {
			$('.slide--' + (i + 1)).css({
				'transform': 'translate3d(0, 0, 0)',
				'transition': '750ms'
			})
		}
		
		for(let i = target, length = $slide.length; i > 1; i--) {
			$('.slide--' + (i - 1)).css({
				'transform': 'translate3d(-150%, 0, 0)',
				'transition': '750ms'
			})
		}
		
		setTimeout(function() {
			$slide.not(_this).find('.slide__bg-dark').css({
				'opacity': '0'
			})
		}, 750)
		
		$closeBtn.addClass('show-close');
		$iconTwitter.addClass('icon-show');
		
		_this.find('.slide__text').css({
			'transform': 'translate3d(150px, -40%, 0)',
			'opacity': '1',
			'transition': '2000ms',
			'-webkit-transition': '2000ms'
		})
	});

	$(document).on('mousemove', '.slide', function() {
		if(initialAnim || clickAnim) return;
		let _this = $(this);
		let target = +_this.attr('data-target');
		
		_this.css({
			'transform': 'translate3d(-' + (((100 / numSlides) * (numSlides - (target - 1))) + 5) + '%, 0, 0)',
			'transition': '750ms'
		})
		
		_this.find('.slide__text').css({
			'transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
			'-moz-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
			'opacity': '1',
			'transition': '750ms',
			'-webkit-transition': '750ms'
		})

		for(let i = target, length = $slide.length; i < length; i++) {
			$('.slide--' + (i + 1)).css({
				'transform': 'translate3d(-' + (((100 / numSlides) * (numSlides - ((i + 1) - 1))) - 5) + '%, 0, 0)',
				'transition': '750ms'
			})
		}

		for(let i = target; i > 1; i--) {
			$('.slide--' + (i - 1)).css({
				'transform': 'translate3d(-' + (((100 / numSlides) * (numSlides - ((i - 1) - 1))) + 5) + '%, 0, 0)',
				'transition': '750ms'
			})
		}
		
		_this.find('.slide__img-wrapper').css({
			'transform': 'translate3d(-200px, 0, 0) scale(.85, .85)',
			'transition': '750ms'
		})
		
		$slide.not(_this).find('.slide__img-wrapper').css({
			'transform': 'translate3d(-200px, 0, 0) scale(.90, .90)',
			'transition': '1000ms'
		})
		
		$slide.not(_this).find('.slide__bg-dark').css({
			'opacity': '.75'
		})
	});
	
	$(document).on('mouseleave', '.slide', function() {
		if(initialAnim || clickAnim) return;
		let _this = $(this);
		let target = +_this.attr('data-target');
		
		for(let i = 1, length = $slide.length; i <= length; i++) {
			$('.slide--' + i).css({
				'transform': 'translate3d(-' + (100 / numSlides) * (numSlides - (i - 1)) + '%, 0, 0)',
				'transition': '1000ms'
			})
		}
		
		$slide.find('.slide__img-wrapper').css({
			'transform': 'translate3d(-200px, 0, 0) scale(1, 1)',
			'transition': '750ms'
		})
		
		$slide.find('.slide__bg-dark').css({
			'opacity': '0'
		})
		
		$text.css({
			'transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
			'opacity': '0',
			'transition': '200ms',
			'-webkit-transition': '200ms'
		})
	});
	
	$(document).on('click', '.slide__close', function() {
		
		setTimeout(function() {
			clickAnim = false;
		}, 1000);
		
		$closeBtn.removeClass('show-close');
		$iconTwitter.removeClass('icon-show');
		
		for(let i = 1, length = $slide.length; i <= length; i++) {
			$('.slide--' + i).css({
				'transform': 'translate3d(-' + (100 / numSlides) * (numSlides - (i - 1)) + '%, 0, 0)',
				'transition': '1000ms',
				'cursor': 'pointer'
			})
		}
		
		$text.css({
			'transform': 'translate3d(150px, -40%, 0)',
			'opacity': '0',
			'transition': '200ms',
			'-webkit-transition': '200ms'
		})
		
		setTimeout(function() {
			$text.css({
				'transform': 'translate3d(0, -50%, 0)'
			})
		}, 200)
	})
	
	setTimeout(function() {
		$cont.addClass('active');
	}, animDelay);
	
	setTimeout(function() {
		initialAnim = false;
	}, initialAnimDur + animDelay);
	
});
</script>