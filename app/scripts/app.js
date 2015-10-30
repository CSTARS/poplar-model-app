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

  throw 'Runtime Error: no weather found for month: '+month;
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

          for ( var j = 1; j < config.inputs.weather.length; j++) {
              var c = config.inputs.weather[j];
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
  }

  return true;
}

function set(model, data) {
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
          if( arr.length === 0 ) headers.push(key);
          t.push(model.custom_weather[date][key]);
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

  setTimeout(function(){
      weatherCustomChart = chart.create($('#custom-weather-chart')[0], model.custom_weather);
  }, 1000);
}

module.exports = {
  set : set,
  check : check
};

},{"../config":28,"./chart":40}]},{},[26])(26)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xhVkkuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9saXR0ZXJmYWxsLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvcGZzLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvcHIuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9yb290cC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3NsYS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3dzVkkuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvd2VhdGhlci9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2ZuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvaW8uanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9ydW4uanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi91dGlscy5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL3ZhbGlkYXRlLmpzIiwianNsaWIvYXBwLmpzIiwianNsaWIvY2hhcnRzLmpzIiwianNsaWIvY29uZmlnLmpzIiwianNsaWIvZmxhc2hibG9jay1kZXRlY3Rvci5qcyIsImpzbGliL2dvb2dsZURyaXZlL2V4cG9ydFRvQ3N2LmpzIiwianNsaWIvZ29vZ2xlRHJpdmUvaW5kZXguanMiLCJqc2xpYi9nb29nbGVEcml2ZS9yZWFsdGltZS5qcyIsImpzbGliL2lucHV0Rm9ybS5qcyIsImpzbGliL21vZGVsUnVuSGFuZGxlci5qcyIsImpzbGliL29hdXRoLmpzIiwianNsaWIvb2ZmbGluZS5qcyIsImpzbGliL291dHB1dC9kZWZpbml0aW9ucy5qcyIsImpzbGliL291dHB1dC9yYXcuanMiLCJqc2xpYi91dGlscy5qcyIsImpzbGliL3dlYXRoZXIvY2hhcnQuanMiLCJqc2xpYi93ZWF0aGVyL2ZpbGVSZWFkZXIuanMiLCJqc2xpYi93ZWF0aGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzkrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL2lvJyk7XG52YXIgcnVuID0gcmVxdWlyZSgnLi9saWIvcnVuJykoaW8pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gcnVuO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgYXJlIGNvbnN0YW50cy5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBhc2NlX2V0cl93aW5kc3BlZWQgOiB7XG4gICAgICAgICAgICB2YWx1ZTogMixcbiAgICAgICAgICAgIHVuaXRzOiBcIm0vc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdCBXaW5kIFNwZWVkIHVzZWQgdG8gY2FsY3VsYXRlIEVUciAoYW5kIHJlc3VsdGFudCBLYykgZm9yIE1vZGVsLlwiXG4gICAgICAgIH0sXG4gICAgICAgIGRheXNfcGVyX21vbnRoOiB7XG4gICAgICAgICAgICB2YWx1ZTogMzAuNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImRheXMvbW9cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiBEYXlzIGluIGFuIGF2ZXJhZ2UgbW9udGhcIlxuICAgICAgICB9LFxuICAgICAgICBlMjA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyLjIsXG4gICAgICAgICAgICB1bml0czogXCJ2cC90XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYXRlIG9mIGNoYW5nZSBvZiBzYXR1cmF0ZWQgVlAgd2l0aCBUIGF0IDIwQ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHJob0Fpcjoge1xuICAgICAgICAgICAgdmFsdWU6IDEuMixcbiAgICAgICAgICAgIHVuaXRzOiBcImtnL21eM1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVuc2l0eSBvZiBhaXJcIlxuICAgICAgICB9LFxuICAgICAgICBsYW1iZGE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyNDYwMDAwLFxuICAgICAgICAgICAgdW5pdHM6IFwiSi9rZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm9cIlxuICAgICAgICB9LFxuICAgICAgICBWUERjb252OiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4wMDA2MjIsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgVlBEIHRvIHNhdHVyYXRpb24gZGVmaWNpdCA9IDE4LzI5LzEwMDBcIlxuICAgICAgICB9LFxuICAgICAgICBRYToge1xuICAgICAgICAgICAgdmFsdWU6IC05MCxcbiAgICAgICAgICAgIHVuaXRzOiBcIlcvbV4yXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcmNlcHQgb2YgbmV0IHJhZGlhdGlvbiB2ZXJzdXMgc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFFiOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC44LFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIGdETV9tb2w6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImcvbW9sKEMpXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBtb2xQQVJfTUo6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyLjMsXG4gICAgICAgICAgICB1bml0czogXCJtb2woQykvTUpcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUlwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRyZWUgOiByZXF1aXJlKCcuL3RyZWUnKSxcbiAgcGxhbnRhdGlvbiA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbicpLFxuICBwbGFudGF0aW9uX3N0YXRlIDogcmVxdWlyZSgnLi9wbGFudGF0aW9uX3N0YXRlJyksXG4gIHNvaWwgOiByZXF1aXJlKCcuL3NvaWwnKSxcbiAgd2VhdGhlciA6IHJlcXVpcmUoJy4vd2VhdGhlcicpLFxuICBtYW5hZ2UgOiByZXF1aXJlKCcuL21hbmFnZScpLFxuICBjb25zdGFudHMgOiByZXF1aXJlKCcuL2NvbnN0YW50cycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc2NyaXB0aW9uIDogXCJDcm9wIE1hbmFnZW1lbnQgUGFyYW1ldGVyc1wiLFxuICB2YWx1ZSA6IHtcbiAgICBpcnJpZ0ZyYWMgOiB7XG4gICAgICB2YWx1ZSA6IDEsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiSXJyaWdhdGlvbiBmcmFjdGlvbjogMSA9IGZ1bGx5IGlycmlnYXRlZCwgMCA9IG5vIGlycmlnYXRpb24uIEFueSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGFyZSBhY2NlcHRhYmxlXCJcbiAgICB9LFxuICAgIGZlcnRpbGl0eSA6IHtcbiAgICAgIHZhbHVlIDogMC43LFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlNvaWwgZmVydGlsaXR5XCJcbiAgICB9LFxuICAgIGRhdGVQbGFudGVkIDoge1xuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHRoZSBjcm9wIHdhcyBwbGFudGVkXCJcbiAgICB9LFxuICAgIGRhdGVDb3BwaWNlZCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSBvZiB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlSW50ZXJ2YWwgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogMyxcbiAgICAgICAgdW5pdHMgOiBcIlllYXJzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgY29wcGljZURhdGVzIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgZGF0ZUZpbmFsSGFydmVzdCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB3aGVuIHRoZSBjcm9wIGlzIGNvbXBsZXRlbHkgaGFydmVzdGVkXCJcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJHcmVlbndvb2QgUEcgVmFsdWVzIChkZWZhdWx0KVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICByZXF1aXJlZCA6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFN0b2NraW5nRGVuc2l0eToge1xuICAgICAgICAgICAgdmFsdWU6IDM1ODcsXG4gICAgICAgICAgICB1bml0czogXCJUcmVlcy9oZWN0YXJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB0cmVlcyBwbGFudGVkIHBlciBoZWN0YXJcIlxuICAgICAgICB9LFxuICAgICAgICBTZWVkbGluZ01hc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDQsXG4gICAgICAgICAgICB1bml0czogXCJrR1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFzcyBvZiB0aGUgc2VlZGxpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBzdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIGZvbGlhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byByb290XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQbGFudGF0aW9uIHN0YXRlIGNsYXNzLCBjb250YWluaW5nIGFsbCBpbnRlbWVkaWF0ZSB2YWx1ZXMgYXQgZXZlcnkgdGltZXN0ZXAgb2YgdGhlIG1vZGVsXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZmVlZHN0b2NrSGFydmVzdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQ291bnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0cmVlIGF0IHRoZSB0aW1lIG9mIGNvcHBpY2VcIlxuICAgICAgICB9LFxuICAgICAgICBWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwia1BBXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpXCJcbiAgICAgICAgfSxcbiAgICAgICAgZlQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVGVtcGVyYXR1cmUgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmRnJvc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZOdXRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk51dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnRcIlxuICAgICAgICB9LFxuICAgICAgICBmU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29pbCB3YXRlciBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgUEFSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcIm1vbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIHhQUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSW50Y3B0bjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSByYWluZmFsbCBpbnRlcmNlcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBBU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIEN1bUlycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3VtdWxhdGl2ZSBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVxdWlyZWQgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0YW5kQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRoZSB0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgTEFJOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgYXJlYSBpbmRleFwiXG4gICAgICAgIH0sXG4gICAgICAgIENhbkNvbmQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGNvbmR1Y3RhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVHJhbnNwOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBtb250aGx5IHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBFVHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZWZlcmVuY2UgKEFsZmFsZmEpIHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBLYzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDcm9wIENvZWZmaWNpZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAgUGh5c01vZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1XCJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhdGlvIG9mIGZvbGlhZ2UgdG8gc3RlbSBwYXJ0aXRpb25pbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBsaXR0ZXJmYWxsOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIE5QUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTmV0IFByaW1hcnkgUHJvZHVjdGl2aXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgUm9vdFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCBwcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBkVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBXRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJGb2xpYWdlIHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1I6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0ZW0geWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRvdGFsIHlpZWxkOiByb290ICsgc3RlbSArIGZvbGlhZ2VcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNvaWwgaW5mb3JtYXRpb24gYmFzZWQgb24gY3VycmVudCBsb2NhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1heEFXUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIGF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3dwb3dlcjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3dlciBwYXJhbWV0ZXIgYmFzZWQgb24gY2xheSBjb250ZW50IG9mIHNvaWxcIlxuICAgICAgICB9LFxuICAgICAgICBzd2NvbnN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImNvbnN0YW50IHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW2djIG0vc10/XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2ljYWwgbW9kaWZlciwgc3BlY2lmaWVzIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UuICBVc2VkIGluIGNhbGN1bGF0aW9uIG9mIHRyYW5zcGlyYXRpb25cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAwMVxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB2YWx1ZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDJcbiAgICAgICAgfSxcbiAgICAgICAgbGFpOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgQXJlYSBJbmRleCB3aGVyZSBwYXJhbWV0ZXIgcmVhY2hlcyBhIG1heGltdW0gdmFsdWUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi42XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGdyb3d0aCBsaW1pdGVyIGFzIGEgZnVuY3Rpb24gb2YgdGhlIHRyZWUgYWdlLiAgVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW5jeSBwYXJhbWV0ZXIuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3dhMHEyaWgxOGhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiA0Ny41XG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAzLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhcmFtZXRlcnMgYWZmZWN0aW5nIHRlbXBlcmF0dXJlIG1vZGlmaWVyLCBmVC4gQSBncmFwaCBvZiBob3cgdGhlc2UgcGFyYW1ldGVycyBhZmZlY3QgdGhlIHRlbXBlcmF0dXJlIG1vZGlmaWVyIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82OWl3cXRubDI4XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtaW5pbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBvcHQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBvcHRpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMjBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtYXhpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogNTBcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBzcGVjaWZ5IGdyb3d0aCBwYXJhbWV0ZXJzIHNwZWNpZmljIHRvIHRoZSBzcGVjaWVzIG9mIHRyZWUuXCIsXG4gICAgdmFsdWUgOiB7XG4gICAgICAgIGs6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYWRpYXRpb24gRXh0aW5jdGlvbiBDb2VmZmljaWVudC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgZnVsbENhbkFnZToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJZZWFyIHdoZXJlIHRyZWUgcmVhY2hlcyBmdWxsIENhbm9weSBDb3Zlci5cIixcbiAgICAgICAgICAgIHZhbHVlOiAxLjVcbiAgICAgICAgfSxcbiAgICAgICAga0c6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltrUEFeLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXRlcm1pbmVzIHRoZSByZXNwb25zZSBvZiB0aGUgY2Fub3B5IGNvbmR1Y3RhbmNlIHRvIHRoZSB2YXBvciBwcmVzc3VyZSBkZWZpY2l0LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBhbHBoYToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tnL21vbCA/XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHF1YW50dW0gZWZmaWNpZW5jeS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjA4XG4gICAgICAgIH0sXG4gICAgICAgIGZUIDogcmVxdWlyZSgnLi9mdCcpLFxuICAgICAgICBCTGNvbmQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgYm91bmRhcnkgbGF5ZXIgY29uZHVjdGFuY2UuIFVzZWQgaW4gdGhlIGNhbGN1YXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDRcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZTogcmVxdWlyZSgnLi9mYWdlJyksXG4gICAgICAgIGZOMDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIHRoZSBudXRyaXRpb25hbCBtb2RpZmllcixmTnV0ci4gIGZOdXRyIHJhbmdlcyBmcm9tIFtmTk8sMSkgYmFzZWQgb24gdGhlIGZlcnRpbGl0eSBpbmRleCB3aGljaCByYW5nZXMgZnJvbSAwIHRvIDEuICBXaGVuIGZOMD0xIGluZGljYXRlcyBmTnV0ciBpcyAxXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNlxuICAgICAgICB9LFxuICAgICAgICBTTEE6IHJlcXVpcmUoJy4vc2xhJyksXG4gICAgICAgIC8vQ2hlY2tVbml0c0NoYW5nZXRvbGluZWFyRnVuY3Rpb25cbiAgICAgICAgQ29uZHVjdGFuY2U6IHJlcXVpcmUoJy4vY29uZHVjdGFuY2UnKSxcbiAgICAgICAgSW50Y3B0bjogcmVxdWlyZSgnLi9pbnRjcHRuJyksXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFzc2ltaWxhdGlvbiB1c2UgZWZmaWNpZW5jeS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdGhlIE5QUC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjQ3XG4gICAgICAgIH0sXG4gICAgICAgIHBmczogcmVxdWlyZSgnLi9wZnMnKSxcbiAgICAgICAgd3NWSTogcmVxdWlyZSgnLi93c1ZJJyksXG4gICAgICAgIGxhVkk6IHJlcXVpcmUoJy4vbGFWSScpLFxuICAgICAgICBwUjogcmVxdWlyZSgnLi9wcicpLFxuICAgICAgICByb290UDogcmVxdWlyZSgnLi9yb290cCcpLFxuICAgICAgICBsaXR0ZXJmYWxsOiByZXF1aXJlKCcuL2xpdHRlcmZhbGwnKVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJhaW5mYWxsIGludGVyY2VwdGlvbiBmcmFjdGlvbi4gIEEgbGluZWFyIGZ1bmN0aW9uIHcuci50LiBMQUlcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI0XG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDcuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQW4gYWx0ZXJudGF0aXZlIHRvIF9wZnNfLCBsYVZJLCBhbG9uZyB3aXRoIHdzVkkgZGVmaW5lcyB0aGUgcGFydGl0aW9uaW5nIG9mIGZvbGlhZ2UgdG8gc3RlbSBbKFdGL1dTKSBmcmFjdGlvbl0gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIHVzaW5nIHRoZSB2b2x1bWUgaW5kZXggKFZJKS4gIFZJPShCYXNhbCBhcmVhICogc3RlbSBoZWlnaHQpLiAgbGFWSSBwcmVkaWN0cyB0aGUgbGVhZiBhcmVhIGdpdmVuIGEgKFZJKS4gQWxvbmcgd2l0aCBTTEEsIHRoZSB0b3RhbCBmb2xpYWdlIGlzIGNhbGN1bGF0ZWQgIFdGID0gU0xBKkxlYWZBcmVhIHdoZXJlIExlYWZBcmVhPSBjb25zdGFudCooVkkpXnBvd2VyLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICBjb25zdGFudDoge1xuICAgICAgICAgIHVuaXRzOiBcIlttXjJdXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiY29uc3RhbnQgaW4gbGVhZl9hcmVhPWNvbnN0YW50KlZJXnBvd2VyLiAgSWYgdGhpcyBpcyBub3Q9MCwgdGhlbiB0aGVzZSBmdW5jdGlvbnMgd2lsbCBiZSB1c2VkLCBvdGhlcndpc2UgdGhlIHBmcyBmdW5jdGlvbnMgYXJlIHVzZWQuXCIsXG4gICAgICAgICAgdmFsdWU6IDBcbiAgICAgIH0sXG4gICAgICAgIHBvd2VyOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3dlciBpbiBsZWFmX2FyZWE9IGNvbnN0YW50KlZJXnBvd2VyIFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgbW9udGhseSBsb3NzIG9mIGZvbGlhZ2UuIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFueSBwYXJhbWV0ZXIuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzZpcTlwcGRxczdcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDE1XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wM1xuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBkZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWUuIFRoaXMgaXMgY2FsY3VsYXRlZCB3aXRoIGEgcGFpciBvZiBhbGxvbWV0cmljIHBvd2VyIGVxdWF0aW9ucy4gIFRoZSBmaXJzdCByZWxhdGVzIGJhc2FsIGRpYW1ldGVyLCAoRE9CKSB0byB0b3RhbCB3b29keSBiaW9tYXNzLCB3aGlsZSB0aGUgc2Vjb25kIHJlbGF0ZXMgRE9CIHRvIHBmcy4gIFRoZSBwYXJhbWV0ZXJpemF0aW9uIG9mIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiBET0IgYW5kIHdvb2R5IGJpb21hc3MgaXMgaW52ZXJ0ZWQgdG8gZGV0ZXJtaW5lIHRoZSBET0IgZnJvbSB0aGUgbW9kZWxlZCB3b29keSBmcmFjdGlvbi4gIFRoaXMgcmVsYXRpb24gaXMgcGxvdHRlZCBhdDogLiAgVGhlIG1vZGVsIGFsbG9jYXRlcyB0aGUgYXBwcm9wcmlhdGUgZnJhY3Rpb24gb2Ygd29vZCBiYXNlZCBvbiB0aGUgU3RvY2tpbmcgZGVuc2l0eSBvZiB0aGUgcGxhbnRhdGlvbi4gRE9CIHJhdGhlciB0aGFuIERCSCBpcyB1c2VkIGZvciBjb21wYXJpc29uIG9mIHRyZWVzIHdpdGggYSBoaWdoIHN0ZW1DbnQgYW5kIHJhcGlkIGNvcHBpY2luZyB2YWx1ZS5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBzdGVtQ250OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmVyYWdlIG51bWJlciBvZiBzdGVtcyBwZXIgc3R1bXBcIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjhcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbUM6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltjbV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnN0YW50IGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4xOFxuICAgICAgICB9LFxuICAgICAgICBzdGVtUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHdvb2R5IGJpb21hc3MuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi40XG4gICAgICAgIH0sXG4gICAgICAgIHBmc014OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHBvc3NpYmxlIHBmcyB2YWx1ZSBhbGxvd2VkXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9LFxuICAgICAgICBwZnNQOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBpbiByZWxhdGlvbiBvZiBEQk8gdG8gcGZzXCIsXG4gICAgICAgICAgICB2YWx1ZTogLTAuNzcyXG4gICAgICAgIH0sXG4gICAgICAgIHBmc0M6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltjbV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnN0YW50IGluIHJlbGF0aW9uIG9mIERPQiB0byBwZnMuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMS4zXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWFsIHBhcmFtZXRlciwgc3BlY2lmaWVzIHRoZSBhbW91bnQgb2YgbmV3IGdyb3d0aCBhbGxvY2F0ZWQgdG8gdGhlIHJvb3Qgc3lzdGVtLCBhbmQgdGhlIHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiB0aGUgcGh5c2lvbG9nYWwgcGFyYW1ldGVyIGlzIDEuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4xN1xuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBhbGxvY2F0aW9uIHRvIHRoZSByb290LCB3aGVuIG0wLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuN1xuICAgICAgICB9LFxuICAgICAgICBtMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwZW5kYW5jZSBvbiB0aGUgZmVydGlsaXR5IGluZGV4LiAwIGluZGljYXRlcyBmdWxsIGRlcGVuZGFuY2Ugb24gZmVydGlsaXR5LCAxIGluZGljYXRlcyBhIGNvbnN0YW50IGFsbG9jYXRpb24sIGluZGVwZW5kYW50IG9mIGZlcnRpbGl0eVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICB0dXJub3Zlcjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21vbnRoXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtb250aGx5IHJvb3QgdHVybm92ZXIgcmF0ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAyXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgcGFyYW1ldGVycyBzcGVjaWZ5IHJvb3QgYWxsb2NhdGlvbiB0byBncm93dGggYWZ0ZXIgY29wcGljaW5nLlwiLFxuICAgIHZhbHVlIDoge1xuICAgICAgZnJhYzoge1xuICAgICAgICAgIHVuaXRzOiBcIlttb250aF4xXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZnJhY3Rpb25hbCBhbW91bnQgb2Ygcm9vdCBiaW9tYXNzIHRoYXQgZXhjZWVkcyB0aGUgYWJvdmVncm91bmQgcmVxdWlyZW1lbnRzIHRoYXQgY2FuIGJlIHN1cHBsaWVkIGluIGEgZ2l2ZW4gbW9udGguXCIsXG4gICAgICAgICAgdmFsdWU6IDAuMlxuICAgICAgfSxcbiAgICAgIExBSVRhcmdldDoge1xuICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyBhIHRhcmdldCBMQUkgcmF0ZS4gIFRoZSBUYXJnZXQgTEFJIGlzIGluY2x1ZGVkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiBhIHRhcmdldCBOUFAsIGJhc2VkIG9uIHdlYXRoZXIgcGFyYW1hdGVycy4gIEJlbG93IHRoaXMgdGFyZ2V0LCB0aGUgcm9vdHMgd2lsbCBjb250cmlidXRlIGJpb21hc3MgaWYgdGhlIGJlbG93IGdyb3VuZCByb290IG1hc3MgZXhjZWVkcyB0aGUgcmVxdWlyZW1lbnRzIG9mIHRoZSBhYm92ZWdyb3VuZCBiaW9tYXNzLiBUaGUgdGFyZ2V0IGlzIHNwZWNpZmllZCBpbiBMQUkgdG8gdGltZSByb290IGNvbnRyaWJ1dGlvbnMgdG8gcGVyaW9kcyBvZiBncm93dGhcIixcbiAgICAgICAgICB2YWx1ZTogMTBcbiAgICAgIH0sXG4gICAgICBlZmZpY2llbmN5OiB7XG4gICAgICAgICAgdW5pdHM6IFwiW2tnL2tnXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZWZmaWNpZW5jeSBpbiBjb252ZXJ0aW5nIHJvb3QgYmlvbWFzcyBpbnRvIGFib3ZlZ3JvdW5kIGJpb21hc3MuXCIsXG4gICAgICAgICAgdmFsdWU6IDAuN1xuICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbbV4yL2tnXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgU3BlY2lmaWMgTGVhZiBBcmVhIGFzIGEgZnVuY3Rpb24gb2YgdGhlIHRyZWUgYWdlLiAgVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW5jeSBwYXJhbWV0ZXIuICBVc2VkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiBMQUkuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3dhMHEyaWgxOGhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTlcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxMC44XG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogNVxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQW4gYWx0ZXJudGF0aXZlIHRvIF9wZnNfLCB3c1ZJLCBhbG9uZyB3aXRoIGl0J3MgY29tcGFuaW9uIGxhVkkgZGVmaW5lcyB0aGUgcGFydGl0aW9uaW5nIG9mIGZvbGlhZ2UgdG8gc3RlbSBbKFdGL1dTKSBmcmFjdGlvbl0gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzLCB1c2luZyB0aGUgdm9sdW1lIGluZGV4IChWSSkuICBWST0oZGlhbWV0ZXJAMjJjbSAoY20pKV4yICogaGVpZ2h0IChtKS4gd3NWSSByZWxhdGVzIHRoZSBWb2x1bWUgSW5kZXggKFZJKSwgdG8gd29vZHkgYmlvbWFzcyAoV1MpLCBXU1tnXT1jb25zdGFudCpWSV5wb3dlci4gIFdTL3N0ZW1zX3Blcl9zdHVtcCBpcyBpbnZlcnRlZCB0byBlc3RpbWF0ZSBWSSBmb3IgdGhlIHRyZWVcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBzdGVtc19wZXJfc3R1bXA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2ZXJnZSBudW1iZXIgb2Ygc3RlbXMgb24gZWFjaCBzdHVtcCBhZnRlciBjb3BwaWNpbmdcIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjhcbiAgICAgICAgfSxcbiAgICAgICAgY29uc3RhbnQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltnXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29uc3RhbnQgaW4gcmVsYXRpb24gb2YgVkkgdG8gV1NcIixcbiAgICAgICAgICAgIHZhbHVlOiAxNjFcbiAgICAgICAgfSxcbiAgICAgICAgcG93ZXI6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIFZJIHRvIFdTLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuODU0XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9udGg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbW9udGggbnVtYmVyIHNpbmNlIHBsYW50aW5nXCJcbiAgICB9LFxuICAgIHRtaW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0bWF4OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHRlbXBlcmF0dXJlIGZvciBncm93dGhcIlxuICAgIH0sXG4gICAgdGRtZWFuOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXcgcG9pbnQgdGVtcGVyYXR1cmVcIlxuICAgIH0sXG4gICAgcHB0OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlByZWNpcGl0YXRpb25cIlxuICAgIH0sXG4gICAgcmFkOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbGFyIHJhZGlhdGlvblwiXG4gICAgfSxcbiAgICBucmVsOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsIC8vIGNhbGN1YXRlZFxuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH0sXG4gICAgZGF5bGlnaHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG5AbW9kdWxlIDNQRyBNb2R1bGVcbioqL1xuXG5cbi8qKlxuQ2xhc3MgZm9yIGFsbCB0aGUgZnVuY3Rpb25zIHRoYXQgcnVuIGluIGEgc2luZ2xlIHN0ZXAgb2YgdGhlIG1vZGVsXG5cbkBjbGFzcyBtb2R1bGUuZXhwb3J0c1xuKiovXG5cblxuLyoqXG5saXN0IG9mIGNvbnN0YW50cyB1c2VkIGZvciBjb21wdXRhdGlvbnNcblxuQGF0dHJpYnV0ZSBjb25zdGFudFxuKiovXG52YXIgY29uc3RhbnRzID0ge1xuICBhc2NlX2V0cl9lbGV2YXRpb246IHtcbiAgICB2YWx1ZTo1MDAsXG4gICAgdW5pdHM6J20vcycsXG4gICAgZGVzY3JpcHRpb246J0VzdGltYXRlZCBFbGV2YXRpb24gb2YgY2FsY3VsYXRpb24gb2YgRVRyIChhbmQgS2MpJ1xuICB9LFxuICBhc2NlX2V0cl93aW5kc3BlZWQ6IHtcbiAgICB2YWx1ZToyLFxuICAgIHVuaXRzOidtL3MnLFxuICAgIGRlc2NyaXB0aW9uOidDb25zdGFudCB3aW5kIHNwZWVkIGZvciBjYWxjdWxhdGlvbiBvZiBFVHIgKGFuZCBLYyknXG4gIH0sXG4gIGUyMDp7XG4gICAgICB2YWx1ZToyLjIsXG4gICAgICB1bml0czondnAvdCcsXG4gICAgICBkZXNjcmlwdGlvbjonUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMEMnXG4gIH0sXG4gIHJob0Fpcjp7XG4gICAgICB2YWx1ZToxLjIsXG4gICAgICB1bml0czona2cvbV4zJyxcbiAgICAgIGRlc2NyaXB0aW9uOidEZW5zaXR5IG9mIGFpcidcbiAgfSxcbiAgbGFtYmRhOntcbiAgICAgIHZhbHVlOjI0NjAwMDAsXG4gICAgICB1bml0czonSi9rZycsXG4gICAgICBkZXNjcmlwdGlvbjonTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm8nXG4gIH0sXG4gIFZQRGNvbnY6e1xuICAgICAgdmFsdWU6MC4wMDA2MjIsXG4gICAgICB1bml0czonPycsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVydCBWUEQgdG8gc2F0dXJhdGlvbiBkZWZpY2l0ID0gMTgvMjkvMTAwMCdcbiAgfSxcbiAgUWE6e1xuICAgICAgdmFsdWU6LTkwLFxuICAgICAgdW5pdHM6J1cvbV4yJyxcbiAgICAgIGRlc2NyaXB0aW9uOidJbnRlcmNlcHQgb2YgbmV0IHJhZGlhdGlvbiB2ZXJzdXMgc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgUWI6e1xuICAgICAgdmFsdWU6MC44LFxuICAgICAgdW5pdHM6J3VuaXRsZXNzJyxcbiAgICAgIGRlc2NyaXB0aW9uOidzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXAnXG4gIH0sXG4gIGdETV9tb2w6e1xuICAgICAgdmFsdWU6MjQsXG4gICAgICB1bml0czonZy9tb2woQyknLFxuICAgICAgZGVzY3JpcHRpb246J01vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlcidcbiAgfSxcbiAgbW9sUEFSX01KOntcbiAgICAgIHZhbHVlOjIuMyxcbiAgICAgIHVuaXRzOidtb2woQykvTUonLFxuICAgICAgZGVzY3JpcHRpb246J0NvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUidcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuY29uc3RhbnQgPSBjb25zdGFudDtcbmZ1bmN0aW9uIGNvbnN0YW50KGMpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzW2NdLnZhbHVlO1xufVxuXG4vKipcblRpbWUgRGVwZW5kYW50IEF0dHJpYnV0ZSxcbnVuaXRzPSd2YXJpb3VzJyxcbmRlc2NyaXB0aW9uPSdUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSB0aW1lIGRlcGVuZGFudCBmdW5jdGlvbiB0aGF0IGRlY2F5c1xuKG9yIHJpc2VzIGZyb20gZjAgdG8gZjEuICBUaGUgdmFsdWUgKGYwK2YxKS8yIGlzIHJlYWNoZWQgYXQgdG0sXG5hbmQgdGhlIHNsb3BlIG9mIHRoZSBsaW5lIGF0IHRtIGlzIGdpdmVuIGJ5IHAuXG5AbWV0aG9kIHRkcFxuQHBhcmFtIHhcbkBwYXJhbSBmXG4qKi9cbm1vZHVsZS5leHBvcnRzLnRkcCA9IGZ1bmN0aW9uKHgsIGYpIHtcbiAgdmFyIHAgPSBmLmYxICtcbiAgICAgICAgICAoZi5mMCAtIGYuZjEpICpcbiAgICAgICAgICBNYXRoLmV4cCggLU1hdGgubG9nKDIpICogTWF0aC5wb3coICh4L2YudG0pLCBmLm4gKSk7XG4gIHJldHVybiBwO1xufTtcblxuLyoqXG5AbWV0aG9kIGxpblxuQHBhcmFtIHhcbkBwYXJhbSBwXG4qL1xubW9kdWxlLmV4cG9ydHMubGluID0gZnVuY3Rpb24oeCwgcCl7XG4gIGlmKCB4IDwgMCApIHtcbiAgICByZXR1cm4gcC5tbjtcbiAgfVxuICBpZiggeCA+IHAueG1heCApIHtcbiAgICByZXR1cm4gcC54bWF4O1xuICB9XG4gIHJldHVybiBwLm1uICsgKHAubXgtcC5tbikqKHgvcC54bWF4KTtcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgUmFpbmZhbGwgaW50ZXJjZXB0aW9uJ1xuQG1ldGhvZCBJbnRjcHRuXG5AcGFyYW0gY3VyX0xBSVxuQHBhcmFtIGNcbiovXG5tb2R1bGUuZXhwb3J0cy5JbnRjcHRuID0gZnVuY3Rpb24oY3VyX0xBSSwgYyl7XG4gIHJldHVybiBNYXRoLm1heChjLm1uLGMubW4gKyAoYy5teCAtIGMubW4pICogTWF0aC5taW4oMSAsIGN1cl9MQUkgLyBjLmxhaSkpO1xufTtcblxuLyoqXG51bml0cz0nbW0nLFxuZGVzY3JpcHRpb249J0F2YWlsYWJsZSBTb2lsIFdhdGVyJ1xuQG1ldGhvZCBBU1dcbkBwYXJhbSBtYXhBU1dcbkBwYXJhbSBwcmV2X0FTV1xuQHBhcmFtIGRhdGVfcHB0XG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gY3VyX0lycmlnXG4qL1xubW9kdWxlLmV4cG9ydHMuQVNXID0gZnVuY3Rpb24obWF4QVNXLCBwcmV2X0FTVywgZGF0ZV9wcHQsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBjdXJfSXJyaWcpe1xuICByZXR1cm4gTWF0aC5taW4obWF4QVNXKjEwLCBNYXRoLm1heChwcmV2X0FTVyArIGRhdGVfcHB0IC0gKGN1cl9UcmFuc3AgKyBjdXJfSW50Y3B0biAqIGRhdGVfcHB0KSArIGN1cl9JcnJpZywgMCkpO1xufTtcblxuLy9UT0RPOiBkb3VibGUgY2hlY2sgdGhlIGFwcHJvcHJpYXRlIHVzZSBvZiB0ZG1lYW4gKGRldyBwb2ludCB0ZW1wKVxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8qKlxudW5pdHM9J2tQQScsXG5kZXNjcmlwdGlvbj0nTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0J1xuQG1ldGhvZCBWUERcbkBwYXJhbSBkYXRlX3RtaW5cbkBwYXJhbSBkYXRlX3RtYXhcbkBwYXJhbSBkYXRlX3RkbWVhblxuKi9cbm1vZHVsZS5leHBvcnRzLlZQRCA9IGZ1bmN0aW9uKGRhdGVfdG1pbiwgZGF0ZV90bWF4LCBkYXRlX3RkbWVhbil7XG4gIHZhciB0ID0gKDAuNjEwOCAvXG4gICAgICAgICAgICAyICpcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgTWF0aC5leHAoZGF0ZV90bWluICogMTcuMjcgLyAoZGF0ZV90bWluICsgMjM3LjMpICkgK1xuICAgICAgICAgICAgICBNYXRoLmV4cChkYXRlX3RtYXggKiAxNy4yNyAvIChkYXRlX3RtYXggKyAyMzcuMykgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICkgLVxuICAgICAgICAgICggMC42MTA4ICpcbiAgICAgICAgICAgIE1hdGguZXhwKGRhdGVfdGRtZWFuICogMTcuMjcgLyAoZGF0ZV90ZG1lYW4gKyAyMzcuMykgKVxuICAgICAgICAgICk7XG4gIHJldHVybiB0O1xufTtcblxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1ZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhciknXG5AbWV0aG9kIGZWUERcbkBwYXJhbSBrR1xuQHBhcmFtIGN1cl9WUERcbiovXG5tb2R1bGUuZXhwb3J0cy5mVlBEID0gZnVuY3Rpb24oa0csIGN1cl9WUEQpe1xuICByZXR1cm4gTWF0aC5leHAoLTEgKiBrRyAqIGN1cl9WUEQpO1xufTtcblxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8vIG1ha2UgYSBtZWFuaW5nZnVsIHRlbXB2YXIgbmFtZVxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb24gPSAnTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyJ1xuQG1ldGhvZCBmRnJvc3RcbkBwYXJhbSBkYXRlX3RtaW5cbiovXG5tb2R1bGUuZXhwb3J0cy5mRnJvc3QgPSBmdW5jdGlvbihkYXRlX3RtaW4pIHtcbiAgdmFyIHRlbXBWYXIgPSAtMS4wO1xuXG4gIGlmKCBkYXRlX3RtaW4gPj0gMCApe1xuICAgIHRlbXBWYXIgPSAxLjA7XG4gIH0gLy9lbHNlIC0xLjBcblxuICByZXR1cm4gMC41ICogKDEuMCArIHRlbXBWYXIgKiBNYXRoLnNxcnQoMSAtIE1hdGguZXhwKC0xICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKiAoNCAvIDMuMTQxNTkgKyAwLjE0ICogTWF0aC5wb3coICgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgLyAoMSArIDAuMTQgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApICkgKSApO1xufTtcblxuLy9UT0RPIC0gYmV0dGVyIG5hbWluZz86IHRtaW4sIHRtYXggPSB3ZWF0aGVyIFRvcHQsIFRtYXgsIFRtaW4gPSB0cmVlIHBhcmFtc1xuLyoqXG51bml0cz11bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdUZW1wZXJhdHVyZSBtb2RpZmllcidcbkBtZXRob2QgZlRcbkBwYXJhbSB0YXZnXG5AcGFyYW0gZlRcbiovXG5tb2R1bGUuZXhwb3J0cy5mVCA9IGZ1bmN0aW9uKHRhdmcsIGZUKXtcbiAgdmFyIGY7XG4gIGlmKHRhdmcgPD0gZlQubW4gfHwgdGF2ZyA+PSBmVC5teCl7XG4gICAgZiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgZiA9ICggKHRhdmcgLSBmVC5tbikgLyAoZlQub3B0IC0gZlQubW4pICkgICpcbiAgICAgICAgICAgTWF0aC5wb3cgKCAoIChmVC5teCAtIHRhdmcpIC8gKGZULm14IC0gZlQub3B0KSApLFxuICAgICAgICAgICAgICAgICAgICAgICggKGZULm14IC0gZlQub3B0KSAvIChmVC5vcHQgLSBmVC5tbikgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICB9XG4gIHJldHVybihmKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicsXG5kZXNjcmlwdGlvbj0nUmVxdWlyZWQgSXJyaWdhdGlvbidcbkBtZXRob2QgSXJyaWdcbkBwYXJhbSBpcnJpZ0ZyYWNcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBkYXRlX3BwdFxuKi9cbm1vZHVsZS5leHBvcnRzLklycmlnID0gZnVuY3Rpb24oaXJyaWdGcmFjLCBjdXJfVHJhbnNwLCBjdXJfSW50Y3B0biwgZGF0ZV9wcHQpe1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBpcnJpZ0ZyYWMgKiAoY3VyX1RyYW5zcCAtICgxIC0gY3VyX0ludGNwdG4pICogZGF0ZV9wcHQpICk7XG59O1xuXG4vL1RPRE86IGdldCB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBmU1dcbkBwYXJhbSBBU1dcbkBwYXJhbSBtYXhBV1NcbkBwYXJhbSBzd2NvbnN0XG5AcGFyYW0gc3dwb3dlclxuKi9cbm1vZHVsZS5leHBvcnRzLmZTVyA9IGZ1bmN0aW9uKEFTVywgbWF4QVdTLCBzd2NvbnN0LCBzd3Bvd2VyKSB7XG4gIHZhciBmU1c7XG4gIGlmKCBzd2NvbnN0ID09PSAwIHx8IG1heEFXUyA9PT0gMCApIHtcbiAgICBmU1cgPSAwO1xuICB9IGVsc2Uge1xuICAgIHZhciBvbXIgPSAxIC0gKEFTVy8xMCkgLyBtYXhBV1M7IC8vIE9uZSBNaW51cyBSYXRpb1xuXG4gICAgaWYob21yIDwgMC4wMDEpIHtcbiAgICAgIGZTVyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZTVyA9ICgxLU1hdGgucG93KG9tcixzd3Bvd2VyKSkvKDErTWF0aC5wb3cob21yL3N3Y29uc3Qsc3dwb3dlcikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZlNXO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J051dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnQnXG5AbWV0aG9kIGZOdXRyXG5AcGFyYW0gZk4wXG5AcGFyYW0gRlJcbiovXG5tb2R1bGUuZXhwb3J0cy5mTnV0ciA9IGZ1bmN0aW9uKGZOMCwgRlIpe1xuICByZXR1cm4gZk4wICsgKDEgLSBmTjApICogRlI7XG59O1xuXG4vKipcblRPRE86IHdoeSAkMyBpbiBtYWtlZmlsZSAtIGFzayBhYm91dCBpdFxudW5pdHM9dW5pdGxlc3NcbmRlc2NyaXB0aW9uPSdQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdSdcbkBtZXRob2QgUGh5c01vZFxuQHBhcmFtIGN1cl9mVlBEXG5AcGFyYW0gY3VyX2ZTV1xuQHBhcmFtIGN1cl9mQWdlXG4qL1xubW9kdWxlLmV4cG9ydHMuUGh5c01vZCA9IGZ1bmN0aW9uKGN1cl9mVlBELCBjdXJfZlNXLCBjdXJfZkFnZSl7XG4gICByZXR1cm4gTWF0aC5taW4oY3VyX2ZWUEQgLCBjdXJfZlNXKSAqIGN1cl9mQWdlO1xufTtcblxuLyoqXG51bml0cz0nZ2MsbS9zJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgQ29uZHVjdGFuY2UnXG5AbWV0aG9kIENhbkNvbmRcbkBwYXJhbSBQaHlzTW9kXG5AcGFyYW0gTEFJXG5AcGFyYW0gY29uZFxuKi9cbm1vZHVsZS5leHBvcnRzLkNhbkNvbmQgPSBmdW5jdGlvbihQaHlzTW9kLCBMQUksIGNvbmQpe1xuICAgcmV0dXJuIE1hdGgubWF4KGNvbmQubW4gLCBjb25kLm14ICogUGh5c01vZCAqIE1hdGgubWluKDEgLCBMQUkgLyBjb25kLmxhaSkgKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uJ1xuQG1ldGhvZCBUcmFuc3BcbkBwYXJhbSBkYXRlX25yZWxcbkBwYXJhbSBkYXlzXG5AcGFyYW0gZGF0ZV9kYXlsaWdodFxuQHBhcmFtIGN1cl9WUERcbkBwYXJhbSBCTGNvbmRcbkBwYXJhbSBjdXJfQ2FuQ29uZFxuKi9cbm1vZHVsZS5leHBvcnRzLlRyYW5zcCA9IGZ1bmN0aW9uKGRhdGVfbnJlbCwgZGF5cywgZGF0ZV9kYXlsaWdodCwgY3VyX1ZQRCwgQkxjb25kLCBjdXJfQ2FuQ29uZCl7XG4gIHZhciBWUERjb252ID0gY29uc3RhbnQoJ1ZQRGNvbnYnKTtcbiAgdmFyIGxhbWJkYSA9IGNvbnN0YW50KCdsYW1iZGEnKTtcbiAgdmFyIHJob0FpciA9IGNvbnN0YW50KCdyaG9BaXInKTtcbiAgdmFyIGUyMCA9IGNvbnN0YW50KCdlMjAnKTtcbiAgdmFyIFFhID0gY29uc3RhbnQoJ1FhJyk7XG4gIHZhciBRYiA9IGNvbnN0YW50KCdRYicpO1xuXG4gIC8vIGRhdGVfZGF5bGlnaHQgPSBob3Vyc1xuICAvLyBucmVsIGlzIGluIE1KL21eMi9kYXkgY29udmVydCB0byBXaC9tXjIvZGF5XG4gIHZhciBuZXRSYWQgPSBRYSArIFFiICogKChkYXRlX25yZWwgKiAyNzcuNzc4KSAvIGRhdGVfZGF5bGlnaHQpO1xuICB2YXIgZGVmVGVybSA9IHJob0FpciAqIGxhbWJkYSAqIFZQRGNvbnYgKiBjdXJfVlBEICogQkxjb25kO1xuICB2YXIgZGl2ID0gMSArIGUyMCArIEJMY29uZCAvIGN1cl9DYW5Db25kO1xuXG4gIC8vIENvbnZlcnQgZGF5bGlnaHQgdG8gc2Vjcy5cbiAgcmV0dXJuIGRheXMgKiAoIChlMjAgKiBuZXRSYWQgKyBkZWZUZXJtICkgLyBkaXYgKSAqIGRhdGVfZGF5bGlnaHQgKiAzNjAwIC8gbGFtYmRhO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyB3aGljaCBpcyBhbHNvIGtnL20yL21vblxuZGVzY3JpcHRpb249J0VUcidcbkBtZXRob2QgRVRyXG5AcGFyYW0gUnMgKE1KL20yL2RheSlcbkBwYXJhbSBkYXlzXG5AcGFyYW0gVG0gKHRtaW4rdG1heCkvMlxuQHBhcmFtIGN1cl9WUEQgPSAoZXMtZWEpXG5AcGFyYW0gZWxldmF0aW9uIChtKVxuQHBhcmFtIHdpbmRfc3BlZWQgKG0vcylcbiovXG5cbm1vZHVsZS5leHBvcnRzLkVUciA9IGZ1bmN0aW9uKFJzLHRtaW4sdG1heCx0ZG1lYW4sZGF5cyxaLHUyKXtcbiAgdTIgPSB0eXBlb2YgdTIgIT09ICd1bmRlZmluZWQnID8gdTIgOiBjb25zdGFudCgnYXNjZV9ldHJfd2luZHNwZWVkJyk7XG4gIFogPSB0eXBlb2YgWiAhPT0gJ3VuZGVmaW5lZCcgPyBaIDogY29uc3RhbnQoJ2FzY2VfZXRyX2VsZXZhdGlvbicpO1xuXG4gIC8vIEZBTyA1NiBDcm9wIEV2YXBvcmF0aW9uXG4gIHZhciBwc3ljaHJvbWV0cmljX2NvbnN0YW50ID0gZnVuY3Rpb24oeikge1xuICAgIHZhciBQPTEwMS4zICogTWF0aC5wb3coKDI5MyAtICgwLjAwNjUpKnopLzI5Myw1LjI2KTtcbiAgICBnID0gMC42NjUqIE1hdGgucG93KDEwLC0zKSpQO1xuICAgIHJldHVybiBnO1xuICB9O1xuXG4gIHZhciBzbG9wZV9vZl9zYXR1cmF0aW9uX3ZhcG9yX3ByZXNzdXJlPSBmdW5jdGlvbihUbSkge1xuICAgIHJldHVybiA0MDk4LjE3ICogMC42MTA4ICogTWF0aC5leHAoVG0gKiAxNy4yNyAvIChUbSArIDIzNy4zKSkgLyBNYXRoLnBvdygoVG0gKzIzNy4zKSwyKVxuICB9O1xuXG4gIHZhciB2cCA9IGZ1bmN0aW9uKFQpIHtcbiAgICByZXR1cm4gMC42MTA4ICogTWF0aC5leHAoVCAqIDE3LjI3IC8gKFQgKyAyMzcuMykpO1xuICB9O1xuXG4gIHZhciBSbmwgPSBmdW5jdGlvbih0bWluLHRtYXgsdGRtZWFuLEspIHtcbiAgICByZXR1cm4gLSgxLjM1ICogSyAtIDAuMzUpICogKDAuMzQgLSAwLjE0ICogTWF0aC5zcXJ0KHZwKHRkbWVhbikpKSAqIE1hdGgucG93KDQuOTMsLTA5KSAqICgoTWF0aC5wb3codG1pbiArMjczLjE2LDQpICsgTWF0aC5wb3codG1heCArIDI3My4xNiw0KSkgLyAyKTtcbiAgfVxuICAvLzAuNDA4ICogZGVsdGEgKiAoIFJuIC0gRykgKyBwc3ljaCAqIChDbiAvIChUICsgMjczKSkgKiB1MiAqIChlcyAtZWEgKSAvIChkZWx0YSArIHBzeWNoICogKDEgKyBDZCAqIHUyICkpXG4gIC8vIEVUcjp7Q246MTYwMCxDZDowLjM4fSxFVG86e0NuOjkwMCxDZD0wLjM0fVxuICAvL1JuID0gTUogLyBtMiBkYXkgPT4gZGF0ZV9ucmVsIChNSi9tXjIvZGF5KVxuICAvL0c9MFxuICAvL3UyID0gbS9zXG4gIC8vIFQgPSBtZWFuIFQgKEMpXG4gIC8vIChlcy1lYSkgPSBzYXR1cmF0aW9uIFZhcG9yIFByZXNzdXJlIChLcGEpID0+IGN1cl9WUERcbiAgdmFyIFRtPSh0bWluK3RtYXgpLzI7XG4gIHZhciBDbj0xNjAwO1xuICB2YXIgQ2Q9MC4zODtcbiAgdmFyIFZQRCA9ICgodnAodG1pbikrdnAodG1heCkpLzIpLXZwKHRkbWVhbik7XG4gIHZhciBnID0gcHN5Y2hyb21ldHJpY19jb25zdGFudChaKTtcbiAgdmFyIEQgPSBzbG9wZV9vZl9zYXR1cmF0aW9uX3ZhcG9yX3ByZXNzdXJlKFRtKTtcbiAgdmFyIFJubCA9IFJubCh0bWluLHRtYXgsdGRtZWFuLDEuMCk7XG4gIFJubCA9LTkwIC8gMjc3LjA7XG4gIHZhciByYWQgPSAwLjQwOCAqIEQgKiAoUnMgKiAoMSAtIDAuMjMpICsgUm5sKTtcbiAgdmFyIGRlZiA9IGcgKiAoQ24vKFRtKzI3MykpICogdTIgKiBWUEQ7XG4gIHZhciBkaXYgPSBEICsgZyAqICgxICsgQ2QqdTIpO1xuICB2YXIgRVRyID0gKHJhZCtkZWYpL2RpdjtcbiAvLyBjb25zb2xlLmxvZyh7VG06VG0sRDpELFJubDpSbmwsUnM6UnMsRVRyOkVUcn0pXG4gIC8vIENvbnZlcnQgZGF5bGlnaHQgdG8gc2Vjcy5cbiAgcmV0dXJuIGRheXMgKiBFVHI7XG59O1xuXG4vL1RPRE86IGRlc2NyaXB0aW9uXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbkBtZXRob2QgTlBQXG5AcGFyYW0gcHJldl9TdGFuZEFnZVxuQHBhcmFtIGZ1bGxDYW5BZ2VcbkBwYXJhbSB4UFBcbkBwYXJhbSBrXG5AcGFyYW0gcHJldl9MQUlcbkBwYXJhbSBmVlBEXG5AcGFyYW0gZlNXXG5AcGFyYW0gZkFnZVxuQHBhcmFtIGFscGhhXG5AcGFyYW0gZk51dHJcbkBwYXJhbSBmVFxuQHBhcmFtIGZGcm9zdFxuKi9cbm1vZHVsZS5leHBvcnRzLk5QUCA9IGZ1bmN0aW9uKHByZXZfU3RhbmRBZ2UsIGZ1bGxDYW5BZ2UsIHhQUCwgaywgcHJldl9MQUksIGZWUEQsIGZTVywgZkFnZSwgYWxwaGEsIGZOdXRyLCBmVCwgZkZyb3N0KXtcbiAgdmFyIENhbkNvdmVyID0gMTtcbiAgaWYoIHByZXZfU3RhbmRBZ2UgPCBmdWxsQ2FuQWdlICl7XG4gICAgQ2FuQ292ZXIgPSBwcmV2X1N0YW5kQWdlIC8gZnVsbENhbkFnZTtcbiAgfVxuXG4gIHJldHVybiB4UFAgKiAoMSAtIChNYXRoLmV4cCgtayAqIHByZXZfTEFJKSApICkgKiBDYW5Db3ZlciAqIE1hdGgubWluKGZWUEQgLCBmU1cpICogZkFnZSAqIGFscGhhICogZk51dHIgKiBmVCAqIGZGcm9zdDtcbn07XG5cbi8vVE9ETzogdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgcFJcbkBwYXJhbSBjdXJfUGh5c01vZFxuQHBhcmFtIGN1cl9wUlxuQHBhcmFtIEZSXG5AcGFyYW0gcFJcbiovXG5tb2R1bGUuZXhwb3J0cy5wUiA9IGZ1bmN0aW9uKGN1cl9QaHlzTW9kLCBjdXJfcFIsRlIscFIpe1xuICB2YXIgcCA9KHBSLm14ICogcFIubW4pIC9cbiAgICAgICAgIChwUi5tbiArIChwUi5teCAtIHBSLm1uKSAqIGN1cl9QaHlzTW9kICogKHBSLm0wICsgKDEgLSBwUi5tMCkgKiBGUikgKTtcblxuICAvLyBUaGlzIHdhcyBhZGRlZCBieSBxdWlubiB0byBsaW1pdCByb290IGdyb3d0aC5cbiAgcmV0dXJuIHAgKiBNYXRoLnBvdyhwL2N1cl9wUiwyKTtcbn07XG5cblxuLy9UT0RPOiBtb2xzIG9yIG1vbHMgcGVyIG1eMj9cbi8qKlxudW5pdHM9bW9sc1xuZGVzY3JpcHRpb249J01vbnRobHkgUEFSIGluIG1vbHMgLyBtXjIgbW9udGgnXG5tb2xQQVJfTUogW21vbC9NSl0gaXMgYSBjb25zdGFudCBDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcbkBtZXRob2QgUEFSXG5AcGFyYW0gZGF0ZV9yYWRcbkBwYXJhbSBtb2xQQVJfTUpcbiovXG5tb2R1bGUuZXhwb3J0cy5QQVIgPSBmdW5jdGlvbihkYXRlX3JhZCwgZGF5cywgbW9sUEFSX01KKSB7XG4gIGlmKCBtb2xQQVJfTUogPT09IG51bGwgfHwgbW9sUEFSX01KID09PSB1bmRlZmluZWQgKSB7XG4gICAgbW9sUEFSX01KID0gY29uc3RhbnQoJ21vbFBBUl9NSicpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVfcmFkICogbW9sUEFSX01KICogZGF5cztcbn07XG5cbi8qKlxudW5pdHM9J21ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGEnLFxuZGVzY3JpcHRpb249J21heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBbdERNIC8gaGEgbW9udGhdLFxuTk9URTogMTAwMDAvMTBeNiBbaGEvbTJdW3REbS9nRE1dXG5nR01fbW9sIFtnL21vbF0gaXMgdGhlIG1vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlclxuQG1ldGhvZCB4UFBcbkBwYXJhbSB5XG5AcGFyYW0gY3VyX1BBUlxuQHBhcmFtIGdETV9tb2xcbiovXG5tb2R1bGUuZXhwb3J0cy54UFAgPSBmdW5jdGlvbih5LCBjdXJfUEFSLCBnRE1fbW9sKXtcbiAgICBpZiggZ0RNX21vbCA9PT0gbnVsbCB8fCBnRE1fbW9sID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBnRE1fbW9sID0gY29uc3RhbnQoJ2dETV9tb2wnKTtcbiAgICB9XG5cbiAgICByZXR1cm4geSAqIGN1cl9QQVIgKiBnRE1fbW9sIC8gMTAwO1xufTtcblxuLyoqKiBGVU5DVElPTlMgRk9SIENPUFBJQ0lORyAqL1xuLyoqXG5jb3BwaWNlIHJlbGF0ZWQgZnVuY3Rpb25zXG5AbWV0aG9kIGNvcHBpY2VcbiovXG5tb2R1bGUuZXhwb3J0cy5jb3BwaWNlID0ge1xuICAvLyBDb3BwaWNlIEZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gRGlhbWV0ZXIgb24gU3R1bXAsIE5PVCBEQkguXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiB0aGUgc3RlbSB3ZWlnaHQgaW4gS0dcbiAgcGZzIDogZnVuY3Rpb24oc3RlbSwgcCkge1xuICAgIHZhciBhdkRPQiA9IE1hdGgucG93KCAoIHN0ZW0gLyBwLnN0ZW1DbnQgLyBwLnN0ZW1DKSAsICgxIC8gcC5zdGVtUCkgKTtcbiAgICB2YXIgcHBmcz0gcC5wZnNDICogTWF0aC5wb3coYXZET0IgLCBwLnBmc1ApO1xuXG4gICAgcmV0dXJuIE1hdGgubWluKHAucGZzTXgscHBmcyk7XG4gIH0sXG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHN0ZW0gd2l0aCBpbiBHLiAgVXNlcyB2b2x1bWUgSW5kZXggYXMgZ3VpZGVcbiAgcGZzX3ZpYV9WSSA6IGZ1bmN0aW9uIChzdGVtRywgd3NWSSwgbGFWSSwgU0xBKSB7XG4gICAgaWYgKHN0ZW1HIDwgMTApIHtcbiAgICAgIHN0ZW1HID0gMTA7XG4gICAgfVxuICAgIHZhciBWSSA9IE1hdGgucG93KCAoc3RlbUcgLyB3c1ZJLnN0ZW1zX3Blcl9zdHVtcCAvIHdzVkkuY29uc3RhbnQpLCgxIC8gd3NWSS5wb3dlcikgKTtcblxuICAgIC8vIEFkZCB1cCBmb3IgYWxsIHN0ZW1zXG4gICAgdmFyIGxhID0gbGFWSS5jb25zdGFudCAqIE1hdGgucG93KFZJLGxhVkkucG93ZXIpICogd3NWSS5zdGVtc19wZXJfc3R1bXA7XG4gICAgdmFyIHdmID0gMTAwMCAqIChsYSAvIFNMQSk7ICAvLyBGb2lsYWdlIFdlaWdodCBpbiBnO1xuICAgIHZhciBwZnMgPSB3Zi9zdGVtRztcbiAgICByZXR1cm4gcGZzO1xuICB9LFxuXG4gIFJvb3RQIDogZnVuY3Rpb24oY3VyX25wcCwgY3VyX25wcFRhcmdldCwgV1IsVyxwUngsZnJhYykge1xuICAgIHZhciBucHBSZXMgPSBjdXJfbnBwVGFyZ2V0IC0gY3VyX25wcDtcbiAgICB2YXIgcm9vdFBQO1xuICAgIGlmKCBucHBSZXMgPiAwICYmIFdSL1cgPiBwUnggKSB7XG4gICAgICAgIHJvb3RQUCA9IE1hdGgubWluKG5wcFJlcywgV1IqKFdSL1cgLSBwUngpKmZyYWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb290UFAgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiByb290UFA7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICAgIC8vIFlvdSBuZWVkIHRvIHNldCB5b3VyIElPIGhlcmUgYW5kIG1ha2Ugc3VyZSBhbGwgcGFyYW1ldGVycyBmb3IgbW9kZWwgYXJlIGNvcnJlY3RseSBzZXRcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE8gOiBpbXBsZW1lbnRcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuID0gcmVxdWlyZSgnLi9mbicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL3ZhbGlkYXRlJyk7XG5cbmZ1bmN0aW9uIHJ1bihsZW5ndGhPZkdyb3d0aCkge1xuXG4gICAgdmFyIHllYXJUb0NvcHBpY2U7IC8veWVhciBvZiB0aGUgZmlyc3Qgb3Igc3Vic2VxdWVudCBoYXJ2ZXN0c1xuICAgIHZhciBjb3BwaWNlSW50ZXJ2YWw7IC8vdGhlICMgb2YgbW9udGhzIGluIGEgc2luZ2xlIGNvcHBpY2UgY3ljbGVcbiAgICB2YXIgbW9udGhUb0NvcHBpY2U7IC8vYXQgd2hpY2ggbW9udGggdGhlIGhhcnZlc3QgaXMgdG8gYmUgcGVyZm9ybWVkIDo6IGN1cnJlbnRseSB0aGUgdHJlZSB3aWxsIGJlIGN1dCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoYXQgbW9udGhcbiAgICB2YXIgY29wcGljZURhdGVzO1xuXG4gICAgLy8gaGVscGVyLCBub3QgcmVxdWlyZWQuICB5b3UgY2FuIHJlZ2lzdGVyIGNhbGxiYWNrIHRvIHNldCBwYXJhbWV0ZXJzIHdoZW5ldmVyIHJ1biBpcyBjYWxsZWRcbiAgICB0aGlzLmlvLnJlYWQodGhpcyk7XG5cbiAgICAvLyBtYWtlIHN1cmUgbW9kZWwgaW5wdXRzIGFyZSB2YWxpZCBiZWZvcmUgd2UgcHJvY2VlZCBhbnkgZnVydGhlclxuICAgIHZhbGlkYXRlKHRoaXMpO1xuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAvL3ZhciBwbGFudGVkTW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgLy92YXIgY3VycmVudE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuXG4gICAgLy9UT0RPOiB0ZXN0IG5vIGRhdGVjb3BwaWNlIGFzIGlucHV0XG4gICAgaWYgKCB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQgIT09IHVuZGVmaW5lZCApe1xuICAgICAgeWVhclRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRGdWxsWWVhcigpO1xuICAgICAgbW9udGhUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0TW9udGgoKTtcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA9IHRoaXMubWFuYWdlLnllYXJzUGVyQ29wcGljZTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICBjb3BwaWNlRGF0ZXMgPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5zcGxpdCgnLScpO1xuXG4gICAgICAgIHZhciBkID0gMTU7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3BwaWNlRGF0ZXMucHVzaChuZXcgRGF0ZShwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKS0xLCBkKSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBpbml0IG1hbmFnZSBuc1xuICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgdmFyIHNldHVwID0ge1xuICAgICAgbGVuZ3RoT2ZHcm93dGggOiBsZW5ndGhPZkdyb3d0aCxcbiAgICAgIHllYXJUb0NvcHBpY2UgOiB5ZWFyVG9Db3BwaWNlLFxuICAgICAgbW9udGhUb0NvcHBpY2UgOiBtb250aFRvQ29wcGljZSxcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA6IGNvcHBpY2VJbnRlcnZhbCxcbiAgICAgIGNvcHBpY2VEYXRlcyA6IGNvcHBpY2VEYXRlc1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5ydW5TZXR1cChzZXR1cCk7XG59XG5cbmZ1bmN0aW9uIHJ1blNldHVwKHNldHVwKXtcbiAgICB2YXIgaSwga2V5LCBjdXJyZW50V2VhdGhlciwgc3RlcCwgdDtcblxuICAgIHZhciBkYXlzX2luX2ludGVydmFsID0gKHRoaXMuc2V0dXAgJiYgdGhpcy5zZXR1cC5kYXlzX2luX2ludGVydmFsKSA/IHRoaXMuc2V0dXAuZGF5c19pbl9pbnRlcnZhbCA6IDE7XG5cbiAgICBpZiggdGhpcy5kZWJ1ZyApIHtcbiAgICAgIHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdkYXlzX2luX2ludGVydmFsOiAnKyBkYXlzX2luX2ludGVydmFsKTtcbiAgICB9XG5cbiAgICB2YXIgbSA9ICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09PSAxICkge1xuICAgICAgbSA9ICcwJyttO1xuICAgIH1cblxuICAgIHZhciBkID0gKHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpKSsnJztcbiAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICBkID0gJzAnK2Q7XG4gICAgfVxuXG4gICAgLy92YXIgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcbiAgICB2YXIgZmlyc3RTdGVwUmVzdWx0cyA9IGluaXQodGhpcy5wbGFudGF0aW9uLCB0aGlzLnNvaWwpO1xuXG4gICAgdmFyIGtleXNJbk9yZGVyID0gW107XG4gICAgdmFyIGhlYWRlciA9IFsnZGF0ZSddO1xuICAgIGZvcigga2V5IGluIGRhdGFNb2RlbC5wbGFudGF0aW9uX3N0YXRlLnZhbHVlICkge1xuICAgICAga2V5c0luT3JkZXIucHVzaChrZXkpO1xuICAgICAgaGVhZGVyLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBmaXJzdFN0ZXBSZXN1bHRzLkRhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20rJy0nK2Q7XG5cbiAgICB2YXIgcm93cyA9IFtdOyAvL3RoZXNlIHdpbGwgYmVjb21lIHJvd3NcbiAgICByb3dzLnB1c2goaGVhZGVyKTtcblxuICAgIHZhciBmaXJzdFJvdyA9IFtmaXJzdFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgIGZvciggaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgICBrZXkgPSBrZXlzSW5PcmRlcltpXTtcbiAgICAgIGZpcnN0Um93LnB1c2goZmlyc3RTdGVwUmVzdWx0c1trZXldKTtcbiAgICB9XG4gICAgcm93cy5wdXNoKGZpcnN0Um93KTtcblxuICAgIHZhciBjdXJyZW50U3RlcFJlc3VsdHMgPSBmaXJzdFN0ZXBSZXN1bHRzO1xuICAgIHZhciBuZXh0U3RlcFJlc3VsdHM7XG5cbiAgICBmb3Ioc3RlcCA9IDE7IHN0ZXAgPCBzZXR1cC5sZW5ndGhPZkdyb3d0aDsgc3RlcCsrKSB7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQpO1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXREYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkLmdldERhdGUoKSArIHN0ZXAgKiBkYXlzX2luX2ludGVydmFsKTsgLy8gYWRkIGEgZGF5IHRvIGN1cnJlbnQgZGF0ZVxuLy8gICAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQuZ2V0RGF0ZSgpICsgc3RlcCpzZXR1cC5kYXlzX2luX2ludGVydmFsKTsgLy8gYWRkIGEgZGF5IHRvIGN1cnJlbnQgZGF0ZVxuXG4gICAgICBpZiggc2hvdWxkQ29wcGljZSh0aGlzLCBzZXR1cCwgZGF5c19pbl9pbnRlcnZhbCkgKSB7XG4gICAgICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUaW1lIHRvIENvcHBpY2UhJyk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZS5jb3BwaWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbSA9ICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIG0gPSAnMCcrbTtcbiAgICAgIH1cblxuICAgICAgZCA9IHRoaXMuY3VycmVudERhdGUuZ2V0RGF0ZSgpKycnO1xuICAgICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgICBkID0gJzAnK2Q7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG5cbiAgICAgIC8vVE9ETzogc3dpdGNoIHVwIHRyZWVzIGhlcmUgd2hlbiBhZnRlciB0aGUgZmlyc3QgaGFydmVzdFxuICAgICAgbmV4dFN0ZXBSZXN1bHRzID0gc2luZ2xlU3RlcCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCwgY3VycmVudFdlYXRoZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlLCBjdXJyZW50U3RlcFJlc3VsdHMsIGRheXNfaW5faW50ZXJ2YWwpO1xuICAgICAgbmV4dFN0ZXBSZXN1bHRzLkRhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20rJy0nK2Q7XG5cbiAgICAgIHZhciB0aGlzUm93ID0gW25leHRTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICAgIGZvciggaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzSW5PcmRlcltpXTtcbiAgICAgICAgdGhpc1Jvdy5wdXNoKG5leHRTdGVwUmVzdWx0c1trZXldKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFN0ZXBSZXN1bHRzID0gbmV4dFN0ZXBSZXN1bHRzO1xuICAgICAgcm93cy5wdXNoKHRoaXNSb3cpO1xuICAgIH1cblxuICAgIHRoaXMuaW8uZHVtcChyb3dzKTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2coc3RlcCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgIGNvbnNvbGUubG9nKChuZXcgRGF0ZSgpLmdldFRpbWUoKS10KSsnbXMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbn1cblxuZnVuY3Rpb24gc2luZ2xlU3RlcChwbGFudGF0aW9uLCBzb2lsLCB3ZWF0aGVyLCBtYW5hZ2UsIHAsIGRheXNfaW5faW50ZXJ2YWwpIHsgLy9wID0gcHJldmlvdXMgc3RhdGVcbiAgdmFyIGMgPSB7fTsgLy9jdXJyZW50IHN0YXRlXG5cbiAgaWYoIG1hbmFnZS5jb3BwaWNlID09PSB0cnVlICkgeyAvL2NoYW5nZSB0aGlzIGd1eSBmb3IgdGhlIG1vbnRoIHdoZW4gY29wcGljZVxuICAgIC8vIEFkZCBpbiBhIHN0dW1wIG1hcmdpbi4uLi5cbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3QgKyBwLldTO1xuICAgIGMuY29wcGljZUNvdW50ID0gcC5jb3BwaWNlQ291bnQgKyAxO1xuICAgIGMuY29wcGljZUFnZSA9IDA7XG4gICAgcC5MQUkgPSAwO1xuICAgIHAuV1MgPSAwO1xuICAgIHAuV0YgPSAwO1xuICAgIHAuVyA9IHAuV1I7XG4gIH0gZWxzZSB7XG4gICAgYy5mZWVkc3RvY2tIYXJ2ZXN0ID0gcC5mZWVkc3RvY2tIYXJ2ZXN0O1xuICAgIGMuY29wcGljZUNvdW50ID0gcC5jb3BwaWNlQ291bnQ7XG4gICAgYy5jb3BwaWNlQWdlID0gcC5jb3BwaWNlQWdlICsgZGF5c19pbl9pbnRlcnZhbC8zNjUuMDtcbiAgfVxuXG4gIHZhciB0cmVlOyAvL3RyZWVcbiAgaWYoIGMuY29wcGljZUNvdW50ID09PSAwICkgeyAvL1RPRE86IGNoZWNrIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCBtdWx0aSBzdHVtcCB0cmVlXG4gICAgICB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7XG4gIH0gZWxzZSB7XG4gICAgICB0cmVlID0gcGxhbnRhdGlvbi5jb3BwaWNlZFRyZWU7XG4gIH1cblxuICBjLlN0YW5kQWdlID0gcC5TdGFuZEFnZSArIGRheXNfaW5faW50ZXJ2YWwvMzY1LjA7XG4gIHZhciBzbGEgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5TTEEpO1xuICBjLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcblxuICAvLyBKTSAtIFBlciBzZWN0aW9uIDIuMSAgTGFuZHNiZXJnL1dhcmluZ1xuICBjLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4pO1xuICAvL2MuVlBEID0gZm4uVlBEKHdlYXRoZXIudG1pbiwgd2VhdGhlci50bWF4LCB3ZWF0aGVyLnRkbWVhbiwgZGF5c19pbl9pbnRlcnZhbCk7XG5cblxuICBjLmZWUEQgPSBmbi5mVlBEKHRyZWUua0csIGMuVlBEKTtcblxuICBjLmZTVyA9IGZuLmZTVyhwLkFTVywgc29pbC5tYXhBV1MsIHNvaWwuc3djb25zdCwgc29pbC5zd3Bvd2VyKTtcbiAgYy5mQWdlID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuZkFnZSk7XG5cbiAgLy8gZkZyb3N0IGlzIGEgY3VtdWxhdGl2ZSBOb3JtYWwgZGlzdHJpYnV0aW9uLCB0aGF0IGFwcHJvaXhtYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgKG9yIHBhcnRzIG9mIGRheXMpIHRoYXRcbiAgLy8gd2lsbCBiZSBiZWxvdyAwLCBnaXZlbiBhIG1pbmltdW0gdGVtcGVyYXR1cmVcbiAgYy5mRnJvc3QgPSBmbi5mRnJvc3Qod2VhdGhlci50bWluKTtcblxuICBjLlBBUiA9IGZuLlBBUih3ZWF0aGVyLnJhZCwgZGF5c19pbl9pbnRlcnZhbCk7IC8vICBQQVIgaW4gbW9sc1xuXG4gIGMuZlQgPSBmbi5mVCgod2VhdGhlci50bWluICsgd2VhdGhlci50bWF4KS8yLCB0cmVlLmZUKTtcblxuICBjLlBoeXNNb2QgPSBmbi5QaHlzTW9kKGMuZlZQRCwgYy5mU1csIGMuZkFnZSk7XG4gIGMuZk51dHIgPSBmbi5mTnV0cih0cmVlLmZOMCwgbWFuYWdlLmZlcnRpbGl0eSk7XG4gIGMueFBQID0gZm4ueFBQKHRyZWUueSwgYy5QQVIpOyAvLyBtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb24gcGVyIG1vbnRoXG4gIGMuTlBQID0gZm4uTlBQKHAuY29wcGljZUFnZSwgdHJlZS5mdWxsQ2FuQWdlLCBjLnhQUCwgdHJlZS5rLCBwLkxBSSwgYy5mVlBELCBjLmZTVywgYy5mQWdlLCB0cmVlLmFscGhhLCBjLmZOdXRyLCBjLmZULCBjLmZGcm9zdCk7XG5cbiAgdmFyIE5QUF90YXJnZXQgPSBmbi5OUFAodHJlZS5mdWxsQ2FuQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHRyZWUucm9vdFAuTEFJVGFyZ2V0LCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcbi8vIEpNXG4gIGMuUm9vdFAgPSBmbi5jb3BwaWNlLlJvb3RQKGMuTlBQLCBOUFBfdGFyZ2V0LCBwLldSLCBwLlcsIHRyZWUucFIubXgsIHRyZWUucm9vdFAuZnJhYyAqIChkYXlzX2luX2ludGVydmFsIC8gMzAuNCkpO1xuXG4gIGlmICh0cmVlLmxhVkkgJiYgdHJlZS5sYVZJLmNvbnN0YW50ICkgeyAvLyBUZXN0IGZvciB0aGF0IGZ1bmN0aW9uXG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmc192aWFfVkkocC5XUyoxMDAwMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLndzVkksdHJlZS5sYVZJLHNsYSk7XG4gIH0gZWxzZSB7XG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmcyhwLldTKjEwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUucGZzKTtcbiAgfVxuXG4gIGMuZFcgPSBjLk5QUCArIHRyZWUucm9vdFAuZWZmaWNpZW5jeSAqIGMuUm9vdFA7XG5cbiAgYy5JbnRjcHRuID0gZm4uSW50Y3B0bihjLkxBSSwgdHJlZS5JbnRjcHRuKTtcbiAgYy5DYW5Db25kID0gZm4uQ2FuQ29uZChjLlBoeXNNb2QsIGMuTEFJLCB0cmVlLkNvbmR1Y3RhbmNlKTtcblxuICBjLnBSID0gZm4ucFIoYy5QaHlzTW9kLCBwLldSL3AuVywgbWFuYWdlLmZlcnRpbGl0eSwgdHJlZS5wUik7XG5cbiAgLy8gSk0gLSB0cmVlIGxpdHRlcmZhbGwgaXMgYSBtb250aGx5IHBhcmFtZXRlci5cbiAgYy5saXR0ZXJmYWxsID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUubGl0dGVyZmFsbCkgKiAoZGF5c19pbl9pbnRlcnZhbCAvIDMwLjQpO1xuXG4gIGMuVHJhbnNwID0gZm4uVHJhbnNwKHdlYXRoZXIucmFkLCBkYXlzX2luX2ludGVydmFsLCB3ZWF0aGVyLmRheWxpZ2h0LCBjLlZQRCwgdHJlZS5CTGNvbmQsIGMuQ2FuQ29uZCk7XG4gIGMuRVRyID0gZm4uRVRyKHdlYXRoZXIucmFkLCB3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4sIGRheXNfaW5faW50ZXJ2YWwpO1xuICBjLktjID0gYy5UcmFuc3AvYy5FVHI7XG5cblxuICAvLyBDYWxjdWxhdGVkIGZyb20gcGZzXG4gIGMucFMgPSAoMSAtIGMucFIpIC8gKDEgKyBjLnBmcyApO1xuICBjLnBGID0gKDEgLSBjLnBSKSAvICgxICsgMS9jLnBmcyApO1xuXG4gIGMuSXJyaWcgPSBmbi5JcnJpZyhtYW5hZ2UuaXJyaWdGcmFjLCBjLlRyYW5zcCwgYy5JbnRjcHRuLCB3ZWF0aGVyLnBwdCk7XG4gIGMuQ3VtSXJyaWcgPSBwLkN1bUlycmlnICsgYy5JcnJpZztcblxuICBjLkFTVyA9IGZuLkFTVyhzb2lsLm1heEFXUywgcC5BU1csIHdlYXRoZXIucHB0LCBjLlRyYW5zcCwgYy5JbnRjcHRuLCBjLklycmlnKTsgLy9mb3Igc29tZSByZWFzb24gc3BlbGxlZCBtYXhBV1NcblxuICBjLldGID0gcC5XRiArIGMuZFcgKiBjLnBGIC0gYy5saXR0ZXJmYWxsICogcC5XRjtcbiAgLy8gSW5jbHVkZSBjb250cmlidXRpb24gb2YgUm9vdFAgLy8gRXJyb3IgaW4gb2xkIGNvZGUgIVxuICBjLldSID0gcC5XUiArIGMuZFcgKiBjLnBSIC0gKHRyZWUucFIudHVybm92ZXIgKiAoZGF5c19pbl9pbnRlcnZhbCAvIDMwLjQpKSAqIHAuV1IgLSBjLlJvb3RQO1xuICBjLldTID0gcC5XUyArIGMuZFcgKiBjLnBTO1xuICBjLlcgPSBjLldGK2MuV1IrYy5XUztcblxuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gaW5pdChwbGFudGF0aW9uLCBzb2lsKSB7XG4gIHZhciBwID0ge307XG4gIHZhciB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7IC8vVE9ETzogZGVjaWRlIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCB0cmVlP1xuXG4gIHAuZmVlZHN0b2NrSGFydmVzdD0wO1xuICBwLmNvcHBpY2VDb3VudD0wO1xuICBwLmNvcHBpY2VBZ2UgPSAwO1xuXG4gIHAuQ3VtSXJyaWcgPSAwO1xuICBwLmRXID0gMDtcbiAgcC5XID0gcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHkgKiBwbGFudGF0aW9uLlNlZWRsaW5nTWFzcztcbiAgcC5XRiA9IHBsYW50YXRpb24ucEYgKiBwLlc7XG4gIHAuV1MgPSBwbGFudGF0aW9uLnBTICogcC5XO1xuICBwLldSID0gcGxhbnRhdGlvbi5wUiAqIHAuVztcbiAgcC5BU1cgPSAwLjggKiAxMCAqIHNvaWwubWF4QVdTOyAvLyBUaGUgMTAgaXMgYmVjYXVzZSBtYXhBV1MgaXMgaW4gY20gYW5kIEFTVyBpbiBtbSAoPykgV2h5ICg/KVxuICBwLlN0YW5kQWdlID0gMDtcblxuICB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7XG5cbiAgLy8gc2xhID0gU3BlY2lmaWMgTGVhZiBBcmVhXG4gIHZhciBzbGEgPSBmbi50ZHAocC5TdGFuZEFnZSx0cmVlLlNMQSk7XG5cbiAgcC5MQUkgPSBwLldGICogMC4xICogc2xhOyAvLyBMYW5kc2J1cmcgZXEgOS41XG5cbiAgLy8gVGhlc2UgYXJlbid0IHVzZWQgc28gY2FuIGJlIHNldCB0byBhbnl0aGluZzsgIFRoZXkgYXJlIHNldCB0byBtYXRjaCB0aGUgcG9zdGdyZXMgdHlwZVxuICBwLlZQRCAgICAgICAgPSAwO1xuICBwLmZWUEQgICAgICAgPSAwO1xuICBwLmZUICAgICAgICAgPSAwO1xuICBwLmZGcm9zdCAgICAgPSAwO1xuICBwLmZOdXRyICAgICAgPSAwO1xuICBwLmZTVyAgICAgICAgPSAwO1xuICBwLmZBZ2UgICAgICAgPSAwO1xuICBwLlBBUiAgICAgICAgPSAwO1xuICBwLnhQUCAgICAgICAgPSAwO1xuICBwLkludGNwdG4gICAgPSAwO1xuICBwLklycmlnICAgICAgPSAwO1xuICBwLkNhbkNvbmQgICAgPSAwO1xuICBwLlRyYW5zcCAgICAgPSAwO1xuICBwLlBoeXNNb2QgICAgPSAwO1xuICBwLnBmcyAgICAgICAgPSAwO1xuICBwLnBSICAgICAgICAgPSAwO1xuICBwLnBTICAgICAgICAgPSAwO1xuICBwLnBGICAgICAgICAgPSAwO1xuICBwLmxpdHRlcmZhbGwgPSAwO1xuICBwLk5QUCAgICAgICAgPSAwO1xuICBwLlJvb3RQICAgICAgPSAwO1xuXG4gIHJldHVybiBwO1xufVxuXG4vLyBUaGlzIGFjdHVhbGx5IG5lZWQgdG8gd29yayBiZXR0ZXIuICBJZiB0aGUgd2VhdGhlciBkb2Vzbid0IG1hdGNoXG4vLyB0aGUgc3RlcHMsIHdlIG5lZWQgdG8gZmluZCB0aGUgY2xvc2VzdCB2YWx1ZSB0byB3aGF0IHdlIGFyZSBsb29raW5nIGZvclxuZnVuY3Rpb24gZ2V0V2VhdGhlcihtb2RlbCwgc2V0dXAsIG1vbnRoLCBkYXkpIHtcblxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBtb2RlbGxlZCBkYWlseVxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBhY3R1YWxcbiAgICBpZiggbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXTtcbiAgICB9XG5cbiAgLy8gbW9kZWxsZWQgTW9udGhseVxuICBpZiggbW9kZWwud2VhdGhlclttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aF07XG4gIH1cblxuICB0aHJvdyAnUnVudGltZSBFcnJvcjogbm8gd2VhdGhlciBmb3VuZCBmb3IgbW9udGg6ICcrbW9udGg7XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvcHBpY2UobW9kZWwsIHNldHVwLCBkYXlzX2luX2ludGVydmFsKSB7XG4gIHZhciBuZXh0O1xuICB2YXIgY29wcGljZV9vbjtcbiAgLy8gZG8gd2UgaGF2ZSBzcGVjaWZpYyBjb3BwaWNlIGRhdGVzIHNldD9cbiAgaWYoIHNldHVwLmNvcHBpY2VEYXRlcyApIHtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2V0dXAuY29wcGljZURhdGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIGQgPSBzZXR1cC5jb3BwaWNlRGF0ZXNbaV07XG5cbiAgICAgIGlmIChtb2RlbC5jdXJyZW50RGF0ZSA8IGQpIHtcbiAgICAgICAgbmV4dCA9IG1vZGVsLmN1cnJlbnREYXRlO1xuICAgICAgICBuZXh0LnNldERhdGUobmV4dC5nZXREYXRlICsgZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICAgIGlmICggZCA8IG5leHQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb3BwaWNlX29uID0gbmV3IERhdGUoKTtcbiAgICBjb3BwaWNlX29uLnNldFllYXIoc2V0dXAueWVhclRvQ29wcGljZSk7XG4gICAgY29wcGljZV9vbi5zZXRNb250aChzZXR1cC5tb250aFRvQ29wcGljZSk7XG4gICAgY29wcGljZV9vbi5zZXREYXRlKDE1KTtcblxuICAgIGlmKCBtb2RlbC5jdXJyZW50RGF0ZS5nZXRUaW1lKCkgPCBjb3BwaWNlX29uLmdldFRpbWUoKSApIHtcbiAgICAgIG5leHQgPSBuZXcgRGF0ZShtb2RlbC5jdXJyZW50RGF0ZSk7XG4gICAgICBuZXh0LnNldERhdGUobW9kZWwuY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgZGF5c19pbl9pbnRlcnZhbCk7XG5cbiAgICAgIGlmICggY29wcGljZV9vbi5nZXRUaW1lKCkgPCBuZXh0LmdldFRpbWUoKSkge1xuICAgICAgICBzZXR1cC55ZWFyVG9Db3BwaWNlID0gc2V0dXAueWVhclRvQ29wcGljZSArIHNldHVwLmNvcHBpY2VJbnRlcnZhbDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb24obmFtZSkge1xuICBpZiggZm5bbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuW25hbWVdO1xuICB9IGVsc2UgaWYoIGZuLmNvcHBpY2VbbmFtZV0gKSB7XG4gICAgcmV0dXJuIGZuLmNvcHBpY2VbbmFtZV07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW8pIHtcbiAgcmV0dXJuIHtcbiAgICBpbyA6IGlvLFxuICAgIHJ1biA6IHJ1bixcbiAgICBzaW5nbGVTdGVwIDogc2luZ2xlU3RlcCxcbiAgICBydW5TZXR1cCA6IHJ1blNldHVwLFxuICAgIGluaXQgOiBpbml0LFxuICAgIGdldEZ1bmN0aW9uIDogZ2V0RnVuY3Rpb24sXG4gICAgc2V0SU8gOiBmdW5jdGlvbihpbykge1xuICAgICAgdGhpcy5pbyA9IGlvO1xuICAgIH0sXG4gICAgZ2V0RGF0YU1vZGVsIDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGF0YU1vZGVsO1xuICAgIH1cbiAgfTtcbn07XG4iLCJmdW5jdGlvbiBlbnYoKSB7XG4gIGlmKCB0eXBlb2YgcGx2OCAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gXCJwbHY4XCI7XG4gIGlmKCB0eXBlb2YgTG9nZ2VyICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcImFwcHNjcmlwdFwiO1xuICBpZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHJldHVybiBcIm5vZGVcIjtcbn1cblxuZnVuY3Rpb24gbG9nKG1zZykge1xuICB2YXIgZSA9IGVudigpO1xuICBpZiggZSA9PSBcInBsdjhcIiApIHBsdjguZWxvZyhOT1RJQ0UsICdub3RpY2UnLCBtc2cpO1xuICBlbHNlIGlmKCBlID09IFwiYXBwc2NyaXB0XCIgKSBMb2dnZXIubG9nKG1zZyk7XG4gIGVsc2UgY29uc29sZS5sb2cobXNnKTtcbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIGlmIChudWxsID09IG9iaiB8fCBcIm9iamVjdFwiICE9IHR5cGVvZiBvYmopIHJldHVybiBvYmo7XG4gIHZhciBjb3B5ID0gb2JqLmNvbnN0cnVjdG9yKCk7XG4gIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkgY29weVthdHRyXSA9IG9ialthdHRyXTtcbiAgfVxuICByZXR1cm4gY29weTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVudiA6IGVudixcbiAgbG9nIDogbG9nLFxuICBjbG9uZSA6IGNsb25lXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBWYWxpZGF0ZSBhIG1vZGVsIHJ1biBzZXR1cC4gIHRocm93IGVycm9yIGlzIGJhZG5lc3MuXG4gKi9cbnZhciBkYXRhTW9kZWwgPSByZXF1aXJlKCcuL2RhdGFNb2RlbCcpO1xudmFyIHBhcmFtRXJyb3IgPSAnVmFsaWRhdGlvbiBFcnJvcjogJztcblxudmFyIHZhbGlkV2VhdGhlcktleXMgPSBbXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGQkLywgLy8gbW9kZWxsZWQgb3IgYXZlcmFnZSB3ZWF0aGVyIE1NIGZvciBtb250aGx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkLywgLy8gc3BlY2lmaWMgd2VhdGhlciBZWVlZLU1NLUREIGZvciBkYWlseSB0aW1lc3RlcFxuICAvXlxcZFxcZC1cXGRcXGQkLyAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCk7XG4gIHZhbGlkYXRlTWFuYWdlKG1vZGVsKTtcbiAgdmFsaWRhdGVXZWF0aGVyKG1vZGVsKTtcbiAgdmFsaWRhdGVTb2lsKG1vZGVsKTtcbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWFuYWdlKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwubWFuYWdlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG5cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwubWFuYWdlLCBtb2RlbC5tYW5hZ2UsICdtYW5hZ2UnKTtcblxuICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcyApIHtcbiAgICBpZiggIUFycmF5LmlzQXJyYXkobW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcykgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKydtYW5hZ2UuY29wcGljZURhdGVzIHNob3VsZCBiZSBhbiBhcnJheSBvZiBkYXRlIHN0cmluZ3MuJztcbiAgICB9XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IG1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQkJykgfHwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5tYXRjaCgnXlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkJCcpICkge1xuICAgICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCBtYW5hZ2UuY29wcGljZURhdGVzIGZvcm1hdCAnK21vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXNbaV0rJy4gc2hvdWxkIGJlIFlZWVktTU0gZm9ybWF0Lic7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuXG4gICAgaWYoIG1vZGVsLm1hbmFnZS5kYXRlQ29wcGljZWQgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UuZGF0ZUNvcHBpY2VkIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG4gICAgaWYoIG1vZGVsLm1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBtYW5hZ2UueWVhcnNQZXJDb3BwaWNlIHJlcXVpcmVkIGlmIG1hbmFnZS5jb3BwaWNlRGF0ZXMgbm90IHByb3ZpZGVkJztcbiAgICB9XG5cbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpIHtcbiAgaWYoICFtb2RlbC53ZWF0aGVyICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ05vIHdlYXRoZXIgZGVmaW5lZCc7XG4gIH1cblxuICBmb3IoIHZhciBrZXkgaW4gbW9kZWwud2VhdGhlciApIHtcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbGlkV2VhdGhlcktleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZigga2V5Lm1hdGNoKHZhbGlkV2VhdGhlcktleXNbaV0pICkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCAhZm91bmQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yKycgaW52YWxpZCB3ZWF0aGVyIGtleTogJytrZXk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwud2VhdGhlciwgbW9kZWwud2VhdGhlcltrZXldLCAnd2VhdGhlcicpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gdmFsaWRhdGVTb2lsKG1vZGVsKSB7XG4gIGlmKCAhbW9kZWwuc29pbCApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydzb2lsIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5zb2lsLCBtb2RlbC5zb2lsLCAnc29pbCcpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVBsYW50YXRpb24obW9kZWwpIHtcbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24gaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5wbGFudGF0aW9uLCBtb2RlbC5wbGFudGF0aW9uLCAncGxhbnRhdGlvbicpO1xuXG4gIGlmKCAhbW9kZWwucGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC50cmVlLCBtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSwgJ3BsYW50YXRpb24uc2VlZGxpbmdUcmVlJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLmNvcHBpY2VkVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLmNvcHBpY2VkVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlLCAncGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUnKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwsIG1vZGVsLCBuYW1lKSB7XG4gIHZhciBrZXksIGl0ZW07XG5cbiAgZm9yKCBrZXkgaW4gZGF0YU1vZGVsLnZhbHVlICkge1xuICAgIGl0ZW0gPSBkYXRhTW9kZWwudmFsdWVba2V5XTtcbiAgICBpZiggaXRlbS5yZXF1aXJlZCA9PT0gZmFsc2UgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiggbW9kZWxba2V5XSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcituYW1lKycuJytrZXkrJyBpcyBtaXNzaW5nICcrXG4gICAgICAgICAgICAoaXRlbS5kZXNjcmlwdGlvbiA/ICcoJytpdGVtLmRlc2NyaXB0aW9uKycpJyA6ICcnKTtcbiAgICB9XG5cbiAgICBpZiggdHlwZW9mIGl0ZW0udmFsdWUgPT09ICdvYmplY3QnICkge1xuICAgICAgdmFsaWRhdGVNb2RlbChpdGVtLCBtb2RlbFtrZXldLCBuYW1lKycuJytrZXkpO1xuICAgIH1cbiAgfVxufVxuIiwidmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ29vZ2xlRHJpdmUnKTtcbnZhciBleHBvcnRUb0NzdiA9IHJlcXVpcmUoJy4vZ29vZ2xlRHJpdmUvZXhwb3J0VG9Dc3YnKTtcbnZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciByYXdPdXRwdXQgPSByZXF1aXJlKCcuL291dHB1dC9yYXcnKTtcbnZhciB3ZWF0aGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyJyk7XG52YXIgd2VhdGhlckNoYXJ0ID0gcmVxdWlyZSgnLi93ZWF0aGVyL2NoYXJ0Jyk7XG52YXIgZmxhc2hibG9ja0RldGVjdG9yID0gcmVxdWlyZSgnLi9mbGFzaGJsb2NrLWRldGVjdG9yJyk7XG52YXIgaW5wdXRGb3JtID0gcmVxdWlyZSgnLi9pbnB1dEZvcm0nKTtcbnZhciBjaGFydHMgPSByZXF1aXJlKCcuL2NoYXJ0cycpO1xuXG4vLyBpbXBvcnQgM3BnIG1vZGVsXG52YXIgbW9kZWwgPSByZXF1aXJlKCcuLi8uLi9wb3BsYXItM3BnLW1vZGVsJyk7XG5cbi8vIHdpcmUgaW4gYXBwIGhhbmRsZXJzIHRvIG1vZGVsXG52YXIgbW9kZWxJTyA9IHJlcXVpcmUoJy4vbW9kZWxSdW5IYW5kbGVyJyk7XG5tb2RlbC5zZXRJTyhtb2RlbElPKTtcblxudmFyIHJ1bkNhbGxiYWNrLCB3ZWF0aGVyQ3VzdG9tQ2hhcnQ7XG5cblxuLy8gcm93IHJhdyBkYXRhIGRvZXMgYSBsb3Qgb2YgcHJvY2Vzc2luZyBvZiB0aGUgcmVzdWx0cyBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgb2Ygd2hhdCdzXG4vLyBiZWluZyBkaXNwbGF5ZWQuICBHbyBhaGVhZCBhbiBzZXR1cCB0aGUgY3N2IGRhdGEgYXQgdGhpcyBwb2ludCwgdGhlbiBpZiB0aGUgdXNlclxuLy8gZGVjaWRlcyB0byBleHBvcnQsIHdlIGFyZSBhbGwgc2V0IHRvIHRvO1xudmFyIGNzdlJlc3VsdHMgPSBudWxsO1xudmFyIGN1cnJlbnRSZXN1bHRzID0gbnVsbDtcblxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIC8vIHRoZXNlIHdlIGRvbid0IHdhbnQgdG8gc2V0dXAgdW50aWwgZG9tIGlzIHJlYWR5XG4gIGlucHV0Rm9ybSA9IGlucHV0Rm9ybSh0aGlzKTtcblxuICBjaGFydHMuc2V0QXBwKHRoaXMpO1xuICBnZHJpdmUuc2V0QXBwKHRoaXMpO1xuXG4gIG1vZGVsSU8uYXBwID0gdGhpcztcbiAgbW9kZWxJTy5tb2RlbCA9IG1vZGVsO1xuICBtb2RlbElPLmNoYXJ0cyA9IGNoYXJ0cztcbiAgbW9kZWxJTy5pbnB1dEZvcm0gPSBpbnB1dEZvcm07XG5cbiAgLy8gY2hlY2sgaWYgZmxhc2ggaXMgaW5zdGFsbGVkLiAgSWYgbm90LCBoaWRlIHRoZSBjaGFydCB0eXBlIHRvZ2dsZS5cbiAgZmxhc2hibG9ja0RldGVjdG9yKGZ1bmN0aW9uKHZhbCl7XG4gICAgICBpZiggdmFsID4gMCApICQoXCIjY2hhcnQtdHlwZS1idG4tZ3JvdXBcIikuaGlkZSgpO1xuICB9KTtcblxuICByYXdPdXRwdXQuaW5pdCh0aGlzKTtcblxuICAvLyBzZXR1cCBleHBvcnQgbW9kYWxcbiAgZXhwb3J0VG9Dc3YuaW5pdCgpO1xuICAkKFwiI2V4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGV4cG9ydFRvQ3N2LnJ1bihjc3ZSZXN1bHRzKTtcbiAgfSk7XG5cbiAgdmFyIGVsZSA9ICQoXCIjaW5wdXRzLWNvbnRlbnRcIik7XG4gIGlucHV0Rm9ybS5jcmVhdGUoZWxlKTtcblxuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgdGhlIGNoYXJ0c1xuICBjaGFydHMuaW5pdCgpO1xuXG4gIC8vIHNldCBkZWZhdWx0IGNvbmZpZ1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUNvcHBpY2VkXCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMiozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjEwKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuXG4gIC8vIHNldHVwIG5pY2Ugc2Nyb2xsaW5nXG4gICQoJy5hcHAtbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcC01NVxuICAgICAgIH0sIDcwMCk7XG4gIH0pO1xuXG4gIC8vIG1ha2Ugc3VyZSBldmVyeXRoaW5nIGZpdHMgdG8gc2NyZWVuXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgIGNoYXJ0cy5yZXNpemUoKTtcblxuICAgICAgaWYoIHdlYXRoZXJDdXN0b21DaGFydCApIHtcbiAgICAgICAgICB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSB3ZWF0aGVyQ2hhcnQuY3JlYXRlKCQoJyNjdXN0b20td2VhdGhlci1jaGFydCcpWzBdLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG4gICAgICB9XG4gIH0pO1xuXG4gIGNhbGxiYWNrKCk7XG59O1xuXG52YXIgZ2V0TW9kZWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG1vZGVsO1xufTtcblxudmFyIGdldE91dHB1dHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG91dHB1dHM7XG59O1xuXG52YXIgcnVuQ29tcGxldGUgPSBmdW5jdGlvbihyb3dzKSB7XG4gIGlmICggcnVuQ2FsbGJhY2sgKSBydW5DYWxsYmFjayhyb3dzKTtcbiAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICBydW5DYWxsYmFjayA9IG51bGw7XG59O1xubW9kZWxJTy5kdW1wID0gcnVuQ29tcGxldGU7XG5cbnZhciBkYXlzVG9SdW4gPSBmdW5jdGlvbihkYXlzX2luX2ludGVydmFsKSB7XG4gIHZhciBkMSA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICBpZiAoZDEgJiYgZDEgIT09IFwiXCIpIHtcbiAgICAgIGQxID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIGQyID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKTtcbiAgaWYgKGQyICYmIGQyICE9PSBcIlwiKSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIG9uZURheSA9IDI0KjYwKjYwKjEwMDA7XG4gIHZhciBkYXlzID0gTWF0aC5yb3VuZChNYXRoLmFicygoZDEuZ2V0VGltZSgpIC0gZDIuZ2V0VGltZSgpKS8ob25lRGF5KSkpO1xuICBkYXlzID0gZGF5cyA8PSAwID8gMSA6IGRheXM7XG5cbiAgcmV0dXJuIGRheXMgLyBkYXlzX2luX2ludGVydmFsO1xufTtcblxuXG52YXIgcnVuTW9kZWwgPSBmdW5jdGlvbihpc1J0KSB7XG5cbiAgaWYgKCQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLmhhc0NsYXNzKFwiZGlzYWJsZWRcIikpIHJldHVybjtcbiAgJChcIiNydW5idG4sICNydW5idG4tc21cIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiUnVubmluZy4uLlwiKTtcblxuICBpZiggIXdlYXRoZXIuY2hlY2sobW9kZWwpICkgcmV0dXJuO1xuXG4gIC8vIGxldCBVSSBwcm9jZXNzIGZvciBhIHNlYyBiZWZvcmUgd2UgdGFuayBpdFxuICAvLyBUT0RPOiB0aGlzIHNob3VsZCBiZSBwcmVmb3JtZWQgdy8gYSB3ZWJ3b3JrZXJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bicsIDEpO1xuXG4gICAgICAvLyByZWFkIGV2ZXJ5dGhpbmcgc28gdGhlIHZhcmlhdGlvbnMgYXJlIHNldFxuICAgICAgbW9kZWwudmFyaWF0aW9ucyA9IHt9O1xuICAgICAgbW9kZWxJTy5yZWFkRnJvbUlucHV0cygpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIG9ubHkgc2V0dGluZyAyIHZhcmlhdGlvbiBwYXJhbWV0ZXJzXG4gICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwudmFyaWF0aW9ucyApIHBhcmFtcy5wdXNoKGtleSk7XG4gICAgICBpZiggcGFyYW1zLmxlbmd0aCA+IDIgKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBhIGxpbWl0IG9mIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnMgcGVyIHJ1bi4gIEN1cnJlbnRseSB5b3UgYXJlIHZhcnlpbmcgXCIrXG4gICAgICAgICAgICAgICAgXCJ0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XFxuXFxuIC1cIitwYXJhbXMuam9pbihcIlxcbiAtXCIpKTtcbiAgICAgICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxldCB0aGUgd29ybGQga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgICAgaWYoICFpc1J0ICkgZ2RyaXZlLnJ1bk1vZGVsUnQoKTtcblxuICAgICAgLy8gc2hvdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgICAgJChcIiN2YXJpYXRpb25BbmFseXNpc1N0YXR1c1wiKS5odG1sKFwiPGI+XCIrKHBhcmFtcy5sZW5ndGggPT0gMCA/IFwiTm9uZVwiIDogcGFyYW1zLmpvaW4oXCIsIFwiKSkrXCI8L2I+XCIpO1xuXG4gICAgICAvLyB3ZSBhcmUgb25seSBydW5uaW5nIG9uY2VcbiAgICAgIGlmICggcGFyYW1zLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4tc2luZ2xlUGFyYW0nLCAxKTtcblxuICAgICAgICAgIHJ1bkNhbGxiYWNrID0gZnVuY3Rpb24ocm93cykge1xuICAgICAgICAgICAgICBzaG93UmVzdWx0cyhyb3dzKTtcbiAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICB2YXIgZGF5cyA9IGRheXNUb1J1bihtb2RlbC5zZXR1cC5kYXlzX2luX2ludGVydmFsKTtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtb2RlbC5ydW4oZGF5cyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xuICAgICAgICAgIH1cblxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi12YXJpYXRpb24nLCAxKTtcblxuICAgICAgICAgIC8vIHNldCB2YXJpYXRpb24gb3JkZXJcbiAgICAgICAgICB2YXIgcnVucyA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgICAgICAgICBvdXRwdXQgOiBudWxsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIG9iai5pbnB1dHNbcGFyYW1zWzBdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXVtpXTtcbiAgICAgICAgICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICB0LmlucHV0c1twYXJhbXNbMV1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaCh0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcnVuVmFyaWF0aW9uKDAsIHJ1bnMpO1xuICAgICAgfVxuICB9LCAyNTApO1xufTtcblxuLy8gcnVuIGEgc2luZ2xlIHZhcmlhdGlvbiwgd2hlbiBtdWx0aXBsZSBpbnB1dHMgZm9yIGEgc2luZ2xlIHBhcmFtZXRlciBoYXZlXG4vLyBiZWVuIGdpdmVuXG52YXIgcnVuVmFyaWF0aW9uID0gZnVuY3Rpb24oaW5kZXgsIHJ1bnMpIHtcblxuICAvLyBzZXQgaW5wdXQgdmFyaWFibGVzIGZvciBydW5cbiAgdmFyIHJ1biA9IHJ1bnNbaW5kZXhdO1xuICBmb3IoIHZhciBrZXkgaW4gcnVuLmlucHV0cyApIHtcbiAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwocnVuLmlucHV0c1trZXldKTtcbiAgfVxuXG4gIHJ1bkNhbGxiYWNrID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcnVuc1tpbmRleF0ub3V0cHV0ID0gZGF0YTtcbiAgICAgIGluZGV4Kys7XG5cblxuICAgICAgaWYgKHJ1bnMubGVuZ3RoID09IGluZGV4KSB7XG4gICAgICAgICAgLy8gcmVzZXQgdGhlIGNvbnN0YW50IHRvIHRoZSBmaXJzdCB2YWx1ZVxuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKG1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93UmVzdWx0cyhydW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnVuVmFyaWF0aW9uKGluZGV4LCBydW5zKTtcbiAgICAgIH1cbiAgfTtcblxuICAvLyBIQUNLOiB3aGVuIHNob3VsZCB3ZSBsb29rIHRoaXMgdXA/XG4gIHZhciBkYXlzID0gZGF5c1RvUnVuKHBhcnNlRmxvYXQoJCgnI2lucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWwnKS52YWwoKSkpO1xuXG4gIHRyeSB7XG4gICAgbW9kZWwucnVuKGRheXMpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBhbGVydChlKTtcbiAgfVxufTtcblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgaWYoIHJlc3VsdFswXSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgY3VycmVudFJlc3VsdHMgPSBbe1xuICAgICAgICAgIHNpbmdsZVJ1biA6IHRydWUsXG4gICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgb3V0cHV0IDogcmVzdWx0XG4gICAgICB9XTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50UmVzdWx0cyA9IHJlc3VsdDtcbiAgfVxuXG4gIC8vIHRyYW5zcG9zZSBhbGwgcmVzdWx0cyB0byBoYXNoIGJ5IGRhdGVcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjdXJyZW50UmVzdWx0cy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgZGF0ZUhhc2ggPSB7fTtcbiAgICB2YXIgciA9IGN1cnJlbnRSZXN1bHRzW2ldO1xuXG4gICAgci50b3RhbFN0ZXBzID0gci5vdXRwdXQubGVuZ3RoO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgci5vdXRwdXQubGVuZ3RoOyBqKysgKSB7XG4gICAgICBkYXRlSGFzaFtyLm91dHB1dFtqXVswXV0gPSByLm91dHB1dFtqXTtcbiAgICB9XG4gICAgci5oZWFkZXIgPSByLm91dHB1dFswXTtcbiAgICByLm91dHB1dCA9IGRhdGVIYXNoO1xuICB9XG5cbiAgLy8gc29ydCBieSBtb3N0IHRvIGxlYXN0IHN0ZXBzXG4gIGN1cnJlbnRSZXN1bHRzLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgaWYoIGEudG90YWxTdGVwcyA+IGIudG90YWxTdGVwcyApIHJldHVybiAtMTtcbiAgICBpZiggYS50b3RhbFN0ZXBzIDwgYi50b3RhbFN0ZXBzICkgcmV0dXJuIDE7XG4gICAgcmV0dXJuIDA7XG4gIH0pO1xuXG4gIHVwZGF0ZVVpKCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICB9LCAyNTApO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlVWkoKSB7XG4gIGlmKCAhY3VycmVudFJlc3VsdHMgKSByZXR1cm47XG5cbiAgcmF3T3V0cHV0LnNob3coY3VycmVudFJlc3VsdHMpOyAvLyB0aGlzIHVwZGF0ZXMgY3N2UmVzdWx0c1xuICBjaGFydHMudXBkYXRlQ2hhcnRzKGNzdlJlc3VsdHMsIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIGdvb2dsZURyaXZlIDogZ2RyaXZlLFxuICBnZXRNb2RlbCA6IGdldE1vZGVsLFxuICBydW5Nb2RlbCA6IHJ1bk1vZGVsLFxuICB1cGRhdGVVaSA6IHVwZGF0ZVVpLFxuICBkYXlzVG9SdW4gOiBkYXlzVG9SdW4sXG4gIC8vIHRoZSByYXcgbW9kdWxlIGFjdHVhbGx5IGNyZWF0ZXMgdGhpcyBzZXR1cFxuICBzZXRDc3ZSZXN1bHRzIDogZnVuY3Rpb24oY3N2KSB7XG4gICAgY3N2UmVzdWx0cyA9IGNzdjtcbiAgfSxcbiAgZ2V0Q3N2UmVzdWx0cyA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjc3ZSZXN1bHRzO1xuICB9LFxuICBxcyA6IHV0aWxzLnFzLFxuICBnZXRNb2RlbElPIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZGVsSU87XG4gIH1cbn07XG4iLCJ2YXIgb3V0cHV0RGVmaW5pdGlvbnMgPSByZXF1aXJlKCcuL291dHB1dC9kZWZpbml0aW9ucycpO1xudmFyIHJhdyA9IHJlcXVpcmUoJy4vb3V0cHV0L3JhdycpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgYXBwO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG52YXIgY1dpZHRoID0gMDtcblxudmFyIGNoYXJ0cyA9IFtdO1xuXG4vLyB0aGVyZSBpcyBubyB3YXkgdG8gZ2V0IHRoZSBjb2xvcnMgZm9yIHRoZSBsZWdlbmRzICh0byBtYWtlIHlvdXIgb3duKVxuLy8gdGhpcyBwb3N0OlxuLy8gZ2l2ZXMgdGhlc2UgdmFsdWVzLiAgVGhpcyBpcyBhIEhBQ0ssIGlmIHRoZXkgZXZlciBjaGFuZ2UsIHdlIG5lZWQgdG8gdXBkYXRlXG52YXIgZ29vZ2xlQ2hhcnRDb2xvcnMgPSBbXCIjMzM2NmNjXCIsXCIjZGMzOTEyXCIsXCIjZmY5OTAwXCIsXCIjMTA5NjE4XCIsXCIjOTkwMDk5XCIsXCIjMDA5OWM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjZGQ0NDc3XCIsXCIjNjZhYTAwXCIsXCIjYjgyZTJlXCIsXCIjMzE2Mzk1XCIsXCIjOTk0NDk5XCIsXCIjMjJhYTk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjYWFhYTExXCIsXCIjNjYzM2NjXCIsXCIjZTY3MzAwXCIsXCIjOGIwNzA3XCIsXCIjNjUxMDY3XCIsXCIjMzI5MjYyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjNTU3NGE2XCIsXCIjM2IzZWFjXCIsXCIjYjc3MzIyXCIsXCIjMTZkNjIwXCIsXCIjYjkxMzgzXCIsXCIjZjQzNTllXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjOWM1OTM1XCIsXCIjYTljNDEzXCIsXCIjMmE3NzhkXCIsXCIjNjY4ZDFjXCIsXCIjYmVhNDEzXCIsXCIjMGM1OTIyXCJcbiAgICAgICAgICAgICAgICAgICAgICAsXCIjNzQzNDExXCJdO1xuXG4vLyB0ZW1wbGF0ZSBmb3IgdGhlIHBvcHVwXG52YXIgc2xpZGVyUG9wdXAgPSAkKFxuICAgICAgXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cCc+XCIgK1xuICAgICAgICAgIFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlLWNpcmNsZSBwdWxsLXJpZ2h0IHNsaWRlLXBvcHVwLWNsb3NlJz48L2k+XCIrXG4gICAgICAgICAgXCI8ZGl2IGlkPSdjYXJvdXNlbCcgY2xhc3M9J293bC1jYXJvdXNlbCBvd2wtdGhlbWUnIHN0eWxlPSdtYXJnaW4tdG9wOjE1cHgnPjwvZGl2PlwiICtcblx0XCI8L2Rpdj5cIik7XG5cbnZhciBzbGlkZXJQb3B1cEJnID0gJChcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwLWJnJz4mbmJzcDs8L2Rpdj5cIik7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgc29tZW9uZSBoYXMgY2xpY2sgYSBjaGVja2JveFxudmFyIGNoYW5nZXMgPSBmYWxzZTtcblxuLy8gd2hlbiBzaXppbmcsIHdhaXQgYSB+MzAwbXMgYmVmb3JlIHRyaWdnZXJpbmcgcmVkcmF3XG52YXIgcmVzaXplVGltZXIgPSAtMTtcblxudmFyIGNoYXJ0VHlwZVNlbGVjdG9yLCBjaGFydENoZWNrYm94ZXMsIGNEYXRhO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgIHNob3dQb3B1cCgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBjaGFydCBzZWxlY3RvcnNcbiAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuXG4gIC8vIHNldCBwb3B1cCBjbGljayBoYW5kbGVyc1xuICAkKFwiI2NoYXJ0VHlwZS1zZWxlY3RBbGxcIikub24oJ2NsaWNrJyxzZWxlY3RBbGwpO1xuICAkKFwiI2NoYXJ0VHlwZS11bnNlbGVjdEFsbFwiKS5vbignY2xpY2snLHVuc2VsZWN0QWxsKTtcblxuICBjaGFydFR5cGVTZWxlY3RvciA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcyA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zXCIpO1xuXG4gIHZhciBjMSA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMxXCIpO1xuICB2YXIgYzIgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMlwiKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb25maWcub3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbCA9IGNvbmZpZy5vdXRwdXRzW2ldO1xuICAgICAgY2hhcnRUeXBlU2VsZWN0b3IuYXBwZW5kKCQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbCArIFwiJyBcIlxuICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdzZWxlY3RlZCcgOiAnJylcbiAgICAgICAgICAgICAgKyBcIj5cIiArIHZhbCArIFwiPC9vcHRpb24+XCIpKTtcblxuICAgICAgaWYoIGkgJSAyID09IDAgKSB7XG4gICAgICAgICAgYzEuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMyLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfVxuICB9XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCIuZm4tdG9nZ2xlXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjXCIrJCh0aGlzKS5hdHRyKFwiZGF0YXRhcmdldFwiKSkudG9nZ2xlKCdzbG93Jyk7XG4gIH0pO1xuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpICkgc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgICAgIGVsc2UgdW5zZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICB9KTtcblxuICAkKFwiI3NlbGVjdC1jaGFydHMtYnRuLCAjc2VsZWN0LWNoYXJ0cy10aXRsZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICAgIGNoYW5nZXMgPSBmYWxzZTtcbiAgfSk7XG5cbiAgJChcIi5jaGFydC1tb2RhbC1jbG9zZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgaWYoIGNoYW5nZXMgJiYgY0RhdGEgKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgYXBwLnVwZGF0ZVVpKCk7XG4gICAgICAgICAgfSw0MDApO1xuXG4gICAgICB9XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtdHlwZS10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcbiAgICAgICAgICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgfVxuICB9KTtcbn1cblxuLy8gbWFrZSBzdXJlIGFuZCBlbmQgbGFiZWwgdGFnXG5mdW5jdGlvbiBfY3JlYXRlRGVzY3JpcHRpb24odmFsKSB7XG4gIGlmKCAhb3V0cHV0RGVmaW5pdGlvbnNbdmFsXSApIHJldHVybiBcIjxiPlwiK3ZhbCtcIjwvYj48L2xhYmVsPlwiO1xuXG4gIHZhciBkZXNjID0gb3V0cHV0RGVmaW5pdGlvbnNbdmFsXTtcbiAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcblxuICB2YXIgbGFiZWwgPSBcIjxiPlwiK3ZhbCtcIjwvYj48c3BhbiBzdHlsZT0nZm9udC1zaXplOjEycHgnPlwiK2xhYmVsK3VuaXRzK1wiPC9zcGFuPjwvbGFiZWw+XCI7XG4gIHZhciBoYXNEZXNjID0gZGVzYy5kZXNjcmlwdGlvbiAmJiBkZXNjLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gIGlmKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweDtjb2xvcjojODg4O2ZvbnQtc3R5bGU6aXRhbGljJz5cIitkZXNjLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgdmFyIGZOYW1lID0gZGVzYy5hbHRGbk5hbWUgfHwgdmFsO1xuICB2YXIgZm4gPSBhcHAuZ2V0TW9kZWwoKS5nZXRGdW5jdGlvbihmTmFtZSk7XG5cbiAgaWYoIGZuIHx8IGRlc2MuZm4gKSB7XG4gICAgICBpZiggIWhhc0Rlc2MgKSBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4Jz5cIjtcbiAgICAgIGxhYmVsICs9IFwiIDxhIHN0eWxlPSdmb250LXN0eWxlOm5vcm1hbDtjdXJzb3I6cG9pbnRlcicgZGF0YXRhcmdldD0nZm4tZGVzYy1cIit2YWwrXCInIGNsYXNzPSdmbi10b2dnbGUnPmZuKCk8L2E+PC9kaXY+XCI7XG5cbiAgICAgIGxhYmVsICs9IFwiPGRpdiBpZD0nZm4tZGVzYy1cIit2YWwrXCInIHN0eWxlPSdkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7b3ZlcmZsb3c6YXV0bycgY2xhc3M9J3dlbGwgd2VsbC1zbSc+XCIrXG4gICAgICAgICAgICAgICAgICAoZm58fGRlc2MuZm4pLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCcmbmJzcDsnKS5yZXBsYWNlKC9cXG4vZywnPGJyIC8+JykrXCI8L2Rpdj5cIjtcbiAgfSBlbHNlIGlmICggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPC9kaXY+XCI7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIjtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikuYXR0cihcInNlbGVjdGVkXCIsXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsdHJ1ZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsZmFsc2UpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSBzZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb25maWcub3V0cHV0cy5sZW5ndGg7IGkrKykgdW5zZWxlY3QoY29uZmlnLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlKSB7XG4gIGVsZS5wYXJlbnQoKS5oaWRlKCdzbG93JywgZnVuY3Rpb24oKXtcbiAgICAgIGVsZS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHVuc2VsZWN0KGVsZS5hdHRyKCd0eXBlJykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmludChjaGFydENvbnRhaW5lcikge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdwcmludC1jaGFydCcsIDEpO1xuXG5cbnZhciBkaXNwX3NldHRpbmc9XCJ0b29sYmFyPXllcyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz15ZXMsbWVudWJhcj15ZXMsXCI7XG4gIGRpc3Bfc2V0dGluZys9XCJzY3JvbGxiYXJzPXllcyx3aWR0aD04MDAsIGhlaWdodD02MDAsIGxlZnQ9MjUsIHRvcD0yNVwiO1xuXG4gIHZhciBzdmcgPSBjaGFydENvbnRhaW5lci5maW5kKFwic3ZnXCIpO1xuICB2YXIgaHRtbCA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJkaXZcIikuaHRtbCgpO1xuXG4gIHZhciBkb2NwcmludD13aW5kb3cub3BlbihcIlwiLFwiXCIsZGlzcF9zZXR0aW5nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2hlYWQ+PGJvZHkgbWFyZ2lud2lkdGg9XCIwXCIgbWFyZ2luaGVpZ2h0PVwiMFwiIG9uTG9hZD1cInNlbGYucHJpbnQoKVwiPjxjZW50ZXI+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKGh0bWwpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9jZW50ZXI+PC9ib2R5PjwvaHRtbD4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQuY2xvc2UoKTtcbiAgZG9jcHJpbnQuZm9jdXMoKTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICBjRGF0YSA9IGRhdGE7XG59XG5cbi8vIGJhc2ljYWxseSByZWRyYXcgZXZlcnl0aGluZ1xuZnVuY3Rpb24gcmVzaXplKCkge1xuICAvLyByZXF1aXJlIG1vcmUgdGhhbiBhIDMwIHBpeGVsIHdpZHRoIGNoYW5nZSAoc28gd2UgZG9uJ3QgcmVkcmF3IHcvIHNjcm9sbCBiYXJzIGFkZGVkKVxuICB2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYoIGNXaWR0aCA+IHdpbldpZHRoIC0gMTUgJiYgY1dpZHRoIDwgd2luV2lkdGggKyAxNSApIHJldHVybjtcbiAgY1dpZHRoID0gd2luV2lkdGg7XG5cbiAgaWYoIHJlc2l6ZVRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmVzaXplVGltZXIgPSAtMTtcblxuICAgICAgcmVkcmF3Q2hhcnRzKCk7XG4gIH0sMzAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hhcnRzKHJlc3VsdHMsIGFuaW1hdGUpIHtcbiAgaWYoIHJlc3VsdHMgKSBzZXREYXRhKHJlc3VsdHMpO1xuICBpZiggIWNEYXRhICkgcmV0dXJuO1xuXG4gIGNoYXJ0cyA9IFtdO1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikuc2hvdygpO1xuXG4gIC8vIGNyZWF0ZSBhIGxlZ2VuZCBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHJ1blxuICB2YXIgbGVnZW5kID0gXCJcIjtcbiAgaWYoIGNEYXRhLmlucHV0cy5sZW5ndGggPiAxICkge1xuICAgICAgdmFyIGMxID0gXCJcIjtcbiAgICAgIHZhciBjMiA9IFwiXCI7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmlucHV0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgZWxlID0gXCI8ZGl2IHN0eWxlPSdtaW4taGVpZ2h0OjQwcHg7bWFyZ2luLWJvdHRvbToxMHB4Jz48ZGl2IGNsYXNzPSdsZWdlbmQtc3F1YXJlJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpcIitnb29nbGVDaGFydENvbG9yc1tpXStcIic+Jm5ic3A7PC9kaXY+XCI7XG4gICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gY0RhdGEuaW5wdXRzW2ldICkge1xuICAgICAgICAgICAgICBlbGUgKz0gXCI8ZGl2IGNsYXNzPSdsZWdlbmQtdGV4dCc+XCIrbVR5cGUrXCI9XCIrY0RhdGEuaW5wdXRzW2ldW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpICUgMiA9PSAwICkgYzEgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgICAgIGVsc2UgYzIgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgfVxuICAgICAgbGVnZW5kID0gXCI8ZGl2PjxhIGlkPSdsZWdlbmQtcGFuZWwtdG9nZ2xlJyBzdHlsZT0nbWFyZ2luLWxlZnQ6NXB4O2N1cnNvcjpwb2ludGVyJz5MZWdlbmQ8L2E+PC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZy1ib3R0b206NXB4O21hcmdpbi1ib3R0b206MTVweCc+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3JvdycgaWQ9J2xlZ2VuZC1wYW5lbCc+PGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MxK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMitcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8L2Rpdj48L2Rpdj5cIjtcbiAgfVxuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuaHRtbChsZWdlbmQpO1xuICAkKFwiI2xlZ2VuZC1wYW5lbC10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjbGVnZW5kLXBhbmVsXCIpLnRvZ2dsZShcInNsb3dcIik7XG4gIH0pO1xuXG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd01haW5DaGFydCh0eXBlc1tpXSwgYW5pbWF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzaG93LWNoYXJ0LXBvcHVwJywgMSk7XG5cblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5odG1sKFwiXCIpO1xuICAkKCdib2R5Jykuc2Nyb2xsVG9wKDApLmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKS5hcHBlbmQoc2xpZGVyUG9wdXBCZykuYXBwZW5kKHNsaWRlclBvcHVwKTtcblxuICAvLyB0aGlzIGNvdWxkIGNhc2UgYmFkbmVzcy4uLi4gIHdoeSBkb2Vzbid0IGl0IGxpdmUgd2hlbiByZW1vdmVkIGZyb20gRE9NP1xuICBzbGlkZXJQb3B1cC5maW5kKCcuc2xpZGUtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICBoaWRlUG9wdXAoKTtcbiAgfSk7XG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd1BvcHVwQ2hhcnQodHlwZXNbaV0pO1xuICB9XG5cbiAgJCgnI2Nhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgbmF2aWdhdGlvbiA6IHRydWUsIC8vIFNob3cgbmV4dCBhbmQgcHJldiBidXR0b25zXG4gICAgICBzbGlkZVNwZWVkIDogMzAwLFxuICAgICAgcGFnaW5hdGlvblNwZWVkIDogNDAwLFxuICAgICAgc2luZ2xlSXRlbTp0cnVlXG4gIH0pO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICByZWRyYXdDaGFydHMoKTtcbiAgfSwgMjAwKTtcbn1cblxuZnVuY3Rpb24gaGlkZVBvcHVwKCkge1xuICBzbGlkZXJQb3B1cEJnLnJlbW92ZSgpO1xuICBzbGlkZXJQb3B1cC5yZW1vdmUoKTtcbiAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCdhdXRvJyk7XG59XG5cbmZ1bmN0aW9uIF9zaG93TWFpbkNoYXJ0KHR5cGUsIGFuaW1hdGUpIHtcbiAgdmFyIGNoYXJ0VHlwZSA9ICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLmF0dHIoXCJ2YWx1ZVwiKTtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgLz5cIik7XG4gIHZhciBvdXRlclBhbmVsID0gJChcIjxkaXYgc3R5bGU9J21hcmdpbi1ib3R0b206IDI1cHgnPlwiK1xuICBcdFwiPGEgY2xhc3M9J2J0biBidG4teHMgYnRuLWRlZmF1bHQnIHN0eWxlPSdcIisoY2hhcnRUeXBlICE9IFwidGltZWxpbmVcIiA/IFwicG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDttYXJnaW46MCAwIC0yMHB4IDIwcHhcIiA6IFwibWFyZ2luLWJvdHRvbTo1cHhcIikrXG4gICAgICBcIicgdHlwZT0nXCIrdHlwZStcIic+XCIgK1xuICBcdFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlJz48L2k+IFwiK3R5cGUrXCI8L2E+PC9kaXY+XCIpO1xuICBvdXRlclBhbmVsLmZpbmQoXCJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmVtb3ZlKCQodGhpcykpO1xuICB9KTtcbiAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSBvdXRlclBhbmVsLmNzcyhcIm1hcmdpbi1ib3R0b21cIixcIjIwcHhcIik7XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5hcHBlbmQob3V0ZXJQYW5lbC5hcHBlbmQocGFuZWwpKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIGZhbHNlLCBudWxsLCBhbmltYXRlKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dQb3B1cENoYXJ0KHR5cGUpIHtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2l0ZW0nPjwvZGl2PlwiKTtcblxuICB2YXIgcHJpbnRCdG4gPSAkKFwiPGEgY2xhc3M9J2J0biBidG4tc20gYnRuLWRlZmF1bHQnIHN0eWxlPSdtYXJnaW4tbGVmdDoxNnB4Jz48aSBjbGFzcz0naWNvbi1wcmludCc+PC9pPiBQcmludDwvYT5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICBwcmludChjaGFydFBhbmVsKTtcbiAgfSk7XG4gIHBhbmVsLmFwcGVuZChwcmludEJ0bik7XG5cbiAgdmFyIGNoYXJ0UGFuZWwgPSAkKFwiPGRpdj48L2Rpdj5cIik7XG4gIHBhbmVsLmFwcGVuZChjaGFydFBhbmVsKTtcblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5hcHBlbmQocGFuZWwpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgJ2xpbmUnLCBjaGFydFBhbmVsLCB0cnVlLCBbTWF0aC5yb3VuZCgkKHdpbmRvdykud2lkdGgoKSouODgpLCBNYXRoLnJvdW5kKCgkKHdpbmRvdykuaGVpZ2h0KCkqLjkwKS0xMjUpXSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBzaG93TGVnZW5kLCBzaXplLCBhbmltYXRlKSB7XG4gIHZhciBjb2wgPSAwO1xuXG4gIHZhciBkYXRhID0gY0RhdGEuZGF0YVt0eXBlXTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgdmFyIG5ld0RhdGEgPSBbJC5leHRlbmQodHJ1ZSxbXSwgZGF0YVswXSldO1xuXG4gICAgdmFyIGxlbiA9IGRhdGEubGVuZ3RoOyBsZW4yID0gZGF0YVswXS5sZW5ndGg7XG5cbiAgICBmb3IoIHZhciBpID0gMTsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgdmFyIHJvdyA9IFtdO1xuICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBsZW4yOyBqKysgKSB7XG4gICAgICAgIGlmKCBqID09PSAwICkge1xuICAgICAgICAgIHJvdy5wdXNoKG5ldyBEYXRlKGRhdGFbaV1bal0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbmV3RGF0YS5wdXNoKHJvdyk7XG4gICAgfVxuICAgIGRhdGEgPSBuZXdEYXRhO1xuXG4gIH1cblxuICAvLyBkbyB3ZSBuZWVkIHRvIGZha2Ugc29tZSBvZiB0aGUgZGF0YSB0byBmaXQ/ICBvciBza2lwIGJlY2F1c2Ugd2UgaGF2ZSB0b28gbXVjaD9cbiAgaWYoIGNvbmZpZy5zcHJlYWQuaW5kZXhPZih0eXBlKSA+IC0xICYmIGNEYXRhLmlucHV0cy5sZW5ndGggPiAwICYmIGNEYXRhLmlucHV0c1swXVsnc2V0dXAuZGF5c19pbl9pbnRlcnZhbCddICkge1xuICAgIHZhciBtYXhJbnRlcnZhbCA9IGNEYXRhLmlucHV0c1swXVsnc2V0dXAuZGF5c19pbl9pbnRlcnZhbCddO1xuXG4gICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjRGF0YS5pbnB1dHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgdCA9IGNEYXRhLmlucHV0c1tpXVsnc2V0dXAuZGF5c19pbl9pbnRlcnZhbCddO1xuICAgICAgaWYoIG1heEludGVydmFsIDwgdCApIG1heEludGVydmFsID0gdDtcbiAgICB9XG5cbiAgICB2YXIgYWRqdXN0bWVudCA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEuaW5wdXRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgYWRqdXN0bWVudC5wdXNoKG1heEludGVydmFsIC8gY0RhdGEuaW5wdXRzW2ldWydzZXR1cC5kYXlzX2luX2ludGVydmFsJ10pO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBkYXRhLmxlbmd0aCwgbGVuMiA9IGRhdGFbMF0ubGVuZ3RoLCByb3csIHVzZTtcbiAgICB2YXIgbmV3RGF0YSA9IFskLmV4dGVuZCh0cnVlLFtdLCBkYXRhWzBdKV07XG5cbiAgICBmb3IoIHZhciBpID0gMTsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgcm93ID0gW10sIHVzZSA9IHRydWU7XG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGxlbjI7IGorKyApIHtcbiAgICAgICAgaWYoIGRhdGFbaV1bal0gPT09IG51bGwgKSB7XG4gICAgICAgICAgdXNlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggaiA9PT0gMCApIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdICogYWRqdXN0bWVudFtqLTFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiggdXNlICkge1xuICAgICAgICBuZXdEYXRhLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhID0gbmV3RGF0YTtcbiAgfVxuXG4gIC8vIGxldHMgdHJ5IGFuZCBvcHRpbWl6ZVxuICAvKnZhciBvbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgaWYoIGRhdGEubGVuZ3RoID4gNTAwICkge1xuICAgIHZhciBoYXNOdWxscyA9IGZhbHNlO1xuICAgIGlmKCBjRGF0YS5pbnB1dHMubGVuZ3RoID4gMCAmJiBjRGF0YS5pbnB1dHNbMF1bJ3NldHVwLmRheXNfaW5faW50ZXJ2YWwnXSApIHtcbiAgICAgIGhhc051bGxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgYyA9IDA7XG4gICAgZm9yKCB2YXIgaSA9IGRhdGEubGVuZ3RoLTE7IGkgPiAwIDsgaS0tICkge1xuXG4gICAgICBpZiggaGFzTnVsbHMgKSB7XG5cbiAgICAgICAgdmFyIGlzTnVsbCA9IGZhbHNlO1xuICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGRhdGFbaV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgaWYoIGRhdGFbaV1bal0gPT09IG51bGwgKSB7XG4gICAgICAgICAgICBpc051bGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGlzTnVsbCApIHtcbiAgICAgICAgICBpZiggYyAlIDQgIT0gMCApIGRhdGEuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGMrKztcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiggYyAlIDQgIT0gMCApIGRhdGEuc3BsaWNlKGksIDEpO1xuICAgICAgICBjKys7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2codHlwZSsnICAnK29sZW5ndGgrJyAtPiAnK2RhdGEubGVuZ3RoKTsqL1xuXG4gIHZhciBkdCA9IGdvb2dsZS52aXN1YWxpemF0aW9uLmFycmF5VG9EYXRhVGFibGUoZGF0YSk7XG5cblxuICBpZiggb3V0cHV0RGVmaW5pdGlvbnNbdHlwZV0gKSB7XG4gICAgICB2YXIgZGVzYyA9IG91dHB1dERlZmluaXRpb25zW3R5cGVdO1xuICAgICAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICAgICAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG4gICAgICB0eXBlID0gdHlwZStsYWJlbCt1bml0cztcbiAgfVxuXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB2QXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IHR5cGVcbiAgICAgIH0sXG4gICAgICBoQXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IFwiXCJcbiAgICAgIH0sXG4gICAgICBpbnRlcnBvbGF0ZU51bGxzIDogdHJ1ZVxuICB9O1xuICBpZiggIXNob3dMZWdlbmQgKSBvcHRpb25zLmxlZ2VuZCA9IHtwb3NpdGlvbjpcIm5vbmVcIn07XG5cbiAgaWYoIHNpemUgKSB7XG4gICAgICAvL29wdGlvbnMud2lkdGggPSBzaXplWzBdO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBzaXplWzFdO1xuICB9IGVsc2Uge1xuICAgICAgLy9vcHRpb25zLndpZHRoID0gcGFuZWwud2lkdGgoKTtcbiAgICAgIC8vb3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLndpZHRoKi40O1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBwYW5lbC53aWR0aCgpKi40O1xuICB9XG4gIC8vcGFuZWwud2lkdGgob3B0aW9ucy53aWR0aCkuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcbiAgcGFuZWwuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcblxuICB2YXIgY2hhcnQ7XG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIG9wdGlvbnMuZGlzcGxheUFubm90YXRpb25zID0gdHJ1ZTtcbiAgICAgIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkFubm90YXRlZFRpbWVMaW5lKHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgICAgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICAgICAgLy9jaGFydCA9IG5ldyBnb29nbGUuY2hhcnRzLkxpbmUocGFuZWxbMF0pO1xuICAgICAgLy9jaGFydC5kcmF3KGR0LCBnb29nbGUuY2hhcnRzLkxpbmUuY29udmVydE9wdGlvbnMob3B0aW9ucykpO1xuICB9XG5cbiAgY2hhcnRzLnB1c2goe1xuICAgIGR0IDogZHQsXG4gICAgY2hhcnQgOiBjaGFydCxcbiAgICBvcHRpb25zIDogb3B0aW9uc1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVkcmF3Q2hhcnRzKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKyApIHtcbiAgICBjaGFydHNbaV0uY2hhcnQuZHJhdyhjaGFydHNbaV0uZHQsIGNoYXJ0c1tpXS5vcHRpb25zKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0QXBwIDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH0sXG4gICAgaW5pdCA6IGluaXQsXG4gICAgc2V0RGF0YSA6IHNldERhdGEsXG4gICAgc2VsZWN0IDogc2VsZWN0LFxuICAgIHVuc2VsZWN0IDogdW5zZWxlY3QsXG4gICAgc2VsZWN0QWxsIDogc2VsZWN0QWxsLFxuICAgIHVuc2VsZWN0QWxsIDogdW5zZWxlY3RBbGwsXG4gICAgdXBkYXRlQ2hhcnRzIDogdXBkYXRlQ2hhcnRzLFxuICAgIHJlbW92ZSA6IHJlbW92ZSxcbiAgICBzaG93UG9wdXA6IHNob3dQb3B1cCxcbiAgICBoaWRlUG9wdXA6IGhpZGVQb3B1cCxcbiAgICByZXNpemUgOiByZXNpemVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5wdXRzIDoge1xuICAgIHdlYXRoZXIgOiBbJ21vbnRoJywndG1pbicsJ3RtYXgnLCd0ZG1lYW4nLCdwcHQnLCdyYWQnLCdkYXlsaWdodCddXG4gIH0sXG4gIG91dHB1dHMgOiBbJ1ZQRCcsJ2ZWUEQnLCdmVCcsJ2ZGcm9zdCcsJ1BBUicsJ0ludGNwdG4nLCdBU1cnLCdDdW1JcnJpZycsXG4gICAgICAgICAgICAgJ0lycmlnJywnU3RhbmRBZ2UnLCdMQUknLCdDYW5Db25kJywnVHJhbnNwJywnRVRyJywnS2MnLCdmU1cnLCdmQWdlJyxcbiAgICAgICAgICAgICAnUGh5c01vZCcsJ3BSJywncFMnLCdsaXR0ZXJmYWxsJywneFBQJywnTlBQJywnV0YnLCdXUicsJ1dTJywnVyddLFxuICBkZWJ1ZyA6IGZhbHNlLFxuICBkZXZtb2RlIDogZmFsc2UsXG4gIC8vIHRoZXNlIHZhcmlhYmxlcywgd2hlbiBydW4gd2l0aCBtdWx0aXBsZSBkaWZmZXJlbnQgdGltZSBzdGVwcywgd2lsbCBkcmF3XG4gIC8vIGFnZ3JlZ2F0ZSB2YWx1ZXMgdG8gZ3JlYXRlc3Qgc3RlcC5cbiAgLy8gRXg6IDEgYW5kIDMwIGRheXMgZ2l2ZW4uICBXaWxsIGNoYXJ0IGV2ZXJ5IDMwIGRheXMgd2l0aCB2YWx1ZSBvZiBldmVyeSAzMHRoXG4gIC8vIGRheSBtdWx0aXBsaWVkIGJ5IDMwIGZvciB0aGUgZGFpbHkgc3RlcCBydW4uXG4gIHNwcmVhZCA6IFsneFBQJywgJ05QUCcsICdQQVInLCdJcnJpZycsICdUcmFuc3AnLCdFVHInLCdsaXR0ZXJmYWxsJ10sXG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJzdGFjay9mbGFzaGJsb2NrLWRldGVjdG9yXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2FsbGJhY2tNZXRob2Qpe1xuICAgIHZhciByZXR1cm5fdmFsdWUgPSAwO1xuXG4gICAgaWYobmF2aWdhdG9yLnBsdWdpbnNbXCJTaG9ja3dhdmUgRmxhc2hcIl0pIHtcbiAgICAgICAgICBlbWJlZF9sZW5ndGggPSAkKCdlbWJlZCcpLmxlbmd0aDtcbiAgICAgICAgICBvYmplY3RfbGVuZ3RoID0gJCgnb2JqZWN0JykubGVuZ3RoO1xuXG4gICAgICAgICAgaWYoKGVtYmVkX2xlbmd0aCA+IDApIHx8IChvYmplY3RfbGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gQ2hyb21lIHVzaW5nIEZsYXNoQmxvY2sgKyBNYWMgLyBTYWZhcmkgdXNpbmcgQWRCbG9jayAqL1xuICAgICAgICAgICAgICAkKCdvYmplY3QsIGVtYmVkJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gRmlyZWZveCB1c2luZyBGbGFzaEJsb2NrICovXG4gICAgICAgICAgICAgIGlmKCAkKCdkaXZbYmdpbmFjdGl2ZV0nKS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgfSBlbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpID4gLTEpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBJZiBmbGFzaCBpcyBub3QgaW5zdGFsbGVkICovXG4gICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMTtcbiAgICB9XG5cbiAgICBpZihjYWxsYmFja01ldGhvZCAmJiB0eXBlb2YoY2FsbGJhY2tNZXRob2QpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjYWxsYmFja01ldGhvZChyZXR1cm5fdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbiAgICB9XG59O1xuIiwiLypcbiAqIFNhdmUgdG8gZ29vZ2xlIGRyaXZlIChleHBvcnQgYXMgQ1NWKVxuICovXG5cbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBfc2V0TWVzc2FnZShudWxsKTtcblxuICAgICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKFwiM1BHIE1vZGVsIFJlc3VsdHMgKFwiK25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULywnICcpLnJlcGxhY2UoL1xcLlxcZCpaLywnJykrXCIpXCIpO1xuICAgICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TWVzc2FnZShtc2csIHR5cGUsIHByb2dyZXNzKSB7XG4gIGlmKCAhbXNnICkge1xuICAgIHJldHVybiAkKFwiI2V4cG9ydC1tc2dcIikuaGlkZSgpO1xuICB9XG4gICQoXCIjZXhwb3J0LW1zZ1wiKS5zaG93KCk7XG5cbiAgaWYoIHByb2dyZXNzICkge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLmhpZGUoKTtcbiAgfVxuXG4gICQoJyNleHBvcnQtbXNnJykuYXR0cihcImNsYXNzXCIsJ2FsZXJ0IGFsZXJ0LScrdHlwZSk7XG4gICQoJyNleHBvcnQtbXNnLXRleHQnKS5odG1sKG1zZyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVQcm9ncmVzcyhpbmRleCwgdG90YWwpIHtcbiAgcGVyY2VudCA9IDEwMCAqICggaW5kZXggLyB0b3RhbCApO1xuICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3MtYmFyXCIpLmF0dHIoXCJhcmlhLXZhbHVlbm93XCIsIHBlcmNlbnQpLmNzcyhcIndpZHRoXCIscGVyY2VudCtcIiVcIik7XG59XG5cbi8vIHNlZSBpZiBhbiBlcnJvciBleGlzdHMsIGlmIHNvLCBzZXQgc3RhdGVcbmZ1bmN0aW9uIF9jaGVja0Vycm9yKGZpbGUpIHtcbiAgdmFyIGVycm9yTWVzc2FnZSA9IG51bGw7XG4gIGlmKCAhZmlsZSApIGVycm9yTWVzc2FnZSA9IFwiRXJyb3IgY3JlYXRpbmcgZmlsZSBvbiBHb29nbGUgRHJpdmUgOihcIjtcbiAgaWYoIGZpbGUuZXJyb3IgKSBlcnJvck1lc3NhZ2UgPSBmaWxlLm1lc3NhZ2U7XG5cbiAgaWYoIGVycm9yTWVzc2FnZSApIHtcbiAgICBfc2V0TWVzc2FnZShlcnJvck1lc3NhZ2UsIFwiZGFuZ2VyXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4gIC8vIGV4cG9ydCBhcyBjc3ZcbmZ1bmN0aW9uIHJ1bihyZXN1bHRzKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2V4cG9ydC1kcml2ZS1jc3YnLCAxKTtcblxuICAkKFwiI2V4cG9ydC1jc3ZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0aW5nLi4uXCIpO1xuXG4gIHZhciBuYW1lID0gJChcIiNleHBvcnQtbmFtZVwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09PSAwICkge1xuICAgIF9zZXRNZXNzYWdlKFwiUGxlYXNlIHByb3ZpZGUgYSBmb2xkZXIgbmFtZVwiLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzdWx0cy5kYXRhO1xuXG4gIC8vIGNyZWF0ZSBhIGxpc3Qgc28gd2UgY2FuIHJlY3Vyc2l2ZWx5IGl0ZXJhdGVcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSBrZXlzLnB1c2goa2V5KTtcblxuICAvLyBjcmVhdGUgZm9sZGVyXG4gIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgZXhwb3J0IGZvbGRlci4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gIF91cGRhdGVQcm9ncmVzcygxLCBrZXlzLmxlbmd0aCsyKTtcbiAgZ2RyaXZlLnNhdmVGaWxlKG5hbWUsXCJBSEIgM1BHIE1vZGVsIFJlc3VsdHNcIixcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIixcIlwiLGZ1bmN0aW9uKGZpbGUpe1xuICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICB2YXIgcGFyZW50ID0gZmlsZS5pZDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMiwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAvLyBjcmVhdGUgYSBuaWNlIGZpbGUgZGVzY3JpYmluZyB0aGUgY3VycmVudCBleHBvcnRcbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGNvbmZpZyBmaWxlLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBkZWxldGUgcmVzdWx0cy5jb25maWcucGxhbnRhdGlvbl9zdGF0ZTtcbiAgICB2YXIgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5jb25maWcsbnVsbCxcIiAgXCIpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShcImNvbmZpZy50eHRcIixcIkFIQiAzUEcgTW9kZWwgLSBSdW4gQ29uZmlndXJhdGlvblwiLFwidGV4dC9wbGFpblwiLGNvbmZpZyxmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICAgIF91cGRhdGVQcm9ncmVzcygzLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgX2NyZWF0ZUV4cG9ydCgwLCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se3BhcmVudDogcGFyZW50fSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCkge1xuXG4gIC8vIHdlIGFyZSBhbGwgZG9uZSA6KVxuICBpZiggaW5kZXggPT0ga2V5cy5sZW5ndGggKSB7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDEsIDEpO1xuICAgIF9zZXRNZXNzYWdlKFwiRXhwb3J0IFN1Y2Nlc3NmdWwuPGJyIC8+PGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tLyNmb2xkZXJzL1wiICsgcGFyZW50ICtcbiAgICAgICAgICBcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWV4dGVybmFsLWxpbmstc2lnbic+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gIH0gZWxzZSB7XG5cbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgdmFyIGNzdiA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggYW5kIGRhdGVcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YVtrZXldLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGRhdGFba2V5XVtpXS5sZW5ndGggPT09IDAgKSBjb250aW51ZTsgLy8gaWdub3JlIHRoZSBibGFuayByb3dzXG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZGF0YVtrZXldW2ldLmxlbmd0aDsgaisrICkgY3N2ICs9IGRhdGFba2V5XVtpXVtqXStcIixcIjtcbiAgICAgIGNzdiA9IGNzdi5yZXBsYWNlKC8sJC8sJycpK1wiXFxuXCI7XG4gICAgfVxuXG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBcIitrZXlzW2luZGV4XStcIi5jc3YuLi4gXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoa2V5c1tpbmRleF0rXCIuY3N2XCIsXCJcIixcInRleHQvY3N2XCIsY3N2LGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuXG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgrNCwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIGluZGV4Kys7XG4gICAgICBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se2NvbnZlcnQ6IHRydWUsIHBhcmVudDogcGFyZW50fSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1biA6IHJ1bixcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgT2F1dGggPSByZXF1aXJlKCcuLi9vYXV0aCcpO1xudmFyIGdkcml2ZVJUID0gcmVxdWlyZSgnLi9yZWFsdGltZScpO1xudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuLi9tb2RlbFJ1bkhhbmRsZXInKTtcbnZhciBhcHA7XG5cblxudmFyIE1JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcucnVuXCI7XG52YXIgVFJFRV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnRyZWVcIjtcbnZhciBEUklWRV9BUElfVkVSU0lPTiA9IFwidjJcIjtcblxuLy8gZ29vZ2xlIG9hdXRoIGFjY2VzcyB0b2tlblxudmFyIHRva2VuID0gXCJcIjtcblxuLy8gY3VycmVudGx5IGxvYWRlZCBnZHJpdmUgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIGZpbGVzIChtZXRhZGF0YSlcbnZhciBmaWxlTGlzdCA9IFtdO1xuLy8gZ29vZ2xlIGRyaXZlIHNoYXJlIGNsaWVudFxudmFyIGNsaWVudCA9IG51bGw7XG5cbi8vIGxvYWRlZCB0cmVlIGFuZCBtYW5hZ2VtZW50XG52YXIgbG9hZGVkVHJlZSA9IG51bGw7XG4vLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgdHJlZSBmaWxlcyAobWV0YWRhdGEpXG52YXIgdHJlZUxpc3QgPSBbXTtcblxuLy8gY3VycmVudCBNSU1FIFRZUEUgd2UgYXJlIHNhdmluZ1xudmFyIHNhdmVNaW1lVHlwZSA9IFwiXCI7XG5cbmZ1bmN0aW9uIHNldEFwcChhKSB7XG4gIGFwcCA9IGE7XG4gIGdkcml2ZVJULnNldEFwcChhcHApO1xufVxuXG4vKioqXG4gKiAgSW5pdGlhbGl6ZSBnb29nbGUgZHJpdmUgcGFuZWxzLCBidG5zIGFuZCBsb2dpblxuICoqKi9cbmZ1bmN0aW9uIGluaXQoY2FsbGJhY2spIHtcbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyBzZXQgdGhlICd1cGRhdGUnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS11cGRhdGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF91cGRhdGVDdXJyZW50RmlsZSgpO1xuICB9KTtcblxuICAvLyBzZXQgdGhlICduZXcnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS1uZXctYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF9zYXZlTmV3RmlsZSgpO1xuICB9KTtcblxuICAvLyBjcmVhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gIF9jcmVhdGVMb2dpbkJ0bigpO1xuXG4gIC8vIGxvYWQgdGhlIGdvb2dsZSBhdXRoIGFuZCBkcml2ZSBhcGknc1xuICBfbG9hZEFwaShmdW5jdGlvbigpIHtcbiAgICAvLyBpZiB0aGUgdXNlciBpcyBhdXRob3JpemVkIGdyYWIgdGhlIHJlZnJlc2ggdG9rZW5cbiAgICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24ocmVmcmVzaFRva2VuKXtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHJlZnJlc2ggdG9rZW4sIGxlYXZlLCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgIGlmKCAhcmVmcmVzaFRva2VuICkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgYSByZWZlc2ggdG9rZW4sIHRoZW4gdXNlciBpcyBhbGwgc2V0LFxuICAgICAgLy8gZ2V0IGEgbmV3IGFjY2VzcyB0b2tlbiBzbyB3ZSBjYW4gc3RhcnQgdXNpbmcgdGhlIGFwaSdzXG4gICAgICAvLyBncmFiIHRoZWlyIGluZm9ybWF0aW9uIGFuZCBkaXNwbGF5XG4gICAgICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KXtcbiAgICAgICAgdG9rZW4gPSB0O1xuICAgICAgICBpZiggdG9rZW4gKSBfc2V0VXNlckluZm8oKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBfY2hlY2tUb2tlbigpO1xuICAgIH0sIDEwMDAgKiA1ICogNjApO1xuICB9KTtcblxuICAvLyBzZXR1cCB0aGUgdHJlZSAnc2hhcmUnIGJ0blxuICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgLy8gc2VlIGlmIHdlIGhhdmUgYSBzaGFyZSBjbGllbnRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBubyBjbGllbnQsIGxvYWQgYXBpXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gb24gbG9hZCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCB0aGUgY3VycmVudCB0cmVlXG4gICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZFRyZWVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2UgaGF2ZSBhIGNsaWVudCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCBjdXJyZW50IHRyZWVcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxufVxuXG4vKioqXG4gKiBTYXZlIHRoZSBjdXJyZW50IG1vZGVsIGFzIGEgbmV3IGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3NhdmVOZXdGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzYXZlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBncmFiIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmlsZVxuICB2YXIgbmFtZSA9ICQoXCIjc2F2ZS1uYW1lLWlucHV0XCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHsgLy8gd2UgYWx3YXlzIHdhbnQgYSBuYW1lLCBhbGVydCBhbmQgcXVpdFxuICAgIF9zZXRTYXZlTWVzc2FnZSgnUGxlYXNlIHByb3ZpZGUgYSBmaWxlbmFtZS4nLCdpbmZvJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2VlIHdoYXQga2luZCBvZiBmaWxlIHdlIGFyZSBjcmVhdGluZyBiYXNlZCBvbiB0aGUgc2F2ZU1pbWVUeXBlIHZhclxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IG1vZGVsSU8uZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gU2F2aW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgLy8gc2F2ZSB0aGUgZmlsZVxuICBzYXZlRmlsZShuYW1lLFxuICAgICAgJChcIiNzYXZlLWRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbCgpLFxuICAgICAgc2F2ZU1pbWVUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byBzYXZlIHRvIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnU3VjZXNzZnVsbHkgc2F2ZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHRvIGhpZGUgdGhlIHBvcHVwLCBzbyB1c2VyIHNlZXMgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBmaWxlLCB1cGRhdGUgb3VyIGxpc3RcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrcmVzcC5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgICAgIGxvYWRlZEZpbGUgPSByZXNwLmlkO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyB0cmVlLCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVzXG4gICAgICAgICAgbG9hZGVkVHJlZSA9IHJlc3AuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBjdXJyZW50bHkgbG9hZGVkIGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUN1cnJlbnRGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1cGRhdGUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBVcGRhdGluZy4uLicsJ2luZm8nKTtcblxuICB2YXIgZmlsZSA9IHt9O1xuICB2YXIgZGF0YSA9IHt9O1xuXG4gIC8vIGdyYWIgdGhlIGNvcnJlbnQgZGF0YSBhbmQgZmlsZWlkIGJhc2VkIG9uIG1pbWVUeXBlXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRGaWxlO1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkVHJlZTtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgdXBkYXRlRmlsZShmaWxlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHVwZGF0ZSBvbiBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1VwZGF0ZSBTdWNjZXNzZnVsLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB0aGUgdXNlciBrbm93cyB1cGRhdGUgd2FzIHN1Y2Nlc3NcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBmb3Igd2hhdGV2ZXIgdHlwZSB3YXMgdXBkYXRlZFxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cC5cbiAqICB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRMb2FkTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1maWxlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdzYXZlIHRvIGRyaXZlJyBwb3B1cFxuICogdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0U2F2ZU1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLXNhdmUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtc2F2ZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUuIFRoaXMgbWVudSBpcyBmb3Igd2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ2luQnRuKCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj5Mb2dpbjxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9naW4td2l0aC1nb29nbGVcIj48aSBjbGFzcz1cImljb24tc2lnbmluXCI+PC9pPiBMb2dpbiB3aXRoIEdvb2dsZTwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGxvZ2luIGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNsb2dpbi13aXRoLWdvb2dsZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dpbicsIDEpO1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgX3NldFVzZXJJbmZvKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiBDcmVhdGUgdGhlIHRvcCByaWdodCBtZW51IGZvciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dvdXRCdG4odXNlcmRhdGEpIHtcbiAgLy8gc2V0IGJ0biBodG1sXG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPjxpbWcgY2xhc3M9XCJpbWctcm91bmRlZFwiIHNyYz1cIicrdXNlcmRhdGEucGljdHVyZVxuICAgICAgKyAnXCIgc3R5bGU9XCJtYXJnaW46LTVweCA1cHggLTVweCAwO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7Ym9yZGVyOjFweCBzb2xpZCB3aGl0ZVwiIC8+ICcgKyB1c2VyZGF0YS5uYW1lXG4gICAgICArICc8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJzYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtYnRuXCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwib3Blbi1pbi1kcml2ZVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiaWNvbi1leHRlcm5hbC1saW5rLXNpZ25cIj48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dvdXRcIj48aSBjbGFzcz1cImljb24tc2lnbm91dFwiPjwvaT4gTG9nb3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIHRvIHNob3cgbWVudVxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICBidG4uZmluZCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgc2F2ZSBtaW1lVHlwZVxuICAgIHNhdmVNaW1lVHlwZSA9IE1JTUVfVFlQRTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgdHlwIHRoZXkgYXJlIHNhdmluZ1xuICAgICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBNb2RlbDwvaDU+XCIpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBpZiB0aGUgZmlsZSBpcyBsb2FkZWQsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgIGlmKCBsb2FkZWRGaWxlICE9IG51bGwpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGN1cnJlbnQgZmlsZXMgbWV0YWRhdGFcbiAgICAgIHZhciBmaWxlID0ge307XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggZmlsZUxpc3RbaV0uaWQgPT0gbG9hZGVkRmlsZSkge1xuICAgICAgICAgIGZpbGUgPSBmaWxlTGlzdFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgICAvLyByZW5kZXIgdGhlIGZpbGVzIG1ldGFkYXRhIGluIHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgIHZhciBkID0gbmV3IERhdGUoZmlsZS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrZmlsZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrZmlsZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrZmlsZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK2ZpbGUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBcIiArXG4gICAgICAgICAgXCJMaW5rIHRvIFNoYXJlPC9hPiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+KG11c3QgaGF2ZSBwZXJtaXNzaW9uKTwvc3Bhbj48YnIgLz48YnIgLz5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBjbGljayBoYW5kbGVyIGZvciBzaGFyZSBidG5cbiAgYnRuLmZpbmQoXCIjc2hhcmUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnb3Blbi1kcml2ZS1zaGFyZScsIDEpO1xuXG4gICAgLy8gaGFzIHRoZSBzaGFyZSBjbGllbnQgYmVlbiBsb2FkZWRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBsb2FkIHRoZSBzaGFyZSBwb3B1cFxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2hvdyBhYm91dCBwYW5lbFxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwYW5lbFxuICBidG4uZmluZCgnI2xvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGhpZGUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyByZW5kZXIgdGhlIG1vZGVsIGZpbGVzIGluIHRoZSBwb3B1cCBmaWxlc1xuICAgIF9zaG93RHJpdmVGaWxlcygpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9kYWxcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gbG9hZCB0aGUgdXNlciBvdXRcbiAgYnRuLmZpbmQoJyNsb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ291dCcsIDEpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBraWxsIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICB0b2tlbiA9IG51bGw7XG5cbiAgICAvLyB1cGRhdGUgdGhlIG1lbnUgcGFuZWxcbiAgICBfY3JlYXRlTG9naW5CdG4oKTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHRoZSBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiAgUmVxdWVzdCB0aGUgdXNlcidzIGluZm9ybWF0aW9uLiAgV2hlbiBsb2FkZWQsIHVwZGF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAqKiovXG5mdW5jdGlvbiBfc2V0VXNlckluZm8oKSB7XG4gIC8vIGxvYWQgdXNlciBuYW1lXG4gICQuYWpheCh7XG4gICAgdXJsIDogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdXNlcmluZm9cIixcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gYWx3YXlzIHNldCB5b3VyIGFjY2VzcyBzdG9rZW5cbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLHhocikge1xuICAgICAgLy8gcGFyc2UgeW91ciBqc29uIHJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIC8vIHVwZGF0ZSB0b3AgcmlnaHQgbWVudVxuICAgICAgX2NyZWF0ZUxvZ291dEJ0bihkYXRhKTtcblxuICAgICAgLy8gc2V0IHRvIHdpbmRvdyBzY29wZVxuICAgICAgd2luZG93LnVzZXJpbmZvID0gZGF0YTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUT0RPOiBzaG91bGQgd2UgYWxlcnQgdGhpcz9cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGxvYWQgdXNlciBmaWxlcywgdHJlZXNcbiAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gIF91cGRhdGVUcmVlTGlzdCgpO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgbW9kZWxzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUZpbGVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitNSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIGZpbGVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgdHJlZXNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlVHJlZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK1RSRUVfTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICB0cmVlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCBtb2RlbHMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd0RyaXZlRmlsZXMoKSB7XG4gIC8vIGlmIHRoZXkgaGF2ZSBubyBmaWxlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICFmaWxlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuICBpZiggZmlsZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcblxuICAvLyBzaG93IGEgdGl0bGUsIHRoZXJlIGFyZSBtdWx0aXBsZSB0eXBlcyB0aGF0IGNhbiBiZSBsb2FkZWQgZnJvbSBkcml2ZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxoND5TZWxlY3QgRmlsZTwvaDQ+XCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgbGlzdCBlbGVtZW50cyBmb3IgZWFjaCBmaWxlcyBtZXRhZGF0YVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gZmlsZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1maWxlJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBlYWNoIGZpbGVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLW1vZGVsJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGdyYWIgdGhlIGZpdmUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIGhpZGUgYW55IGxvYWRlZCB0cmVlcyxcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuaGlkZSgpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoXCJcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgbG9hZGVkVHJlZSA9IG51bGw7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBhbGwgZ29vZFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdGaWxlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgIGxvYWRlZEZpbGUgPSBpZDtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBuYW1lXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggaWQgPT0gZmlsZUxpc3RbaV0uaWQgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIitmaWxlTGlzdFtpXS50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIitpZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBzZXR1cCBtb2RlbFxuICAgICAgbW9kZWxJTy5sb2FkU2V0dXAoaWQsIGZpbGUpO1xuXG4gICAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyBoaWRlIHRoZSBtb2RhbFxuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgdHJlZXMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd1RyZWVGaWxlcygpIHtcbiAgLy8gdXBkYXRlIHRoZSBsaXN0IGhlYWRlciwgbGV0IHVzZXIga25vdyB3aGF0IHRoZXkgYXJlIHNlbGVjdGluZ1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIlwiKTtcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxoNT5TZWxlY3QgVHJlZTwvaDU+PC9saT5cIikpO1xuXG4gIC8vIGlmIHRoZXJlIGFyZSBubyB0cmVlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICF0cmVlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuICBpZiggdHJlZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcblxuICAvLyBjcmVhdGUgdGhlIHRyZWUgbGlzdCBlbGVtZW50c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdHJlZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIG5hbWU9J1wiK2l0ZW0udGl0bGUrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1sZWFmJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciB0aXRsZXNcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLXRyZWUnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcblxuICAgIC8vIHRlbGwgdGhlIHVzZXIgd2UgYXJlIGxvYWRpbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBUcmVlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gbG9hZCBmaWxlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmluZyBidG5zXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIHN1Y2Nlc2Z1bGxcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnVHJlZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgICBsb2FkZWRUcmVlID0gaWQ7XG5cbiAgICAgIC8vIGxvYWRlZCB0cmVlIGludG8gbW9kZWwgLyBVSVxuICAgICAgbW9kZWxJTy5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHNlYyBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIGxvYWQgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dMb2FkVHJlZVBhbmVsKCkge1xuICAvLyByZW5kZXIgdGhlIHRyZWVzIGludG8gdGhlIHBvcHVwIGxpc3RcbiAgX3Nob3dUcmVlRmlsZXMoKTtcbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VzXG4gIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBzYXZlIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93U2F2ZVRyZWVQYW5lbCgpIHtcbiAgLy8gc2V0IHRoZSBjdXJyZW50IG1pbWVUeXBlIHdlIGFyZSBzYXZpbmdcbiAgc2F2ZU1pbWVUeXBlID0gVFJFRV9NSU1FX1RZUEU7XG5cbiAgLy8gc2V0IHRoZSBoZWFkZXIgc28gdXNlciBrbm93cyB3aGF0IHR5cGUgdGhleSBhcmUgc2F2aW5nXG4gICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBUcmVlPC9oNT5cIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHRyZWUsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICBpZiggbG9hZGVkVHJlZSAhPSBudWxsKSB7XG4gICAgLy8gZmluZCB0aGUgY3VycmVudCB0cmVlIGJhc2VkIG9uIGlkXG4gICAgdmFyIHRyZWUgPSB7fTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRyZWVMaXN0W2ldLmlkID09IGxvYWRlZFRyZWUpIHtcbiAgICAgICAgdHJlZSA9IHRyZWVMaXN0W2ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgIC8vIHJlbmRlciB0cmVlIG1ldGFkYXRhIG9uIHVwZGF0ZSBwYW5lbFxuICAgIHZhciBkID0gbmV3IERhdGUodHJlZS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK3RyZWUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIit0cmVlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK3RyZWUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrdHJlZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBkb24ndCBzaG93IHRoZSB1cGRhdGUgcGFuZWwsIHRoaXMgaXMgYSBuZXcgdHJlZVxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiBMb2FkIGEgbW9kZWwgYmFzZWQgb24gcGFzc2VkIGlkLiAgVGhpcyBmdW5jdGlvbiBpcyByZWFsbHkgb25seSBmb3IgbG9hZGluZyBtb2RlbCBvbiBzdGFydCwgd2hlbiBhIGZpbGUgaWRcbiAqIGhhcyBiZWVuIHBhc3NlZCBpbiB0aGUgdXJsIGVpdGhlciBmcm9tIGdvb2dsZSBkcml2ZSBvciBmcm9tIHRoZSA/ZmlsZT1pZCB1cmwuXG4gKioqL1xudmFyIGxvZ2luTW9kYWxJbml0ID0gZmFsc2U7XG5mdW5jdGlvbiBsb2FkKGlkLCBsb2FkRm4pIHtcblxuICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFuIGFjY2VzcyB0b2tlbiwgd2UgbmVlZCB0byBzaWduIGluIGZpcnN0XG4gIC8vIFRPRE86IGlmIHRoaXMgaXMgYSBwdWJsaWMgZmlsZSwgdGhlcmUgaXMgbm8gcmVhc29uIHRvIHNpZ24gaW4uLi4gc29sdXRpb24/XG4gIGlmKCAhdG9rZW4gKSB7XG5cbiAgICBpZiggIWxvZ2luTW9kYWxJbml0ICkge1xuICAgICAgJCgnI2dvb2dsZS1tb2RhbC1sb2dpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIHNpZ24gdGhlIHVzZXIgaW4gKGZvcmNlIG9hdXRoIHBvcHVwKVxuICAgICAgICBzaWduSW4oZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSB1c2VyIGluZm9ybWF0aW9uIGluIHRvcCBsZWZ0XG4gICAgICAgICAgX3NldFVzZXJJbmZvKCk7XG5cbiAgICAgICAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICAgICAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgICAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoKTtcbiAgICAgIGxvZ2luTW9kYWxJbml0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqKlxuICogSW5pdGlhbGl6ZSBVSSAvIG1vZGVsIHdoZW4gYSBmaWxlIGlzIGxvYWRlZCBhdCBzdGFydFxuICoqKi9cbmZ1bmN0aW9uIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLCBmaWxlKSB7XG4gIC8vIGJhZGRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICBpZiggIWZpbGUgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkZhaWxlZCB0byBsb2FkIGZyb20gR29vZ2xlIERyaXZlIDovXCIpO1xuICB9XG5cbiAgLy8gbWV0YWRhdGEgZmFpbGVkIHRvIGxvYWQsIG1vcmUgYmFkbmVzc1xuICBpZiggbWV0YWRhdGEuY29kZSA9PSA0MDQgKSB7XG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIHJldHVybiBhbGVydChcIkdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWVzc2FnZSk7XG4gIH1cblxuICAvLyB3ZSBsb2FkZWQgYSBtb2RlbCwgc2V0dXAgYW5kIHJ1blxuICBpZiggbWV0YWRhdGEubWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudGx5IGxvYWRlZCBmaWxlIGlkXG4gICAgbG9hZGVkRmlsZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK21ldGFkYXRhLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAvLyBzaG93IHRpdGxlXG4gICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIittZXRhZGF0YS50aXRsZSk7XG5cbiAgICAvLyBzZXR1cCBtb2RlbFxuICAgIG1vZGVsSU8ubG9hZFNldHVwKG1ldGFkYXRhLmlkLCBmaWxlKTtcblxuICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcbiAgfSBlbHNlIGlmICggbWV0YWRhdGEubWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7IC8vIHdlIGxvYWRlZCBhIHRyZWVcbiAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgbG9hZGVkVHJlZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobWV0YWRhdGEudGl0bGUpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVcbiAgICBtb2RlbElPLmxvYWRUcmVlKGZpbGUpO1xuXG4gICAgLy8gaGlkZSB0aGUgbG9hZGluZyBwb3B1cFxuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcIkxvYWRlZCB1bmtub3duIGZpbGUgdHlwZSBmcm9tIEdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWltZVR5cGUpO1xuICB9XG59XG5cbi8qKipcbiAqIHRva2VucyBleHBpcmUsIGV2ZXJ5IG9uY2UgaW4gYXdoaWxlIGNoZWNrIHRoZSBjdXJyZW50IHRva2VuIGhhc24ndFxuICogaWYgaXQgaGFzLCB0aGVuIHVwZGF0ZVxuICoqKi9cbmZ1bmN0aW9uIF9jaGVja1Rva2VuKCkge1xuICAvLyBpZ25vcmUgaWYgdGhlcmUgaXMgbm8gdG9rZW5cbiAgaWYgKCF0b2tlbikgcmV0dXJuO1xuXG4gIC8vIG90aGVyd2lzZSwgbG9vayB0byB1cGRhdGUgdGhlIGFjY2VzcyB0b2tlblxuICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KSB7XG4gICAgaWYoIHQgIT0gbnVsbCApIHRva2VuID0gdDtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBpcyB0aGUgY3VycmVudCB1c2VyIHNpZ25lZCBpbj9cbiAqKiovXG5mdW5jdGlvbiBjaGVja1NpZ25lZEluKGNhbGxiYWNrKSB7XG4gIC8vIGlmIGlzQXV0aGVyaXplZCByZXR1cm5zIGEgdG9rZW4sIHVzZXIgaXMgbG9nZ2VkIGluXG4gIE9hdXRoLmlzQXV0aG9yaXplZChmdW5jdGlvbih0b2tlbil7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIGNhbGxiYWNrKHRydWUpO1xuICAgIGVsc2UgY2FsbGJhY2soZmFsc2UpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIFNpZ24gYSB1c2VyIGluIHVzaW5nIHRoZSBPYXV0aCBjbGFzc1xuICoqKi9cbmZ1bmN0aW9uIHNpZ25JbihjYWxsYmFjaykge1xuICBPYXV0aC5hdXRob3JpemUoZnVuY3Rpb24odCl7XG4gICAgdG9rZW4gPSB0O1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICBpZiggdC5lcnJvciApIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgIH1cbiAgfSlcbn07XG5cbi8qKipcbiAqIEFjY2VzcyBtZXRob2QgZm9yIHRva2VuXG4gKioqL1xuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIHJldHVybiB0b2tlbjtcbn07XG5cbi8qKipcbiAqIExvYWQgdGhlIGdvb2dsZSBkcml2ZSBhcGkgY29kZVxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkQXBpKGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmxvYWQoXCJkcml2ZVwiLCBEUklWRV9BUElfVkVSU0lPTiwgZnVuY3Rpb24oKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBsaXN0IG9mIGZpbGUgbWV0YWRhdGEgZnJvbSBnb29nbGUgZHJpdmUgYmFzZWQgb24gcXVlcnlcbiAqKiovXG5mdW5jdGlvbiBsaXN0RmlsZXMocXVlcnksIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmxpc3Qoe1xuICAgIHEgOiBxdWVyeSArIFwiIGFuZCB0cmFzaGVkID0gZmFsc2VcIlxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBHZXQgYSBzaW5nbGUgZmlsZXMgbWV0YWRhdGEgYmFzZWQgb24gaWRcbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlTWV0YWRhdGEoaWQsIGNhbGxiYWNrKSB7XG4gIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmdldCh7XG4gICAgJ2ZpbGVJZCcgOiBpZFxuICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBjYWxsYmFjayhyZXNwKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiAgQWN0dWFsbHkgbG9hZCBhIGZpbGVzIGRhdGEuICBUaGUgdXJsIHRvIGRvIHRoaXMgaXMgcHJvdmlkZWQgaW4gYSBmaWxlcyBtZXRhZGF0YS5cbiAqKiovXG5mdW5jdGlvbiBnZXRGaWxlKGlkLCBkb3dubG9hZFVybCwgY2FsbGJhY2spIHtcbiAgJC5hamF4KHtcbiAgICB1cmwgOiBkb3dubG9hZFVybCxcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gc2V0IGFjY2VzcyB0b2tlbiBpbiBoZWFkZXJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAvLyBwYXJzZSB0aGUgcmVzcG9uc2UgKHdlIG9ubHkgc3RvcmUganNvbiBpbiB0aGUgZ29vZ2xlIGRyaXZlKVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBjYWxsYmFjayhkYXRhLCBpZCk7XG4gICAgfSxcbiAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmVcIlxuICAgICAgfSk7XG5cbiAgICB9XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2F2ZSBqc29uIHRvIGdvb2dsZSBkcml2ZVxuICoqKi9cbmZ1bmN0aW9uIHNhdmVGaWxlKG5hbWUsIGRlc2NyaXB0aW9uLCBtaW1lVHlwZSwganNvbiwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgaWYoICFvcHRpb25zICkgb3B0aW9ucyA9IHt9XG5cbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgJ3RpdGxlJyA6IG5hbWUsXG4gICAgJ2Rlc2NyaXB0aW9uJyA6IGRlc2NyaXB0aW9uLFxuICAgICdtaW1lVHlwZScgOiBtaW1lVHlwZVxuICB9O1xuXG4gIC8vIGlmIHdlIHdhbnQgdG8gc2F2ZSB0aGUgZmlsZSB0byBhIHNwZWNpZmllZCBmb2xkZXJcbiAgaWYoIG9wdGlvbnMucGFyZW50ICkge1xuICAgIG1ldGFkYXRhLnBhcmVudHMgPSBbe2lkOiBvcHRpb25zLnBhcmVudH1dO1xuICB9XG5cbiAgLy8gaWYgdGhlIGpzb24gaXMgcmVhbGx5IGFuIG9iamVjdCwgdHVybiBpdCB0byBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGpzb24gPT0gJ29iamVjdCcpIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICAvLyBkYXRhIG5lZWRzIHRvIGJlIGJhc2U2NCBlbmNvZGVkIGZvciB0aGUgUE9TVFxuICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoanNvbik7XG5cbiAgLy8gY3JlYXRlIG91ciBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9IGRlbGltaXRlclxuICAgICAgKyAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJ1xuICAgICAgKyBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSk7XG5cbiAgaWYoIGpzb24ubGVuZ3RoID4gMCApIHtcbiAgICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBkZWxpbWl0ZXIgKyAnQ29udGVudC1UeXBlOiAnXG4gICAgICArIG1pbWVUeXBlICsgJ1xcclxcbicgKyAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJ1xuICAgICAgKyAnXFxyXFxuJyArIGJhc2U2NERhdGE7XG4gIH1cbiAgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgKz0gY2xvc2VfZGVsaW07XG5cbiAgICAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgIC8vIGlmIHRoZSBvcHRpb25zLmNvbnZlcj10cnVlIGZsYWcgaXMgc2V0LCBnb29nbGUgYXR0ZW1wdHMgdG8gY29udmVydCB0aGUgZmlsZSB0b1xuICAgICAvLyBhIGdvb2dsZSBkb2MgZmlsZS4gIE1vc3RseSwgd2UgdXNlIHRoaXMgZm9yIGV4cG9ydGluZyBjc3YgLT4gR29vZ2xlIFNwcmVhZHNoZWV0c1xuICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICdwYXRoJyA6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzJyArICggb3B0aW9ucy5jb252ZXJ0ID8gJz9jb252ZXJ0PXRydWUnIDogJycpLFxuICAgICdtZXRob2QnIDogJ1BPU1QnLFxuICAgICdwYXJhbXMnIDoge1xuICAgICAgJ3VwbG9hZFR5cGUnIDogJ211bHRpcGFydCdcbiAgICB9LFxuICAgICdoZWFkZXJzJyA6IHtcbiAgICAgICdDb250ZW50LVR5cGUnIDogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgfSxcbiAgICAnYm9keScgOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keVxuICB9KTtcblxuICAvLyBzZW5kIHRoZSByZXF1ZXN0XG4gIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgaWYgKHJlc3AuaWQpXG4gICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICBlbHNlXG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHNhdmVcIlxuICAgICAgfSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogVXBkYXRlIGEgZmlsZSBiYXNlZCBvbiBpZCBhbmQgZ2l2ZW4ganNvbiBkYXRhXG4gKioqL1xuZnVuY3Rpb24gdXBkYXRlRmlsZShmaWxlSWQsIGpzb24sIGNhbGxiYWNrKSB7XG4gIC8vIHN0YXJ0IGNyZWF0aW5nIHRoZSBtdWx0aXBhcnQgUE9TVCByZXF1ZXN0XG4gIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgdmFyIG1ldGFkYXRhID0ge307XG5cbiAgLy8gc3RyaW5pZnkgdGhlbiBiYXNlNjQgZW5jb2RlIHRoZW4gb2JqZWN0XG4gICAgdmFyIGJhc2U2NERhdGEgPSBidG9hKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcblxuICAgIC8vIHNldCB1cCB0aGUgUE9TVCBib2R5XG4gICAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID1cbiAgICAgIGRlbGltaXRlciArXG4gICAgICAgICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nICtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpICtcbiAgICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogJyArIE1JTUVfVFlQRSArICdcXHJcXG4nICtcbiAgICAgICAgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbicgK1xuICAgICAgICAnXFxyXFxuJyArXG4gICAgICAgIGJhc2U2NERhdGEgK1xuICAgICAgICBjbG9zZV9kZWxpbTtcblxuICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAncGF0aCc6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzLycrZmlsZUlkLFxuICAgICAgICAnbWV0aG9kJzogJ1BVVCcsXG4gICAgICAgICdwYXJhbXMnOiB7J3VwbG9hZFR5cGUnOiAnbXVsdGlwYXJ0J30sXG4gICAgICAgICdoZWFkZXJzJzoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICAgICAgfSxcbiAgICAgICAgJ2JvZHknOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keX0pO1xuXG4gICAgLy8gc2V0IHJlcXVlc3RcbiAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCl7XG4gICAgICBpZiggcmVzcC5pZCApIHtcbiAgICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHVwZGF0ZVwiXG4gICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdydW4tbW9kZWwtcmVtb3RlJywgMSk7XG4gIGdkcml2ZVJULnJ1bk1vZGVsUnQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBjaGVja1NpZ25lZEluIDogY2hlY2tTaWduZWRJbixcbiAgc2lnbkluIDogc2lnbkluLFxuICBnZXRUb2tlbiA6IGdldFRva2VuLFxuICBsaXN0RmlsZXMgOiBsaXN0RmlsZXMsXG4gIGdldEZpbGVNZXRhZGF0YSA6IGdldEZpbGVNZXRhZGF0YSxcbiAgbG9hZCA6IGxvYWQsXG4gIHNhdmVGaWxlOiBzYXZlRmlsZSxcbiAgc2hvd0xvYWRUcmVlUGFuZWwgOiBzaG93TG9hZFRyZWVQYW5lbCxcbiAgc2hvd1NhdmVUcmVlUGFuZWwgOiBzaG93U2F2ZVRyZWVQYW5lbCxcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG4gIHNldEFwcCA6IHNldEFwcCxcblxuICBNSU1FX1RZUEUgOiBNSU1FX1RZUEVcbn07XG4iLCIvLyBSRUFMVElNRSAocnQpIE9iamVjdHNcbi8vIHJ0IGpzb24gZmllbGQsIHVzZWQgdG8gc2VuZCB1cGRhdGVzIHRvIHBlZXJzXG52YXIgcnRKc29uID0gbnVsbDtcbi8vIHJ0IGRvY3VtZW50XG52YXIgcnREb2MgPSBudWxsO1xuLy8gaGFzIHRoZSBydCBhcGkgYmVlbiBsb2FkZWQ/XG52YXIgX3J0TG9hZGVkID0gZmFsc2U7XG4vLyB0aW1lciB0byBidWZmZXIgdGhlIGZpcmluZyBvZiB1cGRhdGVzIGZyb20gcnQgZXZlbnRzXG52YXIgX3J0VGltZXIgPSAtMTtcblxuLy8gbGlzdCBvZiBjdXJyZW50IHJ0IGVkaXRzIHRvIGlucHV0IGZpbGVzXG52YXIgcnRFZGl0cyA9IHt9O1xuLy8gZ29vZ2xlIGRyaXZlIHJ0IG1vZGVsIC0gbWFwXG52YXIgbGl2ZUVkaXRzID0gbnVsbDtcbi8vIGxvY2FsIGxvY2sgb24gYW4gZWxlbWVudFxudmFyIGxvY2sgPSB7fTtcblxudmFyIGFwcDtcblxuLy8gbG9hZGVkIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlO1xuXG4vKioqXG4gKiBTZXR1cCB0aGUgcnQgYXBpIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhpcyB3aWxsIGFjdHVhbGx5IGxvYWQgdGhlIGFwaSBpZiBuZWVkZWRcbiAqKiovXG5mdW5jdGlvbiBpbml0UnRBcGkoZmlsZSkge1xuICBydEpzb24gPSBudWxsOyAvLyBraWxsIG9mZiBhbnkgb2xkIGxpc3RuZXJzXG4gIGxvYWRlZEZpbGUgPSBmaWxlO1xuXG4gIC8vIGNsb3NlIGFueSBvbGQgY29ubmVjdGlvblxuICBpZiggcnREb2MgKSBydERvYy5jbG9zZSgpO1xuXG4gIC8vIGdldCBvdXQgb2YgaGVyZSBpZiB3ZSBkb24ndCBoYXZlIGEgbG9hZGVkIGZpbGVcbiAgaWYoIGxvYWRlZEZpbGUgPT0gbnVsbCApIHJldHVybjtcblxuICAvLyBsb2FkIGFwaSBpZiBuZWVkZWRcbiAgaWYoICFfcnRMb2FkZWQgKSB7XG4gICAgZ2FwaS5sb2FkKCdkcml2ZS1yZWFsdGltZScsIGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzZXR1cCBydCBob29rc1xuICAgICAgX3J0TG9hZGVkID0gdHJ1ZTtcbiAgICAgIF9sb2FkUnRGaWxlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICBfbG9hZFJ0RmlsZSgpO1xuICB9XG5cbiAgLy8gc2V0dXAgaW5wdXQgaGFuZGxlcnNcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdmb2N1cycsZnVuY3Rpb24oZSl7XG4gICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgIF9zZXRMb2NhbExvY2soe1xuICAgICAgaWQgICAgICAgIDogZWxlLmF0dHIoXCJpZFwiKSxcbiAgICAgIHZhbHVlICAgICA6IGVsZS52YWwoKSxcbiAgICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICAgIH0pO1xuICB9KTtcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdibHVyJyxmdW5jdGlvbihlKXtcbiAgICBfcmVtb3ZlTG9jYWxMb2NrKCQoZS50YXJnZXQpLmF0dHIoXCJpZFwiKSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIHJldHVybjtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3VwZGF0ZUxvY2FsTG9jayhlbGUuYXR0cihcImlkXCIpLCBlbGUudmFsKCkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldExvY2FsTG9jayhsb2NrKSB7XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIG1hcmsgdGhlIGN1cnJlbnQgbG9ja1xuICBpZiggbGl2ZUVkaXRzLmhhc1tsb2NrLmlkXSApIHJldHVybjtcbiAgbGl2ZUVkaXRzLnNldChsb2NrLmlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2FsTG9jayhpZCwgdmFsKSB7XG4gIHZhciBsb2NrID0ge1xuICAgIGlkIDogaWQsXG4gICAgdmFsdWUgOiB2YWwsXG4gICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICB9XG5cbiAgbGl2ZUVkaXRzLnNldChpZCwgbG9jayk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVMb2NhbExvY2soaWQpIHtcbiAgbGl2ZUVkaXRzLmRlbGV0ZShpZCk7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVSZW1vdGVMb2NrKGxvY2spIHtcbiAgJChcIiNcIitsb2NrLmlkKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLnJlbW92ZSgpO1xuICBkZWxldGUgcnRFZGl0c1tsb2NrLmlkXTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnZhbChsb2NrLnZhbHVlKS5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICBpZiggJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikubGVuZ3RoID09IDAgKSB7XG4gICAgJChcIiNcIitsb2NrLmlkKS5wYXJlbnQoKS5hZnRlcihcIjxzcGFuIGlkPSdcIitsb2NrLmlkK1wiLWVkaXRpbmcnIGNsYXNzPSdsYWJlbCBsYWJlbC13YXJuaW5nJz48L3NwYW4+XCIpO1xuICB9XG4gICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmh0bWwobG9jay51c2VyKTtcbiAgcnRFZGl0c1tsb2NrLmlkXSA9IGxvY2s7XG59XG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgbGlzdCBvZiByZWFsdGltZSBlZGl0cyBhcyB3ZWxsIGFzIHRoZSBpbnB1dCBVSSBiYXNlZCBvbiB0aGUgcnREb2MgZXZlbnRcbiAqIFRPRE86IHRoaXMgaXMgYSBiaXQgbmFzdHkgcmlnaHQgbm93XG4gKiovXG5mdW5jdGlvbiBfdXBkYXRlUnRFZGl0cyhlKSB7XG4gIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG5cbiAgdmFyIGtleXMgPSBsaXZlRWRpdHMua2V5cygpO1xuXG4gIC8vIHJlbW92ZSBvbGQgdGltZXN0YW1wcyBUT0RPXG4gIC8qZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIG5vdyAtIHZhbHVlc1tpXS50aW1lc3RhbXAgPiAxMDAwICogNjAgKSB7XG4gICAgICBfcmVtb3ZlTG9jayh2YWx1ZXNbaV0pOyAvLyBkb2VzIHRoaXMgZmlyZSB1cGRhdGVzP1xuICAgIH1cbiAgfSovXG5cblxuICAvLyBzZXQgbmV3IGVkaXRzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICBfdXBkYXRlTG9jayhsaXZlRWRpdHMuZ2V0KGtleXNbaV0pKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBvbGQgZWRpdHNcbiAgZm9yKCB2YXIga2V5IGluIHJ0RWRpdHMgKSB7XG4gICAgaWYoIGtleXMuaW5kZXhPZihrZXkpID09IC0xICkge1xuICAgICAgX3JlbW92ZVJlbW90ZUxvY2socnRFZGl0c1trZXldKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqKlxuICogIFNldHVwIHRoZSBydCBob29rcyBmb3IgdGhlIGN1cnJlbnQgZmlsZS4gIFRoZSBhcGkgbmVlZHMgdG8gYWxyZWFkeSBiZSBsb2FkZWRcbiAqKiovXG5mdW5jdGlvbiBfbG9hZFJ0RmlsZSgpIHtcbiAgLy8gZ2V0IHRoZSBydCBkb2NcbiAgZ2FwaS5kcml2ZS5yZWFsdGltZS5sb2FkKGxvYWRlZEZpbGUsXG4gICAgLy8gcnQgZG9jIGxvYWRlZFxuICAgIGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgcnREb2MgPSBmaWxlO1xuXG4gICAgICAvLyBnZXQgb3VyIHJ0IGF0dHJpYnV0ZS4gIFRyaWdnZXJpbmcgY2hhbmdlcyBvbiBydEpzb24gd2lsbCBwdXNoIGV2ZW50c1xuICAgICAgLy8gdG8gYWxsIGxpc3RlbmluZyBjbGllbnRzXG4gICAgICB2YXIganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBqc29uIGF0dHIsIHdlIG5lZWQgdG8gaW5pdGlhbGl6ZSB0aGUgbW9kZWxcbiAgICAgIGlmKCBqc29uID09IG51bGwgfHwgbGl2ZUVkaXRzID09IG51bGwpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBvdXIgcnQgbW9kZWxcbiAgICAgICAgX29uUnRNb2RlbExvYWQoZmlsZS5nZXRNb2RlbCgpKTtcbiAgICAgICAgLy8gZ3JhYiBydCBqc29uIGF0dHIgbm93IHRoYXQgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICAgIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBiYWRuZXNzIGhhcHBlbmVkIDooXG4gICAgICBpZiggIWpzb24gKSByZXR1cm4gY29uc29sZS5sb2coXCJGYWlsZWQgdG8gY29ubmVjdCB0byBydCBqc29uXCIpO1xuICAgICAgLy8gc2V0IHRoYXQgYXR0ciBnbG9iYWwgdG8gY2xhc3NcbiAgICAgIHJ0SnNvbiA9IGpzb247XG5cbiAgICAgIC8vIGdldCBjdXJyZW50IGxpc3Qgb2YgdXNlcnNcbiAgICAgIHZhciB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuXG4gICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aGVuIHBlb3BsZSBjb21lIGFuZCBnb1xuICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9KT0lORUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0xFRlQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBydEpzb24gb2JqZWN0XG4gICAgICAvLyB3aGVuIHRoaXMgdXBkYXRlcywgd2Ugd2FudCB0byByZS1ydW4gdGhlIG1vZGVsXG4gICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9JTlNFUlRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9ERUxFVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuICAgICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxpdmUgZWRpdCB1cGRhdGVzXG4gICAgICAgICAgICAgIGxpdmVFZGl0cy5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlZBTFVFX0NIQU5HRUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgIF91cGRhdGVSdEVkaXRzKGUpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBzaG93IHdobyBpcyBsaXN0ZW5pbmdcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcblxuICAgICAgICAvLyBzZXQgaW5wdXQgaGFuZGxlcnMgZm9yIHJ0IGV2ZW50c1xuICAgIH0sXG4gICAgLy8gbW9kZWwgbG9hZGVkXG4gICAgZnVuY3Rpb24obW9kZWwpe1xuICAgICAgX29uUnRNb2RlbExvYWQobW9kZWwpO1xuICAgIH0sXG4gICAgLy8gZXJyb3JzXG4gICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJUIEVSUk9SUzogXCIpO1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG4gICk7XG59XG5cblxuLyoqKlxuICogVXBkYXRlIHRoZSBkaXNwbGF5IG9mIGFjdGl2ZSB1c2VycyBmb3IgdGhlIG1vZGVsLlxuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycykge1xuICAvLyBpZiBpdCdzIGp1c3QgdXMsIGRvbid0IHNob3cgYW55dGhpbmdcbiAgaWYoICF1c2VycyApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuICBpZiggdXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAvLyB3ZSBvbmx5IHdhbnQgdW5pcXVlIHVzZXJzXG4gIHZhciB1bmlxdWUgPSBbXTtcbiAgdmFyIHV1c2VycyA9IFtdO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1bmlxdWUuaW5kZXhPZih1c2Vyc1tpXS51c2VySWQpID09IC0xICkge1xuICAgICAgdW5pcXVlLnB1c2godXNlcnNbaV0udXNlcklkKTtcbiAgICAgIHV1c2Vycy5wdXNoKHVzZXJzW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYoIHV1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIGFkZCBwaWMgb2YgdXNlciB0byBkaXNwbGF5IHBhbmVsXG4gIHZhciBodG1sID0gXCJBY3RpdmUgVXNlcnMgXCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCB1dXNlcnNbaV0ucGhvdG9VcmwgKSB7XG4gICAgICBodG1sICs9IFwiPGltZyBzcmM9J1wiK3V1c2Vyc1tpXS5waG90b1VybCtcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgc3R5bGU9J21hcmdpbjowIDVweDt3aWR0aDozMnB4O2hlaWdodDozMnB4JyBjbGFzcz0naW1nLXJvdW5kZWQnIC8+IFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBodG1sICs9IFwiPHNwYW4gc3R5bGU9J3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7bWFyZ2luOjAgNXB4O2JhY2tncm91bmQtY29sb3I6XCIrdXVzZXJzW2ldLmNvbG9yK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyA+PC9zcGFuPiBcIjtcbiAgICB9XG4gIH1cbiAgJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChodG1sKTtcbn1cblxuLyoqKlxuICAgKiAgUmUtcnVuIHRoZSBtb2RlbC4gIEV2ZW50cyBjYW4gY29tZSBpbiBxdWlja2x5IGluIG1hbnkgcGFydHMuICBCdWZmZXIgdGhlIGV2ZW50cyBzbyB3ZSBkb24ndCByZS1ydW4gdGhlIG1vZGVsIHRvbyBtYW55IHRpbWVzLlxuICAgKioqL1xuZnVuY3Rpb24gX3JlcnVuUnQodXNlcnMsIHVzZXJJZCkge1xuICAvLyB0aGlzIGlzIGJhZG5lc3NcbiAgaWYoICFydEpzb24gKSByZXR1cm47XG5cbiAgLy8gY2xlYXIgYW55IHF1ZXVlZCBydW5cbiAgaWYoIF9ydFRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KF9ydFRpbWVyKTtcblxuICAvLyBxdWV1ZSB1cCBhIHJ1biBhbmQgd2FpdCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vIHVwZGF0ZXNcbiAgX3J0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgX3J0VGltZXIgPSAtMTtcblxuICAgIC8vIGZpbmQgdGhlIHVzZXIgd2hvIGlzIHJ1bm5pbmcgdGhlIG1vZGVsIGFuZCBkaXBsYXkgcG9wdXAgb2YgdGhhdCB1c2VycyBpbmZvcm1hdGlvblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdXNlcnNbaV0udXNlcklkID09IHVzZXJJZCApIHtcbiAgICAgICAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZy1vdXRlcicgPjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZycgc3R5bGU9J3dpZHRoOjQwMHB4Jz4gXCIrXG4gICAgICAgICAgICAgICAgKHVzZXJzW2ldLnBob3RvVXJsID8gXCI8aW1nIHNyYz0nXCIrdXNlcnNbaV0ucGhvdG9VcmwrXCInIC8+IFwiIDogXCJcIikrdXNlcnNbaV0uZGlzcGxheU5hbWUrXCIgaXMgdXBkYXRpbmcgdGhlIG1vZGVsLi4uPC9kaXY+PC9kaXY+XCIpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYXBwZW5kKHBhbmVsKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5jc3MoXCJvcGFjaXR5XCIsXCIuOVwiKTtcbiAgICAgICAgICAgIH0sNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMzUwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZSB0aGUgbmV3IG1vZGVsIGRhdGEgYW5kIGxvYWQgaXQgYXMgb3VyIGN1cnJlbnQgc2V0dXBcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocnRKc29uLmdldFRleHQoKSk7XG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAobG9hZGVkRmlsZSwgZGF0YSwgdHJ1ZSk7XG4gIH0sIDMwMCk7XG59XG5cbi8qKipcbiAqIGluaXRpYWxpemUgYSBuZXcgcnQgbW9kZWxcbiAqKiovXG5mdW5jdGlvbiBfb25SdE1vZGVsTG9hZChtb2RlbCkge1xuICAvLyBjdXJyZW50bHkgd2UganVzdCB3YW50IHRvIHVzZSB0aGlzIHNpbmdsZSBhdHRyaWJ1dGUgdG8gYnJvYWRjYXN0IGV2ZW50c1xuICB2YXIganNvbiA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICBpZigganNvbiA9PSBudWxsICkge1xuICAgIHZhciBzdHJpbmcgPSBtb2RlbC5jcmVhdGVTdHJpbmcoXCJ7fVwiKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwianNvblwiLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGxpdmVFZGl0cyA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gIGlmKCBsaXZlRWRpdHMgPT0gbnVsbCApIHtcbiAgICB2YXIgZmllbGQgPSBtb2RlbC5jcmVhdGVNYXAoKTtcbiAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwibGl2ZUVkaXRzXCIsIGZpZWxkKTtcbiAgfVxuXG59XG5cbi8qKipcbiAqIGxldCB0aGUgd29ybGQga25vdyB3aGF0IHdlIGFyZSBkb2luZyA6KVxuICogVGhpcyBzaG91bGQgYmUgY2FsbGVkIHdoZW4gYSBsb2NhbCB1c2VyIHJ1bnMgdGhlIG1vZGVsLiAgSXQgdXBkYXRlcyB0aGUgJ2pzb24nXG4gKiBhdHRyaWJ1dGUgd2hpY2ggaXMgdGhlbiBicm9hZGNhc3QgdG8gYWxsIGxpc3RlbmluZyBwYXJ0aWVzXG4gKioqL1xuZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgaWYoIHJ0SnNvbiApIHJ0SnNvbi5zZXRUZXh0KEpTT04uc3RyaW5naWZ5KCBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCkgKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcbiAgaW5pdFJ0QXBpICA6IGluaXRSdEFwaSxcbiAgc2V0QXBwIDogZnVuY3Rpb24oYXBwbGljYXRpb24pIHtcbiAgICBhcHAgPSBhcHBsaWNhdGlvbjtcbiAgfVxufTtcbiIsInZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG52YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG52YXIgd2VhdGhlciA9IHJlcXVpcmUoJy4vd2VhdGhlcicpO1xudmFyIHdlYXRoZXJDaGFydCA9IHJlcXVpcmUoJy4vd2VhdGhlci9jaGFydCcpO1xudmFyIHdlYXRoZXJGaWxlUmVhZGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyL2ZpbGVSZWFkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblxudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBudWxsO1xudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbnZhciBTRVRVUF9URU1QTEFURSA9XG4gICc8ZGl2PicrXG4gICc8aDQ+Q2hhcnQgT3B0aW9uczwvaDQ+JytcbiAgJzxkaXY+JytcbiAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+T3V0cHV0IHZhcmlhYmxlKHMpIHRvIGNoYXJ0IDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD4gPGEgaWQ9XCJzZWxlY3QtY2hhcnRzLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IENoYXJ0czwvYT48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5WYXJpYXRpb24gYW5hbHlzaXMgcGFyYW1ldGVyKHMpIDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD48ZGl2IGlkPVwidmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIj5Ob25lPC9kaXY+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAnPC90YWJsZT4nK1xuICAnPC9kaXY+JytcbiAgJzxoNCBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+VGltZSBTdGVwPC9oND4nK1xuICAgJzxkaXYgY2xhc3M9XCJmb3JtLWhvcml6b250YWxcIj4nK1xuICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICAgICc8bGFiZWwgZm9yPVwiaW5wdXQtc2V0dXAtZGF5c19pbl9pbnRlcnZhbFwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPkRheXMgaW4gSW50ZXJ2YWw8L2xhYmVsPicrXG4gICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsXCIgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9XCIxXCIvPicrXG4gICAgICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+SG93IG1hbnkgZGF5cyBhcmUgaW4gZWFjaCBzdGVwIG9mIHRoZSBtb2RlbDwvcD4nICtcbiAgICAgICAnPC9kaXY+JytcbiAgICAgJzwvZGl2PicrXG4gICAnPC9kaXY+JytcbiAgICc8aDQgY2xhc3M9XCJwYWdlLWhlYWRlclwiPkxvY2F0aW9uPC9oND4nK1xuICAgJzxkaXY+JytcbiAgICAgJzxzcGFuIGlkPVwiY3VycmVudC1sb2NhdGlvblwiIHN0eWxlPVwiY29sb3I6Izg4OFwiPjwvc3Bhbj4nK1xuICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBzZWxlY3Qtd2VhdGhlci1sb2NhdGlvblwiPjxpIGNsYXNzPVwiaWNvbi1tYXAtbWFya2VyXCI+PC9pPiBTZWxlY3QgTG9jYXRpb248L2E+JytcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBHT09MRURSSVZFX1RSRUVfVEVNUExBVEUgPVxuICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTVweCAwIDVweCAwO21hcmdpbi1ib3R0b206NXB4O2hlaWdodDogNTBweFwiPicrXG4gICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgcHVsbC1yaWdodFwiIGlkPVwidHJlZS1zdWItbWVudVwiPicrXG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPicrXG4gICAgICAgICc8c3BhbiBpZD1cImxvYWRlZC10cmVlLW5hbWVcIj5EZWZhdWx0IFRyZWU8L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JytcbiAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS10cmVlLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLWxlZnQ6MTBweFwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAnPC91bD4nK1xuICAnPC9kaXY+JytcbiAgJzxkaXYgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjb21wYXJlLXRyZWVzXCIgLz4gQ29tcGFyZSBUcmVlczwvZGl2PicrXG4nPC9kaXY+JztcblxudmFyIElOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICc8aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInt7aWR9fVwiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cInt7dmFsdWV9fVwiPiZuYnNwOyZuYnNwO3t7dW5pdHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+JztcblxudmFyIEFSUkFZX0lOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJjb2wtbGctNlwiPjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICd7e2lucHV0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj48L2Rpdj4nO1xuXG52YXIgdGFiSGVhZGVyID0gJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cImlucHV0X3BpbGxzXCI+JztcbnZhciBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPic7XG5cbnZhciB0cmVlSGVhZGVyID0gJzxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiIGlkPVwidHJlZS1hY2NvcmRpb25cIj4nO1xudmFyIFRSRUVfUEFORUxfVEVNUExBVEUgPSAnPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj4nK1xuICAgICAgICAgICAgJzxoNCBjbGFzcz1cInBhbmVsLXRpdGxlXCI+JytcbiAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJhY2NvcmRpb24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PVwiI3RyZWUtYWNjb3JkaW9uXCIgaHJlZj1cIiNjb2xsYXBzZXt7aWR9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICd7e3RpdGxlfX0nK1xuICAgICAgICAgICAgICAgICc8L2E+JytcbiAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImNvbGxhcHNle3tpZH19XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj57e2JvZHl9fTwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAnPC9kaXY+JztcblxudmFyIGlucHV0cyA9IHt9O1xuXG4vLyBmb3Igd2VhdGhlciBkYXRhXG52YXIgY29scyA9IFtdO1xuXG52YXIgbWFwID0gbnVsbDtcblxuLyoqXG4gKiBPcHRpb25zIDpcbiAqICAgbW9kZWwgLSB0eXBlIG9mIG1vZGVsIHRvIGFwcGVuZCB0b1xuICogICBsYWJlbCAtIGF0dHJpYnV0ZSBsYWJlbFxuICogICB2YWx1ZSAtIGRlZmF1bHQgdmFsdWVcbiAqICAgZGVzY3JpcHRpb24gLSBkZXNjcmlwdGlvbiBvZiBhdHRyaWJ1dGVcbiAqICAgdW5pdHMgLSBhdHRyaWJ1dGUgdW5pdHNcbiAqL1xuZnVuY3Rpb24gX2FkZElucHV0KG9wdGlvbnMpIHtcbiAgaWYoICFpbnB1dHNbb3B0aW9ucy5tb2RlbF0gKSBpbnB1dHNbb3B0aW9ucy5tb2RlbF0gPSBbXTtcbiAgaW5wdXRzW29wdGlvbnMubW9kZWxdLnB1c2gob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVXZWF0aGVySW5wdXRzKCkge1xuICBmb3IoIHZhciBhdHRyIGluIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpLndlYXRoZXIgKSB7XG4gICAgaWYoIGF0dHIgIT0gXCJucmVsXCIgKSBjb2xzLnB1c2goYXR0cik7XG4gIH1cblxuICB2YXIgdGFibGUgPSAnPGRpdiBzdHlsZT1cInBhZGRpbmctdG9wOjI1cHhcIj48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XCIgaWQ9XCJsb2FkLXdlYXRoZXItYnRuXCI+PGkgY2xhc3M9XCJpY29uLXVwbG9hZC1hbHRcIj48L2k+IFVwbG9hZDwvYT4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGlkPVwid2VhdGhlci1pbnB1dC10b2dnbGVcIj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5BdmVyYWdlczwvYnV0dG9uPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+QWN0dWFsPC9idXR0b24+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLXBhbmVsXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLXRvcDoyMHB4XCI+PC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJhdmVyYWdlLXdlYXRoZXItcGFuZWxcIj4nK1xuICAgICAgICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTBweDtjb2xvcjojODg4XCI+U2VsZWN0IGxvY2F0aW9uIHRvIHNldCB0aGUgYXZlcmFnZSB3ZWF0aGVyIGRhdGE8L2Rpdj4nK1xuICAgICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1jb25kZW5zZWQgd2VhdGhlci10YWJsZVwiIHN0eWxlPVwibWFyZ2luLXRvcDoyMHB4XCI+JztcblxuICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjb2xzLmxlbmd0aDsgaSsrICkge1xuICAgIHRhYmxlICs9IFwiPHRkPlwiK2NvbHNbaV0rXCI8L3RkPlwiO1xuICB9XG4gIHRhYmxlICs9IFwiPC90cj5cIjtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHRhYmxlICs9IFwiPHRyPlwiO1xuICAgIGZvciggdmFyIGogPSAwOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIGlmKCBqID09IDAgKSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPlwiKyhpKzEpK1wiPC90ZD5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBpZD0naW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20rXCInIHR5cGU9J3RleHQnIC8+PC90ZD5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICB9XG4gIHJldHVybiB0YWJsZSsnPC90YWJsZT48ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+PC9kaXY+JztcblxufVxuXG5mdW5jdGlvbiBfc2V0V2VhdGhlckRhdGEoKSB7XG4gIHZhciBsbCA9IGFwcC5xcyhcImxsXCIpO1xuICBpZiggbGwgKSB7XG4gICAgbGwgPSBsbC5zcGxpdChcIixcIik7XG4gICAgX3F1ZXJ5V2VhdGhlckRhdGEobGxbMF0sIGxsWzFdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoXCJOb3QgU2V0XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9xdWVyeVdlYXRoZXJEYXRhKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd3ZWF0aGVyLWRhdGEtcXVlcnknLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjaygpO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV0gPSB7fTtcbiAgICAgIGZvciggdmFyIGogPSAxOyBqIDwgdGFibGUuY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbSkudmFsKHRhYmxlLnJvd3NbaV0uY1tqXSA/IHRhYmxlLnJvd3NbaV0uY1tqXS52IDogXCJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9TT0lMKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciBlcnJvciA9IGZhbHNlO1xuICAgIHZhciB0YWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0YWJsZS5yb3dzWzBdID09IG51bGwgKSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgYWxlcnQoXCJJbnZhbGlkIGxvY2F0aW9uIHNlbGVjdGVkXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGtleSA9IHRhYmxlLmNvbHNbaV0uaWQ7XG4gICAgICBpZigga2V5ID09PSAnbWF4YXdzJyApIGtleSA9ICdtYXhBV1MnO1xuXG4gICAgICAkKFwiI2lucHV0LXNvaWwtXCIra2V5KS52YWwodGFibGUucm93c1swXS5jW2ldLnYpO1xuICAgIH1cblxuICAgIGlmKCAhZXJyb3IgKSBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwobG5nK1wiLCBcIitsYXQrXCIgPGEgaHJlZj0nXCIrd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qLywnJykrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj9sbD1cIitsbmcrXCIsXCIrbGF0K1wiJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPjwvYT5cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpIHtcbiAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IDEyOyBpKysgKSB7XG4gICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgdmFyIHZhbCA9ICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK20pLnZhbCgpO1xuICAgICAgaWYoIHZhbCAmJiB2YWwubGVuZ3RoID4gMCApIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dW2NvbHNbal1dID0gcGFyc2VJbnQodmFsKTtcbiAgICAgIGVsc2Ugd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV1bY29sc1tqXV0gPSAwO1xuICAgIH1cbiAgfVxuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbn1cblxuZnVuY3Rpb24gX3NlbGVjdFdlYXRoZXJMb2NhdGlvbigpIHtcbiAgaWYoICFtYXAgKSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCh7fSk7XG5cbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikub24oJ2NsaWNrJywgX2dldExvY2F0aW9uKTtcblxuXG4gICAgLy8gd2FpdCBmb3IgdGhlIG1vZGFsIHRvIGluaXRcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG5cbiAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoJChcIiNnbWFwXCIpWzBdLCB7XG4gICAgICAgIGNlbnRlciA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMzUsIC0xMjEpLFxuICAgICAgICB6b29tOiA1LFxuICAgICAgICBtYXBUeXBlSWQgOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBkZWZhdWx0U3R5bGUgPSB7XG4gICAgICAgICAgICBwb2x5Z29uT3B0aW9uczoge1xuICAgICAgICAgICAgICBzdHJva2VDb2xvciAgIDogXCIjMDAwMEZGXCIsXG4gICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHkgOiAwLjUsXG4gICAgICAgICAgICAgIGZpbGxDb2xvciAgICAgOiAnI0ZFRkVGRScsXG4gICAgICAgICAgICAgIGZpbGxPcGFjaXR5ICAgOiAwLjJcbiAgICAgICAgICAgIH0sXG4gICAgICB9O1xuXG5cbiAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgc2VsZWN0OiAnYm91bmRhcnknLFxuICAgICAgICAgICAgZnJvbTogJzFoVjl2UUczU2MwSkxQZHVGcFdKenRmTEstZXg2Y2N5TWdfcHRFX3MnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZXM6IFtkZWZhdWx0U3R5bGVdLFxuICAgICAgICAgIHN1cHByZXNzSW5mb1dpbmRvd3MgOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICB2YXIgZnVzaW9uTGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuRnVzaW9uVGFibGVzTGF5ZXIoZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgZnVzaW9uTGF5ZXIub3BhY2l0eSA9IC44O1xuICAgICAgZnVzaW9uTGF5ZXIuc2V0TWFwKG1hcCk7XG5cbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgYWxlcnQoJ1lvdSBtdXN0IGNsaWNrIG9uIGEgZ2VvbWV0cnkgdG8gY2FjaGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGZ1c2lvbkxheWVyLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBvZmZsaW5lLmNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldHVwIGlucHV0IGZvciBjbGVhcmluZyBjYWNoZVxuICAgICAgICAgICQoJyNjbGVhci1jYWNoZWQtdGlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBvZmZsaW5lLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcblxuICAgIH0sNTAwKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG5cbiAgICAvLyB3ZSBzZWVtIHRvIGJlIGhhbmdpbmcgc29tZXRpbWVzLi4uLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcbiAgICB9LCA1MDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbigpIHtcbiAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikuYWRkQ2xhc3MoXCJidG4td2FybmluZ1wiKTtcbiAgfSBlbHNle1xuICAgIHdpbmRvdy5hbGVydChcIkdlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyLlwiKTtcbiAgfVxuICBmdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJidG4td2FyblwiKS5hZGRDbGFzcyhcImJ0bi1zdWNjZXNzXCIpO1xuICAgIG1hcC5zZXRab29tKDEwKTtcbiAgICBtYXAuc2V0Q2VudGVyKG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSk7XG4gICAgLy9fcXVlcnlXZWF0aGVyRGF0YShwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUlucHV0cyhpLCB0eXBlLCBwcmVmaXgsIG5hbWUsIGF0dHJzKSB7XG4gIHZhciBpZCA9IHByZWZpeC5sZW5ndGggPiAwID8gcHJlZml4KyctJytuYW1lIDogJ2lucHV0LScrbmFtZTtcbiAgdmFyIGlucHV0ID0gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDonKyhpKjIwKSsncHg7bWFyZ2luLXRvcDowcHg7bWFyZ2luLXJpZ2h0OjVweFwiPic7XG5cbiAgdmFyIHRyZWVib2R5ID0gXCJcIjtcblxuICBpZiggIShpID09IDEpICkge1xuICAgICAgaWYoIGkgIT0gMCApIGlucHV0ICs9ICc8bGFiZWwgZm9yPVwiJytpZCsnXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+JytuYW1lICsnPC9sYWJlbD4nO1xuICAgICAgaW5wdXQgKz0gJzxkaXY+JztcbiAgfVxuXG5cbiAgICAgIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICYmIGkgPT0gMSAgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICB0cmVlYm9keSArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyApIHtcbiAgICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlucHV0ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggKHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycpICYmIGkgPT0gMSApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG5cbiAgICAgIHRyZWVib2R5ICs9XG4gICAgICAgICAgJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICcrXG4gICAgICAgICAgKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlKydcIiBpZD1cIicrXG4gICAgICAgICAgaWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICB9IGVsc2UgaWYgKCAgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuICAgIGlucHV0ICs9ICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnXG4gICAgICAgICAgKyh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZStcbiAgICAgICAgICAgJ1wiIGlkPVwiJytpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgfVxuXG4gIGlmKCAhKGkgPT0gMSAvKiYmIHR5cGUgPT0gJ3RyZWUnKi8pICkge1xuICAgICAgaW5wdXQgKz0gJzwvZGl2PjwvZGl2Pic7XG4gIH0gZWxzZSB7XG4gICAgICBpbnB1dCArPSBUUkVFX1BBTkVMX1RFTVBMQVRFXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3tpZH19L2csaWQpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3t0aXRsZX19JyxuYW1lK1wiIDxzcGFuIHN0eWxlPSdjb2xvcjojODg4O2ZvbnQtc2l6ZToxMnB4Jz4gLSBcIithdHRycy5kZXNjcmlwdGlvbitcIjwvc3Bhbj5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2JvZHl9fScsdHJlZWJvZHkpKyc8L2Rpdj4nXG4gIH1cblxuICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShlbGUpIHtcbiAgd2VhdGhlckZpbGVSZWFkZXIuaW5pdChhcHApO1xuICB2YXIgbW9kZWwsIG0sIGF0dHIsIGNvbmZpZztcblxuICB2YXIgaW5wdXRzID0gJC5leHRlbmQodHJ1ZSwge30sIGFwcC5nZXRNb2RlbCgpLmdldERhdGFNb2RlbCgpKTtcblxuICBpbnB1dHNbJ3NldHVwJ10gPSB7fTtcbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgbSA9IGlucHV0c1ttb2RlbF07XG4gICAgZm9yKCBhdHRyIGluIG0gKSB7XG4gICAgICBjb25maWcgPSBtW2F0dHJdO1xuXG4gICAgICBpZiggdHlwZW9mIGNvbmZpZyA9PSAnb2JqZWN0JyApIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0cixcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IGNvbmZpZy5kZXNjcmlwdGlvbixcbiAgICAgICAgICB2YWx1ZSAgICAgICA6IGNvbmZpZy52YWx1ZSxcbiAgICAgICAgICB1bml0cyAgICAgICA6IGNvbmZpZy51bml0c1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBpZiggbW9kZWwgPT0gXCJwbGFudGF0aW9uX3N0YXRlXCIgKSBjb250aW51ZTtcblxuICAgIHRhYkhlYWRlciArPSAnPGxpPjxhIGhyZWY9XCIjaW5wdXRzXycrbW9kZWwrJ1wiIGlkPVwidGFiX2lucHV0c18nK21vZGVsKydcIiBkYXRhLXRvZ2dsZT1cInBpbGxcIj4nXG4gICAgICAgICAgICAgICAgK21vZGVsLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkrbW9kZWwuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkrJzwvYT48L2xpPic7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBpbnB1dHNbbW9kZWxdO1xuXG4gICAgY29udGVudCArPSAnIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBmYWRlXCIgaWQ9XCJpbnB1dHNfJyttb2RlbCsnXCI+JztcblxuICAgIHZhciByb3cxID0gXCJcIjtcbiAgICB2YXIgcm93MiA9IFwiPGRpdiBjbGFzcz0nY29sLWxnLTY+XCI7XG5cbiAgICBpZiggbW9kZWwgPT0gJ3dlYXRoZXInICkge1xuICAgICAgY29udGVudCArPSBfY3JlYXRlV2VhdGhlcklucHV0cygpO1xuICAgIH0gZWxzZSBpZiggbW9kZWwgPT0gJ3NldHVwJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gU0VUVVBfVEVNUExBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCArPSB0cmVlSGVhZGVyO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgZ29vZ2xlIGRyaXZlIGJ0biBmcm9tIHRyZWVzXG4gICAgICAgIGlmKCBtb2RlbCA9PSd0cmVlJyApIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gICAgICAgIH1cblxuICAgICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgICB9XG5cblxuICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIH1cbiAgY29udGVudCArPSAnPC9kaXY+JztcbiAgdGFiSGVhZGVyICs9IFwiPC91bD5cIjtcblxuICBlbGUuaHRtbCh0YWJIZWFkZXIrXCI8ZGl2IGNsYXNzPSdmb3JtLWhvcml6b250YWwnPlwiK2NvbnRlbnQrXCI8L2Rpdj5cIik7XG5cbiAgLy8gcnVuIHRoZSBtb2RlbCB3aGVuZXZlciBzb21lIGhpdHMgJ2VudGVyJ1xuICBlbGUuZmluZCgnaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgYXBwLnJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBsb2FkaW5nIGEgdHJlZVxuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd0xvYWRUcmVlUGFuZWwoKTtcbiAgfSk7XG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtc2F2ZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93U2F2ZVRyZWVQYW5lbCgpO1xuICB9KTtcblxuICAvLyBzZXQgdHJlZSBpbnB1dCBoYW5kbGVyc1xuICAkKFwiI2NvbXBhcmUtdHJlZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiggJCh0aGlzKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzZXQgcGlsbCBjbGljayBoYW5kbGVyc1xuICAkKCcjaW5wdXRfcGlsbHMgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICQodGhpcykudGFiKCdzaG93JylcbiAgfSk7XG4gICQoJyN0YWJfaW5wdXRzX3dlYXRoZXInKS50YWIoJ3Nob3cnKTtcblxuICAkKCcuc2VsZWN0LXdlYXRoZXItbG9jYXRpb24nKS5vbignY2xpY2snLCBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKTtcblxuXG4gICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoe3Nob3c6ZmFsc2V9KTtcbiAgJCgnI2xvYWQtd2VhdGhlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJChcIiN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG4uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgaWYoICQodGhpcykuaHRtbCgpID09ICdBdmVyYWdlcycgKSB7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ZWF0aGVyLnNldChhcHAuZ2V0TW9kZWwoKSk7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmKCB3ZWF0aGVyQXZlcmFnZUNoYXJ0ICl7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gd2VhdGhlckNoYXJ0LmNyZWF0ZSgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIF9zZXRXZWF0aGVyRGF0YSgpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpIHtcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURTtcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwic2luZ2xlLXRyZWUtY29udGVudFwiPic7XG4gIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJjb21wYXJlLXRyZWUtY29udGVudFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgJzx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiPicrXG4gICAgICAgICAgJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjdHJlZTFcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMTwvYT48L2xpPicrXG4gICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCIjdHJlZTJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMjwvYT48L2xpPicrXG4gICAgICAgICc8L3VsPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUxXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDEnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMlwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCIgPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MicsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgJzwvZGl2Pic7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cblxucmV0dXJuIHtcbiAgY3JlYXRlIDogY3JlYXRlLFxuICB1cGRhdGVBdmVyYWdlQ2hhcnQ6IHVwZGF0ZUF2ZXJhZ2VDaGFydFxufTtcblxufTtcbiIsInZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xudmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbi8vIFNwZWNpYWwgU2F1Y2UuLi5cbi8vIGJhc2ljYWxseSB0aGUgY29kZSBsb2FkZWQgZnJvbSBHaXRIdWIgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHRvIGV4aXN0cyBpbiB0aGUgd2luZG93IHNjb3BlXG4vLyAgIG0zUEdJT1xuLy8gICAgIC0gcmVhZEFsbENvbnRhbnRzXG4vLyAgICAgLSByZWFkV2VhdGhlclxuLy8gICAgIC0gZHVtcFxuLy8gICAgIC0gcmVhZEZyb21JbnB1dHNcbi8vIFNvIHdlIGluamVjdCBmdW5jdGlvbnMgdGhhdCBpbnRlcmFjdCB3LyBvdXIgVUksIG1vZGVsIGluIG5vIHdheSBjYXJlc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIG1vZGVsLmRlYnVnID0gdHJ1ZTtcblxuICAgIGlmKCAhbW9kZWwucGxhbnRhdGlvbiApIG1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICB0aGlzLnJlYWRBbGxDb25zdGFudHMobW9kZWwucGxhbnRhdGlvbik7XG5cbiAgICBpZiggIW1vZGVsLndlYXRoZXIgKSBtb2RlbC53ZWF0aGVyID0ge307XG4gICAgaWYoICFtb2RlbC5tYW5hZ2UgKSBtb2RlbC5tYW5hZ2UgPSB7fTtcbiAgICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICAgIHRoaXMucmVhZFdlYXRoZXIobW9kZWwud2VhdGhlciwgbW9kZWwubWFuYWdlLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG5cbiAgICBkZWxldGUgdGhpcy5tb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzO1xuICB9LFxuICByZWFkQWxsQ29uc3RhbnRzIDogZnVuY3Rpb24ocGxhbnRhdGlvbikge1xuICAgICAgdGhpcy5yZWFkRnJvbUlucHV0cygpO1xuXG4gICAgICAvL2ZvciAoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC5wbGFudGF0aW9uKSB7XG4gICAgICAvLyAgICBwbGFudGF0aW9uW2tleV0gPSB0aGlzLm1vZGVsLnBsYW50YXRpb25ba2V5XTtcbiAgICAgIC8vfVxuXG4gICAgICBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZSA9IHRoaXMubW9kZWwudHJlZTtcblxuICAgICAgLy8gc2V0dXAgc2VlZGxpbmcgVHJlZVxuICAgICAgLy8gVE9ETzogaGFyZGNvZGVkIGZvciBub3csIHRoaXMgc2hvdWxkbid0IGJlXG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLm1vZGVsLnRyZWUpO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUuc3RlbXNQZXJTdHVtcCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5wZnMuc3RlbUNudCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5yb290UCA9IHtcbiAgICAgICAgICBMQUlUYXJnZXQgOiAxMCxcbiAgICAgICAgICBlZmZpY2llbmN5IDogMC42LFxuICAgICAgICAgIGZyYWMgOiAwLjAxXG4gICAgICB9O1xuICB9LFxuXG4gIHJlYWRXZWF0aGVyIDogZnVuY3Rpb24od2VhdGhlck1hcCwgbWFuYWdlLCBjdXN0b21XZWF0aGVyTWFwKSB7XG4gICAgICB2YXIgZGF0ZVBsYW50ZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcbiAgICAgIGlmIChkYXRlUGxhbnRlZCAmJiBkYXRlUGxhbnRlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVQbGFudGVkID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0ZUNvcHBpY2VkID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUNvcHBpY2VkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVDb3BwaWNlZCAmJiBkYXRlQ29wcGljZWQgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5kYXRlQ29wcGljZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIHNldCBlcnJvciBjb25kaXRpb24gOiBUT0RPXG4gICAgICB9XG5cbiAgICAgIHZhciBEYXRlRmluYWxIYXJ2ZXN0ID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKTtcbiAgICAgIGlmIChEYXRlRmluYWxIYXJ2ZXN0ICYmIERhdGVGaW5hbEhhcnZlc3QgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5EYXRlRmluYWxIYXJ2ZXN0ID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIHllYXJzUGVyQ29wcGljZSA9ICQoXCIjaW5wdXQtbWFuYWdlLWNvcHBpY2VJbnRlcnZhbFwiKS52YWwoKTtcbiAgICAgIGlmICh5ZWFyc1BlckNvcHBpY2UgJiYgeWVhcnNQZXJDb3BwaWNlICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UueWVhcnNQZXJDb3BwaWNlID0gcGFyc2VJbnQoJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpKTtcbiAgICAgIH1cblxuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgIG1vbnRoIDogKGkgKyAxKVxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICAgICAgICBpZiggbS5sZW5ndGggPT09IDEgKSBtID0gJzAnK207XG5cbiAgICAgICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBjb25maWcuaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgdmFyIGMgPSBjb25maWcuaW5wdXRzLndlYXRoZXJbal07XG4gICAgICAgICAgICAgIGl0ZW1bY10gPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIG0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbS5ucmVsID0gaXRlbS5yYWQgLyAwLjAwMzY7XG5cbiAgICAgICAgICB3ZWF0aGVyTWFwW21dID0gaXRlbTtcbiAgICAgIH1cblxuICAgICAgaWYoIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgZm9yKCB2YXIgZGF0ZSBpbiB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdLm5yZWwgPSB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdLnJhZCAvIDAuMDAzNjtcbiAgICAgICAgICAgICAgLy9jdXN0b21XZWF0aGVyTWFwW2RhdGVdID0gY3VzdG9tX3dlYXRoZXJbZGF0ZV07XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdlYXRoZXJNYXA7XG4gIH0sXG5cbiAgLy8gcmVhZCBhIHZhbHVlIGZyb20gdGhlIGlucHV0XG4gIC8vIGl0IGhhcyBhICcsJyBpcyBzZXQgZm9yIHZhcmlhdGlvblxuICBfcmVhZFZhbCA6IGZ1bmN0aW9uKGVsZSkge1xuICAgICAgdmFyIHZhbCA9IGVsZS52YWwoKTtcbiAgICAgIGlmKCB2YWwubWF0Y2goL1xcZCotXFxkKi1cXGQqJC8pICkge1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9IGVsc2UgaWYoIHZhbC5tYXRjaCgvLiosLiovKSApIHtcbiAgICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxzL2csJycpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICB2YXIgaWQgPSBlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoL15pbnB1dC0vLCcnKS5yZXBsYWNlKC8tL2csJy4nKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF0ucHVzaChwYXJzZUZsb2F0KHZhbFtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCk7XG4gIH0sXG5cbiAgZHVtcCA6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gaW4gYXBwXG4gIH0sXG5cbiAgcmVhZEZyb21JbnB1dHMgOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJlYWQgc29pbFxuICAgICAgdGhpcy5tb2RlbC5zb2lsID0ge307XG4gICAgICB0aGlzLm1vZGVsLnNvaWwubWF4QVdTID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtbWF4QVdTXCIpKTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5zd3Bvd2VyID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3dwb3dlclwiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3djb25zdCA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3Y29uc3RcIikpO1xuXG4gICAgICB0aGlzLm1vZGVsLnNldHVwID0ge1xuICAgICAgICBkYXlzX2luX2ludGVydmFsIDogdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWxcIikpXG4gICAgICB9O1xuXG4gICAgICAvLyByZWFkIG1hbmFnZVxuICAgICAgdGhpcy5tb2RlbC5tYW5hZ2UgPSB7XG4gICAgICAgICAgY29wcGljZSA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIGVsZXMgPSAkKFwiLm1hbmFnZVwiKTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJChlbGVzW2ldKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLm1hbmFnZVtlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1tYW5hZ2UtXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uXG4gICAgICBpZiggIXRoaXMubW9kZWwucGxhbnRhdGlvbiApIHRoaXMubW9kZWwucGxhbnRhdGlvbiA9IHt9O1xuICAgICAgZWxlcyA9ICQoXCIucGxhbnRhdGlvblwiKTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJChlbGVzW2ldKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25bZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtcGxhbnRhdGlvbi1cIiwgXCJcIildID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHRyZWVcbiAgICAgIHZhciB0cmVlSW5wdXRzID0gJChcIi50cmVlXCIpO1xuICAgICAgdGhpcy5tb2RlbC50cmVlID0ge307XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0cmVlSW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQodHJlZUlucHV0c1tpXSk7XG5cbiAgICAgICAgICB2YXIgcGFydHMgPSBlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC10cmVlLVwiLCBcIlwiKS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dKVxuICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSA9IHt9O1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dW3BhcnRzWzFdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvbiBzdGF0ZVxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUgKSB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC5nZXREYXRhTW9kZWwoKS5wbGFudGF0aW9uX3N0YXRlLnZhbHVlICkge1xuICAgICAgICAgIHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZVtrZXldID0gLTE7XG4gICAgICB9XG5cbiAgfSxcblxuICAvLyB0aGlzIGlzIHRoZSBzbmFwc2hvdCB3ZSBzYXZlIHRvIGdvb2dsZSBkcml2ZVxuICBleHBvcnRTZXR1cCA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG4gICAgICB0aGlzLnJlYWRXZWF0aGVyKFtdLCB7fSwge30pO1xuXG4gICAgICB2YXIgZXggPSB7XG4gICAgICAgICAgd2VhdGhlciA6IHRoaXMubW9kZWwud2VhdGhlcixcbiAgICAgICAgICBjdXN0b21fd2VhdGhlciA6IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIsXG4gICAgICAgICAgc2V0dXAgOiB0aGlzLm1vZGVsLnNldHVwLFxuICAgICAgICAgIHRyZWUgOiB0aGlzLm1vZGVsLnRyZWUsXG4gICAgICAgICAgcGxhbnRhdGlvbiA6IHRoaXMubW9kZWwucGxhbnRhdGlvbixcbiAgICAgICAgICBtYW5hZ2UgOiB0aGlzLm1vZGVsLm1hbmFnZSxcbiAgICAgICAgICBzb2lsIDogdGhpcy5tb2RlbC5zb2lsLFxuICAgICAgICAgIG1hbmFnZSA6IHRoaXMubW9kZWwubWFuYWdlLFxuICAgICAgICAgIHBsYW50YXRpb25fc3RhdGUgOiB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUsXG4gICAgICAgICAgY29uZmlnIDoge1xuICAgICAgICAgICAgICBjaGFydFR5cGVJbnB1dCA6ICQoXCIjY2hhcnRUeXBlSW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICAgIGRheXNUb1J1biA6IHRoaXMuYXBwLmRheXNUb1J1bigpLFxuICAgICAgICAgICAgICBjdXJyZW50TG9jYXRpb24gOiAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbCgpLFxuICAgICAgICAgICAgICBsb2FkZWRUcmVlIDogJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgdmVyc2lvbiA6IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA/IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA6IFwibWFzdGVyXCJcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGJ5IGRlZmF1bHQgdGhlIHJlYWQgZnVuY3Rpb24gc2V0IHRoZSB2YXJpYXRpb25zIHZhcmlhYmxlcyBidXQgb25seVxuICAgICAgLy8gcmV0dXJucyB0aGUgZmlyc3QsIHNldCB0aGUgdmFyaWF0aW9uIHBhcmFtcyB0byB0aGVpciBjb3JyZWN0IHZhbHVlc1xuICAgICAgZm9yKCB2YXIga2V5IGluIHRoaXMubW9kZWwudmFyaWF0aW9ucyApIHtcbiAgICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgIHZhciBwYXJhbSA9IGV4O1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoLTE7IGkrKyApIHtcbiAgICAgICAgICAgICAgcGFyYW0gPSBwYXJhbVtwYXJ0c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtW3BhcnRzW3BhcnRzLmxlbmd0aC0xXV0gPSB0aGlzLm1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleDtcbiAgfSxcbiAgbG9hZFRyZWUgOiBmdW5jdGlvbih0cmVlKSB7XG4gICAgICBmb3IgKCB2YXIgcm9vdEtleSBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0cmVlW3Jvb3RLZXldICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkpLnZhbCh0cmVlW3Jvb3RLZXldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3IgKCB2YXIgY2hpbGRLZXkgaW4gdHJlZVtyb290S2V5XSkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSArIFwiLVwiICsgY2hpbGRLZXkpLnZhbCh0cmVlW3Jvb3RLZXldW2NoaWxkS2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH0sXG4gIGxvYWRTZXR1cCA6IGZ1bmN0aW9uKGZpbGVpZCwgc2V0dXAsIGlzUnQpIHtcblxuICAgICAgLy8gbG9hZCBjb25maWdcbiAgICAgIGlmIChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQpIHtcbiAgICAgICAgICB0aGlzLmNoYXJ0cy51bnNlbGVjdEFsbCgpO1xuICAgICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLmNoYXJ0cy5zZWxlY3Qoc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbikge1xuICAgICAgICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKHNldHVwLmNvbmZpZy5jdXJyZW50TG9jYXRpb24pO1xuICAgICAgfVxuICAgICAgaWYoIHNldHVwLmNvbmZpZy5sb2FkZWRUcmVlICkge1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKHNldHVwLmNvbmZpZy5sb2FkZWRUcmVlKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgIGlmKCBzZXR1cC5zZXR1cCAmJiBzZXR1cC5zZXR1cC5kYXlzX2luX2ludGVydmFsICkge1xuICAgICAgICAkKCcjaW5wdXQtc2V0dXAtZGF5c19pbl9pbnRlcnZhbCcpLnZhbChzZXR1cC5zZXR1cC5kYXlzX2luX2ludGVydmFsKTtcbiAgICAgIH1cblxuICAgICAgLy8gbG9hZCB3ZWF0aGVyXG4gICAgICBpZiggQXJyYXkuaXNBcnJheShzZXR1cC53ZWF0aGVyKSApIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2V0dXAud2VhdGhlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbW9udGgnKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKHNldHVwLndlYXRoZXJbaV1ba2V5XSlcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaW5jSW5kZXggPSBmYWxzZSwgaW5kZXg7XG4gICAgICAgIGlmKCBzZXR1cC53ZWF0aGVyWzBdICE9PSB1bmRlZmluZWQgfHwgc2V0dXAud2VhdGhlclsnMCddICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgaW5jSW5kZXggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggdmFyIGkgaW4gc2V0dXAud2VhdGhlciApIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJykgY29udGludWU7XG5cblxuICAgICAgICAgICAgICAgIGlmKCBpbmNJbmRleCApIGluZGV4ID0gKHBhcnNlSW50KGkpKzEpKycnO1xuICAgICAgICAgICAgICAgIGVsc2UgaW5kZXggPSBpKycnO1xuXG4gICAgICAgICAgICAgICAgaWYoIGluZGV4Lmxlbmd0aCA9PT0gMSApIGluZGV4ID0gJzAnK2luZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGluZGV4KS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaW5kZXgpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSBzZXR1cC5jdXN0b21fd2VhdGhlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIGNoYXJ0XG4gICAgICB0aGlzLmlucHV0Rm9ybS51cGRhdGVBdmVyYWdlQ2hhcnQoKTtcblxuICAgICAgLy8gbG9hZCB0cmVlXG4gICAgICB0aGlzLmxvYWRUcmVlKHNldHVwLnRyZWUpO1xuXG4gICAgICAvLyBsb2FkIHBsYW50aW5nIHBhcmFtc1xuICAgICAgLy8gTm93IHBhcnQgb2YgbWFuYWdlLi4uLlxuICAgICAgLy8gZm9cbiAgICAgIGlmIChzZXR1cC5tYW5hZ2UpIHtcbiAgICAgICAgICB2YXIgbWFwID0ge1xuICAgICAgICAgICAgICBcImRhdGVQbGFudGVkXCIgOiBcIkRhdGVQbGFudGVkXCIsXG4gICAgICAgICAgICAgIFwiZGF0ZUNvcHBpY2VkXCIgOiBcIkRhdGVDb3BwaWNlZFwiLFxuICAgICAgICAgICAgICBcInllYXJzUGVyQ29wcGljZVwiIDogXCJDb3BwaWNlSW50ZXJ2YWxcIlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAubWFuYWdlKSB7XG4gICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGlmKCBtYXBba2V5XSApIG5ld0tleSA9IG1hcFtrZXldO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dXAubWFuYWdlW2tleV0gPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLm1hbmFnZVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAubWFuYWdlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyB2YWx1ZSBpcyBkZXByZWNhdGVkLCBzZXQgdG8gbmV3IGlucHV0XG4gICAgICBpZiggc2V0dXAuY29uZmlnLmRheXNUb1J1biApIHtcbiAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKHNldHVwLm1hbmFnZS5kYXRlUGxhbnRlZCB8fCBzZXR1cC5tYW5hZ2UuRGF0ZVBsYW50ZWQpO1xuICAgICAgICAgIGQgPSBuZXcgRGF0ZShuZXcgRGF0ZShkKS5zZXRNb250aChkLmdldE1vbnRoKCkrcGFyc2VJbnQoc2V0dXAuY29uZmlnLmRheXNUb1J1bikpKTtcbiAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChkLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBsb2FkIHJlc3RcbiAgICAgIHZhciBpbnB1dHMgPSBbIFwicGxhbnRhdGlvblwiLCBcInNvaWxcIiwgXCJtYW5hZ2VcIiBdO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cFtpbnB1dHNbaV1dKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21heEFXUycpIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtc29pbC1tYXhBV1NcIikudmFsKHNldHVwLnNvaWwubWF4QVdTKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHNldHVwW2lucHV0c1tpXV1ba2V5XSA9PSAnc3RyaW5nJyAmJiBzZXR1cFtpbnB1dHNbaV1dW2tleV0ubWF0Y2goLy4qVC4qWiQvKSApIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnJ1bk1vZGVsKGlzUnQpO1xuICB9XG59O1xuIiwiXG4gIC8vIG11c3QgaW5zdGFsbCB0aGlzIGZvciBuYXRpdmUgcGhvbmVnYXAgc3VwcG9ydDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bob25lZ2FwLWJ1aWxkL0NoaWxkQnJvd3NlclxuXG52YXIgd2luID0gbnVsbDtcblxuLyogdGhlIGtleSBmb3IgcmVmcmVzaCBUb2tlbiBpbiBsb2NhbCBTdG9yYWdlICovXG52YXIgdG9rZW5LZXkgPSAncmVmcmVzaF90b2tlbic7XG5cbi8qIHN0b3JlcyB0aGUgYWNjZXNzVG9rZW4gYWZ0ZXIgcmV0cmlldmFsIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuID0gbnVsbDtcblxuLyogc3RvcmVzIHRoZSBUaW1lIHdoZW4gYWNjZXNzIHRva2VuIHdhcyBsYXN0IHJlY2VpdmVkIGZyb20gc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW5UaW1lID0gbnVsbDtcblxuLyogc3RvcmVzIGFjY2VzcyBUb2tlbidzIEV4cGlyeSBMaW1pdC4gVXNlcyA1OCBtaW4uIGluc3RlYWQgb2YgNjAgbWluLiAqL1xudmFyIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQgPSA1OCAqIDYwICogMTAwMDtcblxuLyogQSB0ZW1wb3JhcnkgdmFyaWFibGUgc3RvcmluZyBjYWxsYmFjayBmdW5jdGlvbiAqL1xudmFyIGNhbGxiYWNrRnVuYyA9IGZhbHNlO1xuXG4vLyBhcmUgd2UgcnVubmluZyBuYXRpdmUgb3IgYnJvd3NlciBtb2RlP1xudmFyIGlzTmF0aXZlID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goL15maWxlLiovKSA/IHRydWUgOiBmYWxzZTtcblxudmFyIENMSUVOVF9JRCA9IGlzTmF0aXZlID9cbiAgICAgICAgXCIzNDQxOTA3MTM0NjUtZGlpbXRmZXJoNHRqYjAzMTY5YmtsOW1rb3F2cTJydTkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIiA6XG4gICAgICAgICBcIjM0NDE5MDcxMzQ2NS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiO1xuXG52YXIgQVBQX0lEID0gXCIzNDQxOTA3MTM0NjVcIjtcblxudmFyIE9BVVRIX1NDT1BFUyA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmZpbGUgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmluc3RhbGwgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnO1xuXG4vKiBjb25maWcgdmFsdWVzIGZvciBHb29nbGUgQVBJIChnYXBpKSAqL1xudmFyIGdhcGlDb25maWcgPSB7XG4gIGVuZHBvaW50OiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoXCIsXG4gIGVuZHRva2VuOiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi90b2tlblwiLCAvLyB0b2tlbiBlbmRwb2ludFxuICByZWRpcmVjdF91cmkgOiBcImh0dHA6Ly9sb2NhbGhvc3RcIixcbiAgY2xpZW50X3NlY3JldCA6ICc2ck9ROWwwZnluaDEzN01SWEdLLUdfWmcnLFxuICByZXNwb25zZV90eXBlIDogXCJjb2RlXCIsXG4gIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgc3RhdGUgOiBcImdkcml2ZWluaXRcIixcbiAgYWNjZXNzX3R5cGUgOiBcIm9mZmxpbmVcIixcbiAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG5cbiAgLyogQXMgZGVmaW5lZCBpbiB0aGUgT0F1dGggMi4wIHNwZWNpZmljYXRpb24sIHRoaXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsdWVcbiAgICAgKiBvZiBcImF1dGhvcml6YXRpb25fY29kZVwiIG9yIFwicmVmcmVzaF90b2tlblwiICovXG4gICAgZ3JhbnRUeXBlczogeyBBVVRIT1JJWkU6IFwiYXV0aG9yaXphdGlvbl9jb2RlXCIsIFJFRlJFU0g6IFwicmVmcmVzaF90b2tlblwiIH0sXG4gfTtcblxuLyoqXG4gKiBFbnVtIGZvciBTdGF0dXMgdmFsdWVzXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqXG4gKiBTVUNDRVNTIC0gU3VjY2Vzc2Z1bGx5IGRhdGEgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXJcbiAqIEVSUk9SIC0gRXJyb3Igb2NjdXJyZWQgd2hlbiB0cnlpbmcgdG8gcmVjZWl2ZSBmcm9tIHNlcnZlclxuICogTk9UX0RFVEVSTUlORUQgLSB1bmRldGVybWluZWRcbiAqL1xudmFyIHN0YXR1cyA9IHtcbiAgICAgICAgU1VDRVNTOiAxLFxuICAgICAgICBFUlJPUjogLTEsXG4gICAgICAgIE5PVF9ERVRFUk1JTkVEOiAwXG59XG5cbnJlcXVlc3RTdGF0dXMgPSAwO1xuXG4vKiBzdG9yZXMgdGhlIGF1dGhvcml6YXRpb24gQ29kZSBpbnRlcm5hbGx5ICovXG5hdXRoQ29kZSA9IGZhbHNlO1xuXG4vKiBzdG9yZXMgdGhlIGVycm9yIG1lc3NhZ2Ugd2hlbiBhbiBlcnJvciBoYXBwZW5zIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xuZXJyb3JNZXNzYWdlID0gZmFsc2U7XG5cbnZhciBsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgY29uc29sZS5sb2coXCIqKipPQVVUSCoqKjogXCIrbXNnKTtcbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBhdXRob3JpemUgdXNlciB1c2luZyBPQXV0aFxuICogT3BlbnMgdXAgQW5vdGhlciB3aW5kb3cgd2hlcmUgdXNlciBhbGxvd3MgYWNjZXNzIG9yIGRlbmllcyBpdC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsQmFjayAgIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgaW52b2tlZFxuICovXG52YXIgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbEJhY2spIHtcbiAgbG9nKFwiYXR0ZW1wdGluZyB0byBhdXRob3JpemVcIik7XG5cbiAgICB2YXIgYXV0aFVyaSA9IGdhcGlDb25maWcuZW5kcG9pbnQgKyAnPydcbiAgICArICdzY29wZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc2NvcGUpXG4gICAgKyAnJicgKyAncmVkaXJlY3RfdXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmkpXG4gICAgKyAnJicgKyAncmVzcG9uc2VfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVzcG9uc2VfdHlwZSlcbiAgICArICcmJyArICdjbGllbnRfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmNsaWVudF9pZCk7XG4gICAgLy8rICcmJyArICdzdGF0ZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc3RhdGUpXG4gICAgLy8rICcmJyArICdhY2Nlc3NfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuYWNjZXNzX3R5cGUpXG4gICAgLy8rICcmJyArICdhcHByb3ZhbF9wcm9tcHQ9Zm9yY2UnOyAvLyBAVE9ETyAtIGNoZWNrIGlmIHdlIHJlYWxseSBuZWVkIHRoaXMgcGFyYW1cblxuICAgIGNhbGxiYWNrRnVuYyA9IGNhbGxCYWNrO1xuICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG5cblxuXG5cbiAgICBsb2coXCJvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcblxuICAgIHRyeSB7XG5cbiAgICAgIC8vIE5vdyBvcGVuIG5ldyBicm93c2VyXG4gICAgICB3aW4gPSB3aW5kb3cub3BlbihhdXRoVXJpLCAnX2JsYW5rJywgJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8nKTtcblxuICAgICAgJCh3aW4pLm9uKCdsb2Fkc3RhcnQnLGZ1bmN0aW9uKGUpe1xuICAgICAgICBsb2coXCJJbkFwcEJyb3dzZXIgbG9hZHN0YXJ0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgICAgb25BdXRoVXJsQ2hhbmdlKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLnNob3dXZWJQYWdlKGF1dGhVcmksIHtzaG93TG9jYXRpb25CYXIgOiB0cnVlfSk7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkNsb3NlID0gb25BdXRoQ2xvc2U7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkxvY2F0aW9uQ2hhbmdlID0gb25BdXRoVXJsQ2hhbmdlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbG9nKFwiRXJyb3Igb3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG4gICAgICBsb2coZSk7XG4gICAgfVxuXG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsYmFjaywgaW1tZWRpYXRlKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiBpbW1lZGlhdGVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgYXV0aENvZGUgPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBjYWxsYmFjayhhdXRoQ29kZSk7XG4gIH0pO1xuXG4gIH1cbn1cblxuLyogQXV0aCBXaW5kb3cgY2xvc2VkICovXG52YXIgb25BdXRoQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkF1dGggd2luZG93IGNsb3NlZFwiKTtcbn07XG5cbi8qIE9BdXRoIFN1Y2Nlc3NmdWxseSBkb25lICovXG52YXIgb25BdXRoU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdBdXRoIFN1Y2Nlc3M/Jyk7XG59O1xuXG4vKipcbiAqIEdldHMgSW52b2tlZCB3aGVuIHRoZSBVUkwgY2hhbmdlcyBvbiBPQXV0aCBhdXRob3JpemF0aW9uIHByb2Nlc3NcbiAqXG4gKiBTdWNjZXNzIFVSTCBQYXR0ZXJuOlxuICogXCJyZWRpcmVjdF91cmlcIiArIFwiP2NvZGU9XCIgW3NlY3JldCBjb2RlIHZhbF1cbiAqXG4gKiBTdWNjZXNzIFNhbXBsZSBVUkw6XG4gKiBodHRwOi8vbG9jYWxob3N0Lz9jb2RlPTQvV09wUkxRZnZ2aEhFMHR1TVVERHFubjc2bENUVC44blhDNEllYk1FQVV1SkpWbkw0OUNjOEFRR3I4Y1FJXG4gKlxuICogRGVuaWVkIEFjY2VzcyBVUkwgUGF0dGVybjogXCJyZWRpcmVjdF91cmlcIiArID9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKiBEZW5pZWQgQWNjZXNzIFNhbXBsZTogaHR0cDovL2xvY2FsaG9zdC8/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmlMb2NhdGlvbiBUaGUgVVJJIExvY2F0aW9uXG4gKi9cbnZhciBvbkF1dGhVcmxDaGFuZ2UgPSBmdW5jdGlvbih1cmlMb2NhdGlvbikge1xuICAgIGNvbnNvbGUubG9nKFwiSW5BcHBCcm93c2VyIHVybCBjaGFuZ2VkIFwiK3VyaUxvY2F0aW9uKTtcbiAgICBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiY29kZT1cIikgIT0gLTEpIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5TVUNDRVNTO1xuXG4gICAgICAgIC8qIFN0b3JlIHRoZSBhdXRoQ29kZSB0ZW1wb3JhcmlseSAqL1xuICAgICAgICBhdXRoQ29kZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImNvZGVcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBsb2coXCJGb3VuZCBhdXRoIGNvZGU6IFwiK2F1dGhDb2RlKTtcblxuICAgICAgICBnZXRSZWZyZXNoVG9rZW4oY2FsbGJhY2tGdW5jKTtcblxuICAgICAgICAvLyBjbG9zZSB0aGUgY2hpbGRCcm93c2VyXG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiZXJyb3I9XCIpICE9IC0xKSAge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLkVSUk9SO1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJlcnJvclwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGNhbGxiYWNrRnVuYygpO1xuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuICAgICAgICAvL2NhbGxiYWNrRnVuYygpO1xuICAgIH1cbn07XG5cblxuLyoqXG4qIEdldHMgdGhlIFJlZnJlc2ggZnJvbSBBY2Nlc3MgVG9rZW4uIFRoaXMgbWV0aG9kIGlzIG9ubHkgY2FsbGVkIGludGVybmFsbHksXG4qIGFuZCBvbmNlLCBvbmx5IGFmdGVyIHdoZW4gYXV0aG9yaXphdGlvbiBvZiBBcHBsaWNhdGlvbiBoYXBwZW5zLlxuKlxuKiBAcGFyYW0gcGFyYW1PYmogQW4gT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSBwYXJhbU9iai5hdXRoX2NvZGUgVGhlIEF1dGhvcml6YXRpb24gQ29kZSBmb3IgZ2V0dGluZyBSZWZyZXNoIFRva2VuXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bCByZXRyaWV2YWwgb2YgZGF0YSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKi9cbnZhciBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBjb25zb2xlLmxvZyhcImFjY2VzcyByZWZyZXNoIHRva2VuXCIpO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgICBjb2RlICAgICAgICAgOiBhdXRoQ29kZSxcbiAgICAgICAgICAgICAgICAgICByZWRpcmVjdF91cmkgOiBnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSxcbiAgICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuQVVUSE9SSVpFXG4gICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzIGdldHRpbmcgcmVmcmVzaCB0b2tlblwiKTtcblxuICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICBhY2Nlc3NUb2tlbiAgICAgPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAvKiBzZXQgdGhlIGVycm9yIG9mIGRhdGEgdG8gZmFsc2UsIGFzIGl0IHdhcyBzdWNjZXNzZnVsICovXG4gICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcblxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG5cbiAgICAgICAgLyogbm93IGludm9rZSB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgY2FsbGJhY2soe2FjY2Vzc190b2tlbjogYWNjZXNzVG9rZW59KTtcbiAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogVGhpcyBtZXRob2Qgc2hvdWxkIE9OTFkgYmUgY2FsbGVkIGxvY2FsbHkgZnJvbSB3aXRoaW4gdGhpcyBjbGFzcy5cbiogUmV0dXJucyB0aGUgUmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZS5cbipcbiogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVmcmVzaCBUb2tlblxuKlxuKi9cbnZhciBnZXRUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xufTtcblxuXG4vKipcbiogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBleHRlcm5hbGx5LiBJdCByZXRyaWV2ZXMgdGhlIEFjY2VzcyBUb2tlbiBieSBhdCBmaXJzdFxuKiBjaGVja2luZyBpZiBjdXJyZW50IGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZCBvciBub3QuIElmIGl0cyBub3QgZXhwaXJlZCwgaXRcbiogc2ltcGx5IHJldHVybnMgdGhhdCwgb3RoZXJ3aXNlLCBpdCBnZXRzIHRoZSByZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlXG4qIChieSBpbnZva2luZyBnZXRUb2tlbikgYW5kIHRoZW4gY29ubmVjdGluZyB3aXRoIEdvb2dsZSdzIFNlcnZlciAodXNpbmcgT0F1dGgpXG4qIHRvIGdldCB0aGUgQWNjZXNzIFRva2VuLlxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgIEEgY2FsbEJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSBpcyByZXRyaWV2ZWQgZnJvbSB0aGUgZ29vZ2xlJ3Mgc2VydmVyLiBUaGUgZGF0YVxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBnb29nbGUgc2VydmVyIGlzIHBhc3NlZCB0byBjYWxsYmFjayBhcyBhcmdzLlxuKlxuKi9cbnZhciBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICBjb25zb2xlLmxvZyhcImdldHRpbmcgYWNjZXNzIHRva2VuXCIpO1xuXG4gICAvKiBjaGVjayBpZiBjdXJyZW50IFRva2VuIGhhcyBub3QgZXhwaXJlZCAoc3RpbGwgdmFsaWQpICovXG4gICBpZiAoYWNjZXNzVG9rZW4gJiYgYWNjZXNzVG9rZW4gIT0gZmFsc2UgJiZcbiAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgY2FsbGJhY2soeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pO1xuXG4gICAgICAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc29sZS5sb2coXCJBQ0NFU1MgVE9LRU4gUEFSQU1TOiBcIithY2Nlc3NUb2tlbitcIiBcIithY2Nlc3NUb2tlblRpbWUrXCIgXCIrYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCk7XG5cbiAgIC8qIGVsc2UsIGdldCB0aGUgcmVmcmVzaFRva2VuIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgZ2V0IGEgbmV3IGFjY2VzcyBUb2tlbiAqL1xuICAgdmFyIHJlZnJlc2hUb2tlbiA9IGdldFRva2VuKCk7XG5cbiAgIC8vICAgY29uc29sZS5sb2coXCJSZWZyZXNoIFRva2VuID4+IFwiICsgcmVmcmVzaFRva2VuKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLlJFRlJFU0gsXG4gICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgICAgICAvKiBzZXQgdGhlIGVycm9yIHRvIGZhbHNlICovXG4gICAgICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBlcnJvciA/PyA+PlwiICsgeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7IC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgIGlmIChhY2Nlc3NUb2tlbiAmJlxuICAgICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgICAgY2FsbGJhY2soYWNjZXNzVG9rZW4pO1xuXG4gICAgICAgICAgICAgcmV0dXJuO1xuICAgICB9XG5cbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGFjY2Vzc1Rva2VuID0gdG9rZW47XG4gICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuXG4vKipcbiogU2F2ZXMgdGhlIFJlZnJlc2ggVG9rZW4gaW4gYSBsb2NhbCBkYXRhYmFzZSBvciBsb2NhbFN0b3JhZ2VcbiogVGhpcyBtZXRob2Qgc2hhbGwgYmUgaW52b2tlZCBmcm9tIGV4dGVybmFsbHkgb25seSA8Yj5vbmNlPC9iPiBhZnRlciBhblxuKiBhdXRob3JpemF0aW9uIGNvZGUgaXMgcmVjZWl2ZWQgZnJvbSBnb29nbGUncyBzZXJ2ZXIuIFRoaXMgbWV0aG9kXG4qIGNhbGxzIHRoZSBvdGhlciBtZXRob2QgKGdldFJlZnJlc2hUb2tlbikgdG8gZ2V0IHRoZSByZWZyZXNoIFRva2VuIGFuZFxuKiB0aGVuIHNhdmVzIGl0IGxvY2FsbHkgb24gZGF0YWJhc2UgYW5kIGludm9rZXMgYSBjYWxsYmFjayBmdW5jdGlvblxuKlxuKiBAcGFyYW0gdG9rZW5PYmogQSBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHtTdHJpbmd9IHRva2VuT2JqLmF1dGhfY29kZSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdpdGggcGFyYW1ldGVyc1xuKi9cbnZhciBzYXZlUmVmcmVzaFRva2VuID0gZnVuY3Rpb24odG9rZW5PYmosIGNhbGxiYWNrKSB7XG4gICAgIGdldFJlZnJlc2hUb2tlbih0b2tlbk9iaiwgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgLyogaWYgdGhlcmUncyBubyBlcnJvciAqL1xuICAgICAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAVE9ETzogbWFrZSBhbm90aGVyIG1ldGhvZCBzYXZlVG9rZW4gdG8gYWJzdHJhY3QgdGhlIHN0b3Jpbmcgb2YgdG9rZW5cbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICB9KTtcbn07XG5cblxuXG4vKipcbiogQ2hlY2tzIGlmIHVzZXIgaGFzIGF1dGhvcml6ZWQgdGhlIEFwcCBvciBub3RcbiogSXQgZG9lcyBzbyBieSBjaGVja2luZyBpZiB0aGVyZSdzIGEgcmVmcmVzaF90b2tlblxuKiBhdmFpbGFibGUgb24gdGhlIGN1cnJlbnQgZGF0YWJhc2UgdGFibGUuXG4qXG4qIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYXV0aG9yaXplZCwgZmFsc2Ugb3RoZXJ3aXNlXG4qL1xudmFyIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdG9rZW5WYWx1ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG5cbiAgICAgIGNhbGxiYWNrKCgodG9rZW5WYWx1ZSAhPT0gbnVsbCkgJiYgKHR5cGVvZiB0b2tlblZhbHVlICE9PSAndW5kZWZpbmVkJykpKTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIEV4dHJhY3RzIHRoZSBjb2RlIGZyb20gdGhlIHVybC4gQ29waWVkIGZyb20gb25saW5lXG4qIEBUT0RPIG5lZWRzIHRvIGJlIHNpbXBsaWZpZWQuXG4qXG4qIEBwYXJhbSBuYW1lIFRoZSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWUgaXMgdG8gYmUgZ3JhYmJlZCBmcm9tIHVybFxuKiBAcGFyYW0gdXJsICBUaGUgdXJsIHRvIGJlIGdyYWJiZWQgZnJvbS5cbipcbiogQHJldHVybiBSZXR1cm5zIHRoZSBWYWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBuYW1lIHBhc3NlZFxuKi9cbnZhciBnZXRQYXJhbWV0ZXJCeU5hbWUgPSBmdW5jdGlvbihuYW1lLCB1cmwpIHtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCBcIlxcXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLCBcIlxcXFxcXF1cIik7XG4gIHZhciByZWdleFMgPSBcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIjtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleFMpO1xuICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcblxuICBpZihyZXN1bHRzID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZWxzZVxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhvcml6ZSA6IGF1dGhvcml6ZSxcbiAgaXNBdXRob3JpemVkIDogaXNBdXRob3JpemVkLFxuICBnZXRBY2Nlc3NUb2tlbiA6IGdldEFjY2Vzc1Rva2VuLFxuICBBUFBfSUQgOiBBUFBfSURcbn07XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxudmFyIGNhY2hlZFRpbGVTdHlsZSA9IHtcbiAgd2hlcmU6IFwicGlkIGluICgpXCIsXG4gIHBvbHlnb25PcHRpb25zOiB7XG4gICAgZmlsbENvbG9yOiBcIiMwMDAwMDBcIixcbiAgICBzdHJva2VDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgc3Ryb2tlV2VpZ2h0OiAzXG4gIH1cbn1cblxudmFyIGNhY2hlZFRpbGVzID0gW107XG52YXIgY2FjaGVkVGlsZXNMb2FkZWQgPSBmYWxzZTtcbnZhciBjYWNoZWRUaWxlUHJlZml4ID0gJ2NhY2hlZF90aXRsZV8nO1xudmFyIGNhY2hpbmcgPSBmYWxzZTtcbnZhciBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gZmFsc2U7XG52YXIgY01hcERhdGEgPSB7fTtcblxudmFyIGNvbHMgPSBbXTtcbnZhciBhcHAgPSBudWxsO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBfbG9hZEZyb21DYWNoZSgpO1xuICBfbG9hZENhY2hlZFRpbGVzKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIGlmKCAhY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIGFsbCB0aWxlIGRhdGEgZnJvbSB0aGUgY2FjaGU/JykgKSByZXR1cm47XG5cbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXMgPSBbXTtcbn1cblxuLy8gZSBpcyB0aGUgZXZlbnQgb2JqZWN0IGZyb20gZ29vZ2xlIG1hcHNcbmZ1bmN0aW9uIGNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIXNhdmVDYWNoZU9uQ2xpY2tTZXQgKSB7XG4gICAgc2F2ZUNhY2hlT25DbGlja1NldCA9IHRydWU7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBfc2F2ZVRpbGUoKTtcbiAgICB9KTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmlzKCdjaGVja2VkJykgKSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiggY2FjaGluZyApIHJldHVybjtcbiAgY2FjaGluZyA9IHRydWU7XG5cbiAgY01hcERhdGEgPSB7XG4gICAgZnVzaW9uTGF5ZXIgOiBmdXNpb25MYXllcixcbiAgICBkZWZhdWx0T3B0aW9ucyA6IGRlZmF1bHRPcHRpb25zLFxuICAgIGRlZmF1bHRTdHlsZSA6IGRlZmF1bHRTdHlsZSxcbiAgICBwaWQgOiAgZS5yb3cucGlkLnZhbHVlXG4gIH1cblxuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgnJyk7XG4gICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuc2hvdygpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG5cbiAgX2xvYWRUaWxlKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuc2hvdygpO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuaGlkZSgpO1xuXG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBpZCcpLmh0bWwoY01hcERhdGEucGlkKTtcbiAgICBjTWFwRGF0YS5kYXRhID0gZGF0YTtcbiAgICBjYWNoaW5nID0gZmFsc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgX2NyZWF0ZU5hdk1lbnUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3QgdHJlZSBidXR0b25cbiAgJCgnI3RyZWUtc3ViLW1lbnUnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0b3IgZm9yIHVwbG9hZGluZyB3ZWF0aGVyIGRhdGEgZnJvbSBhIGdvb2dsZSBzcHJlYWRzaGVldFxuICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBzaG93IHRoZSBjYWNoZSB2ZXJzaW9uIG9mIHRoZSBsb2NhdGlvbiBzZWxlY3RvclxuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9ubGluZScpLmhpZGUoKTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lJykuc2hvdygpO1xuXG4gIC8vIHNldCB0aGUgbG9jYXRpb24gc2VsZWN0b3IgdWkgbGlzdCBiYXNlZCBvbiBjYWNoZWQgdGlsZXNcbiAgX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhY2FjaGVkVGlsZXNMb2FkZWQgKSBfbG9hZENhY2hlZFRpbGVzKCk7XG5cbiAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzID0gW2RlZmF1bHRTdHlsZV07XG5cbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA+IDAgKSB7XG4gICAgY2FjaGVkVGlsZVN0eWxlLndoZXJlID0gJ3BpZCBpbiAoJytjYWNoZWRUaWxlcy5qb2luKCcsJykrJyknO1xuICAgIGRlZmF1bHRPcHRpb25zLnN0eWxlcy5wdXNoKGNhY2hlZFRpbGVTdHlsZSk7XG4gIH1cblxuICBmdXNpb25MYXllci5zZXRPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX3NhdmVUaWxlKCkge1xuICB2YXIgbmFtZSA9ICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgcmV0dXJuIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIG5hbWUnKTtcblxuICBjTWFwRGF0YS5kYXRhLm5hbWUgPSBuYW1lO1xuXG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NNYXBEYXRhLnBpZCwgSlNPTi5zdHJpbmdpZnkoY01hcERhdGEuZGF0YSkpO1xuXG4gIGNhY2hlZFRpbGVzLnB1c2goY01hcERhdGEucGlkKTtcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChjTWFwRGF0YS5mdXNpb25MYXllciwgY01hcERhdGEuZGVmYXVsdE9wdGlvbnMsIGNNYXBEYXRhLmRlZmF1bHRTdHlsZSk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRUaWxlKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd0aWxlLWRhdGEtY2FjaGUnLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcbiAgdmFyIHdlYXRoZXJUYWJsZSA9IHt9O1xuICB2YXIgc29pbFRhYmxlID0ge307XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soe3dlYXRoZXI6d2VhdGhlclRhYmxlLCBzb2lsOnNvaWxUYWJsZX0pO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB3ZWF0aGVyVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgc29pbFRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCkge1xuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID09IDAgKSB7XG4gICAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKS5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGxpc3RFbGUgPSAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbGlzdCcpLmh0bWwoJzxkaXY+U2VsZWN0IENhY2hlZCBUaWxlPC9kaXY+JyksIGVsZTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjYWNoZWRUaWxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2ldKTtcbiAgICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICAgIGVsZSA9ICQoJzxkaXY+PGEgY2FjaGVpZD1cIicraSsnXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPicrY2FjaGVkVGlsZXNbaV0rJzogJytqc29uLm5hbWUrJzwvYT48L2Rpdj4nKTtcbiAgICBlbGUuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3J1bkNhY2hlZFRpbGUocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdjYWNoZWlkJykpKTtcbiAgICB9KTtcbiAgICBsaXN0RWxlLmFwcGVuZChlbGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3J1bkNhY2hlZFRpbGUoaW5kZXgpIHtcbiAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpbmRleF0pO1xuICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24ud2VhdGhlci5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBtID0gaSsnJztcbiAgICBmb3IoIHZhciBqID0gMTsgaiA8IGpzb24ud2VhdGhlci5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIraSkudmFsKGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0gPyBqc29uLndlYXRoZXIucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICB9XG4gIH1cblxuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi5zb2lsLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIGpzb24uc29pbC5yb3dzWzBdID09IG51bGwgKSBjb250aW51ZTtcbiAgICAkKFwiI2lucHV0LXNvaWwtXCIranNvbi5zb2lsLmNvbHNbaV0uaWQpLnZhbChqc29uLnNvaWwucm93c1swXS5jW2ldLnYpO1xuICB9XG5cbiAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBhcHAucnVuTW9kZWwoKTtcbiAgfSwgNTAwKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRDYWNoZWRUaWxlcygpIHtcbiAgY2FjaGVkVGlsZXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICBjYWNoZWRUaWxlcy5wdXNoKGtleS5yZXBsYWNlKGNhY2hlZFRpbGVQcmVmaXgsJycpKTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXNMb2FkZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlTmF2TWVudSgpIHtcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIj5PRkZMSU5FIE1PREU8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nXG4gICAgICArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG5mdW5jdGlvbiBfbG9hZEZyb21DYWNoZSgpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2NhY2hlL2pzYXBpJyxcbiAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2NoYXJ0LmNzcycpICk7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9hbm5vdGF0ZWR0aW1lbGluZS5jc3MnKSApO1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICdjYWNoZS9jaGFydC5qcycsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNoYXJ0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGlmKCBjaGFydHNDYWxsYmFjayApIGNoYXJ0c0NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIHJlbmRlciA6IHJlbmRlcixcbiAgY2FjaGVUaWxlIDogY2FjaGVUaWxlLFxuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwIDogcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCxcbiAgY2xlYXJDYWNoZSA6IGNsZWFyQ2FjaGVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIk1lYW4gVmFwb3IgUHJlc3N1cmUgRGVmaWNpdFwiLFxuICAgICAgdW5pdHMgOiBcImtQQVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcInRoZSBkaWZmZXJlbmNlIChkZWZpY2l0KSBiZXR3ZWVuIHRoZSBhbW91bnQgb2YgbW9pc3R1cmUgaW4gdGhlIGFpciBhbmQgaG93IG11Y2ggXCIgK1xuICAgICAgXHRcdFwibW9pc3R1cmUgdGhlIGFpciBjYW4gaG9sZCB3aGVuIGl0IGlzIHNhdHVyYXRlZFwiXG4gIH0sXG4gIGZWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmVCA6IHtcbiAgICAgIGxhYmVsIDogXCJUZW1wZXJhdHVyZSBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmRnJvc3QgOiB7XG4gICAgICBsYWJlbCA6IFwiRnJvc3QgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBmcm9zdCBkYXlzIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBBUiA6IHtcbiAgICAgIGxhYmVsIDogXCJNb250aGx5IFBob3Rvc3ludGhldGljYWxseSBBY3RpdmUgUmFkaWF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW9scyAvIG1eMiBtb250aFwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlc2lnbmF0ZXMgdGhlIHNwZWN0cmFsIHJhbmdlICh3YXZlIGJhbmQpIG9mIHNvbGFyIHJhZGlhdGlvbiBmcm9tIDQwMCB0byA3MDAgbmFub21ldGVycyBcIiArXG4gICAgICBcdFx0XCJ0aGF0IHBob3Rvc3ludGhldGljIG9yZ2FuaXNtcyBhcmUgYWJsZSB0byB1c2UgaW4gdGhlIHByb2Nlc3Mgb2YgcGhvdG9zeW50aGVzaXNcIlxuICB9LFxuICB4UFAgOiB7XG4gICAgICBsYWJlbCA6IFwiTWF4aW11bSBQb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiTWV0cmljIFRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEludGNwdG4gOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IFJhaW5mYWxsIEludGVyY2VwdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlByZWNpcGl0YXRpb24gdGhhdCBkb2VzIG5vdCByZWFjaCB0aGUgc29pbCwgYnV0IGlzIGluc3RlYWQgaW50ZXJjZXB0ZWQgYnkgdGhlIGxlYXZlcyBhbmQgYnJhbmNoZXMgb2YgcGxhbnRzIGFuZCB0aGUgZm9yZXN0IGZsb29yLlwiXG4gIH0sXG4gIEFTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJBdmFpbGFibGUgU29pbCBXYXRlclwiLFxuICAgICAgdW5pdHMgOiBcIm1tXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgQ3VtSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiQ3VtdWxhdGl2ZSBSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFN0YW5kQWdlIDoge1xuICAgICAgbGFiZWwgOiBcIlN0YW5kIEFnZVwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIExBSSA6IHtcbiAgICAgIGxhYmVsIDogXCJMZWFmIEFyZWEgSW5kZXhcIixcbiAgICAgIHVuaXRzIDogXCJtMiAvIG0yXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiVGhlIG9uZS1zaWRlZCBncmVlbiBsZWFmIGFyZWEgcGVyIHVuaXQgZ3JvdW5kIHN1cmZhY2UgYXJlYVwiXG4gIH0sXG4gIENhbkNvbmQgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IENvbmR1Y3RhbmNlXCIsXG4gICAgICB1bml0cyA6IFwiZ2MsbS9zXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgVHJhbnNwIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJXYXRlciBtb3ZlbWVudCB0aHJvdWdoIGEgcGxhbnQgYW5kIGl0cyBldmFwb3JhdGlvbiBmcm9tIGFlcmlhbCBwYXJ0c1wiXG4gIH0sXG4gIEVUciA6IHtcbiAgICAgIGxhYmVsIDogXCJFVHJcIixcbiAgICAgIHVuaXRzIDogXCJtbVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlJlZmVyZW5jZSBldmFwb3RyYW5zcGlyYXRpb24gZm9yIEFsZmFsZmFcIlxuICB9LFxuICBLYyA6IHtcbiAgICAgIGxhYmVsIDogXCJLY1wiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkNyb3AgY29lZmZpY2llbnRzXCJcbiAgfSxcbiAgZlNXIDoge1xuICAgICAgbGFiZWwgOiBcIlNvaWwgV2F0ZXIgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBhZ2VcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUGh5c01vZCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gQ2Fub3B5IENvbmR1Y3RhbmNlXCJcbiAgfSxcbiAgcFIgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiXG4gIH0sXG4gIHBTIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZVwiXG4gIH0sXG4gIGxpdHRlcmZhbGwgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcml0aW9uIDogXCJcIixcbiAgICAgIGFsdEZuTmFtZSA6IFwidGRwXCJcbiAgfSxcbiAgTlBQIDoge1xuICAgICAgbGFiZWwgOiBcIk5ldCBDYW5vcHkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgV0YgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJlX1dGLCBjdXJfZFcsIGN1cl9wRiwgY3VyX2xpdHRlcmZhbGwsIHByZXZfV0YpIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XRiArIGN1cl9kVyAqIGN1cl9wRiAtIGN1cl9saXR0ZXJmYWxsICogcHJldl9XRlxuICAgICAgfVxuICB9LFxuICBXUiA6IHtcbiAgICAgIGxhYmVsIDogXCJSb290IEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dSLCBjdXJfZFcsIGN1cl9wUiwgdHVybm92ZXIsIHByZXZfV1IsIGN1cl9Sb290UCkge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dSICsgY3VyX2RXICogY3VyX3BSIC0gdHJlZS5wUi50dXJub3ZlciAqIHByZXZfV1IgLSBjdXJfUm9vdFA7XG4gICAgICB9XG4gIH0sXG4gIFdTIDoge1xuICAgICAgbGFiZWwgOiBcIlN0ZW0gQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1MsIGN1cl9kVywgY3VyX3BTKSB7IHJldHVybiBwcmV2X1dTICsgY3VyX2RXICogY3VyX3BTIH1cbiAgfSxcbiAgVyA6IHtcbiAgICAgIGxhYmVsIDogXCJUb3RhbCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24oY3VyX1dGLCBjdXJfV1IsIGN1cl9XUykgeyByZXR1cm4gY3VyX1dGK2N1cl9XUitjdXJfV1MgfVxuICB9XG59XG4iLCJ2YXIgbW9kZWxJTyA9IHJlcXVpcmUoJy4uL21vZGVsUnVuSGFuZGxlcicpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xudmFyIGFwcDtcblxudmFyIHNob3cgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG4gIHZhciBpLCB6O1xuXG4gIC8vIHNlbGVjdGVkIGluIHRoZSBjaGFydHMgb3V0cHV0XG4gIHZhciB2YXJzID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKTtcblxuICAvLyBmaW5kIHRoZSByb3dzIHdlIGNhcmUgYWJvdXRcbiAgdmFyIGNoYXJ0Um93cyA9IHt9O1xuICBmb3IoIGkgPSAwOyBpIDwgcmVzdWx0c1swXS5oZWFkZXIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdmFycy5pbmRleE9mKHJlc3VsdHNbMF0uaGVhZGVyW2ldKSA+IC0xICkgY2hhcnRSb3dzW3Jlc3VsdHNbMF0uaGVhZGVyW2ldXSA9IGk7XG4gIH1cblxuICB2YXIgdGFicyA9ICQoJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cInJhd091dHB1dFRhYnNcIiAgZGF0YS10YWJzPVwicGlsbFwiPjwvdWw+Jyk7XG4gIHZhciBjb250ZW50cyA9ICQoJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiIHN0eWxlPVwib3ZlcmZsb3c6YXV0bzttYXJnaW4tdG9wOjE1cHhcIj48L2Rpdj4nKTtcblxuICBmb3IoIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFicy5hcHBlbmQoJCgnPGxpICcrKGkgPT09IDAgPyAnY2xhc3M9XCJhY3RpdmVcIicgOiBcIlwiKSsnPjxhIGhyZWY9XCIjcmF3b3V0J1xuICAgICAgICAgICt2YXJzW2ldKydcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPicrdmFyc1tpXSsnPC9hPjwvbGk+JykpO1xuXG4gICAgICBjb250ZW50cy5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cInRhYi1wYW5lICcgKyAoaSA9PT0gMCA/ICdhY3RpdmUnIDogXCJcIilcbiAgICAgICAgICArICdcIiBpZD1cInJhd291dCcgKyB2YXJzW2ldICsgJ1wiPjwvZGl2PicpKTtcbiAgfVxuXG4gICQoXCIjb3V0cHV0LWNvbnRlbnRcIikuaHRtbChcIlwiKS5hcHBlbmQodGFicykuYXBwZW5kKGNvbnRlbnRzKTtcbiAgJChcIiNyYXdPdXRwdXRUYWJzXCIpLnRhYigpO1xuXG4gIGNzdlJlc3VsdHMgPSB7XG4gICAgICBjb25maWcgOiBtb2RlbElPLmV4cG9ydFNldHVwKCksXG4gICAgICBpbnB1dHMgOiBbXSxcbiAgICAgIGhlYWRlciA6IHJlc3VsdHNbMF0uaGVhZGVyLFxuICAgICAgZGF0YSA6IHt9XG4gIH07XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKyApIHtcbiAgICBjc3ZSZXN1bHRzLmlucHV0cy5wdXNoKHJlc3VsdHNbaV0uaW5wdXRzKTtcbiAgfVxuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcblxuICB2YXIgdGFibGUsIHJvdztcbiAgZm9yKCB2YXIga2V5IGluIGNoYXJ0Um93cyApIHtcbiAgICAgIHRhYmxlID0gXCI8dGFibGUgY2xhc3M9J3RhYmxlIHRhYmxlLXN0cmlwZWQnPlwiO1xuXG4gICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XSA9IFtdO1xuXG5cbiAgICAgIC8vIHNldCBoZWFkZXIgcm93XG4gICAgICB2YXIgY3VycmVudFJvdyA9IFtdO1xuICAgICAgY3VycmVudFJvdy5wdXNoKCdkYXRlJyk7XG4gICAgICAvL2N1cnJlbnRSb3cucHVzaCgnc3RlcCcpO1xuXG4gICAgICB0YWJsZSArPSBcIjx0cj48dGg+RGF0ZTwvdGg+PHRoPlN0ZXA8L3RoPlwiO1xuXG4gICAgICBmb3IoIHogPSAwOyB6IDwgcmVzdWx0cy5sZW5ndGg7IHorKyApIHtcbiAgICAgICAgICB0YWJsZSArPSBcIjx0aD5cIjtcbiAgICAgICAgICB2YXIgdG1wID0gW107XG5cbiAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiByZXN1bHRzW3pdLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgdG1wLnB1c2gobVR5cGUrXCI9XCIrcmVzdWx0c1t6XS5pbnB1dHNbbVR5cGVdKTtcbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8ZGl2PlwiK21UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCB0bXAubGVuZ3RoID09PSAwICkge1xuICAgICAgICAgICAgICBjdXJyZW50Um93LnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgdGFibGUgKz0ga2V5O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaCh0bXAuam9pbihcIiBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0YWJsZSArPSBcIjwvdGg+XCI7XG4gICAgICB9XG4gICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XS5wdXNoKGN1cnJlbnRSb3cpO1xuICAgICAgdmFyIGMgPSAwO1xuXG4gICAgICBmb3IoIHZhciBkYXRlIGluIHJlc3VsdHNbMF0ub3V0cHV0ICkge1xuICAgICAgICBjKys7XG4gICAgICAgIGN1cnJlbnRSb3cgPSBbXTtcblxuICAgICAgICB0YWJsZSArPSBcIjx0cj48dGQ+XCIrZGF0ZStcIjwvdGQ+PHRkPlwiK2MrXCI8L3RkPlwiO1xuXG4gICAgICAgIGN1cnJlbnRSb3cucHVzaChkYXRlKTtcbiAgICAgICAgLy9jdXJyZW50Um93LnB1c2goYyk7XG5cbiAgICAgICAgdmFyIHY7XG4gICAgICAgIGZvciggeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgIGlmKCAhcmVzdWx0c1t6XS5vdXRwdXRbZGF0ZV0gKSB7XG4gICAgICAgICAgICB0YWJsZSArPSBcIjx0ZD48L3RkPlwiO1xuICAgICAgICAgICAgY3VycmVudFJvdy5wdXNoKG51bGwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2ID0gcmVzdWx0c1t6XS5vdXRwdXRbZGF0ZV1bY2hhcnRSb3dzW2tleV1dO1xuICAgICAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrditcIjwvdGQ+XCI7XG4gICAgICAgICAgICBjdXJyZW50Um93LnB1c2godik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcblxuICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XS5wdXNoKGN1cnJlbnRSb3cpO1xuICAgICAgfVxuICAgICAgJChcIiNyYXdvdXRcIiArIGtleSkuaHRtbCh0YWJsZStcIjwvdGFibGU+XCIpO1xuICB9XG5cbiAgYXBwLnNldENzdlJlc3VsdHMoY3N2UmVzdWx0cyk7XG5cbiAgLy8gbWFrZSBzdXJlIHdlIGNhbiBzZWUgdGhlIGV4cG9ydCBidG5cbiAgaWYoICFvZmZsaW5lTW9kZSApICQoXCIjc2hvdy1leHBvcnQtY3N2XCIpLnNob3coKTtcblxuICByZXR1cm4gY3N2UmVzdWx0cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaG93IDogc2hvdyxcbiAgaW5pdCA6IGZ1bmN0aW9uKGEpIHtcbiAgICBhcHAgPSBhO1xuICB9XG59O1xuIiwiZnVuY3Rpb24gcXMoa2V5KSB7XG4gIGtleSA9IGtleS5yZXBsYWNlKC9bKis/XiQuXFxbXFxde30oKXxcXFxcXFwvXS9nLCBcIlxcXFwkJlwiKTtcbiAgdmFyIG1hdGNoID0gbG9jYXRpb24uc2VhcmNoLm1hdGNoKG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBrZXkgKyBcIj0oW14mXSspKCZ8JClcIikpO1xuICByZXR1cm4gbWF0Y2ggJiYgZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcXMgOiBxc1xufTtcbiIsInZhciBvcHRpb25zID0ge1xuICB0aXRsZSA6ICdXZWF0aGVyJyxcbiAgaGVpZ2h0IDogMzAwLFxuICB2QXhlczogW3tcbiAgICAgICAgICB0aXRsZTogXCJSYWRpYXRpb24gKE1KL2RheSk7IFRlbXBlcmF0dXJlICheQyk7IERldyBQb2ludCAoXkMpOyBEYXlsaWdodCAoaClcIixcbiAgICAgICAgICBtaW5WYWx1ZSA6IC01LFxuICAgICAgICAgIG1heFZhbHVlIDogMzVcbiAgICAgICAgfSx7XG4gICAgICAgICAgdGl0bGU6IFwiUHJlY2lwaXRhdGlvbiAobW0pXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNTAsXG4gICAgICAgICAgbWF4VmFsdWUgOiAzNTBcbiAgICAgICAgfV0sXG4gIGhBeGlzOiB7dGl0bGU6IFwiTW9udGhcIn0sXG4gIHNlcmllc1R5cGU6IFwiYmFyc1wiLFxuICBzZXJpZXM6IHtcbiAgICAgIDA6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMToge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAyOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDM6IHt0eXBlOiBcImFyZWFcIiwgdGFyZ2V0QXhpc0luZGV4OjF9LFxuICAgICAgNDoge3RhcmdldEF4aXNJbmRleDowfVxuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGUocm9vdCwgZGF0YSkge1xuICAkKHJvb3QpLmh0bWwoJycpO1xuXG4gIHZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcbiAgZHQuYWRkQ29sdW1uKCdzdHJpbmcnLCAnTW9udGgnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTWluIFRlbXBlcmF0dXJlJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01heCBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdEZXcgUG9pbnQnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUHJlY2lwaXRhdGlvbicpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdSYWRpYXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGF5bGlnaHQnKTtcblxuICB2YXIgcm93cyA9IFtdO1xuICBmb3IoIHZhciBkYXRlIGluIGRhdGEgKSB7XG4gICAgICB2YXIgb2JqID0gZGF0YVtkYXRlXTtcbiAgICAgIHJvd3MucHVzaChbXG4gICAgICAgICAgcGFyc2VJbnQoZGF0ZS5yZXBsYWNlKC8tL2csICcnKSksXG4gICAgICAgICAgZGF0ZSsnJyxcbiAgICAgICAgICBvYmoudG1pbiB8fCAwLFxuICAgICAgICAgIG9iai50bWF4IHx8IDAsXG4gICAgICAgICAgb2JqLnRkbWVhbiB8fCAwLFxuICAgICAgICAgIG9iai5wcHQgfHwgMCxcbiAgICAgICAgICBvYmoucmFkIHx8IDAsXG4gICAgICAgICAgb2JqLmRheWxpZ2h0IHx8IDBcbiAgICAgIF0pO1xuICB9XG5cbiAgcm93cy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgIGlmKCBhWzBdID4gYlswXSApIHJldHVybiAxO1xuICAgIGlmKCBhWzBdIDwgYlswXSApIHJldHVybiAtMTtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG4gIC8vIHJlbW92ZSBzb3J0IHZhbHVlXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICByb3dzW2ldLnNwbGljZSgwLCAxKTtcbiAgfVxuXG4gIGR0LmFkZFJvd3Mocm93cyk7XG5cbiAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkNvbWJvQ2hhcnQocm9vdCk7XG4gIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBjaGFydDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZSA6IGNyZWF0ZVxufTtcbiIsInZhciB3ZWF0aGVyID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIGFwcDtcblxuLy8gYWRkIHNwcmVhZHNoZWV0IHZpeiBzb3VyY2Vcbi8vIGh0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vdHE/dHE9c2VsZWN0JTIwKiZrZXk9MEF2N2NVVi1vMlFRWWRIWkZZV0pOTldwUlMxaElWV2hHUVRobExXWndaV2MmdXNwPWRyaXZlX3dlYiNnaWQ9MFxuXG5mdW5jdGlvbiBpbml0KGEpIHtcbiAgYXBwID0gYTtcblxuICB2YXIgZHJvcFpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcF96b25lJyk7XG4gIGRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgX2hhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG4gIGRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS53aGljaCA9PSAxMyApIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuXG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlLXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldC1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItZHJpdmUtZmlsZScsIDEpO1xuXG4gICAgdmFyIHZhbCA9ICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCk7XG4gICAgaWYoIHZhbC5sZW5ndGggPT0gMCApIHJldHVybjtcblxuICAgIGlmKCAhdmFsLm1hdGNoKC9eaHR0cC4qLyApICkgdmFsID0gJ2h0dHBzOi8vJyt2YWw7XG5cbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgICBmaWxlUGFuZWwuaW5pdEZyb21VcmwodmFsLCByb290KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgnJyk7XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVGaWxlU2VsZWN0KGV2dCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1sb2NhbC1maWxlJywgMSk7XG5cbiAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyID8gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcyA6IGV2dC50YXJnZXQuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdC5cblxuICAvLyBmaWxlcyBpcyBhIEZpbGVMaXN0IG9mIEZpbGUgb2JqZWN0cy4gTGlzdCBzb21lIHByb3BlcnRpZXMuXG4gIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gIGZvciAodmFyIGkgPSAwLCBmOyBmID0gZmlsZXNbaV07IGkrKykge1xuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICBmaWxlUGFuZWwuaW5pdChmLCByb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaGFuZGxlRHJhZ092ZXIoZXZ0KSB7XG5ldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5ldnQucHJldmVudERlZmF1bHQoKTtcbmV2dC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JzsgLy8gRXhwbGljaXRseSBzaG93IHRoaXMgaXMgYSBjb3B5LlxufVxuXG4vLyBvbiBhZGQsIGlmIHRoZSBsaXN0IGlzIGVtcHR5LCBsZXQncyBjbG9zZSB0aGUgcG9wdXBcbmZ1bmN0aW9uIF9vbkNvbXBsZXRlKCkge1xuICAgIGlmKCAkKFwiI2ZpbGVfbGlzdFwiKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxufVxuXG52YXIgV2VhdGhlckZpbGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgIGRhdGUgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnRGF0ZScsXG4gICAgICAgICAgICB1bml0cyA6ICdEYXRlJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1pbiAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNaW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtYXggICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWF4IFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0ZG1lYW4gICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01lYW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHBwdCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUHJlY2lwaXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnbW0nLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICByYWQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1JhZGlhdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdNSiBtLTIgZGF5LTEnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBkYXlsaWdodCA6IHtcbiAgICAgICAgICAgIGxhbmVsIDogJ0RheWxpZ2h0IEhvdXJzJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ2hvdXJzJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfVxuICAgIH07XG5cblxuICB2YXIgZWxlID0gJCgnPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGxlZnRcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9idXR0b24+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZW5hbWVcIj48L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhclwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVub3c9XCIwXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDogMCU7XCI+JytcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic3Itb25seVwiPjAlIENvbXBsZXRlPC9zcGFuPicrXG4gICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzXCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2VcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdj48YSBjbGFzcz1cImJ0biBidG4tbGluayBwcmV2aWV3LWRhdGEtYnRuXCI+UHJldmlldyBEYXRhPC9hPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhLXRhYmxlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXN0YXR1c1wiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImhlaWdodDo1MHB4XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG1hcC1kYXRhLWJ0blwiPk1hcCBDU1YgQ29sdW1uczwvYT4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgZGlzYWJsZWQgcHVsbC1yaWdodFwiPkFkZCBEYXRhPC9hPicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+Jyk7XG5cbiAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgY3N2VGFibGUgPSBbXTtcblxuICAgIC8vIG9ubHkgYXV0byBoaWRlIHRoZSBmaXJzdCB0aW1lXG4gICAgdmFyIGF1dG9IaWRlID0gdHJ1ZTtcblxuICAvLyB0aGUgZmlsZSByZWFkZXIgb2JqZWN0IGFuZCB0aGUgZWxlbWVudFxuICBmdW5jdGlvbiBpbml0KGZpbGUsIHJvb3RFbGUpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25lcnJvciA9IGVycm9ySGFuZGxlcjtcbiAgICByZWFkZXIub25wcm9ncmVzcyA9IHVwZGF0ZVByb2dyZXNzO1xuICAgIHJlYWRlci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKGUpIHt9O1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG4gICAgICBwYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgIH1cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKVxuXG4gICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoZ2V0TmFtZShmaWxlKSk7XG4gICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdEZyb21VcmwodXJsLCByb290RWxlKSB7XG4gICAgICAgIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5odG1sKCdRdWVyeWluZyBzcHJlYWRzaGVldC4uLicpO1xuXG4gICAgICAgIHZhciBrZXkgPSBnZXRLZXkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJytcbiAgICAgICAgICAgICdHb29nbGUgU3ByZWFkc2hlZXQnKyhrZXkubGVuZ3RoID4gMCA/ICc8YnIgLz48c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE0cHhcIj4nK2tleSsnPC9zcGFuPicgOiAnJykrJzwvaDM+Jyk7XG5cbiAgICAgICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICAgICAgICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0Vycm9yIGluIHF1ZXJ5OiAnICsgcmVzcG9uc2UuZ2V0TWVzc2FnZSgpICsgJyAnICsgcmVzcG9uc2UuZ2V0RGV0YWlsZWRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyc2UoZHRUb0NzdihyZXNwb25zZS5nZXREYXRhVGFibGUoKSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc2V0SGFuZGxlcnMoKSB7XG4gICAgICAgIGVsZS5maW5kKCcubWFwLWRhdGEtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgd2VhdGhlci5zZXQoYXBwLmdldE1vZGVsKCksIGRhdGEpO1xuICAgICAgICAgICAgZWxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgX29uQ29tcGxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHRUb0NzdihkdCkge1xuICAgICAgICB2YXIgYXJyID0gW1tdXTtcblxuICAgICAgICBkdCA9IEpTT04ucGFyc2UoZHQudG9KU09OKCkpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnJbMF0ucHVzaChkdC5jb2xzW2ldLmxhYmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyci5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZHQucm93c1tpXS5jLmxlbmd0aDsgaisrICkge1xuICAgICAgICAgICAgICAgIGlmKCAhZHQucm93c1tpXS5jW2pdICkgYXJyW2krMV0ucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBhcnJbaSsxXS5wdXNoKGR0LnJvd3NbaV0uY1tqXS52KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjc3YgPSAnJztcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBjc3YgKz0gYXJyW2ldLmpvaW4oJywnKSsnXFxuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjc3Y7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0S2V5KHVybCkge1xuICAgICAgICB2YXIgcGFydHMgPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA9PSAxICkgcmV0dXJuICcnO1xuXG4gICAgICAgIHBhcnRzID0gcGFydHNbMV0uc3BsaXQoJyYnKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBwYXJ0c1tpXS5zcGxpdCgnPScpWzBdID09ICdrZXknICkgcmV0dXJuIHBhcnRzW2ldLnNwbGl0KCc9JylbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICBmdW5jdGlvbiBnZXROYW1lKGYpIHtcbiAgICByZXR1cm4gWyc8aDMgc3R5bGU9XCJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmc6MTVweCAwIDRweCAwXCI+PGkgY2xhc3M9XCJpY29uLXRpbnRcIj48L2k+ICcsIGYubmFtZSxcbiAgICAgICAgICAgICAgICAnIDxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTZweFwiPignLCBmLnR5cGUgfHwgJ24vYScsXG4gICAgICAgICAgICAgICAgJyk8L3NwYW4+IC0gPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTZweFwiPicsIGYuc2l6ZSwgJyBieXRlczwvc3Bhbj4nLCAnPC9oMz4nXS5qb2luKCcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcbiAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9eXFxzKlxcbi9nLCcnKS5zcGxpdCgnXFxuJyk7XG5cbiAgICB2YXIgdGFibGUgPSBbXTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICB0YWJsZS5wdXNoKGRhdGFbaV0uc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgICAgIGlmKCB0YWJsZS5sZW5ndGggPT0gMCApIHJldHVybiBzZXRFcnJvcignRmlsZSBkaWQgbm90IGNvbnRhaW4gYW55IGluZm9ybWF0aW9uLicpO1xuICAgICAgICBjc3ZUYWJsZSA9IHRhYmxlO1xuXG4gICAgICAgIHBhcnNlSGVhZGVyKHRhYmxlWzBdKTtcbiAgICAgICAgZ2V0RGF0ZVJhbmdlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVJhbmdlKCkge1xuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCcnKTtcbiAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPT0gLTEgKSByZXR1cm4gZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnRGF0ZSBjb2x1bW4gbmVlZHMgdG8gYmUgbWF0Y2hlZC4nKTtcbiAgICAgICAgaWYoIHR5cGVvZiBoZWFkZXJzLmRhdGUuY29sID09ICdzdHJpbmcnICkgaGVhZGVycy5kYXRlLmNvbCA9IHBhcnNlSW50KGhlYWRlcnMuZGF0ZS5jb2wpO1xuXG4gICAgICAgIHZhciBkYXRlcyA9IHt9O1xuICAgICAgICB2YXIgZGlzcGxheURhdGVzID0gW107XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA8IGNzdlRhYmxlW2ldLmxlbmd0aCAmJiBjc3ZUYWJsZVtpXS5sZW5ndGggPj0gNyApwqB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgaWYoIHAubGVuZ3RoICE9IDMgJiYgcC5sZW5ndGggIT0gMiApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIG5vdCBhIHZhbGlkIGZvcm1hdCAoeXl5eS1tbS1kZCBvciB5eXl5LW1tKVwiKTtcblxuICAgICAgICAgICAgICAgIGlmKCAhZGF0ZXNbcFswXV0gKSBkYXRlc1twWzBdXSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBtbWRkID0gcFsxXTtcblxuICAgICAgICAgICAgICAgIGlmKCBkYXRlc1twWzBdXS5pbmRleE9mKG1tZGQpICE9IC0xICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgaW4gZGF0YXNldCB0d2ljZVwiKTtcbiAgICAgICAgICAgICAgICBkYXRlc1twWzBdXS5wdXNoKG1tZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgeWVhciBpbiBkYXRlcyApIHtcbiAgICAgICAgICAgIGlmKCBkYXRlc1t5ZWFyXS5sZW5ndGggPT0gMTIpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcisnIFsnK2RhdGVzW3llYXJdLmpvaW4oJywgJykrJ10nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJzxiPkRhdGUgUmFuZ2U6PC9iPiAnK2Rpc3BsYXlEYXRlcy5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUhlYWRlcihoZWFkZXJSb3cpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBbXTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+JztcbiAgICAgICAgaHRtbCArPSAnPHRyPjx0aD5LZXk8L3RoPjx0aD5Db2x1bW4gIzwvdGg+PC90cj4nO1xuXG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlclJvdy5pbmRleE9mKGtleSkgIT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1trZXldLmNvbCA9IGhlYWRlclJvdy5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNwYW4gY2xhc3M9XCJsYWJlbCBsYWJlbC1zdWNjZXNzXCI+JytoZWFkZXJzW2tleV0uY29sKycgPGkgY2xhc3M9XCJpY29uLW9rXCI+PC9pPjwvc3Bhbj48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNlbGVjdCBjbGFzcz1cInNlbGVjdC0nK2tleSsnXCJcIj48L3NlbGVjdD48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5odG1sKGh0bWwrJzwvdGFibGU+Jyk7XG5cblxuICAgICAgICBpZiggbWF0Y2hlZC5sZW5ndGggIT0gNyApIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzZWxlY3QgZWxlbWVudCBmb3IgbWlzc2luZyBjb2wnc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCJcIj5bU2VsZWN0IENvbHVtbl08L29wdGlvbj4nKSk7XG5cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgcmFkaWF0aW9uLCBhZGQgb3B0aW9uIGZvciBjYWxjdWxhdGluZ1xuICAgICAgICAgICAgLy8gVE9ET1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgbWlzc2luZyBjb2xzXG4gICAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlclJvdy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBpZiggbWF0Y2hlZC5pbmRleE9mKGhlYWRlclJvd1tpXSkgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiJytpKydcIj4nK2krJyAtICcraGVhZGVyUm93W2ldKyc8L29wdGlvbj4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGNoYW5nZSBoYW5kbGVycyBmb3IgdGhlIHNlbGVjdG9yc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgaWYoIHZhbCAhPSAnJyApIGhlYWRlcnNbdGhpcy5jbGFzc05hbWUucmVwbGFjZSgvc2VsZWN0LS8sJycpXS5jb2wgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgY29sdW1ucyBhcmUgc2V0LCByZW1vdmUgZGlzYWJsZWQgZnJvbSBidG5cbiAgICAgICAgICAgICAgICB2YXIgcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggaGVhZGVyc1trZXldLmNvbCA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCByZWFkeSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGF1dG9IaWRlICkgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaGlkZSgnc2xvdycpO1xuICAgICAgICAgICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzaG93IHRoZSB0YWJsZVxuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuc2hvdygnc2xvdycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgYXV0b0hpZGUgPSBmYWxzZTtcbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBzZXREYXRhKCk7XG4gICAgICAgIHNldFByZXZpZXcoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQcmV2aWV3KCkge1xuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLnNob3coKTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPjx0aD5kYXRlPC90aD4nO1xuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0aD4nK2tleSsnPC90aD4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGMgPSAwO1xuICAgICAgICBmb3IoIHZhciBkYXRlIGluIGRhdGEgKXtcbiAgICAgICAgICAgIGlmKCBjID09IDEwICkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQgY29sc3Bhbj1cIjdcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+Li4uPC90ZD48L3RyPic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytkYXRlKyc8L3RkPic7XG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPicrZGF0YVtkYXRlXVtrZXldKyc8L3RkPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cbiAgICAgICAgICAgIGMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLXRhYmxlJykuaHRtbChodG1sKTtcbiAgICB9XG5cbiAgLy8gc2V0IHRoZSBtYXAgb2YgY3N2IGhlYWRlcnNcbiAgZnVuY3Rpb24gc2V0RGF0YSgpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGNzdlRhYmxlW2ldLmxlbmd0aCA8IDcgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdO1xuXG4gICAgICAgICAgICBpZiggIWRhdGUgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICBpZiggZGF0ZS5zcGxpdCgnLScpLmxlbmd0aCA9PSAzICkgZGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnNwbGljZSgwLDIpLmpvaW4oXCItXCIpO1xuICAgICAgICAgICAgZGF0YVtkYXRlXSA9IHt9O1xuXG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgZGF0YVtkYXRlXVtrZXldID0gcGFyc2VGbG9hdChjc3ZUYWJsZVtpXVtoZWFkZXJzW2tleV0uY29sXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzKGV2dCkge1xuICAgIC8vIGV2dCBpcyBhbiBQcm9ncmVzc0V2ZW50LlxuICAgIGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICB2YXIgcGVyY2VudExvYWRlZCA9IE1hdGgucm91bmQoKGV2dC5sb2FkZWQgLyBldnQudG90YWwpICogMTAwKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcy1iYXInKS5hdHRyKCdhcmlhLXZhbHVlbm93JyxwZXJjZW50TG9hZGVkKS53aWR0aChwZXJjZW50TG9hZGVkK1wiJVwiKTtcbiAgICAgICAgZWxlLmZpbmQoJy5zci1vbmx5JykuaHRtbChNYXRoLmNlaWwocGVyY2VudExvYWRlZCkrJyUgQ29tcGxldGUnKTtcbiAgICB9XG59XG5cbiAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGV2dCkge1xuICAgIHN3aXRjaChldnQudGFyZ2V0LmVycm9yLmNvZGUpIHtcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfRk9VTkRfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBOb3QgRm91bmQhJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9SRUFEQUJMRV9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIGlzIG5vdCByZWFkYWJsZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5BQk9SVF9FUlI6XG4gICAgICAgIGJyZWFrOyAvLyBub29wXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzZXRFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgcmVhZGluZyB0aGlzIGZpbGUuJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEVycm9yKG1zZykge1xuICAgICAgZWxlLmZpbmQoJy5zdGF0dXMnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+Jyttc2crJzwvZGl2PicpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0IDogaW5pdCxcbiAgICBpbml0RnJvbVVybCA6IGluaXRGcm9tVXJsXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdFxufTtcbiIsInZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcbnZhciBjaGFydCA9IHJlcXVpcmUoJy4vY2hhcnQnKTtcblxuLy8gbWFrZSBzdXJlIGFsbCB0aGUgd2VhdGhlciBpcyBzZXQuICAjMSB0aGluZyBwZW9wbGUgd2lsbCBtZXNzIHVwXG5mdW5jdGlvbiBjaGVjayhtb2RlbCkge1xuXG4gIC8vIGZpcnN0IGdldCBjdXJyZW50IG1vbnRocyB3ZSBhcmUgZ29pbmcgdG8gcnVuLFxuICB2YXIgc3RhcnQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcblxuICB2YXIgZW5kID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKS5zcGxpdChcIi1cIik7XG4gIHZhciBlTW9udGggPSBwYXJzZUludChlbmRbMV0pO1xuICB2YXIgZVllYXIgPSBwYXJzZUludChlbmRbMF0pO1xuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcblxuICAvLyBub3cgc2VlIGlmIHdlIGhhdmUgY3VzdG9tIHdlYXRoZXIgY292ZXJhZ2VcbiAgdmFyIGhhc0NvdmVyYWdlID0gdHJ1ZTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgd2hpbGUoIGNvdW50IDwgMTAwMDAgKSB7XG4gICAgICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBtID0gKGNEYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICB2YXIgeSA9IGNEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgaWYoIGNEYXRlLmdldE1vbnRoKCkrMSA9PSBlTW9udGggJiYgeSA9PSBlWWVhciApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyW3krJy0nK21dICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNEYXRlLnNldE1vbnRoKGNEYXRlLmdldE1vbnRoKCkrMSk7XG4gICAgICBjb3VudCsrO1xuICB9XG5cbiAgaWYoIGhhc0NvdmVyYWdlICkgcmV0dXJuIHRydWU7XG5cbiAgLy8gaWYgbm90IG1ha2Ugc3VyZSB3ZSBoYXZlIGF2ZXJhZ2VzIHNlbGVjdGVkXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBjb25maWcuaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgYyA9IGNvbmZpZy5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICB2YXIgdmFsID0gcGFyc2VGbG9hdCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKS52YWwoKSk7XG4gICAgICAgICAgaWYoICF2YWwgJiYgdmFsICE9PSAwICkge1xuICAgICAgICAgICAgICBhbGVydChcIk1pc3Npbmcgd2VhdGhlciBkYXRhOiBcIitjK1wiIGZvciBtb250aCBcIittK1wiXFxuXFxuXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiRGlkIHlvdSBzZWxlY3QgYSBsb2NhdGlvbiAoU2V0dXApIGFuZC9vciBhcmUgYWxsIHdlYXRoZXIvc29pbCBmaWVsZHMgZmlsbGVkIG91dD9cIik7XG4gICAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNldChtb2RlbCwgZGF0YSkge1xuICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICBpZiggZGF0YSApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBkYXRhICkge1xuXG4gICAgICAgICAgLy8gY2xlYW4gdXAgZGF0ZSBmb3JtYXRcbiAgICAgICAgICB2YXIgZGF0ZSA9IGtleS5yZXBsYWNlKC9bXlxcZC1dLywnJyk7XG4gICAgICAgICAgdmFyIHBhcnRzID0gZGF0ZS5zcGxpdCgnLScpO1xuXG4gICAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA8IDIgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhbGVydCgnSW52YWxpZCBEYXRlIEZvcm1hdC4gIERhdGVzIHNob3VsZCBiZSBpbiBZWVlZLU1NIGZvcm1hdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHBhcnRzWzFdLmxlbmd0aCAhPSAyICkge1xuICAgICAgICAgICAgICBkYXRlID0gcGFydHNbMF0rXCItMFwiK3BhcnRzWzFdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdID0gZGF0YVtrZXldO1xuICAgICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGFycmF5IHNvIHdlIGNhbiBzb3J0XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhlYWRlcnMgPSBbJ2RhdGUnXTtcbiAgZm9yKCB2YXIgZGF0ZSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlciApIHtcblxuICAgICAgdmFyIHQgPSBbZGF0ZV07XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gKSB7XG4gICAgICAgICAgaWYoIGtleSA9PSAnbnJlbCcgKSBjb250aW51ZTtcbiAgICAgICAgICBpZiggYXJyLmxlbmd0aCA9PT0gMCApIGhlYWRlcnMucHVzaChrZXkpO1xuICAgICAgICAgIHQucHVzaChtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2godCk7XG4gIH1cblxuICBpZiggYXJyLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmh0bWwoXCJObyB3ZWF0aGVyIGRhdGEgaGFzIGJlZW4gdXBsb2FkZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGh0bWwgPSAnPGRpdiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWF4LWhlaWdodDo2MDBweFwiPjx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+JztcblxuICBhcnIuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgIHZhciBkMSA9IG5ldyBEYXRlKGFbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuICAgICAgdmFyIGQyID0gbmV3IERhdGUoYlswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG5cbiAgICAgIGlmKCBkMSA8IGQyICkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIGlmKCBkMSA+IGQyICkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gIH0pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0aD4nK2hlYWRlcnNbaV0rJzwvdGg+JztcbiAgfVxuICBodG1sICs9ICc8L3RyPic7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dHI+PHRkPicrYXJyW2ldLmpvaW4oJzwvdGQ+PHRkPicpKyc8L3RkPjwvdHI+JztcbiAgfVxuXG4gICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLmh0bWwoaHRtbCsnPC90YWJsZT48L2Rpdj48ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItY2hhcnRcIj48L2Rpdj4nKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSBjaGFydC5jcmVhdGUoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgfSwgMTAwMCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQgOiBzZXQsXG4gIGNoZWNrIDogY2hlY2tcbn07XG4iXX0=
