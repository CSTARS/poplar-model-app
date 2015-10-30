(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PoplarApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var io = require('./lib/io');
var run = require('./lib/run')(io);


module.exports = run;

},{"./lib/io":22,"./lib/run":23}],2:[function(require,module,exports){
module.exports = {
    description: "These are constants.",
    value: {
        asce_etr_windspeed : {
            value: 2,
            units: "m/s",
            description: "Default Wind Speed used to calculate ETr (and resultant Kc) for Model."
        },
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
  constants : require('./constants')
};

},{"./constants":2,"./manage":4,"./plantation":5,"./plantation_state":6,"./soil":7,"./tree":11,"./weather":20}],4:[function(require,module,exports){
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
        ETr: {
            value: -1,
            units: "mm",
            description: "Reference (Alfalfa) transpiration"
        },
        Kc: {
            value: -1,
            units: "",
            description: "Crop Coefficient"
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
        wsVI: require('./wsVI'),
        laVI: require('./laVI'),
        pR: require('./pr'),
        rootP: require('./rootp'),
        litterfall: require('./litterfall')
    }
};

},{"./conductance":8,"./fage":9,"./ft":10,"./intcptn":12,"./laVI":13,"./litterfall":14,"./pfs":15,"./pr":16,"./rootp":17,"./sla":18,"./wsVI":19}],12:[function(require,module,exports){
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
    description: "An alterntative to _pfs_, laVI, along with wsVI defines the partitioning of foliage to stem [(WF/WS) fraction] in allocating aboveground biomass using the volume index (VI).  VI=(Basal area * stem height).  laVI predicts the leaf area given a (VI). Along with SLA, the total foliage is calculated  WF = SLA*LeafArea where LeafArea= constant*(VI)^power.",
    value: {
      constant: {
          units: "[m^2]",
          description: "constant in leaf_area=constant*VI^power.  If this is not=0, then these functions will be used, otherwise the pfs functions are used.",
          value: 0
      },
        power: {
            description: "power in leaf_area= constant*VI^power ",
            value: 0
        },
    }
};

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "An alterntative to _pfs_, wsVI, along with it's companion laVI defines the partitioning of foliage to stem [(WF/WS) fraction] in allocating aboveground biomass, using the volume index (VI).  VI=(diameter@22cm (cm))^2 * height (m). wsVI relates the Volume Index (VI), to woody biomass (WS), WS[g]=constant*VI^power.  WS/stems_per_stump is inverted to estimate VI for the tree",
    value: {
        stems_per_stump: {
            description: "Averge number of stems on each stump after coppicing",
            value: 2.8
        },
        constant: {
            units: "[g]",
            description: "Constant in relation of VI to WS",
            value: 161
        },
        power: {
            description: "Power in relation of VI to WS.",
            value: 0.854
        }
    }
};

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
  asce_etr_elevation: {
    value:500,
    units:'m/s',
    description:'Estimated Elevation of calculation of ETr (and Kc)'
  },
  asce_etr_windspeed: {
    value:2,
    units:'m/s',
    description:'Constant wind speed for calculation of ETr (and Kc)'
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
module.exports.tdp = function(x, f) {
  var p = f.f1 +
          (f.f0 - f.f1) *
          Math.exp( -Math.log(2) * Math.pow( (x/f.tm), f.n ));
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
  var t = (0.6108 /
            2 *
            (
              Math.exp(date_tmin * 17.27 / (date_tmin + 237.3) ) +
              Math.exp(date_tmax * 17.27 / (date_tmax + 237.3) )
            )
          ) -
          ( 0.6108 *
            Math.exp(date_tdmean * 17.27 / (date_tdmean + 237.3) )
          );
  return t;
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
@param days
@param date_daylight
@param cur_VPD
@param BLcond
@param cur_CanCond
*/
module.exports.Transp = function(date_nrel, days, date_daylight, cur_VPD, BLcond, cur_CanCond){
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
  return days * ( (e20 * netRad + defTerm ) / div ) * date_daylight * 3600 / lambda;
};

/**
units='mm/mon' which is also kg/m2/mon
description='ETr'
@method ETr
@param Rs (MJ/m2/day)
@param days
@param Tm (tmin+tmax)/2
@param cur_VPD = (es-ea)
@param elevation (m)
@param wind_speed (m/s)
*/

module.exports.ETr = function(Rs,tmin,tmax,tdmean,days,Z,u2){
  u2 = typeof u2 !== 'undefined' ? u2 : constant('asce_etr_windspeed');
  Z = typeof Z !== 'undefined' ? Z : constant('asce_etr_elevation');

  // FAO 56 Crop Evaporation
  var psychrometric_constant = function(z) {
    var P=101.3 * Math.pow((293 - (0.0065)*z)/293,5.26);
    g = 0.665* Math.pow(10,-3)*P;
    return g;
  };

  var slope_of_saturation_vapor_pressure= function(Tm) {
    return 4098.17 * 0.6108 * Math.exp(Tm * 17.27 / (Tm + 237.3)) / Math.pow((Tm +237.3),2)
  };

  var vp = function(T) {
    return 0.6108 * Math.exp(T * 17.27 / (T + 237.3));
  };

  var Rnl = function(tmin,tmax,tdmean,K) {
    return -(1.35 * K - 0.35) * (0.34 - 0.14 * Math.sqrt(vp(tdmean))) * Math.pow(4.93,-09) * ((Math.pow(tmin +273.16,4) + Math.pow(tmax + 273.16,4)) / 2);
  }
  //0.408 * delta * ( Rn - G) + psych * (Cn / (T + 273)) * u2 * (es -ea ) / (delta + psych * (1 + Cd * u2 ))
  // ETr:{Cn:1600,Cd:0.38},ETo:{Cn:900,Cd=0.34}
  //Rn = MJ / m2 day => date_nrel (MJ/m^2/day)
  //G=0
  //u2 = m/s
  // T = mean T (C)
  // (es-ea) = saturation Vapor Pressure (Kpa) => cur_VPD
  var Tm=(tmin+tmax)/2;
  var Cn=1600;
  var Cd=0.38;
  var VPD = ((vp(tmin)+vp(tmax))/2)-vp(tdmean);
  var g = psychrometric_constant(Z);
  var D = slope_of_saturation_vapor_pressure(Tm);
  var Rnl = Rnl(tmin,tmax,tdmean,1.0);
  Rnl =-90 / 277.0;
  var rad = 0.408 * D * (Rs * (1 - 0.23) + Rnl);
  var def = g * (Cn/(Tm+273)) * u2 * VPD;
  var div = D + g * (1 + Cd*u2);
  var ETr = (rad+def)/div;
 // console.log({Tm:Tm,D:D,Rnl:Rnl,Rs:Rs,ETr:ETr})
  // Convert daylight to secs.
  return days * ETr;
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
module.exports.PAR = function(date_rad, days, molPAR_MJ) {
  if( molPAR_MJ === null || molPAR_MJ === undefined ) {
    molPAR_MJ = constant('molPAR_MJ');
  }

  return date_rad * molPAR_MJ * days;
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

},{}],22:[function(require,module,exports){
module.exports = {
  read : function(model) {
    // TODO : implement
    // You need to set your IO here and make sure all parameters for model are correctly set
  },
  dump : function() {
    // TODO : implement
  }
};

},{}],23:[function(require,module,exports){
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

    this.currentDate = new Date(this.manage.datePlanted);
    //var plantedMonth = this.currentDate.getMonth();
    //var currentMonth = this.currentDate.getMonth();

    //TODO: test no datecoppice as input
    if ( this.manage.dateCoppiced !== undefined ){
      yearToCoppice = this.manage.dateCoppiced.getFullYear();
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
      coppiceDates : coppiceDates
    };

    return this.runSetup(setup);
}

function runSetup(setup){
    var i, key, currentWeather, step, t;

    var days_in_interval = (this.setup && this.setup.days_in_interval) ? this.setup.days_in_interval : 1;

    if( this.debug ) {
      t = new Date().getTime();
      console.log('days_in_interval: '+ days_in_interval);
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

    firstStepResults.Date = this.currentDate.getFullYear()+'-'+m+'-'+d;

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
      this.currentDate = new Date(this.manage.datePlanted);
      this.currentDate.setDate(this.manage.datePlanted.getDate() + step * days_in_interval); // add a day to current date
//      this.currentDate.setDate(this.manage.datePlanted.getDate() + step*setup.days_in_interval); // add a day to current date

      if( shouldCoppice(this, setup, days_in_interval) ) {
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
      nextStepResults = singleStep(this.plantation, this.soil, currentWeather,
                                   this.manage, currentStepResults, days_in_interval);
      nextStepResults.Date = this.currentDate.getFullYear()+'-'+m+'-'+d;

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

function singleStep(plantation, soil, weather, manage, p, days_in_interval) { //p = previous state
  var c = {}; //current state

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
    c.coppiceAge = p.coppiceAge + days_in_interval/365.0;
  }

  var tree; //tree
  if( c.coppiceCount === 0 ) { //TODO: check the case where we start with a coppiced multi stump tree
      tree = plantation.seedlingTree;
  } else {
      tree = plantation.coppicedTree;
  }

  c.StandAge = p.StandAge + days_in_interval/365.0;
  var sla = fn.tdp(p.StandAge, tree.SLA);
  c.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5

  // JM - Per section 2.1  Landsberg/Waring
  c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean);
  //c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean, days_in_interval);


  c.fVPD = fn.fVPD(tree.kG, c.VPD);

  c.fSW = fn.fSW(p.ASW, soil.maxAWS, soil.swconst, soil.swpower);
  c.fAge = fn.tdp(p.StandAge, tree.fAge);

  // fFrost is a cumulative Normal distribution, that approixmates the number of days (or parts of days) that
  // will be below 0, given a minimum temperature
  c.fFrost = fn.fFrost(weather.tmin);

  c.PAR = fn.PAR(weather.rad, days_in_interval); //  PAR in mols

  c.fT = fn.fT((weather.tmin + weather.tmax)/2, tree.fT);

  c.PhysMod = fn.PhysMod(c.fVPD, c.fSW, c.fAge);
  c.fNutr = fn.fNutr(tree.fN0, manage.fertility);
  c.xPP = fn.xPP(tree.y, c.PAR); // maximum potential Primary Production per month
  c.NPP = fn.NPP(p.coppiceAge, tree.fullCanAge, c.xPP, tree.k, p.LAI, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);

  var NPP_target = fn.NPP(tree.fullCanAge, tree.fullCanAge, c.xPP, tree.k, tree.rootP.LAITarget, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);
// JM
  c.RootP = fn.coppice.RootP(c.NPP, NPP_target, p.WR, p.W, tree.pR.mx, tree.rootP.frac * (days_in_interval / 30.4));

  if (tree.laVI && tree.laVI.constant ) { // Test for that function
    c.pfs = fn.coppice.pfs_via_VI(p.WS*1000000/plantation.StockingDensity, tree.wsVI,tree.laVI,sla);
  } else {
    c.pfs = fn.coppice.pfs(p.WS*1000/plantation.StockingDensity, tree.pfs);
  }

  c.dW = c.NPP + tree.rootP.efficiency * c.RootP;

  c.Intcptn = fn.Intcptn(c.LAI, tree.Intcptn);
  c.CanCond = fn.CanCond(c.PhysMod, c.LAI, tree.Conductance);

  c.pR = fn.pR(c.PhysMod, p.WR/p.W, manage.fertility, tree.pR);

  // JM - tree litterfall is a monthly parameter.
  c.litterfall = fn.tdp(p.StandAge, tree.litterfall) * (days_in_interval / 30.4);

  c.Transp = fn.Transp(weather.rad, days_in_interval, weather.daylight, c.VPD, tree.BLcond, c.CanCond);
  c.ETr = fn.ETr(weather.rad, weather.tmin, weather.tmax, weather.tdmean, days_in_interval);
  c.Kc = c.Transp/c.ETr;


  // Calculated from pfs
  c.pS = (1 - c.pR) / (1 + c.pfs );
  c.pF = (1 - c.pR) / (1 + 1/c.pfs );

  c.Irrig = fn.Irrig(manage.irrigFrac, c.Transp, c.Intcptn, weather.ppt);
  c.CumIrrig = p.CumIrrig + c.Irrig;

  c.ASW = fn.ASW(soil.maxAWS, p.ASW, weather.ppt, c.Transp, c.Intcptn, c.Irrig); //for some reason spelled maxAWS

  c.WF = p.WF + c.dW * c.pF - c.litterfall * p.WF;
  // Include contribution of RootP // Error in old code !
  c.WR = p.WR + c.dW * c.pR - (tree.pR.turnover * (days_in_interval / 30.4)) * p.WR - c.RootP;
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

// This actually need to work better.  If the weather doesn't match
// the steps, we need to find the closest value to what we are looking for
function getWeather(model, setup, month, day) {
    if( model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month+'-'+day];
    }

    // modelled daily
    if( model.weather[month+'-'+day] !== undefined ) {
      return model.weather[month+'-'+day];
    }

    // actual
    if( model.weather[model.currentDate.getFullYear()+'-'+month] !== undefined ) {
      return model.weather[model.currentDate.getFullYear()+'-'+month];
    }

  // modelled Monthly
  if( model.weather[month] !== undefined ) {
    return model.weather[month];
  }

  throw 'Runtime Error: no weather found for: '+model.currentDate.getFullYear()+'-'+month+'-'+day;
}

function shouldCoppice(model, setup, days_in_interval) {
  var next;
  var coppice_on;
  // do we have specific coppice dates set?
  if( setup.coppiceDates ) {

    for( var i = 0; i < setup.coppiceDates.length; i++ ) {
      var d = setup.coppiceDates[i];

      if (model.currentDate < d) {
        next = model.currentDate;
        next.setDate(next.getDate + days_in_interval);
        if ( d < next) {
          return true;
        }
      }
    }
  } else {
    coppice_on = new Date();
    coppice_on.setYear(setup.yearToCoppice);
    coppice_on.setMonth(setup.monthToCoppice);
    coppice_on.setDate(15);

    if( model.currentDate.getTime() < coppice_on.getTime() ) {
      next = new Date(model.currentDate);
      next.setDate(model.currentDate.getDate() + days_in_interval);

      if ( coppice_on.getTime() < next.getTime()) {
        setup.yearToCoppice = setup.yearToCoppice + setup.coppiceInterval;
        return true;
      }
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

},{"./dataModel":3,"./fn":21,"./utils":24,"./validate":25}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"./dataModel":3}],26:[function(require,module,exports){
var gdrive = require('./googleDrive');
var exportToCsv = require('./googleDrive/exportToCsv');
var offline = require('./offline');
var config = require('./config');
var utils = require('./utils');
var rawOutput = require('./output/raw');
var weather = require('./weather');
var weatherChart = require('./weather/chart');
var flashblockDetector = require('./flashblock-detector');
var inputForm = require('./inputForm');
var charts = require('./charts');

// import 3pg model
var model = require('../../poplar-3pg-model');

// wire in app handlers to model
var modelIO = require('./modelRunHandler');
model.setIO(modelIO);

var runCallback, weatherCustomChart;


// row raw data does a lot of processing of the results and the current state of what's
// being displayed.  Go ahead an setup the csv data at this point, then if the user
// decides to export, we are all set to to;
var csvResults = null;
var currentResults = null;


var init = function(callback) {
  // these we don't want to setup until dom is ready
  inputForm = inputForm(this);

  charts.setApp(this);
  gdrive.setApp(this);

  modelIO.app = this;
  modelIO.model = model;
  modelIO.charts = charts;
  modelIO.inputForm = inputForm;

  // check if flash is installed.  If not, hide the chart type toggle.
  flashblockDetector(function(val){
      if( val > 0 ) $("#chart-type-btn-group").hide();
  });

  rawOutput.init(this);

  // setup export modal
  exportToCsv.init();
  $("#export-csv").on('click', function(){
      exportToCsv.run(csvResults);
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

  // make sure everything fits to screen
  $(window).resize(function(){
      charts.resize();

      if( weatherCustomChart ) {
          weatherCustomChart = weatherChart.create($('#custom-weather-chart')[0], model.custom_weather);
      }
  });

  callback();
};

var getModel = function() {
  return model;
};

var getOutputs = function() {
  return outputs;
};

var runComplete = function(rows) {
  if ( runCallback ) runCallback(rows);
  if( hideInitLoading ) hideInitLoading();
  runCallback = null;
};
modelIO.dump = runComplete;

var daysToRun = function(days_in_interval) {
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

  var oneDay = 24*60*60*1000;
  var days = Math.round(Math.abs((d1.getTime() - d2.getTime())/(oneDay)));
  days = days <= 0 ? 1 : days;

  return days / days_in_interval;
};


var runModel = function(isRt) {

  if ($("#runbtn, #runbtn-sm").hasClass("disabled")) return;
  $("#runbtn, #runbtn-sm").addClass("disabled").html("Running...");

  if( !weather.check(model) ) return;

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


          var days = daysToRun(model.setup.days_in_interval);

          try {
            model.run(days);
          } catch(e) {
            debugger;
            alert(e);
            $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
          }


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
};

// run a single variation, when multiple inputs for a single parameter have
// been given
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

  // HACK: when should we look this up?
  var days = daysToRun(parseFloat($('#input-setup-days_in_interval').val()));

  try {
    model.run(days);
  } catch(e) {
    debugger;
    alert(e);
    $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
  }
};


var showResults = function(result) {
  if( result[0] instanceof Array ) {
      currentResults = [{
          singleRun : true,
          inputs : {},
          output : result
      }];
  } else {
    currentResults = result;
  }

  // transpose all results to hash by date
  for( var i = 0; i < currentResults.length; i++ ) {
    var dateHash = {};
    var r = currentResults[i];

    r.totalSteps = r.output.length;
    for( var j = 1; j < r.output.length; j++ ) {
      dateHash[r.output[j][0]] = r.output[j];
    }
    r.header = r.output[0];
    r.output = dateHash;
  }

  // sort by most to least steps
  currentResults.sort(function(a, b){
    if( a.totalSteps > b.totalSteps ) return -1;
    if( a.totalSteps < b.totalSteps ) return 1;
    return 0;
  });

  updateUi();

  setTimeout(function() {
      $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
  }, 250);
};

function updateUi() {
  if( !currentResults ) return;

  rawOutput.show(currentResults); // this updates csvResults
  charts.updateCharts(csvResults, true);
}

module.exports = {
  init : init,
  googleDrive : gdrive,
  getModel : getModel,
  runModel : runModel,
  updateUi : updateUi,
  daysToRun : daysToRun,
  // the raw module actually creates this setup
  setCsvResults : function(csv) {
    csvResults = csv;
  },
  getCsvResults : function() {
    return csvResults;
  },
  qs : utils.qs,
  getModelIO : function() {
    return modelIO;
  }
};

},{"../../poplar-3pg-model":1,"./charts":27,"./config":28,"./flashblock-detector":29,"./googleDrive":31,"./googleDrive/exportToCsv":30,"./inputForm":33,"./modelRunHandler":34,"./offline":36,"./output/raw":38,"./utils":39,"./weather":42,"./weather/chart":40}],27:[function(require,module,exports){
var outputDefinitions = require('./output/definitions');
var raw = require('./output/raw');
var config = require('./config');
var app;

// only draw charts if width has changed
var cWidth = 0;

var charts = [];

// there is no way to get the colors for the legends (to make your own)
// this post:
// gives these values.  This is a HACK, if they ever change, we need to update
var googleChartColors = ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6",
                      "#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99",
                      "#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262",
                      "#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e",
                      "#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922"
                      ,"#743411"];

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
  for( var i = 0; i < config.outputs.length; i++) {
      var val = config.outputs[i];
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
            app.updateUi();
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
  if( !outputDefinitions[val] ) return "<b>"+val+"</b></label>";

  var desc = outputDefinitions[val];
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
  for( var i = 0; i < config.outputs.length; i++) select(config.outputs[i]);
}

function unselectAll() {
  for( var i = 0; i < config.outputs.length; i++) unselect(config.outputs[i]);
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

      redrawCharts();
  },300);
}

function updateCharts(results, animate) {
  if( results ) setData(results);
  if( !cData ) return;

  charts = [];

  $("#show-chartspopup-btn").show();

  // create a legend if there is more than one run
  var legend = "";
  if( cData.inputs.length > 1 ) {
      var c1 = "";
      var c2 = "";
      for( var i = 0; i < cData.inputs.length; i++ ) {
          var ele = "<div style='min-height:40px;margin-bottom:10px'><div class='legend-square' style='background-color:"+googleChartColors[i]+"'>&nbsp;</div>";
          for( var mType in cData.inputs[i] ) {
              ele += "<div class='legend-text'>"+mType+"="+cData.inputs[i][mType]+"</div>";
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

  setTimeout(function(){
    redrawCharts();
  }, 200);
}

function hidePopup() {
  sliderPopupBg.remove();
  sliderPopup.remove();
  $('body').css('overflow','auto');
}

function _showMainChart(type, animate) {
  var chartType = $(".chart-type-toggle.active").attr("value");
  var panel = $("<div />");
  var outerPanel = $("<div style='margin-bottom: 25px'>"+
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

  var data = cData.data[type];

  if( chartType == 'timeline' ) {
    var newData = [$.extend(true,[], data[0])];

    var len = data.length; len2 = data[0].length;

    for( var i = 1; i < len; i++ ) {
      var row = [];
      for( var j = 0; j < len2; j++ ) {
        if( j === 0 ) {
          row.push(new Date(data[i][j]));
        } else {
          row.push(data[i][j]);
        }
      }
      newData.push(row);
    }
    data = newData;

  }

  // do we need to fake some of the data to fit?  or skip because we have too much?
  if( config.spread.indexOf(type) > -1 && cData.inputs.length > 0 && cData.inputs[0]['setup.days_in_interval'] ) {
    var maxInterval = cData.inputs[0]['setup.days_in_interval'];

    for( var i = 1; i < cData.inputs.length; i++ ) {
      var t = cData.inputs[i]['setup.days_in_interval'];
      if( maxInterval < t ) maxInterval = t;
    }

    var adjustment = [];
    for( var i = 0; i < cData.inputs.length; i++ ) {
      adjustment.push(maxInterval / cData.inputs[i]['setup.days_in_interval']);
    }

    var len = data.length, len2 = data[0].length, row, use;
    var newData = [$.extend(true,[], data[0])];

    for( var i = 1; i < len; i++ ) {
      row = [], use = true;
      for( var j = 0; j < len2; j++ ) {
        if( data[i][j] === null ) {
          use = false;
          break;
        }

        if( j === 0 ) {
          row.push(data[i][j]);
        } else {
          row.push(data[i][j] * adjustment[j-1]);
        }
      }

      if( use ) {
        newData.push(row);
      }
    }

    data = newData;
  }

  // lets try and optimize
  /*var olength = data.length;

  if( data.length > 500 ) {
    var hasNulls = false;
    if( cData.inputs.length > 0 && cData.inputs[0]['setup.days_in_interval'] ) {
      hasNulls = true;
    }

    var c = 0;
    for( var i = data.length-1; i > 0 ; i-- ) {

      if( hasNulls ) {

        var isNull = false;
        for( var j = 0; j < data[i].length; j++ ) {
          if( data[i][j] === null ) {
            isNull = true;
            break;
          }
        }

        if( isNull ) {
          if( c % 4 != 0 ) data.splice(i, 1);
          c++;
        }

      } else {
        if( c % 4 != 0 ) data.splice(i, 1);
        c++;
      }

    }
  }
  console.log(type+'  '+olength+' -> '+data.length);*/

  var dt = google.visualization.arrayToDataTable(data);


  if( outputDefinitions[type] ) {
      var desc = outputDefinitions[type];
      var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
      var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";
      type = type+label+units;
  }


  var options = {
      vAxis : {
          title : type
      },
      hAxis : {
          title : ""
      },
      interpolateNulls : true
  };
  if( !showLegend ) options.legend = {position:"none"};

  if( size ) {
      //options.width = size[0];
      options.height = size[1];
  } else {
      //options.width = panel.width();
      //options.height = options.width*.4;
      options.height = panel.width()*.4;
  }
  //panel.width(options.width).height(options.height);
  panel.height(options.height);

  var chart;
  if( chartType == 'timeline' ) {
      options.displayAnnotations = true;
      chart = new google.visualization.AnnotatedTimeLine(panel[0]);
      chart.draw(dt, options);
  } else {
      chart = new google.visualization.LineChart(panel[0]);
      chart.draw(dt, options);
      //chart = new google.charts.Line(panel[0]);
      //chart.draw(dt, google.charts.Line.convertOptions(options));
  }

  charts.push({
    dt : dt,
    chart : chart,
    options : options
  });
}

function redrawCharts() {
  for( var i = 0; i < charts.length; i++ ) {
    charts[i].chart.draw(charts[i].dt, charts[i].options);
  }
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
    resize : resize
};

},{"./config":28,"./output/definitions":37,"./output/raw":38}],28:[function(require,module,exports){
module.exports = {
  inputs : {
    weather : ['month','tmin','tmax','tdmean','ppt','rad','daylight']
  },
  outputs : ['VPD','fVPD','fT','fFrost','PAR','Intcptn','ASW','CumIrrig',
             'Irrig','StandAge','LAI','CanCond','Transp','ETr','Kc','fSW','fAge',
             'PhysMod','pR','pS','litterfall','xPP','NPP','WF','WR','WS','W'],
  debug : false,
  devmode : false,
  // these variables, when run with multiple different time steps, will draw
  // aggregate values to greatest step.
  // Ex: 1 and 30 days given.  Will chart every 30 days with value of every 30th
  // day multiplied by 30 for the daily step run.
  spread : ['xPP', 'NPP', 'PAR','Irrig', 'Transp','ETr','litterfall'],
};

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
/*
 * Save to google drive (export as CSV)
 */

var gdrive = require('./index');

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
function run(results) {
  ga('send', 'event', 'ui', 'interaction', 'export-drive-csv', 1);

  $("#export-csv").addClass("disabled").html("Exporting...");

  var name = $("#export-name").val();
  if( name.length === 0 ) {
    _setMessage("Please provide a folder name", "danger");
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
      if( data[key][i].length === 0 ) continue; // ignore the blank rows

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
}

module.exports = {
  run : run,
  init : init
};

},{"./index":31}],31:[function(require,module,exports){
var Oauth = require('../oauth');
var gdriveRT = require('./realtime');
var modelIO = require('../modelRunHandler');
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

function setApp(a) {
  app = a;
  gdriveRT.setApp(app);
}

/***
 *  Initialize google drive panels, btns and login
 ***/
function init(callback) {
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
    data = modelIO.exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    data = modelIO.exportSetup().tree;
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
    data = modelIO.exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    file = loadedTree;
    data = modelIO.exportSetup().tree;
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
      modelIO.loadSetup(id, file);

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
      modelIO.loadTree(file);

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
    modelIO.loadSetup(metadata.id, file);

    // setup realtime events
    gdriveRT.initRtApi(loadedFile);
  } else if ( metadata.mimeType == TREE_MIME_TYPE ) { // we loaded a tree
    // set the loaded tree id
    loadedTree = metadata.id;

    // show the share btn
    $("#share-tree-btn").show();
    $("#loaded-tree-name").html(metadata.title).parent().show();

    // set the loaded tree
    modelIO.loadTree(file);

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
  setApp : setApp,

  MIME_TYPE : MIME_TYPE
};

},{"../modelRunHandler":34,"../oauth":35,"./realtime":32}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
var offline = require('./offline');
var gdrive = require('./googleDrive');
var charts = require('./charts');
var weather = require('./weather');
var weatherChart = require('./weather/chart');
var weatherFileReader = require('./weather/fileReader');

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
  '<h4 class="page-header">Time Step</h4>'+
   '<div class="form-horizontal">'+
     '<div class="form-group">'+
       '<label for="input-setup-days_in_interval" class="col-lg-4 control-label">Days in Interval</label>'+
       '<div class="col-lg-8">'+
         '<input type="text" id="input-setup-days_in_interval"  class="form-control" value="1"/>'+
         '<p class="help-block">How many days are in each step of the model</p>' +
       '</div>'+
     '</div>'+
   '</div>'+
   '<h4 class="page-header">Location</h4>'+
   '<div>'+
     '<span id="current-location" style="color:#888"></span>'+
     '<a class="btn btn-default pull-right select-weather-location"><i class="icon-map-marker"></i> Select Location</a>'+
    '</div>'+
  '</div>';

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
var content = '<div class="tab-content">';

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
  weatherAverageChart = weatherChart.create($('#average-weather-chart')[0], weatherAverageChartData);
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
  weatherFileReader.init(app);
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

    content += ' <div class="tab-pane fade" id="inputs_'+model+'">';

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
  $('#input_pills a').click(function (e) {
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
      weather.set(app.getModel());
      $('#average-weather-panel').hide();
      $('#custom-weather-panel').show();
    }
  });

  $(window).on('resize', function(){
    if( weatherAverageChart ){
      weatherAverageChart = weatherChart.create($('#average-weather-chart')[0], weatherAverageChartData);
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

},{"./charts":27,"./googleDrive":31,"./offline":36,"./weather":42,"./weather/chart":40,"./weather/fileReader":41}],34:[function(require,module,exports){
var config = require('./config');
var app = require('./app');

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

    this.readWeather(model.weather, model.manage);

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

  readWeather : function(weatherMap, manage) {
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
          var valid = true;
          var item = {
              month : (i + 1)
          };
          var m = (i+1)+'';
          if( m.length === 1 ) m = '0'+m;

          for ( var j = 1; j < config.inputs.weather.length; j++) {
              var c = config.inputs.weather[j];
              item[c] = this._readVal($("#input-weather-" + c + "-" + m));

              if( isNaN(item[c]) ) {
                valid = false;
                break;
              }
          }
          if( valid ) {
            item.nrel = item.rad / 0.0036;
            weatherMap[m] = item;
          }
      }

      if( this.model.custom_weather ) {
          for( var date in this.model.custom_weather ) {
              this.model.custom_weather[date].nrel = this.model.custom_weather[date].rad / 0.0036;
              //customWeatherMap[date] = custom_weather[date];
          }
      }
      return weatherMap;
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

  dump : function(data) {
    // should be overwritten in app
  },

  readFromInputs : function() {
      // read soil
      this.model.soil = {};
      this.model.soil.maxAWS = this._readVal($("#input-soil-maxAWS"));
      this.model.soil.swpower = this._readVal($("#input-soil-swpower"));
      this.model.soil.swconst = this._readVal($("#input-soil-swconst"));

      this.model.setup = {
        days_in_interval : this._readVal($("#input-setup-days_in_interval"))
      };

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

  // this is the snapshot we save to google drive
  exportSetup : function() {
      this.model.variations = {};
      this.readFromInputs();
      this.readWeather([], {}, {});

      var ex = {
          weather : this.model.weather,
          custom_weather : this.model.custom_weather,
          setup : this.model.setup,
          tree : this.model.tree,
          plantation : this.model.plantation,
          manage : this.model.manage,
          soil : this.model.soil,
          manage : this.model.manage,
          plantation_state : this.model.plantation_state,
          config : {
              chartTypeInput : $("#chartTypeInput").val(),
              daysToRun : this.app.daysToRun(),
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

      if( setup.setup && setup.setup.days_in_interval ) {
        $('#input-setup-days_in_interval').val(setup.setup.days_in_interval);
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
        var incIndex = false, index;
        if( setup.weather[0] !== undefined || setup.weather['0'] !== undefined ) {
          incIndex = true;
        }

        for ( var i in setup.weather ) {
            for ( var key in setup.weather[i]) {
                if (key == 'month') continue;


                if( incIndex ) index = (parseInt(i)+1)+'';
                else index = i+'';

                if( index.length === 1 ) index = '0'+index;

                if (setup.weather[i][key] !== null) {
                    $("#input-weather-" + key + "-" + index).val(setup.weather[i][key])
                } else {
                    $("#input-weather-" + key + "-" + index).val("");
                }
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
      if( setup.config.daysToRun ) {
          var d = new Date(setup.manage.datePlanted || setup.manage.DatePlanted);
          d = new Date(new Date(d).setMonth(d.getMonth()+parseInt(setup.config.daysToRun)));
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

},{"./app":26,"./config":28}],35:[function(require,module,exports){

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

},{}],36:[function(require,module,exports){
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

},{"./app":26}],37:[function(require,module,exports){
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
  ETr : {
      label : "ETr",
      units : "mm",
      description : "Reference evapotranspiration for Alfalfa"
  },
  Kc : {
      label : "Kc",
      units : "",
      description : "Crop coefficients"
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

},{}],38:[function(require,module,exports){
var modelIO = require('../modelRunHandler');
var config = require('../config');
var app;

var show = function(results) {
  var i, z;

  // selected in the charts output
  var vars = $("#chartTypeInput").val();

  // find the rows we care about
  var chartRows = {};
  for( i = 0; i < results[0].header.length; i++ ) {
      if( vars.indexOf(results[0].header[i]) > -1 ) chartRows[results[0].header[i]] = i;
  }

  var tabs = $('<ul class="nav nav-pills" id="rawOutputTabs"  data-tabs="pill"></ul>');
  var contents = $('<div class="tab-content" style="overflow:auto;margin-top:15px"></div>');

  for( i = 0; i < vars.length; i++) {
      tabs.append($('<li '+(i === 0 ? 'class="active"' : "")+'><a href="#rawout'
          +vars[i]+'" data-toggle="tab">'+vars[i]+'</a></li>'));

      contents.append($('<div class="tab-pane ' + (i === 0 ? 'active' : "")
          + '" id="rawout' + vars[i] + '"></div>'));
  }

  $("#output-content").html("").append(tabs).append(contents);
  $("#rawOutputTabs").tab();

  csvResults = {
      config : modelIO.exportSetup(),
      inputs : [],
      header : results[0].header,
      data : {}
  };
  for( var i = 0; i < results.length; i++ ) {
    csvResults.inputs.push(results[i].inputs);
  }

  var cDate = new Date($("#input-manage-datePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];


      // set header row
      var currentRow = [];
      currentRow.push('date');
      //currentRow.push('step');

      table += "<tr><th>Date</th><th>Step</th>";

      for( z = 0; z < results.length; z++ ) {
          table += "<th>";
          var tmp = [];

          for( var mType in results[z].inputs ) {
              tmp.push(mType+"="+results[z].inputs[mType]);
              table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
          }

          if( tmp.length === 0 ) {
              currentRow.push(key);
              table += key;
          } else {
              currentRow.push(tmp.join(" "));
          }
          table += "</th>";
      }
      table += "</tr>";
      csvResults.data[key].push(currentRow);
      var c = 0;

      for( var date in results[0].output ) {
        c++;
        currentRow = [];

        table += "<tr><td>"+date+"</td><td>"+c+"</td>";

        currentRow.push(date);
        //currentRow.push(c);

        var v;
        for( z = 0; z < results.length; z++ ) {
          if( !results[z].output[date] ) {
            table += "<td></td>";
            currentRow.push(null);
          } else {
            v = results[z].output[date][chartRows[key]];
            table += "<td>"+v+"</td>";
            currentRow.push(v);
          }
        }
        table += "</tr>";

        csvResults.data[key].push(currentRow);
      }
      $("#rawout" + key).html(table+"</table>");
  }

  app.setCsvResults(csvResults);

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();

  return csvResults;
};

module.exports = {
  show : show,
  init : function(a) {
    app = a;
  }
};

},{"../config":28,"../modelRunHandler":34}],39:[function(require,module,exports){
function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

module.exports = {
  qs : qs
};

},{}],40:[function(require,module,exports){
var options = {
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
};

function create(root, data) {
  $(root).html('');

  var dt = new google.visualization.DataTable();
  dt.addColumn('string', 'Month');
  dt.addColumn('number', 'Min Temperature');
  dt.addColumn('number', 'Max Temperature');
  dt.addColumn('number', 'Dew Point');
  dt.addColumn('number', 'Precipitation');
  dt.addColumn('number', 'Radiation');
  dt.addColumn('number', 'Daylight');

  var rows = [];
  for( var date in data ) {
    if( date.match(/\d\d/) ) continue;

      var obj = data[date];
      rows.push([
          parseInt(date.replace(/-/g, '')),
          date+'',
          obj.tmin || 0,
          obj.tmax || 0,
          obj.tdmean || 0,
          obj.ppt || 0,
          obj.rad || 0,
          obj.daylight || 0
      ]);
  }

  rows.sort(function(a, b){
    if( a[0] > b[0] ) return 1;
    if( a[0] < b[0] ) return -1;
    return 0;
  });
  // remove sort value
  for( var i = 0; i < rows.length; i++ ) {
    rows[i].splice(0, 1);
  }

  dt.addRows(rows);

  var chart = new google.visualization.ComboChart(root);
  chart.draw(dt, options);

  return chart;
}

module.exports = {
  create : create
};

},{}],41:[function(require,module,exports){
var weather = require('./index');
var app;

// add spreadsheet viz source
// https://spreadsheets.google.com/tq?tq=select%20*&key=0Av7cUV-o2QQYdHZFYWJNNWpRS1hIVWhGQThlLWZwZWc&usp=drive_web#gid=0

function init(a) {
  app = a;

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
            weather.set(app.getModel(), data);
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

},{"./index":42}],42:[function(require,module,exports){
var config = require('../config');
var chart = require('./chart');

// make sure all the weather is set.  #1 thing people will mess up
function check(model) {

  // first get current months we are going to run,
  var start = $("#input-manage-datePlanted").val();

  var end = $("#input-manage-dateFinalHarvest").val().split("-");
  var eMonth = parseInt(end[1]);
  var eYear = parseInt(end[0]);

  /*var cDate = new Date(start);

  // now see if we have custom weather coverage
  var hasCoverage = true;
  var count = 0;
  while( count < 10000 ) {
      if( !model.weather ) {
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

  if( hasCoverage ) return true;*/

  // if not make sure we have averages selected
  /*for ( var i = 0; i < 12; i++) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

      for ( var j = 1; j < config.inputs.weather.length; j++) {
          var c = config.inputs.weather[j];
          var val = parseFloat($("#input-weather-" + c + "-" + m).val());
          if( !val && val !== 0 ) {
              alert("Missing weather data: "+c+" for month "+m+"\n\n"+
                    "Did you select a location (Setup) and/or are all weather/soil fields filled out?");
              $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
              return false;
          }
      }
  }*/

  return true;
}

function set(model, data) {
  if( !model.weather ) model.weather = {};

  if( data ) {
      for( var key in data ) {

          // clean up date format
          //var date = key.replace(/[^\d-]/,'');
          var parts = key.split('-');
          for( var i = 0; i < parts.length; i++ ) {
            if( parts[i].length == 1 ) {
              parts[i] = '0'+parts[i];
            }
          }
          var date = parts.join('-');


          /*if( parts.length < 2 ) {
              return alert('Invalid Date Format.  Dates should be in YYYY-MM format');
          }
          if ( parts[1].length != 2 ) {
              date = parts[0]+"-0"+parts[1];
          }*/

          model.weather[date] = data[key];
      }
  }

  // create array so we can sort
  var arr = [];
  var headers = ['date'];
  for( var date in model.weather ) {

      var t = [date];
      for( var key in model.weather[date] ) {
          if( key == 'nrel' ) continue;
          if( arr.length === 0 ) headers.push(key);
          t.push(model.weather[date][key]);
      }

      arr.push(t);
  }

  if( arr.length === 0 ) {
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

  //setTimeout(function(){
  //    weatherCustomChart = chart.create($('#custom-weather-chart')[0], model.weather);
  //}, 1000);
}

module.exports = {
  set : set,
  check : check
};

},{"../config":28,"./chart":40}]},{},[26])(26)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xhVkkuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9saXR0ZXJmYWxsLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvcGZzLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvcHIuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9yb290cC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3NsYS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3dzVkkuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvd2VhdGhlci9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2ZuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvaW8uanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9ydW4uanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi91dGlscy5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL3ZhbGlkYXRlLmpzIiwianNsaWIvYXBwLmpzIiwianNsaWIvY2hhcnRzLmpzIiwianNsaWIvY29uZmlnLmpzIiwianNsaWIvZmxhc2hibG9jay1kZXRlY3Rvci5qcyIsImpzbGliL2dvb2dsZURyaXZlL2V4cG9ydFRvQ3N2LmpzIiwianNsaWIvZ29vZ2xlRHJpdmUvaW5kZXguanMiLCJqc2xpYi9nb29nbGVEcml2ZS9yZWFsdGltZS5qcyIsImpzbGliL2lucHV0Rm9ybS5qcyIsImpzbGliL21vZGVsUnVuSGFuZGxlci5qcyIsImpzbGliL29hdXRoLmpzIiwianNsaWIvb2ZmbGluZS5qcyIsImpzbGliL291dHB1dC9kZWZpbml0aW9ucy5qcyIsImpzbGliL291dHB1dC9yYXcuanMiLCJqc2xpYi91dGlscy5qcyIsImpzbGliL3dlYXRoZXIvY2hhcnQuanMiLCJqc2xpYi93ZWF0aGVyL2ZpbGVSZWFkZXIuanMiLCJqc2xpYi93ZWF0aGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM1lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOStCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25jQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaW8gPSByZXF1aXJlKCcuL2xpYi9pbycpO1xudmFyIHJ1biA9IHJlcXVpcmUoJy4vbGliL3J1bicpKGlvKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIGFyZSBjb25zdGFudHMuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgYXNjZV9ldHJfd2luZHNwZWVkIDoge1xuICAgICAgICAgICAgdmFsdWU6IDIsXG4gICAgICAgICAgICB1bml0czogXCJtL3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgV2luZCBTcGVlZCB1c2VkIHRvIGNhbGN1bGF0ZSBFVHIgKGFuZCByZXN1bHRhbnQgS2MpIGZvciBNb2RlbC5cIlxuICAgICAgICB9LFxuICAgICAgICBkYXlzX3Blcl9tb250aDoge1xuICAgICAgICAgICAgdmFsdWU6IDMwLjQsXG4gICAgICAgICAgICB1bml0czogXCJkYXlzL21vXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZTIwOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4yLFxuICAgICAgICAgICAgdW5pdHM6IFwidnAvdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICAgICAgICB9LFxuICAgICAgICByaG9BaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAxLjIsXG4gICAgICAgICAgICB1bml0czogXCJrZy9tXjNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlbnNpdHkgb2YgYWlyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFtYmRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQ2MDAwMCxcbiAgICAgICAgICAgIHVuaXRzOiBcIkova2dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEY29udjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNjIyLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtOTAsXG4gICAgICAgICAgICB1bml0czogXCJXL21eMlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBRYjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBnRE1fbW9sOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQsXG4gICAgICAgICAgICB1bml0czogXCJnL21vbChDKVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbW9sUEFSX01KOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4zLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9sKEMpL01KXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmVlIDogcmVxdWlyZSgnLi90cmVlJyksXG4gIHBsYW50YXRpb24gOiByZXF1aXJlKCcuL3BsYW50YXRpb24nKSxcbiAgcGxhbnRhdGlvbl9zdGF0ZSA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbl9zdGF0ZScpLFxuICBzb2lsIDogcmVxdWlyZSgnLi9zb2lsJyksXG4gIHdlYXRoZXIgOiByZXF1aXJlKCcuL3dlYXRoZXInKSxcbiAgbWFuYWdlIDogcmVxdWlyZSgnLi9tYW5hZ2UnKSxcbiAgY29uc3RhbnRzIDogcmVxdWlyZSgnLi9jb25zdGFudHMnKVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBkZXNjcmlwdGlvbiA6IFwiQ3JvcCBNYW5hZ2VtZW50IFBhcmFtZXRlcnNcIixcbiAgdmFsdWUgOiB7XG4gICAgaXJyaWdGcmFjIDoge1xuICAgICAgdmFsdWUgOiAxLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIklycmlnYXRpb24gZnJhY3Rpb246IDEgPSBmdWxseSBpcnJpZ2F0ZWQsIDAgPSBubyBpcnJpZ2F0aW9uLiBBbnkgdmFsdWVzIGJldHdlZW4gMCBhbmQgMSBhcmUgYWNjZXB0YWJsZVwiXG4gICAgfSxcbiAgICBmZXJ0aWxpdHkgOiB7XG4gICAgICB2YWx1ZSA6IDAuNyxcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJTb2lsIGZlcnRpbGl0eVwiXG4gICAgfSxcbiAgICBkYXRlUGxhbnRlZCA6IHtcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB0aGUgY3JvcCB3YXMgcGxhbnRlZFwiXG4gICAgfSxcbiAgICBkYXRlQ29wcGljZWQgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogXCJfZGF0ZV9cIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRhdGUgb2YgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgY29wcGljZUludGVydmFsIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IDMsXG4gICAgICAgIHVuaXRzIDogXCJZZWFyc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiSG93IGFmdGVyIHRoZSBjcm9wIGlzIGNvcHBpY2VkIGFmdGVyIHRoZSBmaXJzdCBjb3BwaWNlXCJcbiAgICB9LFxuICAgIGNvcHBpY2VEYXRlcyA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIlwiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiSG93IGFmdGVyIHRoZSBjcm9wIGlzIGNvcHBpY2VkIGFmdGVyIHRoZSBmaXJzdCBjb3BwaWNlXCJcbiAgICB9LFxuICAgIGRhdGVGaW5hbEhhcnZlc3QgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogXCJfZGF0ZV9cIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRhdGUgd2hlbiB0aGUgY3JvcCBpcyBjb21wbGV0ZWx5IGhhcnZlc3RlZFwiXG4gICAgfVxuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiR3JlZW53b29kIFBHIFZhbHVlcyAoZGVmYXVsdClcIixcbiAgICB2YWx1ZToge1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgcmVxdWlyZWQgOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBTdG9ja2luZ0RlbnNpdHk6IHtcbiAgICAgICAgICAgIHZhbHVlOiAzNTg3LFxuICAgICAgICAgICAgdW5pdHM6IFwiVHJlZXMvaGVjdGFyXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgdHJlZXMgcGxhbnRlZCBwZXIgaGVjdGFyXCJcbiAgICAgICAgfSxcbiAgICAgICAgU2VlZGxpbmdNYXNzOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4wMDA0LFxuICAgICAgICAgICAgdW5pdHM6IFwia0dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1hc3Mgb2YgdGhlIHNlZWRsaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvcG9ydGlvbiBvZiBzZWVkbGluZyBtYXNzIGdvaW5nIGludG8gc3RlbVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBGOiB7XG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBmb2xpYWdlXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjksXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvcG9ydGlvbiBvZiBzZWVkbGluZyBtYXNzIGdvaW5nIGludG8gcm9vdFwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiUGxhbnRhdGlvbiBzdGF0ZSBjbGFzcywgY29udGFpbmluZyBhbGwgaW50ZW1lZGlhdGUgdmFsdWVzIGF0IGV2ZXJ5IHRpbWVzdGVwIG9mIHRoZSBtb2RlbFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGZlZWRzdG9ja0hhcnZlc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUNvdW50OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvcHBpY2VBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1vbnRoXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBZ2Ugb2YgdHJlZSBhdCB0aGUgdGltZSBvZiBjb3BwaWNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcImtQQVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJNZWFuIHZhcG9yIHByZXNzdXJlIGRlZmljaXRcIlxuICAgICAgICB9LFxuICAgICAgICBmVlBEOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllciAoUG9wbGFyKVwiXG4gICAgICAgIH0sXG4gICAgICAgIGZUOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIlRlbXBlcmF0dXJlIG1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZkZyb3N0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJOdW1iZXIgb2YgRnJlZXplIERheXMgTW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmTnV0cjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJOdXRyaXRpb25hbCBGcmFjdGlvbiwgbWlnaHQgYmUgYmFzZWQgb24gc29pbCBhbmQgZmVydGlsaXplciBhdCBzb21lIHBvaW50XCJcbiAgICAgICAgfSxcbiAgICAgICAgZlNXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvaWwgd2F0ZXIgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFBBUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJtb2xzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1vbnRobHkgUEFSIGluIG1vbHMgLyBtXjIgbW9udGhcIlxuICAgICAgICB9LFxuICAgICAgICB4UFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm1heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEludGNwdG46IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgcmFpbmZhbGwgaW50ZXJjZXB0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgQVNXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXZhaWxhYmxlIHNvaWwgd2F0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBDdW1JcnJpZzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkN1bXVsYXRpdmUgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIElycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJlcXVpcmVkIGlycmlnYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBTdGFuZEFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0aGUgdHJlZVwiXG4gICAgICAgIH0sXG4gICAgICAgIExBSToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIGFyZWEgaW5kZXhcIlxuICAgICAgICB9LFxuICAgICAgICBDYW5Db25kOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBjb25kdWN0YW5jZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFRyYW5zcDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW0vbW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgbW9udGhseSB0cmFuc3BpcmF0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgRVRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVmZXJlbmNlIChBbGZhbGZhKSB0cmFuc3BpcmF0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgS2M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3JvcCBDb2VmZmljaWVudFwiXG4gICAgICAgIH0sXG4gICAgICAgIFBoeXNNb2Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBmczoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYXRpbyBvZiBmb2xpYWdlIHRvIHN0ZW0gcGFydGl0aW9uaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGl0dGVyZmFsbDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBOUFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5ldCBQcmltYXJ5IFByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFJvb3RQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvb3QgcHJvZHVjdGl2aXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgZFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgV0Y6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRm9saWFnZSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFdSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvb3QgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdGVtIHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUb3RhbCB5aWVsZDogcm9vdCArIHN0ZW0gKyBmb2xpYWdlXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTb2lsIGluZm9ybWF0aW9uIGJhc2VkIG9uIGN1cnJlbnQgbG9jYXRpb25cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtYXhBV1M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBhdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3cG93ZXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicG93ZXIgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3djb25zdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJjb25zdGFudCBwYXJhbWV0ZXIgYmFzZWQgb24gY2xheSBjb250ZW50IG9mIHNvaWxcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcIltnYyBtL3NdP1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpY2FsIG1vZGlmZXIsIHNwZWNpZmllcyB0aGUgY2Fub3B5IGNvbmR1Y3RhbmNlLiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdmFsdWUsIHdoZW4gbGFpPTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDFcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAyXG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBncm93dGggbGltaXRlciBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogNDcuNVxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMy41XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBwYXJhbWV0ZXJzIGFmZmVjdGluZyB0ZW1wZXJhdHVyZSBtb2RpZmllciwgZlQuIEEgZ3JhcGggb2YgaG93IHRoZXNlIHBhcmFtZXRlcnMgYWZmZWN0IHRoZSB0ZW1wZXJhdHVyZSBtb2RpZmllciBpcyBmb3VuZCBoZXJlOiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvNjlpd3F0bmwyOFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbWluaW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgb3B0OiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgb3B0aW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDIwXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbWF4aW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDUwXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2Ugc3BlY2lmeSBncm93dGggcGFyYW1ldGVycyBzcGVjaWZpYyB0byB0aGUgc3BlY2llcyBvZiB0cmVlLlwiLFxuICAgIHZhbHVlIDoge1xuICAgICAgICBrOiB7XG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmFkaWF0aW9uIEV4dGluY3Rpb24gQ29lZmZpY2llbnQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bGxDYW5BZ2U6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiWWVhciB3aGVyZSB0cmVlIHJlYWNoZXMgZnVsbCBDYW5vcHkgQ292ZXIuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMS41XG4gICAgICAgIH0sXG4gICAgICAgIGtHOiB7XG4gICAgICAgICAgICB1bml0czogXCJba1BBXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGV0ZXJtaW5lcyB0aGUgcmVzcG9uc2Ugb2YgdGhlIGNhbm9weSBjb25kdWN0YW5jZSB0byB0aGUgdmFwb3IgcHJlc3N1cmUgZGVmaWNpdC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgYWxwaGE6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltrZy9tb2wgP11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBxdWFudHVtIGVmZmljaWVuY3kuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wOFxuICAgICAgICB9LFxuICAgICAgICBmVCA6IHJlcXVpcmUoJy4vZnQnKSxcbiAgICAgICAgQkxjb25kOiB7XG4gICAgICAgICAgICB1bml0czogXCJbXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGJvdW5kYXJ5IGxheWVyIGNvbmR1Y3RhbmNlLiBVc2VkIGluIHRoZSBjYWxjdWF0aW9uIG9mIHRyYW5zcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjA0XG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHJlcXVpcmUoJy4vZmFnZScpLFxuICAgICAgICBmTjA6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiB0aGUgbnV0cml0aW9uYWwgbW9kaWZpZXIsZk51dHIuICBmTnV0ciByYW5nZXMgZnJvbSBbZk5PLDEpIGJhc2VkIG9uIHRoZSBmZXJ0aWxpdHkgaW5kZXggd2hpY2ggcmFuZ2VzIGZyb20gMCB0byAxLiAgV2hlbiBmTjA9MSBpbmRpY2F0ZXMgZk51dHIgaXMgMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMjZcbiAgICAgICAgfSxcbiAgICAgICAgU0xBOiByZXF1aXJlKCcuL3NsYScpLFxuICAgICAgICAvL0NoZWNrVW5pdHNDaGFuZ2V0b2xpbmVhckZ1bmN0aW9uXG4gICAgICAgIENvbmR1Y3RhbmNlOiByZXF1aXJlKCcuL2NvbmR1Y3RhbmNlJyksXG4gICAgICAgIEludGNwdG46IHJlcXVpcmUoJy4vaW50Y3B0bicpLFxuICAgICAgICB5OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBc3NpbWlsYXRpb24gdXNlIGVmZmljaWVuY3kuICBVc2VkIGluIGNhbGN1bGF0aW9uIG9mIHRoZSBOUFAuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC40N1xuICAgICAgICB9LFxuICAgICAgICBwZnM6IHJlcXVpcmUoJy4vcGZzJyksXG4gICAgICAgIHdzVkk6IHJlcXVpcmUoJy4vd3NWSScpLFxuICAgICAgICBsYVZJOiByZXF1aXJlKCcuL2xhVkknKSxcbiAgICAgICAgcFI6IHJlcXVpcmUoJy4vcHInKSxcbiAgICAgICAgcm9vdFA6IHJlcXVpcmUoJy4vcm9vdHAnKSxcbiAgICAgICAgbGl0dGVyZmFsbDogcmVxdWlyZSgnLi9saXR0ZXJmYWxsJylcbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSYWluZmFsbCBpbnRlcmNlcHRpb24gZnJhY3Rpb24uICBBIGxpbmVhciBmdW5jdGlvbiB3LnIudC4gTEFJXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdmFsdWUsIHdoZW4gbGFpPTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNFxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiA3LjNcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFuIGFsdGVybnRhdGl2ZSB0byBfcGZzXywgbGFWSSwgYWxvbmcgd2l0aCB3c1ZJIGRlZmluZXMgdGhlIHBhcnRpdGlvbmluZyBvZiBmb2xpYWdlIHRvIHN0ZW0gWyhXRi9XUykgZnJhY3Rpb25dIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyB1c2luZyB0aGUgdm9sdW1lIGluZGV4IChWSSkuICBWST0oQmFzYWwgYXJlYSAqIHN0ZW0gaGVpZ2h0KS4gIGxhVkkgcHJlZGljdHMgdGhlIGxlYWYgYXJlYSBnaXZlbiBhIChWSSkuIEFsb25nIHdpdGggU0xBLCB0aGUgdG90YWwgZm9saWFnZSBpcyBjYWxjdWxhdGVkICBXRiA9IFNMQSpMZWFmQXJlYSB3aGVyZSBMZWFmQXJlYT0gY29uc3RhbnQqKFZJKV5wb3dlci5cIixcbiAgICB2YWx1ZToge1xuICAgICAgY29uc3RhbnQ6IHtcbiAgICAgICAgICB1bml0czogXCJbbV4yXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImNvbnN0YW50IGluIGxlYWZfYXJlYT1jb25zdGFudCpWSV5wb3dlci4gIElmIHRoaXMgaXMgbm90PTAsIHRoZW4gdGhlc2UgZnVuY3Rpb25zIHdpbGwgYmUgdXNlZCwgb3RoZXJ3aXNlIHRoZSBwZnMgZnVuY3Rpb25zIGFyZSB1c2VkLlwiLFxuICAgICAgICAgIHZhbHVlOiAwXG4gICAgICB9LFxuICAgICAgICBwb3dlcjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicG93ZXIgaW4gbGVhZl9hcmVhPSBjb25zdGFudCpWSV5wb3dlciBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIG1vbnRobHkgbG9zcyBvZiBmb2xpYWdlLiBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbnkgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82aXE5cHBkcXM3XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAxNVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDNcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgZGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2l0aCBhIHBhaXIgb2YgYWxsb21ldHJpYyBwb3dlciBlcXVhdGlvbnMuICBUaGUgZmlyc3QgcmVsYXRlcyBiYXNhbCBkaWFtZXRlciwgKERPQikgdG8gdG90YWwgd29vZHkgYmlvbWFzcywgd2hpbGUgdGhlIHNlY29uZCByZWxhdGVzIERPQiB0byBwZnMuICBUaGUgcGFyYW1ldGVyaXphdGlvbiBvZiB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gRE9CIGFuZCB3b29keSBiaW9tYXNzIGlzIGludmVydGVkIHRvIGRldGVybWluZSB0aGUgRE9CIGZyb20gdGhlIG1vZGVsZWQgd29vZHkgZnJhY3Rpb24uICBUaGlzIHJlbGF0aW9uIGlzIHBsb3R0ZWQgYXQ6IC4gIFRoZSBtb2RlbCBhbGxvY2F0ZXMgdGhlIGFwcHJvcHJpYXRlIGZyYWN0aW9uIG9mIHdvb2QgYmFzZWQgb24gdGhlIFN0b2NraW5nIGRlbnNpdHkgb2YgdGhlIHBsYW50YXRpb24uIERPQiByYXRoZXIgdGhhbiBEQkggaXMgdXNlZCBmb3IgY29tcGFyaXNvbiBvZiB0cmVlcyB3aXRoIGEgaGlnaCBzdGVtQ250IGFuZCByYXBpZCBjb3BwaWNpbmcgdmFsdWUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgc3RlbUNudDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXZlcmFnZSBudW1iZXIgb2Ygc3RlbXMgcGVyIHN0dW1wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi44XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1DOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzc1wiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMThcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbVA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNFxuICAgICAgICB9LFxuICAgICAgICBwZnNNeDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBwb3NzaWJsZSBwZnMgdmFsdWUgYWxsb3dlZFwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgREJPIHRvIHBmc1wiLFxuICAgICAgICAgICAgdmFsdWU6IC0wLjc3MlxuICAgICAgICB9LFxuICAgICAgICBwZnNDOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gcGZzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gdGhlIHBoeXNpb2xvZ2FsIHBhcmFtZXRlciBpcyAxLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMTdcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiBtMC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgICAgfSxcbiAgICAgICAgbTA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcGVuZGFuY2Ugb24gdGhlIGZlcnRpbGl0eSBpbmRleC4gMCBpbmRpY2F0ZXMgZnVsbCBkZXBlbmRhbmNlIG9uIGZlcnRpbGl0eSwgMSBpbmRpY2F0ZXMgYSBjb25zdGFudCBhbGxvY2F0aW9uLCBpbmRlcGVuZGFudCBvZiBmZXJ0aWxpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgdHVybm92ZXI6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttb250aF4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbW9udGhseSByb290IHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHBhcmFtZXRlcnMgc3BlY2lmeSByb290IGFsbG9jYXRpb24gdG8gZ3Jvd3RoIGFmdGVyIGNvcHBpY2luZy5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgIGZyYWM6IHtcbiAgICAgICAgICB1bml0czogXCJbbW9udGheMV1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgYW1vdW50IG9mIHJvb3QgYmlvbWFzcyB0aGF0IGV4Y2VlZHMgdGhlIGFib3ZlZ3JvdW5kIHJlcXVpcmVtZW50cyB0aGF0IGNhbiBiZSBzdXBwbGllZCBpbiBhIGdpdmVuIG1vbnRoLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjJcbiAgICAgIH0sXG4gICAgICBMQUlUYXJnZXQ6IHtcbiAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgYSB0YXJnZXQgTEFJIHJhdGUuICBUaGUgVGFyZ2V0IExBSSBpcyBpbmNsdWRlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgYSB0YXJnZXQgTlBQLCBiYXNlZCBvbiB3ZWF0aGVyIHBhcmFtYXRlcnMuICBCZWxvdyB0aGlzIHRhcmdldCwgdGhlIHJvb3RzIHdpbGwgY29udHJpYnV0ZSBiaW9tYXNzIGlmIHRoZSBiZWxvdyBncm91bmQgcm9vdCBtYXNzIGV4Y2VlZHMgdGhlIHJlcXVpcmVtZW50cyBvZiB0aGUgYWJvdmVncm91bmQgYmlvbWFzcy4gVGhlIHRhcmdldCBpcyBzcGVjaWZpZWQgaW4gTEFJIHRvIHRpbWUgcm9vdCBjb250cmlidXRpb25zIHRvIHBlcmlvZHMgb2YgZ3Jvd3RoXCIsXG4gICAgICAgICAgdmFsdWU6IDEwXG4gICAgICB9LFxuICAgICAgZWZmaWNpZW5jeToge1xuICAgICAgICAgIHVuaXRzOiBcIltrZy9rZ11cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGVmZmljaWVuY3kgaW4gY29udmVydGluZyByb290IGJpb21hc3MgaW50byBhYm92ZWdyb3VuZCBiaW9tYXNzLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW21eMi9rZ11cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIFNwZWNpZmljIExlYWYgQXJlYSBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgTEFJLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDE5XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTAuOFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFuIGFsdGVybnRhdGl2ZSB0byBfcGZzXywgd3NWSSwgYWxvbmcgd2l0aCBpdCdzIGNvbXBhbmlvbiBsYVZJIGRlZmluZXMgdGhlIHBhcnRpdGlvbmluZyBvZiBmb2xpYWdlIHRvIHN0ZW0gWyhXRi9XUykgZnJhY3Rpb25dIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcywgdXNpbmcgdGhlIHZvbHVtZSBpbmRleCAoVkkpLiAgVkk9KGRpYW1ldGVyQDIyY20gKGNtKSleMiAqIGhlaWdodCAobSkuIHdzVkkgcmVsYXRlcyB0aGUgVm9sdW1lIEluZGV4IChWSSksIHRvIHdvb2R5IGJpb21hc3MgKFdTKSwgV1NbZ109Y29uc3RhbnQqVklecG93ZXIuICBXUy9zdGVtc19wZXJfc3R1bXAgaXMgaW52ZXJ0ZWQgdG8gZXN0aW1hdGUgVkkgZm9yIHRoZSB0cmVlXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgc3RlbXNfcGVyX3N0dW1wOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmVyZ2UgbnVtYmVyIG9mIHN0ZW1zIG9uIGVhY2ggc3R1bXAgYWZ0ZXIgY29wcGljaW5nXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi44XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnN0YW50OiB7XG4gICAgICAgICAgICB1bml0czogXCJbZ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnN0YW50IGluIHJlbGF0aW9uIG9mIFZJIHRvIFdTXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTYxXG4gICAgICAgIH0sXG4gICAgICAgIHBvd2VyOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBpbiByZWxhdGlvbiBvZiBWSSB0byBXUy5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjg1NFxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vbnRoOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG1vbnRoIG51bWJlciBzaW5jZSBwbGFudGluZ1wiXG4gICAgfSxcbiAgICB0bWluOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHRlbXBlcmF0dXJlIGZvciBncm93dGhcIlxuICAgIH0sXG4gICAgdG1heDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRkbWVhbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGV3IHBvaW50IHRlbXBlcmF0dXJlXCJcbiAgICB9LFxuICAgIHBwdDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQcmVjaXBpdGF0aW9uXCJcbiAgICB9LFxuICAgIHJhZDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTb2xhciByYWRpYXRpb25cIlxuICAgIH0sXG4gICAgbnJlbDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLCAvLyBjYWxjdWF0ZWRcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9LFxuICAgIGRheWxpZ2h0OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuQG1vZHVsZSAzUEcgTW9kdWxlXG4qKi9cblxuXG4vKipcbkNsYXNzIGZvciBhbGwgdGhlIGZ1bmN0aW9ucyB0aGF0IHJ1biBpbiBhIHNpbmdsZSBzdGVwIG9mIHRoZSBtb2RlbFxuXG5AY2xhc3MgbW9kdWxlLmV4cG9ydHNcbioqL1xuXG5cbi8qKlxubGlzdCBvZiBjb25zdGFudHMgdXNlZCBmb3IgY29tcHV0YXRpb25zXG5cbkBhdHRyaWJ1dGUgY29uc3RhbnRcbioqL1xudmFyIGNvbnN0YW50cyA9IHtcbiAgYXNjZV9ldHJfZWxldmF0aW9uOiB7XG4gICAgdmFsdWU6NTAwLFxuICAgIHVuaXRzOidtL3MnLFxuICAgIGRlc2NyaXB0aW9uOidFc3RpbWF0ZWQgRWxldmF0aW9uIG9mIGNhbGN1bGF0aW9uIG9mIEVUciAoYW5kIEtjKSdcbiAgfSxcbiAgYXNjZV9ldHJfd2luZHNwZWVkOiB7XG4gICAgdmFsdWU6MixcbiAgICB1bml0czonbS9zJyxcbiAgICBkZXNjcmlwdGlvbjonQ29uc3RhbnQgd2luZCBzcGVlZCBmb3IgY2FsY3VsYXRpb24gb2YgRVRyIChhbmQgS2MpJ1xuICB9LFxuICBlMjA6e1xuICAgICAgdmFsdWU6Mi4yLFxuICAgICAgdW5pdHM6J3ZwL3QnLFxuICAgICAgZGVzY3JpcHRpb246J1JhdGUgb2YgY2hhbmdlIG9mIHNhdHVyYXRlZCBWUCB3aXRoIFQgYXQgMjBDJ1xuICB9LFxuICByaG9BaXI6e1xuICAgICAgdmFsdWU6MS4yLFxuICAgICAgdW5pdHM6J2tnL21eMycsXG4gICAgICBkZXNjcmlwdGlvbjonRGVuc2l0eSBvZiBhaXInXG4gIH0sXG4gIGxhbWJkYTp7XG4gICAgICB2YWx1ZToyNDYwMDAwLFxuICAgICAgdW5pdHM6J0ova2cnLFxuICAgICAgZGVzY3JpcHRpb246J0xhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvJ1xuICB9LFxuICBWUERjb252OntcbiAgICAgIHZhbHVlOjAuMDAwNjIyLFxuICAgICAgdW5pdHM6Jz8nLFxuICAgICAgZGVzY3JpcHRpb246J0NvbnZlcnQgVlBEIHRvIHNhdHVyYXRpb24gZGVmaWNpdCA9IDE4LzI5LzEwMDAnXG4gIH0sXG4gIFFhOntcbiAgICAgIHZhbHVlOi05MCxcbiAgICAgIHVuaXRzOidXL21eMicsXG4gICAgICBkZXNjcmlwdGlvbjonSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXAnXG4gIH0sXG4gIFFiOntcbiAgICAgIHZhbHVlOjAuOCxcbiAgICAgIHVuaXRzOid1bml0bGVzcycsXG4gICAgICBkZXNjcmlwdGlvbjonc2xvcGUgb2YgbmV0IHZzLiBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwJ1xuICB9LFxuICBnRE1fbW9sOntcbiAgICAgIHZhbHVlOjI0LFxuICAgICAgdW5pdHM6J2cvbW9sKEMpJyxcbiAgICAgIGRlc2NyaXB0aW9uOidNb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXInXG4gIH0sXG4gIG1vbFBBUl9NSjp7XG4gICAgICB2YWx1ZToyLjMsXG4gICAgICB1bml0czonbW9sKEMpL01KJyxcbiAgICAgIGRlc2NyaXB0aW9uOidDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVInXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmNvbnN0YW50ID0gY29uc3RhbnQ7XG5mdW5jdGlvbiBjb25zdGFudChjKSB7XG4gICAgcmV0dXJuIGNvbnN0YW50c1tjXS52YWx1ZTtcbn1cblxuLyoqXG5UaW1lIERlcGVuZGFudCBBdHRyaWJ1dGUsXG51bml0cz0ndmFyaW91cycsXG5kZXNjcmlwdGlvbj0nVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEgdGltZSBkZXBlbmRhbnQgZnVuY3Rpb24gdGhhdCBkZWNheXNcbihvciByaXNlcyBmcm9tIGYwIHRvIGYxLiAgVGhlIHZhbHVlIChmMCtmMSkvMiBpcyByZWFjaGVkIGF0IHRtLFxuYW5kIHRoZSBzbG9wZSBvZiB0aGUgbGluZSBhdCB0bSBpcyBnaXZlbiBieSBwLlxuQG1ldGhvZCB0ZHBcbkBwYXJhbSB4XG5AcGFyYW0gZlxuKiovXG5tb2R1bGUuZXhwb3J0cy50ZHAgPSBmdW5jdGlvbih4LCBmKSB7XG4gIHZhciBwID0gZi5mMSArXG4gICAgICAgICAgKGYuZjAgLSBmLmYxKSAqXG4gICAgICAgICAgTWF0aC5leHAoIC1NYXRoLmxvZygyKSAqIE1hdGgucG93KCAoeC9mLnRtKSwgZi5uICkpO1xuICByZXR1cm4gcDtcbn07XG5cbi8qKlxuQG1ldGhvZCBsaW5cbkBwYXJhbSB4XG5AcGFyYW0gcFxuKi9cbm1vZHVsZS5leHBvcnRzLmxpbiA9IGZ1bmN0aW9uKHgsIHApe1xuICBpZiggeCA8IDAgKSB7XG4gICAgcmV0dXJuIHAubW47XG4gIH1cbiAgaWYoIHggPiBwLnhtYXggKSB7XG4gICAgcmV0dXJuIHAueG1heDtcbiAgfVxuICByZXR1cm4gcC5tbiArIChwLm14LXAubW4pKih4L3AueG1heCk7XG59O1xuXG4vKipcbnVuaXRzPSd1bml0bGVzcycsXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IFJhaW5mYWxsIGludGVyY2VwdGlvbidcbkBtZXRob2QgSW50Y3B0blxuQHBhcmFtIGN1cl9MQUlcbkBwYXJhbSBjXG4qL1xubW9kdWxlLmV4cG9ydHMuSW50Y3B0biA9IGZ1bmN0aW9uKGN1cl9MQUksIGMpe1xuICByZXR1cm4gTWF0aC5tYXgoYy5tbixjLm1uICsgKGMubXggLSBjLm1uKSAqIE1hdGgubWluKDEgLCBjdXJfTEFJIC8gYy5sYWkpKTtcbn07XG5cbi8qKlxudW5pdHM9J21tJyxcbmRlc2NyaXB0aW9uPSdBdmFpbGFibGUgU29pbCBXYXRlcidcbkBtZXRob2QgQVNXXG5AcGFyYW0gbWF4QVNXXG5AcGFyYW0gcHJldl9BU1dcbkBwYXJhbSBkYXRlX3BwdFxuQHBhcmFtIGN1cl9UcmFuc3BcbkBwYXJhbSBjdXJfSW50Y3B0blxuQHBhcmFtIGN1cl9JcnJpZ1xuKi9cbm1vZHVsZS5leHBvcnRzLkFTVyA9IGZ1bmN0aW9uKG1heEFTVywgcHJldl9BU1csIGRhdGVfcHB0LCBjdXJfVHJhbnNwLCBjdXJfSW50Y3B0biwgY3VyX0lycmlnKXtcbiAgcmV0dXJuIE1hdGgubWluKG1heEFTVyoxMCwgTWF0aC5tYXgocHJldl9BU1cgKyBkYXRlX3BwdCAtIChjdXJfVHJhbnNwICsgY3VyX0ludGNwdG4gKiBkYXRlX3BwdCkgKyBjdXJfSXJyaWcsIDApKTtcbn07XG5cbi8vVE9ETzogZG91YmxlIGNoZWNrIHRoZSBhcHByb3ByaWF0ZSB1c2Ugb2YgdGRtZWFuIChkZXcgcG9pbnQgdGVtcClcbi8vVE9ETzogdGFrZSBjb25zdGFudHMgb3V0XG4vKipcbnVuaXRzPSdrUEEnLFxuZGVzY3JpcHRpb249J01lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdCdcbkBtZXRob2QgVlBEXG5AcGFyYW0gZGF0ZV90bWluXG5AcGFyYW0gZGF0ZV90bWF4XG5AcGFyYW0gZGF0ZV90ZG1lYW5cbiovXG5tb2R1bGUuZXhwb3J0cy5WUEQgPSBmdW5jdGlvbihkYXRlX3RtaW4sIGRhdGVfdG1heCwgZGF0ZV90ZG1lYW4pe1xuICB2YXIgdCA9ICgwLjYxMDggL1xuICAgICAgICAgICAgMiAqXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIE1hdGguZXhwKGRhdGVfdG1pbiAqIDE3LjI3IC8gKGRhdGVfdG1pbiArIDIzNy4zKSApICtcbiAgICAgICAgICAgICAgTWF0aC5leHAoZGF0ZV90bWF4ICogMTcuMjcgLyAoZGF0ZV90bWF4ICsgMjM3LjMpIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIC1cbiAgICAgICAgICAoIDAuNjEwOCAqXG4gICAgICAgICAgICBNYXRoLmV4cChkYXRlX3RkbWVhbiAqIDE3LjI3IC8gKGRhdGVfdGRtZWFuICsgMjM3LjMpIClcbiAgICAgICAgICApO1xuICByZXR1cm4gdDtcbn07XG5cbi8qKlxudW5pdHMgPSB1bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpJ1xuQG1ldGhvZCBmVlBEXG5AcGFyYW0ga0dcbkBwYXJhbSBjdXJfVlBEXG4qL1xubW9kdWxlLmV4cG9ydHMuZlZQRCA9IGZ1bmN0aW9uKGtHLCBjdXJfVlBEKXtcbiAgcmV0dXJuIE1hdGguZXhwKC0xICoga0cgKiBjdXJfVlBEKTtcbn07XG5cbi8vVE9ETzogdGFrZSBjb25zdGFudHMgb3V0XG4vLyBtYWtlIGEgbWVhbmluZ2Z1bCB0ZW1wdmFyIG5hbWVcbi8qKlxudW5pdHMgPSB1bml0bGVzcyxcbmRlc2NyaXB0aW9uID0gJ051bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllcidcbkBtZXRob2QgZkZyb3N0XG5AcGFyYW0gZGF0ZV90bWluXG4qL1xubW9kdWxlLmV4cG9ydHMuZkZyb3N0ID0gZnVuY3Rpb24oZGF0ZV90bWluKSB7XG4gIHZhciB0ZW1wVmFyID0gLTEuMDtcblxuICBpZiggZGF0ZV90bWluID49IDAgKXtcbiAgICB0ZW1wVmFyID0gMS4wO1xuICB9IC8vZWxzZSAtMS4wXG5cbiAgcmV0dXJuIDAuNSAqICgxLjAgKyB0ZW1wVmFyICogTWF0aC5zcXJ0KDEgLSBNYXRoLmV4cCgtMSAqIE1hdGgucG93KCgwLjE3ICogZGF0ZV90bWluKSAsIDIpICogKDQgLyAzLjE0MTU5ICsgMC4xNCAqIE1hdGgucG93KCAoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApIC8gKDEgKyAwLjE0ICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKSApICkgKTtcbn07XG5cbi8vVE9ETyAtIGJldHRlciBuYW1pbmc/OiB0bWluLCB0bWF4ID0gd2VhdGhlciBUb3B0LCBUbWF4LCBUbWluID0gdHJlZSBwYXJhbXNcbi8qKlxudW5pdHM9dW5pdGxlc3MsXG5kZXNjcmlwdGlvbj0nVGVtcGVyYXR1cmUgbW9kaWZpZXInXG5AbWV0aG9kIGZUXG5AcGFyYW0gdGF2Z1xuQHBhcmFtIGZUXG4qL1xubW9kdWxlLmV4cG9ydHMuZlQgPSBmdW5jdGlvbih0YXZnLCBmVCl7XG4gIHZhciBmO1xuICBpZih0YXZnIDw9IGZULm1uIHx8IHRhdmcgPj0gZlQubXgpe1xuICAgIGYgPSAwO1xuICB9IGVsc2Uge1xuICAgIGYgPSAoICh0YXZnIC0gZlQubW4pIC8gKGZULm9wdCAtIGZULm1uKSApICAqXG4gICAgICAgICAgIE1hdGgucG93ICggKCAoZlQubXggLSB0YXZnKSAvIChmVC5teCAtIGZULm9wdCkgKSxcbiAgICAgICAgICAgICAgICAgICAgICAoIChmVC5teCAtIGZULm9wdCkgLyAoZlQub3B0IC0gZlQubW4pIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgfVxuICByZXR1cm4oZik7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nLFxuZGVzY3JpcHRpb249J1JlcXVpcmVkIElycmlnYXRpb24nXG5AbWV0aG9kIElycmlnXG5AcGFyYW0gaXJyaWdGcmFjXG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gZGF0ZV9wcHRcbiovXG5tb2R1bGUuZXhwb3J0cy5JcnJpZyA9IGZ1bmN0aW9uKGlycmlnRnJhYywgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGRhdGVfcHB0KXtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgaXJyaWdGcmFjICogKGN1cl9UcmFuc3AgLSAoMSAtIGN1cl9JbnRjcHRuKSAqIGRhdGVfcHB0KSApO1xufTtcblxuLy9UT0RPOiBnZXQgdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgZlNXXG5AcGFyYW0gQVNXXG5AcGFyYW0gbWF4QVdTXG5AcGFyYW0gc3djb25zdFxuQHBhcmFtIHN3cG93ZXJcbiovXG5tb2R1bGUuZXhwb3J0cy5mU1cgPSBmdW5jdGlvbihBU1csIG1heEFXUywgc3djb25zdCwgc3dwb3dlcikge1xuICB2YXIgZlNXO1xuICBpZiggc3djb25zdCA9PT0gMCB8fCBtYXhBV1MgPT09IDAgKSB7XG4gICAgZlNXID0gMDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgb21yID0gMSAtIChBU1cvMTApIC8gbWF4QVdTOyAvLyBPbmUgTWludXMgUmF0aW9cblxuICAgIGlmKG9tciA8IDAuMDAxKSB7XG4gICAgICBmU1cgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBmU1cgPSAoMS1NYXRoLnBvdyhvbXIsc3dwb3dlcikpLygxK01hdGgucG93KG9tci9zd2NvbnN0LHN3cG93ZXIpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZTVztcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdOdXRyaXRpb25hbCBGcmFjdGlvbiwgbWlnaHQgYmUgYmFzZWQgb24gc29pbCBhbmQgZmVydGlsaXplciBhdCBzb21lIHBvaW50J1xuQG1ldGhvZCBmTnV0clxuQHBhcmFtIGZOMFxuQHBhcmFtIEZSXG4qL1xubW9kdWxlLmV4cG9ydHMuZk51dHIgPSBmdW5jdGlvbihmTjAsIEZSKXtcbiAgcmV0dXJuIGZOMCArICgxIC0gZk4wKSAqIEZSO1xufTtcblxuLyoqXG5UT0RPOiB3aHkgJDMgaW4gbWFrZWZpbGUgLSBhc2sgYWJvdXQgaXRcbnVuaXRzPXVuaXRsZXNzXG5kZXNjcmlwdGlvbj0nUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnUnXG5AbWV0aG9kIFBoeXNNb2RcbkBwYXJhbSBjdXJfZlZQRFxuQHBhcmFtIGN1cl9mU1dcbkBwYXJhbSBjdXJfZkFnZVxuKi9cbm1vZHVsZS5leHBvcnRzLlBoeXNNb2QgPSBmdW5jdGlvbihjdXJfZlZQRCwgY3VyX2ZTVywgY3VyX2ZBZ2Upe1xuICAgcmV0dXJuIE1hdGgubWluKGN1cl9mVlBEICwgY3VyX2ZTVykgKiBjdXJfZkFnZTtcbn07XG5cbi8qKlxudW5pdHM9J2djLG0vcycsXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IENvbmR1Y3RhbmNlJ1xuQG1ldGhvZCBDYW5Db25kXG5AcGFyYW0gUGh5c01vZFxuQHBhcmFtIExBSVxuQHBhcmFtIGNvbmRcbiovXG5tb2R1bGUuZXhwb3J0cy5DYW5Db25kID0gZnVuY3Rpb24oUGh5c01vZCwgTEFJLCBjb25kKXtcbiAgIHJldHVybiBNYXRoLm1heChjb25kLm1uICwgY29uZC5teCAqIFBoeXNNb2QgKiBNYXRoLm1pbigxICwgTEFJIC8gY29uZC5sYWkpICk7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nIHdoaWNoIGlzIGFsc28ga2cvbTIvbW9uXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvbidcbkBtZXRob2QgVHJhbnNwXG5AcGFyYW0gZGF0ZV9ucmVsXG5AcGFyYW0gZGF5c1xuQHBhcmFtIGRhdGVfZGF5bGlnaHRcbkBwYXJhbSBjdXJfVlBEXG5AcGFyYW0gQkxjb25kXG5AcGFyYW0gY3VyX0NhbkNvbmRcbiovXG5tb2R1bGUuZXhwb3J0cy5UcmFuc3AgPSBmdW5jdGlvbihkYXRlX25yZWwsIGRheXMsIGRhdGVfZGF5bGlnaHQsIGN1cl9WUEQsIEJMY29uZCwgY3VyX0NhbkNvbmQpe1xuICB2YXIgVlBEY29udiA9IGNvbnN0YW50KCdWUERjb252Jyk7XG4gIHZhciBsYW1iZGEgPSBjb25zdGFudCgnbGFtYmRhJyk7XG4gIHZhciByaG9BaXIgPSBjb25zdGFudCgncmhvQWlyJyk7XG4gIHZhciBlMjAgPSBjb25zdGFudCgnZTIwJyk7XG4gIHZhciBRYSA9IGNvbnN0YW50KCdRYScpO1xuICB2YXIgUWIgPSBjb25zdGFudCgnUWInKTtcblxuICAvLyBkYXRlX2RheWxpZ2h0ID0gaG91cnNcbiAgLy8gbnJlbCBpcyBpbiBNSi9tXjIvZGF5IGNvbnZlcnQgdG8gV2gvbV4yL2RheVxuICB2YXIgbmV0UmFkID0gUWEgKyBRYiAqICgoZGF0ZV9ucmVsICogMjc3Ljc3OCkgLyBkYXRlX2RheWxpZ2h0KTtcbiAgdmFyIGRlZlRlcm0gPSByaG9BaXIgKiBsYW1iZGEgKiBWUERjb252ICogY3VyX1ZQRCAqIEJMY29uZDtcbiAgdmFyIGRpdiA9IDEgKyBlMjAgKyBCTGNvbmQgLyBjdXJfQ2FuQ29uZDtcblxuICAvLyBDb252ZXJ0IGRheWxpZ2h0IHRvIHNlY3MuXG4gIHJldHVybiBkYXlzICogKCAoZTIwICogbmV0UmFkICsgZGVmVGVybSApIC8gZGl2ICkgKiBkYXRlX2RheWxpZ2h0ICogMzYwMCAvIGxhbWJkYTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdFVHInXG5AbWV0aG9kIEVUclxuQHBhcmFtIFJzIChNSi9tMi9kYXkpXG5AcGFyYW0gZGF5c1xuQHBhcmFtIFRtICh0bWluK3RtYXgpLzJcbkBwYXJhbSBjdXJfVlBEID0gKGVzLWVhKVxuQHBhcmFtIGVsZXZhdGlvbiAobSlcbkBwYXJhbSB3aW5kX3NwZWVkIChtL3MpXG4qL1xuXG5tb2R1bGUuZXhwb3J0cy5FVHIgPSBmdW5jdGlvbihScyx0bWluLHRtYXgsdGRtZWFuLGRheXMsWix1Mil7XG4gIHUyID0gdHlwZW9mIHUyICE9PSAndW5kZWZpbmVkJyA/IHUyIDogY29uc3RhbnQoJ2FzY2VfZXRyX3dpbmRzcGVlZCcpO1xuICBaID0gdHlwZW9mIFogIT09ICd1bmRlZmluZWQnID8gWiA6IGNvbnN0YW50KCdhc2NlX2V0cl9lbGV2YXRpb24nKTtcblxuICAvLyBGQU8gNTYgQ3JvcCBFdmFwb3JhdGlvblxuICB2YXIgcHN5Y2hyb21ldHJpY19jb25zdGFudCA9IGZ1bmN0aW9uKHopIHtcbiAgICB2YXIgUD0xMDEuMyAqIE1hdGgucG93KCgyOTMgLSAoMC4wMDY1KSp6KS8yOTMsNS4yNik7XG4gICAgZyA9IDAuNjY1KiBNYXRoLnBvdygxMCwtMykqUDtcbiAgICByZXR1cm4gZztcbiAgfTtcblxuICB2YXIgc2xvcGVfb2Zfc2F0dXJhdGlvbl92YXBvcl9wcmVzc3VyZT0gZnVuY3Rpb24oVG0pIHtcbiAgICByZXR1cm4gNDA5OC4xNyAqIDAuNjEwOCAqIE1hdGguZXhwKFRtICogMTcuMjcgLyAoVG0gKyAyMzcuMykpIC8gTWF0aC5wb3coKFRtICsyMzcuMyksMilcbiAgfTtcblxuICB2YXIgdnAgPSBmdW5jdGlvbihUKSB7XG4gICAgcmV0dXJuIDAuNjEwOCAqIE1hdGguZXhwKFQgKiAxNy4yNyAvIChUICsgMjM3LjMpKTtcbiAgfTtcblxuICB2YXIgUm5sID0gZnVuY3Rpb24odG1pbix0bWF4LHRkbWVhbixLKSB7XG4gICAgcmV0dXJuIC0oMS4zNSAqIEsgLSAwLjM1KSAqICgwLjM0IC0gMC4xNCAqIE1hdGguc3FydCh2cCh0ZG1lYW4pKSkgKiBNYXRoLnBvdyg0LjkzLC0wOSkgKiAoKE1hdGgucG93KHRtaW4gKzI3My4xNiw0KSArIE1hdGgucG93KHRtYXggKyAyNzMuMTYsNCkpIC8gMik7XG4gIH1cbiAgLy8wLjQwOCAqIGRlbHRhICogKCBSbiAtIEcpICsgcHN5Y2ggKiAoQ24gLyAoVCArIDI3MykpICogdTIgKiAoZXMgLWVhICkgLyAoZGVsdGEgKyBwc3ljaCAqICgxICsgQ2QgKiB1MiApKVxuICAvLyBFVHI6e0NuOjE2MDAsQ2Q6MC4zOH0sRVRvOntDbjo5MDAsQ2Q9MC4zNH1cbiAgLy9SbiA9IE1KIC8gbTIgZGF5ID0+IGRhdGVfbnJlbCAoTUovbV4yL2RheSlcbiAgLy9HPTBcbiAgLy91MiA9IG0vc1xuICAvLyBUID0gbWVhbiBUIChDKVxuICAvLyAoZXMtZWEpID0gc2F0dXJhdGlvbiBWYXBvciBQcmVzc3VyZSAoS3BhKSA9PiBjdXJfVlBEXG4gIHZhciBUbT0odG1pbit0bWF4KS8yO1xuICB2YXIgQ249MTYwMDtcbiAgdmFyIENkPTAuMzg7XG4gIHZhciBWUEQgPSAoKHZwKHRtaW4pK3ZwKHRtYXgpKS8yKS12cCh0ZG1lYW4pO1xuICB2YXIgZyA9IHBzeWNocm9tZXRyaWNfY29uc3RhbnQoWik7XG4gIHZhciBEID0gc2xvcGVfb2Zfc2F0dXJhdGlvbl92YXBvcl9wcmVzc3VyZShUbSk7XG4gIHZhciBSbmwgPSBSbmwodG1pbix0bWF4LHRkbWVhbiwxLjApO1xuICBSbmwgPS05MCAvIDI3Ny4wO1xuICB2YXIgcmFkID0gMC40MDggKiBEICogKFJzICogKDEgLSAwLjIzKSArIFJubCk7XG4gIHZhciBkZWYgPSBnICogKENuLyhUbSsyNzMpKSAqIHUyICogVlBEO1xuICB2YXIgZGl2ID0gRCArIGcgKiAoMSArIENkKnUyKTtcbiAgdmFyIEVUciA9IChyYWQrZGVmKS9kaXY7XG4gLy8gY29uc29sZS5sb2coe1RtOlRtLEQ6RCxSbmw6Um5sLFJzOlJzLEVUcjpFVHJ9KVxuICAvLyBDb252ZXJ0IGRheWxpZ2h0IHRvIHNlY3MuXG4gIHJldHVybiBkYXlzICogRVRyO1xufTtcblxuLy9UT0RPOiBkZXNjcmlwdGlvblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5AbWV0aG9kIE5QUFxuQHBhcmFtIHByZXZfU3RhbmRBZ2VcbkBwYXJhbSBmdWxsQ2FuQWdlXG5AcGFyYW0geFBQXG5AcGFyYW0ga1xuQHBhcmFtIHByZXZfTEFJXG5AcGFyYW0gZlZQRFxuQHBhcmFtIGZTV1xuQHBhcmFtIGZBZ2VcbkBwYXJhbSBhbHBoYVxuQHBhcmFtIGZOdXRyXG5AcGFyYW0gZlRcbkBwYXJhbSBmRnJvc3RcbiovXG5tb2R1bGUuZXhwb3J0cy5OUFAgPSBmdW5jdGlvbihwcmV2X1N0YW5kQWdlLCBmdWxsQ2FuQWdlLCB4UFAsIGssIHByZXZfTEFJLCBmVlBELCBmU1csIGZBZ2UsIGFscGhhLCBmTnV0ciwgZlQsIGZGcm9zdCl7XG4gIHZhciBDYW5Db3ZlciA9IDE7XG4gIGlmKCBwcmV2X1N0YW5kQWdlIDwgZnVsbENhbkFnZSApe1xuICAgIENhbkNvdmVyID0gcHJldl9TdGFuZEFnZSAvIGZ1bGxDYW5BZ2U7XG4gIH1cblxuICByZXR1cm4geFBQICogKDEgLSAoTWF0aC5leHAoLWsgKiBwcmV2X0xBSSkgKSApICogQ2FuQ292ZXIgKiBNYXRoLm1pbihmVlBEICwgZlNXKSAqIGZBZ2UgKiBhbHBoYSAqIGZOdXRyICogZlQgKiBmRnJvc3Q7XG59O1xuXG4vL1RPRE86IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIHBSXG5AcGFyYW0gY3VyX1BoeXNNb2RcbkBwYXJhbSBjdXJfcFJcbkBwYXJhbSBGUlxuQHBhcmFtIHBSXG4qL1xubW9kdWxlLmV4cG9ydHMucFIgPSBmdW5jdGlvbihjdXJfUGh5c01vZCwgY3VyX3BSLEZSLHBSKXtcbiAgdmFyIHAgPShwUi5teCAqIHBSLm1uKSAvXG4gICAgICAgICAocFIubW4gKyAocFIubXggLSBwUi5tbikgKiBjdXJfUGh5c01vZCAqIChwUi5tMCArICgxIC0gcFIubTApICogRlIpICk7XG5cbiAgLy8gVGhpcyB3YXMgYWRkZWQgYnkgcXVpbm4gdG8gbGltaXQgcm9vdCBncm93dGguXG4gIHJldHVybiBwICogTWF0aC5wb3cocC9jdXJfcFIsMik7XG59O1xuXG5cbi8vVE9ETzogbW9scyBvciBtb2xzIHBlciBtXjI/XG4vKipcbnVuaXRzPW1vbHNcbmRlc2NyaXB0aW9uPSdNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoJ1xubW9sUEFSX01KIFttb2wvTUpdIGlzIGEgY29uc3RhbnQgQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSXG5AbWV0aG9kIFBBUlxuQHBhcmFtIGRhdGVfcmFkXG5AcGFyYW0gbW9sUEFSX01KXG4qL1xubW9kdWxlLmV4cG9ydHMuUEFSID0gZnVuY3Rpb24oZGF0ZV9yYWQsIGRheXMsIG1vbFBBUl9NSikge1xuICBpZiggbW9sUEFSX01KID09PSBudWxsIHx8IG1vbFBBUl9NSiA9PT0gdW5kZWZpbmVkICkge1xuICAgIG1vbFBBUl9NSiA9IGNvbnN0YW50KCdtb2xQQVJfTUonKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlX3JhZCAqIG1vbFBBUl9NSiAqIGRheXM7XG59O1xuXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbmRlc2NyaXB0aW9uPSdtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb24gW3RETSAvIGhhIG1vbnRoXSxcbk5PVEU6IDEwMDAwLzEwXjYgW2hhL20yXVt0RG0vZ0RNXVxuZ0dNX21vbCBbZy9tb2xdIGlzIHRoZSBtb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXJcbkBtZXRob2QgeFBQXG5AcGFyYW0geVxuQHBhcmFtIGN1cl9QQVJcbkBwYXJhbSBnRE1fbW9sXG4qL1xubW9kdWxlLmV4cG9ydHMueFBQID0gZnVuY3Rpb24oeSwgY3VyX1BBUiwgZ0RNX21vbCl7XG4gICAgaWYoIGdETV9tb2wgPT09IG51bGwgfHwgZ0RNX21vbCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgZ0RNX21vbCA9IGNvbnN0YW50KCdnRE1fbW9sJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHkgKiBjdXJfUEFSICogZ0RNX21vbCAvIDEwMDtcbn07XG5cbi8qKiogRlVOQ1RJT05TIEZPUiBDT1BQSUNJTkcgKi9cbi8qKlxuY29wcGljZSByZWxhdGVkIGZ1bmN0aW9uc1xuQG1ldGhvZCBjb3BwaWNlXG4qL1xubW9kdWxlLmV4cG9ydHMuY29wcGljZSA9IHtcbiAgLy8gQ29wcGljZSBGdW5jdGlvbnMgYXJlIGJhc2VkIG9uIERpYW1ldGVyIG9uIFN0dW1wLCBOT1QgREJILlxuICAvLyBDYWxjdWxhdGVzIHRoZSBwZnMgYmFzZWQgb24gdGhlIHN0ZW0gd2VpZ2h0IGluIEtHXG4gIHBmcyA6IGZ1bmN0aW9uKHN0ZW0sIHApIHtcbiAgICB2YXIgYXZET0IgPSBNYXRoLnBvdyggKCBzdGVtIC8gcC5zdGVtQ250IC8gcC5zdGVtQykgLCAoMSAvIHAuc3RlbVApICk7XG4gICAgdmFyIHBwZnM9IHAucGZzQyAqIE1hdGgucG93KGF2RE9CICwgcC5wZnNQKTtcblxuICAgIHJldHVybiBNYXRoLm1pbihwLnBmc014LHBwZnMpO1xuICB9LFxuXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiBzdGVtIHdpdGggaW4gRy4gIFVzZXMgdm9sdW1lIEluZGV4IGFzIGd1aWRlXG4gIHBmc192aWFfVkkgOiBmdW5jdGlvbiAoc3RlbUcsIHdzVkksIGxhVkksIFNMQSkge1xuICAgIGlmIChzdGVtRyA8IDEwKSB7XG4gICAgICBzdGVtRyA9IDEwO1xuICAgIH1cbiAgICB2YXIgVkkgPSBNYXRoLnBvdyggKHN0ZW1HIC8gd3NWSS5zdGVtc19wZXJfc3R1bXAgLyB3c1ZJLmNvbnN0YW50KSwoMSAvIHdzVkkucG93ZXIpICk7XG5cbiAgICAvLyBBZGQgdXAgZm9yIGFsbCBzdGVtc1xuICAgIHZhciBsYSA9IGxhVkkuY29uc3RhbnQgKiBNYXRoLnBvdyhWSSxsYVZJLnBvd2VyKSAqIHdzVkkuc3RlbXNfcGVyX3N0dW1wO1xuICAgIHZhciB3ZiA9IDEwMDAgKiAobGEgLyBTTEEpOyAgLy8gRm9pbGFnZSBXZWlnaHQgaW4gZztcbiAgICB2YXIgcGZzID0gd2Yvc3RlbUc7XG4gICAgcmV0dXJuIHBmcztcbiAgfSxcblxuICBSb290UCA6IGZ1bmN0aW9uKGN1cl9ucHAsIGN1cl9ucHBUYXJnZXQsIFdSLFcscFJ4LGZyYWMpIHtcbiAgICB2YXIgbnBwUmVzID0gY3VyX25wcFRhcmdldCAtIGN1cl9ucHA7XG4gICAgdmFyIHJvb3RQUDtcbiAgICBpZiggbnBwUmVzID4gMCAmJiBXUi9XID4gcFJ4ICkge1xuICAgICAgICByb290UFAgPSBNYXRoLm1pbihucHBSZXMsIFdSKihXUi9XIC0gcFJ4KSpmcmFjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdFBQID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdFBQO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIC8vIFRPRE8gOiBpbXBsZW1lbnRcbiAgICAvLyBZb3UgbmVlZCB0byBzZXQgeW91ciBJTyBoZXJlIGFuZCBtYWtlIHN1cmUgYWxsIHBhcmFtZXRlcnMgZm9yIG1vZGVsIGFyZSBjb3JyZWN0bHkgc2V0XG4gIH0sXG4gIGR1bXAgOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmbiA9IHJlcXVpcmUoJy4vZm4nKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBkYXRhTW9kZWwgPSByZXF1aXJlKCcuL2RhdGFNb2RlbCcpO1xudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi92YWxpZGF0ZScpO1xuXG5mdW5jdGlvbiBydW4obGVuZ3RoT2ZHcm93dGgpIHtcblxuICAgIHZhciB5ZWFyVG9Db3BwaWNlOyAvL3llYXIgb2YgdGhlIGZpcnN0IG9yIHN1YnNlcXVlbnQgaGFydmVzdHNcbiAgICB2YXIgY29wcGljZUludGVydmFsOyAvL3RoZSAjIG9mIG1vbnRocyBpbiBhIHNpbmdsZSBjb3BwaWNlIGN5Y2xlXG4gICAgdmFyIG1vbnRoVG9Db3BwaWNlOyAvL2F0IHdoaWNoIG1vbnRoIHRoZSBoYXJ2ZXN0IGlzIHRvIGJlIHBlcmZvcm1lZCA6OiBjdXJyZW50bHkgdGhlIHRyZWUgd2lsbCBiZSBjdXQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGF0IG1vbnRoXG4gICAgdmFyIGNvcHBpY2VEYXRlcztcblxuICAgIC8vIGhlbHBlciwgbm90IHJlcXVpcmVkLiAgeW91IGNhbiByZWdpc3RlciBjYWxsYmFjayB0byBzZXQgcGFyYW1ldGVycyB3aGVuZXZlciBydW4gaXMgY2FsbGVkXG4gICAgdGhpcy5pby5yZWFkKHRoaXMpO1xuXG4gICAgLy8gbWFrZSBzdXJlIG1vZGVsIGlucHV0cyBhcmUgdmFsaWQgYmVmb3JlIHdlIHByb2NlZWQgYW55IGZ1cnRoZXJcbiAgICB2YWxpZGF0ZSh0aGlzKTtcblxuICAgIHRoaXMuY3VycmVudERhdGUgPSBuZXcgRGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZCk7XG4gICAgLy92YXIgcGxhbnRlZE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuICAgIC8vdmFyIGN1cnJlbnRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcblxuICAgIC8vVE9ETzogdGVzdCBubyBkYXRlY29wcGljZSBhcyBpbnB1dFxuICAgIGlmICggdGhpcy5tYW5hZ2UuZGF0ZUNvcHBpY2VkICE9PSB1bmRlZmluZWQgKXtcbiAgICAgIHllYXJUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0RnVsbFllYXIoKTtcbiAgICAgIG1vbnRoVG9Db3BwaWNlID0gdGhpcy5tYW5hZ2UuZGF0ZUNvcHBpY2VkLmdldE1vbnRoKCk7XG4gICAgICBjb3BwaWNlSW50ZXJ2YWwgPSB0aGlzLm1hbmFnZS55ZWFyc1BlckNvcHBpY2U7XG4gICAgfVxuXG4gICAgaWYoIHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlcyAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgY29wcGljZURhdGVzID0gW107XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICB2YXIgcGFydHMgPSB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXNbaV0uc3BsaXQoJy0nKTtcblxuICAgICAgICB2YXIgZCA9IDE1O1xuICAgICAgICBpZiggcGFydHMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBkID0gcGFyc2VJbnQocGFydHNbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29wcGljZURhdGVzLnB1c2gobmV3IERhdGUocGFyc2VJbnQocGFydHNbMF0pLCBwYXJzZUludChwYXJ0c1sxXSktMSwgZCkpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gaW5pdCBtYW5hZ2UgbnNcbiAgICB0aGlzLm1hbmFnZS5jb3BwaWNlID0gZmFsc2U7XG5cbiAgICBpZiggdGhpcy5kZWJ1ZyApIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIHZhciBzZXR1cCA9IHtcbiAgICAgIGxlbmd0aE9mR3Jvd3RoIDogbGVuZ3RoT2ZHcm93dGgsXG4gICAgICB5ZWFyVG9Db3BwaWNlIDogeWVhclRvQ29wcGljZSxcbiAgICAgIG1vbnRoVG9Db3BwaWNlIDogbW9udGhUb0NvcHBpY2UsXG4gICAgICBjb3BwaWNlSW50ZXJ2YWwgOiBjb3BwaWNlSW50ZXJ2YWwsXG4gICAgICBjb3BwaWNlRGF0ZXMgOiBjb3BwaWNlRGF0ZXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucnVuU2V0dXAoc2V0dXApO1xufVxuXG5mdW5jdGlvbiBydW5TZXR1cChzZXR1cCl7XG4gICAgdmFyIGksIGtleSwgY3VycmVudFdlYXRoZXIsIHN0ZXAsIHQ7XG5cbiAgICB2YXIgZGF5c19pbl9pbnRlcnZhbCA9ICh0aGlzLnNldHVwICYmIHRoaXMuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCkgPyB0aGlzLnNldHVwLmRheXNfaW5faW50ZXJ2YWwgOiAxO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBjb25zb2xlLmxvZygnZGF5c19pbl9pbnRlcnZhbDogJysgZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSAodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIG0gPSAnMCcrbTtcbiAgICB9XG5cbiAgICB2YXIgZCA9ICh0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSkrJyc7XG4gICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgZCA9ICcwJytkO1xuICAgIH1cblxuICAgIC8vdmFyIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG4gICAgdmFyIGZpcnN0U3RlcFJlc3VsdHMgPSBpbml0KHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsKTtcblxuICAgIHZhciBrZXlzSW5PcmRlciA9IFtdO1xuICAgIHZhciBoZWFkZXIgPSBbJ2RhdGUnXTtcbiAgICBmb3IoIGtleSBpbiBkYXRhTW9kZWwucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgIGtleXNJbk9yZGVyLnB1c2goa2V5KTtcbiAgICAgIGhlYWRlci5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgZmlyc3RTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttKyctJytkO1xuXG4gICAgdmFyIHJvd3MgPSBbXTsgLy90aGVzZSB3aWxsIGJlY29tZSByb3dzXG4gICAgcm93cy5wdXNoKGhlYWRlcik7XG5cbiAgICB2YXIgZmlyc3RSb3cgPSBbZmlyc3RTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICBmb3IoIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICBmaXJzdFJvdy5wdXNoKGZpcnN0U3RlcFJlc3VsdHNba2V5XSk7XG4gICAgfVxuICAgIHJvd3MucHVzaChmaXJzdFJvdyk7XG5cbiAgICB2YXIgY3VycmVudFN0ZXBSZXN1bHRzID0gZmlyc3RTdGVwUmVzdWx0cztcbiAgICB2YXIgbmV4dFN0ZXBSZXN1bHRzO1xuXG4gICAgZm9yKHN0ZXAgPSAxOyBzdGVwIDwgc2V0dXAubGVuZ3RoT2ZHcm93dGg7IHN0ZXArKykge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZC5nZXREYXRlKCkgKyBzdGVwICogZGF5c19pbl9pbnRlcnZhbCk7IC8vIGFkZCBhIGRheSB0byBjdXJyZW50IGRhdGVcbi8vICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXREYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkLmdldERhdGUoKSArIHN0ZXAqc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7IC8vIGFkZCBhIGRheSB0byBjdXJyZW50IGRhdGVcblxuICAgICAgaWYoIHNob3VsZENvcHBpY2UodGhpcywgc2V0dXAsIGRheXNfaW5faW50ZXJ2YWwpICkge1xuICAgICAgICBpZiggdGhpcy5kZWJ1ZyApIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGltZSB0byBDb3BwaWNlIScpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hbmFnZS5jb3BwaWNlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIG0gPSAodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgICAgaWYoIG0ubGVuZ3RoID09PSAxICkge1xuICAgICAgICBtID0gJzAnK207XG4gICAgICB9XG5cbiAgICAgIGQgPSB0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSsnJztcbiAgICAgIGlmKCBkLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgZCA9ICcwJytkO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50V2VhdGhlciA9IGdldFdlYXRoZXIodGhpcywgc2V0dXAsIG0sIGQpO1xuXG4gICAgICAvL1RPRE86IHN3aXRjaCB1cCB0cmVlcyBoZXJlIHdoZW4gYWZ0ZXIgdGhlIGZpcnN0IGhhcnZlc3RcbiAgICAgIG5leHRTdGVwUmVzdWx0cyA9IHNpbmdsZVN0ZXAodGhpcy5wbGFudGF0aW9uLCB0aGlzLnNvaWwsIGN1cnJlbnRXZWF0aGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZSwgY3VycmVudFN0ZXBSZXN1bHRzLCBkYXlzX2luX2ludGVydmFsKTtcbiAgICAgIG5leHRTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttKyctJytkO1xuXG4gICAgICB2YXIgdGhpc1JvdyA9IFtuZXh0U3RlcFJlc3VsdHMuRGF0ZV07XG4gICAgICBmb3IoIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICAgIHRoaXNSb3cucHVzaChuZXh0U3RlcFJlc3VsdHNba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRTdGVwUmVzdWx0cyA9IG5leHRTdGVwUmVzdWx0cztcbiAgICAgIHJvd3MucHVzaCh0aGlzUm93KTtcbiAgICB9XG5cbiAgICB0aGlzLmlvLmR1bXAocm93cyk7XG5cbiAgICBpZiggdGhpcy5kZWJ1ZyApIHtcbiAgICAgIGNvbnNvbGUubG9nKHN0ZXApO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICBjb25zb2xlLmxvZygobmV3IERhdGUoKS5nZXRUaW1lKCktdCkrJ21zJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd3M7XG59XG5cbmZ1bmN0aW9uIHNpbmdsZVN0ZXAocGxhbnRhdGlvbiwgc29pbCwgd2VhdGhlciwgbWFuYWdlLCBwLCBkYXlzX2luX2ludGVydmFsKSB7IC8vcCA9IHByZXZpb3VzIHN0YXRlXG4gIHZhciBjID0ge307IC8vY3VycmVudCBzdGF0ZVxuXG4gIGlmKCBtYW5hZ2UuY29wcGljZSA9PT0gdHJ1ZSApIHsgLy9jaGFuZ2UgdGhpcyBndXkgZm9yIHRoZSBtb250aCB3aGVuIGNvcHBpY2VcbiAgICAvLyBBZGQgaW4gYSBzdHVtcCBtYXJnaW4uLi4uXG4gICAgYy5mZWVkc3RvY2tIYXJ2ZXN0ID0gcC5mZWVkc3RvY2tIYXJ2ZXN0ICsgcC5XUztcbiAgICBjLmNvcHBpY2VDb3VudCA9IHAuY29wcGljZUNvdW50ICsgMTtcbiAgICBjLmNvcHBpY2VBZ2UgPSAwO1xuICAgIHAuTEFJID0gMDtcbiAgICBwLldTID0gMDtcbiAgICBwLldGID0gMDtcbiAgICBwLlcgPSBwLldSO1xuICB9IGVsc2Uge1xuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdDtcbiAgICBjLmNvcHBpY2VDb3VudCA9IHAuY29wcGljZUNvdW50O1xuICAgIGMuY29wcGljZUFnZSA9IHAuY29wcGljZUFnZSArIGRheXNfaW5faW50ZXJ2YWwvMzY1LjA7XG4gIH1cblxuICB2YXIgdHJlZTsgLy90cmVlXG4gIGlmKCBjLmNvcHBpY2VDb3VudCA9PT0gMCApIHsgLy9UT0RPOiBjaGVjayB0aGUgY2FzZSB3aGVyZSB3ZSBzdGFydCB3aXRoIGEgY29wcGljZWQgbXVsdGkgc3R1bXAgdHJlZVxuICAgICAgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlO1xuICB9IGVsc2Uge1xuICAgICAgdHJlZSA9IHBsYW50YXRpb24uY29wcGljZWRUcmVlO1xuICB9XG5cbiAgYy5TdGFuZEFnZSA9IHAuU3RhbmRBZ2UgKyBkYXlzX2luX2ludGVydmFsLzM2NS4wO1xuICB2YXIgc2xhID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuU0xBKTtcbiAgYy5MQUkgPSBwLldGICogMC4xICogc2xhOyAvLyBMYW5kc2J1cmcgZXEgOS41XG5cbiAgLy8gSk0gLSBQZXIgc2VjdGlvbiAyLjEgIExhbmRzYmVyZy9XYXJpbmdcbiAgYy5WUEQgPSBmbi5WUEQod2VhdGhlci50bWluLCB3ZWF0aGVyLnRtYXgsIHdlYXRoZXIudGRtZWFuKTtcbiAgLy9jLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4sIGRheXNfaW5faW50ZXJ2YWwpO1xuXG5cbiAgYy5mVlBEID0gZm4uZlZQRCh0cmVlLmtHLCBjLlZQRCk7XG5cbiAgYy5mU1cgPSBmbi5mU1cocC5BU1csIHNvaWwubWF4QVdTLCBzb2lsLnN3Y29uc3QsIHNvaWwuc3dwb3dlcik7XG4gIGMuZkFnZSA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLmZBZ2UpO1xuXG4gIC8vIGZGcm9zdCBpcyBhIGN1bXVsYXRpdmUgTm9ybWFsIGRpc3RyaWJ1dGlvbiwgdGhhdCBhcHByb2l4bWF0ZXMgdGhlIG51bWJlciBvZiBkYXlzIChvciBwYXJ0cyBvZiBkYXlzKSB0aGF0XG4gIC8vIHdpbGwgYmUgYmVsb3cgMCwgZ2l2ZW4gYSBtaW5pbXVtIHRlbXBlcmF0dXJlXG4gIGMuZkZyb3N0ID0gZm4uZkZyb3N0KHdlYXRoZXIudG1pbik7XG5cbiAgYy5QQVIgPSBmbi5QQVIod2VhdGhlci5yYWQsIGRheXNfaW5faW50ZXJ2YWwpOyAvLyAgUEFSIGluIG1vbHNcblxuICBjLmZUID0gZm4uZlQoKHdlYXRoZXIudG1pbiArIHdlYXRoZXIudG1heCkvMiwgdHJlZS5mVCk7XG5cbiAgYy5QaHlzTW9kID0gZm4uUGh5c01vZChjLmZWUEQsIGMuZlNXLCBjLmZBZ2UpO1xuICBjLmZOdXRyID0gZm4uZk51dHIodHJlZS5mTjAsIG1hbmFnZS5mZXJ0aWxpdHkpO1xuICBjLnhQUCA9IGZuLnhQUCh0cmVlLnksIGMuUEFSKTsgLy8gbWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uIHBlciBtb250aFxuICBjLk5QUCA9IGZuLk5QUChwLmNvcHBpY2VBZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgcC5MQUksIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuXG4gIHZhciBOUFBfdGFyZ2V0ID0gZm4uTlBQKHRyZWUuZnVsbENhbkFnZSwgdHJlZS5mdWxsQ2FuQWdlLCBjLnhQUCwgdHJlZS5rLCB0cmVlLnJvb3RQLkxBSVRhcmdldCwgYy5mVlBELCBjLmZTVywgYy5mQWdlLCB0cmVlLmFscGhhLCBjLmZOdXRyLCBjLmZULCBjLmZGcm9zdCk7XG4vLyBKTVxuICBjLlJvb3RQID0gZm4uY29wcGljZS5Sb290UChjLk5QUCwgTlBQX3RhcmdldCwgcC5XUiwgcC5XLCB0cmVlLnBSLm14LCB0cmVlLnJvb3RQLmZyYWMgKiAoZGF5c19pbl9pbnRlcnZhbCAvIDMwLjQpKTtcblxuICBpZiAodHJlZS5sYVZJICYmIHRyZWUubGFWSS5jb25zdGFudCApIHsgLy8gVGVzdCBmb3IgdGhhdCBmdW5jdGlvblxuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnNfdmlhX1ZJKHAuV1MqMTAwMDAwMC9wbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSwgdHJlZS53c1ZJLHRyZWUubGFWSSxzbGEpO1xuICB9IGVsc2Uge1xuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnMocC5XUyoxMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLnBmcyk7XG4gIH1cblxuICBjLmRXID0gYy5OUFAgKyB0cmVlLnJvb3RQLmVmZmljaWVuY3kgKiBjLlJvb3RQO1xuXG4gIGMuSW50Y3B0biA9IGZuLkludGNwdG4oYy5MQUksIHRyZWUuSW50Y3B0bik7XG4gIGMuQ2FuQ29uZCA9IGZuLkNhbkNvbmQoYy5QaHlzTW9kLCBjLkxBSSwgdHJlZS5Db25kdWN0YW5jZSk7XG5cbiAgYy5wUiA9IGZuLnBSKGMuUGh5c01vZCwgcC5XUi9wLlcsIG1hbmFnZS5mZXJ0aWxpdHksIHRyZWUucFIpO1xuXG4gIC8vIEpNIC0gdHJlZSBsaXR0ZXJmYWxsIGlzIGEgbW9udGhseSBwYXJhbWV0ZXIuXG4gIGMubGl0dGVyZmFsbCA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLmxpdHRlcmZhbGwpICogKGRheXNfaW5faW50ZXJ2YWwgLyAzMC40KTtcblxuICBjLlRyYW5zcCA9IGZuLlRyYW5zcCh3ZWF0aGVyLnJhZCwgZGF5c19pbl9pbnRlcnZhbCwgd2VhdGhlci5kYXlsaWdodCwgYy5WUEQsIHRyZWUuQkxjb25kLCBjLkNhbkNvbmQpO1xuICBjLkVUciA9IGZuLkVUcih3ZWF0aGVyLnJhZCwgd2VhdGhlci50bWluLCB3ZWF0aGVyLnRtYXgsIHdlYXRoZXIudGRtZWFuLCBkYXlzX2luX2ludGVydmFsKTtcbiAgYy5LYyA9IGMuVHJhbnNwL2MuRVRyO1xuXG5cbiAgLy8gQ2FsY3VsYXRlZCBmcm9tIHBmc1xuICBjLnBTID0gKDEgLSBjLnBSKSAvICgxICsgYy5wZnMgKTtcbiAgYy5wRiA9ICgxIC0gYy5wUikgLyAoMSArIDEvYy5wZnMgKTtcblxuICBjLklycmlnID0gZm4uSXJyaWcobWFuYWdlLmlycmlnRnJhYywgYy5UcmFuc3AsIGMuSW50Y3B0biwgd2VhdGhlci5wcHQpO1xuICBjLkN1bUlycmlnID0gcC5DdW1JcnJpZyArIGMuSXJyaWc7XG5cbiAgYy5BU1cgPSBmbi5BU1coc29pbC5tYXhBV1MsIHAuQVNXLCB3ZWF0aGVyLnBwdCwgYy5UcmFuc3AsIGMuSW50Y3B0biwgYy5JcnJpZyk7IC8vZm9yIHNvbWUgcmVhc29uIHNwZWxsZWQgbWF4QVdTXG5cbiAgYy5XRiA9IHAuV0YgKyBjLmRXICogYy5wRiAtIGMubGl0dGVyZmFsbCAqIHAuV0Y7XG4gIC8vIEluY2x1ZGUgY29udHJpYnV0aW9uIG9mIFJvb3RQIC8vIEVycm9yIGluIG9sZCBjb2RlICFcbiAgYy5XUiA9IHAuV1IgKyBjLmRXICogYy5wUiAtICh0cmVlLnBSLnR1cm5vdmVyICogKGRheXNfaW5faW50ZXJ2YWwgLyAzMC40KSkgKiBwLldSIC0gYy5Sb290UDtcbiAgYy5XUyA9IHAuV1MgKyBjLmRXICogYy5wUztcbiAgYy5XID0gYy5XRitjLldSK2MuV1M7XG5cbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIGluaXQocGxhbnRhdGlvbiwgc29pbCkge1xuICB2YXIgcCA9IHt9O1xuICB2YXIgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlOyAvL1RPRE86IGRlY2lkZSB0aGUgY2FzZSB3aGVyZSB3ZSBzdGFydCB3aXRoIGEgY29wcGljZWQgdHJlZT9cblxuICBwLmZlZWRzdG9ja0hhcnZlc3Q9MDtcbiAgcC5jb3BwaWNlQ291bnQ9MDtcbiAgcC5jb3BwaWNlQWdlID0gMDtcblxuICBwLkN1bUlycmlnID0gMDtcbiAgcC5kVyA9IDA7XG4gIHAuVyA9IHBsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5ICogcGxhbnRhdGlvbi5TZWVkbGluZ01hc3M7XG4gIHAuV0YgPSBwbGFudGF0aW9uLnBGICogcC5XO1xuICBwLldTID0gcGxhbnRhdGlvbi5wUyAqIHAuVztcbiAgcC5XUiA9IHBsYW50YXRpb24ucFIgKiBwLlc7XG4gIHAuQVNXID0gMC44ICogMTAgKiBzb2lsLm1heEFXUzsgLy8gVGhlIDEwIGlzIGJlY2F1c2UgbWF4QVdTIGlzIGluIGNtIGFuZCBBU1cgaW4gbW0gKD8pIFdoeSAoPylcbiAgcC5TdGFuZEFnZSA9IDA7XG5cbiAgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlO1xuXG4gIC8vIHNsYSA9IFNwZWNpZmljIExlYWYgQXJlYVxuICB2YXIgc2xhID0gZm4udGRwKHAuU3RhbmRBZ2UsdHJlZS5TTEEpO1xuXG4gIHAuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuXG4gIC8vIFRoZXNlIGFyZW4ndCB1c2VkIHNvIGNhbiBiZSBzZXQgdG8gYW55dGhpbmc7ICBUaGV5IGFyZSBzZXQgdG8gbWF0Y2ggdGhlIHBvc3RncmVzIHR5cGVcbiAgcC5WUEQgICAgICAgID0gMDtcbiAgcC5mVlBEICAgICAgID0gMDtcbiAgcC5mVCAgICAgICAgID0gMDtcbiAgcC5mRnJvc3QgICAgID0gMDtcbiAgcC5mTnV0ciAgICAgID0gMDtcbiAgcC5mU1cgICAgICAgID0gMDtcbiAgcC5mQWdlICAgICAgID0gMDtcbiAgcC5QQVIgICAgICAgID0gMDtcbiAgcC54UFAgICAgICAgID0gMDtcbiAgcC5JbnRjcHRuICAgID0gMDtcbiAgcC5JcnJpZyAgICAgID0gMDtcbiAgcC5DYW5Db25kICAgID0gMDtcbiAgcC5UcmFuc3AgICAgID0gMDtcbiAgcC5QaHlzTW9kICAgID0gMDtcbiAgcC5wZnMgICAgICAgID0gMDtcbiAgcC5wUiAgICAgICAgID0gMDtcbiAgcC5wUyAgICAgICAgID0gMDtcbiAgcC5wRiAgICAgICAgID0gMDtcbiAgcC5saXR0ZXJmYWxsID0gMDtcbiAgcC5OUFAgICAgICAgID0gMDtcbiAgcC5Sb290UCAgICAgID0gMDtcblxuICByZXR1cm4gcDtcbn1cblxuLy8gVGhpcyBhY3R1YWxseSBuZWVkIHRvIHdvcmsgYmV0dGVyLiAgSWYgdGhlIHdlYXRoZXIgZG9lc24ndCBtYXRjaFxuLy8gdGhlIHN0ZXBzLCB3ZSBuZWVkIHRvIGZpbmQgdGhlIGNsb3Nlc3QgdmFsdWUgdG8gd2hhdCB3ZSBhcmUgbG9va2luZyBmb3JcbmZ1bmN0aW9uIGdldFdlYXRoZXIobW9kZWwsIHNldHVwLCBtb250aCwgZGF5KSB7XG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGgrJy0nK2RheV0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldO1xuICAgIH1cblxuICAgIC8vIG1vZGVsbGVkIGRhaWx5XG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9udGgrJy0nK2RheV0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldO1xuICAgIH1cblxuICAgIC8vIGFjdHVhbFxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGhdO1xuICAgIH1cblxuICAvLyBtb2RlbGxlZCBNb250aGx5XG4gIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoXSAhPT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vbnRoXTtcbiAgfVxuXG4gIHRocm93ICdSdW50aW1lIEVycm9yOiBubyB3ZWF0aGVyIGZvdW5kIGZvcjogJyttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5O1xufVxuXG5mdW5jdGlvbiBzaG91bGRDb3BwaWNlKG1vZGVsLCBzZXR1cCwgZGF5c19pbl9pbnRlcnZhbCkge1xuICB2YXIgbmV4dDtcbiAgdmFyIGNvcHBpY2Vfb247XG4gIC8vIGRvIHdlIGhhdmUgc3BlY2lmaWMgY29wcGljZSBkYXRlcyBzZXQ/XG4gIGlmKCBzZXR1cC5jb3BwaWNlRGF0ZXMgKSB7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNldHVwLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBkID0gc2V0dXAuY29wcGljZURhdGVzW2ldO1xuXG4gICAgICBpZiAobW9kZWwuY3VycmVudERhdGUgPCBkKSB7XG4gICAgICAgIG5leHQgPSBtb2RlbC5jdXJyZW50RGF0ZTtcbiAgICAgICAgbmV4dC5zZXREYXRlKG5leHQuZ2V0RGF0ZSArIGRheXNfaW5faW50ZXJ2YWwpO1xuICAgICAgICBpZiAoIGQgPCBuZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29wcGljZV9vbiA9IG5ldyBEYXRlKCk7XG4gICAgY29wcGljZV9vbi5zZXRZZWFyKHNldHVwLnllYXJUb0NvcHBpY2UpO1xuICAgIGNvcHBpY2Vfb24uc2V0TW9udGgoc2V0dXAubW9udGhUb0NvcHBpY2UpO1xuICAgIGNvcHBpY2Vfb24uc2V0RGF0ZSgxNSk7XG5cbiAgICBpZiggbW9kZWwuY3VycmVudERhdGUuZ2V0VGltZSgpIDwgY29wcGljZV9vbi5nZXRUaW1lKCkgKSB7XG4gICAgICBuZXh0ID0gbmV3IERhdGUobW9kZWwuY3VycmVudERhdGUpO1xuICAgICAgbmV4dC5zZXREYXRlKG1vZGVsLmN1cnJlbnREYXRlLmdldERhdGUoKSArIGRheXNfaW5faW50ZXJ2YWwpO1xuXG4gICAgICBpZiAoIGNvcHBpY2Vfb24uZ2V0VGltZSgpIDwgbmV4dC5nZXRUaW1lKCkpIHtcbiAgICAgICAgc2V0dXAueWVhclRvQ29wcGljZSA9IHNldHVwLnllYXJUb0NvcHBpY2UgKyBzZXR1cC5jb3BwaWNlSW50ZXJ2YWw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uKG5hbWUpIHtcbiAgaWYoIGZuW25hbWVdICkge1xuICAgIHJldHVybiBmbltuYW1lXTtcbiAgfSBlbHNlIGlmKCBmbi5jb3BwaWNlW25hbWVdICkge1xuICAgIHJldHVybiBmbi5jb3BwaWNlW25hbWVdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlvKSB7XG4gIHJldHVybiB7XG4gICAgaW8gOiBpbyxcbiAgICBydW4gOiBydW4sXG4gICAgc2luZ2xlU3RlcCA6IHNpbmdsZVN0ZXAsXG4gICAgcnVuU2V0dXAgOiBydW5TZXR1cCxcbiAgICBpbml0IDogaW5pdCxcbiAgICBnZXRGdW5jdGlvbiA6IGdldEZ1bmN0aW9uLFxuICAgIHNldElPIDogZnVuY3Rpb24oaW8pIHtcbiAgICAgIHRoaXMuaW8gPSBpbztcbiAgICB9LFxuICAgIGdldERhdGFNb2RlbCA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGRhdGFNb2RlbDtcbiAgICB9XG4gIH07XG59O1xuIiwiZnVuY3Rpb24gZW52KCkge1xuICBpZiggdHlwZW9mIHBsdjggIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIFwicGx2OFwiO1xuICBpZiggdHlwZW9mIExvZ2dlciAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gXCJhcHBzY3JpcHRcIjtcbiAgaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSByZXR1cm4gXCJub2RlXCI7XG59XG5cbmZ1bmN0aW9uIGxvZyhtc2cpIHtcbiAgdmFyIGUgPSBlbnYoKTtcbiAgaWYoIGUgPT0gXCJwbHY4XCIgKSBwbHY4LmVsb2coTk9USUNFLCAnbm90aWNlJywgbXNnKTtcbiAgZWxzZSBpZiggZSA9PSBcImFwcHNjcmlwdFwiICkgTG9nZ2VyLmxvZyhtc2cpO1xuICBlbHNlIGNvbnNvbGUubG9nKG1zZyk7XG59XG5cbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICBpZiAobnVsbCA9PSBvYmogfHwgXCJvYmplY3RcIiAhPSB0eXBlb2Ygb2JqKSByZXR1cm4gb2JqO1xuICB2YXIgY29weSA9IG9iai5jb25zdHJ1Y3RvcigpO1xuICBmb3IgKHZhciBhdHRyIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoYXR0cikpIGNvcHlbYXR0cl0gPSBvYmpbYXR0cl07XG4gIH1cbiAgcmV0dXJuIGNvcHk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbnYgOiBlbnYsXG4gIGxvZyA6IGxvZyxcbiAgY2xvbmUgOiBjbG9uZVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogVmFsaWRhdGUgYSBtb2RlbCBydW4gc2V0dXAuICB0aHJvdyBlcnJvciBpcyBiYWRuZXNzLlxuICovXG52YXIgZGF0YU1vZGVsID0gcmVxdWlyZSgnLi9kYXRhTW9kZWwnKTtcbnZhciBwYXJhbUVycm9yID0gJ1ZhbGlkYXRpb24gRXJyb3I6ICc7XG5cbnZhciB2YWxpZFdlYXRoZXJLZXlzID0gW1xuICAvXlxcZFxcZFxcZFxcZC1cXGRcXGQkLywgLy8gc3BlY2lmaWMgd2VhdGhlciBZWVlZLU1NIGZvciBtb250aGx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkJC8sIC8vIG1vZGVsbGVkIG9yIGF2ZXJhZ2Ugd2VhdGhlciBNTSBmb3IgbW9udGhseSB0aW1lc3RlcFxuICAvXlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkJC8sIC8vIHNwZWNpZmljIHdlYXRoZXIgWVlZWS1NTS1ERCBmb3IgZGFpbHkgdGltZXN0ZXBcbiAgL15cXGRcXGQtXFxkXFxkJC8gLy8gbW9kZWxsZWQgb3IgYXZlcmFnZSB3ZWF0aGVyIE1NLUREIGZvciBkYWlseSB0aW1lc3RlcFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2RlbCkge1xuICB2YWxpZGF0ZVBsYW50YXRpb24obW9kZWwpO1xuICB2YWxpZGF0ZU1hbmFnZShtb2RlbCk7XG4gIHZhbGlkYXRlV2VhdGhlcihtb2RlbCk7XG4gIHZhbGlkYXRlU29pbChtb2RlbCk7XG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZU1hbmFnZShtb2RlbCkge1xuICBpZiggIW1vZGVsLm1hbmFnZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydtYW5hZ2UgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuXG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLm1hbmFnZSwgbW9kZWwubWFuYWdlLCAnbWFuYWdlJyk7XG5cbiAgaWYoIG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXMgKSB7XG4gICAgaWYoICFBcnJheS5pc0FycmF5KG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXMpICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnbWFuYWdlLmNvcHBpY2VEYXRlcyBzaG91bGQgYmUgYW4gYXJyYXkgb2YgZGF0ZSBzdHJpbmdzLic7XG4gICAgfVxuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXNbaV0ubWF0Y2goJ15cXGRcXGRcXGRcXGQtXFxkXFxkJCcpIHx8IG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXNbaV0ubWF0Y2goJ15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCQnKSApIHtcbiAgICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIGludmFsaWQgbWFuYWdlLmNvcHBpY2VEYXRlcyBmb3JtYXQgJyttb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldKycuIHNob3VsZCBiZSBZWVlZLU1NIGZvcm1hdC4nO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcblxuICAgIGlmKCBtb2RlbC5tYW5hZ2UuZGF0ZUNvcHBpY2VkID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKycgbWFuYWdlLmRhdGVDb3BwaWNlZCByZXF1aXJlZCBpZiBtYW5hZ2UuY29wcGljZURhdGVzIG5vdCBwcm92aWRlZCc7XG4gICAgfVxuICAgIGlmKCBtb2RlbC5tYW5hZ2UueWVhcnNQZXJDb3BwaWNlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKycgbWFuYWdlLnllYXJzUGVyQ29wcGljZSByZXF1aXJlZCBpZiBtYW5hZ2UuY29wcGljZURhdGVzIG5vdCBwcm92aWRlZCc7XG4gICAgfVxuXG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVXZWF0aGVyKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwud2VhdGhlciApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydObyB3ZWF0aGVyIGRlZmluZWQnO1xuICB9XG5cbiAgZm9yKCB2YXIga2V5IGluIG1vZGVsLndlYXRoZXIgKSB7XG4gICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWxpZFdlYXRoZXJLZXlzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGtleS5tYXRjaCh2YWxpZFdlYXRoZXJLZXlzW2ldKSApIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggIWZvdW5kICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIGludmFsaWQgd2VhdGhlciBrZXk6ICcra2V5O1xuICAgIH1cblxuICAgIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLndlYXRoZXIsIG1vZGVsLndlYXRoZXJba2V5XSwgJ3dlYXRoZXInKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlU29pbChtb2RlbCkge1xuICBpZiggIW1vZGVsLnNvaWwgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnc29pbCBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG5cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwuc29pbCwgbW9kZWwuc29pbCwgJ3NvaWwnKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVQbGFudGF0aW9uKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwucGxhbnRhdGlvbiApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwucGxhbnRhdGlvbiwgbW9kZWwucGxhbnRhdGlvbiwgJ3BsYW50YXRpb24nKTtcblxuICBpZiggIW1vZGVsLnBsYW50YXRpb24uc2VlZGxpbmdUcmVlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24uc2VlZGxpbmdUcmVlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwudHJlZSwgbW9kZWwucGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUsICdwbGFudGF0aW9uLnNlZWRsaW5nVHJlZScpO1xuXG4gIGlmKCAhbW9kZWwucGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC50cmVlLCBtb2RlbC5wbGFudGF0aW9uLmNvcHBpY2VkVHJlZSwgJ3BsYW50YXRpb24uY29wcGljZWRUcmVlJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLCBtb2RlbCwgbmFtZSkge1xuICB2YXIga2V5LCBpdGVtO1xuXG4gIGZvcigga2V5IGluIGRhdGFNb2RlbC52YWx1ZSApIHtcbiAgICBpdGVtID0gZGF0YU1vZGVsLnZhbHVlW2tleV07XG4gICAgaWYoIGl0ZW0ucmVxdWlyZWQgPT09IGZhbHNlICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYoIG1vZGVsW2tleV0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrbmFtZSsnLicra2V5KycgaXMgbWlzc2luZyAnK1xuICAgICAgICAgICAgKGl0ZW0uZGVzY3JpcHRpb24gPyAnKCcraXRlbS5kZXNjcmlwdGlvbisnKScgOiAnJyk7XG4gICAgfVxuXG4gICAgaWYoIHR5cGVvZiBpdGVtLnZhbHVlID09PSAnb2JqZWN0JyApIHtcbiAgICAgIHZhbGlkYXRlTW9kZWwoaXRlbSwgbW9kZWxba2V5XSwgbmFtZSsnLicra2V5KTtcbiAgICB9XG4gIH1cbn1cbiIsInZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dvb2dsZURyaXZlJyk7XG52YXIgZXhwb3J0VG9Dc3YgPSByZXF1aXJlKCcuL2dvb2dsZURyaXZlL2V4cG9ydFRvQ3N2Jyk7XG52YXIgb2ZmbGluZSA9IHJlcXVpcmUoJy4vb2ZmbGluZScpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgcmF3T3V0cHV0ID0gcmVxdWlyZSgnLi9vdXRwdXQvcmF3Jyk7XG52YXIgd2VhdGhlciA9IHJlcXVpcmUoJy4vd2VhdGhlcicpO1xudmFyIHdlYXRoZXJDaGFydCA9IHJlcXVpcmUoJy4vd2VhdGhlci9jaGFydCcpO1xudmFyIGZsYXNoYmxvY2tEZXRlY3RvciA9IHJlcXVpcmUoJy4vZmxhc2hibG9jay1kZXRlY3RvcicpO1xudmFyIGlucHV0Rm9ybSA9IHJlcXVpcmUoJy4vaW5wdXRGb3JtJyk7XG52YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcblxuLy8gaW1wb3J0IDNwZyBtb2RlbFxudmFyIG1vZGVsID0gcmVxdWlyZSgnLi4vLi4vcG9wbGFyLTNwZy1tb2RlbCcpO1xuXG4vLyB3aXJlIGluIGFwcCBoYW5kbGVycyB0byBtb2RlbFxudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuL21vZGVsUnVuSGFuZGxlcicpO1xubW9kZWwuc2V0SU8obW9kZWxJTyk7XG5cbnZhciBydW5DYWxsYmFjaywgd2VhdGhlckN1c3RvbUNoYXJ0O1xuXG5cbi8vIHJvdyByYXcgZGF0YSBkb2VzIGEgbG90IG9mIHByb2Nlc3Npbmcgb2YgdGhlIHJlc3VsdHMgYW5kIHRoZSBjdXJyZW50IHN0YXRlIG9mIHdoYXQnc1xuLy8gYmVpbmcgZGlzcGxheWVkLiAgR28gYWhlYWQgYW4gc2V0dXAgdGhlIGNzdiBkYXRhIGF0IHRoaXMgcG9pbnQsIHRoZW4gaWYgdGhlIHVzZXJcbi8vIGRlY2lkZXMgdG8gZXhwb3J0LCB3ZSBhcmUgYWxsIHNldCB0byB0bztcbnZhciBjc3ZSZXN1bHRzID0gbnVsbDtcbnZhciBjdXJyZW50UmVzdWx0cyA9IG51bGw7XG5cblxudmFyIGluaXQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAvLyB0aGVzZSB3ZSBkb24ndCB3YW50IHRvIHNldHVwIHVudGlsIGRvbSBpcyByZWFkeVxuICBpbnB1dEZvcm0gPSBpbnB1dEZvcm0odGhpcyk7XG5cbiAgY2hhcnRzLnNldEFwcCh0aGlzKTtcbiAgZ2RyaXZlLnNldEFwcCh0aGlzKTtcblxuICBtb2RlbElPLmFwcCA9IHRoaXM7XG4gIG1vZGVsSU8ubW9kZWwgPSBtb2RlbDtcbiAgbW9kZWxJTy5jaGFydHMgPSBjaGFydHM7XG4gIG1vZGVsSU8uaW5wdXRGb3JtID0gaW5wdXRGb3JtO1xuXG4gIC8vIGNoZWNrIGlmIGZsYXNoIGlzIGluc3RhbGxlZC4gIElmIG5vdCwgaGlkZSB0aGUgY2hhcnQgdHlwZSB0b2dnbGUuXG4gIGZsYXNoYmxvY2tEZXRlY3RvcihmdW5jdGlvbih2YWwpe1xuICAgICAgaWYoIHZhbCA+IDAgKSAkKFwiI2NoYXJ0LXR5cGUtYnRuLWdyb3VwXCIpLmhpZGUoKTtcbiAgfSk7XG5cbiAgcmF3T3V0cHV0LmluaXQodGhpcyk7XG5cbiAgLy8gc2V0dXAgZXhwb3J0IG1vZGFsXG4gIGV4cG9ydFRvQ3N2LmluaXQoKTtcbiAgJChcIiNleHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBvcnRUb0Nzdi5ydW4oY3N2UmVzdWx0cyk7XG4gIH0pO1xuXG4gIHZhciBlbGUgPSAkKFwiI2lucHV0cy1jb250ZW50XCIpO1xuICBpbnB1dEZvcm0uY3JlYXRlKGVsZSk7XG5cbiAgJChcIiNydW5idG4sICNydW5idG4tc21cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHRoZSBjaGFydHNcbiAgY2hhcnRzLmluaXQoKTtcblxuICAvLyBzZXQgZGVmYXVsdCBjb25maWdcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjIqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoxMCozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcblxuICAvLyBzZXR1cCBuaWNlIHNjcm9sbGluZ1xuICAkKCcuYXBwLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcy5oYXNoKS5vZmZzZXQoKS50b3AtNTVcbiAgICAgICB9LCA3MDApO1xuICB9KTtcblxuICAvLyBtYWtlIHN1cmUgZXZlcnl0aGluZyBmaXRzIHRvIHNjcmVlblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICBjaGFydHMucmVzaXplKCk7XG5cbiAgICAgIGlmKCB3ZWF0aGVyQ3VzdG9tQ2hhcnQgKSB7XG4gICAgICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICAgICAgfVxuICB9KTtcblxuICBjYWxsYmFjaygpO1xufTtcblxudmFyIGdldE1vZGVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBtb2RlbDtcbn07XG5cbnZhciBnZXRPdXRwdXRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBvdXRwdXRzO1xufTtcblxudmFyIHJ1bkNvbXBsZXRlID0gZnVuY3Rpb24ocm93cykge1xuICBpZiAoIHJ1bkNhbGxiYWNrICkgcnVuQ2FsbGJhY2socm93cyk7XG4gIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgcnVuQ2FsbGJhY2sgPSBudWxsO1xufTtcbm1vZGVsSU8uZHVtcCA9IHJ1bkNvbXBsZXRlO1xuXG52YXIgZGF5c1RvUnVuID0gZnVuY3Rpb24oZGF5c19pbl9pbnRlcnZhbCkge1xuICB2YXIgZDEgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcbiAgaWYgKGQxICYmIGQxICE9PSBcIlwiKSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQxID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBkMiA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCk7XG4gIGlmIChkMiAmJiBkMiAhPT0gXCJcIikge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQyID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBvbmVEYXkgPSAyNCo2MCo2MCoxMDAwO1xuICB2YXIgZGF5cyA9IE1hdGgucm91bmQoTWF0aC5hYnMoKGQxLmdldFRpbWUoKSAtIGQyLmdldFRpbWUoKSkvKG9uZURheSkpKTtcbiAgZGF5cyA9IGRheXMgPD0gMCA/IDEgOiBkYXlzO1xuXG4gIHJldHVybiBkYXlzIC8gZGF5c19pbl9pbnRlcnZhbDtcbn07XG5cblxudmFyIHJ1bk1vZGVsID0gZnVuY3Rpb24oaXNSdCkge1xuXG4gIGlmICgkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5oYXNDbGFzcyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIlJ1bm5pbmcuLi5cIik7XG5cbiAgaWYoICF3ZWF0aGVyLmNoZWNrKG1vZGVsKSApIHJldHVybjtcblxuICAvLyBsZXQgVUkgcHJvY2VzcyBmb3IgYSBzZWMgYmVmb3JlIHdlIHRhbmsgaXRcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgYmUgcHJlZm9ybWVkIHcvIGEgd2Vid29ya2VyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4nLCAxKTtcblxuICAgICAgLy8gcmVhZCBldmVyeXRoaW5nIHNvIHRoZSB2YXJpYXRpb25zIGFyZSBzZXRcbiAgICAgIG1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIG1vZGVsSU8ucmVhZEZyb21JbnB1dHMoKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBvbmx5IHNldHRpbmcgMiB2YXJpYXRpb24gcGFyYW1ldGVyc1xuICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLnZhcmlhdGlvbnMgKSBwYXJhbXMucHVzaChrZXkpO1xuICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgaXMgYSBsaW1pdCBvZiAyIHZhcmlhdGlvbiBwYXJhbWV0ZXJzIHBlciBydW4uICBDdXJyZW50bHkgeW91IGFyZSB2YXJ5aW5nIFwiK1xuICAgICAgICAgICAgICAgIFwidGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxcblxcbiAtXCIrcGFyYW1zLmpvaW4oXCJcXG4gLVwiKSk7XG4gICAgICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBsZXQgdGhlIHdvcmxkIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICAgIGlmKCAhaXNSdCApIGdkcml2ZS5ydW5Nb2RlbFJ0KCk7XG5cbiAgICAgIC8vIHNob3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICAgICQoXCIjdmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIikuaHRtbChcIjxiPlwiKyhwYXJhbXMubGVuZ3RoID09IDAgPyBcIk5vbmVcIiA6IHBhcmFtcy5qb2luKFwiLCBcIikpK1wiPC9iPlwiKTtcblxuICAgICAgLy8gd2UgYXJlIG9ubHkgcnVubmluZyBvbmNlXG4gICAgICBpZiAoIHBhcmFtcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXNpbmdsZVBhcmFtJywgMSk7XG5cbiAgICAgICAgICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgICAgICAgICAgICAgc2hvd1Jlc3VsdHMocm93cyk7XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgdmFyIGRheXMgPSBkYXlzVG9SdW4obW9kZWwuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9kZWwucnVuKGRheXMpO1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgICAgICBhbGVydChlKTtcbiAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIH1cblxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi12YXJpYXRpb24nLCAxKTtcblxuICAgICAgICAgIC8vIHNldCB2YXJpYXRpb24gb3JkZXJcbiAgICAgICAgICB2YXIgcnVucyA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgICAgICAgICBvdXRwdXQgOiBudWxsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIG9iai5pbnB1dHNbcGFyYW1zWzBdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXVtpXTtcbiAgICAgICAgICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICB0LmlucHV0c1twYXJhbXNbMV1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaCh0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcnVuVmFyaWF0aW9uKDAsIHJ1bnMpO1xuICAgICAgfVxuICB9LCAyNTApO1xufTtcblxuLy8gcnVuIGEgc2luZ2xlIHZhcmlhdGlvbiwgd2hlbiBtdWx0aXBsZSBpbnB1dHMgZm9yIGEgc2luZ2xlIHBhcmFtZXRlciBoYXZlXG4vLyBiZWVuIGdpdmVuXG52YXIgcnVuVmFyaWF0aW9uID0gZnVuY3Rpb24oaW5kZXgsIHJ1bnMpIHtcblxuICAvLyBzZXQgaW5wdXQgdmFyaWFibGVzIGZvciBydW5cbiAgdmFyIHJ1biA9IHJ1bnNbaW5kZXhdO1xuICBmb3IoIHZhciBrZXkgaW4gcnVuLmlucHV0cyApIHtcbiAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwocnVuLmlucHV0c1trZXldKTtcbiAgfVxuXG4gIHJ1bkNhbGxiYWNrID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcnVuc1tpbmRleF0ub3V0cHV0ID0gZGF0YTtcbiAgICAgIGluZGV4Kys7XG5cblxuICAgICAgaWYgKHJ1bnMubGVuZ3RoID09IGluZGV4KSB7XG4gICAgICAgICAgLy8gcmVzZXQgdGhlIGNvbnN0YW50IHRvIHRoZSBmaXJzdCB2YWx1ZVxuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKG1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93UmVzdWx0cyhydW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnVuVmFyaWF0aW9uKGluZGV4LCBydW5zKTtcbiAgICAgIH1cbiAgfTtcblxuICAvLyBIQUNLOiB3aGVuIHNob3VsZCB3ZSBsb29rIHRoaXMgdXA/XG4gIHZhciBkYXlzID0gZGF5c1RvUnVuKHBhcnNlRmxvYXQoJCgnI2lucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWwnKS52YWwoKSkpO1xuXG4gIHRyeSB7XG4gICAgbW9kZWwucnVuKGRheXMpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBhbGVydChlKTtcbiAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgfVxufTtcblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgaWYoIHJlc3VsdFswXSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgY3VycmVudFJlc3VsdHMgPSBbe1xuICAgICAgICAgIHNpbmdsZVJ1biA6IHRydWUsXG4gICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgb3V0cHV0IDogcmVzdWx0XG4gICAgICB9XTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50UmVzdWx0cyA9IHJlc3VsdDtcbiAgfVxuXG4gIC8vIHRyYW5zcG9zZSBhbGwgcmVzdWx0cyB0byBoYXNoIGJ5IGRhdGVcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjdXJyZW50UmVzdWx0cy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgZGF0ZUhhc2ggPSB7fTtcbiAgICB2YXIgciA9IGN1cnJlbnRSZXN1bHRzW2ldO1xuXG4gICAgci50b3RhbFN0ZXBzID0gci5vdXRwdXQubGVuZ3RoO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgci5vdXRwdXQubGVuZ3RoOyBqKysgKSB7XG4gICAgICBkYXRlSGFzaFtyLm91dHB1dFtqXVswXV0gPSByLm91dHB1dFtqXTtcbiAgICB9XG4gICAgci5oZWFkZXIgPSByLm91dHB1dFswXTtcbiAgICByLm91dHB1dCA9IGRhdGVIYXNoO1xuICB9XG5cbiAgLy8gc29ydCBieSBtb3N0IHRvIGxlYXN0IHN0ZXBzXG4gIGN1cnJlbnRSZXN1bHRzLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgaWYoIGEudG90YWxTdGVwcyA+IGIudG90YWxTdGVwcyApIHJldHVybiAtMTtcbiAgICBpZiggYS50b3RhbFN0ZXBzIDwgYi50b3RhbFN0ZXBzICkgcmV0dXJuIDE7XG4gICAgcmV0dXJuIDA7XG4gIH0pO1xuXG4gIHVwZGF0ZVVpKCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICB9LCAyNTApO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlVWkoKSB7XG4gIGlmKCAhY3VycmVudFJlc3VsdHMgKSByZXR1cm47XG5cbiAgcmF3T3V0cHV0LnNob3coY3VycmVudFJlc3VsdHMpOyAvLyB0aGlzIHVwZGF0ZXMgY3N2UmVzdWx0c1xuICBjaGFydHMudXBkYXRlQ2hhcnRzKGNzdlJlc3VsdHMsIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIGdvb2dsZURyaXZlIDogZ2RyaXZlLFxuICBnZXRNb2RlbCA6IGdldE1vZGVsLFxuICBydW5Nb2RlbCA6IHJ1bk1vZGVsLFxuICB1cGRhdGVVaSA6IHVwZGF0ZVVpLFxuICBkYXlzVG9SdW4gOiBkYXlzVG9SdW4sXG4gIC8vIHRoZSByYXcgbW9kdWxlIGFjdHVhbGx5IGNyZWF0ZXMgdGhpcyBzZXR1cFxuICBzZXRDc3ZSZXN1bHRzIDogZnVuY3Rpb24oY3N2KSB7XG4gICAgY3N2UmVzdWx0cyA9IGNzdjtcbiAgfSxcbiAgZ2V0Q3N2UmVzdWx0cyA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjc3ZSZXN1bHRzO1xuICB9LFxuICBxcyA6IHV0aWxzLnFzLFxuICBnZXRNb2RlbElPIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZGVsSU87XG4gIH1cbn07XG4iLCJ2YXIgb3V0cHV0RGVmaW5pdGlvbnMgPSByZXF1aXJlKCcuL291dHB1dC9kZWZpbml0aW9ucycpO1xudmFyIHJhdyA9IHJlcXVpcmUoJy4vb3V0cHV0L3JhdycpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgYXBwO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG52YXIgY1dpZHRoID0gMDtcblxudmFyIGNoYXJ0cyA9IFtdO1xuXG4vLyB0aGVyZSBpcyBubyB3YXkgdG8gZ2V0IHRoZSBjb2xvcnMgZm9yIHRoZSBsZWdlbmRzICh0byBtYWtlIHlvdXIgb3duKVxuLy8gdGhpcyBwb3N0OlxuLy8gZ2l2ZXMgdGhlc2UgdmFsdWVzLiAgVGhpcyBpcyBhIEhBQ0ssIGlmIHRoZXkgZXZlciBjaGFuZ2UsIHdlIG5lZWQgdG8gdXBkYXRlXG52YXIgZ29vZ2xlQ2hhcnRDb2xvcnMgPSBbXCIjMzM2NmNjXCIsXCIjZGMzOTEyXCIsXCIjZmY5OTAwXCIsXCIjMTA5NjE4XCIsXCIjOTkwMDk5XCIsXCIjMDA5OWM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjZGQ0NDc3XCIsXCIjNjZhYTAwXCIsXCIjYjgyZTJlXCIsXCIjMzE2Mzk1XCIsXCIjOTk0NDk5XCIsXCIjMjJhYTk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjYWFhYTExXCIsXCIjNjYzM2NjXCIsXCIjZTY3MzAwXCIsXCIjOGIwNzA3XCIsXCIjNjUxMDY3XCIsXCIjMzI5MjYyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjNTU3NGE2XCIsXCIjM2IzZWFjXCIsXCIjYjc3MzIyXCIsXCIjMTZkNjIwXCIsXCIjYjkxMzgzXCIsXCIjZjQzNTllXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjOWM1OTM1XCIsXCIjYTljNDEzXCIsXCIjMmE3NzhkXCIsXCIjNjY4ZDFjXCIsXCIjYmVhNDEzXCIsXCIjMGM1OTIyXCJcbiAgICAgICAgICAgICAgICAgICAgICAsXCIjNzQzNDExXCJdO1xuXG4vLyB0ZW1wbGF0ZSBmb3IgdGhlIHBvcHVwXG52YXIgc2xpZGVyUG9wdXAgPSAkKFxuICAgICAgXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cCc+XCIgK1xuICAgICAgICAgIFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlLWNpcmNsZSBwdWxsLXJpZ2h0IHNsaWRlLXBvcHVwLWNsb3NlJz48L2k+XCIrXG4gICAgICAgICAgXCI8ZGl2IGlkPSdjYXJvdXNlbCcgY2xhc3M9J293bC1jYXJvdXNlbCBvd2wtdGhlbWUnIHN0eWxlPSdtYXJnaW4tdG9wOjE1cHgnPjwvZGl2PlwiICtcblx0XCI8L2Rpdj5cIik7XG5cbnZhciBzbGlkZXJQb3B1cEJnID0gJChcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwLWJnJz4mbmJzcDs8L2Rpdj5cIik7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgc29tZW9uZSBoYXMgY2xpY2sgYSBjaGVja2JveFxudmFyIGNoYW5nZXMgPSBmYWxzZTtcblxuLy8gd2hlbiBzaXppbmcsIHdhaXQgYSB+MzAwbXMgYmVmb3JlIHRyaWdnZXJpbmcgcmVkcmF3XG52YXIgcmVzaXplVGltZXIgPSAtMTtcblxudmFyIGNoYXJ0VHlwZVNlbGVjdG9yLCBjaGFydENoZWNrYm94ZXMsIGNEYXRhO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgIHNob3dQb3B1cCgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBjaGFydCBzZWxlY3RvcnNcbiAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuXG4gIC8vIHNldCBwb3B1cCBjbGljayBoYW5kbGVyc1xuICAkKFwiI2NoYXJ0VHlwZS1zZWxlY3RBbGxcIikub24oJ2NsaWNrJyxzZWxlY3RBbGwpO1xuICAkKFwiI2NoYXJ0VHlwZS11bnNlbGVjdEFsbFwiKS5vbignY2xpY2snLHVuc2VsZWN0QWxsKTtcblxuICBjaGFydFR5cGVTZWxlY3RvciA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcyA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zXCIpO1xuXG4gIHZhciBjMSA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMxXCIpO1xuICB2YXIgYzIgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMlwiKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb25maWcub3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbCA9IGNvbmZpZy5vdXRwdXRzW2ldO1xuICAgICAgY2hhcnRUeXBlU2VsZWN0b3IuYXBwZW5kKCQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbCArIFwiJyBcIlxuICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdzZWxlY3RlZCcgOiAnJylcbiAgICAgICAgICAgICAgKyBcIj5cIiArIHZhbCArIFwiPC9vcHRpb24+XCIpKTtcblxuICAgICAgaWYoIGkgJSAyID09IDAgKSB7XG4gICAgICAgICAgYzEuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMyLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfVxuICB9XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCIuZm4tdG9nZ2xlXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjXCIrJCh0aGlzKS5hdHRyKFwiZGF0YXRhcmdldFwiKSkudG9nZ2xlKCdzbG93Jyk7XG4gIH0pO1xuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpICkgc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgICAgIGVsc2UgdW5zZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICB9KTtcblxuICAkKFwiI3NlbGVjdC1jaGFydHMtYnRuLCAjc2VsZWN0LWNoYXJ0cy10aXRsZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICAgIGNoYW5nZXMgPSBmYWxzZTtcbiAgfSk7XG5cbiAgJChcIi5jaGFydC1tb2RhbC1jbG9zZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgaWYoIGNoYW5nZXMgJiYgY0RhdGEgKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgYXBwLnVwZGF0ZVVpKCk7XG4gICAgICAgICAgfSw0MDApO1xuXG4gICAgICB9XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtdHlwZS10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcbiAgICAgICAgICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgfVxuICB9KTtcbn1cblxuLy8gbWFrZSBzdXJlIGFuZCBlbmQgbGFiZWwgdGFnXG5mdW5jdGlvbiBfY3JlYXRlRGVzY3JpcHRpb24odmFsKSB7XG4gIGlmKCAhb3V0cHV0RGVmaW5pdGlvbnNbdmFsXSApIHJldHVybiBcIjxiPlwiK3ZhbCtcIjwvYj48L2xhYmVsPlwiO1xuXG4gIHZhciBkZXNjID0gb3V0cHV0RGVmaW5pdGlvbnNbdmFsXTtcbiAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcblxuICB2YXIgbGFiZWwgPSBcIjxiPlwiK3ZhbCtcIjwvYj48c3BhbiBzdHlsZT0nZm9udC1zaXplOjEycHgnPlwiK2xhYmVsK3VuaXRzK1wiPC9zcGFuPjwvbGFiZWw+XCI7XG4gIHZhciBoYXNEZXNjID0gZGVzYy5kZXNjcmlwdGlvbiAmJiBkZXNjLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gIGlmKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweDtjb2xvcjojODg4O2ZvbnQtc3R5bGU6aXRhbGljJz5cIitkZXNjLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgdmFyIGZOYW1lID0gZGVzYy5hbHRGbk5hbWUgfHwgdmFsO1xuICB2YXIgZm4gPSBhcHAuZ2V0TW9kZWwoKS5nZXRGdW5jdGlvbihmTmFtZSk7XG5cbiAgaWYoIGZuIHx8IGRlc2MuZm4gKSB7XG4gICAgICBpZiggIWhhc0Rlc2MgKSBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4Jz5cIjtcbiAgICAgIGxhYmVsICs9IFwiIDxhIHN0eWxlPSdmb250LXN0eWxlOm5vcm1hbDtjdXJzb3I6cG9pbnRlcicgZGF0YXRhcmdldD0nZm4tZGVzYy1cIit2YWwrXCInIGNsYXNzPSdmbi10b2dnbGUnPmZuKCk8L2E+PC9kaXY+XCI7XG5cbiAgICAgIGxhYmVsICs9IFwiPGRpdiBpZD0nZm4tZGVzYy1cIit2YWwrXCInIHN0eWxlPSdkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7b3ZlcmZsb3c6YXV0bycgY2xhc3M9J3dlbGwgd2VsbC1zbSc+XCIrXG4gICAgICAgICAgICAgICAgICAoZm58fGRlc2MuZm4pLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCcmbmJzcDsnKS5yZXBsYWNlKC9cXG4vZywnPGJyIC8+JykrXCI8L2Rpdj5cIjtcbiAgfSBlbHNlIGlmICggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPC9kaXY+XCI7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIjtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikuYXR0cihcInNlbGVjdGVkXCIsXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsdHJ1ZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsZmFsc2UpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSBzZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb25maWcub3V0cHV0cy5sZW5ndGg7IGkrKykgdW5zZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlKSB7XG4gIGVsZS5wYXJlbnQoKS5oaWRlKCdzbG93JywgZnVuY3Rpb24oKXtcbiAgICAgIGVsZS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHVuc2VsZWN0KGVsZS5hdHRyKCd0eXBlJykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmludChjaGFydENvbnRhaW5lcikge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdwcmludC1jaGFydCcsIDEpO1xuXG5cbnZhciBkaXNwX3NldHRpbmc9XCJ0b29sYmFyPXllcyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz15ZXMsbWVudWJhcj15ZXMsXCI7XG4gIGRpc3Bfc2V0dGluZys9XCJzY3JvbGxiYXJzPXllcyx3aWR0aD04MDAsIGhlaWdodD02MDAsIGxlZnQ9MjUsIHRvcD0yNVwiO1xuXG4gIHZhciBzdmcgPSBjaGFydENvbnRhaW5lci5maW5kKFwic3ZnXCIpO1xuICB2YXIgaHRtbCA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJkaXZcIikuaHRtbCgpO1xuXG4gIHZhciBkb2NwcmludD13aW5kb3cub3BlbihcIlwiLFwiXCIsZGlzcF9zZXR0aW5nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2hlYWQ+PGJvZHkgbWFyZ2lud2lkdGg9XCIwXCIgbWFyZ2luaGVpZ2h0PVwiMFwiIG9uTG9hZD1cInNlbGYucHJpbnQoKVwiPjxjZW50ZXI+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKGh0bWwpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9jZW50ZXI+PC9ib2R5PjwvaHRtbD4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQuY2xvc2UoKTtcbiAgZG9jcHJpbnQuZm9jdXMoKTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICBjRGF0YSA9IGRhdGE7XG59XG5cbi8vIGJhc2ljYWxseSByZWRyYXcgZXZlcnl0aGluZ1xuZnVuY3Rpb24gcmVzaXplKCkge1xuICAvLyByZXF1aXJlIG1vcmUgdGhhbiBhIDMwIHBpeGVsIHdpZHRoIGNoYW5nZSAoc28gd2UgZG9uJ3QgcmVkcmF3IHcvIHNjcm9sbCBiYXJzIGFkZGVkKVxuICB2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYoIGNXaWR0aCA+IHdpbldpZHRoIC0gMTUgJiYgY1dpZHRoIDwgd2luV2lkdGggKyAxNSApIHJldHVybjtcbiAgY1dpZHRoID0gd2luV2lkdGg7XG5cbiAgaWYoIHJlc2l6ZVRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmVzaXplVGltZXIgPSAtMTtcblxuICAgICAgcmVkcmF3Q2hhcnRzKCk7XG4gIH0sMzAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hhcnRzKHJlc3VsdHMsIGFuaW1hdGUpIHtcbiAgaWYoIHJlc3VsdHMgKSBzZXREYXRhKHJlc3VsdHMpO1xuICBpZiggIWNEYXRhICkgcmV0dXJuO1xuXG4gIGNoYXJ0cyA9IFtdO1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikuc2hvdygpO1xuXG4gIC8vIGNyZWF0ZSBhIGxlZ2VuZCBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHJ1blxuICB2YXIgbGVnZW5kID0gXCJcIjtcbiAgaWYoIGNEYXRhLmlucHV0cy5sZW5ndGggPiAxICkge1xuICAgICAgdmFyIGMxID0gXCJcIjtcbiAgICAgIHZhciBjMiA9IFwiXCI7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmlucHV0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgZWxlID0gXCI8ZGl2IHN0eWxlPSdtaW4taGVpZ2h0OjQwcHg7bWFyZ2luLWJvdHRvbToxMHB4Jz48ZGl2IGNsYXNzPSdsZWdlbmQtc3F1YXJlJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpcIitnb29nbGVDaGFydENvbG9yc1tpXStcIic+Jm5ic3A7PC9kaXY+XCI7XG4gICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gY0RhdGEuaW5wdXRzW2ldICkge1xuICAgICAgICAgICAgICBlbGUgKz0gXCI8ZGl2IGNsYXNzPSdsZWdlbmQtdGV4dCc+XCIrbVR5cGUrXCI9XCIrY0RhdGEuaW5wdXRzW2ldW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpICUgMiA9PSAwICkgYzEgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgICAgIGVsc2UgYzIgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgfVxuICAgICAgbGVnZW5kID0gXCI8ZGl2PjxhIGlkPSdsZWdlbmQtcGFuZWwtdG9nZ2xlJyBzdHlsZT0nbWFyZ2luLWxlZnQ6NXB4O2N1cnNvcjpwb2ludGVyJz5MZWdlbmQ8L2E+PC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZy1ib3R0b206NXB4O21hcmdpbi1ib3R0b206MTVweCc+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3JvdycgaWQ9J2xlZ2VuZC1wYW5lbCc+PGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MxK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMitcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8L2Rpdj48L2Rpdj5cIjtcbiAgfVxuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuaHRtbChsZWdlbmQpO1xuICAkKFwiI2xlZ2VuZC1wYW5lbC10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjbGVnZW5kLXBhbmVsXCIpLnRvZ2dsZShcInNsb3dcIik7XG4gIH0pO1xuXG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd01haW5DaGFydCh0eXBlc1tpXSwgYW5pbWF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzaG93LWNoYXJ0LXBvcHVwJywgMSk7XG5cblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5odG1sKFwiXCIpO1xuICAkKCdib2R5Jykuc2Nyb2xsVG9wKDApLmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKS5hcHBlbmQoc2xpZGVyUG9wdXBCZykuYXBwZW5kKHNsaWRlclBvcHVwKTtcblxuICAvLyB0aGlzIGNvdWxkIGNhc2UgYmFkbmVzcy4uLi4gIHdoeSBkb2Vzbid0IGl0IGxpdmUgd2hlbiByZW1vdmVkIGZyb20gRE9NP1xuICBzbGlkZXJQb3B1cC5maW5kKCcuc2xpZGUtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICBoaWRlUG9wdXAoKTtcbiAgfSk7XG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd1BvcHVwQ2hhcnQodHlwZXNbaV0pO1xuICB9XG5cbiAgJCgnI2Nhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgbmF2aWdhdGlvbiA6IHRydWUsIC8vIFNob3cgbmV4dCBhbmQgcHJldiBidXR0b25zXG4gICAgICBzbGlkZVNwZWVkIDogMzAwLFxuICAgICAgcGFnaW5hdGlvblNwZWVkIDogNDAwLFxuICAgICAgc2luZ2xlSXRlbTp0cnVlXG4gIH0pO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICByZWRyYXdDaGFydHMoKTtcbiAgfSwgMjAwKTtcbn1cblxuZnVuY3Rpb24gaGlkZVBvcHVwKCkge1xuICBzbGlkZXJQb3B1cEJnLnJlbW92ZSgpO1xuICBzbGlkZXJQb3B1cC5yZW1vdmUoKTtcbiAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCdhdXRvJyk7XG59XG5cbmZ1bmN0aW9uIF9zaG93TWFpbkNoYXJ0KHR5cGUsIGFuaW1hdGUpIHtcbiAgdmFyIGNoYXJ0VHlwZSA9ICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLmF0dHIoXCJ2YWx1ZVwiKTtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgLz5cIik7XG4gIHZhciBvdXRlclBhbmVsID0gJChcIjxkaXYgc3R5bGU9J21hcmdpbi1ib3R0b206IDI1cHgnPlwiK1xuICBcdFwiPGEgY2xhc3M9J2J0biBidG4teHMgYnRuLWRlZmF1bHQnIHN0eWxlPSdcIisoY2hhcnRUeXBlICE9IFwidGltZWxpbmVcIiA/IFwicG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDttYXJnaW46MCAwIC0yMHB4IDIwcHhcIiA6IFwibWFyZ2luLWJvdHRvbTo1cHhcIikrXG4gICAgICBcIicgdHlwZT0nXCIrdHlwZStcIic+XCIgK1xuICBcdFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlJz48L2k+IFwiK3R5cGUrXCI8L2E+PC9kaXY+XCIpO1xuICBvdXRlclBhbmVsLmZpbmQoXCJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmVtb3ZlKCQodGhpcykpO1xuICB9KTtcbiAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSBvdXRlclBhbmVsLmNzcyhcIm1hcmdpbi1ib3R0b21cIixcIjIwcHhcIik7XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5hcHBlbmQob3V0ZXJQYW5lbC5hcHBlbmQocGFuZWwpKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIGZhbHNlLCBudWxsLCBhbmltYXRlKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dQb3B1cENoYXJ0KHR5cGUpIHtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2l0ZW0nPjwvZGl2PlwiKTtcblxuICB2YXIgcHJpbnRCdG4gPSAkKFwiPGEgY2xhc3M9J2J0biBidG4tc20gYnRuLWRlZmF1bHQnIHN0eWxlPSdtYXJnaW4tbGVmdDoxNnB4Jz48aSBjbGFzcz0naWNvbi1wcmludCc+PC9pPiBQcmludDwvYT5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICBwcmludChjaGFydFBhbmVsKTtcbiAgfSk7XG4gIHBhbmVsLmFwcGVuZChwcmludEJ0bik7XG5cbiAgdmFyIGNoYXJ0UGFuZWwgPSAkKFwiPGRpdj48L2Rpdj5cIik7XG4gIHBhbmVsLmFwcGVuZChjaGFydFBhbmVsKTtcblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5hcHBlbmQocGFuZWwpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgJ2xpbmUnLCBjaGFydFBhbmVsLCB0cnVlLCBbTWF0aC5yb3VuZCgkKHdpbmRvdykud2lkdGgoKSouODgpLCBNYXRoLnJvdW5kKCgkKHdpbmRvdykuaGVpZ2h0KCkqLjkwKS0xMjUpXSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBzaG93TGVnZW5kLCBzaXplLCBhbmltYXRlKSB7XG4gIHZhciBjb2wgPSAwO1xuXG4gIHZhciBkYXRhID0gY0RhdGEuZGF0YVt0eXBlXTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgdmFyIG5ld0RhdGEgPSBbJC5leHRlbmQodHJ1ZSxbXSwgZGF0YVswXSldO1xuXG4gICAgdmFyIGxlbiA9IGRhdGEubGVuZ3RoOyBsZW4yID0gZGF0YVswXS5sZW5ndGg7XG5cbiAgICBmb3IoIHZhciBpID0gMTsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgdmFyIHJvdyA9IFtdO1xuICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBsZW4yOyBqKysgKSB7XG4gICAgICAgIGlmKCBqID09PSAwICkge1xuICAgICAgICAgIHJvdy5wdXNoKG5ldyBEYXRlKGRhdGFbaV1bal0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbmV3RGF0YS5wdXNoKHJvdyk7XG4gICAgfVxuICAgIGRhdGEgPSBuZXdEYXRhO1xuXG4gIH1cblxuICAvLyBkbyB3ZSBuZWVkIHRvIGZha2Ugc29tZSBvZiB0aGUgZGF0YSB0byBmaXQ/ICBvciBza2lwIGJlY2F1c2Ugd2UgaGF2ZSB0b28gbXVjaD9cbiAgaWYoIGNvbmZpZy5zcHJlYWQuaW5kZXhPZih0eXBlKSA+IC0xICYmIGNEYXRhLmlucHV0cy5sZW5ndGggPiAwICYmIGNEYXRhLmlucHV0c1swXVsnc2V0dXAuZGF5c19pbl9pbnRlcnZhbCddICkge1xuICAgIHZhciBtYXhJbnRlcnZhbCA9IGNEYXRhLmlucHV0c1swXVsnc2V0dXAuZGF5c19pbl9pbnRlcnZhbCddO1xuXG4gICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjRGF0YS5pbnB1dHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgdCA9IGNEYXRhLmlucHV0c1tpXVsnc2V0dXAuZGF5c19pbl9pbnRlcnZhbCddO1xuICAgICAgaWYoIG1heEludGVydmFsIDwgdCApIG1heEludGVydmFsID0gdDtcbiAgICB9XG5cbiAgICB2YXIgYWRqdXN0bWVudCA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEuaW5wdXRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgYWRqdXN0bWVudC5wdXNoKG1heEludGVydmFsIC8gY0RhdGEuaW5wdXRzW2ldWydzZXR1cC5kYXlzX2luX2ludGVydmFsJ10pO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBkYXRhLmxlbmd0aCwgbGVuMiA9IGRhdGFbMF0ubGVuZ3RoLCByb3csIHVzZTtcbiAgICB2YXIgbmV3RGF0YSA9IFskLmV4dGVuZCh0cnVlLFtdLCBkYXRhWzBdKV07XG5cbiAgICBmb3IoIHZhciBpID0gMTsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgcm93ID0gW10sIHVzZSA9IHRydWU7XG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGxlbjI7IGorKyApIHtcbiAgICAgICAgaWYoIGRhdGFbaV1bal0gPT09IG51bGwgKSB7XG4gICAgICAgICAgdXNlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggaiA9PT0gMCApIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdICogYWRqdXN0bWVudFtqLTFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiggdXNlICkge1xuICAgICAgICBuZXdEYXRhLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhID0gbmV3RGF0YTtcbiAgfVxuXG4gIC8vIGxldHMgdHJ5IGFuZCBvcHRpbWl6ZVxuICAvKnZhciBvbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgaWYoIGRhdGEubGVuZ3RoID4gNTAwICkge1xuICAgIHZhciBoYXNOdWxscyA9IGZhbHNlO1xuICAgIGlmKCBjRGF0YS5pbnB1dHMubGVuZ3RoID4gMCAmJiBjRGF0YS5pbnB1dHNbMF1bJ3NldHVwLmRheXNfaW5faW50ZXJ2YWwnXSApIHtcbiAgICAgIGhhc051bGxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgYyA9IDA7XG4gICAgZm9yKCB2YXIgaSA9IGRhdGEubGVuZ3RoLTE7IGkgPiAwIDsgaS0tICkge1xuXG4gICAgICBpZiggaGFzTnVsbHMgKSB7XG5cbiAgICAgICAgdmFyIGlzTnVsbCA9IGZhbHNlO1xuICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGRhdGFbaV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgaWYoIGRhdGFbaV1bal0gPT09IG51bGwgKSB7XG4gICAgICAgICAgICBpc051bGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGlzTnVsbCApIHtcbiAgICAgICAgICBpZiggYyAlIDQgIT0gMCApIGRhdGEuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGMrKztcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiggYyAlIDQgIT0gMCApIGRhdGEuc3BsaWNlKGksIDEpO1xuICAgICAgICBjKys7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2codHlwZSsnICAnK29sZW5ndGgrJyAtPiAnK2RhdGEubGVuZ3RoKTsqL1xuXG4gIHZhciBkdCA9IGdvb2dsZS52aXN1YWxpemF0aW9uLmFycmF5VG9EYXRhVGFibGUoZGF0YSk7XG5cblxuICBpZiggb3V0cHV0RGVmaW5pdGlvbnNbdHlwZV0gKSB7XG4gICAgICB2YXIgZGVzYyA9IG91dHB1dERlZmluaXRpb25zW3R5cGVdO1xuICAgICAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICAgICAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG4gICAgICB0eXBlID0gdHlwZStsYWJlbCt1bml0cztcbiAgfVxuXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB2QXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IHR5cGVcbiAgICAgIH0sXG4gICAgICBoQXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IFwiXCJcbiAgICAgIH0sXG4gICAgICBpbnRlcnBvbGF0ZU51bGxzIDogdHJ1ZVxuICB9O1xuICBpZiggIXNob3dMZWdlbmQgKSBvcHRpb25zLmxlZ2VuZCA9IHtwb3NpdGlvbjpcIm5vbmVcIn07XG5cbiAgaWYoIHNpemUgKSB7XG4gICAgICAvL29wdGlvbnMud2lkdGggPSBzaXplWzBdO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBzaXplWzFdO1xuICB9IGVsc2Uge1xuICAgICAgLy9vcHRpb25zLndpZHRoID0gcGFuZWwud2lkdGgoKTtcbiAgICAgIC8vb3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLndpZHRoKi40O1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBwYW5lbC53aWR0aCgpKi40O1xuICB9XG4gIC8vcGFuZWwud2lkdGgob3B0aW9ucy53aWR0aCkuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcbiAgcGFuZWwuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcblxuICB2YXIgY2hhcnQ7XG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIG9wdGlvbnMuZGlzcGxheUFubm90YXRpb25zID0gdHJ1ZTtcbiAgICAgIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkFubm90YXRlZFRpbWVMaW5lKHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgICAgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICAgICAgLy9jaGFydCA9IG5ldyBnb29nbGUuY2hhcnRzLkxpbmUocGFuZWxbMF0pO1xuICAgICAgLy9jaGFydC5kcmF3KGR0LCBnb29nbGUuY2hhcnRzLkxpbmUuY29udmVydE9wdGlvbnMob3B0aW9ucykpO1xuICB9XG5cbiAgY2hhcnRzLnB1c2goe1xuICAgIGR0IDogZHQsXG4gICAgY2hhcnQgOiBjaGFydCxcbiAgICBvcHRpb25zIDogb3B0aW9uc1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVkcmF3Q2hhcnRzKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKyApIHtcbiAgICBjaGFydHNbaV0uY2hhcnQuZHJhdyhjaGFydHNbaV0uZHQsIGNoYXJ0c1tpXS5vcHRpb25zKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0QXBwIDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH0sXG4gICAgaW5pdCA6IGluaXQsXG4gICAgc2V0RGF0YSA6IHNldERhdGEsXG4gICAgc2VsZWN0IDogc2VsZWN0LFxuICAgIHVuc2VsZWN0IDogdW5zZWxlY3QsXG4gICAgc2VsZWN0QWxsIDogc2VsZWN0QWxsLFxuICAgIHVuc2VsZWN0QWxsIDogdW5zZWxlY3RBbGwsXG4gICAgdXBkYXRlQ2hhcnRzIDogdXBkYXRlQ2hhcnRzLFxuICAgIHJlbW92ZSA6IHJlbW92ZSxcbiAgICBzaG93UG9wdXA6IHNob3dQb3B1cCxcbiAgICBoaWRlUG9wdXA6IGhpZGVQb3B1cCxcbiAgICByZXNpemUgOiByZXNpemVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5wdXRzIDoge1xuICAgIHdlYXRoZXIgOiBbJ21vbnRoJywndG1pbicsJ3RtYXgnLCd0ZG1lYW4nLCdwcHQnLCdyYWQnLCdkYXlsaWdodCddXG4gIH0sXG4gIG91dHB1dHMgOiBbJ1ZQRCcsJ2ZWUEQnLCdmVCcsJ2ZGcm9zdCcsJ1BBUicsJ0ludGNwdG4nLCdBU1cnLCdDdW1JcnJpZycsXG4gICAgICAgICAgICAgJ0lycmlnJywnU3RhbmRBZ2UnLCdMQUknLCdDYW5Db25kJywnVHJhbnNwJywnRVRyJywnS2MnLCdmU1cnLCdmQWdlJyxcbiAgICAgICAgICAgICAnUGh5c01vZCcsJ3BSJywncFMnLCdsaXR0ZXJmYWxsJywneFBQJywnTlBQJywnV0YnLCdXUicsJ1dTJywnVyddLFxuICBkZWJ1ZyA6IGZhbHNlLFxuICBkZXZtb2RlIDogZmFsc2UsXG4gIC8vIHRoZXNlIHZhcmlhYmxlcywgd2hlbiBydW4gd2l0aCBtdWx0aXBsZSBkaWZmZXJlbnQgdGltZSBzdGVwcywgd2lsbCBkcmF3XG4gIC8vIGFnZ3JlZ2F0ZSB2YWx1ZXMgdG8gZ3JlYXRlc3Qgc3RlcC5cbiAgLy8gRXg6IDEgYW5kIDMwIGRheXMgZ2l2ZW4uICBXaWxsIGNoYXJ0IGV2ZXJ5IDMwIGRheXMgd2l0aCB2YWx1ZSBvZiBldmVyeSAzMHRoXG4gIC8vIGRheSBtdWx0aXBsaWVkIGJ5IDMwIGZvciB0aGUgZGFpbHkgc3RlcCBydW4uXG4gIHNwcmVhZCA6IFsneFBQJywgJ05QUCcsICdQQVInLCdJcnJpZycsICdUcmFuc3AnLCdFVHInLCdsaXR0ZXJmYWxsJ10sXG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJzdGFjay9mbGFzaGJsb2NrLWRldGVjdG9yXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2FsbGJhY2tNZXRob2Qpe1xuICAgIHZhciByZXR1cm5fdmFsdWUgPSAwO1xuXG4gICAgaWYobmF2aWdhdG9yLnBsdWdpbnNbXCJTaG9ja3dhdmUgRmxhc2hcIl0pIHtcbiAgICAgICAgICBlbWJlZF9sZW5ndGggPSAkKCdlbWJlZCcpLmxlbmd0aDtcbiAgICAgICAgICBvYmplY3RfbGVuZ3RoID0gJCgnb2JqZWN0JykubGVuZ3RoO1xuXG4gICAgICAgICAgaWYoKGVtYmVkX2xlbmd0aCA+IDApIHx8IChvYmplY3RfbGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gQ2hyb21lIHVzaW5nIEZsYXNoQmxvY2sgKyBNYWMgLyBTYWZhcmkgdXNpbmcgQWRCbG9jayAqL1xuICAgICAgICAgICAgICAkKCdvYmplY3QsIGVtYmVkJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gRmlyZWZveCB1c2luZyBGbGFzaEJsb2NrICovXG4gICAgICAgICAgICAgIGlmKCAkKCdkaXZbYmdpbmFjdGl2ZV0nKS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgfSBlbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpID4gLTEpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBJZiBmbGFzaCBpcyBub3QgaW5zdGFsbGVkICovXG4gICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMTtcbiAgICB9XG5cbiAgICBpZihjYWxsYmFja01ldGhvZCAmJiB0eXBlb2YoY2FsbGJhY2tNZXRob2QpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjYWxsYmFja01ldGhvZChyZXR1cm5fdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbiAgICB9XG59O1xuIiwiLypcbiAqIFNhdmUgdG8gZ29vZ2xlIGRyaXZlIChleHBvcnQgYXMgQ1NWKVxuICovXG5cbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBfc2V0TWVzc2FnZShudWxsKTtcblxuICAgICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKFwiM1BHIE1vZGVsIFJlc3VsdHMgKFwiK25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULywnICcpLnJlcGxhY2UoL1xcLlxcZCpaLywnJykrXCIpXCIpO1xuICAgICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TWVzc2FnZShtc2csIHR5cGUsIHByb2dyZXNzKSB7XG4gIGlmKCAhbXNnICkge1xuICAgIHJldHVybiAkKFwiI2V4cG9ydC1tc2dcIikuaGlkZSgpO1xuICB9XG4gICQoXCIjZXhwb3J0LW1zZ1wiKS5zaG93KCk7XG5cbiAgaWYoIHByb2dyZXNzICkge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLmhpZGUoKTtcbiAgfVxuXG4gICQoJyNleHBvcnQtbXNnJykuYXR0cihcImNsYXNzXCIsJ2FsZXJ0IGFsZXJ0LScrdHlwZSk7XG4gICQoJyNleHBvcnQtbXNnLXRleHQnKS5odG1sKG1zZyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVQcm9ncmVzcyhpbmRleCwgdG90YWwpIHtcbiAgcGVyY2VudCA9IDEwMCAqICggaW5kZXggLyB0b3RhbCApO1xuICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3MtYmFyXCIpLmF0dHIoXCJhcmlhLXZhbHVlbm93XCIsIHBlcmNlbnQpLmNzcyhcIndpZHRoXCIscGVyY2VudCtcIiVcIik7XG59XG5cbi8vIHNlZSBpZiBhbiBlcnJvciBleGlzdHMsIGlmIHNvLCBzZXQgc3RhdGVcbmZ1bmN0aW9uIF9jaGVja0Vycm9yKGZpbGUpIHtcbiAgdmFyIGVycm9yTWVzc2FnZSA9IG51bGw7XG4gIGlmKCAhZmlsZSApIGVycm9yTWVzc2FnZSA9IFwiRXJyb3IgY3JlYXRpbmcgZmlsZSBvbiBHb29nbGUgRHJpdmUgOihcIjtcbiAgaWYoIGZpbGUuZXJyb3IgKSBlcnJvck1lc3NhZ2UgPSBmaWxlLm1lc3NhZ2U7XG5cbiAgaWYoIGVycm9yTWVzc2FnZSApIHtcbiAgICBfc2V0TWVzc2FnZShlcnJvck1lc3NhZ2UsIFwiZGFuZ2VyXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4gIC8vIGV4cG9ydCBhcyBjc3ZcbmZ1bmN0aW9uIHJ1bihyZXN1bHRzKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2V4cG9ydC1kcml2ZS1jc3YnLCAxKTtcblxuICAkKFwiI2V4cG9ydC1jc3ZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0aW5nLi4uXCIpO1xuXG4gIHZhciBuYW1lID0gJChcIiNleHBvcnQtbmFtZVwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09PSAwICkge1xuICAgIF9zZXRNZXNzYWdlKFwiUGxlYXNlIHByb3ZpZGUgYSBmb2xkZXIgbmFtZVwiLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzdWx0cy5kYXRhO1xuXG4gIC8vIGNyZWF0ZSBhIGxpc3Qgc28gd2UgY2FuIHJlY3Vyc2l2ZWx5IGl0ZXJhdGVcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSBrZXlzLnB1c2goa2V5KTtcblxuICAvLyBjcmVhdGUgZm9sZGVyXG4gIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgZXhwb3J0IGZvbGRlci4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gIF91cGRhdGVQcm9ncmVzcygxLCBrZXlzLmxlbmd0aCsyKTtcbiAgZ2RyaXZlLnNhdmVGaWxlKG5hbWUsXCJBSEIgM1BHIE1vZGVsIFJlc3VsdHNcIixcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIixcIlwiLGZ1bmN0aW9uKGZpbGUpe1xuICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICB2YXIgcGFyZW50ID0gZmlsZS5pZDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMiwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAvLyBjcmVhdGUgYSBuaWNlIGZpbGUgZGVzY3JpYmluZyB0aGUgY3VycmVudCBleHBvcnRcbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGNvbmZpZyBmaWxlLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBkZWxldGUgcmVzdWx0cy5jb25maWcucGxhbnRhdGlvbl9zdGF0ZTtcbiAgICB2YXIgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5jb25maWcsbnVsbCxcIiAgXCIpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShcImNvbmZpZy50eHRcIixcIkFIQiAzUEcgTW9kZWwgLSBSdW4gQ29uZmlndXJhdGlvblwiLFwidGV4dC9wbGFpblwiLGNvbmZpZyxmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICAgIF91cGRhdGVQcm9ncmVzcygzLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgX2NyZWF0ZUV4cG9ydCgwLCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se3BhcmVudDogcGFyZW50fSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCkge1xuXG4gIC8vIHdlIGFyZSBhbGwgZG9uZSA6KVxuICBpZiggaW5kZXggPT0ga2V5cy5sZW5ndGggKSB7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDEsIDEpO1xuICAgIF9zZXRNZXNzYWdlKFwiRXhwb3J0IFN1Y2Nlc3NmdWwuPGJyIC8+PGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tLyNmb2xkZXJzL1wiICsgcGFyZW50ICtcbiAgICAgICAgICBcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWV4dGVybmFsLWxpbmstc2lnbic+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gIH0gZWxzZSB7XG5cbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgdmFyIGNzdiA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggYW5kIGRhdGVcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YVtrZXldLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGRhdGFba2V5XVtpXS5sZW5ndGggPT09IDAgKSBjb250aW51ZTsgLy8gaWdub3JlIHRoZSBibGFuayByb3dzXG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZGF0YVtrZXldW2ldLmxlbmd0aDsgaisrICkgY3N2ICs9IGRhdGFba2V5XVtpXVtqXStcIixcIjtcbiAgICAgIGNzdiA9IGNzdi5yZXBsYWNlKC8sJC8sJycpK1wiXFxuXCI7XG4gICAgfVxuXG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBcIitrZXlzW2luZGV4XStcIi5jc3YuLi4gXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoa2V5c1tpbmRleF0rXCIuY3N2XCIsXCJcIixcInRleHQvY3N2XCIsY3N2LGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuXG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgrNCwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIGluZGV4Kys7XG4gICAgICBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se2NvbnZlcnQ6IHRydWUsIHBhcmVudDogcGFyZW50fSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1biA6IHJ1bixcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgT2F1dGggPSByZXF1aXJlKCcuLi9vYXV0aCcpO1xudmFyIGdkcml2ZVJUID0gcmVxdWlyZSgnLi9yZWFsdGltZScpO1xudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuLi9tb2RlbFJ1bkhhbmRsZXInKTtcbnZhciBhcHA7XG5cblxudmFyIE1JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcucnVuXCI7XG52YXIgVFJFRV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnRyZWVcIjtcbnZhciBEUklWRV9BUElfVkVSU0lPTiA9IFwidjJcIjtcblxuLy8gZ29vZ2xlIG9hdXRoIGFjY2VzcyB0b2tlblxudmFyIHRva2VuID0gXCJcIjtcblxuLy8gY3VycmVudGx5IGxvYWRlZCBnZHJpdmUgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIGZpbGVzIChtZXRhZGF0YSlcbnZhciBmaWxlTGlzdCA9IFtdO1xuLy8gZ29vZ2xlIGRyaXZlIHNoYXJlIGNsaWVudFxudmFyIGNsaWVudCA9IG51bGw7XG5cbi8vIGxvYWRlZCB0cmVlIGFuZCBtYW5hZ2VtZW50XG52YXIgbG9hZGVkVHJlZSA9IG51bGw7XG4vLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgdHJlZSBmaWxlcyAobWV0YWRhdGEpXG52YXIgdHJlZUxpc3QgPSBbXTtcblxuLy8gY3VycmVudCBNSU1FIFRZUEUgd2UgYXJlIHNhdmluZ1xudmFyIHNhdmVNaW1lVHlwZSA9IFwiXCI7XG5cbmZ1bmN0aW9uIHNldEFwcChhKSB7XG4gIGFwcCA9IGE7XG4gIGdkcml2ZVJULnNldEFwcChhcHApO1xufVxuXG4vKioqXG4gKiAgSW5pdGlhbGl6ZSBnb29nbGUgZHJpdmUgcGFuZWxzLCBidG5zIGFuZCBsb2dpblxuICoqKi9cbmZ1bmN0aW9uIGluaXQoY2FsbGJhY2spIHtcbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyBzZXQgdGhlICd1cGRhdGUnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS11cGRhdGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF91cGRhdGVDdXJyZW50RmlsZSgpO1xuICB9KTtcblxuICAvLyBzZXQgdGhlICduZXcnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS1uZXctYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF9zYXZlTmV3RmlsZSgpO1xuICB9KTtcblxuICAvLyBjcmVhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gIF9jcmVhdGVMb2dpbkJ0bigpO1xuXG4gIC8vIGxvYWQgdGhlIGdvb2dsZSBhdXRoIGFuZCBkcml2ZSBhcGknc1xuICBfbG9hZEFwaShmdW5jdGlvbigpIHtcbiAgICAvLyBpZiB0aGUgdXNlciBpcyBhdXRob3JpemVkIGdyYWIgdGhlIHJlZnJlc2ggdG9rZW5cbiAgICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24ocmVmcmVzaFRva2VuKXtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHJlZnJlc2ggdG9rZW4sIGxlYXZlLCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgIGlmKCAhcmVmcmVzaFRva2VuICkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgYSByZWZlc2ggdG9rZW4sIHRoZW4gdXNlciBpcyBhbGwgc2V0LFxuICAgICAgLy8gZ2V0IGEgbmV3IGFjY2VzcyB0b2tlbiBzbyB3ZSBjYW4gc3RhcnQgdXNpbmcgdGhlIGFwaSdzXG4gICAgICAvLyBncmFiIHRoZWlyIGluZm9ybWF0aW9uIGFuZCBkaXNwbGF5XG4gICAgICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KXtcbiAgICAgICAgdG9rZW4gPSB0O1xuICAgICAgICBpZiggdG9rZW4gKSBfc2V0VXNlckluZm8oKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBfY2hlY2tUb2tlbigpO1xuICAgIH0sIDEwMDAgKiA1ICogNjApO1xuICB9KTtcblxuICAvLyBzZXR1cCB0aGUgdHJlZSAnc2hhcmUnIGJ0blxuICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgLy8gc2VlIGlmIHdlIGhhdmUgYSBzaGFyZSBjbGllbnRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBubyBjbGllbnQsIGxvYWQgYXBpXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gb24gbG9hZCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCB0aGUgY3VycmVudCB0cmVlXG4gICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZFRyZWVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2UgaGF2ZSBhIGNsaWVudCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCBjdXJyZW50IHRyZWVcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxufVxuXG4vKioqXG4gKiBTYXZlIHRoZSBjdXJyZW50IG1vZGVsIGFzIGEgbmV3IGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3NhdmVOZXdGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzYXZlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBncmFiIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmlsZVxuICB2YXIgbmFtZSA9ICQoXCIjc2F2ZS1uYW1lLWlucHV0XCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHsgLy8gd2UgYWx3YXlzIHdhbnQgYSBuYW1lLCBhbGVydCBhbmQgcXVpdFxuICAgIF9zZXRTYXZlTWVzc2FnZSgnUGxlYXNlIHByb3ZpZGUgYSBmaWxlbmFtZS4nLCdpbmZvJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2VlIHdoYXQga2luZCBvZiBmaWxlIHdlIGFyZSBjcmVhdGluZyBiYXNlZCBvbiB0aGUgc2F2ZU1pbWVUeXBlIHZhclxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IG1vZGVsSU8uZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gU2F2aW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgLy8gc2F2ZSB0aGUgZmlsZVxuICBzYXZlRmlsZShuYW1lLFxuICAgICAgJChcIiNzYXZlLWRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbCgpLFxuICAgICAgc2F2ZU1pbWVUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byBzYXZlIHRvIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnU3VjZXNzZnVsbHkgc2F2ZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHRvIGhpZGUgdGhlIHBvcHVwLCBzbyB1c2VyIHNlZXMgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBmaWxlLCB1cGRhdGUgb3VyIGxpc3RcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrcmVzcC5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgICAgIGxvYWRlZEZpbGUgPSByZXNwLmlkO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyB0cmVlLCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVzXG4gICAgICAgICAgbG9hZGVkVHJlZSA9IHJlc3AuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBjdXJyZW50bHkgbG9hZGVkIGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUN1cnJlbnRGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1cGRhdGUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBVcGRhdGluZy4uLicsJ2luZm8nKTtcblxuICB2YXIgZmlsZSA9IHt9O1xuICB2YXIgZGF0YSA9IHt9O1xuXG4gIC8vIGdyYWIgdGhlIGNvcnJlbnQgZGF0YSBhbmQgZmlsZWlkIGJhc2VkIG9uIG1pbWVUeXBlXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRGaWxlO1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkVHJlZTtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgdXBkYXRlRmlsZShmaWxlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHVwZGF0ZSBvbiBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1VwZGF0ZSBTdWNjZXNzZnVsLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB0aGUgdXNlciBrbm93cyB1cGRhdGUgd2FzIHN1Y2Nlc3NcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBmb3Igd2hhdGV2ZXIgdHlwZSB3YXMgdXBkYXRlZFxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cC5cbiAqICB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRMb2FkTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1maWxlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdzYXZlIHRvIGRyaXZlJyBwb3B1cFxuICogdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0U2F2ZU1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLXNhdmUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtc2F2ZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUuIFRoaXMgbWVudSBpcyBmb3Igd2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ2luQnRuKCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj5Mb2dpbjxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9naW4td2l0aC1nb29nbGVcIj48aSBjbGFzcz1cImljb24tc2lnbmluXCI+PC9pPiBMb2dpbiB3aXRoIEdvb2dsZTwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGxvZ2luIGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNsb2dpbi13aXRoLWdvb2dsZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dpbicsIDEpO1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgX3NldFVzZXJJbmZvKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiBDcmVhdGUgdGhlIHRvcCByaWdodCBtZW51IGZvciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dvdXRCdG4odXNlcmRhdGEpIHtcbiAgLy8gc2V0IGJ0biBodG1sXG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPjxpbWcgY2xhc3M9XCJpbWctcm91bmRlZFwiIHNyYz1cIicrdXNlcmRhdGEucGljdHVyZVxuICAgICAgKyAnXCIgc3R5bGU9XCJtYXJnaW46LTVweCA1cHggLTVweCAwO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7Ym9yZGVyOjFweCBzb2xpZCB3aGl0ZVwiIC8+ICcgKyB1c2VyZGF0YS5uYW1lXG4gICAgICArICc8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJzYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtYnRuXCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwib3Blbi1pbi1kcml2ZVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiaWNvbi1leHRlcm5hbC1saW5rLXNpZ25cIj48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dvdXRcIj48aSBjbGFzcz1cImljb24tc2lnbm91dFwiPjwvaT4gTG9nb3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIHRvIHNob3cgbWVudVxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICBidG4uZmluZCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgc2F2ZSBtaW1lVHlwZVxuICAgIHNhdmVNaW1lVHlwZSA9IE1JTUVfVFlQRTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgdHlwIHRoZXkgYXJlIHNhdmluZ1xuICAgICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBNb2RlbDwvaDU+XCIpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBpZiB0aGUgZmlsZSBpcyBsb2FkZWQsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgIGlmKCBsb2FkZWRGaWxlICE9IG51bGwpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGN1cnJlbnQgZmlsZXMgbWV0YWRhdGFcbiAgICAgIHZhciBmaWxlID0ge307XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggZmlsZUxpc3RbaV0uaWQgPT0gbG9hZGVkRmlsZSkge1xuICAgICAgICAgIGZpbGUgPSBmaWxlTGlzdFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgICAvLyByZW5kZXIgdGhlIGZpbGVzIG1ldGFkYXRhIGluIHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgIHZhciBkID0gbmV3IERhdGUoZmlsZS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrZmlsZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrZmlsZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrZmlsZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK2ZpbGUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBcIiArXG4gICAgICAgICAgXCJMaW5rIHRvIFNoYXJlPC9hPiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+KG11c3QgaGF2ZSBwZXJtaXNzaW9uKTwvc3Bhbj48YnIgLz48YnIgLz5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBjbGljayBoYW5kbGVyIGZvciBzaGFyZSBidG5cbiAgYnRuLmZpbmQoXCIjc2hhcmUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnb3Blbi1kcml2ZS1zaGFyZScsIDEpO1xuXG4gICAgLy8gaGFzIHRoZSBzaGFyZSBjbGllbnQgYmVlbiBsb2FkZWRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBsb2FkIHRoZSBzaGFyZSBwb3B1cFxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2hvdyBhYm91dCBwYW5lbFxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwYW5lbFxuICBidG4uZmluZCgnI2xvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGhpZGUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyByZW5kZXIgdGhlIG1vZGVsIGZpbGVzIGluIHRoZSBwb3B1cCBmaWxlc1xuICAgIF9zaG93RHJpdmVGaWxlcygpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9kYWxcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gbG9hZCB0aGUgdXNlciBvdXRcbiAgYnRuLmZpbmQoJyNsb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ291dCcsIDEpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBraWxsIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICB0b2tlbiA9IG51bGw7XG5cbiAgICAvLyB1cGRhdGUgdGhlIG1lbnUgcGFuZWxcbiAgICBfY3JlYXRlTG9naW5CdG4oKTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHRoZSBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiAgUmVxdWVzdCB0aGUgdXNlcidzIGluZm9ybWF0aW9uLiAgV2hlbiBsb2FkZWQsIHVwZGF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAqKiovXG5mdW5jdGlvbiBfc2V0VXNlckluZm8oKSB7XG4gIC8vIGxvYWQgdXNlciBuYW1lXG4gICQuYWpheCh7XG4gICAgdXJsIDogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdXNlcmluZm9cIixcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gYWx3YXlzIHNldCB5b3VyIGFjY2VzcyBzdG9rZW5cbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLHhocikge1xuICAgICAgLy8gcGFyc2UgeW91ciBqc29uIHJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIC8vIHVwZGF0ZSB0b3AgcmlnaHQgbWVudVxuICAgICAgX2NyZWF0ZUxvZ291dEJ0bihkYXRhKTtcblxuICAgICAgLy8gc2V0IHRvIHdpbmRvdyBzY29wZVxuICAgICAgd2luZG93LnVzZXJpbmZvID0gZGF0YTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUT0RPOiBzaG91bGQgd2UgYWxlcnQgdGhpcz9cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGxvYWQgdXNlciBmaWxlcywgdHJlZXNcbiAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gIF91cGRhdGVUcmVlTGlzdCgpO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgbW9kZWxzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUZpbGVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitNSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIGZpbGVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgdHJlZXNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlVHJlZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK1RSRUVfTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICB0cmVlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCBtb2RlbHMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd0RyaXZlRmlsZXMoKSB7XG4gIC8vIGlmIHRoZXkgaGF2ZSBubyBmaWxlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICFmaWxlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuICBpZiggZmlsZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcblxuICAvLyBzaG93IGEgdGl0bGUsIHRoZXJlIGFyZSBtdWx0aXBsZSB0eXBlcyB0aGF0IGNhbiBiZSBsb2FkZWQgZnJvbSBkcml2ZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxoND5TZWxlY3QgRmlsZTwvaDQ+XCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgbGlzdCBlbGVtZW50cyBmb3IgZWFjaCBmaWxlcyBtZXRhZGF0YVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gZmlsZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1maWxlJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBlYWNoIGZpbGVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLW1vZGVsJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGdyYWIgdGhlIGZpdmUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIGhpZGUgYW55IGxvYWRlZCB0cmVlcyxcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuaGlkZSgpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoXCJcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgbG9hZGVkVHJlZSA9IG51bGw7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBhbGwgZ29vZFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdGaWxlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgIGxvYWRlZEZpbGUgPSBpZDtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBuYW1lXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggaWQgPT0gZmlsZUxpc3RbaV0uaWQgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIitmaWxlTGlzdFtpXS50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIitpZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBzZXR1cCBtb2RlbFxuICAgICAgbW9kZWxJTy5sb2FkU2V0dXAoaWQsIGZpbGUpO1xuXG4gICAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyBoaWRlIHRoZSBtb2RhbFxuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgdHJlZXMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd1RyZWVGaWxlcygpIHtcbiAgLy8gdXBkYXRlIHRoZSBsaXN0IGhlYWRlciwgbGV0IHVzZXIga25vdyB3aGF0IHRoZXkgYXJlIHNlbGVjdGluZ1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIlwiKTtcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxoNT5TZWxlY3QgVHJlZTwvaDU+PC9saT5cIikpO1xuXG4gIC8vIGlmIHRoZXJlIGFyZSBubyB0cmVlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICF0cmVlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuICBpZiggdHJlZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcblxuICAvLyBjcmVhdGUgdGhlIHRyZWUgbGlzdCBlbGVtZW50c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdHJlZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIG5hbWU9J1wiK2l0ZW0udGl0bGUrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1sZWFmJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciB0aXRsZXNcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLXRyZWUnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcblxuICAgIC8vIHRlbGwgdGhlIHVzZXIgd2UgYXJlIGxvYWRpbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBUcmVlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gbG9hZCBmaWxlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmluZyBidG5zXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIHN1Y2Nlc2Z1bGxcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnVHJlZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgICBsb2FkZWRUcmVlID0gaWQ7XG5cbiAgICAgIC8vIGxvYWRlZCB0cmVlIGludG8gbW9kZWwgLyBVSVxuICAgICAgbW9kZWxJTy5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHNlYyBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIGxvYWQgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dMb2FkVHJlZVBhbmVsKCkge1xuICAvLyByZW5kZXIgdGhlIHRyZWVzIGludG8gdGhlIHBvcHVwIGxpc3RcbiAgX3Nob3dUcmVlRmlsZXMoKTtcbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VzXG4gIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBzYXZlIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93U2F2ZVRyZWVQYW5lbCgpIHtcbiAgLy8gc2V0IHRoZSBjdXJyZW50IG1pbWVUeXBlIHdlIGFyZSBzYXZpbmdcbiAgc2F2ZU1pbWVUeXBlID0gVFJFRV9NSU1FX1RZUEU7XG5cbiAgLy8gc2V0IHRoZSBoZWFkZXIgc28gdXNlciBrbm93cyB3aGF0IHR5cGUgdGhleSBhcmUgc2F2aW5nXG4gICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBUcmVlPC9oNT5cIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHRyZWUsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICBpZiggbG9hZGVkVHJlZSAhPSBudWxsKSB7XG4gICAgLy8gZmluZCB0aGUgY3VycmVudCB0cmVlIGJhc2VkIG9uIGlkXG4gICAgdmFyIHRyZWUgPSB7fTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRyZWVMaXN0W2ldLmlkID09IGxvYWRlZFRyZWUpIHtcbiAgICAgICAgdHJlZSA9IHRyZWVMaXN0W2ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgIC8vIHJlbmRlciB0cmVlIG1ldGFkYXRhIG9uIHVwZGF0ZSBwYW5lbFxuICAgIHZhciBkID0gbmV3IERhdGUodHJlZS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK3RyZWUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIit0cmVlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK3RyZWUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrdHJlZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBkb24ndCBzaG93IHRoZSB1cGRhdGUgcGFuZWwsIHRoaXMgaXMgYSBuZXcgdHJlZVxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiBMb2FkIGEgbW9kZWwgYmFzZWQgb24gcGFzc2VkIGlkLiAgVGhpcyBmdW5jdGlvbiBpcyByZWFsbHkgb25seSBmb3IgbG9hZGluZyBtb2RlbCBvbiBzdGFydCwgd2hlbiBhIGZpbGUgaWRcbiAqIGhhcyBiZWVuIHBhc3NlZCBpbiB0aGUgdXJsIGVpdGhlciBmcm9tIGdvb2dsZSBkcml2ZSBvciBmcm9tIHRoZSA/ZmlsZT1pZCB1cmwuXG4gKioqL1xudmFyIGxvZ2luTW9kYWxJbml0ID0gZmFsc2U7XG5mdW5jdGlvbiBsb2FkKGlkLCBsb2FkRm4pIHtcblxuICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFuIGFjY2VzcyB0b2tlbiwgd2UgbmVlZCB0byBzaWduIGluIGZpcnN0XG4gIC8vIFRPRE86IGlmIHRoaXMgaXMgYSBwdWJsaWMgZmlsZSwgdGhlcmUgaXMgbm8gcmVhc29uIHRvIHNpZ24gaW4uLi4gc29sdXRpb24/XG4gIGlmKCAhdG9rZW4gKSB7XG5cbiAgICBpZiggIWxvZ2luTW9kYWxJbml0ICkge1xuICAgICAgJCgnI2dvb2dsZS1tb2RhbC1sb2dpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIHNpZ24gdGhlIHVzZXIgaW4gKGZvcmNlIG9hdXRoIHBvcHVwKVxuICAgICAgICBzaWduSW4oZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSB1c2VyIGluZm9ybWF0aW9uIGluIHRvcCBsZWZ0XG4gICAgICAgICAgX3NldFVzZXJJbmZvKCk7XG5cbiAgICAgICAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICAgICAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgICAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoKTtcbiAgICAgIGxvZ2luTW9kYWxJbml0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqKlxuICogSW5pdGlhbGl6ZSBVSSAvIG1vZGVsIHdoZW4gYSBmaWxlIGlzIGxvYWRlZCBhdCBzdGFydFxuICoqKi9cbmZ1bmN0aW9uIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLCBmaWxlKSB7XG4gIC8vIGJhZGRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICBpZiggIWZpbGUgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkZhaWxlZCB0byBsb2FkIGZyb20gR29vZ2xlIERyaXZlIDovXCIpO1xuICB9XG5cbiAgLy8gbWV0YWRhdGEgZmFpbGVkIHRvIGxvYWQsIG1vcmUgYmFkbmVzc1xuICBpZiggbWV0YWRhdGEuY29kZSA9PSA0MDQgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWVzc2FnZSk7XG4gIH1cblxuICAvLyB3ZSBsb2FkZWQgYSBtb2RlbCwgc2V0dXAgYW5kIHJ1blxuICBpZiggbWV0YWRhdGEubWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudGx5IGxvYWRlZCBmaWxlIGlkXG4gICAgbG9hZGVkRmlsZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK21ldGFkYXRhLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAvLyBzaG93IHRpdGxlXG4gICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIittZXRhZGF0YS50aXRsZSk7XG5cbiAgICAvLyBzZXR1cCBtb2RlbFxuICAgIG1vZGVsSU8ubG9hZFNldHVwKG1ldGFkYXRhLmlkLCBmaWxlKTtcblxuICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcbiAgfSBlbHNlIGlmICggbWV0YWRhdGEubWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7IC8vIHdlIGxvYWRlZCBhIHRyZWVcbiAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgbG9hZGVkVHJlZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobWV0YWRhdGEudGl0bGUpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVcbiAgICBtb2RlbElPLmxvYWRUcmVlKGZpbGUpO1xuXG4gICAgLy8gaGlkZSB0aGUgbG9hZGluZyBwb3B1cFxuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcIkxvYWRlZCB1bmtub3duIGZpbGUgdHlwZSBmcm9tIEdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWltZVR5cGUpO1xuICB9XG59XG5cbi8qKipcbiAqIHRva2VucyBleHBpcmUsIGV2ZXJ5IG9uY2UgaW4gYXdoaWxlIGNoZWNrIHRoZSBjdXJyZW50IHRva2VuIGhhc24ndFxuICogaWYgaXQgaGFzLCB0aGVuIHVwZGF0ZVxuICoqKi9cbmZ1bmN0aW9uIF9jaGVja1Rva2VuKCkge1xuICAvLyBpZ25vcmUgaWYgdGhlcmUgaXMgbm8gdG9rZW5cbiAgaWYgKCF0b2tlbikgcmV0dXJuO1xuXG4gIC8vIG90aGVyd2lzZSwgbG9vayB0byB1cGRhdGUgdGhlIGFjY2VzcyB0b2tlblxuICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KSB7XG4gICAgaWYoIHQgIT0gbnVsbCApIHRva2VuID0gdDtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBpcyB0aGUgY3VycmVudCB1c2VyIHNpZ25lZCBpbj9cbiAqKiovXG5mdW5jdGlvbiBjaGVja1NpZ25lZEluKGNhbGxiYWNrKSB7XG4gIC8vIGlmIGlzQXV0aGVyaXplZCByZXR1cm5zIGEgdG9rZW4sIHVzZXIgaXMgbG9nZ2VkIGluXG4gIE9hdXRoLmlzQXV0aG9yaXplZChmdW5jdGlvbih0b2tlbil7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIGNhbGxiYWNrKHRydWUpO1xuICAgIGVsc2UgY2FsbGJhY2soZmFsc2UpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIFNpZ24gYSB1c2VyIGluIHVzaW5nIHRoZSBPYXV0aCBjbGFzc1xuICoqKi9cbmZ1bmN0aW9uIHNpZ25JbihjYWxsYmFjaykge1xuICBPYXV0aC5hdXRob3JpemUoZnVuY3Rpb24odCl7XG4gICAgdG9rZW4gPSB0O1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICBpZiggdC5lcnJvciApIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgIH1cbiAgfSlcbn07XG5cbi8qKipcbiAqIEFjY2VzcyBtZXRob2QgZm9yIHRva2VuXG4gKioqL1xuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIHJldHVybiB0b2tlbjtcbn07XG5cbi8qKipcbiAqIExvYWQgdGhlIGdvb2dsZSBkcml2ZSBhcGkgY29kZVxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkQXBpKGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmxvYWQoXCJkcml2ZVwiLCBEUklWRV9BUElfVkVSU0lPTiwgZnVuY3Rpb24oKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBsaXN0IG9mIGZpbGUgbWV0YWRhdGEgZnJvbSBnb29nbGUgZHJpdmUgYmFzZWQgb24gcXVlcnlcbiAqKiovXG5mdW5jdGlvbiBsaXN0RmlsZXMocXVlcnksIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmxpc3Qoe1xuICAgIHEgOiBxdWVyeSArIFwiIGFuZCB0cmFzaGVkID0gZmFsc2VcIlxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBzaW5nbGUgZmlsZXMgbWV0YWRhdGEgYmFzZWQgb24gaWRcbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlTWV0YWRhdGEoaWQsIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmdldCh7XG4gICAgJ2ZpbGVJZCcgOiBpZFxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiAgQWN0dWFsbHkgbG9hZCBhIGZpbGVzIGRhdGEuICBUaGUgdXJsIHRvIGRvIHRoaXMgaXMgcHJvdmlkZWQgaW4gYSBmaWxlcyBtZXRhZGF0YS5cbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlKGlkLCBkb3dubG9hZFVybCwgY2FsbGJhY2spIHtcbiAgJC5hamF4KHtcbiAgICB1cmwgOiBkb3dubG9hZFVybCxcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gc2V0IGFjY2VzcyB0b2tlbiBpbiBoZWFkZXJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAvLyBwYXJzZSB0aGUgcmVzcG9uc2UgKHdlIG9ubHkgc3RvcmUganNvbiBpbiB0aGUgZ29vZ2xlIGRyaXZlKVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBjYWxsYmFjayhkYXRhLCBpZCk7XG4gICAgfSxcbiAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmVcIlxuICAgICAgfSk7XG5cbiAgICB9XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2F2ZSBqc29uIHRvIGdvb2dsZSBkcml2ZVxuICoqKi9cbmZ1bmN0aW9uIHNhdmVGaWxlKG5hbWUsIGRlc2NyaXB0aW9uLCBtaW1lVHlwZSwganNvbiwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgaWYoICFvcHRpb25zICkgb3B0aW9ucyA9IHt9XG5cbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgJ3RpdGxlJyA6IG5hbWUsXG4gICAgJ2Rlc2NyaXB0aW9uJyA6IGRlc2NyaXB0aW9uLFxuICAgICdtaW1lVHlwZScgOiBtaW1lVHlwZVxuICB9O1xuXG4gIC8vIGlmIHdlIHdhbnQgdG8gc2F2ZSB0aGUgZmlsZSB0byBhIHNwZWNpZmllZCBmb2xkZXJcbiAgaWYoIG9wdGlvbnMucGFyZW50ICkge1xuICAgIG1ldGFkYXRhLnBhcmVudHMgPSBbe2lkOiBvcHRpb25zLnBhcmVudH1dO1xuICB9XG5cbiAgLy8gaWYgdGhlIGpzb24gaXMgcmVhbGx5IGFuIG9iamVjdCwgdHVybiBpdCB0byBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGpzb24gPT0gJ29iamVjdCcpIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICAvLyBkYXRhIG5lZWRzIHRvIGJlIGJhc2U2NCBlbmNvZGVkIGZvciB0aGUgUE9TVFxuICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoanNvbik7XG5cbiAgLy8gY3JlYXRlIG91ciBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9IGRlbGltaXRlclxuICAgICAgKyAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJ1xuICAgICAgKyBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSk7XG5cbiAgaWYoIGpzb24ubGVuZ3RoID4gMCApIHtcbiAgICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBkZWxpbWl0ZXIgKyAnQ29udGVudC1UeXBlOiAnXG4gICAgICArIG1pbWVUeXBlICsgJ1xcclxcbicgKyAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJ1xuICAgICAgKyAnXFxyXFxuJyArIGJhc2U2NERhdGE7XG4gIH1cbiAgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgKz0gY2xvc2VfZGVsaW07XG5cbiAgICAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgIC8vIGlmIHRoZSBvcHRpb25zLmNvbnZlcj10cnVlIGZsYWcgaXMgc2V0LCBnb29nbGUgYXR0ZW1wdHMgdG8gY29udmVydCB0aGUgZmlsZSB0b1xuICAgICAvLyBhIGdvb2dsZSBkb2MgZmlsZS4gIE1vc3RseSwgd2UgdXNlIHRoaXMgZm9yIGV4cG9ydGluZyBjc3YgLT4gR29vZ2xlIFNwcmVhZHNoZWV0c1xuICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICdwYXRoJyA6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzJyArICggb3B0aW9ucy5jb252ZXJ0ID8gJz9jb252ZXJ0PXRydWUnIDogJycpLFxuICAgICdtZXRob2QnIDogJ1BPU1QnLFxuICAgICdwYXJhbXMnIDoge1xuICAgICAgJ3VwbG9hZFR5cGUnIDogJ211bHRpcGFydCdcbiAgICB9LFxuICAgICdoZWFkZXJzJyA6IHtcbiAgICAgICdDb250ZW50LVR5cGUnIDogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgfSxcbiAgICAnYm9keScgOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keVxuICB9KTtcblxuICAvLyBzZW5kIHRoZSByZXF1ZXN0XG4gIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgaWYgKHJlc3AuaWQpXG4gICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICBlbHNlXG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHNhdmVcIlxuICAgICAgfSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogVXBkYXRlIGEgZmlsZSBiYXNlZCBvbiBpZCBhbmQgZ2l2ZW4ganNvbiBkYXRhXG4gKioqL1xuZnVuY3Rpb24gdXBkYXRlRmlsZShmaWxlSWQsIGpzb24sIGNhbGxiYWNrKSB7XG4gIC8vIHN0YXJ0IGNyZWF0aW5nIHRoZSBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgdmFyIG1ldGFkYXRhID0ge307XG5cbiAgLy8gc3RyaW5pZnkgdGhlbiBiYXNlNjQgZW5jb2RlIHRoZW4gb2JqZWN0XG4gICAgdmFyIGJhc2U2NERhdGEgPSBidG9hKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcblxuICAgIC8vIHNldCB1cCB0aGUgUE9TVCBib2R5XG4gICAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID1cbiAgICAgIGRlbGltaXRlciArXG4gICAgICAgICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nICtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpICtcbiAgICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogJyArIE1JTUVfVFlQRSArICdcXHJcXG4nICtcbiAgICAgICAgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbicgK1xuICAgICAgICAnXFxyXFxuJyArXG4gICAgICAgIGJhc2U2NERhdGEgK1xuICAgICAgICBjbG9zZV9kZWxpbTtcblxuICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAncGF0aCc6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzLycrZmlsZUlkLFxuICAgICAgICAnbWV0aG9kJzogJ1BVVCcsXG4gICAgICAgICdwYXJhbXMnOiB7J3VwbG9hZFR5cGUnOiAnbXVsdGlwYXJ0J30sXG4gICAgICAgICdoZWFkZXJzJzoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICAgICAgfSxcbiAgICAgICAgJ2JvZHknOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keX0pO1xuXG4gICAgLy8gc2V0IHJlcXVlc3RcbiAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCl7XG4gICAgICBpZiggcmVzcC5pZCApIHtcbiAgICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHVwZGF0ZVwiXG4gICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdydW4tbW9kZWwtcmVtb3RlJywgMSk7XG4gIGdkcml2ZVJULnJ1bk1vZGVsUnQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBjaGVja1NpZ25lZEluIDogY2hlY2tTaWduZWRJbixcbiAgc2lnbkluIDogc2lnbkluLFxuICBnZXRUb2tlbiA6IGdldFRva2VuLFxuICBsaXN0RmlsZXMgOiBsaXN0RmlsZXMsXG4gIGdldEZpbGVNZXRhZGF0YSA6IGdldEZpbGVNZXRhZGF0YSxcbiAgbG9hZCA6IGxvYWQsXG4gIHNhdmVGaWxlOiBzYXZlRmlsZSxcbiAgc2hvd0xvYWRUcmVlUGFuZWwgOiBzaG93TG9hZFRyZWVQYW5lbCxcbiAgc2hvd1NhdmVUcmVlUGFuZWwgOiBzaG93U2F2ZVRyZWVQYW5lbCxcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG4gIHNldEFwcCA6IHNldEFwcCxcblxuICBNSU1FX1RZUEUgOiBNSU1FX1RZUEVcbn07XG4iLCIvLyBSRUFMVElNRSAocnQpIE9iamVjdHNcbi8vIHJ0IGpzb24gZmllbGQsIHVzZWQgdG8gc2VuZCB1cGRhdGVzIHRvIHBlZXJzXG52YXIgcnRKc29uID0gbnVsbDtcbi8vIHJ0IGRvY3VtZW50XG52YXIgcnREb2MgPSBudWxsO1xuLy8gaGFzIHRoZSBydCBhcGkgYmVlbiBsb2FkZWQ/XG52YXIgX3J0TG9hZGVkID0gZmFsc2U7XG4vLyB0aW1lciB0byBidWZmZXIgdGhlIGZpcmluZyBvZiB1cGRhdGVzIGZyb20gcnQgZXZlbnRzXG52YXIgX3J0VGltZXIgPSAtMTtcblxuLy8gbGlzdCBvZiBjdXJyZW50IHJ0IGVkaXRzIHRvIGlucHV0IGZpbGVzXG52YXIgcnRFZGl0cyA9IHt9O1xuLy8gZ29vZ2xlIGRyaXZlIHJ0IG1vZGVsIC0gbWFwXG52YXIgbGl2ZUVkaXRzID0gbnVsbDtcbi8vIGxvY2FsIGxvY2sgb24gYW4gZWxlbWVudFxudmFyIGxvY2sgPSB7fTtcblxudmFyIGFwcDtcblxuLy8gbG9hZGVkIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlO1xuXG4vKioqXG4gKiBTZXR1cCB0aGUgcnQgYXBpIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhpcyB3aWxsIGFjdHVhbGx5IGxvYWQgdGhlIGFwaSBpZiBuZWVkZWRcbiAqKiovXG5mdW5jdGlvbiBpbml0UnRBcGkoZmlsZSkge1xuICBydEpzb24gPSBudWxsOyAvLyBraWxsIG9mZiBhbnkgb2xkIGxpc3RuZXJzXG4gIGxvYWRlZEZpbGUgPSBmaWxlO1xuXG4gIC8vIGNsb3NlIGFueSBvbGQgY29ubmVjdGlvblxuICBpZiggcnREb2MgKSBydERvYy5jbG9zZSgpO1xuXG4gIC8vIGdldCBvdXQgb2YgaGVyZSBpZiB3ZSBkb24ndCBoYXZlIGEgbG9hZGVkIGZpbGVcbiAgaWYoIGxvYWRlZEZpbGUgPT0gbnVsbCApIHJldHVybjtcblxuICAvLyBsb2FkIGFwaSBpZiBuZWVkZWRcbiAgaWYoICFfcnRMb2FkZWQgKSB7XG4gICAgZ2FwaS5sb2FkKCdkcml2ZS1yZWFsdGltZScsIGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzZXR1cCBydCBob29rc1xuICAgICAgX3J0TG9hZGVkID0gdHJ1ZTtcbiAgICAgIF9sb2FkUnRGaWxlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICBfbG9hZFJ0RmlsZSgpO1xuICB9XG5cbiAgLy8gc2V0dXAgaW5wdXQgaGFuZGxlcnNcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdmb2N1cycsZnVuY3Rpb24oZSl7XG4gICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgIF9zZXRMb2NhbExvY2soe1xuICAgICAgaWQgICAgICAgIDogZWxlLmF0dHIoXCJpZFwiKSxcbiAgICAgIHZhbHVlICAgICA6IGVsZS52YWwoKSxcbiAgICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICAgIH0pO1xuICB9KTtcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdibHVyJyxmdW5jdGlvbihlKXtcbiAgICBfcmVtb3ZlTG9jYWxMb2NrKCQoZS50YXJnZXQpLmF0dHIoXCJpZFwiKSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIHJldHVybjtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3VwZGF0ZUxvY2FsTG9jayhlbGUuYXR0cihcImlkXCIpLCBlbGUudmFsKCkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldExvY2FsTG9jayhsb2NrKSB7XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIG1hcmsgdGhlIGN1cnJlbnQgbG9ja1xuICBpZiggbGl2ZUVkaXRzLmhhc1tsb2NrLmlkXSApIHJldHVybjtcbiAgbGl2ZUVkaXRzLnNldChsb2NrLmlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2FsTG9jayhpZCwgdmFsKSB7XG4gIHZhciBsb2NrID0ge1xuICAgIGlkIDogaWQsXG4gICAgdmFsdWUgOiB2YWwsXG4gICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICB9XG5cbiAgbGl2ZUVkaXRzLnNldChpZCwgbG9jayk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVMb2NhbExvY2soaWQpIHtcbiAgbGl2ZUVkaXRzLmRlbGV0ZShpZCk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVSZW1vdGVMb2NrKGxvY2spIHtcbiAgJChcIiNcIitsb2NrLmlkKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLnJlbW92ZSgpO1xuICBkZWxldGUgcnRFZGl0c1tsb2NrLmlkXTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnZhbChsb2NrLnZhbHVlKS5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICBpZiggJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikubGVuZ3RoID09IDAgKSB7XG4gICAgJChcIiNcIitsb2NrLmlkKS5wYXJlbnQoKS5hZnRlcihcIjxzcGFuIGlkPSdcIitsb2NrLmlkK1wiLWVkaXRpbmcnIGNsYXNzPSdsYWJlbCBsYWJlbC13YXJuaW5nJz48L3NwYW4+XCIpO1xuICB9XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmh0bWwobG9jay51c2VyKTtcbiAgcnRFZGl0c1tsb2NrLmlkXSA9IGxvY2s7XG59XG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgbGlzdCBvZiByZWFsdGltZSBlZGl0cyBhcyB3ZWxsIGFzIHRoZSBpbnB1dCBVSSBiYXNlZCBvbiB0aGUgcnREb2MgZXZlbnRcbiAqIFRPRE86IHRoaXMgaXMgYSBiaXQgbmFzdHkgcmlnaHQgbm93XG4gKiovXG5mdW5jdGlvbiBfdXBkYXRlUnRFZGl0cyhlKSB7XG4gIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG5cbiAgdmFyIGtleXMgPSBsaXZlRWRpdHMua2V5cygpO1xuXG4gIC8vIHJlbW92ZSBvbGQgdGltZXN0YW1wcyBUT0RPXG4gIC8qZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIG5vdyAtIHZhbHVlc1tpXS50aW1lc3RhbXAgPiAxMDAwICogNjAgKSB7XG4gICAgICBfcmVtb3ZlTG9jayh2YWx1ZXNbaV0pOyAvLyBkb2VzIHRoaXMgZmlyZSB1cGRhdGVzP1xuICAgIH1cbiAgfSovXG5cblxuICAvLyBzZXQgbmV3IGVkaXRzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICBfdXBkYXRlTG9jayhsaXZlRWRpdHMuZ2V0KGtleXNbaV0pKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBvbGQgZWRpdHNcbiAgZm9yKCB2YXIga2V5IGluIHJ0RWRpdHMgKSB7XG4gICAgaWYoIGtleXMuaW5kZXhPZihrZXkpID09IC0xICkge1xuICAgICAgX3JlbW92ZVJlbW90ZUxvY2socnRFZGl0c1trZXldKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqKlxuICogIFNldHVwIHRoZSBydCBob29rcyBmb3IgdGhlIGN1cnJlbnQgZmlsZS4gIFRoZSBhcGkgbmVlZHMgdG8gYWxyZWFkeSBiZSBsb2FkZWRcbiAqKiovXG5mdW5jdGlvbiBfbG9hZFJ0RmlsZSgpIHtcbiAgLy8gZ2V0IHRoZSBydCBkb2NcbiAgZ2FwaS5kcml2ZS5yZWFsdGltZS5sb2FkKGxvYWRlZEZpbGUsXG4gICAgLy8gcnQgZG9jIGxvYWRlZFxuICAgIGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgcnREb2MgPSBmaWxlO1xuXG4gICAgICAvLyBnZXQgb3VyIHJ0IGF0dHJpYnV0ZS4gIFRyaWdnZXJpbmcgY2hhbmdlcyBvbiBydEpzb24gd2lsbCBwdXNoIGV2ZW50c1xuICAgICAgLy8gdG8gYWxsIGxpc3RlbmluZyBjbGllbnRzXG4gICAgICB2YXIganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBqc29uIGF0dHIsIHdlIG5lZWQgdG8gaW5pdGlhbGl6ZSB0aGUgbW9kZWxcbiAgICAgIGlmKCBqc29uID09IG51bGwgfHwgbGl2ZUVkaXRzID09IG51bGwpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBvdXIgcnQgbW9kZWxcbiAgICAgICAgX29uUnRNb2RlbExvYWQoZmlsZS5nZXRNb2RlbCgpKTtcbiAgICAgICAgLy8gZ3JhYiBydCBqc29uIGF0dHIgbm93IHRoYXQgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICAgIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBiYWRuZXNzIGhhcHBlbmVkIDooXG4gICAgICBpZiggIWpzb24gKSByZXR1cm4gY29uc29sZS5sb2coXCJGYWlsZWQgdG8gY29ubmVjdCB0byBydCBqc29uXCIpO1xuICAgICAgLy8gc2V0IHRoYXQgYXR0ciBnbG9iYWwgdG8gY2xhc3NcbiAgICAgIHJ0SnNvbiA9IGpzb247XG5cbiAgICAgIC8vIGdldCBjdXJyZW50IGxpc3Qgb2YgdXNlcnNcbiAgICAgIHZhciB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuXG4gICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aGVuIHBlb3BsZSBjb21lIGFuZCBnb1xuICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9KT0lORUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0xFRlQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBydEpzb24gb2JqZWN0XG4gICAgICAvLyB3aGVuIHRoaXMgdXBkYXRlcywgd2Ugd2FudCB0byByZS1ydW4gdGhlIG1vZGVsXG4gICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9JTlNFUlRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9ERUxFVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuICAgICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxpdmUgZWRpdCB1cGRhdGVzXG4gICAgICAgICAgICAgIGxpdmVFZGl0cy5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlZBTFVFX0NIQU5HRUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgIF91cGRhdGVSdEVkaXRzKGUpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBzaG93IHdobyBpcyBsaXN0ZW5pbmdcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcblxuICAgICAgICAvLyBzZXQgaW5wdXQgaGFuZGxlcnMgZm9yIHJ0IGV2ZW50c1xuICAgIH0sXG4gICAgLy8gbW9kZWwgbG9hZGVkXG4gICAgZnVuY3Rpb24obW9kZWwpe1xuICAgICAgX29uUnRNb2RlbExvYWQobW9kZWwpO1xuICAgIH0sXG4gICAgLy8gZXJyb3JzXG4gICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJUIEVSUk9SUzogXCIpO1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG4gICk7XG59XG5cblxuLyoqKlxuICogVXBkYXRlIHRoZSBkaXNwbGF5IG9mIGFjdGl2ZSB1c2VycyBmb3IgdGhlIG1vZGVsLlxuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycykge1xuICAvLyBpZiBpdCdzIGp1c3QgdXMsIGRvbid0IHNob3cgYW55dGhpbmdcbiAgaWYoICF1c2VycyApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuICBpZiggdXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAvLyB3ZSBvbmx5IHdhbnQgdW5pcXVlIHVzZXJzXG4gIHZhciB1bmlxdWUgPSBbXTtcbiAgdmFyIHV1c2VycyA9IFtdO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1bmlxdWUuaW5kZXhPZih1c2Vyc1tpXS51c2VySWQpID09IC0xICkge1xuICAgICAgdW5pcXVlLnB1c2godXNlcnNbaV0udXNlcklkKTtcbiAgICAgIHV1c2Vycy5wdXNoKHVzZXJzW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYoIHV1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIGFkZCBwaWMgb2YgdXNlciB0byBkaXNwbGF5IHBhbmVsXG4gIHZhciBodG1sID0gXCJBY3RpdmUgVXNlcnMgXCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1dXNlcnNbaV0ucGhvdG9VcmwgKSB7XG4gICAgICBodG1sICs9IFwiPGltZyBzcmM9J1wiK3V1c2Vyc1tpXS5waG90b1VybCtcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgc3R5bGU9J21hcmdpbjowIDVweDt3aWR0aDozMnB4O2hlaWdodDozMnB4JyBjbGFzcz0naW1nLXJvdW5kZWQnIC8+IFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBodG1sICs9IFwiPHNwYW4gc3R5bGU9J3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7bWFyZ2luOjAgNXB4O2JhY2tncm91bmQtY29sb3I6XCIrdXVzZXJzW2ldLmNvbG9yK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyA+PC9zcGFuPiBcIjtcbiAgICB9XG4gIH1cbiAgJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChodG1sKTtcbn1cblxuLyoqKlxuICAgKiAgUmUtcnVuIHRoZSBtb2RlbC4gIEV2ZW50cyBjYW4gY29tZSBpbiBxdWlja2x5IGluIG1hbnkgcGFydHMuICBCdWZmZXIgdGhlIGV2ZW50cyBzbyB3ZSBkb24ndCByZS1ydW4gdGhlIG1vZGVsIHRvbyBtYW55IHRpbWVzLlxuICAgKioqL1xuZnVuY3Rpb24gX3JlcnVuUnQodXNlcnMsIHVzZXJJZCkge1xuICAvLyB0aGlzIGlzIGJhZG5lc3NcbiAgaWYoICFydEpzb24gKSByZXR1cm47XG5cbiAgLy8gY2xlYXIgYW55IHF1ZXVlZCBydW5cbiAgaWYoIF9ydFRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KF9ydFRpbWVyKTtcblxuICAvLyBxdWV1ZSB1cCBhIHJ1biBhbmQgd2FpdCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vIHVwZGF0ZXNcbiAgX3J0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgX3J0VGltZXIgPSAtMTtcblxuICAgIC8vIGZpbmQgdGhlIHVzZXIgd2hvIGlzIHJ1bm5pbmcgdGhlIG1vZGVsIGFuZCBkaXBsYXkgcG9wdXAgb2YgdGhhdCB1c2VycyBpbmZvcm1hdGlvblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdXNlcnNbaV0udXNlcklkID09IHVzZXJJZCApIHtcbiAgICAgICAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZy1vdXRlcicgPjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZycgc3R5bGU9J3dpZHRoOjQwMHB4Jz4gXCIrXG4gICAgICAgICAgICAgICAgKHVzZXJzW2ldLnBob3RvVXJsID8gXCI8aW1nIHNyYz0nXCIrdXNlcnNbaV0ucGhvdG9VcmwrXCInIC8+IFwiIDogXCJcIikrdXNlcnNbaV0uZGlzcGxheU5hbWUrXCIgaXMgdXBkYXRpbmcgdGhlIG1vZGVsLi4uPC9kaXY+PC9kaXY+XCIpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYXBwZW5kKHBhbmVsKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5jc3MoXCJvcGFjaXR5XCIsXCIuOVwiKTtcbiAgICAgICAgICAgIH0sNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMzUwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZSB0aGUgbmV3IG1vZGVsIGRhdGEgYW5kIGxvYWQgaXQgYXMgb3VyIGN1cnJlbnQgc2V0dXBcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocnRKc29uLmdldFRleHQoKSk7XG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAobG9hZGVkRmlsZSwgZGF0YSwgdHJ1ZSk7XG4gIH0sIDMwMCk7XG59XG5cbi8qKipcbiAqIGluaXRpYWxpemUgYSBuZXcgcnQgbW9kZWxcbiAqKiovXG5mdW5jdGlvbiBfb25SdE1vZGVsTG9hZChtb2RlbCkge1xuICAvLyBjdXJyZW50bHkgd2UganVzdCB3YW50IHRvIHVzZSB0aGlzIHNpbmdsZSBhdHRyaWJ1dGUgdG8gYnJvYWRjYXN0IGV2ZW50c1xuICB2YXIganNvbiA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICBpZigganNvbiA9PSBudWxsICkge1xuICAgIHZhciBzdHJpbmcgPSBtb2RlbC5jcmVhdGVTdHJpbmcoXCJ7fVwiKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwianNvblwiLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGxpdmVFZGl0cyA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gIGlmKCBsaXZlRWRpdHMgPT0gbnVsbCApIHtcbiAgICB2YXIgZmllbGQgPSBtb2RlbC5jcmVhdGVNYXAoKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwibGl2ZUVkaXRzXCIsIGZpZWxkKTtcbiAgfVxuXG59XG5cbi8qKipcbiAqIGxldCB0aGUgd29ybGQga25vdyB3aGF0IHdlIGFyZSBkb2luZyA6KVxuICogVGhpcyBzaG91bGQgYmUgY2FsbGVkIHdoZW4gYSBsb2NhbCB1c2VyIHJ1bnMgdGhlIG1vZGVsLiAgSXQgdXBkYXRlcyB0aGUgJ2pzb24nXG4gKiBhdHRyaWJ1dGUgd2hpY2ggaXMgdGhlbiBicm9hZGNhc3QgdG8gYWxsIGxpc3RlbmluZyBwYXJ0aWVzXG4gKioqL1xuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIHJ0SnNvbiApIHJ0SnNvbi5zZXRUZXh0KEpTT04uc3RyaW5naWZ5KCBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCkgKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcbiAgaW5pdFJ0QXBpICA6IGluaXRSdEFwaSxcbiAgc2V0QXBwIDogZnVuY3Rpb24oYXBwbGljYXRpb24pIHtcbiAgICBhcHAgPSBhcHBsaWNhdGlvbjtcbiAgfVxufTtcbiIsInZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG52YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG52YXIgd2VhdGhlciA9IHJlcXVpcmUoJy4vd2VhdGhlcicpO1xudmFyIHdlYXRoZXJDaGFydCA9IHJlcXVpcmUoJy4vd2VhdGhlci9jaGFydCcpO1xudmFyIHdlYXRoZXJGaWxlUmVhZGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyL2ZpbGVSZWFkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblxudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBudWxsO1xudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbnZhciBTRVRVUF9URU1QTEFURSA9XG4gICc8ZGl2PicrXG4gICc8aDQ+Q2hhcnQgT3B0aW9uczwvaDQ+JytcbiAgJzxkaXY+JytcbiAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+T3V0cHV0IHZhcmlhYmxlKHMpIHRvIGNoYXJ0IDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD4gPGEgaWQ9XCJzZWxlY3QtY2hhcnRzLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IENoYXJ0czwvYT48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5WYXJpYXRpb24gYW5hbHlzaXMgcGFyYW1ldGVyKHMpIDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD48ZGl2IGlkPVwidmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIj5Ob25lPC9kaXY+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAnPC90YWJsZT4nK1xuICAnPC9kaXY+JytcbiAgJzxoNCBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+VGltZSBTdGVwPC9oND4nK1xuICAgJzxkaXYgY2xhc3M9XCJmb3JtLWhvcml6b250YWxcIj4nK1xuICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICAgICc8bGFiZWwgZm9yPVwiaW5wdXQtc2V0dXAtZGF5c19pbl9pbnRlcnZhbFwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPkRheXMgaW4gSW50ZXJ2YWw8L2xhYmVsPicrXG4gICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsXCIgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9XCIxXCIvPicrXG4gICAgICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+SG93IG1hbnkgZGF5cyBhcmUgaW4gZWFjaCBzdGVwIG9mIHRoZSBtb2RlbDwvcD4nICtcbiAgICAgICAnPC9kaXY+JytcbiAgICAgJzwvZGl2PicrXG4gICAnPC9kaXY+JytcbiAgICc8aDQgY2xhc3M9XCJwYWdlLWhlYWRlclwiPkxvY2F0aW9uPC9oND4nK1xuICAgJzxkaXY+JytcbiAgICAgJzxzcGFuIGlkPVwiY3VycmVudC1sb2NhdGlvblwiIHN0eWxlPVwiY29sb3I6Izg4OFwiPjwvc3Bhbj4nK1xuICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBzZWxlY3Qtd2VhdGhlci1sb2NhdGlvblwiPjxpIGNsYXNzPVwiaWNvbi1tYXAtbWFya2VyXCI+PC9pPiBTZWxlY3QgTG9jYXRpb248L2E+JytcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBHT09MRURSSVZFX1RSRUVfVEVNUExBVEUgPVxuICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTVweCAwIDVweCAwO21hcmdpbi1ib3R0b206NXB4O2hlaWdodDogNTBweFwiPicrXG4gICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgcHVsbC1yaWdodFwiIGlkPVwidHJlZS1zdWItbWVudVwiPicrXG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPicrXG4gICAgICAgICc8c3BhbiBpZD1cImxvYWRlZC10cmVlLW5hbWVcIj5EZWZhdWx0IFRyZWU8L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JytcbiAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS10cmVlLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLWxlZnQ6MTBweFwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAnPC91bD4nK1xuICAnPC9kaXY+JytcbiAgJzxkaXYgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjb21wYXJlLXRyZWVzXCIgLz4gQ29tcGFyZSBUcmVlczwvZGl2PicrXG4nPC9kaXY+JztcblxudmFyIElOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICc8aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInt7aWR9fVwiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cInt7dmFsdWV9fVwiPiZuYnNwOyZuYnNwO3t7dW5pdHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+JztcblxudmFyIEFSUkFZX0lOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJjb2wtbGctNlwiPjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICd7e2lucHV0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj48L2Rpdj4nO1xuXG52YXIgdGFiSGVhZGVyID0gJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cImlucHV0X3BpbGxzXCI+JztcbnZhciBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPic7XG5cbnZhciB0cmVlSGVhZGVyID0gJzxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiIGlkPVwidHJlZS1hY2NvcmRpb25cIj4nO1xudmFyIFRSRUVfUEFORUxfVEVNUExBVEUgPSAnPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj4nK1xuICAgICAgICAgICAgJzxoNCBjbGFzcz1cInBhbmVsLXRpdGxlXCI+JytcbiAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJhY2NvcmRpb24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PVwiI3RyZWUtYWNjb3JkaW9uXCIgaHJlZj1cIiNjb2xsYXBzZXt7aWR9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICd7e3RpdGxlfX0nK1xuICAgICAgICAgICAgICAgICc8L2E+JytcbiAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImNvbGxhcHNle3tpZH19XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj57e2JvZHl9fTwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAnPC9kaXY+JztcblxudmFyIGlucHV0cyA9IHt9O1xuXG4vLyBmb3Igd2VhdGhlciBkYXRhXG52YXIgY29scyA9IFtdO1xuXG52YXIgbWFwID0gbnVsbDtcblxuLyoqXG4gKiBPcHRpb25zIDpcbiAqICAgbW9kZWwgLSB0eXBlIG9mIG1vZGVsIHRvIGFwcGVuZCB0b1xuICogICBsYWJlbCAtIGF0dHJpYnV0ZSBsYWJlbFxuICogICB2YWx1ZSAtIGRlZmF1bHQgdmFsdWVcbiAqICAgZGVzY3JpcHRpb24gLSBkZXNjcmlwdGlvbiBvZiBhdHRyaWJ1dGVcbiAqICAgdW5pdHMgLSBhdHRyaWJ1dGUgdW5pdHNcbiAqL1xuZnVuY3Rpb24gX2FkZElucHV0KG9wdGlvbnMpIHtcbiAgaWYoICFpbnB1dHNbb3B0aW9ucy5tb2RlbF0gKSBpbnB1dHNbb3B0aW9ucy5tb2RlbF0gPSBbXTtcbiAgaW5wdXRzW29wdGlvbnMubW9kZWxdLnB1c2gob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVXZWF0aGVySW5wdXRzKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICB2YXIgdGFibGUgPSAnPGRpdiBzdHlsZT1cInBhZGRpbmctdG9wOjI1cHhcIj48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XCIgaWQ9XCJsb2FkLXdlYXRoZXItYnRuXCI+PGkgY2xhc3M9XCJpY29uLXVwbG9hZC1hbHRcIj48L2k+IFVwbG9hZDwvYT4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGlkPVwid2VhdGhlci1pbnB1dC10b2dnbGVcIj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5BdmVyYWdlczwvYnV0dG9uPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+QWN0dWFsPC9idXR0b24+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLXBhbmVsXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLXRvcDoyMHB4XCI+PC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJhdmVyYWdlLXdlYXRoZXItcGFuZWxcIj4nK1xuICAgICAgICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTBweDtjb2xvcjojODg4XCI+U2VsZWN0IGxvY2F0aW9uIHRvIHNldCB0aGUgYXZlcmFnZSB3ZWF0aGVyIGRhdGE8L2Rpdj4nK1xuICAgICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1jb25kZW5zZWQgd2VhdGhlci10YWJsZVwiIHN0eWxlPVwibWFyZ2luLXRvcDoyMHB4XCI+JztcblxuICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIHRhYmxlICs9IFwiPHRkPlwiK2NvbHNbaV0rXCI8L3RkPlwiO1xuICB9XG4gIHRhYmxlICs9IFwiPC90cj5cIjtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHRhYmxlICs9IFwiPHRyPlwiO1xuICAgIGZvciggdmFyIGogPSAwOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIGlmKCBqID09IDAgKSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPlwiKyhpKzEpK1wiPC90ZD5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBpZD0naW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20rXCInIHR5cGU9J3RleHQnIC8+PC90ZD5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICB9XG4gIHJldHVybiB0YWJsZSsnPC90YWJsZT48ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+PC9kaXY+JztcblxufVxuXG5mdW5jdGlvbiBfc2V0V2VhdGhlckRhdGEoKSB7XG4gIHZhciBsbCA9IGFwcC5xcyhcImxsXCIpO1xuICBpZiggbGwgKSB7XG4gICAgbGwgPSBsbC5zcGxpdChcIixcIik7XG4gICAgX3F1ZXJ5V2VhdGhlckRhdGEobGxbMF0sIGxsWzFdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoXCJOb3QgU2V0XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9xdWVyeVdlYXRoZXJEYXRhKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd3ZWF0aGVyLWRhdGEtcXVlcnknLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjaygpO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV0gPSB7fTtcbiAgICAgIGZvciggdmFyIGogPSAxOyBqIDwgdGFibGUuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbSkudmFsKHRhYmxlLnJvd3NbaV0uY1tqXSA/IHRhYmxlLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciBlcnJvciA9IGZhbHNlO1xuICAgIHZhciB0YWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0YWJsZS5yb3dzWzBdID09IG51bGwgKSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgYWxlcnQoXCJJbnZhbGlkIGxvY2F0aW9uIHNlbGVjdGVkXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGtleSA9IHRhYmxlLmNvbHNbaV0uaWQ7XG4gICAgICBpZigga2V5ID09PSAnbWF4YXdzJyApIGtleSA9ICdtYXhBV1MnO1xuXG4gICAgICAkKFwiI2lucHV0LXNvaWwtXCIra2V5KS52YWwodGFibGUucm93c1swXS5jW2ldLnYpO1xuICAgIH1cblxuICAgIGlmKCAhZXJyb3IgKSBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwobG5nK1wiLCBcIitsYXQrXCIgPGEgaHJlZj0nXCIrd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qLywnJykrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj9sbD1cIitsbmcrXCIsXCIrbGF0K1wiJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPjwvYT5cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpIHtcbiAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgdmFyIHZhbCA9ICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20pLnZhbCgpO1xuICAgICAgaWYoIHZhbCAmJiB2YWwubGVuZ3RoID4gMCApIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dW2NvbHNbal1dID0gcGFyc2VJbnQodmFsKTtcbiAgICAgIGVsc2Ugd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV1bY29sc1tqXV0gPSAwO1xuICAgIH1cbiAgfVxuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbn1cblxuZnVuY3Rpb24gX3NlbGVjdFdlYXRoZXJMb2NhdGlvbigpIHtcbiAgaWYoICFtYXAgKSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCh7fSk7XG5cbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikub24oJ2NsaWNrJywgX2dldExvY2F0aW9uKTtcblxuXG4gICAgLy8gd2FpdCBmb3IgdGhlIG1vZGFsIHRvIGluaXRcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG5cbiAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoJChcIiNnbWFwXCIpWzBdLCB7XG4gICAgICAgIGNlbnRlciA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMzUsIC0xMjEpLFxuICAgICAgICB6b29tOiA1LFxuICAgICAgICBtYXBUeXBlSWQgOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBkZWZhdWx0U3R5bGUgPSB7XG4gICAgICAgICAgICBwb2x5Z29uT3B0aW9uczoge1xuICAgICAgICAgICAgICBzdHJva2VDb2xvciAgIDogXCIjMDAwMEZGXCIsXG4gICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHkgOiAwLjUsXG4gICAgICAgICAgICAgIGZpbGxDb2xvciAgICAgOiAnI0ZFRkVGRScsXG4gICAgICAgICAgICAgIGZpbGxPcGFjaXR5ICAgOiAwLjJcbiAgICAgICAgICAgIH0sXG4gICAgICB9O1xuXG5cbiAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgc2VsZWN0OiAnYm91bmRhcnknLFxuICAgICAgICAgICAgZnJvbTogJzFoVjl2UUczU2MwSkxQZHVGcFdKenRmTEstZXg2Y2N5TWdfcHRFX3MnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZXM6IFtkZWZhdWx0U3R5bGVdLFxuICAgICAgICAgIHN1cHByZXNzSW5mb1dpbmRvd3MgOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICB2YXIgZnVzaW9uTGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuRnVzaW9uVGFibGVzTGF5ZXIoZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgZnVzaW9uTGF5ZXIub3BhY2l0eSA9IC44O1xuICAgICAgZnVzaW9uTGF5ZXIuc2V0TWFwKG1hcCk7XG5cbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgYWxlcnQoJ1lvdSBtdXN0IGNsaWNrIG9uIGEgZ2VvbWV0cnkgdG8gY2FjaGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGZ1c2lvbkxheWVyLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBvZmZsaW5lLmNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldHVwIGlucHV0IGZvciBjbGVhcmluZyBjYWNoZVxuICAgICAgICAgICQoJyNjbGVhci1jYWNoZWQtdGlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBvZmZsaW5lLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcblxuICAgIH0sNTAwKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG5cbiAgICAvLyB3ZSBzZWVtIHRvIGJlIGhhbmdpbmcgc29tZXRpbWVzLi4uLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcbiAgICB9LCA1MDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbigpIHtcbiAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikuYWRkQ2xhc3MoXCJidG4td2FybmluZ1wiKTtcbiAgfSBlbHNle1xuICAgIHdpbmRvdy5hbGVydChcIkdlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyLlwiKTtcbiAgfVxuICBmdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJidG4td2FyblwiKS5hZGRDbGFzcyhcImJ0bi1zdWNjZXNzXCIpO1xuICAgIG1hcC5zZXRab29tKDEwKTtcbiAgICBtYXAuc2V0Q2VudGVyKG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSk7XG4gICAgLy9fcXVlcnlXZWF0aGVyRGF0YShwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUlucHV0cyhpLCB0eXBlLCBwcmVmaXgsIG5hbWUsIGF0dHJzKSB7XG4gIHZhciBpZCA9IHByZWZpeC5sZW5ndGggPiAwID8gcHJlZml4KyctJytuYW1lIDogJ2lucHV0LScrbmFtZTtcbiAgdmFyIGlucHV0ID0gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDonKyhpKjIwKSsncHg7bWFyZ2luLXRvcDowcHg7bWFyZ2luLXJpZ2h0OjVweFwiPic7XG5cbiAgdmFyIHRyZWVib2R5ID0gXCJcIjtcblxuICBpZiggIShpID09IDEpICkge1xuICAgICAgaWYoIGkgIT0gMCApIGlucHV0ICs9ICc8bGFiZWwgZm9yPVwiJytpZCsnXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+JytuYW1lICsnPC9sYWJlbD4nO1xuICAgICAgaW5wdXQgKz0gJzxkaXY+JztcbiAgfVxuXG5cbiAgICAgIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICYmIGkgPT0gMSAgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICB0cmVlYm9keSArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyApIHtcbiAgICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlucHV0ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggKHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycpICYmIGkgPT0gMSApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG5cbiAgICAgIHRyZWVib2R5ICs9XG4gICAgICAgICAgJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICcrXG4gICAgICAgICAgKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlKydcIiBpZD1cIicrXG4gICAgICAgICAgaWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICB9IGVsc2UgaWYgKCAgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuICAgIGlucHV0ICs9ICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnXG4gICAgICAgICAgKyh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZStcbiAgICAgICAgICAgJ1wiIGlkPVwiJytpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgfVxuXG4gIGlmKCAhKGkgPT0gMSAvKiYmIHR5cGUgPT0gJ3RyZWUnKi8pICkge1xuICAgICAgaW5wdXQgKz0gJzwvZGl2PjwvZGl2Pic7XG4gIH0gZWxzZSB7XG4gICAgICBpbnB1dCArPSBUUkVFX1BBTkVMX1RFTVBMQVRFXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3tpZH19L2csaWQpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3t0aXRsZX19JyxuYW1lK1wiIDxzcGFuIHN0eWxlPSdjb2xvcjojODg4O2ZvbnQtc2l6ZToxMnB4Jz4gLSBcIithdHRycy5kZXNjcmlwdGlvbitcIjwvc3Bhbj5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2JvZHl9fScsdHJlZWJvZHkpKyc8L2Rpdj4nXG4gIH1cblxuICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShlbGUpIHtcbiAgd2VhdGhlckZpbGVSZWFkZXIuaW5pdChhcHApO1xuICB2YXIgbW9kZWwsIG0sIGF0dHIsIGNvbmZpZztcblxuICB2YXIgaW5wdXRzID0gJC5leHRlbmQodHJ1ZSwge30sIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpKTtcblxuICBpbnB1dHNbJ3NldHVwJ10gPSB7fTtcbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgbSA9IGlucHV0c1ttb2RlbF07XG4gICAgZm9yKCBhdHRyIGluIG0gKSB7XG4gICAgICBjb25maWcgPSBtW2F0dHJdO1xuXG4gICAgICBpZiggdHlwZW9mIGNvbmZpZyA9PSAnb2JqZWN0JyApIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0cixcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IGNvbmZpZy5kZXNjcmlwdGlvbixcbiAgICAgICAgICB2YWx1ZSAgICAgICA6IGNvbmZpZy52YWx1ZSxcbiAgICAgICAgICB1bml0cyAgICAgICA6IGNvbmZpZy51bml0c1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBpZiggbW9kZWwgPT0gXCJwbGFudGF0aW9uX3N0YXRlXCIgKSBjb250aW51ZTtcblxuICAgIHRhYkhlYWRlciArPSAnPGxpPjxhIGhyZWY9XCIjaW5wdXRzXycrbW9kZWwrJ1wiIGlkPVwidGFiX2lucHV0c18nK21vZGVsKydcIiBkYXRhLXRvZ2dsZT1cInBpbGxcIj4nXG4gICAgICAgICAgICAgICAgK21vZGVsLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkrbW9kZWwuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkrJzwvYT48L2xpPic7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbnB1dHNbbW9kZWxdO1xuXG4gICAgY29udGVudCArPSAnIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBmYWRlXCIgaWQ9XCJpbnB1dHNfJyttb2RlbCsnXCI+JztcblxuICAgIHZhciByb3cxID0gXCJcIjtcbiAgICB2YXIgcm93MiA9IFwiPGRpdiBjbGFzcz0nY29sLWxnLTY+XCI7XG5cbiAgICBpZiggbW9kZWwgPT0gJ3dlYXRoZXInICkge1xuICAgICAgY29udGVudCArPSBfY3JlYXRlV2VhdGhlcklucHV0cygpO1xuICAgIH0gZWxzZSBpZiggbW9kZWwgPT0gJ3NldHVwJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gU0VUVVBfVEVNUExBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCArPSB0cmVlSGVhZGVyO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgZ29vZ2xlIGRyaXZlIGJ0biBmcm9tIHRyZWVzXG4gICAgICAgIGlmKCBtb2RlbCA9PSd0cmVlJyApIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gICAgICAgIH1cblxuICAgICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgICB9XG5cblxuICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIH1cbiAgY29udGVudCArPSAnPC9kaXY+JztcbiAgdGFiSGVhZGVyICs9IFwiPC91bD5cIjtcblxuICBlbGUuaHRtbCh0YWJIZWFkZXIrXCI8ZGl2IGNsYXNzPSdmb3JtLWhvcml6b250YWwnPlwiK2NvbnRlbnQrXCI8L2Rpdj5cIik7XG5cbiAgLy8gcnVuIHRoZSBtb2RlbCB3aGVuZXZlciBzb21lIGhpdHMgJ2VudGVyJ1xuICBlbGUuZmluZCgnaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgYXBwLnJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBsb2FkaW5nIGEgdHJlZVxuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd0xvYWRUcmVlUGFuZWwoKTtcbiAgfSk7XG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtc2F2ZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93U2F2ZVRyZWVQYW5lbCgpO1xuICB9KTtcblxuICAvLyBzZXQgdHJlZSBpbnB1dCBoYW5kbGVyc1xuICAkKFwiI2NvbXBhcmUtdHJlZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiggJCh0aGlzKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzZXQgcGlsbCBjbGljayBoYW5kbGVyc1xuICAkKCcjaW5wdXRfcGlsbHMgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICQodGhpcykudGFiKCdzaG93JylcbiAgfSk7XG4gICQoJyN0YWJfaW5wdXRzX3dlYXRoZXInKS50YWIoJ3Nob3cnKTtcblxuICAkKCcuc2VsZWN0LXdlYXRoZXItbG9jYXRpb24nKS5vbignY2xpY2snLCBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKTtcblxuXG4gICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoe3Nob3c6ZmFsc2V9KTtcbiAgJCgnI2xvYWQtd2VhdGhlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJChcIiN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG4uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgaWYoICQodGhpcykuaHRtbCgpID09ICdBdmVyYWdlcycgKSB7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ZWF0aGVyLnNldChhcHAuZ2V0TW9kZWwoKSk7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmKCB3ZWF0aGVyQXZlcmFnZUNoYXJ0ICl7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIF9zZXRXZWF0aGVyRGF0YSgpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpIHtcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURTtcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwic2luZ2xlLXRyZWUtY29udGVudFwiPic7XG4gIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJjb21wYXJlLXRyZWUtY29udGVudFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgJzx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiPicrXG4gICAgICAgICAgJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjdHJlZTFcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMTwvYT48L2xpPicrXG4gICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCIjdHJlZTJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMjwvYT48L2xpPicrXG4gICAgICAgICc8L3VsPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUxXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDEnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMlwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCIgPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MicsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgJzwvZGl2Pic7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cblxucmV0dXJuIHtcbiAgY3JlYXRlIDogY3JlYXRlLFxuICB1cGRhdGVBdmVyYWdlQ2hhcnQ6IHVwZGF0ZUF2ZXJhZ2VDaGFydFxufTtcblxufTtcbiIsInZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xudmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbi8vIFNwZWNpYWwgU2F1Y2UuLi5cbi8vIGJhc2ljYWxseSB0aGUgY29kZSBsb2FkZWQgZnJvbSBHaXRIdWIgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHRvIGV4aXN0cyBpbiB0aGUgd2luZG93IHNjb3BlXG4vLyAgIG0zUEdJT1xuLy8gICAgIC0gcmVhZEFsbENvbnRhbnRzXG4vLyAgICAgLSByZWFkV2VhdGhlclxuLy8gICAgIC0gZHVtcFxuLy8gICAgIC0gcmVhZEZyb21JbnB1dHNcbi8vIFNvIHdlIGluamVjdCBmdW5jdGlvbnMgdGhhdCBpbnRlcmFjdCB3LyBvdXIgVUksIG1vZGVsIGluIG5vIHdheSBjYXJlc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIG1vZGVsLmRlYnVnID0gdHJ1ZTtcblxuICAgIGlmKCAhbW9kZWwucGxhbnRhdGlvbiApIG1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICB0aGlzLnJlYWRBbGxDb25zdGFudHMobW9kZWwucGxhbnRhdGlvbik7XG5cbiAgICBpZiggIW1vZGVsLndlYXRoZXIgKSBtb2RlbC53ZWF0aGVyID0ge307XG4gICAgaWYoICFtb2RlbC5tYW5hZ2UgKSBtb2RlbC5tYW5hZ2UgPSB7fTtcblxuICAgIHRoaXMucmVhZFdlYXRoZXIobW9kZWwud2VhdGhlciwgbW9kZWwubWFuYWdlKTtcblxuICAgIGRlbGV0ZSB0aGlzLm1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXM7XG4gIH0sXG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnBsYW50YXRpb24pIHtcbiAgICAgIC8vICAgIHBsYW50YXRpb25ba2V5XSA9IHRoaXMubW9kZWwucGxhbnRhdGlvbltrZXldO1xuICAgICAgLy99XG5cbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gdGhpcy5tb2RlbC50cmVlO1xuXG4gICAgICAvLyBzZXR1cCBzZWVkbGluZyBUcmVlXG4gICAgICAvLyBUT0RPOiBoYXJkY29kZWQgZm9yIG5vdywgdGhpcyBzaG91bGRuJ3QgYmVcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMubW9kZWwudHJlZSk7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5zdGVtc1BlclN0dW1wID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnBmcy5zdGVtQ250ID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnJvb3RQID0ge1xuICAgICAgICAgIExBSVRhcmdldCA6IDEwLFxuICAgICAgICAgIGVmZmljaWVuY3kgOiAwLjYsXG4gICAgICAgICAgZnJhYyA6IDAuMDFcbiAgICAgIH07XG4gIH0sXG5cbiAgcmVhZFdlYXRoZXIgOiBmdW5jdGlvbih3ZWF0aGVyTWFwLCBtYW5hZ2UpIHtcbiAgICAgIHZhciBkYXRlUGxhbnRlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVQbGFudGVkICYmIGRhdGVQbGFudGVkICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hbmFnZS5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlQ29wcGljZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZUNvcHBpY2VkICYmIGRhdGVDb3BwaWNlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVDb3BwaWNlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIERhdGVGaW5hbEhhcnZlc3QgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICAgICAgaWYgKERhdGVGaW5hbEhhcnZlc3QgJiYgRGF0ZUZpbmFsSGFydmVzdCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLkRhdGVGaW5hbEhhcnZlc3QgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgeWVhcnNQZXJDb3BwaWNlID0gJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpO1xuICAgICAgaWYgKHllYXJzUGVyQ29wcGljZSAmJiB5ZWFyc1BlckNvcHBpY2UgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPSBwYXJzZUludCgkKFwiI2lucHV0LW1hbmFnZS1jb3BwaWNlSW50ZXJ2YWxcIikudmFsKCkpO1xuICAgICAgfVxuXG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICBtb250aCA6IChpICsgMSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgICAgICAgaWYoIG0ubGVuZ3RoID09PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICAgICAgZm9yICggdmFyIGogPSAxOyBqIDwgY29uZmlnLmlucHV0cy53ZWF0aGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciBjID0gY29uZmlnLmlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgICAgICBpdGVtW2NdID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKSk7XG5cbiAgICAgICAgICAgICAgaWYoIGlzTmFOKGl0ZW1bY10pICkge1xuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoIHZhbGlkICkge1xuICAgICAgICAgICAgaXRlbS5ucmVsID0gaXRlbS5yYWQgLyAwLjAwMzY7XG4gICAgICAgICAgICB3ZWF0aGVyTWFwW21dID0gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKCB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGZvciggdmFyIGRhdGUgaW4gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5ucmVsID0gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5yYWQgLyAwLjAwMzY7XG4gICAgICAgICAgICAgIC8vY3VzdG9tV2VhdGhlck1hcFtkYXRlXSA9IGN1c3RvbV93ZWF0aGVyW2RhdGVdO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3ZWF0aGVyTWFwO1xuICB9LFxuXG4gIC8vIHJlYWQgYSB2YWx1ZSBmcm9tIHRoZSBpbnB1dFxuICAvLyBpdCBoYXMgYSAnLCcgaXMgc2V0IGZvciB2YXJpYXRpb25cbiAgX3JlYWRWYWwgOiBmdW5jdGlvbihlbGUpIHtcbiAgICAgIHZhciB2YWwgPSBlbGUudmFsKCk7XG4gICAgICBpZiggdmFsLm1hdGNoKC9cXGQqLVxcZCotXFxkKiQvKSApIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfSBlbHNlIGlmKCB2YWwubWF0Y2goLy4qLC4qLykgKSB7XG4gICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xccy9nLCcnKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgdmFyIGlkID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKC9eaW5wdXQtLywnJykucmVwbGFjZSgvLS9nLCcuJyk7XG4gICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXSA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdLnB1c2gocGFyc2VGbG9hdCh2YWxbaV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF1bMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpO1xuICB9LFxuXG4gIGR1bXAgOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGluIGFwcFxuICB9LFxuXG4gIHJlYWRGcm9tSW5wdXRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZWFkIHNvaWxcbiAgICAgIHRoaXMubW9kZWwuc29pbCA9IHt9O1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLm1heEFXUyA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLW1heEFXU1wiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3dwb3dlciA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3cG93ZXJcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3Y29uc3QgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd2NvbnN0XCIpKTtcblxuICAgICAgdGhpcy5tb2RlbC5zZXR1cCA9IHtcbiAgICAgICAgZGF5c19pbl9pbnRlcnZhbCA6IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsXCIpKVxuICAgICAgfTtcblxuICAgICAgLy8gcmVhZCBtYW5hZ2VcbiAgICAgIHRoaXMubW9kZWwubWFuYWdlID0ge1xuICAgICAgICAgIGNvcHBpY2UgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBlbGVzID0gJChcIi5tYW5hZ2VcIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5tYW5hZ2VbZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtbWFuYWdlLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvblxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb24gKSB0aGlzLm1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICAgIGVsZXMgPSAkKFwiLnBsYW50YXRpb25cIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXBsYW50YXRpb24tXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCB0cmVlXG4gICAgICB2YXIgdHJlZUlucHV0cyA9ICQoXCIudHJlZVwiKTtcbiAgICAgIHRoaXMubW9kZWwudHJlZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHJlZUlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKHRyZWVJbnB1dHNbaV0pO1xuXG4gICAgICAgICAgdmFyIHBhcnRzID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtdHJlZS1cIiwgXCJcIikuc3BsaXQoXCItXCIpO1xuICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSlcbiAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB7fTtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXVtwYXJ0c1sxXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb24gc3RhdGVcbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlID0ge307XG4gICAgICBmb3IgKCB2YXIga2V5IGluIHRoaXMubW9kZWwuZ2V0RGF0YU1vZGVsKCkucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGVba2V5XSA9IC0xO1xuICAgICAgfVxuXG4gIH0sXG5cbiAgLy8gdGhpcyBpcyB0aGUgc25hcHNob3Qgd2Ugc2F2ZSB0byBnb29nbGUgZHJpdmVcbiAgZXhwb3J0U2V0dXAgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9ucyA9IHt9O1xuICAgICAgdGhpcy5yZWFkRnJvbUlucHV0cygpO1xuICAgICAgdGhpcy5yZWFkV2VhdGhlcihbXSwge30sIHt9KTtcblxuICAgICAgdmFyIGV4ID0ge1xuICAgICAgICAgIHdlYXRoZXIgOiB0aGlzLm1vZGVsLndlYXRoZXIsXG4gICAgICAgICAgY3VzdG9tX3dlYXRoZXIgOiB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyLFxuICAgICAgICAgIHNldHVwIDogdGhpcy5tb2RlbC5zZXR1cCxcbiAgICAgICAgICB0cmVlIDogdGhpcy5tb2RlbC50cmVlLFxuICAgICAgICAgIHBsYW50YXRpb24gOiB0aGlzLm1vZGVsLnBsYW50YXRpb24sXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgc29pbCA6IHRoaXMubW9kZWwuc29pbCxcbiAgICAgICAgICBtYW5hZ2UgOiB0aGlzLm1vZGVsLm1hbmFnZSxcbiAgICAgICAgICBwbGFudGF0aW9uX3N0YXRlIDogdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlLFxuICAgICAgICAgIGNvbmZpZyA6IHtcbiAgICAgICAgICAgICAgY2hhcnRUeXBlSW5wdXQgOiAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgICBkYXlzVG9SdW4gOiB0aGlzLmFwcC5kYXlzVG9SdW4oKSxcbiAgICAgICAgICAgICAgY3VycmVudExvY2F0aW9uIDogJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgbG9hZGVkVHJlZSA6ICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKCksXG4gICAgICAgICAgICAgIHZlcnNpb24gOiB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgPyB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgOiBcIm1hc3RlclwiXG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBieSBkZWZhdWx0IHRoZSByZWFkIGZ1bmN0aW9uIHNldCB0aGUgdmFyaWF0aW9ucyB2YXJpYWJsZXMgYnV0IG9ubHlcbiAgICAgIC8vIHJldHVybnMgdGhlIGZpcnN0LCBzZXQgdGhlIHZhcmlhdGlvbiBwYXJhbXMgdG8gdGhlaXIgY29ycmVjdCB2YWx1ZXNcbiAgICAgIGZvciggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICB2YXIgcGFyYW0gPSBleDtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aC0xOyBpKysgKSB7XG4gICAgICAgICAgICAgIHBhcmFtID0gcGFyYW1bcGFydHNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbVtwYXJ0c1twYXJ0cy5sZW5ndGgtMV1dID0gdGhpcy5tb2RlbC52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXg7XG4gIH0sXG4gIGxvYWRUcmVlIDogZnVuY3Rpb24odHJlZSkge1xuICAgICAgZm9yICggdmFyIHJvb3RLZXkgaW4gdHJlZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdHJlZVtyb290S2V5XSAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5KS52YWwodHJlZVtyb290S2V5XSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9yICggdmFyIGNoaWxkS2V5IGluIHRyZWVbcm9vdEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkgKyBcIi1cIiArIGNoaWxkS2V5KS52YWwodHJlZVtyb290S2V5XVtjaGlsZEtleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9LFxuICBsb2FkU2V0dXAgOiBmdW5jdGlvbihmaWxlaWQsIHNldHVwLCBpc1J0KSB7XG5cbiAgICAgIC8vIGxvYWQgY29uZmlnXG4gICAgICBpZiAoc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0KSB7XG4gICAgICAgICAgdGhpcy5jaGFydHMudW5zZWxlY3RBbGwoKTtcbiAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5jaGFydHMuc2VsZWN0KHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jdXJyZW50TG9jYXRpb24pIHtcbiAgICAgICAgICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmKCBzZXR1cC5jb25maWcubG9hZGVkVHJlZSApIHtcbiAgICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChzZXR1cC5jb25maWcubG9hZGVkVHJlZSkucGFyZW50KCkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICBpZiggc2V0dXAuc2V0dXAgJiYgc2V0dXAuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCApIHtcbiAgICAgICAgJCgnI2lucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWwnKS52YWwoc2V0dXAuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxvYWQgd2VhdGhlclxuICAgICAgaWYoIEFycmF5LmlzQXJyYXkoc2V0dXAud2VhdGhlcikgKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNldHVwLndlYXRoZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGluY0luZGV4ID0gZmFsc2UsIGluZGV4O1xuICAgICAgICBpZiggc2V0dXAud2VhdGhlclswXSAhPT0gdW5kZWZpbmVkIHx8IHNldHVwLndlYXRoZXJbJzAnXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIGluY0luZGV4ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIHZhciBpIGluIHNldHVwLndlYXRoZXIgKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpIGNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiggaW5jSW5kZXggKSBpbmRleCA9IChwYXJzZUludChpKSsxKSsnJztcbiAgICAgICAgICAgICAgICBlbHNlIGluZGV4ID0gaSsnJztcblxuICAgICAgICAgICAgICAgIGlmKCBpbmRleC5sZW5ndGggPT09IDEgKSBpbmRleCA9ICcwJytpbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpbmRleCkudmFsKHNldHVwLndlYXRoZXJbaV1ba2V5XSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGluZGV4KS52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKCBzZXR1cC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyID0gc2V0dXAuY3VzdG9tX3dlYXRoZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBjaGFydFxuICAgICAgdGhpcy5pbnB1dEZvcm0udXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG5cbiAgICAgIC8vIGxvYWQgdHJlZVxuICAgICAgdGhpcy5sb2FkVHJlZShzZXR1cC50cmVlKTtcblxuICAgICAgLy8gbG9hZCBwbGFudGluZyBwYXJhbXNcbiAgICAgIC8vIE5vdyBwYXJ0IG9mIG1hbmFnZS4uLi5cbiAgICAgIC8vIGZvXG4gICAgICBpZiAoc2V0dXAubWFuYWdlKSB7XG4gICAgICAgICAgdmFyIG1hcCA9IHtcbiAgICAgICAgICAgICAgXCJkYXRlUGxhbnRlZFwiIDogXCJEYXRlUGxhbnRlZFwiLFxuICAgICAgICAgICAgICBcImRhdGVDb3BwaWNlZFwiIDogXCJEYXRlQ29wcGljZWRcIixcbiAgICAgICAgICAgICAgXCJ5ZWFyc1BlckNvcHBpY2VcIiA6IFwiQ29wcGljZUludGVydmFsXCJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLm1hbmFnZSkge1xuICAgICAgICAgICAgICB2YXIgbmV3S2V5ID0ga2V5O1xuICAgICAgICAgICAgICBpZiggbWFwW2tleV0gKSBuZXdLZXkgPSBtYXBba2V5XTtcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHNldHVwLm1hbmFnZVtrZXldID09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtXCIgKyBuZXdLZXkpLnZhbChzZXR1cC5tYW5hZ2Vba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLm1hbmFnZVtrZXldKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgdmFsdWUgaXMgZGVwcmVjYXRlZCwgc2V0IHRvIG5ldyBpbnB1dFxuICAgICAgaWYoIHNldHVwLmNvbmZpZy5kYXlzVG9SdW4gKSB7XG4gICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShzZXR1cC5tYW5hZ2UuZGF0ZVBsYW50ZWQgfHwgc2V0dXAubWFuYWdlLkRhdGVQbGFudGVkKTtcbiAgICAgICAgICBkID0gbmV3IERhdGUobmV3IERhdGUoZCkuc2V0TW9udGgoZC5nZXRNb250aCgpK3BhcnNlSW50KHNldHVwLmNvbmZpZy5kYXlzVG9SdW4pKSk7XG4gICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoZC50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICB9XG5cblxuICAgICAgLy8gbG9hZCByZXN0XG4gICAgICB2YXIgaW5wdXRzID0gWyBcInBsYW50YXRpb25cIiwgXCJzb2lsXCIsIFwibWFuYWdlXCIgXTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXBbaW5wdXRzW2ldXSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtYXhBV1MnKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXNvaWwtbWF4QVdTXCIpLnZhbChzZXR1cC5zb2lsLm1heEFXUyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBzZXR1cFtpbnB1dHNbaV1dW2tleV0gPT0gJ3N0cmluZycgJiYgc2V0dXBbaW5wdXRzW2ldXVtrZXldLm1hdGNoKC8uKlQuKlokLykgKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmFwcC5ydW5Nb2RlbChpc1J0KTtcbiAgfVxufTtcbiIsIlxuICAvLyBtdXN0IGluc3RhbGwgdGhpcyBmb3IgbmF0aXZlIHBob25lZ2FwIHN1cHBvcnQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9uZWdhcC1idWlsZC9DaGlsZEJyb3dzZXJcblxudmFyIHdpbiA9IG51bGw7XG5cbi8qIHRoZSBrZXkgZm9yIHJlZnJlc2ggVG9rZW4gaW4gbG9jYWwgU3RvcmFnZSAqL1xudmFyIHRva2VuS2V5ID0gJ3JlZnJlc2hfdG9rZW4nO1xuXG4vKiBzdG9yZXMgdGhlIGFjY2Vzc1Rva2VuIGFmdGVyIHJldHJpZXZhbCBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlbiA9IG51bGw7XG5cbi8qIHN0b3JlcyB0aGUgVGltZSB3aGVuIGFjY2VzcyB0b2tlbiB3YXMgbGFzdCByZWNlaXZlZCBmcm9tIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuVGltZSA9IG51bGw7XG5cbi8qIHN0b3JlcyBhY2Nlc3MgVG9rZW4ncyBFeHBpcnkgTGltaXQuIFVzZXMgNTggbWluLiBpbnN0ZWFkIG9mIDYwIG1pbi4gKi9cbnZhciBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0ID0gNTggKiA2MCAqIDEwMDA7XG5cbi8qIEEgdGVtcG9yYXJ5IHZhcmlhYmxlIHN0b3JpbmcgY2FsbGJhY2sgZnVuY3Rpb24gKi9cbnZhciBjYWxsYmFja0Z1bmMgPSBmYWxzZTtcblxuLy8gYXJlIHdlIHJ1bm5pbmcgbmF0aXZlIG9yIGJyb3dzZXIgbW9kZT9cbnZhciBpc05hdGl2ZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC9eZmlsZS4qLykgPyB0cnVlIDogZmFsc2U7XG5cbnZhciBDTElFTlRfSUQgPSBpc05hdGl2ZSA/XG4gICAgICAgIFwiMzQ0MTkwNzEzNDY1LWRpaW10ZmVyaDR0amIwMzE2OWJrbDlta29xdnEycnU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIgOlxuICAgICAgICAgXCIzNDQxOTA3MTM0NjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIjtcblxudmFyIEFQUF9JRCA9IFwiMzQ0MTkwNzEzNDY1XCI7XG5cbnZhciBPQVVUSF9TQ09QRVMgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5maWxlICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5pbnN0YWxsICdcbiAgKyAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJztcblxuLyogY29uZmlnIHZhbHVlcyBmb3IgR29vZ2xlIEFQSSAoZ2FwaSkgKi9cbnZhciBnYXBpQ29uZmlnID0ge1xuICBlbmRwb2ludDogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aFwiLFxuICBlbmR0b2tlbjogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW5cIiwgLy8gdG9rZW4gZW5kcG9pbnRcbiAgcmVkaXJlY3RfdXJpIDogXCJodHRwOi8vbG9jYWxob3N0XCIsXG4gIGNsaWVudF9zZWNyZXQgOiAnNnJPUTlsMGZ5bmgxMzdNUlhHSy1HX1pnJyxcbiAgcmVzcG9uc2VfdHlwZSA6IFwiY29kZVwiLFxuICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gIHN0YXRlIDogXCJnZHJpdmVpbml0XCIsXG4gIGFjY2Vzc190eXBlIDogXCJvZmZsaW5lXCIsXG4gIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuXG4gIC8qIEFzIGRlZmluZWQgaW4gdGhlIE9BdXRoIDIuMCBzcGVjaWZpY2F0aW9uLCB0aGlzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbHVlXG4gICAgICogb2YgXCJhdXRob3JpemF0aW9uX2NvZGVcIiBvciBcInJlZnJlc2hfdG9rZW5cIiAqL1xuICAgIGdyYW50VHlwZXM6IHsgQVVUSE9SSVpFOiBcImF1dGhvcml6YXRpb25fY29kZVwiLCBSRUZSRVNIOiBcInJlZnJlc2hfdG9rZW5cIiB9LFxuIH07XG5cbi8qKlxuICogRW51bSBmb3IgU3RhdHVzIHZhbHVlc1xuICpcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKlxuICogU1VDQ0VTUyAtIFN1Y2Nlc3NmdWxseSBkYXRhIHJlY2VpdmVkIGZyb20gc2VydmVyXG4gKiBFUlJPUiAtIEVycm9yIG9jY3VycmVkIHdoZW4gdHJ5aW5nIHRvIHJlY2VpdmUgZnJvbSBzZXJ2ZXJcbiAqIE5PVF9ERVRFUk1JTkVEIC0gdW5kZXRlcm1pbmVkXG4gKi9cbnZhciBzdGF0dXMgPSB7XG4gICAgICAgIFNVQ0VTUzogMSxcbiAgICAgICAgRVJST1I6IC0xLFxuICAgICAgICBOT1RfREVURVJNSU5FRDogMFxufVxuXG5yZXF1ZXN0U3RhdHVzID0gMDtcblxuLyogc3RvcmVzIHRoZSBhdXRob3JpemF0aW9uIENvZGUgaW50ZXJuYWxseSAqL1xuYXV0aENvZGUgPSBmYWxzZTtcblxuLyogc3RvcmVzIHRoZSBlcnJvciBtZXNzYWdlIHdoZW4gYW4gZXJyb3IgaGFwcGVucyBmcm9tIGdvb2dsZSBzZXJ2ZXIgKi9cbmVycm9yTWVzc2FnZSA9IGZhbHNlO1xuXG52YXIgbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gIGNvbnNvbGUubG9nKFwiKioqT0FVVEgqKio6IFwiK21zZyk7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gYXV0aG9yaXplIHVzZXIgdXNpbmcgT0F1dGhcbiAqIE9wZW5zIHVwIEFub3RoZXIgd2luZG93IHdoZXJlIHVzZXIgYWxsb3dzIGFjY2VzcyBvciBkZW5pZXMgaXQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbEJhY2sgICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIGludm9rZWRcbiAqL1xudmFyIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxCYWNrKSB7XG4gIGxvZyhcImF0dGVtcHRpbmcgdG8gYXV0aG9yaXplXCIpO1xuXG4gICAgdmFyIGF1dGhVcmkgPSBnYXBpQ29uZmlnLmVuZHBvaW50ICsgJz8nXG4gICAgKyAnc2NvcGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnNjb3BlKVxuICAgICsgJyYnICsgJ3JlZGlyZWN0X3VyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVkaXJlY3RfdXJpKVxuICAgICsgJyYnICsgJ3Jlc3BvbnNlX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlc3BvbnNlX3R5cGUpXG4gICAgKyAnJicgKyAnY2xpZW50X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5jbGllbnRfaWQpO1xuICAgIC8vKyAnJicgKyAnc3RhdGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnN0YXRlKVxuICAgIC8vKyAnJicgKyAnYWNjZXNzX3R5cGU9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmFjY2Vzc190eXBlKVxuICAgIC8vKyAnJicgKyAnYXBwcm92YWxfcHJvbXB0PWZvcmNlJzsgLy8gQFRPRE8gLSBjaGVjayBpZiB3ZSByZWFsbHkgbmVlZCB0aGlzIHBhcmFtXG5cbiAgICBjYWxsYmFja0Z1bmMgPSBjYWxsQmFjaztcbiAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuXG5cblxuXG4gICAgbG9nKFwib3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG5cbiAgICB0cnkge1xuXG4gICAgICAvLyBOb3cgb3BlbiBuZXcgYnJvd3NlclxuICAgICAgd2luID0gd2luZG93Lm9wZW4oYXV0aFVyaSwgJ19ibGFuaycsICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vJyk7XG5cbiAgICAgICQod2luKS5vbignbG9hZHN0YXJ0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgbG9nKFwiSW5BcHBCcm93c2VyIGxvYWRzdGFydFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICAgIG9uQXV0aFVybENoYW5nZShlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5zaG93V2ViUGFnZShhdXRoVXJpLCB7c2hvd0xvY2F0aW9uQmFyIDogdHJ1ZX0pO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25DbG9zZSA9IG9uQXV0aENsb3NlO1xuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIub25Mb2NhdGlvbkNoYW5nZSA9IG9uQXV0aFVybENoYW5nZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGxvZyhcIkVycm9yIG9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuICAgICAgbG9nKGUpO1xuICAgIH1cblxufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbGJhY2ssIGltbWVkaWF0ZSkge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogaW1tZWRpYXRlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIGF1dGhDb2RlID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgY2FsbGJhY2soYXV0aENvZGUpO1xuICB9KTtcblxuICB9XG59XG5cbi8qIEF1dGggV2luZG93IGNsb3NlZCAqL1xudmFyIG9uQXV0aENsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBdXRoIHdpbmRvdyBjbG9zZWRcIik7XG59O1xuXG4vKiBPQXV0aCBTdWNjZXNzZnVsbHkgZG9uZSAqL1xudmFyIG9uQXV0aFN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQXV0aCBTdWNjZXNzPycpO1xufTtcblxuLyoqXG4gKiBHZXRzIEludm9rZWQgd2hlbiB0aGUgVVJMIGNoYW5nZXMgb24gT0F1dGggYXV0aG9yaXphdGlvbiBwcm9jZXNzXG4gKlxuICogU3VjY2VzcyBVUkwgUGF0dGVybjpcbiAqIFwicmVkaXJlY3RfdXJpXCIgKyBcIj9jb2RlPVwiIFtzZWNyZXQgY29kZSB2YWxdXG4gKlxuICogU3VjY2VzcyBTYW1wbGUgVVJMOlxuICogaHR0cDovL2xvY2FsaG9zdC8/Y29kZT00L1dPcFJMUWZ2dmhIRTB0dU1VRERxbm43NmxDVFQuOG5YQzRJZWJNRUFVdUpKVm5MNDlDYzhBUUdyOGNRSVxuICpcbiAqIERlbmllZCBBY2Nlc3MgVVJMIFBhdHRlcm46IFwicmVkaXJlY3RfdXJpXCIgKyA/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICogRGVuaWVkIEFjY2VzcyBTYW1wbGU6IGh0dHA6Ly9sb2NhbGhvc3QvP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpTG9jYXRpb24gVGhlIFVSSSBMb2NhdGlvblxuICovXG52YXIgb25BdXRoVXJsQ2hhbmdlID0gZnVuY3Rpb24odXJpTG9jYXRpb24pIHtcbiAgICBjb25zb2xlLmxvZyhcIkluQXBwQnJvd3NlciB1cmwgY2hhbmdlZCBcIit1cmlMb2NhdGlvbik7XG4gICAgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImNvZGU9XCIpICE9IC0xKSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuU1VDQ0VTUztcblxuICAgICAgICAvKiBTdG9yZSB0aGUgYXV0aENvZGUgdGVtcG9yYXJpbHkgKi9cbiAgICAgICAgYXV0aENvZGUgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJjb2RlXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgbG9nKFwiRm91bmQgYXV0aCBjb2RlOiBcIithdXRoQ29kZSk7XG5cbiAgICAgICAgZ2V0UmVmcmVzaFRva2VuKGNhbGxiYWNrRnVuYyk7XG5cbiAgICAgICAgLy8gY2xvc2UgdGhlIGNoaWxkQnJvd3NlclxuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2UgaWYodXJpTG9jYXRpb24uaW5kZXhPZihcImVycm9yPVwiKSAhPSAtMSkgIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5FUlJPUjtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiZXJyb3JcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBjYWxsYmFja0Z1bmMoKTtcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcbiAgICAgICAgLy9jYWxsYmFja0Z1bmMoKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuKiBHZXRzIHRoZSBSZWZyZXNoIGZyb20gQWNjZXNzIFRva2VuLiBUaGlzIG1ldGhvZCBpcyBvbmx5IGNhbGxlZCBpbnRlcm5hbGx5LFxuKiBhbmQgb25jZSwgb25seSBhZnRlciB3aGVuIGF1dGhvcml6YXRpb24gb2YgQXBwbGljYXRpb24gaGFwcGVucy5cbipcbiogQHBhcmFtIHBhcmFtT2JqIEFuIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0gcGFyYW1PYmouYXV0aF9jb2RlIFRoZSBBdXRob3JpemF0aW9uIENvZGUgZm9yIGdldHRpbmcgUmVmcmVzaCBUb2tlblxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWwgcmV0cmlldmFsIG9mIGRhdGEgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiovXG52YXIgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgY29uc29sZS5sb2coXCJhY2Nlc3MgcmVmcmVzaCB0b2tlblwiKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICAgY29kZSAgICAgICAgIDogYXV0aENvZGUsXG4gICAgICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpIDogZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLkFVVEhPUklaRVxuICAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2VzcyBnZXR0aW5nIHJlZnJlc2ggdG9rZW5cIik7XG5cbiAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgYWNjZXNzVG9rZW4gICAgID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgLyogc2V0IHRoZSBlcnJvciBvZiBkYXRhIHRvIGZhbHNlLCBhcyBpdCB3YXMgc3VjY2Vzc2Z1bCAqL1xuICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuXG4gICAgICAgIC8qIG5vdyBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIGNhbGxiYWNrKHthY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VufSk7XG4gICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIHNob3VsZCBPTkxZIGJlIGNhbGxlZCBsb2NhbGx5IGZyb20gd2l0aGluIHRoaXMgY2xhc3MuXG4qIFJldHVybnMgdGhlIFJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2UuXG4qXG4qIEByZXR1cm4ge1N0cmluZ30gVGhlIHJlZnJlc2ggVG9rZW5cbipcbiovXG52YXIgZ2V0VG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcbn07XG5cblxuLyoqXG4qIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZXh0ZXJuYWxseS4gSXQgcmV0cmlldmVzIHRoZSBBY2Nlc3MgVG9rZW4gYnkgYXQgZmlyc3RcbiogY2hlY2tpbmcgaWYgY3VycmVudCBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWQgb3Igbm90LiBJZiBpdHMgbm90IGV4cGlyZWQsIGl0XG4qIHNpbXBseSByZXR1cm5zIHRoYXQsIG90aGVyd2lzZSwgaXQgZ2V0cyB0aGUgcmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZVxuKiAoYnkgaW52b2tpbmcgZ2V0VG9rZW4pIGFuZCB0aGVuIGNvbm5lY3Rpbmcgd2l0aCBHb29nbGUncyBTZXJ2ZXIgKHVzaW5nIE9BdXRoKVxuKiB0byBnZXQgdGhlIEFjY2VzcyBUb2tlbi5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICBBIGNhbGxCYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgaXMgcmV0cmlldmVkIGZyb20gdGhlIGdvb2dsZSdzIHNlcnZlci4gVGhlIGRhdGFcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gZ29vZ2xlIHNlcnZlciBpcyBwYXNzZWQgdG8gY2FsbGJhY2sgYXMgYXJncy5cbipcbiovXG52YXIgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgY29uc29sZS5sb2coXCJnZXR0aW5nIGFjY2VzcyB0b2tlblwiKTtcblxuICAgLyogY2hlY2sgaWYgY3VycmVudCBUb2tlbiBoYXMgbm90IGV4cGlyZWQgKHN0aWxsIHZhbGlkKSAqL1xuICAgaWYgKGFjY2Vzc1Rva2VuICYmIGFjY2Vzc1Rva2VuICE9IGZhbHNlICYmXG4gICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgIGNhbGxiYWNrKHsgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiB9KTtcblxuICAgICAgICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnNvbGUubG9nKFwiQUNDRVNTIFRPS0VOIFBBUkFNUzogXCIrYWNjZXNzVG9rZW4rXCIgXCIrYWNjZXNzVG9rZW5UaW1lK1wiIFwiK2FjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpO1xuXG4gICAvKiBlbHNlLCBnZXQgdGhlIHJlZnJlc2hUb2tlbiBmcm9tIGxvY2FsIHN0b3JhZ2UgYW5kIGdldCBhIG5ldyBhY2Nlc3MgVG9rZW4gKi9cbiAgIHZhciByZWZyZXNoVG9rZW4gPSBnZXRUb2tlbigpO1xuXG4gICAvLyAgIGNvbnNvbGUubG9nKFwiUmVmcmVzaCBUb2tlbiA+PiBcIiArIHJlZnJlc2hUb2tlbik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjbGllbnRfaWQgICAgOiBnYXBpQ29uZmlnLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5SRUZSRVNILFxuICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAgICAgLyogc2V0IHRoZSBlcnJvciB0byBmYWxzZSAqL1xuICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgZXJyb3IgPz8gPj5cIiArIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkgeyAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICBpZiAoYWNjZXNzVG9rZW4gJiZcbiAgICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICAgIGNhbGxiYWNrKGFjY2Vzc1Rva2VuKTtcblxuICAgICAgICAgICAgIHJldHVybjtcbiAgICAgfVxuXG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBhY2Nlc3NUb2tlbiA9IHRva2VuO1xuICAgIGFjY2Vzc1Rva2VuVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cblxuLyoqXG4qIFNhdmVzIHRoZSBSZWZyZXNoIFRva2VuIGluIGEgbG9jYWwgZGF0YWJhc2Ugb3IgbG9jYWxTdG9yYWdlXG4qIFRoaXMgbWV0aG9kIHNoYWxsIGJlIGludm9rZWQgZnJvbSBleHRlcm5hbGx5IG9ubHkgPGI+b25jZTwvYj4gYWZ0ZXIgYW5cbiogYXV0aG9yaXphdGlvbiBjb2RlIGlzIHJlY2VpdmVkIGZyb20gZ29vZ2xlJ3Mgc2VydmVyLiBUaGlzIG1ldGhvZFxuKiBjYWxscyB0aGUgb3RoZXIgbWV0aG9kIChnZXRSZWZyZXNoVG9rZW4pIHRvIGdldCB0aGUgcmVmcmVzaCBUb2tlbiBhbmRcbiogdGhlbiBzYXZlcyBpdCBsb2NhbGx5IG9uIGRhdGFiYXNlIGFuZCBpbnZva2VzIGEgY2FsbGJhY2sgZnVuY3Rpb25cbipcbiogQHBhcmFtIHRva2VuT2JqIEEgT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSB7U3RyaW5nfSB0b2tlbk9iai5hdXRoX2NvZGUgVGhlIGF1dGhvcml6YXRpb24gY29kZSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aXRoIHBhcmFtZXRlcnNcbiovXG52YXIgc2F2ZVJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKHRva2VuT2JqLCBjYWxsYmFjaykge1xuICAgICBnZXRSZWZyZXNoVG9rZW4odG9rZW5PYmosIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgIC8qIGlmIHRoZXJlJ3Mgbm8gZXJyb3IgKi9cbiAgICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQFRPRE86IG1ha2UgYW5vdGhlciBtZXRob2Qgc2F2ZVRva2VuIHRvIGFic3RyYWN0IHRoZSBzdG9yaW5nIG9mIHRva2VuXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRva2VuS2V5LCBkYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgfSk7XG59O1xuXG5cblxuLyoqXG4qIENoZWNrcyBpZiB1c2VyIGhhcyBhdXRob3JpemVkIHRoZSBBcHAgb3Igbm90XG4qIEl0IGRvZXMgc28gYnkgY2hlY2tpbmcgaWYgdGhlcmUncyBhIHJlZnJlc2hfdG9rZW5cbiogYXZhaWxhYmxlIG9uIHRoZSBjdXJyZW50IGRhdGFiYXNlIHRhYmxlLlxuKlxuKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGF1dGhvcml6ZWQsIGZhbHNlIG90aGVyd2lzZVxuKi9cbnZhciBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIHRva2VuVmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xuXG4gICAgICBjYWxsYmFjaygoKHRva2VuVmFsdWUgIT09IG51bGwpICYmICh0eXBlb2YgdG9rZW5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpKSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBFeHRyYWN0cyB0aGUgY29kZSBmcm9tIHRoZSB1cmwuIENvcGllZCBmcm9tIG9ubGluZVxuKiBAVE9ETyBuZWVkcyB0byBiZSBzaW1wbGlmaWVkLlxuKlxuKiBAcGFyYW0gbmFtZSBUaGUgcGFyYW1ldGVyIHdob3NlIHZhbHVlIGlzIHRvIGJlIGdyYWJiZWQgZnJvbSB1cmxcbiogQHBhcmFtIHVybCAgVGhlIHVybCB0byBiZSBncmFiYmVkIGZyb20uXG4qXG4qIEByZXR1cm4gUmV0dXJucyB0aGUgVmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUgbmFtZSBwYXNzZWRcbiovXG52YXIgZ2V0UGFyYW1ldGVyQnlOYW1lID0gZnVuY3Rpb24obmFtZSwgdXJsKSB7XG4gIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXFxdXCIpO1xuICB2YXIgcmVnZXhTID0gXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCI7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTKTtcbiAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cbiAgaWYocmVzdWx0cyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGVsc2VcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRob3JpemUgOiBhdXRob3JpemUsXG4gIGlzQXV0aG9yaXplZCA6IGlzQXV0aG9yaXplZCxcbiAgZ2V0QWNjZXNzVG9rZW4gOiBnZXRBY2Nlc3NUb2tlbixcbiAgQVBQX0lEIDogQVBQX0lEXG59O1xuIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbnZhciBjYWNoZWRUaWxlU3R5bGUgPSB7XG4gIHdoZXJlOiBcInBpZCBpbiAoKVwiLFxuICBwb2x5Z29uT3B0aW9uczoge1xuICAgIGZpbGxDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgIHN0cm9rZVdlaWdodDogM1xuICB9XG59XG5cbnZhciBjYWNoZWRUaWxlcyA9IFtdO1xudmFyIGNhY2hlZFRpbGVzTG9hZGVkID0gZmFsc2U7XG52YXIgY2FjaGVkVGlsZVByZWZpeCA9ICdjYWNoZWRfdGl0bGVfJztcbnZhciBjYWNoaW5nID0gZmFsc2U7XG52YXIgc2F2ZUNhY2hlT25DbGlja1NldCA9IGZhbHNlO1xudmFyIGNNYXBEYXRhID0ge307XG5cbnZhciBjb2xzID0gW107XG52YXIgYXBwID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgX2xvYWRGcm9tQ2FjaGUoKTtcbiAgX2xvYWRDYWNoZWRUaWxlcygpO1xufVxuXG5mdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICBpZiggIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbGVhciBhbGwgdGlsZSBkYXRhIGZyb20gdGhlIGNhY2hlPycpICkgcmV0dXJuO1xuXG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzID0gW107XG59XG5cbi8vIGUgaXMgdGhlIGV2ZW50IG9iamVjdCBmcm9tIGdvb2dsZSBtYXBzXG5mdW5jdGlvbiBjYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFzYXZlQ2FjaGVPbkNsaWNrU2V0ICkge1xuICAgIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSB0cnVlO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgX3NhdmVUaWxlKCk7XG4gICAgfSk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5pcygnY2hlY2tlZCcpICkgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYoIGNhY2hpbmcgKSByZXR1cm47XG4gIGNhY2hpbmcgPSB0cnVlO1xuXG4gIGNNYXBEYXRhID0ge1xuICAgIGZ1c2lvbkxheWVyIDogZnVzaW9uTGF5ZXIsXG4gICAgZGVmYXVsdE9wdGlvbnMgOiBkZWZhdWx0T3B0aW9ucyxcbiAgICBkZWZhdWx0U3R5bGUgOiBkZWZhdWx0U3R5bGUsXG4gICAgcGlkIDogIGUucm93LnBpZC52YWx1ZVxuICB9XG5cbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoJycpO1xuICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLnNob3coKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xuXG4gIF9sb2FkVGlsZShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKGRhdGEpe1xuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLnNob3coKTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUtbG9hZGluZycpLmhpZGUoKTtcblxuICAgICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1waWQnKS5odG1sKGNNYXBEYXRhLnBpZCk7XG4gICAgY01hcERhdGEuZGF0YSA9IGRhdGE7XG4gICAgY2FjaGluZyA9IGZhbHNlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjaGVscC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIF9jcmVhdGVOYXZNZW51KCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0IHRyZWUgYnV0dG9uXG4gICQoJyN0cmVlLXN1Yi1tZW51JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdG9yIGZvciB1cGxvYWRpbmcgd2VhdGhlciBkYXRhIGZyb20gYSBnb29nbGUgc3ByZWFkc2hlZXRcbiAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gc2hvdyB0aGUgY2FjaGUgdmVyc2lvbiBvZiB0aGUgbG9jYXRpb24gc2VsZWN0b3JcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vbmxpbmUnKS5oaWRlKCk7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZScpLnNob3coKTtcblxuICAvLyBzZXQgdGhlIGxvY2F0aW9uIHNlbGVjdG9yIHVpIGxpc3QgYmFzZWQgb24gY2FjaGVkIHRpbGVzXG4gIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIWNhY2hlZFRpbGVzTG9hZGVkICkgX2xvYWRDYWNoZWRUaWxlcygpO1xuXG4gIGRlZmF1bHRPcHRpb25zLnN0eWxlcyA9IFtkZWZhdWx0U3R5bGVdO1xuXG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPiAwICkge1xuICAgIGNhY2hlZFRpbGVTdHlsZS53aGVyZSA9ICdwaWQgaW4gKCcrY2FjaGVkVGlsZXMuam9pbignLCcpKycpJztcbiAgICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMucHVzaChjYWNoZWRUaWxlU3R5bGUpO1xuICB9XG5cbiAgZnVzaW9uTGF5ZXIuc2V0T3B0aW9ucyhkZWZhdWx0T3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9zYXZlVGlsZSgpIHtcbiAgdmFyIG5hbWUgPSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHJldHVybiBhbGVydCgnUGxlYXNlIHByb3ZpZGUgYSBuYW1lJyk7XG5cbiAgY01hcERhdGEuZGF0YS5uYW1lID0gbmFtZTtcblxuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjTWFwRGF0YS5waWQsIEpTT04uc3RyaW5naWZ5KGNNYXBEYXRhLmRhdGEpKTtcblxuICBjYWNoZWRUaWxlcy5wdXNoKGNNYXBEYXRhLnBpZCk7XG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoY01hcERhdGEuZnVzaW9uTGF5ZXIsIGNNYXBEYXRhLmRlZmF1bHRPcHRpb25zLCBjTWFwRGF0YS5kZWZhdWx0U3R5bGUpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkVGlsZShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndGlsZS1kYXRhLWNhY2hlJywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG4gIHZhciB3ZWF0aGVyVGFibGUgPSB7fTtcbiAgdmFyIHNvaWxUYWJsZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIHJlc3BzKys7XG4gICAgICBpZiggcmVzcHMgPT0gMiAmJiBjYWxsYmFjayApIGNhbGxiYWNrKHt3ZWF0aGVyOndlYXRoZXJUYWJsZSwgc29pbDpzb2lsVGFibGV9KTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgd2VhdGhlclRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHNvaWxUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpIHtcbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA9PSAwICkge1xuICAgICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJykuc2hvdygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBsaXN0RWxlID0gJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLWxpc3QnKS5odG1sKCc8ZGl2PlNlbGVjdCBDYWNoZWQgVGlsZTwvZGl2PicpLCBlbGU7XG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1ub25lJyk7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY2FjaGVkVGlsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpXSk7XG4gICAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgICBlbGUgPSAkKCc8ZGl2PjxhIGNhY2hlaWQ9XCInK2krJ1wiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj4nK2NhY2hlZFRpbGVzW2ldKyc6ICcranNvbi5uYW1lKyc8L2E+PC9kaXY+Jyk7XG4gICAgZWxlLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF9ydW5DYWNoZWRUaWxlKHBhcnNlSW50KCQodGhpcykuYXR0cignY2FjaGVpZCcpKSk7XG4gICAgfSk7XG4gICAgbGlzdEVsZS5hcHBlbmQoZWxlKVxuICB9XG59XG5cbmZ1bmN0aW9uIF9ydW5DYWNoZWRUaWxlKGluZGV4KSB7XG4gIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaW5kZXhdKTtcbiAganNvbiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLndlYXRoZXIucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbSA9IGkrJyc7XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBqc29uLndlYXRoZXIuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK2kpLnZhbChqc29uLndlYXRoZXIucm93c1tpXS5jW2pdID8ganNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgfVxuICB9XG5cblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24uc29pbC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCBqc29uLnNvaWwucm93c1swXSA9PSBudWxsICkgY29udGludWU7XG4gICAgJChcIiNpbnB1dC1zb2lsLVwiK2pzb24uc29pbC5jb2xzW2ldLmlkKS52YWwoanNvbi5zb2lsLnJvd3NbMF0uY1tpXS52KTtcbiAgfVxuXG4gICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgYXBwLnJ1bk1vZGVsKCk7XG4gIH0sIDUwMCk7XG59XG5cbmZ1bmN0aW9uIF9sb2FkQ2FjaGVkVGlsZXMoKSB7XG4gIGNhY2hlZFRpbGVzID0gW107XG4gIGZvciggdmFyIGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlICkge1xuICAgIGlmKCBrZXkuaW5kZXhPZihjYWNoZWRUaWxlUHJlZml4KSA+IC0xICkge1xuICAgICAgY2FjaGVkVGlsZXMucHVzaChrZXkucmVwbGFjZShjYWNoZWRUaWxlUHJlZml4LCcnKSk7XG4gICAgfVxuICB9XG4gIGNhY2hlZFRpbGVzTG9hZGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZU5hdk1lbnUoKSB7XG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCI+T0ZGTElORSBNT0RFPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gc2V0IGNsaWNrIGhhbmRsZXJzIGZvciBwb3B1cFxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gYWJvdXQgY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBhZGQgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuZnVuY3Rpb24gX2xvYWRGcm9tQ2FjaGUoKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdjYWNoZS9qc2FwaScsXG4gICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9jaGFydC5jc3MnKSApO1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvYW5ub3RhdGVkdGltZWxpbmUuY3NzJykgKTtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnY2FjaGUvY2hhcnQuanMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICBjYWNoZSA6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjaGFydHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiggY2hhcnRzQ2FsbGJhY2sgKSBjaGFydHNDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICByZW5kZXIgOiByZW5kZXIsXG4gIGNhY2hlVGlsZSA6IGNhY2hlVGlsZSxcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCA6IHJlbmRlckNhY2hlZFRpbGVzT25NYXAsXG4gIGNsZWFyQ2FjaGUgOiBjbGVhckNhY2hlXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJNZWFuIFZhcG9yIFByZXNzdXJlIERlZmljaXRcIixcbiAgICAgIHVuaXRzIDogXCJrUEFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJ0aGUgZGlmZmVyZW5jZSAoZGVmaWNpdCkgYmV0d2VlbiB0aGUgYW1vdW50IG9mIG1vaXN0dXJlIGluIHRoZSBhaXIgYW5kIGhvdyBtdWNoIFwiICtcbiAgICAgIFx0XHRcIm1vaXN0dXJlIHRoZSBhaXIgY2FuIGhvbGQgd2hlbiBpdCBpcyBzYXR1cmF0ZWRcIlxuICB9LFxuICBmVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZlQgOiB7XG4gICAgICBsYWJlbCA6IFwiVGVtcGVyYXR1cmUgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkZyb3N0IDoge1xuICAgICAgbGFiZWwgOiBcIkZyb3N0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJOdW1iZXIgb2YgZnJvc3QgZGF5cyBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBQQVIgOiB7XG4gICAgICBsYWJlbCA6IFwiTW9udGhseSBQaG90b3N5bnRoZXRpY2FsbHkgQWN0aXZlIFJhZGlhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1vbHMgLyBtXjIgbW9udGhcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZXNpZ25hdGVzIHRoZSBzcGVjdHJhbCByYW5nZSAod2F2ZSBiYW5kKSBvZiBzb2xhciByYWRpYXRpb24gZnJvbSA0MDAgdG8gNzAwIG5hbm9tZXRlcnMgXCIgK1xuICAgICAgXHRcdFwidGhhdCBwaG90b3N5bnRoZXRpYyBvcmdhbmlzbXMgYXJlIGFibGUgdG8gdXNlIGluIHRoZSBwcm9jZXNzIG9mIHBob3Rvc3ludGhlc2lzXCJcbiAgfSxcbiAgeFBQIDoge1xuICAgICAgbGFiZWwgOiBcIk1heGltdW0gUG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1ldHJpYyBUb25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJbnRjcHRuIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBSYWluZmFsbCBJbnRlcmNlcHRpb25cIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQcmVjaXBpdGF0aW9uIHRoYXQgZG9lcyBub3QgcmVhY2ggdGhlIHNvaWwsIGJ1dCBpcyBpbnN0ZWFkIGludGVyY2VwdGVkIGJ5IHRoZSBsZWF2ZXMgYW5kIGJyYW5jaGVzIG9mIHBsYW50cyBhbmQgdGhlIGZvcmVzdCBmbG9vci5cIlxuICB9LFxuICBBU1cgOiB7XG4gICAgICBsYWJlbCA6IFwiQXZhaWxhYmxlIFNvaWwgV2F0ZXJcIixcbiAgICAgIHVuaXRzIDogXCJtbVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEN1bUlycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIkN1bXVsYXRpdmUgUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIElycmlnIDoge1xuICAgICAgbGFiZWwgOiBcIlJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBTdGFuZEFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBBZ2VcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBMQUkgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBBcmVhIEluZGV4XCIsXG4gICAgICB1bml0cyA6IFwibTIgLyBtMlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlRoZSBvbmUtc2lkZWQgZ3JlZW4gbGVhZiBhcmVhIHBlciB1bml0IGdyb3VuZCBzdXJmYWNlIGFyZWFcIlxuICB9LFxuICBDYW5Db25kIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBDb25kdWN0YW5jZVwiLFxuICAgICAgdW5pdHMgOiBcImdjLG0vc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFRyYW5zcCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiV2F0ZXIgbW92ZW1lbnQgdGhyb3VnaCBhIHBsYW50IGFuZCBpdHMgZXZhcG9yYXRpb24gZnJvbSBhZXJpYWwgcGFydHNcIlxuICB9LFxuICBFVHIgOiB7XG4gICAgICBsYWJlbCA6IFwiRVRyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJSZWZlcmVuY2UgZXZhcG90cmFuc3BpcmF0aW9uIGZvciBBbGZhbGZhXCJcbiAgfSxcbiAgS2MgOiB7XG4gICAgICBsYWJlbCA6IFwiS2NcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJDcm9wIGNvZWZmaWNpZW50c1wiXG4gIH0sXG4gIGZTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJTb2lsIFdhdGVyIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgYWdlXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBoeXNNb2QgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIENhbm9weSBDb25kdWN0YW5jZVwiXG4gIH0sXG4gIHBSIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIlxuICB9LFxuICBwUyA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWVcIlxuICB9LFxuICBsaXR0ZXJmYWxsIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpdGlvbiA6IFwiXCIsXG4gICAgICBhbHRGbk5hbWUgOiBcInRkcFwiXG4gIH0sXG4gIE5QUCA6IHtcbiAgICAgIGxhYmVsIDogXCJOZXQgQ2Fub3B5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFdGIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZV9XRiwgY3VyX2RXLCBjdXJfcEYsIGN1cl9saXR0ZXJmYWxsLCBwcmV2X1dGKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV0YgKyBjdXJfZFcgKiBjdXJfcEYgLSBjdXJfbGl0dGVyZmFsbCAqIHByZXZfV0ZcbiAgICAgIH1cbiAgfSxcbiAgV1IgOiB7XG4gICAgICBsYWJlbCA6IFwiUm9vdCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUiwgY3VyX2RXLCBjdXJfcFIsIHR1cm5vdmVyLCBwcmV2X1dSLCBjdXJfUm9vdFApIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XUiArIGN1cl9kVyAqIGN1cl9wUiAtIHRyZWUucFIudHVybm92ZXIgKiBwcmV2X1dSIC0gY3VyX1Jvb3RQO1xuICAgICAgfVxuICB9LFxuICBXUyA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGVtIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dTLCBjdXJfZFcsIGN1cl9wUykgeyByZXR1cm4gcHJldl9XUyArIGN1cl9kVyAqIGN1cl9wUyB9XG4gIH0sXG4gIFcgOiB7XG4gICAgICBsYWJlbCA6IFwiVG90YWwgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKGN1cl9XRiwgY3VyX1dSLCBjdXJfV1MpIHsgcmV0dXJuIGN1cl9XRitjdXJfV1IrY3VyX1dTIH1cbiAgfVxufVxuIiwidmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuLi9tb2RlbFJ1bkhhbmRsZXInKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcbnZhciBhcHA7XG5cbnZhciBzaG93ID0gZnVuY3Rpb24ocmVzdWx0cykge1xuICB2YXIgaSwgejtcblxuICAvLyBzZWxlY3RlZCBpbiB0aGUgY2hhcnRzIG91dHB1dFxuICB2YXIgdmFycyA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIikudmFsKCk7XG5cbiAgLy8gZmluZCB0aGUgcm93cyB3ZSBjYXJlIGFib3V0XG4gIHZhciBjaGFydFJvd3MgPSB7fTtcbiAgZm9yKCBpID0gMDsgaSA8IHJlc3VsdHNbMF0uaGVhZGVyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHZhcnMuaW5kZXhPZihyZXN1bHRzWzBdLmhlYWRlcltpXSkgPiAtMSApIGNoYXJ0Um93c1tyZXN1bHRzWzBdLmhlYWRlcltpXV0gPSBpO1xuICB9XG5cbiAgdmFyIHRhYnMgPSAkKCc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJyYXdPdXRwdXRUYWJzXCIgIGRhdGEtdGFicz1cInBpbGxcIj48L3VsPicpO1xuICB2YXIgY29udGVudHMgPSAkKCc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWFyZ2luLXRvcDoxNXB4XCI+PC9kaXY+Jyk7XG5cbiAgZm9yKCBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYnMuYXBwZW5kKCQoJzxsaSAnKyhpID09PSAwID8gJ2NsYXNzPVwiYWN0aXZlXCInIDogXCJcIikrJz48YSBocmVmPVwiI3Jhd291dCdcbiAgICAgICAgICArdmFyc1tpXSsnXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj4nK3ZhcnNbaV0rJzwvYT48L2xpPicpKTtcblxuICAgICAgY29udGVudHMuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSAnICsgKGkgPT09IDAgPyAnYWN0aXZlJyA6IFwiXCIpXG4gICAgICAgICAgKyAnXCIgaWQ9XCJyYXdvdXQnICsgdmFyc1tpXSArICdcIj48L2Rpdj4nKSk7XG4gIH1cblxuICAkKFwiI291dHB1dC1jb250ZW50XCIpLmh0bWwoXCJcIikuYXBwZW5kKHRhYnMpLmFwcGVuZChjb250ZW50cyk7XG4gICQoXCIjcmF3T3V0cHV0VGFic1wiKS50YWIoKTtcblxuICBjc3ZSZXN1bHRzID0ge1xuICAgICAgY29uZmlnIDogbW9kZWxJTy5leHBvcnRTZXR1cCgpLFxuICAgICAgaW5wdXRzIDogW10sXG4gICAgICBoZWFkZXIgOiByZXN1bHRzWzBdLmhlYWRlcixcbiAgICAgIGRhdGEgOiB7fVxuICB9O1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKysgKSB7XG4gICAgY3N2UmVzdWx0cy5pbnB1dHMucHVzaChyZXN1bHRzW2ldLmlucHV0cyk7XG4gIH1cblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG5cbiAgdmFyIHRhYmxlLCByb3c7XG4gIGZvciggdmFyIGtleSBpbiBjaGFydFJvd3MgKSB7XG4gICAgICB0YWJsZSA9IFwiPHRhYmxlIGNsYXNzPSd0YWJsZSB0YWJsZS1zdHJpcGVkJz5cIjtcblxuICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0gPSBbXTtcblxuXG4gICAgICAvLyBzZXQgaGVhZGVyIHJvd1xuICAgICAgdmFyIGN1cnJlbnRSb3cgPSBbXTtcbiAgICAgIGN1cnJlbnRSb3cucHVzaCgnZGF0ZScpO1xuICAgICAgLy9jdXJyZW50Um93LnB1c2goJ3N0ZXAnKTtcblxuICAgICAgdGFibGUgKz0gXCI8dHI+PHRoPkRhdGU8L3RoPjx0aD5TdGVwPC90aD5cIjtcblxuICAgICAgZm9yKCB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgdGFibGUgKz0gXCI8dGg+XCI7XG4gICAgICAgICAgdmFyIHRtcCA9IFtdO1xuXG4gICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gcmVzdWx0c1t6XS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIHRtcC5wdXNoKG1UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXSk7XG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPGRpdj5cIittVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0rXCI8L2Rpdj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiggdG1wLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgY3VycmVudFJvdy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgIHRhYmxlICs9IGtleTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjdXJyZW50Um93LnB1c2godG1wLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFibGUgKz0gXCI8L3RoPlwiO1xuICAgICAgfVxuICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0ucHVzaChjdXJyZW50Um93KTtcbiAgICAgIHZhciBjID0gMDtcblxuICAgICAgZm9yKCB2YXIgZGF0ZSBpbiByZXN1bHRzWzBdLm91dHB1dCApIHtcbiAgICAgICAgYysrO1xuICAgICAgICBjdXJyZW50Um93ID0gW107XG5cbiAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRkPlwiK2RhdGUrXCI8L3RkPjx0ZD5cIitjK1wiPC90ZD5cIjtcblxuICAgICAgICBjdXJyZW50Um93LnB1c2goZGF0ZSk7XG4gICAgICAgIC8vY3VycmVudFJvdy5wdXNoKGMpO1xuXG4gICAgICAgIHZhciB2O1xuICAgICAgICBmb3IoIHogPSAwOyB6IDwgcmVzdWx0cy5sZW5ndGg7IHorKyApIHtcbiAgICAgICAgICBpZiggIXJlc3VsdHNbel0ub3V0cHV0W2RhdGVdICkge1xuICAgICAgICAgICAgdGFibGUgKz0gXCI8dGQ+PC90ZD5cIjtcbiAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaChudWxsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdiA9IHJlc3VsdHNbel0ub3V0cHV0W2RhdGVdW2NoYXJ0Um93c1trZXldXTtcbiAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkPlwiK3YrXCI8L3RkPlwiO1xuICAgICAgICAgICAgY3VycmVudFJvdy5wdXNoKHYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0ucHVzaChjdXJyZW50Um93KTtcbiAgICAgIH1cbiAgICAgICQoXCIjcmF3b3V0XCIgKyBrZXkpLmh0bWwodGFibGUrXCI8L3RhYmxlPlwiKTtcbiAgfVxuXG4gIGFwcC5zZXRDc3ZSZXN1bHRzKGNzdlJlc3VsdHMpO1xuXG4gIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gc2VlIHRoZSBleHBvcnQgYnRuXG4gIGlmKCAhb2ZmbGluZU1vZGUgKSAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5zaG93KCk7XG5cbiAgcmV0dXJuIGNzdlJlc3VsdHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvdyA6IHNob3csXG4gIGluaXQgOiBmdW5jdGlvbihhKSB7XG4gICAgYXBwID0gYTtcbiAgfVxufTtcbiIsImZ1bmN0aW9uIHFzKGtleSkge1xuICBrZXkgPSBrZXkucmVwbGFjZSgvWyorP14kLlxcW1xcXXt9KCl8XFxcXFxcL10vZywgXCJcXFxcJCZcIik7XG4gIHZhciBtYXRjaCA9IGxvY2F0aW9uLnNlYXJjaC5tYXRjaChuZXcgUmVnRXhwKFwiWz8mXVwiICsga2V5ICsgXCI9KFteJl0rKSgmfCQpXCIpKTtcbiAgcmV0dXJuIG1hdGNoICYmIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHFzIDogcXNcbn07XG4iLCJ2YXIgb3B0aW9ucyA9IHtcbiAgdGl0bGUgOiAnV2VhdGhlcicsXG4gIGhlaWdodCA6IDMwMCxcbiAgdkF4ZXM6IFt7XG4gICAgICAgICAgdGl0bGU6IFwiUmFkaWF0aW9uIChNSi9kYXkpOyBUZW1wZXJhdHVyZSAoXkMpOyBEZXcgUG9pbnQgKF5DKTsgRGF5bGlnaHQgKGgpXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNSxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1XG4gICAgICAgIH0se1xuICAgICAgICAgIHRpdGxlOiBcIlByZWNpcGl0YXRpb24gKG1tKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUwLFxuICAgICAgICAgIG1heFZhbHVlIDogMzUwXG4gICAgICAgIH1dLFxuICBoQXhpczoge3RpdGxlOiBcIk1vbnRoXCJ9LFxuICBzZXJpZXNUeXBlOiBcImJhcnNcIixcbiAgc2VyaWVzOiB7XG4gICAgICAwOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDE6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMjoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAzOiB7dHlwZTogXCJhcmVhXCIsIHRhcmdldEF4aXNJbmRleDoxfSxcbiAgICAgIDQ6IHt0YXJnZXRBeGlzSW5kZXg6MH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlKHJvb3QsIGRhdGEpIHtcbiAgJChyb290KS5odG1sKCcnKTtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG4gIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01pbiBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNYXggVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGV3IFBvaW50Jyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1ByZWNpcGl0YXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUmFkaWF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RheWxpZ2h0Jyk7XG5cbiAgdmFyIHJvd3MgPSBbXTtcbiAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICkge1xuICAgIGlmKCBkYXRlLm1hdGNoKC9cXGRcXGQvKSApIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgb2JqID0gZGF0YVtkYXRlXTtcbiAgICAgIHJvd3MucHVzaChbXG4gICAgICAgICAgcGFyc2VJbnQoZGF0ZS5yZXBsYWNlKC8tL2csICcnKSksXG4gICAgICAgICAgZGF0ZSsnJyxcbiAgICAgICAgICBvYmoudG1pbiB8fCAwLFxuICAgICAgICAgIG9iai50bWF4IHx8IDAsXG4gICAgICAgICAgb2JqLnRkbWVhbiB8fCAwLFxuICAgICAgICAgIG9iai5wcHQgfHwgMCxcbiAgICAgICAgICBvYmoucmFkIHx8IDAsXG4gICAgICAgICAgb2JqLmRheWxpZ2h0IHx8IDBcbiAgICAgIF0pO1xuICB9XG5cbiAgcm93cy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgIGlmKCBhWzBdID4gYlswXSApIHJldHVybiAxO1xuICAgIGlmKCBhWzBdIDwgYlswXSApIHJldHVybiAtMTtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG4gIC8vIHJlbW92ZSBzb3J0IHZhbHVlXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICByb3dzW2ldLnNwbGljZSgwLCAxKTtcbiAgfVxuXG4gIGR0LmFkZFJvd3Mocm93cyk7XG5cbiAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkNvbWJvQ2hhcnQocm9vdCk7XG4gIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBjaGFydDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZSA6IGNyZWF0ZVxufTtcbiIsInZhciB3ZWF0aGVyID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIGFwcDtcblxuLy8gYWRkIHNwcmVhZHNoZWV0IHZpeiBzb3VyY2Vcbi8vIGh0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vdHE/dHE9c2VsZWN0JTIwKiZrZXk9MEF2N2NVVi1vMlFRWWRIWkZZV0pOTldwUlMxaElWV2hHUVRobExXWndaV2MmdXNwPWRyaXZlX3dlYiNnaWQ9MFxuXG5mdW5jdGlvbiBpbml0KGEpIHtcbiAgYXBwID0gYTtcblxuICB2YXIgZHJvcFpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcF96b25lJyk7XG4gIGRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgX2hhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG4gIGRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS53aGljaCA9PSAxMyApIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuXG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlLXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldC1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItZHJpdmUtZmlsZScsIDEpO1xuXG4gICAgdmFyIHZhbCA9ICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCk7XG4gICAgaWYoIHZhbC5sZW5ndGggPT0gMCApIHJldHVybjtcblxuICAgIGlmKCAhdmFsLm1hdGNoKC9eaHR0cC4qLyApICkgdmFsID0gJ2h0dHBzOi8vJyt2YWw7XG5cbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgICBmaWxlUGFuZWwuaW5pdEZyb21VcmwodmFsLCByb290KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgnJyk7XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVGaWxlU2VsZWN0KGV2dCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1sb2NhbC1maWxlJywgMSk7XG5cbiAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyID8gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcyA6IGV2dC50YXJnZXQuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdC5cblxuICAvLyBmaWxlcyBpcyBhIEZpbGVMaXN0IG9mIEZpbGUgb2JqZWN0cy4gTGlzdCBzb21lIHByb3BlcnRpZXMuXG4gIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gIGZvciAodmFyIGkgPSAwLCBmOyBmID0gZmlsZXNbaV07IGkrKykge1xuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICBmaWxlUGFuZWwuaW5pdChmLCByb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaGFuZGxlRHJhZ092ZXIoZXZ0KSB7XG5ldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5ldnQucHJldmVudERlZmF1bHQoKTtcbmV2dC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JzsgLy8gRXhwbGljaXRseSBzaG93IHRoaXMgaXMgYSBjb3B5LlxufVxuXG4vLyBvbiBhZGQsIGlmIHRoZSBsaXN0IGlzIGVtcHR5LCBsZXQncyBjbG9zZSB0aGUgcG9wdXBcbmZ1bmN0aW9uIF9vbkNvbXBsZXRlKCkge1xuICAgIGlmKCAkKFwiI2ZpbGVfbGlzdFwiKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxufVxuXG52YXIgV2VhdGhlckZpbGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgIGRhdGUgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnRGF0ZScsXG4gICAgICAgICAgICB1bml0cyA6ICdEYXRlJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1pbiAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNaW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtYXggICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWF4IFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0ZG1lYW4gICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01lYW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHBwdCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUHJlY2lwaXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnbW0nLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICByYWQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1JhZGlhdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdNSiBtLTIgZGF5LTEnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBkYXlsaWdodCA6IHtcbiAgICAgICAgICAgIGxhbmVsIDogJ0RheWxpZ2h0IEhvdXJzJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ2hvdXJzJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfVxuICAgIH07XG5cblxuICB2YXIgZWxlID0gJCgnPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGxlZnRcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9idXR0b24+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZW5hbWVcIj48L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhclwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVub3c9XCIwXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDogMCU7XCI+JytcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic3Itb25seVwiPjAlIENvbXBsZXRlPC9zcGFuPicrXG4gICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzXCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2VcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdj48YSBjbGFzcz1cImJ0biBidG4tbGluayBwcmV2aWV3LWRhdGEtYnRuXCI+UHJldmlldyBEYXRhPC9hPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhLXRhYmxlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXN0YXR1c1wiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImhlaWdodDo1MHB4XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG1hcC1kYXRhLWJ0blwiPk1hcCBDU1YgQ29sdW1uczwvYT4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgZGlzYWJsZWQgcHVsbC1yaWdodFwiPkFkZCBEYXRhPC9hPicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+Jyk7XG5cbiAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgY3N2VGFibGUgPSBbXTtcblxuICAgIC8vIG9ubHkgYXV0byBoaWRlIHRoZSBmaXJzdCB0aW1lXG4gICAgdmFyIGF1dG9IaWRlID0gdHJ1ZTtcblxuICAvLyB0aGUgZmlsZSByZWFkZXIgb2JqZWN0IGFuZCB0aGUgZWxlbWVudFxuICBmdW5jdGlvbiBpbml0KGZpbGUsIHJvb3RFbGUpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25lcnJvciA9IGVycm9ySGFuZGxlcjtcbiAgICByZWFkZXIub25wcm9ncmVzcyA9IHVwZGF0ZVByb2dyZXNzO1xuICAgIHJlYWRlci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKGUpIHt9O1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG4gICAgICBwYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgIH1cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKVxuXG4gICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoZ2V0TmFtZShmaWxlKSk7XG4gICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgIF9zZXRIYW5kbGVycygpO1xuICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RnJvbVVybCh1cmwsIHJvb3RFbGUpIHtcbiAgICAgICAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLmh0bWwoJ1F1ZXJ5aW5nIHNwcmVhZHNoZWV0Li4uJyk7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldEtleSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbCgnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnK1xuICAgICAgICAgICAgJ0dvb2dsZSBTcHJlYWRzaGVldCcrKGtleS5sZW5ndGggPiAwID8gJzxiciAvPjxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTRweFwiPicra2V5Kyc8L3NwYW4+JyA6ICcnKSsnPC9oMz4nKTtcblxuICAgICAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gICAgICAgIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRXJyb3IgaW4gcXVlcnk6ICcgKyByZXNwb25zZS5nZXRNZXNzYWdlKCkgKyAnICcgKyByZXNwb25zZS5nZXREZXRhaWxlZE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJzZShkdFRvQ3N2KHJlc3BvbnNlLmdldERhdGFUYWJsZSgpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zZXRIYW5kbGVycygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5tYXAtZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB3ZWF0aGVyLnNldChhcHAuZ2V0TW9kZWwoKSwgZGF0YSk7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBfb25Db21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdFRvQ3N2KGR0KSB7XG4gICAgICAgIHZhciBhcnIgPSBbW11dO1xuXG4gICAgICAgIGR0ID0gSlNPTi5wYXJzZShkdC50b0pTT04oKSk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyclswXS5wdXNoKGR0LmNvbHNbaV0ubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkdC5yb3dzW2ldLmMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoICFkdC5yb3dzW2ldLmNbal0gKSBhcnJbaSsxXS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICBlbHNlIGFycltpKzFdLnB1c2goZHQucm93c1tpXS5jW2pdLnYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNzdiA9ICcnO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGNzdiArPSBhcnJbaV0uam9pbignLCcpKydcXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNzdjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRLZXkodXJsKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHVybC5zcGxpdCgnPycpO1xuICAgICAgICBpZiggcGFydHMubGVuZ3RoID09IDEgKSByZXR1cm4gJyc7XG5cbiAgICAgICAgcGFydHMgPSBwYXJ0c1sxXS5zcGxpdCgnJicpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIHBhcnRzW2ldLnNwbGl0KCc9JylbMF0gPT0gJ2tleScgKSByZXR1cm4gcGFydHNbaV0uc3BsaXQoJz0nKVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWUoZikge1xuICAgIHJldHVybiBbJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJywgZi5uYW1lLFxuICAgICAgICAgICAgICAgICcgPHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNnB4XCI+KCcsIGYudHlwZSB8fCAnbi9hJyxcbiAgICAgICAgICAgICAgICAnKTwvc3Bhbj4gLSA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxNnB4XCI+JywgZi5zaXplLCAnIGJ5dGVzPC9zcGFuPicsICc8L2gzPiddLmpvaW4oJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHMqXFxuL2csJycpLnNwbGl0KCdcXG4nKTtcblxuICAgIHZhciB0YWJsZSA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHRhYmxlLnB1c2goZGF0YVtpXS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICAgICAgaWYoIHRhYmxlLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNldEVycm9yKCdGaWxlIGRpZCBub3QgY29udGFpbiBhbnkgaW5mb3JtYXRpb24uJyk7XG4gICAgICAgIGNzdlRhYmxlID0gdGFibGU7XG5cbiAgICAgICAgcGFyc2VIZWFkZXIodGFibGVbMF0pO1xuICAgICAgICBnZXREYXRlUmFuZ2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlUmFuZ2UoKSB7XG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJycpO1xuICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA9PSAtMSApIHJldHVybiBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCdEYXRlIGNvbHVtbiBuZWVkcyB0byBiZSBtYXRjaGVkLicpO1xuICAgICAgICBpZiggdHlwZW9mIGhlYWRlcnMuZGF0ZS5jb2wgPT0gJ3N0cmluZycgKSBoZWFkZXJzLmRhdGUuY29sID0gcGFyc2VJbnQoaGVhZGVycy5kYXRlLmNvbCk7XG5cbiAgICAgICAgdmFyIGRhdGVzID0ge307XG4gICAgICAgIHZhciBkaXNwbGF5RGF0ZXMgPSBbXTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sIDwgY3N2VGFibGVbaV0ubGVuZ3RoICYmIGNzdlRhYmxlW2ldLmxlbmd0aCA+PSA3ICnCoHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgICAgICBpZiggcC5sZW5ndGggIT0gMyAmJiBwLmxlbmd0aCAhPSAyICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgbm90IGEgdmFsaWQgZm9ybWF0ICh5eXl5LW1tLWRkIG9yIHl5eXktbW0pXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYoICFkYXRlc1twWzBdXSApIGRhdGVzW3BbMF1dID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG1tZGQgPSBwWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYoIGRhdGVzW3BbMF1dLmluZGV4T2YobW1kZCkgIT0gLTEgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBpbiBkYXRhc2V0IHR3aWNlXCIpO1xuICAgICAgICAgICAgICAgIGRhdGVzW3BbMF1dLnB1c2gobW1kZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciB5ZWFyIGluIGRhdGVzICkge1xuICAgICAgICAgICAgaWYoIGRhdGVzW3llYXJdLmxlbmd0aCA9PSAxMikge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKycgWycrZGF0ZXNbeWVhcl0uam9pbignLCAnKSsnXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnPGI+RGF0ZSBSYW5nZTo8L2I+ICcrZGlzcGxheURhdGVzLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSGVhZGVyKGhlYWRlclJvdykge1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IFtdO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj4nO1xuICAgICAgICBodG1sICs9ICc8dHI+PHRoPktleTwvdGg+PHRoPkNvbHVtbiAjPC90aD48L3RyPic7XG5cbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVyUm93LmluZGV4T2Yoa2V5KSAhPSAtMSApIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW2tleV0uY29sID0gaGVhZGVyUm93LmluZGV4T2Yoa2V5KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLXN1Y2Nlc3NcIj4nK2hlYWRlcnNba2V5XS5jb2wrJyA8aSBjbGFzcz1cImljb24tb2tcIj48L2k+PC9zcGFuPjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c2VsZWN0IGNsYXNzPVwic2VsZWN0LScra2V5KydcIlwiPjwvc2VsZWN0PjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmh0bWwoaHRtbCsnPC90YWJsZT4nKTtcblxuXG4gICAgICAgIGlmKCBtYXRjaGVkLmxlbmd0aCAhPSA3ICkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNlbGVjdCBlbGVtZW50IGZvciBtaXNzaW5nIGNvbCdzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIlwiPltTZWxlY3QgQ29sdW1uXTwvb3B0aW9uPicpKTtcblxuICAgICAgICAgICAgLy8gaWYgaXQncyByYWRpYXRpb24sIGFkZCBvcHRpb24gZm9yIGNhbGN1bGF0aW5nXG4gICAgICAgICAgICAvLyBUT0RPXG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCBtaXNzaW5nIGNvbHNcbiAgICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVyUm93Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGlmKCBtYXRjaGVkLmluZGV4T2YoaGVhZGVyUm93W2ldKSA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCInK2krJ1wiPicraSsnIC0gJytoZWFkZXJSb3dbaV0rJzwvb3B0aW9uPicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgY2hhbmdlIGhhbmRsZXJzIGZvciB0aGUgc2VsZWN0b3JzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cigndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBpZiggdmFsICE9ICcnICkgaGVhZGVyc1t0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKC9zZWxlY3QtLywnJyldLmNvbCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBjb2x1bW5zIGFyZSBzZXQsIHJlbW92ZSBkaXNhYmxlZCBmcm9tIGJ0blxuICAgICAgICAgICAgICAgIHZhciByZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBoZWFkZXJzW2tleV0uY29sID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIHJlYWR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYXV0b0hpZGUgKSBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5oaWRlKCdzbG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgdGhlIHRhYmxlXG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5zaG93KCdzbG93Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBhdXRvSGlkZSA9IGZhbHNlO1xuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNldERhdGEoKTtcbiAgICAgICAgc2V0UHJldmlldygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByZXZpZXcoKSB7XG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuc2hvdygpO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+PHRoPmRhdGU8L3RoPic7XG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaHRtbCArPSAnPHRoPicra2V5Kyc8L3RoPic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYyA9IDA7XG4gICAgICAgIGZvciggdmFyIGRhdGUgaW4gZGF0YSApe1xuICAgICAgICAgICAgaWYoIGMgPT0gMTAgKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZCBjb2xzcGFuPVwiN1wiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj4uLi48L3RkPjwvdHI+JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2RhdGUrJzwvdGQ+JztcbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JytkYXRhW2RhdGVdW2tleV0rJzwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuICAgICAgICAgICAgYysrO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS5odG1sKGh0bWwpO1xuICAgIH1cblxuICAvLyBzZXQgdGhlIG1hcCBvZiBjc3YgaGVhZGVyc1xuICBmdW5jdGlvbiBzZXREYXRhKCkge1xuICAgICAgICBkYXRhID0ge307XG5cbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBjc3ZUYWJsZVtpXS5sZW5ndGggPCA3ICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXTtcblxuICAgICAgICAgICAgaWYoICFkYXRlICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgaWYoIGRhdGUuc3BsaXQoJy0nKS5sZW5ndGggPT0gMyApIGRhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5zcGxpY2UoMCwyKS5qb2luKFwiLVwiKTtcbiAgICAgICAgICAgIGRhdGFbZGF0ZV0gPSB7fTtcblxuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGRhdGFbZGF0ZV1ba2V5XSA9IHBhcnNlRmxvYXQoY3N2VGFibGVbaV1baGVhZGVyc1trZXldLmNvbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyhldnQpIHtcbiAgICAvLyBldnQgaXMgYW4gUHJvZ3Jlc3NFdmVudC5cbiAgICBpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgdmFyIHBlcmNlbnRMb2FkZWQgPSBNYXRoLnJvdW5kKChldnQubG9hZGVkIC8gZXZ0LnRvdGFsKSAqIDEwMCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MtYmFyJykuYXR0cignYXJpYS12YWx1ZW5vdycscGVyY2VudExvYWRlZCkud2lkdGgocGVyY2VudExvYWRlZCtcIiVcIik7XG4gICAgICAgIGVsZS5maW5kKCcuc3Itb25seScpLmh0bWwoTWF0aC5jZWlsKHBlcmNlbnRMb2FkZWQpKyclIENvbXBsZXRlJyk7XG4gICAgfVxufVxuXG4gIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihldnQpIHtcbiAgICBzd2l0Y2goZXZ0LnRhcmdldC5lcnJvci5jb2RlKSB7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX0ZPVU5EX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgTm90IEZvdW5kIScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfUkVBREFCTEVfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBpcyBub3QgcmVhZGFibGUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuQUJPUlRfRVJSOlxuICAgICAgICBicmVhazsgLy8gbm9vcFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHJlYWRpbmcgdGhpcyBmaWxlLicpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRFcnJvcihtc2cpIHtcbiAgICAgIGVsZS5maW5kKCcuc3RhdHVzJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicrbXNnKyc8L2Rpdj4nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCA6IGluaXQsXG4gICAgaW5pdEZyb21VcmwgOiBpbml0RnJvbVVybFxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG52YXIgY2hhcnQgPSByZXF1aXJlKCcuL2NoYXJ0Jyk7XG5cbi8vIG1ha2Ugc3VyZSBhbGwgdGhlIHdlYXRoZXIgaXMgc2V0LiAgIzEgdGhpbmcgcGVvcGxlIHdpbGwgbWVzcyB1cFxuZnVuY3Rpb24gY2hlY2sobW9kZWwpIHtcblxuICAvLyBmaXJzdCBnZXQgY3VycmVudCBtb250aHMgd2UgYXJlIGdvaW5nIHRvIHJ1bixcbiAgdmFyIHN0YXJ0ID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG5cbiAgdmFyIGVuZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkuc3BsaXQoXCItXCIpO1xuICB2YXIgZU1vbnRoID0gcGFyc2VJbnQoZW5kWzFdKTtcbiAgdmFyIGVZZWFyID0gcGFyc2VJbnQoZW5kWzBdKTtcblxuICAvKnZhciBjRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcblxuICAvLyBub3cgc2VlIGlmIHdlIGhhdmUgY3VzdG9tIHdlYXRoZXIgY292ZXJhZ2VcbiAgdmFyIGhhc0NvdmVyYWdlID0gdHJ1ZTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgd2hpbGUoIGNvdW50IDwgMTAwMDAgKSB7XG4gICAgICBpZiggIW1vZGVsLndlYXRoZXIgKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIG0gPSAoY0RhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIHZhciB5ID0gY0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBpZiggY0RhdGUuZ2V0TW9udGgoKSsxID09IGVNb250aCAmJiB5ID09IGVZZWFyICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXJbeSsnLScrbV0gKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY0RhdGUuc2V0TW9udGgoY0RhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgIGNvdW50Kys7XG4gIH1cblxuICBpZiggaGFzQ292ZXJhZ2UgKSByZXR1cm4gdHJ1ZTsqL1xuXG4gIC8vIGlmIG5vdCBtYWtlIHN1cmUgd2UgaGF2ZSBhdmVyYWdlcyBzZWxlY3RlZFxuICAvKmZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBjb25maWcuaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgYyA9IGNvbmZpZy5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICB2YXIgdmFsID0gcGFyc2VGbG9hdCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKS52YWwoKSk7XG4gICAgICAgICAgaWYoICF2YWwgJiYgdmFsICE9PSAwICkge1xuICAgICAgICAgICAgICBhbGVydChcIk1pc3Npbmcgd2VhdGhlciBkYXRhOiBcIitjK1wiIGZvciBtb250aCBcIittK1wiXFxuXFxuXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiRGlkIHlvdSBzZWxlY3QgYSBsb2NhdGlvbiAoU2V0dXApIGFuZC9vciBhcmUgYWxsIHdlYXRoZXIvc29pbCBmaWVsZHMgZmlsbGVkIG91dD9cIik7XG4gICAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9Ki9cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0KG1vZGVsLCBkYXRhKSB7XG4gIGlmKCAhbW9kZWwud2VhdGhlciApIG1vZGVsLndlYXRoZXIgPSB7fTtcblxuICBpZiggZGF0YSApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBkYXRhICkge1xuXG4gICAgICAgICAgLy8gY2xlYW4gdXAgZGF0ZSBmb3JtYXRcbiAgICAgICAgICAvL3ZhciBkYXRlID0ga2V5LnJlcGxhY2UoL1teXFxkLV0vLCcnKTtcbiAgICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoJy0nKTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIHBhcnRzW2ldLmxlbmd0aCA9PSAxICkge1xuICAgICAgICAgICAgICBwYXJ0c1tpXSA9ICcwJytwYXJ0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGRhdGUgPSBwYXJ0cy5qb2luKCctJyk7XG5cblxuICAgICAgICAgIC8qaWYoIHBhcnRzLmxlbmd0aCA8IDIgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhbGVydCgnSW52YWxpZCBEYXRlIEZvcm1hdC4gIERhdGVzIHNob3VsZCBiZSBpbiBZWVlZLU1NIGZvcm1hdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHBhcnRzWzFdLmxlbmd0aCAhPSAyICkge1xuICAgICAgICAgICAgICBkYXRlID0gcGFydHNbMF0rXCItMFwiK3BhcnRzWzFdO1xuICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgbW9kZWwud2VhdGhlcltkYXRlXSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBhcnJheSBzbyB3ZSBjYW4gc29ydFxuICB2YXIgYXJyID0gW107XG4gIHZhciBoZWFkZXJzID0gWydkYXRlJ107XG4gIGZvciggdmFyIGRhdGUgaW4gbW9kZWwud2VhdGhlciApIHtcblxuICAgICAgdmFyIHQgPSBbZGF0ZV07XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwud2VhdGhlcltkYXRlXSApIHtcbiAgICAgICAgICBpZigga2V5ID09ICducmVsJyApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKCBhcnIubGVuZ3RoID09PSAwICkgaGVhZGVycy5wdXNoKGtleSk7XG4gICAgICAgICAgdC5wdXNoKG1vZGVsLndlYXRoZXJbZGF0ZV1ba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIGFyci5wdXNoKHQpO1xuICB9XG5cbiAgaWYoIGFyci5sZW5ndGggPT09IDAgKSB7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKFwiTm8gd2VhdGhlciBkYXRhIGhhcyBiZWVuIHVwbG9hZGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBodG1sID0gJzxkaXYgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21heC1oZWlnaHQ6NjAwcHhcIj48dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPic7XG5cbiAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICB2YXIgZDEgPSBuZXcgRGF0ZShhWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcbiAgICAgIHZhciBkMiA9IG5ldyBEYXRlKGJbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuXG4gICAgICBpZiggZDEgPCBkMiApIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSBpZiggZDEgPiBkMiApIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICB9KTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dGg+JytoZWFkZXJzW2ldKyc8L3RoPic7XG4gIH1cbiAgaHRtbCArPSAnPC90cj4nO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2FycltpXS5qb2luKCc8L3RkPjx0ZD4nKSsnPC90ZD48L3RyPic7XG4gIH1cblxuICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKGh0bWwrJzwvdGFibGU+PC9kaXY+PGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+Jyk7XG5cbiAgLy9zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIC8vICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0LmNyZWF0ZSgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwud2VhdGhlcik7XG4gIC8vfSwgMTAwMCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQgOiBzZXQsXG4gIGNoZWNrIDogY2hlY2tcbn07XG4iXX0=
