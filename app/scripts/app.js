(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PoplarApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var io = require('./lib/io');
var run = require('./lib/run')(io);


module.exports = run;

},{"./lib/io":20,"./lib/run":21}],2:[function(require,module,exports){
module.exports = {
    description: "These are constants.",
    value: {
        days_per_month: {
            value: 30.4,
            units: "days/mo",
            description: "Number of Days in an average month"
        },
        e20: {
            value: 2.2,
            units: "vp/t",
            description: "Rate of change of saturated VP with T at 20C"
        },
        rhoAir: {
            value: 1.2,
            units: "kg/m^3",
            description: "Density of air"
        },
        lambda: {
            value: 2460000,
            units: "J/kg",
            description: "Latent heat of vapourisation of h2o"
        },
        VPDconv: {
            value: 0.000622,
            units: "",
            description: "Convert VPD to saturation deficit = 18/29/1000"
        },
        Qa: {
            value: -90,
            units: "W/m^2",
            description: "Intercept of net radiation versus solar radiation relationship"
        },
        Qb: {
            value: 0.8,
            units: "unitless",
            description: "slope of net vs. solar radiation relationship"
        },
        gDM_mol: {
            value: 24,
            units: "g/mol(C)",
            description: "Molecular weight of dry matter"
        },
        molPAR_MJ: {
            value: 2.3,
            units: "mol(C)/MJ",
            description: "Conversion of solar radiation to PAR"
        }
    }
};

},{}],3:[function(require,module,exports){
module.exports = {
  tree : require('./tree'),
  plantation : require('./plantation'),
  plantation_state : require('./plantation_state'),
  soil : require('./soil'),
  weather : require('./weather'),
  manage : require('./manage'),
  constats : require('./constants')
};

},{"./constants":2,"./manage":4,"./plantation":5,"./plantation_state":6,"./soil":7,"./tree":11,"./weather":18}],4:[function(require,module,exports){
module.exports = {
  description : "Crop Management Parameters",
  value : {
    irrigFrac : {
      value : 1,
      units : "",
      description : "Irrigation fraction: 1 = fully irrigated, 0 = no irrigation. Any values between 0 and 1 are acceptable"
    },
    fertility : {
      value : 0.7,
      units : "",
      description : "Soil fertility"
    },
    datePlanted : {
        value : "_date_",
        units : "date",
        description : "Date the crop was planted"
    },
    dateCoppiced : {
        required : false,
        value : "_date_",
        units : "date",
        description : "Date of the first coppice"
    },
    coppiceInterval : {
        required : false,
        value : 3,
        units : "Years",
        description : "How after the crop is coppiced after the first coppice"
    },
    coppiceDates : {
        required : false,
        value : "",
        units : "date",
        description : "How after the crop is coppiced after the first coppice"
    },
    dateFinalHarvest : {
        required : false,
        value : "_date_",
        units : "date",
        description : "Date when the crop is completely harvested"
    }
  }
};

},{}],5:[function(require,module,exports){
module.exports = {
    description: "Greenwood PG Values (default)",
    value: {
        type: {
            value: "",
            description: "",
            required : false
        },
        StockingDensity: {
            value: 3587,
            units: "Trees/hectar",
            description: "Number of trees planted per hectar"
        },
        SeedlingMass: {
            value: 0.0004,
            units: "kG",
            description: "Mass of the seedling"
        },
        pS: {
            value: 0.1,
            units: "unitless",
            description: "Proportion of seedling mass going into stem"
        },
        pF: {
            value: 0,
            units: "unitless",
            description: "Proportion of seedling mass going into foliage"
        },
        pR: {
            value: 0.9,
            units: "unitless",
            description: "Proportion of seedling mass going into root"
        }
    }
};

},{}],6:[function(require,module,exports){
module.exports = {
    description: "Plantation state class, containing all intemediate values at every timestep of the model",
    value: {
        feedstockHarvest: {
            value: -1,
            units: "",
            description: ""
        },
        coppiceCount: {
            value: -1,
            units: "",
            description: ""
        },
        coppiceAge: {
            value: -1,
            units: "month",
            description: "Age of tree at the time of coppice"
        },
        VPD: {
            value: -1,
            units:"kPA",
            description:"Mean vapor pressure deficit"
        },
        fVPD: {
            value: -1,
            units : "unitless",
            description:"Vapor Pressure Deficit Modifier (Poplar)"
        },
        fT: {
            value: -1,
            units:"unitless",
            description:"Temperature modifier"
        },
        fFrost: {
            value: -1,
            units : "unitless",
            description : "Number of Freeze Days Modifier"
        },
        fNutr: {
            value: -1,
            units:"unitless",
            description:"Nutritional Fraction, might be based on soil and fertilizer at some point"
        },
        fSW: {
            value: -1,
            units: "",
            description: "Soil water modifier"
        },
        fAge: {
            value: -1,
            units: "",
            description: ""
        },
        PAR: {
            value: -1,
            units:"mols",
            description:"Monthly PAR in mols / m^2 month"
        },
        xPP: {
            value: -1,
            units: "metric tons Dry Matter/ha",
            description: "maximum potential Primary Production"
        },
        Intcptn: {
            value: -1,
            units: "unitless",
            description: "Canopy rainfall interception"
        },
        ASW: {
            value: -1,
            units: "mm",
            description: "Available soil water"
        },
        CumIrrig: {
            value: -1,
            units: "mm",
            description: "Cumulative irrigation"
        },
        Irrig: {
            value: -1,
            units: "mm/mon",
            description: "Required irrigation"
        },
        StandAge: {
            value: -1,
            units: "month",
            description: "Age of the tree"
        },
        LAI: {
            value: -1,
            units: "",
            description: "Leaf area index"
        },
        CanCond: {
            value: -1,
            units: "",
            description: "Canopy conductance"
        },
        Transp: {
            value: -1,
            units: "mm/mon",
            description: "Canopy monthly transpiration"
        },
        PhysMod: {
            value: -1,
            units: "unitless",
            description: "Physiological Modifier to conductance and APARu"
        },
        pfs: {
            value: -1,
            units: "",
            description: "Ratio of foliage to stem partitioning"
        },
        pR: {
            value: -1,
            units: "",
            description: ""
        },
        pS: {
            value: -1,
            units: "",
            description: ""
        },
        pF: {
            value: -1,
            units: "",
            description: ""
        },
        litterfall: {
            value: -1,
            units: "",
            description: ""
        },
        NPP: {
            value: -1,
            units: "metric tons Dry Matter/ha",
            description: "Net Primary Productivity"
        },
        RootP: {
            value: -1,
            units: "",
            description: "Root productivity"
        },
        dW: {
            value: -1,
            units: "",
            description: ""
        },
        WF: {
            value: -1,
            units: "bdt/ha",
            description: "Foliage yield"
        },
        WR: {
            value: -1,
            units: "bdt/ha",
            description: "Root yield"
        },
        WS: {
            value: -1,
            units: "bdt/ha",
            description: "Stem yield"
        },
        W: {
            value: -1,
            units: "bdt/ha",
            description: "Total yield: root + stem + foliage"
        }
    }
};

},{}],7:[function(require,module,exports){
module.exports = {
    description: "Soil information based on current location",
    value: {
        maxAWS: {
            value: -1,
            units: "",
            description: "Maximum available soil water"
        },
        swpower: {
            value: -1,
            units: "",
            description: "power parameter based on clay content of soil"
        },
        swconst: {
            value: -1,
            units: "",
            description: "constant parameter based on clay content of soil"
        }
    }
};

},{}],8:[function(require,module,exports){
module.exports = {
    units: "[gc m/s]?",
    description: "Along with a Physiological modifer, specifies the canopy conductance.  Used in calculation of transpiration",
    value: {
        mn: {
            description: "Minimum value, when lai=0",
            value: 0.0001
        },
        mx: {
            description: "Maximum value",
            value: 0.02
        },
        lai: {
            units: "[m^2/m^2]",
            description: "Leaf Area Index where parameter reaches a maximum value.",
            value: 2.6
        }
    }
};

},{}],9:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Specifies the growth limiter as a function of the tree age.  This is a time dependancy parameter.  The graph of the function is available at: https://www.desmos.com/calculator/wa0q2ih18h",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 1
        },
        f1: {
            description: "Value at Infinite Time",
            value: 0
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 47.5
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 3.5
        }
    }
};

},{}],10:[function(require,module,exports){
module.exports = {
    description: "Specifies the parameters affecting temperature modifier, fT. A graph of how these parameters affect the temperature modifier is found here: https://www.desmos.com/calculator/69iwqtnl28",
    value: {
        mn: {
            units: "[C]",
            description: "Specifies the minimum temperature of respiration",
            value: 0
        },
        opt: {
            units: "[C]",
            description: "Specifies the optimum temperature of respiration",
            value: 20
        },
        mx: {
            units: "[C]",
            description: "Specifies the maximum temperature of respiration",
            value: 50
        }
    }
};

},{}],11:[function(require,module,exports){
module.exports = {
    description: "These specify growth parameters specific to the species of tree.",
    value : {
        k: {
            units: "unitless",
            description: "Radiation Extinction Coefficient.",
            value: 0.5
        },
        fullCanAge: {
            units: "[y]",
            description: "Year where tree reaches full Canopy Cover.",
            value: 1.5
        },
        kG: {
            units: "[kPA^-1]",
            description: "Determines the response of the canopy conductance to the vapor pressure deficit.",
            value: 0.5
        },
        alpha: {
            units: "[kg/mol ?]",
            description: "Canopy quantum efficiency.",
            value: 0.08
        },
        fT : require('./ft'),
        BLcond: {
            units: "[]",
            description: "Canopy boundary layer conductance. Used in the calcuation of transpiration",
            value: 0.04
        },
        fAge: require('./fage'),
        fN0: {
            units: "fraction",
            description: "Used in the calculation of the nutritional modifier,fNutr.  fNutr ranges from [fNO,1) based on the fertility index which ranges from 0 to 1.  When fN0=1 indicates fNutr is 1",
            value: 0.26
        },
        SLA: require('./sla'),
        //CheckUnitsChangetolinearFunction
        Conductance: require('./conductance'),
        Intcptn: require('./intcptn'),
        y: {
            description: "Assimilation use efficiency.  Used in calculation of the NPP.",
            value: 0.47
        },
        pfs: require('./pfs'),
        pR: require('./pr'),
        rootP: require('./rootp'),
        litterfall: require('./litterfall')
    }
};

},{"./conductance":8,"./fage":9,"./ft":10,"./intcptn":12,"./litterfall":13,"./pfs":14,"./pr":15,"./rootp":16,"./sla":17}],12:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Rainfall interception fraction.  A linear function w.r.t. LAI",
    value: {
        mn: {
            description: "Minimum value, when lai=0",
            value: 0
        },
        mx: {
            description: "Maximum value",
            value: 0.24
        },
        lai: {
            units: "[m^2/m^2]",
            description: "Leaf Area Index where parameter reaches a maximum value.",
            value: 7.3
        }
    }
};

},{}],13:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Specifies the fractional monthly loss of foliage. This is a time dependany parameter.  The graph of the function is available at: https://www.desmos.com/calculator/6iq9ppdqs7",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 0.0015
        },
        f1: {
            description: "Value at Infinite Time",
            value: 0.03
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 2
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 2.5
        }
    }
};

},{}],14:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "This defines the foliage to stem (WF/WS) fraction in allocating aboveground biomass of the tree. This is calculated with a pair of allometric power equations.  The first relates basal diameter, (DOB) to total woody biomass, while the second relates DOB to pfs.  The parameterization of the relationship between DOB and woody biomass is inverted to determine the DOB from the modeled woody fraction.  This relation is plotted at: .  The model allocates the appropriate fraction of wood based on the Stocking density of the plantation. DOB rather than DBH is used for comparison of trees with a high stemCnt and rapid coppicing value.",
    value: {
        stemCnt: {
            description: "Average number of stems per stump",
            value: 2.8
        },
        stemC: {
            units: "[cm^-1]",
            description: "Constant in relation of DOB to woody biomass",
            value: 0.18
        },
        stemP: {
            description: "Power in relation of DOB to woody biomass.",
            value: 2.4
        },
        pfsMx: {
            description: "Maximum possible pfs value allowed",
            value: 2
        },
        pfsP: {
            description: "Power in relation of DBO to pfs",
            value: -0.772
        },
        pfsC: {
            units: "[cm^-1]",
            description: "Constant in relation of DOB to pfs.",
            value: 1.3
        }
    }
};

},{}],15:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Along with a Physiologial parameter, specifies the amount of new growth allocated to the root system, and the turnover rate.",
    value: {
        mn: {
            description: "Minimum allocation to the root, when the physiologal parameter is 1.",
            value: 0.17
        },
        mx: {
            description: "Maximum allocation to the root, when m0.",
            value: 0.7
        },
        m0: {
            description: "Dependance on the fertility index. 0 indicates full dependance on fertility, 1 indicates a constant allocation, independant of fertility",
            value: 0.5
        },
        turnover: {
            units: "[month^-1]",
            description: "Specifies the monthly root turnover rate.",
            value: 0.02
        }
    }
};

},{}],16:[function(require,module,exports){
module.exports = {
    description: "These parameters specify root allocation to growth after coppicing.",
    value : {
      frac: {
          units: "[month^1]",
          description: "Specifies the fractional amount of root biomass that exceeds the aboveground requirements that can be supplied in a given month.",
          value: 0.2
      },
      LAITarget: {
          units: "[m^2/m^2]",
          description: "Specifies a target LAI rate.  The Target LAI is included in the calculation of a target NPP, based on weather paramaters.  Below this target, the roots will contribute biomass if the below ground root mass exceeds the requirements of the aboveground biomass. The target is specified in LAI to time root contributions to periods of growth",
          value: 10
      },
      efficiency: {
          units: "[kg/kg]",
          description: "Specifies the efficiency in converting root biomass into aboveground biomass.",
          value: 0.7
      }
    }
};

},{}],17:[function(require,module,exports){
module.exports = {
    units: "[m^2/kg]",
    description: "Specifies the Specific Leaf Area as a function of the tree age.  This is a time dependancy parameter.  Used in the calculation of LAI.  The graph of the function is available at: https://www.desmos.com/calculator/wa0q2ih18h",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 19
        },
        f1: {
            description: "Value at Infinite Time",
            value: 10.8
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 5
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 2
        }
    }
};

},{}],18:[function(require,module,exports){
module.exports = {
    month: {
        value: -1,
        units: "unitless",
        description: "The month number since planting"
    },
    tmin: {
        value: -1,
        units: "Celcius",
        description: "Minimum temperature for growth"
    },
    tmax: {
        value: -1,
        units: "Celcius",
        description: "Maximum temperature for growth"
    },
    tdmean: {
        value: -1,
        units: "Celcius",
        description: "Dew point temperature"
    },
    ppt: {
        value: -1,
        units: "",
        description: "Precipitation"
    },
    rad: {
        value: -1,
        units: "",
        description: "Solar radiation"
    },
    nrel: {
        required : false, // calcuated
        value: -1,
        units: "",
        description: ""
    },
    daylight: {
        value: -1,
        units: "",
        description: ""
    }
};

},{}],19:[function(require,module,exports){
'use strict';
/**
@module 3PG Module
**/


/**
Class for all the functions that run in a single step of the model

@class module.exports
**/


/**
list of constants used for computations

@attribute constant
**/
var constants = {
  days_per_month:{
      value:30.4,
      units:'days/mo',
      description:'Number of Days in an average month'
  },
  e20:{
      value:2.2,
      units:'vp/t',
      description:'Rate of change of saturated VP with T at 20C'
  },
  rhoAir:{
      value:1.2,
      units:'kg/m^3',
      description:'Density of air'
  },
  lambda:{
      value:2460000,
      units:'J/kg',
      description:'Latent heat of vapourisation of h2o'
  },
  VPDconv:{
      value:0.000622,
      units:'?',
      description:'Convert VPD to saturation deficit = 18/29/1000'
  },
  Qa:{
      value:-90,
      units:'W/m^2',
      description:'Intercept of net radiation versus solar radiation relationship'
  },
  Qb:{
      value:0.8,
      units:'unitless',
      description:'slope of net vs. solar radiation relationship'
  },
  gDM_mol:{
      value:24,
      units:'g/mol(C)',
      description:'Molecular weight of dry matter'
  },
  molPAR_MJ:{
      value:2.3,
      units:'mol(C)/MJ',
      description:'Conversion of solar radiation to PAR'
  }
};

module.exports.constant = constant;
function constant(c) {
    return constants[c].value;
}

/**
Time Dependant Attribute,
units='various',
description='This function creates a time dependant function that decays
(or rises from f0 to f1.  The value (f0+f1)/2 is reached at tm,
and the slope of the line at tm is given by p.
@method tdp
@param x
@param f
**/
module.exports.tdp = function(x,f) {
  var p=f.f1 + (f.f0-f.f1)*Math.exp(-Math.log(2)*Math.pow((x/f.tm),f.n));
  return p;
};

/**
@method lin
@param x
@param p
*/
module.exports.lin = function(x, p){
  if( x < 0 ) {
    return p.mn;
  }
  if( x > p.xmax ) {
    return p.xmax;
  }
  return p.mn + (p.mx-p.mn)*(x/p.xmax);
};

/**
units='unitless',
description='Canopy Rainfall interception'
@method Intcptn
@param cur_LAI
@param c
*/
module.exports.Intcptn = function(cur_LAI, c){
  return Math.max(c.mn,c.mn + (c.mx - c.mn) * Math.min(1 , cur_LAI / c.lai));
};

/**
units='mm',
description='Available Soil Water'
@method ASW
@param maxASW
@param prev_ASW
@param date_ppt
@param cur_Transp
@param cur_Intcptn
@param cur_Irrig
*/
module.exports.ASW = function(maxASW, prev_ASW, date_ppt, cur_Transp, cur_Intcptn, cur_Irrig){
  return Math.min(maxASW*10, Math.max(prev_ASW + date_ppt - (cur_Transp + cur_Intcptn * date_ppt) + cur_Irrig, 0));
};

//TODO: double check the appropriate use of tdmean (dew point temp)
//TODO: take constants out
/**
units='kPA',
description='Mean vapor pressure deficit'
@method VPD
@param date_tmin
@param date_tmax
@param date_tdmean
*/
module.exports.VPD = function(date_tmin, date_tmax, date_tdmean){
  return (0.6108 / 2 * (Math.exp(date_tmin * 17.27 / (date_tmin + 237.3) ) + Math.exp(date_tmax * 17.27 / (date_tmax + 237.3) ) ) ) - (0.6108 * Math.exp(date_tdmean * 17.27 / (date_tdmean + 237.3) ) );
};


/**
units = unitless,
description='Vapor Pressure Deficit Modifier (Poplar)'
@method fVPD
@param kG
@param cur_VPD
*/
module.exports.fVPD = function(kG, cur_VPD){
  return Math.exp(-1 * kG * cur_VPD);
};

//TODO: take constants out
// make a meaningful tempvar name
/**
units = unitless,
description = 'Number of Freeze Days Modifier'
@method fFrost
@param date_tmin
*/
module.exports.fFrost = function(date_tmin) {
  var tempVar = -1.0;

  if( date_tmin >= 0 ){
    tempVar = 1.0;
  } //else -1.0

  return 0.5 * (1.0 + tempVar * Math.sqrt(1 - Math.exp(-1 * Math.pow((0.17 * date_tmin) , 2) * (4 / 3.14159 + 0.14 * Math.pow( (0.17 * date_tmin) , 2) ) / (1 + 0.14 * Math.pow((0.17 * date_tmin) , 2) ) ) ) );
};

//TODO - better naming?: tmin, tmax = weather Topt, Tmax, Tmin = tree params
/**
units=unitless,
description='Temperature modifier'
@method fT
@param tavg
@param fT
*/
module.exports.fT = function(tavg, fT){
  var f;
  if(tavg <= fT.mn || tavg >= fT.mx){
    f = 0;
  } else {
    f = ( (tavg - fT.mn) / (fT.opt - fT.mn) )  *
           Math.pow ( ( (fT.mx - tavg) / (fT.mx - fT.opt) ),
                      ( (fT.mx - fT.opt) / (fT.opt - fT.mn) )
                    );
  }
  return(f);
};

/**
units='mm/mon',
description='Required Irrigation'
@method Irrig
@param irrigFrac
@param cur_Transp
@param cur_Intcptn
@param date_ppt
*/
module.exports.Irrig = function(irrigFrac, cur_Transp, cur_Intcptn, date_ppt){
    return Math.max(0, irrigFrac * (cur_Transp - (1 - cur_Intcptn) * date_ppt) );
};

//TODO: get units and description
/**
@method fSW
@param ASW
@param maxAWS
@param swconst
@param swpower
*/
module.exports.fSW = function(ASW, maxAWS, swconst, swpower) {
  var fSW;
  if( swconst === 0 || maxAWS === 0 ) {
    fSW = 0;
  } else {
    var omr = 1 - (ASW/10) / maxAWS; // One Minus Ratio

    if(omr < 0.001) {
      fSW = 1;
    } else {
      fSW = (1-Math.pow(omr,swpower))/(1+Math.pow(omr/swconst,swpower));
    }
  }
  return fSW;
};

/**
units='unitless',
description='Nutritional Fraction, might be based on soil and fertilizer at some point'
@method fNutr
@param fN0
@param FR
*/
module.exports.fNutr = function(fN0, FR){
  return fN0 + (1 - fN0) * FR;
};

/**
TODO: why $3 in makefile - ask about it
units=unitless
description='Physiological Modifier to conductance and APARu'
@method PhysMod
@param cur_fVPD
@param cur_fSW
@param cur_fAge
*/
module.exports.PhysMod = function(cur_fVPD, cur_fSW, cur_fAge){
   return Math.min(cur_fVPD , cur_fSW) * cur_fAge;
};

/**
units='gc,m/s',
description='Canopy Conductance'
@method CanCond
@param PhysMod
@param LAI
@param cond
*/
module.exports.CanCond = function(PhysMod, LAI, cond){
   return Math.max(cond.mn , cond.mx * PhysMod * Math.min(1 , LAI / cond.lai) );
};

/**
units='mm/mon' which is also kg/m2/mon
description='Canopy Monthly Transpiration'
@method Transp
@param date_nrel
@param date_daylight
@param cur_VPD
@param BLcond
@param cur_CanCond
*/
module.exports.Transp = function(date_nrel, date_daylight, cur_VPD, BLcond, cur_CanCond){
  var VPDconv = constant('VPDconv');
  var lambda = constant('lambda');
  var rhoAir = constant('rhoAir');
  var e20 = constant('e20');
  var Qa = constant('Qa');
  var Qb = constant('Qb');

  // date_daylight = hours
  // nrel is in MJ/m^2/day convert to Wh/m^2/day
  var netRad = Qa + Qb * ((date_nrel * 277.778) / date_daylight);
  var defTerm = rhoAir * lambda * VPDconv * cur_VPD * BLcond;
  var div = 1 + e20 + BLcond / cur_CanCond;

  // Convert daylight to secs.
  return constant('days_per_month') * ( (e20 * netRad + defTerm ) / div ) * date_daylight * 3600 / lambda;
};

//TODO: description
/**
units='metric tons Dry Matter/ha',
@method NPP
@param prev_StandAge
@param fullCanAge
@param xPP
@param k
@param prev_LAI
@param fVPD
@param fSW
@param fAge
@param alpha
@param fNutr
@param fT
@param fFrost
*/
module.exports.NPP = function(prev_StandAge, fullCanAge, xPP, k, prev_LAI, fVPD, fSW, fAge, alpha, fNutr, fT, fFrost){
  var CanCover = 1;
  if( prev_StandAge < fullCanAge ){
    CanCover = prev_StandAge / fullCanAge;
  }

  return xPP * (1 - (Math.exp(-k * prev_LAI) ) ) * CanCover * Math.min(fVPD , fSW) * fAge * alpha * fNutr * fT * fFrost;
};

//TODO: units and description
/**
@method pR
@param cur_PhysMod
@param cur_pR
@param FR
@param pR
*/
module.exports.pR = function(cur_PhysMod, cur_pR,FR,pR){
  var p =(pR.mx * pR.mn) /
         (pR.mn + (pR.mx - pR.mn) * cur_PhysMod * (pR.m0 + (1 - pR.m0) * FR) );

  // This was added by quinn to limit root growth.
  return p * Math.pow(p/cur_pR,2);
};


//TODO: mols or mols per m^2?
/**
units=mols
description='Monthly PAR in mols / m^2 month'
molPAR_MJ [mol/MJ] is a constant Conversion of solar radiation to PAR
@method PAR
@param date_rad
@param molPAR_MJ
*/
module.exports.PAR = function(date_rad, molPAR_MJ) {
  if( molPAR_MJ === null || molPAR_MJ === undefined ) {
    molPAR_MJ = constant('molPAR_MJ');
  }

  return date_rad * molPAR_MJ * constant('days_per_month');
};

/**
units='metric tons Dry Matter/ha',
description='maximum potential Primary Production [tDM / ha month],
NOTE: 10000/10^6 [ha/m2][tDm/gDM]
gGM_mol [g/mol] is the molecular weight of dry matter
@method xPP
@param y
@param cur_PAR
@param gDM_mol
*/
module.exports.xPP = function(y, cur_PAR, gDM_mol){
    if( gDM_mol === null || gDM_mol === undefined ) {
      gDM_mol = constant('gDM_mol');
    }

    return y * cur_PAR * gDM_mol / 100;
};

/*** FUNCTIONS FOR COPPICING */
/**
coppice related functions
@method coppice
*/
module.exports.coppice = {
  // Coppice Functions are based on Diameter on Stump, NOT DBH.
  // Calculates the pfs based on the stem weight in KG
  pfs : function(stem, p) {
    var avDOB = Math.pow( ( stem / p.stemCnt / p.stemC) , (1 / p.stemP) );
    var ppfs= p.pfsC * Math.pow(avDOB , p.pfsP);

    return Math.min(p.pfsMx,ppfs);
  },

  // Calculates the pfs based on stem with in G.  Uses volume Index as guide
  pfs_via_VI : function (stemG, wsVI, laVI, SLA) {
    if (stemG < 10) {
      stemG = 10;
    }
    var VI = Math.pow( (stemG / wsVI.stems_per_stump / wsVI.constant),(1 / wsVI.power) );

    // Add up for all stems
    var la = laVI.constant * Math.pow(VI,laVI.power) * wsVI.stems_per_stump;
    var wf = 1000 * (la / SLA);  // Foilage Weight in g;
    var pfs = wf/stemG;
    return pfs;
  },

  RootP : function(cur_npp, cur_nppTarget, WR,W,pRx,frac) {
    var nppRes = cur_nppTarget - cur_npp;
    var rootPP;
    if( nppRes > 0 && WR/W > pRx ) {
        rootPP = Math.min(nppRes, WR*(WR/W - pRx)*frac);
    } else {
      rootPP = 0;
    }

    return rootPP;
  }
};

},{}],20:[function(require,module,exports){
module.exports = {
  read : function(model) {
    // TODO : implement
    // You need to set your IO here and make sure all parameters for model are correctly set
  },
  dump : function() {
    // TODO : implement
  }
};

},{}],21:[function(require,module,exports){
'use strict';

var fn = require('./fn');
var utils = require('./utils');
var dataModel = require('./dataModel');
var validate = require('./validate');

function run(lengthOfGrowth) {

    var yearToCoppice; //year of the first or subsequent harvests
    var coppiceInterval; //the # of months in a single coppice cycle
    var monthToCoppice; //at which month the harvest is to be performed :: currently the tree will be cut at the beginning of that month
    var coppiceDates;

    // helper, not required.  you can register callback to set parameters whenever run is called
    this.io.read(this);

    // make sure model inputs are valid before we proceed any further
    validate(this);

    this.currentDate = this.manage.datePlanted;
    //var plantedMonth = this.currentDate.getMonth();
    //var currentMonth = this.currentDate.getMonth();

    //TODO: test no datecoppice as input
    if ( this.manage.dateCoppiced !== undefined ){
      yearToCoppice = this.manage.dateCoppiced.getYear();
      monthToCoppice = this.manage.dateCoppiced.getMonth();
      coppiceInterval = this.manage.yearsPerCoppice;
    }

    if( this.manage.coppiceDates !== undefined ) {
      coppiceDates = [];

      for( var i = 0; i < this.manage.coppiceDates.length; i++ ) {
        var parts = this.manage.coppiceDates[i].split('-');

        var d = 15;
        if( parts.length > 2 ) {
          d = parseInt(parts[2]);
        }

        coppiceDates.push(new Date(parseInt(parts[0]), parseInt(parts[1])-1, d));
      }
    }


    // init manage ns
    this.manage.coppice = false;

    if( this.debug ) {
      console.log(this.currentDate);
    }

    var setup = {
      lengthOfGrowth : lengthOfGrowth,
      yearToCoppice : yearToCoppice,
      monthToCoppice : monthToCoppice,
      coppiceInterval : coppiceInterval,
      coppiceDates : coppiceDates,
      dailyStep : this.dailyStep
    };

    return this.runSetup(setup);
}

function runSetup(setup){
    var i, key, currentWeather, step, t;

    if( this.debug ) {
      t = new Date().getTime();
      console.log('DailyStep: '+setup.dailyStep);
    }

    var m = (this.currentDate.getMonth()+1)+'';
    if( m.length === 1 ) {
      m = '0'+m;
    }

    var d = (this.currentDate.getDate())+'';
    if( d.length === 1 ) {
      d = '0'+d;
    }

    //var currentWeather = getWeather(this, setup, m, d);
    var firstStepResults = init(this.plantation, this.soil);

    var keysInOrder = [];
    var header = ['date'];
    for( key in dataModel.plantation_state.value ) {
      keysInOrder.push(key);
      header.push(key);
    }

    firstStepResults.Date = this.currentDate.getFullYear()+'-'+m;
    if( setup.dailyStep ) {
      firstStepResults.Date += '-'+d;
    }

    var rows = []; //these will become rows
    rows.push(header);

    var firstRow = [firstStepResults.Date];
    for( i = 0; i < keysInOrder.length; i++){
      key = keysInOrder[i];
      firstRow.push(firstStepResults[key]);
    }
    rows.push(firstRow);

    var currentStepResults = firstStepResults;
    var nextStepResults;

    for(step = 1; step < setup.lengthOfGrowth; step++) {
      if( setup.dailyStep ) {
        this.currentDate.setDate(this.currentDate.getDate() + 1); // add a day to current date
      } else {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1); // add a month to current date
      }

      if( shouldCoppice(this, setup) ) {
        if( this.debug ) {
          console.log('Time to Coppice!');
          console.log(this.currentDate);
        }

        this.manage.coppice = true;
      } else {
        this.manage.coppice = false;
      }

      m = (this.currentDate.getMonth()+1)+'';
      if( m.length === 1 ) {
        m = '0'+m;
      }

      d = this.currentDate.getDate()+'';
      if( d.length === 1 ) {
        d = '0'+d;
      }

      currentWeather = getWeather(this, setup, m, d);

      //TODO: switch up trees here when after the first harvest
      nextStepResults = singleStep(this.plantation, this.soil, currentWeather, this.manage, currentStepResults, this.dailyStep);
      nextStepResults.Date = this.currentDate.getFullYear()+'-'+m;
      if( setup.dailyStep ) {
        nextStepResults.Date += '-'+d;
      }

      var thisRow = [nextStepResults.Date];
      for( i = 0; i < keysInOrder.length; i++) {
        key = keysInOrder[i];
        thisRow.push(nextStepResults[key]);
      }

      currentStepResults = nextStepResults;
      rows.push(thisRow);
    }

    this.io.dump(rows);

    if( this.debug ) {
      console.log(step);
      console.log(this.currentDate);
      console.log((new Date().getTime()-t)+'ms');
    }

    return rows;
}

function singleStep(plantation, soil, weather, manage, p, dailyStep) { //p = previous state
  var c = {}; //current state

  dailyStep = dailyStep === true ? true : false;
  var stepDivision = dailyStep ? 365 : 12;

  if( manage.coppice === true ) { //change this guy for the month when coppice
    // Add in a stump margin....
    c.feedstockHarvest = p.feedstockHarvest + p.WS;
    c.coppiceCount = p.coppiceCount + 1;
    c.coppiceAge = 0;
    p.LAI = 0;
    p.WS = 0;
    p.WF = 0;
    p.W = p.WR;
  } else {
    c.feedstockHarvest = p.feedstockHarvest;
    c.coppiceCount = p.coppiceCount;
    c.coppiceAge = p.coppiceAge + 1.0/stepDivision;
  }

  var tree; //tree
  if( c.coppiceCount === 0 ) { //TODO: check the case where we start with a coppiced multi stump tree
      tree = plantation.seedlingTree;
  } else {
      tree = plantation.coppicedTree;
  }

  c.StandAge = p.StandAge + 1.0/stepDivision;
  var sla = fn.tdp(p.StandAge, tree.SLA);
  c.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5
  c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean);
  c.fVPD = fn.fVPD(tree.kG, c.VPD);

  c.fSW = fn.fSW(p.ASW, soil.maxAWS, soil.swconst, soil.swpower);
  c.fAge = fn.tdp(p.StandAge, tree.fAge);

  c.fFrost = fn.fFrost(weather.tmin);
  if( dailyStep ) {
  // HACK for now
    c.fFrost = 1;
  //  c.fFrost = c.fFrost / fn.constant('days_per_month');
  }

  c.PAR = fn.PAR(weather.rad); // Monthly PAR in mols
  if( dailyStep ) {
    c.PAR = c.PAR / fn.constant('days_per_month');
  }

  c.fT = fn.fT((weather.tmin + weather.tmax)/2, tree.fT);

  c.xPP = fn.xPP(tree.y, c.PAR); // maximum potential Primary Production per month
  //if( dailyStep ) { // per day
  //  c.xPP = c.xPP / fn.constant('days_per_month');
  //}


  c.PhysMod = fn.PhysMod(c.fVPD, c.fSW, c.fAge);
  c.fNutr = fn.fNutr(tree.fN0, manage.fertility);

  c.NPP = fn.NPP(p.coppiceAge, tree.fullCanAge, c.xPP, tree.k, p.LAI, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);
  //if( dailyStep ) { // per day
  //  c.NPP = c.NPP / fn.constant('days_per_month');
  //}

  var NPP_target = fn.NPP(tree.fullCanAge, tree.fullCanAge, c.xPP, tree.k, tree.rootP.LAITarget, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);
  c.RootP = fn.coppice.RootP(c.NPP, NPP_target, p.WR, p.W, tree.pR.mx, tree.rootP.frac);

  if (tree.laVI && tree.laVI.constant ) { // Test for that function
    c.pfs = fn.coppice.pfs_via_VI(p.WS*1000000/plantation.StockingDensity, tree.wsVI,tree.laVI,sla);
  } else {
    c.pfs = fn.coppice.pfs(p.WS*1000/plantation.StockingDensity, tree.pfs);
  }

  c.dW = c.NPP + tree.rootP.efficiency * c.RootP;

  c.Intcptn = fn.Intcptn(c.LAI, tree.Intcptn);
  c.CanCond = fn.CanCond(c.PhysMod, c.LAI, tree.Conductance);

  c.pR = fn.pR(c.PhysMod, p.WR/p.W, manage.fertility, tree.pR);
  c.litterfall = fn.tdp(p.StandAge, tree.litterfall);

  c.Transp = fn.Transp(weather.rad, weather.daylight, c.VPD, tree.BLcond, c.CanCond);
  if( dailyStep ) {
    c.Transp = c.Transp / fn.constant('days_per_month');
  }

  // Calculated from pfs
  c.pS = (1 - c.pR) / (1 + c.pfs );
  c.pF = (1 - c.pR) / (1 + 1/c.pfs );

  c.Irrig = fn.Irrig(manage.irrigFrac, c.Transp, c.Intcptn, weather.ppt);
  c.CumIrrig = p.CumIrrig + c.Irrig;

  c.ASW = fn.ASW(soil.maxAWS, p.ASW, weather.ppt, c.Transp, c.Intcptn, c.Irrig); //for some reason spelled maxAWS

  c.WF = p.WF + c.dW * c.pF - c.litterfall * p.WF;
  // Include contribution of RootP // Error in old code !
  c.WR = p.WR + c.dW * c.pR - tree.pR.turnover * p.WR - c.RootP;
  c.WS = p.WS + c.dW * c.pS;
  c.W = c.WF+c.WR+c.WS;

  return c;
}

function init(plantation, soil) {
  var p = {};
  var tree = plantation.seedlingTree; //TODO: decide the case where we start with a coppiced tree?

  p.feedstockHarvest=0;
  p.coppiceCount=0;
  p.coppiceAge = 0;

  p.CumIrrig = 0;
  p.dW = 0;
  p.W = plantation.StockingDensity * plantation.SeedlingMass;
  p.WF = plantation.pF * p.W;
  p.WS = plantation.pS * p.W;
  p.WR = plantation.pR * p.W;
  p.ASW = 0.8 * 10 * soil.maxAWS; // The 10 is because maxAWS is in cm and ASW in mm (?) Why (?)
  p.StandAge = 0;

  tree = plantation.seedlingTree;

  // sla = Specific Leaf Area
  var sla = fn.tdp(p.StandAge,tree.SLA);

  p.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5

  // These aren't used so can be set to anything;  They are set to match the postgres type
  p.VPD        = 0;
  p.fVPD       = 0;
  p.fT         = 0;
  p.fFrost     = 0;
  p.fNutr      = 0;
  p.fSW        = 0;
  p.fAge       = 0;
  p.PAR        = 0;
  p.xPP        = 0;
  p.Intcptn    = 0;
  p.Irrig      = 0;
  p.CanCond    = 0;
  p.Transp     = 0;
  p.PhysMod    = 0;
  p.pfs        = 0;
  p.pR         = 0;
  p.pS         = 0;
  p.pF         = 0;
  p.litterfall = 0;
  p.NPP        = 0;
  p.RootP      = 0;

  return p;
}

function getWeather(model, setup, month, day) {

  if( setup.dailyStep ) {
    // actual
    if( model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day];
    }

    // modelled daily
    if( model.weather[month+'-'+day] !== undefined ) {
      return model.weather[month+'-'+day];
    }

  } else {
    // actual
    if( model.weather[model.currentDate.getFullYear()+'-'+month] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month];
    }
  }

  // modelled Monthly
  if( model.weather[month] !== undefined ) {
    return model.weather[month];
  }

  throw 'Runtime Error: no weather found for month: '+month;
}

function shouldCoppice(model, setup) {
  // do we have specific coppice dates set?
  if( setup.coppiceDates ) {
    for( var i = 0; i < setup.coppiceDates.length; i++ ) {
      var d = setup.coppiceDates[i];

      if( setup.dailyStep ) {
        if( d.getYear() === this.currentDate.getYear() &&
            d.getMonth() === this.currentDate.getMonth() &&
            d.getDate() === this.currentDate.getDate() ) {
              return true;
        }
      } else {
        if( d.getYear() === this.currentDate.getYear() &&
            d.getMonth() === this.currentDate.getMonth() ) {
              return true;
        }
      }

    }
  } else {

    // do we have an interval set?
    // TODO: this currently only works on 1st of month
    if( model.currentDate.getYear() === setup.yearToCoppice &&
      model.currentDate.getMonth() === setup.monthToCoppice ){

      setup.yearToCoppice = setup.yearToCoppice + setup.coppiceInterval; //next coppice year

      return true;
    }

  }

  return false;
}

function getFunction(name) {
  if( fn[name] ) {
    return fn[name];
  } else if( fn.coppice[name] ) {
    return fn.coppice[name];
  }
  return null;
}

module.exports = function(io) {
  return {
    io : io,
    run : run,
    singleStep : singleStep,
    runSetup : runSetup,
    init : init,
    getFunction : getFunction,
    setIO : function(io) {
      this.io = io;
    },
    getDataModel : function() {
      return dataModel;
    }
  };
};

},{"./dataModel":3,"./fn":19,"./utils":22,"./validate":23}],22:[function(require,module,exports){
function env() {
  if( typeof plv8 !== 'undefined' ) return "plv8";
  if( typeof Logger !== 'undefined' ) return "appscript";
  if( typeof module !== 'undefined' && module.exports) return "node";
}

function log(msg) {
  var e = env();
  if( e == "plv8" ) plv8.elog(NOTICE, 'notice', msg);
  else if( e == "appscript" ) Logger.log(msg);
  else console.log(msg);
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

module.exports = {
  env : env,
  log : log,
  clone : clone
}

},{}],23:[function(require,module,exports){
'use strict';

/*
 * Validate a model run setup.  throw error is badness.
 */
var dataModel = require('./dataModel');
var paramError = 'Validation Error: ';

var validWeatherKeys = [
  /^\d\d\d\d-\d\d$/, // specific weather YYYY-MM for monthly timestep
  /^\d\d$/, // modelled or average weather MM for monthly timestep
  /^\d\d\d\d-\d\d-\d\d$/, // specific weather YYYY-MM-DD for daily timestep
  /^\d\d-\d\d$/ // modelled or average weather MM-DD for daily timestep
];

module.exports = function(model) {
  validatePlantation(model);
  validateManage(model);
  validateWeather(model);
  validateSoil(model);
};

function validateManage(model) {
  if( !model.manage ) {
    throw paramError+'manage is not definied';
  }

  validateModel(dataModel.manage, model.manage, 'manage');

  if( model.manage.coppiceDates ) {
    if( !Array.isArray(model.manage.coppiceDates) ) {
      throw paramError+'manage.coppiceDates should be an array of date strings.';
    }

    for( var i = 0; i < model.manage.coppiceDates.length; i++ ) {
      if( model.manage.coppiceDates[i].match('^\d\d\d\d-\d\d$') || model.manage.coppiceDates[i].match('^\d\d\d\d-\d\d-\d\d$') ) {
        throw paramError+' invalid manage.coppiceDates format '+model.manage.coppiceDates[i]+'. should be YYYY-MM format.';
      }
    }
  } else {

    if( model.manage.dateCoppiced === undefined ) {
      throw paramError+' manage.dateCoppiced required if manage.coppiceDates not provided';
    }
    if( model.manage.yearsPerCoppice === undefined ) {
      throw paramError+' manage.yearsPerCoppice required if manage.coppiceDates not provided';
    }

  }
}

function validateWeather(model) {
  if( !model.weather ) {
    throw paramError+'No weather defined';
  }

  for( var key in model.weather ) {
    var found = false;
    for( var i = 0; i < validWeatherKeys.length; i++ ) {
      if( key.match(validWeatherKeys[i]) ) {
        found = true;
        break;
      }
    }

    if( !found ) {
      throw paramError+' invalid weather key: '+key;
    }

    validateModel(dataModel.weather, model.weather[key], 'weather');
  }
}


function validateSoil(model) {
  if( !model.soil ) {
    throw paramError+'soil is not definied';
  }

  validateModel(dataModel.soil, model.soil, 'soil');
}

function validatePlantation(model) {
  if( !model.plantation ) {
    throw paramError+'plantation is not definied';
  }
  validateModel(dataModel.plantation, model.plantation, 'plantation');

  if( !model.plantation.seedlingTree ) {
    throw paramError+'plantation.seedlingTree is not definied';
  }
  validateModel(dataModel.tree, model.plantation.seedlingTree, 'plantation.seedlingTree');

  if( !model.plantation.coppicedTree ) {
    throw paramError+'plantation.coppicedTree is not definied';
  }
  validateModel(dataModel.tree, model.plantation.coppicedTree, 'plantation.coppicedTree');
}

function validateModel(dataModel, model, name) {
  var key, item;

  for( key in dataModel.value ) {
    item = dataModel.value[key];
    if( item.required === false ) {
      continue;
    }

    if( model[key] === undefined ) {
      throw paramError+name+'.'+key+' is missing '+
            (item.description ? '('+item.description+')' : '');
    }

    if( typeof item.value === 'object' ) {
      validateModel(item, model[key], name+'.'+key);
    }
  }
}

},{"./dataModel":3}],24:[function(require,module,exports){
var gdrive = require('./gdrive');
var charts;
var inputForm;
var exporter = require('./export');
var offline = require('./offline');

// import model stuff
var model = require('../../poplar-3pg-model');
var modelIO = require('./modelIO');
model.setIO(modelIO);

var daily = true;

var runCallback = null;
var _3pgModel = null;

var inputs = {
  weather : ["month","tmin","tmax","tdmean","ppt","rad","daylight"]
};
var outputs = ["VPD","fVPD","fT","fFrost","PAR","xPP","Intcptn","ASW","CumIrrig",
           "Irrig","StandAge","LAI","CanCond","Transp","fSW","fAge",
           "PhysMod","pR","pS","litterfall","NPP","WF","WR","WS","W"];
var debug = false;
var devmode = false;

var weatherCustomChart = null;

// row raw data does a lot of processing of the results and the current state of what's
// being displayed.  Go ahead an setup the csv data at this point, then if the user
// decides to export, we are all set to to;
var csvResults = null;

var getModel = function() {
  return model;
}

var getOutputs = function() {
  return outputs;
}



var outputDefinitions = require('./outputDefinitions');


function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

var init = function(callback) {
  inputForm = require('./inputForm')(this);
  charts = require('./charts');
  charts.setApp(this);

  modelIO.app = this;
  modelIO.model = model;
  modelIO.charts = charts;
  modelIO.inputForm = inputForm;

  // check if flash is installed.  If not, hide the chart type toggle.
  require('./flashBlock-detector')(function(val){
      if( val > 0 ) $("#chart-type-btn-group").hide();
  });

  // setup export modal
  exporter.init();
  $("#export-csv").on('click', function(){
      exporter.exportCsv(csvResults);
  });

  var ele = $("#inputs-content");
  inputForm.create(ele);

  $("#runbtn, #runbtn-sm").on('click', function() {
      runModel();
  });

  // initialize the charts
  charts.init();

  // set default config
  $("#input-manage-datePlanted").val(new Date().toISOString().replace(/T.*/,''));
  $("#input-manage-dateCoppiced").val(new Date(new Date().getTime()+(86400000*2*365)).toISOString().replace(/T.*/,''));
  $("#input-manage-dateFinalHarvest").val(new Date(new Date().getTime()+(86400000*10*365)).toISOString().replace(/T.*/,''));

  // setup nice scrolling
  $('.app-nav').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $(this.hash).offset().top-55
       }, 700);
 });

  $(window).resize(function(){
      charts.resize();

      if( weatherCustomChart ) {
          weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], model.custom_weather);
      }
  });

  callback();
}


var runComplete = function(rows) {
  if ( runCallback ) runCallback(rows);
  if( hideInitLoading ) hideInitLoading();
  runCallback = null;
};

var monthsToRun = function() {
  var d1 = $("#input-manage-datePlanted").val();
  if (d1 && d1 !== "") {
      d1 = new Date($("#input-manage-datePlanted").val());
  } else {
      d1 = new Date();
  }

  var d2 = $("#input-manage-dateFinalHarvest").val();
  if (d2 && d2 !== "") {
      d2 = new Date($("#input-manage-dateFinalHarvest").val());
  } else {
      d2 = new Date();
  }

  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 1 : months+1;
}


var runModel = function(isRt) {

  if ($("#runbtn, #runbtn-sm").hasClass("disabled")) return;
  $("#runbtn, #runbtn-sm").addClass("disabled").html("Running...");

  if( !checkWeather() ) return;

  // let UI process for a sec before we tank it
  // TODO: this should be preformed w/ a webworker
  setTimeout(function() {
      ga('send', 'event', 'ui', 'interaction', 'model-run', 1);

      // read everything so the variations are set
      model.variations = {};
      modelIO.readFromInputs();

      // make sure we are only setting 2 variation parameters
      var params = [];
      for( var key in model.variations ) params.push(key);
      if( params.length > 2 ) {
          alert("There is a limit of 2 variation parameters per run.  Currently you are varying "+
                "the following parameters:\n\n -"+params.join("\n -"));
          $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
          return;
      }

      // let the world know what we are doing
      if( !isRt ) gdrive.runModelRt();

      // show what we are doing
      $("#variationAnalysisStatus").html("<b>"+(params.length == 0 ? "None" : params.join(", "))+"</b>");

      // we are only running once
      if ( params.length === 0 ) {
          ga('send', 'event', 'ui', 'interaction', 'model-run-singleParam', 1);

          runCallback = function(rows) {
              showResults(rows);
          };

          model.dailyStep = daily;
          var months = monthsToRun();
          if( daily ) months = months * 30;

          model.run(months);

      } else {
          ga('send', 'event', 'ui', 'interaction', 'model-run-variation', 1);

          // set variation order
          var runs = [];
          for( var i = 0; i < model.variations[params[0]].length; i++ ) {
              var obj = {
                  inputs : {},
                  output : null
              };
              obj.inputs[params[0]] = model.variations[params[0]][i];
              if( params.length > 1 ) {
                  for( var j = 0; j < model.variations[params[1]].length; j++ ) {
                      var t = $.extend(true, {}, obj);
                      t.inputs[params[1]] = model.variations[params[1]][j];
                      runs.push(t);
                  }
              } else {
                  runs.push(obj);
              }
          }

          runVariation(0, runs);
      }
  }, 250);
}

var runVariation = function(index, runs) {
  // set input variables for run
  var run = runs[index];
  for( var key in run.inputs ) {
      $("#input-"+key.replace(/\./g, '-')).val(run.inputs[key]);
  }

  runCallback = function(data) {
      runs[index].output = data;
      index++;

      if (runs.length == index) {
          // reset the constant to the first value
          for( var key in model.variations ) {
              $("#input-"+key.replace(/\./g, '-')).val(model.variations[key].join(", "));
          }
          showResults(runs);
      } else {
          runVariation(index, runs);
      }
  };

  var months = monthsToRun();
  if( daily ) months = months * 30;

  model.run(months);
};


var showResults = function(result) {
  var currentResults;
  if( result[0] instanceof Array ) {
      currentResults = [{
          singleRun : true,
          inputs : {},
          output : result
      }]
  } else {
    currentResults = result;
  }


  showRawOutput(currentResults);
  charts.updateCharts(currentResults, true);

  setTimeout(function() {
      $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
  }, 250);

}

// make sure all the weather is set.  #1 thing people will mess up
var checkWeather = function() {
  // first get current months we are going to run,
  var start = $("#input-manage-datePlanted").val();

  var end = $("#input-manage-dateFinalHarvest").val().split("-");
  var eMonth = parseInt(end[1]);
  var eYear = parseInt(end[0]);

  var cDate = new Date(start);

  // now see if we have custom weather coverage
  var hasCoverage = true;
  var count = 0;
  while( count < 10000 ) {
      if( !model.custom_weather ) {
          hasCoverage = false;
          break;
      }

      var m = (cDate.getMonth()+1)+'';
      var y = cDate.getFullYear();
      if( m.length == 1 ) m = '0'+m;

      if( cDate.getMonth()+1 == eMonth && y == eYear ) {
          break;
      } else if( !model.custom_weather[y+'-'+m] ) {
          hasCoverage = false;
          break;
      }

      cDate.setMonth(cDate.getMonth()+1);
      count++;
  }

  if( hasCoverage ) return true;

  // if not make sure we have averages selected
  for ( var i = 0; i < 12; i++) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

      for ( var j = 1; j < inputs.weather.length; j++) {
          var c = inputs.weather[j];
          var val = parseFloat($("#input-weather-" + c + "-" + m).val());
          if( !val && val != 0 ) {
              alert("Missing weather data: "+c+" for month "+m+"\n\n"+
                    "Did you select a location (Setup) and/or are all weather/soil fields filled out?");
              $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
              return false;
          }
      }
  }

  return true;
}

var setWeather = function(data) {
  if( !model.custom_weather ) model.custom_weather = {};

  if( data ) {
      for( var key in data ) {

          // clean up date format
          var date = key.replace(/[^\d-]/,'');
          var parts = date.split('-');

          if( parts.length < 2 ) {
              return alert('Invalid Date Format.  Dates should be in YYYY-MM format');
          }
          if ( parts[1].length != 2 ) {
              date = parts[0]+"-0"+parts[1];
          }

          model.custom_weather[date] = data[key];
      }
  }

  // create array so we can sort
  var arr = [];
  var headers = ['date'];
  for( var date in model.custom_weather ) {

      var t = [date];
      for( var key in model.custom_weather[date] ) {
          if( key == 'nrel' ) continue;
          if( arr.length == 0 ) headers.push(key);
          t.push(model.custom_weather[date][key]);
      }

      arr.push(t);
  }

  if( arr.length == 0 ) {
      $('#custom-weather-panel').html("No weather data has been uploaded.");
      return;
  }

  var html = '<div style="overflow:auto;max-height:600px"><table class="table table-striped"><tr>';

  arr.sort(function(a, b){
      var d1 = new Date(a[0]+"-01").getTime();
      var d2 = new Date(b[0]+"-01").getTime();

      if( d1 < d2 ) {
          return 1;
      } else if( d1 > d2 ) {
          return -1;
      }

      return 0;
  });

  for( var i = 0; i < headers.length; i++ ) {
      html += '<th>'+headers[i]+'</th>';
  }
  html += '</tr>';

  for( var i = 0; i < arr.length; i++ ) {
      html += '<tr><td>'+arr[i].join('</td><td>')+'</td></tr>';
  }

  $('#custom-weather-panel').html(html+'</table></div><div id="custom-weather-chart"></div>');

  setTimeout(function(){
      weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], model.custom_weather);
  }, 1000);

};

var showRawOutput = function(results) {

  // selected in the charts output
  var vars = $("#chartTypeInput").val();

  // find the rows we care about
  var chartRows = {};
  for( var i = 0; i < results[0].output[0].length; i++ ) {
      if( vars.indexOf(results[0].output[0][i]) > -1 ) chartRows[results[0].output[0][i]] = i;
  }

  var tabs = $('<ul class="nav nav-pills" id="rawOutputTabs"  data-tabs="pill"></ul>');
  var contents = $('<div class="pill-content" style="overflow:auto;margin-top:15px"></div>');

  for ( var i = 0; i < vars.length; i++) {
      tabs.append($('<li '+(i == 0 ? 'class="active"' : "")+'><a href="#rawout'
          +vars[i]+'" data-toggle="tab">'+vars[i]+'</a></li>'));

      contents.append($('<div class="pill-pane ' + (i == 0 ? 'active' : "")
          + '" id="rawout' + vars[i] + '"></div>'));
  }

  $("#output-content").html("").append(tabs).append(contents);
  $("#rawOutputTabs").tab();

  csvResults = {
      config : modelIO.exportSetup(),
      data : {}
  };

  // some rows have strings, we don't want these
  // ignore string rows
  /*for( var i = 0; i < results.length; i++ ) {
      var clean = [results[i].output[0]];
      for( var j = 1; j < results[i].output.length; j++ ) {
          if( typeof results[i].output[j][0] != 'string' ) clean.push(results[i].output[j]);
      }
      results[i].output = clean;
  }*/

  var cDate = new Date($("#input-manage-datePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];

      for( var j = 0; j < results[0].output.length; j++ ){
          csvResults.data[key][j] = [];

          // set header row
          if( j == 0 ) {
              csvResults.data[key][j].push('month');
              csvResults.data[key][j].push('date');

              table += "<tr><th>Step</th><th>Date</th>";
              for( var z = 0; z < results.length; z++ ) {
                  table += "<th>";
                  var tmp = [];

                  for( var mType in results[z].inputs ) {
                      tmp.push(mType+"="+results[z].inputs[mType]);
                      table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
                  }

                  if( tmp.length == 0 ) {
                      csvResults.data[key][j].push(key);
                      table += key;
                  } else {
                      csvResults.data[key][j].push(tmp.join(" "));
                  }
                  table += "</th>";
              }

              table += "</tr>";
          } else {
              //var date = new Date(cDate.getYear()+1900, cDate.getMonth()+j, cDate.getDate());
              //var m = date.getMonth()+1;
              //if( m < 10 ) m = '0'+m;

              table += "<tr><td>"+j+"</td><td>"+results[0].output[j][0]+'</td>';

              csvResults.data[key][j].push(j);
              csvResults.data[key][j].push(results[0].output[j][0]);

              var v;
              for( var z = 0; z < results.length; z++ ) {
                  v = results[z].output[j][chartRows[key]];
                  table += "<td>"+v+"</td>";
                  csvResults.data[key][j].push(v);
              }
              table += "</tr>";
          }

      }
      $("#rawout" + key).html(table+"</table>");
  }

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();
};

module.exports = {
  init : init,
  outputs : outputs,
  inputs : inputs,
  getModel : getModel,
  runModel : runModel,
  showRawOutput : showRawOutput,
  monthsToRun : monthsToRun,
  outputDefinitions : outputDefinitions,
  qs : qs,
  setWeather : setWeather,
  gdrive : gdrive,
  runComplete : runComplete,
  getModelIO : function() {
    return modelIO;
  }
};

},{"../../poplar-3pg-model":1,"./charts":25,"./export":26,"./flashBlock-detector":27,"./gdrive":28,"./inputForm":30,"./modelIO":31,"./offline":33,"./outputDefinitions":34}],25:[function(require,module,exports){
var app;

// only draw charts if width has changed
var cWidth = 0;

// there is no way to get the colors for the legends (to make your own)
// this post:
// gives these values.  This is a HACK, if they ever change, we need to update
var googleChartColors = ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6",
                      "#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99",
                      "#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262",
                      "#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e",
                      "#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922"
                      ,"#743411"];

var weatherChartOptions = {
  title : 'Weather',
  height : 300,
  vAxes: [{
          title: "Radiation (MJ/day); Temperature (^C); Dew Point (^C); Daylight (h)",
          minValue : -5,
          maxValue : 35
        },{
          title: "Precipitation (mm)",
          minValue : -50,
          maxValue : 350
        }],
  hAxis: {title: "Month"},
  seriesType: "bars",
  series: {
      0: {type: "line", targetAxisIndex:0},
      1: {type: "line", targetAxisIndex:0},
      2: {type: "line", targetAxisIndex:0},
      3: {type: "area", targetAxisIndex:1},
      4: {targetAxisIndex:0}
  }
}

// template for the popup
var sliderPopup = $(
      "<div class='slide-popup'>" +
          "<i class='icon-remove-circle pull-right slide-popup-close'></i>"+
          "<div id='carousel' class='owl-carousel owl-theme' style='margin-top:15px'></div>" +
	"</div>");

var sliderPopupBg = $("<div class='slide-popup-bg'>&nbsp;</div>");

// only draw charts if someone has click a checkbox
var changes = false;

// when sizing, wait a ~300ms before triggering redraw
var resizeTimer = -1;

var chartTypeSelector, chartCheckboxes, cData;

function init() {

  $("#show-chartspopup-btn").on('click',function() {
      showPopup();
  });

  // setup chart selectors
  $("#chart-modal").modal({show:false});

  // set popup click handlers
  $("#chartType-selectAll").on('click',selectAll);
  $("#chartType-unselectAll").on('click',unselectAll);

  chartTypeSelector = $("#chartTypeInput");
  chartCheckboxes = $("#chartSelections");

  var c1 = $("#chartSelections-c1");
  var c2 = $("#chartSelections-c2");
  for( var i = 0; i < app.outputs.length; i++) {
      var val = app.outputs[i];
      chartTypeSelector.append($("<option value='" + val + "' "
              + (val == 'WR' || val == 'WS' || val == 'WF' ? 'selected' : '')
              + ">" + val + "</option>"));

      if( i % 2 == 0 ) {
          c1.append($('<div class="checkbox"><label><input type="checkbox"'
                  + (val == 'WR' || val == 'WS' || val == 'WF' ? 'checked="checked"' : '')
                  + ' value="'+val+'"> '+_createDescription(val)+'</div>'));
      } else {
          c2.append($('<div class="checkbox"><label><input type="checkbox"'
                  + (val == 'WR' || val == 'WS' || val == 'WF' ? 'checked="checked"' : '')
                  + ' value="'+val+'"> '+_createDescription(val)+'</div>'));
      }
  }

  chartCheckboxes.find(".fn-toggle").on('click',function(){
      $("#"+$(this).attr("datatarget")).toggle('slow');
  });

  chartCheckboxes.find("input[type=checkbox]").on('change', function(){
      if( $(this).is(":checked") ) select($(this).attr("value"));
      else unselect($(this).attr("value"));
  });

  $("#select-charts-btn, #select-charts-title-btn").on('click', function(){
      $("#chart-modal").modal('show');
      changes = false;
  });

  $(".chart-modal-close").on('click', function(){
      $("#chart-modal").modal('hide');
      if( changes && cData ) {
          setTimeout(function(){
              updateCharts();
              // update raw data as well
              app.showRawOutput(cData);
          },400);

      }
  });

  $(".chart-type-toggle").on('click', function(){
      if( !$(this).hasClass("active") ) {
          $(".chart-type-toggle.active").removeClass("active");
          $(this).toggleClass("active");
          updateCharts();
      }
  });
}

// make sure and end label tag
function _createDescription(val) {
  if( !app.outputDefinitions[val] ) return "<b>"+val+"</b></label>";

  var desc = app.outputDefinitions[val];
  var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
  var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";

  var label = "<b>"+val+"</b><span style='font-size:12px'>"+label+units+"</span></label>";
  var hasDesc = desc.description && desc.description.length > 0;
  if( hasDesc ) {
      label += "<div style='font-size:11px;color:#888;font-style:italic'>"+desc.description;
  }

  var fName = desc.altFnName || val;
  var fn = app.getModel().getFunction(fName);

  if( fn || desc.fn ) {
      if( !hasDesc ) label += "<div style='font-size:11px'>";
      label += " <a style='font-style:normal;cursor:pointer' datatarget='fn-desc-"+val+"' class='fn-toggle'>fn()</a></div>";

      label += "<div id='fn-desc-"+val+"' style='display:none;font-size:11px;overflow:auto' class='well well-sm'>"+
                  (fn||desc.fn).toString().replace(/ /g,'&nbsp;').replace(/\n/g,'<br />')+"</div>";
  } else if ( hasDesc ) {
      label += "</div>";
  }

  // TODO: add fn well
  return label+"<br />";
}

function select(val) {
  chartTypeSelector.find("option[value="+val+"]").attr("selected","selected");
  chartCheckboxes.find("input[value="+val+"]").prop("checked",true);
  changes = true;
}

function unselect(val) {
  chartTypeSelector.find("option[value="+val+"]").removeAttr("selected");
  chartCheckboxes.find("input[value="+val+"]").prop("checked",false);
  changes = true;
}

function selectAll() {
  for( var i = 0; i < app.outputs.length; i++) select(app.outputs[i]);
}

function unselectAll() {
  for( var i = 0; i < app.outputs.length; i++) unselect(app.outputs[i]);
}

function remove(ele) {
  ele.parent().hide('slow', function(){
      ele.parent().remove();
      unselect(ele.attr('type'));
  });

}

function print(chartContainer) {
  ga('send', 'event', 'ui', 'interaction', 'print-chart', 1);


var disp_setting="toolbar=yes,location=no,directories=yes,menubar=yes,";
  disp_setting+="scrollbars=yes,width=800, height=600, left=25, top=25";

  var svg = chartContainer.find("svg");
  var html = chartContainer.find("div").html();

  var docprint=window.open("","",disp_setting);
  docprint.document.open();
  docprint.document.write('<html><head><title></title>');
  docprint.document.write('</head><body marginwidth="0" marginheight="0" onLoad="self.print()"><center>');
  docprint.document.write(html);
  docprint.document.write('</center></body></html>');
  docprint.document.close();
  docprint.focus();

}


function setData(data) {
  cData = data;
}

// basically redraw everything
function resize() {
  // require more than a 30 pixel width change (so we don't redraw w/ scroll bars added)
  var winWidth = $(window).width();
  if( cWidth > winWidth - 15 && cWidth < winWidth + 15 ) return;
  cWidth = winWidth;

  if( resizeTimer != -1 ) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
      resizeTimer = -1;
      updateCharts();
  },300);
}

function updateCharts(results, animate) {
  if( results ) setData(results);
  if( !cData ) return;

  $("#show-chartspopup-btn").show();

  // create a legend if there is more than one run
  var legend = "";
  if( !cData[0].singleRun ) {
      var c1 = "";
      var c2 = "";
      for( var i = 0; i < cData.length; i++ ) {
          var ele = "<div style='min-height:40px;margin-bottom:10px'><div class='legend-square' style='background-color:"+googleChartColors[i]+"'>&nbsp;</div>";
          for( var mType in cData[i].inputs ) {
              ele += "<div class='legend-text'>"+mType+"="+cData[i].inputs[mType]+"</div>";
          }

          if( i % 2 == 0 ) c1 += ele + "</div>"
          else c2 += ele + "</div>"
      }
      legend = "<div><a id='legend-panel-toggle' style='margin-left:5px;cursor:pointer'>Legend</a></div>"+
               "<div style='border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:15px'>"+
               "<div class='row' id='legend-panel'><div class='col-sm-6'>"+c1+"</div>"+
               "<div class='col-sm-6'>"+c2+"</div>"+
               "</div></div>";
  }
  $("#chart-content").html(legend);
  $("#legend-panel-toggle").on('click', function(){
      $("#legend-panel").toggle("slow");
  });


  var types = chartTypeSelector.val();
  for ( var i = 0; i < types.length; i++) {
      _showMainChart(types[i], animate);
  }
}

function showPopup() {
  ga('send', 'event', 'ui', 'interaction', 'show-chart-popup', 1);


  sliderPopup.find(".owl-theme").html("");
  $('body').scrollTop(0).css('overflow','hidden').append(sliderPopupBg).append(sliderPopup);

  // this could case badness....  why doesn't it live when removed from DOM?
  sliderPopup.find('.slide-popup-close').on('click',function(){
      hidePopup();
  });

  var types = chartTypeSelector.val();
  for ( var i = 0; i < types.length; i++) {
      _showPopupChart(types[i]);
  }

  $('#carousel').owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });
}

function hidePopup() {
  sliderPopupBg.remove();
  sliderPopup.remove();
  $('body').css('overflow','auto');
}

function _showMainChart(type, animate) {
  var chartType = $(".chart-type-toggle.active").attr("value");
  var panel = $("<div />");
  var outerPanel = $("<div>"+
  	"<a class='btn btn-xs btn-default' style='"+(chartType != "timeline" ? "position:absolute;z-index:10;margin:0 0 -20px 20px" : "margin-bottom:5px")+
      "' type='"+type+"'>" +
  	"<i class='icon-remove'></i> "+type+"</a></div>");
  outerPanel.find("a").on('click', function(){
          remove($(this));
  });
  if( chartType == "timeline" ) outerPanel.css("margin-bottom","20px");
  $("#chart-content").append(outerPanel.append(panel));
  _createChart(type, chartType, panel, false, null, animate);
}

function _showPopupChart(type) {
  var panel = $("<div class='item'></div>");

  var printBtn = $("<a class='btn btn-sm btn-default' style='margin-left:16px'><i class='icon-print'></i> Print</a>").on('click',function(){
     print(chartPanel);
  });
  panel.append(printBtn);

  var chartPanel = $("<div></div>");
  panel.append(chartPanel);

  sliderPopup.find(".owl-theme").append(panel);
  _createChart(type, 'line', chartPanel, true, [Math.round($(window).width()*.88), Math.round(($(window).height()*.90)-125)]);
}

function _createChart(type, chartType, panel, showLegend, size, animate) {
  var col = 0;

  var dt = new google.visualization.DataTable();

  if( chartType == 'timeline' ) {
      dt.addColumn('date', 'Month');
  } else {
      //dt.addColumn('number', 'Month');
      dt.addColumn('string', 'Month');
  }

  // set the first column
  if( !cData[0].singleRun ) {
      for( var i = 0; i < cData.length; i++ ) {
          var label = "";
          for( var key in cData[i].inputs ) {
              label += key.replace(/.*\./,'')+"="+cData[i].inputs[key]+" \n";
          }
          label = label.replace(/,\s$/,'');
          dt.addColumn('number', label);
      }
  } else {
      dt.addColumn('number', type);
  }

  // find the column we want to chart
  for ( var i = 0; i < cData[0].output[0].length; i++) {
      if (cData[0].output[0][i] == type) {
          col = i;
          break;
      }
  }

  var cDate = new Date($("#input-manage-datePlanted").val());

  var data = [];
  var max = 0;
  // create the [][] array for the google chart
  for ( var i = 1; i < cData[0].output.length; i++) {
      //if (typeof cData[0].output[i][col] === 'string') continue;

      var row = [];

      //var date = new Date(cDate.getYear()+1900, cDate.getMonth()+i, cDate.getDate());
      if( chartType == "timeline" ) {
          // add on month
          row.push(new Date(cData[0].output[i][0]));
      } else {
          row.push(cData[0].output[i][0]);
      }

      for ( var j = 0; j < cData.length; j++) {
          if( cData[j].output[i][col] > max ) max = cData[j].output[i][col];
          row.push(cData[j].output[i][col]);
      }

      data.push(row);
  }

  dt.addRows(data);

  if( app.outputDefinitions[type] ) {
      var desc = app.outputDefinitions[type];
      var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
      var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";
      type = type+label+units;
  }


  var options = {
          vAxis : {
              title : type
          },
          hAxis : {
              title : "Month"
          }
  }
  if( !showLegend ) options.legend = {position:"none"};

  if( size ) {
      options.width = size[0];
      options.height = size[1];
  } else {
      options.width = panel.width();
      options.height = options.width*.4;
  }
  panel.width(options.width).height(options.height);

  if( chartType == 'timeline' ) {
      options.displayAnnotations = true;
      var chart = new google.visualization.AnnotatedTimeLine(panel[0]);
      chart.draw(dt, options);
  } else {
      var chart = new google.visualization.LineChart(panel[0]);
      chart.draw(dt, options);
  }
}

function createWeatherChart(root, data) {
  $(root).html('');

  var dt = new google.visualization.DataTable();
  dt.addColumn('string', 'Month');
  dt.addColumn('number', 'Min Temperature');
  dt.addColumn('number', 'Max Temperature');
  dt.addColumn('number', 'Dew Point');
  dt.addColumn('number', 'Precipitation');
  dt.addColumn('number', 'Radiation');
  dt.addColumn('number', 'Daylight');

  for( var date in data ) {
      var obj = data[date];
      dt.addRow([
          date+'',
          obj.tmin || 0,
          obj.tmax || 0,
          obj.tdmean || 0,
          obj.ppt || 0,
          obj.rad || 0,
          obj.daylight || 0
      ]);
  }

  var chart = new google.visualization.ComboChart(root);
  chart.draw(dt, weatherChartOptions);

  return chart;
}


module.exports = {
  setApp : function(a) {
    app = a;
  },
    init : init,
    setData : setData,
    select : select,
    unselect : unselect,
    selectAll : selectAll,
    unselectAll : unselectAll,
    updateCharts : updateCharts,
    remove : remove,
    showPopup: showPopup,
    hidePopup: hidePopup,
    resize : resize,
    createWeatherChart : createWeatherChart
}

},{}],26:[function(require,module,exports){
var gdrive = require('./gdrive');

function init() {
  $("#export-modal").modal({
          show : false
      });

      $("#show-export-csv").on('click', function(){
        _setMessage(null);

        $("#export-name").val("3PG Model Results ("+new Date().toISOString().replace(/T/,' ').replace(/\.\d*Z/,'')+")");
          $("#export-modal").modal('show');
      });
}

function _setMessage(msg, type, progress) {
  if( !msg ) {
    return $("#export-msg").hide();
  }
  $("#export-msg").show();

  if( progress ) {
    $("#export-msg-progress").show();
  } else {
    $("#export-msg-progress").hide();
  }

  $('#export-msg').attr("class",'alert alert-'+type);
  $('#export-msg-text').html(msg);
}

function _updateProgress(index, total) {
  percent = 100 * ( index / total );
  $("#export-msg-progress-bar").attr("aria-valuenow", percent).css("width",percent+"%");
}

// see if an error exists, if so, set state
function _checkError(file) {
  var errorMessage = null;
  if( !file ) errorMessage = "Error creating file on Google Drive :(";
  if( file.error ) errorMessage = file.message;

  if( errorMessage ) {
    _setMessage(errorMessage, "danger");
    $("#export-csv").removeClass("disabled").html("Export");
    return true;
  }
  return false;
}

  // export as csv
function exportCsv(results) {
  ga('send', 'event', 'ui', 'interaction', 'export-drive-csv', 1);

  $("#export-csv").addClass("disabled").html("Exporting...");

  var name = $("#export-name").val();
  if( name.length == 0 ) {
    _setMessage("Please provide a folder name", "danger")
    $("#export-csv").removeClass("disabled").html("Export");
    return;
  }

  var data = results.data;

  // create a list so we can recursively iterate
  var keys = [];
  for( var key in data ) keys.push(key);

  // create folder
  _setMessage("Creating export folder...", "info", true);
  _updateProgress(1, keys.length+2);
  gdrive.saveFile(name,"AHB 3PG Model Results","application/vnd.google-apps.folder","",function(file){
    if( _checkError(file) ) return;
    var parent = file.id;
    _updateProgress(2, keys.length+2);

    // create a nice file describing the current export
    _setMessage("Creating config file...", "info", true);
    delete results.config.plantation_state;
    var config = JSON.stringify(results.config,null,"  ");
    gdrive.saveFile("config.txt","AHB 3PG Model - Run Configuration","text/plain",config,function(file){
      if( _checkError(file) ) return;
      _updateProgress(3, keys.length+2);

      _createExport(0, keys, data, parent);
    },{parent: parent})
  });
}

function _createExport(index, keys, data, parent) {

  // we are all done :)
  if( index == keys.length ) {
    _updateProgress(1, 1);
    _setMessage("Export Successful.<br /><a href='https://drive.google.com/#folders/" + parent +
          "' target='_blank'><i class='icon-external-link-sign'></i> Open in Google Drive</a>", "success");
    $("#export-csv").removeClass("disabled").html("Export");
  } else {

    var key = keys[index];
    var csv = "";

    // TODO: add month and date

    for( var i = 0; i < data[key].length; i++ ) {
      if( data[key][i].length == 0 ) continue; // ignore the blank rows

      for( var j = 0; j < data[key][i].length; j++ ) csv += data[key][i][j]+",";
      csv = csv.replace(/,$/,'')+"\n";
    }

    _setMessage("Creating "+keys[index]+".csv... ", "info", true);
    gdrive.saveFile(keys[index]+".csv","","text/csv",csv,function(file){
      if( _checkError(file) ) return;

      _updateProgress(index+4, keys.length+2);

      index++;
      _createExport(index, keys, data, parent);
    },{convert: true, parent: parent});
  }
};

module.exports = {
  exportCsv : exportCsv,
  init      : init
};

},{"./gdrive":28}],27:[function(require,module,exports){
// https://github.com/browserstack/flashblock-detector

module.exports = function(callbackMethod){
    var return_value = 0;

    if(navigator.plugins["Shockwave Flash"]) {
          embed_length = $('embed').length;
          object_length = $('object').length;

          if((embed_length > 0) || (object_length > 0)) {
              /* Mac / Chrome using FlashBlock + Mac / Safari using AdBlock */
              $('object, embed').each(function() {
                    if($(this).css('display') === 'none'){
                        return_value = 2;
                    }
              });
          } else {
              /* Mac / Firefox using FlashBlock */
              if( $('div[bginactive]').length > 0 ){
                    return_value = 2;
              }
          }
    } else if(navigator.userAgent.indexOf('MSIE') > -1) {
          try {
              new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          } catch(e) {
              return_value = 2;
          }
    } else {
          /* If flash is not installed */
          return_value = 1;
    }

    if(callbackMethod && typeof(callbackMethod) === "function") {
          callbackMethod(return_value);
    } else {
          return return_value;
    }
};

},{}],28:[function(require,module,exports){
var Oauth = require('./oauth');
var gdriveRT = require('./gdriveRT');
var app;


var MIME_TYPE = "application/vnd.ahb-3pg.run";
var TREE_MIME_TYPE = "application/vnd.ahb-3pg.tree";
var DRIVE_API_VERSION = "v2";

// google oauth access token
var token = "";

// currently loaded gdrive file id
var loadedFile = null;
// list of currently loaded files (metadata)
var fileList = [];
// google drive share client
var client = null;

// loaded tree and management
var loadedTree = null;
// list of currently loaded tree files (metadata)
var treeList = [];

// current MIME TYPE we are saving
var saveMimeType = "";

/***
 *  Initialize google drive panels, btns and login
 ***/
function init(application, callback) {
  app = application;
  gdriveRT.setApp(app);

  // init bootstrap modal
  $("#save-modal").modal({
    show : false
  });

  // init bootstrap modal
  $("#load-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#about-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#help-modal").modal({
    show : false
  });

  // set the 'update' btn click handler
  $("#save-update-btn").on('click', function() {
    _updateCurrentFile();
  });

  // set the 'new' btn click handler
  $("#save-new-btn").on('click', function() {
    _saveNewFile();
  });

  // create the top right menu
  _createLoginBtn();

  // load the google auth and drive api's
  _loadApi(function() {
    // if the user is authorized grab the refresh token
    Oauth.isAuthorized(function(refreshToken){
      // if there is no refresh token, leave, we are initialized
      if( !refreshToken ) return callback();

      // if we have a refesh token, then user is all set,
      // get a new access token so we can start using the api's
      // grab their information and display
      Oauth.getAccessToken(function(t){
        token = t;
        if( token ) _setUserInfo();
        callback();
      });
    });

    // check if access token has expired
    setInterval(function() {
      _checkToken();
    }, 1000 * 5 * 60);
  });

  // setup the tree 'share' btn
  $("#share-tree-btn").on('click', function(){
    // see if we have a share client
    if( client == null ) {
      // no client, load api
      gapi.load('drive-share', function(){
        // on load, show the share popup with the current tree
         client = new gapi.drive.share.ShareClient(Oauth.APP_ID);
          client.setItemIds([loadedTree]);
         client.showSettingsDialog();
       });
    } else {
      // we have a client, show the share popup with current tree
      client.setItemIds([loadedFile]);
       client.showSettingsDialog();
    }
  });

}

/***
 * Save the current model as a new google drive file
 ***/
function _saveNewFile() {
  ga('send', 'event', 'ui', 'interaction', 'save-drive-file', 1);

  // grab the name of the new file
  var name = $("#save-name-input").val();
  if( name.length == 0 ) { // we always want a name, alert and quit
    _setSaveMessage('Please provide a filename.','info');
    return;
  }

  // see what kind of file we are creating based on the saveMimeType var
  if( saveMimeType == MIME_TYPE ) {
    data = app.getModelIO().exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    data = app.getModelIO().exportSetup().tree;
  } else { // badness
    alert("Unknown MIME_TYPE: "+saveMimeType);
    return;
  }

  // set the user know what we are doing
  _setSaveMessage('<i class="icon-spinner icon-spin"></i> Saving File...','info');

  // save the file
  saveFile(name,
      $("#save-description-input").val(),
      saveMimeType,
      data,
      function(resp) {
        // let the user know what happened
        if( resp.error ) return _setSaveMessage('Failed to save to Google Drive :(','danger');
        else _setSaveMessage('Sucessfully saved.','success');

        // wait a tick to hide the popup, so user sees success message
        setTimeout(function(){
          $("#save-modal").modal('hide');
        },1500);

        // show the share btn
        if( saveMimeType == MIME_TYPE ) {
          // we have a new file, update our list
          _updateFileList();

          // show the share btns
          $("#share-btn").parent().show();
          $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+resp.id).parent().show();

          // set the loaded file id
          loadedFile = resp.id;
        } else if ( saveMimeType == TREE_MIME_TYPE ) {
          // we have a new tree, update the list
          _updateTreeList();

          // show the tree share btns
          $("#share-tree-btn").show();
          $("#loaded-tree-name").html(name).parent().show();

          // set the loaded trees
          loadedTree = resp.id;
        }
      }
  );
}

/***
 * Update the currently loaded google drive file
 ***/
function _updateCurrentFile() {
  ga('send', 'event', 'ui', 'interaction', 'update-drive-file', 1);

  // let the user know what we are doing
  _setSaveMessage('<i class="icon-spinner icon-spin"></i> Updating...','info');

  var file = {};
  var data = {};

  // grab the corrent data and fileid based on mimeType
  if( saveMimeType == MIME_TYPE ) {
    file = loadedFile;
    data = app.getModelIO().exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    file = loadedTree;
    data = app.getModelIO().exportSetup().tree;
  } else { // badness
    alert("Unknown MIME_TYPE: "+saveMimeType);
    return;
  }

  // update the google drive file
  updateFile(file,
      data,
      function(resp){
        // let the user know what happened
        if( resp.error ) return _setSaveMessage('Failed to update on Google Drive :(','danger');
        else _setSaveMessage('Update Successful.','success');

        // wait a tick so the user knows update was success
        setTimeout(function(){
          $("#save-modal").modal('hide');
        },1500);

        // update the list for whatever type was updated
        if( saveMimeType == MIME_TYPE ) {
          _updateFileList();
        } else if ( saveMimeType == TREE_MIME_TYPE ) {
          _updateTreeList();
        }
      }
  );
}

/***
 * set a message for the 'load from drive' popup.
 *  type - boostrap alert type
 ***/
function _setLoadMessage(msg, type) {
  if( !msg ) return $("#gdrive-file-msg").html("");
  $('#gdrive-file-msg').html('<div class="alert alert-'+type+'">'+msg+'</div>');
}

/***
 * set a message for the 'save to drive' popup
 * type - boostrap alert type
 ***/
function _setSaveMessage(msg, type) {
  if( !msg ) return $("#gdrive-save-msg").html("");
  $('#gdrive-save-msg').html('<div class="alert alert-'+type+'">'+msg+'</div>');
}

/***
 * create the top right menu. This menu is for when the user is not logged in
 ***/
function _createLoginBtn() {
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle" style="cursor:pointer">Login<b class="caret"></b></a>'
      + '<ul class="dropdown-menu">'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '<li><a id="login-with-google"><i class="icon-signin"></i> Login with Google</a></li>'
      + '</ul></li>');

  // set click handlers for popup
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // about click handler
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // login click handler
  btn.find('#login-with-google').on('click',function() {
    ga('send', 'event', 'ui', 'interaction', 'user-login', 1);
    btn.toggleClass('open');
    signIn(function(token) {
      _setUserInfo();
    });
  });

  // add menu
  $("#login-header").html("").append(btn);
};

/***
 * Create the top right menu for when the user is logged in
 ***/
function _createLogoutBtn(userdata) {
  // set btn html
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle" style="cursor:pointer"><img class="img-rounded" src="'+userdata.picture
      + '" style="margin:-5px 5px -5px 0;width:28px;height:28px;border:1px solid white" /> ' + userdata.name
      + '<b class="caret"></b></a>' + '<ul class="dropdown-menu">'
      + '<li><a id="save"><i class="icon-cloud-upload"></i> Save Model</a></li>'
      + '<li style="display:none"><a id="share-btn"><i class="icon-share"></i> Share Model</a></li>'
      + '<li style="display:none"><a id="open-in-drive" target="_blank"><i class="icon-external-link-sign"></i> Open in Google Drive</a></li>'
      + '<li><a id="load"><i class="icon-cloud-download"></i> Load Model</a></li>'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '<li><a id="logout"><i class="icon-signout"></i> Logout</a></li>'
      + '</ul></li>');

  // add click handler to show menu
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // show the save popup
  btn.find('#save').on('click', function() {
    // set the current save mimeType
    saveMimeType = MIME_TYPE;

    // let the user know what typ they are saving
    $("#gdrive-save-subheader").html("<h5>Save Model</h5>");

    btn.toggleClass('open');

    // if the file is loaded, show the update panel
    if( loadedFile != null) {
      // grab the current files metadata
      var file = {};
      for( var i = 0; i < fileList.length; i++ ) {
        if( fileList[i].id == loadedFile) {
          file = fileList[i];
          break;
        }
      }

      // show the update panel
      $("#save-update-panel").show();

      // render the files metadata in the update panel
      var d = new Date(file.modifiedDate);
      $("#save-update-panel-inner").html("<b>"+file.title+"</b><br />" +
          "<span style='color:#888'>"+file.description+"</span><br />"+
          "<span style='font-style:italic;font-size:11px;'>Last Modified: " +
          d.toDateString()+" "+d.toLocaleTimeString()+" by "+file.lastModifyingUserName+"</span><br />"+
          "<a href='https://drive.google.com/file/d/"+file.id+"'' target='_blank'><i class='icon-link'></i> " +
          "Link to Share</a> <span style='color:#888'>(must have permission)</span><br /><br />");
    } else {
      $("#save-update-panel").hide();
    }

    // clear any message
    _setSaveMessage(null);

    // show the save popup
    $("#save-modal").modal('show');
  });

  // click handler for share btn
  btn.find("#share-btn").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'open-drive-share', 1);

    // has the share client been loaded
    if( client == null ) {
      // load the share popup
      gapi.load('drive-share', function(){
        // create and show the share popup
         client = new gapi.drive.share.ShareClient(Oauth.APP_ID);
          client.setItemIds([loadedFile]);
         client.showSettingsDialog();
       });
    } else {
      // show the share popup
      client.setItemIds([loadedFile]);
       client.showSettingsDialog();
    }
  });

  // show about panel
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // show the 'load from drive' panel
  btn.find('#load').on('click', function() {
    btn.toggleClass('open');

    // hide any existing message
    _setLoadMessage(null);

    // render the model files in the popup files
    _showDriveFiles();

    // show the modal
    $("#load-modal").modal('show');
  });

  // load the user out
  btn.find('#logout').on('click', function() {
    ga('send', 'event', 'ui', 'interaction', 'user-logout', 1);

    btn.toggleClass('open');

    // kill the access token
    token = null;

    // update the menu panel
    _createLoginBtn();
  });

  // attach the menu
  $("#login-header").html("").append(btn);
};

/***
 *  Request the user's information.  When loaded, update the top right menu
 ***/
function _setUserInfo() {
  // load user name
  $.ajax({
    url : "https://www.googleapis.com/oauth2/v1/userinfo",
    beforeSend : function(request) {
      // always set your access stoken
      request.setRequestHeader("Authorization",'Bearer '+ token.access_token);
    },
    success : function(data, status,xhr) {
      // parse your json response
      try {
        data = JSON.parse(data);
      } catch (e) {}

      // update top right menu
      _createLogoutBtn(data);

      // set to window scope
      window.userinfo = data;
    },
    error : function() {
      // TODO: should we alert this?
    }
  });

  // load user files, trees
  _updateFileList();
  _updateTreeList();
}

/***
 *  Search for the users models
 *
 * TODO: add search to the following functions,
 *  limit to 10 results
 ***/
function _updateFileList() {
  listFiles("mimeType = '"+MIME_TYPE+"'", function(resp){
    fileList = resp.result.items;
  });
}

/***
 *  Search for the users trees
 *
 * TODO: add search to the following functions,
 *  limit to 10 results
 ***/
function _updateTreeList() {
  listFiles("mimeType = '"+TREE_MIME_TYPE+"'", function(resp){
    treeList = resp.result.items;
  });
}

/***
 *  Render the users current models onto the 'load from drive' popup
 ***/
function _showDriveFiles() {
  // if they have no files, say so and get out of here
  if( !fileList ) return $("#gdrive-file-list").html("<li>No Files</li>");
  if( fileList.length == 0 ) return $("#gdrive-file-list").html("<li>No Files</li>");

  // show a title, there are multiple types that can be loaded from drive
  $("#gdrive-file-list").html("<h4>Select File</h4>");

  // create the list elements for each files metadata
  for( var i = 0; i < fileList.length; i++ ) {
    var item = fileList[i];
    var d = new Date(item.modifiedDate);
    $("#gdrive-file-list").append(
      $("<li class='list-group-item'><a id='"+item.id+"' url='"+item.downloadUrl+"' style='cursor:pointer'><i class='icon-file'></i> "+item.title+"</a>" +
        "<div style='color:#888;padding: 5px 0 0 10px'>"+item.description+"</div>"+
        "<div style='font-style:italic;font-size:11px;padding-left:10px'>Last Modified: "+d.toDateString()+" "+d.toLocaleTimeString()+" by "+item.lastModifyingUserName+"<div></li>"
        )
    );
  }

  // add click handler for each file
  $("#gdrive-file-list a").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'load-drive-model', 1);

    var id = $(this).attr("id");

    // let the user know what we are doing
    _setLoadMessage('<i class="icon-spinner icon-spin"></i> Loading File...','info');

    // grab the five from drive
    getFile(id, $(this).attr("url"), function(file) {
      // if badness, let the user know
      if( !file  ) return _setLoadMessage('Failed to load file from Google Drive :(','danger');
      if( file.error  ) return _setLoadMessage('Failed to load file from Google Drive :(','danger');

      // hide any loaded trees,
      $("#share-tree-btn").hide();
      $("#loaded-tree-name").html("").parent().hide();
      loadedTree = null;

      // let the user know we are all good
      _setLoadMessage('File Loaded.','success');

      // set the loaded file id
      loadedFile = id;

      // set the loaded file name
      for( var i = 0; i < fileList.length; i++ ) {
        if( id == fileList[i].id ) {
          $("#loaded-model-title").html("<span style='color:#333'>Loaded Model </span> "+fileList[i].title);
        }
      }

      // show the share btn
      $("#share-btn").parent().show();
      $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+id).parent().show();

      // setup model
      app.getModelIO().loadSetup(id, file);

      // setup realtime events
      gdriveRT.initRtApi(loadedFile);

      // wait a tick so user can see success message
      setTimeout(function(){
        // hide the modal
        $("#load-modal").modal('hide');
      },1500);

    });
  });
}

/***
 *  Render the users current trees onto the 'load from drive' popup
 ***/
function _showTreeFiles() {
  // update the list header, let user know what they are selecting
  $("#gdrive-file-list").html("");
  $("#gdrive-file-list").append($("<li class='list-group-item'><h5>Select Tree</h5></li>"));

  // if there are no trees, say so and get out of here
  if( !treeList ) return $("#gdrive-file-list").append($("<li class='list-group-item'>No Trees Available</li>"));
  if( treeList.length == 0 ) return $("#gdrive-file-list").append($("<li class='list-group-item'>No Trees Available</li>"));

  // create the tree list elements
  for( var i = 0; i < treeList.length; i++ ) {
    var item = treeList[i];
    var d = new Date(item.modifiedDate);
    $("#gdrive-file-list").append(
      $("<li class='list-group-item'><a id='"+item.id+"' name='"+item.title+"' url='"+item.downloadUrl+"' style='cursor:pointer'><i class='icon-leaf'></i> "+item.title+"</a>" +
        "<div style='color:#888;padding: 5px 0 0 10px'>"+item.description+"</div>"+
        "<div style='font-style:italic;font-size:11px;padding-left:10px'>Last Modified: "+d.toDateString()+" "+d.toLocaleTimeString()+" by "+item.lastModifyingUserName+"<div></li>"
        )
    );
  }

  // add click handler for titles
  $("#gdrive-file-list a").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'load-drive-tree', 1);

    var id = $(this).attr("id");
    var name = $(this).attr("name");

    // tell the user we are loading
    _setLoadMessage('<i class="icon-spinner icon-spin"></i> Loading Tree...','info');

    // load file from drive
    getFile(id, $(this).attr("url"), function(file) {
      // if badness, let user know
      if( !file  ) return _setLoadMessage('Failed to load tree from Google Drive :(','danger');
      if( file.error  ) return _setLoadMessage('Failed to load tree from Google Drive :(','danger');

      // show the tree sharing btns
      $("#share-tree-btn").show();
      $("#loaded-tree-name").html(name).parent().show();

      // let the user know we are succesfull
      _setLoadMessage('Tree Loaded.','success');

      // set the loaded tree id
      loadedTree = id;

      // loaded tree into model / UI
      app.getModelIO().loadTree(file);

      // wait a sec so user can see success message
      setTimeout(function(){
        $("#load-modal").modal('hide');
      },1500);

    });
  });
}

/***
 *  show the user the load tree popup
 ***/
function showLoadTreePanel() {
  // render the trees into the popup list
  _showTreeFiles();
  // clear any messages
  _setLoadMessage(null);
  // show the popup
  $("#load-modal").modal('show');
}

/***
 *  show the user the save tree popup
 ***/
function showSaveTreePanel() {
  // set the current mimeType we are saving
  saveMimeType = TREE_MIME_TYPE;

  // set the header so user knows what type they are saving
  $("#gdrive-save-subheader").html("<h5>Save Tree</h5>");

  // if there is a current tree, show the update panel
  if( loadedTree != null) {
    // find the current tree based on id
    var tree = {};
    for( var i = 0; i < treeList.length; i++ ) {
      if( treeList[i].id == loadedTree) {
        tree = treeList[i];
        break;
      }
    }

    // show the update panel
    $("#save-update-panel").show();

    // render tree metadata on update panel
    var d = new Date(tree.modifiedDate);
    $("#save-update-panel-inner").html("<b>"+tree.title+"</b><br />" +
        "<span style='color:#888'>"+tree.description+"</span><br />"+
        "<span style='font-style:italic;font-size:11px;'>Last Modified: " +
        d.toDateString()+" "+d.toLocaleTimeString()+" by "+tree.lastModifyingUserName+"</span><br />"+
        "<a href='https://drive.google.com/file/d/"+tree.id+"'' target='_blank'><i class='icon-link'></i> Open in Google Drive</a>");
  } else {
    // don't show the update panel, this is a new tree
    $("#save-update-panel").hide();
  }

  // clear any message
  _setSaveMessage(null);

  // show the popup
  $("#save-modal").modal('show');
}

/***
 * Load a model based on passed id.  This function is really only for loading model on start, when a file id
 * has been passed in the url either from google drive or from the ?file=id url.
 ***/
var loginModalInit = false;
function load(id, loadFn) {
  // if we don't have an access token, we need to sign in first
  // TODO: if this is a public file, there is no reason to sign in... solution?
  if( !token ) {

    if( !loginModalInit ) {
      $('#google-modal-login').on('click', function(){
        // sign the user in (force oauth popup)
        signIn(function(token) {
          $('#login-modal').modal('hide');

          // set the user information in top left
          _setUserInfo();

          if( loadFn ) loadFn();

          getFileMetadata(id, function(metadata){
            getFile(id, metadata.downloadUrl, function(file) {
              _onInitFileLoaded(metadata,file);
            });
          });

        });
      });

      $('#login-modal').modal();
      loginModalInit = true;
    } else {
      $('#login-modal').modal('show');
    }

  } else {
    if( loadFn ) loadFn();

    getFileMetadata(id, function(metadata){
      getFile(id, metadata.downloadUrl, function(file) {
        _onInitFileLoaded(metadata,file);
      });
    });
  }
}

/***
 * Initialize UI / model when a file is loaded at start
 ***/
function _onInitFileLoaded(metadata, file) {
  // baddness, let the user know
  if( !file ) {
    if( hideInitLoading ) hideInitLoading();
    return alert("Failed to load from Google Drive :/");
  }

  // metadata failed to load, more badness
  if( metadata.code == 404 ) {
    if( hideInitLoading ) hideInitLoading();
    return alert("Google Drive: "+metadata.message);
  }

  // we loaded a model, setup and run
  if( metadata.mimeType == MIME_TYPE ) {
    // set the currently loaded file id
    loadedFile = metadata.id;

    // show the share btn
    $("#share-btn").parent().show();
    $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+metadata.id).parent().show();

    // show title
    $("#loaded-model-title").html("<span style='color:#333'>Loaded Model </span> "+metadata.title);

    // setup model
    app.getModelIO().loadSetup(metadata.id, file);

    // setup realtime events
    gdriveRT.initRtApi(loadedFile);
  } else if ( metadata.mimeType == TREE_MIME_TYPE ) { // we loaded a tree
    // set the loaded tree id
    loadedTree = metadata.id;

    // show the share btn
    $("#share-tree-btn").show();
    $("#loaded-tree-name").html(metadata.title).parent().show();

    // set the loaded tree
    app.getModelIO().loadTree(file);

    // hide the loading popup
    if( hideInitLoading ) hideInitLoading();
  } else {
    alert("Loaded unknown file type from Google Drive: "+metadata.mimeType);
  }
}

/***
 * tokens expire, every once in awhile check the current token hasn't
 * if it has, then update
 ***/
function _checkToken() {
  // ignore if there is no token
  if (!token) return;

  // otherwise, look to update the access token
  Oauth.getAccessToken(function(t) {
    if( t != null ) token = t;
  });
};

/***
 * is the current user signed in?
 ***/
function checkSignedIn(callback) {
  // if isAutherized returns a token, user is logged in
  Oauth.isAuthorized(function(token){
    if (token != null) callback(true);
    else callback(false);
  });
};

/***
 * Sign a user in using the Oauth class
 ***/
function signIn(callback) {
  Oauth.authorize(function(t){
    token = t;
    if (token != null) {
      if( t.error ) return callback(false);
      callback(true);
    } else {
      callback(false);
    }
  })
};

/***
 * Access method for token
 ***/
function getToken() {
  return token;
};

/***
 * Load the google drive api code
 ***/
function _loadApi(callback) {
  gapi.client.load("drive", DRIVE_API_VERSION, function() {
    callback();
  });
};

/***
 * Get a list of file metadata from google drive based on query
 ***/
function listFiles(query, callback) {
  gapi.client.drive.files.list({
    q : query + " and trashed = false"
  }).execute(function(resp) {
    callback(resp);
  });
};

/***
 * Get a single files metadata based on id
 ***/
function getFileMetadata(id, callback) {
  gapi.client.drive.files.get({
    'fileId' : id
  }).execute(function(resp) {
    callback(resp);
  });
};

/***
 *  Actually load a files data.  The url to do this is provided in a files metadata.
 ***/
function getFile(id, downloadUrl, callback) {
  $.ajax({
    url : downloadUrl,
    beforeSend : function(request) {
      // set access token in header
      request.setRequestHeader("Authorization", 'Bearer '+ token.access_token);
    },
    success : function(data, status, xhr) {
      // parse the response (we only store json in the google drive)
      try {
        data = JSON.parse(data);
      } catch (e) {}

      callback(data, id);
    },
    error : function() {
      callback({
        error : true,
        message : "Failed to load file from Google Drive"
      });

    }
  });
};

/***
 * Save json to google drive
 ***/
function saveFile(name, description, mimeType, json, callback, options) {
  if( !options ) options = {}

  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";

  var metadata = {
    'title' : name,
    'description' : description,
    'mimeType' : mimeType
  };

  // if we want to save the file to a specified folder
  if( options.parent ) {
    metadata.parents = [{id: options.parent}];
  }

  // if the json is really an object, turn it to a string
  if (typeof json == 'object') json = JSON.stringify(json);

  // data needs to be base64 encoded for the POST
  var base64Data = btoa(json);

  // create our multipart POST request
  var multipartRequestBody = delimiter
      + 'Content-Type: application/json\r\n\r\n'
      + JSON.stringify(metadata);

  if( json.length > 0 ) {
    multipartRequestBody += delimiter + 'Content-Type: '
      + mimeType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n'
      + '\r\n' + base64Data;
  }
  multipartRequestBody += close_delim;

     // setup POST request
     // if the options.conver=true flag is set, google attempts to convert the file to
     // a google doc file.  Mostly, we use this for exporting csv -> Google Spreadsheets
  var request = gapi.client.request({
    'path' : '/upload/drive/v2/files' + ( options.convert ? '?convert=true' : ''),
    'method' : 'POST',
    'params' : {
      'uploadType' : 'multipart'
    },
    'headers' : {
      'Content-Type' : 'multipart/mixed; boundary="' + boundary + '"'
    },
    'body' : multipartRequestBody
  });

  // send the request
  request.execute(function(resp) {
    if (resp.id)
      callback(resp);
    else
      callback({
        error : true,
        message : "Failed to save"
      });
  });
};

/***
 * Update a file based on id and given json data
 ***/
function updateFile(fileId, json, callback) {
  // start creating the multipart POST request
  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";

  var metadata = {};

  // strinify then base64 encode then object
    var base64Data = btoa(JSON.stringify(json));

    // set up the POST body
    var multipartRequestBody =
      delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + MIME_TYPE + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;

  // setup POST request
    var request = gapi.client.request({
        'path': '/upload/drive/v2/files/'+fileId,
        'method': 'PUT',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});

    // set request
    request.execute(function(resp){
      if( resp.id ) {
        callback(resp);
      } else {
        callback({
        error : true,
        message : "Failed to update"
      });
      }
    });
}

function runModelRt() {
  if( offlineMode ) return;
  ga('send', 'event', 'ui', 'interaction', 'run-model-remote', 1);
  gdriveRT.runModelRt();
}

module.exports = {
  init : init,
  checkSignedIn : checkSignedIn,
  signIn : signIn,
  getToken : getToken,
  listFiles : listFiles,
  getFileMetadata : getFileMetadata,
  load : load,
  saveFile: saveFile,
  showLoadTreePanel : showLoadTreePanel,
  showSaveTreePanel : showSaveTreePanel,
  runModelRt : runModelRt,

  MIME_TYPE : MIME_TYPE
}

},{"./gdriveRT":29,"./oauth":32}],29:[function(require,module,exports){
// REALTIME (rt) Objects
// rt json field, used to send updates to peers
var rtJson = null;
// rt document
var rtDoc = null;
// has the rt api been loaded?
var _rtLoaded = false;
// timer to buffer the firing of updates from rt events
var _rtTimer = -1;

// list of current rt edits to input files
var rtEdits = {};
// google drive rt model - map
var liveEdits = null;
// local lock on an element
var lock = {};

var app;

// loaded file id
var loadedFile;

/***
 * Setup the rt api for the current file.  This will actually load the api if needed
 ***/
function initRtApi(file) {
  rtJson = null; // kill off any old listners
  loadedFile = file;

  // close any old connection
  if( rtDoc ) rtDoc.close();

  // get out of here if we don't have a loaded file
  if( loadedFile == null ) return;

  // load api if needed
  if( !_rtLoaded ) {
    gapi.load('drive-realtime', function(){
      // setup rt hooks
      _rtLoaded = true;
      _loadRtFile();
    });
  } else {
    // setup rt hooks
    _loadRtFile();
  }

  // setup input handlers
  $('#inputs input').on('focus',function(e){
    var ele = $(e.target);
    _setLocalLock({
      id        : ele.attr("id"),
      value     : ele.val(),
      timestamp : new Date().getTime(),
      user      : window.userinfo ? window.userinfo.name : "unknown"
    });
  });
  $('#inputs input').on('blur',function(e){
    _removeLocalLock($(e.target).attr("id"));
  });
  $('#inputs input').on('keyup',function(e){
    if( e.which == 13 ) return;
    var ele = $(e.target);
    _updateLocalLock(ele.attr("id"), ele.val());
  });
}

function _setLocalLock(lock) {
  // TODO: this should mark the current lock
  if( liveEdits.has[lock.id] ) return;
  liveEdits.set(lock.id, lock);
}

function _updateLocalLock(id, val) {
  var lock = {
    id : id,
    value : val,
    timestamp : new Date().getTime(),
    user      : window.userinfo ? window.userinfo.name : "unknown"
  }

  liveEdits.set(id, lock);
}

function _removeLocalLock(id) {
  liveEdits.delete(id);
}

function _removeRemoteLock(lock) {
  $("#"+lock.id).removeAttr("disabled");
  $("#"+lock.id+"-editing").remove();
  delete rtEdits[lock.id];
}

function _updateLock(lock) {
  $("#"+lock.id).val(lock.value).attr("disabled","disabled");
  if( $("#"+lock.id+"-editing").length == 0 ) {
    $("#"+lock.id).parent().after("<span id='"+lock.id+"-editing' class='label label-warning'></span>");
  }
  $("#"+lock.id+"-editing").html(lock.user);
  rtEdits[lock.id] = lock;
}

/***
 * Update the list of realtime edits as well as the input UI based on the rtDoc event
 * TODO: this is a bit nasty right now
 **/
function _updateRtEdits(e) {
  if( e.isLocal ) return;

  var keys = liveEdits.keys();

  // remove old timestamps TODO
  /*for( var i = 0; i < values.length; i++ ) {
    if( now - values[i].timestamp > 1000 * 60 ) {
      _removeLock(values[i]); // does this fire updates?
    }
  }*/


  // set new edits
  for( var i = 0; i < keys.length; i++ ) {
    _updateLock(liveEdits.get(keys[i]));
  }

  // remove old edits
  for( var key in rtEdits ) {
    if( keys.indexOf(key) == -1 ) {
      _removeRemoteLock(rtEdits[key]);
    }
  }
}

/***
 *  Setup the rt hooks for the current file.  The api needs to already be loaded
 ***/
function _loadRtFile() {
  // get the rt doc
  gapi.drive.realtime.load(loadedFile,
    // rt doc loaded
    function(file){
      rtDoc = file;

      // get our rt attribute.  Triggering changes on rtJson will push events
      // to all listening clients
      var json = file.getModel().getRoot().get("json");
      liveEdits = file.getModel().getRoot().get("liveEdits");

      // if there is no json attr, we need to initialize the model
      if( json == null || liveEdits == null) {
        // initialize our rt model
        _onRtModelLoad(file.getModel());
        // grab rt json attr now that we are initialized
        json = file.getModel().getRoot().get("json");
        liveEdits = file.getModel().getRoot().get("liveEdits");
      }

      // badness happened :(
      if( !json ) return console.log("Failed to connect to rt json");
      // set that attr global to class
      rtJson = json;

      // get current list of users
      var users = file.getCollaborators();

      // add event listeners for when people come and go
      file.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, function(e){
        users = file.getCollaborators();
        _updateActiveUsers(users);
      });
      file.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, function(e){
        users = file.getCollaborators();
        _updateActiveUsers(users);
      });

      // add event listeners for the rtJson object
      // when this updates, we want to re-run the model
      json.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, function(e){
        if( e.isLocal ) return;
        _rerunRt(users, e.userId);
        });
        json.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, function(e){
          if( e.isLocal ) return;
          _rerunRt(users, e.userId);
        });

        // live edit updates
              liveEdits.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, function(e){
                   _updateRtEdits(e);
              });

        // show who is listening
        _updateActiveUsers(users);

        // set input handlers for rt events
    },
    // model loaded
    function(model){
      _onRtModelLoad(model);
    },
    // errors
    function(err) {
      console.log("RT ERRORS: ");
      console.log(err);
    }
  );
}


/***
 * Update the display of active users for the model.
 ***/
function _updateActiveUsers(users) {
  // if it's just us, don't show anything
  if( !users ) return $("#active-users").html("");
  if( users.length <= 1 ) return $("#active-users").html("");

  // we only want unique users
  var unique = [];
  var uusers = [];
  for( var i = 0; i < users.length; i++ ) {
    if( unique.indexOf(users[i].userId) == -1 ) {
      unique.push(users[i].userId);
      uusers.push(users[i]);
    }
  }
  if( uusers.length <= 1 ) return $("#active-users").html("");

  // add pic of user to display panel
  var html = "Active Users ";
  for( var i = 0; i < uusers.length; i++ ) {
    if( uusers[i].photoUrl ) {
      html += "<img src='"+uusers[i].photoUrl+"' title='"+uusers[i].displayName+"' style='margin:0 5px;width:32px;height:32px' class='img-rounded' /> ";
    } else {
      html += "<span style='width:32px;height:32px;margin:0 5px;background-color:"+uusers[i].color+"' title='"+uusers[i].displayName+"' ></span> ";
    }
  }
  $("#active-users").html(html);
}

/***
   *  Re-run the model.  Events can come in quickly in many parts.  Buffer the events so we don't re-run the model too many times.
   ***/
function _rerunRt(users, userId) {
  // this is badness
  if( !rtJson ) return;

  // clear any queued run
  if( _rtTimer != -1 ) clearTimeout(_rtTimer);

  // queue up a run and wait to make sure there are no updates
  _rtTimer = setTimeout(function(){
    _rtTimer = -1;

    // find the user who is running the model and diplay popup of that users information
    for( var i = 0; i < users.length; i++ ) {
      if( users[i].userId == userId ) {
        var panel = $("<div class='init-loading-outer' ><div class='init-loading' style='width:400px'> "+
                (users[i].photoUrl ? "<img src='"+users[i].photoUrl+"' /> " : "")+users[i].displayName+" is updating the model...</div></div>");
            $("body").append(panel);
            setTimeout(function(){
                panel.css("opacity",".9");
            },50);
            setTimeout(function(){
                panel.remove();
            }, 3500);
            break;
      }
    }

    // parse the new model data and load it as our current setup
    var data = JSON.parse(rtJson.getText());
    app.getModelIO().loadSetup(loadedFile, data, true);
  }, 300);
}

/***
 * initialize a new rt model
 ***/
function _onRtModelLoad(model) {
  // currently we just want to use this single attribute to broadcast events
  var json = model.getRoot().get("json");
  if( json == null ) {
    var string = model.createString("{}");
    model.getRoot().set("json", string);
  }

  var liveEdits = model.getRoot().get("liveEdits");
  if( liveEdits == null ) {
    var field = model.createMap();
    model.getRoot().set("liveEdits", field);
  }

}

/***
 * let the world know what we are doing :)
 * This should be called when a local user runs the model.  It updates the 'json'
 * attribute which is then broadcast to all listening parties
 ***/
function runModelRt() {
  if( rtJson ) rtJson.setText(JSON.stringify( app.getModelIO().exportSetup() ));
}

module.exports = {
  runModelRt : runModelRt,
  initRtApi  : initRtApi,
  setApp : function(application) {
    app = application;
  }
};

},{}],30:[function(require,module,exports){
var offline = require('./offline');
var gdrive = require('./gdrive');
var charts = require('./charts');
var weatherFileReader = require('./weatherFileReader');

module.exports = function(app) {

var weatherAverageChart = null;
var weatherAverageChartData = {};

var SETUP_TEMPLATE =
  '<div>'+
  '<h4>Chart Options</h4>'+
  '<div>'+
      '<table class="table">'+
          '<tr>'+
              '<td style="width:50%">Output variable(s) to chart </td>'+
              '<td> <a id="select-charts-btn" class="btn btn-default">Select Charts</a></td>'+
          '</tr>'+
          '<tr>'+
              '<td style="width:50%">Variation analysis parameter(s) </td>'+
              '<td><div id="variationAnalysisStatus">None</div></td>'+
          '</tr>'+
      '</table>'+
  '</div>'+
  '<h4>Location</h4>'+
   '<div style="border-top:1px solid #ddd;padding:8px;height:60px">'+
     '<span id="current-location" style="color:#888"></span>'+
     '<a class="btn btn-default pull-right select-weather-location"><i class="icon-map-marker"></i> Select Location</a>'+
     '</div>'+
     '<div>';

var GOOLEDRIVE_TREE_TEMPLATE =
  '<div style="padding:15px 0 5px 0;margin-bottom:5px;height: 50px">'+
    '<div class="btn-group pull-right" id="tree-sub-menu">'+
      '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'+
        '<span id="loaded-tree-name">Default Tree</span> <span class="caret"></span>'+
      '</button>'+
      '<ul class="dropdown-menu" role="menu">'+
        '<li><a id="gdrive-treepanel-load"><i class="icon-cloud-download"></i> Load Tree</a></li>'+
        '<li><a id="gdrive-treepanel-save"><i class="icon-cloud-upload"></i> Save Tree</a></li>'+
        '<li style="display:none"><a id="share-tree-btn" class="btn btn-default" style="display:none;margin-left:10px"><i class="icon-share"></i> Share Tree</a></li>'+
      '</ul>'+
  '</div>'+
  '<div style="display:none"><input type="checkbox" id="compare-trees" /> Compare Trees</div>'+
'</div>';

var INPUT_TEMPLATE =
  '<div class="form-group">'+
    '<label for="{{id}}" class="col-lg-4 control-label">{{label}}</label>'+
    '<div class="col-lg-8">'+
      '<input type="{{type}}" class="form-control" id="{{id}}" style="width:200px;display:inline-block" value="{{value}}">&nbsp;&nbsp;{{units}}'+
      '<p class="help-block">{{description}}</p>' +
    '</div>'+
  '</div>';

var ARRAY_INPUT_TEMPLATE =
  '<div class="col-lg-6"><div class="form-group">'+
    '<label for="{{id}}" class="col-lg-4 control-label">{{label}}</label>'+
    '<div class="col-lg-8">'+
      '{{inputs}}'+
      '<p class="help-block">{{description}}</p>' +
    '</div>'+
  '</div></div>';

var tabHeader = '<ul class="nav nav-pills" id="input_pills">';
var content = '<div class="pill-content">';

var treeHeader = '<div class="panel-group" id="tree-accordion">';
var TREE_PANEL_TEMPLATE = '<div class="panel panel-default">'+
        '<div class="panel-heading">'+
            '<h4 class="panel-title">'+
                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#tree-accordion" href="#collapse{{id}}">'+
                    '{{title}}'+
                '</a>'+
            '</h4>'+
        '</div>'+
        '<div id="collapse{{id}}" class="panel-collapse collapse">'+
            '<div class="panel-body">{{body}}</div>'+
        '</div>'+
     '</div>';

var inputs = {};

// for weather data
var cols = [];

var map = null;

/**
 * Options :
 *   model - type of model to append to
 *   label - attribute label
 *   value - default value
 *   description - description of attribute
 *   units - attribute units
 */
function _addInput(options) {
  if( !inputs[options.model] ) inputs[options.model] = [];
  inputs[options.model].push(options);
}

function _createWeatherInputs() {
  for( var attr in app.getModel().getDataModel().weather ) {
    if( attr != "nrel" ) cols.push(attr);
  }

  var table = '<div style="padding-top:25px"><a class="btn btn-default pull-right" id="load-weather-btn"><i class="icon-upload-alt"></i> Upload</a>'+
        '<div class="btn-group" id="weather-input-toggle">'+
          '<button type="button" class="btn btn-default active">Averages</button>'+
          '<button type="button" class="btn btn-default">Actual</button>'+
        '</div>'+
        '</div>'+
        '<div id="custom-weather-panel" style="display:none;margin-top:20px"></div>'+
        '<div id="average-weather-panel">'+
        '<div style="padding:10px;color:#888">Select location to set the average weather data</div>'+
        '<table class="table table-striped table-condensed weather-table" style="margin-top:20px">';

  table += "<tr>";
  for( var i = 0; i < cols.length; i++ ) {
    table += "<td>"+cols[i]+"</td>";
  }
  table += "</tr>";

  for( var i = 0; i < 12; i++ ) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

    table += "<tr>";
    for( var j = 0; j < cols.length; j++ ) {
      if( j == 0 ) {
        table += "<td>"+(i+1)+"</td>";
      } else {
        table += "<td><input class='form-control' id='input-weather-"+cols[j]+"-"+m+"' type='text' /></td>";
      }
    }
    table += "</tr>";
  }
  return table+'</table><div id="average-weather-chart"></div></div>';

}

function _setWeatherData() {
  var ll = app.qs("ll");
  if( ll ) {
    ll = ll.split(",");
    _queryWeatherData(ll[0], ll[1], function() {
        app.runModel();
    });
  } else {
    $("#current-location").html("Not Set");
  }
}

function _queryWeatherData(lng, lat, callback) {
  ga('send', 'event', 'ui', 'interaction', 'weather-data-query', 1);

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToWeather("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  var resps = 0;

  function checkDone() {
      resps++;
      if( resps == 2 && callback ) callback();
  }

  q.setQuery('SELECT *');
  q.send(function(response){
    var table = JSON.parse(response.getDataTable().toJSON());

    for( var i = 0; i < table.rows.length; i++ ) {
      var m = (i+1)+'';
      if( m.length == 1 ) m = '0'+m;

      weatherAverageChartData[m] = {};
      for( var j = 1; j < table.cols.length; j++ ) {
        $("#input-weather-"+cols[j]+"-"+m).val(table.rows[i].c[j] ? table.rows[i].c[j].v : "");
      }
    }

    updateAverageChart();
    checkDone();
  });

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToSOIL("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  q.setQuery('SELECT *');
  q.send(function(response){
    var error = false;
    var table = JSON.parse(response.getDataTable().toJSON());
    for( var i = 0; i < table.cols.length; i++ ) {
      if( table.rows[0] == null ) {
        error = true;
        alert("Invalid location selected");
        break;
      }

      var key = table.cols[i].id;
      if( key === 'maxaws' ) key = 'maxAWS';

      $("#input-soil-"+key).val(table.rows[0].c[i].v);
    }

    if( !error ) checkDone();
  });

  $("#current-location").html(lng+", "+lat+" <a href='"+window.location.href.replace(/#.*/,'')+
                              "?ll="+lng+","+lat+"' target='_blank'><i class='icon-link'></i></a>");
}

function updateAverageChart() {
  weatherAverageChartData = {};

  for( var i = 0; i < 12; i++ ) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

    weatherAverageChartData[m] = {};
    for( var j = 1; j < cols.length; j++ ) {
      var val = $("#input-weather-"+cols[j]+"-"+m).val();
      if( val && val.length > 0 ) weatherAverageChartData[m][cols[j]] = parseInt(val);
      else weatherAverageChartData[m][cols[j]] = 0;
    }
  }
  weatherAverageChart = charts.createWeatherChart($('#average-weather-chart')[0], weatherAverageChartData);
}

function _selectWeatherLocation() {
  if( !map ) {
    $("#select-weather-modal").modal({});

    $("#locate-button").on('click', _getLocation);


    // wait for the modal to init
    setTimeout(function(){
      if( offlineMode ) return;

      map = new google.maps.Map($("#gmap")[0], {
        center : new google.maps.LatLng(35, -121),
        zoom: 5,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      });

      var defaultStyle = {
            polygonOptions: {
              strokeColor   : "#0000FF",
              strokeOpacity : 0.5,
              fillColor     : '#FEFEFE',
              fillOpacity   : 0.2
            },
      };


      var defaultOptions = {
          query: {
            select: 'boundary',
            from: '1hV9vQG3Sc0JLPduFpWJztfLK-ex6ccyMg_ptE_s'
          },
          styles: [defaultStyle],
          suppressInfoWindows : true
      };

      var fusionLayer = new google.maps.FusionTablesLayer(defaultOptions);
      fusionLayer.opacity = .8;
      fusionLayer.setMap(map);

      google.maps.event.addListener(map, 'click', function(e) {
        if( $('#locate-cache-mode').is(':checked') ) {
          alert('You must click on a geometry to cache');
          return;
        }

        _queryWeatherData(e.latLng.lng(), e.latLng.lat(), function() {
                  app.runModel();
              });
        $("#select-weather-modal").modal('hide');
      });
      google.maps.event.addListener(fusionLayer, 'click', function(e) {
        if( $('#locate-cache-mode').is(':checked') ) {
          offline.cacheTile(e, fusionLayer, defaultOptions, defaultStyle);
          return;
        }

        _queryWeatherData(e.latLng.lng(), e.latLng.lat(), function() {
                  app.runModel();
              });
        $("#select-weather-modal").modal('hide');
      });

      // setup input for clearing cache
          $('#clear-cached-tiles').on('click', function(){
              offline.clearCache();
              offline.renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle);
          });

      offline.renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle);

    },500);
  } else {
    $("#select-weather-modal").modal('show');

    // we seem to be hanging sometimes....
    setTimeout(function(){
      google.maps.event.trigger(map, "resize");
    }, 500);
  }
}

function _getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    $("#locate-button").addClass("btn-warning");
  } else{
    window.alert("Geolocation is not supported by this browser.");
  }
  function showPosition(position) {
    $("#locate-button").removeClass("btn-warn").addClass("btn-success");
    map.setZoom(10);
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    //_queryWeatherData(position.coords.longitude, position.coords.latitude);
  }
}

function _generateInputs(i, type, prefix, name, attrs) {
  var id = prefix.length > 0 ? prefix+'-'+name : 'input-'+name;
  var input = '<div class="form-group" style="margin-left:'+(i*20)+'px;margin-top:0px;margin-right:5px">';

  var treebody = "";

  if( !(i == 1) ) {
      if( i != 0 ) input += '<label for="'+id+'" class="control-label">'+name +'</label>';
      input += '<div>';
  }


      if ( typeof attrs.value == 'object' && i == 1  ) { // && type == 'tree' ) {
      for( var key in attrs.value ) {
              treebody += _generateInputs(i+1, type, id, key, attrs.value[key]);
          }
  } else if ( typeof attrs.value == 'object' ) {
      if( attrs.description ) input += '<p class="help-block">'+attrs.description+'</p>';
          for( var key in attrs.value ) {
              input += _generateInputs(i+1, type, id, key, attrs.value[key]);
          }
  } else if ( (typeof attrs.value == 'number' || typeof attrs.value == 'string') && i == 1 ) { // && type == 'tree' ) {

      treebody +=
          '<div><input type="'+(attrs.value == '_date_' ? 'date' : 'text')+'" '+
          (type=='constants'?'disabled':'')+' class="form-control '+type+'" id="'+
          id+'" style="width:200px;display:inline-block" value="'
              +(attrs.value == '_date_' ? '' : attrs.value)+'">&nbsp;&nbsp;'
              +(attrs.units ? attrs.units : '')+'</div>';

  } else if (  typeof attrs.value == 'string' || typeof attrs.value == 'number' ) {

    input += '<div><input type="'+(attrs.value == '_date_' ? 'date' : 'text')+'" '
          +(type=='constants'?'disabled':'')+' class="form-control '+type+
           '" id="'+id+'" style="width:200px;display:inline-block" value="'
          +(attrs.value == '_date_' ? '' : attrs.value)+'">&nbsp;&nbsp;'
          +(attrs.units ? attrs.units : '')+'</div>';

    if( attrs.description ) input += '<p class="help-block">'+attrs.description+'</p>';
  }

  if( !(i == 1 /*&& type == 'tree'*/) ) {
      input += '</div></div>';
  } else {
      input += TREE_PANEL_TEMPLATE
                  .replace(/{{id}}/g,id)
                  .replace('{{title}}',name+" <span style='color:#888;font-size:12px'> - "+attrs.description+"</span>")
                  .replace('{{body}}',treebody)+'</div>'
  }

  return input;
}

function create(ele) {
  weatherFileReader.init();
  var model, m, attr, config;

  var inputs = $.extend(true, {}, app.getModel().getDataModel());

  inputs['setup'] = {};
  for( model in inputs ) {
    m = inputs[model];
    for( attr in m ) {
      config = m[attr];

      if( typeof config == 'object' ) {
        _addInput({
          model       : model,
          label       : attr,
          description : config.description,
          value       : config.value,
          units       : config.units
        });
      } else {
        _addInput({
          model       : model,
          label       : attr
        });
      }
    }
  }


  for( model in inputs ) {
    if( model == "plantation_state" ) continue;

    tabHeader += '<li><a href="#inputs_'+model+'" id="tab_inputs_'+model+'" data-toggle="pill">'
                +model.substr(0,1).toUpperCase()+model.substr(1).toLowerCase()+'</a></li>';
    var attributes = inputs[model];

    content += ' <div class="pill-pane" id="inputs_'+model+'">';

    var row1 = "";
    var row2 = "<div class='col-lg-6>";

    if( model == 'weather' ) {
      content += _createWeatherInputs();
    } else if( model == 'setup' ) {
      content += SETUP_TEMPLATE;
    } else {
        content += treeHeader;

        // add the google drive btn from trees
        if( model =='tree' ) {
          content += _createTreeInput(model, inputs);
        } else {
          content += _generateInputs(0, model, '', model, inputs[model]);
        }

      content += '</div>';
    }


    content += '</div>';
  }
  content += '</div>';
  tabHeader += "</ul>";

  ele.html(tabHeader+"<div class='form-horizontal'>"+content+"</div>");

  // run the model whenever some hits 'enter'
  ele.find('input').on('keyup',function(e){
    if( e.which == 13 ) app.runModel();
  });

  // add click handler for loading a tree
  ele.find("#gdrive-treepanel-load").on('click', function(){
    gdrive.showLoadTreePanel();
  });
  ele.find("#gdrive-treepanel-save").on('click', function(){
    gdrive.showSaveTreePanel();
  });

  // set tree input handlers
  $("#compare-trees").on('click', function(){
    if( $(this).is(':checked') ) {
      $("#single-tree-content").hide();
      $("#compare-tree-content").show();
      $("#tree-sub-menu").hide();
    } else {
      $("#single-tree-content").show();
      $("#compare-tree-content").hide();
      $("#tree-sub-menu").show();
    }
  });

  // set pill click handlers
  $('#input_tabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
  });
  $('#tab_inputs_weather').tab('show');

  $('.select-weather-location').on('click', _selectWeatherLocation);


  $('#weatherReader-modal').modal({show:false});
  $('#load-weather-btn').on('click', function(){
    $('#weatherReader-modal').modal('show');
  });

  $("#weather-input-toggle .btn").on('click', function(){
    $('#weather-input-toggle .btn.active').removeClass('active');
    $(this).addClass('active');

    if( $(this).html() == 'Averages' ) {
      $('#average-weather-panel').show();
      $('#custom-weather-panel').hide();
    } else {
      app.setWeather();
      $('#average-weather-panel').hide();
      $('#custom-weather-panel').show();
    }
  });

  $(window).on('resize', function(){
    if( weatherAverageChart ){
      weatherAverageChart = charts.createWeatherChart($('#average-weather-chart')[0], weatherAverageChartData);
    }
  });

  _setWeatherData();
}

function _createTreeInput(model, inputs) {
  var content = "";
  content += GOOLEDRIVE_TREE_TEMPLATE;

  content += '<div id="single-tree-content">';
  content += _generateInputs(0, model, '', model, inputs[model]);
  content += '</div>';

  content += '<div id="compare-tree-content" style="display:none">'+
        '<ul class="nav nav-tabs">'+
          '<li class="active"><a href="#tree1" data-toggle="tab">Tree 1</a></li>'+
            '<li><a href="#tree2" data-toggle="tab">Tree 2</a></li>'+
        '</ul>'+
        '<div class="tab-content">'+
            '<div class="tab-pane active" id="tree1">'+
              '<div class="well" style="text-align:center;margin-top:10px">'+
                '<div class="btn-group">'+
                '<button type="button" class="btn btn-default active">Custom</button>'+
                '<button type="button" class="btn btn-default">Select Tree</button>'+
              '</div>'+
              '</div>'+
              _generateInputs(0, model, 't1', model, inputs[model])+
            '</div>'+
            '<div class="tab-pane active" id="tree2">'+
              '<div class="well" style="text-align:center;margin-top:10px" >'+
                '<div class="btn-group">'+
                '<button type="button" class="btn btn-default active">Custom</button>'+
                '<button type="button" class="btn btn-default">Select Tree</button>'+
              '</div>'+
              '</div>'+
              _generateInputs(0, model, 't2', model, inputs[model])+
            '</div>'+
          '</div>'+
         '</div>';

  return content;
}


return {
  create : create,
  updateAverageChart: updateAverageChart
};

};

},{"./charts":25,"./gdrive":28,"./offline":33,"./weatherFileReader":35}],31:[function(require,module,exports){
// Special Sauce...
// basically the code loaded from GitHub expects the following to exists in the window scope
//   m3PGIO
//     - readAllContants
//     - readWeather
//     - dump
//     - readFromInputs
// So we inject functions that interact w/ our UI, model in no way cares
module.exports = {
  read : function(model) {
    this.model = model;

    model.debug = true;

    if( !model.plantation ) model.plantation = {};
    this.readAllConstants(model.plantation);

    if( !model.weather ) model.weather = {};
    if( !model.manage ) model.manage = {};
    if( !model.custom_weather ) model.custom_weather = {};

    this.readWeather(model.weather, model.manage, model.custom_weather);

    delete this.model.manage.coppiceDates;
  },
  readAllConstants : function(plantation) {
      this.readFromInputs();

      //for ( var key in this.model.plantation) {
      //    plantation[key] = this.model.plantation[key];
      //}

      plantation.coppicedTree = this.model.tree;

      // setup seedling Tree
      // TODO: hardcoded for now, this shouldn't be
      plantation.seedlingTree = $.extend(true, {}, this.model.tree);
      plantation.seedlingTree.stemsPerStump = 1;
      plantation.seedlingTree.pfs.stemCnt = 1;
      plantation.seedlingTree.rootP = {
          LAITarget : 10,
          efficiency : 0.6,
          frac : 0.01
      };
  },

  readWeather : function(weatherMap, manage, customWeatherMap) {
      var datePlanted = $("#input-manage-datePlanted").val();
      if (datePlanted && datePlanted != "") {
          manage.datePlanted = new Date($("#input-manage-datePlanted").val());
      } else {
          manage.datePlanted = new Date();
      }

      var dateCoppiced = $("#input-manage-dateCoppiced").val();
      if (dateCoppiced && dateCoppiced != "") {
          manage.dateCoppiced = new Date($("#input-manage-dateCoppiced").val());
      } else {
         // set error condition : TODO
      }

      var DateFinalHarvest = $("#input-manage-dateFinalHarvest").val();
      if (DateFinalHarvest && DateFinalHarvest != "") {
          manage.DateFinalHarvest = new Date($("#input-manage-dateFinalHarvest").val());
      } else {
         // set error condition : TODO
      }

      var yearsPerCoppice = $("#input-manage-coppiceInterval").val();
      if (yearsPerCoppice && yearsPerCoppice != "") {
          manage.yearsPerCoppice = parseInt($("#input-manage-coppiceInterval").val());
      }


      for ( var i = 0; i < 12; i++) {
          var item = {
              month : (i + 1)
          };
          var m = (i+1)+'';
          if( m.length === 1 ) m = '0'+m;

          for ( var j = 1; j < this.app.inputs.weather.length; j++) {
              var c = this.app.inputs.weather[j];
              item[c] = this._readVal($("#input-weather-" + c + "-" + m));
          }
          item.nrel = item.rad / 0.0036;

          weatherMap[m] = item;
      }

      if( this.model.custom_weather ) {
          for( var date in this.model.custom_weather ) {
              this.model.custom_weather[date].nrel = this.model.custom_weather[date].rad / 0.0036;
              //customWeatherMap[date] = custom_weather[date];
          }
      }
      return weatherMap;
  },
  dump : function(rows, sheet) {
      // set the raw output
      this.app.runComplete(rows);
  },

  // read a value from the input
  // it has a ',' is set for variation
  _readVal : function(ele) {
      var val = ele.val();
      if( val.match(/\d*-\d*-\d*$/) ) {
          return val;
      } else if( val.match(/.*,.*/) ) {
          val = val.replace(/\s/g,'').split(",");
          var id = ele.attr("id").replace(/^input-/,'').replace(/-/g,'.');
          this.model.variations[id] = [];
          for( var i = 0; i < val.length; i++ ) {
              this.model.variations[id].push(parseFloat(val[i]));
          }
          return this.model.variations[id][0];
      }
      return parseFloat(val);
  },

  readFromInputs : function() {
      // read soil
      this.model.soil = {};
      this.model.soil.maxAWS = this._readVal($("#input-soil-maxAWS"));
      this.model.soil.swpower = this._readVal($("#input-soil-swpower"));
      this.model.soil.swconst = this._readVal($("#input-soil-swconst"));

      // read manage
      this.model.manage = {
          coppice : false
      };
      var eles = $(".manage");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          this.model.manage[ele.attr("id").replace("input-manage-", "")] = this._readVal(ele);
      }

      // read plantation
      if( !this.model.plantation ) this.model.plantation = {};
      eles = $(".plantation");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          this.model.plantation[ele.attr("id").replace("input-plantation-", "")] = this._readVal(ele);
      }

      // read tree
      var treeInputs = $(".tree");
      this.model.tree = {};
      for ( var i = 0; i < treeInputs.length; i++) {
          var ele = $(treeInputs[i]);

          var parts = ele.attr("id").replace("input-tree-", "").split("-");
          if (parts.length == 1) {
              this.model.tree[parts[0]] = this._readVal(ele);
          } else {
              if (!this.model.tree[parts[0]])
                  this.model.tree[parts[0]] = {};
              this.model.tree[parts[0]][parts[1]] = this._readVal(ele);
          }
      }

      // read plantation state
      if( !this.model.plantation_state ) this.model.plantation_state = {};
      for ( var key in this.model.getDataModel().plantation_state.value ) {
          this.model.plantation_state[key] = -1;
      }

  },
  exportSetup : function() {
      this.model.variations = {};
      this.readFromInputs();
      this.readWeather([], {}, {});

      var ex = {
          weather : this.model.weather,
          custom_weather : this.model.custom_weather,
          tree : this.model.tree,
          plantation : this.model.plantation,
          manage : this.model.manage,
          soil : this.model.soil,
          manage : this.model.manage,
          plantation_state : this.model.plantation_state,
          config : {
              chartTypeInput : $("#chartTypeInput").val(),
              monthsToRun : this.app.monthsToRun(),
              currentLocation : $("#current-location").html(),
              loadedTree : $("#loaded-tree-name").html(),
              version : this.app.qs("version") ? this.app.qs("version") : "master"
          }
      }

      // by default the read function set the variations variables but only
      // returns the first, set the variation params to their correct values
      for( var key in this.model.variations ) {
          var parts = key.split(".");
          var param = ex;
          for( var i = 0; i < parts.length-1; i++ ) {
              param = param[parts[i]];
          }
          param[parts[parts.length-1]] = this.model.variations[key].join(", ");
      }

      return ex;
  },
  loadTree : function(tree) {
      for ( var rootKey in tree) {
          if (typeof tree[rootKey] != 'object') {
              $("#input-tree-" + rootKey).val(tree[rootKey]);
          } else {
              for ( var childKey in tree[rootKey]) {
                  $("#input-tree-" + rootKey + "-" + childKey).val(tree[rootKey][childKey]);
              }
          }
      }
  },
  loadSetup : function(fileid, setup, isRt) {

      // load config
      if (setup.config.chartTypeInput) {
          this.charts.unselectAll();
          for ( var i = 0; i < setup.config.chartTypeInput.length; i++) {
              this.charts.select(setup.config.chartTypeInput[i]);
          }
      }
      if (setup.config.currentLocation) {
          $("#current-location").html(setup.config.currentLocation);
      }
      if( setup.config.loadedTree ) {
          $("#loaded-tree-name").html(setup.config.loadedTree).parent().show();
      }

      // load weather
      if( Array.isArray(setup.weather) ) {
        for ( var i = 0; i < setup.weather.length; i++) {
            for ( var key in setup.weather[i]) {
                if (key == 'month')
                    continue;
                if (setup.weather[i][key] != null)
                    $("#input-weather-" + key + "-" + i).val(setup.weather[i][key])
                else
                    $("#input-weather-" + key + "-" + i).val("");
            }
        }
      } else {
        for ( var i in setup.weather ) {
            for ( var key in setup.weather[i]) {
                if (key == 'month')
                    continue;
                if (setup.weather[i][key] != null)
                    $("#input-weather-" + key + "-" + i).val(setup.weather[i][key])
                else
                    $("#input-weather-" + key + "-" + i).val("");
            }
        }
      }

      if( setup.custom_weather ) {
          this.model.custom_weather = setup.custom_weather;
      } else {
          this.model.custom_weather = {};
      }

      // create the chart
      this.inputForm.updateAverageChart();

      // load tree
      this.loadTree(setup.tree);

      // load planting params
      // Now part of manage....
      // fo
      if (setup.manage) {
          var map = {
              "datePlanted" : "DatePlanted",
              "dateCoppiced" : "DateCoppiced",
              "yearsPerCoppice" : "CoppiceInterval"
          }

          for ( var key in setup.manage) {
              var newKey = key;
              if( map[key] ) newKey = map[key];

              if (typeof setup.manage[key] == 'string')
                  $("#input-manage-" + newKey).val(setup.manage[key].replace(/T.*/, ''));
              else
                  $("#input-manage-" + newKey).val(setup.manage[key]);
          }
      }

      // this value is deprecated, set to new input
      if( setup.config.monthsToRun ) {
          var d = new Date(setup.manage.datePlanted);
          d = new Date(new Date(d).setMonth(d.getMonth()+parseInt(setup.config.monthsToRun)));
          $("#input-manage-dateFinalHarvest").val(d.toISOString().replace(/T.*/, ''));
      }


      // load rest
      var inputs = [ "plantation", "soil", "manage" ];
      for ( var i = 0; i < inputs.length; i++) {
          for ( var key in setup[inputs[i]]) {
              if (key == 'maxAWS') {
                  $("#input-soil-maxAWS").val(setup.soil.maxAWS);
              } else if ( typeof setup[inputs[i]][key] == 'string' && setup[inputs[i]][key].match(/.*T.*Z$/) ) {
                  $("#input-" + inputs[i] + "-" + key).val(setup[inputs[i]][key].replace(/T.*/, ''));
              } else {
                  $("#input-" + inputs[i] + "-" + key).val(setup[inputs[i]][key]);
              }
          }
      }
      this.app.runModel(isRt);
  }
};

},{}],32:[function(require,module,exports){

  // must install this for native phonegap support:
  // https://github.com/phonegap-build/ChildBrowser

var win = null;

/* the key for refresh Token in local Storage */
var tokenKey = 'refresh_token';

/* stores the accessToken after retrieval from google server */
var accessToken = null;

/* stores the Time when access token was last received from server */
var accessTokenTime = null;

/* stores access Token's Expiry Limit. Uses 58 min. instead of 60 min. */
var accessTokenExpiryLimit = 58 * 60 * 1000;

/* A temporary variable storing callback function */
var callbackFunc = false;

// are we running native or browser mode?
var isNative = window.location.href.match(/^file.*/) ? true : false;

var CLIENT_ID = isNative ?
        "344190713465-diimtferh4tjb03169bkl9mkoqvq2ru9.apps.googleusercontent.com" :
         "344190713465.apps.googleusercontent.com";

var APP_ID = "344190713465";

var OAUTH_SCOPES = 'https://www.googleapis.com/auth/drive.file '
  + 'https://www.googleapis.com/auth/drive.install '
  + 'https://www.googleapis.com/auth/userinfo.profile';

/* config values for Google API (gapi) */
var gapiConfig = {
  endpoint: "https://accounts.google.com/o/oauth2/auth",
  endtoken: "https://accounts.google.com/o/oauth2/token", // token endpoint
  redirect_uri : "http://localhost",
  client_secret : '6rOQ9l0fynh137MRXGK-G_Zg',
  response_type : "code",
  client_id : CLIENT_ID,
  state : "gdriveinit",
  access_type : "offline",
  scope : OAUTH_SCOPES,

  /* As defined in the OAuth 2.0 specification, this field must contain a value
     * of "authorization_code" or "refresh_token" */
    grantTypes: { AUTHORIZE: "authorization_code", REFRESH: "refresh_token" },
 };

/**
 * Enum for Status values
 *
 * @enum {number}
 *
 * SUCCESS - Successfully data received from server
 * ERROR - Error occurred when trying to receive from server
 * NOT_DETERMINED - undetermined
 */
var status = {
        SUCESS: 1,
        ERROR: -1,
        NOT_DETERMINED: 0
}

requestStatus = 0;

/* stores the authorization Code internally */
authCode = false;

/* stores the error message when an error happens from google server */
errorMessage = false;

var log = function(msg) {
  console.log("***OAUTH***: "+msg);
}

/**
 * Attempts to authorize user using OAuth
 * Opens up Another window where user allows access or denies it.
 *
 * @param {function} callBack   A callback function which is invoked
 */
var authorize = function(callBack) {
  log("attempting to authorize");

    var authUri = gapiConfig.endpoint + '?'
    + 'scope=' + encodeURIComponent(gapiConfig.scope)
    + '&' + 'redirect_uri=' + encodeURIComponent(gapiConfig.redirect_uri)
    + '&' + 'response_type=' + encodeURIComponent(gapiConfig.response_type)
    + '&' + 'client_id=' + encodeURIComponent(gapiConfig.client_id);
    //+ '&' + 'state=' + encodeURIComponent(gapiConfig.state)
    //+ '&' + 'access_type=' + encodeURIComponent(gapiConfig.access_type)
    //+ '&' + 'approval_prompt=force'; // @TODO - check if we really need this param

    callbackFunc = callBack;
    requestStatus = status.NOT_DETERMINED;




    log("opening InAppBrowser");

    try {

      // Now open new browser
      win = window.open(authUri, '_blank', 'location=no,toolbar=no');

      $(win).on('loadstart',function(e){
        log("InAppBrowser loadstart");
        console.log(e.originalEvent.url);
        onAuthUrlChange(e.originalEvent.url);
      });

      //window.plugins.childBrowser.showWebPage(authUri, {showLocationBar : true});
      //window.plugins.childBrowser.onClose = onAuthClose;
      //window.plugins.childBrowser.onLocationChange = onAuthUrlChange;
    } catch(e) {
      log("Error opening InAppBrowser");
      log(e);
    }

};

if( !isNative ) {
  authorize = function(callback, immediate) {
  gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : immediate
  }, function() {
    authCode = gapi.auth.getToken();
    callback(authCode);
  });

  }
}

/* Auth Window closed */
var onAuthClose = function() {
        //console.log("Auth window closed");
};

/* OAuth Successfully done */
var onAuthSuccess = function() {
        //console.log('Auth Success?');
};

/**
 * Gets Invoked when the URL changes on OAuth authorization process
 *
 * Success URL Pattern:
 * "redirect_uri" + "?code=" [secret code val]
 *
 * Success Sample URL:
 * http://localhost/?code=4/WOpRLQfvvhHE0tuMUDDqnn76lCTT.8nXC4IebMEAUuJJVnL49Cc8AQGr8cQI
 *
 * Denied Access URL Pattern: "redirect_uri" + ?error=access_denied
 * Denied Access Sample: http://localhost/?error=access_denied
 *
 * @param {string} uriLocation The URI Location
 */
var onAuthUrlChange = function(uriLocation) {
    console.log("InAppBrowser url changed "+uriLocation);
    if(uriLocation.indexOf("code=") != -1) {
        requestStatus = status.SUCCESS;

        /* Store the authCode temporarily */
        authCode = getParameterByName("code", uriLocation);
        log("Found auth code: "+authCode);

        getRefreshToken(callbackFunc);

        // close the childBrowser
        win.close();
    } else if(uriLocation.indexOf("error=") != -1)  {
        requestStatus = status.ERROR;
        errorMessage = getParameterByName("error", uriLocation);
        callbackFunc();
        win.close();
    } else {
        requestStatus = status.NOT_DETERMINED;
        //callbackFunc();
    }
};


/**
* Gets the Refresh from Access Token. This method is only called internally,
* and once, only after when authorization of Application happens.
*
* @param paramObj An Object containing authorization code
* @param paramObj.auth_code The Authorization Code for getting Refresh Token
*
* @param {Function} callback callback function which is to be invoked after
*                            successful retrieval of data from google's server
*
*/
var getRefreshToken = function(callback) {
  console.log("access refresh token");
   $.ajax({
          type: "POST",
          url: gapiConfig.endtoken,
          data: {
                   client_id    : gapiConfig.client_id,
                   client_secret: gapiConfig.client_secret,
                   code         : authCode,
                   redirect_uri : gapiConfig.redirect_uri,
                   grant_type   : gapiConfig.grantTypes.AUTHORIZE
           }
    })
    .done(function(data) {
        console.log("success getting refresh token");

        /* upon sucess, do a callback with the data received */
        // temporary storing access token
        accessToken     = data.access_token;
        accessTokenTime = (new Date()).getTime();

        // set the token for the js api
        gapi.auth.setToken(data);

        /* set the error of data to false, as it was successful */
        data.error = false;

        window.localStorage.setItem(tokenKey, data.refresh_token);

        /* now invoke the callback */
        callback({access_token: accessToken});
    })
    .fail(function(xhr, textStatus) {
            callback({
                    error: true,
                    message: xhr.responseText
            });
    })
    .always(function() {
            //console.log("Token request complete");
    });
};

if( !isNative ) {
  getRefreshToken = function(callback) {
  gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    if( callback ) callback(token);
  });
  }
}


/**
* This method should ONLY be called locally from within this class.
* Returns the Refresh Token from the local database.
*
* @return {String} The refresh Token
*
*/
var getToken = function() {
    return window.localStorage.getItem(tokenKey);
};


/**
* This method is invoked externally. It retrieves the Access Token by at first
* checking if current access token has expired or not. If its not expired, it
* simply returns that, otherwise, it gets the refresh Token from the local database
* (by invoking getToken) and then connecting with Google's Server (using OAuth)
* to get the Access Token.
*
* @param {Function} callback   A callBack function which is to be invoked after
*                             data is retrieved from the google's server. The data
*                             from google server is passed to callback as args.
*
*/
var getAccessToken = function(callback) {
   var currentTime = (new Date()).getTime();

   console.log("getting access token");

   /* check if current Token has not expired (still valid) */
   if (accessToken && accessToken != false &&
           currentTime < (accessTokenTime + accessTokenExpiryLimit)) {
           callback({ access_token: accessToken });

           return;
   }

   console.log("ACCESS TOKEN PARAMS: "+accessToken+" "+accessTokenTime+" "+accessTokenExpiryLimit);

   /* else, get the refreshToken from local storage and get a new access Token */
   var refreshToken = getToken();

   //   console.log("Refresh Token >> " + refreshToken);
   $.ajax({
          type: "POST",
          url: gapiConfig.endtoken,
          data: {
                  client_id    : gapiConfig.client_id,
                  client_secret: gapiConfig.client_secret,
                  refresh_token: refreshToken,
                  grant_type   : gapiConfig.grantTypes.REFRESH,
          }
    })
    .done(function(data) {
            /* upon sucess, do a callback with the data received */
            // temporary storing access token
            accessToken = data.access_token;
            accessTokenTime = (new Date()).getTime();

            // set the token for the js api
            gapi.auth.setToken(data);

            /* set the error to false */
            data.error = false;
            callback(data);
           })
    .fail(function(xhr, textStatus) {
            console.log("Token request error ?? >>" + xhr.responseText);
            callback({
                    error: true,
                    message: xhr.responseText
            });
    })
    .always(function() { //console.log("Token request complete");
    });
};

if( !isNative ) {
  getAccessToken = function(callback) {
     var currentTime = (new Date()).getTime();

     if (accessToken &&
             currentTime < (accessTokenTime + accessTokenExpiryLimit)) {
             callback(accessToken);

             return;
     }

    gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    accessToken = token;
    accessTokenTime = (new Date()).getTime();
    if( callback ) callback(token);
  });
  }
}



/**
* Saves the Refresh Token in a local database or localStorage
* This method shall be invoked from externally only <b>once</b> after an
* authorization code is received from google's server. This method
* calls the other method (getRefreshToken) to get the refresh Token and
* then saves it locally on database and invokes a callback function
*
* @param tokenObj A Object containing authorization code
* @param {String} tokenObj.auth_code The authorization code from google's server
*
* @param {Function} callback The function to be invoked with parameters
*/
var saveRefreshToken = function(tokenObj, callback) {
     getRefreshToken(tokenObj, function(data) {

             /* if there's no error */
             if (!data.error) {
                    // @TODO: make another method saveToken to abstract the storing of token
                window.localStorage.setItem(tokenKey, data.refresh_token);
             }
             callback(data);
     });
};



/**
* Checks if user has authorized the App or not
* It does so by checking if there's a refresh_token
* available on the current database table.
*
* @return {Boolean} true if authorized, false otherwise
*/
var isAuthorized = function(callback) {
      var tokenValue = window.localStorage.getItem(tokenKey);

      callback(((tokenValue !== null) && (typeof tokenValue !== 'undefined')));
};

if( !isNative ) {
  isAuthorized = function(callback) {
    gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    if( callback ) callback(token);
  });
  }
}


/**
* Extracts the code from the url. Copied from online
* @TODO needs to be simplified.
*
* @param name The parameter whose value is to be grabbed from url
* @param url  The url to be grabbed from.
*
* @return Returns the Value corresponding to the name passed
*/
var getParameterByName = function(name, url) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);

  if(results == null) {
    return false;
  }
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};


module.exports = {
  authorize : authorize,
  isAuthorized : isAuthorized,
  getAccessToken : getAccessToken,
  APP_ID : APP_ID
};

},{}],33:[function(require,module,exports){
var app = require('./app');

var cachedTileStyle = {
  where: "pid in ()",
  polygonOptions: {
    fillColor: "#000000",
    strokeColor: "#FF0000",
    strokeWeight: 3
  }
}

var cachedTiles = [];
var cachedTilesLoaded = false;
var cachedTilePrefix = 'cached_title_';
var caching = false;
var saveCacheOnClickSet = false;
var cMapData = {};

var cols = [];
var app = null;

function init() {
  _loadFromCache();
  _loadCachedTiles();
}

function clearCache() {
  if( !confirm('Are you sure you want to clear all tile data from the cache?') ) return;

  for( var key in window.localStorage ) {
    if( key.indexOf(cachedTilePrefix) > -1 ) {
      window.localStorage.removeItem(key);
    }
  }
  cachedTiles = [];
}

// e is the event object from google maps
function cacheTile(e, fusionLayer, defaultOptions, defaultStyle) {
  if( !saveCacheOnClickSet ) {
    saveCacheOnClickSet = true;
    $('#locate-cache-save-btn').on('click', function(){
      _saveTile();
    });
    $('#locate-cache-mode').on('click', function(){
      if( !$(this).is('checked') ) $('#locate-cache-save-panel').hide();
    });
  }

  if( caching ) return;
  caching = true;

  cMapData = {
    fusionLayer : fusionLayer,
    defaultOptions : defaultOptions,
    defaultStyle : defaultStyle,
    pid :  e.row.pid.value
  }

  $('#locate-cache-save-name').val('');
  $('#locate-cache-mode-loading').show();
  $('#locate-cache-save-panel').hide();

  _loadTile(e.latLng.lng(), e.latLng.lat(), function(data){
    $('#locate-cache-save-panel').show();
    $('#locate-cache-mode-loading').hide();

    $('#locate-cache-save-pid').html(cMapData.pid);
    cMapData.data = data;
    caching = false;
  });
}

function render() {
  for( var attr in app.getModel().weather ) {
    if( attr != "nrel" ) cols.push(attr);
  }

  // the about modal link is created below, so why not...
  $("#about-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#help-modal").modal({
    show : false
  });

  _createNavMenu();

  // hide the select tree button
  $('#tree-sub-menu').parent().hide();

  // hide the selector for uploading weather data from a google spreadsheet
  $('#weatherReader-spreadsheet').parent().hide();

  // show the cache version of the location selector
  $('#select-location-online').hide();
  $('#select-location-offline').show();

  // set the location selector ui list based on cached tiles
  _updateCacheTileUiList();
}

function renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle) {
  if( !cachedTilesLoaded ) _loadCachedTiles();

  defaultOptions.styles = [defaultStyle];

  if( cachedTiles.length > 0 ) {
    cachedTileStyle.where = 'pid in ('+cachedTiles.join(',')+')';
    defaultOptions.styles.push(cachedTileStyle);
  }

  fusionLayer.setOptions(defaultOptions);
}

function _saveTile() {
  var name = $('#locate-cache-save-name').val();
  if( name.length == 0 ) return alert('Please provide a name');

  cMapData.data.name = name;

  window.localStorage.setItem(cachedTilePrefix+cMapData.pid, JSON.stringify(cMapData.data));

  cachedTiles.push(cMapData.pid);
  renderCachedTilesOnMap(cMapData.fusionLayer, cMapData.defaultOptions, cMapData.defaultStyle);
  $('#locate-cache-save-panel').hide();
}

function _loadTile(lng, lat, callback) {
  ga('send', 'event', 'ui', 'interaction', 'tile-data-cache', 1);

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToWeather("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  var resps = 0;
  var weatherTable = {};
  var soilTable = {};

  function checkDone() {
      resps++;
      if( resps == 2 && callback ) callback({weather:weatherTable, soil:soilTable});
  }

  q.setQuery('SELECT *');
  q.send(function(response){
    weatherTable = JSON.parse(response.getDataTable().toJSON());
    checkDone();
  });

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToSOIL("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  q.setQuery('SELECT *');
  q.send(function(response){
    soilTable = JSON.parse(response.getDataTable().toJSON());
    checkDone();
  });
}

function _updateCacheTileUiList() {
  if( cachedTiles.length == 0 ) {
    $('#select-location-offline-none').show();
    return;
  }

  var listEle = $('#select-location-offline-list').html('<div>Select Cached Tile</div>'), ele;
  $('#select-location-offline-none');
  for( var i = 0; i < cachedTiles.length; i++ ) {
    var json = window.localStorage.getItem(cachedTilePrefix+cachedTiles[i]);
    json = JSON.parse(json);

    ele = $('<div><a cacheid="'+i+'" style="cursor:pointer">'+cachedTiles[i]+': '+json.name+'</a></div>');
    ele.find('a').on('click', function() {
      _runCachedTile(parseInt($(this).attr('cacheid')));
    });
    listEle.append(ele)
  }
}

function _runCachedTile(index) {
  var json = window.localStorage.getItem(cachedTilePrefix+cachedTiles[index]);
  json = JSON.parse(json);

  for( var i = 0; i < json.weather.rows.length; i++ ) {
    var m = i+'';
    for( var j = 1; j < json.weather.cols.length; j++ ) {
      $("#input-weather-"+cols[j]+"-"+i).val(json.weather.rows[i].c[j] ? json.weather.rows[i].c[j].v : "");
    }
  }


  for( var i = 0; i < json.soil.cols.length; i++ ) {
    if( json.soil.rows[0] == null ) continue;
    $("#input-soil-"+json.soil.cols[i].id).val(json.soil.rows[0].c[i].v);
  }

  $("#select-weather-modal").modal('hide');

  setTimeout(function(){
    app.runModel();
  }, 500);
}

function _loadCachedTiles() {
  cachedTiles = [];
  for( var key in window.localStorage ) {
    if( key.indexOf(cachedTilePrefix) > -1 ) {
      cachedTiles.push(key.replace(cachedTilePrefix,''));
    }
  }
  cachedTilesLoaded = true;
}

function _createNavMenu() {
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle">OFFLINE MODE<b class="caret"></b></a>'
      + '<ul class="dropdown-menu">'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '</ul></li>');

  // set click handlers for popup
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // about click handler
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // add menu
  $("#login-header").html("").append(btn);
};

function _loadFromCache() {
      $.ajax({
        url: 'cache/jsapi',
        dataType: "script",
        cache : true,
        success: function(){
          $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'cache/chart.css') );
          $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'cache/annotatedtimeline.css') );
          $.ajax({
            url: 'cache/chart.js',
            dataType: "script",
            cache : true,
            success: function(){
              chartsLoaded = true;
              if( chartsCallback ) chartsCallback();
            }
          });
        }
      });
}

module.exports = {
  init : init,
  render : render,
  cacheTile : cacheTile,
  renderCachedTilesOnMap : renderCachedTilesOnMap,
  clearCache : clearCache
};

},{"./app":24}],34:[function(require,module,exports){
module.exports = {
  VPD : {
      label : "Mean Vapor Pressure Deficit",
      units : "kPA",
      description : "the difference (deficit) between the amount of moisture in the air and how much " +
      		"moisture the air can hold when it is saturated"
  },
  fVPD : {
      label : "Vapor Pressure Deficit Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fT : {
      label : "Temperature Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fFrost : {
      label : "Frost Modifier",
      units : "unitless",
      description : "Number of frost days growth modifier"
  },
  PAR : {
      label : "Monthly Photosynthetically Active Radiation",
      units : "mols / m^2 month",
      description : "Designates the spectral range (wave band) of solar radiation from 400 to 700 nanometers " +
      		"that photosynthetic organisms are able to use in the process of photosynthesis"
  },
  xPP : {
      label : "Maximum Potential Primary Production",
      units : "Metric Tons Dry Matter/ha",
      description : ""
  },
  Intcptn : {
      label : "Canopy Rainfall Interception",
      units : "",
      description : "Precipitation that does not reach the soil, but is instead intercepted by the leaves and branches of plants and the forest floor."
  },
  ASW : {
      label : "Available Soil Water",
      units : "mm",
      description : ""
  },
  CumIrrig : {
      label : "Cumulative Required Irrigation",
      units : "mm/mon",
      description : ""
  },
  Irrig : {
      label : "Required Irrigation",
      units : "mm/mon",
      description : ""
  },
  StandAge : {
      label : "Stand Age",
      units : "",
      description : ""
  },
  LAI : {
      label : "Leaf Area Index",
      units : "m2 / m2",
      description : "The one-sided green leaf area per unit ground surface area"
  },
  CanCond : {
      label : "Canopy Conductance",
      units : "gc,m/s",
      description : ""
  },
  Transp : {
      label : "Canopy Monthly Transpiration",
      units : "mm/mon",
      description : "Water movement through a plant and its evaporation from aerial parts"
  },
  fSW : {
      label : "Soil Water Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fAge : {
      label : "Stand age",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  PhysMod : {
      label : "",
      units : "unitless",
      description : "Physiological Modifier to Canopy Conductance"
  },
  pR : {
      label : "",
      units : "",
      description : "Along with a Physiologial parameter, specifies the amount of new growth allocated to the root system, and the turnover rate."
  },
  pS : {
      label : "",
      units : "",
      description : "Defines the foliage to stem (WF/WS) fraction in allocating aboveground biomass of the tree"
  },
  litterfall : {
      label : "",
      units : "",
      descrition : "",
      altFnName : "tdp"
  },
  NPP : {
      label : "Net Canopy Production",
      units : "Mg/ha",
      description : ""
  },
  WF : {
      label : "Leaf Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(pre_WF, cur_dW, cur_pF, cur_litterfall, prev_WF) {
          return prev_WF + cur_dW * cur_pF - cur_litterfall * prev_WF
      }
  },
  WR : {
      label : "Root Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(prev_WR, cur_dW, cur_pR, turnover, prev_WR, cur_RootP) {
          return prev_WR + cur_dW * cur_pR - tree.pR.turnover * prev_WR - cur_RootP;
      }
  },
  WS : {
      label : "Stem Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(prev_WS, cur_dW, cur_pS) { return prev_WS + cur_dW * cur_pS }
  },
  W : {
      label : "Total Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(cur_WF, cur_WR, cur_WS) { return cur_WF+cur_WR+cur_WS }
  }
}

},{}],35:[function(require,module,exports){
var app = require('./app');

// add spreadsheet viz source
// https://spreadsheets.google.com/tq?tq=select%20*&key=0Av7cUV-o2QQYdHZFYWJNNWpRS1hIVWhGQThlLWZwZWc&usp=drive_web#gid=0

function init() {
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', _handleDragOver, false);
dropZone.addEventListener('drop', _handleFileSelect, false);

document.getElementById('files').addEventListener('change', _handleFileSelect, false);

    $('#spreadsheet-weather-input-btn').on('click', function(){
        _handleGoogleSpreadsheet();
    });
    $('#spreadsheet-weather-input').on('keyup', function(e){
        if( e.which == 13 ) _handleGoogleSpreadsheet();
    });

    $('#weatherReader-localfile').on('click', function(){
        $('#weatherReader-localfile-panel').toggle('slow');
    });
    $('#weatherReader-spreadsheet').on('click', function(){
        $('#weatherReader-spreadsheet-panel').toggle('slow');
    });

}

function _handleGoogleSpreadsheet() {
    ga('send', 'event', 'ui', 'interaction', 'load-weather-drive-file', 1);

    var val = $('#spreadsheet-weather-input').val();
    if( val.length == 0 ) return;

    if( !val.match(/^http.*/ ) ) val = 'https://'+val;

    var filePanel = new WeatherFile();
    var root = $("#file_list");
    filePanel.initFromUrl(val, root);
    $('#spreadsheet-weather-input').val('');
}

function _handleFileSelect(evt) {
    ga('send', 'event', 'ui', 'interaction', 'load-weather-local-file', 1);

  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var root = $("#file_list");
  for (var i = 0, f; f = files[i]; i++) {
    var filePanel = new WeatherFile();
    filePanel.init(f, root);
  }
}

function _handleDragOver(evt) {
evt.stopPropagation();
evt.preventDefault();
evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// on add, if the list is empty, let's close the popup
function _onComplete() {
    if( $("#file_list").children().length == 0 ) {
        $('#weatherReader-modal').modal('hide');
    }
}

var WeatherFile = function() {
  var headers = {
        date     : {
            label : 'Date',
            units : 'Date',
            col   : -1
        },
        tmin     : {
            label : 'Min Temperature',
            units : 'C',
            col   : -1
        },
        tmax     : {
            label : 'Max Temperature',
            units : 'C',
            col   : -1
        },
        tdmean   : {
            label : 'Mean Temperature',
            units : 'C',
            col   : -1
        },
        ppt      : {
            label : 'Precipition',
            units : 'mm',
            col   : -1
        },
        rad      : {
            label : 'Radiation',
            units : 'MJ m-2 day-1',
            col   : -1
        },
        daylight : {
            lanel : 'Daylight Hours',
            units : 'hours',
            col   : -1
        }
    };


  var ele = $('<div style="text-align: left">'+
            '<button type="button" class="close" aria-hidden="true">&times;</button>'+
      '<div class="filename"></div>'+
      '<div class="progress">'+
      '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">'+
        '<span class="sr-only">0% Complete</span>'+
      '</div>'+
    '</div>'+
      '<div class="status">'+
                '<div class="date-range"></div>'+
                '<div class="preview-data" style="display:none">'+
                    '<div><a class="btn btn-link preview-data-btn">Preview Data</a></div>'+
                    '<div class="preview-data-table" style="display:none"></div>'+
                '</div>'+
                '<div class="col-status" style="display:none"></div>'+
                '<div style="height:50px">'+
                    '<a class="btn btn-link map-data-btn">Map CSV Columns</a>'+
                    '<a class="btn btn-success disabled pull-right">Add Data</a>'+
                '</div>'+
            '</div>'+
    '</div>');

  var data = {};
    var csvTable = [];

    // only auto hide the first time
    var autoHide = true;

  // the file reader object and the element
  function init(file, rootEle) {
    var reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onloadstart = function(e) {};
    reader.onload = function(e) {
      ele.find('.progress').remove();
      parse(e.target.result);
    }
    reader.readAsText(file)

    ele.find('.filename').html(getName(file));
    rootEle.append(ele);

        _setHandlers();
  }

    function initFromUrl(url, rootEle) {
        var q = new google.visualization.Query(url);
        ele.find('.progress').html('Querying spreadsheet...');

        var key = getKey(url);
        ele.find('.filename').html('<h3 style="border-bottom:1px solid #eee;padding:15px 0 4px 0"><i class="icon-tint"></i> '+
            'Google Spreadsheet'+(key.length > 0 ? '<br /><span style="color:#888;font-size:14px">'+key+'</span>' : '')+'</h3>');

        rootEle.append(ele);

        q.setQuery('SELECT *');
        q.send(function(response){
            ele.find('.progress').remove();

            if (response.isError()) {
                setError('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            parse(dtToCsv(response.getDataTable()));
        });

        _setHandlers();
    }

    function _setHandlers() {
        ele.find('.map-data-btn').on('click', function(){
            ele.find('.col-status').toggle('slow');
        });

        ele.find('.preview-data-btn').on('click', function(){
            ele.find('.preview-data-table').toggle('slow');
        });

        ele.find('.close').on('click', function(){
            ele.remove();
        });

        ele.find('.btn-success').on('click', function(){
            app.setWeather(data);
            ele.remove();
            _onComplete();
        });
    }

    function dtToCsv(dt) {
        var arr = [[]];

        dt = JSON.parse(dt.toJSON());
        for( var i = 0; i < dt.cols.length; i++ ) {
            arr[0].push(dt.cols[i].label);
        }

        for( var i = 0; i < dt.rows.length; i++ ) {
            arr.push([]);
            for( var j = 0; j < dt.rows[i].c.length; j++ ) {
                if( !dt.rows[i].c[j] ) arr[i+1].push('');
                else arr[i+1].push(dt.rows[i].c[j].v);
            }
        }

        var csv = '';
        for( var i = 0; i < arr.length; i++ ) {
            csv += arr[i].join(',')+'\n';
        }

        return csv;
    }

    function getKey(url) {
        var parts = url.split('?');
        if( parts.length == 1 ) return '';

        parts = parts[1].split('&');
        for( var i = 0; i < parts.length; i++ ) {
            if( parts[i].split('=')[0] == 'key' ) return parts[i].split('=')[1];
        }
        return '';
    }

  function getName(f) {
    return ['<h3 style="border-bottom:1px solid #eee;padding:15px 0 4px 0"><i class="icon-tint"></i> ', f.name,
                ' <span style="color:#888;font-size:16px">(', f.type || 'n/a',
                ')</span> - <span style="font-size:16px">', f.size, ' bytes</span>', '</h3>'].join('');
  }

  function parse(data) {
    data = data.replace(/^\s*\n/g,'').split('\n');

    var table = [];
    for( var i = 0; i < data.length; i++ ) {
      table.push(data[i].split(','));
    }

        if( table.length == 0 ) return setError('File did not contain any information.');
        csvTable = table;

        parseHeader(table[0]);
        getDateRange();
    }

    function getDateRange() {
        ele.find('.date-range').html('');
        if( headers.date.col == -1 ) return ele.find('.date-range').html('Date column needs to be matched.');
        if( typeof headers.date.col == 'string' ) headers.date.col = parseInt(headers.date.col);

        var dates = {};
        var displayDates = [];
        for( var i = 1; i < csvTable.length; i++ ) {
            if( headers.date.col < csvTable[i].length && csvTable[i].length >= 7 ) {
                var p = csvTable[i][headers.date.col].split("-");
                if( p.length != 3 && p.length != 2 ) return setError("Date: "+csvTable[i][headers.date.col]+" is not a valid format (yyyy-mm-dd or yyyy-mm)");

                if( !dates[p[0]] ) dates[p[0]] = [];
                var mmdd = p[1];

                if( dates[p[0]].indexOf(mmdd) != -1 ) return setError("Date: "+csvTable[i][headers.date.col]+" is in dataset twice");
                dates[p[0]].push(mmdd);
            }
        }

        for( var year in dates ) {
            if( dates[year].length == 12) {
                displayDates.push(year);
            } else {
                displayDates.push(year+' ['+dates[year].join(', ')+']');
            }
        }

        ele.find('.date-range').html('<b>Date Range:</b> '+displayDates.join(', '));
    }

    function parseHeader(headerRow) {
        var matched = [];

        var html = '<table class="table table-striped">';
        html += '<tr><th>Key</th><th>Column #</th></tr>';

        for( var key in headers ) {
            if( headerRow.indexOf(key) != -1 ) {
                headers[key].col = headerRow.indexOf(key);
                matched.push(key);
                html += '<tr><td>'+key+'</td><td><span class="label label-success">'+headers[key].col+' <i class="icon-ok"></i></span></td></tr>';
            } else {
                html += '<tr><td>'+key+'</td><td><select class="select-'+key+'""></select></td></tr>';
            }
        }
        ele.find('.col-status').html(html+'</table>');


        if( matched.length != 7 ) {
            // create select element for missing col's
            ele.find('.status select').append($('<option value="">[Select Column]</option>'));

            // if it's radiation, add option for calculating
            // TODO

            // append missing cols
            for( var i = 0; i < headerRow.length; i++ ) {
                if( matched.indexOf(headerRow[i]) == -1 ) {
                    ele.find('.status select').append($('<option value="'+i+'">'+i+' - '+headerRow[i]+'</option>'));
                }
            }

            // set the change handlers for the selectors
            ele.find('.status select').on('change', function(e){
                var val = $(this).find('option:selected').attr('value');
                if( val != '' ) headers[this.className.replace(/select-/,'')].col = val;

                // if all columns are set, remove disabled from btn
                var ready = true;
                for( var key in headers ) {
                    if( headers[key].col == -1 ) {
                        ready = false;
                        break;
                    }
                }

                if( ready ) {
                    if( autoHide ) ele.find('.col-status').hide('slow');
                    onReady();
                } else {
                    data = {};
                    ele.find('.btn-success').addClass('disabled');
                    ele.find('.preview-data').hide();
                }
            });

            // show the table
            ele.find('.col-status').show('slow');
        } else {
            onReady();
        }
    }

    function onReady() {
        autoHide = false;
        ele.find('.btn-success').removeClass('disabled');
        setData();
        setPreview();
    }

    function setPreview() {
        ele.find('.preview-data').show();

        var html = '<table class="table table-striped"><tr><th>date</th>';
        for( var key in headers ){
            if( key == 'date' ) continue;
            html += '<th>'+key+'</th>';
        }

        var c = 0;
        for( var date in data ){
            if( c == 10 ) {
                html += '<tr><td colspan="7" style="text-align:center">...</td></tr>';
                break;
            }

            html += '<tr><td>'+date+'</td>';
            for( var key in headers ){
                if( key == 'date' ) continue;
                html += '<td>'+data[date][key]+'</td>';
            }
            html += '</tr>';

            c++;
        }

        ele.find('.preview-data-table').html(html);
    }

  // set the map of csv headers
  function setData() {
        data = {};
        for( var i = 1; i < csvTable.length; i++ ) {
            if( csvTable[i].length < 7 ) continue; // bad row

            var date = csvTable[i][headers.date.col];

            if( !date ) continue; // bad row

            if( date.split('-').length == 3 ) date = date.split("-").splice(0,2).join("-");
            data[date] = {};

            for( var key in headers ) {
                if( key == 'date' ) continue;

                data[date][key] = parseFloat(csvTable[i][headers[key].col]);
            }
        }
  }

  function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        ele.find('.progress-bar').attr('aria-valuenow',percentLoaded).width(percentLoaded+"%");
        ele.find('.sr-only').html(Math.ceil(percentLoaded)+'% Complete');
    }
}

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        setError('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        setError('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        setError('An error occurred reading this file.');
    };
  }

  function setError(msg) {
      ele.find('.status').html('<div class="alert alert-danger">'+msg+'</div>');
  }

  return {
    init : init,
    initFromUrl : initFromUrl
  };

};

module.exports = {
  init : init
};

},{"./app":24}]},{},[24])(24)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2V4cG9ydC5qcyIsImpzbGliL2ZsYXNoQmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nZHJpdmUuanMiLCJqc2xpYi9nZHJpdmVSVC5qcyIsImpzbGliL2lucHV0Rm9ybS5qcyIsImpzbGliL21vZGVsSU8uanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXREZWZpbml0aW9ucy5qcyIsImpzbGliL3dlYXRoZXJGaWxlUmVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5ZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6K0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6aUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL2lvJyk7XG52YXIgcnVuID0gcmVxdWlyZSgnLi9saWIvcnVuJykoaW8pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gcnVuO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgYXJlIGNvbnN0YW50cy5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBkYXlzX3Blcl9tb250aDoge1xuICAgICAgICAgICAgdmFsdWU6IDMwLjQsXG4gICAgICAgICAgICB1bml0czogXCJkYXlzL21vXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZTIwOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4yLFxuICAgICAgICAgICAgdW5pdHM6IFwidnAvdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICAgICAgICB9LFxuICAgICAgICByaG9BaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAxLjIsXG4gICAgICAgICAgICB1bml0czogXCJrZy9tXjNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlbnNpdHkgb2YgYWlyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFtYmRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQ2MDAwMCxcbiAgICAgICAgICAgIHVuaXRzOiBcIkova2dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEY29udjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNjIyLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtOTAsXG4gICAgICAgICAgICB1bml0czogXCJXL21eMlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBRYjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBnRE1fbW9sOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQsXG4gICAgICAgICAgICB1bml0czogXCJnL21vbChDKVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbW9sUEFSX01KOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4zLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9sKEMpL01KXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmVlIDogcmVxdWlyZSgnLi90cmVlJyksXG4gIHBsYW50YXRpb24gOiByZXF1aXJlKCcuL3BsYW50YXRpb24nKSxcbiAgcGxhbnRhdGlvbl9zdGF0ZSA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbl9zdGF0ZScpLFxuICBzb2lsIDogcmVxdWlyZSgnLi9zb2lsJyksXG4gIHdlYXRoZXIgOiByZXF1aXJlKCcuL3dlYXRoZXInKSxcbiAgbWFuYWdlIDogcmVxdWlyZSgnLi9tYW5hZ2UnKSxcbiAgY29uc3RhdHMgOiByZXF1aXJlKCcuL2NvbnN0YW50cycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc2NyaXB0aW9uIDogXCJDcm9wIE1hbmFnZW1lbnQgUGFyYW1ldGVyc1wiLFxuICB2YWx1ZSA6IHtcbiAgICBpcnJpZ0ZyYWMgOiB7XG4gICAgICB2YWx1ZSA6IDEsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiSXJyaWdhdGlvbiBmcmFjdGlvbjogMSA9IGZ1bGx5IGlycmlnYXRlZCwgMCA9IG5vIGlycmlnYXRpb24uIEFueSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGFyZSBhY2NlcHRhYmxlXCJcbiAgICB9LFxuICAgIGZlcnRpbGl0eSA6IHtcbiAgICAgIHZhbHVlIDogMC43LFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlNvaWwgZmVydGlsaXR5XCJcbiAgICB9LFxuICAgIGRhdGVQbGFudGVkIDoge1xuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHRoZSBjcm9wIHdhcyBwbGFudGVkXCJcbiAgICB9LFxuICAgIGRhdGVDb3BwaWNlZCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSBvZiB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlSW50ZXJ2YWwgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogMyxcbiAgICAgICAgdW5pdHMgOiBcIlllYXJzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgY29wcGljZURhdGVzIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgZGF0ZUZpbmFsSGFydmVzdCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB3aGVuIHRoZSBjcm9wIGlzIGNvbXBsZXRlbHkgaGFydmVzdGVkXCJcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJHcmVlbndvb2QgUEcgVmFsdWVzIChkZWZhdWx0KVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICByZXF1aXJlZCA6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFN0b2NraW5nRGVuc2l0eToge1xuICAgICAgICAgICAgdmFsdWU6IDM1ODcsXG4gICAgICAgICAgICB1bml0czogXCJUcmVlcy9oZWN0YXJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB0cmVlcyBwbGFudGVkIHBlciBoZWN0YXJcIlxuICAgICAgICB9LFxuICAgICAgICBTZWVkbGluZ01hc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDQsXG4gICAgICAgICAgICB1bml0czogXCJrR1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFzcyBvZiB0aGUgc2VlZGxpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBzdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIGZvbGlhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byByb290XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQbGFudGF0aW9uIHN0YXRlIGNsYXNzLCBjb250YWluaW5nIGFsbCBpbnRlbWVkaWF0ZSB2YWx1ZXMgYXQgZXZlcnkgdGltZXN0ZXAgb2YgdGhlIG1vZGVsXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZmVlZHN0b2NrSGFydmVzdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQ291bnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0cmVlIGF0IHRoZSB0aW1lIG9mIGNvcHBpY2VcIlxuICAgICAgICB9LFxuICAgICAgICBWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwia1BBXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpXCJcbiAgICAgICAgfSxcbiAgICAgICAgZlQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVGVtcGVyYXR1cmUgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmRnJvc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZOdXRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk51dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnRcIlxuICAgICAgICB9LFxuICAgICAgICBmU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29pbCB3YXRlciBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgUEFSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcIm1vbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIHhQUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSW50Y3B0bjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSByYWluZmFsbCBpbnRlcmNlcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBBU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIEN1bUlycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3VtdWxhdGl2ZSBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVxdWlyZWQgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0YW5kQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRoZSB0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgTEFJOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgYXJlYSBpbmRleFwiXG4gICAgICAgIH0sXG4gICAgICAgIENhbkNvbmQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGNvbmR1Y3RhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVHJhbnNwOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBtb250aGx5IHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBQaHlzTW9kOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnVcIlxuICAgICAgICB9LFxuICAgICAgICBwZnM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0aW8gb2YgZm9saWFnZSB0byBzdGVtIHBhcnRpdGlvbmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGxpdHRlcmZhbGw6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgTlBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOZXQgUHJpbWFyeSBQcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBSb290UDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIGRXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFdGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZvbGlhZ2UgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3RlbSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVG90YWwgeWllbGQ6IHJvb3QgKyBzdGVtICsgZm9saWFnZVwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU29pbCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBjdXJyZW50IGxvY2F0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbWF4QVdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYXZhaWxhYmxlIHNvaWwgd2F0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBzd3Bvd2VyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBvd2VyIHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3Y29uc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29uc3RhbnQgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbZ2MgbS9zXT9cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWNhbCBtb2RpZmVyLCBzcGVjaWZpZXMgdGhlIGNhbm9weSBjb25kdWN0YW5jZS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHZhbHVlLCB3aGVuIGxhaT0wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDAxXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjZcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZ3Jvd3RoIGxpbWl0ZXIgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDQ3LjVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDMuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgcGFyYW1ldGVycyBhZmZlY3RpbmcgdGVtcGVyYXR1cmUgbW9kaWZpZXIsIGZULiBBIGdyYXBoIG9mIGhvdyB0aGVzZSBwYXJhbWV0ZXJzIGFmZmVjdCB0aGUgdGVtcGVyYXR1cmUgbW9kaWZpZXIgaXMgZm91bmQgaGVyZTogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzY5aXdxdG5sMjhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1pbmltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG9wdDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG9wdGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAyMFxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1heGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiA1MFxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHNwZWNpZnkgZ3Jvd3RoIHBhcmFtZXRlcnMgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZXMgb2YgdHJlZS5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgICAgazoge1xuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhZGlhdGlvbiBFeHRpbmN0aW9uIENvZWZmaWNpZW50LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBmdWxsQ2FuQWdlOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlllYXIgd2hlcmUgdHJlZSByZWFjaGVzIGZ1bGwgQ2Fub3B5IENvdmVyLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuNVxuICAgICAgICB9LFxuICAgICAgICBrRzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tQQV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldGVybWluZXMgdGhlIHJlc3BvbnNlIG9mIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UgdG8gdGhlIHZhcG9yIHByZXNzdXJlIGRlZmljaXQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGFscGhhOiB7XG4gICAgICAgICAgICB1bml0czogXCJba2cvbW9sID9dXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgcXVhbnR1bSBlZmZpY2llbmN5LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDhcbiAgICAgICAgfSxcbiAgICAgICAgZlQgOiByZXF1aXJlKCcuL2Z0JyksXG4gICAgICAgIEJMY29uZDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBib3VuZGFyeSBsYXllciBjb25kdWN0YW5jZS4gVXNlZCBpbiB0aGUgY2FsY3VhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wNFxuICAgICAgICB9LFxuICAgICAgICBmQWdlOiByZXF1aXJlKCcuL2ZhZ2UnKSxcbiAgICAgICAgZk4wOiB7XG4gICAgICAgICAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIG51dHJpdGlvbmFsIG1vZGlmaWVyLGZOdXRyLiAgZk51dHIgcmFuZ2VzIGZyb20gW2ZOTywxKSBiYXNlZCBvbiB0aGUgZmVydGlsaXR5IGluZGV4IHdoaWNoIHJhbmdlcyBmcm9tIDAgdG8gMS4gIFdoZW4gZk4wPTEgaW5kaWNhdGVzIGZOdXRyIGlzIDFcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI2XG4gICAgICAgIH0sXG4gICAgICAgIFNMQTogcmVxdWlyZSgnLi9zbGEnKSxcbiAgICAgICAgLy9DaGVja1VuaXRzQ2hhbmdldG9saW5lYXJGdW5jdGlvblxuICAgICAgICBDb25kdWN0YW5jZTogcmVxdWlyZSgnLi9jb25kdWN0YW5jZScpLFxuICAgICAgICBJbnRjcHRuOiByZXF1aXJlKCcuL2ludGNwdG4nKSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXNzaW1pbGF0aW9uIHVzZSBlZmZpY2llbmN5LiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0aGUgTlBQLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNDdcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiByZXF1aXJlKCcuL3BmcycpLFxuICAgICAgICBwUjogcmVxdWlyZSgnLi9wcicpLFxuICAgICAgICByb290UDogcmVxdWlyZSgnLi9yb290cCcpLFxuICAgICAgICBsaXR0ZXJmYWxsOiByZXF1aXJlKCcuL2xpdHRlcmZhbGwnKVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJhaW5mYWxsIGludGVyY2VwdGlvbiBmcmFjdGlvbi4gIEEgbGluZWFyIGZ1bmN0aW9uIHcuci50LiBMQUlcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI0XG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDcuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIG1vbnRobHkgbG9zcyBvZiBmb2xpYWdlLiBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbnkgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82aXE5cHBkcXM3XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAxNVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDNcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgZGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2l0aCBhIHBhaXIgb2YgYWxsb21ldHJpYyBwb3dlciBlcXVhdGlvbnMuICBUaGUgZmlyc3QgcmVsYXRlcyBiYXNhbCBkaWFtZXRlciwgKERPQikgdG8gdG90YWwgd29vZHkgYmlvbWFzcywgd2hpbGUgdGhlIHNlY29uZCByZWxhdGVzIERPQiB0byBwZnMuICBUaGUgcGFyYW1ldGVyaXphdGlvbiBvZiB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gRE9CIGFuZCB3b29keSBiaW9tYXNzIGlzIGludmVydGVkIHRvIGRldGVybWluZSB0aGUgRE9CIGZyb20gdGhlIG1vZGVsZWQgd29vZHkgZnJhY3Rpb24uICBUaGlzIHJlbGF0aW9uIGlzIHBsb3R0ZWQgYXQ6IC4gIFRoZSBtb2RlbCBhbGxvY2F0ZXMgdGhlIGFwcHJvcHJpYXRlIGZyYWN0aW9uIG9mIHdvb2QgYmFzZWQgb24gdGhlIFN0b2NraW5nIGRlbnNpdHkgb2YgdGhlIHBsYW50YXRpb24uIERPQiByYXRoZXIgdGhhbiBEQkggaXMgdXNlZCBmb3IgY29tcGFyaXNvbiBvZiB0cmVlcyB3aXRoIGEgaGlnaCBzdGVtQ250IGFuZCByYXBpZCBjb3BwaWNpbmcgdmFsdWUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgc3RlbUNudDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXZlcmFnZSBudW1iZXIgb2Ygc3RlbXMgcGVyIHN0dW1wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi44XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1DOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzc1wiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMThcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbVA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNFxuICAgICAgICB9LFxuICAgICAgICBwZnNNeDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBwb3NzaWJsZSBwZnMgdmFsdWUgYWxsb3dlZFwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgREJPIHRvIHBmc1wiLFxuICAgICAgICAgICAgdmFsdWU6IC0wLjc3MlxuICAgICAgICB9LFxuICAgICAgICBwZnNDOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gcGZzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gdGhlIHBoeXNpb2xvZ2FsIHBhcmFtZXRlciBpcyAxLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMTdcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiBtMC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgICAgfSxcbiAgICAgICAgbTA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcGVuZGFuY2Ugb24gdGhlIGZlcnRpbGl0eSBpbmRleC4gMCBpbmRpY2F0ZXMgZnVsbCBkZXBlbmRhbmNlIG9uIGZlcnRpbGl0eSwgMSBpbmRpY2F0ZXMgYSBjb25zdGFudCBhbGxvY2F0aW9uLCBpbmRlcGVuZGFudCBvZiBmZXJ0aWxpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgdHVybm92ZXI6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttb250aF4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbW9udGhseSByb290IHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHBhcmFtZXRlcnMgc3BlY2lmeSByb290IGFsbG9jYXRpb24gdG8gZ3Jvd3RoIGFmdGVyIGNvcHBpY2luZy5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgIGZyYWM6IHtcbiAgICAgICAgICB1bml0czogXCJbbW9udGheMV1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgYW1vdW50IG9mIHJvb3QgYmlvbWFzcyB0aGF0IGV4Y2VlZHMgdGhlIGFib3ZlZ3JvdW5kIHJlcXVpcmVtZW50cyB0aGF0IGNhbiBiZSBzdXBwbGllZCBpbiBhIGdpdmVuIG1vbnRoLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjJcbiAgICAgIH0sXG4gICAgICBMQUlUYXJnZXQ6IHtcbiAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgYSB0YXJnZXQgTEFJIHJhdGUuICBUaGUgVGFyZ2V0IExBSSBpcyBpbmNsdWRlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgYSB0YXJnZXQgTlBQLCBiYXNlZCBvbiB3ZWF0aGVyIHBhcmFtYXRlcnMuICBCZWxvdyB0aGlzIHRhcmdldCwgdGhlIHJvb3RzIHdpbGwgY29udHJpYnV0ZSBiaW9tYXNzIGlmIHRoZSBiZWxvdyBncm91bmQgcm9vdCBtYXNzIGV4Y2VlZHMgdGhlIHJlcXVpcmVtZW50cyBvZiB0aGUgYWJvdmVncm91bmQgYmlvbWFzcy4gVGhlIHRhcmdldCBpcyBzcGVjaWZpZWQgaW4gTEFJIHRvIHRpbWUgcm9vdCBjb250cmlidXRpb25zIHRvIHBlcmlvZHMgb2YgZ3Jvd3RoXCIsXG4gICAgICAgICAgdmFsdWU6IDEwXG4gICAgICB9LFxuICAgICAgZWZmaWNpZW5jeToge1xuICAgICAgICAgIHVuaXRzOiBcIltrZy9rZ11cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGVmZmljaWVuY3kgaW4gY29udmVydGluZyByb290IGJpb21hc3MgaW50byBhYm92ZWdyb3VuZCBiaW9tYXNzLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW21eMi9rZ11cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIFNwZWNpZmljIExlYWYgQXJlYSBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgTEFJLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDE5XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTAuOFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb250aDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBtb250aCBudW1iZXIgc2luY2UgcGxhbnRpbmdcIlxuICAgIH0sXG4gICAgdG1pbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRtYXg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0ZG1lYW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldyBwb2ludCB0ZW1wZXJhdHVyZVwiXG4gICAgfSxcbiAgICBwcHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHJlY2lwaXRhdGlvblwiXG4gICAgfSxcbiAgICByYWQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU29sYXIgcmFkaWF0aW9uXCJcbiAgICB9LFxuICAgIG5yZWw6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSwgLy8gY2FsY3VhdGVkXG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgfSxcbiAgICBkYXlsaWdodDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKipcbkBtb2R1bGUgM1BHIE1vZHVsZVxuKiovXG5cblxuLyoqXG5DbGFzcyBmb3IgYWxsIHRoZSBmdW5jdGlvbnMgdGhhdCBydW4gaW4gYSBzaW5nbGUgc3RlcCBvZiB0aGUgbW9kZWxcblxuQGNsYXNzIG1vZHVsZS5leHBvcnRzXG4qKi9cblxuXG4vKipcbmxpc3Qgb2YgY29uc3RhbnRzIHVzZWQgZm9yIGNvbXB1dGF0aW9uc1xuXG5AYXR0cmlidXRlIGNvbnN0YW50XG4qKi9cbnZhciBjb25zdGFudHMgPSB7XG4gIGRheXNfcGVyX21vbnRoOntcbiAgICAgIHZhbHVlOjMwLjQsXG4gICAgICB1bml0czonZGF5cy9tbycsXG4gICAgICBkZXNjcmlwdGlvbjonTnVtYmVyIG9mIERheXMgaW4gYW4gYXZlcmFnZSBtb250aCdcbiAgfSxcbiAgZTIwOntcbiAgICAgIHZhbHVlOjIuMixcbiAgICAgIHVuaXRzOid2cC90JyxcbiAgICAgIGRlc2NyaXB0aW9uOidSYXRlIG9mIGNoYW5nZSBvZiBzYXR1cmF0ZWQgVlAgd2l0aCBUIGF0IDIwQydcbiAgfSxcbiAgcmhvQWlyOntcbiAgICAgIHZhbHVlOjEuMixcbiAgICAgIHVuaXRzOidrZy9tXjMnLFxuICAgICAgZGVzY3JpcHRpb246J0RlbnNpdHkgb2YgYWlyJ1xuICB9LFxuICBsYW1iZGE6e1xuICAgICAgdmFsdWU6MjQ2MDAwMCxcbiAgICAgIHVuaXRzOidKL2tnJyxcbiAgICAgIGRlc2NyaXB0aW9uOidMYXRlbnQgaGVhdCBvZiB2YXBvdXJpc2F0aW9uIG9mIGgybydcbiAgfSxcbiAgVlBEY29udjp7XG4gICAgICB2YWx1ZTowLjAwMDYyMixcbiAgICAgIHVuaXRzOic/JyxcbiAgICAgIGRlc2NyaXB0aW9uOidDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwJ1xuICB9LFxuICBRYTp7XG4gICAgICB2YWx1ZTotOTAsXG4gICAgICB1bml0czonVy9tXjInLFxuICAgICAgZGVzY3JpcHRpb246J0ludGVyY2VwdCBvZiBuZXQgcmFkaWF0aW9uIHZlcnN1cyBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwJ1xuICB9LFxuICBRYjp7XG4gICAgICB2YWx1ZTowLjgsXG4gICAgICB1bml0czondW5pdGxlc3MnLFxuICAgICAgZGVzY3JpcHRpb246J3Nsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgZ0RNX21vbDp7XG4gICAgICB2YWx1ZToyNCxcbiAgICAgIHVuaXRzOidnL21vbChDKScsXG4gICAgICBkZXNjcmlwdGlvbjonTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyJ1xuICB9LFxuICBtb2xQQVJfTUo6e1xuICAgICAgdmFsdWU6Mi4zLFxuICAgICAgdW5pdHM6J21vbChDKS9NSicsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSJ1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jb25zdGFudCA9IGNvbnN0YW50O1xuZnVuY3Rpb24gY29uc3RhbnQoYykge1xuICAgIHJldHVybiBjb25zdGFudHNbY10udmFsdWU7XG59XG5cbi8qKlxuVGltZSBEZXBlbmRhbnQgQXR0cmlidXRlLFxudW5pdHM9J3ZhcmlvdXMnLFxuZGVzY3JpcHRpb249J1RoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIHRpbWUgZGVwZW5kYW50IGZ1bmN0aW9uIHRoYXQgZGVjYXlzXG4ob3IgcmlzZXMgZnJvbSBmMCB0byBmMS4gIFRoZSB2YWx1ZSAoZjArZjEpLzIgaXMgcmVhY2hlZCBhdCB0bSxcbmFuZCB0aGUgc2xvcGUgb2YgdGhlIGxpbmUgYXQgdG0gaXMgZ2l2ZW4gYnkgcC5cbkBtZXRob2QgdGRwXG5AcGFyYW0geFxuQHBhcmFtIGZcbioqL1xubW9kdWxlLmV4cG9ydHMudGRwID0gZnVuY3Rpb24oeCxmKSB7XG4gIHZhciBwPWYuZjEgKyAoZi5mMC1mLmYxKSpNYXRoLmV4cCgtTWF0aC5sb2coMikqTWF0aC5wb3coKHgvZi50bSksZi5uKSk7XG4gIHJldHVybiBwO1xufTtcblxuLyoqXG5AbWV0aG9kIGxpblxuQHBhcmFtIHhcbkBwYXJhbSBwXG4qL1xubW9kdWxlLmV4cG9ydHMubGluID0gZnVuY3Rpb24oeCwgcCl7XG4gIGlmKCB4IDwgMCApIHtcbiAgICByZXR1cm4gcC5tbjtcbiAgfVxuICBpZiggeCA+IHAueG1heCApIHtcbiAgICByZXR1cm4gcC54bWF4O1xuICB9XG4gIHJldHVybiBwLm1uICsgKHAubXgtcC5tbikqKHgvcC54bWF4KTtcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgUmFpbmZhbGwgaW50ZXJjZXB0aW9uJ1xuQG1ldGhvZCBJbnRjcHRuXG5AcGFyYW0gY3VyX0xBSVxuQHBhcmFtIGNcbiovXG5tb2R1bGUuZXhwb3J0cy5JbnRjcHRuID0gZnVuY3Rpb24oY3VyX0xBSSwgYyl7XG4gIHJldHVybiBNYXRoLm1heChjLm1uLGMubW4gKyAoYy5teCAtIGMubW4pICogTWF0aC5taW4oMSAsIGN1cl9MQUkgLyBjLmxhaSkpO1xufTtcblxuLyoqXG51bml0cz0nbW0nLFxuZGVzY3JpcHRpb249J0F2YWlsYWJsZSBTb2lsIFdhdGVyJ1xuQG1ldGhvZCBBU1dcbkBwYXJhbSBtYXhBU1dcbkBwYXJhbSBwcmV2X0FTV1xuQHBhcmFtIGRhdGVfcHB0XG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gY3VyX0lycmlnXG4qL1xubW9kdWxlLmV4cG9ydHMuQVNXID0gZnVuY3Rpb24obWF4QVNXLCBwcmV2X0FTVywgZGF0ZV9wcHQsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBjdXJfSXJyaWcpe1xuICByZXR1cm4gTWF0aC5taW4obWF4QVNXKjEwLCBNYXRoLm1heChwcmV2X0FTVyArIGRhdGVfcHB0IC0gKGN1cl9UcmFuc3AgKyBjdXJfSW50Y3B0biAqIGRhdGVfcHB0KSArIGN1cl9JcnJpZywgMCkpO1xufTtcblxuLy9UT0RPOiBkb3VibGUgY2hlY2sgdGhlIGFwcHJvcHJpYXRlIHVzZSBvZiB0ZG1lYW4gKGRldyBwb2ludCB0ZW1wKVxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8qKlxudW5pdHM9J2tQQScsXG5kZXNjcmlwdGlvbj0nTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0J1xuQG1ldGhvZCBWUERcbkBwYXJhbSBkYXRlX3RtaW5cbkBwYXJhbSBkYXRlX3RtYXhcbkBwYXJhbSBkYXRlX3RkbWVhblxuKi9cbm1vZHVsZS5leHBvcnRzLlZQRCA9IGZ1bmN0aW9uKGRhdGVfdG1pbiwgZGF0ZV90bWF4LCBkYXRlX3RkbWVhbil7XG4gIHJldHVybiAoMC42MTA4IC8gMiAqIChNYXRoLmV4cChkYXRlX3RtaW4gKiAxNy4yNyAvIChkYXRlX3RtaW4gKyAyMzcuMykgKSArIE1hdGguZXhwKGRhdGVfdG1heCAqIDE3LjI3IC8gKGRhdGVfdG1heCArIDIzNy4zKSApICkgKSAtICgwLjYxMDggKiBNYXRoLmV4cChkYXRlX3RkbWVhbiAqIDE3LjI3IC8gKGRhdGVfdGRtZWFuICsgMjM3LjMpICkgKTtcbn07XG5cblxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1ZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhciknXG5AbWV0aG9kIGZWUERcbkBwYXJhbSBrR1xuQHBhcmFtIGN1cl9WUERcbiovXG5tb2R1bGUuZXhwb3J0cy5mVlBEID0gZnVuY3Rpb24oa0csIGN1cl9WUEQpe1xuICByZXR1cm4gTWF0aC5leHAoLTEgKiBrRyAqIGN1cl9WUEQpO1xufTtcblxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8vIG1ha2UgYSBtZWFuaW5nZnVsIHRlbXB2YXIgbmFtZVxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb24gPSAnTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyJ1xuQG1ldGhvZCBmRnJvc3RcbkBwYXJhbSBkYXRlX3RtaW5cbiovXG5tb2R1bGUuZXhwb3J0cy5mRnJvc3QgPSBmdW5jdGlvbihkYXRlX3RtaW4pIHtcbiAgdmFyIHRlbXBWYXIgPSAtMS4wO1xuXG4gIGlmKCBkYXRlX3RtaW4gPj0gMCApe1xuICAgIHRlbXBWYXIgPSAxLjA7XG4gIH0gLy9lbHNlIC0xLjBcblxuICByZXR1cm4gMC41ICogKDEuMCArIHRlbXBWYXIgKiBNYXRoLnNxcnQoMSAtIE1hdGguZXhwKC0xICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKiAoNCAvIDMuMTQxNTkgKyAwLjE0ICogTWF0aC5wb3coICgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgLyAoMSArIDAuMTQgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApICkgKSApO1xufTtcblxuLy9UT0RPIC0gYmV0dGVyIG5hbWluZz86IHRtaW4sIHRtYXggPSB3ZWF0aGVyIFRvcHQsIFRtYXgsIFRtaW4gPSB0cmVlIHBhcmFtc1xuLyoqXG51bml0cz11bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdUZW1wZXJhdHVyZSBtb2RpZmllcidcbkBtZXRob2QgZlRcbkBwYXJhbSB0YXZnXG5AcGFyYW0gZlRcbiovXG5tb2R1bGUuZXhwb3J0cy5mVCA9IGZ1bmN0aW9uKHRhdmcsIGZUKXtcbiAgdmFyIGY7XG4gIGlmKHRhdmcgPD0gZlQubW4gfHwgdGF2ZyA+PSBmVC5teCl7XG4gICAgZiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgZiA9ICggKHRhdmcgLSBmVC5tbikgLyAoZlQub3B0IC0gZlQubW4pICkgICpcbiAgICAgICAgICAgTWF0aC5wb3cgKCAoIChmVC5teCAtIHRhdmcpIC8gKGZULm14IC0gZlQub3B0KSApLFxuICAgICAgICAgICAgICAgICAgICAgICggKGZULm14IC0gZlQub3B0KSAvIChmVC5vcHQgLSBmVC5tbikgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICB9XG4gIHJldHVybihmKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicsXG5kZXNjcmlwdGlvbj0nUmVxdWlyZWQgSXJyaWdhdGlvbidcbkBtZXRob2QgSXJyaWdcbkBwYXJhbSBpcnJpZ0ZyYWNcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBkYXRlX3BwdFxuKi9cbm1vZHVsZS5leHBvcnRzLklycmlnID0gZnVuY3Rpb24oaXJyaWdGcmFjLCBjdXJfVHJhbnNwLCBjdXJfSW50Y3B0biwgZGF0ZV9wcHQpe1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBpcnJpZ0ZyYWMgKiAoY3VyX1RyYW5zcCAtICgxIC0gY3VyX0ludGNwdG4pICogZGF0ZV9wcHQpICk7XG59O1xuXG4vL1RPRE86IGdldCB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBmU1dcbkBwYXJhbSBBU1dcbkBwYXJhbSBtYXhBV1NcbkBwYXJhbSBzd2NvbnN0XG5AcGFyYW0gc3dwb3dlclxuKi9cbm1vZHVsZS5leHBvcnRzLmZTVyA9IGZ1bmN0aW9uKEFTVywgbWF4QVdTLCBzd2NvbnN0LCBzd3Bvd2VyKSB7XG4gIHZhciBmU1c7XG4gIGlmKCBzd2NvbnN0ID09PSAwIHx8IG1heEFXUyA9PT0gMCApIHtcbiAgICBmU1cgPSAwO1xuICB9IGVsc2Uge1xuICAgIHZhciBvbXIgPSAxIC0gKEFTVy8xMCkgLyBtYXhBV1M7IC8vIE9uZSBNaW51cyBSYXRpb1xuXG4gICAgaWYob21yIDwgMC4wMDEpIHtcbiAgICAgIGZTVyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZTVyA9ICgxLU1hdGgucG93KG9tcixzd3Bvd2VyKSkvKDErTWF0aC5wb3cob21yL3N3Y29uc3Qsc3dwb3dlcikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZlNXO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J051dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnQnXG5AbWV0aG9kIGZOdXRyXG5AcGFyYW0gZk4wXG5AcGFyYW0gRlJcbiovXG5tb2R1bGUuZXhwb3J0cy5mTnV0ciA9IGZ1bmN0aW9uKGZOMCwgRlIpe1xuICByZXR1cm4gZk4wICsgKDEgLSBmTjApICogRlI7XG59O1xuXG4vKipcblRPRE86IHdoeSAkMyBpbiBtYWtlZmlsZSAtIGFzayBhYm91dCBpdFxudW5pdHM9dW5pdGxlc3NcbmRlc2NyaXB0aW9uPSdQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdSdcbkBtZXRob2QgUGh5c01vZFxuQHBhcmFtIGN1cl9mVlBEXG5AcGFyYW0gY3VyX2ZTV1xuQHBhcmFtIGN1cl9mQWdlXG4qL1xubW9kdWxlLmV4cG9ydHMuUGh5c01vZCA9IGZ1bmN0aW9uKGN1cl9mVlBELCBjdXJfZlNXLCBjdXJfZkFnZSl7XG4gICByZXR1cm4gTWF0aC5taW4oY3VyX2ZWUEQgLCBjdXJfZlNXKSAqIGN1cl9mQWdlO1xufTtcblxuLyoqXG51bml0cz0nZ2MsbS9zJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgQ29uZHVjdGFuY2UnXG5AbWV0aG9kIENhbkNvbmRcbkBwYXJhbSBQaHlzTW9kXG5AcGFyYW0gTEFJXG5AcGFyYW0gY29uZFxuKi9cbm1vZHVsZS5leHBvcnRzLkNhbkNvbmQgPSBmdW5jdGlvbihQaHlzTW9kLCBMQUksIGNvbmQpe1xuICAgcmV0dXJuIE1hdGgubWF4KGNvbmQubW4gLCBjb25kLm14ICogUGh5c01vZCAqIE1hdGgubWluKDEgLCBMQUkgLyBjb25kLmxhaSkgKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uJ1xuQG1ldGhvZCBUcmFuc3BcbkBwYXJhbSBkYXRlX25yZWxcbkBwYXJhbSBkYXRlX2RheWxpZ2h0XG5AcGFyYW0gY3VyX1ZQRFxuQHBhcmFtIEJMY29uZFxuQHBhcmFtIGN1cl9DYW5Db25kXG4qL1xubW9kdWxlLmV4cG9ydHMuVHJhbnNwID0gZnVuY3Rpb24oZGF0ZV9ucmVsLCBkYXRlX2RheWxpZ2h0LCBjdXJfVlBELCBCTGNvbmQsIGN1cl9DYW5Db25kKXtcbiAgdmFyIFZQRGNvbnYgPSBjb25zdGFudCgnVlBEY29udicpO1xuICB2YXIgbGFtYmRhID0gY29uc3RhbnQoJ2xhbWJkYScpO1xuICB2YXIgcmhvQWlyID0gY29uc3RhbnQoJ3Job0FpcicpO1xuICB2YXIgZTIwID0gY29uc3RhbnQoJ2UyMCcpO1xuICB2YXIgUWEgPSBjb25zdGFudCgnUWEnKTtcbiAgdmFyIFFiID0gY29uc3RhbnQoJ1FiJyk7XG5cbiAgLy8gZGF0ZV9kYXlsaWdodCA9IGhvdXJzXG4gIC8vIG5yZWwgaXMgaW4gTUovbV4yL2RheSBjb252ZXJ0IHRvIFdoL21eMi9kYXlcbiAgdmFyIG5ldFJhZCA9IFFhICsgUWIgKiAoKGRhdGVfbnJlbCAqIDI3Ny43NzgpIC8gZGF0ZV9kYXlsaWdodCk7XG4gIHZhciBkZWZUZXJtID0gcmhvQWlyICogbGFtYmRhICogVlBEY29udiAqIGN1cl9WUEQgKiBCTGNvbmQ7XG4gIHZhciBkaXYgPSAxICsgZTIwICsgQkxjb25kIC8gY3VyX0NhbkNvbmQ7XG5cbiAgLy8gQ29udmVydCBkYXlsaWdodCB0byBzZWNzLlxuICByZXR1cm4gY29uc3RhbnQoJ2RheXNfcGVyX21vbnRoJykgKiAoIChlMjAgKiBuZXRSYWQgKyBkZWZUZXJtICkgLyBkaXYgKSAqIGRhdGVfZGF5bGlnaHQgKiAzNjAwIC8gbGFtYmRhO1xufTtcblxuLy9UT0RPOiBkZXNjcmlwdGlvblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5AbWV0aG9kIE5QUFxuQHBhcmFtIHByZXZfU3RhbmRBZ2VcbkBwYXJhbSBmdWxsQ2FuQWdlXG5AcGFyYW0geFBQXG5AcGFyYW0ga1xuQHBhcmFtIHByZXZfTEFJXG5AcGFyYW0gZlZQRFxuQHBhcmFtIGZTV1xuQHBhcmFtIGZBZ2VcbkBwYXJhbSBhbHBoYVxuQHBhcmFtIGZOdXRyXG5AcGFyYW0gZlRcbkBwYXJhbSBmRnJvc3RcbiovXG5tb2R1bGUuZXhwb3J0cy5OUFAgPSBmdW5jdGlvbihwcmV2X1N0YW5kQWdlLCBmdWxsQ2FuQWdlLCB4UFAsIGssIHByZXZfTEFJLCBmVlBELCBmU1csIGZBZ2UsIGFscGhhLCBmTnV0ciwgZlQsIGZGcm9zdCl7XG4gIHZhciBDYW5Db3ZlciA9IDE7XG4gIGlmKCBwcmV2X1N0YW5kQWdlIDwgZnVsbENhbkFnZSApe1xuICAgIENhbkNvdmVyID0gcHJldl9TdGFuZEFnZSAvIGZ1bGxDYW5BZ2U7XG4gIH1cblxuICByZXR1cm4geFBQICogKDEgLSAoTWF0aC5leHAoLWsgKiBwcmV2X0xBSSkgKSApICogQ2FuQ292ZXIgKiBNYXRoLm1pbihmVlBEICwgZlNXKSAqIGZBZ2UgKiBhbHBoYSAqIGZOdXRyICogZlQgKiBmRnJvc3Q7XG59O1xuXG4vL1RPRE86IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIHBSXG5AcGFyYW0gY3VyX1BoeXNNb2RcbkBwYXJhbSBjdXJfcFJcbkBwYXJhbSBGUlxuQHBhcmFtIHBSXG4qL1xubW9kdWxlLmV4cG9ydHMucFIgPSBmdW5jdGlvbihjdXJfUGh5c01vZCwgY3VyX3BSLEZSLHBSKXtcbiAgdmFyIHAgPShwUi5teCAqIHBSLm1uKSAvXG4gICAgICAgICAocFIubW4gKyAocFIubXggLSBwUi5tbikgKiBjdXJfUGh5c01vZCAqIChwUi5tMCArICgxIC0gcFIubTApICogRlIpICk7XG5cbiAgLy8gVGhpcyB3YXMgYWRkZWQgYnkgcXVpbm4gdG8gbGltaXQgcm9vdCBncm93dGguXG4gIHJldHVybiBwICogTWF0aC5wb3cocC9jdXJfcFIsMik7XG59O1xuXG5cbi8vVE9ETzogbW9scyBvciBtb2xzIHBlciBtXjI/XG4vKipcbnVuaXRzPW1vbHNcbmRlc2NyaXB0aW9uPSdNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoJ1xubW9sUEFSX01KIFttb2wvTUpdIGlzIGEgY29uc3RhbnQgQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSXG5AbWV0aG9kIFBBUlxuQHBhcmFtIGRhdGVfcmFkXG5AcGFyYW0gbW9sUEFSX01KXG4qL1xubW9kdWxlLmV4cG9ydHMuUEFSID0gZnVuY3Rpb24oZGF0ZV9yYWQsIG1vbFBBUl9NSikge1xuICBpZiggbW9sUEFSX01KID09PSBudWxsIHx8IG1vbFBBUl9NSiA9PT0gdW5kZWZpbmVkICkge1xuICAgIG1vbFBBUl9NSiA9IGNvbnN0YW50KCdtb2xQQVJfTUonKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlX3JhZCAqIG1vbFBBUl9NSiAqIGNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xufTtcblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5kZXNjcmlwdGlvbj0nbWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uIFt0RE0gLyBoYSBtb250aF0sXG5OT1RFOiAxMDAwMC8xMF42IFtoYS9tMl1bdERtL2dETV1cbmdHTV9tb2wgW2cvbW9sXSBpcyB0aGUgbW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXG5AbWV0aG9kIHhQUFxuQHBhcmFtIHlcbkBwYXJhbSBjdXJfUEFSXG5AcGFyYW0gZ0RNX21vbFxuKi9cbm1vZHVsZS5leHBvcnRzLnhQUCA9IGZ1bmN0aW9uKHksIGN1cl9QQVIsIGdETV9tb2wpe1xuICAgIGlmKCBnRE1fbW9sID09PSBudWxsIHx8IGdETV9tb2wgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGdETV9tb2wgPSBjb25zdGFudCgnZ0RNX21vbCcpO1xuICAgIH1cblxuICAgIHJldHVybiB5ICogY3VyX1BBUiAqIGdETV9tb2wgLyAxMDA7XG59O1xuXG4vKioqIEZVTkNUSU9OUyBGT1IgQ09QUElDSU5HICovXG4vKipcbmNvcHBpY2UgcmVsYXRlZCBmdW5jdGlvbnNcbkBtZXRob2QgY29wcGljZVxuKi9cbm1vZHVsZS5leHBvcnRzLmNvcHBpY2UgPSB7XG4gIC8vIENvcHBpY2UgRnVuY3Rpb25zIGFyZSBiYXNlZCBvbiBEaWFtZXRlciBvbiBTdHVtcCwgTk9UIERCSC5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHRoZSBzdGVtIHdlaWdodCBpbiBLR1xuICBwZnMgOiBmdW5jdGlvbihzdGVtLCBwKSB7XG4gICAgdmFyIGF2RE9CID0gTWF0aC5wb3coICggc3RlbSAvIHAuc3RlbUNudCAvIHAuc3RlbUMpICwgKDEgLyBwLnN0ZW1QKSApO1xuICAgIHZhciBwcGZzPSBwLnBmc0MgKiBNYXRoLnBvdyhhdkRPQiAsIHAucGZzUCk7XG5cbiAgICByZXR1cm4gTWF0aC5taW4ocC5wZnNNeCxwcGZzKTtcbiAgfSxcblxuICAvLyBDYWxjdWxhdGVzIHRoZSBwZnMgYmFzZWQgb24gc3RlbSB3aXRoIGluIEcuICBVc2VzIHZvbHVtZSBJbmRleCBhcyBndWlkZVxuICBwZnNfdmlhX1ZJIDogZnVuY3Rpb24gKHN0ZW1HLCB3c1ZJLCBsYVZJLCBTTEEpIHtcbiAgICBpZiAoc3RlbUcgPCAxMCkge1xuICAgICAgc3RlbUcgPSAxMDtcbiAgICB9XG4gICAgdmFyIFZJID0gTWF0aC5wb3coIChzdGVtRyAvIHdzVkkuc3RlbXNfcGVyX3N0dW1wIC8gd3NWSS5jb25zdGFudCksKDEgLyB3c1ZJLnBvd2VyKSApO1xuXG4gICAgLy8gQWRkIHVwIGZvciBhbGwgc3RlbXNcbiAgICB2YXIgbGEgPSBsYVZJLmNvbnN0YW50ICogTWF0aC5wb3coVkksbGFWSS5wb3dlcikgKiB3c1ZJLnN0ZW1zX3Blcl9zdHVtcDtcbiAgICB2YXIgd2YgPSAxMDAwICogKGxhIC8gU0xBKTsgIC8vIEZvaWxhZ2UgV2VpZ2h0IGluIGc7XG4gICAgdmFyIHBmcyA9IHdmL3N0ZW1HO1xuICAgIHJldHVybiBwZnM7XG4gIH0sXG5cbiAgUm9vdFAgOiBmdW5jdGlvbihjdXJfbnBwLCBjdXJfbnBwVGFyZ2V0LCBXUixXLHBSeCxmcmFjKSB7XG4gICAgdmFyIG5wcFJlcyA9IGN1cl9ucHBUYXJnZXQgLSBjdXJfbnBwO1xuICAgIHZhciByb290UFA7XG4gICAgaWYoIG5wcFJlcyA+IDAgJiYgV1IvVyA+IHBSeCApIHtcbiAgICAgICAgcm9vdFBQID0gTWF0aC5taW4obnBwUmVzLCBXUiooV1IvVyAtIHBSeCkqZnJhYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQUCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3RQUDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZWFkIDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gICAgLy8gWW91IG5lZWQgdG8gc2V0IHlvdXIgSU8gaGVyZSBhbmQgbWFrZSBzdXJlIGFsbCBwYXJhbWV0ZXJzIGZvciBtb2RlbCBhcmUgY29ycmVjdGx5IHNldFxuICB9LFxuICBkdW1wIDogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm4gPSByZXF1aXJlKCcuL2ZuJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZGF0YU1vZGVsID0gcmVxdWlyZSgnLi9kYXRhTW9kZWwnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vdmFsaWRhdGUnKTtcblxuZnVuY3Rpb24gcnVuKGxlbmd0aE9mR3Jvd3RoKSB7XG5cbiAgICB2YXIgeWVhclRvQ29wcGljZTsgLy95ZWFyIG9mIHRoZSBmaXJzdCBvciBzdWJzZXF1ZW50IGhhcnZlc3RzXG4gICAgdmFyIGNvcHBpY2VJbnRlcnZhbDsgLy90aGUgIyBvZiBtb250aHMgaW4gYSBzaW5nbGUgY29wcGljZSBjeWNsZVxuICAgIHZhciBtb250aFRvQ29wcGljZTsgLy9hdCB3aGljaCBtb250aCB0aGUgaGFydmVzdCBpcyB0byBiZSBwZXJmb3JtZWQgOjogY3VycmVudGx5IHRoZSB0cmVlIHdpbGwgYmUgY3V0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhhdCBtb250aFxuICAgIHZhciBjb3BwaWNlRGF0ZXM7XG5cbiAgICAvLyBoZWxwZXIsIG5vdCByZXF1aXJlZC4gIHlvdSBjYW4gcmVnaXN0ZXIgY2FsbGJhY2sgdG8gc2V0IHBhcmFtZXRlcnMgd2hlbmV2ZXIgcnVuIGlzIGNhbGxlZFxuICAgIHRoaXMuaW8ucmVhZCh0aGlzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSBtb2RlbCBpbnB1dHMgYXJlIHZhbGlkIGJlZm9yZSB3ZSBwcm9jZWVkIGFueSBmdXJ0aGVyXG4gICAgdmFsaWRhdGUodGhpcyk7XG5cbiAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQ7XG4gICAgLy92YXIgcGxhbnRlZE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuICAgIC8vdmFyIGN1cnJlbnRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcblxuICAgIC8vVE9ETzogdGVzdCBubyBkYXRlY29wcGljZSBhcyBpbnB1dFxuICAgIGlmICggdGhpcy5tYW5hZ2UuZGF0ZUNvcHBpY2VkICE9PSB1bmRlZmluZWQgKXtcbiAgICAgIHllYXJUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0WWVhcigpO1xuICAgICAgbW9udGhUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0TW9udGgoKTtcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA9IHRoaXMubWFuYWdlLnllYXJzUGVyQ29wcGljZTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICBjb3BwaWNlRGF0ZXMgPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5zcGxpdCgnLScpO1xuXG4gICAgICAgIHZhciBkID0gMTU7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3BwaWNlRGF0ZXMucHVzaChuZXcgRGF0ZShwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKS0xLCBkKSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBpbml0IG1hbmFnZSBuc1xuICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgdmFyIHNldHVwID0ge1xuICAgICAgbGVuZ3RoT2ZHcm93dGggOiBsZW5ndGhPZkdyb3d0aCxcbiAgICAgIHllYXJUb0NvcHBpY2UgOiB5ZWFyVG9Db3BwaWNlLFxuICAgICAgbW9udGhUb0NvcHBpY2UgOiBtb250aFRvQ29wcGljZSxcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA6IGNvcHBpY2VJbnRlcnZhbCxcbiAgICAgIGNvcHBpY2VEYXRlcyA6IGNvcHBpY2VEYXRlcyxcbiAgICAgIGRhaWx5U3RlcCA6IHRoaXMuZGFpbHlTdGVwXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJ1blNldHVwKHNldHVwKTtcbn1cblxuZnVuY3Rpb24gcnVuU2V0dXAoc2V0dXApe1xuICAgIHZhciBpLCBrZXksIGN1cnJlbnRXZWF0aGVyLCBzdGVwLCB0O1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBjb25zb2xlLmxvZygnRGFpbHlTdGVwOiAnK3NldHVwLmRhaWx5U3RlcCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSAodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIG0gPSAnMCcrbTtcbiAgICB9XG5cbiAgICB2YXIgZCA9ICh0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSkrJyc7XG4gICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgZCA9ICcwJytkO1xuICAgIH1cblxuICAgIC8vdmFyIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG4gICAgdmFyIGZpcnN0U3RlcFJlc3VsdHMgPSBpbml0KHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsKTtcblxuICAgIHZhciBrZXlzSW5PcmRlciA9IFtdO1xuICAgIHZhciBoZWFkZXIgPSBbJ2RhdGUnXTtcbiAgICBmb3IoIGtleSBpbiBkYXRhTW9kZWwucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgIGtleXNJbk9yZGVyLnB1c2goa2V5KTtcbiAgICAgIGhlYWRlci5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgZmlyc3RTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttO1xuICAgIGlmKCBzZXR1cC5kYWlseVN0ZXAgKSB7XG4gICAgICBmaXJzdFN0ZXBSZXN1bHRzLkRhdGUgKz0gJy0nK2Q7XG4gICAgfVxuXG4gICAgdmFyIHJvd3MgPSBbXTsgLy90aGVzZSB3aWxsIGJlY29tZSByb3dzXG4gICAgcm93cy5wdXNoKGhlYWRlcik7XG5cbiAgICB2YXIgZmlyc3RSb3cgPSBbZmlyc3RTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICBmb3IoIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICBmaXJzdFJvdy5wdXNoKGZpcnN0U3RlcFJlc3VsdHNba2V5XSk7XG4gICAgfVxuICAgIHJvd3MucHVzaChmaXJzdFJvdyk7XG5cbiAgICB2YXIgY3VycmVudFN0ZXBSZXN1bHRzID0gZmlyc3RTdGVwUmVzdWx0cztcbiAgICB2YXIgbmV4dFN0ZXBSZXN1bHRzO1xuXG4gICAgZm9yKHN0ZXAgPSAxOyBzdGVwIDwgc2V0dXAubGVuZ3RoT2ZHcm93dGg7IHN0ZXArKykge1xuICAgICAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXREYXRlKHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgMSk7IC8vIGFkZCBhIGRheSB0byBjdXJyZW50IGRhdGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0TW9udGgodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSk7IC8vIGFkZCBhIG1vbnRoIHRvIGN1cnJlbnQgZGF0ZVxuICAgICAgfVxuXG4gICAgICBpZiggc2hvdWxkQ29wcGljZSh0aGlzLCBzZXR1cCkgKSB7XG4gICAgICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUaW1lIHRvIENvcHBpY2UhJyk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZS5jb3BwaWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbSA9ICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIG0gPSAnMCcrbTtcbiAgICAgIH1cblxuICAgICAgZCA9IHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpKycnO1xuICAgICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgICBkID0gJzAnK2Q7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG5cbiAgICAgIC8vVE9ETzogc3dpdGNoIHVwIHRyZWVzIGhlcmUgd2hlbiBhZnRlciB0aGUgZmlyc3QgaGFydmVzdFxuICAgICAgbmV4dFN0ZXBSZXN1bHRzID0gc2luZ2xlU3RlcCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCwgY3VycmVudFdlYXRoZXIsIHRoaXMubWFuYWdlLCBjdXJyZW50U3RlcFJlc3VsdHMsIHRoaXMuZGFpbHlTdGVwKTtcbiAgICAgIG5leHRTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttO1xuICAgICAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAgICAgbmV4dFN0ZXBSZXN1bHRzLkRhdGUgKz0gJy0nK2Q7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aGlzUm93ID0gW25leHRTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICAgIGZvciggaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzSW5PcmRlcltpXTtcbiAgICAgICAgdGhpc1Jvdy5wdXNoKG5leHRTdGVwUmVzdWx0c1trZXldKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFN0ZXBSZXN1bHRzID0gbmV4dFN0ZXBSZXN1bHRzO1xuICAgICAgcm93cy5wdXNoKHRoaXNSb3cpO1xuICAgIH1cblxuICAgIHRoaXMuaW8uZHVtcChyb3dzKTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2coc3RlcCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgIGNvbnNvbGUubG9nKChuZXcgRGF0ZSgpLmdldFRpbWUoKS10KSsnbXMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbn1cblxuZnVuY3Rpb24gc2luZ2xlU3RlcChwbGFudGF0aW9uLCBzb2lsLCB3ZWF0aGVyLCBtYW5hZ2UsIHAsIGRhaWx5U3RlcCkgeyAvL3AgPSBwcmV2aW91cyBzdGF0ZVxuICB2YXIgYyA9IHt9OyAvL2N1cnJlbnQgc3RhdGVcblxuICBkYWlseVN0ZXAgPSBkYWlseVN0ZXAgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gIHZhciBzdGVwRGl2aXNpb24gPSBkYWlseVN0ZXAgPyAzNjUgOiAxMjtcblxuICBpZiggbWFuYWdlLmNvcHBpY2UgPT09IHRydWUgKSB7IC8vY2hhbmdlIHRoaXMgZ3V5IGZvciB0aGUgbW9udGggd2hlbiBjb3BwaWNlXG4gICAgLy8gQWRkIGluIGEgc3R1bXAgbWFyZ2luLi4uLlxuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdCArIHAuV1M7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudCArIDE7XG4gICAgYy5jb3BwaWNlQWdlID0gMDtcbiAgICBwLkxBSSA9IDA7XG4gICAgcC5XUyA9IDA7XG4gICAgcC5XRiA9IDA7XG4gICAgcC5XID0gcC5XUjtcbiAgfSBlbHNlIHtcbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3Q7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudDtcbiAgICBjLmNvcHBpY2VBZ2UgPSBwLmNvcHBpY2VBZ2UgKyAxLjAvc3RlcERpdmlzaW9uO1xuICB9XG5cbiAgdmFyIHRyZWU7IC8vdHJlZVxuICBpZiggYy5jb3BwaWNlQ291bnQgPT09IDAgKSB7IC8vVE9ETzogY2hlY2sgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIG11bHRpIHN0dW1wIHRyZWVcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcbiAgfSBlbHNlIHtcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZTtcbiAgfVxuXG4gIGMuU3RhbmRBZ2UgPSBwLlN0YW5kQWdlICsgMS4wL3N0ZXBEaXZpc2lvbjtcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLlNMQSk7XG4gIGMuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuICBjLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4pO1xuICBjLmZWUEQgPSBmbi5mVlBEKHRyZWUua0csIGMuVlBEKTtcblxuICBjLmZTVyA9IGZuLmZTVyhwLkFTVywgc29pbC5tYXhBV1MsIHNvaWwuc3djb25zdCwgc29pbC5zd3Bvd2VyKTtcbiAgYy5mQWdlID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuZkFnZSk7XG5cbiAgYy5mRnJvc3QgPSBmbi5mRnJvc3Qod2VhdGhlci50bWluKTtcbiAgaWYoIGRhaWx5U3RlcCApIHtcbiAgLy8gSEFDSyBmb3Igbm93XG4gICAgYy5mRnJvc3QgPSAxO1xuICAvLyAgYy5mRnJvc3QgPSBjLmZGcm9zdCAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICB9XG5cbiAgYy5QQVIgPSBmbi5QQVIod2VhdGhlci5yYWQpOyAvLyBNb250aGx5IFBBUiBpbiBtb2xzXG4gIGlmKCBkYWlseVN0ZXAgKSB7XG4gICAgYy5QQVIgPSBjLlBBUiAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICB9XG5cbiAgYy5mVCA9IGZuLmZUKCh3ZWF0aGVyLnRtaW4gKyB3ZWF0aGVyLnRtYXgpLzIsIHRyZWUuZlQpO1xuXG4gIGMueFBQID0gZm4ueFBQKHRyZWUueSwgYy5QQVIpOyAvLyBtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb24gcGVyIG1vbnRoXG4gIC8vaWYoIGRhaWx5U3RlcCApIHsgLy8gcGVyIGRheVxuICAvLyAgYy54UFAgPSBjLnhQUCAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICAvL31cblxuXG4gIGMuUGh5c01vZCA9IGZuLlBoeXNNb2QoYy5mVlBELCBjLmZTVywgYy5mQWdlKTtcbiAgYy5mTnV0ciA9IGZuLmZOdXRyKHRyZWUuZk4wLCBtYW5hZ2UuZmVydGlsaXR5KTtcblxuICBjLk5QUCA9IGZuLk5QUChwLmNvcHBpY2VBZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgcC5MQUksIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuICAvL2lmKCBkYWlseVN0ZXAgKSB7IC8vIHBlciBkYXlcbiAgLy8gIGMuTlBQID0gYy5OUFAgLyBmbi5jb25zdGFudCgnZGF5c19wZXJfbW9udGgnKTtcbiAgLy99XG5cbiAgdmFyIE5QUF90YXJnZXQgPSBmbi5OUFAodHJlZS5mdWxsQ2FuQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHRyZWUucm9vdFAuTEFJVGFyZ2V0LCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcbiAgYy5Sb290UCA9IGZuLmNvcHBpY2UuUm9vdFAoYy5OUFAsIE5QUF90YXJnZXQsIHAuV1IsIHAuVywgdHJlZS5wUi5teCwgdHJlZS5yb290UC5mcmFjKTtcblxuICBpZiAodHJlZS5sYVZJICYmIHRyZWUubGFWSS5jb25zdGFudCApIHsgLy8gVGVzdCBmb3IgdGhhdCBmdW5jdGlvblxuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnNfdmlhX1ZJKHAuV1MqMTAwMDAwMC9wbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSwgdHJlZS53c1ZJLHRyZWUubGFWSSxzbGEpO1xuICB9IGVsc2Uge1xuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnMocC5XUyoxMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLnBmcyk7XG4gIH1cblxuICBjLmRXID0gYy5OUFAgKyB0cmVlLnJvb3RQLmVmZmljaWVuY3kgKiBjLlJvb3RQO1xuXG4gIGMuSW50Y3B0biA9IGZuLkludGNwdG4oYy5MQUksIHRyZWUuSW50Y3B0bik7XG4gIGMuQ2FuQ29uZCA9IGZuLkNhbkNvbmQoYy5QaHlzTW9kLCBjLkxBSSwgdHJlZS5Db25kdWN0YW5jZSk7XG5cbiAgYy5wUiA9IGZuLnBSKGMuUGh5c01vZCwgcC5XUi9wLlcsIG1hbmFnZS5mZXJ0aWxpdHksIHRyZWUucFIpO1xuICBjLmxpdHRlcmZhbGwgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5saXR0ZXJmYWxsKTtcblxuICBjLlRyYW5zcCA9IGZuLlRyYW5zcCh3ZWF0aGVyLnJhZCwgd2VhdGhlci5kYXlsaWdodCwgYy5WUEQsIHRyZWUuQkxjb25kLCBjLkNhbkNvbmQpO1xuICBpZiggZGFpbHlTdGVwICkge1xuICAgIGMuVHJhbnNwID0gYy5UcmFuc3AgLyBmbi5jb25zdGFudCgnZGF5c19wZXJfbW9udGgnKTtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZWQgZnJvbSBwZnNcbiAgYy5wUyA9ICgxIC0gYy5wUikgLyAoMSArIGMucGZzICk7XG4gIGMucEYgPSAoMSAtIGMucFIpIC8gKDEgKyAxL2MucGZzICk7XG5cbiAgYy5JcnJpZyA9IGZuLklycmlnKG1hbmFnZS5pcnJpZ0ZyYWMsIGMuVHJhbnNwLCBjLkludGNwdG4sIHdlYXRoZXIucHB0KTtcbiAgYy5DdW1JcnJpZyA9IHAuQ3VtSXJyaWcgKyBjLklycmlnO1xuXG4gIGMuQVNXID0gZm4uQVNXKHNvaWwubWF4QVdTLCBwLkFTVywgd2VhdGhlci5wcHQsIGMuVHJhbnNwLCBjLkludGNwdG4sIGMuSXJyaWcpOyAvL2ZvciBzb21lIHJlYXNvbiBzcGVsbGVkIG1heEFXU1xuXG4gIGMuV0YgPSBwLldGICsgYy5kVyAqIGMucEYgLSBjLmxpdHRlcmZhbGwgKiBwLldGO1xuICAvLyBJbmNsdWRlIGNvbnRyaWJ1dGlvbiBvZiBSb290UCAvLyBFcnJvciBpbiBvbGQgY29kZSAhXG4gIGMuV1IgPSBwLldSICsgYy5kVyAqIGMucFIgLSB0cmVlLnBSLnR1cm5vdmVyICogcC5XUiAtIGMuUm9vdFA7XG4gIGMuV1MgPSBwLldTICsgYy5kVyAqIGMucFM7XG4gIGMuVyA9IGMuV0YrYy5XUitjLldTO1xuXG4gIHJldHVybiBjO1xufVxuXG5mdW5jdGlvbiBpbml0KHBsYW50YXRpb24sIHNvaWwpIHtcbiAgdmFyIHAgPSB7fTtcbiAgdmFyIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTsgLy9UT0RPOiBkZWNpZGUgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIHRyZWU/XG5cbiAgcC5mZWVkc3RvY2tIYXJ2ZXN0PTA7XG4gIHAuY29wcGljZUNvdW50PTA7XG4gIHAuY29wcGljZUFnZSA9IDA7XG5cbiAgcC5DdW1JcnJpZyA9IDA7XG4gIHAuZFcgPSAwO1xuICBwLlcgPSBwbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSAqIHBsYW50YXRpb24uU2VlZGxpbmdNYXNzO1xuICBwLldGID0gcGxhbnRhdGlvbi5wRiAqIHAuVztcbiAgcC5XUyA9IHBsYW50YXRpb24ucFMgKiBwLlc7XG4gIHAuV1IgPSBwbGFudGF0aW9uLnBSICogcC5XO1xuICBwLkFTVyA9IDAuOCAqIDEwICogc29pbC5tYXhBV1M7IC8vIFRoZSAxMCBpcyBiZWNhdXNlIG1heEFXUyBpcyBpbiBjbSBhbmQgQVNXIGluIG1tICg/KSBXaHkgKD8pXG4gIHAuU3RhbmRBZ2UgPSAwO1xuXG4gIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcblxuICAvLyBzbGEgPSBTcGVjaWZpYyBMZWFmIEFyZWFcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLHRyZWUuU0xBKTtcblxuICBwLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcblxuICAvLyBUaGVzZSBhcmVuJ3QgdXNlZCBzbyBjYW4gYmUgc2V0IHRvIGFueXRoaW5nOyAgVGhleSBhcmUgc2V0IHRvIG1hdGNoIHRoZSBwb3N0Z3JlcyB0eXBlXG4gIHAuVlBEICAgICAgICA9IDA7XG4gIHAuZlZQRCAgICAgICA9IDA7XG4gIHAuZlQgICAgICAgICA9IDA7XG4gIHAuZkZyb3N0ICAgICA9IDA7XG4gIHAuZk51dHIgICAgICA9IDA7XG4gIHAuZlNXICAgICAgICA9IDA7XG4gIHAuZkFnZSAgICAgICA9IDA7XG4gIHAuUEFSICAgICAgICA9IDA7XG4gIHAueFBQICAgICAgICA9IDA7XG4gIHAuSW50Y3B0biAgICA9IDA7XG4gIHAuSXJyaWcgICAgICA9IDA7XG4gIHAuQ2FuQ29uZCAgICA9IDA7XG4gIHAuVHJhbnNwICAgICA9IDA7XG4gIHAuUGh5c01vZCAgICA9IDA7XG4gIHAucGZzICAgICAgICA9IDA7XG4gIHAucFIgICAgICAgICA9IDA7XG4gIHAucFMgICAgICAgICA9IDA7XG4gIHAucEYgICAgICAgICA9IDA7XG4gIHAubGl0dGVyZmFsbCA9IDA7XG4gIHAuTlBQICAgICAgICA9IDA7XG4gIHAuUm9vdFAgICAgICA9IDA7XG5cbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIGdldFdlYXRoZXIobW9kZWwsIHNldHVwLCBtb250aCwgZGF5KSB7XG5cbiAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAvLyBhY3R1YWxcbiAgICBpZiggbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5XSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGgrJy0nK2RheV07XG4gICAgfVxuXG4gICAgLy8gbW9kZWxsZWQgZGFpbHlcbiAgICBpZiggbW9kZWwud2VhdGhlclttb250aCsnLScrZGF5XSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIG1vZGVsLndlYXRoZXJbbW9udGgrJy0nK2RheV07XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgLy8gYWN0dWFsXG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGhdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aF07XG4gICAgfVxuICB9XG5cbiAgLy8gbW9kZWxsZWQgTW9udGhseVxuICBpZiggbW9kZWwud2VhdGhlclttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aF07XG4gIH1cblxuICB0aHJvdyAnUnVudGltZSBFcnJvcjogbm8gd2VhdGhlciBmb3VuZCBmb3IgbW9udGg6ICcrbW9udGg7XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvcHBpY2UobW9kZWwsIHNldHVwKSB7XG4gIC8vIGRvIHdlIGhhdmUgc3BlY2lmaWMgY29wcGljZSBkYXRlcyBzZXQ/XG4gIGlmKCBzZXR1cC5jb3BwaWNlRGF0ZXMgKSB7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgZCA9IHNldHVwLmNvcHBpY2VEYXRlc1tpXTtcblxuICAgICAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAgICAgaWYoIGQuZ2V0WWVhcigpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldFllYXIoKSAmJlxuICAgICAgICAgICAgZC5nZXRNb250aCgpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgJiZcbiAgICAgICAgICAgIGQuZ2V0RGF0ZSgpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCBkLmdldFllYXIoKSA9PT0gdGhpcy5jdXJyZW50RGF0ZS5nZXRZZWFyKCkgJiZcbiAgICAgICAgICAgIGQuZ2V0TW9udGgoKSA9PT0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpICkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuICB9IGVsc2Uge1xuXG4gICAgLy8gZG8gd2UgaGF2ZSBhbiBpbnRlcnZhbCBzZXQ/XG4gICAgLy8gVE9ETzogdGhpcyBjdXJyZW50bHkgb25seSB3b3JrcyBvbiAxc3Qgb2YgbW9udGhcbiAgICBpZiggbW9kZWwuY3VycmVudERhdGUuZ2V0WWVhcigpID09PSBzZXR1cC55ZWFyVG9Db3BwaWNlICYmXG4gICAgICBtb2RlbC5jdXJyZW50RGF0ZS5nZXRNb250aCgpID09PSBzZXR1cC5tb250aFRvQ29wcGljZSApe1xuXG4gICAgICBzZXR1cC55ZWFyVG9Db3BwaWNlID0gc2V0dXAueWVhclRvQ29wcGljZSArIHNldHVwLmNvcHBpY2VJbnRlcnZhbDsgLy9uZXh0IGNvcHBpY2UgeWVhclxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb24obmFtZSkge1xuICBpZiggZm5bbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuW25hbWVdO1xuICB9IGVsc2UgaWYoIGZuLmNvcHBpY2VbbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuLmNvcHBpY2VbbmFtZV07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW8pIHtcbiAgcmV0dXJuIHtcbiAgICBpbyA6IGlvLFxuICAgIHJ1biA6IHJ1bixcbiAgICBzaW5nbGVTdGVwIDogc2luZ2xlU3RlcCxcbiAgICBydW5TZXR1cCA6IHJ1blNldHVwLFxuICAgIGluaXQgOiBpbml0LFxuICAgIGdldEZ1bmN0aW9uIDogZ2V0RnVuY3Rpb24sXG4gICAgc2V0SU8gOiBmdW5jdGlvbihpbykge1xuICAgICAgdGhpcy5pbyA9IGlvO1xuICAgIH0sXG4gICAgZ2V0RGF0YU1vZGVsIDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGF0YU1vZGVsO1xuICAgIH1cbiAgfTtcbn07XG4iLCJmdW5jdGlvbiBlbnYoKSB7XG4gIGlmKCB0eXBlb2YgcGx2OCAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gXCJwbHY4XCI7XG4gIGlmKCB0eXBlb2YgTG9nZ2VyICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcImFwcHNjcmlwdFwiO1xuICBpZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHJldHVybiBcIm5vZGVcIjtcbn1cblxuZnVuY3Rpb24gbG9nKG1zZykge1xuICB2YXIgZSA9IGVudigpO1xuICBpZiggZSA9PSBcInBsdjhcIiApIHBsdjguZWxvZyhOT1RJQ0UsICdub3RpY2UnLCBtc2cpO1xuICBlbHNlIGlmKCBlID09IFwiYXBwc2NyaXB0XCIgKSBMb2dnZXIubG9nKG1zZyk7XG4gIGVsc2UgY29uc29sZS5sb2cobXNnKTtcbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIGlmIChudWxsID09IG9iaiB8fCBcIm9iamVjdFwiICE9IHR5cGVvZiBvYmopIHJldHVybiBvYmo7XG4gIHZhciBjb3B5ID0gb2JqLmNvbnN0cnVjdG9yKCk7XG4gIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkgY29weVthdHRyXSA9IG9ialthdHRyXTtcbiAgfVxuICByZXR1cm4gY29weTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVudiA6IGVudixcbiAgbG9nIDogbG9nLFxuICBjbG9uZSA6IGNsb25lXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBWYWxpZGF0ZSBhIG1vZGVsIHJ1biBzZXR1cC4gIHRocm93IGVycm9yIGlzIGJhZG5lc3MuXG4gKi9cbnZhciBkYXRhTW9kZWwgPSByZXF1aXJlKCcuL2RhdGFNb2RlbCcpO1xudmFyIHBhcmFtRXJyb3IgPSAnVmFsaWRhdGlvbiBFcnJvcjogJztcblxudmFyIHZhbGlkV2VhdGhlcktleXMgPSBbXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGQkLywgLy8gbW9kZWxsZWQgb3IgYXZlcmFnZSB3ZWF0aGVyIE1NIGZvciBtb250aGx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkLywgLy8gc3BlY2lmaWMgd2VhdGhlciBZWVlZLU1NLUREIGZvciBkYWlseSB0aW1lc3RlcFxuICAvXlxcZFxcZC1cXGRcXGQkLyAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCk7XG4gIHZhbGlkYXRlTWFuYWdlKG1vZGVsKTtcbiAgdmFsaWRhdGVXZWF0aGVyKG1vZGVsKTtcbiAgdmFsaWRhdGVTb2lsKG1vZGVsKTtcbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWFuYWdlKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwubWFuYWdlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG5cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwubWFuYWdlLCBtb2RlbC5tYW5hZ2UsICdtYW5hZ2UnKTtcblxuICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcyApIHtcbiAgICBpZiggIUFycmF5LmlzQXJyYXkobW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcykgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKydtYW5hZ2UuY29wcGljZURhdGVzIHNob3VsZCBiZSBhbiBhcnJheSBvZiBkYXRlIHN0cmluZ3MuJztcbiAgICB9XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQkJykgfHwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkJCcpICkge1xuICAgICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCBtYW5hZ2UuY29wcGljZURhdGVzIGZvcm1hdCAnK21vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXNbaV0rJy4gc2hvdWxkIGJlIFlZWVktTU0gZm9ybWF0Lic7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuXG4gICAgaWYoIG1vZGVsLm1hbmFnZS5kYXRlQ29wcGljZWQgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UuZGF0ZUNvcHBpY2VkIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG4gICAgaWYoIG1vZGVsLm1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UueWVhcnNQZXJDb3BwaWNlIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG5cbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpIHtcbiAgaWYoICFtb2RlbC53ZWF0aGVyICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ05vIHdlYXRoZXIgZGVmaW5lZCc7XG4gIH1cblxuICBmb3IoIHZhciBrZXkgaW4gbW9kZWwud2VhdGhlciApIHtcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbGlkV2VhdGhlcktleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZigga2V5Lm1hdGNoKHZhbGlkV2VhdGhlcktleXNbaV0pICkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCAhZm91bmQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCB3ZWF0aGVyIGtleTogJytrZXk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwud2VhdGhlciwgbW9kZWwud2VhdGhlcltrZXldLCAnd2VhdGhlcicpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gdmFsaWRhdGVTb2lsKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwuc29pbCApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydzb2lsIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5zb2lsLCBtb2RlbC5zb2lsLCAnc29pbCcpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVBsYW50YXRpb24obW9kZWwpIHtcbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24gaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5wbGFudGF0aW9uLCBtb2RlbC5wbGFudGF0aW9uLCAncGxhbnRhdGlvbicpO1xuXG4gIGlmKCAhbW9kZWwucGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC50cmVlLCBtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSwgJ3BsYW50YXRpb24uc2VlZGxpbmdUcmVlJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLmNvcHBpY2VkVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLmNvcHBpY2VkVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlLCAncGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUnKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwsIG1vZGVsLCBuYW1lKSB7XG4gIHZhciBrZXksIGl0ZW07XG5cbiAgZm9yKCBrZXkgaW4gZGF0YU1vZGVsLnZhbHVlICkge1xuICAgIGl0ZW0gPSBkYXRhTW9kZWwudmFsdWVba2V5XTtcbiAgICBpZiggaXRlbS5yZXF1aXJlZCA9PT0gZmFsc2UgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiggbW9kZWxba2V5XSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcituYW1lKycuJytrZXkrJyBpcyBtaXNzaW5nICcrXG4gICAgICAgICAgICAoaXRlbS5kZXNjcmlwdGlvbiA/ICcoJytpdGVtLmRlc2NyaXB0aW9uKycpJyA6ICcnKTtcbiAgICB9XG5cbiAgICBpZiggdHlwZW9mIGl0ZW0udmFsdWUgPT09ICdvYmplY3QnICkge1xuICAgICAgdmFsaWRhdGVNb2RlbChpdGVtLCBtb2RlbFtrZXldLCBuYW1lKycuJytrZXkpO1xuICAgIH1cbiAgfVxufVxuIiwidmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG52YXIgY2hhcnRzO1xudmFyIGlucHV0Rm9ybTtcbnZhciBleHBvcnRlciA9IHJlcXVpcmUoJy4vZXhwb3J0Jyk7XG52YXIgb2ZmbGluZSA9IHJlcXVpcmUoJy4vb2ZmbGluZScpO1xuXG4vLyBpbXBvcnQgbW9kZWwgc3R1ZmZcbnZhciBtb2RlbCA9IHJlcXVpcmUoJy4uLy4uL3BvcGxhci0zcGctbW9kZWwnKTtcbnZhciBtb2RlbElPID0gcmVxdWlyZSgnLi9tb2RlbElPJyk7XG5tb2RlbC5zZXRJTyhtb2RlbElPKTtcblxudmFyIGRhaWx5ID0gdHJ1ZTtcblxudmFyIHJ1bkNhbGxiYWNrID0gbnVsbDtcbnZhciBfM3BnTW9kZWwgPSBudWxsO1xuXG52YXIgaW5wdXRzID0ge1xuICB3ZWF0aGVyIDogW1wibW9udGhcIixcInRtaW5cIixcInRtYXhcIixcInRkbWVhblwiLFwicHB0XCIsXCJyYWRcIixcImRheWxpZ2h0XCJdXG59O1xudmFyIG91dHB1dHMgPSBbXCJWUERcIixcImZWUERcIixcImZUXCIsXCJmRnJvc3RcIixcIlBBUlwiLFwieFBQXCIsXCJJbnRjcHRuXCIsXCJBU1dcIixcIkN1bUlycmlnXCIsXG4gICAgICAgICAgIFwiSXJyaWdcIixcIlN0YW5kQWdlXCIsXCJMQUlcIixcIkNhbkNvbmRcIixcIlRyYW5zcFwiLFwiZlNXXCIsXCJmQWdlXCIsXG4gICAgICAgICAgIFwiUGh5c01vZFwiLFwicFJcIixcInBTXCIsXCJsaXR0ZXJmYWxsXCIsXCJOUFBcIixcIldGXCIsXCJXUlwiLFwiV1NcIixcIldcIl07XG52YXIgZGVidWcgPSBmYWxzZTtcbnZhciBkZXZtb2RlID0gZmFsc2U7XG5cbnZhciB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSBudWxsO1xuXG4vLyByb3cgcmF3IGRhdGEgZG9lcyBhIGxvdCBvZiBwcm9jZXNzaW5nIG9mIHRoZSByZXN1bHRzIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBvZiB3aGF0J3Ncbi8vIGJlaW5nIGRpc3BsYXllZC4gIEdvIGFoZWFkIGFuIHNldHVwIHRoZSBjc3YgZGF0YSBhdCB0aGlzIHBvaW50LCB0aGVuIGlmIHRoZSB1c2VyXG4vLyBkZWNpZGVzIHRvIGV4cG9ydCwgd2UgYXJlIGFsbCBzZXQgdG8gdG87XG52YXIgY3N2UmVzdWx0cyA9IG51bGw7XG5cbnZhciBnZXRNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbW9kZWw7XG59XG5cbnZhciBnZXRPdXRwdXRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBvdXRwdXRzO1xufVxuXG5cblxudmFyIG91dHB1dERlZmluaXRpb25zID0gcmVxdWlyZSgnLi9vdXRwdXREZWZpbml0aW9ucycpO1xuXG5cbmZ1bmN0aW9uIHFzKGtleSkge1xuICBrZXkgPSBrZXkucmVwbGFjZSgvWyorP14kLlxcW1xcXXt9KCl8XFxcXFxcL10vZywgXCJcXFxcJCZcIik7XG4gIHZhciBtYXRjaCA9IGxvY2F0aW9uLnNlYXJjaC5tYXRjaChuZXcgUmVnRXhwKFwiWz8mXVwiICsga2V5ICsgXCI9KFteJl0rKSgmfCQpXCIpKTtcbiAgcmV0dXJuIG1hdGNoICYmIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBpbnB1dEZvcm0gPSByZXF1aXJlKCcuL2lucHV0Rm9ybScpKHRoaXMpO1xuICBjaGFydHMgPSByZXF1aXJlKCcuL2NoYXJ0cycpO1xuICBjaGFydHMuc2V0QXBwKHRoaXMpO1xuXG4gIG1vZGVsSU8uYXBwID0gdGhpcztcbiAgbW9kZWxJTy5tb2RlbCA9IG1vZGVsO1xuICBtb2RlbElPLmNoYXJ0cyA9IGNoYXJ0cztcbiAgbW9kZWxJTy5pbnB1dEZvcm0gPSBpbnB1dEZvcm07XG5cbiAgLy8gY2hlY2sgaWYgZmxhc2ggaXMgaW5zdGFsbGVkLiAgSWYgbm90LCBoaWRlIHRoZSBjaGFydCB0eXBlIHRvZ2dsZS5cbiAgcmVxdWlyZSgnLi9mbGFzaEJsb2NrLWRldGVjdG9yJykoZnVuY3Rpb24odmFsKXtcbiAgICAgIGlmKCB2YWwgPiAwICkgJChcIiNjaGFydC10eXBlLWJ0bi1ncm91cFwiKS5oaWRlKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGV4cG9ydCBtb2RhbFxuICBleHBvcnRlci5pbml0KCk7XG4gICQoXCIjZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZXhwb3J0ZXIuZXhwb3J0Q3N2KGNzdlJlc3VsdHMpO1xuICB9KTtcblxuICB2YXIgZWxlID0gJChcIiNpbnB1dHMtY29udGVudFwiKTtcbiAgaW5wdXRGb3JtLmNyZWF0ZShlbGUpO1xuXG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgY2hhcnRzXG4gIGNoYXJ0cy5pbml0KCk7XG5cbiAgLy8gc2V0IGRlZmF1bHQgY29uZmlnXG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoyKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMTAqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG5cbiAgLy8gc2V0dXAgbmljZSBzY3JvbGxpbmdcbiAgJCgnLmFwcC1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoaXMuaGFzaCkub2Zmc2V0KCkudG9wLTU1XG4gICAgICAgfSwgNzAwKTtcbiB9KTtcblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICBjaGFydHMucmVzaXplKCk7XG5cbiAgICAgIGlmKCB3ZWF0aGVyQ3VzdG9tQ2hhcnQgKSB7XG4gICAgICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICAgICAgfVxuICB9KTtcblxuICBjYWxsYmFjaygpO1xufVxuXG5cbnZhciBydW5Db21wbGV0ZSA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgaWYgKCBydW5DYWxsYmFjayApIHJ1bkNhbGxiYWNrKHJvd3MpO1xuICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIHJ1bkNhbGxiYWNrID0gbnVsbDtcbn07XG5cbnZhciBtb250aHNUb1J1biA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZDEgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcbiAgaWYgKGQxICYmIGQxICE9PSBcIlwiKSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQxID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBkMiA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCk7XG4gIGlmIChkMiAmJiBkMiAhPT0gXCJcIikge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQyID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBtb250aHM7XG4gIG1vbnRocyA9IChkMi5nZXRGdWxsWWVhcigpIC0gZDEuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgbW9udGhzIC09IGQxLmdldE1vbnRoKCkgKyAxO1xuICBtb250aHMgKz0gZDIuZ2V0TW9udGgoKTtcbiAgcmV0dXJuIG1vbnRocyA8PSAwID8gMSA6IG1vbnRocysxO1xufVxuXG5cbnZhciBydW5Nb2RlbCA9IGZ1bmN0aW9uKGlzUnQpIHtcblxuICBpZiAoJChcIiNydW5idG4sICNydW5idG4tc21cIikuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkgcmV0dXJuO1xuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJSdW5uaW5nLi4uXCIpO1xuXG4gIGlmKCAhY2hlY2tXZWF0aGVyKCkgKSByZXR1cm47XG5cbiAgLy8gbGV0IFVJIHByb2Nlc3MgZm9yIGEgc2VjIGJlZm9yZSB3ZSB0YW5rIGl0XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHByZWZvcm1lZCB3LyBhIHdlYndvcmtlclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuJywgMSk7XG5cbiAgICAgIC8vIHJlYWQgZXZlcnl0aGluZyBzbyB0aGUgdmFyaWF0aW9ucyBhcmUgc2V0XG4gICAgICBtb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICBtb2RlbElPLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgb25seSBzZXR0aW5nIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnNcbiAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkgcGFyYW1zLnB1c2goa2V5KTtcbiAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIGEgbGltaXQgb2YgMiB2YXJpYXRpb24gcGFyYW1ldGVycyBwZXIgcnVuLiAgQ3VycmVudGx5IHlvdSBhcmUgdmFyeWluZyBcIitcbiAgICAgICAgICAgICAgICBcInRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcXG5cXG4gLVwiK3BhcmFtcy5qb2luKFwiXFxuIC1cIikpO1xuICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICBpZiggIWlzUnQgKSBnZHJpdmUucnVuTW9kZWxSdCgpO1xuXG4gICAgICAvLyBzaG93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICAkKFwiI3ZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCIpLmh0bWwoXCI8Yj5cIisocGFyYW1zLmxlbmd0aCA9PSAwID8gXCJOb25lXCIgOiBwYXJhbXMuam9pbihcIiwgXCIpKStcIjwvYj5cIik7XG5cbiAgICAgIC8vIHdlIGFyZSBvbmx5IHJ1bm5pbmcgb25jZVxuICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID09PSAwICkge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi1zaW5nbGVQYXJhbScsIDEpO1xuXG4gICAgICAgICAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICAgICAgICAgIHNob3dSZXN1bHRzKHJvd3MpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBtb2RlbC5kYWlseVN0ZXAgPSBkYWlseTtcbiAgICAgICAgICB2YXIgbW9udGhzID0gbW9udGhzVG9SdW4oKTtcbiAgICAgICAgICBpZiggZGFpbHkgKSBtb250aHMgPSBtb250aHMgKiAzMDtcblxuICAgICAgICAgIG1vZGVsLnJ1bihtb250aHMpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi12YXJpYXRpb24nLCAxKTtcblxuICAgICAgICAgIC8vIHNldCB2YXJpYXRpb24gb3JkZXJcbiAgICAgICAgICB2YXIgcnVucyA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgICAgICAgICBvdXRwdXQgOiBudWxsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIG9iai5pbnB1dHNbcGFyYW1zWzBdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXVtpXTtcbiAgICAgICAgICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICB0LmlucHV0c1twYXJhbXNbMV1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaCh0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcnVuVmFyaWF0aW9uKDAsIHJ1bnMpO1xuICAgICAgfVxuICB9LCAyNTApO1xufVxuXG52YXIgcnVuVmFyaWF0aW9uID0gZnVuY3Rpb24oaW5kZXgsIHJ1bnMpIHtcbiAgLy8gc2V0IGlucHV0IHZhcmlhYmxlcyBmb3IgcnVuXG4gIHZhciBydW4gPSBydW5zW2luZGV4XTtcbiAgZm9yKCB2YXIga2V5IGluIHJ1bi5pbnB1dHMgKSB7XG4gICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKHJ1bi5pbnB1dHNba2V5XSk7XG4gIH1cblxuICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJ1bnNbaW5kZXhdLm91dHB1dCA9IGRhdGE7XG4gICAgICBpbmRleCsrO1xuXG4gICAgICBpZiAocnVucy5sZW5ndGggPT0gaW5kZXgpIHtcbiAgICAgICAgICAvLyByZXNldCB0aGUgY29uc3RhbnQgdG8gdGhlIGZpcnN0IHZhbHVlXG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwobW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNob3dSZXN1bHRzKHJ1bnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBydW5WYXJpYXRpb24oaW5kZXgsIHJ1bnMpO1xuICAgICAgfVxuICB9O1xuXG4gIHZhciBtb250aHMgPSBtb250aHNUb1J1bigpO1xuICBpZiggZGFpbHkgKSBtb250aHMgPSBtb250aHMgKiAzMDtcblxuICBtb2RlbC5ydW4obW9udGhzKTtcbn07XG5cblxudmFyIHNob3dSZXN1bHRzID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gIHZhciBjdXJyZW50UmVzdWx0cztcbiAgaWYoIHJlc3VsdFswXSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgY3VycmVudFJlc3VsdHMgPSBbe1xuICAgICAgICAgIHNpbmdsZVJ1biA6IHRydWUsXG4gICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgb3V0cHV0IDogcmVzdWx0XG4gICAgICB9XVxuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRSZXN1bHRzID0gcmVzdWx0O1xuICB9XG5cblxuICBzaG93UmF3T3V0cHV0KGN1cnJlbnRSZXN1bHRzKTtcbiAgY2hhcnRzLnVwZGF0ZUNoYXJ0cyhjdXJyZW50UmVzdWx0cywgdHJ1ZSk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICB9LCAyNTApO1xuXG59XG5cbi8vIG1ha2Ugc3VyZSBhbGwgdGhlIHdlYXRoZXIgaXMgc2V0LiAgIzEgdGhpbmcgcGVvcGxlIHdpbGwgbWVzcyB1cFxudmFyIGNoZWNrV2VhdGhlciA9IGZ1bmN0aW9uKCkge1xuICAvLyBmaXJzdCBnZXQgY3VycmVudCBtb250aHMgd2UgYXJlIGdvaW5nIHRvIHJ1bixcbiAgdmFyIHN0YXJ0ID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG5cbiAgdmFyIGVuZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkuc3BsaXQoXCItXCIpO1xuICB2YXIgZU1vbnRoID0gcGFyc2VJbnQoZW5kWzFdKTtcbiAgdmFyIGVZZWFyID0gcGFyc2VJbnQoZW5kWzBdKTtcblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZShzdGFydCk7XG5cbiAgLy8gbm93IHNlZSBpZiB3ZSBoYXZlIGN1c3RvbSB3ZWF0aGVyIGNvdmVyYWdlXG4gIHZhciBoYXNDb3ZlcmFnZSA9IHRydWU7XG4gIHZhciBjb3VudCA9IDA7XG4gIHdoaWxlKCBjb3VudCA8IDEwMDAwICkge1xuICAgICAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBoYXNDb3ZlcmFnZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIgbSA9IChjRGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgICAgdmFyIHkgPSBjRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIGlmKCBjRGF0ZS5nZXRNb250aCgpKzEgPT0gZU1vbnRoICYmIHkgPT0gZVllYXIgKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlclt5KyctJyttXSApIHtcbiAgICAgICAgICBoYXNDb3ZlcmFnZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjRGF0ZS5zZXRNb250aChjRGF0ZS5nZXRNb250aCgpKzEpO1xuICAgICAgY291bnQrKztcbiAgfVxuXG4gIGlmKCBoYXNDb3ZlcmFnZSApIHJldHVybiB0cnVlO1xuXG4gIC8vIGlmIG5vdCBtYWtlIHN1cmUgd2UgaGF2ZSBhdmVyYWdlcyBzZWxlY3RlZFxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgZm9yICggdmFyIGogPSAxOyBqIDwgaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgYyA9IGlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIG0pLnZhbCgpKTtcbiAgICAgICAgICBpZiggIXZhbCAmJiB2YWwgIT0gMCApIHtcbiAgICAgICAgICAgICAgYWxlcnQoXCJNaXNzaW5nIHdlYXRoZXIgZGF0YTogXCIrYytcIiBmb3IgbW9udGggXCIrbStcIlxcblxcblwiK1xuICAgICAgICAgICAgICAgICAgICBcIkRpZCB5b3Ugc2VsZWN0IGEgbG9jYXRpb24gKFNldHVwKSBhbmQvb3IgYXJlIGFsbCB3ZWF0aGVyL3NvaWwgZmllbGRzIGZpbGxlZCBvdXQ/XCIpO1xuICAgICAgICAgICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG52YXIgc2V0V2VhdGhlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIG1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG5cbiAgaWYoIGRhdGEgKSB7XG4gICAgICBmb3IoIHZhciBrZXkgaW4gZGF0YSApIHtcblxuICAgICAgICAgIC8vIGNsZWFuIHVwIGRhdGUgZm9ybWF0XG4gICAgICAgICAgdmFyIGRhdGUgPSBrZXkucmVwbGFjZSgvW15cXGQtXS8sJycpO1xuICAgICAgICAgIHZhciBwYXJ0cyA9IGRhdGUuc3BsaXQoJy0nKTtcblxuICAgICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPCAyICkge1xuICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoJ0ludmFsaWQgRGF0ZSBGb3JtYXQuICBEYXRlcyBzaG91bGQgYmUgaW4gWVlZWS1NTSBmb3JtYXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBwYXJ0c1sxXS5sZW5ndGggIT0gMiApIHtcbiAgICAgICAgICAgICAgZGF0ZSA9IHBhcnRzWzBdK1wiLTBcIitwYXJ0c1sxXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBhcnJheSBzbyB3ZSBjYW4gc29ydFxuICB2YXIgYXJyID0gW107XG4gIHZhciBoZWFkZXJzID0gWydkYXRlJ107XG4gIGZvciggdmFyIGRhdGUgaW4gbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG5cbiAgICAgIHZhciB0ID0gW2RhdGVdO1xuICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdICkge1xuICAgICAgICAgIGlmKCBrZXkgPT0gJ25yZWwnICkgY29udGludWU7XG4gICAgICAgICAgaWYoIGFyci5sZW5ndGggPT0gMCApIGhlYWRlcnMucHVzaChrZXkpO1xuICAgICAgICAgIHQucHVzaChtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2godCk7XG4gIH1cblxuICBpZiggYXJyLmxlbmd0aCA9PSAwICkge1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChcIk5vIHdlYXRoZXIgZGF0YSBoYXMgYmVlbiB1cGxvYWRlZC5cIik7XG4gICAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaHRtbCA9ICc8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6YXV0bzttYXgtaGVpZ2h0OjYwMHB4XCI+PHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj4nO1xuXG4gIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgdmFyIGQxID0gbmV3IERhdGUoYVswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG4gICAgICB2YXIgZDIgPSBuZXcgRGF0ZShiWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcblxuICAgICAgaWYoIGQxIDwgZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2UgaWYoIGQxID4gZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRoPicraGVhZGVyc1tpXSsnPC90aD4nO1xuICB9XG4gIGh0bWwgKz0gJzwvdHI+JztcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JythcnJbaV0uam9pbignPC90ZD48dGQ+JykrJzwvdGQ+PC90cj4nO1xuICB9XG5cbiAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChodG1sKyc8L3RhYmxlPjwvZGl2PjxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1jaGFydFwiPjwvZGl2PicpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgfSwgMTAwMCk7XG5cbn07XG5cbnZhciBzaG93UmF3T3V0cHV0ID0gZnVuY3Rpb24ocmVzdWx0cykge1xuXG4gIC8vIHNlbGVjdGVkIGluIHRoZSBjaGFydHMgb3V0cHV0XG4gIHZhciB2YXJzID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKTtcblxuICAvLyBmaW5kIHRoZSByb3dzIHdlIGNhcmUgYWJvdXRcbiAgdmFyIGNoYXJ0Um93cyA9IHt9O1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHJlc3VsdHNbMF0ub3V0cHV0WzBdLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHZhcnMuaW5kZXhPZihyZXN1bHRzWzBdLm91dHB1dFswXVtpXSkgPiAtMSApIGNoYXJ0Um93c1tyZXN1bHRzWzBdLm91dHB1dFswXVtpXV0gPSBpO1xuICB9XG5cbiAgdmFyIHRhYnMgPSAkKCc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJyYXdPdXRwdXRUYWJzXCIgIGRhdGEtdGFicz1cInBpbGxcIj48L3VsPicpO1xuICB2YXIgY29udGVudHMgPSAkKCc8ZGl2IGNsYXNzPVwicGlsbC1jb250ZW50XCIgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21hcmdpbi10b3A6MTVweFwiPjwvZGl2PicpO1xuXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYnMuYXBwZW5kKCQoJzxsaSAnKyhpID09IDAgPyAnY2xhc3M9XCJhY3RpdmVcIicgOiBcIlwiKSsnPjxhIGhyZWY9XCIjcmF3b3V0J1xuICAgICAgICAgICt2YXJzW2ldKydcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPicrdmFyc1tpXSsnPC9hPjwvbGk+JykpO1xuXG4gICAgICBjb250ZW50cy5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cInBpbGwtcGFuZSAnICsgKGkgPT0gMCA/ICdhY3RpdmUnIDogXCJcIilcbiAgICAgICAgICArICdcIiBpZD1cInJhd291dCcgKyB2YXJzW2ldICsgJ1wiPjwvZGl2PicpKTtcbiAgfVxuXG4gICQoXCIjb3V0cHV0LWNvbnRlbnRcIikuaHRtbChcIlwiKS5hcHBlbmQodGFicykuYXBwZW5kKGNvbnRlbnRzKTtcbiAgJChcIiNyYXdPdXRwdXRUYWJzXCIpLnRhYigpO1xuXG4gIGNzdlJlc3VsdHMgPSB7XG4gICAgICBjb25maWcgOiBtb2RlbElPLmV4cG9ydFNldHVwKCksXG4gICAgICBkYXRhIDoge31cbiAgfTtcblxuICAvLyBzb21lIHJvd3MgaGF2ZSBzdHJpbmdzLCB3ZSBkb24ndCB3YW50IHRoZXNlXG4gIC8vIGlnbm9yZSBzdHJpbmcgcm93c1xuICAvKmZvciggdmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBjbGVhbiA9IFtyZXN1bHRzW2ldLm91dHB1dFswXV07XG4gICAgICBmb3IoIHZhciBqID0gMTsgaiA8IHJlc3VsdHNbaV0ub3V0cHV0Lmxlbmd0aDsgaisrICkge1xuICAgICAgICAgIGlmKCB0eXBlb2YgcmVzdWx0c1tpXS5vdXRwdXRbal1bMF0gIT0gJ3N0cmluZycgKSBjbGVhbi5wdXNoKHJlc3VsdHNbaV0ub3V0cHV0W2pdKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHNbaV0ub3V0cHV0ID0gY2xlYW47XG4gIH0qL1xuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcblxuICB2YXIgdGFibGUsIHJvdztcbiAgZm9yKCB2YXIga2V5IGluIGNoYXJ0Um93cyApIHtcbiAgICAgIHRhYmxlID0gXCI8dGFibGUgY2xhc3M9J3RhYmxlIHRhYmxlLXN0cmlwZWQnPlwiO1xuXG4gICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XSA9IFtdO1xuXG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IHJlc3VsdHNbMF0ub3V0cHV0Lmxlbmd0aDsgaisrICl7XG4gICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0gPSBbXTtcblxuICAgICAgICAgIC8vIHNldCBoZWFkZXIgcm93XG4gICAgICAgICAgaWYoIGogPT0gMCApIHtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCgnbW9udGgnKTtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCgnZGF0ZScpO1xuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRyPjx0aD5TdGVwPC90aD48dGg+RGF0ZTwvdGg+XCI7XG4gICAgICAgICAgICAgIGZvciggdmFyIHogPSAwOyB6IDwgcmVzdWx0cy5sZW5ndGg7IHorKyApIHtcbiAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRoPlwiO1xuICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiByZXN1bHRzW3pdLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChtVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPGRpdj5cIittVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0rXCI8L2Rpdj5cIjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYoIHRtcC5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0ga2V5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHRtcC5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdGg+XCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy92YXIgZGF0ZSA9IG5ldyBEYXRlKGNEYXRlLmdldFllYXIoKSsxOTAwLCBjRGF0ZS5nZXRNb250aCgpK2osIGNEYXRlLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgIC8vdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgICAgICAgLy9pZiggbSA8IDEwICkgbSA9ICcwJyttO1xuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRyPjx0ZD5cIitqK1wiPC90ZD48dGQ+XCIrcmVzdWx0c1swXS5vdXRwdXRbal1bMF0rJzwvdGQ+JztcblxuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKGopO1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHJlc3VsdHNbMF0ub3V0cHV0W2pdWzBdKTtcblxuICAgICAgICAgICAgICB2YXIgdjtcbiAgICAgICAgICAgICAgZm9yKCB2YXIgeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgICAgICAgICAgdiA9IHJlc3VsdHNbel0ub3V0cHV0W2pdW2NoYXJ0Um93c1trZXldXTtcbiAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkPlwiK3YrXCI8L3RkPlwiO1xuICAgICAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCh2KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICAkKFwiI3Jhd291dFwiICsga2V5KS5odG1sKHRhYmxlK1wiPC90YWJsZT5cIik7XG4gIH1cblxuICAvLyBtYWtlIHN1cmUgd2UgY2FuIHNlZSB0aGUgZXhwb3J0IGJ0blxuICBpZiggIW9mZmxpbmVNb2RlICkgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikuc2hvdygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBvdXRwdXRzIDogb3V0cHV0cyxcbiAgaW5wdXRzIDogaW5wdXRzLFxuICBnZXRNb2RlbCA6IGdldE1vZGVsLFxuICBydW5Nb2RlbCA6IHJ1bk1vZGVsLFxuICBzaG93UmF3T3V0cHV0IDogc2hvd1Jhd091dHB1dCxcbiAgbW9udGhzVG9SdW4gOiBtb250aHNUb1J1bixcbiAgb3V0cHV0RGVmaW5pdGlvbnMgOiBvdXRwdXREZWZpbml0aW9ucyxcbiAgcXMgOiBxcyxcbiAgc2V0V2VhdGhlciA6IHNldFdlYXRoZXIsXG4gIGdkcml2ZSA6IGdkcml2ZSxcbiAgcnVuQ29tcGxldGUgOiBydW5Db21wbGV0ZSxcbiAgZ2V0TW9kZWxJTyA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2RlbElPO1xuICB9XG59O1xuIiwidmFyIGFwcDtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiB3aWR0aCBoYXMgY2hhbmdlZFxudmFyIGNXaWR0aCA9IDA7XG5cbi8vIHRoZXJlIGlzIG5vIHdheSB0byBnZXQgdGhlIGNvbG9ycyBmb3IgdGhlIGxlZ2VuZHMgKHRvIG1ha2UgeW91ciBvd24pXG4vLyB0aGlzIHBvc3Q6XG4vLyBnaXZlcyB0aGVzZSB2YWx1ZXMuICBUaGlzIGlzIGEgSEFDSywgaWYgdGhleSBldmVyIGNoYW5nZSwgd2UgbmVlZCB0byB1cGRhdGVcbnZhciBnb29nbGVDaGFydENvbG9ycyA9IFtcIiMzMzY2Y2NcIixcIiNkYzM5MTJcIixcIiNmZjk5MDBcIixcIiMxMDk2MThcIixcIiM5OTAwOTlcIixcIiMwMDk5YzZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNkZDQ0NzdcIixcIiM2NmFhMDBcIixcIiNiODJlMmVcIixcIiMzMTYzOTVcIixcIiM5OTQ0OTlcIixcIiMyMmFhOTlcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNhYWFhMTFcIixcIiM2NjMzY2NcIixcIiNlNjczMDBcIixcIiM4YjA3MDdcIixcIiM2NTEwNjdcIixcIiMzMjkyNjJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM1NTc0YTZcIixcIiMzYjNlYWNcIixcIiNiNzczMjJcIixcIiMxNmQ2MjBcIixcIiNiOTEzODNcIixcIiNmNDM1OWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM5YzU5MzVcIixcIiNhOWM0MTNcIixcIiMyYTc3OGRcIixcIiM2NjhkMWNcIixcIiNiZWE0MTNcIixcIiMwYzU5MjJcIlxuICAgICAgICAgICAgICAgICAgICAgICxcIiM3NDM0MTFcIl07XG5cbnZhciB3ZWF0aGVyQ2hhcnRPcHRpb25zID0ge1xuICB0aXRsZSA6ICdXZWF0aGVyJyxcbiAgaGVpZ2h0IDogMzAwLFxuICB2QXhlczogW3tcbiAgICAgICAgICB0aXRsZTogXCJSYWRpYXRpb24gKE1KL2RheSk7IFRlbXBlcmF0dXJlICheQyk7IERldyBQb2ludCAoXkMpOyBEYXlsaWdodCAoaClcIixcbiAgICAgICAgICBtaW5WYWx1ZSA6IC01LFxuICAgICAgICAgIG1heFZhbHVlIDogMzVcbiAgICAgICAgfSx7XG4gICAgICAgICAgdGl0bGU6IFwiUHJlY2lwaXRhdGlvbiAobW0pXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNTAsXG4gICAgICAgICAgbWF4VmFsdWUgOiAzNTBcbiAgICAgICAgfV0sXG4gIGhBeGlzOiB7dGl0bGU6IFwiTW9udGhcIn0sXG4gIHNlcmllc1R5cGU6IFwiYmFyc1wiLFxuICBzZXJpZXM6IHtcbiAgICAgIDA6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMToge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAyOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDM6IHt0eXBlOiBcImFyZWFcIiwgdGFyZ2V0QXhpc0luZGV4OjF9LFxuICAgICAgNDoge3RhcmdldEF4aXNJbmRleDowfVxuICB9XG59XG5cbi8vIHRlbXBsYXRlIGZvciB0aGUgcG9wdXBcbnZhciBzbGlkZXJQb3B1cCA9ICQoXG4gICAgICBcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwJz5cIiArXG4gICAgICAgICAgXCI8aSBjbGFzcz0naWNvbi1yZW1vdmUtY2lyY2xlIHB1bGwtcmlnaHQgc2xpZGUtcG9wdXAtY2xvc2UnPjwvaT5cIitcbiAgICAgICAgICBcIjxkaXYgaWQ9J2Nhcm91c2VsJyBjbGFzcz0nb3dsLWNhcm91c2VsIG93bC10aGVtZScgc3R5bGU9J21hcmdpbi10b3A6MTVweCc+PC9kaXY+XCIgK1xuXHRcIjwvZGl2PlwiKTtcblxudmFyIHNsaWRlclBvcHVwQmcgPSAkKFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAtYmcnPiZuYnNwOzwvZGl2PlwiKTtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiBzb21lb25lIGhhcyBjbGljayBhIGNoZWNrYm94XG52YXIgY2hhbmdlcyA9IGZhbHNlO1xuXG4vLyB3aGVuIHNpemluZywgd2FpdCBhIH4zMDBtcyBiZWZvcmUgdHJpZ2dlcmluZyByZWRyYXdcbnZhciByZXNpemVUaW1lciA9IC0xO1xuXG52YXIgY2hhcnRUeXBlU2VsZWN0b3IsIGNoYXJ0Q2hlY2tib3hlcywgY0RhdGE7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgICAgc2hvd1BvcHVwKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGNoYXJ0IHNlbGVjdG9yc1xuICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG5cbiAgLy8gc2V0IHBvcHVwIGNsaWNrIGhhbmRsZXJzXG4gICQoXCIjY2hhcnRUeXBlLXNlbGVjdEFsbFwiKS5vbignY2xpY2snLHNlbGVjdEFsbCk7XG4gICQoXCIjY2hhcnRUeXBlLXVuc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsdW5zZWxlY3RBbGwpO1xuXG4gIGNoYXJ0VHlwZVNlbGVjdG9yID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKTtcbiAgY2hhcnRDaGVja2JveGVzID0gJChcIiNjaGFydFNlbGVjdGlvbnNcIik7XG5cbiAgdmFyIGMxID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzFcIik7XG4gIHZhciBjMiA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMyXCIpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGFwcC5vdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsID0gYXBwLm91dHB1dHNbaV07XG4gICAgICBjaGFydFR5cGVTZWxlY3Rvci5hcHBlbmQoJChcIjxvcHRpb24gdmFsdWU9J1wiICsgdmFsICsgXCInIFwiXG4gICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ3NlbGVjdGVkJyA6ICcnKVxuICAgICAgICAgICAgICArIFwiPlwiICsgdmFsICsgXCI8L29wdGlvbj5cIikpO1xuXG4gICAgICBpZiggaSAlIDIgPT0gMCApIHtcbiAgICAgICAgICBjMS5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYzIuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9XG4gIH1cblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcIi5mbi10b2dnbGVcIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgJChcIiNcIiskKHRoaXMpLmF0dHIoXCJkYXRhdGFyZ2V0XCIpKS50b2dnbGUoJ3Nsb3cnKTtcbiAgfSk7XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikgKSBzZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICAgICAgZWxzZSB1bnNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gIH0pO1xuXG4gICQoXCIjc2VsZWN0LWNoYXJ0cy1idG4sICNzZWxlY3QtY2hhcnRzLXRpdGxlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgY2hhbmdlcyA9IGZhbHNlO1xuICB9KTtcblxuICAkKFwiLmNoYXJ0LW1vZGFsLWNsb3NlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICBpZiggY2hhbmdlcyAmJiBjRGF0YSApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgICAgICAgICAvLyB1cGRhdGUgcmF3IGRhdGEgYXMgd2VsbFxuICAgICAgICAgICAgICBhcHAuc2hvd1Jhd091dHB1dChjRGF0YSk7XG4gICAgICAgICAgfSw0MDApO1xuXG4gICAgICB9XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtdHlwZS10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcbiAgICAgICAgICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgfVxuICB9KTtcbn1cblxuLy8gbWFrZSBzdXJlIGFuZCBlbmQgbGFiZWwgdGFnXG5mdW5jdGlvbiBfY3JlYXRlRGVzY3JpcHRpb24odmFsKSB7XG4gIGlmKCAhYXBwLm91dHB1dERlZmluaXRpb25zW3ZhbF0gKSByZXR1cm4gXCI8Yj5cIit2YWwrXCI8L2I+PC9sYWJlbD5cIjtcblxuICB2YXIgZGVzYyA9IGFwcC5vdXRwdXREZWZpbml0aW9uc1t2YWxdO1xuICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gIHZhciB1bml0cyA9IGRlc2MudW5pdHMgJiYgZGVzYy51bml0cy5sZW5ndGggPiAwID8gXCIgW1wiK2Rlc2MudW5pdHMrXCJdXCIgOiBcIlwiO1xuXG4gIHZhciBsYWJlbCA9IFwiPGI+XCIrdmFsK1wiPC9iPjxzcGFuIHN0eWxlPSdmb250LXNpemU6MTJweCc+XCIrbGFiZWwrdW5pdHMrXCI8L3NwYW4+PC9sYWJlbD5cIjtcbiAgdmFyIGhhc0Rlc2MgPSBkZXNjLmRlc2NyaXB0aW9uICYmIGRlc2MuZGVzY3JpcHRpb24ubGVuZ3RoID4gMDtcbiAgaWYoIGhhc0Rlc2MgKSB7XG4gICAgICBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4O2NvbG9yOiM4ODg7Zm9udC1zdHlsZTppdGFsaWMnPlwiK2Rlc2MuZGVzY3JpcHRpb247XG4gIH1cblxuICB2YXIgZk5hbWUgPSBkZXNjLmFsdEZuTmFtZSB8fCB2YWw7XG4gIHZhciBmbiA9IGFwcC5nZXRNb2RlbCgpLmdldEZ1bmN0aW9uKGZOYW1lKTtcblxuICBpZiggZm4gfHwgZGVzYy5mbiApIHtcbiAgICAgIGlmKCAhaGFzRGVzYyApIGxhYmVsICs9IFwiPGRpdiBzdHlsZT0nZm9udC1zaXplOjExcHgnPlwiO1xuICAgICAgbGFiZWwgKz0gXCIgPGEgc3R5bGU9J2ZvbnQtc3R5bGU6bm9ybWFsO2N1cnNvcjpwb2ludGVyJyBkYXRhdGFyZ2V0PSdmbi1kZXNjLVwiK3ZhbCtcIicgY2xhc3M9J2ZuLXRvZ2dsZSc+Zm4oKTwvYT48L2Rpdj5cIjtcblxuICAgICAgbGFiZWwgKz0gXCI8ZGl2IGlkPSdmbi1kZXNjLVwiK3ZhbCtcIicgc3R5bGU9J2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtvdmVyZmxvdzphdXRvJyBjbGFzcz0nd2VsbCB3ZWxsLXNtJz5cIitcbiAgICAgICAgICAgICAgICAgIChmbnx8ZGVzYy5mbikudG9TdHJpbmcoKS5yZXBsYWNlKC8gL2csJyZuYnNwOycpLnJlcGxhY2UoL1xcbi9nLCc8YnIgLz4nKStcIjwvZGl2PlwiO1xuICB9IGVsc2UgaWYgKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8L2Rpdj5cIjtcbiAgfVxuXG4gIC8vIFRPRE86IGFkZCBmbiB3ZWxsXG4gIHJldHVybiBsYWJlbCtcIjxiciAvPlwiO1xufVxuXG5mdW5jdGlvbiBzZWxlY3QodmFsKSB7XG4gIGNoYXJ0VHlwZVNlbGVjdG9yLmZpbmQoXCJvcHRpb25bdmFsdWU9XCIrdmFsK1wiXVwiKS5hdHRyKFwic2VsZWN0ZWRcIixcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIix0cnVlKTtcbiAgY2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikucmVtb3ZlQXR0cihcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIixmYWxzZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXBwLm91dHB1dHMubGVuZ3RoOyBpKyspIHNlbGVjdChhcHAub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGFwcC5vdXRwdXRzLmxlbmd0aDsgaSsrKSB1bnNlbGVjdChhcHAub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShlbGUpIHtcbiAgZWxlLnBhcmVudCgpLmhpZGUoJ3Nsb3cnLCBmdW5jdGlvbigpe1xuICAgICAgZWxlLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgdW5zZWxlY3QoZWxlLmF0dHIoJ3R5cGUnKSk7XG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHByaW50KGNoYXJ0Q29udGFpbmVyKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3ByaW50LWNoYXJ0JywgMSk7XG5cblxudmFyIGRpc3Bfc2V0dGluZz1cInRvb2xiYXI9eWVzLGxvY2F0aW9uPW5vLGRpcmVjdG9yaWVzPXllcyxtZW51YmFyPXllcyxcIjtcbiAgZGlzcF9zZXR0aW5nKz1cInNjcm9sbGJhcnM9eWVzLHdpZHRoPTgwMCwgaGVpZ2h0PTYwMCwgbGVmdD0yNSwgdG9wPTI1XCI7XG5cbiAgdmFyIHN2ZyA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJzdmdcIik7XG4gIHZhciBodG1sID0gY2hhcnRDb250YWluZXIuZmluZChcImRpdlwiKS5odG1sKCk7XG5cbiAgdmFyIGRvY3ByaW50PXdpbmRvdy5vcGVuKFwiXCIsXCJcIixkaXNwX3NldHRpbmcpO1xuICBkb2NwcmludC5kb2N1bWVudC5vcGVuKCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8aHRtbD48aGVhZD48dGl0bGU+PC90aXRsZT4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzwvaGVhZD48Ym9keSBtYXJnaW53aWR0aD1cIjBcIiBtYXJnaW5oZWlnaHQ9XCIwXCIgb25Mb2FkPVwic2VsZi5wcmludCgpXCI+PGNlbnRlcj4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoaHRtbCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2NlbnRlcj48L2JvZHk+PC9odG1sPicpO1xuICBkb2NwcmludC5kb2N1bWVudC5jbG9zZSgpO1xuICBkb2NwcmludC5mb2N1cygpO1xuXG59XG5cblxuZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gIGNEYXRhID0gZGF0YTtcbn1cblxuLy8gYmFzaWNhbGx5IHJlZHJhdyBldmVyeXRoaW5nXG5mdW5jdGlvbiByZXNpemUoKSB7XG4gIC8vIHJlcXVpcmUgbW9yZSB0aGFuIGEgMzAgcGl4ZWwgd2lkdGggY2hhbmdlIChzbyB3ZSBkb24ndCByZWRyYXcgdy8gc2Nyb2xsIGJhcnMgYWRkZWQpXG4gIHZhciB3aW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICBpZiggY1dpZHRoID4gd2luV2lkdGggLSAxNSAmJiBjV2lkdGggPCB3aW5XaWR0aCArIDE1ICkgcmV0dXJuO1xuICBjV2lkdGggPSB3aW5XaWR0aDtcblxuICBpZiggcmVzaXplVGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xuICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICByZXNpemVUaW1lciA9IC0xO1xuICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gIH0sMzAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hhcnRzKHJlc3VsdHMsIGFuaW1hdGUpIHtcbiAgaWYoIHJlc3VsdHMgKSBzZXREYXRhKHJlc3VsdHMpO1xuICBpZiggIWNEYXRhICkgcmV0dXJuO1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikuc2hvdygpO1xuXG4gIC8vIGNyZWF0ZSBhIGxlZ2VuZCBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHJ1blxuICB2YXIgbGVnZW5kID0gXCJcIjtcbiAgaWYoICFjRGF0YVswXS5zaW5nbGVSdW4gKSB7XG4gICAgICB2YXIgYzEgPSBcIlwiO1xuICAgICAgdmFyIGMyID0gXCJcIjtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGVsZSA9IFwiPGRpdiBzdHlsZT0nbWluLWhlaWdodDo0MHB4O21hcmdpbi1ib3R0b206MTBweCc+PGRpdiBjbGFzcz0nbGVnZW5kLXNxdWFyZScgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6XCIrZ29vZ2xlQ2hhcnRDb2xvcnNbaV0rXCInPiZuYnNwOzwvZGl2PlwiO1xuICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIGNEYXRhW2ldLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgZWxlICs9IFwiPGRpdiBjbGFzcz0nbGVnZW5kLXRleHQnPlwiK21UeXBlK1wiPVwiK2NEYXRhW2ldLmlucHV0c1ttVHlwZV0rXCI8L2Rpdj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiggaSAlIDIgPT0gMCApIGMxICs9IGVsZSArIFwiPC9kaXY+XCJcbiAgICAgICAgICBlbHNlIGMyICs9IGVsZSArIFwiPC9kaXY+XCJcbiAgICAgIH1cbiAgICAgIGxlZ2VuZCA9IFwiPGRpdj48YSBpZD0nbGVnZW5kLXBhbmVsLXRvZ2dsZScgc3R5bGU9J21hcmdpbi1sZWZ0OjVweDtjdXJzb3I6cG9pbnRlcic+TGVnZW5kPC9hPjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmctYm90dG9tOjVweDttYXJnaW4tYm90dG9tOjE1cHgnPlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdyb3cnIGlkPSdsZWdlbmQtcGFuZWwnPjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMStcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzIrXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPC9kaXY+PC9kaXY+XCI7XG4gIH1cbiAgJChcIiNjaGFydC1jb250ZW50XCIpLmh0bWwobGVnZW5kKTtcbiAgJChcIiNsZWdlbmQtcGFuZWwtdG9nZ2xlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2xlZ2VuZC1wYW5lbFwiKS50b2dnbGUoXCJzbG93XCIpO1xuICB9KTtcblxuXG4gIHZhciB0eXBlcyA9IGNoYXJ0VHlwZVNlbGVjdG9yLnZhbCgpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgX3Nob3dNYWluQ2hhcnQodHlwZXNbaV0sIGFuaW1hdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnc2hvdy1jaGFydC1wb3B1cCcsIDEpO1xuXG5cbiAgc2xpZGVyUG9wdXAuZmluZChcIi5vd2wtdGhlbWVcIikuaHRtbChcIlwiKTtcbiAgJCgnYm9keScpLnNjcm9sbFRvcCgwKS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJykuYXBwZW5kKHNsaWRlclBvcHVwQmcpLmFwcGVuZChzbGlkZXJQb3B1cCk7XG5cbiAgLy8gdGhpcyBjb3VsZCBjYXNlIGJhZG5lc3MuLi4uICB3aHkgZG9lc24ndCBpdCBsaXZlIHdoZW4gcmVtb3ZlZCBmcm9tIERPTT9cbiAgc2xpZGVyUG9wdXAuZmluZCgnLnNsaWRlLXBvcHVwLWNsb3NlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgaGlkZVBvcHVwKCk7XG4gIH0pO1xuXG4gIHZhciB0eXBlcyA9IGNoYXJ0VHlwZVNlbGVjdG9yLnZhbCgpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgX3Nob3dQb3B1cENoYXJ0KHR5cGVzW2ldKTtcbiAgfVxuXG4gICQoJyNjYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICAgIG5hdmlnYXRpb24gOiB0cnVlLCAvLyBTaG93IG5leHQgYW5kIHByZXYgYnV0dG9uc1xuICAgICAgc2xpZGVTcGVlZCA6IDMwMCxcbiAgICAgIHBhZ2luYXRpb25TcGVlZCA6IDQwMCxcbiAgICAgIHNpbmdsZUl0ZW06dHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZVBvcHVwKCkge1xuICBzbGlkZXJQb3B1cEJnLnJlbW92ZSgpO1xuICBzbGlkZXJQb3B1cC5yZW1vdmUoKTtcbiAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCdhdXRvJyk7XG59XG5cbmZ1bmN0aW9uIF9zaG93TWFpbkNoYXJ0KHR5cGUsIGFuaW1hdGUpIHtcbiAgdmFyIGNoYXJ0VHlwZSA9ICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLmF0dHIoXCJ2YWx1ZVwiKTtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgLz5cIik7XG4gIHZhciBvdXRlclBhbmVsID0gJChcIjxkaXY+XCIrXG4gIFx0XCI8YSBjbGFzcz0nYnRuIGJ0bi14cyBidG4tZGVmYXVsdCcgc3R5bGU9J1wiKyhjaGFydFR5cGUgIT0gXCJ0aW1lbGluZVwiID8gXCJwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO21hcmdpbjowIDAgLTIwcHggMjBweFwiIDogXCJtYXJnaW4tYm90dG9tOjVweFwiKStcbiAgICAgIFwiJyB0eXBlPSdcIit0eXBlK1wiJz5cIiArXG4gIFx0XCI8aSBjbGFzcz0naWNvbi1yZW1vdmUnPjwvaT4gXCIrdHlwZStcIjwvYT48L2Rpdj5cIik7XG4gIG91dGVyUGFuZWwuZmluZChcImFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICByZW1vdmUoJCh0aGlzKSk7XG4gIH0pO1xuICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIG91dGVyUGFuZWwuY3NzKFwibWFyZ2luLWJvdHRvbVwiLFwiMjBweFwiKTtcbiAgJChcIiNjaGFydC1jb250ZW50XCIpLmFwcGVuZChvdXRlclBhbmVsLmFwcGVuZChwYW5lbCkpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgY2hhcnRUeXBlLCBwYW5lbCwgZmFsc2UsIG51bGwsIGFuaW1hdGUpO1xufVxuXG5mdW5jdGlvbiBfc2hvd1BvcHVwQ2hhcnQodHlwZSkge1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naXRlbSc+PC9kaXY+XCIpO1xuXG4gIHZhciBwcmludEJ0biA9ICQoXCI8YSBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGVmYXVsdCcgc3R5bGU9J21hcmdpbi1sZWZ0OjE2cHgnPjxpIGNsYXNzPSdpY29uLXByaW50Jz48L2k+IFByaW50PC9hPlwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgIHByaW50KGNoYXJ0UGFuZWwpO1xuICB9KTtcbiAgcGFuZWwuYXBwZW5kKHByaW50QnRuKTtcblxuICB2YXIgY2hhcnRQYW5lbCA9ICQoXCI8ZGl2PjwvZGl2PlwiKTtcbiAgcGFuZWwuYXBwZW5kKGNoYXJ0UGFuZWwpO1xuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmFwcGVuZChwYW5lbCk7XG4gIF9jcmVhdGVDaGFydCh0eXBlLCAnbGluZScsIGNoYXJ0UGFuZWwsIHRydWUsIFtNYXRoLnJvdW5kKCQod2luZG93KS53aWR0aCgpKi44OCksIE1hdGgucm91bmQoKCQod2luZG93KS5oZWlnaHQoKSouOTApLTEyNSldKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIHNob3dMZWdlbmQsIHNpemUsIGFuaW1hdGUpIHtcbiAgdmFyIGNvbCA9IDA7XG5cbiAgdmFyIGR0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuXG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIGR0LmFkZENvbHVtbignZGF0ZScsICdNb250aCcpO1xuICB9IGVsc2Uge1xuICAgICAgLy9kdC5hZGRDb2x1bW4oJ251bWJlcicsICdNb250aCcpO1xuICAgICAgZHQuYWRkQ29sdW1uKCdzdHJpbmcnLCAnTW9udGgnKTtcbiAgfVxuXG4gIC8vIHNldCB0aGUgZmlyc3QgY29sdW1uXG4gIGlmKCAhY0RhdGFbMF0uc2luZ2xlUnVuICkge1xuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjRGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgbGFiZWwgPSBcIlwiO1xuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBjRGF0YVtpXS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIGxhYmVsICs9IGtleS5yZXBsYWNlKC8uKlxcLi8sJycpK1wiPVwiK2NEYXRhW2ldLmlucHV0c1trZXldK1wiIFxcblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UoLyxcXHMkLywnJyk7XG4gICAgICAgICAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCBsYWJlbCk7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgICBkdC5hZGRDb2x1bW4oJ251bWJlcicsIHR5cGUpO1xuICB9XG5cbiAgLy8gZmluZCB0aGUgY29sdW1uIHdlIHdhbnQgdG8gY2hhcnRcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgY0RhdGFbMF0ub3V0cHV0WzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY0RhdGFbMF0ub3V0cHV0WzBdW2ldID09IHR5cGUpIHtcbiAgICAgICAgICBjb2wgPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciBkYXRhID0gW107XG4gIHZhciBtYXggPSAwO1xuICAvLyBjcmVhdGUgdGhlIFtdW10gYXJyYXkgZm9yIHRoZSBnb29nbGUgY2hhcnRcbiAgZm9yICggdmFyIGkgPSAxOyBpIDwgY0RhdGFbMF0ub3V0cHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAvL2lmICh0eXBlb2YgY0RhdGFbMF0ub3V0cHV0W2ldW2NvbF0gPT09ICdzdHJpbmcnKSBjb250aW51ZTtcblxuICAgICAgdmFyIHJvdyA9IFtdO1xuXG4gICAgICAvL3ZhciBkYXRlID0gbmV3IERhdGUoY0RhdGUuZ2V0WWVhcigpKzE5MDAsIGNEYXRlLmdldE1vbnRoKCkraSwgY0RhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIGlmKCBjaGFydFR5cGUgPT0gXCJ0aW1lbGluZVwiICkge1xuICAgICAgICAgIC8vIGFkZCBvbiBtb250aFxuICAgICAgICAgIHJvdy5wdXNoKG5ldyBEYXRlKGNEYXRhWzBdLm91dHB1dFtpXVswXSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaChjRGF0YVswXS5vdXRwdXRbaV1bMF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKCB2YXIgaiA9IDA7IGogPCBjRGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKCBjRGF0YVtqXS5vdXRwdXRbaV1bY29sXSA+IG1heCApIG1heCA9IGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdO1xuICAgICAgICAgIHJvdy5wdXNoKGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5wdXNoKHJvdyk7XG4gIH1cblxuICBkdC5hZGRSb3dzKGRhdGEpO1xuXG4gIGlmKCBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdHlwZV0gKSB7XG4gICAgICB2YXIgZGVzYyA9IGFwcC5vdXRwdXREZWZpbml0aW9uc1t0eXBlXTtcbiAgICAgIHZhciBsYWJlbCA9IGRlc2MubGFiZWwgJiYgZGVzYy5sYWJlbC5sZW5ndGggPiAwID8gXCIgLSBcIitkZXNjLmxhYmVsIDogXCJcIjtcbiAgICAgIHZhciB1bml0cyA9IGRlc2MudW5pdHMgJiYgZGVzYy51bml0cy5sZW5ndGggPiAwID8gXCIgW1wiK2Rlc2MudW5pdHMrXCJdXCIgOiBcIlwiO1xuICAgICAgdHlwZSA9IHR5cGUrbGFiZWwrdW5pdHM7XG4gIH1cblxuXG4gIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHZBeGlzIDoge1xuICAgICAgICAgICAgICB0aXRsZSA6IHR5cGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhBeGlzIDoge1xuICAgICAgICAgICAgICB0aXRsZSA6IFwiTW9udGhcIlxuICAgICAgICAgIH1cbiAgfVxuICBpZiggIXNob3dMZWdlbmQgKSBvcHRpb25zLmxlZ2VuZCA9IHtwb3NpdGlvbjpcIm5vbmVcIn07XG5cbiAgaWYoIHNpemUgKSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gc2l6ZVswXTtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gc2l6ZVsxXTtcbiAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSBwYW5lbC53aWR0aCgpO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLndpZHRoKi40O1xuICB9XG4gIHBhbmVsLndpZHRoKG9wdGlvbnMud2lkdGgpLmhlaWdodChvcHRpb25zLmhlaWdodCk7XG5cbiAgaWYoIGNoYXJ0VHlwZSA9PSAndGltZWxpbmUnICkge1xuICAgICAgb3B0aW9ucy5kaXNwbGF5QW5ub3RhdGlvbnMgPSB0cnVlO1xuICAgICAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkFubm90YXRlZFRpbWVMaW5lKHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgICAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkxpbmVDaGFydChwYW5lbFswXSk7XG4gICAgICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVXZWF0aGVyQ2hhcnQocm9vdCwgZGF0YSkge1xuICAkKHJvb3QpLmh0bWwoJycpO1xuXG4gIHZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcbiAgZHQuYWRkQ29sdW1uKCdzdHJpbmcnLCAnTW9udGgnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTWluIFRlbXBlcmF0dXJlJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01heCBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdEZXcgUG9pbnQnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUHJlY2lwaXRhdGlvbicpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdSYWRpYXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGF5bGlnaHQnKTtcblxuICBmb3IoIHZhciBkYXRlIGluIGRhdGEgKSB7XG4gICAgICB2YXIgb2JqID0gZGF0YVtkYXRlXTtcbiAgICAgIGR0LmFkZFJvdyhbXG4gICAgICAgICAgZGF0ZSsnJyxcbiAgICAgICAgICBvYmoudG1pbiB8fCAwLFxuICAgICAgICAgIG9iai50bWF4IHx8IDAsXG4gICAgICAgICAgb2JqLnRkbWVhbiB8fCAwLFxuICAgICAgICAgIG9iai5wcHQgfHwgMCxcbiAgICAgICAgICBvYmoucmFkIHx8IDAsXG4gICAgICAgICAgb2JqLmRheWxpZ2h0IHx8IDBcbiAgICAgIF0pO1xuICB9XG5cbiAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkNvbWJvQ2hhcnQocm9vdCk7XG4gIGNoYXJ0LmRyYXcoZHQsIHdlYXRoZXJDaGFydE9wdGlvbnMpO1xuXG4gIHJldHVybiBjaGFydDtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0QXBwIDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH0sXG4gICAgaW5pdCA6IGluaXQsXG4gICAgc2V0RGF0YSA6IHNldERhdGEsXG4gICAgc2VsZWN0IDogc2VsZWN0LFxuICAgIHVuc2VsZWN0IDogdW5zZWxlY3QsXG4gICAgc2VsZWN0QWxsIDogc2VsZWN0QWxsLFxuICAgIHVuc2VsZWN0QWxsIDogdW5zZWxlY3RBbGwsXG4gICAgdXBkYXRlQ2hhcnRzIDogdXBkYXRlQ2hhcnRzLFxuICAgIHJlbW92ZSA6IHJlbW92ZSxcbiAgICBzaG93UG9wdXA6IHNob3dQb3B1cCxcbiAgICBoaWRlUG9wdXA6IGhpZGVQb3B1cCxcbiAgICByZXNpemUgOiByZXNpemUsXG4gICAgY3JlYXRlV2VhdGhlckNoYXJ0IDogY3JlYXRlV2VhdGhlckNoYXJ0XG59XG4iLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgJChcIiNleHBvcnQtbW9kYWxcIikubW9kYWwoe1xuICAgICAgICAgIHNob3cgOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIjc2hvdy1leHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF9zZXRNZXNzYWdlKG51bGwpO1xuXG4gICAgICAgICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKFwiM1BHIE1vZGVsIFJlc3VsdHMgKFwiK25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULywnICcpLnJlcGxhY2UoL1xcLlxcZCpaLywnJykrXCIpXCIpO1xuICAgICAgICAgICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldE1lc3NhZ2UobXNnLCB0eXBlLCBwcm9ncmVzcykge1xuICBpZiggIW1zZyApIHtcbiAgICByZXR1cm4gJChcIiNleHBvcnQtbXNnXCIpLmhpZGUoKTtcbiAgfVxuICAkKFwiI2V4cG9ydC1tc2dcIikuc2hvdygpO1xuXG4gIGlmKCBwcm9ncmVzcyApIHtcbiAgICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3NcIikuc2hvdygpO1xuICB9IGVsc2Uge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5oaWRlKCk7XG4gIH1cblxuICAkKCcjZXhwb3J0LW1zZycpLmF0dHIoXCJjbGFzc1wiLCdhbGVydCBhbGVydC0nK3R5cGUpO1xuICAkKCcjZXhwb3J0LW1zZy10ZXh0JykuaHRtbChtc2cpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgsIHRvdGFsKSB7XG4gIHBlcmNlbnQgPSAxMDAgKiAoIGluZGV4IC8gdG90YWwgKTtcbiAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzLWJhclwiKS5hdHRyKFwiYXJpYS12YWx1ZW5vd1wiLCBwZXJjZW50KS5jc3MoXCJ3aWR0aFwiLHBlcmNlbnQrXCIlXCIpO1xufVxuXG4vLyBzZWUgaWYgYW4gZXJyb3IgZXhpc3RzLCBpZiBzbywgc2V0IHN0YXRlXG5mdW5jdGlvbiBfY2hlY2tFcnJvcihmaWxlKSB7XG4gIHZhciBlcnJvck1lc3NhZ2UgPSBudWxsO1xuICBpZiggIWZpbGUgKSBlcnJvck1lc3NhZ2UgPSBcIkVycm9yIGNyZWF0aW5nIGZpbGUgb24gR29vZ2xlIERyaXZlIDooXCI7XG4gIGlmKCBmaWxlLmVycm9yICkgZXJyb3JNZXNzYWdlID0gZmlsZS5tZXNzYWdlO1xuXG4gIGlmKCBlcnJvck1lc3NhZ2UgKSB7XG4gICAgX3NldE1lc3NhZ2UoZXJyb3JNZXNzYWdlLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuICAvLyBleHBvcnQgYXMgY3N2XG5mdW5jdGlvbiBleHBvcnRDc3YocmVzdWx0cykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdleHBvcnQtZHJpdmUtY3N2JywgMSk7XG5cbiAgJChcIiNleHBvcnQtY3N2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydGluZy4uLlwiKTtcblxuICB2YXIgbmFtZSA9ICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkge1xuICAgIF9zZXRNZXNzYWdlKFwiUGxlYXNlIHByb3ZpZGUgYSBmb2xkZXIgbmFtZVwiLCBcImRhbmdlclwiKVxuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRhdGEgPSByZXN1bHRzLmRhdGE7XG5cbiAgLy8gY3JlYXRlIGEgbGlzdCBzbyB3ZSBjYW4gcmVjdXJzaXZlbHkgaXRlcmF0ZVxuICB2YXIga2V5cyA9IFtdO1xuICBmb3IoIHZhciBrZXkgaW4gZGF0YSApIGtleXMucHVzaChrZXkpO1xuXG4gIC8vIGNyZWF0ZSBmb2xkZXJcbiAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBleHBvcnQgZm9sZGVyLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgX3VwZGF0ZVByb2dyZXNzKDEsIGtleXMubGVuZ3RoKzIpO1xuICBnZHJpdmUuc2F2ZUZpbGUobmFtZSxcIkFIQiAzUEcgTW9kZWwgUmVzdWx0c1wiLFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmZvbGRlclwiLFwiXCIsZnVuY3Rpb24oZmlsZSl7XG4gICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuICAgIHZhciBwYXJlbnQgPSBmaWxlLmlkO1xuICAgIF91cGRhdGVQcm9ncmVzcygyLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgIC8vIGNyZWF0ZSBhIG5pY2UgZmlsZSBkZXNjcmliaW5nIHRoZSBjdXJyZW50IGV4cG9ydFxuICAgIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgY29uZmlnIGZpbGUuLi5cIiwgXCJpbmZvXCIsIHRydWUpO1xuICAgIGRlbGV0ZSByZXN1bHRzLmNvbmZpZy5wbGFudGF0aW9uX3N0YXRlO1xuICAgIHZhciBjb25maWcgPSBKU09OLnN0cmluZ2lmeShyZXN1bHRzLmNvbmZpZyxudWxsLFwiICBcIik7XG4gICAgZ2RyaXZlLnNhdmVGaWxlKFwiY29uZmlnLnR4dFwiLFwiQUhCIDNQRyBNb2RlbCAtIFJ1biBDb25maWd1cmF0aW9uXCIsXCJ0ZXh0L3BsYWluXCIsY29uZmlnLGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuICAgICAgX3VwZGF0ZVByb2dyZXNzKDMsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgICBfY3JlYXRlRXhwb3J0KDAsIGtleXMsIGRhdGEsIHBhcmVudCk7XG4gICAgfSx7cGFyZW50OiBwYXJlbnR9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUV4cG9ydChpbmRleCwga2V5cywgZGF0YSwgcGFyZW50KSB7XG5cbiAgLy8gd2UgYXJlIGFsbCBkb25lIDopXG4gIGlmKCBpbmRleCA9PSBrZXlzLmxlbmd0aCApIHtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMSwgMSk7XG4gICAgX3NldE1lc3NhZ2UoXCJFeHBvcnQgU3VjY2Vzc2Z1bC48YnIgLz48YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vI2ZvbGRlcnMvXCIgKyBwYXJlbnQgK1xuICAgICAgICAgIFwiJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tZXh0ZXJuYWwtbGluay1zaWduJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiLCBcInN1Y2Nlc3NcIik7XG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgfSBlbHNlIHtcblxuICAgIHZhciBrZXkgPSBrZXlzW2luZGV4XTtcbiAgICB2YXIgY3N2ID0gXCJcIjtcblxuICAgIC8vIFRPRE86IGFkZCBtb250aCBhbmQgZGF0ZVxuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkYXRhW2tleV0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggZGF0YVtrZXldW2ldLmxlbmd0aCA9PSAwICkgY29udGludWU7IC8vIGlnbm9yZSB0aGUgYmxhbmsgcm93c1xuXG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGRhdGFba2V5XVtpXS5sZW5ndGg7IGorKyApIGNzdiArPSBkYXRhW2tleV1baV1bal0rXCIsXCI7XG4gICAgICBjc3YgPSBjc3YucmVwbGFjZSgvLCQvLCcnKStcIlxcblwiO1xuICAgIH1cblxuICAgIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgXCIra2V5c1tpbmRleF0rXCIuY3N2Li4uIFwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZ2RyaXZlLnNhdmVGaWxlKGtleXNbaW5kZXhdK1wiLmNzdlwiLFwiXCIsXCJ0ZXh0L2NzdlwiLGNzdixmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcblxuICAgICAgX3VwZGF0ZVByb2dyZXNzKGluZGV4KzQsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgICBpbmRleCsrO1xuICAgICAgX2NyZWF0ZUV4cG9ydChpbmRleCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtjb252ZXJ0OiB0cnVlLCBwYXJlbnQ6IHBhcmVudH0pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXhwb3J0Q3N2IDogZXhwb3J0Q3N2LFxuICBpbml0ICAgICAgOiBpbml0XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJzdGFjay9mbGFzaGJsb2NrLWRldGVjdG9yXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2FsbGJhY2tNZXRob2Qpe1xuICAgIHZhciByZXR1cm5fdmFsdWUgPSAwO1xuXG4gICAgaWYobmF2aWdhdG9yLnBsdWdpbnNbXCJTaG9ja3dhdmUgRmxhc2hcIl0pIHtcbiAgICAgICAgICBlbWJlZF9sZW5ndGggPSAkKCdlbWJlZCcpLmxlbmd0aDtcbiAgICAgICAgICBvYmplY3RfbGVuZ3RoID0gJCgnb2JqZWN0JykubGVuZ3RoO1xuXG4gICAgICAgICAgaWYoKGVtYmVkX2xlbmd0aCA+IDApIHx8IChvYmplY3RfbGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gQ2hyb21lIHVzaW5nIEZsYXNoQmxvY2sgKyBNYWMgLyBTYWZhcmkgdXNpbmcgQWRCbG9jayAqL1xuICAgICAgICAgICAgICAkKCdvYmplY3QsIGVtYmVkJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gRmlyZWZveCB1c2luZyBGbGFzaEJsb2NrICovXG4gICAgICAgICAgICAgIGlmKCAkKCdkaXZbYmdpbmFjdGl2ZV0nKS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgfSBlbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpID4gLTEpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBJZiBmbGFzaCBpcyBub3QgaW5zdGFsbGVkICovXG4gICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMTtcbiAgICB9XG5cbiAgICBpZihjYWxsYmFja01ldGhvZCAmJiB0eXBlb2YoY2FsbGJhY2tNZXRob2QpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjYWxsYmFja01ldGhvZChyZXR1cm5fdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbiAgICB9XG59O1xuIiwidmFyIE9hdXRoID0gcmVxdWlyZSgnLi9vYXV0aCcpO1xudmFyIGdkcml2ZVJUID0gcmVxdWlyZSgnLi9nZHJpdmVSVCcpO1xudmFyIGFwcDtcblxuXG52YXIgTUlNRV9UWVBFID0gXCJhcHBsaWNhdGlvbi92bmQuYWhiLTNwZy5ydW5cIjtcbnZhciBUUkVFX01JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcudHJlZVwiO1xudmFyIERSSVZFX0FQSV9WRVJTSU9OID0gXCJ2MlwiO1xuXG4vLyBnb29nbGUgb2F1dGggYWNjZXNzIHRva2VuXG52YXIgdG9rZW4gPSBcIlwiO1xuXG4vLyBjdXJyZW50bHkgbG9hZGVkIGdkcml2ZSBmaWxlIGlkXG52YXIgbG9hZGVkRmlsZSA9IG51bGw7XG4vLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgZmlsZXMgKG1ldGFkYXRhKVxudmFyIGZpbGVMaXN0ID0gW107XG4vLyBnb29nbGUgZHJpdmUgc2hhcmUgY2xpZW50XG52YXIgY2xpZW50ID0gbnVsbDtcblxuLy8gbG9hZGVkIHRyZWUgYW5kIG1hbmFnZW1lbnRcbnZhciBsb2FkZWRUcmVlID0gbnVsbDtcbi8vIGxpc3Qgb2YgY3VycmVudGx5IGxvYWRlZCB0cmVlIGZpbGVzIChtZXRhZGF0YSlcbnZhciB0cmVlTGlzdCA9IFtdO1xuXG4vLyBjdXJyZW50IE1JTUUgVFlQRSB3ZSBhcmUgc2F2aW5nXG52YXIgc2F2ZU1pbWVUeXBlID0gXCJcIjtcblxuLyoqKlxuICogIEluaXRpYWxpemUgZ29vZ2xlIGRyaXZlIHBhbmVscywgYnRucyBhbmQgbG9naW5cbiAqKiovXG5mdW5jdGlvbiBpbml0KGFwcGxpY2F0aW9uLCBjYWxsYmFjaykge1xuICBhcHAgPSBhcHBsaWNhdGlvbjtcbiAgZ2RyaXZlUlQuc2V0QXBwKGFwcCk7XG5cbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyBzZXQgdGhlICd1cGRhdGUnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS11cGRhdGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF91cGRhdGVDdXJyZW50RmlsZSgpO1xuICB9KTtcblxuICAvLyBzZXQgdGhlICduZXcnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS1uZXctYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF9zYXZlTmV3RmlsZSgpO1xuICB9KTtcblxuICAvLyBjcmVhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gIF9jcmVhdGVMb2dpbkJ0bigpO1xuXG4gIC8vIGxvYWQgdGhlIGdvb2dsZSBhdXRoIGFuZCBkcml2ZSBhcGknc1xuICBfbG9hZEFwaShmdW5jdGlvbigpIHtcbiAgICAvLyBpZiB0aGUgdXNlciBpcyBhdXRob3JpemVkIGdyYWIgdGhlIHJlZnJlc2ggdG9rZW5cbiAgICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24ocmVmcmVzaFRva2VuKXtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHJlZnJlc2ggdG9rZW4sIGxlYXZlLCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgIGlmKCAhcmVmcmVzaFRva2VuICkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgYSByZWZlc2ggdG9rZW4sIHRoZW4gdXNlciBpcyBhbGwgc2V0LFxuICAgICAgLy8gZ2V0IGEgbmV3IGFjY2VzcyB0b2tlbiBzbyB3ZSBjYW4gc3RhcnQgdXNpbmcgdGhlIGFwaSdzXG4gICAgICAvLyBncmFiIHRoZWlyIGluZm9ybWF0aW9uIGFuZCBkaXNwbGF5XG4gICAgICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KXtcbiAgICAgICAgdG9rZW4gPSB0O1xuICAgICAgICBpZiggdG9rZW4gKSBfc2V0VXNlckluZm8oKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBfY2hlY2tUb2tlbigpO1xuICAgIH0sIDEwMDAgKiA1ICogNjApO1xuICB9KTtcblxuICAvLyBzZXR1cCB0aGUgdHJlZSAnc2hhcmUnIGJ0blxuICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgLy8gc2VlIGlmIHdlIGhhdmUgYSBzaGFyZSBjbGllbnRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBubyBjbGllbnQsIGxvYWQgYXBpXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gb24gbG9hZCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCB0aGUgY3VycmVudCB0cmVlXG4gICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRUcmVlXSk7XG4gICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGhhdmUgYSBjbGllbnQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggY3VycmVudCB0cmVlXG4gICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICB9XG4gIH0pO1xuXG59XG5cbi8qKipcbiAqIFNhdmUgdGhlIGN1cnJlbnQgbW9kZWwgYXMgYSBuZXcgZ29vZ2xlIGRyaXZlIGZpbGVcbiAqKiovXG5mdW5jdGlvbiBfc2F2ZU5ld0ZpbGUoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3NhdmUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGdyYWIgdGhlIG5hbWUgb2YgdGhlIG5ldyBmaWxlXG4gIHZhciBuYW1lID0gJChcIiNzYXZlLW5hbWUtaW5wdXRcIikudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgeyAvLyB3ZSBhbHdheXMgd2FudCBhIG5hbWUsIGFsZXJ0IGFuZCBxdWl0XG4gICAgX3NldFNhdmVNZXNzYWdlKCdQbGVhc2UgcHJvdmlkZSBhIGZpbGVuYW1lLicsJ2luZm8nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZWUgd2hhdCBraW5kIG9mIGZpbGUgd2UgYXJlIGNyZWF0aW5nIGJhc2VkIG9uIHRoZSBzYXZlTWltZVR5cGUgdmFyXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGRhdGEgPSBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBTYXZpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAvLyBzYXZlIHRoZSBmaWxlXG4gIHNhdmVGaWxlKG5hbWUsXG4gICAgICAkKFwiI3NhdmUtZGVzY3JpcHRpb24taW5wdXRcIikudmFsKCksXG4gICAgICBzYXZlTWltZVR5cGUsXG4gICAgICBkYXRhLFxuICAgICAgZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHNhdmUgdG8gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgIGVsc2UgX3NldFNhdmVNZXNzYWdlKCdTdWNlc3NmdWxseSBzYXZlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgLy8gd2FpdCBhIHRpY2sgdG8gaGlkZSB0aGUgcG9wdXAsIHNvIHVzZXIgc2VlcyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IGZpbGUsIHVwZGF0ZSBvdXIgbGlzdFxuICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuXG4gICAgICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIityZXNwLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIGlkXG4gICAgICAgICAgbG9hZGVkRmlsZSA9IHJlc3AuaWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHRyZWUsIHVwZGF0ZSB0aGUgbGlzdFxuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuXG4gICAgICAgICAgLy8gc2hvdyB0aGUgdHJlZSBzaGFyZSBidG5zXG4gICAgICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZXNcbiAgICAgICAgICBsb2FkZWRUcmVlID0gcmVzcC5pZDtcbiAgICAgICAgfVxuICAgICAgfVxuICApO1xufVxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGN1cnJlbnRseSBsb2FkZWQgZ29vZ2xlIGRyaXZlIGZpbGVcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlQ3VycmVudEZpbGUoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VwZGF0ZS1kcml2ZS1maWxlJywgMSk7XG5cbiAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgX3NldFNhdmVNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IFVwZGF0aW5nLi4uJywnaW5mbycpO1xuXG4gIHZhciBmaWxlID0ge307XG4gIHZhciBkYXRhID0ge307XG5cbiAgLy8gZ3JhYiB0aGUgY29ycmVudCBkYXRhIGFuZCBmaWxlaWQgYmFzZWQgb24gbWltZVR5cGVcbiAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgZmlsZSA9IGxvYWRlZEZpbGU7XG4gICAgZGF0YSA9IGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKTtcbiAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRUcmVlO1xuICAgIGRhdGEgPSBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCkudHJlZTtcbiAgfSBlbHNlIHsgLy8gYmFkbmVzc1xuICAgIGFsZXJ0KFwiVW5rbm93biBNSU1FX1RZUEU6IFwiK3NhdmVNaW1lVHlwZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSBnb29nbGUgZHJpdmUgZmlsZVxuICB1cGRhdGVGaWxlKGZpbGUsXG4gICAgICBkYXRhLFxuICAgICAgZnVuY3Rpb24ocmVzcCl7XG4gICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgaGFwcGVuZWRcbiAgICAgICAgaWYoIHJlc3AuZXJyb3IgKSByZXR1cm4gX3NldFNhdmVNZXNzYWdlKCdGYWlsZWQgdG8gdXBkYXRlIG9uIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnVXBkYXRlIFN1Y2Nlc3NmdWwuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHNvIHRoZSB1c2VyIGtub3dzIHVwZGF0ZSB3YXMgc3VjY2Vzc1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIH0sMTUwMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBsaXN0IGZvciB3aGF0ZXZlciB0eXBlIHdhcyB1cGRhdGVkXG4gICAgICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgX3VwZGF0ZVRyZWVMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwLlxuICogIHR5cGUgLSBib29zdHJhcCBhbGVydCB0eXBlXG4gKioqL1xuZnVuY3Rpb24gX3NldExvYWRNZXNzYWdlKG1zZywgdHlwZSkge1xuICBpZiggIW1zZyApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLW1zZ1wiKS5odG1sKFwiXCIpO1xuICAkKCcjZ2RyaXZlLWZpbGUtbXNnJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LScrdHlwZSsnXCI+Jyttc2crJzwvZGl2PicpO1xufVxuXG4vKioqXG4gKiBzZXQgYSBtZXNzYWdlIGZvciB0aGUgJ3NhdmUgdG8gZHJpdmUnIHBvcHVwXG4gKiB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRTYXZlTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtc2F2ZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1zYXZlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudS4gVGhpcyBtZW51IGlzIGZvciB3aGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW5cbiAqKiovXG5mdW5jdGlvbiBfY3JlYXRlTG9naW5CdG4oKSB7XG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPkxvZ2luPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dpbi13aXRoLWdvb2dsZVwiPjxpIGNsYXNzPVwiaWNvbi1zaWduaW5cIj48L2k+IExvZ2luIHdpdGggR29vZ2xlPC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gbG9naW4gY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2xvZ2luLXdpdGgtZ29vZ2xlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ2luJywgMSk7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICBfc2V0VXNlckluZm8oKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbi8qKipcbiAqIENyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUgZm9yIHdoZW4gdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ291dEJ0bih1c2VyZGF0YSkge1xuICAvLyBzZXQgYnRuIGh0bWxcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+PGltZyBjbGFzcz1cImltZy1yb3VuZGVkXCIgc3JjPVwiJyt1c2VyZGF0YS5waWN0dXJlXG4gICAgICArICdcIiBzdHlsZT1cIm1hcmdpbjotNXB4IDVweCAtNXB4IDA7d2lkdGg6MjhweDtoZWlnaHQ6MjhweDtib3JkZXI6MXB4IHNvbGlkIHdoaXRlXCIgLz4gJyArIHVzZXJkYXRhLm5hbWVcbiAgICAgICsgJzxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPicgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cInNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS1idG5cIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJvcGVuLWluLWRyaXZlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJpY29uLWV4dGVybmFsLWxpbmstc2lnblwiPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImxvZ291dFwiPjxpIGNsYXNzPVwiaWNvbi1zaWdub3V0XCI+PC9pPiBMb2dvdXQ8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgdG8gc2hvdyBtZW51XG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gIGJ0bi5maW5kKCcjc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudCBzYXZlIG1pbWVUeXBlXG4gICAgc2F2ZU1pbWVUeXBlID0gTUlNRV9UWVBFO1xuXG4gICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB0eXAgdGhleSBhcmUgc2F2aW5nXG4gICAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIE1vZGVsPC9oNT5cIik7XG5cbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGlmIHRoZSBmaWxlIGlzIGxvYWRlZCwgc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gICAgaWYoIGxvYWRlZEZpbGUgIT0gbnVsbCkge1xuICAgICAgLy8gZ3JhYiB0aGUgY3VycmVudCBmaWxlcyBtZXRhZGF0YVxuICAgICAgdmFyIGZpbGUgPSB7fTtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCBmaWxlTGlzdFtpXS5pZCA9PSBsb2FkZWRGaWxlKSB7XG4gICAgICAgICAgZmlsZSA9IGZpbGVMaXN0W2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5zaG93KCk7XG5cbiAgICAgIC8vIHJlbmRlciB0aGUgZmlsZXMgbWV0YWRhdGEgaW4gdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgdmFyIGQgPSBuZXcgRGF0ZShmaWxlLm1vZGlmaWVkRGF0ZSk7XG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsLWlubmVyXCIpLmh0bWwoXCI8Yj5cIitmaWxlLnRpdGxlK1wiPC9iPjxiciAvPlwiICtcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIitmaWxlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICAgIGQudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitmaWxlLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrZmlsZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IFwiICtcbiAgICAgICAgICBcIkxpbmsgdG8gU2hhcmU8L2E+IDxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz4obXVzdCBoYXZlIHBlcm1pc3Npb24pPC9zcGFuPjxiciAvPjxiciAvPlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgICBfc2V0U2F2ZU1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIC8vIGNsaWNrIGhhbmRsZXIgZm9yIHNoYXJlIGJ0blxuICBidG4uZmluZChcIiNzaGFyZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdvcGVuLWRyaXZlLXNoYXJlJywgMSk7XG5cbiAgICAvLyBoYXMgdGhlIHNoYXJlIGNsaWVudCBiZWVuIGxvYWRlZFxuICAgIGlmKCBjbGllbnQgPT0gbnVsbCApIHtcbiAgICAgIC8vIGxvYWQgdGhlIHNoYXJlIHBvcHVwXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgICAgY2xpZW50ID0gbmV3IGdhcGkuZHJpdmUuc2hhcmUuU2hhcmVDbGllbnQoT2F1dGguQVBQX0lEKTtcbiAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzaG93IGFib3V0IHBhbmVsXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIHNob3cgdGhlICdsb2FkIGZyb20gZHJpdmUnIHBhbmVsXG4gIGJ0bi5maW5kKCcjbG9hZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgLy8gaGlkZSBhbnkgZXhpc3RpbmcgbWVzc2FnZVxuICAgIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcblxuICAgIC8vIHJlbmRlciB0aGUgbW9kZWwgZmlsZXMgaW4gdGhlIHBvcHVwIGZpbGVzXG4gICAgX3Nob3dEcml2ZUZpbGVzKCk7XG5cbiAgICAvLyBzaG93IHRoZSBtb2RhbFxuICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBsb2FkIHRoZSB1c2VyIG91dFxuICBidG4uZmluZCgnI2xvZ291dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VzZXItbG9nb3V0JywgMSk7XG5cbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGtpbGwgdGhlIGFjY2VzcyB0b2tlblxuICAgIHRva2VuID0gbnVsbDtcblxuICAgIC8vIHVwZGF0ZSB0aGUgbWVudSBwYW5lbFxuICAgIF9jcmVhdGVMb2dpbkJ0bigpO1xuICB9KTtcblxuICAvLyBhdHRhY2ggdGhlIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbi8qKipcbiAqICBSZXF1ZXN0IHRoZSB1c2VyJ3MgaW5mb3JtYXRpb24uICBXaGVuIGxvYWRlZCwgdXBkYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRVc2VySW5mbygpIHtcbiAgLy8gbG9hZCB1c2VyIG5hbWVcbiAgJC5hamF4KHtcbiAgICB1cmwgOiBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS91c2VyaW5mb1wiLFxuICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAvLyBhbHdheXMgc2V0IHlvdXIgYWNjZXNzIHN0b2tlblxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMseGhyKSB7XG4gICAgICAvLyBwYXJzZSB5b3VyIGpzb24gcmVzcG9uc2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgLy8gdXBkYXRlIHRvcCByaWdodCBtZW51XG4gICAgICBfY3JlYXRlTG9nb3V0QnRuKGRhdGEpO1xuXG4gICAgICAvLyBzZXQgdG8gd2luZG93IHNjb3BlXG4gICAgICB3aW5kb3cudXNlcmluZm8gPSBkYXRhO1xuICAgIH0sXG4gICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIFRPRE86IHNob3VsZCB3ZSBhbGVydCB0aGlzP1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gbG9hZCB1c2VyIGZpbGVzLCB0cmVlc1xuICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgX3VwZGF0ZVRyZWVMaXN0KCk7XG59XG5cbi8qKipcbiAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyBtb2RlbHNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlRmlsZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK01JTUVfVFlQRStcIidcIiwgZnVuY3Rpb24ocmVzcCl7XG4gICAgZmlsZUxpc3QgPSByZXNwLnJlc3VsdC5pdGVtcztcbiAgfSk7XG59XG5cbi8qKipcbiAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyB0cmVlc1xuICpcbiAqIFRPRE86IGFkZCBzZWFyY2ggdG8gdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMsXG4gKiAgbGltaXQgdG8gMTAgcmVzdWx0c1xuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVUcmVlTGlzdCgpIHtcbiAgbGlzdEZpbGVzKFwibWltZVR5cGUgPSAnXCIrVFJFRV9NSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIHRyZWVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgUmVuZGVyIHRoZSB1c2VycyBjdXJyZW50IG1vZGVscyBvbnRvIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIF9zaG93RHJpdmVGaWxlcygpIHtcbiAgLy8gaWYgdGhleSBoYXZlIG5vIGZpbGVzLCBzYXkgc28gYW5kIGdldCBvdXQgb2YgaGVyZVxuICBpZiggIWZpbGVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGxpPk5vIEZpbGVzPC9saT5cIik7XG4gIGlmKCBmaWxlTGlzdC5sZW5ndGggPT0gMCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuXG4gIC8vIHNob3cgYSB0aXRsZSwgdGhlcmUgYXJlIG11bHRpcGxlIHR5cGVzIHRoYXQgY2FuIGJlIGxvYWRlZCBmcm9tIGRyaXZlXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGg0PlNlbGVjdCBGaWxlPC9oND5cIik7XG5cbiAgLy8gY3JlYXRlIHRoZSBsaXN0IGVsZW1lbnRzIGZvciBlYWNoIGZpbGVzIG1ldGFkYXRhXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSBmaWxlTGlzdFtpXTtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKFxuICAgICAgJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48YSBpZD0nXCIraXRlbS5pZCtcIicgdXJsPSdcIitpdGVtLmRvd25sb2FkVXJsK1wiJyBzdHlsZT0nY3Vyc29yOnBvaW50ZXInPjxpIGNsYXNzPSdpY29uLWZpbGUnPjwvaT4gXCIraXRlbS50aXRsZStcIjwvYT5cIiArXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDtwYWRkaW5nLWxlZnQ6MTBweCc+TGFzdCBNb2RpZmllZDogXCIrZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2l0ZW0ubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPGRpdj48L2xpPlwiXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIGVhY2ggZmlsZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtZHJpdmUtbW9kZWwnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBGaWxlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gZ3JhYiB0aGUgZml2ZSBmcm9tIGRyaXZlXG4gICAgZ2V0RmlsZShpZCwgJCh0aGlzKS5hdHRyKFwidXJsXCIpLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAvLyBpZiBiYWRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgLy8gaGlkZSBhbnkgbG9hZGVkIHRyZWVzLFxuICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChcIlwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICBsb2FkZWRUcmVlID0gbnVsbDtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIGFsbCBnb29kXG4gICAgICBfc2V0TG9hZE1lc3NhZ2UoJ0ZpbGUgTG9hZGVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgbG9hZGVkRmlsZSA9IGlkO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIG5hbWVcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCBpZCA9PSBmaWxlTGlzdFtpXS5pZCApIHtcbiAgICAgICAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK2ZpbGVMaXN0W2ldLnRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK2lkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgIC8vIHNldHVwIG1vZGVsXG4gICAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRTZXR1cChpZCwgZmlsZSk7XG5cbiAgICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuXG4gICAgICAvLyB3YWl0IGEgdGljayBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGhpZGUgdGhlIG1vZGFsXG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCB0cmVlcyBvbnRvIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIF9zaG93VHJlZUZpbGVzKCkge1xuICAvLyB1cGRhdGUgdGhlIGxpc3QgaGVhZGVyLCBsZXQgdXNlciBrbm93IHdoYXQgdGhleSBhcmUgc2VsZWN0aW5nXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiXCIpO1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGg1PlNlbGVjdCBUcmVlPC9oNT48L2xpPlwiKSk7XG5cbiAgLy8gaWYgdGhlcmUgYXJlIG5vIHRyZWVzLCBzYXkgc28gYW5kIGdldCBvdXQgb2YgaGVyZVxuICBpZiggIXRyZWVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz5ObyBUcmVlcyBBdmFpbGFibGU8L2xpPlwiKSk7XG4gIGlmKCB0cmVlTGlzdC5sZW5ndGggPT0gMCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgdHJlZSBsaXN0IGVsZW1lbnRzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSB0cmVlTGlzdFtpXTtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKFxuICAgICAgJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48YSBpZD0nXCIraXRlbS5pZCtcIicgbmFtZT0nXCIraXRlbS50aXRsZStcIicgdXJsPSdcIitpdGVtLmRvd25sb2FkVXJsK1wiJyBzdHlsZT0nY3Vyc29yOnBvaW50ZXInPjxpIGNsYXNzPSdpY29uLWxlYWYnPjwvaT4gXCIraXRlbS50aXRsZStcIjwvYT5cIiArXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDtwYWRkaW5nLWxlZnQ6MTBweCc+TGFzdCBNb2RpZmllZDogXCIrZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2l0ZW0ubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPGRpdj48L2xpPlwiXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIHRpdGxlc1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtZHJpdmUtdHJlZScsIDEpO1xuXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoXCJuYW1lXCIpO1xuXG4gICAgLy8gdGVsbCB0aGUgdXNlciB3ZSBhcmUgbG9hZGluZ1xuICAgIF9zZXRMb2FkTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBMb2FkaW5nIFRyZWUuLi4nLCdpbmZvJyk7XG5cbiAgICAvLyBsb2FkIGZpbGUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHVzZXIga25vd1xuICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgLy8gc2hvdyB0aGUgdHJlZSBzaGFyaW5nIGJ0bnNcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3ZSBhcmUgc3VjY2VzZnVsbFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdUcmVlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICAgIGxvYWRlZFRyZWUgPSBpZDtcblxuICAgICAgLy8gbG9hZGVkIHRyZWUgaW50byBtb2RlbCAvIFVJXG4gICAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRUcmVlKGZpbGUpO1xuXG4gICAgICAvLyB3YWl0IGEgc2VjIHNvIHVzZXIgY2FuIHNlZSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9LDE1MDApO1xuXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgc2hvdyB0aGUgdXNlciB0aGUgbG9hZCB0cmVlIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gc2hvd0xvYWRUcmVlUGFuZWwoKSB7XG4gIC8vIHJlbmRlciB0aGUgdHJlZXMgaW50byB0aGUgcG9wdXAgbGlzdFxuICBfc2hvd1RyZWVGaWxlcygpO1xuICAvLyBjbGVhciBhbnkgbWVzc2FnZXNcbiAgX3NldExvYWRNZXNzYWdlKG51bGwpO1xuICAvLyBzaG93IHRoZSBwb3B1cFxuICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIHNhdmUgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dTYXZlVHJlZVBhbmVsKCkge1xuICAvLyBzZXQgdGhlIGN1cnJlbnQgbWltZVR5cGUgd2UgYXJlIHNhdmluZ1xuICBzYXZlTWltZVR5cGUgPSBUUkVFX01JTUVfVFlQRTtcblxuICAvLyBzZXQgdGhlIGhlYWRlciBzbyB1c2VyIGtub3dzIHdoYXQgdHlwZSB0aGV5IGFyZSBzYXZpbmdcbiAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIFRyZWU8L2g1PlwiKTtcblxuICAvLyBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgdHJlZSwgc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gIGlmKCBsb2FkZWRUcmVlICE9IG51bGwpIHtcbiAgICAvLyBmaW5kIHRoZSBjdXJyZW50IHRyZWUgYmFzZWQgb24gaWRcbiAgICB2YXIgdHJlZSA9IHt9O1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdHJlZUxpc3RbaV0uaWQgPT0gbG9hZGVkVHJlZSkge1xuICAgICAgICB0cmVlID0gdHJlZUxpc3RbaV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgLy8gcmVuZGVyIHRyZWUgbWV0YWRhdGEgb24gdXBkYXRlIHBhbmVsXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSh0cmVlLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrdHJlZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgIFwiPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPlwiK3RyZWUuZGVzY3JpcHRpb24rXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrdHJlZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC9cIit0cmVlLmlkK1wiJycgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+XCIpO1xuICB9IGVsc2Uge1xuICAgIC8vIGRvbid0IHNob3cgdGhlIHVwZGF0ZSBwYW5lbCwgdGhpcyBpcyBhIG5ldyB0cmVlXG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5oaWRlKCk7XG4gIH1cblxuICAvLyBjbGVhciBhbnkgbWVzc2FnZVxuICBfc2V0U2F2ZU1lc3NhZ2UobnVsbCk7XG5cbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqIExvYWQgYSBtb2RlbCBiYXNlZCBvbiBwYXNzZWQgaWQuICBUaGlzIGZ1bmN0aW9uIGlzIHJlYWxseSBvbmx5IGZvciBsb2FkaW5nIG1vZGVsIG9uIHN0YXJ0LCB3aGVuIGEgZmlsZSBpZFxuICogaGFzIGJlZW4gcGFzc2VkIGluIHRoZSB1cmwgZWl0aGVyIGZyb20gZ29vZ2xlIGRyaXZlIG9yIGZyb20gdGhlID9maWxlPWlkIHVybC5cbiAqKiovXG52YXIgbG9naW5Nb2RhbEluaXQgPSBmYWxzZTtcbmZ1bmN0aW9uIGxvYWQoaWQsIGxvYWRGbikge1xuICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFuIGFjY2VzcyB0b2tlbiwgd2UgbmVlZCB0byBzaWduIGluIGZpcnN0XG4gIC8vIFRPRE86IGlmIHRoaXMgaXMgYSBwdWJsaWMgZmlsZSwgdGhlcmUgaXMgbm8gcmVhc29uIHRvIHNpZ24gaW4uLi4gc29sdXRpb24/XG4gIGlmKCAhdG9rZW4gKSB7XG5cbiAgICBpZiggIWxvZ2luTW9kYWxJbml0ICkge1xuICAgICAgJCgnI2dvb2dsZS1tb2RhbC1sb2dpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIHNpZ24gdGhlIHVzZXIgaW4gKGZvcmNlIG9hdXRoIHBvcHVwKVxuICAgICAgICBzaWduSW4oZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSB1c2VyIGluZm9ybWF0aW9uIGluIHRvcCBsZWZ0XG4gICAgICAgICAgX3NldFVzZXJJbmZvKCk7XG5cbiAgICAgICAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICAgICAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgICAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoKTtcbiAgICAgIGxvZ2luTW9kYWxJbml0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqKlxuICogSW5pdGlhbGl6ZSBVSSAvIG1vZGVsIHdoZW4gYSBmaWxlIGlzIGxvYWRlZCBhdCBzdGFydFxuICoqKi9cbmZ1bmN0aW9uIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLCBmaWxlKSB7XG4gIC8vIGJhZGRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICBpZiggIWZpbGUgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkZhaWxlZCB0byBsb2FkIGZyb20gR29vZ2xlIERyaXZlIDovXCIpO1xuICB9XG5cbiAgLy8gbWV0YWRhdGEgZmFpbGVkIHRvIGxvYWQsIG1vcmUgYmFkbmVzc1xuICBpZiggbWV0YWRhdGEuY29kZSA9PSA0MDQgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWVzc2FnZSk7XG4gIH1cblxuICAvLyB3ZSBsb2FkZWQgYSBtb2RlbCwgc2V0dXAgYW5kIHJ1blxuICBpZiggbWV0YWRhdGEubWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudGx5IGxvYWRlZCBmaWxlIGlkXG4gICAgbG9hZGVkRmlsZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK21ldGFkYXRhLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAvLyBzaG93IHRpdGxlXG4gICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIittZXRhZGF0YS50aXRsZSk7XG5cbiAgICAvLyBzZXR1cCBtb2RlbFxuICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFNldHVwKG1ldGFkYXRhLmlkLCBmaWxlKTtcblxuICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcbiAgfSBlbHNlIGlmICggbWV0YWRhdGEubWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7IC8vIHdlIGxvYWRlZCBhIHRyZWVcbiAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgbG9hZGVkVHJlZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobWV0YWRhdGEudGl0bGUpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVcbiAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRUcmVlKGZpbGUpO1xuXG4gICAgLy8gaGlkZSB0aGUgbG9hZGluZyBwb3B1cFxuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcIkxvYWRlZCB1bmtub3duIGZpbGUgdHlwZSBmcm9tIEdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWltZVR5cGUpO1xuICB9XG59XG5cbi8qKipcbiAqIHRva2VucyBleHBpcmUsIGV2ZXJ5IG9uY2UgaW4gYXdoaWxlIGNoZWNrIHRoZSBjdXJyZW50IHRva2VuIGhhc24ndFxuICogaWYgaXQgaGFzLCB0aGVuIHVwZGF0ZVxuICoqKi9cbmZ1bmN0aW9uIF9jaGVja1Rva2VuKCkge1xuICAvLyBpZ25vcmUgaWYgdGhlcmUgaXMgbm8gdG9rZW5cbiAgaWYgKCF0b2tlbikgcmV0dXJuO1xuXG4gIC8vIG90aGVyd2lzZSwgbG9vayB0byB1cGRhdGUgdGhlIGFjY2VzcyB0b2tlblxuICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KSB7XG4gICAgaWYoIHQgIT0gbnVsbCApIHRva2VuID0gdDtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBpcyB0aGUgY3VycmVudCB1c2VyIHNpZ25lZCBpbj9cbiAqKiovXG5mdW5jdGlvbiBjaGVja1NpZ25lZEluKGNhbGxiYWNrKSB7XG4gIC8vIGlmIGlzQXV0aGVyaXplZCByZXR1cm5zIGEgdG9rZW4sIHVzZXIgaXMgbG9nZ2VkIGluXG4gIE9hdXRoLmlzQXV0aG9yaXplZChmdW5jdGlvbih0b2tlbil7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIGNhbGxiYWNrKHRydWUpO1xuICAgIGVsc2UgY2FsbGJhY2soZmFsc2UpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIFNpZ24gYSB1c2VyIGluIHVzaW5nIHRoZSBPYXV0aCBjbGFzc1xuICoqKi9cbmZ1bmN0aW9uIHNpZ25JbihjYWxsYmFjaykge1xuICBPYXV0aC5hdXRob3JpemUoZnVuY3Rpb24odCl7XG4gICAgdG9rZW4gPSB0O1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICBpZiggdC5lcnJvciApIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgIH1cbiAgfSlcbn07XG5cbi8qKipcbiAqIEFjY2VzcyBtZXRob2QgZm9yIHRva2VuXG4gKioqL1xuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIHJldHVybiB0b2tlbjtcbn07XG5cbi8qKipcbiAqIExvYWQgdGhlIGdvb2dsZSBkcml2ZSBhcGkgY29kZVxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkQXBpKGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmxvYWQoXCJkcml2ZVwiLCBEUklWRV9BUElfVkVSU0lPTiwgZnVuY3Rpb24oKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBsaXN0IG9mIGZpbGUgbWV0YWRhdGEgZnJvbSBnb29nbGUgZHJpdmUgYmFzZWQgb24gcXVlcnlcbiAqKiovXG5mdW5jdGlvbiBsaXN0RmlsZXMocXVlcnksIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmxpc3Qoe1xuICAgIHEgOiBxdWVyeSArIFwiIGFuZCB0cmFzaGVkID0gZmFsc2VcIlxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBzaW5nbGUgZmlsZXMgbWV0YWRhdGEgYmFzZWQgb24gaWRcbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlTWV0YWRhdGEoaWQsIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmdldCh7XG4gICAgJ2ZpbGVJZCcgOiBpZFxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiAgQWN0dWFsbHkgbG9hZCBhIGZpbGVzIGRhdGEuICBUaGUgdXJsIHRvIGRvIHRoaXMgaXMgcHJvdmlkZWQgaW4gYSBmaWxlcyBtZXRhZGF0YS5cbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlKGlkLCBkb3dubG9hZFVybCwgY2FsbGJhY2spIHtcbiAgJC5hamF4KHtcbiAgICB1cmwgOiBkb3dubG9hZFVybCxcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gc2V0IGFjY2VzcyB0b2tlbiBpbiBoZWFkZXJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAvLyBwYXJzZSB0aGUgcmVzcG9uc2UgKHdlIG9ubHkgc3RvcmUganNvbiBpbiB0aGUgZ29vZ2xlIGRyaXZlKVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBjYWxsYmFjayhkYXRhLCBpZCk7XG4gICAgfSxcbiAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmVcIlxuICAgICAgfSk7XG5cbiAgICB9XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2F2ZSBqc29uIHRvIGdvb2dsZSBkcml2ZVxuICoqKi9cbmZ1bmN0aW9uIHNhdmVGaWxlKG5hbWUsIGRlc2NyaXB0aW9uLCBtaW1lVHlwZSwganNvbiwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgaWYoICFvcHRpb25zICkgb3B0aW9ucyA9IHt9XG5cbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgJ3RpdGxlJyA6IG5hbWUsXG4gICAgJ2Rlc2NyaXB0aW9uJyA6IGRlc2NyaXB0aW9uLFxuICAgICdtaW1lVHlwZScgOiBtaW1lVHlwZVxuICB9O1xuXG4gIC8vIGlmIHdlIHdhbnQgdG8gc2F2ZSB0aGUgZmlsZSB0byBhIHNwZWNpZmllZCBmb2xkZXJcbiAgaWYoIG9wdGlvbnMucGFyZW50ICkge1xuICAgIG1ldGFkYXRhLnBhcmVudHMgPSBbe2lkOiBvcHRpb25zLnBhcmVudH1dO1xuICB9XG5cbiAgLy8gaWYgdGhlIGpzb24gaXMgcmVhbGx5IGFuIG9iamVjdCwgdHVybiBpdCB0byBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGpzb24gPT0gJ29iamVjdCcpIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICAvLyBkYXRhIG5lZWRzIHRvIGJlIGJhc2U2NCBlbmNvZGVkIGZvciB0aGUgUE9TVFxuICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoanNvbik7XG5cbiAgLy8gY3JlYXRlIG91ciBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9IGRlbGltaXRlclxuICAgICAgKyAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJ1xuICAgICAgKyBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSk7XG5cbiAgaWYoIGpzb24ubGVuZ3RoID4gMCApIHtcbiAgICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBkZWxpbWl0ZXIgKyAnQ29udGVudC1UeXBlOiAnXG4gICAgICArIG1pbWVUeXBlICsgJ1xcclxcbicgKyAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJ1xuICAgICAgKyAnXFxyXFxuJyArIGJhc2U2NERhdGE7XG4gIH1cbiAgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgKz0gY2xvc2VfZGVsaW07XG5cbiAgICAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgIC8vIGlmIHRoZSBvcHRpb25zLmNvbnZlcj10cnVlIGZsYWcgaXMgc2V0LCBnb29nbGUgYXR0ZW1wdHMgdG8gY29udmVydCB0aGUgZmlsZSB0b1xuICAgICAvLyBhIGdvb2dsZSBkb2MgZmlsZS4gIE1vc3RseSwgd2UgdXNlIHRoaXMgZm9yIGV4cG9ydGluZyBjc3YgLT4gR29vZ2xlIFNwcmVhZHNoZWV0c1xuICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICdwYXRoJyA6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzJyArICggb3B0aW9ucy5jb252ZXJ0ID8gJz9jb252ZXJ0PXRydWUnIDogJycpLFxuICAgICdtZXRob2QnIDogJ1BPU1QnLFxuICAgICdwYXJhbXMnIDoge1xuICAgICAgJ3VwbG9hZFR5cGUnIDogJ211bHRpcGFydCdcbiAgICB9LFxuICAgICdoZWFkZXJzJyA6IHtcbiAgICAgICdDb250ZW50LVR5cGUnIDogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgfSxcbiAgICAnYm9keScgOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keVxuICB9KTtcblxuICAvLyBzZW5kIHRoZSByZXF1ZXN0XG4gIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgaWYgKHJlc3AuaWQpXG4gICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICBlbHNlXG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHNhdmVcIlxuICAgICAgfSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogVXBkYXRlIGEgZmlsZSBiYXNlZCBvbiBpZCBhbmQgZ2l2ZW4ganNvbiBkYXRhXG4gKioqL1xuZnVuY3Rpb24gdXBkYXRlRmlsZShmaWxlSWQsIGpzb24sIGNhbGxiYWNrKSB7XG4gIC8vIHN0YXJ0IGNyZWF0aW5nIHRoZSBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgdmFyIG1ldGFkYXRhID0ge307XG5cbiAgLy8gc3RyaW5pZnkgdGhlbiBiYXNlNjQgZW5jb2RlIHRoZW4gb2JqZWN0XG4gICAgdmFyIGJhc2U2NERhdGEgPSBidG9hKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcblxuICAgIC8vIHNldCB1cCB0aGUgUE9TVCBib2R5XG4gICAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID1cbiAgICAgIGRlbGltaXRlciArXG4gICAgICAgICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nICtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpICtcbiAgICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogJyArIE1JTUVfVFlQRSArICdcXHJcXG4nICtcbiAgICAgICAgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbicgK1xuICAgICAgICAnXFxyXFxuJyArXG4gICAgICAgIGJhc2U2NERhdGEgK1xuICAgICAgICBjbG9zZV9kZWxpbTtcblxuICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAncGF0aCc6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzLycrZmlsZUlkLFxuICAgICAgICAnbWV0aG9kJzogJ1BVVCcsXG4gICAgICAgICdwYXJhbXMnOiB7J3VwbG9hZFR5cGUnOiAnbXVsdGlwYXJ0J30sXG4gICAgICAgICdoZWFkZXJzJzoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICAgICAgfSxcbiAgICAgICAgJ2JvZHknOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keX0pO1xuXG4gICAgLy8gc2V0IHJlcXVlc3RcbiAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCl7XG4gICAgICBpZiggcmVzcC5pZCApIHtcbiAgICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHVwZGF0ZVwiXG4gICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdydW4tbW9kZWwtcmVtb3RlJywgMSk7XG4gIGdkcml2ZVJULnJ1bk1vZGVsUnQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBjaGVja1NpZ25lZEluIDogY2hlY2tTaWduZWRJbixcbiAgc2lnbkluIDogc2lnbkluLFxuICBnZXRUb2tlbiA6IGdldFRva2VuLFxuICBsaXN0RmlsZXMgOiBsaXN0RmlsZXMsXG4gIGdldEZpbGVNZXRhZGF0YSA6IGdldEZpbGVNZXRhZGF0YSxcbiAgbG9hZCA6IGxvYWQsXG4gIHNhdmVGaWxlOiBzYXZlRmlsZSxcbiAgc2hvd0xvYWRUcmVlUGFuZWwgOiBzaG93TG9hZFRyZWVQYW5lbCxcbiAgc2hvd1NhdmVUcmVlUGFuZWwgOiBzaG93U2F2ZVRyZWVQYW5lbCxcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG5cbiAgTUlNRV9UWVBFIDogTUlNRV9UWVBFXG59XG4iLCIvLyBSRUFMVElNRSAocnQpIE9iamVjdHNcbi8vIHJ0IGpzb24gZmllbGQsIHVzZWQgdG8gc2VuZCB1cGRhdGVzIHRvIHBlZXJzXG52YXIgcnRKc29uID0gbnVsbDtcbi8vIHJ0IGRvY3VtZW50XG52YXIgcnREb2MgPSBudWxsO1xuLy8gaGFzIHRoZSBydCBhcGkgYmVlbiBsb2FkZWQ/XG52YXIgX3J0TG9hZGVkID0gZmFsc2U7XG4vLyB0aW1lciB0byBidWZmZXIgdGhlIGZpcmluZyBvZiB1cGRhdGVzIGZyb20gcnQgZXZlbnRzXG52YXIgX3J0VGltZXIgPSAtMTtcblxuLy8gbGlzdCBvZiBjdXJyZW50IHJ0IGVkaXRzIHRvIGlucHV0IGZpbGVzXG52YXIgcnRFZGl0cyA9IHt9O1xuLy8gZ29vZ2xlIGRyaXZlIHJ0IG1vZGVsIC0gbWFwXG52YXIgbGl2ZUVkaXRzID0gbnVsbDtcbi8vIGxvY2FsIGxvY2sgb24gYW4gZWxlbWVudFxudmFyIGxvY2sgPSB7fTtcblxudmFyIGFwcDtcblxuLy8gbG9hZGVkIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlO1xuXG4vKioqXG4gKiBTZXR1cCB0aGUgcnQgYXBpIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhpcyB3aWxsIGFjdHVhbGx5IGxvYWQgdGhlIGFwaSBpZiBuZWVkZWRcbiAqKiovXG5mdW5jdGlvbiBpbml0UnRBcGkoZmlsZSkge1xuICBydEpzb24gPSBudWxsOyAvLyBraWxsIG9mZiBhbnkgb2xkIGxpc3RuZXJzXG4gIGxvYWRlZEZpbGUgPSBmaWxlO1xuXG4gIC8vIGNsb3NlIGFueSBvbGQgY29ubmVjdGlvblxuICBpZiggcnREb2MgKSBydERvYy5jbG9zZSgpO1xuXG4gIC8vIGdldCBvdXQgb2YgaGVyZSBpZiB3ZSBkb24ndCBoYXZlIGEgbG9hZGVkIGZpbGVcbiAgaWYoIGxvYWRlZEZpbGUgPT0gbnVsbCApIHJldHVybjtcblxuICAvLyBsb2FkIGFwaSBpZiBuZWVkZWRcbiAgaWYoICFfcnRMb2FkZWQgKSB7XG4gICAgZ2FwaS5sb2FkKCdkcml2ZS1yZWFsdGltZScsIGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzZXR1cCBydCBob29rc1xuICAgICAgX3J0TG9hZGVkID0gdHJ1ZTtcbiAgICAgIF9sb2FkUnRGaWxlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICBfbG9hZFJ0RmlsZSgpO1xuICB9XG5cbiAgLy8gc2V0dXAgaW5wdXQgaGFuZGxlcnNcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdmb2N1cycsZnVuY3Rpb24oZSl7XG4gICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgIF9zZXRMb2NhbExvY2soe1xuICAgICAgaWQgICAgICAgIDogZWxlLmF0dHIoXCJpZFwiKSxcbiAgICAgIHZhbHVlICAgICA6IGVsZS52YWwoKSxcbiAgICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICAgIH0pO1xuICB9KTtcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdibHVyJyxmdW5jdGlvbihlKXtcbiAgICBfcmVtb3ZlTG9jYWxMb2NrKCQoZS50YXJnZXQpLmF0dHIoXCJpZFwiKSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIHJldHVybjtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3VwZGF0ZUxvY2FsTG9jayhlbGUuYXR0cihcImlkXCIpLCBlbGUudmFsKCkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldExvY2FsTG9jayhsb2NrKSB7XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIG1hcmsgdGhlIGN1cnJlbnQgbG9ja1xuICBpZiggbGl2ZUVkaXRzLmhhc1tsb2NrLmlkXSApIHJldHVybjtcbiAgbGl2ZUVkaXRzLnNldChsb2NrLmlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2FsTG9jayhpZCwgdmFsKSB7XG4gIHZhciBsb2NrID0ge1xuICAgIGlkIDogaWQsXG4gICAgdmFsdWUgOiB2YWwsXG4gICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICB9XG5cbiAgbGl2ZUVkaXRzLnNldChpZCwgbG9jayk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVMb2NhbExvY2soaWQpIHtcbiAgbGl2ZUVkaXRzLmRlbGV0ZShpZCk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVSZW1vdGVMb2NrKGxvY2spIHtcbiAgJChcIiNcIitsb2NrLmlkKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLnJlbW92ZSgpO1xuICBkZWxldGUgcnRFZGl0c1tsb2NrLmlkXTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnZhbChsb2NrLnZhbHVlKS5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICBpZiggJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikubGVuZ3RoID09IDAgKSB7XG4gICAgJChcIiNcIitsb2NrLmlkKS5wYXJlbnQoKS5hZnRlcihcIjxzcGFuIGlkPSdcIitsb2NrLmlkK1wiLWVkaXRpbmcnIGNsYXNzPSdsYWJlbCBsYWJlbC13YXJuaW5nJz48L3NwYW4+XCIpO1xuICB9XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmh0bWwobG9jay51c2VyKTtcbiAgcnRFZGl0c1tsb2NrLmlkXSA9IGxvY2s7XG59XG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgbGlzdCBvZiByZWFsdGltZSBlZGl0cyBhcyB3ZWxsIGFzIHRoZSBpbnB1dCBVSSBiYXNlZCBvbiB0aGUgcnREb2MgZXZlbnRcbiAqIFRPRE86IHRoaXMgaXMgYSBiaXQgbmFzdHkgcmlnaHQgbm93XG4gKiovXG5mdW5jdGlvbiBfdXBkYXRlUnRFZGl0cyhlKSB7XG4gIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG5cbiAgdmFyIGtleXMgPSBsaXZlRWRpdHMua2V5cygpO1xuXG4gIC8vIHJlbW92ZSBvbGQgdGltZXN0YW1wcyBUT0RPXG4gIC8qZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIG5vdyAtIHZhbHVlc1tpXS50aW1lc3RhbXAgPiAxMDAwICogNjAgKSB7XG4gICAgICBfcmVtb3ZlTG9jayh2YWx1ZXNbaV0pOyAvLyBkb2VzIHRoaXMgZmlyZSB1cGRhdGVzP1xuICAgIH1cbiAgfSovXG5cblxuICAvLyBzZXQgbmV3IGVkaXRzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICBfdXBkYXRlTG9jayhsaXZlRWRpdHMuZ2V0KGtleXNbaV0pKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBvbGQgZWRpdHNcbiAgZm9yKCB2YXIga2V5IGluIHJ0RWRpdHMgKSB7XG4gICAgaWYoIGtleXMuaW5kZXhPZihrZXkpID09IC0xICkge1xuICAgICAgX3JlbW92ZVJlbW90ZUxvY2socnRFZGl0c1trZXldKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqKlxuICogIFNldHVwIHRoZSBydCBob29rcyBmb3IgdGhlIGN1cnJlbnQgZmlsZS4gIFRoZSBhcGkgbmVlZHMgdG8gYWxyZWFkeSBiZSBsb2FkZWRcbiAqKiovXG5mdW5jdGlvbiBfbG9hZFJ0RmlsZSgpIHtcbiAgLy8gZ2V0IHRoZSBydCBkb2NcbiAgZ2FwaS5kcml2ZS5yZWFsdGltZS5sb2FkKGxvYWRlZEZpbGUsXG4gICAgLy8gcnQgZG9jIGxvYWRlZFxuICAgIGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgcnREb2MgPSBmaWxlO1xuXG4gICAgICAvLyBnZXQgb3VyIHJ0IGF0dHJpYnV0ZS4gIFRyaWdnZXJpbmcgY2hhbmdlcyBvbiBydEpzb24gd2lsbCBwdXNoIGV2ZW50c1xuICAgICAgLy8gdG8gYWxsIGxpc3RlbmluZyBjbGllbnRzXG4gICAgICB2YXIganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBqc29uIGF0dHIsIHdlIG5lZWQgdG8gaW5pdGlhbGl6ZSB0aGUgbW9kZWxcbiAgICAgIGlmKCBqc29uID09IG51bGwgfHwgbGl2ZUVkaXRzID09IG51bGwpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBvdXIgcnQgbW9kZWxcbiAgICAgICAgX29uUnRNb2RlbExvYWQoZmlsZS5nZXRNb2RlbCgpKTtcbiAgICAgICAgLy8gZ3JhYiBydCBqc29uIGF0dHIgbm93IHRoYXQgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICAgIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBiYWRuZXNzIGhhcHBlbmVkIDooXG4gICAgICBpZiggIWpzb24gKSByZXR1cm4gY29uc29sZS5sb2coXCJGYWlsZWQgdG8gY29ubmVjdCB0byBydCBqc29uXCIpO1xuICAgICAgLy8gc2V0IHRoYXQgYXR0ciBnbG9iYWwgdG8gY2xhc3NcbiAgICAgIHJ0SnNvbiA9IGpzb247XG5cbiAgICAgIC8vIGdldCBjdXJyZW50IGxpc3Qgb2YgdXNlcnNcbiAgICAgIHZhciB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuXG4gICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aGVuIHBlb3BsZSBjb21lIGFuZCBnb1xuICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9KT0lORUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0xFRlQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBydEpzb24gb2JqZWN0XG4gICAgICAvLyB3aGVuIHRoaXMgdXBkYXRlcywgd2Ugd2FudCB0byByZS1ydW4gdGhlIG1vZGVsXG4gICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9JTlNFUlRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9ERUxFVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuICAgICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxpdmUgZWRpdCB1cGRhdGVzXG4gICAgICAgICAgICAgIGxpdmVFZGl0cy5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlZBTFVFX0NIQU5HRUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgIF91cGRhdGVSdEVkaXRzKGUpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBzaG93IHdobyBpcyBsaXN0ZW5pbmdcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcblxuICAgICAgICAvLyBzZXQgaW5wdXQgaGFuZGxlcnMgZm9yIHJ0IGV2ZW50c1xuICAgIH0sXG4gICAgLy8gbW9kZWwgbG9hZGVkXG4gICAgZnVuY3Rpb24obW9kZWwpe1xuICAgICAgX29uUnRNb2RlbExvYWQobW9kZWwpO1xuICAgIH0sXG4gICAgLy8gZXJyb3JzXG4gICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJUIEVSUk9SUzogXCIpO1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG4gICk7XG59XG5cblxuLyoqKlxuICogVXBkYXRlIHRoZSBkaXNwbGF5IG9mIGFjdGl2ZSB1c2VycyBmb3IgdGhlIG1vZGVsLlxuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycykge1xuICAvLyBpZiBpdCdzIGp1c3QgdXMsIGRvbid0IHNob3cgYW55dGhpbmdcbiAgaWYoICF1c2VycyApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuICBpZiggdXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAvLyB3ZSBvbmx5IHdhbnQgdW5pcXVlIHVzZXJzXG4gIHZhciB1bmlxdWUgPSBbXTtcbiAgdmFyIHV1c2VycyA9IFtdO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1bmlxdWUuaW5kZXhPZih1c2Vyc1tpXS51c2VySWQpID09IC0xICkge1xuICAgICAgdW5pcXVlLnB1c2godXNlcnNbaV0udXNlcklkKTtcbiAgICAgIHV1c2Vycy5wdXNoKHVzZXJzW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYoIHV1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIGFkZCBwaWMgb2YgdXNlciB0byBkaXNwbGF5IHBhbmVsXG4gIHZhciBodG1sID0gXCJBY3RpdmUgVXNlcnMgXCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1dXNlcnNbaV0ucGhvdG9VcmwgKSB7XG4gICAgICBodG1sICs9IFwiPGltZyBzcmM9J1wiK3V1c2Vyc1tpXS5waG90b1VybCtcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgc3R5bGU9J21hcmdpbjowIDVweDt3aWR0aDozMnB4O2hlaWdodDozMnB4JyBjbGFzcz0naW1nLXJvdW5kZWQnIC8+IFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBodG1sICs9IFwiPHNwYW4gc3R5bGU9J3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7bWFyZ2luOjAgNXB4O2JhY2tncm91bmQtY29sb3I6XCIrdXVzZXJzW2ldLmNvbG9yK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyA+PC9zcGFuPiBcIjtcbiAgICB9XG4gIH1cbiAgJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChodG1sKTtcbn1cblxuLyoqKlxuICAgKiAgUmUtcnVuIHRoZSBtb2RlbC4gIEV2ZW50cyBjYW4gY29tZSBpbiBxdWlja2x5IGluIG1hbnkgcGFydHMuICBCdWZmZXIgdGhlIGV2ZW50cyBzbyB3ZSBkb24ndCByZS1ydW4gdGhlIG1vZGVsIHRvbyBtYW55IHRpbWVzLlxuICAgKioqL1xuZnVuY3Rpb24gX3JlcnVuUnQodXNlcnMsIHVzZXJJZCkge1xuICAvLyB0aGlzIGlzIGJhZG5lc3NcbiAgaWYoICFydEpzb24gKSByZXR1cm47XG5cbiAgLy8gY2xlYXIgYW55IHF1ZXVlZCBydW5cbiAgaWYoIF9ydFRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KF9ydFRpbWVyKTtcblxuICAvLyBxdWV1ZSB1cCBhIHJ1biBhbmQgd2FpdCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vIHVwZGF0ZXNcbiAgX3J0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgX3J0VGltZXIgPSAtMTtcblxuICAgIC8vIGZpbmQgdGhlIHVzZXIgd2hvIGlzIHJ1bm5pbmcgdGhlIG1vZGVsIGFuZCBkaXBsYXkgcG9wdXAgb2YgdGhhdCB1c2VycyBpbmZvcm1hdGlvblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdXNlcnNbaV0udXNlcklkID09IHVzZXJJZCApIHtcbiAgICAgICAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZy1vdXRlcicgPjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZycgc3R5bGU9J3dpZHRoOjQwMHB4Jz4gXCIrXG4gICAgICAgICAgICAgICAgKHVzZXJzW2ldLnBob3RvVXJsID8gXCI8aW1nIHNyYz0nXCIrdXNlcnNbaV0ucGhvdG9VcmwrXCInIC8+IFwiIDogXCJcIikrdXNlcnNbaV0uZGlzcGxheU5hbWUrXCIgaXMgdXBkYXRpbmcgdGhlIG1vZGVsLi4uPC9kaXY+PC9kaXY+XCIpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYXBwZW5kKHBhbmVsKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5jc3MoXCJvcGFjaXR5XCIsXCIuOVwiKTtcbiAgICAgICAgICAgIH0sNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMzUwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZSB0aGUgbmV3IG1vZGVsIGRhdGEgYW5kIGxvYWQgaXQgYXMgb3VyIGN1cnJlbnQgc2V0dXBcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocnRKc29uLmdldFRleHQoKSk7XG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAobG9hZGVkRmlsZSwgZGF0YSwgdHJ1ZSk7XG4gIH0sIDMwMCk7XG59XG5cbi8qKipcbiAqIGluaXRpYWxpemUgYSBuZXcgcnQgbW9kZWxcbiAqKiovXG5mdW5jdGlvbiBfb25SdE1vZGVsTG9hZChtb2RlbCkge1xuICAvLyBjdXJyZW50bHkgd2UganVzdCB3YW50IHRvIHVzZSB0aGlzIHNpbmdsZSBhdHRyaWJ1dGUgdG8gYnJvYWRjYXN0IGV2ZW50c1xuICB2YXIganNvbiA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICBpZigganNvbiA9PSBudWxsICkge1xuICAgIHZhciBzdHJpbmcgPSBtb2RlbC5jcmVhdGVTdHJpbmcoXCJ7fVwiKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwianNvblwiLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGxpdmVFZGl0cyA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gIGlmKCBsaXZlRWRpdHMgPT0gbnVsbCApIHtcbiAgICB2YXIgZmllbGQgPSBtb2RlbC5jcmVhdGVNYXAoKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwibGl2ZUVkaXRzXCIsIGZpZWxkKTtcbiAgfVxuXG59XG5cbi8qKipcbiAqIGxldCB0aGUgd29ybGQga25vdyB3aGF0IHdlIGFyZSBkb2luZyA6KVxuICogVGhpcyBzaG91bGQgYmUgY2FsbGVkIHdoZW4gYSBsb2NhbCB1c2VyIHJ1bnMgdGhlIG1vZGVsLiAgSXQgdXBkYXRlcyB0aGUgJ2pzb24nXG4gKiBhdHRyaWJ1dGUgd2hpY2ggaXMgdGhlbiBicm9hZGNhc3QgdG8gYWxsIGxpc3RlbmluZyBwYXJ0aWVzXG4gKioqL1xuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIHJ0SnNvbiApIHJ0SnNvbi5zZXRUZXh0KEpTT04uc3RyaW5naWZ5KCBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCkgKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcbiAgaW5pdFJ0QXBpICA6IGluaXRSdEFwaSxcbiAgc2V0QXBwIDogZnVuY3Rpb24oYXBwbGljYXRpb24pIHtcbiAgICBhcHAgPSBhcHBsaWNhdGlvbjtcbiAgfVxufTtcbiIsInZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG52YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcbnZhciBjaGFydHMgPSByZXF1aXJlKCcuL2NoYXJ0cycpO1xudmFyIHdlYXRoZXJGaWxlUmVhZGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyRmlsZVJlYWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuXG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IG51bGw7XG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxudmFyIFNFVFVQX1RFTVBMQVRFID1cbiAgJzxkaXY+JytcbiAgJzxoND5DaGFydCBPcHRpb25zPC9oND4nK1xuICAnPGRpdj4nK1xuICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlXCI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5PdXRwdXQgdmFyaWFibGUocykgdG8gY2hhcnQgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPiA8YSBpZD1cInNlbGVjdC1jaGFydHMtYnRuXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgQ2hhcnRzPC9hPjwvdGQ+JytcbiAgICAgICAgICAnPC90cj4nK1xuICAgICAgICAgICc8dHI+JytcbiAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cIndpZHRoOjUwJVwiPlZhcmlhdGlvbiBhbmFseXNpcyBwYXJhbWV0ZXIocykgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPjxkaXYgaWQ9XCJ2YXJpYXRpb25BbmFseXNpc1N0YXR1c1wiPk5vbmU8L2Rpdj48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICc8L3RhYmxlPicrXG4gICc8L2Rpdj4nK1xuICAnPGg0PkxvY2F0aW9uPC9oND4nK1xuICAgJzxkaXYgc3R5bGU9XCJib3JkZXItdG9wOjFweCBzb2xpZCAjZGRkO3BhZGRpbmc6OHB4O2hlaWdodDo2MHB4XCI+JytcbiAgICAgJzxzcGFuIGlkPVwiY3VycmVudC1sb2NhdGlvblwiIHN0eWxlPVwiY29sb3I6Izg4OFwiPjwvc3Bhbj4nK1xuICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBzZWxlY3Qtd2VhdGhlci1sb2NhdGlvblwiPjxpIGNsYXNzPVwiaWNvbi1tYXAtbWFya2VyXCI+PC9pPiBTZWxlY3QgTG9jYXRpb248L2E+JytcbiAgICAgJzwvZGl2PicrXG4gICAgICc8ZGl2Pic7XG5cbnZhciBHT09MRURSSVZFX1RSRUVfVEVNUExBVEUgPVxuICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTVweCAwIDVweCAwO21hcmdpbi1ib3R0b206NXB4O2hlaWdodDogNTBweFwiPicrXG4gICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgcHVsbC1yaWdodFwiIGlkPVwidHJlZS1zdWItbWVudVwiPicrXG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPicrXG4gICAgICAgICc8c3BhbiBpZD1cImxvYWRlZC10cmVlLW5hbWVcIj5EZWZhdWx0IFRyZWU8L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JytcbiAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS10cmVlLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLWxlZnQ6MTBweFwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAnPC91bD4nK1xuICAnPC9kaXY+JytcbiAgJzxkaXYgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjb21wYXJlLXRyZWVzXCIgLz4gQ29tcGFyZSBUcmVlczwvZGl2PicrXG4nPC9kaXY+JztcblxudmFyIElOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICc8aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInt7aWR9fVwiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cInt7dmFsdWV9fVwiPiZuYnNwOyZuYnNwO3t7dW5pdHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+JztcblxudmFyIEFSUkFZX0lOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJjb2wtbGctNlwiPjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICd7e2lucHV0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj48L2Rpdj4nO1xuXG52YXIgdGFiSGVhZGVyID0gJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cImlucHV0X3BpbGxzXCI+JztcbnZhciBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJwaWxsLWNvbnRlbnRcIj4nO1xuXG52YXIgdHJlZUhlYWRlciA9ICc8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIiBpZD1cInRyZWUtYWNjb3JkaW9uXCI+JztcbnZhciBUUkVFX1BBTkVMX1RFTVBMQVRFID0gJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+JytcbiAgICAgICAgICAgICc8aDQgY2xhc3M9XCJwYW5lbC10aXRsZVwiPicrXG4gICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYWNjb3JkaW9uLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiN0cmVlLWFjY29yZGlvblwiIGhyZWY9XCIjY29sbGFwc2V7e2lkfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAne3t0aXRsZX19JytcbiAgICAgICAgICAgICAgICAnPC9hPicrXG4gICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjb2xsYXBzZXt7aWR9fVwiIGNsYXNzPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+e3tib2R5fX08L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgJzwvZGl2Pic7XG5cbnZhciBpbnB1dHMgPSB7fTtcblxuLy8gZm9yIHdlYXRoZXIgZGF0YVxudmFyIGNvbHMgPSBbXTtcblxudmFyIG1hcCA9IG51bGw7XG5cbi8qKlxuICogT3B0aW9ucyA6XG4gKiAgIG1vZGVsIC0gdHlwZSBvZiBtb2RlbCB0byBhcHBlbmQgdG9cbiAqICAgbGFiZWwgLSBhdHRyaWJ1dGUgbGFiZWxcbiAqICAgdmFsdWUgLSBkZWZhdWx0IHZhbHVlXG4gKiAgIGRlc2NyaXB0aW9uIC0gZGVzY3JpcHRpb24gb2YgYXR0cmlidXRlXG4gKiAgIHVuaXRzIC0gYXR0cmlidXRlIHVuaXRzXG4gKi9cbmZ1bmN0aW9uIF9hZGRJbnB1dChvcHRpb25zKSB7XG4gIGlmKCAhaW5wdXRzW29wdGlvbnMubW9kZWxdICkgaW5wdXRzW29wdGlvbnMubW9kZWxdID0gW107XG4gIGlucHV0c1tvcHRpb25zLm1vZGVsXS5wdXNoKG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlV2VhdGhlcklucHV0cygpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgdmFyIHRhYmxlID0gJzxkaXYgc3R5bGU9XCJwYWRkaW5nLXRvcDoyNXB4XCI+PGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodFwiIGlkPVwibG9hZC13ZWF0aGVyLWJ0blwiPjxpIGNsYXNzPVwiaWNvbi11cGxvYWQtYWx0XCI+PC9pPiBVcGxvYWQ8L2E+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBpZD1cIndlYXRoZXItaW5wdXQtdG9nZ2xlXCI+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+QXZlcmFnZXM8L2J1dHRvbj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkFjdHVhbDwvYnV0dG9uPicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1wYW5lbFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi10b3A6MjBweFwiPjwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLXBhbmVsXCI+JytcbiAgICAgICAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjEwcHg7Y29sb3I6Izg4OFwiPlNlbGVjdCBsb2NhdGlvbiB0byBzZXQgdGhlIGF2ZXJhZ2Ugd2VhdGhlciBkYXRhPC9kaXY+JytcbiAgICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkIHdlYXRoZXItdGFibGVcIiBzdHlsZT1cIm1hcmdpbi10b3A6MjBweFwiPic7XG5cbiAgdGFibGUgKz0gXCI8dHI+XCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICB0YWJsZSArPSBcIjx0ZD5cIitjb2xzW2ldK1wiPC90ZD5cIjtcbiAgfVxuICB0YWJsZSArPSBcIjwvdHI+XCI7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgICBmb3IoIHZhciBqID0gMDsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIisoaSsxKStcIjwvdGQ+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2Zvcm0tY29udHJvbCcgaWQ9J2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittK1wiJyB0eXBlPSd0ZXh0JyAvPjwvdGQ+XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgfVxuICByZXR1cm4gdGFibGUrJzwvdGFibGU+PGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1jaGFydFwiPjwvZGl2PjwvZGl2Pic7XG5cbn1cblxuZnVuY3Rpb24gX3NldFdlYXRoZXJEYXRhKCkge1xuICB2YXIgbGwgPSBhcHAucXMoXCJsbFwiKTtcbiAgaWYoIGxsICkge1xuICAgIGxsID0gbGwuc3BsaXQoXCIsXCIpO1xuICAgIF9xdWVyeVdlYXRoZXJEYXRhKGxsWzBdLCBsbFsxXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKFwiTm90IFNldFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcXVlcnlXZWF0aGVyRGF0YShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnd2VhdGhlci1kYXRhLXF1ZXJ5JywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgICBmb3IoIHZhciBqID0gMTsgaiA8IHRhYmxlLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20pLnZhbCh0YWJsZS5yb3dzW2ldLmNbal0gPyB0YWJsZS5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgZXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdGFibGUucm93c1swXSA9PSBudWxsICkge1xuICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgIGFsZXJ0KFwiSW52YWxpZCBsb2NhdGlvbiBzZWxlY3RlZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgPSB0YWJsZS5jb2xzW2ldLmlkO1xuICAgICAgaWYoIGtleSA9PT0gJ21heGF3cycgKSBrZXkgPSAnbWF4QVdTJztcblxuICAgICAgJChcIiNpbnB1dC1zb2lsLVwiK2tleSkudmFsKHRhYmxlLnJvd3NbMF0uY1tpXS52KTtcbiAgICB9XG5cbiAgICBpZiggIWVycm9yICkgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKGxuZytcIiwgXCIrbGF0K1wiIDxhIGhyZWY9J1wiK3dpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKi8sJycpK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI/bGw9XCIrbG5nK1wiLFwiK2xhdCtcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT48L2E+XCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdmVyYWdlQ2hhcnQoKSB7XG4gIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIHZhciB2YWwgPSAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittKS52YWwoKTtcbiAgICAgIGlmKCB2YWwgJiYgdmFsLmxlbmd0aCA+IDAgKSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXVtjb2xzW2pdXSA9IHBhcnNlSW50KHZhbCk7XG4gICAgICBlbHNlIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dW2NvbHNbal1dID0gMDtcbiAgICB9XG4gIH1cbiAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24oKSB7XG4gIGlmKCAhbWFwICkge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoe30pO1xuXG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLm9uKCdjbGljaycsIF9nZXRMb2NhdGlvbik7XG5cblxuICAgIC8vIHdhaXQgZm9yIHRoZSBtb2RhbCB0byBpbml0XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuXG4gICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKCQoXCIjZ21hcFwiKVswXSwge1xuICAgICAgICBjZW50ZXIgOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDM1LCAtMTIxKSxcbiAgICAgICAgem9vbTogNSxcbiAgICAgICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZGVmYXVsdFN0eWxlID0ge1xuICAgICAgICAgICAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3IgICA6IFwiIzAwMDBGRlwiLFxuICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5IDogMC41LFxuICAgICAgICAgICAgICBmaWxsQ29sb3IgICAgIDogJyNGRUZFRkUnLFxuICAgICAgICAgICAgICBmaWxsT3BhY2l0eSAgIDogMC4yXG4gICAgICAgICAgICB9LFxuICAgICAgfTtcblxuXG4gICAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIHNlbGVjdDogJ2JvdW5kYXJ5JyxcbiAgICAgICAgICAgIGZyb206ICcxaFY5dlFHM1NjMEpMUGR1RnBXSnp0ZkxLLWV4NmNjeU1nX3B0RV9zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGVzOiBbZGVmYXVsdFN0eWxlXSxcbiAgICAgICAgICBzdXBwcmVzc0luZm9XaW5kb3dzIDogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgdmFyIGZ1c2lvbkxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkZ1c2lvblRhYmxlc0xheWVyKGRlZmF1bHRPcHRpb25zKTtcbiAgICAgIGZ1c2lvbkxheWVyLm9wYWNpdHkgPSAuODtcbiAgICAgIGZ1c2lvbkxheWVyLnNldE1hcChtYXApO1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIGFsZXJ0KCdZb3UgbXVzdCBjbGljayBvbiBhIGdlb21ldHJ5IHRvIGNhY2hlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihmdXNpb25MYXllciwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgb2ZmbGluZS5jYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXR1cCBpbnB1dCBmb3IgY2xlYXJpbmcgY2FjaGVcbiAgICAgICAgICAkKCcjY2xlYXItY2FjaGVkLXRpbGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgb2ZmbGluZS5jbGVhckNhY2hlKCk7XG4gICAgICAgICAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG5cbiAgICB9LDUwMCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgLy8gd2Ugc2VlbSB0byBiZSBoYW5naW5nIHNvbWV0aW1lcy4uLi5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgXCJyZXNpemVcIik7XG4gICAgfSwgNTAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0TG9jYXRpb24oKSB7XG4gIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHNob3dQb3NpdGlvbik7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLmFkZENsYXNzKFwiYnRuLXdhcm5pbmdcIik7XG4gIH0gZWxzZXtcbiAgICB3aW5kb3cuYWxlcnQoXCJHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci5cIik7XG4gIH1cbiAgZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwiYnRuLXdhcm5cIikuYWRkQ2xhc3MoXCJidG4tc3VjY2Vzc1wiKTtcbiAgICBtYXAuc2V0Wm9vbSgxMCk7XG4gICAgbWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkpO1xuICAgIC8vX3F1ZXJ5V2VhdGhlckRhdGEocG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVJbnB1dHMoaSwgdHlwZSwgcHJlZml4LCBuYW1lLCBhdHRycykge1xuICB2YXIgaWQgPSBwcmVmaXgubGVuZ3RoID4gMCA/IHByZWZpeCsnLScrbmFtZSA6ICdpbnB1dC0nK25hbWU7XG4gIHZhciBpbnB1dCA9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6JysoaSoyMCkrJ3B4O21hcmdpbi10b3A6MHB4O21hcmdpbi1yaWdodDo1cHhcIj4nO1xuXG4gIHZhciB0cmVlYm9keSA9IFwiXCI7XG5cbiAgaWYoICEoaSA9PSAxKSApIHtcbiAgICAgIGlmKCBpICE9IDAgKSBpbnB1dCArPSAnPGxhYmVsIGZvcj1cIicraWQrJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPicrbmFtZSArJzwvbGFiZWw+JztcbiAgICAgIGlucHV0ICs9ICc8ZGl2Pic7XG4gIH1cblxuXG4gICAgICBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyAmJiBpID09IDEgICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgdHJlZWJvZHkgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgKSB7XG4gICAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICBpbnB1dCArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoICh0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnKSAmJiBpID09IDEgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuXG4gICAgICB0cmVlYm9keSArPVxuICAgICAgICAgICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnK1xuICAgICAgICAgICh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZSsnXCIgaWQ9XCInK1xuICAgICAgICAgIGlkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgfSBlbHNlIGlmICggIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgKSB7XG5cbiAgICBpbnB1dCArPSAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJ1xuICAgICAgICAgICsodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrXG4gICAgICAgICAgICdcIiBpZD1cIicraWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gIH1cblxuICBpZiggIShpID09IDEgLyomJiB0eXBlID09ICd0cmVlJyovKSApIHtcbiAgICAgIGlucHV0ICs9ICc8L2Rpdj48L2Rpdj4nO1xuICB9IGVsc2Uge1xuICAgICAgaW5wdXQgKz0gVFJFRV9QQU5FTF9URU1QTEFURVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7aWR9fS9nLGlkKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7dGl0bGV9fScsbmFtZStcIiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4ODtmb250LXNpemU6MTJweCc+IC0gXCIrYXR0cnMuZGVzY3JpcHRpb24rXCI8L3NwYW4+XCIpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tib2R5fX0nLHRyZWVib2R5KSsnPC9kaXY+J1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoZWxlKSB7XG4gIHdlYXRoZXJGaWxlUmVhZGVyLmluaXQoKTtcbiAgdmFyIG1vZGVsLCBtLCBhdHRyLCBjb25maWc7XG5cbiAgdmFyIGlucHV0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKSk7XG5cbiAgaW5wdXRzWydzZXR1cCddID0ge307XG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIG0gPSBpbnB1dHNbbW9kZWxdO1xuICAgIGZvciggYXR0ciBpbiBtICkge1xuICAgICAgY29uZmlnID0gbVthdHRyXTtcblxuICAgICAgaWYoIHR5cGVvZiBjb25maWcgPT0gJ29iamVjdCcgKSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHIsXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBjb25maWcuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdmFsdWUgICAgICAgOiBjb25maWcudmFsdWUsXG4gICAgICAgICAgdW5pdHMgICAgICAgOiBjb25maWcudW5pdHNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgaWYoIG1vZGVsID09IFwicGxhbnRhdGlvbl9zdGF0ZVwiICkgY29udGludWU7XG5cbiAgICB0YWJIZWFkZXIgKz0gJzxsaT48YSBocmVmPVwiI2lucHV0c18nK21vZGVsKydcIiBpZD1cInRhYl9pbnB1dHNfJyttb2RlbCsnXCIgZGF0YS10b2dnbGU9XCJwaWxsXCI+J1xuICAgICAgICAgICAgICAgICttb2RlbC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpK21vZGVsLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKyc8L2E+PC9saT4nO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaW5wdXRzW21vZGVsXTtcblxuICAgIGNvbnRlbnQgKz0gJyA8ZGl2IGNsYXNzPVwicGlsbC1wYW5lXCIgaWQ9XCJpbnB1dHNfJyttb2RlbCsnXCI+JztcblxuICAgIHZhciByb3cxID0gXCJcIjtcbiAgICB2YXIgcm93MiA9IFwiPGRpdiBjbGFzcz0nY29sLWxnLTY+XCI7XG5cbiAgICBpZiggbW9kZWwgPT0gJ3dlYXRoZXInICkge1xuICAgICAgY29udGVudCArPSBfY3JlYXRlV2VhdGhlcklucHV0cygpO1xuICAgIH0gZWxzZSBpZiggbW9kZWwgPT0gJ3NldHVwJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gU0VUVVBfVEVNUExBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCArPSB0cmVlSGVhZGVyO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgZ29vZ2xlIGRyaXZlIGJ0biBmcm9tIHRyZWVzXG4gICAgICAgIGlmKCBtb2RlbCA9PSd0cmVlJyApIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gICAgICAgIH1cblxuICAgICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgICB9XG5cblxuICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIH1cbiAgY29udGVudCArPSAnPC9kaXY+JztcbiAgdGFiSGVhZGVyICs9IFwiPC91bD5cIjtcblxuICBlbGUuaHRtbCh0YWJIZWFkZXIrXCI8ZGl2IGNsYXNzPSdmb3JtLWhvcml6b250YWwnPlwiK2NvbnRlbnQrXCI8L2Rpdj5cIik7XG5cbiAgLy8gcnVuIHRoZSBtb2RlbCB3aGVuZXZlciBzb21lIGhpdHMgJ2VudGVyJ1xuICBlbGUuZmluZCgnaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgYXBwLnJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBsb2FkaW5nIGEgdHJlZVxuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd0xvYWRUcmVlUGFuZWwoKTtcbiAgfSk7XG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtc2F2ZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93U2F2ZVRyZWVQYW5lbCgpO1xuICB9KTtcblxuICAvLyBzZXQgdHJlZSBpbnB1dCBoYW5kbGVyc1xuICAkKFwiI2NvbXBhcmUtdHJlZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiggJCh0aGlzKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzZXQgcGlsbCBjbGljayBoYW5kbGVyc1xuICAkKCcjaW5wdXRfdGFicyBhJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgJCh0aGlzKS50YWIoJ3Nob3cnKVxuICB9KTtcbiAgJCgnI3RhYl9pbnB1dHNfd2VhdGhlcicpLnRhYignc2hvdycpO1xuXG4gICQoJy5zZWxlY3Qtd2VhdGhlci1sb2NhdGlvbicpLm9uKCdjbGljaycsIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24pO1xuXG5cbiAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuICAkKCcjbG9hZC13ZWF0aGVyLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAkKFwiI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0bi5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICBpZiggJCh0aGlzKS5odG1sKCkgPT0gJ0F2ZXJhZ2VzJyApIHtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5zZXRXZWF0aGVyKCk7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmKCB3ZWF0aGVyQXZlcmFnZUNoYXJ0ICl7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIF9zZXRXZWF0aGVyRGF0YSgpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpIHtcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURTtcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwic2luZ2xlLXRyZWUtY29udGVudFwiPic7XG4gIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJjb21wYXJlLXRyZWUtY29udGVudFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgJzx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiPicrXG4gICAgICAgICAgJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjdHJlZTFcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMTwvYT48L2xpPicrXG4gICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCIjdHJlZTJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMjwvYT48L2xpPicrXG4gICAgICAgICc8L3VsPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUxXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDEnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMlwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCIgPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MicsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgJzwvZGl2Pic7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cblxucmV0dXJuIHtcbiAgY3JlYXRlIDogY3JlYXRlLFxuICB1cGRhdGVBdmVyYWdlQ2hhcnQ6IHVwZGF0ZUF2ZXJhZ2VDaGFydFxufTtcblxufTtcbiIsIi8vIFNwZWNpYWwgU2F1Y2UuLi5cbi8vIGJhc2ljYWxseSB0aGUgY29kZSBsb2FkZWQgZnJvbSBHaXRIdWIgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHRvIGV4aXN0cyBpbiB0aGUgd2luZG93IHNjb3BlXG4vLyAgIG0zUEdJT1xuLy8gICAgIC0gcmVhZEFsbENvbnRhbnRzXG4vLyAgICAgLSByZWFkV2VhdGhlclxuLy8gICAgIC0gZHVtcFxuLy8gICAgIC0gcmVhZEZyb21JbnB1dHNcbi8vIFNvIHdlIGluamVjdCBmdW5jdGlvbnMgdGhhdCBpbnRlcmFjdCB3LyBvdXIgVUksIG1vZGVsIGluIG5vIHdheSBjYXJlc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIG1vZGVsLmRlYnVnID0gdHJ1ZTtcblxuICAgIGlmKCAhbW9kZWwucGxhbnRhdGlvbiApIG1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICB0aGlzLnJlYWRBbGxDb25zdGFudHMobW9kZWwucGxhbnRhdGlvbik7XG5cbiAgICBpZiggIW1vZGVsLndlYXRoZXIgKSBtb2RlbC53ZWF0aGVyID0ge307XG4gICAgaWYoICFtb2RlbC5tYW5hZ2UgKSBtb2RlbC5tYW5hZ2UgPSB7fTtcbiAgICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICAgIHRoaXMucmVhZFdlYXRoZXIobW9kZWwud2VhdGhlciwgbW9kZWwubWFuYWdlLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG5cbiAgICBkZWxldGUgdGhpcy5tb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzO1xuICB9LFxuICByZWFkQWxsQ29uc3RhbnRzIDogZnVuY3Rpb24ocGxhbnRhdGlvbikge1xuICAgICAgdGhpcy5yZWFkRnJvbUlucHV0cygpO1xuXG4gICAgICAvL2ZvciAoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC5wbGFudGF0aW9uKSB7XG4gICAgICAvLyAgICBwbGFudGF0aW9uW2tleV0gPSB0aGlzLm1vZGVsLnBsYW50YXRpb25ba2V5XTtcbiAgICAgIC8vfVxuXG4gICAgICBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZSA9IHRoaXMubW9kZWwudHJlZTtcblxuICAgICAgLy8gc2V0dXAgc2VlZGxpbmcgVHJlZVxuICAgICAgLy8gVE9ETzogaGFyZGNvZGVkIGZvciBub3csIHRoaXMgc2hvdWxkbid0IGJlXG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLm1vZGVsLnRyZWUpO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUuc3RlbXNQZXJTdHVtcCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5wZnMuc3RlbUNudCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5yb290UCA9IHtcbiAgICAgICAgICBMQUlUYXJnZXQgOiAxMCxcbiAgICAgICAgICBlZmZpY2llbmN5IDogMC42LFxuICAgICAgICAgIGZyYWMgOiAwLjAxXG4gICAgICB9O1xuICB9LFxuXG4gIHJlYWRXZWF0aGVyIDogZnVuY3Rpb24od2VhdGhlck1hcCwgbWFuYWdlLCBjdXN0b21XZWF0aGVyTWFwKSB7XG4gICAgICB2YXIgZGF0ZVBsYW50ZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcbiAgICAgIGlmIChkYXRlUGxhbnRlZCAmJiBkYXRlUGxhbnRlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVQbGFudGVkID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0ZUNvcHBpY2VkID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUNvcHBpY2VkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVDb3BwaWNlZCAmJiBkYXRlQ29wcGljZWQgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5kYXRlQ29wcGljZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIHNldCBlcnJvciBjb25kaXRpb24gOiBUT0RPXG4gICAgICB9XG5cbiAgICAgIHZhciBEYXRlRmluYWxIYXJ2ZXN0ID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKTtcbiAgICAgIGlmIChEYXRlRmluYWxIYXJ2ZXN0ICYmIERhdGVGaW5hbEhhcnZlc3QgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5EYXRlRmluYWxIYXJ2ZXN0ID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIHllYXJzUGVyQ29wcGljZSA9ICQoXCIjaW5wdXQtbWFuYWdlLWNvcHBpY2VJbnRlcnZhbFwiKS52YWwoKTtcbiAgICAgIGlmICh5ZWFyc1BlckNvcHBpY2UgJiYgeWVhcnNQZXJDb3BwaWNlICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UueWVhcnNQZXJDb3BwaWNlID0gcGFyc2VJbnQoJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpKTtcbiAgICAgIH1cblxuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgIG1vbnRoIDogKGkgKyAxKVxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICAgICAgICBpZiggbS5sZW5ndGggPT09IDEgKSBtID0gJzAnK207XG5cbiAgICAgICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCB0aGlzLmFwcC5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICB2YXIgYyA9IHRoaXMuYXBwLmlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgICAgICBpdGVtW2NdID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW0ubnJlbCA9IGl0ZW0ucmFkIC8gMC4wMDM2O1xuXG4gICAgICAgICAgd2VhdGhlck1hcFttXSA9IGl0ZW07XG4gICAgICB9XG5cbiAgICAgIGlmKCB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGZvciggdmFyIGRhdGUgaW4gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5ucmVsID0gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5yYWQgLyAwLjAwMzY7XG4gICAgICAgICAgICAgIC8vY3VzdG9tV2VhdGhlck1hcFtkYXRlXSA9IGN1c3RvbV93ZWF0aGVyW2RhdGVdO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3ZWF0aGVyTWFwO1xuICB9LFxuICBkdW1wIDogZnVuY3Rpb24ocm93cywgc2hlZXQpIHtcbiAgICAgIC8vIHNldCB0aGUgcmF3IG91dHB1dFxuICAgICAgdGhpcy5hcHAucnVuQ29tcGxldGUocm93cyk7XG4gIH0sXG5cbiAgLy8gcmVhZCBhIHZhbHVlIGZyb20gdGhlIGlucHV0XG4gIC8vIGl0IGhhcyBhICcsJyBpcyBzZXQgZm9yIHZhcmlhdGlvblxuICBfcmVhZFZhbCA6IGZ1bmN0aW9uKGVsZSkge1xuICAgICAgdmFyIHZhbCA9IGVsZS52YWwoKTtcbiAgICAgIGlmKCB2YWwubWF0Y2goL1xcZCotXFxkKi1cXGQqJC8pICkge1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9IGVsc2UgaWYoIHZhbC5tYXRjaCgvLiosLiovKSApIHtcbiAgICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxzL2csJycpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICB2YXIgaWQgPSBlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoL15pbnB1dC0vLCcnKS5yZXBsYWNlKC8tL2csJy4nKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF0ucHVzaChwYXJzZUZsb2F0KHZhbFtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCk7XG4gIH0sXG5cbiAgcmVhZEZyb21JbnB1dHMgOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJlYWQgc29pbFxuICAgICAgdGhpcy5tb2RlbC5zb2lsID0ge307XG4gICAgICB0aGlzLm1vZGVsLnNvaWwubWF4QVdTID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtbWF4QVdTXCIpKTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5zd3Bvd2VyID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3dwb3dlclwiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3djb25zdCA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3Y29uc3RcIikpO1xuXG4gICAgICAvLyByZWFkIG1hbmFnZVxuICAgICAgdGhpcy5tb2RlbC5tYW5hZ2UgPSB7XG4gICAgICAgICAgY29wcGljZSA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIGVsZXMgPSAkKFwiLm1hbmFnZVwiKTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJChlbGVzW2ldKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLm1hbmFnZVtlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1tYW5hZ2UtXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uXG4gICAgICBpZiggIXRoaXMubW9kZWwucGxhbnRhdGlvbiApIHRoaXMubW9kZWwucGxhbnRhdGlvbiA9IHt9O1xuICAgICAgZWxlcyA9ICQoXCIucGxhbnRhdGlvblwiKTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJChlbGVzW2ldKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25bZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtcGxhbnRhdGlvbi1cIiwgXCJcIildID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHRyZWVcbiAgICAgIHZhciB0cmVlSW5wdXRzID0gJChcIi50cmVlXCIpO1xuICAgICAgdGhpcy5tb2RlbC50cmVlID0ge307XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0cmVlSW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQodHJlZUlucHV0c1tpXSk7XG5cbiAgICAgICAgICB2YXIgcGFydHMgPSBlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC10cmVlLVwiLCBcIlwiKS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dKVxuICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSA9IHt9O1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dW3BhcnRzWzFdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvbiBzdGF0ZVxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUgKSB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC5nZXREYXRhTW9kZWwoKS5wbGFudGF0aW9uX3N0YXRlLnZhbHVlICkge1xuICAgICAgICAgIHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZVtrZXldID0gLTE7XG4gICAgICB9XG5cbiAgfSxcbiAgZXhwb3J0U2V0dXAgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9ucyA9IHt9O1xuICAgICAgdGhpcy5yZWFkRnJvbUlucHV0cygpO1xuICAgICAgdGhpcy5yZWFkV2VhdGhlcihbXSwge30sIHt9KTtcblxuICAgICAgdmFyIGV4ID0ge1xuICAgICAgICAgIHdlYXRoZXIgOiB0aGlzLm1vZGVsLndlYXRoZXIsXG4gICAgICAgICAgY3VzdG9tX3dlYXRoZXIgOiB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyLFxuICAgICAgICAgIHRyZWUgOiB0aGlzLm1vZGVsLnRyZWUsXG4gICAgICAgICAgcGxhbnRhdGlvbiA6IHRoaXMubW9kZWwucGxhbnRhdGlvbixcbiAgICAgICAgICBtYW5hZ2UgOiB0aGlzLm1vZGVsLm1hbmFnZSxcbiAgICAgICAgICBzb2lsIDogdGhpcy5tb2RlbC5zb2lsLFxuICAgICAgICAgIG1hbmFnZSA6IHRoaXMubW9kZWwubWFuYWdlLFxuICAgICAgICAgIHBsYW50YXRpb25fc3RhdGUgOiB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUsXG4gICAgICAgICAgY29uZmlnIDoge1xuICAgICAgICAgICAgICBjaGFydFR5cGVJbnB1dCA6ICQoXCIjY2hhcnRUeXBlSW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICAgIG1vbnRoc1RvUnVuIDogdGhpcy5hcHAubW9udGhzVG9SdW4oKSxcbiAgICAgICAgICAgICAgY3VycmVudExvY2F0aW9uIDogJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgbG9hZGVkVHJlZSA6ICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKCksXG4gICAgICAgICAgICAgIHZlcnNpb24gOiB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgPyB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgOiBcIm1hc3RlclwiXG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBieSBkZWZhdWx0IHRoZSByZWFkIGZ1bmN0aW9uIHNldCB0aGUgdmFyaWF0aW9ucyB2YXJpYWJsZXMgYnV0IG9ubHlcbiAgICAgIC8vIHJldHVybnMgdGhlIGZpcnN0LCBzZXQgdGhlIHZhcmlhdGlvbiBwYXJhbXMgdG8gdGhlaXIgY29ycmVjdCB2YWx1ZXNcbiAgICAgIGZvciggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICB2YXIgcGFyYW0gPSBleDtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aC0xOyBpKysgKSB7XG4gICAgICAgICAgICAgIHBhcmFtID0gcGFyYW1bcGFydHNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbVtwYXJ0c1twYXJ0cy5sZW5ndGgtMV1dID0gdGhpcy5tb2RlbC52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXg7XG4gIH0sXG4gIGxvYWRUcmVlIDogZnVuY3Rpb24odHJlZSkge1xuICAgICAgZm9yICggdmFyIHJvb3RLZXkgaW4gdHJlZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdHJlZVtyb290S2V5XSAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5KS52YWwodHJlZVtyb290S2V5XSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9yICggdmFyIGNoaWxkS2V5IGluIHRyZWVbcm9vdEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkgKyBcIi1cIiArIGNoaWxkS2V5KS52YWwodHJlZVtyb290S2V5XVtjaGlsZEtleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9LFxuICBsb2FkU2V0dXAgOiBmdW5jdGlvbihmaWxlaWQsIHNldHVwLCBpc1J0KSB7XG5cbiAgICAgIC8vIGxvYWQgY29uZmlnXG4gICAgICBpZiAoc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0KSB7XG4gICAgICAgICAgdGhpcy5jaGFydHMudW5zZWxlY3RBbGwoKTtcbiAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5jaGFydHMuc2VsZWN0KHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jdXJyZW50TG9jYXRpb24pIHtcbiAgICAgICAgICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmKCBzZXR1cC5jb25maWcubG9hZGVkVHJlZSApIHtcbiAgICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChzZXR1cC5jb25maWcubG9hZGVkVHJlZSkucGFyZW50KCkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBsb2FkIHdlYXRoZXJcbiAgICAgIGlmKCBBcnJheS5pc0FycmF5KHNldHVwLndlYXRoZXIpICkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC53ZWF0aGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoIHZhciBpIGluIHNldHVwLndlYXRoZXIgKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSBzZXR1cC5jdXN0b21fd2VhdGhlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIGNoYXJ0XG4gICAgICB0aGlzLmlucHV0Rm9ybS51cGRhdGVBdmVyYWdlQ2hhcnQoKTtcblxuICAgICAgLy8gbG9hZCB0cmVlXG4gICAgICB0aGlzLmxvYWRUcmVlKHNldHVwLnRyZWUpO1xuXG4gICAgICAvLyBsb2FkIHBsYW50aW5nIHBhcmFtc1xuICAgICAgLy8gTm93IHBhcnQgb2YgbWFuYWdlLi4uLlxuICAgICAgLy8gZm9cbiAgICAgIGlmIChzZXR1cC5tYW5hZ2UpIHtcbiAgICAgICAgICB2YXIgbWFwID0ge1xuICAgICAgICAgICAgICBcImRhdGVQbGFudGVkXCIgOiBcIkRhdGVQbGFudGVkXCIsXG4gICAgICAgICAgICAgIFwiZGF0ZUNvcHBpY2VkXCIgOiBcIkRhdGVDb3BwaWNlZFwiLFxuICAgICAgICAgICAgICBcInllYXJzUGVyQ29wcGljZVwiIDogXCJDb3BwaWNlSW50ZXJ2YWxcIlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAubWFuYWdlKSB7XG4gICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGlmKCBtYXBba2V5XSApIG5ld0tleSA9IG1hcFtrZXldO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dXAubWFuYWdlW2tleV0gPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLm1hbmFnZVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAubWFuYWdlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyB2YWx1ZSBpcyBkZXByZWNhdGVkLCBzZXQgdG8gbmV3IGlucHV0XG4gICAgICBpZiggc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuICkge1xuICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2V0dXAubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAgICAgICBkID0gbmV3IERhdGUobmV3IERhdGUoZCkuc2V0TW9udGgoZC5nZXRNb250aCgpK3BhcnNlSW50KHNldHVwLmNvbmZpZy5tb250aHNUb1J1bikpKTtcbiAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChkLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBsb2FkIHJlc3RcbiAgICAgIHZhciBpbnB1dHMgPSBbIFwicGxhbnRhdGlvblwiLCBcInNvaWxcIiwgXCJtYW5hZ2VcIiBdO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cFtpbnB1dHNbaV1dKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21heEFXUycpIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtc29pbC1tYXhBV1NcIikudmFsKHNldHVwLnNvaWwubWF4QVdTKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHNldHVwW2lucHV0c1tpXV1ba2V5XSA9PSAnc3RyaW5nJyAmJiBzZXR1cFtpbnB1dHNbaV1dW2tleV0ubWF0Y2goLy4qVC4qWiQvKSApIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnJ1bk1vZGVsKGlzUnQpO1xuICB9XG59O1xuIiwiXG4gIC8vIG11c3QgaW5zdGFsbCB0aGlzIGZvciBuYXRpdmUgcGhvbmVnYXAgc3VwcG9ydDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bob25lZ2FwLWJ1aWxkL0NoaWxkQnJvd3NlclxuXG52YXIgd2luID0gbnVsbDtcblxuLyogdGhlIGtleSBmb3IgcmVmcmVzaCBUb2tlbiBpbiBsb2NhbCBTdG9yYWdlICovXG52YXIgdG9rZW5LZXkgPSAncmVmcmVzaF90b2tlbic7XG5cbi8qIHN0b3JlcyB0aGUgYWNjZXNzVG9rZW4gYWZ0ZXIgcmV0cmlldmFsIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuID0gbnVsbDtcblxuLyogc3RvcmVzIHRoZSBUaW1lIHdoZW4gYWNjZXNzIHRva2VuIHdhcyBsYXN0IHJlY2VpdmVkIGZyb20gc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW5UaW1lID0gbnVsbDtcblxuLyogc3RvcmVzIGFjY2VzcyBUb2tlbidzIEV4cGlyeSBMaW1pdC4gVXNlcyA1OCBtaW4uIGluc3RlYWQgb2YgNjAgbWluLiAqL1xudmFyIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQgPSA1OCAqIDYwICogMTAwMDtcblxuLyogQSB0ZW1wb3JhcnkgdmFyaWFibGUgc3RvcmluZyBjYWxsYmFjayBmdW5jdGlvbiAqL1xudmFyIGNhbGxiYWNrRnVuYyA9IGZhbHNlO1xuXG4vLyBhcmUgd2UgcnVubmluZyBuYXRpdmUgb3IgYnJvd3NlciBtb2RlP1xudmFyIGlzTmF0aXZlID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goL15maWxlLiovKSA/IHRydWUgOiBmYWxzZTtcblxudmFyIENMSUVOVF9JRCA9IGlzTmF0aXZlID9cbiAgICAgICAgXCIzNDQxOTA3MTM0NjUtZGlpbXRmZXJoNHRqYjAzMTY5YmtsOW1rb3F2cTJydTkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIiA6XG4gICAgICAgICBcIjM0NDE5MDcxMzQ2NS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiO1xuXG52YXIgQVBQX0lEID0gXCIzNDQxOTA3MTM0NjVcIjtcblxudmFyIE9BVVRIX1NDT1BFUyA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmZpbGUgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmluc3RhbGwgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnO1xuXG4vKiBjb25maWcgdmFsdWVzIGZvciBHb29nbGUgQVBJIChnYXBpKSAqL1xudmFyIGdhcGlDb25maWcgPSB7XG4gIGVuZHBvaW50OiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoXCIsXG4gIGVuZHRva2VuOiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi90b2tlblwiLCAvLyB0b2tlbiBlbmRwb2ludFxuICByZWRpcmVjdF91cmkgOiBcImh0dHA6Ly9sb2NhbGhvc3RcIixcbiAgY2xpZW50X3NlY3JldCA6ICc2ck9ROWwwZnluaDEzN01SWEdLLUdfWmcnLFxuICByZXNwb25zZV90eXBlIDogXCJjb2RlXCIsXG4gIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgc3RhdGUgOiBcImdkcml2ZWluaXRcIixcbiAgYWNjZXNzX3R5cGUgOiBcIm9mZmxpbmVcIixcbiAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG5cbiAgLyogQXMgZGVmaW5lZCBpbiB0aGUgT0F1dGggMi4wIHNwZWNpZmljYXRpb24sIHRoaXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsdWVcbiAgICAgKiBvZiBcImF1dGhvcml6YXRpb25fY29kZVwiIG9yIFwicmVmcmVzaF90b2tlblwiICovXG4gICAgZ3JhbnRUeXBlczogeyBBVVRIT1JJWkU6IFwiYXV0aG9yaXphdGlvbl9jb2RlXCIsIFJFRlJFU0g6IFwicmVmcmVzaF90b2tlblwiIH0sXG4gfTtcblxuLyoqXG4gKiBFbnVtIGZvciBTdGF0dXMgdmFsdWVzXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqXG4gKiBTVUNDRVNTIC0gU3VjY2Vzc2Z1bGx5IGRhdGEgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXJcbiAqIEVSUk9SIC0gRXJyb3Igb2NjdXJyZWQgd2hlbiB0cnlpbmcgdG8gcmVjZWl2ZSBmcm9tIHNlcnZlclxuICogTk9UX0RFVEVSTUlORUQgLSB1bmRldGVybWluZWRcbiAqL1xudmFyIHN0YXR1cyA9IHtcbiAgICAgICAgU1VDRVNTOiAxLFxuICAgICAgICBFUlJPUjogLTEsXG4gICAgICAgIE5PVF9ERVRFUk1JTkVEOiAwXG59XG5cbnJlcXVlc3RTdGF0dXMgPSAwO1xuXG4vKiBzdG9yZXMgdGhlIGF1dGhvcml6YXRpb24gQ29kZSBpbnRlcm5hbGx5ICovXG5hdXRoQ29kZSA9IGZhbHNlO1xuXG4vKiBzdG9yZXMgdGhlIGVycm9yIG1lc3NhZ2Ugd2hlbiBhbiBlcnJvciBoYXBwZW5zIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xuZXJyb3JNZXNzYWdlID0gZmFsc2U7XG5cbnZhciBsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgY29uc29sZS5sb2coXCIqKipPQVVUSCoqKjogXCIrbXNnKTtcbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBhdXRob3JpemUgdXNlciB1c2luZyBPQXV0aFxuICogT3BlbnMgdXAgQW5vdGhlciB3aW5kb3cgd2hlcmUgdXNlciBhbGxvd3MgYWNjZXNzIG9yIGRlbmllcyBpdC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsQmFjayAgIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgaW52b2tlZFxuICovXG52YXIgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbEJhY2spIHtcbiAgbG9nKFwiYXR0ZW1wdGluZyB0byBhdXRob3JpemVcIik7XG5cbiAgICB2YXIgYXV0aFVyaSA9IGdhcGlDb25maWcuZW5kcG9pbnQgKyAnPydcbiAgICArICdzY29wZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc2NvcGUpXG4gICAgKyAnJicgKyAncmVkaXJlY3RfdXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmkpXG4gICAgKyAnJicgKyAncmVzcG9uc2VfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVzcG9uc2VfdHlwZSlcbiAgICArICcmJyArICdjbGllbnRfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmNsaWVudF9pZCk7XG4gICAgLy8rICcmJyArICdzdGF0ZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc3RhdGUpXG4gICAgLy8rICcmJyArICdhY2Nlc3NfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuYWNjZXNzX3R5cGUpXG4gICAgLy8rICcmJyArICdhcHByb3ZhbF9wcm9tcHQ9Zm9yY2UnOyAvLyBAVE9ETyAtIGNoZWNrIGlmIHdlIHJlYWxseSBuZWVkIHRoaXMgcGFyYW1cblxuICAgIGNhbGxiYWNrRnVuYyA9IGNhbGxCYWNrO1xuICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG5cblxuXG5cbiAgICBsb2coXCJvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcblxuICAgIHRyeSB7XG5cbiAgICAgIC8vIE5vdyBvcGVuIG5ldyBicm93c2VyXG4gICAgICB3aW4gPSB3aW5kb3cub3BlbihhdXRoVXJpLCAnX2JsYW5rJywgJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8nKTtcblxuICAgICAgJCh3aW4pLm9uKCdsb2Fkc3RhcnQnLGZ1bmN0aW9uKGUpe1xuICAgICAgICBsb2coXCJJbkFwcEJyb3dzZXIgbG9hZHN0YXJ0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgICAgb25BdXRoVXJsQ2hhbmdlKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLnNob3dXZWJQYWdlKGF1dGhVcmksIHtzaG93TG9jYXRpb25CYXIgOiB0cnVlfSk7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkNsb3NlID0gb25BdXRoQ2xvc2U7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkxvY2F0aW9uQ2hhbmdlID0gb25BdXRoVXJsQ2hhbmdlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbG9nKFwiRXJyb3Igb3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG4gICAgICBsb2coZSk7XG4gICAgfVxuXG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsYmFjaywgaW1tZWRpYXRlKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiBpbW1lZGlhdGVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgYXV0aENvZGUgPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBjYWxsYmFjayhhdXRoQ29kZSk7XG4gIH0pO1xuXG4gIH1cbn1cblxuLyogQXV0aCBXaW5kb3cgY2xvc2VkICovXG52YXIgb25BdXRoQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkF1dGggd2luZG93IGNsb3NlZFwiKTtcbn07XG5cbi8qIE9BdXRoIFN1Y2Nlc3NmdWxseSBkb25lICovXG52YXIgb25BdXRoU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdBdXRoIFN1Y2Nlc3M/Jyk7XG59O1xuXG4vKipcbiAqIEdldHMgSW52b2tlZCB3aGVuIHRoZSBVUkwgY2hhbmdlcyBvbiBPQXV0aCBhdXRob3JpemF0aW9uIHByb2Nlc3NcbiAqXG4gKiBTdWNjZXNzIFVSTCBQYXR0ZXJuOlxuICogXCJyZWRpcmVjdF91cmlcIiArIFwiP2NvZGU9XCIgW3NlY3JldCBjb2RlIHZhbF1cbiAqXG4gKiBTdWNjZXNzIFNhbXBsZSBVUkw6XG4gKiBodHRwOi8vbG9jYWxob3N0Lz9jb2RlPTQvV09wUkxRZnZ2aEhFMHR1TVVERHFubjc2bENUVC44blhDNEllYk1FQVV1SkpWbkw0OUNjOEFRR3I4Y1FJXG4gKlxuICogRGVuaWVkIEFjY2VzcyBVUkwgUGF0dGVybjogXCJyZWRpcmVjdF91cmlcIiArID9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKiBEZW5pZWQgQWNjZXNzIFNhbXBsZTogaHR0cDovL2xvY2FsaG9zdC8/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmlMb2NhdGlvbiBUaGUgVVJJIExvY2F0aW9uXG4gKi9cbnZhciBvbkF1dGhVcmxDaGFuZ2UgPSBmdW5jdGlvbih1cmlMb2NhdGlvbikge1xuICAgIGNvbnNvbGUubG9nKFwiSW5BcHBCcm93c2VyIHVybCBjaGFuZ2VkIFwiK3VyaUxvY2F0aW9uKTtcbiAgICBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiY29kZT1cIikgIT0gLTEpIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5TVUNDRVNTO1xuXG4gICAgICAgIC8qIFN0b3JlIHRoZSBhdXRoQ29kZSB0ZW1wb3JhcmlseSAqL1xuICAgICAgICBhdXRoQ29kZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImNvZGVcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBsb2coXCJGb3VuZCBhdXRoIGNvZGU6IFwiK2F1dGhDb2RlKTtcblxuICAgICAgICBnZXRSZWZyZXNoVG9rZW4oY2FsbGJhY2tGdW5jKTtcblxuICAgICAgICAvLyBjbG9zZSB0aGUgY2hpbGRCcm93c2VyXG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiZXJyb3I9XCIpICE9IC0xKSAge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLkVSUk9SO1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJlcnJvclwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGNhbGxiYWNrRnVuYygpO1xuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuICAgICAgICAvL2NhbGxiYWNrRnVuYygpO1xuICAgIH1cbn07XG5cblxuLyoqXG4qIEdldHMgdGhlIFJlZnJlc2ggZnJvbSBBY2Nlc3MgVG9rZW4uIFRoaXMgbWV0aG9kIGlzIG9ubHkgY2FsbGVkIGludGVybmFsbHksXG4qIGFuZCBvbmNlLCBvbmx5IGFmdGVyIHdoZW4gYXV0aG9yaXphdGlvbiBvZiBBcHBsaWNhdGlvbiBoYXBwZW5zLlxuKlxuKiBAcGFyYW0gcGFyYW1PYmogQW4gT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSBwYXJhbU9iai5hdXRoX2NvZGUgVGhlIEF1dGhvcml6YXRpb24gQ29kZSBmb3IgZ2V0dGluZyBSZWZyZXNoIFRva2VuXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bCByZXRyaWV2YWwgb2YgZGF0YSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKi9cbnZhciBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBjb25zb2xlLmxvZyhcImFjY2VzcyByZWZyZXNoIHRva2VuXCIpO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgICBjb2RlICAgICAgICAgOiBhdXRoQ29kZSxcbiAgICAgICAgICAgICAgICAgICByZWRpcmVjdF91cmkgOiBnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSxcbiAgICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuQVVUSE9SSVpFXG4gICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzIGdldHRpbmcgcmVmcmVzaCB0b2tlblwiKTtcblxuICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICBhY2Nlc3NUb2tlbiAgICAgPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAvKiBzZXQgdGhlIGVycm9yIG9mIGRhdGEgdG8gZmFsc2UsIGFzIGl0IHdhcyBzdWNjZXNzZnVsICovXG4gICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcblxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG5cbiAgICAgICAgLyogbm93IGludm9rZSB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgY2FsbGJhY2soe2FjY2Vzc190b2tlbjogYWNjZXNzVG9rZW59KTtcbiAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogVGhpcyBtZXRob2Qgc2hvdWxkIE9OTFkgYmUgY2FsbGVkIGxvY2FsbHkgZnJvbSB3aXRoaW4gdGhpcyBjbGFzcy5cbiogUmV0dXJucyB0aGUgUmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZS5cbipcbiogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVmcmVzaCBUb2tlblxuKlxuKi9cbnZhciBnZXRUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xufTtcblxuXG4vKipcbiogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBleHRlcm5hbGx5LiBJdCByZXRyaWV2ZXMgdGhlIEFjY2VzcyBUb2tlbiBieSBhdCBmaXJzdFxuKiBjaGVja2luZyBpZiBjdXJyZW50IGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZCBvciBub3QuIElmIGl0cyBub3QgZXhwaXJlZCwgaXRcbiogc2ltcGx5IHJldHVybnMgdGhhdCwgb3RoZXJ3aXNlLCBpdCBnZXRzIHRoZSByZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlXG4qIChieSBpbnZva2luZyBnZXRUb2tlbikgYW5kIHRoZW4gY29ubmVjdGluZyB3aXRoIEdvb2dsZSdzIFNlcnZlciAodXNpbmcgT0F1dGgpXG4qIHRvIGdldCB0aGUgQWNjZXNzIFRva2VuLlxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgIEEgY2FsbEJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSBpcyByZXRyaWV2ZWQgZnJvbSB0aGUgZ29vZ2xlJ3Mgc2VydmVyLiBUaGUgZGF0YVxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBnb29nbGUgc2VydmVyIGlzIHBhc3NlZCB0byBjYWxsYmFjayBhcyBhcmdzLlxuKlxuKi9cbnZhciBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICBjb25zb2xlLmxvZyhcImdldHRpbmcgYWNjZXNzIHRva2VuXCIpO1xuXG4gICAvKiBjaGVjayBpZiBjdXJyZW50IFRva2VuIGhhcyBub3QgZXhwaXJlZCAoc3RpbGwgdmFsaWQpICovXG4gICBpZiAoYWNjZXNzVG9rZW4gJiYgYWNjZXNzVG9rZW4gIT0gZmFsc2UgJiZcbiAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgY2FsbGJhY2soeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pO1xuXG4gICAgICAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc29sZS5sb2coXCJBQ0NFU1MgVE9LRU4gUEFSQU1TOiBcIithY2Nlc3NUb2tlbitcIiBcIithY2Nlc3NUb2tlblRpbWUrXCIgXCIrYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCk7XG5cbiAgIC8qIGVsc2UsIGdldCB0aGUgcmVmcmVzaFRva2VuIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgZ2V0IGEgbmV3IGFjY2VzcyBUb2tlbiAqL1xuICAgdmFyIHJlZnJlc2hUb2tlbiA9IGdldFRva2VuKCk7XG5cbiAgIC8vICAgY29uc29sZS5sb2coXCJSZWZyZXNoIFRva2VuID4+IFwiICsgcmVmcmVzaFRva2VuKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLlJFRlJFU0gsXG4gICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgICAgICAvKiBzZXQgdGhlIGVycm9yIHRvIGZhbHNlICovXG4gICAgICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBlcnJvciA/PyA+PlwiICsgeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7IC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgIGlmIChhY2Nlc3NUb2tlbiAmJlxuICAgICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgICAgY2FsbGJhY2soYWNjZXNzVG9rZW4pO1xuXG4gICAgICAgICAgICAgcmV0dXJuO1xuICAgICB9XG5cbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGFjY2Vzc1Rva2VuID0gdG9rZW47XG4gICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuXG4vKipcbiogU2F2ZXMgdGhlIFJlZnJlc2ggVG9rZW4gaW4gYSBsb2NhbCBkYXRhYmFzZSBvciBsb2NhbFN0b3JhZ2VcbiogVGhpcyBtZXRob2Qgc2hhbGwgYmUgaW52b2tlZCBmcm9tIGV4dGVybmFsbHkgb25seSA8Yj5vbmNlPC9iPiBhZnRlciBhblxuKiBhdXRob3JpemF0aW9uIGNvZGUgaXMgcmVjZWl2ZWQgZnJvbSBnb29nbGUncyBzZXJ2ZXIuIFRoaXMgbWV0aG9kXG4qIGNhbGxzIHRoZSBvdGhlciBtZXRob2QgKGdldFJlZnJlc2hUb2tlbikgdG8gZ2V0IHRoZSByZWZyZXNoIFRva2VuIGFuZFxuKiB0aGVuIHNhdmVzIGl0IGxvY2FsbHkgb24gZGF0YWJhc2UgYW5kIGludm9rZXMgYSBjYWxsYmFjayBmdW5jdGlvblxuKlxuKiBAcGFyYW0gdG9rZW5PYmogQSBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHtTdHJpbmd9IHRva2VuT2JqLmF1dGhfY29kZSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdpdGggcGFyYW1ldGVyc1xuKi9cbnZhciBzYXZlUmVmcmVzaFRva2VuID0gZnVuY3Rpb24odG9rZW5PYmosIGNhbGxiYWNrKSB7XG4gICAgIGdldFJlZnJlc2hUb2tlbih0b2tlbk9iaiwgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgLyogaWYgdGhlcmUncyBubyBlcnJvciAqL1xuICAgICAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAVE9ETzogbWFrZSBhbm90aGVyIG1ldGhvZCBzYXZlVG9rZW4gdG8gYWJzdHJhY3QgdGhlIHN0b3Jpbmcgb2YgdG9rZW5cbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICB9KTtcbn07XG5cblxuXG4vKipcbiogQ2hlY2tzIGlmIHVzZXIgaGFzIGF1dGhvcml6ZWQgdGhlIEFwcCBvciBub3RcbiogSXQgZG9lcyBzbyBieSBjaGVja2luZyBpZiB0aGVyZSdzIGEgcmVmcmVzaF90b2tlblxuKiBhdmFpbGFibGUgb24gdGhlIGN1cnJlbnQgZGF0YWJhc2UgdGFibGUuXG4qXG4qIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYXV0aG9yaXplZCwgZmFsc2Ugb3RoZXJ3aXNlXG4qL1xudmFyIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdG9rZW5WYWx1ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG5cbiAgICAgIGNhbGxiYWNrKCgodG9rZW5WYWx1ZSAhPT0gbnVsbCkgJiYgKHR5cGVvZiB0b2tlblZhbHVlICE9PSAndW5kZWZpbmVkJykpKTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIEV4dHJhY3RzIHRoZSBjb2RlIGZyb20gdGhlIHVybC4gQ29waWVkIGZyb20gb25saW5lXG4qIEBUT0RPIG5lZWRzIHRvIGJlIHNpbXBsaWZpZWQuXG4qXG4qIEBwYXJhbSBuYW1lIFRoZSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWUgaXMgdG8gYmUgZ3JhYmJlZCBmcm9tIHVybFxuKiBAcGFyYW0gdXJsICBUaGUgdXJsIHRvIGJlIGdyYWJiZWQgZnJvbS5cbipcbiogQHJldHVybiBSZXR1cm5zIHRoZSBWYWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBuYW1lIHBhc3NlZFxuKi9cbnZhciBnZXRQYXJhbWV0ZXJCeU5hbWUgPSBmdW5jdGlvbihuYW1lLCB1cmwpIHtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCBcIlxcXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLCBcIlxcXFxcXF1cIik7XG4gIHZhciByZWdleFMgPSBcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIjtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleFMpO1xuICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcblxuICBpZihyZXN1bHRzID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZWxzZVxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhvcml6ZSA6IGF1dGhvcml6ZSxcbiAgaXNBdXRob3JpemVkIDogaXNBdXRob3JpemVkLFxuICBnZXRBY2Nlc3NUb2tlbiA6IGdldEFjY2Vzc1Rva2VuLFxuICBBUFBfSUQgOiBBUFBfSURcbn07XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxudmFyIGNhY2hlZFRpbGVTdHlsZSA9IHtcbiAgd2hlcmU6IFwicGlkIGluICgpXCIsXG4gIHBvbHlnb25PcHRpb25zOiB7XG4gICAgZmlsbENvbG9yOiBcIiMwMDAwMDBcIixcbiAgICBzdHJva2VDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgc3Ryb2tlV2VpZ2h0OiAzXG4gIH1cbn1cblxudmFyIGNhY2hlZFRpbGVzID0gW107XG52YXIgY2FjaGVkVGlsZXNMb2FkZWQgPSBmYWxzZTtcbnZhciBjYWNoZWRUaWxlUHJlZml4ID0gJ2NhY2hlZF90aXRsZV8nO1xudmFyIGNhY2hpbmcgPSBmYWxzZTtcbnZhciBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gZmFsc2U7XG52YXIgY01hcERhdGEgPSB7fTtcblxudmFyIGNvbHMgPSBbXTtcbnZhciBhcHAgPSBudWxsO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBfbG9hZEZyb21DYWNoZSgpO1xuICBfbG9hZENhY2hlZFRpbGVzKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIGlmKCAhY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIGFsbCB0aWxlIGRhdGEgZnJvbSB0aGUgY2FjaGU/JykgKSByZXR1cm47XG5cbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXMgPSBbXTtcbn1cblxuLy8gZSBpcyB0aGUgZXZlbnQgb2JqZWN0IGZyb20gZ29vZ2xlIG1hcHNcbmZ1bmN0aW9uIGNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIXNhdmVDYWNoZU9uQ2xpY2tTZXQgKSB7XG4gICAgc2F2ZUNhY2hlT25DbGlja1NldCA9IHRydWU7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBfc2F2ZVRpbGUoKTtcbiAgICB9KTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmlzKCdjaGVja2VkJykgKSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiggY2FjaGluZyApIHJldHVybjtcbiAgY2FjaGluZyA9IHRydWU7XG5cbiAgY01hcERhdGEgPSB7XG4gICAgZnVzaW9uTGF5ZXIgOiBmdXNpb25MYXllcixcbiAgICBkZWZhdWx0T3B0aW9ucyA6IGRlZmF1bHRPcHRpb25zLFxuICAgIGRlZmF1bHRTdHlsZSA6IGRlZmF1bHRTdHlsZSxcbiAgICBwaWQgOiAgZS5yb3cucGlkLnZhbHVlXG4gIH1cblxuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgnJyk7XG4gICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuc2hvdygpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG5cbiAgX2xvYWRUaWxlKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuc2hvdygpO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuaGlkZSgpO1xuXG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBpZCcpLmh0bWwoY01hcERhdGEucGlkKTtcbiAgICBjTWFwRGF0YS5kYXRhID0gZGF0YTtcbiAgICBjYWNoaW5nID0gZmFsc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgX2NyZWF0ZU5hdk1lbnUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3QgdHJlZSBidXR0b25cbiAgJCgnI3RyZWUtc3ViLW1lbnUnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0b3IgZm9yIHVwbG9hZGluZyB3ZWF0aGVyIGRhdGEgZnJvbSBhIGdvb2dsZSBzcHJlYWRzaGVldFxuICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBzaG93IHRoZSBjYWNoZSB2ZXJzaW9uIG9mIHRoZSBsb2NhdGlvbiBzZWxlY3RvclxuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9ubGluZScpLmhpZGUoKTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lJykuc2hvdygpO1xuXG4gIC8vIHNldCB0aGUgbG9jYXRpb24gc2VsZWN0b3IgdWkgbGlzdCBiYXNlZCBvbiBjYWNoZWQgdGlsZXNcbiAgX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhY2FjaGVkVGlsZXNMb2FkZWQgKSBfbG9hZENhY2hlZFRpbGVzKCk7XG5cbiAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzID0gW2RlZmF1bHRTdHlsZV07XG5cbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA+IDAgKSB7XG4gICAgY2FjaGVkVGlsZVN0eWxlLndoZXJlID0gJ3BpZCBpbiAoJytjYWNoZWRUaWxlcy5qb2luKCcsJykrJyknO1xuICAgIGRlZmF1bHRPcHRpb25zLnN0eWxlcy5wdXNoKGNhY2hlZFRpbGVTdHlsZSk7XG4gIH1cblxuICBmdXNpb25MYXllci5zZXRPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX3NhdmVUaWxlKCkge1xuICB2YXIgbmFtZSA9ICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgcmV0dXJuIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIG5hbWUnKTtcblxuICBjTWFwRGF0YS5kYXRhLm5hbWUgPSBuYW1lO1xuXG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NNYXBEYXRhLnBpZCwgSlNPTi5zdHJpbmdpZnkoY01hcERhdGEuZGF0YSkpO1xuXG4gIGNhY2hlZFRpbGVzLnB1c2goY01hcERhdGEucGlkKTtcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChjTWFwRGF0YS5mdXNpb25MYXllciwgY01hcERhdGEuZGVmYXVsdE9wdGlvbnMsIGNNYXBEYXRhLmRlZmF1bHRTdHlsZSk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRUaWxlKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd0aWxlLWRhdGEtY2FjaGUnLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcbiAgdmFyIHdlYXRoZXJUYWJsZSA9IHt9O1xuICB2YXIgc29pbFRhYmxlID0ge307XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soe3dlYXRoZXI6d2VhdGhlclRhYmxlLCBzb2lsOnNvaWxUYWJsZX0pO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB3ZWF0aGVyVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgc29pbFRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCkge1xuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID09IDAgKSB7XG4gICAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKS5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGxpc3RFbGUgPSAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbGlzdCcpLmh0bWwoJzxkaXY+U2VsZWN0IENhY2hlZCBUaWxlPC9kaXY+JyksIGVsZTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjYWNoZWRUaWxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2ldKTtcbiAgICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICAgIGVsZSA9ICQoJzxkaXY+PGEgY2FjaGVpZD1cIicraSsnXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPicrY2FjaGVkVGlsZXNbaV0rJzogJytqc29uLm5hbWUrJzwvYT48L2Rpdj4nKTtcbiAgICBlbGUuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3J1bkNhY2hlZFRpbGUocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdjYWNoZWlkJykpKTtcbiAgICB9KTtcbiAgICBsaXN0RWxlLmFwcGVuZChlbGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3J1bkNhY2hlZFRpbGUoaW5kZXgpIHtcbiAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpbmRleF0pO1xuICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24ud2VhdGhlci5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBtID0gaSsnJztcbiAgICBmb3IoIHZhciBqID0gMTsgaiA8IGpzb24ud2VhdGhlci5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIraSkudmFsKGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0gPyBqc29uLndlYXRoZXIucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICB9XG4gIH1cblxuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi5zb2lsLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIGpzb24uc29pbC5yb3dzWzBdID09IG51bGwgKSBjb250aW51ZTtcbiAgICAkKFwiI2lucHV0LXNvaWwtXCIranNvbi5zb2lsLmNvbHNbaV0uaWQpLnZhbChqc29uLnNvaWwucm93c1swXS5jW2ldLnYpO1xuICB9XG5cbiAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBhcHAucnVuTW9kZWwoKTtcbiAgfSwgNTAwKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRDYWNoZWRUaWxlcygpIHtcbiAgY2FjaGVkVGlsZXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICBjYWNoZWRUaWxlcy5wdXNoKGtleS5yZXBsYWNlKGNhY2hlZFRpbGVQcmVmaXgsJycpKTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXNMb2FkZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlTmF2TWVudSgpIHtcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIj5PRkZMSU5FIE1PREU8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nXG4gICAgICArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG5mdW5jdGlvbiBfbG9hZEZyb21DYWNoZSgpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2NhY2hlL2pzYXBpJyxcbiAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2NoYXJ0LmNzcycpICk7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9hbm5vdGF0ZWR0aW1lbGluZS5jc3MnKSApO1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICdjYWNoZS9jaGFydC5qcycsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNoYXJ0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGlmKCBjaGFydHNDYWxsYmFjayApIGNoYXJ0c0NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIHJlbmRlciA6IHJlbmRlcixcbiAgY2FjaGVUaWxlIDogY2FjaGVUaWxlLFxuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwIDogcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCxcbiAgY2xlYXJDYWNoZSA6IGNsZWFyQ2FjaGVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIk1lYW4gVmFwb3IgUHJlc3N1cmUgRGVmaWNpdFwiLFxuICAgICAgdW5pdHMgOiBcImtQQVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcInRoZSBkaWZmZXJlbmNlIChkZWZpY2l0KSBiZXR3ZWVuIHRoZSBhbW91bnQgb2YgbW9pc3R1cmUgaW4gdGhlIGFpciBhbmQgaG93IG11Y2ggXCIgK1xuICAgICAgXHRcdFwibW9pc3R1cmUgdGhlIGFpciBjYW4gaG9sZCB3aGVuIGl0IGlzIHNhdHVyYXRlZFwiXG4gIH0sXG4gIGZWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmVCA6IHtcbiAgICAgIGxhYmVsIDogXCJUZW1wZXJhdHVyZSBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmRnJvc3QgOiB7XG4gICAgICBsYWJlbCA6IFwiRnJvc3QgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBmcm9zdCBkYXlzIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBBUiA6IHtcbiAgICAgIGxhYmVsIDogXCJNb250aGx5IFBob3Rvc3ludGhldGljYWxseSBBY3RpdmUgUmFkaWF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW9scyAvIG1eMiBtb250aFwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlc2lnbmF0ZXMgdGhlIHNwZWN0cmFsIHJhbmdlICh3YXZlIGJhbmQpIG9mIHNvbGFyIHJhZGlhdGlvbiBmcm9tIDQwMCB0byA3MDAgbmFub21ldGVycyBcIiArXG4gICAgICBcdFx0XCJ0aGF0IHBob3Rvc3ludGhldGljIG9yZ2FuaXNtcyBhcmUgYWJsZSB0byB1c2UgaW4gdGhlIHByb2Nlc3Mgb2YgcGhvdG9zeW50aGVzaXNcIlxuICB9LFxuICB4UFAgOiB7XG4gICAgICBsYWJlbCA6IFwiTWF4aW11bSBQb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiTWV0cmljIFRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEludGNwdG4gOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IFJhaW5mYWxsIEludGVyY2VwdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlByZWNpcGl0YXRpb24gdGhhdCBkb2VzIG5vdCByZWFjaCB0aGUgc29pbCwgYnV0IGlzIGluc3RlYWQgaW50ZXJjZXB0ZWQgYnkgdGhlIGxlYXZlcyBhbmQgYnJhbmNoZXMgb2YgcGxhbnRzIGFuZCB0aGUgZm9yZXN0IGZsb29yLlwiXG4gIH0sXG4gIEFTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJBdmFpbGFibGUgU29pbCBXYXRlclwiLFxuICAgICAgdW5pdHMgOiBcIm1tXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgQ3VtSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiQ3VtdWxhdGl2ZSBSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFN0YW5kQWdlIDoge1xuICAgICAgbGFiZWwgOiBcIlN0YW5kIEFnZVwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIExBSSA6IHtcbiAgICAgIGxhYmVsIDogXCJMZWFmIEFyZWEgSW5kZXhcIixcbiAgICAgIHVuaXRzIDogXCJtMiAvIG0yXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiVGhlIG9uZS1zaWRlZCBncmVlbiBsZWFmIGFyZWEgcGVyIHVuaXQgZ3JvdW5kIHN1cmZhY2UgYXJlYVwiXG4gIH0sXG4gIENhbkNvbmQgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IENvbmR1Y3RhbmNlXCIsXG4gICAgICB1bml0cyA6IFwiZ2MsbS9zXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgVHJhbnNwIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJXYXRlciBtb3ZlbWVudCB0aHJvdWdoIGEgcGxhbnQgYW5kIGl0cyBldmFwb3JhdGlvbiBmcm9tIGFlcmlhbCBwYXJ0c1wiXG4gIH0sXG4gIGZTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJTb2lsIFdhdGVyIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgYWdlXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBoeXNNb2QgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIENhbm9weSBDb25kdWN0YW5jZVwiXG4gIH0sXG4gIHBSIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIlxuICB9LFxuICBwUyA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWVcIlxuICB9LFxuICBsaXR0ZXJmYWxsIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpdGlvbiA6IFwiXCIsXG4gICAgICBhbHRGbk5hbWUgOiBcInRkcFwiXG4gIH0sXG4gIE5QUCA6IHtcbiAgICAgIGxhYmVsIDogXCJOZXQgQ2Fub3B5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFdGIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZV9XRiwgY3VyX2RXLCBjdXJfcEYsIGN1cl9saXR0ZXJmYWxsLCBwcmV2X1dGKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV0YgKyBjdXJfZFcgKiBjdXJfcEYgLSBjdXJfbGl0dGVyZmFsbCAqIHByZXZfV0ZcbiAgICAgIH1cbiAgfSxcbiAgV1IgOiB7XG4gICAgICBsYWJlbCA6IFwiUm9vdCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUiwgY3VyX2RXLCBjdXJfcFIsIHR1cm5vdmVyLCBwcmV2X1dSLCBjdXJfUm9vdFApIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XUiArIGN1cl9kVyAqIGN1cl9wUiAtIHRyZWUucFIudHVybm92ZXIgKiBwcmV2X1dSIC0gY3VyX1Jvb3RQO1xuICAgICAgfVxuICB9LFxuICBXUyA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGVtIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dTLCBjdXJfZFcsIGN1cl9wUykgeyByZXR1cm4gcHJldl9XUyArIGN1cl9kVyAqIGN1cl9wUyB9XG4gIH0sXG4gIFcgOiB7XG4gICAgICBsYWJlbCA6IFwiVG90YWwgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKGN1cl9XRiwgY3VyX1dSLCBjdXJfV1MpIHsgcmV0dXJuIGN1cl9XRitjdXJfV1IrY3VyX1dTIH1cbiAgfVxufVxuIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbi8vIGFkZCBzcHJlYWRzaGVldCB2aXogc291cmNlXG4vLyBodHRwczovL3NwcmVhZHNoZWV0cy5nb29nbGUuY29tL3RxP3RxPXNlbGVjdCUyMComa2V5PTBBdjdjVVYtbzJRUVlkSFpGWVdKTk5XcFJTMWhJVldoR1FUaGxMV1p3WldjJnVzcD1kcml2ZV93ZWIjZ2lkPTBcblxuZnVuY3Rpb24gaW5pdCgpIHtcbnZhciBkcm9wWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wX3pvbmUnKTtcbmRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgX2hhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG5kcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0Jykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLndoaWNoID09IDEzICkgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0LXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1kcml2ZS1maWxlJywgMSk7XG5cbiAgICB2YXIgdmFsID0gJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoKTtcbiAgICBpZiggdmFsLmxlbmd0aCA9PSAwICkgcmV0dXJuO1xuXG4gICAgaWYoICF2YWwubWF0Y2goL15odHRwLiovICkgKSB2YWwgPSAnaHR0cHM6Ly8nK3ZhbDtcblxuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICAgIGZpbGVQYW5lbC5pbml0RnJvbVVybCh2YWwsIHJvb3QpO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCcnKTtcbn1cblxuZnVuY3Rpb24gX2hhbmRsZUZpbGVTZWxlY3QoZXZ0KSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWxvY2FsLWZpbGUnLCAxKTtcblxuICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHZhciBmaWxlcyA9IGV2dC5kYXRhVHJhbnNmZXIgPyBldnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZ0LnRhcmdldC5maWxlczsgLy8gRmlsZUxpc3Qgb2JqZWN0LlxuXG4gIC8vIGZpbGVzIGlzIGEgRmlsZUxpc3Qgb2YgRmlsZSBvYmplY3RzLiBMaXN0IHNvbWUgcHJvcGVydGllcy5cbiAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGY7IGYgPSBmaWxlc1tpXTsgaSsrKSB7XG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIGZpbGVQYW5lbC5pbml0KGYsIHJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVEcmFnT3ZlcihldnQpIHtcbmV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbmV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknOyAvLyBFeHBsaWNpdGx5IHNob3cgdGhpcyBpcyBhIGNvcHkuXG59XG5cbi8vIG9uIGFkZCwgaWYgdGhlIGxpc3QgaXMgZW1wdHksIGxldCdzIGNsb3NlIHRoZSBwb3B1cFxuZnVuY3Rpb24gX29uQ29tcGxldGUoKSB7XG4gICAgaWYoICQoXCIjZmlsZV9saXN0XCIpLmNoaWxkcmVuKCkubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG59XG5cbnZhciBXZWF0aGVyRmlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgZGF0ZSAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdEYXRlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0RhdGUnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWluICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01pbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1heCAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNYXggVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRkbWVhbiAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWVhbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcHB0ICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdQcmVjaXBpdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdtbScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHJhZCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUmFkaWF0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ01KIG0tMiBkYXktMScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIGRheWxpZ2h0IDoge1xuICAgICAgICAgICAgbGFuZWwgOiAnRGF5bGlnaHQgSG91cnMnLFxuICAgICAgICAgICAgdW5pdHMgOiAnaG91cnMnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gIHZhciBlbGUgPSAkKCc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdFwiPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L2J1dHRvbj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJmaWxlbmFtZVwiPjwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIjBcIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIndpZHRoOiAwJTtcIj4nK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+MCUgQ29tcGxldGU8L3NwYW4+JytcbiAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0dXNcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGFcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2PjxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIHByZXZpZXctZGF0YS1idG5cIj5QcmV2aWV3IERhdGE8L2E+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGEtdGFibGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtc3RhdHVzXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjUwcHhcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgbWFwLWRhdGEtYnRuXCI+TWFwIENTViBDb2x1bW5zPC9hPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBkaXNhYmxlZCBwdWxsLXJpZ2h0XCI+QWRkIERhdGE8L2E+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nKTtcblxuICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBjc3ZUYWJsZSA9IFtdO1xuXG4gICAgLy8gb25seSBhdXRvIGhpZGUgdGhlIGZpcnN0IHRpbWVcbiAgICB2YXIgYXV0b0hpZGUgPSB0cnVlO1xuXG4gIC8vIHRoZSBmaWxlIHJlYWRlciBvYmplY3QgYW5kIHRoZSBlbGVtZW50XG4gIGZ1bmN0aW9uIGluaXQoZmlsZSwgcm9vdEVsZSkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgIHJlYWRlci5vbnByb2dyZXNzID0gdXBkYXRlUHJvZ3Jlc3M7XG4gICAgcmVhZGVyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oZSkge307XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgICAgIHBhcnNlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpXG5cbiAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbChnZXROYW1lKGZpbGUpKTtcbiAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RnJvbVVybCh1cmwsIHJvb3RFbGUpIHtcbiAgICAgICAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLmh0bWwoJ1F1ZXJ5aW5nIHNwcmVhZHNoZWV0Li4uJyk7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldEtleSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbCgnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnK1xuICAgICAgICAgICAgJ0dvb2dsZSBTcHJlYWRzaGVldCcrKGtleS5sZW5ndGggPiAwID8gJzxiciAvPjxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTRweFwiPicra2V5Kyc8L3NwYW4+JyA6ICcnKSsnPC9oMz4nKTtcblxuICAgICAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gICAgICAgIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRXJyb3IgaW4gcXVlcnk6ICcgKyByZXNwb25zZS5nZXRNZXNzYWdlKCkgKyAnICcgKyByZXNwb25zZS5nZXREZXRhaWxlZE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJzZShkdFRvQ3N2KHJlc3BvbnNlLmdldERhdGFUYWJsZSgpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zZXRIYW5kbGVycygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5tYXAtZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhcHAuc2V0V2VhdGhlcihkYXRhKTtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIF9vbkNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR0VG9Dc3YoZHQpIHtcbiAgICAgICAgdmFyIGFyciA9IFtbXV07XG5cbiAgICAgICAgZHQgPSBKU09OLnBhcnNlKGR0LnRvSlNPTigpKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyWzBdLnB1c2goZHQuY29sc1tpXS5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnIucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGR0LnJvd3NbaV0uYy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICBpZiggIWR0LnJvd3NbaV0uY1tqXSApIGFycltpKzFdLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIGVsc2UgYXJyW2krMV0ucHVzaChkdC5yb3dzW2ldLmNbal0udik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3N2ID0gJyc7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgY3N2ICs9IGFycltpXS5qb2luKCcsJykrJ1xcbic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3N2O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEtleSh1cmwpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPT0gMSApIHJldHVybiAnJztcblxuICAgICAgICBwYXJ0cyA9IHBhcnRzWzFdLnNwbGl0KCcmJyk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggcGFydHNbaV0uc3BsaXQoJz0nKVswXSA9PSAna2V5JyApIHJldHVybiBwYXJ0c1tpXS5zcGxpdCgnPScpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmFtZShmKSB7XG4gICAgcmV0dXJuIFsnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnLCBmLm5hbWUsXG4gICAgICAgICAgICAgICAgJyA8c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE2cHhcIj4oJywgZi50eXBlIHx8ICduL2EnLFxuICAgICAgICAgICAgICAgICcpPC9zcGFuPiAtIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE2cHhcIj4nLCBmLnNpemUsICcgYnl0ZXM8L3NwYW4+JywgJzwvaDM+J10uam9pbignJyk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZShkYXRhKSB7XG4gICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXlxccypcXG4vZywnJykuc3BsaXQoJ1xcbicpO1xuXG4gICAgdmFyIHRhYmxlID0gW107XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgdGFibGUucHVzaChkYXRhW2ldLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgICAgICBpZiggdGFibGUubGVuZ3RoID09IDAgKSByZXR1cm4gc2V0RXJyb3IoJ0ZpbGUgZGlkIG5vdCBjb250YWluIGFueSBpbmZvcm1hdGlvbi4nKTtcbiAgICAgICAgY3N2VGFibGUgPSB0YWJsZTtcblxuICAgICAgICBwYXJzZUhlYWRlcih0YWJsZVswXSk7XG4gICAgICAgIGdldERhdGVSYW5nZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGVSYW5nZSgpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnJyk7XG4gICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sID09IC0xICkgcmV0dXJuIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJ0RhdGUgY29sdW1uIG5lZWRzIHRvIGJlIG1hdGNoZWQuJyk7XG4gICAgICAgIGlmKCB0eXBlb2YgaGVhZGVycy5kYXRlLmNvbCA9PSAnc3RyaW5nJyApIGhlYWRlcnMuZGF0ZS5jb2wgPSBwYXJzZUludChoZWFkZXJzLmRhdGUuY29sKTtcblxuICAgICAgICB2YXIgZGF0ZXMgPSB7fTtcbiAgICAgICAgdmFyIGRpc3BsYXlEYXRlcyA9IFtdO1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPCBjc3ZUYWJsZVtpXS5sZW5ndGggJiYgY3N2VGFibGVbaV0ubGVuZ3RoID49IDcgKcKge1xuICAgICAgICAgICAgICAgIHZhciBwID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0uc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgIGlmKCBwLmxlbmd0aCAhPSAzICYmIHAubGVuZ3RoICE9IDIgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBub3QgYSB2YWxpZCBmb3JtYXQgKHl5eXktbW0tZGQgb3IgeXl5eS1tbSlcIik7XG5cbiAgICAgICAgICAgICAgICBpZiggIWRhdGVzW3BbMF1dICkgZGF0ZXNbcFswXV0gPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgbW1kZCA9IHBbMV07XG5cbiAgICAgICAgICAgICAgICBpZiggZGF0ZXNbcFswXV0uaW5kZXhPZihtbWRkKSAhPSAtMSApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIGluIGRhdGFzZXQgdHdpY2VcIik7XG4gICAgICAgICAgICAgICAgZGF0ZXNbcFswXV0ucHVzaChtbWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIHllYXIgaW4gZGF0ZXMgKSB7XG4gICAgICAgICAgICBpZiggZGF0ZXNbeWVhcl0ubGVuZ3RoID09IDEyKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIrJyBbJytkYXRlc1t5ZWFyXS5qb2luKCcsICcpKyddJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCc8Yj5EYXRlIFJhbmdlOjwvYj4gJytkaXNwbGF5RGF0ZXMuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaGVhZGVyUm93KSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gW107XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPic7XG4gICAgICAgIGh0bWwgKz0gJzx0cj48dGg+S2V5PC90aD48dGg+Q29sdW1uICM8L3RoPjwvdHI+JztcblxuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJSb3cuaW5kZXhPZihrZXkpICE9IC0xICkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNba2V5XS5jb2wgPSBoZWFkZXJSb3cuaW5kZXhPZihrZXkpO1xuICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtc3VjY2Vzc1wiPicraGVhZGVyc1trZXldLmNvbCsnIDxpIGNsYXNzPVwiaWNvbi1va1wiPjwvaT48L3NwYW4+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzZWxlY3QgY2xhc3M9XCJzZWxlY3QtJytrZXkrJ1wiXCI+PC9zZWxlY3Q+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaHRtbChodG1sKyc8L3RhYmxlPicpO1xuXG5cbiAgICAgICAgaWYoIG1hdGNoZWQubGVuZ3RoICE9IDcgKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgc2VsZWN0IGVsZW1lbnQgZm9yIG1pc3NpbmcgY29sJ3NcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiXCI+W1NlbGVjdCBDb2x1bW5dPC9vcHRpb24+JykpO1xuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIHJhZGlhdGlvbiwgYWRkIG9wdGlvbiBmb3IgY2FsY3VsYXRpbmdcbiAgICAgICAgICAgIC8vIFRPRE9cblxuICAgICAgICAgICAgLy8gYXBwZW5kIG1pc3NpbmcgY29sc1xuICAgICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJSb3cubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoIG1hdGNoZWQuaW5kZXhPZihoZWFkZXJSb3dbaV0pID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIicraSsnXCI+JytpKycgLSAnK2hlYWRlclJvd1tpXSsnPC9vcHRpb24+JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBjaGFuZ2UgaGFuZGxlcnMgZm9yIHRoZSBzZWxlY3RvcnNcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgIGlmKCB2YWwgIT0gJycgKSBoZWFkZXJzW3RoaXMuY2xhc3NOYW1lLnJlcGxhY2UoL3NlbGVjdC0vLCcnKV0uY29sID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgYWxsIGNvbHVtbnMgYXJlIHNldCwgcmVtb3ZlIGRpc2FibGVkIGZyb20gYnRuXG4gICAgICAgICAgICAgICAgdmFyIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGhlYWRlcnNba2V5XS5jb2wgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiggcmVhZHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhdXRvSGlkZSApIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmhpZGUoJ3Nsb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc2hvdyB0aGUgdGFibGVcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnNob3coJ3Nsb3cnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGF1dG9IaWRlID0gZmFsc2U7XG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgc2V0RGF0YSgpO1xuICAgICAgICBzZXRQcmV2aWV3KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UHJldmlldygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5zaG93KCk7XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj48dGg+ZGF0ZTwvdGg+JztcbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICBodG1sICs9ICc8dGg+JytrZXkrJzwvdGg+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0gMDtcbiAgICAgICAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICl7XG4gICAgICAgICAgICBpZiggYyA9PSAxMCApIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkIGNvbHNwYW49XCI3XCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlclwiPi4uLjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicrZGF0ZSsnPC90ZD4nO1xuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nK2RhdGFbZGF0ZV1ba2V5XSsnPC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuXG4gICAgICAgICAgICBjKys7XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLmh0bWwoaHRtbCk7XG4gICAgfVxuXG4gIC8vIHNldCB0aGUgbWFwIG9mIGNzdiBoZWFkZXJzXG4gIGZ1bmN0aW9uIHNldERhdGEoKSB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBjc3ZUYWJsZVtpXS5sZW5ndGggPCA3ICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXTtcblxuICAgICAgICAgICAgaWYoICFkYXRlICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgaWYoIGRhdGUuc3BsaXQoJy0nKS5sZW5ndGggPT0gMyApIGRhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5zcGxpY2UoMCwyKS5qb2luKFwiLVwiKTtcbiAgICAgICAgICAgIGRhdGFbZGF0ZV0gPSB7fTtcblxuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGRhdGFbZGF0ZV1ba2V5XSA9IHBhcnNlRmxvYXQoY3N2VGFibGVbaV1baGVhZGVyc1trZXldLmNvbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyhldnQpIHtcbiAgICAvLyBldnQgaXMgYW4gUHJvZ3Jlc3NFdmVudC5cbiAgICBpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgdmFyIHBlcmNlbnRMb2FkZWQgPSBNYXRoLnJvdW5kKChldnQubG9hZGVkIC8gZXZ0LnRvdGFsKSAqIDEwMCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MtYmFyJykuYXR0cignYXJpYS12YWx1ZW5vdycscGVyY2VudExvYWRlZCkud2lkdGgocGVyY2VudExvYWRlZCtcIiVcIik7XG4gICAgICAgIGVsZS5maW5kKCcuc3Itb25seScpLmh0bWwoTWF0aC5jZWlsKHBlcmNlbnRMb2FkZWQpKyclIENvbXBsZXRlJyk7XG4gICAgfVxufVxuXG4gIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihldnQpIHtcbiAgICBzd2l0Y2goZXZ0LnRhcmdldC5lcnJvci5jb2RlKSB7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX0ZPVU5EX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgTm90IEZvdW5kIScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfUkVBREFCTEVfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBpcyBub3QgcmVhZGFibGUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuQUJPUlRfRVJSOlxuICAgICAgICBicmVhazsgLy8gbm9vcFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHJlYWRpbmcgdGhpcyBmaWxlLicpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRFcnJvcihtc2cpIHtcbiAgICAgIGVsZS5maW5kKCcuc3RhdHVzJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicrbXNnKyc8L2Rpdj4nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCA6IGluaXQsXG4gICAgaW5pdEZyb21VcmwgOiBpbml0RnJvbVVybFxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXRcbn07XG4iXX0=
