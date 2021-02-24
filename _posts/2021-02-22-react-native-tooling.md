---
layout: post
title: React Native tools to become a better developer
slug: react-native-tools
date: 2020-11-21
categories: react native, productivity
# canonical_url: 
---


<!-- _Originally published at [blog.logrocket.com](https://blog.logrocket.com/unfavorable-react-keys-unpredictable-behavior/)_ -->


# Tools for working with real devices

This section presents handy tools to work with real devices to facilitate debugging and profiling. There are also positilities to mirror the screen of your actual phone to your development machine, which improves the developer experience also in remote pair programming scenarios.

## scrcpy for mirroring and remote control (Android)

[scrcpy](https://github.com/Genymobile/scrcpy) is an awesome utility for Android development that is available for all major operation systems. It mirrors the screen of a device connected via USB cable to the developer machine. What's fantastic is the fact that the mobile device can also be remoted controlled by the tool on the development machine, instead of using gestures on the device. It's especially handy, if you stream your computer screen in a video conference so that your peers can see the mouse cursor in order to have an idea how you interact with the mirrored device.

Installation for Mac is straightforward with [Homebrew](https://brew.sh/).  As a requirement, you need [adb up and running](https://stackoverflow.com/a/28208121). In addition, you have to [enable USB debugging on your Android device](https://www.embarcadero.com/starthere/xe5/mobdevsetup/android/en/enabling_usb_debugging_on_an_android_device.html).

```bash
$ brew install scrcpy
$ brew install android-platform-tools
```

In order to get scrcpy work with a react native app running on your device, you need to use [adb reverse](https://www.decoide.org/docs/react-native/running-on-device-android.html).

```bash
$ adb reverse tcp:8081 tcp:8081
```

**TODO** animated gif erzeugen mit Android device (Papas Gerät nutzen)

## Quicktime for mirroring (iOS)

When you connect your iOS device via USB cable to your Mac, you can leverage [QuickTime Player](https://support.apple.com/en-gb/guide/quicktime-player/welcome/mac) to mirror your device screen. You have to trust your connected Mac. **Open QuickTime Player** and start a new movie recording (**⌥ ⌘ N**). Next to the red recording button, open the dropdown and select your connected device from the camera input. That's it.

# Debugging

## Dev Tools


# Profiling

## Android Studio


Vorbereitung für USB-Debugging

Android Studio mit meindm app eingerichtet, Build läuft erfolgreich durch
Passendes USB Kabel für Android-Testgerät
Auf Android-Testgerät müssen Developer Tools aktiviert werden: https://www.techbook.de/mobile/entwickleroptionen-android-aktivieren
USB Debugging muss für das Gerät in den Einstellungen aktiviert werden. Am besten dauerhaft setzen bzw. dauerhaft dem Laptop vertrauen
adb wird vermutlich mit Android Studio mitinstalliert, aber adb muss im Pfad sein. Alternativ kann man adb für Mac via Option 1 https://stackoverflow.com/a/28208121 installieren.

Für jede Profiling/Testing-Session nötig bzw. bei jedem Android Studio start

Gerät via USB-Kabel anschließen und entsperren. Nochmal sicherstellen, dass USB-Debugging aktiviert ist.
Reverse Proxy setzen via Kommandobefehl adb -d reverse tcp:8081 tcp:8081
echtes Test-Gerät sollte in Auswahl stehen und auf play drücken
Profiler Tab öffnen und auf + echtes Gerät auswählen (Alternativ vorher statt über play mit dem profiling Button die App starten)
Dann auf Networking klicken, in der App interagieren, und (wie im Screenshot unten zu sehen) einen Bereich auswählen. Dann erscheinen unten die Requests für diese Time Range
Bildschirm des Android-Geräts bei USB-Debugging anderen via Desktop Sharing sichtbar machen

Für Mac kann das tool scrcpy via homebrew installieret werden https://github.com/Genymobile/scrcpy
im Terminal folgenden Befehl starten scrcpy
Falls mehrere Geräte / Emulatoren aktiv/angeschlossen sind, dann via Befehl adb devices gewünschte Geräte-Nummer einsehen und dann scrcpy -s <device id> starten

USB-Debugging auf dem Android-Testgerät wie in dieser Anleitung beschrieben aktivieren.
Das Android-Testgerät per USB-Kabel an den Rechner anschließen
USB-Debugging Dialog erscheint auf Android-Testgerät: Aktivieren (am besten Haken für dauerhafte Freigabe setzen)
Gerät sollte in Android Studio in Geräte-Dropdown (als Alternative zu den Emulatoren) zur Verfügung stehen
Build Variants sollten wie immer auf localDebug/debug stehen
im React Native Projekt den Bundler starten: $ yarn start
Reverse Proxy setzen. Dazu folgenden Befehl absetzen: $ adb -d reverse tcp:8081 tcp:8081
immer erst dann ausführen, wenn das Gerät neu per USB-Kabel an den Rechner angeschlossen und gefunden wurde.
Falls vergessen, kommt roter Error Screen auf dem Android-Testgerät
Optional React Native Debugging aktivieren
in Terminalfenster, in dem der Bundler gestartet wurde, die Taste d drücken. Auf dem Gerät sollte sich Kontextmenü öffnen. Dort Debugger auswählen. Im Browser am Rechner sollte sich React Native Debugger öffnen.
console.log Ausgaben im React Native Code können weiterhin nur über React Native Debugger angeschaut werden.
In Android Studio auf Play drücken
Auf dem Android-Testgerät VPN aktivieren, damit BIlder etc. geladen/angezeigt werden können.
Optional: Profiler kann in Android Studio zum Checken der nativen Network Request genutzt werden.
Dazu den Profiler Tab nutzen, + drücken und das echte Android Gerät auswählen.
Während man durch die App am Android Testgerät navigiert, erfolgt das Profiling. Man kann auf Network klicken und dann mit der Maus ein Bereich selektiert werden, für den man sich wie im Bild zu sehen die konkreten Network Requests anschauen kann.



## iOS

Charles

- https://www.charlesproxy.com/download/
- https://deliveroo.engineering/2018/12/04/how-to-use-charles-proxy-to-rewrite-https-traffic-for-web-applications.html
- https://github.com/thyrlian/Charles-Proxy-Mobile-Guide
- https://www.detroitlabs.com/blog/2018/05/01/how-to-set-up-charles-proxy-for-an-ios-simulator/


# React Native Tooling

Expo

Inspector styling

React Native dev tools

## onLayout

<View
style={{
height: 500,
borderColor: 'red',
borderStyle: 'solid',
borderWidth: 5,
}}
onLayout={event => {
console.log('###', event.nativeEvent.layout.height);
}}

# React Tooling

React Dev Tools

Chrome dev tools

cmd + p -> breakpoints setzen