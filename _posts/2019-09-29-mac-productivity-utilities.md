---
layout: post
title: Upgrade Mac OS to Utilize Keyboard Shortcuts for a more Productive Development Workflow
slug: mac-productivity-utilities
date: 2019-09-29
categories: react, hooks, testing
medium:
  - mac
  - shortcuts
  - productivity
---

Using a mouse or trackpad is a major distraction and flow-breaker for many development tasks, especially programming.
I strive for using keyboard shortcuts as much as possible to be more productive while programming.

Out of the box, Mac OS does not provide many keyboard shortcuts when it comes to window management. As an example, it does not allow to move a focused window to another space.

In this article I want to present my curated list of useful Mac tools to manage windows, displays, and spaces (of [Mission Control](https://en.wikipedia.org/wiki/Mission_Control_(macOS))) without a mouse. I hope you retire your mouse after reading this post 😉.

TODOS
- Screencasts



# Other useful Mac OX Shortcuts
- herunerfahren
- Bildschirm locken
- Fenster beenden
- App beenden
- cmd tab und cmd shift tab
- spotlight
- Screenshot
- Spotlight
- alt cmd ESC

# Alfred
[Alfred](https://www.alfredapp.com/) is an elite application launcher and utility to search and find files on your machine or on the Web. I use Alfread instead of [Spotlight](https://support.apple.com/en-us/HT204014). The hotkey to open up the launcher panel has been burned into my mind for a long time. Of course, you can define a custom key combo in Alfred's settings.

![](../images/mac-productivity-utilities/alfred-hotkey.png)

Launcher für apps
Launcher für Web Suche
Launcher für Dateien Suchen (type open ...)

![](../images/mac-productivity-utilities/alfred-clipboard.png)

TODO animated gif launcher mit key captures
TODO animated gif clipboard mit key captures

Alfred has many more awesome features like snippets or workflows, which I will not cover here. Take a look at Alfred's [power pack](https://www.alfredapp.com/powerpack/).

# Spectacle &ndash; The missing Window Manager

[Spectacle](https://www.spectacleapp.com/) is an awesome tool that allows for changing the size or position of a particular window. It upgrades Mac OS 
in a way that you can use keyboard shortcuts to resize or move focused windows of any app. Sophisticated window management by shortcuts is one aspect I have missed from Microsoft Windows when I was working in a project with PCs as development machines.  In my current project, I have an environment with two external displays in addition to the built-in display of my Macbook. Spectacle provides
customizable shortcuts even for throwing a focused window to another display (`Next Display` and `Previous Display`).

Besides moving windows from one visible display to another, I highly use shortcuts to resize windows like `Make Larger`, `Make Smaller`, or `Left Half`.

I appreciate Spectacle's simplicity. You have a nice glasses icon in the menu bar to see all window actions along with keyboard shortcuts at a glance. To change them just go to the setting dialog.

![Settings of Spectacle](../images/mac-productivity-utilities/spectacle-settings.jpg)

The following recording gives an impression how Spectacle works. I used the shortcuts as you can see in the screenshot above.

*TODO* Video mit key captures

# Amethyst

[Amethyst](https://ianyh.com/amethyst/) constitutes a tiling window manager for Mac OS X. It has some features in common with Spectacle, e.g., increasing and decreasing window sizes by shortcuts. However, as you can see from the screenshot about Amethyst's settings, the tool provides many more useful shortcuts.

![Shortcuts section of Amethyst](../images/mac-productivity-utilities/amethyst.png)

My personal killer feature is the ability to throw focused windows to a particular space. I very often move a window to the left or right space (`Throw focused window to space left` or `Throw focused window to space right`).

Another very handy feature does not require using shortcuts at all. Amethyst rearranges windows on a display automatically. As an example, if you have a single browser window on your active display and you open another browser window by `Cmd N`, both windows are positioned next to each other with the exact same width and height. If you put another window of any software on this display, all three windows are rearranged again in a way that there is no overlapping. 

Take a look at the screencast to get a better understanding of Amethyst.

*TODO* Video mit key captures

# Contexts

I use [Contexts](https://contexts.co/) primarily for an improved Command-Tab switcher.

![Better Command-Tab Switcher](../images/mac-productivity-utilities/contexts.png)

Contexts adds the ability to select individual windows by using the learned key combos `cmd tab` and `cmd shift tab` (to move up the list). In the settings you can also define other shortcuts for these actions. Additionally, you can also use multiple shortcuts for invoking the window switcher with individual settings, which is not possible with Mac OS default switcher.

![Define multiple shortcuts for window switching](../images/mac-productivity-utilities/contexts-settings.png)

As you can see from the previous screenshot, you can define any number of shortcuts to activate the window switcher and to move the list up and down. What I really like is that you can restrict the list for every shortcut, e.g., only visible spaces.

Another major time safer is Contexts' search capability. Actually, it acts more like a filter of the window list.

When you have activated the switcher panel, you can just type and thereby filter the list to save moving up and down the list.

![Even faster window selection by searching](../images/mac-productivity-utilities/contexts-search.png).

You can even optimize this workflow by defining a modifier key to activate and use the fast search feature. To switch to a window, press this modifier key and type a few characters from the app name or window title. As you can see from a previous screenshot, on the left-hand side of the switcher panel characters are shown that show you suitable strings for fast search.

What I also like is that I can remove particular apps from the switcher panel's list, e.g., Mac OS Finder, because I'm not convinced of this tool and use instead an alternative.

TODO: kurzes Video mit aktivierten Tasten

# Mac OS Build-in Shortcuts

There are some shortcuts to use [Mission Control](https://support.apple.com/en-us/HT204100) without a mouse. For me, the most important one is to switch between spaces by pressing `Option right arrow` or `Option left arrow`. To open Mission Control or show spaces bar press `Option arrow up`. To show all windows of an application side by side press `Option arrow down`.

Of course, the following shortcuts should become second nature if you want to be productive on a Mac. `Command q` quits applications along with all its windows. To close a focused window press `Command w`. To copy and paste things use `Command c` and `Command v`.

Another useful shortcut during my office hours is locking the screen by pressing `Option Command q`.

# KeyCue

If you cannot remember these system shortcuts, you can take a look in the application menu. If a command provides a shortcut, you can find it on the right side of the menu entry. An even faster approach is to use [KeyCue](https://www.ergonis.com/products/keycue/). It's a useful tool to show all shortcuts of the current application which is currently in focus along with system shortcuts. The goal of KeyCue is to find, remember, and learn keyboard shortcuts. 

![Find, remenber, and learn shortcuts with KeyCue](../images/mac-productivity-utilities/keycue.png)

You can show the list of shortcuts for a focused app from the keyboard. As an example, I configured KeyCue to show the list by pressing `Command` key for 1.5 seconds.

![Activate KeyCue with hotkeys](../images/mac-productivity-utilities/keycue-settings.png)


# Summary

Hinweis das jedes Tool noch viel mehr Features hat