$(document).ready(function() {

    // for mobile navigation
    var currentVisibleLevel;
    var LEVEL2 = 2;
    var LEVEL3 = 3;

	  /* **************************************************************************
    * Registration to DOM events
    ****************************************************************************/


		$(".nav-top-level-item").click(function() {  				
      console.debug(".nav-top-level-item clicked");
			if (isMobile()) {
        navigateFrom1stLevelTo2ndLevel($(this));
        if ($( this ).hasClass("is-active")) {
					console.debug("1st level item is active, 2nd level items are visible");
          return;
				}
			}
			console.debug("1st level item clicked");
  		$( this ).siblings().removeClass("is-active");      	
  		$( this ).siblings().removeClass("is-visible");
  		$( this ).toggleClass( "is-active" );
		});  

		if (isDesktop()) {
			console.debug("I'm desktop");
			preventHiding2ndLevelContainerOnClick();	 
      registerMouseoverEventFor2ndLevelWrapper
      handleMouseEventsWhileHoveringOverSecundaryTeaser(); 				
			handleButtonClick2ndLevelContainer();
			hide2ndLevelContainerOnClickOutsideOfComponent();
			registerMouseEventsForListInteraction();
      register2ndLevelListItemsMouseover();
		}
		else {
			console.debug("I'm mobile");
			registerClickEventBackButton();
			registerEventsForBurgerButton();
      preventNormalURLHandlingOn2ndLevelListItemClick();
			register2ndLevelListItemsClick();
		}

		/* 
		Prevent hiding 2nd level container to disapear when user clicks 
		outside of list items.
		*/
		function preventHiding2ndLevelContainerOnClick() {
			console.debug("preventHiding2ndLevelContainerOnClick");
			$(".nav-2nd-level-items-wrapper").click(function(e){
				e.stopPropagation(); 
		   });
		}

    /* 
    Stop bubbling of mouseover events while user is hovering over teaser.
    */
    function handleMouseEventsWhileHoveringOverSecundaryTeaser() {
      console.debug("handleMouseEventsWhileHoveringOverSecundaryTeaser");
      $(".nav-3rd-level-secundary-teaser.is-visible").mouseover(function(event) {
        console.debug("skip mouseover events of secundary teaser");
        event.stopPropagation();
      });
    }

		function removeIsActiveStateFromTopLevelItems() {
			console.debug("removeIsActiveStateFromTopLevelItems");
			var $topLevelItem = $(".nav-top-level-item");
			$topLevelItem.removeClass("is-active");	
		}

// TODO refactoring naming conventions register ...
		function handleButtonClick2ndLevelContainer() {
			console.debug("handleButtonClick2ndLevelContainer");
			$(".nav-hide-2nd-level-container-button").click(function() {
				removeIsActiveStateFromTopLevelItems();
			});
		}  		

		/*
	   If user clicks outside of the actual component, hide the 
	   2nd level container.
		*/
		function hide2ndLevelContainerOnClickOutsideOfComponent() {
			console.debug("hide2ndLevelContainerOnClickOutsideOfComponent");
			$(document).mouseup(function (e)
			{
			    var container = $(".nav-container");

			    if (!container.is(e.target) // if the target of the click isn't the container...
			        && container.has(e.target).length === 0) // ... nor a descendant of the container
			    {
			        removeIsActiveStateFromTopLevelItems();
			    }
			});
		}

    function registerMouseoverEventFor2ndLevelWrapper() {
      console.debug("registerMouseoverEventFor2ndLevelWrapper");
      $(".nav-2nd-level-items-wrapper").mouseover(function(event) {
        if (event.target !== this) return;
        showSecundaryTeaserAndHide3rdLevelList();
      });
    }

		function registerMouseEventsForListInteraction() {
			console.debug("registerMouseEventsForListInteraction");
			$(".nav-2nd-level-items").mouseover(function() {
        $this = $(this);
				console.debug("mouse over 2nd level items " + _getClassesString($this))
			  if ($(".nav-top-level-item.is-active .nav-3rd-level-secundary-teaser").hasClass("is-visible"))  {
				 hideSecundaryTeaserAndShow3rdLevelList();
			  }		
			});
			$(".nav-2nd-level-items").mouseleave(function(event) {
				var $newElement = $(event.toElement || event.relatedTarget);
				console.debug("mouse leave 2nd level items, classes: " + _getClassesString($newElement));
			   	if (!$newElement.hasClass(".nav-2nd-level-items")) {
			     console.debug("mouse leave of 2nd level list items");
			     showSecundaryTeaserAndHide3rdLevelList();
			    }
			});
		}

    function showSecundaryTeaserAndHide3rdLevelList() {
      console.debug("showSecundaryTeaserAndHide3rdLevelList");
      $(".nav-top-level-item.is-active .nav-3rd-level-items").removeClass("is-visible");
      $(".nav-top-level-item.is-active .nav-3rd-level-secundary-teaser").addClass("is-visible");
    }

    function hideSecundaryTeaserAndShow3rdLevelList() {
      console.debug("hideSecundaryTeaserAndShow3rdLevelList");
      $(".nav-top-level-item.is-active .nav-3rd-level-items").addClass( "is-visible");
      $(".nav-top-level-item.is-active .nav-3rd-level-secundary-teaser").removeClass( "is-visible");
    }

    function registerEventsForBurgerButton() {
      console.debug("registerEventsForBurgerButton");
      $(".nav-top-level-burger").click(function() {
          $(".nav-top-level-items").toggleClass("is-visible");
          $(".nav-top-level-burger").toggleClass("is-active");
        });
    }

		function registerClickEventBackButton() {
			console.debug("registerClickEventBackButton");
			$(".nav-top-level-back-navigation").click(function(e) {
          hideCurrentLevelAndShowPreviousLevel();
					e.stopPropagation();
				});
		}

    function register2ndLevelListItemsMouseover() {
      console.debug("register2ndLevelListItemsMouseover");
      $(".nav-2nd-level-item").mouseover(function(event) {
        $(this).addClass("is-active");
        $(this).siblings().removeClass("is-active");
      });
    }

    function preventNormalURLHandlingOn2ndLevelListItemClick() {
      console.debug("preventNormalURLHandlingOn2ndLevelListItemClick");
      $(".nav-2nd-level-item > a").click(function(event) {    
        $linkElement = $(this);
        $2ndLevelItem = $linkElement.parent();
        if (!$2ndLevelItem.hasClass("is-node")) {
          console.debug("Clicked 2nd level item that is NOT a node. Prevent URL handling."); 
          event.preventDefault();
        }            
      });
    }

    function register2ndLevelListItemsClick() {
      console.debug("register2ndLevelListItemsClick");
      $(".nav-2nd-level-item").click(function(e) {
        console.debug("2nd level item clicked");
        $2ndLevelItem = $(this);
        if ($2ndLevelItem.hasClass("is-node")) {
          console.debug("Clicked 2nd level item that is a node. Do not navigate to next level."); 
     /*     $2ndLevelItem.find("a")
          window.location = this.href; */
        }
        else if (!$2ndLevelItem.hasClass("is-active")) {
          console.debug("Clicked 2nd level item is no active item, navigate to 3rd level"); 
          navigateFrom2ndLevelTo3rdLevel($(this));
        }               
        e.stopPropagation();
      });
    }

    /*
    This is the deepest navigation level. Clicking on items causes navigation to 
    the URL of the associated link.
    */
    function handleClickOn3rdLevelItems() {
      $(".nav-3rd-level-item").click(function() {
        e.stopPropagation;
      });
    }

      /* **************************************************************************
      * Mobile / Navigation between levels back and forth
      ****************************************************************************/

      function hideCurrentLevelAndShowPreviousLevel() {
        console.debug("hideCurrentLevelAndShowPreviousLevel")
        if (currentVisibleLevel == LEVEL2) {
          navigateFrom2ndLevelTo1stLevel();
        }
        else {
          navigateFrom3rdLevelTo2ndLevel();
        }
      }

      function navigateFrom1stLevelTo2ndLevel($1stLevelElement) {
        console.debug("navigateFrom1stLevelTo2ndLevel");
        currentVisibleLevel = LEVEL2;
        make2ndLevelItemsVisible($1stLevelElement);
        performSlideEffectForNavigationToHigherLevel();
      }

      function navigateFrom2ndLevelTo3rdLevel($2ndLevelItem) {
        console.debug("navigateFrom2ndLevelTo3rdLevel");
        currentVisibleLevel = LEVEL3;
        hide1stLevelHeading(); 
        make3rdLevelItemsVisible($2ndLevelItem);
        performSlideEffectForNavigationToHigherLevel(); 
      }

      function hide1stLevelHeading() {
        console.debug("hide1stLevelHeading");
        $(".nav-top-level-item-heading").removeClass("is-visible");
      }

      function navigateFrom2ndLevelTo1stLevel() {
        console.debug("navigateFrom2ndLevelTo1stLevel");
        $1stLevelElement = $(".nav-top-level-item.is-active");
        $1stLevelElement.siblings().addClass("is-visible");
        $1stLevelElement.toggleClass("is-active");
        hide2ndLevelItems($1stLevelElement);
        performSlideEffectForNavigationToLowerLevel();
      }

      function show1stLevelHeading() {
        console.debug("show1stLevelHeading");
        $(".nav-top-level-item.is-active .nav-top-level-item-heading").addClass("is-visible");
      }

      function navigateFrom3rdLevelTo2ndLevel() {
        console.debug("navigateFrom3rdLevelTo2ndLevel");
        var newVisibleLevel = LEVEL2;
        $active2ndLevelElement = $(".nav-2nd-level-item.is-active");
        $active2ndLevelElement.siblings().addClass("is-visible");
        $active2ndLevelElement.toggleClass("is-active");
        currentVisibleLevel = newVisibleLevel;
        hide3rdLevelItems($active2ndLevelElement);
        show1stLevelHeading();
        performSlideEffectForNavigationToLowerLevel();
      }

      /* **************************************************************************
      * Mobile / Show and hide of list items of different levels
      ****************************************************************************/

      function make2ndLevelItemsVisible($1stLevelElement) {
        console.debug("make2ndLevelItemsVisible");
        $1stLevelElement.find(".nav-2nd-level-item").addClass("is-visible");      
        showActive1stLevelHeading($1stLevelElement);        
      }

      function hide2ndLevelItems($1stLevelElement) {
        console.debug("hide2ndLevelItems");
        $2ndLevelItem = $1stLevelElement.find(".nav-2nd-level-item");
        $2ndLevelItem.removeClass("is-visible");
        hideActive1stLevelHeading($1stLevelElement);
        hide3rdLevelItems($2ndLevelItem);
      }

      function hideActive1stLevelHeading($1stLevelElement) {
        console.debug("hideActive1stLevelHeading");
        $1stLevelElement.find(".nav-top-level-item-heading").removeClass("is-visible");
      }

      function showActive1stLevelHeading($1stLevelElement) {
        console.debug("showActive1stLevelHeading");
        $1stLevelElement.find(".nav-top-level-item-heading").addClass("is-visible");
      }

      function make3rdLevelItemsVisible($2ndLevelItem) {
        console.debug("make3rdLevelItemsVisible");
        $2ndLevelItem.addClass("is-active");
        $all2ndLevelItemsOf1stLevelItem = $2ndLevelItem.parent().find(".nav-2nd-level-item");
        $all2ndLevelItemsOf1stLevelItem.toggleClass("is-visible");    
        $2ndLevelItem.addClass("is-visible");
        $(".nav-2nd-level-item.is-active .nav-3rd-level-items").toggleClass("is-visible");  
      }

      function hide3rdLevelItems($2ndLevelItem) {
        console.debug("hide3rdLevelItems"); 
        $2ndLevelItem.find(".nav-3rd-level-items").removeClass("is-visible"); 
      }

      function performSlideEffectForNavigationToHigherLevel() {
        _performSlideToRightEffect();
      }

      function performSlideEffectForNavigationToLowerLevel() {        
        _performSlideToLeftEffect();
      }
      
      function _performSlideToLeftEffect() {
       _performSlideEffect("left");     
      }

      function _performSlideToRightEffect() {
        _performSlideEffect("right");
      }

      /*
        In order to have an effect that slides the complete view part below the 
        burger menu icon to the left, the the complete top level list has to be 
        the base of the slide effect.
      */
      function _performSlideEffect(startFrom) {
        $(".nav-top-level-items").css("display", "none");
        var options = {};
        options["direction"] = startFrom;
        $(".nav-top-level-items").show("slide", options, 500);       
      }

      /* **************************************************************************
      * Helpers
      ****************************************************************************/

      function _getClassesString($element) {
        return $element.attr("class");
      }

      /* 
      returns true if we are in xs break point (mobile), else returns false (desktop)
      */
      function isMobile() {
        // if burger nav is visible, then we are in mobile mode
        if ($(".nav-top-level-burger").css("display") == "none" ) {
          return false;
        }
        return true;
      }

      function isDesktop() {
        return !isMobile();
      }

      // end
		});
