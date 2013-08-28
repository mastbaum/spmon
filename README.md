SNO+ Monitoring Web App
=======================
For monitoring ALL the things.

Testing
-------
To start the testing web server, run

    $ node web-server.js

and navigate to `http://localhost:8000` in your browser.

You'll also need a [Natural Log](https://github.com/seibert/ln) server running on `http://localhost:6283`. The web server proxies requests on `/ln` to Natural Log.

Data Sources
------------
spmon gets data from a Natural Log server, and expects data series formatted like this:

    crate00.cmos_rate
    crate00.base_current
    crate01.cmos_rate
    ...

where the data is a 16x32 array of floats (`float32[16,32]`), containing the CMOS rates, base currents, etc., for each channel on each card.

