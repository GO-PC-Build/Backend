.. image:: https://cdn.discordapp.com/attachments/758671703575756831/768190158552956958/Go-PC_Built_Logo.png
    :target: https://pc.go-ao.be
    :width: 212px
    :align: center
    :alt: GO-PC Build

==============================

De backend die alle communicatie verwerkt. (Web login, discord sync, tickets etc)

Installatie
===========


Benodigdheden
*************

- ``node`` is waarop de applicatie draait
- ``npm`` *(zit in node normaal)* heb je nodig om de packages de installeren
- ``mongodb`` is waarin de data van onze applicatie in word opgeslagen

Eerste gebruik
**************

Open je CLI en ga naar de applicatie folder, eerst moeten we de benodigdheden installeren. Dit doen we met het volgende commando:
::

    $ npm i -D


Maak een bestand aan dat ``.env`` noemt en plaats er de volgende waarden in die van toepassing zijn.
::

    DB_CONNECT = <mongodb url>
    TOKEN_SECRET = <jouw geheime JWT token>


De applicatie starten
*********************

Open je *CLI* en typ ``npm start``.
De applicatie zou moeten starten.

Vragen?
=======
Voel je vrij om ons in `onze discord`_ ons te contacteren!

.. _`onze discord`: https://pc.go-ao.be/discord

Basis Route
===========
`/go-pc-build/api` *(aanpasbaar in `index.js`)*

Routes
========
- **Register** ``/user/register``
- **Login** ``/user/login`` *(JWT)*
- **Login** ``/user/login`` *(JWT)*
- **Account** ``/@me`` *(JWT)*

Licentie
========
Deze applicatie bevind zich onder een `CCO 1.0 License`_.

.. _CCO 1.0 License: https://github.com/GO-PC-Build/Backend/blob/master/LICENSE

