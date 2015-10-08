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

var daily = false;

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
  require('./flashblock-detector')(function(val){
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

},{"../../poplar-3pg-model":1,"./charts":25,"./export":26,"./flashblock-detector":27,"./gdrive":28,"./inputForm":30,"./modelIO":31,"./offline":33,"./outputDefinitions":34}],25:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2V4cG9ydC5qcyIsImpzbGliL2ZsYXNoYmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nZHJpdmUuanMiLCJqc2xpYi9nZHJpdmVSVC5qcyIsImpzbGliL2lucHV0Rm9ybS5qcyIsImpzbGliL21vZGVsSU8uanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXREZWZpbml0aW9ucy5qcyIsImpzbGliL3dlYXRoZXJGaWxlUmVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9mQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3orQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ppQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGlvID0gcmVxdWlyZSgnLi9saWIvaW8nKTtcbnZhciBydW4gPSByZXF1aXJlKCcuL2xpYi9ydW4nKShpbyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBydW47XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBhcmUgY29uc3RhbnRzLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGRheXNfcGVyX21vbnRoOiB7XG4gICAgICAgICAgICB2YWx1ZTogMzAuNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImRheXMvbW9cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiBEYXlzIGluIGFuIGF2ZXJhZ2UgbW9udGhcIlxuICAgICAgICB9LFxuICAgICAgICBlMjA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyLjIsXG4gICAgICAgICAgICB1bml0czogXCJ2cC90XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYXRlIG9mIGNoYW5nZSBvZiBzYXR1cmF0ZWQgVlAgd2l0aCBUIGF0IDIwQ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHJob0Fpcjoge1xuICAgICAgICAgICAgdmFsdWU6IDEuMixcbiAgICAgICAgICAgIHVuaXRzOiBcImtnL21eM1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVuc2l0eSBvZiBhaXJcIlxuICAgICAgICB9LFxuICAgICAgICBsYW1iZGE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyNDYwMDAwLFxuICAgICAgICAgICAgdW5pdHM6IFwiSi9rZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm9cIlxuICAgICAgICB9LFxuICAgICAgICBWUERjb252OiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4wMDA2MjIsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgVlBEIHRvIHNhdHVyYXRpb24gZGVmaWNpdCA9IDE4LzI5LzEwMDBcIlxuICAgICAgICB9LFxuICAgICAgICBRYToge1xuICAgICAgICAgICAgdmFsdWU6IC05MCxcbiAgICAgICAgICAgIHVuaXRzOiBcIlcvbV4yXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcmNlcHQgb2YgbmV0IHJhZGlhdGlvbiB2ZXJzdXMgc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFFiOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC44LFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIGdETV9tb2w6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImcvbW9sKEMpXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBtb2xQQVJfTUo6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyLjMsXG4gICAgICAgICAgICB1bml0czogXCJtb2woQykvTUpcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUlwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRyZWUgOiByZXF1aXJlKCcuL3RyZWUnKSxcbiAgcGxhbnRhdGlvbiA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbicpLFxuICBwbGFudGF0aW9uX3N0YXRlIDogcmVxdWlyZSgnLi9wbGFudGF0aW9uX3N0YXRlJyksXG4gIHNvaWwgOiByZXF1aXJlKCcuL3NvaWwnKSxcbiAgd2VhdGhlciA6IHJlcXVpcmUoJy4vd2VhdGhlcicpLFxuICBtYW5hZ2UgOiByZXF1aXJlKCcuL21hbmFnZScpLFxuICBjb25zdGF0cyA6IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGVzY3JpcHRpb24gOiBcIkNyb3AgTWFuYWdlbWVudCBQYXJhbWV0ZXJzXCIsXG4gIHZhbHVlIDoge1xuICAgIGlycmlnRnJhYyA6IHtcbiAgICAgIHZhbHVlIDogMSxcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJJcnJpZ2F0aW9uIGZyYWN0aW9uOiAxID0gZnVsbHkgaXJyaWdhdGVkLCAwID0gbm8gaXJyaWdhdGlvbi4gQW55IHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEgYXJlIGFjY2VwdGFibGVcIlxuICAgIH0sXG4gICAgZmVydGlsaXR5IDoge1xuICAgICAgdmFsdWUgOiAwLjcsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiU29pbCBmZXJ0aWxpdHlcIlxuICAgIH0sXG4gICAgZGF0ZVBsYW50ZWQgOiB7XG4gICAgICAgIHZhbHVlIDogXCJfZGF0ZV9cIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRhdGUgdGhlIGNyb3Agd2FzIHBsYW50ZWRcIlxuICAgIH0sXG4gICAgZGF0ZUNvcHBpY2VkIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIG9mIHRoZSBmaXJzdCBjb3BwaWNlXCJcbiAgICB9LFxuICAgIGNvcHBpY2VJbnRlcnZhbCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiAzLFxuICAgICAgICB1bml0cyA6IFwiWWVhcnNcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkhvdyBhZnRlciB0aGUgY3JvcCBpcyBjb3BwaWNlZCBhZnRlciB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlRGF0ZXMgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogXCJcIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkhvdyBhZnRlciB0aGUgY3JvcCBpcyBjb3BwaWNlZCBhZnRlciB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBkYXRlRmluYWxIYXJ2ZXN0IDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHdoZW4gdGhlIGNyb3AgaXMgY29tcGxldGVseSBoYXJ2ZXN0ZWRcIlxuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIkdyZWVud29vZCBQRyBWYWx1ZXMgKGRlZmF1bHQpXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHJlcXVpcmVkIDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgU3RvY2tpbmdEZW5zaXR5OiB7XG4gICAgICAgICAgICB2YWx1ZTogMzU4NyxcbiAgICAgICAgICAgIHVuaXRzOiBcIlRyZWVzL2hlY3RhclwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIHRyZWVzIHBsYW50ZWQgcGVyIGhlY3RhclwiXG4gICAgICAgIH0sXG4gICAgICAgIFNlZWRsaW5nTWFzczoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImtHXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXNzIG9mIHRoZSBzZWVkbGluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHN0ZW1cIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvcG9ydGlvbiBvZiBzZWVkbGluZyBtYXNzIGdvaW5nIGludG8gZm9saWFnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC45LFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHJvb3RcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBsYW50YXRpb24gc3RhdGUgY2xhc3MsIGNvbnRhaW5pbmcgYWxsIGludGVtZWRpYXRlIHZhbHVlcyBhdCBldmVyeSB0aW1lc3RlcCBvZiB0aGUgbW9kZWxcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmZWVkc3RvY2tIYXJ2ZXN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvcHBpY2VDb3VudDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRyZWUgYXQgdGhlIHRpbWUgb2YgY29wcGljZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJrUEFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0XCJcbiAgICAgICAgfSxcbiAgICAgICAgZlZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhcilcIlxuICAgICAgICB9LFxuICAgICAgICBmVDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJUZW1wZXJhdHVyZSBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZGcm9zdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZk51dHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb2lsIHdhdGVyIG1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBQQVI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwibW9sc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgeFBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJbnRjcHRuOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHJhaW5mYWxsIGludGVyY2VwdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEFTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgQ3VtSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDdW11bGF0aXZlIGlycmlnYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJcnJpZzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW0vbW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZXF1aXJlZCBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgU3RhbmRBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1vbnRoXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBZ2Ugb2YgdGhlIHRyZWVcIlxuICAgICAgICB9LFxuICAgICAgICBMQUk6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBhcmVhIGluZGV4XCJcbiAgICAgICAgfSxcbiAgICAgICAgQ2FuQ29uZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgY29uZHVjdGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBUcmFuc3A6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IG1vbnRobHkgdHJhbnNwaXJhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFBoeXNNb2Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBmczoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYXRpbyBvZiBmb2xpYWdlIHRvIHN0ZW0gcGFydGl0aW9uaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGl0dGVyZmFsbDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBOUFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5ldCBQcmltYXJ5IFByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFJvb3RQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvb3QgcHJvZHVjdGl2aXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgZFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgV0Y6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRm9saWFnZSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFdSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvb3QgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdGVtIHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUb3RhbCB5aWVsZDogcm9vdCArIHN0ZW0gKyBmb2xpYWdlXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTb2lsIGluZm9ybWF0aW9uIGJhc2VkIG9uIGN1cnJlbnQgbG9jYXRpb25cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtYXhBV1M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBhdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3cG93ZXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicG93ZXIgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3djb25zdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJjb25zdGFudCBwYXJhbWV0ZXIgYmFzZWQgb24gY2xheSBjb250ZW50IG9mIHNvaWxcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcIltnYyBtL3NdP1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpY2FsIG1vZGlmZXIsIHNwZWNpZmllcyB0aGUgY2Fub3B5IGNvbmR1Y3RhbmNlLiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdmFsdWUsIHdoZW4gbGFpPTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDFcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAyXG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBncm93dGggbGltaXRlciBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogNDcuNVxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMy41XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBwYXJhbWV0ZXJzIGFmZmVjdGluZyB0ZW1wZXJhdHVyZSBtb2RpZmllciwgZlQuIEEgZ3JhcGggb2YgaG93IHRoZXNlIHBhcmFtZXRlcnMgYWZmZWN0IHRoZSB0ZW1wZXJhdHVyZSBtb2RpZmllciBpcyBmb3VuZCBoZXJlOiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvNjlpd3F0bmwyOFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbWluaW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgb3B0OiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgb3B0aW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDIwXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbWF4aW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDUwXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2Ugc3BlY2lmeSBncm93dGggcGFyYW1ldGVycyBzcGVjaWZpYyB0byB0aGUgc3BlY2llcyBvZiB0cmVlLlwiLFxuICAgIHZhbHVlIDoge1xuICAgICAgICBrOiB7XG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmFkaWF0aW9uIEV4dGluY3Rpb24gQ29lZmZpY2llbnQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bGxDYW5BZ2U6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiWWVhciB3aGVyZSB0cmVlIHJlYWNoZXMgZnVsbCBDYW5vcHkgQ292ZXIuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMS41XG4gICAgICAgIH0sXG4gICAgICAgIGtHOiB7XG4gICAgICAgICAgICB1bml0czogXCJba1BBXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGV0ZXJtaW5lcyB0aGUgcmVzcG9uc2Ugb2YgdGhlIGNhbm9weSBjb25kdWN0YW5jZSB0byB0aGUgdmFwb3IgcHJlc3N1cmUgZGVmaWNpdC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgYWxwaGE6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltrZy9tb2wgP11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBxdWFudHVtIGVmZmljaWVuY3kuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wOFxuICAgICAgICB9LFxuICAgICAgICBmVCA6IHJlcXVpcmUoJy4vZnQnKSxcbiAgICAgICAgQkxjb25kOiB7XG4gICAgICAgICAgICB1bml0czogXCJbXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGJvdW5kYXJ5IGxheWVyIGNvbmR1Y3RhbmNlLiBVc2VkIGluIHRoZSBjYWxjdWF0aW9uIG9mIHRyYW5zcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjA0XG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHJlcXVpcmUoJy4vZmFnZScpLFxuICAgICAgICBmTjA6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiB0aGUgbnV0cml0aW9uYWwgbW9kaWZpZXIsZk51dHIuICBmTnV0ciByYW5nZXMgZnJvbSBbZk5PLDEpIGJhc2VkIG9uIHRoZSBmZXJ0aWxpdHkgaW5kZXggd2hpY2ggcmFuZ2VzIGZyb20gMCB0byAxLiAgV2hlbiBmTjA9MSBpbmRpY2F0ZXMgZk51dHIgaXMgMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMjZcbiAgICAgICAgfSxcbiAgICAgICAgU0xBOiByZXF1aXJlKCcuL3NsYScpLFxuICAgICAgICAvL0NoZWNrVW5pdHNDaGFuZ2V0b2xpbmVhckZ1bmN0aW9uXG4gICAgICAgIENvbmR1Y3RhbmNlOiByZXF1aXJlKCcuL2NvbmR1Y3RhbmNlJyksXG4gICAgICAgIEludGNwdG46IHJlcXVpcmUoJy4vaW50Y3B0bicpLFxuICAgICAgICB5OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBc3NpbWlsYXRpb24gdXNlIGVmZmljaWVuY3kuICBVc2VkIGluIGNhbGN1bGF0aW9uIG9mIHRoZSBOUFAuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC40N1xuICAgICAgICB9LFxuICAgICAgICBwZnM6IHJlcXVpcmUoJy4vcGZzJyksXG4gICAgICAgIHBSOiByZXF1aXJlKCcuL3ByJyksXG4gICAgICAgIHJvb3RQOiByZXF1aXJlKCcuL3Jvb3RwJyksXG4gICAgICAgIGxpdHRlcmZhbGw6IHJlcXVpcmUoJy4vbGl0dGVyZmFsbCcpXG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUmFpbmZhbGwgaW50ZXJjZXB0aW9uIGZyYWN0aW9uLiAgQSBsaW5lYXIgZnVuY3Rpb24gdy5yLnQuIExBSVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHZhbHVlLCB3aGVuIGxhaT0wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB2YWx1ZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMjRcbiAgICAgICAgfSxcbiAgICAgICAgbGFpOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgQXJlYSBJbmRleCB3aGVyZSBwYXJhbWV0ZXIgcmVhY2hlcyBhIG1heGltdW0gdmFsdWUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogNy4zXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgbW9udGhseSBsb3NzIG9mIGZvbGlhZ2UuIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFueSBwYXJhbWV0ZXIuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzZpcTlwcGRxczdcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDE1XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wM1xuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBkZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWUuIFRoaXMgaXMgY2FsY3VsYXRlZCB3aXRoIGEgcGFpciBvZiBhbGxvbWV0cmljIHBvd2VyIGVxdWF0aW9ucy4gIFRoZSBmaXJzdCByZWxhdGVzIGJhc2FsIGRpYW1ldGVyLCAoRE9CKSB0byB0b3RhbCB3b29keSBiaW9tYXNzLCB3aGlsZSB0aGUgc2Vjb25kIHJlbGF0ZXMgRE9CIHRvIHBmcy4gIFRoZSBwYXJhbWV0ZXJpemF0aW9uIG9mIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiBET0IgYW5kIHdvb2R5IGJpb21hc3MgaXMgaW52ZXJ0ZWQgdG8gZGV0ZXJtaW5lIHRoZSBET0IgZnJvbSB0aGUgbW9kZWxlZCB3b29keSBmcmFjdGlvbi4gIFRoaXMgcmVsYXRpb24gaXMgcGxvdHRlZCBhdDogLiAgVGhlIG1vZGVsIGFsbG9jYXRlcyB0aGUgYXBwcm9wcmlhdGUgZnJhY3Rpb24gb2Ygd29vZCBiYXNlZCBvbiB0aGUgU3RvY2tpbmcgZGVuc2l0eSBvZiB0aGUgcGxhbnRhdGlvbi4gRE9CIHJhdGhlciB0aGFuIERCSCBpcyB1c2VkIGZvciBjb21wYXJpc29uIG9mIHRyZWVzIHdpdGggYSBoaWdoIHN0ZW1DbnQgYW5kIHJhcGlkIGNvcHBpY2luZyB2YWx1ZS5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBzdGVtQ250OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmVyYWdlIG51bWJlciBvZiBzdGVtcyBwZXIgc3R1bXBcIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjhcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbUM6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltjbV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnN0YW50IGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4xOFxuICAgICAgICB9LFxuICAgICAgICBzdGVtUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHdvb2R5IGJpb21hc3MuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi40XG4gICAgICAgIH0sXG4gICAgICAgIHBmc014OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHBvc3NpYmxlIHBmcyB2YWx1ZSBhbGxvd2VkXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9LFxuICAgICAgICBwZnNQOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBpbiByZWxhdGlvbiBvZiBEQk8gdG8gcGZzXCIsXG4gICAgICAgICAgICB2YWx1ZTogLTAuNzcyXG4gICAgICAgIH0sXG4gICAgICAgIHBmc0M6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltjbV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnN0YW50IGluIHJlbGF0aW9uIG9mIERPQiB0byBwZnMuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMS4zXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWFsIHBhcmFtZXRlciwgc3BlY2lmaWVzIHRoZSBhbW91bnQgb2YgbmV3IGdyb3d0aCBhbGxvY2F0ZWQgdG8gdGhlIHJvb3Qgc3lzdGVtLCBhbmQgdGhlIHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiB0aGUgcGh5c2lvbG9nYWwgcGFyYW1ldGVyIGlzIDEuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4xN1xuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBhbGxvY2F0aW9uIHRvIHRoZSByb290LCB3aGVuIG0wLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuN1xuICAgICAgICB9LFxuICAgICAgICBtMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwZW5kYW5jZSBvbiB0aGUgZmVydGlsaXR5IGluZGV4LiAwIGluZGljYXRlcyBmdWxsIGRlcGVuZGFuY2Ugb24gZmVydGlsaXR5LCAxIGluZGljYXRlcyBhIGNvbnN0YW50IGFsbG9jYXRpb24sIGluZGVwZW5kYW50IG9mIGZlcnRpbGl0eVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICB0dXJub3Zlcjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21vbnRoXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtb250aGx5IHJvb3QgdHVybm92ZXIgcmF0ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAyXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgcGFyYW1ldGVycyBzcGVjaWZ5IHJvb3QgYWxsb2NhdGlvbiB0byBncm93dGggYWZ0ZXIgY29wcGljaW5nLlwiLFxuICAgIHZhbHVlIDoge1xuICAgICAgZnJhYzoge1xuICAgICAgICAgIHVuaXRzOiBcIlttb250aF4xXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZnJhY3Rpb25hbCBhbW91bnQgb2Ygcm9vdCBiaW9tYXNzIHRoYXQgZXhjZWVkcyB0aGUgYWJvdmVncm91bmQgcmVxdWlyZW1lbnRzIHRoYXQgY2FuIGJlIHN1cHBsaWVkIGluIGEgZ2l2ZW4gbW9udGguXCIsXG4gICAgICAgICAgdmFsdWU6IDAuMlxuICAgICAgfSxcbiAgICAgIExBSVRhcmdldDoge1xuICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyBhIHRhcmdldCBMQUkgcmF0ZS4gIFRoZSBUYXJnZXQgTEFJIGlzIGluY2x1ZGVkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiBhIHRhcmdldCBOUFAsIGJhc2VkIG9uIHdlYXRoZXIgcGFyYW1hdGVycy4gIEJlbG93IHRoaXMgdGFyZ2V0LCB0aGUgcm9vdHMgd2lsbCBjb250cmlidXRlIGJpb21hc3MgaWYgdGhlIGJlbG93IGdyb3VuZCByb290IG1hc3MgZXhjZWVkcyB0aGUgcmVxdWlyZW1lbnRzIG9mIHRoZSBhYm92ZWdyb3VuZCBiaW9tYXNzLiBUaGUgdGFyZ2V0IGlzIHNwZWNpZmllZCBpbiBMQUkgdG8gdGltZSByb290IGNvbnRyaWJ1dGlvbnMgdG8gcGVyaW9kcyBvZiBncm93dGhcIixcbiAgICAgICAgICB2YWx1ZTogMTBcbiAgICAgIH0sXG4gICAgICBlZmZpY2llbmN5OiB7XG4gICAgICAgICAgdW5pdHM6IFwiW2tnL2tnXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZWZmaWNpZW5jeSBpbiBjb252ZXJ0aW5nIHJvb3QgYmlvbWFzcyBpbnRvIGFib3ZlZ3JvdW5kIGJpb21hc3MuXCIsXG4gICAgICAgICAgdmFsdWU6IDAuN1xuICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbbV4yL2tnXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgU3BlY2lmaWMgTGVhZiBBcmVhIGFzIGEgZnVuY3Rpb24gb2YgdGhlIHRyZWUgYWdlLiAgVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW5jeSBwYXJhbWV0ZXIuICBVc2VkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiBMQUkuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3dhMHEyaWgxOGhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTlcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxMC44XG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogNVxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vbnRoOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG1vbnRoIG51bWJlciBzaW5jZSBwbGFudGluZ1wiXG4gICAgfSxcbiAgICB0bWluOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHRlbXBlcmF0dXJlIGZvciBncm93dGhcIlxuICAgIH0sXG4gICAgdG1heDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRkbWVhbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGV3IHBvaW50IHRlbXBlcmF0dXJlXCJcbiAgICB9LFxuICAgIHBwdDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQcmVjaXBpdGF0aW9uXCJcbiAgICB9LFxuICAgIHJhZDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTb2xhciByYWRpYXRpb25cIlxuICAgIH0sXG4gICAgbnJlbDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLCAvLyBjYWxjdWF0ZWRcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9LFxuICAgIGRheWxpZ2h0OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuQG1vZHVsZSAzUEcgTW9kdWxlXG4qKi9cblxuXG4vKipcbkNsYXNzIGZvciBhbGwgdGhlIGZ1bmN0aW9ucyB0aGF0IHJ1biBpbiBhIHNpbmdsZSBzdGVwIG9mIHRoZSBtb2RlbFxuXG5AY2xhc3MgbW9kdWxlLmV4cG9ydHNcbioqL1xuXG5cbi8qKlxubGlzdCBvZiBjb25zdGFudHMgdXNlZCBmb3IgY29tcHV0YXRpb25zXG5cbkBhdHRyaWJ1dGUgY29uc3RhbnRcbioqL1xudmFyIGNvbnN0YW50cyA9IHtcbiAgZGF5c19wZXJfbW9udGg6e1xuICAgICAgdmFsdWU6MzAuNCxcbiAgICAgIHVuaXRzOidkYXlzL21vJyxcbiAgICAgIGRlc2NyaXB0aW9uOidOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoJ1xuICB9LFxuICBlMjA6e1xuICAgICAgdmFsdWU6Mi4yLFxuICAgICAgdW5pdHM6J3ZwL3QnLFxuICAgICAgZGVzY3JpcHRpb246J1JhdGUgb2YgY2hhbmdlIG9mIHNhdHVyYXRlZCBWUCB3aXRoIFQgYXQgMjBDJ1xuICB9LFxuICByaG9BaXI6e1xuICAgICAgdmFsdWU6MS4yLFxuICAgICAgdW5pdHM6J2tnL21eMycsXG4gICAgICBkZXNjcmlwdGlvbjonRGVuc2l0eSBvZiBhaXInXG4gIH0sXG4gIGxhbWJkYTp7XG4gICAgICB2YWx1ZToyNDYwMDAwLFxuICAgICAgdW5pdHM6J0ova2cnLFxuICAgICAgZGVzY3JpcHRpb246J0xhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvJ1xuICB9LFxuICBWUERjb252OntcbiAgICAgIHZhbHVlOjAuMDAwNjIyLFxuICAgICAgdW5pdHM6Jz8nLFxuICAgICAgZGVzY3JpcHRpb246J0NvbnZlcnQgVlBEIHRvIHNhdHVyYXRpb24gZGVmaWNpdCA9IDE4LzI5LzEwMDAnXG4gIH0sXG4gIFFhOntcbiAgICAgIHZhbHVlOi05MCxcbiAgICAgIHVuaXRzOidXL21eMicsXG4gICAgICBkZXNjcmlwdGlvbjonSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXAnXG4gIH0sXG4gIFFiOntcbiAgICAgIHZhbHVlOjAuOCxcbiAgICAgIHVuaXRzOid1bml0bGVzcycsXG4gICAgICBkZXNjcmlwdGlvbjonc2xvcGUgb2YgbmV0IHZzLiBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwJ1xuICB9LFxuICBnRE1fbW9sOntcbiAgICAgIHZhbHVlOjI0LFxuICAgICAgdW5pdHM6J2cvbW9sKEMpJyxcbiAgICAgIGRlc2NyaXB0aW9uOidNb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXInXG4gIH0sXG4gIG1vbFBBUl9NSjp7XG4gICAgICB2YWx1ZToyLjMsXG4gICAgICB1bml0czonbW9sKEMpL01KJyxcbiAgICAgIGRlc2NyaXB0aW9uOidDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVInXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmNvbnN0YW50ID0gY29uc3RhbnQ7XG5mdW5jdGlvbiBjb25zdGFudChjKSB7XG4gICAgcmV0dXJuIGNvbnN0YW50c1tjXS52YWx1ZTtcbn1cblxuLyoqXG5UaW1lIERlcGVuZGFudCBBdHRyaWJ1dGUsXG51bml0cz0ndmFyaW91cycsXG5kZXNjcmlwdGlvbj0nVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEgdGltZSBkZXBlbmRhbnQgZnVuY3Rpb24gdGhhdCBkZWNheXNcbihvciByaXNlcyBmcm9tIGYwIHRvIGYxLiAgVGhlIHZhbHVlIChmMCtmMSkvMiBpcyByZWFjaGVkIGF0IHRtLFxuYW5kIHRoZSBzbG9wZSBvZiB0aGUgbGluZSBhdCB0bSBpcyBnaXZlbiBieSBwLlxuQG1ldGhvZCB0ZHBcbkBwYXJhbSB4XG5AcGFyYW0gZlxuKiovXG5tb2R1bGUuZXhwb3J0cy50ZHAgPSBmdW5jdGlvbih4LGYpIHtcbiAgdmFyIHA9Zi5mMSArIChmLmYwLWYuZjEpKk1hdGguZXhwKC1NYXRoLmxvZygyKSpNYXRoLnBvdygoeC9mLnRtKSxmLm4pKTtcbiAgcmV0dXJuIHA7XG59O1xuXG4vKipcbkBtZXRob2QgbGluXG5AcGFyYW0geFxuQHBhcmFtIHBcbiovXG5tb2R1bGUuZXhwb3J0cy5saW4gPSBmdW5jdGlvbih4LCBwKXtcbiAgaWYoIHggPCAwICkge1xuICAgIHJldHVybiBwLm1uO1xuICB9XG4gIGlmKCB4ID4gcC54bWF4ICkge1xuICAgIHJldHVybiBwLnhtYXg7XG4gIH1cbiAgcmV0dXJuIHAubW4gKyAocC5teC1wLm1uKSooeC9wLnhtYXgpO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBSYWluZmFsbCBpbnRlcmNlcHRpb24nXG5AbWV0aG9kIEludGNwdG5cbkBwYXJhbSBjdXJfTEFJXG5AcGFyYW0gY1xuKi9cbm1vZHVsZS5leHBvcnRzLkludGNwdG4gPSBmdW5jdGlvbihjdXJfTEFJLCBjKXtcbiAgcmV0dXJuIE1hdGgubWF4KGMubW4sYy5tbiArIChjLm14IC0gYy5tbikgKiBNYXRoLm1pbigxICwgY3VyX0xBSSAvIGMubGFpKSk7XG59O1xuXG4vKipcbnVuaXRzPSdtbScsXG5kZXNjcmlwdGlvbj0nQXZhaWxhYmxlIFNvaWwgV2F0ZXInXG5AbWV0aG9kIEFTV1xuQHBhcmFtIG1heEFTV1xuQHBhcmFtIHByZXZfQVNXXG5AcGFyYW0gZGF0ZV9wcHRcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBjdXJfSXJyaWdcbiovXG5tb2R1bGUuZXhwb3J0cy5BU1cgPSBmdW5jdGlvbihtYXhBU1csIHByZXZfQVNXLCBkYXRlX3BwdCwgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGN1cl9JcnJpZyl7XG4gIHJldHVybiBNYXRoLm1pbihtYXhBU1cqMTAsIE1hdGgubWF4KHByZXZfQVNXICsgZGF0ZV9wcHQgLSAoY3VyX1RyYW5zcCArIGN1cl9JbnRjcHRuICogZGF0ZV9wcHQpICsgY3VyX0lycmlnLCAwKSk7XG59O1xuXG4vL1RPRE86IGRvdWJsZSBjaGVjayB0aGUgYXBwcm9wcmlhdGUgdXNlIG9mIHRkbWVhbiAoZGV3IHBvaW50IHRlbXApXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLyoqXG51bml0cz0na1BBJyxcbmRlc2NyaXB0aW9uPSdNZWFuIHZhcG9yIHByZXNzdXJlIGRlZmljaXQnXG5AbWV0aG9kIFZQRFxuQHBhcmFtIGRhdGVfdG1pblxuQHBhcmFtIGRhdGVfdG1heFxuQHBhcmFtIGRhdGVfdGRtZWFuXG4qL1xubW9kdWxlLmV4cG9ydHMuVlBEID0gZnVuY3Rpb24oZGF0ZV90bWluLCBkYXRlX3RtYXgsIGRhdGVfdGRtZWFuKXtcbiAgcmV0dXJuICgwLjYxMDggLyAyICogKE1hdGguZXhwKGRhdGVfdG1pbiAqIDE3LjI3IC8gKGRhdGVfdG1pbiArIDIzNy4zKSApICsgTWF0aC5leHAoZGF0ZV90bWF4ICogMTcuMjcgLyAoZGF0ZV90bWF4ICsgMjM3LjMpICkgKSApIC0gKDAuNjEwOCAqIE1hdGguZXhwKGRhdGVfdGRtZWFuICogMTcuMjcgLyAoZGF0ZV90ZG1lYW4gKyAyMzcuMykgKSApO1xufTtcblxuXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbj0nVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllciAoUG9wbGFyKSdcbkBtZXRob2QgZlZQRFxuQHBhcmFtIGtHXG5AcGFyYW0gY3VyX1ZQRFxuKi9cbm1vZHVsZS5leHBvcnRzLmZWUEQgPSBmdW5jdGlvbihrRywgY3VyX1ZQRCl7XG4gIHJldHVybiBNYXRoLmV4cCgtMSAqIGtHICogY3VyX1ZQRCk7XG59O1xuXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLy8gbWFrZSBhIG1lYW5pbmdmdWwgdGVtcHZhciBuYW1lXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbiA9ICdOdW1iZXIgb2YgRnJlZXplIERheXMgTW9kaWZpZXInXG5AbWV0aG9kIGZGcm9zdFxuQHBhcmFtIGRhdGVfdG1pblxuKi9cbm1vZHVsZS5leHBvcnRzLmZGcm9zdCA9IGZ1bmN0aW9uKGRhdGVfdG1pbikge1xuICB2YXIgdGVtcFZhciA9IC0xLjA7XG5cbiAgaWYoIGRhdGVfdG1pbiA+PSAwICl7XG4gICAgdGVtcFZhciA9IDEuMDtcbiAgfSAvL2Vsc2UgLTEuMFxuXG4gIHJldHVybiAwLjUgKiAoMS4wICsgdGVtcFZhciAqIE1hdGguc3FydCgxIC0gTWF0aC5leHAoLTEgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSAqICg0IC8gMy4xNDE1OSArIDAuMTQgKiBNYXRoLnBvdyggKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKSAvICgxICsgMC4xNCAqIE1hdGgucG93KCgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgKSApICk7XG59O1xuXG4vL1RPRE8gLSBiZXR0ZXIgbmFtaW5nPzogdG1pbiwgdG1heCA9IHdlYXRoZXIgVG9wdCwgVG1heCwgVG1pbiA9IHRyZWUgcGFyYW1zXG4vKipcbnVuaXRzPXVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1RlbXBlcmF0dXJlIG1vZGlmaWVyJ1xuQG1ldGhvZCBmVFxuQHBhcmFtIHRhdmdcbkBwYXJhbSBmVFxuKi9cbm1vZHVsZS5leHBvcnRzLmZUID0gZnVuY3Rpb24odGF2ZywgZlQpe1xuICB2YXIgZjtcbiAgaWYodGF2ZyA8PSBmVC5tbiB8fCB0YXZnID49IGZULm14KXtcbiAgICBmID0gMDtcbiAgfSBlbHNlIHtcbiAgICBmID0gKCAodGF2ZyAtIGZULm1uKSAvIChmVC5vcHQgLSBmVC5tbikgKSAgKlxuICAgICAgICAgICBNYXRoLnBvdyAoICggKGZULm14IC0gdGF2ZykgLyAoZlQubXggLSBmVC5vcHQpICksXG4gICAgICAgICAgICAgICAgICAgICAgKCAoZlQubXggLSBmVC5vcHQpIC8gKGZULm9wdCAtIGZULm1uKSApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gIH1cbiAgcmV0dXJuKGYpO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyxcbmRlc2NyaXB0aW9uPSdSZXF1aXJlZCBJcnJpZ2F0aW9uJ1xuQG1ldGhvZCBJcnJpZ1xuQHBhcmFtIGlycmlnRnJhY1xuQHBhcmFtIGN1cl9UcmFuc3BcbkBwYXJhbSBjdXJfSW50Y3B0blxuQHBhcmFtIGRhdGVfcHB0XG4qL1xubW9kdWxlLmV4cG9ydHMuSXJyaWcgPSBmdW5jdGlvbihpcnJpZ0ZyYWMsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBkYXRlX3BwdCl7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGlycmlnRnJhYyAqIChjdXJfVHJhbnNwIC0gKDEgLSBjdXJfSW50Y3B0bikgKiBkYXRlX3BwdCkgKTtcbn07XG5cbi8vVE9ETzogZ2V0IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIGZTV1xuQHBhcmFtIEFTV1xuQHBhcmFtIG1heEFXU1xuQHBhcmFtIHN3Y29uc3RcbkBwYXJhbSBzd3Bvd2VyXG4qL1xubW9kdWxlLmV4cG9ydHMuZlNXID0gZnVuY3Rpb24oQVNXLCBtYXhBV1MsIHN3Y29uc3QsIHN3cG93ZXIpIHtcbiAgdmFyIGZTVztcbiAgaWYoIHN3Y29uc3QgPT09IDAgfHwgbWF4QVdTID09PSAwICkge1xuICAgIGZTVyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG9tciA9IDEgLSAoQVNXLzEwKSAvIG1heEFXUzsgLy8gT25lIE1pbnVzIFJhdGlvXG5cbiAgICBpZihvbXIgPCAwLjAwMSkge1xuICAgICAgZlNXID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZlNXID0gKDEtTWF0aC5wb3cob21yLHN3cG93ZXIpKS8oMStNYXRoLnBvdyhvbXIvc3djb25zdCxzd3Bvd2VyKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmU1c7XG59O1xuXG4vKipcbnVuaXRzPSd1bml0bGVzcycsXG5kZXNjcmlwdGlvbj0nTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludCdcbkBtZXRob2QgZk51dHJcbkBwYXJhbSBmTjBcbkBwYXJhbSBGUlxuKi9cbm1vZHVsZS5leHBvcnRzLmZOdXRyID0gZnVuY3Rpb24oZk4wLCBGUil7XG4gIHJldHVybiBmTjAgKyAoMSAtIGZOMCkgKiBGUjtcbn07XG5cbi8qKlxuVE9ETzogd2h5ICQzIGluIG1ha2VmaWxlIC0gYXNrIGFib3V0IGl0XG51bml0cz11bml0bGVzc1xuZGVzY3JpcHRpb249J1BoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1J1xuQG1ldGhvZCBQaHlzTW9kXG5AcGFyYW0gY3VyX2ZWUERcbkBwYXJhbSBjdXJfZlNXXG5AcGFyYW0gY3VyX2ZBZ2VcbiovXG5tb2R1bGUuZXhwb3J0cy5QaHlzTW9kID0gZnVuY3Rpb24oY3VyX2ZWUEQsIGN1cl9mU1csIGN1cl9mQWdlKXtcbiAgIHJldHVybiBNYXRoLm1pbihjdXJfZlZQRCAsIGN1cl9mU1cpICogY3VyX2ZBZ2U7XG59O1xuXG4vKipcbnVuaXRzPSdnYyxtL3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBDb25kdWN0YW5jZSdcbkBtZXRob2QgQ2FuQ29uZFxuQHBhcmFtIFBoeXNNb2RcbkBwYXJhbSBMQUlcbkBwYXJhbSBjb25kXG4qL1xubW9kdWxlLmV4cG9ydHMuQ2FuQ29uZCA9IGZ1bmN0aW9uKFBoeXNNb2QsIExBSSwgY29uZCl7XG4gICByZXR1cm4gTWF0aC5tYXgoY29uZC5tbiAsIGNvbmQubXggKiBQaHlzTW9kICogTWF0aC5taW4oMSAsIExBSSAvIGNvbmQubGFpKSApO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyB3aGljaCBpcyBhbHNvIGtnL20yL21vblxuZGVzY3JpcHRpb249J0Nhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb24nXG5AbWV0aG9kIFRyYW5zcFxuQHBhcmFtIGRhdGVfbnJlbFxuQHBhcmFtIGRhdGVfZGF5bGlnaHRcbkBwYXJhbSBjdXJfVlBEXG5AcGFyYW0gQkxjb25kXG5AcGFyYW0gY3VyX0NhbkNvbmRcbiovXG5tb2R1bGUuZXhwb3J0cy5UcmFuc3AgPSBmdW5jdGlvbihkYXRlX25yZWwsIGRhdGVfZGF5bGlnaHQsIGN1cl9WUEQsIEJMY29uZCwgY3VyX0NhbkNvbmQpe1xuICB2YXIgVlBEY29udiA9IGNvbnN0YW50KCdWUERjb252Jyk7XG4gIHZhciBsYW1iZGEgPSBjb25zdGFudCgnbGFtYmRhJyk7XG4gIHZhciByaG9BaXIgPSBjb25zdGFudCgncmhvQWlyJyk7XG4gIHZhciBlMjAgPSBjb25zdGFudCgnZTIwJyk7XG4gIHZhciBRYSA9IGNvbnN0YW50KCdRYScpO1xuICB2YXIgUWIgPSBjb25zdGFudCgnUWInKTtcblxuICAvLyBkYXRlX2RheWxpZ2h0ID0gaG91cnNcbiAgLy8gbnJlbCBpcyBpbiBNSi9tXjIvZGF5IGNvbnZlcnQgdG8gV2gvbV4yL2RheVxuICB2YXIgbmV0UmFkID0gUWEgKyBRYiAqICgoZGF0ZV9ucmVsICogMjc3Ljc3OCkgLyBkYXRlX2RheWxpZ2h0KTtcbiAgdmFyIGRlZlRlcm0gPSByaG9BaXIgKiBsYW1iZGEgKiBWUERjb252ICogY3VyX1ZQRCAqIEJMY29uZDtcbiAgdmFyIGRpdiA9IDEgKyBlMjAgKyBCTGNvbmQgLyBjdXJfQ2FuQ29uZDtcblxuICAvLyBDb252ZXJ0IGRheWxpZ2h0IHRvIHNlY3MuXG4gIHJldHVybiBjb25zdGFudCgnZGF5c19wZXJfbW9udGgnKSAqICggKGUyMCAqIG5ldFJhZCArIGRlZlRlcm0gKSAvIGRpdiApICogZGF0ZV9kYXlsaWdodCAqIDM2MDAgLyBsYW1iZGE7XG59O1xuXG4vL1RPRE86IGRlc2NyaXB0aW9uXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbkBtZXRob2QgTlBQXG5AcGFyYW0gcHJldl9TdGFuZEFnZVxuQHBhcmFtIGZ1bGxDYW5BZ2VcbkBwYXJhbSB4UFBcbkBwYXJhbSBrXG5AcGFyYW0gcHJldl9MQUlcbkBwYXJhbSBmVlBEXG5AcGFyYW0gZlNXXG5AcGFyYW0gZkFnZVxuQHBhcmFtIGFscGhhXG5AcGFyYW0gZk51dHJcbkBwYXJhbSBmVFxuQHBhcmFtIGZGcm9zdFxuKi9cbm1vZHVsZS5leHBvcnRzLk5QUCA9IGZ1bmN0aW9uKHByZXZfU3RhbmRBZ2UsIGZ1bGxDYW5BZ2UsIHhQUCwgaywgcHJldl9MQUksIGZWUEQsIGZTVywgZkFnZSwgYWxwaGEsIGZOdXRyLCBmVCwgZkZyb3N0KXtcbiAgdmFyIENhbkNvdmVyID0gMTtcbiAgaWYoIHByZXZfU3RhbmRBZ2UgPCBmdWxsQ2FuQWdlICl7XG4gICAgQ2FuQ292ZXIgPSBwcmV2X1N0YW5kQWdlIC8gZnVsbENhbkFnZTtcbiAgfVxuXG4gIHJldHVybiB4UFAgKiAoMSAtIChNYXRoLmV4cCgtayAqIHByZXZfTEFJKSApICkgKiBDYW5Db3ZlciAqIE1hdGgubWluKGZWUEQgLCBmU1cpICogZkFnZSAqIGFscGhhICogZk51dHIgKiBmVCAqIGZGcm9zdDtcbn07XG5cbi8vVE9ETzogdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgcFJcbkBwYXJhbSBjdXJfUGh5c01vZFxuQHBhcmFtIGN1cl9wUlxuQHBhcmFtIEZSXG5AcGFyYW0gcFJcbiovXG5tb2R1bGUuZXhwb3J0cy5wUiA9IGZ1bmN0aW9uKGN1cl9QaHlzTW9kLCBjdXJfcFIsRlIscFIpe1xuICB2YXIgcCA9KHBSLm14ICogcFIubW4pIC9cbiAgICAgICAgIChwUi5tbiArIChwUi5teCAtIHBSLm1uKSAqIGN1cl9QaHlzTW9kICogKHBSLm0wICsgKDEgLSBwUi5tMCkgKiBGUikgKTtcblxuICAvLyBUaGlzIHdhcyBhZGRlZCBieSBxdWlubiB0byBsaW1pdCByb290IGdyb3d0aC5cbiAgcmV0dXJuIHAgKiBNYXRoLnBvdyhwL2N1cl9wUiwyKTtcbn07XG5cblxuLy9UT0RPOiBtb2xzIG9yIG1vbHMgcGVyIG1eMj9cbi8qKlxudW5pdHM9bW9sc1xuZGVzY3JpcHRpb249J01vbnRobHkgUEFSIGluIG1vbHMgLyBtXjIgbW9udGgnXG5tb2xQQVJfTUogW21vbC9NSl0gaXMgYSBjb25zdGFudCBDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcbkBtZXRob2QgUEFSXG5AcGFyYW0gZGF0ZV9yYWRcbkBwYXJhbSBtb2xQQVJfTUpcbiovXG5tb2R1bGUuZXhwb3J0cy5QQVIgPSBmdW5jdGlvbihkYXRlX3JhZCwgbW9sUEFSX01KKSB7XG4gIGlmKCBtb2xQQVJfTUogPT09IG51bGwgfHwgbW9sUEFSX01KID09PSB1bmRlZmluZWQgKSB7XG4gICAgbW9sUEFSX01KID0gY29uc3RhbnQoJ21vbFBBUl9NSicpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVfcmFkICogbW9sUEFSX01KICogY29uc3RhbnQoJ2RheXNfcGVyX21vbnRoJyk7XG59O1xuXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbmRlc2NyaXB0aW9uPSdtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb24gW3RETSAvIGhhIG1vbnRoXSxcbk5PVEU6IDEwMDAwLzEwXjYgW2hhL20yXVt0RG0vZ0RNXVxuZ0dNX21vbCBbZy9tb2xdIGlzIHRoZSBtb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXJcbkBtZXRob2QgeFBQXG5AcGFyYW0geVxuQHBhcmFtIGN1cl9QQVJcbkBwYXJhbSBnRE1fbW9sXG4qL1xubW9kdWxlLmV4cG9ydHMueFBQID0gZnVuY3Rpb24oeSwgY3VyX1BBUiwgZ0RNX21vbCl7XG4gICAgaWYoIGdETV9tb2wgPT09IG51bGwgfHwgZ0RNX21vbCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgZ0RNX21vbCA9IGNvbnN0YW50KCdnRE1fbW9sJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHkgKiBjdXJfUEFSICogZ0RNX21vbCAvIDEwMDtcbn07XG5cbi8qKiogRlVOQ1RJT05TIEZPUiBDT1BQSUNJTkcgKi9cbi8qKlxuY29wcGljZSByZWxhdGVkIGZ1bmN0aW9uc1xuQG1ldGhvZCBjb3BwaWNlXG4qL1xubW9kdWxlLmV4cG9ydHMuY29wcGljZSA9IHtcbiAgLy8gQ29wcGljZSBGdW5jdGlvbnMgYXJlIGJhc2VkIG9uIERpYW1ldGVyIG9uIFN0dW1wLCBOT1QgREJILlxuICAvLyBDYWxjdWxhdGVzIHRoZSBwZnMgYmFzZWQgb24gdGhlIHN0ZW0gd2VpZ2h0IGluIEtHXG4gIHBmcyA6IGZ1bmN0aW9uKHN0ZW0sIHApIHtcbiAgICB2YXIgYXZET0IgPSBNYXRoLnBvdyggKCBzdGVtIC8gcC5zdGVtQ250IC8gcC5zdGVtQykgLCAoMSAvIHAuc3RlbVApICk7XG4gICAgdmFyIHBwZnM9IHAucGZzQyAqIE1hdGgucG93KGF2RE9CICwgcC5wZnNQKTtcblxuICAgIHJldHVybiBNYXRoLm1pbihwLnBmc014LHBwZnMpO1xuICB9LFxuXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiBzdGVtIHdpdGggaW4gRy4gIFVzZXMgdm9sdW1lIEluZGV4IGFzIGd1aWRlXG4gIHBmc192aWFfVkkgOiBmdW5jdGlvbiAoc3RlbUcsIHdzVkksIGxhVkksIFNMQSkge1xuICAgIGlmIChzdGVtRyA8IDEwKSB7XG4gICAgICBzdGVtRyA9IDEwO1xuICAgIH1cbiAgICB2YXIgVkkgPSBNYXRoLnBvdyggKHN0ZW1HIC8gd3NWSS5zdGVtc19wZXJfc3R1bXAgLyB3c1ZJLmNvbnN0YW50KSwoMSAvIHdzVkkucG93ZXIpICk7XG5cbiAgICAvLyBBZGQgdXAgZm9yIGFsbCBzdGVtc1xuICAgIHZhciBsYSA9IGxhVkkuY29uc3RhbnQgKiBNYXRoLnBvdyhWSSxsYVZJLnBvd2VyKSAqIHdzVkkuc3RlbXNfcGVyX3N0dW1wO1xuICAgIHZhciB3ZiA9IDEwMDAgKiAobGEgLyBTTEEpOyAgLy8gRm9pbGFnZSBXZWlnaHQgaW4gZztcbiAgICB2YXIgcGZzID0gd2Yvc3RlbUc7XG4gICAgcmV0dXJuIHBmcztcbiAgfSxcblxuICBSb290UCA6IGZ1bmN0aW9uKGN1cl9ucHAsIGN1cl9ucHBUYXJnZXQsIFdSLFcscFJ4LGZyYWMpIHtcbiAgICB2YXIgbnBwUmVzID0gY3VyX25wcFRhcmdldCAtIGN1cl9ucHA7XG4gICAgdmFyIHJvb3RQUDtcbiAgICBpZiggbnBwUmVzID4gMCAmJiBXUi9XID4gcFJ4ICkge1xuICAgICAgICByb290UFAgPSBNYXRoLm1pbihucHBSZXMsIFdSKihXUi9XIC0gcFJ4KSpmcmFjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdFBQID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdFBQO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIC8vIFRPRE8gOiBpbXBsZW1lbnRcbiAgICAvLyBZb3UgbmVlZCB0byBzZXQgeW91ciBJTyBoZXJlIGFuZCBtYWtlIHN1cmUgYWxsIHBhcmFtZXRlcnMgZm9yIG1vZGVsIGFyZSBjb3JyZWN0bHkgc2V0XG4gIH0sXG4gIGR1bXAgOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmbiA9IHJlcXVpcmUoJy4vZm4nKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBkYXRhTW9kZWwgPSByZXF1aXJlKCcuL2RhdGFNb2RlbCcpO1xudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi92YWxpZGF0ZScpO1xuXG5mdW5jdGlvbiBydW4obGVuZ3RoT2ZHcm93dGgpIHtcblxuICAgIHZhciB5ZWFyVG9Db3BwaWNlOyAvL3llYXIgb2YgdGhlIGZpcnN0IG9yIHN1YnNlcXVlbnQgaGFydmVzdHNcbiAgICB2YXIgY29wcGljZUludGVydmFsOyAvL3RoZSAjIG9mIG1vbnRocyBpbiBhIHNpbmdsZSBjb3BwaWNlIGN5Y2xlXG4gICAgdmFyIG1vbnRoVG9Db3BwaWNlOyAvL2F0IHdoaWNoIG1vbnRoIHRoZSBoYXJ2ZXN0IGlzIHRvIGJlIHBlcmZvcm1lZCA6OiBjdXJyZW50bHkgdGhlIHRyZWUgd2lsbCBiZSBjdXQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGF0IG1vbnRoXG4gICAgdmFyIGNvcHBpY2VEYXRlcztcblxuICAgIC8vIGhlbHBlciwgbm90IHJlcXVpcmVkLiAgeW91IGNhbiByZWdpc3RlciBjYWxsYmFjayB0byBzZXQgcGFyYW1ldGVycyB3aGVuZXZlciBydW4gaXMgY2FsbGVkXG4gICAgdGhpcy5pby5yZWFkKHRoaXMpO1xuXG4gICAgLy8gbWFrZSBzdXJlIG1vZGVsIGlucHV0cyBhcmUgdmFsaWQgYmVmb3JlIHdlIHByb2NlZWQgYW55IGZ1cnRoZXJcbiAgICB2YWxpZGF0ZSh0aGlzKTtcblxuICAgIHRoaXMuY3VycmVudERhdGUgPSB0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZDtcbiAgICAvL3ZhciBwbGFudGVkTW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgLy92YXIgY3VycmVudE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuXG4gICAgLy9UT0RPOiB0ZXN0IG5vIGRhdGVjb3BwaWNlIGFzIGlucHV0XG4gICAgaWYgKCB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQgIT09IHVuZGVmaW5lZCApe1xuICAgICAgeWVhclRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRZZWFyKCk7XG4gICAgICBtb250aFRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRNb250aCgpO1xuICAgICAgY29wcGljZUludGVydmFsID0gdGhpcy5tYW5hZ2UueWVhcnNQZXJDb3BwaWNlO1xuICAgIH1cblxuICAgIGlmKCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGNvcHBpY2VEYXRlcyA9IFtdO1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzW2ldLnNwbGl0KCctJyk7XG5cbiAgICAgICAgdmFyIGQgPSAxNTtcbiAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA+IDIgKSB7XG4gICAgICAgICAgZCA9IHBhcnNlSW50KHBhcnRzWzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcHBpY2VEYXRlcy5wdXNoKG5ldyBEYXRlKHBhcnNlSW50KHBhcnRzWzBdKSwgcGFyc2VJbnQocGFydHNbMV0pLTEsIGQpKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIGluaXQgbWFuYWdlIG5zXG4gICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICB9XG5cbiAgICB2YXIgc2V0dXAgPSB7XG4gICAgICBsZW5ndGhPZkdyb3d0aCA6IGxlbmd0aE9mR3Jvd3RoLFxuICAgICAgeWVhclRvQ29wcGljZSA6IHllYXJUb0NvcHBpY2UsXG4gICAgICBtb250aFRvQ29wcGljZSA6IG1vbnRoVG9Db3BwaWNlLFxuICAgICAgY29wcGljZUludGVydmFsIDogY29wcGljZUludGVydmFsLFxuICAgICAgY29wcGljZURhdGVzIDogY29wcGljZURhdGVzLFxuICAgICAgZGFpbHlTdGVwIDogdGhpcy5kYWlseVN0ZXBcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucnVuU2V0dXAoc2V0dXApO1xufVxuXG5mdW5jdGlvbiBydW5TZXR1cChzZXR1cCl7XG4gICAgdmFyIGksIGtleSwgY3VycmVudFdlYXRoZXIsIHN0ZXAsIHQ7XG5cbiAgICBpZiggdGhpcy5kZWJ1ZyApIHtcbiAgICAgIHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdEYWlseVN0ZXA6ICcrc2V0dXAuZGFpbHlTdGVwKTtcbiAgICB9XG5cbiAgICB2YXIgbSA9ICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09PSAxICkge1xuICAgICAgbSA9ICcwJyttO1xuICAgIH1cblxuICAgIHZhciBkID0gKHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpKSsnJztcbiAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICBkID0gJzAnK2Q7XG4gICAgfVxuXG4gICAgLy92YXIgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcbiAgICB2YXIgZmlyc3RTdGVwUmVzdWx0cyA9IGluaXQodGhpcy5wbGFudGF0aW9uLCB0aGlzLnNvaWwpO1xuXG4gICAgdmFyIGtleXNJbk9yZGVyID0gW107XG4gICAgdmFyIGhlYWRlciA9IFsnZGF0ZSddO1xuICAgIGZvcigga2V5IGluIGRhdGFNb2RlbC5wbGFudGF0aW9uX3N0YXRlLnZhbHVlICkge1xuICAgICAga2V5c0luT3JkZXIucHVzaChrZXkpO1xuICAgICAgaGVhZGVyLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBmaXJzdFN0ZXBSZXN1bHRzLkRhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK207XG4gICAgaWYoIHNldHVwLmRhaWx5U3RlcCApIHtcbiAgICAgIGZpcnN0U3RlcFJlc3VsdHMuRGF0ZSArPSAnLScrZDtcbiAgICB9XG5cbiAgICB2YXIgcm93cyA9IFtdOyAvL3RoZXNlIHdpbGwgYmVjb21lIHJvd3NcbiAgICByb3dzLnB1c2goaGVhZGVyKTtcblxuICAgIHZhciBmaXJzdFJvdyA9IFtmaXJzdFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgIGZvciggaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgICBrZXkgPSBrZXlzSW5PcmRlcltpXTtcbiAgICAgIGZpcnN0Um93LnB1c2goZmlyc3RTdGVwUmVzdWx0c1trZXldKTtcbiAgICB9XG4gICAgcm93cy5wdXNoKGZpcnN0Um93KTtcblxuICAgIHZhciBjdXJyZW50U3RlcFJlc3VsdHMgPSBmaXJzdFN0ZXBSZXN1bHRzO1xuICAgIHZhciBuZXh0U3RlcFJlc3VsdHM7XG5cbiAgICBmb3Ioc3RlcCA9IDE7IHN0ZXAgPCBzZXR1cC5sZW5ndGhPZkdyb3d0aDsgc3RlcCsrKSB7XG4gICAgICBpZiggc2V0dXAuZGFpbHlTdGVwICkge1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUodGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTsgLy8gYWRkIGEgZGF5IHRvIGN1cnJlbnQgZGF0ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRNb250aCh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgKyAxKTsgLy8gYWRkIGEgbW9udGggdG8gY3VycmVudCBkYXRlXG4gICAgICB9XG5cbiAgICAgIGlmKCBzaG91bGRDb3BwaWNlKHRoaXMsIHNldHVwKSApIHtcbiAgICAgICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RpbWUgdG8gQ29wcGljZSEnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBtID0gKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgbSA9ICcwJyttO1xuICAgICAgfVxuXG4gICAgICBkID0gdGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkrJyc7XG4gICAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIGQgPSAnMCcrZDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcblxuICAgICAgLy9UT0RPOiBzd2l0Y2ggdXAgdHJlZXMgaGVyZSB3aGVuIGFmdGVyIHRoZSBmaXJzdCBoYXJ2ZXN0XG4gICAgICBuZXh0U3RlcFJlc3VsdHMgPSBzaW5nbGVTdGVwKHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsLCBjdXJyZW50V2VhdGhlciwgdGhpcy5tYW5hZ2UsIGN1cnJlbnRTdGVwUmVzdWx0cywgdGhpcy5kYWlseVN0ZXApO1xuICAgICAgbmV4dFN0ZXBSZXN1bHRzLkRhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK207XG4gICAgICBpZiggc2V0dXAuZGFpbHlTdGVwICkge1xuICAgICAgICBuZXh0U3RlcFJlc3VsdHMuRGF0ZSArPSAnLScrZDtcbiAgICAgIH1cblxuICAgICAgdmFyIHRoaXNSb3cgPSBbbmV4dFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgICAgZm9yKCBpID0gMDsgaSA8IGtleXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgICB0aGlzUm93LnB1c2gobmV4dFN0ZXBSZXN1bHRzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RlcFJlc3VsdHMgPSBuZXh0U3RlcFJlc3VsdHM7XG4gICAgICByb3dzLnB1c2godGhpc1Jvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5pby5kdW1wKHJvd3MpO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyhzdGVwKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgY29uc29sZS5sb2coKG5ldyBEYXRlKCkuZ2V0VGltZSgpLXQpKydtcycpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVTdGVwKHBsYW50YXRpb24sIHNvaWwsIHdlYXRoZXIsIG1hbmFnZSwgcCwgZGFpbHlTdGVwKSB7IC8vcCA9IHByZXZpb3VzIHN0YXRlXG4gIHZhciBjID0ge307IC8vY3VycmVudCBzdGF0ZVxuXG4gIGRhaWx5U3RlcCA9IGRhaWx5U3RlcCA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcbiAgdmFyIHN0ZXBEaXZpc2lvbiA9IGRhaWx5U3RlcCA/IDM2NSA6IDEyO1xuXG4gIGlmKCBtYW5hZ2UuY29wcGljZSA9PT0gdHJ1ZSApIHsgLy9jaGFuZ2UgdGhpcyBndXkgZm9yIHRoZSBtb250aCB3aGVuIGNvcHBpY2VcbiAgICAvLyBBZGQgaW4gYSBzdHVtcCBtYXJnaW4uLi4uXG4gICAgYy5mZWVkc3RvY2tIYXJ2ZXN0ID0gcC5mZWVkc3RvY2tIYXJ2ZXN0ICsgcC5XUztcbiAgICBjLmNvcHBpY2VDb3VudCA9IHAuY29wcGljZUNvdW50ICsgMTtcbiAgICBjLmNvcHBpY2VBZ2UgPSAwO1xuICAgIHAuTEFJID0gMDtcbiAgICBwLldTID0gMDtcbiAgICBwLldGID0gMDtcbiAgICBwLlcgPSBwLldSO1xuICB9IGVsc2Uge1xuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdDtcbiAgICBjLmNvcHBpY2VDb3VudCA9IHAuY29wcGljZUNvdW50O1xuICAgIGMuY29wcGljZUFnZSA9IHAuY29wcGljZUFnZSArIDEuMC9zdGVwRGl2aXNpb247XG4gIH1cblxuICB2YXIgdHJlZTsgLy90cmVlXG4gIGlmKCBjLmNvcHBpY2VDb3VudCA9PT0gMCApIHsgLy9UT0RPOiBjaGVjayB0aGUgY2FzZSB3aGVyZSB3ZSBzdGFydCB3aXRoIGEgY29wcGljZWQgbXVsdGkgc3R1bXAgdHJlZVxuICAgICAgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlO1xuICB9IGVsc2Uge1xuICAgICAgdHJlZSA9IHBsYW50YXRpb24uY29wcGljZWRUcmVlO1xuICB9XG5cbiAgYy5TdGFuZEFnZSA9IHAuU3RhbmRBZ2UgKyAxLjAvc3RlcERpdmlzaW9uO1xuICB2YXIgc2xhID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuU0xBKTtcbiAgYy5MQUkgPSBwLldGICogMC4xICogc2xhOyAvLyBMYW5kc2J1cmcgZXEgOS41XG4gIGMuVlBEID0gZm4uVlBEKHdlYXRoZXIudG1pbiwgd2VhdGhlci50bWF4LCB3ZWF0aGVyLnRkbWVhbik7XG4gIGMuZlZQRCA9IGZuLmZWUEQodHJlZS5rRywgYy5WUEQpO1xuXG4gIGMuZlNXID0gZm4uZlNXKHAuQVNXLCBzb2lsLm1heEFXUywgc29pbC5zd2NvbnN0LCBzb2lsLnN3cG93ZXIpO1xuICBjLmZBZ2UgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5mQWdlKTtcblxuICBjLmZGcm9zdCA9IGZuLmZGcm9zdCh3ZWF0aGVyLnRtaW4pO1xuICBpZiggZGFpbHlTdGVwICkge1xuICAvLyBIQUNLIGZvciBub3dcbiAgICBjLmZGcm9zdCA9IDE7XG4gIC8vICBjLmZGcm9zdCA9IGMuZkZyb3N0IC8gZm4uY29uc3RhbnQoJ2RheXNfcGVyX21vbnRoJyk7XG4gIH1cblxuICBjLlBBUiA9IGZuLlBBUih3ZWF0aGVyLnJhZCk7IC8vIE1vbnRobHkgUEFSIGluIG1vbHNcbiAgaWYoIGRhaWx5U3RlcCApIHtcbiAgICBjLlBBUiA9IGMuUEFSIC8gZm4uY29uc3RhbnQoJ2RheXNfcGVyX21vbnRoJyk7XG4gIH1cblxuICBjLmZUID0gZm4uZlQoKHdlYXRoZXIudG1pbiArIHdlYXRoZXIudG1heCkvMiwgdHJlZS5mVCk7XG5cbiAgYy54UFAgPSBmbi54UFAodHJlZS55LCBjLlBBUik7IC8vIG1heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBwZXIgbW9udGhcbiAgLy9pZiggZGFpbHlTdGVwICkgeyAvLyBwZXIgZGF5XG4gIC8vICBjLnhQUCA9IGMueFBQIC8gZm4uY29uc3RhbnQoJ2RheXNfcGVyX21vbnRoJyk7XG4gIC8vfVxuXG5cbiAgYy5QaHlzTW9kID0gZm4uUGh5c01vZChjLmZWUEQsIGMuZlNXLCBjLmZBZ2UpO1xuICBjLmZOdXRyID0gZm4uZk51dHIodHJlZS5mTjAsIG1hbmFnZS5mZXJ0aWxpdHkpO1xuXG4gIGMuTlBQID0gZm4uTlBQKHAuY29wcGljZUFnZSwgdHJlZS5mdWxsQ2FuQWdlLCBjLnhQUCwgdHJlZS5rLCBwLkxBSSwgYy5mVlBELCBjLmZTVywgYy5mQWdlLCB0cmVlLmFscGhhLCBjLmZOdXRyLCBjLmZULCBjLmZGcm9zdCk7XG4gIC8vaWYoIGRhaWx5U3RlcCApIHsgLy8gcGVyIGRheVxuICAvLyAgYy5OUFAgPSBjLk5QUCAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICAvL31cblxuICB2YXIgTlBQX3RhcmdldCA9IGZuLk5QUCh0cmVlLmZ1bGxDYW5BZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgdHJlZS5yb290UC5MQUlUYXJnZXQsIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuICBjLlJvb3RQID0gZm4uY29wcGljZS5Sb290UChjLk5QUCwgTlBQX3RhcmdldCwgcC5XUiwgcC5XLCB0cmVlLnBSLm14LCB0cmVlLnJvb3RQLmZyYWMpO1xuXG4gIGlmICh0cmVlLmxhVkkgJiYgdHJlZS5sYVZJLmNvbnN0YW50ICkgeyAvLyBUZXN0IGZvciB0aGF0IGZ1bmN0aW9uXG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmc192aWFfVkkocC5XUyoxMDAwMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLndzVkksdHJlZS5sYVZJLHNsYSk7XG4gIH0gZWxzZSB7XG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmcyhwLldTKjEwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUucGZzKTtcbiAgfVxuXG4gIGMuZFcgPSBjLk5QUCArIHRyZWUucm9vdFAuZWZmaWNpZW5jeSAqIGMuUm9vdFA7XG5cbiAgYy5JbnRjcHRuID0gZm4uSW50Y3B0bihjLkxBSSwgdHJlZS5JbnRjcHRuKTtcbiAgYy5DYW5Db25kID0gZm4uQ2FuQ29uZChjLlBoeXNNb2QsIGMuTEFJLCB0cmVlLkNvbmR1Y3RhbmNlKTtcblxuICBjLnBSID0gZm4ucFIoYy5QaHlzTW9kLCBwLldSL3AuVywgbWFuYWdlLmZlcnRpbGl0eSwgdHJlZS5wUik7XG4gIGMubGl0dGVyZmFsbCA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLmxpdHRlcmZhbGwpO1xuXG4gIGMuVHJhbnNwID0gZm4uVHJhbnNwKHdlYXRoZXIucmFkLCB3ZWF0aGVyLmRheWxpZ2h0LCBjLlZQRCwgdHJlZS5CTGNvbmQsIGMuQ2FuQ29uZCk7XG4gIGlmKCBkYWlseVN0ZXAgKSB7XG4gICAgYy5UcmFuc3AgPSBjLlRyYW5zcCAvIGZuLmNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlZCBmcm9tIHBmc1xuICBjLnBTID0gKDEgLSBjLnBSKSAvICgxICsgYy5wZnMgKTtcbiAgYy5wRiA9ICgxIC0gYy5wUikgLyAoMSArIDEvYy5wZnMgKTtcblxuICBjLklycmlnID0gZm4uSXJyaWcobWFuYWdlLmlycmlnRnJhYywgYy5UcmFuc3AsIGMuSW50Y3B0biwgd2VhdGhlci5wcHQpO1xuICBjLkN1bUlycmlnID0gcC5DdW1JcnJpZyArIGMuSXJyaWc7XG5cbiAgYy5BU1cgPSBmbi5BU1coc29pbC5tYXhBV1MsIHAuQVNXLCB3ZWF0aGVyLnBwdCwgYy5UcmFuc3AsIGMuSW50Y3B0biwgYy5JcnJpZyk7IC8vZm9yIHNvbWUgcmVhc29uIHNwZWxsZWQgbWF4QVdTXG5cbiAgYy5XRiA9IHAuV0YgKyBjLmRXICogYy5wRiAtIGMubGl0dGVyZmFsbCAqIHAuV0Y7XG4gIC8vIEluY2x1ZGUgY29udHJpYnV0aW9uIG9mIFJvb3RQIC8vIEVycm9yIGluIG9sZCBjb2RlICFcbiAgYy5XUiA9IHAuV1IgKyBjLmRXICogYy5wUiAtIHRyZWUucFIudHVybm92ZXIgKiBwLldSIC0gYy5Sb290UDtcbiAgYy5XUyA9IHAuV1MgKyBjLmRXICogYy5wUztcbiAgYy5XID0gYy5XRitjLldSK2MuV1M7XG5cbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIGluaXQocGxhbnRhdGlvbiwgc29pbCkge1xuICB2YXIgcCA9IHt9O1xuICB2YXIgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlOyAvL1RPRE86IGRlY2lkZSB0aGUgY2FzZSB3aGVyZSB3ZSBzdGFydCB3aXRoIGEgY29wcGljZWQgdHJlZT9cblxuICBwLmZlZWRzdG9ja0hhcnZlc3Q9MDtcbiAgcC5jb3BwaWNlQ291bnQ9MDtcbiAgcC5jb3BwaWNlQWdlID0gMDtcblxuICBwLkN1bUlycmlnID0gMDtcbiAgcC5kVyA9IDA7XG4gIHAuVyA9IHBsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5ICogcGxhbnRhdGlvbi5TZWVkbGluZ01hc3M7XG4gIHAuV0YgPSBwbGFudGF0aW9uLnBGICogcC5XO1xuICBwLldTID0gcGxhbnRhdGlvbi5wUyAqIHAuVztcbiAgcC5XUiA9IHBsYW50YXRpb24ucFIgKiBwLlc7XG4gIHAuQVNXID0gMC44ICogMTAgKiBzb2lsLm1heEFXUzsgLy8gVGhlIDEwIGlzIGJlY2F1c2UgbWF4QVdTIGlzIGluIGNtIGFuZCBBU1cgaW4gbW0gKD8pIFdoeSAoPylcbiAgcC5TdGFuZEFnZSA9IDA7XG5cbiAgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlO1xuXG4gIC8vIHNsYSA9IFNwZWNpZmljIExlYWYgQXJlYVxuICB2YXIgc2xhID0gZm4udGRwKHAuU3RhbmRBZ2UsdHJlZS5TTEEpO1xuXG4gIHAuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuXG4gIC8vIFRoZXNlIGFyZW4ndCB1c2VkIHNvIGNhbiBiZSBzZXQgdG8gYW55dGhpbmc7ICBUaGV5IGFyZSBzZXQgdG8gbWF0Y2ggdGhlIHBvc3RncmVzIHR5cGVcbiAgcC5WUEQgICAgICAgID0gMDtcbiAgcC5mVlBEICAgICAgID0gMDtcbiAgcC5mVCAgICAgICAgID0gMDtcbiAgcC5mRnJvc3QgICAgID0gMDtcbiAgcC5mTnV0ciAgICAgID0gMDtcbiAgcC5mU1cgICAgICAgID0gMDtcbiAgcC5mQWdlICAgICAgID0gMDtcbiAgcC5QQVIgICAgICAgID0gMDtcbiAgcC54UFAgICAgICAgID0gMDtcbiAgcC5JbnRjcHRuICAgID0gMDtcbiAgcC5JcnJpZyAgICAgID0gMDtcbiAgcC5DYW5Db25kICAgID0gMDtcbiAgcC5UcmFuc3AgICAgID0gMDtcbiAgcC5QaHlzTW9kICAgID0gMDtcbiAgcC5wZnMgICAgICAgID0gMDtcbiAgcC5wUiAgICAgICAgID0gMDtcbiAgcC5wUyAgICAgICAgID0gMDtcbiAgcC5wRiAgICAgICAgID0gMDtcbiAgcC5saXR0ZXJmYWxsID0gMDtcbiAgcC5OUFAgICAgICAgID0gMDtcbiAgcC5Sb290UCAgICAgID0gMDtcblxuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gZ2V0V2VhdGhlcihtb2RlbCwgc2V0dXAsIG1vbnRoLCBkYXkpIHtcblxuICBpZiggc2V0dXAuZGFpbHlTdGVwICkge1xuICAgIC8vIGFjdHVhbFxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBtb2RlbGxlZCBkYWlseVxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICAvLyBhY3R1YWxcbiAgICBpZiggbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXTtcbiAgICB9XG4gIH1cblxuICAvLyBtb2RlbGxlZCBNb250aGx5XG4gIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoXSAhPT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vbnRoXTtcbiAgfVxuXG4gIHRocm93ICdSdW50aW1lIEVycm9yOiBubyB3ZWF0aGVyIGZvdW5kIGZvciBtb250aDogJyttb250aDtcbn1cblxuZnVuY3Rpb24gc2hvdWxkQ29wcGljZShtb2RlbCwgc2V0dXApIHtcbiAgLy8gZG8gd2UgaGF2ZSBzcGVjaWZpYyBjb3BwaWNlIGRhdGVzIHNldD9cbiAgaWYoIHNldHVwLmNvcHBpY2VEYXRlcyApIHtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNldHVwLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBkID0gc2V0dXAuY29wcGljZURhdGVzW2ldO1xuXG4gICAgICBpZiggc2V0dXAuZGFpbHlTdGVwICkge1xuICAgICAgICBpZiggZC5nZXRZZWFyKCkgPT09IHRoaXMuY3VycmVudERhdGUuZ2V0WWVhcigpICYmXG4gICAgICAgICAgICBkLmdldE1vbnRoKCkgPT09IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSAmJlxuICAgICAgICAgICAgZC5nZXREYXRlKCkgPT09IHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpICkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIGQuZ2V0WWVhcigpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldFllYXIoKSAmJlxuICAgICAgICAgICAgZC5nZXRNb250aCgpID09PSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG4gIH0gZWxzZSB7XG5cbiAgICAvLyBkbyB3ZSBoYXZlIGFuIGludGVydmFsIHNldD9cbiAgICAvLyBUT0RPOiB0aGlzIGN1cnJlbnRseSBvbmx5IHdvcmtzIG9uIDFzdCBvZiBtb250aFxuICAgIGlmKCBtb2RlbC5jdXJyZW50RGF0ZS5nZXRZZWFyKCkgPT09IHNldHVwLnllYXJUb0NvcHBpY2UgJiZcbiAgICAgIG1vZGVsLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgPT09IHNldHVwLm1vbnRoVG9Db3BwaWNlICl7XG5cbiAgICAgIHNldHVwLnllYXJUb0NvcHBpY2UgPSBzZXR1cC55ZWFyVG9Db3BwaWNlICsgc2V0dXAuY29wcGljZUludGVydmFsOyAvL25leHQgY29wcGljZSB5ZWFyXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbihuYW1lKSB7XG4gIGlmKCBmbltuYW1lXSApIHtcbiAgICByZXR1cm4gZm5bbmFtZV07XG4gIH0gZWxzZSBpZiggZm4uY29wcGljZVtuYW1lXSApIHtcbiAgICByZXR1cm4gZm4uY29wcGljZVtuYW1lXTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbykge1xuICByZXR1cm4ge1xuICAgIGlvIDogaW8sXG4gICAgcnVuIDogcnVuLFxuICAgIHNpbmdsZVN0ZXAgOiBzaW5nbGVTdGVwLFxuICAgIHJ1blNldHVwIDogcnVuU2V0dXAsXG4gICAgaW5pdCA6IGluaXQsXG4gICAgZ2V0RnVuY3Rpb24gOiBnZXRGdW5jdGlvbixcbiAgICBzZXRJTyA6IGZ1bmN0aW9uKGlvKSB7XG4gICAgICB0aGlzLmlvID0gaW87XG4gICAgfSxcbiAgICBnZXREYXRhTW9kZWwgOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkYXRhTW9kZWw7XG4gICAgfVxuICB9O1xufTtcbiIsImZ1bmN0aW9uIGVudigpIHtcbiAgaWYoIHR5cGVvZiBwbHY4ICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcInBsdjhcIjtcbiAgaWYoIHR5cGVvZiBMb2dnZXIgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIFwiYXBwc2NyaXB0XCI7XG4gIGlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgcmV0dXJuIFwibm9kZVwiO1xufVxuXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gIHZhciBlID0gZW52KCk7XG4gIGlmKCBlID09IFwicGx2OFwiICkgcGx2OC5lbG9nKE5PVElDRSwgJ25vdGljZScsIG1zZyk7XG4gIGVsc2UgaWYoIGUgPT0gXCJhcHBzY3JpcHRcIiApIExvZ2dlci5sb2cobXNnKTtcbiAgZWxzZSBjb25zb2xlLmxvZyhtc2cpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iaikgcmV0dXJuIG9iajtcbiAgdmFyIGNvcHkgPSBvYmouY29uc3RydWN0b3IoKTtcbiAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gb2JqW2F0dHJdO1xuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW52IDogZW52LFxuICBsb2cgOiBsb2csXG4gIGNsb25lIDogY2xvbmVcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIFZhbGlkYXRlIGEgbW9kZWwgcnVuIHNldHVwLiAgdGhyb3cgZXJyb3IgaXMgYmFkbmVzcy5cbiAqL1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgcGFyYW1FcnJvciA9ICdWYWxpZGF0aW9uIEVycm9yOiAnO1xuXG52YXIgdmFsaWRXZWF0aGVyS2V5cyA9IFtcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkJC8sIC8vIHNwZWNpZmljIHdlYXRoZXIgWVlZWS1NTSBmb3IgbW9udGhseSB0aW1lc3RlcFxuICAvXlxcZFxcZCQvLCAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkLVxcZFxcZCQvIC8vIG1vZGVsbGVkIG9yIGF2ZXJhZ2Ugd2VhdGhlciBNTS1ERCBmb3IgZGFpbHkgdGltZXN0ZXBcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFsaWRhdGVQbGFudGF0aW9uKG1vZGVsKTtcbiAgdmFsaWRhdGVNYW5hZ2UobW9kZWwpO1xuICB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpO1xuICB2YWxpZGF0ZVNvaWwobW9kZWwpO1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVNYW5hZ2UobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5tYW5hZ2UgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnbWFuYWdlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5tYW5hZ2UsIG1vZGVsLm1hbmFnZSwgJ21hbmFnZScpO1xuXG4gIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzICkge1xuICAgIGlmKCAhQXJyYXkuaXNBcnJheShtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzKSApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZS5jb3BwaWNlRGF0ZXMgc2hvdWxkIGJlIGFuIGFycmF5IG9mIGRhdGUgc3RyaW5ncy4nO1xuICAgIH1cblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZCQnKSB8fCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkJykgKSB7XG4gICAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIG1hbmFnZS5jb3BwaWNlRGF0ZXMgZm9ybWF0ICcrbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXSsnLiBzaG91bGQgYmUgWVlZWS1NTSBmb3JtYXQuJztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG5cbiAgICBpZiggbW9kZWwubWFuYWdlLmRhdGVDb3BwaWNlZCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS5kYXRlQ29wcGljZWQgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cbiAgICBpZiggbW9kZWwubWFuYWdlLnllYXJzUGVyQ29wcGljZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cblxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlV2VhdGhlcihtb2RlbCkge1xuICBpZiggIW1vZGVsLndlYXRoZXIgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnTm8gd2VhdGhlciBkZWZpbmVkJztcbiAgfVxuXG4gIGZvciggdmFyIGtleSBpbiBtb2RlbC53ZWF0aGVyICkge1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsaWRXZWF0aGVyS2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBrZXkubWF0Y2godmFsaWRXZWF0aGVyS2V5c1tpXSkgKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICFmb3VuZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIHdlYXRoZXIga2V5OiAnK2tleTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC53ZWF0aGVyLCBtb2RlbC53ZWF0aGVyW2tleV0sICd3ZWF0aGVyJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNvaWwobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5zb2lsICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3NvaWwgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuXG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnNvaWwsIG1vZGVsLnNvaWwsICdzb2lsJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCkge1xuICBpZiggIW1vZGVsLnBsYW50YXRpb24gKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbiBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnBsYW50YXRpb24sIG1vZGVsLnBsYW50YXRpb24sICdwbGFudGF0aW9uJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uc2VlZGxpbmdUcmVlLCAncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUnKTtcblxuICBpZiggIW1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24uY29wcGljZWRUcmVlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwudHJlZSwgbW9kZWwucGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUsICdwbGFudGF0aW9uLmNvcHBpY2VkVHJlZScpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbCwgbW9kZWwsIG5hbWUpIHtcbiAgdmFyIGtleSwgaXRlbTtcblxuICBmb3IoIGtleSBpbiBkYXRhTW9kZWwudmFsdWUgKSB7XG4gICAgaXRlbSA9IGRhdGFNb2RlbC52YWx1ZVtrZXldO1xuICAgIGlmKCBpdGVtLnJlcXVpcmVkID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKCBtb2RlbFtrZXldID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yK25hbWUrJy4nK2tleSsnIGlzIG1pc3NpbmcgJytcbiAgICAgICAgICAgIChpdGVtLmRlc2NyaXB0aW9uID8gJygnK2l0ZW0uZGVzY3JpcHRpb24rJyknIDogJycpO1xuICAgIH1cblxuICAgIGlmKCB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICB2YWxpZGF0ZU1vZGVsKGl0ZW0sIG1vZGVsW2tleV0sIG5hbWUrJy4nK2tleSk7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcbnZhciBjaGFydHM7XG52YXIgaW5wdXRGb3JtO1xudmFyIGV4cG9ydGVyID0gcmVxdWlyZSgnLi9leHBvcnQnKTtcbnZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG5cblxuLy8gaW1wb3J0IG1vZGVsIHN0dWZmXG52YXIgbW9kZWwgPSByZXF1aXJlKCcuLi8uLi9wb3BsYXItM3BnLW1vZGVsJyk7XG52YXIgbW9kZWxJTyA9IHJlcXVpcmUoJy4vbW9kZWxJTycpO1xubW9kZWwuc2V0SU8obW9kZWxJTyk7XG5cbnZhciBkYWlseSA9IGZhbHNlO1xuXG52YXIgcnVuQ2FsbGJhY2sgPSBudWxsO1xudmFyIF8zcGdNb2RlbCA9IG51bGw7XG5cbnZhciBpbnB1dHMgPSB7XG4gIHdlYXRoZXIgOiBbXCJtb250aFwiLFwidG1pblwiLFwidG1heFwiLFwidGRtZWFuXCIsXCJwcHRcIixcInJhZFwiLFwiZGF5bGlnaHRcIl1cbn07XG52YXIgb3V0cHV0cyA9IFtcIlZQRFwiLFwiZlZQRFwiLFwiZlRcIixcImZGcm9zdFwiLFwiUEFSXCIsXCJ4UFBcIixcIkludGNwdG5cIixcIkFTV1wiLFwiQ3VtSXJyaWdcIixcbiAgICAgICAgICAgXCJJcnJpZ1wiLFwiU3RhbmRBZ2VcIixcIkxBSVwiLFwiQ2FuQ29uZFwiLFwiVHJhbnNwXCIsXCJmU1dcIixcImZBZ2VcIixcbiAgICAgICAgICAgXCJQaHlzTW9kXCIsXCJwUlwiLFwicFNcIixcImxpdHRlcmZhbGxcIixcIk5QUFwiLFwiV0ZcIixcIldSXCIsXCJXU1wiLFwiV1wiXTtcbnZhciBkZWJ1ZyA9IGZhbHNlO1xudmFyIGRldm1vZGUgPSBmYWxzZTtcblxudmFyIHdlYXRoZXJDdXN0b21DaGFydCA9IG51bGw7XG5cbi8vIHJvdyByYXcgZGF0YSBkb2VzIGEgbG90IG9mIHByb2Nlc3Npbmcgb2YgdGhlIHJlc3VsdHMgYW5kIHRoZSBjdXJyZW50IHN0YXRlIG9mIHdoYXQnc1xuLy8gYmVpbmcgZGlzcGxheWVkLiAgR28gYWhlYWQgYW4gc2V0dXAgdGhlIGNzdiBkYXRhIGF0IHRoaXMgcG9pbnQsIHRoZW4gaWYgdGhlIHVzZXJcbi8vIGRlY2lkZXMgdG8gZXhwb3J0LCB3ZSBhcmUgYWxsIHNldCB0byB0bztcbnZhciBjc3ZSZXN1bHRzID0gbnVsbDtcblxudmFyIGdldE1vZGVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBtb2RlbDtcbn1cblxudmFyIGdldE91dHB1dHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG91dHB1dHM7XG59XG5cblxuXG52YXIgb3V0cHV0RGVmaW5pdGlvbnMgPSByZXF1aXJlKCcuL291dHB1dERlZmluaXRpb25zJyk7XG5cblxuZnVuY3Rpb24gcXMoa2V5KSB7XG4gIGtleSA9IGtleS5yZXBsYWNlKC9bKis/XiQuXFxbXFxde30oKXxcXFxcXFwvXS9nLCBcIlxcXFwkJlwiKTtcbiAgdmFyIG1hdGNoID0gbG9jYXRpb24uc2VhcmNoLm1hdGNoKG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBrZXkgKyBcIj0oW14mXSspKCZ8JClcIikpO1xuICByZXR1cm4gbWF0Y2ggJiYgZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGlucHV0Rm9ybSA9IHJlcXVpcmUoJy4vaW5wdXRGb3JtJykodGhpcyk7XG4gIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG4gIGNoYXJ0cy5zZXRBcHAodGhpcyk7XG5cbiAgbW9kZWxJTy5hcHAgPSB0aGlzO1xuICBtb2RlbElPLm1vZGVsID0gbW9kZWw7XG4gIG1vZGVsSU8uY2hhcnRzID0gY2hhcnRzO1xuICBtb2RlbElPLmlucHV0Rm9ybSA9IGlucHV0Rm9ybTtcblxuICAvLyBjaGVjayBpZiBmbGFzaCBpcyBpbnN0YWxsZWQuICBJZiBub3QsIGhpZGUgdGhlIGNoYXJ0IHR5cGUgdG9nZ2xlLlxuICByZXF1aXJlKCcuL2ZsYXNoYmxvY2stZGV0ZWN0b3InKShmdW5jdGlvbih2YWwpe1xuICAgICAgaWYoIHZhbCA+IDAgKSAkKFwiI2NoYXJ0LXR5cGUtYnRuLWdyb3VwXCIpLmhpZGUoKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgZXhwb3J0IG1vZGFsXG4gIGV4cG9ydGVyLmluaXQoKTtcbiAgJChcIiNleHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBvcnRlci5leHBvcnRDc3YoY3N2UmVzdWx0cyk7XG4gIH0pO1xuXG4gIHZhciBlbGUgPSAkKFwiI2lucHV0cy1jb250ZW50XCIpO1xuICBpbnB1dEZvcm0uY3JlYXRlKGVsZSk7XG5cbiAgJChcIiNydW5idG4sICNydW5idG4tc21cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHRoZSBjaGFydHNcbiAgY2hhcnRzLmluaXQoKTtcblxuICAvLyBzZXQgZGVmYXVsdCBjb25maWdcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjIqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoxMCozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcblxuICAvLyBzZXR1cCBuaWNlIHNjcm9sbGluZ1xuICAkKCcuYXBwLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcy5oYXNoKS5vZmZzZXQoKS50b3AtNTVcbiAgICAgICB9LCA3MDApO1xuIH0pO1xuXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgIGNoYXJ0cy5yZXNpemUoKTtcblxuICAgICAgaWYoIHdlYXRoZXJDdXN0b21DaGFydCApIHtcbiAgICAgICAgICB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSBjaGFydHMuY3JlYXRlV2VhdGhlckNoYXJ0KCQoJyNjdXN0b20td2VhdGhlci1jaGFydCcpWzBdLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG4gICAgICB9XG4gIH0pO1xuXG4gIGNhbGxiYWNrKCk7XG59XG5cblxudmFyIHJ1bkNvbXBsZXRlID0gZnVuY3Rpb24ocm93cykge1xuICBpZiAoIHJ1bkNhbGxiYWNrICkgcnVuQ2FsbGJhY2socm93cyk7XG4gIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgcnVuQ2FsbGJhY2sgPSBudWxsO1xufTtcblxudmFyIG1vbnRoc1RvUnVuID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkMSA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICBpZiAoZDEgJiYgZDEgIT09IFwiXCIpIHtcbiAgICAgIGQxID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIGQyID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKTtcbiAgaWYgKGQyICYmIGQyICE9PSBcIlwiKSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIG1vbnRocztcbiAgbW9udGhzID0gKGQyLmdldEZ1bGxZZWFyKCkgLSBkMS5nZXRGdWxsWWVhcigpKSAqIDEyO1xuICBtb250aHMgLT0gZDEuZ2V0TW9udGgoKSArIDE7XG4gIG1vbnRocyArPSBkMi5nZXRNb250aCgpO1xuICByZXR1cm4gbW9udGhzIDw9IDAgPyAxIDogbW9udGhzKzE7XG59XG5cblxudmFyIHJ1bk1vZGVsID0gZnVuY3Rpb24oaXNSdCkge1xuXG4gIGlmICgkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5oYXNDbGFzcyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIlJ1bm5pbmcuLi5cIik7XG5cbiAgaWYoICFjaGVja1dlYXRoZXIoKSApIHJldHVybjtcblxuICAvLyBsZXQgVUkgcHJvY2VzcyBmb3IgYSBzZWMgYmVmb3JlIHdlIHRhbmsgaXRcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgYmUgcHJlZm9ybWVkIHcvIGEgd2Vid29ya2VyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4nLCAxKTtcblxuICAgICAgLy8gcmVhZCBldmVyeXRoaW5nIHNvIHRoZSB2YXJpYXRpb25zIGFyZSBzZXRcbiAgICAgIG1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIG1vZGVsSU8ucmVhZEZyb21JbnB1dHMoKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBvbmx5IHNldHRpbmcgMiB2YXJpYXRpb24gcGFyYW1ldGVyc1xuICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLnZhcmlhdGlvbnMgKSBwYXJhbXMucHVzaChrZXkpO1xuICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgaXMgYSBsaW1pdCBvZiAyIHZhcmlhdGlvbiBwYXJhbWV0ZXJzIHBlciBydW4uICBDdXJyZW50bHkgeW91IGFyZSB2YXJ5aW5nIFwiK1xuICAgICAgICAgICAgICAgIFwidGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxcblxcbiAtXCIrcGFyYW1zLmpvaW4oXCJcXG4gLVwiKSk7XG4gICAgICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBsZXQgdGhlIHdvcmxkIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICAgIGlmKCAhaXNSdCApIGdkcml2ZS5ydW5Nb2RlbFJ0KCk7XG5cbiAgICAgIC8vIHNob3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICAgICQoXCIjdmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIikuaHRtbChcIjxiPlwiKyhwYXJhbXMubGVuZ3RoID09IDAgPyBcIk5vbmVcIiA6IHBhcmFtcy5qb2luKFwiLCBcIikpK1wiPC9iPlwiKTtcblxuICAgICAgLy8gd2UgYXJlIG9ubHkgcnVubmluZyBvbmNlXG4gICAgICBpZiAoIHBhcmFtcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXNpbmdsZVBhcmFtJywgMSk7XG5cbiAgICAgICAgICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgICAgICAgICAgICAgc2hvd1Jlc3VsdHMocm93cyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG1vZGVsLmRhaWx5U3RlcCA9IGRhaWx5O1xuICAgICAgICAgIHZhciBtb250aHMgPSBtb250aHNUb1J1bigpO1xuICAgICAgICAgIGlmKCBkYWlseSApIG1vbnRocyA9IG1vbnRocyAqIDMwO1xuXG4gICAgICAgICAgbW9kZWwucnVuKG1vbnRocyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXZhcmlhdGlvbicsIDEpO1xuXG4gICAgICAgICAgLy8gc2V0IHZhcmlhdGlvbiBvcmRlclxuICAgICAgICAgIHZhciBydW5zID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICAgICAgICAgIG91dHB1dCA6IG51bGxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgb2JqLmlucHV0c1twYXJhbXNbMF1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dW2ldO1xuICAgICAgICAgICAgICBpZiggcGFyYW1zLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzFdXS5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgICAgICAgICAgIHQuaW5wdXRzW3BhcmFtc1sxXV0gPSBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBydW5WYXJpYXRpb24oMCwgcnVucyk7XG4gICAgICB9XG4gIH0sIDI1MCk7XG59XG5cbnZhciBydW5WYXJpYXRpb24gPSBmdW5jdGlvbihpbmRleCwgcnVucykge1xuICAvLyBzZXQgaW5wdXQgdmFyaWFibGVzIGZvciBydW5cbiAgdmFyIHJ1biA9IHJ1bnNbaW5kZXhdO1xuICBmb3IoIHZhciBrZXkgaW4gcnVuLmlucHV0cyApIHtcbiAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwocnVuLmlucHV0c1trZXldKTtcbiAgfVxuXG4gIHJ1bkNhbGxiYWNrID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcnVuc1tpbmRleF0ub3V0cHV0ID0gZGF0YTtcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGlmIChydW5zLmxlbmd0aCA9PSBpbmRleCkge1xuICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb25zdGFudCB0byB0aGUgZmlyc3QgdmFsdWVcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwudmFyaWF0aW9ucyApIHtcbiAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIitrZXkucmVwbGFjZSgvXFwuL2csICctJykpLnZhbChtb2RlbC52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hvd1Jlc3VsdHMocnVucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1blZhcmlhdGlvbihpbmRleCwgcnVucyk7XG4gICAgICB9XG4gIH07XG5cbiAgdmFyIG1vbnRocyA9IG1vbnRoc1RvUnVuKCk7XG4gIGlmKCBkYWlseSApIG1vbnRocyA9IG1vbnRocyAqIDMwO1xuXG4gIG1vZGVsLnJ1bihtb250aHMpO1xufTtcblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgdmFyIGN1cnJlbnRSZXN1bHRzO1xuICBpZiggcmVzdWx0WzBdIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICBjdXJyZW50UmVzdWx0cyA9IFt7XG4gICAgICAgICAgc2luZ2xlUnVuIDogdHJ1ZSxcbiAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICBvdXRwdXQgOiByZXN1bHRcbiAgICAgIH1dXG4gIH0gZWxzZSB7XG4gICAgY3VycmVudFJlc3VsdHMgPSByZXN1bHQ7XG4gIH1cblxuXG4gIHNob3dSYXdPdXRwdXQoY3VycmVudFJlc3VsdHMpO1xuICBjaGFydHMudXBkYXRlQ2hhcnRzKGN1cnJlbnRSZXN1bHRzLCB0cnVlKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gIH0sIDI1MCk7XG5cbn1cblxuLy8gbWFrZSBzdXJlIGFsbCB0aGUgd2VhdGhlciBpcyBzZXQuICAjMSB0aGluZyBwZW9wbGUgd2lsbCBtZXNzIHVwXG52YXIgY2hlY2tXZWF0aGVyID0gZnVuY3Rpb24oKSB7XG4gIC8vIGZpcnN0IGdldCBjdXJyZW50IG1vbnRocyB3ZSBhcmUgZ29pbmcgdG8gcnVuLFxuICB2YXIgc3RhcnQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcblxuICB2YXIgZW5kID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKS5zcGxpdChcIi1cIik7XG4gIHZhciBlTW9udGggPSBwYXJzZUludChlbmRbMV0pO1xuICB2YXIgZVllYXIgPSBwYXJzZUludChlbmRbMF0pO1xuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcblxuICAvLyBub3cgc2VlIGlmIHdlIGhhdmUgY3VzdG9tIHdlYXRoZXIgY292ZXJhZ2VcbiAgdmFyIGhhc0NvdmVyYWdlID0gdHJ1ZTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgd2hpbGUoIGNvdW50IDwgMTAwMDAgKSB7XG4gICAgICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBtID0gKGNEYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICB2YXIgeSA9IGNEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgaWYoIGNEYXRlLmdldE1vbnRoKCkrMSA9PSBlTW9udGggJiYgeSA9PSBlWWVhciApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyW3krJy0nK21dICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNEYXRlLnNldE1vbnRoKGNEYXRlLmdldE1vbnRoKCkrMSk7XG4gICAgICBjb3VudCsrO1xuICB9XG5cbiAgaWYoIGhhc0NvdmVyYWdlICkgcmV0dXJuIHRydWU7XG5cbiAgLy8gaWYgbm90IG1ha2Ugc3VyZSB3ZSBoYXZlIGF2ZXJhZ2VzIHNlbGVjdGVkXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBpbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjID0gaW5wdXRzLndlYXRoZXJbal07XG4gICAgICAgICAgdmFyIHZhbCA9IHBhcnNlRmxvYXQoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgbSkudmFsKCkpO1xuICAgICAgICAgIGlmKCAhdmFsICYmIHZhbCAhPSAwICkge1xuICAgICAgICAgICAgICBhbGVydChcIk1pc3Npbmcgd2VhdGhlciBkYXRhOiBcIitjK1wiIGZvciBtb250aCBcIittK1wiXFxuXFxuXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiRGlkIHlvdSBzZWxlY3QgYSBsb2NhdGlvbiAoU2V0dXApIGFuZC9vciBhcmUgYWxsIHdlYXRoZXIvc29pbCBmaWVsZHMgZmlsbGVkIG91dD9cIik7XG4gICAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBzZXRXZWF0aGVyID0gZnVuY3Rpb24oZGF0YSkge1xuICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICBpZiggZGF0YSApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBkYXRhICkge1xuXG4gICAgICAgICAgLy8gY2xlYW4gdXAgZGF0ZSBmb3JtYXRcbiAgICAgICAgICB2YXIgZGF0ZSA9IGtleS5yZXBsYWNlKC9bXlxcZC1dLywnJyk7XG4gICAgICAgICAgdmFyIHBhcnRzID0gZGF0ZS5zcGxpdCgnLScpO1xuXG4gICAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA8IDIgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhbGVydCgnSW52YWxpZCBEYXRlIEZvcm1hdC4gIERhdGVzIHNob3VsZCBiZSBpbiBZWVlZLU1NIGZvcm1hdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHBhcnRzWzFdLmxlbmd0aCAhPSAyICkge1xuICAgICAgICAgICAgICBkYXRlID0gcGFydHNbMF0rXCItMFwiK3BhcnRzWzFdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdID0gZGF0YVtrZXldO1xuICAgICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGFycmF5IHNvIHdlIGNhbiBzb3J0XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhlYWRlcnMgPSBbJ2RhdGUnXTtcbiAgZm9yKCB2YXIgZGF0ZSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlciApIHtcblxuICAgICAgdmFyIHQgPSBbZGF0ZV07XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gKSB7XG4gICAgICAgICAgaWYoIGtleSA9PSAnbnJlbCcgKSBjb250aW51ZTtcbiAgICAgICAgICBpZiggYXJyLmxlbmd0aCA9PSAwICkgaGVhZGVycy5wdXNoKGtleSk7XG4gICAgICAgICAgdC5wdXNoKG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaCh0KTtcbiAgfVxuXG4gIGlmKCBhcnIubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKFwiTm8gd2VhdGhlciBkYXRhIGhhcyBiZWVuIHVwbG9hZGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBodG1sID0gJzxkaXYgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21heC1oZWlnaHQ6NjAwcHhcIj48dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPic7XG5cbiAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICB2YXIgZDEgPSBuZXcgRGF0ZShhWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcbiAgICAgIHZhciBkMiA9IG5ldyBEYXRlKGJbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuXG4gICAgICBpZiggZDEgPCBkMiApIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSBpZiggZDEgPiBkMiApIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICB9KTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dGg+JytoZWFkZXJzW2ldKyc8L3RoPic7XG4gIH1cbiAgaHRtbCArPSAnPC90cj4nO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2FycltpXS5qb2luKCc8L3RkPjx0ZD4nKSsnPC90ZD48L3RyPic7XG4gIH1cblxuICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKGh0bWwrJzwvdGFibGU+PC9kaXY+PGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+Jyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICB9LCAxMDAwKTtcblxufTtcblxudmFyIHNob3dSYXdPdXRwdXQgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG5cbiAgLy8gc2VsZWN0ZWQgaW4gdGhlIGNoYXJ0cyBvdXRwdXRcbiAgdmFyIHZhcnMgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpO1xuXG4gIC8vIGZpbmQgdGhlIHJvd3Mgd2UgY2FyZSBhYm91dFxuICB2YXIgY2hhcnRSb3dzID0ge307XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcmVzdWx0c1swXS5vdXRwdXRbMF0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdmFycy5pbmRleE9mKHJlc3VsdHNbMF0ub3V0cHV0WzBdW2ldKSA+IC0xICkgY2hhcnRSb3dzW3Jlc3VsdHNbMF0ub3V0cHV0WzBdW2ldXSA9IGk7XG4gIH1cblxuICB2YXIgdGFicyA9ICQoJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cInJhd091dHB1dFRhYnNcIiAgZGF0YS10YWJzPVwicGlsbFwiPjwvdWw+Jyk7XG4gIHZhciBjb250ZW50cyA9ICQoJzxkaXYgY2xhc3M9XCJwaWxsLWNvbnRlbnRcIiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWFyZ2luLXRvcDoxNXB4XCI+PC9kaXY+Jyk7XG5cbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFicy5hcHBlbmQoJCgnPGxpICcrKGkgPT0gMCA/ICdjbGFzcz1cImFjdGl2ZVwiJyA6IFwiXCIpKyc+PGEgaHJlZj1cIiNyYXdvdXQnXG4gICAgICAgICAgK3ZhcnNbaV0rJ1wiIGRhdGEtdG9nZ2xlPVwidGFiXCI+Jyt2YXJzW2ldKyc8L2E+PC9saT4nKSk7XG5cbiAgICAgIGNvbnRlbnRzLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwicGlsbC1wYW5lICcgKyAoaSA9PSAwID8gJ2FjdGl2ZScgOiBcIlwiKVxuICAgICAgICAgICsgJ1wiIGlkPVwicmF3b3V0JyArIHZhcnNbaV0gKyAnXCI+PC9kaXY+JykpO1xuICB9XG5cbiAgJChcIiNvdXRwdXQtY29udGVudFwiKS5odG1sKFwiXCIpLmFwcGVuZCh0YWJzKS5hcHBlbmQoY29udGVudHMpO1xuICAkKFwiI3Jhd091dHB1dFRhYnNcIikudGFiKCk7XG5cbiAgY3N2UmVzdWx0cyA9IHtcbiAgICAgIGNvbmZpZyA6IG1vZGVsSU8uZXhwb3J0U2V0dXAoKSxcbiAgICAgIGRhdGEgOiB7fVxuICB9O1xuXG4gIC8vIHNvbWUgcm93cyBoYXZlIHN0cmluZ3MsIHdlIGRvbid0IHdhbnQgdGhlc2VcbiAgLy8gaWdub3JlIHN0cmluZyByb3dzXG4gIC8qZm9yKCB2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIGNsZWFuID0gW3Jlc3VsdHNbaV0ub3V0cHV0WzBdXTtcbiAgICAgIGZvciggdmFyIGogPSAxOyBqIDwgcmVzdWx0c1tpXS5vdXRwdXQubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgaWYoIHR5cGVvZiByZXN1bHRzW2ldLm91dHB1dFtqXVswXSAhPSAnc3RyaW5nJyApIGNsZWFuLnB1c2gocmVzdWx0c1tpXS5vdXRwdXRbal0pO1xuICAgICAgfVxuICAgICAgcmVzdWx0c1tpXS5vdXRwdXQgPSBjbGVhbjtcbiAgfSovXG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciB0YWJsZSwgcm93O1xuICBmb3IoIHZhciBrZXkgaW4gY2hhcnRSb3dzICkge1xuICAgICAgdGFibGUgPSBcIjx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtc3RyaXBlZCc+XCI7XG5cbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldID0gW107XG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgcmVzdWx0c1swXS5vdXRwdXQubGVuZ3RoOyBqKysgKXtcbiAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXSA9IFtdO1xuXG4gICAgICAgICAgLy8gc2V0IGhlYWRlciByb3dcbiAgICAgICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKCdtb250aCcpO1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKCdkYXRlJyk7XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRoPlN0ZXA8L3RoPjx0aD5EYXRlPC90aD5cIjtcbiAgICAgICAgICAgICAgZm9yKCB2YXIgeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGg+XCI7XG4gICAgICAgICAgICAgICAgICB2YXIgdG1wID0gW107XG5cbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIHJlc3VsdHNbel0uaW5wdXRzICkge1xuICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKG1UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8ZGl2PlwiK21UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiggdG1wLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBrZXk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2godG1wLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90aD5cIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvL3ZhciBkYXRlID0gbmV3IERhdGUoY0RhdGUuZ2V0WWVhcigpKzE5MDAsIGNEYXRlLmdldE1vbnRoKCkraiwgY0RhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgLy92YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSsxO1xuICAgICAgICAgICAgICAvL2lmKCBtIDwgMTAgKSBtID0gJzAnK207XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRkPlwiK2orXCI8L3RkPjx0ZD5cIityZXN1bHRzWzBdLm91dHB1dFtqXVswXSsnPC90ZD4nO1xuXG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goaik7XG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2gocmVzdWx0c1swXS5vdXRwdXRbal1bMF0pO1xuXG4gICAgICAgICAgICAgIHZhciB2O1xuICAgICAgICAgICAgICBmb3IoIHZhciB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgICAgICAgICB2ID0gcmVzdWx0c1t6XS5vdXRwdXRbal1bY2hhcnRSb3dzW2tleV1dO1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrditcIjwvdGQ+XCI7XG4gICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgICQoXCIjcmF3b3V0XCIgKyBrZXkpLmh0bWwodGFibGUrXCI8L3RhYmxlPlwiKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gc2VlIHRoZSBleHBvcnQgYnRuXG4gIGlmKCAhb2ZmbGluZU1vZGUgKSAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5zaG93KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIG91dHB1dHMgOiBvdXRwdXRzLFxuICBpbnB1dHMgOiBpbnB1dHMsXG4gIGdldE1vZGVsIDogZ2V0TW9kZWwsXG4gIHJ1bk1vZGVsIDogcnVuTW9kZWwsXG4gIHNob3dSYXdPdXRwdXQgOiBzaG93UmF3T3V0cHV0LFxuICBtb250aHNUb1J1biA6IG1vbnRoc1RvUnVuLFxuICBvdXRwdXREZWZpbml0aW9ucyA6IG91dHB1dERlZmluaXRpb25zLFxuICBxcyA6IHFzLFxuICBzZXRXZWF0aGVyIDogc2V0V2VhdGhlcixcbiAgZ2RyaXZlIDogZ2RyaXZlLFxuICBydW5Db21wbGV0ZSA6IHJ1bkNvbXBsZXRlLFxuICBnZXRNb2RlbElPIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZGVsSU87XG4gIH1cbn07XG4iLCJ2YXIgYXBwO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG52YXIgY1dpZHRoID0gMDtcblxuLy8gdGhlcmUgaXMgbm8gd2F5IHRvIGdldCB0aGUgY29sb3JzIGZvciB0aGUgbGVnZW5kcyAodG8gbWFrZSB5b3VyIG93bilcbi8vIHRoaXMgcG9zdDpcbi8vIGdpdmVzIHRoZXNlIHZhbHVlcy4gIFRoaXMgaXMgYSBIQUNLLCBpZiB0aGV5IGV2ZXIgY2hhbmdlLCB3ZSBuZWVkIHRvIHVwZGF0ZVxudmFyIGdvb2dsZUNoYXJ0Q29sb3JzID0gW1wiIzMzNjZjY1wiLFwiI2RjMzkxMlwiLFwiI2ZmOTkwMFwiLFwiIzEwOTYxOFwiLFwiIzk5MDA5OVwiLFwiIzAwOTljNlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiI2RkNDQ3N1wiLFwiIzY2YWEwMFwiLFwiI2I4MmUyZVwiLFwiIzMxNjM5NVwiLFwiIzk5NDQ5OVwiLFwiIzIyYWE5OVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiI2FhYWExMVwiLFwiIzY2MzNjY1wiLFwiI2U2NzMwMFwiLFwiIzhiMDcwN1wiLFwiIzY1MTA2N1wiLFwiIzMyOTI2MlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiIzU1NzRhNlwiLFwiIzNiM2VhY1wiLFwiI2I3NzMyMlwiLFwiIzE2ZDYyMFwiLFwiI2I5MTM4M1wiLFwiI2Y0MzU5ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiIzljNTkzNVwiLFwiI2E5YzQxM1wiLFwiIzJhNzc4ZFwiLFwiIzY2OGQxY1wiLFwiI2JlYTQxM1wiLFwiIzBjNTkyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgLFwiIzc0MzQxMVwiXTtcblxudmFyIHdlYXRoZXJDaGFydE9wdGlvbnMgPSB7XG4gIHRpdGxlIDogJ1dlYXRoZXInLFxuICBoZWlnaHQgOiAzMDAsXG4gIHZBeGVzOiBbe1xuICAgICAgICAgIHRpdGxlOiBcIlJhZGlhdGlvbiAoTUovZGF5KTsgVGVtcGVyYXR1cmUgKF5DKTsgRGV3IFBvaW50ICheQyk7IERheWxpZ2h0IChoKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUsXG4gICAgICAgICAgbWF4VmFsdWUgOiAzNVxuICAgICAgICB9LHtcbiAgICAgICAgICB0aXRsZTogXCJQcmVjaXBpdGF0aW9uIChtbSlcIixcbiAgICAgICAgICBtaW5WYWx1ZSA6IC01MCxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1MFxuICAgICAgICB9XSxcbiAgaEF4aXM6IHt0aXRsZTogXCJNb250aFwifSxcbiAgc2VyaWVzVHlwZTogXCJiYXJzXCIsXG4gIHNlcmllczoge1xuICAgICAgMDoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAxOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDI6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMzoge3R5cGU6IFwiYXJlYVwiLCB0YXJnZXRBeGlzSW5kZXg6MX0sXG4gICAgICA0OiB7dGFyZ2V0QXhpc0luZGV4OjB9XG4gIH1cbn1cblxuLy8gdGVtcGxhdGUgZm9yIHRoZSBwb3B1cFxudmFyIHNsaWRlclBvcHVwID0gJChcbiAgICAgIFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAnPlwiICtcbiAgICAgICAgICBcIjxpIGNsYXNzPSdpY29uLXJlbW92ZS1jaXJjbGUgcHVsbC1yaWdodCBzbGlkZS1wb3B1cC1jbG9zZSc+PC9pPlwiK1xuICAgICAgICAgIFwiPGRpdiBpZD0nY2Fyb3VzZWwnIGNsYXNzPSdvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lJyBzdHlsZT0nbWFyZ2luLXRvcDoxNXB4Jz48L2Rpdj5cIiArXG5cdFwiPC9kaXY+XCIpO1xuXG52YXIgc2xpZGVyUG9wdXBCZyA9ICQoXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cC1iZyc+Jm5ic3A7PC9kaXY+XCIpO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHNvbWVvbmUgaGFzIGNsaWNrIGEgY2hlY2tib3hcbnZhciBjaGFuZ2VzID0gZmFsc2U7XG5cbi8vIHdoZW4gc2l6aW5nLCB3YWl0IGEgfjMwMG1zIGJlZm9yZSB0cmlnZ2VyaW5nIHJlZHJhd1xudmFyIHJlc2l6ZVRpbWVyID0gLTE7XG5cbnZhciBjaGFydFR5cGVTZWxlY3RvciwgY2hhcnRDaGVja2JveGVzLCBjRGF0YTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgICBzaG93UG9wdXAoKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgY2hhcnQgc2VsZWN0b3JzXG4gICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoe3Nob3c6ZmFsc2V9KTtcblxuICAvLyBzZXQgcG9wdXAgY2xpY2sgaGFuZGxlcnNcbiAgJChcIiNjaGFydFR5cGUtc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsc2VsZWN0QWxsKTtcbiAgJChcIiNjaGFydFR5cGUtdW5zZWxlY3RBbGxcIikub24oJ2NsaWNrJyx1bnNlbGVjdEFsbCk7XG5cbiAgY2hhcnRUeXBlU2VsZWN0b3IgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpO1xuICBjaGFydENoZWNrYm94ZXMgPSAkKFwiI2NoYXJ0U2VsZWN0aW9uc1wiKTtcblxuICB2YXIgYzEgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMVwiKTtcbiAgdmFyIGMyID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzJcIik7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXBwLm91dHB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWwgPSBhcHAub3V0cHV0c1tpXTtcbiAgICAgIGNoYXJ0VHlwZVNlbGVjdG9yLmFwcGVuZCgkKFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyB2YWwgKyBcIicgXCJcbiAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICAgICAgICsgXCI+XCIgKyB2YWwgKyBcIjwvb3B0aW9uPlwiKSk7XG5cbiAgICAgIGlmKCBpICUgMiA9PSAwICkge1xuICAgICAgICAgIGMxLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjMi5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH1cbiAgfVxuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiLmZuLXRvZ2dsZVwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI1wiKyQodGhpcykuYXR0cihcImRhdGF0YXJnZXRcIikpLnRvZ2dsZSgnc2xvdycpO1xuICB9KTtcblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSApIHNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gICAgICBlbHNlIHVuc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgfSk7XG5cbiAgJChcIiNzZWxlY3QtY2hhcnRzLWJ0biwgI3NlbGVjdC1jaGFydHMtdGl0bGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgICBjaGFuZ2VzID0gZmFsc2U7XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtbW9kYWwtY2xvc2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIGlmKCBjaGFuZ2VzICYmIGNEYXRhICkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gICAgICAgICAgICAgIC8vIHVwZGF0ZSByYXcgZGF0YSBhcyB3ZWxsXG4gICAgICAgICAgICAgIGFwcC5zaG93UmF3T3V0cHV0KGNEYXRhKTtcbiAgICAgICAgICB9LDQwMCk7XG5cbiAgICAgIH1cbiAgfSk7XG5cbiAgJChcIi5jaGFydC10eXBlLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICkge1xuICAgICAgICAgICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gICAgICB9XG4gIH0pO1xufVxuXG4vLyBtYWtlIHN1cmUgYW5kIGVuZCBsYWJlbCB0YWdcbmZ1bmN0aW9uIF9jcmVhdGVEZXNjcmlwdGlvbih2YWwpIHtcbiAgaWYoICFhcHAub3V0cHV0RGVmaW5pdGlvbnNbdmFsXSApIHJldHVybiBcIjxiPlwiK3ZhbCtcIjwvYj48L2xhYmVsPlwiO1xuXG4gIHZhciBkZXNjID0gYXBwLm91dHB1dERlZmluaXRpb25zW3ZhbF07XG4gIHZhciBsYWJlbCA9IGRlc2MubGFiZWwgJiYgZGVzYy5sYWJlbC5sZW5ndGggPiAwID8gXCIgLSBcIitkZXNjLmxhYmVsIDogXCJcIjtcbiAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG5cbiAgdmFyIGxhYmVsID0gXCI8Yj5cIit2YWwrXCI8L2I+PHNwYW4gc3R5bGU9J2ZvbnQtc2l6ZToxMnB4Jz5cIitsYWJlbCt1bml0cytcIjwvc3Bhbj48L2xhYmVsPlwiO1xuICB2YXIgaGFzRGVzYyA9IGRlc2MuZGVzY3JpcHRpb24gJiYgZGVzYy5kZXNjcmlwdGlvbi5sZW5ndGggPiAwO1xuICBpZiggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPGRpdiBzdHlsZT0nZm9udC1zaXplOjExcHg7Y29sb3I6Izg4ODtmb250LXN0eWxlOml0YWxpYyc+XCIrZGVzYy5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHZhciBmTmFtZSA9IGRlc2MuYWx0Rm5OYW1lIHx8IHZhbDtcbiAgdmFyIGZuID0gYXBwLmdldE1vZGVsKCkuZ2V0RnVuY3Rpb24oZk5hbWUpO1xuXG4gIGlmKCBmbiB8fCBkZXNjLmZuICkge1xuICAgICAgaWYoICFoYXNEZXNjICkgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweCc+XCI7XG4gICAgICBsYWJlbCArPSBcIiA8YSBzdHlsZT0nZm9udC1zdHlsZTpub3JtYWw7Y3Vyc29yOnBvaW50ZXInIGRhdGF0YXJnZXQ9J2ZuLWRlc2MtXCIrdmFsK1wiJyBjbGFzcz0nZm4tdG9nZ2xlJz5mbigpPC9hPjwvZGl2PlwiO1xuXG4gICAgICBsYWJlbCArPSBcIjxkaXYgaWQ9J2ZuLWRlc2MtXCIrdmFsK1wiJyBzdHlsZT0nZGlzcGxheTpub25lO2ZvbnQtc2l6ZToxMXB4O292ZXJmbG93OmF1dG8nIGNsYXNzPSd3ZWxsIHdlbGwtc20nPlwiK1xuICAgICAgICAgICAgICAgICAgKGZufHxkZXNjLmZuKS50b1N0cmluZygpLnJlcGxhY2UoLyAvZywnJm5ic3A7JykucmVwbGFjZSgvXFxuL2csJzxiciAvPicpK1wiPC9kaXY+XCI7XG4gIH0gZWxzZSBpZiAoIGhhc0Rlc2MgKSB7XG4gICAgICBsYWJlbCArPSBcIjwvZGl2PlwiO1xuICB9XG5cbiAgLy8gVE9ETzogYWRkIGZuIHdlbGxcbiAgcmV0dXJuIGxhYmVsK1wiPGJyIC8+XCI7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLmF0dHIoXCJzZWxlY3RlZFwiLFwic2VsZWN0ZWRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdmFsdWU9XCIrdmFsK1wiXVwiKS5wcm9wKFwiY2hlY2tlZFwiLHRydWUpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdW5zZWxlY3QodmFsKSB7XG4gIGNoYXJ0VHlwZVNlbGVjdG9yLmZpbmQoXCJvcHRpb25bdmFsdWU9XCIrdmFsK1wiXVwiKS5yZW1vdmVBdHRyKFwic2VsZWN0ZWRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdmFsdWU9XCIrdmFsK1wiXVwiKS5wcm9wKFwiY2hlY2tlZFwiLGZhbHNlKTtcbiAgY2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykgc2VsZWN0KGFwcC5vdXRwdXRzW2ldKTtcbn1cblxuZnVuY3Rpb24gdW5zZWxlY3RBbGwoKSB7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXBwLm91dHB1dHMubGVuZ3RoOyBpKyspIHVuc2VsZWN0KGFwcC5vdXRwdXRzW2ldKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGVsZSkge1xuICBlbGUucGFyZW50KCkuaGlkZSgnc2xvdycsIGZ1bmN0aW9uKCl7XG4gICAgICBlbGUucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICB1bnNlbGVjdChlbGUuYXR0cigndHlwZScpKTtcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcHJpbnQoY2hhcnRDb250YWluZXIpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAncHJpbnQtY2hhcnQnLCAxKTtcblxuXG52YXIgZGlzcF9zZXR0aW5nPVwidG9vbGJhcj15ZXMsbG9jYXRpb249bm8sZGlyZWN0b3JpZXM9eWVzLG1lbnViYXI9eWVzLFwiO1xuICBkaXNwX3NldHRpbmcrPVwic2Nyb2xsYmFycz15ZXMsd2lkdGg9ODAwLCBoZWlnaHQ9NjAwLCBsZWZ0PTI1LCB0b3A9MjVcIjtcblxuICB2YXIgc3ZnID0gY2hhcnRDb250YWluZXIuZmluZChcInN2Z1wiKTtcbiAgdmFyIGh0bWwgPSBjaGFydENvbnRhaW5lci5maW5kKFwiZGl2XCIpLmh0bWwoKTtcblxuICB2YXIgZG9jcHJpbnQ9d2luZG93Lm9wZW4oXCJcIixcIlwiLGRpc3Bfc2V0dGluZyk7XG4gIGRvY3ByaW50LmRvY3VtZW50Lm9wZW4oKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzxodG1sPjxoZWFkPjx0aXRsZT48L3RpdGxlPicpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9oZWFkPjxib2R5IG1hcmdpbndpZHRoPVwiMFwiIG1hcmdpbmhlaWdodD1cIjBcIiBvbkxvYWQ9XCJzZWxmLnByaW50KClcIj48Y2VudGVyPicpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZShodG1sKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzwvY2VudGVyPjwvYm9keT48L2h0bWw+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LmNsb3NlKCk7XG4gIGRvY3ByaW50LmZvY3VzKCk7XG5cbn1cblxuXG5mdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgY0RhdGEgPSBkYXRhO1xufVxuXG4vLyBiYXNpY2FsbHkgcmVkcmF3IGV2ZXJ5dGhpbmdcbmZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgLy8gcmVxdWlyZSBtb3JlIHRoYW4gYSAzMCBwaXhlbCB3aWR0aCBjaGFuZ2UgKHNvIHdlIGRvbid0IHJlZHJhdyB3LyBzY3JvbGwgYmFycyBhZGRlZClcbiAgdmFyIHdpbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gIGlmKCBjV2lkdGggPiB3aW5XaWR0aCAtIDE1ICYmIGNXaWR0aCA8IHdpbldpZHRoICsgMTUgKSByZXR1cm47XG4gIGNXaWR0aCA9IHdpbldpZHRoO1xuXG4gIGlmKCByZXNpemVUaW1lciAhPSAtMSApIGNsZWFyVGltZW91dChyZXNpemVUaW1lcik7XG4gIHJlc2l6ZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHJlc2l6ZVRpbWVyID0gLTE7XG4gICAgICB1cGRhdGVDaGFydHMoKTtcbiAgfSwzMDApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGFydHMocmVzdWx0cywgYW5pbWF0ZSkge1xuICBpZiggcmVzdWx0cyApIHNldERhdGEocmVzdWx0cyk7XG4gIGlmKCAhY0RhdGEgKSByZXR1cm47XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5zaG93KCk7XG5cbiAgLy8gY3JlYXRlIGEgbGVnZW5kIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgcnVuXG4gIHZhciBsZWdlbmQgPSBcIlwiO1xuICBpZiggIWNEYXRhWzBdLnNpbmdsZVJ1biApIHtcbiAgICAgIHZhciBjMSA9IFwiXCI7XG4gICAgICB2YXIgYzIgPSBcIlwiO1xuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjRGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgZWxlID0gXCI8ZGl2IHN0eWxlPSdtaW4taGVpZ2h0OjQwcHg7bWFyZ2luLWJvdHRvbToxMHB4Jz48ZGl2IGNsYXNzPSdsZWdlbmQtc3F1YXJlJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpcIitnb29nbGVDaGFydENvbG9yc1tpXStcIic+Jm5ic3A7PC9kaXY+XCI7XG4gICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gY0RhdGFbaV0uaW5wdXRzICkge1xuICAgICAgICAgICAgICBlbGUgKz0gXCI8ZGl2IGNsYXNzPSdsZWdlbmQtdGV4dCc+XCIrbVR5cGUrXCI9XCIrY0RhdGFbaV0uaW5wdXRzW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpICUgMiA9PSAwICkgYzEgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgICAgIGVsc2UgYzIgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgfVxuICAgICAgbGVnZW5kID0gXCI8ZGl2PjxhIGlkPSdsZWdlbmQtcGFuZWwtdG9nZ2xlJyBzdHlsZT0nbWFyZ2luLWxlZnQ6NXB4O2N1cnNvcjpwb2ludGVyJz5MZWdlbmQ8L2E+PC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZy1ib3R0b206NXB4O21hcmdpbi1ib3R0b206MTVweCc+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3JvdycgaWQ9J2xlZ2VuZC1wYW5lbCc+PGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MxK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMitcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8L2Rpdj48L2Rpdj5cIjtcbiAgfVxuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuaHRtbChsZWdlbmQpO1xuICAkKFwiI2xlZ2VuZC1wYW5lbC10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjbGVnZW5kLXBhbmVsXCIpLnRvZ2dsZShcInNsb3dcIik7XG4gIH0pO1xuXG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd01haW5DaGFydCh0eXBlc1tpXSwgYW5pbWF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzaG93LWNoYXJ0LXBvcHVwJywgMSk7XG5cblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5odG1sKFwiXCIpO1xuICAkKCdib2R5Jykuc2Nyb2xsVG9wKDApLmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKS5hcHBlbmQoc2xpZGVyUG9wdXBCZykuYXBwZW5kKHNsaWRlclBvcHVwKTtcblxuICAvLyB0aGlzIGNvdWxkIGNhc2UgYmFkbmVzcy4uLi4gIHdoeSBkb2Vzbid0IGl0IGxpdmUgd2hlbiByZW1vdmVkIGZyb20gRE9NP1xuICBzbGlkZXJQb3B1cC5maW5kKCcuc2xpZGUtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICBoaWRlUG9wdXAoKTtcbiAgfSk7XG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd1BvcHVwQ2hhcnQodHlwZXNbaV0pO1xuICB9XG5cbiAgJCgnI2Nhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgbmF2aWdhdGlvbiA6IHRydWUsIC8vIFNob3cgbmV4dCBhbmQgcHJldiBidXR0b25zXG4gICAgICBzbGlkZVNwZWVkIDogMzAwLFxuICAgICAgcGFnaW5hdGlvblNwZWVkIDogNDAwLFxuICAgICAgc2luZ2xlSXRlbTp0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaWRlUG9wdXAoKSB7XG4gIHNsaWRlclBvcHVwQmcucmVtb3ZlKCk7XG4gIHNsaWRlclBvcHVwLnJlbW92ZSgpO1xuICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsJ2F1dG8nKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dNYWluQ2hhcnQodHlwZSwgYW5pbWF0ZSkge1xuICB2YXIgY2hhcnRUeXBlID0gJChcIi5jaGFydC10eXBlLXRvZ2dsZS5hY3RpdmVcIikuYXR0cihcInZhbHVlXCIpO1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiAvPlwiKTtcbiAgdmFyIG91dGVyUGFuZWwgPSAkKFwiPGRpdj5cIitcbiAgXHRcIjxhIGNsYXNzPSdidG4gYnRuLXhzIGJ0bi1kZWZhdWx0JyBzdHlsZT0nXCIrKGNoYXJ0VHlwZSAhPSBcInRpbWVsaW5lXCIgPyBcInBvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTA7bWFyZ2luOjAgMCAtMjBweCAyMHB4XCIgOiBcIm1hcmdpbi1ib3R0b206NXB4XCIpK1xuICAgICAgXCInIHR5cGU9J1wiK3R5cGUrXCInPlwiICtcbiAgXHRcIjxpIGNsYXNzPSdpY29uLXJlbW92ZSc+PC9pPiBcIit0eXBlK1wiPC9hPjwvZGl2PlwiKTtcbiAgb3V0ZXJQYW5lbC5maW5kKFwiYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHJlbW92ZSgkKHRoaXMpKTtcbiAgfSk7XG4gIGlmKCBjaGFydFR5cGUgPT0gXCJ0aW1lbGluZVwiICkgb3V0ZXJQYW5lbC5jc3MoXCJtYXJnaW4tYm90dG9tXCIsXCIyMHB4XCIpO1xuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuYXBwZW5kKG91dGVyUGFuZWwuYXBwZW5kKHBhbmVsKSk7XG4gIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBmYWxzZSwgbnVsbCwgYW5pbWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9zaG93UG9wdXBDaGFydCh0eXBlKSB7XG4gIHZhciBwYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdpdGVtJz48L2Rpdj5cIik7XG5cbiAgdmFyIHByaW50QnRuID0gJChcIjxhIGNsYXNzPSdidG4gYnRuLXNtIGJ0bi1kZWZhdWx0JyBzdHlsZT0nbWFyZ2luLWxlZnQ6MTZweCc+PGkgY2xhc3M9J2ljb24tcHJpbnQnPjwvaT4gUHJpbnQ8L2E+XCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgcHJpbnQoY2hhcnRQYW5lbCk7XG4gIH0pO1xuICBwYW5lbC5hcHBlbmQocHJpbnRCdG4pO1xuXG4gIHZhciBjaGFydFBhbmVsID0gJChcIjxkaXY+PC9kaXY+XCIpO1xuICBwYW5lbC5hcHBlbmQoY2hhcnRQYW5lbCk7XG5cbiAgc2xpZGVyUG9wdXAuZmluZChcIi5vd2wtdGhlbWVcIikuYXBwZW5kKHBhbmVsKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsICdsaW5lJywgY2hhcnRQYW5lbCwgdHJ1ZSwgW01hdGgucm91bmQoJCh3aW5kb3cpLndpZHRoKCkqLjg4KSwgTWF0aC5yb3VuZCgoJCh3aW5kb3cpLmhlaWdodCgpKi45MCktMTI1KV0pO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2hhcnQodHlwZSwgY2hhcnRUeXBlLCBwYW5lbCwgc2hvd0xlZ2VuZCwgc2l6ZSwgYW5pbWF0ZSkge1xuICB2YXIgY29sID0gMDtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG5cbiAgaWYoIGNoYXJ0VHlwZSA9PSAndGltZWxpbmUnICkge1xuICAgICAgZHQuYWRkQ29sdW1uKCdkYXRlJywgJ01vbnRoJyk7XG4gIH0gZWxzZSB7XG4gICAgICAvL2R0LmFkZENvbHVtbignbnVtYmVyJywgJ01vbnRoJyk7XG4gICAgICBkdC5hZGRDb2x1bW4oJ3N0cmluZycsICdNb250aCcpO1xuICB9XG5cbiAgLy8gc2V0IHRoZSBmaXJzdCBjb2x1bW5cbiAgaWYoICFjRGF0YVswXS5zaW5nbGVSdW4gKSB7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBsYWJlbCA9IFwiXCI7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGNEYXRhW2ldLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgbGFiZWwgKz0ga2V5LnJlcGxhY2UoLy4qXFwuLywnJykrXCI9XCIrY0RhdGFbaV0uaW5wdXRzW2tleV0rXCIgXFxuXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhYmVsID0gbGFiZWwucmVwbGFjZSgvLFxccyQvLCcnKTtcbiAgICAgICAgICBkdC5hZGRDb2x1bW4oJ251bWJlcicsIGxhYmVsKTtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgdHlwZSk7XG4gIH1cblxuICAvLyBmaW5kIHRoZSBjb2x1bW4gd2Ugd2FudCB0byBjaGFydFxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBjRGF0YVswXS5vdXRwdXRbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjRGF0YVswXS5vdXRwdXRbMF1baV0gPT0gdHlwZSkge1xuICAgICAgICAgIGNvbCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG5cbiAgdmFyIGRhdGEgPSBbXTtcbiAgdmFyIG1heCA9IDA7XG4gIC8vIGNyZWF0ZSB0aGUgW11bXSBhcnJheSBmb3IgdGhlIGdvb2dsZSBjaGFydFxuICBmb3IgKCB2YXIgaSA9IDE7IGkgPCBjRGF0YVswXS5vdXRwdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vaWYgKHR5cGVvZiBjRGF0YVswXS5vdXRwdXRbaV1bY29sXSA9PT0gJ3N0cmluZycpIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgcm93ID0gW107XG5cbiAgICAgIC8vdmFyIGRhdGUgPSBuZXcgRGF0ZShjRGF0ZS5nZXRZZWFyKCkrMTkwMCwgY0RhdGUuZ2V0TW9udGgoKStpLCBjRGF0ZS5nZXREYXRlKCkpO1xuICAgICAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSB7XG4gICAgICAgICAgLy8gYWRkIG9uIG1vbnRoXG4gICAgICAgICAgcm93LnB1c2gobmV3IERhdGUoY0RhdGFbMF0ub3V0cHV0W2ldWzBdKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5wdXNoKGNEYXRhWzBdLm91dHB1dFtpXVswXSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoIHZhciBqID0gMDsgaiA8IGNEYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYoIGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdID4gbWF4ICkgbWF4ID0gY0RhdGFbal0ub3V0cHV0W2ldW2NvbF07XG4gICAgICAgICAgcm93LnB1c2goY0RhdGFbal0ub3V0cHV0W2ldW2NvbF0pO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnB1c2gocm93KTtcbiAgfVxuXG4gIGR0LmFkZFJvd3MoZGF0YSk7XG5cbiAgaWYoIGFwcC5vdXRwdXREZWZpbml0aW9uc1t0eXBlXSApIHtcbiAgICAgIHZhciBkZXNjID0gYXBwLm91dHB1dERlZmluaXRpb25zW3R5cGVdO1xuICAgICAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICAgICAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG4gICAgICB0eXBlID0gdHlwZStsYWJlbCt1bml0cztcbiAgfVxuXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgdkF4aXMgOiB7XG4gICAgICAgICAgICAgIHRpdGxlIDogdHlwZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaEF4aXMgOiB7XG4gICAgICAgICAgICAgIHRpdGxlIDogXCJNb250aFwiXG4gICAgICAgICAgfVxuICB9XG4gIGlmKCAhc2hvd0xlZ2VuZCApIG9wdGlvbnMubGVnZW5kID0ge3Bvc2l0aW9uOlwibm9uZVwifTtcblxuICBpZiggc2l6ZSApIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSBzaXplWzBdO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBzaXplWzFdO1xuICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHBhbmVsLndpZHRoKCk7XG4gICAgICBvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMud2lkdGgqLjQ7XG4gIH1cbiAgcGFuZWwud2lkdGgob3B0aW9ucy53aWR0aCkuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBvcHRpb25zLmRpc3BsYXlBbm5vdGF0aW9ucyA9IHRydWU7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQW5ub3RhdGVkVGltZUxpbmUocGFuZWxbMF0pO1xuICAgICAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdlYXRoZXJDaGFydChyb290LCBkYXRhKSB7XG4gICQocm9vdCkuaHRtbCgnJyk7XG5cbiAgdmFyIGR0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuICBkdC5hZGRDb2x1bW4oJ3N0cmluZycsICdNb250aCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNaW4gVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTWF4IFRlbXBlcmF0dXJlJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RldyBQb2ludCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdQcmVjaXBpdGF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1JhZGlhdGlvbicpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdEYXlsaWdodCcpO1xuXG4gIGZvciggdmFyIGRhdGUgaW4gZGF0YSApIHtcbiAgICAgIHZhciBvYmogPSBkYXRhW2RhdGVdO1xuICAgICAgZHQuYWRkUm93KFtcbiAgICAgICAgICBkYXRlKycnLFxuICAgICAgICAgIG9iai50bWluIHx8IDAsXG4gICAgICAgICAgb2JqLnRtYXggfHwgMCxcbiAgICAgICAgICBvYmoudGRtZWFuIHx8IDAsXG4gICAgICAgICAgb2JqLnBwdCB8fCAwLFxuICAgICAgICAgIG9iai5yYWQgfHwgMCxcbiAgICAgICAgICBvYmouZGF5bGlnaHQgfHwgMFxuICAgICAgXSk7XG4gIH1cblxuICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ29tYm9DaGFydChyb290KTtcbiAgY2hhcnQuZHJhdyhkdCwgd2VhdGhlckNoYXJ0T3B0aW9ucyk7XG5cbiAgcmV0dXJuIGNoYXJ0O1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXRBcHAgOiBmdW5jdGlvbihhKSB7XG4gICAgYXBwID0gYTtcbiAgfSxcbiAgICBpbml0IDogaW5pdCxcbiAgICBzZXREYXRhIDogc2V0RGF0YSxcbiAgICBzZWxlY3QgOiBzZWxlY3QsXG4gICAgdW5zZWxlY3QgOiB1bnNlbGVjdCxcbiAgICBzZWxlY3RBbGwgOiBzZWxlY3RBbGwsXG4gICAgdW5zZWxlY3RBbGwgOiB1bnNlbGVjdEFsbCxcbiAgICB1cGRhdGVDaGFydHMgOiB1cGRhdGVDaGFydHMsXG4gICAgcmVtb3ZlIDogcmVtb3ZlLFxuICAgIHNob3dQb3B1cDogc2hvd1BvcHVwLFxuICAgIGhpZGVQb3B1cDogaGlkZVBvcHVwLFxuICAgIHJlc2l6ZSA6IHJlc2l6ZSxcbiAgICBjcmVhdGVXZWF0aGVyQ2hhcnQgOiBjcmVhdGVXZWF0aGVyQ2hhcnRcbn1cbiIsInZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dkcml2ZScpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgICAgICAgc2hvdyA6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX3NldE1lc3NhZ2UobnVsbCk7XG5cbiAgICAgICAgJChcIiNleHBvcnQtbmFtZVwiKS52YWwoXCIzUEcgTW9kZWwgUmVzdWx0cyAoXCIrbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QvLCcgJykucmVwbGFjZSgvXFwuXFxkKlovLCcnKStcIilcIik7XG4gICAgICAgICAgJChcIiNleHBvcnQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TWVzc2FnZShtc2csIHR5cGUsIHByb2dyZXNzKSB7XG4gIGlmKCAhbXNnICkge1xuICAgIHJldHVybiAkKFwiI2V4cG9ydC1tc2dcIikuaGlkZSgpO1xuICB9XG4gICQoXCIjZXhwb3J0LW1zZ1wiKS5zaG93KCk7XG5cbiAgaWYoIHByb2dyZXNzICkge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLmhpZGUoKTtcbiAgfVxuXG4gICQoJyNleHBvcnQtbXNnJykuYXR0cihcImNsYXNzXCIsJ2FsZXJ0IGFsZXJ0LScrdHlwZSk7XG4gICQoJyNleHBvcnQtbXNnLXRleHQnKS5odG1sKG1zZyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVQcm9ncmVzcyhpbmRleCwgdG90YWwpIHtcbiAgcGVyY2VudCA9IDEwMCAqICggaW5kZXggLyB0b3RhbCApO1xuICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3MtYmFyXCIpLmF0dHIoXCJhcmlhLXZhbHVlbm93XCIsIHBlcmNlbnQpLmNzcyhcIndpZHRoXCIscGVyY2VudCtcIiVcIik7XG59XG5cbi8vIHNlZSBpZiBhbiBlcnJvciBleGlzdHMsIGlmIHNvLCBzZXQgc3RhdGVcbmZ1bmN0aW9uIF9jaGVja0Vycm9yKGZpbGUpIHtcbiAgdmFyIGVycm9yTWVzc2FnZSA9IG51bGw7XG4gIGlmKCAhZmlsZSApIGVycm9yTWVzc2FnZSA9IFwiRXJyb3IgY3JlYXRpbmcgZmlsZSBvbiBHb29nbGUgRHJpdmUgOihcIjtcbiAgaWYoIGZpbGUuZXJyb3IgKSBlcnJvck1lc3NhZ2UgPSBmaWxlLm1lc3NhZ2U7XG5cbiAgaWYoIGVycm9yTWVzc2FnZSApIHtcbiAgICBfc2V0TWVzc2FnZShlcnJvck1lc3NhZ2UsIFwiZGFuZ2VyXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4gIC8vIGV4cG9ydCBhcyBjc3ZcbmZ1bmN0aW9uIGV4cG9ydENzdihyZXN1bHRzKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2V4cG9ydC1kcml2ZS1jc3YnLCAxKTtcblxuICAkKFwiI2V4cG9ydC1jc3ZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0aW5nLi4uXCIpO1xuXG4gIHZhciBuYW1lID0gJChcIiNleHBvcnQtbmFtZVwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSB7XG4gICAgX3NldE1lc3NhZ2UoXCJQbGVhc2UgcHJvdmlkZSBhIGZvbGRlciBuYW1lXCIsIFwiZGFuZ2VyXCIpXG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YSA9IHJlc3VsdHMuZGF0YTtcblxuICAvLyBjcmVhdGUgYSBsaXN0IHNvIHdlIGNhbiByZWN1cnNpdmVseSBpdGVyYXRlXG4gIHZhciBrZXlzID0gW107XG4gIGZvciggdmFyIGtleSBpbiBkYXRhICkga2V5cy5wdXNoKGtleSk7XG5cbiAgLy8gY3JlYXRlIGZvbGRlclxuICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGV4cG9ydCBmb2xkZXIuLi5cIiwgXCJpbmZvXCIsIHRydWUpO1xuICBfdXBkYXRlUHJvZ3Jlc3MoMSwga2V5cy5sZW5ndGgrMik7XG4gIGdkcml2ZS5zYXZlRmlsZShuYW1lLFwiQUhCIDNQRyBNb2RlbCBSZXN1bHRzXCIsXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyXCIsXCJcIixmdW5jdGlvbihmaWxlKXtcbiAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgdmFyIHBhcmVudCA9IGZpbGUuaWQ7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDIsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgLy8gY3JlYXRlIGEgbmljZSBmaWxlIGRlc2NyaWJpbmcgdGhlIGN1cnJlbnQgZXhwb3J0XG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBjb25maWcgZmlsZS4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZGVsZXRlIHJlc3VsdHMuY29uZmlnLnBsYW50YXRpb25fc3RhdGU7XG4gICAgdmFyIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdHMuY29uZmlnLG51bGwsXCIgIFwiKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoXCJjb25maWcudHh0XCIsXCJBSEIgM1BHIE1vZGVsIC0gUnVuIENvbmZpZ3VyYXRpb25cIixcInRleHQvcGxhaW5cIixjb25maWcsZnVuY3Rpb24oZmlsZSl7XG4gICAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoMywga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIF9jcmVhdGVFeHBvcnQoMCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtwYXJlbnQ6IHBhcmVudH0pXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpIHtcblxuICAvLyB3ZSBhcmUgYWxsIGRvbmUgOilcbiAgaWYoIGluZGV4ID09IGtleXMubGVuZ3RoICkge1xuICAgIF91cGRhdGVQcm9ncmVzcygxLCAxKTtcbiAgICBfc2V0TWVzc2FnZShcIkV4cG9ydCBTdWNjZXNzZnVsLjxiciAvPjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS8jZm9sZGVycy9cIiArIHBhcmVudCArXG4gICAgICAgICAgXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1leHRlcm5hbC1saW5rLXNpZ24nPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+XCIsIFwic3VjY2Vzc1wiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICB9IGVsc2Uge1xuXG4gICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgIHZhciBjc3YgPSBcIlwiO1xuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIGFuZCBkYXRlXG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGFba2V5XS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBkYXRhW2tleV1baV0ubGVuZ3RoID09IDAgKSBjb250aW51ZTsgLy8gaWdub3JlIHRoZSBibGFuayByb3dzXG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZGF0YVtrZXldW2ldLmxlbmd0aDsgaisrICkgY3N2ICs9IGRhdGFba2V5XVtpXVtqXStcIixcIjtcbiAgICAgIGNzdiA9IGNzdi5yZXBsYWNlKC8sJC8sJycpK1wiXFxuXCI7XG4gICAgfVxuXG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBcIitrZXlzW2luZGV4XStcIi5jc3YuLi4gXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoa2V5c1tpbmRleF0rXCIuY3N2XCIsXCJcIixcInRleHQvY3N2XCIsY3N2LGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuXG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgrNCwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIGluZGV4Kys7XG4gICAgICBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se2NvbnZlcnQ6IHRydWUsIHBhcmVudDogcGFyZW50fSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHBvcnRDc3YgOiBleHBvcnRDc3YsXG4gIGluaXQgICAgICA6IGluaXRcbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vYnJvd3NlcnN0YWNrL2ZsYXNoYmxvY2stZGV0ZWN0b3JcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjYWxsYmFja01ldGhvZCl7XG4gICAgdmFyIHJldHVybl92YWx1ZSA9IDA7XG5cbiAgICBpZihuYXZpZ2F0b3IucGx1Z2luc1tcIlNob2Nrd2F2ZSBGbGFzaFwiXSkge1xuICAgICAgICAgIGVtYmVkX2xlbmd0aCA9ICQoJ2VtYmVkJykubGVuZ3RoO1xuICAgICAgICAgIG9iamVjdF9sZW5ndGggPSAkKCdvYmplY3QnKS5sZW5ndGg7XG5cbiAgICAgICAgICBpZigoZW1iZWRfbGVuZ3RoID4gMCkgfHwgKG9iamVjdF9sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAvKiBNYWMgLyBDaHJvbWUgdXNpbmcgRmxhc2hCbG9jayArIE1hYyAvIFNhZmFyaSB1c2luZyBBZEJsb2NrICovXG4gICAgICAgICAgICAgICQoJ29iamVjdCwgZW1iZWQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvKiBNYWMgLyBGaXJlZm94IHVzaW5nIEZsYXNoQmxvY2sgKi9cbiAgICAgICAgICAgICAgaWYoICQoJ2RpdltiZ2luYWN0aXZlXScpLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICB9IGVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgPiAtMSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG5ldyBBY3RpdmVYT2JqZWN0KCdTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaCcpO1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIElmIGZsYXNoIGlzIG5vdCBpbnN0YWxsZWQgKi9cbiAgICAgICAgICByZXR1cm5fdmFsdWUgPSAxO1xuICAgIH1cblxuICAgIGlmKGNhbGxiYWNrTWV0aG9kICYmIHR5cGVvZihjYWxsYmFja01ldGhvZCkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNhbGxiYWNrTWV0aG9kKHJldHVybl92YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuX3ZhbHVlO1xuICAgIH1cbn07XG4iLCJ2YXIgT2F1dGggPSByZXF1aXJlKCcuL29hdXRoJyk7XG52YXIgZ2RyaXZlUlQgPSByZXF1aXJlKCcuL2dkcml2ZVJUJyk7XG52YXIgYXBwO1xuXG5cbnZhciBNSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnJ1blwiO1xudmFyIFRSRUVfTUlNRV9UWVBFID0gXCJhcHBsaWNhdGlvbi92bmQuYWhiLTNwZy50cmVlXCI7XG52YXIgRFJJVkVfQVBJX1ZFUlNJT04gPSBcInYyXCI7XG5cbi8vIGdvb2dsZSBvYXV0aCBhY2Nlc3MgdG9rZW5cbnZhciB0b2tlbiA9IFwiXCI7XG5cbi8vIGN1cnJlbnRseSBsb2FkZWQgZ2RyaXZlIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlID0gbnVsbDtcbi8vIGxpc3Qgb2YgY3VycmVudGx5IGxvYWRlZCBmaWxlcyAobWV0YWRhdGEpXG52YXIgZmlsZUxpc3QgPSBbXTtcbi8vIGdvb2dsZSBkcml2ZSBzaGFyZSBjbGllbnRcbnZhciBjbGllbnQgPSBudWxsO1xuXG4vLyBsb2FkZWQgdHJlZSBhbmQgbWFuYWdlbWVudFxudmFyIGxvYWRlZFRyZWUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIHRyZWUgZmlsZXMgKG1ldGFkYXRhKVxudmFyIHRyZWVMaXN0ID0gW107XG5cbi8vIGN1cnJlbnQgTUlNRSBUWVBFIHdlIGFyZSBzYXZpbmdcbnZhciBzYXZlTWltZVR5cGUgPSBcIlwiO1xuXG4vKioqXG4gKiAgSW5pdGlhbGl6ZSBnb29nbGUgZHJpdmUgcGFuZWxzLCBidG5zIGFuZCBsb2dpblxuICoqKi9cbmZ1bmN0aW9uIGluaXQoYXBwbGljYXRpb24sIGNhbGxiYWNrKSB7XG4gIGFwcCA9IGFwcGxpY2F0aW9uO1xuICBnZHJpdmVSVC5zZXRBcHAoYXBwKTtcblxuICAvLyBpbml0IGJvb3RzdHJhcCBtb2RhbFxuICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyBpbml0IGJvb3RzdHJhcCBtb2RhbFxuICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjaGVscC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHNldCB0aGUgJ3VwZGF0ZScgYnRuIGNsaWNrIGhhbmRsZXJcbiAgJChcIiNzYXZlLXVwZGF0ZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgX3VwZGF0ZUN1cnJlbnRGaWxlKCk7XG4gIH0pO1xuXG4gIC8vIHNldCB0aGUgJ25ldycgYnRuIGNsaWNrIGhhbmRsZXJcbiAgJChcIiNzYXZlLW5ldy1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgX3NhdmVOZXdGaWxlKCk7XG4gIH0pO1xuXG4gIC8vIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAgX2NyZWF0ZUxvZ2luQnRuKCk7XG5cbiAgLy8gbG9hZCB0aGUgZ29vZ2xlIGF1dGggYW5kIGRyaXZlIGFwaSdzXG4gIF9sb2FkQXBpKGZ1bmN0aW9uKCkge1xuICAgIC8vIGlmIHRoZSB1c2VyIGlzIGF1dGhvcml6ZWQgZ3JhYiB0aGUgcmVmcmVzaCB0b2tlblxuICAgIE9hdXRoLmlzQXV0aG9yaXplZChmdW5jdGlvbihyZWZyZXNoVG9rZW4pe1xuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gcmVmcmVzaCB0b2tlbiwgbGVhdmUsIHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgaWYoICFyZWZyZXNoVG9rZW4gKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgLy8gaWYgd2UgaGF2ZSBhIHJlZmVzaCB0b2tlbiwgdGhlbiB1c2VyIGlzIGFsbCBzZXQsXG4gICAgICAvLyBnZXQgYSBuZXcgYWNjZXNzIHRva2VuIHNvIHdlIGNhbiBzdGFydCB1c2luZyB0aGUgYXBpJ3NcbiAgICAgIC8vIGdyYWIgdGhlaXIgaW5mb3JtYXRpb24gYW5kIGRpc3BsYXlcbiAgICAgIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpe1xuICAgICAgICB0b2tlbiA9IHQ7XG4gICAgICAgIGlmKCB0b2tlbiApIF9zZXRVc2VySW5mbygpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWRcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIF9jaGVja1Rva2VuKCk7XG4gICAgfSwgMTAwMCAqIDUgKiA2MCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIHRoZSB0cmVlICdzaGFyZScgYnRuXG4gICQoXCIjc2hhcmUtdHJlZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAvLyBzZWUgaWYgd2UgaGF2ZSBhIHNoYXJlIGNsaWVudFxuICAgIGlmKCBjbGllbnQgPT0gbnVsbCApIHtcbiAgICAgIC8vIG5vIGNsaWVudCwgbG9hZCBhcGlcbiAgICAgIGdhcGkubG9hZCgnZHJpdmUtc2hhcmUnLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBvbiBsb2FkLCBzaG93IHRoZSBzaGFyZSBwb3B1cCB3aXRoIHRoZSBjdXJyZW50IHRyZWVcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZFRyZWVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2UgaGF2ZSBhIGNsaWVudCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCBjdXJyZW50IHRyZWVcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxuLyoqKlxuICogU2F2ZSB0aGUgY3VycmVudCBtb2RlbCBhcyBhIG5ldyBnb29nbGUgZHJpdmUgZmlsZVxuICoqKi9cbmZ1bmN0aW9uIF9zYXZlTmV3RmlsZSgpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnc2F2ZS1kcml2ZS1maWxlJywgMSk7XG5cbiAgLy8gZ3JhYiB0aGUgbmFtZSBvZiB0aGUgbmV3IGZpbGVcbiAgdmFyIG5hbWUgPSAkKFwiI3NhdmUtbmFtZS1pbnB1dFwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSB7IC8vIHdlIGFsd2F5cyB3YW50IGEgbmFtZSwgYWxlcnQgYW5kIHF1aXRcbiAgICBfc2V0U2F2ZU1lc3NhZ2UoJ1BsZWFzZSBwcm92aWRlIGEgZmlsZW5hbWUuJywnaW5mbycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNlZSB3aGF0IGtpbmQgb2YgZmlsZSB3ZSBhcmUgY3JlYXRpbmcgYmFzZWQgb24gdGhlIHNhdmVNaW1lVHlwZSB2YXJcbiAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKTtcbiAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgIGRhdGEgPSBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCkudHJlZTtcbiAgfSBlbHNlIHsgLy8gYmFkbmVzc1xuICAgIGFsZXJ0KFwiVW5rbm93biBNSU1FX1RZUEU6IFwiK3NhdmVNaW1lVHlwZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2V0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgX3NldFNhdmVNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IFNhdmluZyBGaWxlLi4uJywnaW5mbycpO1xuXG4gIC8vIHNhdmUgdGhlIGZpbGVcbiAgc2F2ZUZpbGUobmFtZSxcbiAgICAgICQoXCIjc2F2ZS1kZXNjcmlwdGlvbi1pbnB1dFwiKS52YWwoKSxcbiAgICAgIHNhdmVNaW1lVHlwZSxcbiAgICAgIGRhdGEsXG4gICAgICBmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgaGFwcGVuZWRcbiAgICAgICAgaWYoIHJlc3AuZXJyb3IgKSByZXR1cm4gX3NldFNhdmVNZXNzYWdlKCdGYWlsZWQgdG8gc2F2ZSB0byBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1N1Y2Vzc2Z1bGx5IHNhdmVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayB0byBoaWRlIHRoZSBwb3B1cCwgc28gdXNlciBzZWVzIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIH0sMTUwMCk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXcgZmlsZSwgdXBkYXRlIG91ciBsaXN0XG4gICAgICAgICAgX3VwZGF0ZUZpbGVMaXN0KCk7XG5cbiAgICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5zXG4gICAgICAgICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK3Jlc3AuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgICAgICBsb2FkZWRGaWxlID0gcmVzcC5pZDtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXcgdHJlZSwgdXBkYXRlIHRoZSBsaXN0XG4gICAgICAgICAgX3VwZGF0ZVRyZWVMaXN0KCk7XG5cbiAgICAgICAgICAvLyBzaG93IHRoZSB0cmVlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChuYW1lKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlc1xuICAgICAgICAgIGxvYWRlZFRyZWUgPSByZXNwLmlkO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgY3VycmVudGx5IGxvYWRlZCBnb29nbGUgZHJpdmUgZmlsZVxuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVDdXJyZW50RmlsZSgpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXBkYXRlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gVXBkYXRpbmcuLi4nLCdpbmZvJyk7XG5cbiAgdmFyIGZpbGUgPSB7fTtcbiAgdmFyIGRhdGEgPSB7fTtcblxuICAvLyBncmFiIHRoZSBjb3JyZW50IGRhdGEgYW5kIGZpbGVpZCBiYXNlZCBvbiBtaW1lVHlwZVxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkRmlsZTtcbiAgICBkYXRhID0gYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZmlsZSA9IGxvYWRlZFRyZWU7XG4gICAgZGF0YSA9IGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIGdvb2dsZSBkcml2ZSBmaWxlXG4gIHVwZGF0ZUZpbGUoZmlsZSxcbiAgICAgIGRhdGEsXG4gICAgICBmdW5jdGlvbihyZXNwKXtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byB1cGRhdGUgb24gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgIGVsc2UgX3NldFNhdmVNZXNzYWdlKCdVcGRhdGUgU3VjY2Vzc2Z1bC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdGhlIHVzZXIga25vd3MgdXBkYXRlIHdhcyBzdWNjZXNzXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGxpc3QgZm9yIHdoYXRldmVyIHR5cGUgd2FzIHVwZGF0ZWRcbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICApO1xufVxuXG4vKioqXG4gKiBzZXQgYSBtZXNzYWdlIGZvciB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXAuXG4gKiAgdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0TG9hZE1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtZmlsZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnc2F2ZSB0byBkcml2ZScgcG9wdXBcbiAqIHR5cGUgLSBib29zdHJhcCBhbGVydCB0eXBlXG4gKioqL1xuZnVuY3Rpb24gX3NldFNhdmVNZXNzYWdlKG1zZywgdHlwZSkge1xuICBpZiggIW1zZyApIHJldHVybiAkKFwiI2dkcml2ZS1zYXZlLW1zZ1wiKS5odG1sKFwiXCIpO1xuICAkKCcjZ2RyaXZlLXNhdmUtbXNnJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LScrdHlwZSsnXCI+Jyttc2crJzwvZGl2PicpO1xufVxuXG4vKioqXG4gKiBjcmVhdGUgdGhlIHRvcCByaWdodCBtZW51LiBUaGlzIG1lbnUgaXMgZm9yIHdoZW4gdGhlIHVzZXIgaXMgbm90IGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dpbkJ0bigpIHtcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+TG9naW48YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nXG4gICAgICArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImxvZ2luLXdpdGgtZ29vZ2xlXCI+PGkgY2xhc3M9XCJpY29uLXNpZ25pblwiPjwvaT4gTG9naW4gd2l0aCBHb29nbGU8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gc2V0IGNsaWNrIGhhbmRsZXJzIGZvciBwb3B1cFxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gYWJvdXQgY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBsb2dpbiBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjbG9naW4td2l0aC1nb29nbGUnKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VzZXItbG9naW4nLCAxKTtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaWduSW4oZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgIF9zZXRVc2VySW5mbygpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBhZGQgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuLyoqKlxuICogQ3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudSBmb3Igd2hlbiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAqKiovXG5mdW5jdGlvbiBfY3JlYXRlTG9nb3V0QnRuKHVzZXJkYXRhKSB7XG4gIC8vIHNldCBidG4gaHRtbFxuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJvdW5kZWRcIiBzcmM9XCInK3VzZXJkYXRhLnBpY3R1cmVcbiAgICAgICsgJ1wiIHN0eWxlPVwibWFyZ2luOi01cHggNXB4IC01cHggMDt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O2JvcmRlcjoxcHggc29saWQgd2hpdGVcIiAvPiAnICsgdXNlcmRhdGEubmFtZVxuICAgICAgKyAnPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+JyArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwic2F2ZVwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC11cGxvYWRcIj48L2k+IFNhdmUgTW9kZWw8L2E+PC9saT4nXG4gICAgICArICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cInNoYXJlLWJ0blwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgTW9kZWw8L2E+PC9saT4nXG4gICAgICArICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cIm9wZW4taW4tZHJpdmVcIiB0YXJnZXQ9XCJfYmxhbmtcIj48aSBjbGFzcz1cImljb24tZXh0ZXJuYWwtbGluay1zaWduXCI+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgTW9kZWw8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9nb3V0XCI+PGkgY2xhc3M9XCJpY29uLXNpZ25vdXRcIj48L2k+IExvZ291dDwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciB0byBzaG93IG1lbnVcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIHNob3cgdGhlIHNhdmUgcG9wdXBcbiAgYnRuLmZpbmQoJyNzYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gc2V0IHRoZSBjdXJyZW50IHNhdmUgbWltZVR5cGVcbiAgICBzYXZlTWltZVR5cGUgPSBNSU1FX1RZUEU7XG5cbiAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHR5cCB0aGV5IGFyZSBzYXZpbmdcbiAgICAkKFwiI2dkcml2ZS1zYXZlLXN1YmhlYWRlclwiKS5odG1sKFwiPGg1PlNhdmUgTW9kZWw8L2g1PlwiKTtcblxuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgLy8gaWYgdGhlIGZpbGUgaXMgbG9hZGVkLCBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICBpZiggbG9hZGVkRmlsZSAhPSBudWxsKSB7XG4gICAgICAvLyBncmFiIHRoZSBjdXJyZW50IGZpbGVzIG1ldGFkYXRhXG4gICAgICB2YXIgZmlsZSA9IHt9O1xuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYoIGZpbGVMaXN0W2ldLmlkID09IGxvYWRlZEZpbGUpIHtcbiAgICAgICAgICBmaWxlID0gZmlsZUxpc3RbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgICAgLy8gcmVuZGVyIHRoZSBmaWxlcyBtZXRhZGF0YSBpbiB0aGUgdXBkYXRlIHBhbmVsXG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKGZpbGUubW9kaWZpZWREYXRlKTtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK2ZpbGUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPlwiK2ZpbGUuZGVzY3JpcHRpb24rXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7Jz5MYXN0IE1vZGlmaWVkOiBcIiArXG4gICAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2ZpbGUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC9cIitmaWxlLmlkK1wiJycgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT4gXCIgK1xuICAgICAgICAgIFwiTGluayB0byBTaGFyZTwvYT4gPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPihtdXN0IGhhdmUgcGVybWlzc2lvbik8L3NwYW4+PGJyIC8+PGJyIC8+XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBjbGVhciBhbnkgbWVzc2FnZVxuICAgIF9zZXRTYXZlTWVzc2FnZShudWxsKTtcblxuICAgIC8vIHNob3cgdGhlIHNhdmUgcG9wdXBcbiAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gY2xpY2sgaGFuZGxlciBmb3Igc2hhcmUgYnRuXG4gIGJ0bi5maW5kKFwiI3NoYXJlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ29wZW4tZHJpdmUtc2hhcmUnLCAxKTtcblxuICAgIC8vIGhhcyB0aGUgc2hhcmUgY2xpZW50IGJlZW4gbG9hZGVkXG4gICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgLy8gbG9hZCB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGdhcGkubG9hZCgnZHJpdmUtc2hhcmUnLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBjcmVhdGUgYW5kIHNob3cgdGhlIHNoYXJlIHBvcHVwXG4gICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNob3cgdGhlIHNoYXJlIHBvcHVwXG4gICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNob3cgYWJvdXQgcGFuZWxcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcGFuZWxcbiAgYnRuLmZpbmQoJyNsb2FkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBoaWRlIGFueSBleGlzdGluZyBtZXNzYWdlXG4gICAgX3NldExvYWRNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gcmVuZGVyIHRoZSBtb2RlbCBmaWxlcyBpbiB0aGUgcG9wdXAgZmlsZXNcbiAgICBfc2hvd0RyaXZlRmlsZXMoKTtcblxuICAgIC8vIHNob3cgdGhlIG1vZGFsXG4gICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIC8vIGxvYWQgdGhlIHVzZXIgb3V0XG4gIGJ0bi5maW5kKCcjbG9nb3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dvdXQnLCAxKTtcblxuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgLy8ga2lsbCB0aGUgYWNjZXNzIHRva2VuXG4gICAgdG9rZW4gPSBudWxsO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBtZW51IHBhbmVsXG4gICAgX2NyZWF0ZUxvZ2luQnRuKCk7XG4gIH0pO1xuXG4gIC8vIGF0dGFjaCB0aGUgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuLyoqKlxuICogIFJlcXVlc3QgdGhlIHVzZXIncyBpbmZvcm1hdGlvbi4gIFdoZW4gbG9hZGVkLCB1cGRhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gKioqL1xuZnVuY3Rpb24gX3NldFVzZXJJbmZvKCkge1xuICAvLyBsb2FkIHVzZXIgbmFtZVxuICAkLmFqYXgoe1xuICAgIHVybCA6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL3VzZXJpbmZvXCIsXG4gICAgYmVmb3JlU2VuZCA6IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgIC8vIGFsd2F5cyBzZXQgeW91ciBhY2Nlc3Mgc3Rva2VuXG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cyx4aHIpIHtcbiAgICAgIC8vIHBhcnNlIHlvdXIganNvbiByZXNwb25zZVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAvLyB1cGRhdGUgdG9wIHJpZ2h0IG1lbnVcbiAgICAgIF9jcmVhdGVMb2dvdXRCdG4oZGF0YSk7XG5cbiAgICAgIC8vIHNldCB0byB3aW5kb3cgc2NvcGVcbiAgICAgIHdpbmRvdy51c2VyaW5mbyA9IGRhdGE7XG4gICAgfSxcbiAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gVE9ETzogc2hvdWxkIHdlIGFsZXJ0IHRoaXM/XG4gICAgfVxuICB9KTtcblxuICAvLyBsb2FkIHVzZXIgZmlsZXMsIHRyZWVzXG4gIF91cGRhdGVGaWxlTGlzdCgpO1xuICBfdXBkYXRlVHJlZUxpc3QoKTtcbn1cblxuLyoqKlxuICogIFNlYXJjaCBmb3IgdGhlIHVzZXJzIG1vZGVsc1xuICpcbiAqIFRPRE86IGFkZCBzZWFyY2ggdG8gdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMsXG4gKiAgbGltaXQgdG8gMTAgcmVzdWx0c1xuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVGaWxlTGlzdCgpIHtcbiAgbGlzdEZpbGVzKFwibWltZVR5cGUgPSAnXCIrTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICBmaWxlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFNlYXJjaCBmb3IgdGhlIHVzZXJzIHRyZWVzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZVRyZWVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitUUkVFX01JTUVfVFlQRStcIidcIiwgZnVuY3Rpb24ocmVzcCl7XG4gICAgdHJlZUxpc3QgPSByZXNwLnJlc3VsdC5pdGVtcztcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgbW9kZWxzIG9udG8gdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gX3Nob3dEcml2ZUZpbGVzKCkge1xuICAvLyBpZiB0aGV5IGhhdmUgbm8gZmlsZXMsIHNheSBzbyBhbmQgZ2V0IG91dCBvZiBoZXJlXG4gIGlmKCAhZmlsZUxpc3QgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcbiAgaWYoIGZpbGVMaXN0Lmxlbmd0aCA9PSAwICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGxpPk5vIEZpbGVzPC9saT5cIik7XG5cbiAgLy8gc2hvdyBhIHRpdGxlLCB0aGVyZSBhcmUgbXVsdGlwbGUgdHlwZXMgdGhhdCBjYW4gYmUgbG9hZGVkIGZyb20gZHJpdmVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8aDQ+U2VsZWN0IEZpbGU8L2g0PlwiKTtcblxuICAvLyBjcmVhdGUgdGhlIGxpc3QgZWxlbWVudHMgZm9yIGVhY2ggZmlsZXMgbWV0YWRhdGFcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IGZpbGVMaXN0W2ldO1xuICAgIHZhciBkID0gbmV3IERhdGUoaXRlbS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoXG4gICAgICAkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxhIGlkPSdcIitpdGVtLmlkK1wiJyB1cmw9J1wiK2l0ZW0uZG93bmxvYWRVcmwrXCInIHN0eWxlPSdjdXJzb3I6cG9pbnRlcic+PGkgY2xhc3M9J2ljb24tZmlsZSc+PC9pPiBcIitpdGVtLnRpdGxlK1wiPC9hPlwiICtcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdjb2xvcjojODg4O3BhZGRpbmc6IDVweCAwIDAgMTBweCc+XCIraXRlbS5kZXNjcmlwdGlvbitcIjwvZGl2PlwiK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4O3BhZGRpbmctbGVmdDoxMHB4Jz5MYXN0IE1vZGlmaWVkOiBcIitkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIraXRlbS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8ZGl2PjwvbGk+XCJcbiAgICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgZWFjaCBmaWxlXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdCBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC1kcml2ZS1tb2RlbCcsIDEpO1xuXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG5cbiAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgIF9zZXRMb2FkTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBMb2FkaW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgICAvLyBncmFiIHRoZSBmaXZlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB0aGUgdXNlciBrbm93XG4gICAgICBpZiggIWZpbGUgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgaWYoIGZpbGUuZXJyb3IgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuXG4gICAgICAvLyBoaWRlIGFueSBsb2FkZWQgdHJlZXMsXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLmhpZGUoKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKFwiXCIpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgIGxvYWRlZFRyZWUgPSBudWxsO1xuXG4gICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3ZSBhcmUgYWxsIGdvb2RcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnRmlsZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIGlkXG4gICAgICBsb2FkZWRGaWxlID0gaWQ7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgbmFtZVxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYoIGlkID09IGZpbGVMaXN0W2ldLmlkICkge1xuICAgICAgICAgICQoXCIjbG9hZGVkLW1vZGVsLXRpdGxlXCIpLmh0bWwoXCI8c3BhbiBzdHlsZT0nY29sb3I6IzMzMyc+TG9hZGVkIE1vZGVsIDwvc3Bhbj4gXCIrZmlsZUxpc3RbaV0udGl0bGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIraWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gc2V0dXAgbW9kZWxcbiAgICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFNldHVwKGlkLCBmaWxlKTtcblxuICAgICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgICBnZHJpdmVSVC5pbml0UnRBcGkobG9hZGVkRmlsZSk7XG5cbiAgICAgIC8vIHdhaXQgYSB0aWNrIHNvIHVzZXIgY2FuIHNlZSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gaGlkZSB0aGUgbW9kYWxcbiAgICAgICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9LDE1MDApO1xuXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgUmVuZGVyIHRoZSB1c2VycyBjdXJyZW50IHRyZWVzIG9udG8gdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gX3Nob3dUcmVlRmlsZXMoKSB7XG4gIC8vIHVwZGF0ZSB0aGUgbGlzdCBoZWFkZXIsIGxldCB1c2VyIGtub3cgd2hhdCB0aGV5IGFyZSBzZWxlY3RpbmdcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCJcIik7XG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48aDU+U2VsZWN0IFRyZWU8L2g1PjwvbGk+XCIpKTtcblxuICAvLyBpZiB0aGVyZSBhcmUgbm8gdHJlZXMsIHNheSBzbyBhbmQgZ2V0IG91dCBvZiBoZXJlXG4gIGlmKCAhdHJlZUxpc3QgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcbiAgaWYoIHRyZWVMaXN0Lmxlbmd0aCA9PSAwICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz5ObyBUcmVlcyBBdmFpbGFibGU8L2xpPlwiKSk7XG5cbiAgLy8gY3JlYXRlIHRoZSB0cmVlIGxpc3QgZWxlbWVudHNcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0cmVlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IHRyZWVMaXN0W2ldO1xuICAgIHZhciBkID0gbmV3IERhdGUoaXRlbS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoXG4gICAgICAkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxhIGlkPSdcIitpdGVtLmlkK1wiJyBuYW1lPSdcIitpdGVtLnRpdGxlK1wiJyB1cmw9J1wiK2l0ZW0uZG93bmxvYWRVcmwrXCInIHN0eWxlPSdjdXJzb3I6cG9pbnRlcic+PGkgY2xhc3M9J2ljb24tbGVhZic+PC9pPiBcIitpdGVtLnRpdGxlK1wiPC9hPlwiICtcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdjb2xvcjojODg4O3BhZGRpbmc6IDVweCAwIDAgMTBweCc+XCIraXRlbS5kZXNjcmlwdGlvbitcIjwvZGl2PlwiK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4O3BhZGRpbmctbGVmdDoxMHB4Jz5MYXN0IE1vZGlmaWVkOiBcIitkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIraXRlbS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8ZGl2PjwvbGk+XCJcbiAgICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgdGl0bGVzXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdCBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC1kcml2ZS10cmVlJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cihcIm5hbWVcIik7XG5cbiAgICAvLyB0ZWxsIHRoZSB1c2VyIHdlIGFyZSBsb2FkaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgVHJlZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGxvYWQgZmlsZSBmcm9tIGRyaXZlXG4gICAgZ2V0RmlsZShpZCwgJCh0aGlzKS5hdHRyKFwidXJsXCIpLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAvLyBpZiBiYWRuZXNzLCBsZXQgdXNlciBrbm93XG4gICAgICBpZiggIWZpbGUgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgdHJlZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgaWYoIGZpbGUuZXJyb3IgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgdHJlZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuXG4gICAgICAvLyBzaG93IHRoZSB0cmVlIHNoYXJpbmcgYnRuc1xuICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChuYW1lKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBzdWNjZXNmdWxsXG4gICAgICBfc2V0TG9hZE1lc3NhZ2UoJ1RyZWUgTG9hZGVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZSBpZFxuICAgICAgbG9hZGVkVHJlZSA9IGlkO1xuXG4gICAgICAvLyBsb2FkZWQgdHJlZSBpbnRvIG1vZGVsIC8gVUlcbiAgICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAgIC8vIHdhaXQgYSBzZWMgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBsb2FkIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93TG9hZFRyZWVQYW5lbCgpIHtcbiAgLy8gcmVuZGVyIHRoZSB0cmVlcyBpbnRvIHRoZSBwb3B1cCBsaXN0XG4gIF9zaG93VHJlZUZpbGVzKCk7XG4gIC8vIGNsZWFyIGFueSBtZXNzYWdlc1xuICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiAgc2hvdyB0aGUgdXNlciB0aGUgc2F2ZSB0cmVlIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gc2hvd1NhdmVUcmVlUGFuZWwoKSB7XG4gIC8vIHNldCB0aGUgY3VycmVudCBtaW1lVHlwZSB3ZSBhcmUgc2F2aW5nXG4gIHNhdmVNaW1lVHlwZSA9IFRSRUVfTUlNRV9UWVBFO1xuXG4gIC8vIHNldCB0aGUgaGVhZGVyIHNvIHVzZXIga25vd3Mgd2hhdCB0eXBlIHRoZXkgYXJlIHNhdmluZ1xuICAkKFwiI2dkcml2ZS1zYXZlLXN1YmhlYWRlclwiKS5odG1sKFwiPGg1PlNhdmUgVHJlZTwvaDU+XCIpO1xuXG4gIC8vIGlmIHRoZXJlIGlzIGEgY3VycmVudCB0cmVlLCBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgaWYoIGxvYWRlZFRyZWUgIT0gbnVsbCkge1xuICAgIC8vIGZpbmQgdGhlIGN1cnJlbnQgdHJlZSBiYXNlZCBvbiBpZFxuICAgIHZhciB0cmVlID0ge307XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0cmVlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0cmVlTGlzdFtpXS5pZCA9PSBsb2FkZWRUcmVlKSB7XG4gICAgICAgIHRyZWUgPSB0cmVlTGlzdFtpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5zaG93KCk7XG5cbiAgICAvLyByZW5kZXIgdHJlZSBtZXRhZGF0YSBvbiB1cGRhdGUgcGFuZWxcbiAgICB2YXIgZCA9IG5ldyBEYXRlKHRyZWUubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsLWlubmVyXCIpLmh0bWwoXCI8Yj5cIit0cmVlLnRpdGxlK1wiPC9iPjxiciAvPlwiICtcbiAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrdHJlZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgXCI8c3BhbiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7Jz5MYXN0IE1vZGlmaWVkOiBcIiArXG4gICAgICAgIGQudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIit0cmVlLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK3RyZWUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIik7XG4gIH0gZWxzZSB7XG4gICAgLy8gZG9uJ3Qgc2hvdyB0aGUgdXBkYXRlIHBhbmVsLCB0aGlzIGlzIGEgbmV3IHRyZWVcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLmhpZGUoKTtcbiAgfVxuXG4gIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gIF9zZXRTYXZlTWVzc2FnZShudWxsKTtcblxuICAvLyBzaG93IHRoZSBwb3B1cFxuICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbn1cblxuLyoqKlxuICogTG9hZCBhIG1vZGVsIGJhc2VkIG9uIHBhc3NlZCBpZC4gIFRoaXMgZnVuY3Rpb24gaXMgcmVhbGx5IG9ubHkgZm9yIGxvYWRpbmcgbW9kZWwgb24gc3RhcnQsIHdoZW4gYSBmaWxlIGlkXG4gKiBoYXMgYmVlbiBwYXNzZWQgaW4gdGhlIHVybCBlaXRoZXIgZnJvbSBnb29nbGUgZHJpdmUgb3IgZnJvbSB0aGUgP2ZpbGU9aWQgdXJsLlxuICoqKi9cbnZhciBsb2dpbk1vZGFsSW5pdCA9IGZhbHNlO1xuZnVuY3Rpb24gbG9hZChpZCwgbG9hZEZuKSB7XG4gIC8vIGlmIHdlIGRvbid0IGhhdmUgYW4gYWNjZXNzIHRva2VuLCB3ZSBuZWVkIHRvIHNpZ24gaW4gZmlyc3RcbiAgLy8gVE9ETzogaWYgdGhpcyBpcyBhIHB1YmxpYyBmaWxlLCB0aGVyZSBpcyBubyByZWFzb24gdG8gc2lnbiBpbi4uLiBzb2x1dGlvbj9cbiAgaWYoICF0b2tlbiApIHtcblxuICAgIGlmKCAhbG9naW5Nb2RhbEluaXQgKSB7XG4gICAgICAkKCcjZ29vZ2xlLW1vZGFsLWxvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gc2lnbiB0aGUgdXNlciBpbiAoZm9yY2Ugb2F1dGggcG9wdXApXG4gICAgICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24gaW4gdG9wIGxlZnRcbiAgICAgICAgICBfc2V0VXNlckluZm8oKTtcblxuICAgICAgICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgICAgICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgpO1xuICAgICAgbG9naW5Nb2RhbEluaXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKioqXG4gKiBJbml0aWFsaXplIFVJIC8gbW9kZWwgd2hlbiBhIGZpbGUgaXMgbG9hZGVkIGF0IHN0YXJ0XG4gKioqL1xuZnVuY3Rpb24gX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsIGZpbGUpIHtcbiAgLy8gYmFkZG5lc3MsIGxldCB0aGUgdXNlciBrbm93XG4gIGlmKCAhZmlsZSApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiRmFpbGVkIHRvIGxvYWQgZnJvbSBHb29nbGUgRHJpdmUgOi9cIik7XG4gIH1cblxuICAvLyBtZXRhZGF0YSBmYWlsZWQgdG8gbG9hZCwgbW9yZSBiYWRuZXNzXG4gIGlmKCBtZXRhZGF0YS5jb2RlID09IDQwNCApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5tZXNzYWdlKTtcbiAgfVxuXG4gIC8vIHdlIGxvYWRlZCBhIG1vZGVsLCBzZXR1cCBhbmQgcnVuXG4gIGlmKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgLy8gc2V0IHRoZSBjdXJyZW50bHkgbG9hZGVkIGZpbGUgaWRcbiAgICBsb2FkZWRGaWxlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrbWV0YWRhdGEuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNob3cgdGl0bGVcbiAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK21ldGFkYXRhLnRpdGxlKTtcblxuICAgIC8vIHNldHVwIG1vZGVsXG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAobWV0YWRhdGEuaWQsIGZpbGUpO1xuXG4gICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuICB9IGVsc2UgaWYgKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHsgLy8gd2UgbG9hZGVkIGEgdHJlZVxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICBsb2FkZWRUcmVlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChtZXRhZGF0YS50aXRsZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZVxuICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAvLyBoaWRlIHRoZSBsb2FkaW5nIHBvcHVwXG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiTG9hZGVkIHVua25vd24gZmlsZSB0eXBlIGZyb20gR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5taW1lVHlwZSk7XG4gIH1cbn1cblxuLyoqKlxuICogdG9rZW5zIGV4cGlyZSwgZXZlcnkgb25jZSBpbiBhd2hpbGUgY2hlY2sgdGhlIGN1cnJlbnQgdG9rZW4gaGFzbid0XG4gKiBpZiBpdCBoYXMsIHRoZW4gdXBkYXRlXG4gKioqL1xuZnVuY3Rpb24gX2NoZWNrVG9rZW4oKSB7XG4gIC8vIGlnbm9yZSBpZiB0aGVyZSBpcyBubyB0b2tlblxuICBpZiAoIXRva2VuKSByZXR1cm47XG5cbiAgLy8gb3RoZXJ3aXNlLCBsb29rIHRvIHVwZGF0ZSB0aGUgYWNjZXNzIHRva2VuXG4gIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpIHtcbiAgICBpZiggdCAhPSBudWxsICkgdG9rZW4gPSB0O1xuICB9KTtcbn07XG5cbi8qKipcbiAqIGlzIHRoZSBjdXJyZW50IHVzZXIgc2lnbmVkIGluP1xuICoqKi9cbmZ1bmN0aW9uIGNoZWNrU2lnbmVkSW4oY2FsbGJhY2spIHtcbiAgLy8gaWYgaXNBdXRoZXJpemVkIHJldHVybnMgYSB0b2tlbiwgdXNlciBpcyBsb2dnZWQgaW5cbiAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHRva2VuKXtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkgY2FsbGJhY2sodHJ1ZSk7XG4gICAgZWxzZSBjYWxsYmFjayhmYWxzZSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2lnbiBhIHVzZXIgaW4gdXNpbmcgdGhlIE9hdXRoIGNsYXNzXG4gKioqL1xuZnVuY3Rpb24gc2lnbkluKGNhbGxiYWNrKSB7XG4gIE9hdXRoLmF1dGhvcml6ZShmdW5jdGlvbih0KXtcbiAgICB0b2tlbiA9IHQ7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgIGlmKCB0LmVycm9yICkgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuICB9KVxufTtcblxuLyoqKlxuICogQWNjZXNzIG1ldGhvZCBmb3IgdG9rZW5cbiAqKiovXG5mdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgcmV0dXJuIHRva2VuO1xufTtcblxuLyoqKlxuICogTG9hZCB0aGUgZ29vZ2xlIGRyaXZlIGFwaSBjb2RlXG4gKioqL1xuZnVuY3Rpb24gX2xvYWRBcGkoY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQubG9hZChcImRyaXZlXCIsIERSSVZFX0FQSV9WRVJTSU9OLCBmdW5jdGlvbigpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIGxpc3Qgb2YgZmlsZSBtZXRhZGF0YSBmcm9tIGdvb2dsZSBkcml2ZSBiYXNlZCBvbiBxdWVyeVxuICoqKi9cbmZ1bmN0aW9uIGxpc3RGaWxlcyhxdWVyeSwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMubGlzdCh7XG4gICAgcSA6IHF1ZXJ5ICsgXCIgYW5kIHRyYXNoZWQgPSBmYWxzZVwiXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIHNpbmdsZSBmaWxlcyBtZXRhZGF0YSBiYXNlZCBvbiBpZFxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGVNZXRhZGF0YShpZCwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMuZ2V0KHtcbiAgICAnZmlsZUlkJyA6IGlkXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqICBBY3R1YWxseSBsb2FkIGEgZmlsZXMgZGF0YS4gIFRoZSB1cmwgdG8gZG8gdGhpcyBpcyBwcm92aWRlZCBpbiBhIGZpbGVzIG1ldGFkYXRhLlxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGUoaWQsIGRvd25sb2FkVXJsLCBjYWxsYmFjaykge1xuICAkLmFqYXgoe1xuICAgIHVybCA6IGRvd25sb2FkVXJsLFxuICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAvLyBzZXQgYWNjZXNzIHRva2VuIGluIGhlYWRlclxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCAnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgIC8vIHBhcnNlIHRoZSByZXNwb25zZSAod2Ugb25seSBzdG9yZSBqc29uIGluIHRoZSBnb29nbGUgZHJpdmUpXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGNhbGxiYWNrKGRhdGEsIGlkKTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZVwiXG4gICAgICB9KTtcblxuICAgIH1cbiAgfSk7XG59O1xuXG4vKioqXG4gKiBTYXZlIGpzb24gdG8gZ29vZ2xlIGRyaXZlXG4gKioqL1xuZnVuY3Rpb24gc2F2ZUZpbGUobmFtZSwgZGVzY3JpcHRpb24sIG1pbWVUeXBlLCBqc29uLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICBpZiggIW9wdGlvbnMgKSBvcHRpb25zID0ge31cblxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gIHZhciBtZXRhZGF0YSA9IHtcbiAgICAndGl0bGUnIDogbmFtZSxcbiAgICAnZGVzY3JpcHRpb24nIDogZGVzY3JpcHRpb24sXG4gICAgJ21pbWVUeXBlJyA6IG1pbWVUeXBlXG4gIH07XG5cbiAgLy8gaWYgd2Ugd2FudCB0byBzYXZlIHRoZSBmaWxlIHRvIGEgc3BlY2lmaWVkIGZvbGRlclxuICBpZiggb3B0aW9ucy5wYXJlbnQgKSB7XG4gICAgbWV0YWRhdGEucGFyZW50cyA9IFt7aWQ6IG9wdGlvbnMucGFyZW50fV07XG4gIH1cblxuICAvLyBpZiB0aGUganNvbiBpcyByZWFsbHkgYW4gb2JqZWN0LCB0dXJuIGl0IHRvIGEgc3RyaW5nXG4gIGlmICh0eXBlb2YganNvbiA9PSAnb2JqZWN0JykganNvbiA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gIC8vIGRhdGEgbmVlZHMgdG8gYmUgYmFzZTY0IGVuY29kZWQgZm9yIHRoZSBQT1NUXG4gIHZhciBiYXNlNjREYXRhID0gYnRvYShqc29uKTtcblxuICAvLyBjcmVhdGUgb3VyIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID0gZGVsaW1pdGVyXG4gICAgICArICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nXG4gICAgICArIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKTtcblxuICBpZigganNvbi5sZW5ndGggPiAwICkge1xuICAgIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGRlbGltaXRlciArICdDb250ZW50LVR5cGU6ICdcbiAgICAgICsgbWltZVR5cGUgKyAnXFxyXFxuJyArICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nXG4gICAgICArICdcXHJcXG4nICsgYmFzZTY0RGF0YTtcbiAgfVxuICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBjbG9zZV9kZWxpbTtcblxuICAgICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICAgLy8gaWYgdGhlIG9wdGlvbnMuY29udmVyPXRydWUgZmxhZyBpcyBzZXQsIGdvb2dsZSBhdHRlbXB0cyB0byBjb252ZXJ0IHRoZSBmaWxlIHRvXG4gICAgIC8vIGEgZ29vZ2xlIGRvYyBmaWxlLiAgTW9zdGx5LCB3ZSB1c2UgdGhpcyBmb3IgZXhwb3J0aW5nIGNzdiAtPiBHb29nbGUgU3ByZWFkc2hlZXRzXG4gIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgJ3BhdGgnIDogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMnICsgKCBvcHRpb25zLmNvbnZlcnQgPyAnP2NvbnZlcnQ9dHJ1ZScgOiAnJyksXG4gICAgJ21ldGhvZCcgOiAnUE9TVCcsXG4gICAgJ3BhcmFtcycgOiB7XG4gICAgICAndXBsb2FkVHlwZScgOiAnbXVsdGlwYXJ0J1xuICAgIH0sXG4gICAgJ2hlYWRlcnMnIDoge1xuICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICB9LFxuICAgICdib2R5JyA6IG11bHRpcGFydFJlcXVlc3RCb2R5XG4gIH0pO1xuXG4gIC8vIHNlbmQgdGhlIHJlcXVlc3RcbiAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBpZiAocmVzcC5pZClcbiAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgIGVsc2VcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gc2F2ZVwiXG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBVcGRhdGUgYSBmaWxlIGJhc2VkIG9uIGlkIGFuZCBnaXZlbiBqc29uIGRhdGFcbiAqKiovXG5mdW5jdGlvbiB1cGRhdGVGaWxlKGZpbGVJZCwganNvbiwgY2FsbGJhY2spIHtcbiAgLy8gc3RhcnQgY3JlYXRpbmcgdGhlIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7fTtcblxuICAvLyBzdHJpbmlmeSB0aGVuIGJhc2U2NCBlbmNvZGUgdGhlbiBvYmplY3RcbiAgICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoSlNPTi5zdHJpbmdpZnkoanNvbikpO1xuXG4gICAgLy8gc2V0IHVwIHRoZSBQT1NUIGJvZHlcbiAgICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPVxuICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxcclxcblxcclxcbicgK1xuICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSkgK1xuICAgICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAnQ29udGVudC1UeXBlOiAnICsgTUlNRV9UWVBFICsgJ1xcclxcbicgK1xuICAgICAgICAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJyArXG4gICAgICAgICdcXHJcXG4nICtcbiAgICAgICAgYmFzZTY0RGF0YSArXG4gICAgICAgIGNsb3NlX2RlbGltO1xuXG4gIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgICAgICdwYXRoJzogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMvJytmaWxlSWQsXG4gICAgICAgICdtZXRob2QnOiAnUFVUJyxcbiAgICAgICAgJ3BhcmFtcyc6IHsndXBsb2FkVHlwZSc6ICdtdWx0aXBhcnQnfSxcbiAgICAgICAgJ2hlYWRlcnMnOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgICAgICB9LFxuICAgICAgICAnYm9keSc6IG11bHRpcGFydFJlcXVlc3RCb2R5fSk7XG5cbiAgICAvLyBzZXQgcmVxdWVzdFxuICAgIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKXtcbiAgICAgIGlmKCByZXNwLmlkICkge1xuICAgICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gdXBkYXRlXCJcbiAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3J1bi1tb2RlbC1yZW1vdGUnLCAxKTtcbiAgZ2RyaXZlUlQucnVuTW9kZWxSdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIGNoZWNrU2lnbmVkSW4gOiBjaGVja1NpZ25lZEluLFxuICBzaWduSW4gOiBzaWduSW4sXG4gIGdldFRva2VuIDogZ2V0VG9rZW4sXG4gIGxpc3RGaWxlcyA6IGxpc3RGaWxlcyxcbiAgZ2V0RmlsZU1ldGFkYXRhIDogZ2V0RmlsZU1ldGFkYXRhLFxuICBsb2FkIDogbG9hZCxcbiAgc2F2ZUZpbGU6IHNhdmVGaWxlLFxuICBzaG93TG9hZFRyZWVQYW5lbCA6IHNob3dMb2FkVHJlZVBhbmVsLFxuICBzaG93U2F2ZVRyZWVQYW5lbCA6IHNob3dTYXZlVHJlZVBhbmVsLFxuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcblxuICBNSU1FX1RZUEUgOiBNSU1FX1RZUEVcbn1cbiIsIi8vIFJFQUxUSU1FIChydCkgT2JqZWN0c1xuLy8gcnQganNvbiBmaWVsZCwgdXNlZCB0byBzZW5kIHVwZGF0ZXMgdG8gcGVlcnNcbnZhciBydEpzb24gPSBudWxsO1xuLy8gcnQgZG9jdW1lbnRcbnZhciBydERvYyA9IG51bGw7XG4vLyBoYXMgdGhlIHJ0IGFwaSBiZWVuIGxvYWRlZD9cbnZhciBfcnRMb2FkZWQgPSBmYWxzZTtcbi8vIHRpbWVyIHRvIGJ1ZmZlciB0aGUgZmlyaW5nIG9mIHVwZGF0ZXMgZnJvbSBydCBldmVudHNcbnZhciBfcnRUaW1lciA9IC0xO1xuXG4vLyBsaXN0IG9mIGN1cnJlbnQgcnQgZWRpdHMgdG8gaW5wdXQgZmlsZXNcbnZhciBydEVkaXRzID0ge307XG4vLyBnb29nbGUgZHJpdmUgcnQgbW9kZWwgLSBtYXBcbnZhciBsaXZlRWRpdHMgPSBudWxsO1xuLy8gbG9jYWwgbG9jayBvbiBhbiBlbGVtZW50XG52YXIgbG9jayA9IHt9O1xuXG52YXIgYXBwO1xuXG4vLyBsb2FkZWQgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGU7XG5cbi8qKipcbiAqIFNldHVwIHRoZSBydCBhcGkgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGlzIHdpbGwgYWN0dWFsbHkgbG9hZCB0aGUgYXBpIGlmIG5lZWRlZFxuICoqKi9cbmZ1bmN0aW9uIGluaXRSdEFwaShmaWxlKSB7XG4gIHJ0SnNvbiA9IG51bGw7IC8vIGtpbGwgb2ZmIGFueSBvbGQgbGlzdG5lcnNcbiAgbG9hZGVkRmlsZSA9IGZpbGU7XG5cbiAgLy8gY2xvc2UgYW55IG9sZCBjb25uZWN0aW9uXG4gIGlmKCBydERvYyApIHJ0RG9jLmNsb3NlKCk7XG5cbiAgLy8gZ2V0IG91dCBvZiBoZXJlIGlmIHdlIGRvbid0IGhhdmUgYSBsb2FkZWQgZmlsZVxuICBpZiggbG9hZGVkRmlsZSA9PSBudWxsICkgcmV0dXJuO1xuXG4gIC8vIGxvYWQgYXBpIGlmIG5lZWRlZFxuICBpZiggIV9ydExvYWRlZCApIHtcbiAgICBnYXBpLmxvYWQoJ2RyaXZlLXJlYWx0aW1lJywgZnVuY3Rpb24oKXtcbiAgICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgICBfcnRMb2FkZWQgPSB0cnVlO1xuICAgICAgX2xvYWRSdEZpbGUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzZXR1cCBydCBob29rc1xuICAgIF9sb2FkUnRGaWxlKCk7XG4gIH1cblxuICAvLyBzZXR1cCBpbnB1dCBoYW5kbGVyc1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2ZvY3VzJyxmdW5jdGlvbihlKXtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3NldExvY2FsTG9jayh7XG4gICAgICBpZCAgICAgICAgOiBlbGUuYXR0cihcImlkXCIpLFxuICAgICAgdmFsdWUgICAgIDogZWxlLnZhbCgpLFxuICAgICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gICAgfSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2JsdXInLGZ1bmN0aW9uKGUpe1xuICAgIF9yZW1vdmVMb2NhbExvY2soJChlLnRhcmdldCkuYXR0cihcImlkXCIpKTtcbiAgfSk7XG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgcmV0dXJuO1xuICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICBfdXBkYXRlTG9jYWxMb2NrKGVsZS5hdHRyKFwiaWRcIiksIGVsZS52YWwoKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TG9jYWxMb2NrKGxvY2spIHtcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgbWFyayB0aGUgY3VycmVudCBsb2NrXG4gIGlmKCBsaXZlRWRpdHMuaGFzW2xvY2suaWRdICkgcmV0dXJuO1xuICBsaXZlRWRpdHMuc2V0KGxvY2suaWQsIGxvY2spO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jYWxMb2NrKGlkLCB2YWwpIHtcbiAgdmFyIGxvY2sgPSB7XG4gICAgaWQgOiBpZCxcbiAgICB2YWx1ZSA6IHZhbCxcbiAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gIH1cblxuICBsaXZlRWRpdHMuc2V0KGlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZUxvY2FsTG9jayhpZCkge1xuICBsaXZlRWRpdHMuZGVsZXRlKGlkKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZVJlbW90ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikucmVtb3ZlKCk7XG4gIGRlbGV0ZSBydEVkaXRzW2xvY2suaWRdO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jayhsb2NrKSB7XG4gICQoXCIjXCIrbG9jay5pZCkudmFsKGxvY2sudmFsdWUpLmF0dHIoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gIGlmKCAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5sZW5ndGggPT0gMCApIHtcbiAgICAkKFwiI1wiK2xvY2suaWQpLnBhcmVudCgpLmFmdGVyKFwiPHNwYW4gaWQ9J1wiK2xvY2suaWQrXCItZWRpdGluZycgY2xhc3M9J2xhYmVsIGxhYmVsLXdhcm5pbmcnPjwvc3Bhbj5cIik7XG4gIH1cbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikuaHRtbChsb2NrLnVzZXIpO1xuICBydEVkaXRzW2xvY2suaWRdID0gbG9jaztcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBsaXN0IG9mIHJlYWx0aW1lIGVkaXRzIGFzIHdlbGwgYXMgdGhlIGlucHV0IFVJIGJhc2VkIG9uIHRoZSBydERvYyBldmVudFxuICogVE9ETzogdGhpcyBpcyBhIGJpdCBuYXN0eSByaWdodCBub3dcbiAqKi9cbmZ1bmN0aW9uIF91cGRhdGVSdEVkaXRzKGUpIHtcbiAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcblxuICB2YXIga2V5cyA9IGxpdmVFZGl0cy5rZXlzKCk7XG5cbiAgLy8gcmVtb3ZlIG9sZCB0aW1lc3RhbXBzIFRPRE9cbiAgLypmb3IoIHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggbm93IC0gdmFsdWVzW2ldLnRpbWVzdGFtcCA+IDEwMDAgKiA2MCApIHtcbiAgICAgIF9yZW1vdmVMb2NrKHZhbHVlc1tpXSk7IC8vIGRvZXMgdGhpcyBmaXJlIHVwZGF0ZXM/XG4gICAgfVxuICB9Ki9cblxuXG4gIC8vIHNldCBuZXcgZWRpdHNcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrICkge1xuICAgIF91cGRhdGVMb2NrKGxpdmVFZGl0cy5nZXQoa2V5c1tpXSkpO1xuICB9XG5cbiAgLy8gcmVtb3ZlIG9sZCBlZGl0c1xuICBmb3IoIHZhciBrZXkgaW4gcnRFZGl0cyApIHtcbiAgICBpZigga2V5cy5pbmRleE9mKGtleSkgPT0gLTEgKSB7XG4gICAgICBfcmVtb3ZlUmVtb3RlTG9jayhydEVkaXRzW2tleV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKioqXG4gKiAgU2V0dXAgdGhlIHJ0IGhvb2tzIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhlIGFwaSBuZWVkcyB0byBhbHJlYWR5IGJlIGxvYWRlZFxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkUnRGaWxlKCkge1xuICAvLyBnZXQgdGhlIHJ0IGRvY1xuICBnYXBpLmRyaXZlLnJlYWx0aW1lLmxvYWQobG9hZGVkRmlsZSxcbiAgICAvLyBydCBkb2MgbG9hZGVkXG4gICAgZnVuY3Rpb24oZmlsZSl7XG4gICAgICBydERvYyA9IGZpbGU7XG5cbiAgICAgIC8vIGdldCBvdXIgcnQgYXR0cmlidXRlLiAgVHJpZ2dlcmluZyBjaGFuZ2VzIG9uIHJ0SnNvbiB3aWxsIHB1c2ggZXZlbnRzXG4gICAgICAvLyB0byBhbGwgbGlzdGVuaW5nIGNsaWVudHNcbiAgICAgIHZhciBqc29uID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGpzb24gYXR0ciwgd2UgbmVlZCB0byBpbml0aWFsaXplIHRoZSBtb2RlbFxuICAgICAgaWYoIGpzb24gPT0gbnVsbCB8fCBsaXZlRWRpdHMgPT0gbnVsbCkge1xuICAgICAgICAvLyBpbml0aWFsaXplIG91ciBydCBtb2RlbFxuICAgICAgICBfb25SdE1vZGVsTG9hZChmaWxlLmdldE1vZGVsKCkpO1xuICAgICAgICAvLyBncmFiIHJ0IGpzb24gYXR0ciBub3cgdGhhdCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgICAganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWQgOihcbiAgICAgIGlmKCAhanNvbiApIHJldHVybiBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBjb25uZWN0IHRvIHJ0IGpzb25cIik7XG4gICAgICAvLyBzZXQgdGhhdCBhdHRyIGdsb2JhbCB0byBjbGFzc1xuICAgICAgcnRKc29uID0ganNvbjtcblxuICAgICAgLy8gZ2V0IGN1cnJlbnQgbGlzdCBvZiB1c2Vyc1xuICAgICAgdmFyIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdoZW4gcGVvcGxlIGNvbWUgYW5kIGdvXG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0pPSU5FRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcbiAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfTEVGVCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHJ0SnNvbiBvYmplY3RcbiAgICAgIC8vIHdoZW4gdGhpcyB1cGRhdGVzLCB3ZSB3YW50IHRvIHJlLXJ1biB0aGUgbW9kZWxcbiAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0lOU0VSVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0RFTEVURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGl2ZSBlZGl0IHVwZGF0ZXNcbiAgICAgICAgICAgICAgbGl2ZUVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVkFMVUVfQ0hBTkdFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgX3VwZGF0ZVJ0RWRpdHMoZSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNob3cgd2hvIGlzIGxpc3RlbmluZ1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuXG4gICAgICAgIC8vIHNldCBpbnB1dCBoYW5kbGVycyBmb3IgcnQgZXZlbnRzXG4gICAgfSxcbiAgICAvLyBtb2RlbCBsb2FkZWRcbiAgICBmdW5jdGlvbihtb2RlbCl7XG4gICAgICBfb25SdE1vZGVsTG9hZChtb2RlbCk7XG4gICAgfSxcbiAgICAvLyBlcnJvcnNcbiAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUlQgRVJST1JTOiBcIik7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbiAgKTtcbn1cblxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGRpc3BsYXkgb2YgYWN0aXZlIHVzZXJzIGZvciB0aGUgbW9kZWwuXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKSB7XG4gIC8vIGlmIGl0J3MganVzdCB1cywgZG9uJ3Qgc2hvdyBhbnl0aGluZ1xuICBpZiggIXVzZXJzICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG4gIGlmKCB1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIHdlIG9ubHkgd2FudCB1bmlxdWUgdXNlcnNcbiAgdmFyIHVuaXF1ZSA9IFtdO1xuICB2YXIgdXVzZXJzID0gW107XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHVuaXF1ZS5pbmRleE9mKHVzZXJzW2ldLnVzZXJJZCkgPT0gLTEgKSB7XG4gICAgICB1bmlxdWUucHVzaCh1c2Vyc1tpXS51c2VySWQpO1xuICAgICAgdXVzZXJzLnB1c2godXNlcnNbaV0pO1xuICAgIH1cbiAgfVxuICBpZiggdXVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgLy8gYWRkIHBpYyBvZiB1c2VyIHRvIGRpc3BsYXkgcGFuZWxcbiAgdmFyIGh0bWwgPSBcIkFjdGl2ZSBVc2VycyBcIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1dXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHV1c2Vyc1tpXS5waG90b1VybCApIHtcbiAgICAgIGh0bWwgKz0gXCI8aW1nIHNyYz0nXCIrdXVzZXJzW2ldLnBob3RvVXJsK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyBzdHlsZT0nbWFyZ2luOjAgNXB4O3dpZHRoOjMycHg7aGVpZ2h0OjMycHgnIGNsYXNzPSdpbWctcm91bmRlZCcgLz4gXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGh0bWwgKz0gXCI8c3BhbiBzdHlsZT0nd2lkdGg6MzJweDtoZWlnaHQ6MzJweDttYXJnaW46MCA1cHg7YmFja2dyb3VuZC1jb2xvcjpcIit1dXNlcnNbaV0uY29sb3IrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInID48L3NwYW4+IFwiO1xuICAgIH1cbiAgfVxuICAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKGh0bWwpO1xufVxuXG4vKioqXG4gICAqICBSZS1ydW4gdGhlIG1vZGVsLiAgRXZlbnRzIGNhbiBjb21lIGluIHF1aWNrbHkgaW4gbWFueSBwYXJ0cy4gIEJ1ZmZlciB0aGUgZXZlbnRzIHNvIHdlIGRvbid0IHJlLXJ1biB0aGUgbW9kZWwgdG9vIG1hbnkgdGltZXMuXG4gICAqKiovXG5mdW5jdGlvbiBfcmVydW5SdCh1c2VycywgdXNlcklkKSB7XG4gIC8vIHRoaXMgaXMgYmFkbmVzc1xuICBpZiggIXJ0SnNvbiApIHJldHVybjtcblxuICAvLyBjbGVhciBhbnkgcXVldWVkIHJ1blxuICBpZiggX3J0VGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQoX3J0VGltZXIpO1xuXG4gIC8vIHF1ZXVlIHVwIGEgcnVuIGFuZCB3YWl0IHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gdXBkYXRlc1xuICBfcnRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBfcnRUaW1lciA9IC0xO1xuXG4gICAgLy8gZmluZCB0aGUgdXNlciB3aG8gaXMgcnVubmluZyB0aGUgbW9kZWwgYW5kIGRpcGxheSBwb3B1cCBvZiB0aGF0IHVzZXJzIGluZm9ybWF0aW9uXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB1c2Vyc1tpXS51c2VySWQgPT0gdXNlcklkICkge1xuICAgICAgICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nLW91dGVyJyA+PGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nJyBzdHlsZT0nd2lkdGg6NDAwcHgnPiBcIitcbiAgICAgICAgICAgICAgICAodXNlcnNbaV0ucGhvdG9VcmwgPyBcIjxpbWcgc3JjPSdcIit1c2Vyc1tpXS5waG90b1VybCtcIicgLz4gXCIgOiBcIlwiKSt1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIiBpcyB1cGRhdGluZyB0aGUgbW9kZWwuLi48L2Rpdj48L2Rpdj5cIik7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hcHBlbmQocGFuZWwpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLmNzcyhcIm9wYWNpdHlcIixcIi45XCIpO1xuICAgICAgICAgICAgfSw1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAzNTAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnNlIHRoZSBuZXcgbW9kZWwgZGF0YSBhbmQgbG9hZCBpdCBhcyBvdXIgY3VycmVudCBzZXR1cFxuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShydEpzb24uZ2V0VGV4dCgpKTtcbiAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRTZXR1cChsb2FkZWRGaWxlLCBkYXRhLCB0cnVlKTtcbiAgfSwgMzAwKTtcbn1cblxuLyoqKlxuICogaW5pdGlhbGl6ZSBhIG5ldyBydCBtb2RlbFxuICoqKi9cbmZ1bmN0aW9uIF9vblJ0TW9kZWxMb2FkKG1vZGVsKSB7XG4gIC8vIGN1cnJlbnRseSB3ZSBqdXN0IHdhbnQgdG8gdXNlIHRoaXMgc2luZ2xlIGF0dHJpYnV0ZSB0byBicm9hZGNhc3QgZXZlbnRzXG4gIHZhciBqc29uID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gIGlmKCBqc29uID09IG51bGwgKSB7XG4gICAgdmFyIHN0cmluZyA9IG1vZGVsLmNyZWF0ZVN0cmluZyhcInt9XCIpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJqc29uXCIsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgbGl2ZUVkaXRzID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgaWYoIGxpdmVFZGl0cyA9PSBudWxsICkge1xuICAgIHZhciBmaWVsZCA9IG1vZGVsLmNyZWF0ZU1hcCgpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJsaXZlRWRpdHNcIiwgZmllbGQpO1xuICB9XG5cbn1cblxuLyoqKlxuICogbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nIDopXG4gKiBUaGlzIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBhIGxvY2FsIHVzZXIgcnVucyB0aGUgbW9kZWwuICBJdCB1cGRhdGVzIHRoZSAnanNvbidcbiAqIGF0dHJpYnV0ZSB3aGljaCBpcyB0aGVuIGJyb2FkY2FzdCB0byBhbGwgbGlzdGVuaW5nIHBhcnRpZXNcbiAqKiovXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggcnRKc29uICkgcnRKc29uLnNldFRleHQoSlNPTi5zdHJpbmdpZnkoIGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKSApKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuICBpbml0UnRBcGkgIDogaW5pdFJ0QXBpLFxuICBzZXRBcHAgOiBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgIGFwcCA9IGFwcGxpY2F0aW9uO1xuICB9XG59O1xuIiwidmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dkcml2ZScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG52YXIgd2VhdGhlckZpbGVSZWFkZXIgPSByZXF1aXJlKCcuL3dlYXRoZXJGaWxlUmVhZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cbnZhciB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gbnVsbDtcbnZhciB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG52YXIgU0VUVVBfVEVNUExBVEUgPVxuICAnPGRpdj4nK1xuICAnPGg0PkNoYXJ0IE9wdGlvbnM8L2g0PicrXG4gICc8ZGl2PicrXG4gICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGVcIj4nK1xuICAgICAgICAgICc8dHI+JytcbiAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cIndpZHRoOjUwJVwiPk91dHB1dCB2YXJpYWJsZShzKSB0byBjaGFydCA8L3RkPicrXG4gICAgICAgICAgICAgICc8dGQ+IDxhIGlkPVwic2VsZWN0LWNoYXJ0cy1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBDaGFydHM8L2E+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+VmFyaWF0aW9uIGFuYWx5c2lzIHBhcmFtZXRlcihzKSA8L3RkPicrXG4gICAgICAgICAgICAgICc8dGQ+PGRpdiBpZD1cInZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCI+Tm9uZTwvZGl2PjwvdGQ+JytcbiAgICAgICAgICAnPC90cj4nK1xuICAgICAgJzwvdGFibGU+JytcbiAgJzwvZGl2PicrXG4gICc8aDQ+TG9jYXRpb248L2g0PicrXG4gICAnPGRpdiBzdHlsZT1cImJvcmRlci10b3A6MXB4IHNvbGlkICNkZGQ7cGFkZGluZzo4cHg7aGVpZ2h0OjYwcHhcIj4nK1xuICAgICAnPHNwYW4gaWQ9XCJjdXJyZW50LWxvY2F0aW9uXCIgc3R5bGU9XCJjb2xvcjojODg4XCI+PC9zcGFuPicrXG4gICAgICc8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0IHNlbGVjdC13ZWF0aGVyLWxvY2F0aW9uXCI+PGkgY2xhc3M9XCJpY29uLW1hcC1tYXJrZXJcIj48L2k+IFNlbGVjdCBMb2NhdGlvbjwvYT4nK1xuICAgICAnPC9kaXY+JytcbiAgICAgJzxkaXY+JztcblxudmFyIEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURSA9XG4gICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxNXB4IDAgNXB4IDA7bWFyZ2luLWJvdHRvbTo1cHg7aGVpZ2h0OiA1MHB4XCI+JytcbiAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBwdWxsLXJpZ2h0XCIgaWQ9XCJ0cmVlLXN1Yi1tZW51XCI+JytcbiAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+JytcbiAgICAgICAgJzxzcGFuIGlkPVwibG9hZGVkLXRyZWUtbmFtZVwiPkRlZmF1bHQgVHJlZTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj4nK1xuICAgICAgJzwvYnV0dG9uPicrXG4gICAgICAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+JytcbiAgICAgICAgJzxsaT48YSBpZD1cImdkcml2ZS10cmVlcGFuZWwtbG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaT48YSBpZD1cImdkcml2ZS10cmVlcGFuZWwtc2F2ZVwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC11cGxvYWRcIj48L2k+IFNhdmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cInNoYXJlLXRyZWUtYnRuXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tbGVmdDoxMHB4XCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICc8L3VsPicrXG4gICc8L2Rpdj4nK1xuICAnPGRpdiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNvbXBhcmUtdHJlZXNcIiAvPiBDb21wYXJlIFRyZWVzPC9kaXY+Jytcbic8L2Rpdj4nO1xuXG52YXIgSU5QVVRfVEVNUExBVEUgPVxuICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICc8bGFiZWwgZm9yPVwie3tpZH19XCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+e3tsYWJlbH19PC9sYWJlbD4nK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj4nK1xuICAgICAgJzxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwie3tpZH19XCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwie3t2YWx1ZX19XCI+Jm5ic3A7Jm5ic3A7e3t1bml0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj4nO1xuXG52YXIgQVJSQVlfSU5QVVRfVEVNUExBVEUgPVxuICAnPGRpdiBjbGFzcz1cImNvbC1sZy02XCI+PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICc8bGFiZWwgZm9yPVwie3tpZH19XCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+e3tsYWJlbH19PC9sYWJlbD4nK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj4nK1xuICAgICAgJ3t7aW5wdXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2PjwvZGl2Pic7XG5cbnZhciB0YWJIZWFkZXIgPSAnPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIGlkPVwiaW5wdXRfcGlsbHNcIj4nO1xudmFyIGNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cInBpbGwtY29udGVudFwiPic7XG5cbnZhciB0cmVlSGVhZGVyID0gJzxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiIGlkPVwidHJlZS1hY2NvcmRpb25cIj4nO1xudmFyIFRSRUVfUEFORUxfVEVNUExBVEUgPSAnPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj4nK1xuICAgICAgICAgICAgJzxoNCBjbGFzcz1cInBhbmVsLXRpdGxlXCI+JytcbiAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJhY2NvcmRpb24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PVwiI3RyZWUtYWNjb3JkaW9uXCIgaHJlZj1cIiNjb2xsYXBzZXt7aWR9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICd7e3RpdGxlfX0nK1xuICAgICAgICAgICAgICAgICc8L2E+JytcbiAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImNvbGxhcHNle3tpZH19XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj57e2JvZHl9fTwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAnPC9kaXY+JztcblxudmFyIGlucHV0cyA9IHt9O1xuXG4vLyBmb3Igd2VhdGhlciBkYXRhXG52YXIgY29scyA9IFtdO1xuXG52YXIgbWFwID0gbnVsbDtcblxuLyoqXG4gKiBPcHRpb25zIDpcbiAqICAgbW9kZWwgLSB0eXBlIG9mIG1vZGVsIHRvIGFwcGVuZCB0b1xuICogICBsYWJlbCAtIGF0dHJpYnV0ZSBsYWJlbFxuICogICB2YWx1ZSAtIGRlZmF1bHQgdmFsdWVcbiAqICAgZGVzY3JpcHRpb24gLSBkZXNjcmlwdGlvbiBvZiBhdHRyaWJ1dGVcbiAqICAgdW5pdHMgLSBhdHRyaWJ1dGUgdW5pdHNcbiAqL1xuZnVuY3Rpb24gX2FkZElucHV0KG9wdGlvbnMpIHtcbiAgaWYoICFpbnB1dHNbb3B0aW9ucy5tb2RlbF0gKSBpbnB1dHNbb3B0aW9ucy5tb2RlbF0gPSBbXTtcbiAgaW5wdXRzW29wdGlvbnMubW9kZWxdLnB1c2gob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVXZWF0aGVySW5wdXRzKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICB2YXIgdGFibGUgPSAnPGRpdiBzdHlsZT1cInBhZGRpbmctdG9wOjI1cHhcIj48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XCIgaWQ9XCJsb2FkLXdlYXRoZXItYnRuXCI+PGkgY2xhc3M9XCJpY29uLXVwbG9hZC1hbHRcIj48L2k+IFVwbG9hZDwvYT4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGlkPVwid2VhdGhlci1pbnB1dC10b2dnbGVcIj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5BdmVyYWdlczwvYnV0dG9uPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+QWN0dWFsPC9idXR0b24+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLXBhbmVsXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLXRvcDoyMHB4XCI+PC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJhdmVyYWdlLXdlYXRoZXItcGFuZWxcIj4nK1xuICAgICAgICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTBweDtjb2xvcjojODg4XCI+U2VsZWN0IGxvY2F0aW9uIHRvIHNldCB0aGUgYXZlcmFnZSB3ZWF0aGVyIGRhdGE8L2Rpdj4nK1xuICAgICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1jb25kZW5zZWQgd2VhdGhlci10YWJsZVwiIHN0eWxlPVwibWFyZ2luLXRvcDoyMHB4XCI+JztcblxuICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIHRhYmxlICs9IFwiPHRkPlwiK2NvbHNbaV0rXCI8L3RkPlwiO1xuICB9XG4gIHRhYmxlICs9IFwiPC90cj5cIjtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHRhYmxlICs9IFwiPHRyPlwiO1xuICAgIGZvciggdmFyIGogPSAwOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIGlmKCBqID09IDAgKSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPlwiKyhpKzEpK1wiPC90ZD5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBpZD0naW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20rXCInIHR5cGU9J3RleHQnIC8+PC90ZD5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICB9XG4gIHJldHVybiB0YWJsZSsnPC90YWJsZT48ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+PC9kaXY+JztcblxufVxuXG5mdW5jdGlvbiBfc2V0V2VhdGhlckRhdGEoKSB7XG4gIHZhciBsbCA9IGFwcC5xcyhcImxsXCIpO1xuICBpZiggbGwgKSB7XG4gICAgbGwgPSBsbC5zcGxpdChcIixcIik7XG4gICAgX3F1ZXJ5V2VhdGhlckRhdGEobGxbMF0sIGxsWzFdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoXCJOb3QgU2V0XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9xdWVyeVdlYXRoZXJEYXRhKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd3ZWF0aGVyLWRhdGEtcXVlcnknLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjaygpO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV0gPSB7fTtcbiAgICAgIGZvciggdmFyIGogPSAxOyBqIDwgdGFibGUuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbSkudmFsKHRhYmxlLnJvd3NbaV0uY1tqXSA/IHRhYmxlLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciBlcnJvciA9IGZhbHNlO1xuICAgIHZhciB0YWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0YWJsZS5yb3dzWzBdID09IG51bGwgKSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgYWxlcnQoXCJJbnZhbGlkIGxvY2F0aW9uIHNlbGVjdGVkXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGtleSA9IHRhYmxlLmNvbHNbaV0uaWQ7XG4gICAgICBpZigga2V5ID09PSAnbWF4YXdzJyApIGtleSA9ICdtYXhBV1MnO1xuXG4gICAgICAkKFwiI2lucHV0LXNvaWwtXCIra2V5KS52YWwodGFibGUucm93c1swXS5jW2ldLnYpO1xuICAgIH1cblxuICAgIGlmKCAhZXJyb3IgKSBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwobG5nK1wiLCBcIitsYXQrXCIgPGEgaHJlZj0nXCIrd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qLywnJykrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj9sbD1cIitsbmcrXCIsXCIrbGF0K1wiJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPjwvYT5cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpIHtcbiAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgdmFyIHZhbCA9ICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20pLnZhbCgpO1xuICAgICAgaWYoIHZhbCAmJiB2YWwubGVuZ3RoID4gMCApIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dW2NvbHNbal1dID0gcGFyc2VJbnQodmFsKTtcbiAgICAgIGVsc2Ugd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV1bY29sc1tqXV0gPSAwO1xuICAgIH1cbiAgfVxuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbn1cblxuZnVuY3Rpb24gX3NlbGVjdFdlYXRoZXJMb2NhdGlvbigpIHtcbiAgaWYoICFtYXAgKSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCh7fSk7XG5cbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikub24oJ2NsaWNrJywgX2dldExvY2F0aW9uKTtcblxuXG4gICAgLy8gd2FpdCBmb3IgdGhlIG1vZGFsIHRvIGluaXRcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG5cbiAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoJChcIiNnbWFwXCIpWzBdLCB7XG4gICAgICAgIGNlbnRlciA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMzUsIC0xMjEpLFxuICAgICAgICB6b29tOiA1LFxuICAgICAgICBtYXBUeXBlSWQgOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBkZWZhdWx0U3R5bGUgPSB7XG4gICAgICAgICAgICBwb2x5Z29uT3B0aW9uczoge1xuICAgICAgICAgICAgICBzdHJva2VDb2xvciAgIDogXCIjMDAwMEZGXCIsXG4gICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHkgOiAwLjUsXG4gICAgICAgICAgICAgIGZpbGxDb2xvciAgICAgOiAnI0ZFRkVGRScsXG4gICAgICAgICAgICAgIGZpbGxPcGFjaXR5ICAgOiAwLjJcbiAgICAgICAgICAgIH0sXG4gICAgICB9O1xuXG5cbiAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgc2VsZWN0OiAnYm91bmRhcnknLFxuICAgICAgICAgICAgZnJvbTogJzFoVjl2UUczU2MwSkxQZHVGcFdKenRmTEstZXg2Y2N5TWdfcHRFX3MnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZXM6IFtkZWZhdWx0U3R5bGVdLFxuICAgICAgICAgIHN1cHByZXNzSW5mb1dpbmRvd3MgOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICB2YXIgZnVzaW9uTGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuRnVzaW9uVGFibGVzTGF5ZXIoZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgZnVzaW9uTGF5ZXIub3BhY2l0eSA9IC44O1xuICAgICAgZnVzaW9uTGF5ZXIuc2V0TWFwKG1hcCk7XG5cbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgYWxlcnQoJ1lvdSBtdXN0IGNsaWNrIG9uIGEgZ2VvbWV0cnkgdG8gY2FjaGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGZ1c2lvbkxheWVyLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBvZmZsaW5lLmNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldHVwIGlucHV0IGZvciBjbGVhcmluZyBjYWNoZVxuICAgICAgICAgICQoJyNjbGVhci1jYWNoZWQtdGlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBvZmZsaW5lLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcblxuICAgIH0sNTAwKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG5cbiAgICAvLyB3ZSBzZWVtIHRvIGJlIGhhbmdpbmcgc29tZXRpbWVzLi4uLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcbiAgICB9LCA1MDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbigpIHtcbiAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikuYWRkQ2xhc3MoXCJidG4td2FybmluZ1wiKTtcbiAgfSBlbHNle1xuICAgIHdpbmRvdy5hbGVydChcIkdlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyLlwiKTtcbiAgfVxuICBmdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJidG4td2FyblwiKS5hZGRDbGFzcyhcImJ0bi1zdWNjZXNzXCIpO1xuICAgIG1hcC5zZXRab29tKDEwKTtcbiAgICBtYXAuc2V0Q2VudGVyKG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSk7XG4gICAgLy9fcXVlcnlXZWF0aGVyRGF0YShwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUlucHV0cyhpLCB0eXBlLCBwcmVmaXgsIG5hbWUsIGF0dHJzKSB7XG4gIHZhciBpZCA9IHByZWZpeC5sZW5ndGggPiAwID8gcHJlZml4KyctJytuYW1lIDogJ2lucHV0LScrbmFtZTtcbiAgdmFyIGlucHV0ID0gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDonKyhpKjIwKSsncHg7bWFyZ2luLXRvcDowcHg7bWFyZ2luLXJpZ2h0OjVweFwiPic7XG5cbiAgdmFyIHRyZWVib2R5ID0gXCJcIjtcblxuICBpZiggIShpID09IDEpICkge1xuICAgICAgaWYoIGkgIT0gMCApIGlucHV0ICs9ICc8bGFiZWwgZm9yPVwiJytpZCsnXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+JytuYW1lICsnPC9sYWJlbD4nO1xuICAgICAgaW5wdXQgKz0gJzxkaXY+JztcbiAgfVxuXG5cbiAgICAgIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICYmIGkgPT0gMSAgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICB0cmVlYm9keSArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyApIHtcbiAgICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlucHV0ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggKHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycpICYmIGkgPT0gMSApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG5cbiAgICAgIHRyZWVib2R5ICs9XG4gICAgICAgICAgJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICcrXG4gICAgICAgICAgKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlKydcIiBpZD1cIicrXG4gICAgICAgICAgaWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICB9IGVsc2UgaWYgKCAgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuICAgIGlucHV0ICs9ICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnXG4gICAgICAgICAgKyh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZStcbiAgICAgICAgICAgJ1wiIGlkPVwiJytpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgfVxuXG4gIGlmKCAhKGkgPT0gMSAvKiYmIHR5cGUgPT0gJ3RyZWUnKi8pICkge1xuICAgICAgaW5wdXQgKz0gJzwvZGl2PjwvZGl2Pic7XG4gIH0gZWxzZSB7XG4gICAgICBpbnB1dCArPSBUUkVFX1BBTkVMX1RFTVBMQVRFXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3tpZH19L2csaWQpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3t0aXRsZX19JyxuYW1lK1wiIDxzcGFuIHN0eWxlPSdjb2xvcjojODg4O2ZvbnQtc2l6ZToxMnB4Jz4gLSBcIithdHRycy5kZXNjcmlwdGlvbitcIjwvc3Bhbj5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2JvZHl9fScsdHJlZWJvZHkpKyc8L2Rpdj4nXG4gIH1cblxuICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShlbGUpIHtcbiAgd2VhdGhlckZpbGVSZWFkZXIuaW5pdCgpO1xuICB2YXIgbW9kZWwsIG0sIGF0dHIsIGNvbmZpZztcblxuICB2YXIgaW5wdXRzID0gJC5leHRlbmQodHJ1ZSwge30sIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpKTtcblxuICBpbnB1dHNbJ3NldHVwJ10gPSB7fTtcbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgbSA9IGlucHV0c1ttb2RlbF07XG4gICAgZm9yKCBhdHRyIGluIG0gKSB7XG4gICAgICBjb25maWcgPSBtW2F0dHJdO1xuXG4gICAgICBpZiggdHlwZW9mIGNvbmZpZyA9PSAnb2JqZWN0JyApIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0cixcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IGNvbmZpZy5kZXNjcmlwdGlvbixcbiAgICAgICAgICB2YWx1ZSAgICAgICA6IGNvbmZpZy52YWx1ZSxcbiAgICAgICAgICB1bml0cyAgICAgICA6IGNvbmZpZy51bml0c1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBpZiggbW9kZWwgPT0gXCJwbGFudGF0aW9uX3N0YXRlXCIgKSBjb250aW51ZTtcblxuICAgIHRhYkhlYWRlciArPSAnPGxpPjxhIGhyZWY9XCIjaW5wdXRzXycrbW9kZWwrJ1wiIGlkPVwidGFiX2lucHV0c18nK21vZGVsKydcIiBkYXRhLXRvZ2dsZT1cInBpbGxcIj4nXG4gICAgICAgICAgICAgICAgK21vZGVsLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkrbW9kZWwuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkrJzwvYT48L2xpPic7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbnB1dHNbbW9kZWxdO1xuXG4gICAgY29udGVudCArPSAnIDxkaXYgY2xhc3M9XCJwaWxsLXBhbmVcIiBpZD1cImlucHV0c18nK21vZGVsKydcIj4nO1xuXG4gICAgdmFyIHJvdzEgPSBcIlwiO1xuICAgIHZhciByb3cyID0gXCI8ZGl2IGNsYXNzPSdjb2wtbGctNj5cIjtcblxuICAgIGlmKCBtb2RlbCA9PSAnd2VhdGhlcicgKSB7XG4gICAgICBjb250ZW50ICs9IF9jcmVhdGVXZWF0aGVySW5wdXRzKCk7XG4gICAgfSBlbHNlIGlmKCBtb2RlbCA9PSAnc2V0dXAnICkge1xuICAgICAgY29udGVudCArPSBTRVRVUF9URU1QTEFURTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ICs9IHRyZWVIZWFkZXI7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBnb29nbGUgZHJpdmUgYnRuIGZyb20gdHJlZXNcbiAgICAgICAgaWYoIG1vZGVsID09J3RyZWUnICkge1xuICAgICAgICAgIGNvbnRlbnQgKz0gX2NyZWF0ZVRyZWVJbnB1dChtb2RlbCwgaW5wdXRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJycsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKTtcbiAgICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICAgIH1cblxuXG4gICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgfVxuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICB0YWJIZWFkZXIgKz0gXCI8L3VsPlwiO1xuXG4gIGVsZS5odG1sKHRhYkhlYWRlcitcIjxkaXYgY2xhc3M9J2Zvcm0taG9yaXpvbnRhbCc+XCIrY29udGVudCtcIjwvZGl2PlwiKTtcblxuICAvLyBydW4gdGhlIG1vZGVsIHdoZW5ldmVyIHNvbWUgaGl0cyAnZW50ZXInXG4gIGVsZS5maW5kKCdpbnB1dCcpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSl7XG4gICAgaWYoIGUud2hpY2ggPT0gMTMgKSBhcHAucnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIGxvYWRpbmcgYSB0cmVlXG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtbG9hZFwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93TG9hZFRyZWVQYW5lbCgpO1xuICB9KTtcbiAgZWxlLmZpbmQoXCIjZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2RyaXZlLnNob3dTYXZlVHJlZVBhbmVsKCk7XG4gIH0pO1xuXG4gIC8vIHNldCB0cmVlIGlucHV0IGhhbmRsZXJzXG4gICQoXCIjY29tcGFyZS10cmVlc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGlmKCAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgJChcIiNzaW5nbGUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjY29tcGFyZS10cmVlLWNvbnRlbnRcIikuc2hvdygpO1xuICAgICAgJChcIiN0cmVlLXN1Yi1tZW51XCIpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNzaW5nbGUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjY29tcGFyZS10cmVlLWNvbnRlbnRcIikuaGlkZSgpO1xuICAgICAgJChcIiN0cmVlLXN1Yi1tZW51XCIpLnNob3coKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNldCBwaWxsIGNsaWNrIGhhbmRsZXJzXG4gICQoJyNpbnB1dF90YWJzIGEnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAkKHRoaXMpLnRhYignc2hvdycpXG4gIH0pO1xuICAkKCcjdGFiX2lucHV0c193ZWF0aGVyJykudGFiKCdzaG93Jyk7XG5cbiAgJCgnLnNlbGVjdC13ZWF0aGVyLWxvY2F0aW9uJykub24oJ2NsaWNrJywgX3NlbGVjdFdlYXRoZXJMb2NhdGlvbik7XG5cblxuICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG4gICQoJyNsb2FkLXdlYXRoZXItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gICQoXCIjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgIGlmKCAkKHRoaXMpLmh0bWwoKSA9PSAnQXZlcmFnZXMnICkge1xuICAgICAgJCgnI2F2ZXJhZ2Utd2VhdGhlci1wYW5lbCcpLnNob3coKTtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwLnNldFdlYXRoZXIoKTtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgaWYoIHdlYXRoZXJBdmVyYWdlQ2hhcnQgKXtcbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBjaGFydHMuY3JlYXRlV2VhdGhlckNoYXJ0KCQoJyNhdmVyYWdlLXdlYXRoZXItY2hhcnQnKVswXSwgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEpO1xuICAgIH1cbiAgfSk7XG5cbiAgX3NldFdlYXRoZXJEYXRhKCk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cykge1xuICB2YXIgY29udGVudCA9IFwiXCI7XG4gIGNvbnRlbnQgKz0gR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJzaW5nbGUtdHJlZS1jb250ZW50XCI+JztcbiAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG5cbiAgY29udGVudCArPSAnPGRpdiBpZD1cImNvbXBhcmUtdHJlZS1jb250ZW50XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAnPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCI+JytcbiAgICAgICAgICAnPGxpIGNsYXNzPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiN0cmVlMVwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAxPC9hPjwvbGk+JytcbiAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIiN0cmVlMlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAyPC9hPjwvbGk+JytcbiAgICAgICAgJzwvdWw+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidHJlZTFcIj4nK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MTBweFwiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MScsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUyXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIiA+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkN1c3RvbTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IFRyZWU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgIF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJ3QyJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAnPC9kaXY+JztcblxuICByZXR1cm4gY29udGVudDtcbn1cblxuXG5yZXR1cm4ge1xuICBjcmVhdGUgOiBjcmVhdGUsXG4gIHVwZGF0ZUF2ZXJhZ2VDaGFydDogdXBkYXRlQXZlcmFnZUNoYXJ0XG59O1xuXG59O1xuIiwiLy8gU3BlY2lhbCBTYXVjZS4uLlxuLy8gYmFzaWNhbGx5IHRoZSBjb2RlIGxvYWRlZCBmcm9tIEdpdEh1YiBleHBlY3RzIHRoZSBmb2xsb3dpbmcgdG8gZXhpc3RzIGluIHRoZSB3aW5kb3cgc2NvcGVcbi8vICAgbTNQR0lPXG4vLyAgICAgLSByZWFkQWxsQ29udGFudHNcbi8vICAgICAtIHJlYWRXZWF0aGVyXG4vLyAgICAgLSBkdW1wXG4vLyAgICAgLSByZWFkRnJvbUlucHV0c1xuLy8gU28gd2UgaW5qZWN0IGZ1bmN0aW9ucyB0aGF0IGludGVyYWN0IHcvIG91ciBVSSwgbW9kZWwgaW4gbm8gd2F5IGNhcmVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgbW9kZWwuZGVidWcgPSB0cnVlO1xuXG4gICAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkgbW9kZWwucGxhbnRhdGlvbiA9IHt9O1xuICAgIHRoaXMucmVhZEFsbENvbnN0YW50cyhtb2RlbC5wbGFudGF0aW9uKTtcblxuICAgIGlmKCAhbW9kZWwud2VhdGhlciApIG1vZGVsLndlYXRoZXIgPSB7fTtcbiAgICBpZiggIW1vZGVsLm1hbmFnZSApIG1vZGVsLm1hbmFnZSA9IHt9O1xuICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gICAgdGhpcy5yZWFkV2VhdGhlcihtb2RlbC53ZWF0aGVyLCBtb2RlbC5tYW5hZ2UsIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcblxuICAgIGRlbGV0ZSB0aGlzLm1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXM7XG4gIH0sXG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnBsYW50YXRpb24pIHtcbiAgICAgIC8vICAgIHBsYW50YXRpb25ba2V5XSA9IHRoaXMubW9kZWwucGxhbnRhdGlvbltrZXldO1xuICAgICAgLy99XG5cbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gdGhpcy5tb2RlbC50cmVlO1xuXG4gICAgICAvLyBzZXR1cCBzZWVkbGluZyBUcmVlXG4gICAgICAvLyBUT0RPOiBoYXJkY29kZWQgZm9yIG5vdywgdGhpcyBzaG91bGRuJ3QgYmVcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMubW9kZWwudHJlZSk7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5zdGVtc1BlclN0dW1wID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnBmcy5zdGVtQ250ID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnJvb3RQID0ge1xuICAgICAgICAgIExBSVRhcmdldCA6IDEwLFxuICAgICAgICAgIGVmZmljaWVuY3kgOiAwLjYsXG4gICAgICAgICAgZnJhYyA6IDAuMDFcbiAgICAgIH07XG4gIH0sXG5cbiAgcmVhZFdlYXRoZXIgOiBmdW5jdGlvbih3ZWF0aGVyTWFwLCBtYW5hZ2UsIGN1c3RvbVdlYXRoZXJNYXApIHtcbiAgICAgIHZhciBkYXRlUGxhbnRlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVQbGFudGVkICYmIGRhdGVQbGFudGVkICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hbmFnZS5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlQ29wcGljZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZUNvcHBpY2VkICYmIGRhdGVDb3BwaWNlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVDb3BwaWNlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIERhdGVGaW5hbEhhcnZlc3QgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICAgICAgaWYgKERhdGVGaW5hbEhhcnZlc3QgJiYgRGF0ZUZpbmFsSGFydmVzdCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLkRhdGVGaW5hbEhhcnZlc3QgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgeWVhcnNQZXJDb3BwaWNlID0gJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpO1xuICAgICAgaWYgKHllYXJzUGVyQ29wcGljZSAmJiB5ZWFyc1BlckNvcHBpY2UgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPSBwYXJzZUludCgkKFwiI2lucHV0LW1hbmFnZS1jb3BwaWNlSW50ZXJ2YWxcIikudmFsKCkpO1xuICAgICAgfVxuXG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgbW9udGggOiAoaSArIDEpXG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgICAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IHRoaXMuYXBwLmlucHV0cy53ZWF0aGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciBjID0gdGhpcy5hcHAuaW5wdXRzLndlYXRoZXJbal07XG4gICAgICAgICAgICAgIGl0ZW1bY10gPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIG0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbS5ucmVsID0gaXRlbS5yYWQgLyAwLjAwMzY7XG5cbiAgICAgICAgICB3ZWF0aGVyTWFwW21dID0gaXRlbTtcbiAgICAgIH1cblxuICAgICAgaWYoIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgZm9yKCB2YXIgZGF0ZSBpbiB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdLm5yZWwgPSB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdLnJhZCAvIDAuMDAzNjtcbiAgICAgICAgICAgICAgLy9jdXN0b21XZWF0aGVyTWFwW2RhdGVdID0gY3VzdG9tX3dlYXRoZXJbZGF0ZV07XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdlYXRoZXJNYXA7XG4gIH0sXG4gIGR1bXAgOiBmdW5jdGlvbihyb3dzLCBzaGVldCkge1xuICAgICAgLy8gc2V0IHRoZSByYXcgb3V0cHV0XG4gICAgICB0aGlzLmFwcC5ydW5Db21wbGV0ZShyb3dzKTtcbiAgfSxcblxuICAvLyByZWFkIGEgdmFsdWUgZnJvbSB0aGUgaW5wdXRcbiAgLy8gaXQgaGFzIGEgJywnIGlzIHNldCBmb3IgdmFyaWF0aW9uXG4gIF9yZWFkVmFsIDogZnVuY3Rpb24oZWxlKSB7XG4gICAgICB2YXIgdmFsID0gZWxlLnZhbCgpO1xuICAgICAgaWYoIHZhbC5tYXRjaCgvXFxkKi1cXGQqLVxcZCokLykgKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH0gZWxzZSBpZiggdmFsLm1hdGNoKC8uKiwuKi8pICkge1xuICAgICAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHMvZywnJykuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIHZhciBpZCA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZSgvXmlucHV0LS8sJycpLnJlcGxhY2UoLy0vZywnLicpO1xuICAgICAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF0gPSBbXTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXS5wdXNoKHBhcnNlRmxvYXQodmFsW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKTtcbiAgfSxcblxuICByZWFkRnJvbUlucHV0cyA6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmVhZCBzb2lsXG4gICAgICB0aGlzLm1vZGVsLnNvaWwgPSB7fTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5tYXhBV1MgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1tYXhBV1NcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3cG93ZXIgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd3Bvd2VyXCIpKTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5zd2NvbnN0ID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3djb25zdFwiKSk7XG5cbiAgICAgIC8vIHJlYWQgbWFuYWdlXG4gICAgICB0aGlzLm1vZGVsLm1hbmFnZSA9IHtcbiAgICAgICAgICBjb3BwaWNlIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgZWxlcyA9ICQoXCIubWFuYWdlXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwubWFuYWdlW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LW1hbmFnZS1cIiwgXCJcIildID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb25cbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uID0ge307XG4gICAgICBlbGVzID0gJChcIi5wbGFudGF0aW9uXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwucGxhbnRhdGlvbltlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1wbGFudGF0aW9uLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgdHJlZVxuICAgICAgdmFyIHRyZWVJbnB1dHMgPSAkKFwiLnRyZWVcIik7XG4gICAgICB0aGlzLm1vZGVsLnRyZWUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRyZWVJbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJCh0cmVlSW5wdXRzW2ldKTtcblxuICAgICAgICAgIHZhciBwYXJ0cyA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXRyZWUtXCIsIFwiXCIpLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0pXG4gICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0ge307XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV1bcGFydHNbMV1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uIHN0YXRlXG4gICAgICBpZiggIXRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSApIHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLmdldERhdGFNb2RlbCgpLnBsYW50YXRpb25fc3RhdGUudmFsdWUgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlW2tleV0gPSAtMTtcbiAgICAgIH1cblxuICB9LFxuICBleHBvcnRTZXR1cCA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG4gICAgICB0aGlzLnJlYWRXZWF0aGVyKFtdLCB7fSwge30pO1xuXG4gICAgICB2YXIgZXggPSB7XG4gICAgICAgICAgd2VhdGhlciA6IHRoaXMubW9kZWwud2VhdGhlcixcbiAgICAgICAgICBjdXN0b21fd2VhdGhlciA6IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIsXG4gICAgICAgICAgdHJlZSA6IHRoaXMubW9kZWwudHJlZSxcbiAgICAgICAgICBwbGFudGF0aW9uIDogdGhpcy5tb2RlbC5wbGFudGF0aW9uLFxuICAgICAgICAgIG1hbmFnZSA6IHRoaXMubW9kZWwubWFuYWdlLFxuICAgICAgICAgIHNvaWwgOiB0aGlzLm1vZGVsLnNvaWwsXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgcGxhbnRhdGlvbl9zdGF0ZSA6IHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSxcbiAgICAgICAgICBjb25maWcgOiB7XG4gICAgICAgICAgICAgIGNoYXJ0VHlwZUlucHV0IDogJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgICAgbW9udGhzVG9SdW4gOiB0aGlzLmFwcC5tb250aHNUb1J1bigpLFxuICAgICAgICAgICAgICBjdXJyZW50TG9jYXRpb24gOiAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbCgpLFxuICAgICAgICAgICAgICBsb2FkZWRUcmVlIDogJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgdmVyc2lvbiA6IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA/IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA6IFwibWFzdGVyXCJcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGJ5IGRlZmF1bHQgdGhlIHJlYWQgZnVuY3Rpb24gc2V0IHRoZSB2YXJpYXRpb25zIHZhcmlhYmxlcyBidXQgb25seVxuICAgICAgLy8gcmV0dXJucyB0aGUgZmlyc3QsIHNldCB0aGUgdmFyaWF0aW9uIHBhcmFtcyB0byB0aGVpciBjb3JyZWN0IHZhbHVlc1xuICAgICAgZm9yKCB2YXIga2V5IGluIHRoaXMubW9kZWwudmFyaWF0aW9ucyApIHtcbiAgICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgIHZhciBwYXJhbSA9IGV4O1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoLTE7IGkrKyApIHtcbiAgICAgICAgICAgICAgcGFyYW0gPSBwYXJhbVtwYXJ0c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtW3BhcnRzW3BhcnRzLmxlbmd0aC0xXV0gPSB0aGlzLm1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleDtcbiAgfSxcbiAgbG9hZFRyZWUgOiBmdW5jdGlvbih0cmVlKSB7XG4gICAgICBmb3IgKCB2YXIgcm9vdEtleSBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0cmVlW3Jvb3RLZXldICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkpLnZhbCh0cmVlW3Jvb3RLZXldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3IgKCB2YXIgY2hpbGRLZXkgaW4gdHJlZVtyb290S2V5XSkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSArIFwiLVwiICsgY2hpbGRLZXkpLnZhbCh0cmVlW3Jvb3RLZXldW2NoaWxkS2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH0sXG4gIGxvYWRTZXR1cCA6IGZ1bmN0aW9uKGZpbGVpZCwgc2V0dXAsIGlzUnQpIHtcblxuICAgICAgLy8gbG9hZCBjb25maWdcbiAgICAgIGlmIChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQpIHtcbiAgICAgICAgICB0aGlzLmNoYXJ0cy51bnNlbGVjdEFsbCgpO1xuICAgICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLmNoYXJ0cy5zZWxlY3Qoc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbikge1xuICAgICAgICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKHNldHVwLmNvbmZpZy5jdXJyZW50TG9jYXRpb24pO1xuICAgICAgfVxuICAgICAgaWYoIHNldHVwLmNvbmZpZy5sb2FkZWRUcmVlICkge1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKHNldHVwLmNvbmZpZy5sb2FkZWRUcmVlKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxvYWQgd2VhdGhlclxuICAgICAgaWYoIEFycmF5LmlzQXJyYXkoc2V0dXAud2VhdGhlcikgKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNldHVwLndlYXRoZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICggdmFyIGkgaW4gc2V0dXAud2VhdGhlciApIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiggc2V0dXAuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHNldHVwLmN1c3RvbV93ZWF0aGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgY2hhcnRcbiAgICAgIHRoaXMuaW5wdXRGb3JtLnVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuXG4gICAgICAvLyBsb2FkIHRyZWVcbiAgICAgIHRoaXMubG9hZFRyZWUoc2V0dXAudHJlZSk7XG5cbiAgICAgIC8vIGxvYWQgcGxhbnRpbmcgcGFyYW1zXG4gICAgICAvLyBOb3cgcGFydCBvZiBtYW5hZ2UuLi4uXG4gICAgICAvLyBmb1xuICAgICAgaWYgKHNldHVwLm1hbmFnZSkge1xuICAgICAgICAgIHZhciBtYXAgPSB7XG4gICAgICAgICAgICAgIFwiZGF0ZVBsYW50ZWRcIiA6IFwiRGF0ZVBsYW50ZWRcIixcbiAgICAgICAgICAgICAgXCJkYXRlQ29wcGljZWRcIiA6IFwiRGF0ZUNvcHBpY2VkXCIsXG4gICAgICAgICAgICAgIFwieWVhcnNQZXJDb3BwaWNlXCIgOiBcIkNvcHBpY2VJbnRlcnZhbFwiXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC5tYW5hZ2UpIHtcbiAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IGtleTtcbiAgICAgICAgICAgICAgaWYoIG1hcFtrZXldICkgbmV3S2V5ID0gbWFwW2tleV07XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR1cC5tYW5hZ2Vba2V5XSA9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAubWFuYWdlW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtXCIgKyBuZXdLZXkpLnZhbChzZXR1cC5tYW5hZ2Vba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0aGlzIHZhbHVlIGlzIGRlcHJlY2F0ZWQsIHNldCB0byBuZXcgaW5wdXRcbiAgICAgIGlmKCBzZXR1cC5jb25maWcubW9udGhzVG9SdW4gKSB7XG4gICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShzZXR1cC5tYW5hZ2UuZGF0ZVBsYW50ZWQpO1xuICAgICAgICAgIGQgPSBuZXcgRGF0ZShuZXcgRGF0ZShkKS5zZXRNb250aChkLmdldE1vbnRoKCkrcGFyc2VJbnQoc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuKSkpO1xuICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKGQudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgfVxuXG5cbiAgICAgIC8vIGxvYWQgcmVzdFxuICAgICAgdmFyIGlucHV0cyA9IFsgXCJwbGFudGF0aW9uXCIsIFwic29pbFwiLCBcIm1hbmFnZVwiIF07XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwW2lucHV0c1tpXV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbWF4QVdTJykge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1zb2lsLW1heEFXU1wiKS52YWwoc2V0dXAuc29pbC5tYXhBV1MpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygc2V0dXBbaW5wdXRzW2ldXVtrZXldID09ICdzdHJpbmcnICYmIHNldHVwW2lucHV0c1tpXV1ba2V5XS5tYXRjaCgvLipULipaJC8pICkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5hcHAucnVuTW9kZWwoaXNSdCk7XG4gIH1cbn07XG4iLCJcbiAgLy8gbXVzdCBpbnN0YWxsIHRoaXMgZm9yIG5hdGl2ZSBwaG9uZWdhcCBzdXBwb3J0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvbmVnYXAtYnVpbGQvQ2hpbGRCcm93c2VyXG5cbnZhciB3aW4gPSBudWxsO1xuXG4vKiB0aGUga2V5IGZvciByZWZyZXNoIFRva2VuIGluIGxvY2FsIFN0b3JhZ2UgKi9cbnZhciB0b2tlbktleSA9ICdyZWZyZXNoX3Rva2VuJztcblxuLyogc3RvcmVzIHRoZSBhY2Nlc3NUb2tlbiBhZnRlciByZXRyaWV2YWwgZnJvbSBnb29nbGUgc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW4gPSBudWxsO1xuXG4vKiBzdG9yZXMgdGhlIFRpbWUgd2hlbiBhY2Nlc3MgdG9rZW4gd2FzIGxhc3QgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlblRpbWUgPSBudWxsO1xuXG4vKiBzdG9yZXMgYWNjZXNzIFRva2VuJ3MgRXhwaXJ5IExpbWl0LiBVc2VzIDU4IG1pbi4gaW5zdGVhZCBvZiA2MCBtaW4uICovXG52YXIgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCA9IDU4ICogNjAgKiAxMDAwO1xuXG4vKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSBzdG9yaW5nIGNhbGxiYWNrIGZ1bmN0aW9uICovXG52YXIgY2FsbGJhY2tGdW5jID0gZmFsc2U7XG5cbi8vIGFyZSB3ZSBydW5uaW5nIG5hdGl2ZSBvciBicm93c2VyIG1vZGU/XG52YXIgaXNOYXRpdmUgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvXmZpbGUuKi8pID8gdHJ1ZSA6IGZhbHNlO1xuXG52YXIgQ0xJRU5UX0lEID0gaXNOYXRpdmUgP1xuICAgICAgICBcIjM0NDE5MDcxMzQ2NS1kaWltdGZlcmg0dGpiMDMxNjlia2w5bWtvcXZxMnJ1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiIDpcbiAgICAgICAgIFwiMzQ0MTkwNzEzNDY1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCI7XG5cbnZhciBBUFBfSUQgPSBcIjM0NDE5MDcxMzQ2NVwiO1xuXG52YXIgT0FVVEhfU0NPUEVTID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZSAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuaW5zdGFsbCAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSc7XG5cbi8qIGNvbmZpZyB2YWx1ZXMgZm9yIEdvb2dsZSBBUEkgKGdhcGkpICovXG52YXIgZ2FwaUNvbmZpZyA9IHtcbiAgZW5kcG9pbnQ6IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGhcIixcbiAgZW5kdG9rZW46IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuXCIsIC8vIHRva2VuIGVuZHBvaW50XG4gIHJlZGlyZWN0X3VyaSA6IFwiaHR0cDovL2xvY2FsaG9zdFwiLFxuICBjbGllbnRfc2VjcmV0IDogJzZyT1E5bDBmeW5oMTM3TVJYR0stR19aZycsXG4gIHJlc3BvbnNlX3R5cGUgOiBcImNvZGVcIixcbiAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICBzdGF0ZSA6IFwiZ2RyaXZlaW5pdFwiLFxuICBhY2Nlc3NfdHlwZSA6IFwib2ZmbGluZVwiLFxuICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcblxuICAvKiBBcyBkZWZpbmVkIGluIHRoZSBPQXV0aCAyLjAgc3BlY2lmaWNhdGlvbiwgdGhpcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWx1ZVxuICAgICAqIG9mIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIgb3IgXCJyZWZyZXNoX3Rva2VuXCIgKi9cbiAgICBncmFudFR5cGVzOiB7IEFVVEhPUklaRTogXCJhdXRob3JpemF0aW9uX2NvZGVcIiwgUkVGUkVTSDogXCJyZWZyZXNoX3Rva2VuXCIgfSxcbiB9O1xuXG4vKipcbiAqIEVudW0gZm9yIFN0YXR1cyB2YWx1ZXNcbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICpcbiAqIFNVQ0NFU1MgLSBTdWNjZXNzZnVsbHkgZGF0YSByZWNlaXZlZCBmcm9tIHNlcnZlclxuICogRVJST1IgLSBFcnJvciBvY2N1cnJlZCB3aGVuIHRyeWluZyB0byByZWNlaXZlIGZyb20gc2VydmVyXG4gKiBOT1RfREVURVJNSU5FRCAtIHVuZGV0ZXJtaW5lZFxuICovXG52YXIgc3RhdHVzID0ge1xuICAgICAgICBTVUNFU1M6IDEsXG4gICAgICAgIEVSUk9SOiAtMSxcbiAgICAgICAgTk9UX0RFVEVSTUlORUQ6IDBcbn1cblxucmVxdWVzdFN0YXR1cyA9IDA7XG5cbi8qIHN0b3JlcyB0aGUgYXV0aG9yaXphdGlvbiBDb2RlIGludGVybmFsbHkgKi9cbmF1dGhDb2RlID0gZmFsc2U7XG5cbi8qIHN0b3JlcyB0aGUgZXJyb3IgbWVzc2FnZSB3aGVuIGFuIGVycm9yIGhhcHBlbnMgZnJvbSBnb29nbGUgc2VydmVyICovXG5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcblxudmFyIGxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBjb25zb2xlLmxvZyhcIioqKk9BVVRIKioqOiBcIittc2cpO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIGF1dGhvcml6ZSB1c2VyIHVzaW5nIE9BdXRoXG4gKiBPcGVucyB1cCBBbm90aGVyIHdpbmRvdyB3aGVyZSB1c2VyIGFsbG93cyBhY2Nlc3Mgb3IgZGVuaWVzIGl0LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxCYWNrICAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBpbnZva2VkXG4gKi9cbnZhciBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsQmFjaykge1xuICBsb2coXCJhdHRlbXB0aW5nIHRvIGF1dGhvcml6ZVwiKTtcblxuICAgIHZhciBhdXRoVXJpID0gZ2FwaUNvbmZpZy5lbmRwb2ludCArICc/J1xuICAgICsgJ3Njb3BlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zY29wZSlcbiAgICArICcmJyArICdyZWRpcmVjdF91cmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSlcbiAgICArICcmJyArICdyZXNwb25zZV90eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZXNwb25zZV90eXBlKVxuICAgICsgJyYnICsgJ2NsaWVudF9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuY2xpZW50X2lkKTtcbiAgICAvLysgJyYnICsgJ3N0YXRlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zdGF0ZSlcbiAgICAvLysgJyYnICsgJ2FjY2Vzc190eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5hY2Nlc3NfdHlwZSlcbiAgICAvLysgJyYnICsgJ2FwcHJvdmFsX3Byb21wdD1mb3JjZSc7IC8vIEBUT0RPIC0gY2hlY2sgaWYgd2UgcmVhbGx5IG5lZWQgdGhpcyBwYXJhbVxuXG4gICAgY2FsbGJhY2tGdW5jID0gY2FsbEJhY2s7XG4gICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcblxuXG5cblxuICAgIGxvZyhcIm9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuXG4gICAgdHJ5IHtcblxuICAgICAgLy8gTm93IG9wZW4gbmV3IGJyb3dzZXJcbiAgICAgIHdpbiA9IHdpbmRvdy5vcGVuKGF1dGhVcmksICdfYmxhbmsnLCAnbG9jYXRpb249bm8sdG9vbGJhcj1ubycpO1xuXG4gICAgICAkKHdpbikub24oJ2xvYWRzdGFydCcsZnVuY3Rpb24oZSl7XG4gICAgICAgIGxvZyhcIkluQXBwQnJvd3NlciBsb2Fkc3RhcnRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgICBvbkF1dGhVcmxDaGFuZ2UoZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICB9KTtcblxuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIuc2hvd1dlYlBhZ2UoYXV0aFVyaSwge3Nob3dMb2NhdGlvbkJhciA6IHRydWV9KTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uQ2xvc2UgPSBvbkF1dGhDbG9zZTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uTG9jYXRpb25DaGFuZ2UgPSBvbkF1dGhVcmxDaGFuZ2U7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBsb2coXCJFcnJvciBvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcbiAgICAgIGxvZyhlKTtcbiAgICB9XG5cbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbW1lZGlhdGUpIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IGltbWVkaWF0ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBhdXRoQ29kZSA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGNhbGxiYWNrKGF1dGhDb2RlKTtcbiAgfSk7XG5cbiAgfVxufVxuXG4vKiBBdXRoIFdpbmRvdyBjbG9zZWQgKi9cbnZhciBvbkF1dGhDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQXV0aCB3aW5kb3cgY2xvc2VkXCIpO1xufTtcblxuLyogT0F1dGggU3VjY2Vzc2Z1bGx5IGRvbmUgKi9cbnZhciBvbkF1dGhTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0F1dGggU3VjY2Vzcz8nKTtcbn07XG5cbi8qKlxuICogR2V0cyBJbnZva2VkIHdoZW4gdGhlIFVSTCBjaGFuZ2VzIG9uIE9BdXRoIGF1dGhvcml6YXRpb24gcHJvY2Vzc1xuICpcbiAqIFN1Y2Nlc3MgVVJMIFBhdHRlcm46XG4gKiBcInJlZGlyZWN0X3VyaVwiICsgXCI/Y29kZT1cIiBbc2VjcmV0IGNvZGUgdmFsXVxuICpcbiAqIFN1Y2Nlc3MgU2FtcGxlIFVSTDpcbiAqIGh0dHA6Ly9sb2NhbGhvc3QvP2NvZGU9NC9XT3BSTFFmdnZoSEUwdHVNVUREcW5uNzZsQ1RULjhuWEM0SWViTUVBVXVKSlZuTDQ5Q2M4QVFHcjhjUUlcbiAqXG4gKiBEZW5pZWQgQWNjZXNzIFVSTCBQYXR0ZXJuOiBcInJlZGlyZWN0X3VyaVwiICsgP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqIERlbmllZCBBY2Nlc3MgU2FtcGxlOiBodHRwOi8vbG9jYWxob3N0Lz9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaUxvY2F0aW9uIFRoZSBVUkkgTG9jYXRpb25cbiAqL1xudmFyIG9uQXV0aFVybENoYW5nZSA9IGZ1bmN0aW9uKHVyaUxvY2F0aW9uKSB7XG4gICAgY29uc29sZS5sb2coXCJJbkFwcEJyb3dzZXIgdXJsIGNoYW5nZWQgXCIrdXJpTG9jYXRpb24pO1xuICAgIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJjb2RlPVwiKSAhPSAtMSkge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLlNVQ0NFU1M7XG5cbiAgICAgICAgLyogU3RvcmUgdGhlIGF1dGhDb2RlIHRlbXBvcmFyaWx5ICovXG4gICAgICAgIGF1dGhDb2RlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiY29kZVwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGxvZyhcIkZvdW5kIGF1dGggY29kZTogXCIrYXV0aENvZGUpO1xuXG4gICAgICAgIGdldFJlZnJlc2hUb2tlbihjYWxsYmFja0Z1bmMpO1xuXG4gICAgICAgIC8vIGNsb3NlIHRoZSBjaGlsZEJyb3dzZXJcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJlcnJvcj1cIikgIT0gLTEpICB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuRVJST1I7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImVycm9yXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgY2FsbGJhY2tGdW5jKCk7XG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG4gICAgICAgIC8vY2FsbGJhY2tGdW5jKCk7XG4gICAgfVxufTtcblxuXG4vKipcbiogR2V0cyB0aGUgUmVmcmVzaCBmcm9tIEFjY2VzcyBUb2tlbi4gVGhpcyBtZXRob2QgaXMgb25seSBjYWxsZWQgaW50ZXJuYWxseSxcbiogYW5kIG9uY2UsIG9ubHkgYWZ0ZXIgd2hlbiBhdXRob3JpemF0aW9uIG9mIEFwcGxpY2F0aW9uIGhhcHBlbnMuXG4qXG4qIEBwYXJhbSBwYXJhbU9iaiBBbiBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHBhcmFtT2JqLmF1dGhfY29kZSBUaGUgQXV0aG9yaXphdGlvbiBDb2RlIGZvciBnZXR0aW5nIFJlZnJlc2ggVG9rZW5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsIHJldHJpZXZhbCBvZiBkYXRhIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qL1xudmFyIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGNvbnNvbGUubG9nKFwiYWNjZXNzIHJlZnJlc2ggdG9rZW5cIik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgIGNvZGUgICAgICAgICA6IGF1dGhDb2RlLFxuICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaSA6IGdhcGlDb25maWcucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5BVVRIT1JJWkVcbiAgICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgZ2V0dGluZyByZWZyZXNoIHRva2VuXCIpO1xuXG4gICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgIGFjY2Vzc1Rva2VuICAgICA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgIC8qIHNldCB0aGUgZXJyb3Igb2YgZGF0YSB0byBmYWxzZSwgYXMgaXQgd2FzIHN1Y2Nlc3NmdWwgKi9cbiAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcblxuICAgICAgICAvKiBub3cgaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICBjYWxsYmFjayh7YWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbn0pO1xuICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBzaG91bGQgT05MWSBiZSBjYWxsZWQgbG9jYWxseSBmcm9tIHdpdGhpbiB0aGlzIGNsYXNzLlxuKiBSZXR1cm5zIHRoZSBSZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlLlxuKlxuKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZWZyZXNoIFRva2VuXG4qXG4qL1xudmFyIGdldFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG59O1xuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGV4dGVybmFsbHkuIEl0IHJldHJpZXZlcyB0aGUgQWNjZXNzIFRva2VuIGJ5IGF0IGZpcnN0XG4qIGNoZWNraW5nIGlmIGN1cnJlbnQgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkIG9yIG5vdC4gSWYgaXRzIG5vdCBleHBpcmVkLCBpdFxuKiBzaW1wbHkgcmV0dXJucyB0aGF0LCBvdGhlcndpc2UsIGl0IGdldHMgdGhlIHJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2VcbiogKGJ5IGludm9raW5nIGdldFRva2VuKSBhbmQgdGhlbiBjb25uZWN0aW5nIHdpdGggR29vZ2xlJ3MgU2VydmVyICh1c2luZyBPQXV0aClcbiogdG8gZ2V0IHRoZSBBY2Nlc3MgVG9rZW4uXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgQSBjYWxsQmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIGlzIHJldHJpZXZlZCBmcm9tIHRoZSBnb29nbGUncyBzZXJ2ZXIuIFRoZSBkYXRhXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGdvb2dsZSBzZXJ2ZXIgaXMgcGFzc2VkIHRvIGNhbGxiYWNrIGFzIGFyZ3MuXG4qXG4qL1xudmFyIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBhY2Nlc3MgdG9rZW5cIik7XG5cbiAgIC8qIGNoZWNrIGlmIGN1cnJlbnQgVG9rZW4gaGFzIG5vdCBleHBpcmVkIChzdGlsbCB2YWxpZCkgKi9cbiAgIGlmIChhY2Nlc3NUb2tlbiAmJiBhY2Nlc3NUb2tlbiAhPSBmYWxzZSAmJlxuICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICBjYWxsYmFjayh7IGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4gfSk7XG5cbiAgICAgICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zb2xlLmxvZyhcIkFDQ0VTUyBUT0tFTiBQQVJBTVM6IFwiK2FjY2Vzc1Rva2VuK1wiIFwiK2FjY2Vzc1Rva2VuVGltZStcIiBcIithY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KTtcblxuICAgLyogZWxzZSwgZ2V0IHRoZSByZWZyZXNoVG9rZW4gZnJvbSBsb2NhbCBzdG9yYWdlIGFuZCBnZXQgYSBuZXcgYWNjZXNzIFRva2VuICovXG4gICB2YXIgcmVmcmVzaFRva2VuID0gZ2V0VG9rZW4oKTtcblxuICAgLy8gICBjb25zb2xlLmxvZyhcIlJlZnJlc2ggVG9rZW4gPj4gXCIgKyByZWZyZXNoVG9rZW4pO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuUkVGUkVTSCxcbiAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgICAgIC8qIHNldCB0aGUgZXJyb3IgdG8gZmFsc2UgKi9cbiAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGVycm9yID8/ID4+XCIgKyB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHsgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgaWYgKGFjY2Vzc1Rva2VuICYmXG4gICAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhhY2Nlc3NUb2tlbik7XG5cbiAgICAgICAgICAgICByZXR1cm47XG4gICAgIH1cblxuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgYWNjZXNzVG9rZW4gPSB0b2tlbjtcbiAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKlxuKiBTYXZlcyB0aGUgUmVmcmVzaCBUb2tlbiBpbiBhIGxvY2FsIGRhdGFiYXNlIG9yIGxvY2FsU3RvcmFnZVxuKiBUaGlzIG1ldGhvZCBzaGFsbCBiZSBpbnZva2VkIGZyb20gZXh0ZXJuYWxseSBvbmx5IDxiPm9uY2U8L2I+IGFmdGVyIGFuXG4qIGF1dGhvcml6YXRpb24gY29kZSBpcyByZWNlaXZlZCBmcm9tIGdvb2dsZSdzIHNlcnZlci4gVGhpcyBtZXRob2RcbiogY2FsbHMgdGhlIG90aGVyIG1ldGhvZCAoZ2V0UmVmcmVzaFRva2VuKSB0byBnZXQgdGhlIHJlZnJlc2ggVG9rZW4gYW5kXG4qIHRoZW4gc2F2ZXMgaXQgbG9jYWxseSBvbiBkYXRhYmFzZSBhbmQgaW52b2tlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4qXG4qIEBwYXJhbSB0b2tlbk9iaiBBIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0ge1N0cmluZ30gdG9rZW5PYmouYXV0aF9jb2RlIFRoZSBhdXRob3JpemF0aW9uIGNvZGUgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2l0aCBwYXJhbWV0ZXJzXG4qL1xudmFyIHNhdmVSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbih0b2tlbk9iaiwgY2FsbGJhY2spIHtcbiAgICAgZ2V0UmVmcmVzaFRva2VuKHRva2VuT2JqLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAvKiBpZiB0aGVyZSdzIG5vIGVycm9yICovXG4gICAgICAgICAgICAgaWYgKCFkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEBUT0RPOiBtYWtlIGFub3RoZXIgbWV0aG9kIHNhdmVUb2tlbiB0byBhYnN0cmFjdCB0aGUgc3RvcmluZyBvZiB0b2tlblxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgIH0pO1xufTtcblxuXG5cbi8qKlxuKiBDaGVja3MgaWYgdXNlciBoYXMgYXV0aG9yaXplZCB0aGUgQXBwIG9yIG5vdFxuKiBJdCBkb2VzIHNvIGJ5IGNoZWNraW5nIGlmIHRoZXJlJ3MgYSByZWZyZXNoX3Rva2VuXG4qIGF2YWlsYWJsZSBvbiB0aGUgY3VycmVudCBkYXRhYmFzZSB0YWJsZS5cbipcbiogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBhdXRob3JpemVkLCBmYWxzZSBvdGhlcndpc2VcbiovXG52YXIgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHZhciB0b2tlblZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcblxuICAgICAgY2FsbGJhY2soKCh0b2tlblZhbHVlICE9PSBudWxsKSAmJiAodHlwZW9mIHRva2VuVmFsdWUgIT09ICd1bmRlZmluZWQnKSkpO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogRXh0cmFjdHMgdGhlIGNvZGUgZnJvbSB0aGUgdXJsLiBDb3BpZWQgZnJvbSBvbmxpbmVcbiogQFRPRE8gbmVlZHMgdG8gYmUgc2ltcGxpZmllZC5cbipcbiogQHBhcmFtIG5hbWUgVGhlIHBhcmFtZXRlciB3aG9zZSB2YWx1ZSBpcyB0byBiZSBncmFiYmVkIGZyb20gdXJsXG4qIEBwYXJhbSB1cmwgIFRoZSB1cmwgdG8gYmUgZ3JhYmJlZCBmcm9tLlxuKlxuKiBAcmV0dXJuIFJldHVybnMgdGhlIFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5hbWUgcGFzc2VkXG4qL1xudmFyIGdldFBhcmFtZXRlckJ5TmFtZSA9IGZ1bmN0aW9uKG5hbWUsIHVybCkge1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXFxcXVwiKTtcbiAgdmFyIHJlZ2V4UyA9IFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiO1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4Uyk7XG4gIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuXG4gIGlmKHJlc3VsdHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBlbHNlXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aG9yaXplIDogYXV0aG9yaXplLFxuICBpc0F1dGhvcml6ZWQgOiBpc0F1dGhvcml6ZWQsXG4gIGdldEFjY2Vzc1Rva2VuIDogZ2V0QWNjZXNzVG9rZW4sXG4gIEFQUF9JRCA6IEFQUF9JRFxufTtcbiIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG52YXIgY2FjaGVkVGlsZVN0eWxlID0ge1xuICB3aGVyZTogXCJwaWQgaW4gKClcIixcbiAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICBmaWxsQ29sb3I6IFwiIzAwMDAwMFwiLFxuICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwMDBcIixcbiAgICBzdHJva2VXZWlnaHQ6IDNcbiAgfVxufVxuXG52YXIgY2FjaGVkVGlsZXMgPSBbXTtcbnZhciBjYWNoZWRUaWxlc0xvYWRlZCA9IGZhbHNlO1xudmFyIGNhY2hlZFRpbGVQcmVmaXggPSAnY2FjaGVkX3RpdGxlXyc7XG52YXIgY2FjaGluZyA9IGZhbHNlO1xudmFyIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSBmYWxzZTtcbnZhciBjTWFwRGF0YSA9IHt9O1xuXG52YXIgY29scyA9IFtdO1xudmFyIGFwcCA9IG51bGw7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIF9sb2FkRnJvbUNhY2hlKCk7XG4gIF9sb2FkQ2FjaGVkVGlsZXMoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgaWYoICFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgYWxsIHRpbGUgZGF0YSBmcm9tIHRoZSBjYWNoZT8nKSApIHJldHVybjtcblxuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlcyA9IFtdO1xufVxuXG4vLyBlIGlzIHRoZSBldmVudCBvYmplY3QgZnJvbSBnb29nbGUgbWFwc1xuZnVuY3Rpb24gY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhc2F2ZUNhY2hlT25DbGlja1NldCApIHtcbiAgICBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gdHJ1ZTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIF9zYXZlVGlsZSgpO1xuICAgIH0pO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaXMoJ2NoZWNrZWQnKSApICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmKCBjYWNoaW5nICkgcmV0dXJuO1xuICBjYWNoaW5nID0gdHJ1ZTtcblxuICBjTWFwRGF0YSA9IHtcbiAgICBmdXNpb25MYXllciA6IGZ1c2lvbkxheWVyLFxuICAgIGRlZmF1bHRPcHRpb25zIDogZGVmYXVsdE9wdGlvbnMsXG4gICAgZGVmYXVsdFN0eWxlIDogZGVmYXVsdFN0eWxlLFxuICAgIHBpZCA6ICBlLnJvdy5waWQudmFsdWVcbiAgfVxuXG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCcnKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5zaG93KCk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcblxuICBfbG9hZFRpbGUoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbihkYXRhKXtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5zaG93KCk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5oaWRlKCk7XG5cbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGlkJykuaHRtbChjTWFwRGF0YS5waWQpO1xuICAgIGNNYXBEYXRhLmRhdGEgPSBkYXRhO1xuICAgIGNhY2hpbmcgPSBmYWxzZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICBfY3JlYXRlTmF2TWVudSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdCB0cmVlIGJ1dHRvblxuICAkKCcjdHJlZS1zdWItbWVudScpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3RvciBmb3IgdXBsb2FkaW5nIHdlYXRoZXIgZGF0YSBmcm9tIGEgZ29vZ2xlIHNwcmVhZHNoZWV0XG4gICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIHNob3cgdGhlIGNhY2hlIHZlcnNpb24gb2YgdGhlIGxvY2F0aW9uIHNlbGVjdG9yXG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb25saW5lJykuaGlkZSgpO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUnKS5zaG93KCk7XG5cbiAgLy8gc2V0IHRoZSBsb2NhdGlvbiBzZWxlY3RvciB1aSBsaXN0IGJhc2VkIG9uIGNhY2hlZCB0aWxlc1xuICBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFjYWNoZWRUaWxlc0xvYWRlZCApIF9sb2FkQ2FjaGVkVGlsZXMoKTtcblxuICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMgPSBbZGVmYXVsdFN0eWxlXTtcblxuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID4gMCApIHtcbiAgICBjYWNoZWRUaWxlU3R5bGUud2hlcmUgPSAncGlkIGluICgnK2NhY2hlZFRpbGVzLmpvaW4oJywnKSsnKSc7XG4gICAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzLnB1c2goY2FjaGVkVGlsZVN0eWxlKTtcbiAgfVxuXG4gIGZ1c2lvbkxheWVyLnNldE9wdGlvbnMoZGVmYXVsdE9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfc2F2ZVRpbGUoKSB7XG4gIHZhciBuYW1lID0gJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSByZXR1cm4gYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgbmFtZScpO1xuXG4gIGNNYXBEYXRhLmRhdGEubmFtZSA9IG5hbWU7XG5cbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY01hcERhdGEucGlkLCBKU09OLnN0cmluZ2lmeShjTWFwRGF0YS5kYXRhKSk7XG5cbiAgY2FjaGVkVGlsZXMucHVzaChjTWFwRGF0YS5waWQpO1xuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGNNYXBEYXRhLmZ1c2lvbkxheWVyLCBjTWFwRGF0YS5kZWZhdWx0T3B0aW9ucywgY01hcERhdGEuZGVmYXVsdFN0eWxlKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xufVxuXG5mdW5jdGlvbiBfbG9hZFRpbGUobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3RpbGUtZGF0YS1jYWNoZScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuICB2YXIgd2VhdGhlclRhYmxlID0ge307XG4gIHZhciBzb2lsVGFibGUgPSB7fTtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjayh7d2VhdGhlcjp3ZWF0aGVyVGFibGUsIHNvaWw6c29pbFRhYmxlfSk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHdlYXRoZXJUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBzb2lsVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKSB7XG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPT0gMCApIHtcbiAgICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpLnNob3coKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbGlzdEVsZSA9ICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1saXN0JykuaHRtbCgnPGRpdj5TZWxlY3QgQ2FjaGVkIFRpbGU8L2Rpdj4nKSwgZWxlO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNhY2hlZFRpbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaV0pO1xuICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgZWxlID0gJCgnPGRpdj48YSBjYWNoZWlkPVwiJytpKydcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+JytjYWNoZWRUaWxlc1tpXSsnOiAnK2pzb24ubmFtZSsnPC9hPjwvZGl2PicpO1xuICAgIGVsZS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfcnVuQ2FjaGVkVGlsZShwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2NhY2hlaWQnKSkpO1xuICAgIH0pO1xuICAgIGxpc3RFbGUuYXBwZW5kKGVsZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfcnVuQ2FjaGVkVGlsZShpbmRleCkge1xuICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2luZGV4XSk7XG4gIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi53ZWF0aGVyLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG0gPSBpKycnO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwganNvbi53ZWF0aGVyLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwoanNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXSA/IGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLnNvaWwuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZigganNvbi5zb2lsLnJvd3NbMF0gPT0gbnVsbCApIGNvbnRpbnVlO1xuICAgICQoXCIjaW5wdXQtc29pbC1cIitqc29uLnNvaWwuY29sc1tpXS5pZCkudmFsKGpzb24uc29pbC5yb3dzWzBdLmNbaV0udik7XG4gIH1cblxuICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGFwcC5ydW5Nb2RlbCgpO1xuICB9LCA1MDApO1xufVxuXG5mdW5jdGlvbiBfbG9hZENhY2hlZFRpbGVzKCkge1xuICBjYWNoZWRUaWxlcyA9IFtdO1xuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIGNhY2hlZFRpbGVzLnB1c2goa2V5LnJlcGxhY2UoY2FjaGVkVGlsZVByZWZpeCwnJykpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlc0xvYWRlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVOYXZNZW51KCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiPk9GRkxJTkUgTU9ERTxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbmZ1bmN0aW9uIF9sb2FkRnJvbUNhY2hlKCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnY2FjaGUvanNhcGknLFxuICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvY2hhcnQuY3NzJykgKTtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2Fubm90YXRlZHRpbWVsaW5lLmNzcycpICk7XG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJ2NhY2hlL2NoYXJ0LmpzJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2hhcnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYoIGNoYXJ0c0NhbGxiYWNrICkgY2hhcnRzQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgcmVuZGVyIDogcmVuZGVyLFxuICBjYWNoZVRpbGUgOiBjYWNoZVRpbGUsXG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAgOiByZW5kZXJDYWNoZWRUaWxlc09uTWFwLFxuICBjbGVhckNhY2hlIDogY2xlYXJDYWNoZVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiTWVhbiBWYXBvciBQcmVzc3VyZSBEZWZpY2l0XCIsXG4gICAgICB1bml0cyA6IFwia1BBXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwidGhlIGRpZmZlcmVuY2UgKGRlZmljaXQpIGJldHdlZW4gdGhlIGFtb3VudCBvZiBtb2lzdHVyZSBpbiB0aGUgYWlyIGFuZCBob3cgbXVjaCBcIiArXG4gICAgICBcdFx0XCJtb2lzdHVyZSB0aGUgYWlyIGNhbiBob2xkIHdoZW4gaXQgaXMgc2F0dXJhdGVkXCJcbiAgfSxcbiAgZlZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZUIDoge1xuICAgICAgbGFiZWwgOiBcIlRlbXBlcmF0dXJlIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZGcm9zdCA6IHtcbiAgICAgIGxhYmVsIDogXCJGcm9zdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIGZyb3N0IGRheXMgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUEFSIDoge1xuICAgICAgbGFiZWwgOiBcIk1vbnRobHkgUGhvdG9zeW50aGV0aWNhbGx5IEFjdGl2ZSBSYWRpYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtb2xzIC8gbV4yIG1vbnRoXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVzaWduYXRlcyB0aGUgc3BlY3RyYWwgcmFuZ2UgKHdhdmUgYmFuZCkgb2Ygc29sYXIgcmFkaWF0aW9uIGZyb20gNDAwIHRvIDcwMCBuYW5vbWV0ZXJzIFwiICtcbiAgICAgIFx0XHRcInRoYXQgcGhvdG9zeW50aGV0aWMgb3JnYW5pc21zIGFyZSBhYmxlIHRvIHVzZSBpbiB0aGUgcHJvY2VzcyBvZiBwaG90b3N5bnRoZXNpc1wiXG4gIH0sXG4gIHhQUCA6IHtcbiAgICAgIGxhYmVsIDogXCJNYXhpbXVtIFBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZXRyaWMgVG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSW50Y3B0biA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgUmFpbmZhbGwgSW50ZXJjZXB0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUHJlY2lwaXRhdGlvbiB0aGF0IGRvZXMgbm90IHJlYWNoIHRoZSBzb2lsLCBidXQgaXMgaW5zdGVhZCBpbnRlcmNlcHRlZCBieSB0aGUgbGVhdmVzIGFuZCBicmFuY2hlcyBvZiBwbGFudHMgYW5kIHRoZSBmb3Jlc3QgZmxvb3IuXCJcbiAgfSxcbiAgQVNXIDoge1xuICAgICAgbGFiZWwgOiBcIkF2YWlsYWJsZSBTb2lsIFdhdGVyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBDdW1JcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJDdW11bGF0aXZlIFJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgU3RhbmRBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgQWdlXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgTEFJIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQXJlYSBJbmRleFwiLFxuICAgICAgdW5pdHMgOiBcIm0yIC8gbTJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJUaGUgb25lLXNpZGVkIGdyZWVuIGxlYWYgYXJlYSBwZXIgdW5pdCBncm91bmQgc3VyZmFjZSBhcmVhXCJcbiAgfSxcbiAgQ2FuQ29uZCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgQ29uZHVjdGFuY2VcIixcbiAgICAgIHVuaXRzIDogXCJnYyxtL3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBUcmFuc3AgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIldhdGVyIG1vdmVtZW50IHRocm91Z2ggYSBwbGFudCBhbmQgaXRzIGV2YXBvcmF0aW9uIGZyb20gYWVyaWFsIHBhcnRzXCJcbiAgfSxcbiAgZlNXIDoge1xuICAgICAgbGFiZWwgOiBcIlNvaWwgV2F0ZXIgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBhZ2VcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUGh5c01vZCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gQ2Fub3B5IENvbmR1Y3RhbmNlXCJcbiAgfSxcbiAgcFIgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiXG4gIH0sXG4gIHBTIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZVwiXG4gIH0sXG4gIGxpdHRlcmZhbGwgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcml0aW9uIDogXCJcIixcbiAgICAgIGFsdEZuTmFtZSA6IFwidGRwXCJcbiAgfSxcbiAgTlBQIDoge1xuICAgICAgbGFiZWwgOiBcIk5ldCBDYW5vcHkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgV0YgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJlX1dGLCBjdXJfZFcsIGN1cl9wRiwgY3VyX2xpdHRlcmZhbGwsIHByZXZfV0YpIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XRiArIGN1cl9kVyAqIGN1cl9wRiAtIGN1cl9saXR0ZXJmYWxsICogcHJldl9XRlxuICAgICAgfVxuICB9LFxuICBXUiA6IHtcbiAgICAgIGxhYmVsIDogXCJSb290IEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dSLCBjdXJfZFcsIGN1cl9wUiwgdHVybm92ZXIsIHByZXZfV1IsIGN1cl9Sb290UCkge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dSICsgY3VyX2RXICogY3VyX3BSIC0gdHJlZS5wUi50dXJub3ZlciAqIHByZXZfV1IgLSBjdXJfUm9vdFA7XG4gICAgICB9XG4gIH0sXG4gIFdTIDoge1xuICAgICAgbGFiZWwgOiBcIlN0ZW0gQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1MsIGN1cl9kVywgY3VyX3BTKSB7IHJldHVybiBwcmV2X1dTICsgY3VyX2RXICogY3VyX3BTIH1cbiAgfSxcbiAgVyA6IHtcbiAgICAgIGxhYmVsIDogXCJUb3RhbCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24oY3VyX1dGLCBjdXJfV1IsIGN1cl9XUykgeyByZXR1cm4gY3VyX1dGK2N1cl9XUitjdXJfV1MgfVxuICB9XG59XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLy8gYWRkIHNwcmVhZHNoZWV0IHZpeiBzb3VyY2Vcbi8vIGh0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vdHE/dHE9c2VsZWN0JTIwKiZrZXk9MEF2N2NVVi1vMlFRWWRIWkZZV0pOTldwUlMxaElWV2hHUVRobExXWndaV2MmdXNwPWRyaXZlX3dlYiNnaWQ9MFxuXG5mdW5jdGlvbiBpbml0KCkge1xudmFyIGRyb3Bab25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Ryb3Bfem9uZScpO1xuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBfaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbmRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS5vbigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoIGUud2hpY2ggPT0gMTMgKSBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcblxuICAgICQoJyN3ZWF0aGVyUmVhZGVyLWxvY2FsZmlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLWxvY2FsZmlsZS1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWRyaXZlLWZpbGUnLCAxKTtcblxuICAgIHZhciB2YWwgPSAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgpO1xuICAgIGlmKCB2YWwubGVuZ3RoID09IDAgKSByZXR1cm47XG5cbiAgICBpZiggIXZhbC5tYXRjaCgvXmh0dHAuKi8gKSApIHZhbCA9ICdodHRwczovLycrdmFsO1xuXG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gICAgZmlsZVBhbmVsLmluaXRGcm9tVXJsKHZhbCwgcm9vdCk7XG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoJycpO1xufVxuXG5mdW5jdGlvbiBfaGFuZGxlRmlsZVNlbGVjdChldnQpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItbG9jYWwtZmlsZScsIDEpO1xuXG4gIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyIGZpbGVzID0gZXZ0LmRhdGFUcmFuc2ZlciA/IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXMgOiBldnQudGFyZ2V0LmZpbGVzOyAvLyBGaWxlTGlzdCBvYmplY3QuXG5cbiAgLy8gZmlsZXMgaXMgYSBGaWxlTGlzdCBvZiBGaWxlIG9iamVjdHMuIExpc3Qgc29tZSBwcm9wZXJ0aWVzLlxuICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICBmb3IgKHZhciBpID0gMCwgZjsgZiA9IGZpbGVzW2ldOyBpKyspIHtcbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgZmlsZVBhbmVsLmluaXQoZiwgcm9vdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2hhbmRsZURyYWdPdmVyKGV2dCkge1xuZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5ldnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7IC8vIEV4cGxpY2l0bHkgc2hvdyB0aGlzIGlzIGEgY29weS5cbn1cblxuLy8gb24gYWRkLCBpZiB0aGUgbGlzdCBpcyBlbXB0eSwgbGV0J3MgY2xvc2UgdGhlIHBvcHVwXG5mdW5jdGlvbiBfb25Db21wbGV0ZSgpIHtcbiAgICBpZiggJChcIiNmaWxlX2xpc3RcIikuY2hpbGRyZW4oKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgIH1cbn1cblxudmFyIFdlYXRoZXJGaWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBoZWFkZXJzID0ge1xuICAgICAgICBkYXRlICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ0RhdGUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnRGF0ZScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtaW4gICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWluIFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWF4ICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01heCBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdGRtZWFuICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNZWFuIFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBwcHQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1ByZWNpcGl0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ21tJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcmFkICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdSYWRpYXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnTUogbS0yIGRheS0xJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgZGF5bGlnaHQgOiB7XG4gICAgICAgICAgICBsYW5lbCA6ICdEYXlsaWdodCBIb3VycycsXG4gICAgICAgICAgICB1bml0cyA6ICdob3VycycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgdmFyIGVsZSA9ICQoJzxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBsZWZ0XCI+JytcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPicrXG4gICAgICAnPGRpdiBjbGFzcz1cImZpbGVuYW1lXCI+PC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwiMFwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiIHN0eWxlPVwid2lkdGg6IDAlO1wiPicrXG4gICAgICAgICc8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4wJSBDb21wbGV0ZTwvc3Bhbj4nK1xuICAgICAgJzwvZGl2PicrXG4gICAgJzwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInN0YXR1c1wiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlLXJhbmdlXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByZXZpZXctZGF0YVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXY+PGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgcHJldmlldy1kYXRhLWJ0blwiPlByZXZpZXcgRGF0YTwvYT48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByZXZpZXctZGF0YS10YWJsZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1zdGF0dXNcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6NTBweFwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tbGluayBtYXAtZGF0YS1idG5cIj5NYXAgQ1NWIENvbHVtbnM8L2E+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGRpc2FibGVkIHB1bGwtcmlnaHRcIj5BZGQgRGF0YTwvYT4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgJzwvZGl2PicpO1xuXG4gIHZhciBkYXRhID0ge307XG4gICAgdmFyIGNzdlRhYmxlID0gW107XG5cbiAgICAvLyBvbmx5IGF1dG8gaGlkZSB0aGUgZmlyc3QgdGltZVxuICAgIHZhciBhdXRvSGlkZSA9IHRydWU7XG5cbiAgLy8gdGhlIGZpbGUgcmVhZGVyIG9iamVjdCBhbmQgdGhlIGVsZW1lbnRcbiAgZnVuY3Rpb24gaW5pdChmaWxlLCByb290RWxlKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBlcnJvckhhbmRsZXI7XG4gICAgcmVhZGVyLm9ucHJvZ3Jlc3MgPSB1cGRhdGVQcm9ncmVzcztcbiAgICByZWFkZXIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbihlKSB7fTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLnJlbW92ZSgpO1xuICAgICAgcGFyc2UoZS50YXJnZXQucmVzdWx0KTtcbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSlcblxuICAgIGVsZS5maW5kKCcuZmlsZW5hbWUnKS5odG1sKGdldE5hbWUoZmlsZSkpO1xuICAgIHJvb3RFbGUuYXBwZW5kKGVsZSk7XG5cbiAgICAgICAgX3NldEhhbmRsZXJzKCk7XG4gIH1cblxuICAgIGZ1bmN0aW9uIGluaXRGcm9tVXJsKHVybCwgcm9vdEVsZSkge1xuICAgICAgICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykuaHRtbCgnUXVlcnlpbmcgc3ByZWFkc2hlZXQuLi4nKTtcblxuICAgICAgICB2YXIga2V5ID0gZ2V0S2V5KHVybCk7XG4gICAgICAgIGVsZS5maW5kKCcuZmlsZW5hbWUnKS5odG1sKCc8aDMgc3R5bGU9XCJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmc6MTVweCAwIDRweCAwXCI+PGkgY2xhc3M9XCJpY29uLXRpbnRcIj48L2k+ICcrXG4gICAgICAgICAgICAnR29vZ2xlIFNwcmVhZHNoZWV0Jysoa2V5Lmxlbmd0aCA+IDAgPyAnPGJyIC8+PHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNHB4XCI+JytrZXkrJzwvc3Bhbj4nIDogJycpKyc8L2gzPicpO1xuXG4gICAgICAgIHJvb3RFbGUuYXBwZW5kKGVsZSk7XG5cbiAgICAgICAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgICAgICAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgIHNldEVycm9yKCdFcnJvciBpbiBxdWVyeTogJyArIHJlc3BvbnNlLmdldE1lc3NhZ2UoKSArICcgJyArIHJlc3BvbnNlLmdldERldGFpbGVkTWVzc2FnZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcnNlKGR0VG9Dc3YocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3NldEhhbmRsZXJzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3NldEhhbmRsZXJzKCkge1xuICAgICAgICBlbGUuZmluZCgnLm1hcC1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLXRhYmxlJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGFwcC5zZXRXZWF0aGVyKGRhdGEpO1xuICAgICAgICAgICAgZWxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgX29uQ29tcGxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHRUb0NzdihkdCkge1xuICAgICAgICB2YXIgYXJyID0gW1tdXTtcblxuICAgICAgICBkdCA9IEpTT04ucGFyc2UoZHQudG9KU09OKCkpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnJbMF0ucHVzaChkdC5jb2xzW2ldLmxhYmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyci5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZHQucm93c1tpXS5jLmxlbmd0aDsgaisrICkge1xuICAgICAgICAgICAgICAgIGlmKCAhZHQucm93c1tpXS5jW2pdICkgYXJyW2krMV0ucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBhcnJbaSsxXS5wdXNoKGR0LnJvd3NbaV0uY1tqXS52KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjc3YgPSAnJztcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBjc3YgKz0gYXJyW2ldLmpvaW4oJywnKSsnXFxuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjc3Y7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0S2V5KHVybCkge1xuICAgICAgICB2YXIgcGFydHMgPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA9PSAxICkgcmV0dXJuICcnO1xuXG4gICAgICAgIHBhcnRzID0gcGFydHNbMV0uc3BsaXQoJyYnKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBwYXJ0c1tpXS5zcGxpdCgnPScpWzBdID09ICdrZXknICkgcmV0dXJuIHBhcnRzW2ldLnNwbGl0KCc9JylbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICBmdW5jdGlvbiBnZXROYW1lKGYpIHtcbiAgICByZXR1cm4gWyc8aDMgc3R5bGU9XCJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmc6MTVweCAwIDRweCAwXCI+PGkgY2xhc3M9XCJpY29uLXRpbnRcIj48L2k+ICcsIGYubmFtZSxcbiAgICAgICAgICAgICAgICAnIDxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTZweFwiPignLCBmLnR5cGUgfHwgJ24vYScsXG4gICAgICAgICAgICAgICAgJyk8L3NwYW4+IC0gPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTZweFwiPicsIGYuc2l6ZSwgJyBieXRlczwvc3Bhbj4nLCAnPC9oMz4nXS5qb2luKCcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcbiAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9eXFxzKlxcbi9nLCcnKS5zcGxpdCgnXFxuJyk7XG5cbiAgICB2YXIgdGFibGUgPSBbXTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICB0YWJsZS5wdXNoKGRhdGFbaV0uc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgICAgIGlmKCB0YWJsZS5sZW5ndGggPT0gMCApIHJldHVybiBzZXRFcnJvcignRmlsZSBkaWQgbm90IGNvbnRhaW4gYW55IGluZm9ybWF0aW9uLicpO1xuICAgICAgICBjc3ZUYWJsZSA9IHRhYmxlO1xuXG4gICAgICAgIHBhcnNlSGVhZGVyKHRhYmxlWzBdKTtcbiAgICAgICAgZ2V0RGF0ZVJhbmdlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVJhbmdlKCkge1xuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCcnKTtcbiAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPT0gLTEgKSByZXR1cm4gZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnRGF0ZSBjb2x1bW4gbmVlZHMgdG8gYmUgbWF0Y2hlZC4nKTtcbiAgICAgICAgaWYoIHR5cGVvZiBoZWFkZXJzLmRhdGUuY29sID09ICdzdHJpbmcnICkgaGVhZGVycy5kYXRlLmNvbCA9IHBhcnNlSW50KGhlYWRlcnMuZGF0ZS5jb2wpO1xuXG4gICAgICAgIHZhciBkYXRlcyA9IHt9O1xuICAgICAgICB2YXIgZGlzcGxheURhdGVzID0gW107XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA8IGNzdlRhYmxlW2ldLmxlbmd0aCAmJiBjc3ZUYWJsZVtpXS5sZW5ndGggPj0gNyApwqB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgaWYoIHAubGVuZ3RoICE9IDMgJiYgcC5sZW5ndGggIT0gMiApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIG5vdCBhIHZhbGlkIGZvcm1hdCAoeXl5eS1tbS1kZCBvciB5eXl5LW1tKVwiKTtcblxuICAgICAgICAgICAgICAgIGlmKCAhZGF0ZXNbcFswXV0gKSBkYXRlc1twWzBdXSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBtbWRkID0gcFsxXTtcblxuICAgICAgICAgICAgICAgIGlmKCBkYXRlc1twWzBdXS5pbmRleE9mKG1tZGQpICE9IC0xICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgaW4gZGF0YXNldCB0d2ljZVwiKTtcbiAgICAgICAgICAgICAgICBkYXRlc1twWzBdXS5wdXNoKG1tZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgeWVhciBpbiBkYXRlcyApIHtcbiAgICAgICAgICAgIGlmKCBkYXRlc1t5ZWFyXS5sZW5ndGggPT0gMTIpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcisnIFsnK2RhdGVzW3llYXJdLmpvaW4oJywgJykrJ10nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJzxiPkRhdGUgUmFuZ2U6PC9iPiAnK2Rpc3BsYXlEYXRlcy5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUhlYWRlcihoZWFkZXJSb3cpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBbXTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+JztcbiAgICAgICAgaHRtbCArPSAnPHRyPjx0aD5LZXk8L3RoPjx0aD5Db2x1bW4gIzwvdGg+PC90cj4nO1xuXG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlclJvdy5pbmRleE9mKGtleSkgIT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1trZXldLmNvbCA9IGhlYWRlclJvdy5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNwYW4gY2xhc3M9XCJsYWJlbCBsYWJlbC1zdWNjZXNzXCI+JytoZWFkZXJzW2tleV0uY29sKycgPGkgY2xhc3M9XCJpY29uLW9rXCI+PC9pPjwvc3Bhbj48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNlbGVjdCBjbGFzcz1cInNlbGVjdC0nK2tleSsnXCJcIj48L3NlbGVjdD48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5odG1sKGh0bWwrJzwvdGFibGU+Jyk7XG5cblxuICAgICAgICBpZiggbWF0Y2hlZC5sZW5ndGggIT0gNyApIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzZWxlY3QgZWxlbWVudCBmb3IgbWlzc2luZyBjb2wnc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCJcIj5bU2VsZWN0IENvbHVtbl08L29wdGlvbj4nKSk7XG5cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgcmFkaWF0aW9uLCBhZGQgb3B0aW9uIGZvciBjYWxjdWxhdGluZ1xuICAgICAgICAgICAgLy8gVE9ET1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgbWlzc2luZyBjb2xzXG4gICAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlclJvdy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBpZiggbWF0Y2hlZC5pbmRleE9mKGhlYWRlclJvd1tpXSkgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiJytpKydcIj4nK2krJyAtICcraGVhZGVyUm93W2ldKyc8L29wdGlvbj4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGNoYW5nZSBoYW5kbGVycyBmb3IgdGhlIHNlbGVjdG9yc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgaWYoIHZhbCAhPSAnJyApIGhlYWRlcnNbdGhpcy5jbGFzc05hbWUucmVwbGFjZSgvc2VsZWN0LS8sJycpXS5jb2wgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgY29sdW1ucyBhcmUgc2V0LCByZW1vdmUgZGlzYWJsZWQgZnJvbSBidG5cbiAgICAgICAgICAgICAgICB2YXIgcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggaGVhZGVyc1trZXldLmNvbCA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCByZWFkeSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGF1dG9IaWRlICkgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaGlkZSgnc2xvdycpO1xuICAgICAgICAgICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzaG93IHRoZSB0YWJsZVxuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuc2hvdygnc2xvdycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgYXV0b0hpZGUgPSBmYWxzZTtcbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBzZXREYXRhKCk7XG4gICAgICAgIHNldFByZXZpZXcoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQcmV2aWV3KCkge1xuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLnNob3coKTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPjx0aD5kYXRlPC90aD4nO1xuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0aD4nK2tleSsnPC90aD4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGMgPSAwO1xuICAgICAgICBmb3IoIHZhciBkYXRlIGluIGRhdGEgKXtcbiAgICAgICAgICAgIGlmKCBjID09IDEwICkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQgY29sc3Bhbj1cIjdcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+Li4uPC90ZD48L3RyPic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytkYXRlKyc8L3RkPic7XG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPicrZGF0YVtkYXRlXVtrZXldKyc8L3RkPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cbiAgICAgICAgICAgIGMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLXRhYmxlJykuaHRtbChodG1sKTtcbiAgICB9XG5cbiAgLy8gc2V0IHRoZSBtYXAgb2YgY3N2IGhlYWRlcnNcbiAgZnVuY3Rpb24gc2V0RGF0YSgpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGNzdlRhYmxlW2ldLmxlbmd0aCA8IDcgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdO1xuXG4gICAgICAgICAgICBpZiggIWRhdGUgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICBpZiggZGF0ZS5zcGxpdCgnLScpLmxlbmd0aCA9PSAzICkgZGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnNwbGljZSgwLDIpLmpvaW4oXCItXCIpO1xuICAgICAgICAgICAgZGF0YVtkYXRlXSA9IHt9O1xuXG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgZGF0YVtkYXRlXVtrZXldID0gcGFyc2VGbG9hdChjc3ZUYWJsZVtpXVtoZWFkZXJzW2tleV0uY29sXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzKGV2dCkge1xuICAgIC8vIGV2dCBpcyBhbiBQcm9ncmVzc0V2ZW50LlxuICAgIGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICB2YXIgcGVyY2VudExvYWRlZCA9IE1hdGgucm91bmQoKGV2dC5sb2FkZWQgLyBldnQudG90YWwpICogMTAwKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcy1iYXInKS5hdHRyKCdhcmlhLXZhbHVlbm93JyxwZXJjZW50TG9hZGVkKS53aWR0aChwZXJjZW50TG9hZGVkK1wiJVwiKTtcbiAgICAgICAgZWxlLmZpbmQoJy5zci1vbmx5JykuaHRtbChNYXRoLmNlaWwocGVyY2VudExvYWRlZCkrJyUgQ29tcGxldGUnKTtcbiAgICB9XG59XG5cbiAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGV2dCkge1xuICAgIHN3aXRjaChldnQudGFyZ2V0LmVycm9yLmNvZGUpIHtcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfRk9VTkRfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBOb3QgRm91bmQhJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9SRUFEQUJMRV9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIGlzIG5vdCByZWFkYWJsZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5BQk9SVF9FUlI6XG4gICAgICAgIGJyZWFrOyAvLyBub29wXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzZXRFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgcmVhZGluZyB0aGlzIGZpbGUuJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEVycm9yKG1zZykge1xuICAgICAgZWxlLmZpbmQoJy5zdGF0dXMnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+Jyttc2crJzwvZGl2PicpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0IDogaW5pdCxcbiAgICBpbml0RnJvbVVybCA6IGluaXRGcm9tVXJsXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdFxufTtcbiJdfQ==
