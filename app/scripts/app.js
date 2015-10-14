(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PoplarApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var io = require('./lib/io');
var run = require('./lib/run')(io);


module.exports = run;

},{"./lib/io":20,"./lib/run":21}],2:[function(require,module,exports){
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

},{"../../poplar-3pg-model":1,"./charts":25,"./config":26,"./flashblock-detector":27,"./googleDrive":29,"./googleDrive/exportToCsv":28,"./inputForm":31,"./modelRunHandler":32,"./offline":34,"./output/raw":36,"./utils":37,"./weather":40,"./weather/chart":38}],25:[function(require,module,exports){
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
  if( data.length > 500 ) {
    var hasNulls = false
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

},{"./config":26,"./output/definitions":35,"./output/raw":36}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./index":29}],29:[function(require,module,exports){
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

},{"../modelRunHandler":32,"../oauth":33,"./realtime":30}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"./charts":25,"./googleDrive":29,"./offline":34,"./weather":40,"./weather/chart":38,"./weather/fileReader":39}],32:[function(require,module,exports){
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

},{"./app":24,"./config":26}],33:[function(require,module,exports){

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

},{}],34:[function(require,module,exports){
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

},{"./app":24}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"../config":26,"../modelRunHandler":32}],37:[function(require,module,exports){
function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

module.exports = {
  qs : qs
};

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"./index":40}],40:[function(require,module,exports){
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

},{"../config":26,"./chart":38}]},{},[24])(24)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2NvbmZpZy5qcyIsImpzbGliL2ZsYXNoYmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nb29nbGVEcml2ZS9leHBvcnRUb0Nzdi5qcyIsImpzbGliL2dvb2dsZURyaXZlL2luZGV4LmpzIiwianNsaWIvZ29vZ2xlRHJpdmUvcmVhbHRpbWUuanMiLCJqc2xpYi9pbnB1dEZvcm0uanMiLCJqc2xpYi9tb2RlbFJ1bkhhbmRsZXIuanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXQvZGVmaW5pdGlvbnMuanMiLCJqc2xpYi9vdXRwdXQvcmF3LmpzIiwianNsaWIvdXRpbHMuanMiLCJqc2xpYi93ZWF0aGVyL2NoYXJ0LmpzIiwianNsaWIvd2VhdGhlci9maWxlUmVhZGVyLmpzIiwianNsaWIvd2VhdGhlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOStCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGlvID0gcmVxdWlyZSgnLi9saWIvaW8nKTtcbnZhciBydW4gPSByZXF1aXJlKCcuL2xpYi9ydW4nKShpbyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBydW47XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBhcmUgY29uc3RhbnRzLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGFzY2VfZXRyX3dpbmRzcGVlZCA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAyLFxuICAgICAgICAgICAgdW5pdHM6IFwibS9zXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZWZhdWx0IFdpbmQgU3BlZWQgdXNlZCB0byBjYWxjdWxhdGUgRVRyIChhbmQgcmVzdWx0YW50IEtjKSBmb3IgTW9kZWwuXCJcbiAgICAgICAgfSxcbiAgICAgICAgZGF5c19wZXJfbW9udGg6IHtcbiAgICAgICAgICAgIHZhbHVlOiAzMC40LFxuICAgICAgICAgICAgdW5pdHM6IFwiZGF5cy9tb1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIERheXMgaW4gYW4gYXZlcmFnZSBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIGUyMDoge1xuICAgICAgICAgICAgdmFsdWU6IDIuMixcbiAgICAgICAgICAgIHVuaXRzOiBcInZwL3RcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhdGUgb2YgY2hhbmdlIG9mIHNhdHVyYXRlZCBWUCB3aXRoIFQgYXQgMjBDXCJcbiAgICAgICAgfSxcbiAgICAgICAgcmhvQWlyOiB7XG4gICAgICAgICAgICB2YWx1ZTogMS4yLFxuICAgICAgICAgICAgdW5pdHM6IFwia2cvbV4zXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZW5zaXR5IG9mIGFpclwiXG4gICAgICAgIH0sXG4gICAgICAgIGxhbWJkYToge1xuICAgICAgICAgICAgdmFsdWU6IDI0NjAwMDAsXG4gICAgICAgICAgICB1bml0czogXCJKL2tnXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMYXRlbnQgaGVhdCBvZiB2YXBvdXJpc2F0aW9uIG9mIGgyb1wiXG4gICAgICAgIH0sXG4gICAgICAgIFZQRGNvbnY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDYyMixcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBWUEQgdG8gc2F0dXJhdGlvbiBkZWZpY2l0ID0gMTgvMjkvMTAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIFFhOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTkwLFxuICAgICAgICAgICAgdW5pdHM6IFwiVy9tXjJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVyY2VwdCBvZiBuZXQgcmFkaWF0aW9uIHZlcnN1cyBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjgsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic2xvcGUgb2YgbmV0IHZzLiBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwXCJcbiAgICAgICAgfSxcbiAgICAgICAgZ0RNX21vbDoge1xuICAgICAgICAgICAgdmFsdWU6IDI0LFxuICAgICAgICAgICAgdW5pdHM6IFwiZy9tb2woQylcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIG1vbFBBUl9NSjoge1xuICAgICAgICAgICAgdmFsdWU6IDIuMyxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1vbChDKS9NSlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdHJlZSA6IHJlcXVpcmUoJy4vdHJlZScpLFxuICBwbGFudGF0aW9uIDogcmVxdWlyZSgnLi9wbGFudGF0aW9uJyksXG4gIHBsYW50YXRpb25fc3RhdGUgOiByZXF1aXJlKCcuL3BsYW50YXRpb25fc3RhdGUnKSxcbiAgc29pbCA6IHJlcXVpcmUoJy4vc29pbCcpLFxuICB3ZWF0aGVyIDogcmVxdWlyZSgnLi93ZWF0aGVyJyksXG4gIG1hbmFnZSA6IHJlcXVpcmUoJy4vbWFuYWdlJyksXG4gIGNvbnN0YW50cyA6IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGVzY3JpcHRpb24gOiBcIkNyb3AgTWFuYWdlbWVudCBQYXJhbWV0ZXJzXCIsXG4gIHZhbHVlIDoge1xuICAgIGlycmlnRnJhYyA6IHtcbiAgICAgIHZhbHVlIDogMSxcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJJcnJpZ2F0aW9uIGZyYWN0aW9uOiAxID0gZnVsbHkgaXJyaWdhdGVkLCAwID0gbm8gaXJyaWdhdGlvbi4gQW55IHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEgYXJlIGFjY2VwdGFibGVcIlxuICAgIH0sXG4gICAgZmVydGlsaXR5IDoge1xuICAgICAgdmFsdWUgOiAwLjcsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiU29pbCBmZXJ0aWxpdHlcIlxuICAgIH0sXG4gICAgZGF0ZVBsYW50ZWQgOiB7XG4gICAgICAgIHZhbHVlIDogXCJfZGF0ZV9cIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRhdGUgdGhlIGNyb3Agd2FzIHBsYW50ZWRcIlxuICAgIH0sXG4gICAgZGF0ZUNvcHBpY2VkIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIG9mIHRoZSBmaXJzdCBjb3BwaWNlXCJcbiAgICB9LFxuICAgIGNvcHBpY2VJbnRlcnZhbCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiAzLFxuICAgICAgICB1bml0cyA6IFwiWWVhcnNcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkhvdyBhZnRlciB0aGUgY3JvcCBpcyBjb3BwaWNlZCBhZnRlciB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlRGF0ZXMgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogXCJcIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkhvdyBhZnRlciB0aGUgY3JvcCBpcyBjb3BwaWNlZCBhZnRlciB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBkYXRlRmluYWxIYXJ2ZXN0IDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHdoZW4gdGhlIGNyb3AgaXMgY29tcGxldGVseSBoYXJ2ZXN0ZWRcIlxuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIkdyZWVud29vZCBQRyBWYWx1ZXMgKGRlZmF1bHQpXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHJlcXVpcmVkIDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgU3RvY2tpbmdEZW5zaXR5OiB7XG4gICAgICAgICAgICB2YWx1ZTogMzU4NyxcbiAgICAgICAgICAgIHVuaXRzOiBcIlRyZWVzL2hlY3RhclwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIHRyZWVzIHBsYW50ZWQgcGVyIGhlY3RhclwiXG4gICAgICAgIH0sXG4gICAgICAgIFNlZWRsaW5nTWFzczoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImtHXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXNzIG9mIHRoZSBzZWVkbGluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHN0ZW1cIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvcG9ydGlvbiBvZiBzZWVkbGluZyBtYXNzIGdvaW5nIGludG8gZm9saWFnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC45LFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHJvb3RcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBsYW50YXRpb24gc3RhdGUgY2xhc3MsIGNvbnRhaW5pbmcgYWxsIGludGVtZWRpYXRlIHZhbHVlcyBhdCBldmVyeSB0aW1lc3RlcCBvZiB0aGUgbW9kZWxcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmZWVkc3RvY2tIYXJ2ZXN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvcHBpY2VDb3VudDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRyZWUgYXQgdGhlIHRpbWUgb2YgY29wcGljZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJrUEFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0XCJcbiAgICAgICAgfSxcbiAgICAgICAgZlZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhcilcIlxuICAgICAgICB9LFxuICAgICAgICBmVDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJUZW1wZXJhdHVyZSBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZGcm9zdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZk51dHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb2lsIHdhdGVyIG1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBQQVI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwibW9sc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgeFBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJbnRjcHRuOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHJhaW5mYWxsIGludGVyY2VwdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEFTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgQ3VtSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDdW11bGF0aXZlIGlycmlnYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJcnJpZzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW0vbW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZXF1aXJlZCBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgU3RhbmRBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1vbnRoXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBZ2Ugb2YgdGhlIHRyZWVcIlxuICAgICAgICB9LFxuICAgICAgICBMQUk6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBhcmVhIGluZGV4XCJcbiAgICAgICAgfSxcbiAgICAgICAgQ2FuQ29uZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgY29uZHVjdGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBUcmFuc3A6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IG1vbnRobHkgdHJhbnNwaXJhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEVUcjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJlZmVyZW5jZSAoQWxmYWxmYSkgdHJhbnNwaXJhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEtjOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNyb3AgQ29lZmZpY2llbnRcIlxuICAgICAgICB9LFxuICAgICAgICBQaHlzTW9kOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnVcIlxuICAgICAgICB9LFxuICAgICAgICBwZnM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0aW8gb2YgZm9saWFnZSB0byBzdGVtIHBhcnRpdGlvbmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGxpdHRlcmZhbGw6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgTlBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOZXQgUHJpbWFyeSBQcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBSb290UDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIGRXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFdGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZvbGlhZ2UgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3RlbSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVG90YWwgeWllbGQ6IHJvb3QgKyBzdGVtICsgZm9saWFnZVwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU29pbCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBjdXJyZW50IGxvY2F0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbWF4QVdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYXZhaWxhYmxlIHNvaWwgd2F0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBzd3Bvd2VyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBvd2VyIHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3Y29uc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29uc3RhbnQgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbZ2MgbS9zXT9cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWNhbCBtb2RpZmVyLCBzcGVjaWZpZXMgdGhlIGNhbm9weSBjb25kdWN0YW5jZS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHZhbHVlLCB3aGVuIGxhaT0wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDAxXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjZcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZ3Jvd3RoIGxpbWl0ZXIgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDQ3LjVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDMuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgcGFyYW1ldGVycyBhZmZlY3RpbmcgdGVtcGVyYXR1cmUgbW9kaWZpZXIsIGZULiBBIGdyYXBoIG9mIGhvdyB0aGVzZSBwYXJhbWV0ZXJzIGFmZmVjdCB0aGUgdGVtcGVyYXR1cmUgbW9kaWZpZXIgaXMgZm91bmQgaGVyZTogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzY5aXdxdG5sMjhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1pbmltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG9wdDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG9wdGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAyMFxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1heGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiA1MFxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHNwZWNpZnkgZ3Jvd3RoIHBhcmFtZXRlcnMgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZXMgb2YgdHJlZS5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgICAgazoge1xuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhZGlhdGlvbiBFeHRpbmN0aW9uIENvZWZmaWNpZW50LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBmdWxsQ2FuQWdlOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlllYXIgd2hlcmUgdHJlZSByZWFjaGVzIGZ1bGwgQ2Fub3B5IENvdmVyLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuNVxuICAgICAgICB9LFxuICAgICAgICBrRzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tQQV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldGVybWluZXMgdGhlIHJlc3BvbnNlIG9mIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UgdG8gdGhlIHZhcG9yIHByZXNzdXJlIGRlZmljaXQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGFscGhhOiB7XG4gICAgICAgICAgICB1bml0czogXCJba2cvbW9sID9dXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgcXVhbnR1bSBlZmZpY2llbmN5LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDhcbiAgICAgICAgfSxcbiAgICAgICAgZlQgOiByZXF1aXJlKCcuL2Z0JyksXG4gICAgICAgIEJMY29uZDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBib3VuZGFyeSBsYXllciBjb25kdWN0YW5jZS4gVXNlZCBpbiB0aGUgY2FsY3VhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wNFxuICAgICAgICB9LFxuICAgICAgICBmQWdlOiByZXF1aXJlKCcuL2ZhZ2UnKSxcbiAgICAgICAgZk4wOiB7XG4gICAgICAgICAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIG51dHJpdGlvbmFsIG1vZGlmaWVyLGZOdXRyLiAgZk51dHIgcmFuZ2VzIGZyb20gW2ZOTywxKSBiYXNlZCBvbiB0aGUgZmVydGlsaXR5IGluZGV4IHdoaWNoIHJhbmdlcyBmcm9tIDAgdG8gMS4gIFdoZW4gZk4wPTEgaW5kaWNhdGVzIGZOdXRyIGlzIDFcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI2XG4gICAgICAgIH0sXG4gICAgICAgIFNMQTogcmVxdWlyZSgnLi9zbGEnKSxcbiAgICAgICAgLy9DaGVja1VuaXRzQ2hhbmdldG9saW5lYXJGdW5jdGlvblxuICAgICAgICBDb25kdWN0YW5jZTogcmVxdWlyZSgnLi9jb25kdWN0YW5jZScpLFxuICAgICAgICBJbnRjcHRuOiByZXF1aXJlKCcuL2ludGNwdG4nKSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXNzaW1pbGF0aW9uIHVzZSBlZmZpY2llbmN5LiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0aGUgTlBQLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNDdcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiByZXF1aXJlKCcuL3BmcycpLFxuICAgICAgICBwUjogcmVxdWlyZSgnLi9wcicpLFxuICAgICAgICByb290UDogcmVxdWlyZSgnLi9yb290cCcpLFxuICAgICAgICBsaXR0ZXJmYWxsOiByZXF1aXJlKCcuL2xpdHRlcmZhbGwnKVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJhaW5mYWxsIGludGVyY2VwdGlvbiBmcmFjdGlvbi4gIEEgbGluZWFyIGZ1bmN0aW9uIHcuci50LiBMQUlcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI0XG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDcuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIG1vbnRobHkgbG9zcyBvZiBmb2xpYWdlLiBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbnkgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82aXE5cHBkcXM3XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAxNVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDNcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgZGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2l0aCBhIHBhaXIgb2YgYWxsb21ldHJpYyBwb3dlciBlcXVhdGlvbnMuICBUaGUgZmlyc3QgcmVsYXRlcyBiYXNhbCBkaWFtZXRlciwgKERPQikgdG8gdG90YWwgd29vZHkgYmlvbWFzcywgd2hpbGUgdGhlIHNlY29uZCByZWxhdGVzIERPQiB0byBwZnMuICBUaGUgcGFyYW1ldGVyaXphdGlvbiBvZiB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gRE9CIGFuZCB3b29keSBiaW9tYXNzIGlzIGludmVydGVkIHRvIGRldGVybWluZSB0aGUgRE9CIGZyb20gdGhlIG1vZGVsZWQgd29vZHkgZnJhY3Rpb24uICBUaGlzIHJlbGF0aW9uIGlzIHBsb3R0ZWQgYXQ6IC4gIFRoZSBtb2RlbCBhbGxvY2F0ZXMgdGhlIGFwcHJvcHJpYXRlIGZyYWN0aW9uIG9mIHdvb2QgYmFzZWQgb24gdGhlIFN0b2NraW5nIGRlbnNpdHkgb2YgdGhlIHBsYW50YXRpb24uIERPQiByYXRoZXIgdGhhbiBEQkggaXMgdXNlZCBmb3IgY29tcGFyaXNvbiBvZiB0cmVlcyB3aXRoIGEgaGlnaCBzdGVtQ250IGFuZCByYXBpZCBjb3BwaWNpbmcgdmFsdWUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgc3RlbUNudDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXZlcmFnZSBudW1iZXIgb2Ygc3RlbXMgcGVyIHN0dW1wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi44XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1DOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzc1wiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMThcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbVA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNFxuICAgICAgICB9LFxuICAgICAgICBwZnNNeDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBwb3NzaWJsZSBwZnMgdmFsdWUgYWxsb3dlZFwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgREJPIHRvIHBmc1wiLFxuICAgICAgICAgICAgdmFsdWU6IC0wLjc3MlxuICAgICAgICB9LFxuICAgICAgICBwZnNDOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gcGZzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gdGhlIHBoeXNpb2xvZ2FsIHBhcmFtZXRlciBpcyAxLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMTdcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiBtMC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgICAgfSxcbiAgICAgICAgbTA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcGVuZGFuY2Ugb24gdGhlIGZlcnRpbGl0eSBpbmRleC4gMCBpbmRpY2F0ZXMgZnVsbCBkZXBlbmRhbmNlIG9uIGZlcnRpbGl0eSwgMSBpbmRpY2F0ZXMgYSBjb25zdGFudCBhbGxvY2F0aW9uLCBpbmRlcGVuZGFudCBvZiBmZXJ0aWxpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgdHVybm92ZXI6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttb250aF4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbW9udGhseSByb290IHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHBhcmFtZXRlcnMgc3BlY2lmeSByb290IGFsbG9jYXRpb24gdG8gZ3Jvd3RoIGFmdGVyIGNvcHBpY2luZy5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgIGZyYWM6IHtcbiAgICAgICAgICB1bml0czogXCJbbW9udGheMV1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgYW1vdW50IG9mIHJvb3QgYmlvbWFzcyB0aGF0IGV4Y2VlZHMgdGhlIGFib3ZlZ3JvdW5kIHJlcXVpcmVtZW50cyB0aGF0IGNhbiBiZSBzdXBwbGllZCBpbiBhIGdpdmVuIG1vbnRoLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjJcbiAgICAgIH0sXG4gICAgICBMQUlUYXJnZXQ6IHtcbiAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgYSB0YXJnZXQgTEFJIHJhdGUuICBUaGUgVGFyZ2V0IExBSSBpcyBpbmNsdWRlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgYSB0YXJnZXQgTlBQLCBiYXNlZCBvbiB3ZWF0aGVyIHBhcmFtYXRlcnMuICBCZWxvdyB0aGlzIHRhcmdldCwgdGhlIHJvb3RzIHdpbGwgY29udHJpYnV0ZSBiaW9tYXNzIGlmIHRoZSBiZWxvdyBncm91bmQgcm9vdCBtYXNzIGV4Y2VlZHMgdGhlIHJlcXVpcmVtZW50cyBvZiB0aGUgYWJvdmVncm91bmQgYmlvbWFzcy4gVGhlIHRhcmdldCBpcyBzcGVjaWZpZWQgaW4gTEFJIHRvIHRpbWUgcm9vdCBjb250cmlidXRpb25zIHRvIHBlcmlvZHMgb2YgZ3Jvd3RoXCIsXG4gICAgICAgICAgdmFsdWU6IDEwXG4gICAgICB9LFxuICAgICAgZWZmaWNpZW5jeToge1xuICAgICAgICAgIHVuaXRzOiBcIltrZy9rZ11cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGVmZmljaWVuY3kgaW4gY29udmVydGluZyByb290IGJpb21hc3MgaW50byBhYm92ZWdyb3VuZCBiaW9tYXNzLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW21eMi9rZ11cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIFNwZWNpZmljIExlYWYgQXJlYSBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgTEFJLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDE5XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTAuOFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb250aDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBtb250aCBudW1iZXIgc2luY2UgcGxhbnRpbmdcIlxuICAgIH0sXG4gICAgdG1pbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRtYXg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0ZG1lYW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldyBwb2ludCB0ZW1wZXJhdHVyZVwiXG4gICAgfSxcbiAgICBwcHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHJlY2lwaXRhdGlvblwiXG4gICAgfSxcbiAgICByYWQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU29sYXIgcmFkaWF0aW9uXCJcbiAgICB9LFxuICAgIG5yZWw6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSwgLy8gY2FsY3VhdGVkXG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgfSxcbiAgICBkYXlsaWdodDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKipcbkBtb2R1bGUgM1BHIE1vZHVsZVxuKiovXG5cblxuLyoqXG5DbGFzcyBmb3IgYWxsIHRoZSBmdW5jdGlvbnMgdGhhdCBydW4gaW4gYSBzaW5nbGUgc3RlcCBvZiB0aGUgbW9kZWxcblxuQGNsYXNzIG1vZHVsZS5leHBvcnRzXG4qKi9cblxuXG4vKipcbmxpc3Qgb2YgY29uc3RhbnRzIHVzZWQgZm9yIGNvbXB1dGF0aW9uc1xuXG5AYXR0cmlidXRlIGNvbnN0YW50XG4qKi9cbnZhciBjb25zdGFudHMgPSB7XG4gIGFzY2VfZXRyX2VsZXZhdGlvbjoge1xuICAgIHZhbHVlOjUwMCxcbiAgICB1bml0czonbS9zJyxcbiAgICBkZXNjcmlwdGlvbjonRXN0aW1hdGVkIEVsZXZhdGlvbiBvZiBjYWxjdWxhdGlvbiBvZiBFVHIgKGFuZCBLYyknXG4gIH0sXG4gIGFzY2VfZXRyX3dpbmRzcGVlZDoge1xuICAgIHZhbHVlOjIsXG4gICAgdW5pdHM6J20vcycsXG4gICAgZGVzY3JpcHRpb246J0NvbnN0YW50IHdpbmQgc3BlZWQgZm9yIGNhbGN1bGF0aW9uIG9mIEVUciAoYW5kIEtjKSdcbiAgfSxcbiAgZTIwOntcbiAgICAgIHZhbHVlOjIuMixcbiAgICAgIHVuaXRzOid2cC90JyxcbiAgICAgIGRlc2NyaXB0aW9uOidSYXRlIG9mIGNoYW5nZSBvZiBzYXR1cmF0ZWQgVlAgd2l0aCBUIGF0IDIwQydcbiAgfSxcbiAgcmhvQWlyOntcbiAgICAgIHZhbHVlOjEuMixcbiAgICAgIHVuaXRzOidrZy9tXjMnLFxuICAgICAgZGVzY3JpcHRpb246J0RlbnNpdHkgb2YgYWlyJ1xuICB9LFxuICBsYW1iZGE6e1xuICAgICAgdmFsdWU6MjQ2MDAwMCxcbiAgICAgIHVuaXRzOidKL2tnJyxcbiAgICAgIGRlc2NyaXB0aW9uOidMYXRlbnQgaGVhdCBvZiB2YXBvdXJpc2F0aW9uIG9mIGgybydcbiAgfSxcbiAgVlBEY29udjp7XG4gICAgICB2YWx1ZTowLjAwMDYyMixcbiAgICAgIHVuaXRzOic/JyxcbiAgICAgIGRlc2NyaXB0aW9uOidDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwJ1xuICB9LFxuICBRYTp7XG4gICAgICB2YWx1ZTotOTAsXG4gICAgICB1bml0czonVy9tXjInLFxuICAgICAgZGVzY3JpcHRpb246J0ludGVyY2VwdCBvZiBuZXQgcmFkaWF0aW9uIHZlcnN1cyBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwJ1xuICB9LFxuICBRYjp7XG4gICAgICB2YWx1ZTowLjgsXG4gICAgICB1bml0czondW5pdGxlc3MnLFxuICAgICAgZGVzY3JpcHRpb246J3Nsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgZ0RNX21vbDp7XG4gICAgICB2YWx1ZToyNCxcbiAgICAgIHVuaXRzOidnL21vbChDKScsXG4gICAgICBkZXNjcmlwdGlvbjonTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyJ1xuICB9LFxuICBtb2xQQVJfTUo6e1xuICAgICAgdmFsdWU6Mi4zLFxuICAgICAgdW5pdHM6J21vbChDKS9NSicsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSJ1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jb25zdGFudCA9IGNvbnN0YW50O1xuZnVuY3Rpb24gY29uc3RhbnQoYykge1xuICAgIHJldHVybiBjb25zdGFudHNbY10udmFsdWU7XG59XG5cbi8qKlxuVGltZSBEZXBlbmRhbnQgQXR0cmlidXRlLFxudW5pdHM9J3ZhcmlvdXMnLFxuZGVzY3JpcHRpb249J1RoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIHRpbWUgZGVwZW5kYW50IGZ1bmN0aW9uIHRoYXQgZGVjYXlzXG4ob3IgcmlzZXMgZnJvbSBmMCB0byBmMS4gIFRoZSB2YWx1ZSAoZjArZjEpLzIgaXMgcmVhY2hlZCBhdCB0bSxcbmFuZCB0aGUgc2xvcGUgb2YgdGhlIGxpbmUgYXQgdG0gaXMgZ2l2ZW4gYnkgcC5cbkBtZXRob2QgdGRwXG5AcGFyYW0geFxuQHBhcmFtIGZcbioqL1xubW9kdWxlLmV4cG9ydHMudGRwID0gZnVuY3Rpb24oeCwgZikge1xuICB2YXIgcCA9IGYuZjEgK1xuICAgICAgICAgIChmLmYwIC0gZi5mMSkgKlxuICAgICAgICAgIE1hdGguZXhwKCAtTWF0aC5sb2coMikgKiBNYXRoLnBvdyggKHgvZi50bSksIGYubiApKTtcbiAgcmV0dXJuIHA7XG59O1xuXG4vKipcbkBtZXRob2QgbGluXG5AcGFyYW0geFxuQHBhcmFtIHBcbiovXG5tb2R1bGUuZXhwb3J0cy5saW4gPSBmdW5jdGlvbih4LCBwKXtcbiAgaWYoIHggPCAwICkge1xuICAgIHJldHVybiBwLm1uO1xuICB9XG4gIGlmKCB4ID4gcC54bWF4ICkge1xuICAgIHJldHVybiBwLnhtYXg7XG4gIH1cbiAgcmV0dXJuIHAubW4gKyAocC5teC1wLm1uKSooeC9wLnhtYXgpO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBSYWluZmFsbCBpbnRlcmNlcHRpb24nXG5AbWV0aG9kIEludGNwdG5cbkBwYXJhbSBjdXJfTEFJXG5AcGFyYW0gY1xuKi9cbm1vZHVsZS5leHBvcnRzLkludGNwdG4gPSBmdW5jdGlvbihjdXJfTEFJLCBjKXtcbiAgcmV0dXJuIE1hdGgubWF4KGMubW4sYy5tbiArIChjLm14IC0gYy5tbikgKiBNYXRoLm1pbigxICwgY3VyX0xBSSAvIGMubGFpKSk7XG59O1xuXG4vKipcbnVuaXRzPSdtbScsXG5kZXNjcmlwdGlvbj0nQXZhaWxhYmxlIFNvaWwgV2F0ZXInXG5AbWV0aG9kIEFTV1xuQHBhcmFtIG1heEFTV1xuQHBhcmFtIHByZXZfQVNXXG5AcGFyYW0gZGF0ZV9wcHRcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBjdXJfSXJyaWdcbiovXG5tb2R1bGUuZXhwb3J0cy5BU1cgPSBmdW5jdGlvbihtYXhBU1csIHByZXZfQVNXLCBkYXRlX3BwdCwgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGN1cl9JcnJpZyl7XG4gIHJldHVybiBNYXRoLm1pbihtYXhBU1cqMTAsIE1hdGgubWF4KHByZXZfQVNXICsgZGF0ZV9wcHQgLSAoY3VyX1RyYW5zcCArIGN1cl9JbnRjcHRuICogZGF0ZV9wcHQpICsgY3VyX0lycmlnLCAwKSk7XG59O1xuXG4vL1RPRE86IGRvdWJsZSBjaGVjayB0aGUgYXBwcm9wcmlhdGUgdXNlIG9mIHRkbWVhbiAoZGV3IHBvaW50IHRlbXApXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLyoqXG51bml0cz0na1BBJyxcbmRlc2NyaXB0aW9uPSdNZWFuIHZhcG9yIHByZXNzdXJlIGRlZmljaXQnXG5AbWV0aG9kIFZQRFxuQHBhcmFtIGRhdGVfdG1pblxuQHBhcmFtIGRhdGVfdG1heFxuQHBhcmFtIGRhdGVfdGRtZWFuXG4qL1xubW9kdWxlLmV4cG9ydHMuVlBEID0gZnVuY3Rpb24oZGF0ZV90bWluLCBkYXRlX3RtYXgsIGRhdGVfdGRtZWFuKXtcbiAgdmFyIHQgPSAoMC42MTA4IC9cbiAgICAgICAgICAgIDIgKlxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBNYXRoLmV4cChkYXRlX3RtaW4gKiAxNy4yNyAvIChkYXRlX3RtaW4gKyAyMzcuMykgKSArXG4gICAgICAgICAgICAgIE1hdGguZXhwKGRhdGVfdG1heCAqIDE3LjI3IC8gKGRhdGVfdG1heCArIDIzNy4zKSApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSAtXG4gICAgICAgICAgKCAwLjYxMDggKlxuICAgICAgICAgICAgTWF0aC5leHAoZGF0ZV90ZG1lYW4gKiAxNy4yNyAvIChkYXRlX3RkbWVhbiArIDIzNy4zKSApXG4gICAgICAgICAgKTtcbiAgcmV0dXJuIHQ7XG59O1xuXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbj0nVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllciAoUG9wbGFyKSdcbkBtZXRob2QgZlZQRFxuQHBhcmFtIGtHXG5AcGFyYW0gY3VyX1ZQRFxuKi9cbm1vZHVsZS5leHBvcnRzLmZWUEQgPSBmdW5jdGlvbihrRywgY3VyX1ZQRCl7XG4gIHJldHVybiBNYXRoLmV4cCgtMSAqIGtHICogY3VyX1ZQRCk7XG59O1xuXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLy8gbWFrZSBhIG1lYW5pbmdmdWwgdGVtcHZhciBuYW1lXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbiA9ICdOdW1iZXIgb2YgRnJlZXplIERheXMgTW9kaWZpZXInXG5AbWV0aG9kIGZGcm9zdFxuQHBhcmFtIGRhdGVfdG1pblxuKi9cbm1vZHVsZS5leHBvcnRzLmZGcm9zdCA9IGZ1bmN0aW9uKGRhdGVfdG1pbikge1xuICB2YXIgdGVtcFZhciA9IC0xLjA7XG5cbiAgaWYoIGRhdGVfdG1pbiA+PSAwICl7XG4gICAgdGVtcFZhciA9IDEuMDtcbiAgfSAvL2Vsc2UgLTEuMFxuXG4gIHJldHVybiAwLjUgKiAoMS4wICsgdGVtcFZhciAqIE1hdGguc3FydCgxIC0gTWF0aC5leHAoLTEgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSAqICg0IC8gMy4xNDE1OSArIDAuMTQgKiBNYXRoLnBvdyggKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKSAvICgxICsgMC4xNCAqIE1hdGgucG93KCgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgKSApICk7XG59O1xuXG4vL1RPRE8gLSBiZXR0ZXIgbmFtaW5nPzogdG1pbiwgdG1heCA9IHdlYXRoZXIgVG9wdCwgVG1heCwgVG1pbiA9IHRyZWUgcGFyYW1zXG4vKipcbnVuaXRzPXVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1RlbXBlcmF0dXJlIG1vZGlmaWVyJ1xuQG1ldGhvZCBmVFxuQHBhcmFtIHRhdmdcbkBwYXJhbSBmVFxuKi9cbm1vZHVsZS5leHBvcnRzLmZUID0gZnVuY3Rpb24odGF2ZywgZlQpe1xuICB2YXIgZjtcbiAgaWYodGF2ZyA8PSBmVC5tbiB8fCB0YXZnID49IGZULm14KXtcbiAgICBmID0gMDtcbiAgfSBlbHNlIHtcbiAgICBmID0gKCAodGF2ZyAtIGZULm1uKSAvIChmVC5vcHQgLSBmVC5tbikgKSAgKlxuICAgICAgICAgICBNYXRoLnBvdyAoICggKGZULm14IC0gdGF2ZykgLyAoZlQubXggLSBmVC5vcHQpICksXG4gICAgICAgICAgICAgICAgICAgICAgKCAoZlQubXggLSBmVC5vcHQpIC8gKGZULm9wdCAtIGZULm1uKSApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gIH1cbiAgcmV0dXJuKGYpO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyxcbmRlc2NyaXB0aW9uPSdSZXF1aXJlZCBJcnJpZ2F0aW9uJ1xuQG1ldGhvZCBJcnJpZ1xuQHBhcmFtIGlycmlnRnJhY1xuQHBhcmFtIGN1cl9UcmFuc3BcbkBwYXJhbSBjdXJfSW50Y3B0blxuQHBhcmFtIGRhdGVfcHB0XG4qL1xubW9kdWxlLmV4cG9ydHMuSXJyaWcgPSBmdW5jdGlvbihpcnJpZ0ZyYWMsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBkYXRlX3BwdCl7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGlycmlnRnJhYyAqIChjdXJfVHJhbnNwIC0gKDEgLSBjdXJfSW50Y3B0bikgKiBkYXRlX3BwdCkgKTtcbn07XG5cbi8vVE9ETzogZ2V0IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIGZTV1xuQHBhcmFtIEFTV1xuQHBhcmFtIG1heEFXU1xuQHBhcmFtIHN3Y29uc3RcbkBwYXJhbSBzd3Bvd2VyXG4qL1xubW9kdWxlLmV4cG9ydHMuZlNXID0gZnVuY3Rpb24oQVNXLCBtYXhBV1MsIHN3Y29uc3QsIHN3cG93ZXIpIHtcbiAgdmFyIGZTVztcbiAgaWYoIHN3Y29uc3QgPT09IDAgfHwgbWF4QVdTID09PSAwICkge1xuICAgIGZTVyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG9tciA9IDEgLSAoQVNXLzEwKSAvIG1heEFXUzsgLy8gT25lIE1pbnVzIFJhdGlvXG5cbiAgICBpZihvbXIgPCAwLjAwMSkge1xuICAgICAgZlNXID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZlNXID0gKDEtTWF0aC5wb3cob21yLHN3cG93ZXIpKS8oMStNYXRoLnBvdyhvbXIvc3djb25zdCxzd3Bvd2VyKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmU1c7XG59O1xuXG4vKipcbnVuaXRzPSd1bml0bGVzcycsXG5kZXNjcmlwdGlvbj0nTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludCdcbkBtZXRob2QgZk51dHJcbkBwYXJhbSBmTjBcbkBwYXJhbSBGUlxuKi9cbm1vZHVsZS5leHBvcnRzLmZOdXRyID0gZnVuY3Rpb24oZk4wLCBGUil7XG4gIHJldHVybiBmTjAgKyAoMSAtIGZOMCkgKiBGUjtcbn07XG5cbi8qKlxuVE9ETzogd2h5ICQzIGluIG1ha2VmaWxlIC0gYXNrIGFib3V0IGl0XG51bml0cz11bml0bGVzc1xuZGVzY3JpcHRpb249J1BoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1J1xuQG1ldGhvZCBQaHlzTW9kXG5AcGFyYW0gY3VyX2ZWUERcbkBwYXJhbSBjdXJfZlNXXG5AcGFyYW0gY3VyX2ZBZ2VcbiovXG5tb2R1bGUuZXhwb3J0cy5QaHlzTW9kID0gZnVuY3Rpb24oY3VyX2ZWUEQsIGN1cl9mU1csIGN1cl9mQWdlKXtcbiAgIHJldHVybiBNYXRoLm1pbihjdXJfZlZQRCAsIGN1cl9mU1cpICogY3VyX2ZBZ2U7XG59O1xuXG4vKipcbnVuaXRzPSdnYyxtL3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBDb25kdWN0YW5jZSdcbkBtZXRob2QgQ2FuQ29uZFxuQHBhcmFtIFBoeXNNb2RcbkBwYXJhbSBMQUlcbkBwYXJhbSBjb25kXG4qL1xubW9kdWxlLmV4cG9ydHMuQ2FuQ29uZCA9IGZ1bmN0aW9uKFBoeXNNb2QsIExBSSwgY29uZCl7XG4gICByZXR1cm4gTWF0aC5tYXgoY29uZC5tbiAsIGNvbmQubXggKiBQaHlzTW9kICogTWF0aC5taW4oMSAsIExBSSAvIGNvbmQubGFpKSApO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyB3aGljaCBpcyBhbHNvIGtnL20yL21vblxuZGVzY3JpcHRpb249J0Nhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb24nXG5AbWV0aG9kIFRyYW5zcFxuQHBhcmFtIGRhdGVfbnJlbFxuQHBhcmFtIGRheXNcbkBwYXJhbSBkYXRlX2RheWxpZ2h0XG5AcGFyYW0gY3VyX1ZQRFxuQHBhcmFtIEJMY29uZFxuQHBhcmFtIGN1cl9DYW5Db25kXG4qL1xubW9kdWxlLmV4cG9ydHMuVHJhbnNwID0gZnVuY3Rpb24oZGF0ZV9ucmVsLCBkYXlzLCBkYXRlX2RheWxpZ2h0LCBjdXJfVlBELCBCTGNvbmQsIGN1cl9DYW5Db25kKXtcbiAgdmFyIFZQRGNvbnYgPSBjb25zdGFudCgnVlBEY29udicpO1xuICB2YXIgbGFtYmRhID0gY29uc3RhbnQoJ2xhbWJkYScpO1xuICB2YXIgcmhvQWlyID0gY29uc3RhbnQoJ3Job0FpcicpO1xuICB2YXIgZTIwID0gY29uc3RhbnQoJ2UyMCcpO1xuICB2YXIgUWEgPSBjb25zdGFudCgnUWEnKTtcbiAgdmFyIFFiID0gY29uc3RhbnQoJ1FiJyk7XG5cbiAgLy8gZGF0ZV9kYXlsaWdodCA9IGhvdXJzXG4gIC8vIG5yZWwgaXMgaW4gTUovbV4yL2RheSBjb252ZXJ0IHRvIFdoL21eMi9kYXlcbiAgdmFyIG5ldFJhZCA9IFFhICsgUWIgKiAoKGRhdGVfbnJlbCAqIDI3Ny43NzgpIC8gZGF0ZV9kYXlsaWdodCk7XG4gIHZhciBkZWZUZXJtID0gcmhvQWlyICogbGFtYmRhICogVlBEY29udiAqIGN1cl9WUEQgKiBCTGNvbmQ7XG4gIHZhciBkaXYgPSAxICsgZTIwICsgQkxjb25kIC8gY3VyX0NhbkNvbmQ7XG5cbiAgLy8gQ29udmVydCBkYXlsaWdodCB0byBzZWNzLlxuICByZXR1cm4gZGF5cyAqICggKGUyMCAqIG5ldFJhZCArIGRlZlRlcm0gKSAvIGRpdiApICogZGF0ZV9kYXlsaWdodCAqIDM2MDAgLyBsYW1iZGE7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nIHdoaWNoIGlzIGFsc28ga2cvbTIvbW9uXG5kZXNjcmlwdGlvbj0nRVRyJ1xuQG1ldGhvZCBFVHJcbkBwYXJhbSBScyAoTUovbTIvZGF5KVxuQHBhcmFtIGRheXNcbkBwYXJhbSBUbSAodG1pbit0bWF4KS8yXG5AcGFyYW0gY3VyX1ZQRCA9IChlcy1lYSlcbkBwYXJhbSBlbGV2YXRpb24gKG0pXG5AcGFyYW0gd2luZF9zcGVlZCAobS9zKVxuKi9cblxubW9kdWxlLmV4cG9ydHMuRVRyID0gZnVuY3Rpb24oUnMsdG1pbix0bWF4LHRkbWVhbixkYXlzLFosdTIpe1xuICB1MiA9IHR5cGVvZiB1MiAhPT0gJ3VuZGVmaW5lZCcgPyB1MiA6IGNvbnN0YW50KCdhc2NlX2V0cl93aW5kc3BlZWQnKTtcbiAgWiA9IHR5cGVvZiBaICE9PSAndW5kZWZpbmVkJyA/IFogOiBjb25zdGFudCgnYXNjZV9ldHJfZWxldmF0aW9uJyk7XG5cbiAgLy8gRkFPIDU2IENyb3AgRXZhcG9yYXRpb25cbiAgdmFyIHBzeWNocm9tZXRyaWNfY29uc3RhbnQgPSBmdW5jdGlvbih6KSB7XG4gICAgdmFyIFA9MTAxLjMgKiBNYXRoLnBvdygoMjkzIC0gKDAuMDA2NSkqeikvMjkzLDUuMjYpO1xuICAgIGcgPSAwLjY2NSogTWF0aC5wb3coMTAsLTMpKlA7XG4gICAgcmV0dXJuIGc7XG4gIH07XG5cbiAgdmFyIHNsb3BlX29mX3NhdHVyYXRpb25fdmFwb3JfcHJlc3N1cmU9IGZ1bmN0aW9uKFRtKSB7XG4gICAgcmV0dXJuIDQwOTguMTcgKiAwLjYxMDggKiBNYXRoLmV4cChUbSAqIDE3LjI3IC8gKFRtICsgMjM3LjMpKSAvIE1hdGgucG93KChUbSArMjM3LjMpLDIpXG4gIH07XG5cbiAgdmFyIHZwID0gZnVuY3Rpb24oVCkge1xuICAgIHJldHVybiAwLjYxMDggKiBNYXRoLmV4cChUICogMTcuMjcgLyAoVCArIDIzNy4zKSk7XG4gIH07XG5cbiAgdmFyIFJubCA9IGZ1bmN0aW9uKHRtaW4sdG1heCx0ZG1lYW4sSykge1xuICAgIHJldHVybiAtKDEuMzUgKiBLIC0gMC4zNSkgKiAoMC4zNCAtIDAuMTQgKiBNYXRoLnNxcnQodnAodGRtZWFuKSkpICogTWF0aC5wb3coNC45MywtMDkpICogKChNYXRoLnBvdyh0bWluICsyNzMuMTYsNCkgKyBNYXRoLnBvdyh0bWF4ICsgMjczLjE2LDQpKSAvIDIpO1xuICB9XG4gIC8vMC40MDggKiBkZWx0YSAqICggUm4gLSBHKSArIHBzeWNoICogKENuIC8gKFQgKyAyNzMpKSAqIHUyICogKGVzIC1lYSApIC8gKGRlbHRhICsgcHN5Y2ggKiAoMSArIENkICogdTIgKSlcbiAgLy8gRVRyOntDbjoxNjAwLENkOjAuMzh9LEVUbzp7Q246OTAwLENkPTAuMzR9XG4gIC8vUm4gPSBNSiAvIG0yIGRheSA9PiBkYXRlX25yZWwgKE1KL21eMi9kYXkpXG4gIC8vRz0wXG4gIC8vdTIgPSBtL3NcbiAgLy8gVCA9IG1lYW4gVCAoQylcbiAgLy8gKGVzLWVhKSA9IHNhdHVyYXRpb24gVmFwb3IgUHJlc3N1cmUgKEtwYSkgPT4gY3VyX1ZQRFxuICB2YXIgVG09KHRtaW4rdG1heCkvMjtcbiAgdmFyIENuPTE2MDA7XG4gIHZhciBDZD0wLjM4O1xuICB2YXIgVlBEID0gKCh2cCh0bWluKSt2cCh0bWF4KSkvMiktdnAodGRtZWFuKTtcbiAgdmFyIGcgPSBwc3ljaHJvbWV0cmljX2NvbnN0YW50KFopO1xuICB2YXIgRCA9IHNsb3BlX29mX3NhdHVyYXRpb25fdmFwb3JfcHJlc3N1cmUoVG0pO1xuICB2YXIgUm5sID0gUm5sKHRtaW4sdG1heCx0ZG1lYW4sMS4wKTtcbiAgUm5sID0tOTAgLyAyNzcuMDtcbiAgdmFyIHJhZCA9IDAuNDA4ICogRCAqIChScyAqICgxIC0gMC4yMykgKyBSbmwpO1xuICB2YXIgZGVmID0gZyAqIChDbi8oVG0rMjczKSkgKiB1MiAqIFZQRDtcbiAgdmFyIGRpdiA9IEQgKyBnICogKDEgKyBDZCp1Mik7XG4gIHZhciBFVHIgPSAocmFkK2RlZikvZGl2O1xuIC8vIGNvbnNvbGUubG9nKHtUbTpUbSxEOkQsUm5sOlJubCxSczpScyxFVHI6RVRyfSlcbiAgLy8gQ29udmVydCBkYXlsaWdodCB0byBzZWNzLlxuICByZXR1cm4gZGF5cyAqIEVUcjtcbn07XG5cbi8vVE9ETzogZGVzY3JpcHRpb25cbi8qKlxudW5pdHM9J21ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGEnLFxuQG1ldGhvZCBOUFBcbkBwYXJhbSBwcmV2X1N0YW5kQWdlXG5AcGFyYW0gZnVsbENhbkFnZVxuQHBhcmFtIHhQUFxuQHBhcmFtIGtcbkBwYXJhbSBwcmV2X0xBSVxuQHBhcmFtIGZWUERcbkBwYXJhbSBmU1dcbkBwYXJhbSBmQWdlXG5AcGFyYW0gYWxwaGFcbkBwYXJhbSBmTnV0clxuQHBhcmFtIGZUXG5AcGFyYW0gZkZyb3N0XG4qL1xubW9kdWxlLmV4cG9ydHMuTlBQID0gZnVuY3Rpb24ocHJldl9TdGFuZEFnZSwgZnVsbENhbkFnZSwgeFBQLCBrLCBwcmV2X0xBSSwgZlZQRCwgZlNXLCBmQWdlLCBhbHBoYSwgZk51dHIsIGZULCBmRnJvc3Qpe1xuICB2YXIgQ2FuQ292ZXIgPSAxO1xuICBpZiggcHJldl9TdGFuZEFnZSA8IGZ1bGxDYW5BZ2UgKXtcbiAgICBDYW5Db3ZlciA9IHByZXZfU3RhbmRBZ2UgLyBmdWxsQ2FuQWdlO1xuICB9XG5cbiAgcmV0dXJuIHhQUCAqICgxIC0gKE1hdGguZXhwKC1rICogcHJldl9MQUkpICkgKSAqIENhbkNvdmVyICogTWF0aC5taW4oZlZQRCAsIGZTVykgKiBmQWdlICogYWxwaGEgKiBmTnV0ciAqIGZUICogZkZyb3N0O1xufTtcblxuLy9UT0RPOiB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBwUlxuQHBhcmFtIGN1cl9QaHlzTW9kXG5AcGFyYW0gY3VyX3BSXG5AcGFyYW0gRlJcbkBwYXJhbSBwUlxuKi9cbm1vZHVsZS5leHBvcnRzLnBSID0gZnVuY3Rpb24oY3VyX1BoeXNNb2QsIGN1cl9wUixGUixwUil7XG4gIHZhciBwID0ocFIubXggKiBwUi5tbikgL1xuICAgICAgICAgKHBSLm1uICsgKHBSLm14IC0gcFIubW4pICogY3VyX1BoeXNNb2QgKiAocFIubTAgKyAoMSAtIHBSLm0wKSAqIEZSKSApO1xuXG4gIC8vIFRoaXMgd2FzIGFkZGVkIGJ5IHF1aW5uIHRvIGxpbWl0IHJvb3QgZ3Jvd3RoLlxuICByZXR1cm4gcCAqIE1hdGgucG93KHAvY3VyX3BSLDIpO1xufTtcblxuXG4vL1RPRE86IG1vbHMgb3IgbW9scyBwZXIgbV4yP1xuLyoqXG51bml0cz1tb2xzXG5kZXNjcmlwdGlvbj0nTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aCdcbm1vbFBBUl9NSiBbbW9sL01KXSBpcyBhIGNvbnN0YW50IENvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUlxuQG1ldGhvZCBQQVJcbkBwYXJhbSBkYXRlX3JhZFxuQHBhcmFtIG1vbFBBUl9NSlxuKi9cbm1vZHVsZS5leHBvcnRzLlBBUiA9IGZ1bmN0aW9uKGRhdGVfcmFkLCBkYXlzLCBtb2xQQVJfTUopIHtcbiAgaWYoIG1vbFBBUl9NSiA9PT0gbnVsbCB8fCBtb2xQQVJfTUogPT09IHVuZGVmaW5lZCApIHtcbiAgICBtb2xQQVJfTUogPSBjb25zdGFudCgnbW9sUEFSX01KJyk7XG4gIH1cblxuICByZXR1cm4gZGF0ZV9yYWQgKiBtb2xQQVJfTUogKiBkYXlzO1xufTtcblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5kZXNjcmlwdGlvbj0nbWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uIFt0RE0gLyBoYSBtb250aF0sXG5OT1RFOiAxMDAwMC8xMF42IFtoYS9tMl1bdERtL2dETV1cbmdHTV9tb2wgW2cvbW9sXSBpcyB0aGUgbW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXG5AbWV0aG9kIHhQUFxuQHBhcmFtIHlcbkBwYXJhbSBjdXJfUEFSXG5AcGFyYW0gZ0RNX21vbFxuKi9cbm1vZHVsZS5leHBvcnRzLnhQUCA9IGZ1bmN0aW9uKHksIGN1cl9QQVIsIGdETV9tb2wpe1xuICAgIGlmKCBnRE1fbW9sID09PSBudWxsIHx8IGdETV9tb2wgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGdETV9tb2wgPSBjb25zdGFudCgnZ0RNX21vbCcpO1xuICAgIH1cblxuICAgIHJldHVybiB5ICogY3VyX1BBUiAqIGdETV9tb2wgLyAxMDA7XG59O1xuXG4vKioqIEZVTkNUSU9OUyBGT1IgQ09QUElDSU5HICovXG4vKipcbmNvcHBpY2UgcmVsYXRlZCBmdW5jdGlvbnNcbkBtZXRob2QgY29wcGljZVxuKi9cbm1vZHVsZS5leHBvcnRzLmNvcHBpY2UgPSB7XG4gIC8vIENvcHBpY2UgRnVuY3Rpb25zIGFyZSBiYXNlZCBvbiBEaWFtZXRlciBvbiBTdHVtcCwgTk9UIERCSC5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHRoZSBzdGVtIHdlaWdodCBpbiBLR1xuICBwZnMgOiBmdW5jdGlvbihzdGVtLCBwKSB7XG4gICAgdmFyIGF2RE9CID0gTWF0aC5wb3coICggc3RlbSAvIHAuc3RlbUNudCAvIHAuc3RlbUMpICwgKDEgLyBwLnN0ZW1QKSApO1xuICAgIHZhciBwcGZzPSBwLnBmc0MgKiBNYXRoLnBvdyhhdkRPQiAsIHAucGZzUCk7XG5cbiAgICByZXR1cm4gTWF0aC5taW4ocC5wZnNNeCxwcGZzKTtcbiAgfSxcblxuICAvLyBDYWxjdWxhdGVzIHRoZSBwZnMgYmFzZWQgb24gc3RlbSB3aXRoIGluIEcuICBVc2VzIHZvbHVtZSBJbmRleCBhcyBndWlkZVxuICBwZnNfdmlhX1ZJIDogZnVuY3Rpb24gKHN0ZW1HLCB3c1ZJLCBsYVZJLCBTTEEpIHtcbiAgICBpZiAoc3RlbUcgPCAxMCkge1xuICAgICAgc3RlbUcgPSAxMDtcbiAgICB9XG4gICAgdmFyIFZJID0gTWF0aC5wb3coIChzdGVtRyAvIHdzVkkuc3RlbXNfcGVyX3N0dW1wIC8gd3NWSS5jb25zdGFudCksKDEgLyB3c1ZJLnBvd2VyKSApO1xuXG4gICAgLy8gQWRkIHVwIGZvciBhbGwgc3RlbXNcbiAgICB2YXIgbGEgPSBsYVZJLmNvbnN0YW50ICogTWF0aC5wb3coVkksbGFWSS5wb3dlcikgKiB3c1ZJLnN0ZW1zX3Blcl9zdHVtcDtcbiAgICB2YXIgd2YgPSAxMDAwICogKGxhIC8gU0xBKTsgIC8vIEZvaWxhZ2UgV2VpZ2h0IGluIGc7XG4gICAgdmFyIHBmcyA9IHdmL3N0ZW1HO1xuICAgIHJldHVybiBwZnM7XG4gIH0sXG5cbiAgUm9vdFAgOiBmdW5jdGlvbihjdXJfbnBwLCBjdXJfbnBwVGFyZ2V0LCBXUixXLHBSeCxmcmFjKSB7XG4gICAgdmFyIG5wcFJlcyA9IGN1cl9ucHBUYXJnZXQgLSBjdXJfbnBwO1xuICAgIHZhciByb290UFA7XG4gICAgaWYoIG5wcFJlcyA+IDAgJiYgV1IvVyA+IHBSeCApIHtcbiAgICAgICAgcm9vdFBQID0gTWF0aC5taW4obnBwUmVzLCBXUiooV1IvVyAtIHBSeCkqZnJhYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQUCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3RQUDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZWFkIDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gICAgLy8gWW91IG5lZWQgdG8gc2V0IHlvdXIgSU8gaGVyZSBhbmQgbWFrZSBzdXJlIGFsbCBwYXJhbWV0ZXJzIGZvciBtb2RlbCBhcmUgY29ycmVjdGx5IHNldFxuICB9LFxuICBkdW1wIDogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm4gPSByZXF1aXJlKCcuL2ZuJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZGF0YU1vZGVsID0gcmVxdWlyZSgnLi9kYXRhTW9kZWwnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vdmFsaWRhdGUnKTtcblxuZnVuY3Rpb24gcnVuKGxlbmd0aE9mR3Jvd3RoKSB7XG5cbiAgICB2YXIgeWVhclRvQ29wcGljZTsgLy95ZWFyIG9mIHRoZSBmaXJzdCBvciBzdWJzZXF1ZW50IGhhcnZlc3RzXG4gICAgdmFyIGNvcHBpY2VJbnRlcnZhbDsgLy90aGUgIyBvZiBtb250aHMgaW4gYSBzaW5nbGUgY29wcGljZSBjeWNsZVxuICAgIHZhciBtb250aFRvQ29wcGljZTsgLy9hdCB3aGljaCBtb250aCB0aGUgaGFydmVzdCBpcyB0byBiZSBwZXJmb3JtZWQgOjogY3VycmVudGx5IHRoZSB0cmVlIHdpbGwgYmUgY3V0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhhdCBtb250aFxuICAgIHZhciBjb3BwaWNlRGF0ZXM7XG5cbiAgICAvLyBoZWxwZXIsIG5vdCByZXF1aXJlZC4gIHlvdSBjYW4gcmVnaXN0ZXIgY2FsbGJhY2sgdG8gc2V0IHBhcmFtZXRlcnMgd2hlbmV2ZXIgcnVuIGlzIGNhbGxlZFxuICAgIHRoaXMuaW8ucmVhZCh0aGlzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSBtb2RlbCBpbnB1dHMgYXJlIHZhbGlkIGJlZm9yZSB3ZSBwcm9jZWVkIGFueSBmdXJ0aGVyXG4gICAgdmFsaWRhdGUodGhpcyk7XG5cbiAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQpO1xuICAgIC8vdmFyIHBsYW50ZWRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcbiAgICAvL3ZhciBjdXJyZW50TW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG5cbiAgICAvL1RPRE86IHRlc3Qgbm8gZGF0ZWNvcHBpY2UgYXMgaW5wdXRcbiAgICBpZiAoIHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICB5ZWFyVG9Db3BwaWNlID0gdGhpcy5tYW5hZ2UuZGF0ZUNvcHBpY2VkLmdldEZ1bGxZZWFyKCk7XG4gICAgICBtb250aFRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRNb250aCgpO1xuICAgICAgY29wcGljZUludGVydmFsID0gdGhpcy5tYW5hZ2UueWVhcnNQZXJDb3BwaWNlO1xuICAgIH1cblxuICAgIGlmKCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGNvcHBpY2VEYXRlcyA9IFtdO1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzW2ldLnNwbGl0KCctJyk7XG5cbiAgICAgICAgdmFyIGQgPSAxNTtcbiAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA+IDIgKSB7XG4gICAgICAgICAgZCA9IHBhcnNlSW50KHBhcnRzWzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcHBpY2VEYXRlcy5wdXNoKG5ldyBEYXRlKHBhcnNlSW50KHBhcnRzWzBdKSwgcGFyc2VJbnQocGFydHNbMV0pLTEsIGQpKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIGluaXQgbWFuYWdlIG5zXG4gICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICB9XG5cbiAgICB2YXIgc2V0dXAgPSB7XG4gICAgICBsZW5ndGhPZkdyb3d0aCA6IGxlbmd0aE9mR3Jvd3RoLFxuICAgICAgeWVhclRvQ29wcGljZSA6IHllYXJUb0NvcHBpY2UsXG4gICAgICBtb250aFRvQ29wcGljZSA6IG1vbnRoVG9Db3BwaWNlLFxuICAgICAgY29wcGljZUludGVydmFsIDogY29wcGljZUludGVydmFsLFxuICAgICAgY29wcGljZURhdGVzIDogY29wcGljZURhdGVzXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJ1blNldHVwKHNldHVwKTtcbn1cblxuZnVuY3Rpb24gcnVuU2V0dXAoc2V0dXApe1xuICAgIHZhciBpLCBrZXksIGN1cnJlbnRXZWF0aGVyLCBzdGVwLCB0O1xuXG4gICAgdmFyIGRheXNfaW5faW50ZXJ2YWwgPSAodGhpcy5zZXR1cCAmJiB0aGlzLnNldHVwLmRheXNfaW5faW50ZXJ2YWwpID8gdGhpcy5zZXR1cC5kYXlzX2luX2ludGVydmFsIDogMTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgY29uc29sZS5sb2coJ2RheXNfaW5faW50ZXJ2YWw6ICcrIGRheXNfaW5faW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHZhciBtID0gKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICBpZiggbS5sZW5ndGggPT09IDEgKSB7XG4gICAgICBtID0gJzAnK207XG4gICAgfVxuXG4gICAgdmFyIGQgPSAodGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkpKycnO1xuICAgIGlmKCBkLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIGQgPSAnMCcrZDtcbiAgICB9XG5cbiAgICAvL3ZhciBjdXJyZW50V2VhdGhlciA9IGdldFdlYXRoZXIodGhpcywgc2V0dXAsIG0sIGQpO1xuICAgIHZhciBmaXJzdFN0ZXBSZXN1bHRzID0gaW5pdCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCk7XG5cbiAgICB2YXIga2V5c0luT3JkZXIgPSBbXTtcbiAgICB2YXIgaGVhZGVyID0gWydkYXRlJ107XG4gICAgZm9yKCBrZXkgaW4gZGF0YU1vZGVsLnBsYW50YXRpb25fc3RhdGUudmFsdWUgKSB7XG4gICAgICBrZXlzSW5PcmRlci5wdXNoKGtleSk7XG4gICAgICBoZWFkZXIucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGZpcnN0U3RlcFJlc3VsdHMuRGF0ZSA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSsnLScrZDtcblxuICAgIHZhciByb3dzID0gW107IC8vdGhlc2Ugd2lsbCBiZWNvbWUgcm93c1xuICAgIHJvd3MucHVzaChoZWFkZXIpO1xuXG4gICAgdmFyIGZpcnN0Um93ID0gW2ZpcnN0U3RlcFJlc3VsdHMuRGF0ZV07XG4gICAgZm9yKCBpID0gMDsgaSA8IGtleXNJbk9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgZmlyc3RSb3cucHVzaChmaXJzdFN0ZXBSZXN1bHRzW2tleV0pO1xuICAgIH1cbiAgICByb3dzLnB1c2goZmlyc3RSb3cpO1xuXG4gICAgdmFyIGN1cnJlbnRTdGVwUmVzdWx0cyA9IGZpcnN0U3RlcFJlc3VsdHM7XG4gICAgdmFyIG5leHRTdGVwUmVzdWx0cztcblxuICAgIGZvcihzdGVwID0gMTsgc3RlcCA8IHNldHVwLmxlbmd0aE9mR3Jvd3RoOyBzdGVwKyspIHtcbiAgICAgIHRoaXMuY3VycmVudERhdGUgPSBuZXcgRGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZCk7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUodGhpcy5tYW5hZ2UuZGF0ZVBsYW50ZWQuZ2V0RGF0ZSgpICsgc3RlcCAqIGRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG4vLyAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZC5nZXREYXRlKCkgKyBzdGVwKnNldHVwLmRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG5cbiAgICAgIGlmKCBzaG91bGRDb3BwaWNlKHRoaXMsIHNldHVwLCBkYXlzX2luX2ludGVydmFsKSApIHtcbiAgICAgICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RpbWUgdG8gQ29wcGljZSEnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBtID0gKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgbSA9ICcwJyttO1xuICAgICAgfVxuXG4gICAgICBkID0gdGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkrJyc7XG4gICAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIGQgPSAnMCcrZDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcblxuICAgICAgLy9UT0RPOiBzd2l0Y2ggdXAgdHJlZXMgaGVyZSB3aGVuIGFmdGVyIHRoZSBmaXJzdCBoYXJ2ZXN0XG4gICAgICBuZXh0U3RlcFJlc3VsdHMgPSBzaW5nbGVTdGVwKHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsLCBjdXJyZW50V2VhdGhlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2UsIGN1cnJlbnRTdGVwUmVzdWx0cywgZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICBuZXh0U3RlcFJlc3VsdHMuRGF0ZSA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSsnLScrZDtcblxuICAgICAgdmFyIHRoaXNSb3cgPSBbbmV4dFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgICAgZm9yKCBpID0gMDsgaSA8IGtleXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgICB0aGlzUm93LnB1c2gobmV4dFN0ZXBSZXN1bHRzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RlcFJlc3VsdHMgPSBuZXh0U3RlcFJlc3VsdHM7XG4gICAgICByb3dzLnB1c2godGhpc1Jvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5pby5kdW1wKHJvd3MpO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyhzdGVwKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgY29uc29sZS5sb2coKG5ldyBEYXRlKCkuZ2V0VGltZSgpLXQpKydtcycpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVTdGVwKHBsYW50YXRpb24sIHNvaWwsIHdlYXRoZXIsIG1hbmFnZSwgcCwgZGF5c19pbl9pbnRlcnZhbCkgeyAvL3AgPSBwcmV2aW91cyBzdGF0ZVxuICB2YXIgYyA9IHt9OyAvL2N1cnJlbnQgc3RhdGVcblxuICBpZiggbWFuYWdlLmNvcHBpY2UgPT09IHRydWUgKSB7IC8vY2hhbmdlIHRoaXMgZ3V5IGZvciB0aGUgbW9udGggd2hlbiBjb3BwaWNlXG4gICAgLy8gQWRkIGluIGEgc3R1bXAgbWFyZ2luLi4uLlxuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdCArIHAuV1M7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudCArIDE7XG4gICAgYy5jb3BwaWNlQWdlID0gMDtcbiAgICBwLkxBSSA9IDA7XG4gICAgcC5XUyA9IDA7XG4gICAgcC5XRiA9IDA7XG4gICAgcC5XID0gcC5XUjtcbiAgfSBlbHNlIHtcbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3Q7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudDtcbiAgICBjLmNvcHBpY2VBZ2UgPSBwLmNvcHBpY2VBZ2UgKyBkYXlzX2luX2ludGVydmFsLzM2NS4wO1xuICB9XG5cbiAgdmFyIHRyZWU7IC8vdHJlZVxuICBpZiggYy5jb3BwaWNlQ291bnQgPT09IDAgKSB7IC8vVE9ETzogY2hlY2sgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIG11bHRpIHN0dW1wIHRyZWVcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcbiAgfSBlbHNlIHtcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZTtcbiAgfVxuXG4gIGMuU3RhbmRBZ2UgPSBwLlN0YW5kQWdlICsgZGF5c19pbl9pbnRlcnZhbC8zNjUuMDtcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLlNMQSk7XG4gIGMuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuXG4gIC8vIEpNIC0gUGVyIHNlY3Rpb24gMi4xICBMYW5kc2JlcmcvV2FyaW5nXG4gIGMuVlBEID0gZm4uVlBEKHdlYXRoZXIudG1pbiwgd2VhdGhlci50bWF4LCB3ZWF0aGVyLnRkbWVhbik7XG4gIC8vYy5WUEQgPSBmbi5WUEQod2VhdGhlci50bWluLCB3ZWF0aGVyLnRtYXgsIHdlYXRoZXIudGRtZWFuLCBkYXlzX2luX2ludGVydmFsKTtcblxuXG4gIGMuZlZQRCA9IGZuLmZWUEQodHJlZS5rRywgYy5WUEQpO1xuXG4gIGMuZlNXID0gZm4uZlNXKHAuQVNXLCBzb2lsLm1heEFXUywgc29pbC5zd2NvbnN0LCBzb2lsLnN3cG93ZXIpO1xuICBjLmZBZ2UgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5mQWdlKTtcblxuICAvLyBmRnJvc3QgaXMgYSBjdW11bGF0aXZlIE5vcm1hbCBkaXN0cmlidXRpb24sIHRoYXQgYXBwcm9peG1hdGVzIHRoZSBudW1iZXIgb2YgZGF5cyAob3IgcGFydHMgb2YgZGF5cykgdGhhdFxuICAvLyB3aWxsIGJlIGJlbG93IDAsIGdpdmVuIGEgbWluaW11bSB0ZW1wZXJhdHVyZVxuICBjLmZGcm9zdCA9IGZuLmZGcm9zdCh3ZWF0aGVyLnRtaW4pO1xuXG4gIGMuUEFSID0gZm4uUEFSKHdlYXRoZXIucmFkLCBkYXlzX2luX2ludGVydmFsKTsgLy8gIFBBUiBpbiBtb2xzXG5cbiAgYy5mVCA9IGZuLmZUKCh3ZWF0aGVyLnRtaW4gKyB3ZWF0aGVyLnRtYXgpLzIsIHRyZWUuZlQpO1xuXG4gIGMuUGh5c01vZCA9IGZuLlBoeXNNb2QoYy5mVlBELCBjLmZTVywgYy5mQWdlKTtcbiAgYy5mTnV0ciA9IGZuLmZOdXRyKHRyZWUuZk4wLCBtYW5hZ2UuZmVydGlsaXR5KTtcbiAgYy54UFAgPSBmbi54UFAodHJlZS55LCBjLlBBUik7IC8vIG1heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBwZXIgbW9udGhcbiAgYy5OUFAgPSBmbi5OUFAocC5jb3BwaWNlQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHAuTEFJLCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcblxuICB2YXIgTlBQX3RhcmdldCA9IGZuLk5QUCh0cmVlLmZ1bGxDYW5BZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgdHJlZS5yb290UC5MQUlUYXJnZXQsIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuLy8gSk1cbiAgYy5Sb290UCA9IGZuLmNvcHBpY2UuUm9vdFAoYy5OUFAsIE5QUF90YXJnZXQsIHAuV1IsIHAuVywgdHJlZS5wUi5teCwgdHJlZS5yb290UC5mcmFjICogKGRheXNfaW5faW50ZXJ2YWwgLyAzMC40KSk7XG5cbiAgaWYgKHRyZWUubGFWSSAmJiB0cmVlLmxhVkkuY29uc3RhbnQgKSB7IC8vIFRlc3QgZm9yIHRoYXQgZnVuY3Rpb25cbiAgICBjLnBmcyA9IGZuLmNvcHBpY2UucGZzX3ZpYV9WSShwLldTKjEwMDAwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUud3NWSSx0cmVlLmxhVkksc2xhKTtcbiAgfSBlbHNlIHtcbiAgICBjLnBmcyA9IGZuLmNvcHBpY2UucGZzKHAuV1MqMTAwMC9wbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSwgdHJlZS5wZnMpO1xuICB9XG5cbiAgYy5kVyA9IGMuTlBQICsgdHJlZS5yb290UC5lZmZpY2llbmN5ICogYy5Sb290UDtcblxuICBjLkludGNwdG4gPSBmbi5JbnRjcHRuKGMuTEFJLCB0cmVlLkludGNwdG4pO1xuICBjLkNhbkNvbmQgPSBmbi5DYW5Db25kKGMuUGh5c01vZCwgYy5MQUksIHRyZWUuQ29uZHVjdGFuY2UpO1xuXG4gIGMucFIgPSBmbi5wUihjLlBoeXNNb2QsIHAuV1IvcC5XLCBtYW5hZ2UuZmVydGlsaXR5LCB0cmVlLnBSKTtcblxuICAvLyBKTSAtIHRyZWUgbGl0dGVyZmFsbCBpcyBhIG1vbnRobHkgcGFyYW1ldGVyLlxuICBjLmxpdHRlcmZhbGwgPSBmbi50ZHAocC5TdGFuZEFnZSwgdHJlZS5saXR0ZXJmYWxsKSAqIChkYXlzX2luX2ludGVydmFsIC8gMzAuNCk7XG5cbiAgYy5UcmFuc3AgPSBmbi5UcmFuc3Aod2VhdGhlci5yYWQsIGRheXNfaW5faW50ZXJ2YWwsIHdlYXRoZXIuZGF5bGlnaHQsIGMuVlBELCB0cmVlLkJMY29uZCwgYy5DYW5Db25kKTtcbiAgYy5FVHIgPSBmbi5FVHIod2VhdGhlci5yYWQsIHdlYXRoZXIudG1pbiwgd2VhdGhlci50bWF4LCB3ZWF0aGVyLnRkbWVhbiwgZGF5c19pbl9pbnRlcnZhbCk7XG4gIGMuS2MgPSBjLlRyYW5zcC9jLkVUcjtcblxuXG4gIC8vIENhbGN1bGF0ZWQgZnJvbSBwZnNcbiAgYy5wUyA9ICgxIC0gYy5wUikgLyAoMSArIGMucGZzICk7XG4gIGMucEYgPSAoMSAtIGMucFIpIC8gKDEgKyAxL2MucGZzICk7XG5cbiAgYy5JcnJpZyA9IGZuLklycmlnKG1hbmFnZS5pcnJpZ0ZyYWMsIGMuVHJhbnNwLCBjLkludGNwdG4sIHdlYXRoZXIucHB0KTtcbiAgYy5DdW1JcnJpZyA9IHAuQ3VtSXJyaWcgKyBjLklycmlnO1xuXG4gIGMuQVNXID0gZm4uQVNXKHNvaWwubWF4QVdTLCBwLkFTVywgd2VhdGhlci5wcHQsIGMuVHJhbnNwLCBjLkludGNwdG4sIGMuSXJyaWcpOyAvL2ZvciBzb21lIHJlYXNvbiBzcGVsbGVkIG1heEFXU1xuXG4gIGMuV0YgPSBwLldGICsgYy5kVyAqIGMucEYgLSBjLmxpdHRlcmZhbGwgKiBwLldGO1xuICAvLyBJbmNsdWRlIGNvbnRyaWJ1dGlvbiBvZiBSb290UCAvLyBFcnJvciBpbiBvbGQgY29kZSAhXG4gIGMuV1IgPSBwLldSICsgYy5kVyAqIGMucFIgLSAodHJlZS5wUi50dXJub3ZlciAqIChkYXlzX2luX2ludGVydmFsIC8gMzAuNCkpICogcC5XUiAtIGMuUm9vdFA7XG4gIGMuV1MgPSBwLldTICsgYy5kVyAqIGMucFM7XG4gIGMuVyA9IGMuV0YrYy5XUitjLldTO1xuXG4gIHJldHVybiBjO1xufVxuXG5mdW5jdGlvbiBpbml0KHBsYW50YXRpb24sIHNvaWwpIHtcbiAgdmFyIHAgPSB7fTtcbiAgdmFyIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTsgLy9UT0RPOiBkZWNpZGUgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIHRyZWU/XG5cbiAgcC5mZWVkc3RvY2tIYXJ2ZXN0PTA7XG4gIHAuY29wcGljZUNvdW50PTA7XG4gIHAuY29wcGljZUFnZSA9IDA7XG5cbiAgcC5DdW1JcnJpZyA9IDA7XG4gIHAuZFcgPSAwO1xuICBwLlcgPSBwbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSAqIHBsYW50YXRpb24uU2VlZGxpbmdNYXNzO1xuICBwLldGID0gcGxhbnRhdGlvbi5wRiAqIHAuVztcbiAgcC5XUyA9IHBsYW50YXRpb24ucFMgKiBwLlc7XG4gIHAuV1IgPSBwbGFudGF0aW9uLnBSICogcC5XO1xuICBwLkFTVyA9IDAuOCAqIDEwICogc29pbC5tYXhBV1M7IC8vIFRoZSAxMCBpcyBiZWNhdXNlIG1heEFXUyBpcyBpbiBjbSBhbmQgQVNXIGluIG1tICg/KSBXaHkgKD8pXG4gIHAuU3RhbmRBZ2UgPSAwO1xuXG4gIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcblxuICAvLyBzbGEgPSBTcGVjaWZpYyBMZWFmIEFyZWFcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLHRyZWUuU0xBKTtcblxuICBwLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcblxuICAvLyBUaGVzZSBhcmVuJ3QgdXNlZCBzbyBjYW4gYmUgc2V0IHRvIGFueXRoaW5nOyAgVGhleSBhcmUgc2V0IHRvIG1hdGNoIHRoZSBwb3N0Z3JlcyB0eXBlXG4gIHAuVlBEICAgICAgICA9IDA7XG4gIHAuZlZQRCAgICAgICA9IDA7XG4gIHAuZlQgICAgICAgICA9IDA7XG4gIHAuZkZyb3N0ICAgICA9IDA7XG4gIHAuZk51dHIgICAgICA9IDA7XG4gIHAuZlNXICAgICAgICA9IDA7XG4gIHAuZkFnZSAgICAgICA9IDA7XG4gIHAuUEFSICAgICAgICA9IDA7XG4gIHAueFBQICAgICAgICA9IDA7XG4gIHAuSW50Y3B0biAgICA9IDA7XG4gIHAuSXJyaWcgICAgICA9IDA7XG4gIHAuQ2FuQ29uZCAgICA9IDA7XG4gIHAuVHJhbnNwICAgICA9IDA7XG4gIHAuUGh5c01vZCAgICA9IDA7XG4gIHAucGZzICAgICAgICA9IDA7XG4gIHAucFIgICAgICAgICA9IDA7XG4gIHAucFMgICAgICAgICA9IDA7XG4gIHAucEYgICAgICAgICA9IDA7XG4gIHAubGl0dGVyZmFsbCA9IDA7XG4gIHAuTlBQICAgICAgICA9IDA7XG4gIHAuUm9vdFAgICAgICA9IDA7XG5cbiAgcmV0dXJuIHA7XG59XG5cbi8vIFRoaXMgYWN0dWFsbHkgbmVlZCB0byB3b3JrIGJldHRlci4gIElmIHRoZSB3ZWF0aGVyIGRvZXNuJ3QgbWF0Y2hcbi8vIHRoZSBzdGVwcywgd2UgbmVlZCB0byBmaW5kIHRoZSBjbG9zZXN0IHZhbHVlIHRvIHdoYXQgd2UgYXJlIGxvb2tpbmcgZm9yXG5mdW5jdGlvbiBnZXRXZWF0aGVyKG1vZGVsLCBzZXR1cCwgbW9udGgsIGRheSkge1xuXG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGgrJy0nK2RheV0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldO1xuICAgIH1cblxuICAgIC8vIG1vZGVsbGVkIGRhaWx5XG4gICAgaWYoIG1vZGVsLndlYXRoZXJbbW9udGgrJy0nK2RheV0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldO1xuICAgIH1cblxuICAgIC8vIGFjdHVhbFxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIG1vZGVsLndlYXRoZXJbbW9kZWwuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbW9udGhdO1xuICAgIH1cblxuICAvLyBtb2RlbGxlZCBNb250aGx5XG4gIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoXSAhPT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vbnRoXTtcbiAgfVxuXG4gIHRocm93ICdSdW50aW1lIEVycm9yOiBubyB3ZWF0aGVyIGZvdW5kIGZvciBtb250aDogJyttb250aDtcbn1cblxuZnVuY3Rpb24gc2hvdWxkQ29wcGljZShtb2RlbCwgc2V0dXAsIGRheXNfaW5faW50ZXJ2YWwpIHtcbiAgdmFyIG5leHQ7XG4gIHZhciBjb3BwaWNlX29uO1xuICAvLyBkbyB3ZSBoYXZlIHNwZWNpZmljIGNvcHBpY2UgZGF0ZXMgc2V0P1xuICBpZiggc2V0dXAuY29wcGljZURhdGVzICkge1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgZCA9IHNldHVwLmNvcHBpY2VEYXRlc1tpXTtcblxuICAgICAgaWYgKG1vZGVsLmN1cnJlbnREYXRlIDwgZCkge1xuICAgICAgICBuZXh0ID0gbW9kZWwuY3VycmVudERhdGU7XG4gICAgICAgIG5leHQuc2V0RGF0ZShuZXh0LmdldERhdGUgKyBkYXlzX2luX2ludGVydmFsKTtcbiAgICAgICAgaWYgKCBkIDwgbmV4dCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvcHBpY2Vfb24gPSBuZXcgRGF0ZSgpO1xuICAgIGNvcHBpY2Vfb24uc2V0WWVhcihzZXR1cC55ZWFyVG9Db3BwaWNlKTtcbiAgICBjb3BwaWNlX29uLnNldE1vbnRoKHNldHVwLm1vbnRoVG9Db3BwaWNlKTtcbiAgICBjb3BwaWNlX29uLnNldERhdGUoMTUpO1xuXG4gICAgaWYoIG1vZGVsLmN1cnJlbnREYXRlLmdldFRpbWUoKSA8IGNvcHBpY2Vfb24uZ2V0VGltZSgpICkge1xuICAgICAgbmV4dCA9IG5ldyBEYXRlKG1vZGVsLmN1cnJlbnREYXRlKTtcbiAgICAgIG5leHQuc2V0RGF0ZShtb2RlbC5jdXJyZW50RGF0ZS5nZXREYXRlKCkgKyBkYXlzX2luX2ludGVydmFsKTtcblxuICAgICAgaWYgKCBjb3BwaWNlX29uLmdldFRpbWUoKSA8IG5leHQuZ2V0VGltZSgpKSB7XG4gICAgICAgIHNldHVwLnllYXJUb0NvcHBpY2UgPSBzZXR1cC55ZWFyVG9Db3BwaWNlICsgc2V0dXAuY29wcGljZUludGVydmFsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbihuYW1lKSB7XG4gIGlmKCBmbltuYW1lXSApIHtcbiAgICByZXR1cm4gZm5bbmFtZV07XG4gIH0gZWxzZSBpZiggZm4uY29wcGljZVtuYW1lXSApIHtcbiAgICByZXR1cm4gZm4uY29wcGljZVtuYW1lXTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbykge1xuICByZXR1cm4ge1xuICAgIGlvIDogaW8sXG4gICAgcnVuIDogcnVuLFxuICAgIHNpbmdsZVN0ZXAgOiBzaW5nbGVTdGVwLFxuICAgIHJ1blNldHVwIDogcnVuU2V0dXAsXG4gICAgaW5pdCA6IGluaXQsXG4gICAgZ2V0RnVuY3Rpb24gOiBnZXRGdW5jdGlvbixcbiAgICBzZXRJTyA6IGZ1bmN0aW9uKGlvKSB7XG4gICAgICB0aGlzLmlvID0gaW87XG4gICAgfSxcbiAgICBnZXREYXRhTW9kZWwgOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkYXRhTW9kZWw7XG4gICAgfVxuICB9O1xufTtcbiIsImZ1bmN0aW9uIGVudigpIHtcbiAgaWYoIHR5cGVvZiBwbHY4ICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcInBsdjhcIjtcbiAgaWYoIHR5cGVvZiBMb2dnZXIgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIFwiYXBwc2NyaXB0XCI7XG4gIGlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgcmV0dXJuIFwibm9kZVwiO1xufVxuXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gIHZhciBlID0gZW52KCk7XG4gIGlmKCBlID09IFwicGx2OFwiICkgcGx2OC5lbG9nKE5PVElDRSwgJ25vdGljZScsIG1zZyk7XG4gIGVsc2UgaWYoIGUgPT0gXCJhcHBzY3JpcHRcIiApIExvZ2dlci5sb2cobXNnKTtcbiAgZWxzZSBjb25zb2xlLmxvZyhtc2cpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iaikgcmV0dXJuIG9iajtcbiAgdmFyIGNvcHkgPSBvYmouY29uc3RydWN0b3IoKTtcbiAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gb2JqW2F0dHJdO1xuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW52IDogZW52LFxuICBsb2cgOiBsb2csXG4gIGNsb25lIDogY2xvbmVcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIFZhbGlkYXRlIGEgbW9kZWwgcnVuIHNldHVwLiAgdGhyb3cgZXJyb3IgaXMgYmFkbmVzcy5cbiAqL1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgcGFyYW1FcnJvciA9ICdWYWxpZGF0aW9uIEVycm9yOiAnO1xuXG52YXIgdmFsaWRXZWF0aGVyS2V5cyA9IFtcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkJC8sIC8vIHNwZWNpZmljIHdlYXRoZXIgWVlZWS1NTSBmb3IgbW9udGhseSB0aW1lc3RlcFxuICAvXlxcZFxcZCQvLCAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkLVxcZFxcZCQvIC8vIG1vZGVsbGVkIG9yIGF2ZXJhZ2Ugd2VhdGhlciBNTS1ERCBmb3IgZGFpbHkgdGltZXN0ZXBcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFsaWRhdGVQbGFudGF0aW9uKG1vZGVsKTtcbiAgdmFsaWRhdGVNYW5hZ2UobW9kZWwpO1xuICB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpO1xuICB2YWxpZGF0ZVNvaWwobW9kZWwpO1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVNYW5hZ2UobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5tYW5hZ2UgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnbWFuYWdlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5tYW5hZ2UsIG1vZGVsLm1hbmFnZSwgJ21hbmFnZScpO1xuXG4gIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzICkge1xuICAgIGlmKCAhQXJyYXkuaXNBcnJheShtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzKSApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZS5jb3BwaWNlRGF0ZXMgc2hvdWxkIGJlIGFuIGFycmF5IG9mIGRhdGUgc3RyaW5ncy4nO1xuICAgIH1cblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZCQnKSB8fCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkJykgKSB7XG4gICAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIG1hbmFnZS5jb3BwaWNlRGF0ZXMgZm9ybWF0ICcrbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXSsnLiBzaG91bGQgYmUgWVlZWS1NTSBmb3JtYXQuJztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG5cbiAgICBpZiggbW9kZWwubWFuYWdlLmRhdGVDb3BwaWNlZCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS5kYXRlQ29wcGljZWQgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cbiAgICBpZiggbW9kZWwubWFuYWdlLnllYXJzUGVyQ29wcGljZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cblxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlV2VhdGhlcihtb2RlbCkge1xuICBpZiggIW1vZGVsLndlYXRoZXIgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnTm8gd2VhdGhlciBkZWZpbmVkJztcbiAgfVxuXG4gIGZvciggdmFyIGtleSBpbiBtb2RlbC53ZWF0aGVyICkge1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsaWRXZWF0aGVyS2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBrZXkubWF0Y2godmFsaWRXZWF0aGVyS2V5c1tpXSkgKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICFmb3VuZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIHdlYXRoZXIga2V5OiAnK2tleTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC53ZWF0aGVyLCBtb2RlbC53ZWF0aGVyW2tleV0sICd3ZWF0aGVyJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNvaWwobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5zb2lsICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3NvaWwgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuXG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnNvaWwsIG1vZGVsLnNvaWwsICdzb2lsJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCkge1xuICBpZiggIW1vZGVsLnBsYW50YXRpb24gKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbiBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnBsYW50YXRpb24sIG1vZGVsLnBsYW50YXRpb24sICdwbGFudGF0aW9uJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uc2VlZGxpbmdUcmVlLCAncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUnKTtcblxuICBpZiggIW1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24uY29wcGljZWRUcmVlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwudHJlZSwgbW9kZWwucGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUsICdwbGFudGF0aW9uLmNvcHBpY2VkVHJlZScpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbCwgbW9kZWwsIG5hbWUpIHtcbiAgdmFyIGtleSwgaXRlbTtcblxuICBmb3IoIGtleSBpbiBkYXRhTW9kZWwudmFsdWUgKSB7XG4gICAgaXRlbSA9IGRhdGFNb2RlbC52YWx1ZVtrZXldO1xuICAgIGlmKCBpdGVtLnJlcXVpcmVkID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKCBtb2RlbFtrZXldID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yK25hbWUrJy4nK2tleSsnIGlzIG1pc3NpbmcgJytcbiAgICAgICAgICAgIChpdGVtLmRlc2NyaXB0aW9uID8gJygnK2l0ZW0uZGVzY3JpcHRpb24rJyknIDogJycpO1xuICAgIH1cblxuICAgIGlmKCB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICB2YWxpZGF0ZU1vZGVsKGl0ZW0sIG1vZGVsW2tleV0sIG5hbWUrJy4nK2tleSk7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZScpO1xudmFyIGV4cG9ydFRvQ3N2ID0gcmVxdWlyZSgnLi9nb29nbGVEcml2ZS9leHBvcnRUb0NzdicpO1xudmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIHJhd091dHB1dCA9IHJlcXVpcmUoJy4vb3V0cHV0L3JhdycpO1xudmFyIHdlYXRoZXIgPSByZXF1aXJlKCcuL3dlYXRoZXInKTtcbnZhciB3ZWF0aGVyQ2hhcnQgPSByZXF1aXJlKCcuL3dlYXRoZXIvY2hhcnQnKTtcbnZhciBmbGFzaGJsb2NrRGV0ZWN0b3IgPSByZXF1aXJlKCcuL2ZsYXNoYmxvY2stZGV0ZWN0b3InKTtcbnZhciBpbnB1dEZvcm0gPSByZXF1aXJlKCcuL2lucHV0Rm9ybScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG5cbi8vIGltcG9ydCAzcGcgbW9kZWxcbnZhciBtb2RlbCA9IHJlcXVpcmUoJy4uLy4uL3BvcGxhci0zcGctbW9kZWwnKTtcblxuLy8gd2lyZSBpbiBhcHAgaGFuZGxlcnMgdG8gbW9kZWxcbnZhciBtb2RlbElPID0gcmVxdWlyZSgnLi9tb2RlbFJ1bkhhbmRsZXInKTtcbm1vZGVsLnNldElPKG1vZGVsSU8pO1xuXG52YXIgcnVuQ2FsbGJhY2ssIHdlYXRoZXJDdXN0b21DaGFydDtcblxuXG4vLyByb3cgcmF3IGRhdGEgZG9lcyBhIGxvdCBvZiBwcm9jZXNzaW5nIG9mIHRoZSByZXN1bHRzIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBvZiB3aGF0J3Ncbi8vIGJlaW5nIGRpc3BsYXllZC4gIEdvIGFoZWFkIGFuIHNldHVwIHRoZSBjc3YgZGF0YSBhdCB0aGlzIHBvaW50LCB0aGVuIGlmIHRoZSB1c2VyXG4vLyBkZWNpZGVzIHRvIGV4cG9ydCwgd2UgYXJlIGFsbCBzZXQgdG8gdG87XG52YXIgY3N2UmVzdWx0cyA9IG51bGw7XG52YXIgY3VycmVudFJlc3VsdHMgPSBudWxsO1xuXG5cbnZhciBpbml0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgLy8gdGhlc2Ugd2UgZG9uJ3Qgd2FudCB0byBzZXR1cCB1bnRpbCBkb20gaXMgcmVhZHlcbiAgaW5wdXRGb3JtID0gaW5wdXRGb3JtKHRoaXMpO1xuXG4gIGNoYXJ0cy5zZXRBcHAodGhpcyk7XG4gIGdkcml2ZS5zZXRBcHAodGhpcyk7XG5cbiAgbW9kZWxJTy5hcHAgPSB0aGlzO1xuICBtb2RlbElPLm1vZGVsID0gbW9kZWw7XG4gIG1vZGVsSU8uY2hhcnRzID0gY2hhcnRzO1xuICBtb2RlbElPLmlucHV0Rm9ybSA9IGlucHV0Rm9ybTtcblxuICAvLyBjaGVjayBpZiBmbGFzaCBpcyBpbnN0YWxsZWQuICBJZiBub3QsIGhpZGUgdGhlIGNoYXJ0IHR5cGUgdG9nZ2xlLlxuICBmbGFzaGJsb2NrRGV0ZWN0b3IoZnVuY3Rpb24odmFsKXtcbiAgICAgIGlmKCB2YWwgPiAwICkgJChcIiNjaGFydC10eXBlLWJ0bi1ncm91cFwiKS5oaWRlKCk7XG4gIH0pO1xuXG4gIHJhd091dHB1dC5pbml0KHRoaXMpO1xuXG4gIC8vIHNldHVwIGV4cG9ydCBtb2RhbFxuICBleHBvcnRUb0Nzdi5pbml0KCk7XG4gICQoXCIjZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZXhwb3J0VG9Dc3YucnVuKGNzdlJlc3VsdHMpO1xuICB9KTtcblxuICB2YXIgZWxlID0gJChcIiNpbnB1dHMtY29udGVudFwiKTtcbiAgaW5wdXRGb3JtLmNyZWF0ZShlbGUpO1xuXG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgY2hhcnRzXG4gIGNoYXJ0cy5pbml0KCk7XG5cbiAgLy8gc2V0IGRlZmF1bHQgY29uZmlnXG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoyKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMTAqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG5cbiAgLy8gc2V0dXAgbmljZSBzY3JvbGxpbmdcbiAgJCgnLmFwcC1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoaXMuaGFzaCkub2Zmc2V0KCkudG9wLTU1XG4gICAgICAgfSwgNzAwKTtcbiAgfSk7XG5cbiAgLy8gbWFrZSBzdXJlIGV2ZXJ5dGhpbmcgZml0cyB0byBzY3JlZW5cbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgY2hhcnRzLnJlc2l6ZSgpO1xuXG4gICAgICBpZiggd2VhdGhlckN1c3RvbUNoYXJ0ICkge1xuICAgICAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IHdlYXRoZXJDaGFydC5jcmVhdGUoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgY2FsbGJhY2soKTtcbn07XG5cbnZhciBnZXRNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbW9kZWw7XG59O1xuXG52YXIgZ2V0T3V0cHV0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gb3V0cHV0cztcbn07XG5cbnZhciBydW5Db21wbGV0ZSA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgaWYgKCBydW5DYWxsYmFjayApIHJ1bkNhbGxiYWNrKHJvd3MpO1xuICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIHJ1bkNhbGxiYWNrID0gbnVsbDtcbn07XG5tb2RlbElPLmR1bXAgPSBydW5Db21wbGV0ZTtcblxudmFyIGRheXNUb1J1biA9IGZ1bmN0aW9uKGRheXNfaW5faW50ZXJ2YWwpIHtcbiAgdmFyIGQxID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gIGlmIChkMSAmJiBkMSAhPT0gXCJcIikge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgZDIgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICBpZiAoZDIgJiYgZDIgIT09IFwiXCIpIHtcbiAgICAgIGQyID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgb25lRGF5ID0gMjQqNjAqNjAqMTAwMDtcbiAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKE1hdGguYWJzKChkMS5nZXRUaW1lKCkgLSBkMi5nZXRUaW1lKCkpLyhvbmVEYXkpKSk7XG4gIGRheXMgPSBkYXlzIDw9IDAgPyAxIDogZGF5cztcblxuICByZXR1cm4gZGF5cyAvIGRheXNfaW5faW50ZXJ2YWw7XG59O1xuXG5cbnZhciBydW5Nb2RlbCA9IGZ1bmN0aW9uKGlzUnQpIHtcblxuICBpZiAoJChcIiNydW5idG4sICNydW5idG4tc21cIikuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkgcmV0dXJuO1xuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJSdW5uaW5nLi4uXCIpO1xuXG4gIGlmKCAhd2VhdGhlci5jaGVjayhtb2RlbCkgKSByZXR1cm47XG5cbiAgLy8gbGV0IFVJIHByb2Nlc3MgZm9yIGEgc2VjIGJlZm9yZSB3ZSB0YW5rIGl0XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHByZWZvcm1lZCB3LyBhIHdlYndvcmtlclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuJywgMSk7XG5cbiAgICAgIC8vIHJlYWQgZXZlcnl0aGluZyBzbyB0aGUgdmFyaWF0aW9ucyBhcmUgc2V0XG4gICAgICBtb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICBtb2RlbElPLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgb25seSBzZXR0aW5nIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnNcbiAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkgcGFyYW1zLnB1c2goa2V5KTtcbiAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIGEgbGltaXQgb2YgMiB2YXJpYXRpb24gcGFyYW1ldGVycyBwZXIgcnVuLiAgQ3VycmVudGx5IHlvdSBhcmUgdmFyeWluZyBcIitcbiAgICAgICAgICAgICAgICBcInRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcXG5cXG4gLVwiK3BhcmFtcy5qb2luKFwiXFxuIC1cIikpO1xuICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICBpZiggIWlzUnQgKSBnZHJpdmUucnVuTW9kZWxSdCgpO1xuXG4gICAgICAvLyBzaG93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICAkKFwiI3ZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCIpLmh0bWwoXCI8Yj5cIisocGFyYW1zLmxlbmd0aCA9PSAwID8gXCJOb25lXCIgOiBwYXJhbXMuam9pbihcIiwgXCIpKStcIjwvYj5cIik7XG5cbiAgICAgIC8vIHdlIGFyZSBvbmx5IHJ1bm5pbmcgb25jZVxuICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID09PSAwICkge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi1zaW5nbGVQYXJhbScsIDEpO1xuXG4gICAgICAgICAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICAgICAgICAgIHNob3dSZXN1bHRzKHJvd3MpO1xuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIHZhciBkYXlzID0gZGF5c1RvUnVuKG1vZGVsLnNldHVwLmRheXNfaW5faW50ZXJ2YWwpO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vZGVsLnJ1bihkYXlzKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgYWxlcnQoZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXZhcmlhdGlvbicsIDEpO1xuXG4gICAgICAgICAgLy8gc2V0IHZhcmlhdGlvbiBvcmRlclxuICAgICAgICAgIHZhciBydW5zID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICAgICAgICAgIG91dHB1dCA6IG51bGxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgb2JqLmlucHV0c1twYXJhbXNbMF1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dW2ldO1xuICAgICAgICAgICAgICBpZiggcGFyYW1zLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzFdXS5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgICAgICAgICAgIHQuaW5wdXRzW3BhcmFtc1sxXV0gPSBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBydW5WYXJpYXRpb24oMCwgcnVucyk7XG4gICAgICB9XG4gIH0sIDI1MCk7XG59O1xuXG4vLyBydW4gYSBzaW5nbGUgdmFyaWF0aW9uLCB3aGVuIG11bHRpcGxlIGlucHV0cyBmb3IgYSBzaW5nbGUgcGFyYW1ldGVyIGhhdmVcbi8vIGJlZW4gZ2l2ZW5cbnZhciBydW5WYXJpYXRpb24gPSBmdW5jdGlvbihpbmRleCwgcnVucykge1xuXG4gIC8vIHNldCBpbnB1dCB2YXJpYWJsZXMgZm9yIHJ1blxuICB2YXIgcnVuID0gcnVuc1tpbmRleF07XG4gIGZvciggdmFyIGtleSBpbiBydW4uaW5wdXRzICkge1xuICAgICAgJChcIiNpbnB1dC1cIitrZXkucmVwbGFjZSgvXFwuL2csICctJykpLnZhbChydW4uaW5wdXRzW2tleV0pO1xuICB9XG5cbiAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBydW5zW2luZGV4XS5vdXRwdXQgPSBkYXRhO1xuICAgICAgaW5kZXgrKztcblxuXG4gICAgICBpZiAocnVucy5sZW5ndGggPT0gaW5kZXgpIHtcbiAgICAgICAgICAvLyByZXNldCB0aGUgY29uc3RhbnQgdG8gdGhlIGZpcnN0IHZhbHVlXG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwobW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNob3dSZXN1bHRzKHJ1bnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBydW5WYXJpYXRpb24oaW5kZXgsIHJ1bnMpO1xuICAgICAgfVxuICB9O1xuXG4gIC8vIEhBQ0s6IHdoZW4gc2hvdWxkIHdlIGxvb2sgdGhpcyB1cD9cbiAgdmFyIGRheXMgPSBkYXlzVG9SdW4ocGFyc2VGbG9hdCgkKCcjaW5wdXQtc2V0dXAtZGF5c19pbl9pbnRlcnZhbCcpLnZhbCgpKSk7XG5cbiAgdHJ5IHtcbiAgICBtb2RlbC5ydW4oZGF5cyk7XG4gIH0gY2F0Y2goZSkge1xuICAgIGRlYnVnZ2VyO1xuICAgIGFsZXJ0KGUpO1xuICB9XG59O1xuXG5cbnZhciBzaG93UmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICBpZiggcmVzdWx0WzBdIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICBjdXJyZW50UmVzdWx0cyA9IFt7XG4gICAgICAgICAgc2luZ2xlUnVuIDogdHJ1ZSxcbiAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICBvdXRwdXQgOiByZXN1bHRcbiAgICAgIH1dO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRSZXN1bHRzID0gcmVzdWx0O1xuICB9XG5cbiAgLy8gdHJhbnNwb3NlIGFsbCByZXN1bHRzIHRvIGhhc2ggYnkgZGF0ZVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGN1cnJlbnRSZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBkYXRlSGFzaCA9IHt9O1xuICAgIHZhciByID0gY3VycmVudFJlc3VsdHNbaV07XG5cbiAgICByLnRvdGFsU3RlcHMgPSByLm91dHB1dC5sZW5ndGg7XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCByLm91dHB1dC5sZW5ndGg7IGorKyApIHtcbiAgICAgIGRhdGVIYXNoW3Iub3V0cHV0W2pdWzBdXSA9IHIub3V0cHV0W2pdO1xuICAgIH1cbiAgICByLmhlYWRlciA9IHIub3V0cHV0WzBdO1xuICAgIHIub3V0cHV0ID0gZGF0ZUhhc2g7XG4gIH1cblxuICAvLyBzb3J0IGJ5IG1vc3QgdG8gbGVhc3Qgc3RlcHNcbiAgY3VycmVudFJlc3VsdHMuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICBpZiggYS50b3RhbFN0ZXBzID4gYi50b3RhbFN0ZXBzICkgcmV0dXJuIC0xO1xuICAgIGlmKCBhLnRvdGFsU3RlcHMgPCBiLnRvdGFsU3RlcHMgKSByZXR1cm4gMTtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgdXBkYXRlVWkoKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gIH0sIDI1MCk7XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVVaSgpIHtcbiAgaWYoICFjdXJyZW50UmVzdWx0cyApIHJldHVybjtcblxuICByYXdPdXRwdXQuc2hvdyhjdXJyZW50UmVzdWx0cyk7IC8vIHRoaXMgdXBkYXRlcyBjc3ZSZXN1bHRzXG4gIGNoYXJ0cy51cGRhdGVDaGFydHMoY3N2UmVzdWx0cywgdHJ1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgZ29vZ2xlRHJpdmUgOiBnZHJpdmUsXG4gIGdldE1vZGVsIDogZ2V0TW9kZWwsXG4gIHJ1bk1vZGVsIDogcnVuTW9kZWwsXG4gIHVwZGF0ZVVpIDogdXBkYXRlVWksXG4gIGRheXNUb1J1biA6IGRheXNUb1J1bixcbiAgLy8gdGhlIHJhdyBtb2R1bGUgYWN0dWFsbHkgY3JlYXRlcyB0aGlzIHNldHVwXG4gIHNldENzdlJlc3VsdHMgOiBmdW5jdGlvbihjc3YpIHtcbiAgICBjc3ZSZXN1bHRzID0gY3N2O1xuICB9LFxuICBnZXRDc3ZSZXN1bHRzIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNzdlJlc3VsdHM7XG4gIH0sXG4gIHFzIDogdXRpbHMucXMsXG4gIGdldE1vZGVsSU8gOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9kZWxJTztcbiAgfVxufTtcbiIsInZhciBvdXRwdXREZWZpbml0aW9ucyA9IHJlcXVpcmUoJy4vb3V0cHV0L2RlZmluaXRpb25zJyk7XG52YXIgcmF3ID0gcmVxdWlyZSgnLi9vdXRwdXQvcmF3Jyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbnZhciBhcHA7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgd2lkdGggaGFzIGNoYW5nZWRcbnZhciBjV2lkdGggPSAwO1xuXG52YXIgY2hhcnRzID0gW107XG5cbi8vIHRoZXJlIGlzIG5vIHdheSB0byBnZXQgdGhlIGNvbG9ycyBmb3IgdGhlIGxlZ2VuZHMgKHRvIG1ha2UgeW91ciBvd24pXG4vLyB0aGlzIHBvc3Q6XG4vLyBnaXZlcyB0aGVzZSB2YWx1ZXMuICBUaGlzIGlzIGEgSEFDSywgaWYgdGhleSBldmVyIGNoYW5nZSwgd2UgbmVlZCB0byB1cGRhdGVcbnZhciBnb29nbGVDaGFydENvbG9ycyA9IFtcIiMzMzY2Y2NcIixcIiNkYzM5MTJcIixcIiNmZjk5MDBcIixcIiMxMDk2MThcIixcIiM5OTAwOTlcIixcIiMwMDk5YzZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNkZDQ0NzdcIixcIiM2NmFhMDBcIixcIiNiODJlMmVcIixcIiMzMTYzOTVcIixcIiM5OTQ0OTlcIixcIiMyMmFhOTlcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNhYWFhMTFcIixcIiM2NjMzY2NcIixcIiNlNjczMDBcIixcIiM4YjA3MDdcIixcIiM2NTEwNjdcIixcIiMzMjkyNjJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM1NTc0YTZcIixcIiMzYjNlYWNcIixcIiNiNzczMjJcIixcIiMxNmQ2MjBcIixcIiNiOTEzODNcIixcIiNmNDM1OWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM5YzU5MzVcIixcIiNhOWM0MTNcIixcIiMyYTc3OGRcIixcIiM2NjhkMWNcIixcIiNiZWE0MTNcIixcIiMwYzU5MjJcIlxuICAgICAgICAgICAgICAgICAgICAgICxcIiM3NDM0MTFcIl07XG5cbi8vIHRlbXBsYXRlIGZvciB0aGUgcG9wdXBcbnZhciBzbGlkZXJQb3B1cCA9ICQoXG4gICAgICBcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwJz5cIiArXG4gICAgICAgICAgXCI8aSBjbGFzcz0naWNvbi1yZW1vdmUtY2lyY2xlIHB1bGwtcmlnaHQgc2xpZGUtcG9wdXAtY2xvc2UnPjwvaT5cIitcbiAgICAgICAgICBcIjxkaXYgaWQ9J2Nhcm91c2VsJyBjbGFzcz0nb3dsLWNhcm91c2VsIG93bC10aGVtZScgc3R5bGU9J21hcmdpbi10b3A6MTVweCc+PC9kaXY+XCIgK1xuXHRcIjwvZGl2PlwiKTtcblxudmFyIHNsaWRlclBvcHVwQmcgPSAkKFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAtYmcnPiZuYnNwOzwvZGl2PlwiKTtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiBzb21lb25lIGhhcyBjbGljayBhIGNoZWNrYm94XG52YXIgY2hhbmdlcyA9IGZhbHNlO1xuXG4vLyB3aGVuIHNpemluZywgd2FpdCBhIH4zMDBtcyBiZWZvcmUgdHJpZ2dlcmluZyByZWRyYXdcbnZhciByZXNpemVUaW1lciA9IC0xO1xuXG52YXIgY2hhcnRUeXBlU2VsZWN0b3IsIGNoYXJ0Q2hlY2tib3hlcywgY0RhdGE7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgICAgc2hvd1BvcHVwKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGNoYXJ0IHNlbGVjdG9yc1xuICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG5cbiAgLy8gc2V0IHBvcHVwIGNsaWNrIGhhbmRsZXJzXG4gICQoXCIjY2hhcnRUeXBlLXNlbGVjdEFsbFwiKS5vbignY2xpY2snLHNlbGVjdEFsbCk7XG4gICQoXCIjY2hhcnRUeXBlLXVuc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsdW5zZWxlY3RBbGwpO1xuXG4gIGNoYXJ0VHlwZVNlbGVjdG9yID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKTtcbiAgY2hhcnRDaGVja2JveGVzID0gJChcIiNjaGFydFNlbGVjdGlvbnNcIik7XG5cbiAgdmFyIGMxID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzFcIik7XG4gIHZhciBjMiA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMyXCIpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsID0gY29uZmlnLm91dHB1dHNbaV07XG4gICAgICBjaGFydFR5cGVTZWxlY3Rvci5hcHBlbmQoJChcIjxvcHRpb24gdmFsdWU9J1wiICsgdmFsICsgXCInIFwiXG4gICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ3NlbGVjdGVkJyA6ICcnKVxuICAgICAgICAgICAgICArIFwiPlwiICsgdmFsICsgXCI8L29wdGlvbj5cIikpO1xuXG4gICAgICBpZiggaSAlIDIgPT0gMCApIHtcbiAgICAgICAgICBjMS5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYzIuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9XG4gIH1cblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcIi5mbi10b2dnbGVcIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgJChcIiNcIiskKHRoaXMpLmF0dHIoXCJkYXRhdGFyZ2V0XCIpKS50b2dnbGUoJ3Nsb3cnKTtcbiAgfSk7XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikgKSBzZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICAgICAgZWxzZSB1bnNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gIH0pO1xuXG4gICQoXCIjc2VsZWN0LWNoYXJ0cy1idG4sICNzZWxlY3QtY2hhcnRzLXRpdGxlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgY2hhbmdlcyA9IGZhbHNlO1xuICB9KTtcblxuICAkKFwiLmNoYXJ0LW1vZGFsLWNsb3NlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICBpZiggY2hhbmdlcyAmJiBjRGF0YSApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhcHAudXBkYXRlVWkoKTtcbiAgICAgICAgICB9LDQwMCk7XG5cbiAgICAgIH1cbiAgfSk7XG5cbiAgJChcIi5jaGFydC10eXBlLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICkge1xuICAgICAgICAgICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gICAgICB9XG4gIH0pO1xufVxuXG4vLyBtYWtlIHN1cmUgYW5kIGVuZCBsYWJlbCB0YWdcbmZ1bmN0aW9uIF9jcmVhdGVEZXNjcmlwdGlvbih2YWwpIHtcbiAgaWYoICFvdXRwdXREZWZpbml0aW9uc1t2YWxdICkgcmV0dXJuIFwiPGI+XCIrdmFsK1wiPC9iPjwvbGFiZWw+XCI7XG5cbiAgdmFyIGRlc2MgPSBvdXRwdXREZWZpbml0aW9uc1t2YWxdO1xuICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gIHZhciB1bml0cyA9IGRlc2MudW5pdHMgJiYgZGVzYy51bml0cy5sZW5ndGggPiAwID8gXCIgW1wiK2Rlc2MudW5pdHMrXCJdXCIgOiBcIlwiO1xuXG4gIHZhciBsYWJlbCA9IFwiPGI+XCIrdmFsK1wiPC9iPjxzcGFuIHN0eWxlPSdmb250LXNpemU6MTJweCc+XCIrbGFiZWwrdW5pdHMrXCI8L3NwYW4+PC9sYWJlbD5cIjtcbiAgdmFyIGhhc0Rlc2MgPSBkZXNjLmRlc2NyaXB0aW9uICYmIGRlc2MuZGVzY3JpcHRpb24ubGVuZ3RoID4gMDtcbiAgaWYoIGhhc0Rlc2MgKSB7XG4gICAgICBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4O2NvbG9yOiM4ODg7Zm9udC1zdHlsZTppdGFsaWMnPlwiK2Rlc2MuZGVzY3JpcHRpb247XG4gIH1cblxuICB2YXIgZk5hbWUgPSBkZXNjLmFsdEZuTmFtZSB8fCB2YWw7XG4gIHZhciBmbiA9IGFwcC5nZXRNb2RlbCgpLmdldEZ1bmN0aW9uKGZOYW1lKTtcblxuICBpZiggZm4gfHwgZGVzYy5mbiApIHtcbiAgICAgIGlmKCAhaGFzRGVzYyApIGxhYmVsICs9IFwiPGRpdiBzdHlsZT0nZm9udC1zaXplOjExcHgnPlwiO1xuICAgICAgbGFiZWwgKz0gXCIgPGEgc3R5bGU9J2ZvbnQtc3R5bGU6bm9ybWFsO2N1cnNvcjpwb2ludGVyJyBkYXRhdGFyZ2V0PSdmbi1kZXNjLVwiK3ZhbCtcIicgY2xhc3M9J2ZuLXRvZ2dsZSc+Zm4oKTwvYT48L2Rpdj5cIjtcblxuICAgICAgbGFiZWwgKz0gXCI8ZGl2IGlkPSdmbi1kZXNjLVwiK3ZhbCtcIicgc3R5bGU9J2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtvdmVyZmxvdzphdXRvJyBjbGFzcz0nd2VsbCB3ZWxsLXNtJz5cIitcbiAgICAgICAgICAgICAgICAgIChmbnx8ZGVzYy5mbikudG9TdHJpbmcoKS5yZXBsYWNlKC8gL2csJyZuYnNwOycpLnJlcGxhY2UoL1xcbi9nLCc8YnIgLz4nKStcIjwvZGl2PlwiO1xuICB9IGVsc2UgaWYgKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8L2Rpdj5cIjtcbiAgfVxuXG4gIC8vIFRPRE86IGFkZCBmbiB3ZWxsXG4gIHJldHVybiBsYWJlbCtcIjxiciAvPlwiO1xufVxuXG5mdW5jdGlvbiBzZWxlY3QodmFsKSB7XG4gIGNoYXJ0VHlwZVNlbGVjdG9yLmZpbmQoXCJvcHRpb25bdmFsdWU9XCIrdmFsK1wiXVwiKS5hdHRyKFwic2VsZWN0ZWRcIixcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIix0cnVlKTtcbiAgY2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikucmVtb3ZlQXR0cihcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIixmYWxzZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY29uZmlnLm91dHB1dHMubGVuZ3RoOyBpKyspIHNlbGVjdChjb25maWcub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbmZpZy5vdXRwdXRzLmxlbmd0aDsgaSsrKSB1bnNlbGVjdChjb25maWcub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShlbGUpIHtcbiAgZWxlLnBhcmVudCgpLmhpZGUoJ3Nsb3cnLCBmdW5jdGlvbigpe1xuICAgICAgZWxlLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgdW5zZWxlY3QoZWxlLmF0dHIoJ3R5cGUnKSk7XG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHByaW50KGNoYXJ0Q29udGFpbmVyKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3ByaW50LWNoYXJ0JywgMSk7XG5cblxudmFyIGRpc3Bfc2V0dGluZz1cInRvb2xiYXI9eWVzLGxvY2F0aW9uPW5vLGRpcmVjdG9yaWVzPXllcyxtZW51YmFyPXllcyxcIjtcbiAgZGlzcF9zZXR0aW5nKz1cInNjcm9sbGJhcnM9eWVzLHdpZHRoPTgwMCwgaGVpZ2h0PTYwMCwgbGVmdD0yNSwgdG9wPTI1XCI7XG5cbiAgdmFyIHN2ZyA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJzdmdcIik7XG4gIHZhciBodG1sID0gY2hhcnRDb250YWluZXIuZmluZChcImRpdlwiKS5odG1sKCk7XG5cbiAgdmFyIGRvY3ByaW50PXdpbmRvdy5vcGVuKFwiXCIsXCJcIixkaXNwX3NldHRpbmcpO1xuICBkb2NwcmludC5kb2N1bWVudC5vcGVuKCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8aHRtbD48aGVhZD48dGl0bGU+PC90aXRsZT4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzwvaGVhZD48Ym9keSBtYXJnaW53aWR0aD1cIjBcIiBtYXJnaW5oZWlnaHQ9XCIwXCIgb25Mb2FkPVwic2VsZi5wcmludCgpXCI+PGNlbnRlcj4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoaHRtbCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2NlbnRlcj48L2JvZHk+PC9odG1sPicpO1xuICBkb2NwcmludC5kb2N1bWVudC5jbG9zZSgpO1xuICBkb2NwcmludC5mb2N1cygpO1xuXG59XG5cblxuZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gIGNEYXRhID0gZGF0YTtcbn1cblxuLy8gYmFzaWNhbGx5IHJlZHJhdyBldmVyeXRoaW5nXG5mdW5jdGlvbiByZXNpemUoKSB7XG4gIC8vIHJlcXVpcmUgbW9yZSB0aGFuIGEgMzAgcGl4ZWwgd2lkdGggY2hhbmdlIChzbyB3ZSBkb24ndCByZWRyYXcgdy8gc2Nyb2xsIGJhcnMgYWRkZWQpXG4gIHZhciB3aW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICBpZiggY1dpZHRoID4gd2luV2lkdGggLSAxNSAmJiBjV2lkdGggPCB3aW5XaWR0aCArIDE1ICkgcmV0dXJuO1xuICBjV2lkdGggPSB3aW5XaWR0aDtcblxuICBpZiggcmVzaXplVGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xuICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICByZXNpemVUaW1lciA9IC0xO1xuXG4gICAgICByZWRyYXdDaGFydHMoKTtcbiAgfSwzMDApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGFydHMocmVzdWx0cywgYW5pbWF0ZSkge1xuICBpZiggcmVzdWx0cyApIHNldERhdGEocmVzdWx0cyk7XG4gIGlmKCAhY0RhdGEgKSByZXR1cm47XG5cbiAgY2hhcnRzID0gW107XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5zaG93KCk7XG5cbiAgLy8gY3JlYXRlIGEgbGVnZW5kIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgcnVuXG4gIHZhciBsZWdlbmQgPSBcIlwiO1xuICBpZiggY0RhdGEuaW5wdXRzLmxlbmd0aCA+IDEgKSB7XG4gICAgICB2YXIgYzEgPSBcIlwiO1xuICAgICAgdmFyIGMyID0gXCJcIjtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEuaW5wdXRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBlbGUgPSBcIjxkaXYgc3R5bGU9J21pbi1oZWlnaHQ6NDBweDttYXJnaW4tYm90dG9tOjEwcHgnPjxkaXYgY2xhc3M9J2xlZ2VuZC1zcXVhcmUnIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOlwiK2dvb2dsZUNoYXJ0Q29sb3JzW2ldK1wiJz4mbmJzcDs8L2Rpdj5cIjtcbiAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiBjRGF0YS5pbnB1dHNbaV0gKSB7XG4gICAgICAgICAgICAgIGVsZSArPSBcIjxkaXYgY2xhc3M9J2xlZ2VuZC10ZXh0Jz5cIittVHlwZStcIj1cIitjRGF0YS5pbnB1dHNbaV1bbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIGkgJSAyID09IDAgKSBjMSArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICAgICAgZWxzZSBjMiArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICB9XG4gICAgICBsZWdlbmQgPSBcIjxkaXY+PGEgaWQ9J2xlZ2VuZC1wYW5lbC10b2dnbGUnIHN0eWxlPSdtYXJnaW4tbGVmdDo1cHg7Y3Vyc29yOnBvaW50ZXInPkxlZ2VuZDwvYT48L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0nYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nLWJvdHRvbTo1cHg7bWFyZ2luLWJvdHRvbToxNXB4Jz5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0ncm93JyBpZD0nbGVnZW5kLXBhbmVsJz48ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzErXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MyK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjwvZGl2PjwvZGl2PlwiO1xuICB9XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5odG1sKGxlZ2VuZCk7XG4gICQoXCIjbGVnZW5kLXBhbmVsLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNsZWdlbmQtcGFuZWxcIikudG9nZ2xlKFwic2xvd1wiKTtcbiAgfSk7XG5cblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93TWFpbkNoYXJ0KHR5cGVzW2ldLCBhbmltYXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93UG9wdXAoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3Nob3ctY2hhcnQtcG9wdXAnLCAxKTtcblxuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmh0bWwoXCJcIik7XG4gICQoJ2JvZHknKS5zY3JvbGxUb3AoMCkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpLmFwcGVuZChzbGlkZXJQb3B1cEJnKS5hcHBlbmQoc2xpZGVyUG9wdXApO1xuXG4gIC8vIHRoaXMgY291bGQgY2FzZSBiYWRuZXNzLi4uLiAgd2h5IGRvZXNuJ3QgaXQgbGl2ZSB3aGVuIHJlbW92ZWQgZnJvbSBET00/XG4gIHNsaWRlclBvcHVwLmZpbmQoJy5zbGlkZS1wb3B1cC1jbG9zZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgIGhpZGVQb3B1cCgpO1xuICB9KTtcblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93UG9wdXBDaGFydCh0eXBlc1tpXSk7XG4gIH1cblxuICAkKCcjY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgICBuYXZpZ2F0aW9uIDogdHJ1ZSwgLy8gU2hvdyBuZXh0IGFuZCBwcmV2IGJ1dHRvbnNcbiAgICAgIHNsaWRlU3BlZWQgOiAzMDAsXG4gICAgICBwYWdpbmF0aW9uU3BlZWQgOiA0MDAsXG4gICAgICBzaW5nbGVJdGVtOnRydWVcbiAgfSk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIHJlZHJhd0NoYXJ0cygpO1xuICB9LCAyMDApO1xufVxuXG5mdW5jdGlvbiBoaWRlUG9wdXAoKSB7XG4gIHNsaWRlclBvcHVwQmcucmVtb3ZlKCk7XG4gIHNsaWRlclBvcHVwLnJlbW92ZSgpO1xuICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsJ2F1dG8nKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dNYWluQ2hhcnQodHlwZSwgYW5pbWF0ZSkge1xuICB2YXIgY2hhcnRUeXBlID0gJChcIi5jaGFydC10eXBlLXRvZ2dsZS5hY3RpdmVcIikuYXR0cihcInZhbHVlXCIpO1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiAvPlwiKTtcbiAgdmFyIG91dGVyUGFuZWwgPSAkKFwiPGRpdiBzdHlsZT0nbWFyZ2luLWJvdHRvbTogMjVweCc+XCIrXG4gIFx0XCI8YSBjbGFzcz0nYnRuIGJ0bi14cyBidG4tZGVmYXVsdCcgc3R5bGU9J1wiKyhjaGFydFR5cGUgIT0gXCJ0aW1lbGluZVwiID8gXCJwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO21hcmdpbjowIDAgLTIwcHggMjBweFwiIDogXCJtYXJnaW4tYm90dG9tOjVweFwiKStcbiAgICAgIFwiJyB0eXBlPSdcIit0eXBlK1wiJz5cIiArXG4gIFx0XCI8aSBjbGFzcz0naWNvbi1yZW1vdmUnPjwvaT4gXCIrdHlwZStcIjwvYT48L2Rpdj5cIik7XG4gIG91dGVyUGFuZWwuZmluZChcImFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICByZW1vdmUoJCh0aGlzKSk7XG4gIH0pO1xuICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIG91dGVyUGFuZWwuY3NzKFwibWFyZ2luLWJvdHRvbVwiLFwiMjBweFwiKTtcbiAgJChcIiNjaGFydC1jb250ZW50XCIpLmFwcGVuZChvdXRlclBhbmVsLmFwcGVuZChwYW5lbCkpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgY2hhcnRUeXBlLCBwYW5lbCwgZmFsc2UsIG51bGwsIGFuaW1hdGUpO1xufVxuXG5mdW5jdGlvbiBfc2hvd1BvcHVwQ2hhcnQodHlwZSkge1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naXRlbSc+PC9kaXY+XCIpO1xuXG4gIHZhciBwcmludEJ0biA9ICQoXCI8YSBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGVmYXVsdCcgc3R5bGU9J21hcmdpbi1sZWZ0OjE2cHgnPjxpIGNsYXNzPSdpY29uLXByaW50Jz48L2k+IFByaW50PC9hPlwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgIHByaW50KGNoYXJ0UGFuZWwpO1xuICB9KTtcbiAgcGFuZWwuYXBwZW5kKHByaW50QnRuKTtcblxuICB2YXIgY2hhcnRQYW5lbCA9ICQoXCI8ZGl2PjwvZGl2PlwiKTtcbiAgcGFuZWwuYXBwZW5kKGNoYXJ0UGFuZWwpO1xuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmFwcGVuZChwYW5lbCk7XG4gIF9jcmVhdGVDaGFydCh0eXBlLCAnbGluZScsIGNoYXJ0UGFuZWwsIHRydWUsIFtNYXRoLnJvdW5kKCQod2luZG93KS53aWR0aCgpKi44OCksIE1hdGgucm91bmQoKCQod2luZG93KS5oZWlnaHQoKSouOTApLTEyNSldKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIHNob3dMZWdlbmQsIHNpemUsIGFuaW1hdGUpIHtcbiAgdmFyIGNvbCA9IDA7XG5cbiAgdmFyIGRhdGEgPSBjRGF0YS5kYXRhW3R5cGVdO1xuXG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICB2YXIgbmV3RGF0YSA9IFskLmV4dGVuZCh0cnVlLFtdLCBkYXRhWzBdKV07XG5cbiAgICB2YXIgbGVuID0gZGF0YS5sZW5ndGg7IGxlbjIgPSBkYXRhWzBdLmxlbmd0aDtcblxuICAgIGZvciggdmFyIGkgPSAxOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGxlbjI7IGorKyApIHtcbiAgICAgICAgaWYoIGogPT09IDAgKSB7XG4gICAgICAgICAgcm93LnB1c2gobmV3IERhdGUoZGF0YVtpXVtqXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5wdXNoKGRhdGFbaV1bal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXdEYXRhLnB1c2gocm93KTtcbiAgICB9XG4gICAgZGF0YSA9IG5ld0RhdGE7XG5cbiAgfVxuXG4gIC8vIGRvIHdlIG5lZWQgdG8gZmFrZSBzb21lIG9mIHRoZSBkYXRhIHRvIGZpdD8gIG9yIHNraXAgYmVjYXVzZSB3ZSBoYXZlIHRvbyBtdWNoP1xuICBpZiggY29uZmlnLnNwcmVhZC5pbmRleE9mKHR5cGUpID4gLTEgJiYgY0RhdGEuaW5wdXRzLmxlbmd0aCA+IDAgJiYgY0RhdGEuaW5wdXRzWzBdWydzZXR1cC5kYXlzX2luX2ludGVydmFsJ10gKSB7XG4gICAgdmFyIG1heEludGVydmFsID0gY0RhdGEuaW5wdXRzWzBdWydzZXR1cC5kYXlzX2luX2ludGVydmFsJ107XG4gICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjRGF0YS5pbnB1dHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgdCA9IGNEYXRhLmlucHV0c1tpXVsnc2V0dXAuZGF5c19pbl9pbnRlcnZhbCddO1xuICAgICAgaWYoIG1heEludGVydmFsIDwgdCApIG1heEludGVydmFsID0gdDtcbiAgICB9XG5cbiAgICB2YXIgYWRqdXN0bWVudCA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEuaW5wdXRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgYWRqdXN0bWVudC5wdXNoKG1heEludGVydmFsIC8gY0RhdGEuaW5wdXRzW2ldWydzZXR1cC5kYXlzX2luX2ludGVydmFsJ10pO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBkYXRhLmxlbmd0aCwgbGVuMiA9IGRhdGFbMF0ubGVuZ3RoLCByb3csIHVzZTtcbiAgICB2YXIgbmV3RGF0YSA9IFskLmV4dGVuZCh0cnVlLFtdLCBkYXRhWzBdKV07XG5cbiAgICBmb3IoIHZhciBpID0gMTsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgcm93ID0gW10sIHVzZSA9IHRydWU7XG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGxlbjI7IGorKyApIHtcbiAgICAgICAgaWYoIGRhdGFbaV1bal0gPT09IG51bGwgKSB7XG4gICAgICAgICAgdXNlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggaiA9PT0gMCApIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaChkYXRhW2ldW2pdICogYWRqdXN0bWVudFtqLTFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiggdXNlICkge1xuICAgICAgICBuZXdEYXRhLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhID0gbmV3RGF0YTtcbiAgfVxuXG4gIC8vIGxldHMgdHJ5IGFuZCBvcHRpbWl6ZVxuICBpZiggZGF0YS5sZW5ndGggPiA1MDAgKSB7XG4gICAgdmFyIGhhc051bGxzID0gZmFsc2VcbiAgICBpZiggY0RhdGEuaW5wdXRzLmxlbmd0aCA+IDAgJiYgY0RhdGEuaW5wdXRzWzBdWydzZXR1cC5kYXlzX2luX2ludGVydmFsJ10gKSB7XG4gICAgICBoYXNOdWxscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGMgPSAwO1xuICAgIGZvciggdmFyIGkgPSBkYXRhLmxlbmd0aC0xOyBpID4gMCA7IGktLSApIHtcbiAgICAgIGlmKCBoYXNOdWxscyApIHtcbiAgICAgICAgdmFyIGlzTnVsbCA9IGZhbHNlO1xuICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGRhdGFbaV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgaWYoIGRhdGFbaV1bal0gPT09IG51bGwgKSB7XG4gICAgICAgICAgICBpc051bGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCBpc051bGwgKSB7XG4gICAgICAgICAgaWYoIGMgJSA0ICE9IDAgKSBkYXRhLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBjKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCBjICUgNCAhPSAwICkgZGF0YS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGMrKztcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIHZhciBkdCA9IGdvb2dsZS52aXN1YWxpemF0aW9uLmFycmF5VG9EYXRhVGFibGUoZGF0YSk7XG5cblxuICBpZiggb3V0cHV0RGVmaW5pdGlvbnNbdHlwZV0gKSB7XG4gICAgICB2YXIgZGVzYyA9IG91dHB1dERlZmluaXRpb25zW3R5cGVdO1xuICAgICAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICAgICAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG4gICAgICB0eXBlID0gdHlwZStsYWJlbCt1bml0cztcbiAgfVxuXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB2QXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IHR5cGVcbiAgICAgIH0sXG4gICAgICBoQXhpcyA6IHtcbiAgICAgICAgICB0aXRsZSA6IFwiXCJcbiAgICAgIH0sXG4gICAgICBpbnRlcnBvbGF0ZU51bGxzIDogdHJ1ZVxuICB9O1xuICBpZiggIXNob3dMZWdlbmQgKSBvcHRpb25zLmxlZ2VuZCA9IHtwb3NpdGlvbjpcIm5vbmVcIn07XG5cbiAgaWYoIHNpemUgKSB7XG4gICAgICAvL29wdGlvbnMud2lkdGggPSBzaXplWzBdO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBzaXplWzFdO1xuICB9IGVsc2Uge1xuICAgICAgLy9vcHRpb25zLndpZHRoID0gcGFuZWwud2lkdGgoKTtcbiAgICAgIC8vb3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLndpZHRoKi40O1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBwYW5lbC53aWR0aCgpKi40O1xuICB9XG4gIC8vcGFuZWwud2lkdGgob3B0aW9ucy53aWR0aCkuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcbiAgcGFuZWwuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcblxuICB2YXIgY2hhcnQ7XG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIG9wdGlvbnMuZGlzcGxheUFubm90YXRpb25zID0gdHJ1ZTtcbiAgICAgIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkFubm90YXRlZFRpbWVMaW5lKHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgICAgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICAgICAgLy9jaGFydCA9IG5ldyBnb29nbGUuY2hhcnRzLkxpbmUocGFuZWxbMF0pO1xuICAgICAgLy9jaGFydC5kcmF3KGR0LCBnb29nbGUuY2hhcnRzLkxpbmUuY29udmVydE9wdGlvbnMob3B0aW9ucykpO1xuICB9XG5cbiAgY2hhcnRzLnB1c2goe1xuICAgIGR0IDogZHQsXG4gICAgY2hhcnQgOiBjaGFydCxcbiAgICBvcHRpb25zIDogb3B0aW9uc1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVkcmF3Q2hhcnRzKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKyApIHtcbiAgICBjaGFydHNbaV0uY2hhcnQuZHJhdyhjaGFydHNbaV0uZHQsIGNoYXJ0c1tpXS5vcHRpb25zKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0QXBwIDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH0sXG4gICAgaW5pdCA6IGluaXQsXG4gICAgc2V0RGF0YSA6IHNldERhdGEsXG4gICAgc2VsZWN0IDogc2VsZWN0LFxuICAgIHVuc2VsZWN0IDogdW5zZWxlY3QsXG4gICAgc2VsZWN0QWxsIDogc2VsZWN0QWxsLFxuICAgIHVuc2VsZWN0QWxsIDogdW5zZWxlY3RBbGwsXG4gICAgdXBkYXRlQ2hhcnRzIDogdXBkYXRlQ2hhcnRzLFxuICAgIHJlbW92ZSA6IHJlbW92ZSxcbiAgICBzaG93UG9wdXA6IHNob3dQb3B1cCxcbiAgICBoaWRlUG9wdXA6IGhpZGVQb3B1cCxcbiAgICByZXNpemUgOiByZXNpemVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5wdXRzIDoge1xuICAgIHdlYXRoZXIgOiBbJ21vbnRoJywndG1pbicsJ3RtYXgnLCd0ZG1lYW4nLCdwcHQnLCdyYWQnLCdkYXlsaWdodCddXG4gIH0sXG4gIG91dHB1dHMgOiBbJ1ZQRCcsJ2ZWUEQnLCdmVCcsJ2ZGcm9zdCcsJ1BBUicsJ0ludGNwdG4nLCdBU1cnLCdDdW1JcnJpZycsXG4gICAgICAgICAgICAgJ0lycmlnJywnU3RhbmRBZ2UnLCdMQUknLCdDYW5Db25kJywnVHJhbnNwJywnRVRyJywnS2MnLCdmU1cnLCdmQWdlJyxcbiAgICAgICAgICAgICAnUGh5c01vZCcsJ3BSJywncFMnLCdsaXR0ZXJmYWxsJywneFBQJywnTlBQJywnV0YnLCdXUicsJ1dTJywnVyddLFxuICBkZWJ1ZyA6IGZhbHNlLFxuICBkZXZtb2RlIDogZmFsc2UsXG4gIC8vIHRoZXNlIHZhcmlhYmxlcywgd2hlbiBydW4gd2l0aCBtdWx0aXBsZSBkaWZmZXJlbnQgdGltZSBzdGVwcywgd2lsbCBkcmF3XG4gIC8vIGFnZ3JlZ2F0ZSB2YWx1ZXMgdG8gZ3JlYXRlc3Qgc3RlcC5cbiAgLy8gRXg6IDEgYW5kIDMwIGRheXMgZ2l2ZW4uICBXaWxsIGNoYXJ0IGV2ZXJ5IDMwIGRheXMgd2l0aCB2YWx1ZSBvZiBldmVyeSAzMHRoXG4gIC8vIGRheSBtdWx0aXBsaWVkIGJ5IDMwIGZvciB0aGUgZGFpbHkgc3RlcCBydW4uXG4gIHNwcmVhZCA6IFsneFBQJywgJ05QUCcsICdQQVInLCdJcnJpZycsICdUcmFuc3AnLCdFVHInLCdsaXR0ZXJmYWxsJ10sXG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJzdGFjay9mbGFzaGJsb2NrLWRldGVjdG9yXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2FsbGJhY2tNZXRob2Qpe1xuICAgIHZhciByZXR1cm5fdmFsdWUgPSAwO1xuXG4gICAgaWYobmF2aWdhdG9yLnBsdWdpbnNbXCJTaG9ja3dhdmUgRmxhc2hcIl0pIHtcbiAgICAgICAgICBlbWJlZF9sZW5ndGggPSAkKCdlbWJlZCcpLmxlbmd0aDtcbiAgICAgICAgICBvYmplY3RfbGVuZ3RoID0gJCgnb2JqZWN0JykubGVuZ3RoO1xuXG4gICAgICAgICAgaWYoKGVtYmVkX2xlbmd0aCA+IDApIHx8IChvYmplY3RfbGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gQ2hyb21lIHVzaW5nIEZsYXNoQmxvY2sgKyBNYWMgLyBTYWZhcmkgdXNpbmcgQWRCbG9jayAqL1xuICAgICAgICAgICAgICAkKCdvYmplY3QsIGVtYmVkJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gRmlyZWZveCB1c2luZyBGbGFzaEJsb2NrICovXG4gICAgICAgICAgICAgIGlmKCAkKCdkaXZbYmdpbmFjdGl2ZV0nKS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgfSBlbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpID4gLTEpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBJZiBmbGFzaCBpcyBub3QgaW5zdGFsbGVkICovXG4gICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMTtcbiAgICB9XG5cbiAgICBpZihjYWxsYmFja01ldGhvZCAmJiB0eXBlb2YoY2FsbGJhY2tNZXRob2QpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjYWxsYmFja01ldGhvZChyZXR1cm5fdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbiAgICB9XG59O1xuIiwiLypcbiAqIFNhdmUgdG8gZ29vZ2xlIGRyaXZlIChleHBvcnQgYXMgQ1NWKVxuICovXG5cbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBfc2V0TWVzc2FnZShudWxsKTtcblxuICAgICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKFwiM1BHIE1vZGVsIFJlc3VsdHMgKFwiK25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULywnICcpLnJlcGxhY2UoL1xcLlxcZCpaLywnJykrXCIpXCIpO1xuICAgICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TWVzc2FnZShtc2csIHR5cGUsIHByb2dyZXNzKSB7XG4gIGlmKCAhbXNnICkge1xuICAgIHJldHVybiAkKFwiI2V4cG9ydC1tc2dcIikuaGlkZSgpO1xuICB9XG4gICQoXCIjZXhwb3J0LW1zZ1wiKS5zaG93KCk7XG5cbiAgaWYoIHByb2dyZXNzICkge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLmhpZGUoKTtcbiAgfVxuXG4gICQoJyNleHBvcnQtbXNnJykuYXR0cihcImNsYXNzXCIsJ2FsZXJ0IGFsZXJ0LScrdHlwZSk7XG4gICQoJyNleHBvcnQtbXNnLXRleHQnKS5odG1sKG1zZyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVQcm9ncmVzcyhpbmRleCwgdG90YWwpIHtcbiAgcGVyY2VudCA9IDEwMCAqICggaW5kZXggLyB0b3RhbCApO1xuICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3MtYmFyXCIpLmF0dHIoXCJhcmlhLXZhbHVlbm93XCIsIHBlcmNlbnQpLmNzcyhcIndpZHRoXCIscGVyY2VudCtcIiVcIik7XG59XG5cbi8vIHNlZSBpZiBhbiBlcnJvciBleGlzdHMsIGlmIHNvLCBzZXQgc3RhdGVcbmZ1bmN0aW9uIF9jaGVja0Vycm9yKGZpbGUpIHtcbiAgdmFyIGVycm9yTWVzc2FnZSA9IG51bGw7XG4gIGlmKCAhZmlsZSApIGVycm9yTWVzc2FnZSA9IFwiRXJyb3IgY3JlYXRpbmcgZmlsZSBvbiBHb29nbGUgRHJpdmUgOihcIjtcbiAgaWYoIGZpbGUuZXJyb3IgKSBlcnJvck1lc3NhZ2UgPSBmaWxlLm1lc3NhZ2U7XG5cbiAgaWYoIGVycm9yTWVzc2FnZSApIHtcbiAgICBfc2V0TWVzc2FnZShlcnJvck1lc3NhZ2UsIFwiZGFuZ2VyXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4gIC8vIGV4cG9ydCBhcyBjc3ZcbmZ1bmN0aW9uIHJ1bihyZXN1bHRzKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2V4cG9ydC1kcml2ZS1jc3YnLCAxKTtcblxuICAkKFwiI2V4cG9ydC1jc3ZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0aW5nLi4uXCIpO1xuXG4gIHZhciBuYW1lID0gJChcIiNleHBvcnQtbmFtZVwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09PSAwICkge1xuICAgIF9zZXRNZXNzYWdlKFwiUGxlYXNlIHByb3ZpZGUgYSBmb2xkZXIgbmFtZVwiLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzdWx0cy5kYXRhO1xuXG4gIC8vIGNyZWF0ZSBhIGxpc3Qgc28gd2UgY2FuIHJlY3Vyc2l2ZWx5IGl0ZXJhdGVcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSBrZXlzLnB1c2goa2V5KTtcblxuICAvLyBjcmVhdGUgZm9sZGVyXG4gIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgZXhwb3J0IGZvbGRlci4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gIF91cGRhdGVQcm9ncmVzcygxLCBrZXlzLmxlbmd0aCsyKTtcbiAgZ2RyaXZlLnNhdmVGaWxlKG5hbWUsXCJBSEIgM1BHIE1vZGVsIFJlc3VsdHNcIixcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIixcIlwiLGZ1bmN0aW9uKGZpbGUpe1xuICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICB2YXIgcGFyZW50ID0gZmlsZS5pZDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMiwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAvLyBjcmVhdGUgYSBuaWNlIGZpbGUgZGVzY3JpYmluZyB0aGUgY3VycmVudCBleHBvcnRcbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGNvbmZpZyBmaWxlLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBkZWxldGUgcmVzdWx0cy5jb25maWcucGxhbnRhdGlvbl9zdGF0ZTtcbiAgICB2YXIgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5jb25maWcsbnVsbCxcIiAgXCIpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShcImNvbmZpZy50eHRcIixcIkFIQiAzUEcgTW9kZWwgLSBSdW4gQ29uZmlndXJhdGlvblwiLFwidGV4dC9wbGFpblwiLGNvbmZpZyxmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICAgIF91cGRhdGVQcm9ncmVzcygzLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgX2NyZWF0ZUV4cG9ydCgwLCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se3BhcmVudDogcGFyZW50fSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCkge1xuXG4gIC8vIHdlIGFyZSBhbGwgZG9uZSA6KVxuICBpZiggaW5kZXggPT0ga2V5cy5sZW5ndGggKSB7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDEsIDEpO1xuICAgIF9zZXRNZXNzYWdlKFwiRXhwb3J0IFN1Y2Nlc3NmdWwuPGJyIC8+PGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tLyNmb2xkZXJzL1wiICsgcGFyZW50ICtcbiAgICAgICAgICBcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWV4dGVybmFsLWxpbmstc2lnbic+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gIH0gZWxzZSB7XG5cbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgdmFyIGNzdiA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggYW5kIGRhdGVcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YVtrZXldLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGRhdGFba2V5XVtpXS5sZW5ndGggPT09IDAgKSBjb250aW51ZTsgLy8gaWdub3JlIHRoZSBibGFuayByb3dzXG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZGF0YVtrZXldW2ldLmxlbmd0aDsgaisrICkgY3N2ICs9IGRhdGFba2V5XVtpXVtqXStcIixcIjtcbiAgICAgIGNzdiA9IGNzdi5yZXBsYWNlKC8sJC8sJycpK1wiXFxuXCI7XG4gICAgfVxuXG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBcIitrZXlzW2luZGV4XStcIi5jc3YuLi4gXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoa2V5c1tpbmRleF0rXCIuY3N2XCIsXCJcIixcInRleHQvY3N2XCIsY3N2LGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuXG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgrNCwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIGluZGV4Kys7XG4gICAgICBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se2NvbnZlcnQ6IHRydWUsIHBhcmVudDogcGFyZW50fSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1biA6IHJ1bixcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgT2F1dGggPSByZXF1aXJlKCcuLi9vYXV0aCcpO1xudmFyIGdkcml2ZVJUID0gcmVxdWlyZSgnLi9yZWFsdGltZScpO1xudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuLi9tb2RlbFJ1bkhhbmRsZXInKTtcbnZhciBhcHA7XG5cblxudmFyIE1JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcucnVuXCI7XG52YXIgVFJFRV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnRyZWVcIjtcbnZhciBEUklWRV9BUElfVkVSU0lPTiA9IFwidjJcIjtcblxuLy8gZ29vZ2xlIG9hdXRoIGFjY2VzcyB0b2tlblxudmFyIHRva2VuID0gXCJcIjtcblxuLy8gY3VycmVudGx5IGxvYWRlZCBnZHJpdmUgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIGZpbGVzIChtZXRhZGF0YSlcbnZhciBmaWxlTGlzdCA9IFtdO1xuLy8gZ29vZ2xlIGRyaXZlIHNoYXJlIGNsaWVudFxudmFyIGNsaWVudCA9IG51bGw7XG5cbi8vIGxvYWRlZCB0cmVlIGFuZCBtYW5hZ2VtZW50XG52YXIgbG9hZGVkVHJlZSA9IG51bGw7XG4vLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgdHJlZSBmaWxlcyAobWV0YWRhdGEpXG52YXIgdHJlZUxpc3QgPSBbXTtcblxuLy8gY3VycmVudCBNSU1FIFRZUEUgd2UgYXJlIHNhdmluZ1xudmFyIHNhdmVNaW1lVHlwZSA9IFwiXCI7XG5cbmZ1bmN0aW9uIHNldEFwcChhKSB7XG4gIGFwcCA9IGE7XG4gIGdkcml2ZVJULnNldEFwcChhcHApO1xufVxuXG4vKioqXG4gKiAgSW5pdGlhbGl6ZSBnb29nbGUgZHJpdmUgcGFuZWxzLCBidG5zIGFuZCBsb2dpblxuICoqKi9cbmZ1bmN0aW9uIGluaXQoY2FsbGJhY2spIHtcbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyBzZXQgdGhlICd1cGRhdGUnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS11cGRhdGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF91cGRhdGVDdXJyZW50RmlsZSgpO1xuICB9KTtcblxuICAvLyBzZXQgdGhlICduZXcnIGJ0biBjbGljayBoYW5kbGVyXG4gICQoXCIjc2F2ZS1uZXctYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIF9zYXZlTmV3RmlsZSgpO1xuICB9KTtcblxuICAvLyBjcmVhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gIF9jcmVhdGVMb2dpbkJ0bigpO1xuXG4gIC8vIGxvYWQgdGhlIGdvb2dsZSBhdXRoIGFuZCBkcml2ZSBhcGknc1xuICBfbG9hZEFwaShmdW5jdGlvbigpIHtcbiAgICAvLyBpZiB0aGUgdXNlciBpcyBhdXRob3JpemVkIGdyYWIgdGhlIHJlZnJlc2ggdG9rZW5cbiAgICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24ocmVmcmVzaFRva2VuKXtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHJlZnJlc2ggdG9rZW4sIGxlYXZlLCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgIGlmKCAhcmVmcmVzaFRva2VuICkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgYSByZWZlc2ggdG9rZW4sIHRoZW4gdXNlciBpcyBhbGwgc2V0LFxuICAgICAgLy8gZ2V0IGEgbmV3IGFjY2VzcyB0b2tlbiBzbyB3ZSBjYW4gc3RhcnQgdXNpbmcgdGhlIGFwaSdzXG4gICAgICAvLyBncmFiIHRoZWlyIGluZm9ybWF0aW9uIGFuZCBkaXNwbGF5XG4gICAgICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KXtcbiAgICAgICAgdG9rZW4gPSB0O1xuICAgICAgICBpZiggdG9rZW4gKSBfc2V0VXNlckluZm8oKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBfY2hlY2tUb2tlbigpO1xuICAgIH0sIDEwMDAgKiA1ICogNjApO1xuICB9KTtcblxuICAvLyBzZXR1cCB0aGUgdHJlZSAnc2hhcmUnIGJ0blxuICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgLy8gc2VlIGlmIHdlIGhhdmUgYSBzaGFyZSBjbGllbnRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBubyBjbGllbnQsIGxvYWQgYXBpXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gb24gbG9hZCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCB0aGUgY3VycmVudCB0cmVlXG4gICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRUcmVlXSk7XG4gICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGhhdmUgYSBjbGllbnQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggY3VycmVudCB0cmVlXG4gICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICB9XG4gIH0pO1xuXG59XG5cbi8qKipcbiAqIFNhdmUgdGhlIGN1cnJlbnQgbW9kZWwgYXMgYSBuZXcgZ29vZ2xlIGRyaXZlIGZpbGVcbiAqKiovXG5mdW5jdGlvbiBfc2F2ZU5ld0ZpbGUoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3NhdmUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGdyYWIgdGhlIG5hbWUgb2YgdGhlIG5ldyBmaWxlXG4gIHZhciBuYW1lID0gJChcIiNzYXZlLW5hbWUtaW5wdXRcIikudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgeyAvLyB3ZSBhbHdheXMgd2FudCBhIG5hbWUsIGFsZXJ0IGFuZCBxdWl0XG4gICAgX3NldFNhdmVNZXNzYWdlKCdQbGVhc2UgcHJvdmlkZSBhIGZpbGVuYW1lLicsJ2luZm8nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZWUgd2hhdCBraW5kIG9mIGZpbGUgd2UgYXJlIGNyZWF0aW5nIGJhc2VkIG9uIHRoZSBzYXZlTWltZVR5cGUgdmFyXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gbW9kZWxJTy5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBTYXZpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAvLyBzYXZlIHRoZSBmaWxlXG4gIHNhdmVGaWxlKG5hbWUsXG4gICAgICAkKFwiI3NhdmUtZGVzY3JpcHRpb24taW5wdXRcIikudmFsKCksXG4gICAgICBzYXZlTWltZVR5cGUsXG4gICAgICBkYXRhLFxuICAgICAgZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHNhdmUgdG8gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgIGVsc2UgX3NldFNhdmVNZXNzYWdlKCdTdWNlc3NmdWxseSBzYXZlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgLy8gd2FpdCBhIHRpY2sgdG8gaGlkZSB0aGUgcG9wdXAsIHNvIHVzZXIgc2VlcyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IGZpbGUsIHVwZGF0ZSBvdXIgbGlzdFxuICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuXG4gICAgICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIityZXNwLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIGlkXG4gICAgICAgICAgbG9hZGVkRmlsZSA9IHJlc3AuaWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHRyZWUsIHVwZGF0ZSB0aGUgbGlzdFxuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuXG4gICAgICAgICAgLy8gc2hvdyB0aGUgdHJlZSBzaGFyZSBidG5zXG4gICAgICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZXNcbiAgICAgICAgICBsb2FkZWRUcmVlID0gcmVzcC5pZDtcbiAgICAgICAgfVxuICAgICAgfVxuICApO1xufVxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGN1cnJlbnRseSBsb2FkZWQgZ29vZ2xlIGRyaXZlIGZpbGVcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlQ3VycmVudEZpbGUoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VwZGF0ZS1kcml2ZS1maWxlJywgMSk7XG5cbiAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgX3NldFNhdmVNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IFVwZGF0aW5nLi4uJywnaW5mbycpO1xuXG4gIHZhciBmaWxlID0ge307XG4gIHZhciBkYXRhID0ge307XG5cbiAgLy8gZ3JhYiB0aGUgY29ycmVudCBkYXRhIGFuZCBmaWxlaWQgYmFzZWQgb24gbWltZVR5cGVcbiAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgZmlsZSA9IGxvYWRlZEZpbGU7XG4gICAgZGF0YSA9IG1vZGVsSU8uZXhwb3J0U2V0dXAoKTtcbiAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRUcmVlO1xuICAgIGRhdGEgPSBtb2RlbElPLmV4cG9ydFNldHVwKCkudHJlZTtcbiAgfSBlbHNlIHsgLy8gYmFkbmVzc1xuICAgIGFsZXJ0KFwiVW5rbm93biBNSU1FX1RZUEU6IFwiK3NhdmVNaW1lVHlwZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSBnb29nbGUgZHJpdmUgZmlsZVxuICB1cGRhdGVGaWxlKGZpbGUsXG4gICAgICBkYXRhLFxuICAgICAgZnVuY3Rpb24ocmVzcCl7XG4gICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgaGFwcGVuZWRcbiAgICAgICAgaWYoIHJlc3AuZXJyb3IgKSByZXR1cm4gX3NldFNhdmVNZXNzYWdlKCdGYWlsZWQgdG8gdXBkYXRlIG9uIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnVXBkYXRlIFN1Y2Nlc3NmdWwuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHNvIHRoZSB1c2VyIGtub3dzIHVwZGF0ZSB3YXMgc3VjY2Vzc1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIH0sMTUwMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBsaXN0IGZvciB3aGF0ZXZlciB0eXBlIHdhcyB1cGRhdGVkXG4gICAgICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgX3VwZGF0ZVRyZWVMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwLlxuICogIHR5cGUgLSBib29zdHJhcCBhbGVydCB0eXBlXG4gKioqL1xuZnVuY3Rpb24gX3NldExvYWRNZXNzYWdlKG1zZywgdHlwZSkge1xuICBpZiggIW1zZyApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLW1zZ1wiKS5odG1sKFwiXCIpO1xuICAkKCcjZ2RyaXZlLWZpbGUtbXNnJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LScrdHlwZSsnXCI+Jyttc2crJzwvZGl2PicpO1xufVxuXG4vKioqXG4gKiBzZXQgYSBtZXNzYWdlIGZvciB0aGUgJ3NhdmUgdG8gZHJpdmUnIHBvcHVwXG4gKiB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRTYXZlTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtc2F2ZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1zYXZlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudS4gVGhpcyBtZW51IGlzIGZvciB3aGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW5cbiAqKiovXG5mdW5jdGlvbiBfY3JlYXRlTG9naW5CdG4oKSB7XG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPkxvZ2luPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dpbi13aXRoLWdvb2dsZVwiPjxpIGNsYXNzPVwiaWNvbi1zaWduaW5cIj48L2k+IExvZ2luIHdpdGggR29vZ2xlPC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gbG9naW4gY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2xvZ2luLXdpdGgtZ29vZ2xlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ2luJywgMSk7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICBfc2V0VXNlckluZm8oKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbi8qKipcbiAqIENyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUgZm9yIHdoZW4gdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ291dEJ0bih1c2VyZGF0YSkge1xuICAvLyBzZXQgYnRuIGh0bWxcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+PGltZyBjbGFzcz1cImltZy1yb3VuZGVkXCIgc3JjPVwiJyt1c2VyZGF0YS5waWN0dXJlXG4gICAgICArICdcIiBzdHlsZT1cIm1hcmdpbjotNXB4IDVweCAtNXB4IDA7d2lkdGg6MjhweDtoZWlnaHQ6MjhweDtib3JkZXI6MXB4IHNvbGlkIHdoaXRlXCIgLz4gJyArIHVzZXJkYXRhLm5hbWVcbiAgICAgICsgJzxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPicgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICsgJzxsaT48YSBpZD1cInNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS1idG5cIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJvcGVuLWluLWRyaXZlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJpY29uLWV4dGVybmFsLWxpbmstc2lnblwiPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImxvZ291dFwiPjxpIGNsYXNzPVwiaWNvbi1zaWdub3V0XCI+PC9pPiBMb2dvdXQ8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgdG8gc2hvdyBtZW51XG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gIGJ0bi5maW5kKCcjc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudCBzYXZlIG1pbWVUeXBlXG4gICAgc2F2ZU1pbWVUeXBlID0gTUlNRV9UWVBFO1xuXG4gICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB0eXAgdGhleSBhcmUgc2F2aW5nXG4gICAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIE1vZGVsPC9oNT5cIik7XG5cbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGlmIHRoZSBmaWxlIGlzIGxvYWRlZCwgc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gICAgaWYoIGxvYWRlZEZpbGUgIT0gbnVsbCkge1xuICAgICAgLy8gZ3JhYiB0aGUgY3VycmVudCBmaWxlcyBtZXRhZGF0YVxuICAgICAgdmFyIGZpbGUgPSB7fTtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCBmaWxlTGlzdFtpXS5pZCA9PSBsb2FkZWRGaWxlKSB7XG4gICAgICAgICAgZmlsZSA9IGZpbGVMaXN0W2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5zaG93KCk7XG5cbiAgICAgIC8vIHJlbmRlciB0aGUgZmlsZXMgbWV0YWRhdGEgaW4gdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgdmFyIGQgPSBuZXcgRGF0ZShmaWxlLm1vZGlmaWVkRGF0ZSk7XG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsLWlubmVyXCIpLmh0bWwoXCI8Yj5cIitmaWxlLnRpdGxlK1wiPC9iPjxiciAvPlwiICtcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIitmaWxlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICAgIGQudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitmaWxlLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrZmlsZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IFwiICtcbiAgICAgICAgICBcIkxpbmsgdG8gU2hhcmU8L2E+IDxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz4obXVzdCBoYXZlIHBlcm1pc3Npb24pPC9zcGFuPjxiciAvPjxiciAvPlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgICBfc2V0U2F2ZU1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIC8vIGNsaWNrIGhhbmRsZXIgZm9yIHNoYXJlIGJ0blxuICBidG4uZmluZChcIiNzaGFyZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdvcGVuLWRyaXZlLXNoYXJlJywgMSk7XG5cbiAgICAvLyBoYXMgdGhlIHNoYXJlIGNsaWVudCBiZWVuIGxvYWRlZFxuICAgIGlmKCBjbGllbnQgPT0gbnVsbCApIHtcbiAgICAgIC8vIGxvYWQgdGhlIHNoYXJlIHBvcHVwXG4gICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgICAgY2xpZW50ID0gbmV3IGdhcGkuZHJpdmUuc2hhcmUuU2hhcmVDbGllbnQoT2F1dGguQVBQX0lEKTtcbiAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzaG93IGFib3V0IHBhbmVsXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIHNob3cgdGhlICdsb2FkIGZyb20gZHJpdmUnIHBhbmVsXG4gIGJ0bi5maW5kKCcjbG9hZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgLy8gaGlkZSBhbnkgZXhpc3RpbmcgbWVzc2FnZVxuICAgIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcblxuICAgIC8vIHJlbmRlciB0aGUgbW9kZWwgZmlsZXMgaW4gdGhlIHBvcHVwIGZpbGVzXG4gICAgX3Nob3dEcml2ZUZpbGVzKCk7XG5cbiAgICAvLyBzaG93IHRoZSBtb2RhbFxuICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBsb2FkIHRoZSB1c2VyIG91dFxuICBidG4uZmluZCgnI2xvZ291dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VzZXItbG9nb3V0JywgMSk7XG5cbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGtpbGwgdGhlIGFjY2VzcyB0b2tlblxuICAgIHRva2VuID0gbnVsbDtcblxuICAgIC8vIHVwZGF0ZSB0aGUgbWVudSBwYW5lbFxuICAgIF9jcmVhdGVMb2dpbkJ0bigpO1xuICB9KTtcblxuICAvLyBhdHRhY2ggdGhlIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbi8qKipcbiAqICBSZXF1ZXN0IHRoZSB1c2VyJ3MgaW5mb3JtYXRpb24uICBXaGVuIGxvYWRlZCwgdXBkYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRVc2VySW5mbygpIHtcbiAgLy8gbG9hZCB1c2VyIG5hbWVcbiAgJC5hamF4KHtcbiAgICB1cmwgOiBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS91c2VyaW5mb1wiLFxuICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAvLyBhbHdheXMgc2V0IHlvdXIgYWNjZXNzIHN0b2tlblxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMseGhyKSB7XG4gICAgICAvLyBwYXJzZSB5b3VyIGpzb24gcmVzcG9uc2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgLy8gdXBkYXRlIHRvcCByaWdodCBtZW51XG4gICAgICBfY3JlYXRlTG9nb3V0QnRuKGRhdGEpO1xuXG4gICAgICAvLyBzZXQgdG8gd2luZG93IHNjb3BlXG4gICAgICB3aW5kb3cudXNlcmluZm8gPSBkYXRhO1xuICAgIH0sXG4gICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIFRPRE86IHNob3VsZCB3ZSBhbGVydCB0aGlzP1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gbG9hZCB1c2VyIGZpbGVzLCB0cmVlc1xuICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgX3VwZGF0ZVRyZWVMaXN0KCk7XG59XG5cbi8qKipcbiAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyBtb2RlbHNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlRmlsZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK01JTUVfVFlQRStcIidcIiwgZnVuY3Rpb24ocmVzcCl7XG4gICAgZmlsZUxpc3QgPSByZXNwLnJlc3VsdC5pdGVtcztcbiAgfSk7XG59XG5cbi8qKipcbiAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyB0cmVlc1xuICpcbiAqIFRPRE86IGFkZCBzZWFyY2ggdG8gdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMsXG4gKiAgbGltaXQgdG8gMTAgcmVzdWx0c1xuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVUcmVlTGlzdCgpIHtcbiAgbGlzdEZpbGVzKFwibWltZVR5cGUgPSAnXCIrVFJFRV9NSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIHRyZWVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgUmVuZGVyIHRoZSB1c2VycyBjdXJyZW50IG1vZGVscyBvbnRvIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIF9zaG93RHJpdmVGaWxlcygpIHtcbiAgLy8gaWYgdGhleSBoYXZlIG5vIGZpbGVzLCBzYXkgc28gYW5kIGdldCBvdXQgb2YgaGVyZVxuICBpZiggIWZpbGVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGxpPk5vIEZpbGVzPC9saT5cIik7XG4gIGlmKCBmaWxlTGlzdC5sZW5ndGggPT0gMCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuXG4gIC8vIHNob3cgYSB0aXRsZSwgdGhlcmUgYXJlIG11bHRpcGxlIHR5cGVzIHRoYXQgY2FuIGJlIGxvYWRlZCBmcm9tIGRyaXZlXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGg0PlNlbGVjdCBGaWxlPC9oND5cIik7XG5cbiAgLy8gY3JlYXRlIHRoZSBsaXN0IGVsZW1lbnRzIGZvciBlYWNoIGZpbGVzIG1ldGFkYXRhXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSBmaWxlTGlzdFtpXTtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKFxuICAgICAgJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48YSBpZD0nXCIraXRlbS5pZCtcIicgdXJsPSdcIitpdGVtLmRvd25sb2FkVXJsK1wiJyBzdHlsZT0nY3Vyc29yOnBvaW50ZXInPjxpIGNsYXNzPSdpY29uLWZpbGUnPjwvaT4gXCIraXRlbS50aXRsZStcIjwvYT5cIiArXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDtwYWRkaW5nLWxlZnQ6MTBweCc+TGFzdCBNb2RpZmllZDogXCIrZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2l0ZW0ubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPGRpdj48L2xpPlwiXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIGVhY2ggZmlsZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtZHJpdmUtbW9kZWwnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBGaWxlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gZ3JhYiB0aGUgZml2ZSBmcm9tIGRyaXZlXG4gICAgZ2V0RmlsZShpZCwgJCh0aGlzKS5hdHRyKFwidXJsXCIpLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAvLyBpZiBiYWRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgLy8gaGlkZSBhbnkgbG9hZGVkIHRyZWVzLFxuICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChcIlwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICBsb2FkZWRUcmVlID0gbnVsbDtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIGFsbCBnb29kXG4gICAgICBfc2V0TG9hZE1lc3NhZ2UoJ0ZpbGUgTG9hZGVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgbG9hZGVkRmlsZSA9IGlkO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIG5hbWVcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCBpZCA9PSBmaWxlTGlzdFtpXS5pZCApIHtcbiAgICAgICAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK2ZpbGVMaXN0W2ldLnRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK2lkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgIC8vIHNldHVwIG1vZGVsXG4gICAgICBtb2RlbElPLmxvYWRTZXR1cChpZCwgZmlsZSk7XG5cbiAgICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuXG4gICAgICAvLyB3YWl0IGEgdGljayBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGhpZGUgdGhlIG1vZGFsXG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCB0cmVlcyBvbnRvIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIF9zaG93VHJlZUZpbGVzKCkge1xuICAvLyB1cGRhdGUgdGhlIGxpc3QgaGVhZGVyLCBsZXQgdXNlciBrbm93IHdoYXQgdGhleSBhcmUgc2VsZWN0aW5nXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiXCIpO1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGg1PlNlbGVjdCBUcmVlPC9oNT48L2xpPlwiKSk7XG5cbiAgLy8gaWYgdGhlcmUgYXJlIG5vIHRyZWVzLCBzYXkgc28gYW5kIGdldCBvdXQgb2YgaGVyZVxuICBpZiggIXRyZWVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz5ObyBUcmVlcyBBdmFpbGFibGU8L2xpPlwiKSk7XG4gIGlmKCB0cmVlTGlzdC5sZW5ndGggPT0gMCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgdHJlZSBsaXN0IGVsZW1lbnRzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSB0cmVlTGlzdFtpXTtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKFxuICAgICAgJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48YSBpZD0nXCIraXRlbS5pZCtcIicgbmFtZT0nXCIraXRlbS50aXRsZStcIicgdXJsPSdcIitpdGVtLmRvd25sb2FkVXJsK1wiJyBzdHlsZT0nY3Vyc29yOnBvaW50ZXInPjxpIGNsYXNzPSdpY29uLWxlYWYnPjwvaT4gXCIraXRlbS50aXRsZStcIjwvYT5cIiArXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDtwYWRkaW5nLWxlZnQ6MTBweCc+TGFzdCBNb2RpZmllZDogXCIrZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2l0ZW0ubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPGRpdj48L2xpPlwiXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIHRpdGxlc1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtZHJpdmUtdHJlZScsIDEpO1xuXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoXCJuYW1lXCIpO1xuXG4gICAgLy8gdGVsbCB0aGUgdXNlciB3ZSBhcmUgbG9hZGluZ1xuICAgIF9zZXRMb2FkTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBMb2FkaW5nIFRyZWUuLi4nLCdpbmZvJyk7XG5cbiAgICAvLyBsb2FkIGZpbGUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHVzZXIga25vd1xuICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgLy8gc2hvdyB0aGUgdHJlZSBzaGFyaW5nIGJ0bnNcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3ZSBhcmUgc3VjY2VzZnVsbFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdUcmVlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICAgIGxvYWRlZFRyZWUgPSBpZDtcblxuICAgICAgLy8gbG9hZGVkIHRyZWUgaW50byBtb2RlbCAvIFVJXG4gICAgICBtb2RlbElPLmxvYWRUcmVlKGZpbGUpO1xuXG4gICAgICAvLyB3YWl0IGEgc2VjIHNvIHVzZXIgY2FuIHNlZSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9LDE1MDApO1xuXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgc2hvdyB0aGUgdXNlciB0aGUgbG9hZCB0cmVlIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gc2hvd0xvYWRUcmVlUGFuZWwoKSB7XG4gIC8vIHJlbmRlciB0aGUgdHJlZXMgaW50byB0aGUgcG9wdXAgbGlzdFxuICBfc2hvd1RyZWVGaWxlcygpO1xuICAvLyBjbGVhciBhbnkgbWVzc2FnZXNcbiAgX3NldExvYWRNZXNzYWdlKG51bGwpO1xuICAvLyBzaG93IHRoZSBwb3B1cFxuICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIHNhdmUgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dTYXZlVHJlZVBhbmVsKCkge1xuICAvLyBzZXQgdGhlIGN1cnJlbnQgbWltZVR5cGUgd2UgYXJlIHNhdmluZ1xuICBzYXZlTWltZVR5cGUgPSBUUkVFX01JTUVfVFlQRTtcblxuICAvLyBzZXQgdGhlIGhlYWRlciBzbyB1c2VyIGtub3dzIHdoYXQgdHlwZSB0aGV5IGFyZSBzYXZpbmdcbiAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIFRyZWU8L2g1PlwiKTtcblxuICAvLyBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgdHJlZSwgc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gIGlmKCBsb2FkZWRUcmVlICE9IG51bGwpIHtcbiAgICAvLyBmaW5kIHRoZSBjdXJyZW50IHRyZWUgYmFzZWQgb24gaWRcbiAgICB2YXIgdHJlZSA9IHt9O1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdHJlZUxpc3RbaV0uaWQgPT0gbG9hZGVkVHJlZSkge1xuICAgICAgICB0cmVlID0gdHJlZUxpc3RbaV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgLy8gcmVuZGVyIHRyZWUgbWV0YWRhdGEgb24gdXBkYXRlIHBhbmVsXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSh0cmVlLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrdHJlZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgIFwiPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPlwiK3RyZWUuZGVzY3JpcHRpb24rXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrdHJlZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC9cIit0cmVlLmlkK1wiJycgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+XCIpO1xuICB9IGVsc2Uge1xuICAgIC8vIGRvbid0IHNob3cgdGhlIHVwZGF0ZSBwYW5lbCwgdGhpcyBpcyBhIG5ldyB0cmVlXG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5oaWRlKCk7XG4gIH1cblxuICAvLyBjbGVhciBhbnkgbWVzc2FnZVxuICBfc2V0U2F2ZU1lc3NhZ2UobnVsbCk7XG5cbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqIExvYWQgYSBtb2RlbCBiYXNlZCBvbiBwYXNzZWQgaWQuICBUaGlzIGZ1bmN0aW9uIGlzIHJlYWxseSBvbmx5IGZvciBsb2FkaW5nIG1vZGVsIG9uIHN0YXJ0LCB3aGVuIGEgZmlsZSBpZFxuICogaGFzIGJlZW4gcGFzc2VkIGluIHRoZSB1cmwgZWl0aGVyIGZyb20gZ29vZ2xlIGRyaXZlIG9yIGZyb20gdGhlID9maWxlPWlkIHVybC5cbiAqKiovXG52YXIgbG9naW5Nb2RhbEluaXQgPSBmYWxzZTtcbmZ1bmN0aW9uIGxvYWQoaWQsIGxvYWRGbikge1xuXG4gIC8vIGlmIHdlIGRvbid0IGhhdmUgYW4gYWNjZXNzIHRva2VuLCB3ZSBuZWVkIHRvIHNpZ24gaW4gZmlyc3RcbiAgLy8gVE9ETzogaWYgdGhpcyBpcyBhIHB1YmxpYyBmaWxlLCB0aGVyZSBpcyBubyByZWFzb24gdG8gc2lnbiBpbi4uLiBzb2x1dGlvbj9cbiAgaWYoICF0b2tlbiApIHtcblxuICAgIGlmKCAhbG9naW5Nb2RhbEluaXQgKSB7XG4gICAgICAkKCcjZ29vZ2xlLW1vZGFsLWxvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gc2lnbiB0aGUgdXNlciBpbiAoZm9yY2Ugb2F1dGggcG9wdXApXG4gICAgICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24gaW4gdG9wIGxlZnRcbiAgICAgICAgICBfc2V0VXNlckluZm8oKTtcblxuICAgICAgICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgICAgICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgpO1xuICAgICAgbG9naW5Nb2RhbEluaXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKioqXG4gKiBJbml0aWFsaXplIFVJIC8gbW9kZWwgd2hlbiBhIGZpbGUgaXMgbG9hZGVkIGF0IHN0YXJ0XG4gKioqL1xuZnVuY3Rpb24gX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsIGZpbGUpIHtcbiAgLy8gYmFkZG5lc3MsIGxldCB0aGUgdXNlciBrbm93XG4gIGlmKCAhZmlsZSApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiRmFpbGVkIHRvIGxvYWQgZnJvbSBHb29nbGUgRHJpdmUgOi9cIik7XG4gIH1cblxuICAvLyBtZXRhZGF0YSBmYWlsZWQgdG8gbG9hZCwgbW9yZSBiYWRuZXNzXG4gIGlmKCBtZXRhZGF0YS5jb2RlID09IDQwNCApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5tZXNzYWdlKTtcbiAgfVxuXG4gIC8vIHdlIGxvYWRlZCBhIG1vZGVsLCBzZXR1cCBhbmQgcnVuXG4gIGlmKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgLy8gc2V0IHRoZSBjdXJyZW50bHkgbG9hZGVkIGZpbGUgaWRcbiAgICBsb2FkZWRGaWxlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrbWV0YWRhdGEuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNob3cgdGl0bGVcbiAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK21ldGFkYXRhLnRpdGxlKTtcblxuICAgIC8vIHNldHVwIG1vZGVsXG4gICAgbW9kZWxJTy5sb2FkU2V0dXAobWV0YWRhdGEuaWQsIGZpbGUpO1xuXG4gICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuICB9IGVsc2UgaWYgKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHsgLy8gd2UgbG9hZGVkIGEgdHJlZVxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICBsb2FkZWRUcmVlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChtZXRhZGF0YS50aXRsZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZVxuICAgIG1vZGVsSU8ubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAvLyBoaWRlIHRoZSBsb2FkaW5nIHBvcHVwXG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiTG9hZGVkIHVua25vd24gZmlsZSB0eXBlIGZyb20gR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5taW1lVHlwZSk7XG4gIH1cbn1cblxuLyoqKlxuICogdG9rZW5zIGV4cGlyZSwgZXZlcnkgb25jZSBpbiBhd2hpbGUgY2hlY2sgdGhlIGN1cnJlbnQgdG9rZW4gaGFzbid0XG4gKiBpZiBpdCBoYXMsIHRoZW4gdXBkYXRlXG4gKioqL1xuZnVuY3Rpb24gX2NoZWNrVG9rZW4oKSB7XG4gIC8vIGlnbm9yZSBpZiB0aGVyZSBpcyBubyB0b2tlblxuICBpZiAoIXRva2VuKSByZXR1cm47XG5cbiAgLy8gb3RoZXJ3aXNlLCBsb29rIHRvIHVwZGF0ZSB0aGUgYWNjZXNzIHRva2VuXG4gIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpIHtcbiAgICBpZiggdCAhPSBudWxsICkgdG9rZW4gPSB0O1xuICB9KTtcbn07XG5cbi8qKipcbiAqIGlzIHRoZSBjdXJyZW50IHVzZXIgc2lnbmVkIGluP1xuICoqKi9cbmZ1bmN0aW9uIGNoZWNrU2lnbmVkSW4oY2FsbGJhY2spIHtcbiAgLy8gaWYgaXNBdXRoZXJpemVkIHJldHVybnMgYSB0b2tlbiwgdXNlciBpcyBsb2dnZWQgaW5cbiAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHRva2VuKXtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkgY2FsbGJhY2sodHJ1ZSk7XG4gICAgZWxzZSBjYWxsYmFjayhmYWxzZSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2lnbiBhIHVzZXIgaW4gdXNpbmcgdGhlIE9hdXRoIGNsYXNzXG4gKioqL1xuZnVuY3Rpb24gc2lnbkluKGNhbGxiYWNrKSB7XG4gIE9hdXRoLmF1dGhvcml6ZShmdW5jdGlvbih0KXtcbiAgICB0b2tlbiA9IHQ7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgIGlmKCB0LmVycm9yICkgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuICB9KVxufTtcblxuLyoqKlxuICogQWNjZXNzIG1ldGhvZCBmb3IgdG9rZW5cbiAqKiovXG5mdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgcmV0dXJuIHRva2VuO1xufTtcblxuLyoqKlxuICogTG9hZCB0aGUgZ29vZ2xlIGRyaXZlIGFwaSBjb2RlXG4gKioqL1xuZnVuY3Rpb24gX2xvYWRBcGkoY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQubG9hZChcImRyaXZlXCIsIERSSVZFX0FQSV9WRVJTSU9OLCBmdW5jdGlvbigpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIGxpc3Qgb2YgZmlsZSBtZXRhZGF0YSBmcm9tIGdvb2dsZSBkcml2ZSBiYXNlZCBvbiBxdWVyeVxuICoqKi9cbmZ1bmN0aW9uIGxpc3RGaWxlcyhxdWVyeSwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMubGlzdCh7XG4gICAgcSA6IHF1ZXJ5ICsgXCIgYW5kIHRyYXNoZWQgPSBmYWxzZVwiXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIHNpbmdsZSBmaWxlcyBtZXRhZGF0YSBiYXNlZCBvbiBpZFxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGVNZXRhZGF0YShpZCwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMuZ2V0KHtcbiAgICAnZmlsZUlkJyA6IGlkXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqICBBY3R1YWxseSBsb2FkIGEgZmlsZXMgZGF0YS4gIFRoZSB1cmwgdG8gZG8gdGhpcyBpcyBwcm92aWRlZCBpbiBhIGZpbGVzIG1ldGFkYXRhLlxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGUoaWQsIGRvd25sb2FkVXJsLCBjYWxsYmFjaykge1xuICAkLmFqYXgoe1xuICAgIHVybCA6IGRvd25sb2FkVXJsLFxuICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAvLyBzZXQgYWNjZXNzIHRva2VuIGluIGhlYWRlclxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCAnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgIC8vIHBhcnNlIHRoZSByZXNwb25zZSAod2Ugb25seSBzdG9yZSBqc29uIGluIHRoZSBnb29nbGUgZHJpdmUpXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGNhbGxiYWNrKGRhdGEsIGlkKTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZVwiXG4gICAgICB9KTtcblxuICAgIH1cbiAgfSk7XG59O1xuXG4vKioqXG4gKiBTYXZlIGpzb24gdG8gZ29vZ2xlIGRyaXZlXG4gKioqL1xuZnVuY3Rpb24gc2F2ZUZpbGUobmFtZSwgZGVzY3JpcHRpb24sIG1pbWVUeXBlLCBqc29uLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICBpZiggIW9wdGlvbnMgKSBvcHRpb25zID0ge31cblxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gIHZhciBtZXRhZGF0YSA9IHtcbiAgICAndGl0bGUnIDogbmFtZSxcbiAgICAnZGVzY3JpcHRpb24nIDogZGVzY3JpcHRpb24sXG4gICAgJ21pbWVUeXBlJyA6IG1pbWVUeXBlXG4gIH07XG5cbiAgLy8gaWYgd2Ugd2FudCB0byBzYXZlIHRoZSBmaWxlIHRvIGEgc3BlY2lmaWVkIGZvbGRlclxuICBpZiggb3B0aW9ucy5wYXJlbnQgKSB7XG4gICAgbWV0YWRhdGEucGFyZW50cyA9IFt7aWQ6IG9wdGlvbnMucGFyZW50fV07XG4gIH1cblxuICAvLyBpZiB0aGUganNvbiBpcyByZWFsbHkgYW4gb2JqZWN0LCB0dXJuIGl0IHRvIGEgc3RyaW5nXG4gIGlmICh0eXBlb2YganNvbiA9PSAnb2JqZWN0JykganNvbiA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gIC8vIGRhdGEgbmVlZHMgdG8gYmUgYmFzZTY0IGVuY29kZWQgZm9yIHRoZSBQT1NUXG4gIHZhciBiYXNlNjREYXRhID0gYnRvYShqc29uKTtcblxuICAvLyBjcmVhdGUgb3VyIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID0gZGVsaW1pdGVyXG4gICAgICArICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nXG4gICAgICArIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKTtcblxuICBpZigganNvbi5sZW5ndGggPiAwICkge1xuICAgIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGRlbGltaXRlciArICdDb250ZW50LVR5cGU6ICdcbiAgICAgICsgbWltZVR5cGUgKyAnXFxyXFxuJyArICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nXG4gICAgICArICdcXHJcXG4nICsgYmFzZTY0RGF0YTtcbiAgfVxuICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBjbG9zZV9kZWxpbTtcblxuICAgICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICAgLy8gaWYgdGhlIG9wdGlvbnMuY29udmVyPXRydWUgZmxhZyBpcyBzZXQsIGdvb2dsZSBhdHRlbXB0cyB0byBjb252ZXJ0IHRoZSBmaWxlIHRvXG4gICAgIC8vIGEgZ29vZ2xlIGRvYyBmaWxlLiAgTW9zdGx5LCB3ZSB1c2UgdGhpcyBmb3IgZXhwb3J0aW5nIGNzdiAtPiBHb29nbGUgU3ByZWFkc2hlZXRzXG4gIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgJ3BhdGgnIDogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMnICsgKCBvcHRpb25zLmNvbnZlcnQgPyAnP2NvbnZlcnQ9dHJ1ZScgOiAnJyksXG4gICAgJ21ldGhvZCcgOiAnUE9TVCcsXG4gICAgJ3BhcmFtcycgOiB7XG4gICAgICAndXBsb2FkVHlwZScgOiAnbXVsdGlwYXJ0J1xuICAgIH0sXG4gICAgJ2hlYWRlcnMnIDoge1xuICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICB9LFxuICAgICdib2R5JyA6IG11bHRpcGFydFJlcXVlc3RCb2R5XG4gIH0pO1xuXG4gIC8vIHNlbmQgdGhlIHJlcXVlc3RcbiAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBpZiAocmVzcC5pZClcbiAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgIGVsc2VcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gc2F2ZVwiXG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBVcGRhdGUgYSBmaWxlIGJhc2VkIG9uIGlkIGFuZCBnaXZlbiBqc29uIGRhdGFcbiAqKiovXG5mdW5jdGlvbiB1cGRhdGVGaWxlKGZpbGVJZCwganNvbiwgY2FsbGJhY2spIHtcbiAgLy8gc3RhcnQgY3JlYXRpbmcgdGhlIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7fTtcblxuICAvLyBzdHJpbmlmeSB0aGVuIGJhc2U2NCBlbmNvZGUgdGhlbiBvYmplY3RcbiAgICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoSlNPTi5zdHJpbmdpZnkoanNvbikpO1xuXG4gICAgLy8gc2V0IHVwIHRoZSBQT1NUIGJvZHlcbiAgICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPVxuICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxcclxcblxcclxcbicgK1xuICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSkgK1xuICAgICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAnQ29udGVudC1UeXBlOiAnICsgTUlNRV9UWVBFICsgJ1xcclxcbicgK1xuICAgICAgICAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJyArXG4gICAgICAgICdcXHJcXG4nICtcbiAgICAgICAgYmFzZTY0RGF0YSArXG4gICAgICAgIGNsb3NlX2RlbGltO1xuXG4gIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgICAgICdwYXRoJzogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMvJytmaWxlSWQsXG4gICAgICAgICdtZXRob2QnOiAnUFVUJyxcbiAgICAgICAgJ3BhcmFtcyc6IHsndXBsb2FkVHlwZSc6ICdtdWx0aXBhcnQnfSxcbiAgICAgICAgJ2hlYWRlcnMnOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgICAgICB9LFxuICAgICAgICAnYm9keSc6IG11bHRpcGFydFJlcXVlc3RCb2R5fSk7XG5cbiAgICAvLyBzZXQgcmVxdWVzdFxuICAgIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKXtcbiAgICAgIGlmKCByZXNwLmlkICkge1xuICAgICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gdXBkYXRlXCJcbiAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3J1bi1tb2RlbC1yZW1vdGUnLCAxKTtcbiAgZ2RyaXZlUlQucnVuTW9kZWxSdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIGNoZWNrU2lnbmVkSW4gOiBjaGVja1NpZ25lZEluLFxuICBzaWduSW4gOiBzaWduSW4sXG4gIGdldFRva2VuIDogZ2V0VG9rZW4sXG4gIGxpc3RGaWxlcyA6IGxpc3RGaWxlcyxcbiAgZ2V0RmlsZU1ldGFkYXRhIDogZ2V0RmlsZU1ldGFkYXRhLFxuICBsb2FkIDogbG9hZCxcbiAgc2F2ZUZpbGU6IHNhdmVGaWxlLFxuICBzaG93TG9hZFRyZWVQYW5lbCA6IHNob3dMb2FkVHJlZVBhbmVsLFxuICBzaG93U2F2ZVRyZWVQYW5lbCA6IHNob3dTYXZlVHJlZVBhbmVsLFxuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcbiAgc2V0QXBwIDogc2V0QXBwLFxuXG4gIE1JTUVfVFlQRSA6IE1JTUVfVFlQRVxufTtcbiIsIi8vIFJFQUxUSU1FIChydCkgT2JqZWN0c1xuLy8gcnQganNvbiBmaWVsZCwgdXNlZCB0byBzZW5kIHVwZGF0ZXMgdG8gcGVlcnNcbnZhciBydEpzb24gPSBudWxsO1xuLy8gcnQgZG9jdW1lbnRcbnZhciBydERvYyA9IG51bGw7XG4vLyBoYXMgdGhlIHJ0IGFwaSBiZWVuIGxvYWRlZD9cbnZhciBfcnRMb2FkZWQgPSBmYWxzZTtcbi8vIHRpbWVyIHRvIGJ1ZmZlciB0aGUgZmlyaW5nIG9mIHVwZGF0ZXMgZnJvbSBydCBldmVudHNcbnZhciBfcnRUaW1lciA9IC0xO1xuXG4vLyBsaXN0IG9mIGN1cnJlbnQgcnQgZWRpdHMgdG8gaW5wdXQgZmlsZXNcbnZhciBydEVkaXRzID0ge307XG4vLyBnb29nbGUgZHJpdmUgcnQgbW9kZWwgLSBtYXBcbnZhciBsaXZlRWRpdHMgPSBudWxsO1xuLy8gbG9jYWwgbG9jayBvbiBhbiBlbGVtZW50XG52YXIgbG9jayA9IHt9O1xuXG52YXIgYXBwO1xuXG4vLyBsb2FkZWQgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGU7XG5cbi8qKipcbiAqIFNldHVwIHRoZSBydCBhcGkgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGlzIHdpbGwgYWN0dWFsbHkgbG9hZCB0aGUgYXBpIGlmIG5lZWRlZFxuICoqKi9cbmZ1bmN0aW9uIGluaXRSdEFwaShmaWxlKSB7XG4gIHJ0SnNvbiA9IG51bGw7IC8vIGtpbGwgb2ZmIGFueSBvbGQgbGlzdG5lcnNcbiAgbG9hZGVkRmlsZSA9IGZpbGU7XG5cbiAgLy8gY2xvc2UgYW55IG9sZCBjb25uZWN0aW9uXG4gIGlmKCBydERvYyApIHJ0RG9jLmNsb3NlKCk7XG5cbiAgLy8gZ2V0IG91dCBvZiBoZXJlIGlmIHdlIGRvbid0IGhhdmUgYSBsb2FkZWQgZmlsZVxuICBpZiggbG9hZGVkRmlsZSA9PSBudWxsICkgcmV0dXJuO1xuXG4gIC8vIGxvYWQgYXBpIGlmIG5lZWRlZFxuICBpZiggIV9ydExvYWRlZCApIHtcbiAgICBnYXBpLmxvYWQoJ2RyaXZlLXJlYWx0aW1lJywgZnVuY3Rpb24oKXtcbiAgICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgICBfcnRMb2FkZWQgPSB0cnVlO1xuICAgICAgX2xvYWRSdEZpbGUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzZXR1cCBydCBob29rc1xuICAgIF9sb2FkUnRGaWxlKCk7XG4gIH1cblxuICAvLyBzZXR1cCBpbnB1dCBoYW5kbGVyc1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2ZvY3VzJyxmdW5jdGlvbihlKXtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3NldExvY2FsTG9jayh7XG4gICAgICBpZCAgICAgICAgOiBlbGUuYXR0cihcImlkXCIpLFxuICAgICAgdmFsdWUgICAgIDogZWxlLnZhbCgpLFxuICAgICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gICAgfSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2JsdXInLGZ1bmN0aW9uKGUpe1xuICAgIF9yZW1vdmVMb2NhbExvY2soJChlLnRhcmdldCkuYXR0cihcImlkXCIpKTtcbiAgfSk7XG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgcmV0dXJuO1xuICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICBfdXBkYXRlTG9jYWxMb2NrKGVsZS5hdHRyKFwiaWRcIiksIGVsZS52YWwoKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TG9jYWxMb2NrKGxvY2spIHtcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgbWFyayB0aGUgY3VycmVudCBsb2NrXG4gIGlmKCBsaXZlRWRpdHMuaGFzW2xvY2suaWRdICkgcmV0dXJuO1xuICBsaXZlRWRpdHMuc2V0KGxvY2suaWQsIGxvY2spO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jYWxMb2NrKGlkLCB2YWwpIHtcbiAgdmFyIGxvY2sgPSB7XG4gICAgaWQgOiBpZCxcbiAgICB2YWx1ZSA6IHZhbCxcbiAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gIH1cblxuICBsaXZlRWRpdHMuc2V0KGlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZUxvY2FsTG9jayhpZCkge1xuICBsaXZlRWRpdHMuZGVsZXRlKGlkKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZVJlbW90ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikucmVtb3ZlKCk7XG4gIGRlbGV0ZSBydEVkaXRzW2xvY2suaWRdO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jayhsb2NrKSB7XG4gICQoXCIjXCIrbG9jay5pZCkudmFsKGxvY2sudmFsdWUpLmF0dHIoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gIGlmKCAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5sZW5ndGggPT0gMCApIHtcbiAgICAkKFwiI1wiK2xvY2suaWQpLnBhcmVudCgpLmFmdGVyKFwiPHNwYW4gaWQ9J1wiK2xvY2suaWQrXCItZWRpdGluZycgY2xhc3M9J2xhYmVsIGxhYmVsLXdhcm5pbmcnPjwvc3Bhbj5cIik7XG4gIH1cbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikuaHRtbChsb2NrLnVzZXIpO1xuICBydEVkaXRzW2xvY2suaWRdID0gbG9jaztcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBsaXN0IG9mIHJlYWx0aW1lIGVkaXRzIGFzIHdlbGwgYXMgdGhlIGlucHV0IFVJIGJhc2VkIG9uIHRoZSBydERvYyBldmVudFxuICogVE9ETzogdGhpcyBpcyBhIGJpdCBuYXN0eSByaWdodCBub3dcbiAqKi9cbmZ1bmN0aW9uIF91cGRhdGVSdEVkaXRzKGUpIHtcbiAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcblxuICB2YXIga2V5cyA9IGxpdmVFZGl0cy5rZXlzKCk7XG5cbiAgLy8gcmVtb3ZlIG9sZCB0aW1lc3RhbXBzIFRPRE9cbiAgLypmb3IoIHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggbm93IC0gdmFsdWVzW2ldLnRpbWVzdGFtcCA+IDEwMDAgKiA2MCApIHtcbiAgICAgIF9yZW1vdmVMb2NrKHZhbHVlc1tpXSk7IC8vIGRvZXMgdGhpcyBmaXJlIHVwZGF0ZXM/XG4gICAgfVxuICB9Ki9cblxuXG4gIC8vIHNldCBuZXcgZWRpdHNcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrICkge1xuICAgIF91cGRhdGVMb2NrKGxpdmVFZGl0cy5nZXQoa2V5c1tpXSkpO1xuICB9XG5cbiAgLy8gcmVtb3ZlIG9sZCBlZGl0c1xuICBmb3IoIHZhciBrZXkgaW4gcnRFZGl0cyApIHtcbiAgICBpZigga2V5cy5pbmRleE9mKGtleSkgPT0gLTEgKSB7XG4gICAgICBfcmVtb3ZlUmVtb3RlTG9jayhydEVkaXRzW2tleV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKioqXG4gKiAgU2V0dXAgdGhlIHJ0IGhvb2tzIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhlIGFwaSBuZWVkcyB0byBhbHJlYWR5IGJlIGxvYWRlZFxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkUnRGaWxlKCkge1xuICAvLyBnZXQgdGhlIHJ0IGRvY1xuICBnYXBpLmRyaXZlLnJlYWx0aW1lLmxvYWQobG9hZGVkRmlsZSxcbiAgICAvLyBydCBkb2MgbG9hZGVkXG4gICAgZnVuY3Rpb24oZmlsZSl7XG4gICAgICBydERvYyA9IGZpbGU7XG5cbiAgICAgIC8vIGdldCBvdXIgcnQgYXR0cmlidXRlLiAgVHJpZ2dlcmluZyBjaGFuZ2VzIG9uIHJ0SnNvbiB3aWxsIHB1c2ggZXZlbnRzXG4gICAgICAvLyB0byBhbGwgbGlzdGVuaW5nIGNsaWVudHNcbiAgICAgIHZhciBqc29uID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGpzb24gYXR0ciwgd2UgbmVlZCB0byBpbml0aWFsaXplIHRoZSBtb2RlbFxuICAgICAgaWYoIGpzb24gPT0gbnVsbCB8fCBsaXZlRWRpdHMgPT0gbnVsbCkge1xuICAgICAgICAvLyBpbml0aWFsaXplIG91ciBydCBtb2RlbFxuICAgICAgICBfb25SdE1vZGVsTG9hZChmaWxlLmdldE1vZGVsKCkpO1xuICAgICAgICAvLyBncmFiIHJ0IGpzb24gYXR0ciBub3cgdGhhdCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgICAganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWQgOihcbiAgICAgIGlmKCAhanNvbiApIHJldHVybiBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBjb25uZWN0IHRvIHJ0IGpzb25cIik7XG4gICAgICAvLyBzZXQgdGhhdCBhdHRyIGdsb2JhbCB0byBjbGFzc1xuICAgICAgcnRKc29uID0ganNvbjtcblxuICAgICAgLy8gZ2V0IGN1cnJlbnQgbGlzdCBvZiB1c2Vyc1xuICAgICAgdmFyIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdoZW4gcGVvcGxlIGNvbWUgYW5kIGdvXG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0pPSU5FRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcbiAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfTEVGVCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHJ0SnNvbiBvYmplY3RcbiAgICAgIC8vIHdoZW4gdGhpcyB1cGRhdGVzLCB3ZSB3YW50IHRvIHJlLXJ1biB0aGUgbW9kZWxcbiAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0lOU0VSVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0RFTEVURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGl2ZSBlZGl0IHVwZGF0ZXNcbiAgICAgICAgICAgICAgbGl2ZUVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVkFMVUVfQ0hBTkdFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgX3VwZGF0ZVJ0RWRpdHMoZSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNob3cgd2hvIGlzIGxpc3RlbmluZ1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuXG4gICAgICAgIC8vIHNldCBpbnB1dCBoYW5kbGVycyBmb3IgcnQgZXZlbnRzXG4gICAgfSxcbiAgICAvLyBtb2RlbCBsb2FkZWRcbiAgICBmdW5jdGlvbihtb2RlbCl7XG4gICAgICBfb25SdE1vZGVsTG9hZChtb2RlbCk7XG4gICAgfSxcbiAgICAvLyBlcnJvcnNcbiAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUlQgRVJST1JTOiBcIik7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbiAgKTtcbn1cblxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGRpc3BsYXkgb2YgYWN0aXZlIHVzZXJzIGZvciB0aGUgbW9kZWwuXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKSB7XG4gIC8vIGlmIGl0J3MganVzdCB1cywgZG9uJ3Qgc2hvdyBhbnl0aGluZ1xuICBpZiggIXVzZXJzICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG4gIGlmKCB1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIHdlIG9ubHkgd2FudCB1bmlxdWUgdXNlcnNcbiAgdmFyIHVuaXF1ZSA9IFtdO1xuICB2YXIgdXVzZXJzID0gW107XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHVuaXF1ZS5pbmRleE9mKHVzZXJzW2ldLnVzZXJJZCkgPT0gLTEgKSB7XG4gICAgICB1bmlxdWUucHVzaCh1c2Vyc1tpXS51c2VySWQpO1xuICAgICAgdXVzZXJzLnB1c2godXNlcnNbaV0pO1xuICAgIH1cbiAgfVxuICBpZiggdXVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgLy8gYWRkIHBpYyBvZiB1c2VyIHRvIGRpc3BsYXkgcGFuZWxcbiAgdmFyIGh0bWwgPSBcIkFjdGl2ZSBVc2VycyBcIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1dXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHV1c2Vyc1tpXS5waG90b1VybCApIHtcbiAgICAgIGh0bWwgKz0gXCI8aW1nIHNyYz0nXCIrdXVzZXJzW2ldLnBob3RvVXJsK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyBzdHlsZT0nbWFyZ2luOjAgNXB4O3dpZHRoOjMycHg7aGVpZ2h0OjMycHgnIGNsYXNzPSdpbWctcm91bmRlZCcgLz4gXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGh0bWwgKz0gXCI8c3BhbiBzdHlsZT0nd2lkdGg6MzJweDtoZWlnaHQ6MzJweDttYXJnaW46MCA1cHg7YmFja2dyb3VuZC1jb2xvcjpcIit1dXNlcnNbaV0uY29sb3IrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInID48L3NwYW4+IFwiO1xuICAgIH1cbiAgfVxuICAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKGh0bWwpO1xufVxuXG4vKioqXG4gICAqICBSZS1ydW4gdGhlIG1vZGVsLiAgRXZlbnRzIGNhbiBjb21lIGluIHF1aWNrbHkgaW4gbWFueSBwYXJ0cy4gIEJ1ZmZlciB0aGUgZXZlbnRzIHNvIHdlIGRvbid0IHJlLXJ1biB0aGUgbW9kZWwgdG9vIG1hbnkgdGltZXMuXG4gICAqKiovXG5mdW5jdGlvbiBfcmVydW5SdCh1c2VycywgdXNlcklkKSB7XG4gIC8vIHRoaXMgaXMgYmFkbmVzc1xuICBpZiggIXJ0SnNvbiApIHJldHVybjtcblxuICAvLyBjbGVhciBhbnkgcXVldWVkIHJ1blxuICBpZiggX3J0VGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQoX3J0VGltZXIpO1xuXG4gIC8vIHF1ZXVlIHVwIGEgcnVuIGFuZCB3YWl0IHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gdXBkYXRlc1xuICBfcnRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBfcnRUaW1lciA9IC0xO1xuXG4gICAgLy8gZmluZCB0aGUgdXNlciB3aG8gaXMgcnVubmluZyB0aGUgbW9kZWwgYW5kIGRpcGxheSBwb3B1cCBvZiB0aGF0IHVzZXJzIGluZm9ybWF0aW9uXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB1c2Vyc1tpXS51c2VySWQgPT0gdXNlcklkICkge1xuICAgICAgICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nLW91dGVyJyA+PGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nJyBzdHlsZT0nd2lkdGg6NDAwcHgnPiBcIitcbiAgICAgICAgICAgICAgICAodXNlcnNbaV0ucGhvdG9VcmwgPyBcIjxpbWcgc3JjPSdcIit1c2Vyc1tpXS5waG90b1VybCtcIicgLz4gXCIgOiBcIlwiKSt1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIiBpcyB1cGRhdGluZyB0aGUgbW9kZWwuLi48L2Rpdj48L2Rpdj5cIik7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hcHBlbmQocGFuZWwpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLmNzcyhcIm9wYWNpdHlcIixcIi45XCIpO1xuICAgICAgICAgICAgfSw1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAzNTAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnNlIHRoZSBuZXcgbW9kZWwgZGF0YSBhbmQgbG9hZCBpdCBhcyBvdXIgY3VycmVudCBzZXR1cFxuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShydEpzb24uZ2V0VGV4dCgpKTtcbiAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRTZXR1cChsb2FkZWRGaWxlLCBkYXRhLCB0cnVlKTtcbiAgfSwgMzAwKTtcbn1cblxuLyoqKlxuICogaW5pdGlhbGl6ZSBhIG5ldyBydCBtb2RlbFxuICoqKi9cbmZ1bmN0aW9uIF9vblJ0TW9kZWxMb2FkKG1vZGVsKSB7XG4gIC8vIGN1cnJlbnRseSB3ZSBqdXN0IHdhbnQgdG8gdXNlIHRoaXMgc2luZ2xlIGF0dHJpYnV0ZSB0byBicm9hZGNhc3QgZXZlbnRzXG4gIHZhciBqc29uID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gIGlmKCBqc29uID09IG51bGwgKSB7XG4gICAgdmFyIHN0cmluZyA9IG1vZGVsLmNyZWF0ZVN0cmluZyhcInt9XCIpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJqc29uXCIsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgbGl2ZUVkaXRzID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgaWYoIGxpdmVFZGl0cyA9PSBudWxsICkge1xuICAgIHZhciBmaWVsZCA9IG1vZGVsLmNyZWF0ZU1hcCgpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJsaXZlRWRpdHNcIiwgZmllbGQpO1xuICB9XG5cbn1cblxuLyoqKlxuICogbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nIDopXG4gKiBUaGlzIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBhIGxvY2FsIHVzZXIgcnVucyB0aGUgbW9kZWwuICBJdCB1cGRhdGVzIHRoZSAnanNvbidcbiAqIGF0dHJpYnV0ZSB3aGljaCBpcyB0aGVuIGJyb2FkY2FzdCB0byBhbGwgbGlzdGVuaW5nIHBhcnRpZXNcbiAqKiovXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggcnRKc29uICkgcnRKc29uLnNldFRleHQoSlNPTi5zdHJpbmdpZnkoIGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKSApKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuICBpbml0UnRBcGkgIDogaW5pdFJ0QXBpLFxuICBzZXRBcHAgOiBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgIGFwcCA9IGFwcGxpY2F0aW9uO1xuICB9XG59O1xuIiwidmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dvb2dsZURyaXZlJyk7XG52YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcbnZhciB3ZWF0aGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyJyk7XG52YXIgd2VhdGhlckNoYXJ0ID0gcmVxdWlyZSgnLi93ZWF0aGVyL2NoYXJ0Jyk7XG52YXIgd2VhdGhlckZpbGVSZWFkZXIgPSByZXF1aXJlKCcuL3dlYXRoZXIvZmlsZVJlYWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuXG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IG51bGw7XG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxudmFyIFNFVFVQX1RFTVBMQVRFID1cbiAgJzxkaXY+JytcbiAgJzxoND5DaGFydCBPcHRpb25zPC9oND4nK1xuICAnPGRpdj4nK1xuICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlXCI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5PdXRwdXQgdmFyaWFibGUocykgdG8gY2hhcnQgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPiA8YSBpZD1cInNlbGVjdC1jaGFydHMtYnRuXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgQ2hhcnRzPC9hPjwvdGQ+JytcbiAgICAgICAgICAnPC90cj4nK1xuICAgICAgICAgICc8dHI+JytcbiAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cIndpZHRoOjUwJVwiPlZhcmlhdGlvbiBhbmFseXNpcyBwYXJhbWV0ZXIocykgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPjxkaXYgaWQ9XCJ2YXJpYXRpb25BbmFseXNpc1N0YXR1c1wiPk5vbmU8L2Rpdj48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICc8L3RhYmxlPicrXG4gICc8L2Rpdj4nK1xuICAnPGg0IGNsYXNzPVwicGFnZS1oZWFkZXJcIj5UaW1lIFN0ZXA8L2g0PicrXG4gICAnPGRpdiBjbGFzcz1cImZvcm0taG9yaXpvbnRhbFwiPicrXG4gICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgICAgJzxsYWJlbCBmb3I9XCJpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsXCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+RGF5cyBpbiBJbnRlcnZhbDwvbGFiZWw+JytcbiAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImlucHV0LXNldHVwLWRheXNfaW5faW50ZXJ2YWxcIiAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT1cIjFcIi8+JytcbiAgICAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj5Ib3cgbWFueSBkYXlzIGFyZSBpbiBlYWNoIHN0ZXAgb2YgdGhlIG1vZGVsPC9wPicgK1xuICAgICAgICc8L2Rpdj4nK1xuICAgICAnPC9kaXY+JytcbiAgICc8L2Rpdj4nK1xuICAgJzxoNCBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+TG9jYXRpb248L2g0PicrXG4gICAnPGRpdj4nK1xuICAgICAnPHNwYW4gaWQ9XCJjdXJyZW50LWxvY2F0aW9uXCIgc3R5bGU9XCJjb2xvcjojODg4XCI+PC9zcGFuPicrXG4gICAgICc8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0IHNlbGVjdC13ZWF0aGVyLWxvY2F0aW9uXCI+PGkgY2xhc3M9XCJpY29uLW1hcC1tYXJrZXJcIj48L2k+IFNlbGVjdCBMb2NhdGlvbjwvYT4nK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+JztcblxudmFyIEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURSA9XG4gICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxNXB4IDAgNXB4IDA7bWFyZ2luLWJvdHRvbTo1cHg7aGVpZ2h0OiA1MHB4XCI+JytcbiAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBwdWxsLXJpZ2h0XCIgaWQ9XCJ0cmVlLXN1Yi1tZW51XCI+JytcbiAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+JytcbiAgICAgICAgJzxzcGFuIGlkPVwibG9hZGVkLXRyZWUtbmFtZVwiPkRlZmF1bHQgVHJlZTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj4nK1xuICAgICAgJzwvYnV0dG9uPicrXG4gICAgICAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+JytcbiAgICAgICAgJzxsaT48YSBpZD1cImdkcml2ZS10cmVlcGFuZWwtbG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaT48YSBpZD1cImdkcml2ZS10cmVlcGFuZWwtc2F2ZVwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC11cGxvYWRcIj48L2k+IFNhdmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cInNoYXJlLXRyZWUtYnRuXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tbGVmdDoxMHB4XCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICc8L3VsPicrXG4gICc8L2Rpdj4nK1xuICAnPGRpdiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNvbXBhcmUtdHJlZXNcIiAvPiBDb21wYXJlIFRyZWVzPC9kaXY+Jytcbic8L2Rpdj4nO1xuXG52YXIgSU5QVVRfVEVNUExBVEUgPVxuICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICc8bGFiZWwgZm9yPVwie3tpZH19XCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+e3tsYWJlbH19PC9sYWJlbD4nK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj4nK1xuICAgICAgJzxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwie3tpZH19XCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwie3t2YWx1ZX19XCI+Jm5ic3A7Jm5ic3A7e3t1bml0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj4nO1xuXG52YXIgQVJSQVlfSU5QVVRfVEVNUExBVEUgPVxuICAnPGRpdiBjbGFzcz1cImNvbC1sZy02XCI+PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICc8bGFiZWwgZm9yPVwie3tpZH19XCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+e3tsYWJlbH19PC9sYWJlbD4nK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj4nK1xuICAgICAgJ3t7aW5wdXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2PjwvZGl2Pic7XG5cbnZhciB0YWJIZWFkZXIgPSAnPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIGlkPVwiaW5wdXRfcGlsbHNcIj4nO1xudmFyIGNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+JztcblxudmFyIHRyZWVIZWFkZXIgPSAnPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCIgaWQ9XCJ0cmVlLWFjY29yZGlvblwiPic7XG52YXIgVFJFRV9QQU5FTF9URU1QTEFURSA9ICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPicrXG4gICAgICAgICAgICAnPGg0IGNsYXNzPVwicGFuZWwtdGl0bGVcIj4nK1xuICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFjY29yZGlvbi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9XCIjdHJlZS1hY2NvcmRpb25cIiBocmVmPVwiI2NvbGxhcHNle3tpZH19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJ3t7dGl0bGV9fScrXG4gICAgICAgICAgICAgICAgJzwvYT4nK1xuICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY29sbGFwc2V7e2lkfX1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPnt7Ym9keX19PC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICc8L2Rpdj4nO1xuXG52YXIgaW5wdXRzID0ge307XG5cbi8vIGZvciB3ZWF0aGVyIGRhdGFcbnZhciBjb2xzID0gW107XG5cbnZhciBtYXAgPSBudWxsO1xuXG4vKipcbiAqIE9wdGlvbnMgOlxuICogICBtb2RlbCAtIHR5cGUgb2YgbW9kZWwgdG8gYXBwZW5kIHRvXG4gKiAgIGxhYmVsIC0gYXR0cmlidXRlIGxhYmVsXG4gKiAgIHZhbHVlIC0gZGVmYXVsdCB2YWx1ZVxuICogICBkZXNjcmlwdGlvbiAtIGRlc2NyaXB0aW9uIG9mIGF0dHJpYnV0ZVxuICogICB1bml0cyAtIGF0dHJpYnV0ZSB1bml0c1xuICovXG5mdW5jdGlvbiBfYWRkSW5wdXQob3B0aW9ucykge1xuICBpZiggIWlucHV0c1tvcHRpb25zLm1vZGVsXSApIGlucHV0c1tvcHRpb25zLm1vZGVsXSA9IFtdO1xuICBpbnB1dHNbb3B0aW9ucy5tb2RlbF0ucHVzaChvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIHZhciB0YWJsZSA9ICc8ZGl2IHN0eWxlPVwicGFkZGluZy10b3A6MjVweFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHRcIiBpZD1cImxvYWQtd2VhdGhlci1idG5cIj48aSBjbGFzcz1cImljb24tdXBsb2FkLWFsdFwiPjwvaT4gVXBsb2FkPC9hPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgaWQ9XCJ3ZWF0aGVyLWlucHV0LXRvZ2dsZVwiPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkF2ZXJhZ2VzPC9idXR0b24+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5BY3R1YWw8L2J1dHRvbj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItcGFuZWxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tdG9wOjIwcHhcIj48L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1wYW5lbFwiPicrXG4gICAgICAgICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxMHB4O2NvbG9yOiM4ODhcIj5TZWxlY3QgbG9jYXRpb24gdG8gc2V0IHRoZSBhdmVyYWdlIHdlYXRoZXIgZGF0YTwvZGl2PicrXG4gICAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZCB3ZWF0aGVyLXRhYmxlXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjIwcHhcIj4nO1xuXG4gIHRhYmxlICs9IFwiPHRyPlwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdGFibGUgKz0gXCI8dGQ+XCIrY29sc1tpXStcIjwvdGQ+XCI7XG4gIH1cbiAgdGFibGUgKz0gXCI8L3RyPlwiO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgdGFibGUgKz0gXCI8dHI+XCI7XG4gICAgZm9yKCB2YXIgaiA9IDA7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgaWYoIGogPT0gMCApIHtcbiAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrKGkrMSkrXCI8L3RkPlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdmb3JtLWNvbnRyb2wnIGlkPSdpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbStcIicgdHlwZT0ndGV4dCcgLz48L3RkPlwiO1xuICAgICAgfVxuICAgIH1cbiAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gIH1cbiAgcmV0dXJuIHRhYmxlKyc8L3RhYmxlPjxkaXYgaWQ9XCJhdmVyYWdlLXdlYXRoZXItY2hhcnRcIj48L2Rpdj48L2Rpdj4nO1xuXG59XG5cbmZ1bmN0aW9uIF9zZXRXZWF0aGVyRGF0YSgpIHtcbiAgdmFyIGxsID0gYXBwLnFzKFwibGxcIik7XG4gIGlmKCBsbCApIHtcbiAgICBsbCA9IGxsLnNwbGl0KFwiLFwiKTtcbiAgICBfcXVlcnlXZWF0aGVyRGF0YShsbFswXSwgbGxbMV0sIGZ1bmN0aW9uKCkge1xuICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChcIk5vdCBTZXRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3F1ZXJ5V2VhdGhlckRhdGEobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3dlYXRoZXItZGF0YS1xdWVyeScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIHJlc3BzKys7XG4gICAgICBpZiggcmVzcHMgPT0gMiAmJiBjYWxsYmFjayApIGNhbGxiYWNrKCk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciB0YWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgICAgZm9yKCB2YXIgaiA9IDE7IGogPCB0YWJsZS5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittKS52YWwodGFibGUucm93c1tpXS5jW2pdID8gdGFibGUucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVBdmVyYWdlQ2hhcnQoKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIGVycm9yID0gZmFsc2U7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRhYmxlLnJvd3NbMF0gPT0gbnVsbCApIHtcbiAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICBhbGVydChcIkludmFsaWQgbG9jYXRpb24gc2VsZWN0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIga2V5ID0gdGFibGUuY29sc1tpXS5pZDtcbiAgICAgIGlmKCBrZXkgPT09ICdtYXhhd3MnICkga2V5ID0gJ21heEFXUyc7XG5cbiAgICAgICQoXCIjaW5wdXQtc29pbC1cIitrZXkpLnZhbCh0YWJsZS5yb3dzWzBdLmNbaV0udik7XG4gICAgfVxuXG4gICAgaWYoICFlcnJvciApIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChsbmcrXCIsIFwiK2xhdCtcIiA8YSBocmVmPSdcIit3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jLiovLCcnKStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiP2xsPVwiK2xuZytcIixcIitsYXQrXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+PC9hPlwiKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXZlcmFnZUNoYXJ0KCkge1xuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV0gPSB7fTtcbiAgICBmb3IoIHZhciBqID0gMTsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICB2YXIgdmFsID0gJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbSkudmFsKCk7XG4gICAgICBpZiggdmFsICYmIHZhbC5sZW5ndGggPiAwICkgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV1bY29sc1tqXV0gPSBwYXJzZUludCh2YWwpO1xuICAgICAgZWxzZSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXVtjb2xzW2pdXSA9IDA7XG4gICAgfVxuICB9XG4gIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSB3ZWF0aGVyQ2hhcnQuY3JlYXRlKCQoJyNhdmVyYWdlLXdlYXRoZXItY2hhcnQnKVswXSwgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEpO1xufVxuXG5mdW5jdGlvbiBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKCkge1xuICBpZiggIW1hcCApIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKHt9KTtcblxuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5vbignY2xpY2snLCBfZ2V0TG9jYXRpb24pO1xuXG5cbiAgICAvLyB3YWl0IGZvciB0aGUgbW9kYWwgdG8gaW5pdFxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBvZmZsaW5lTW9kZSApIHJldHVybjtcblxuICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCgkKFwiI2dtYXBcIilbMF0sIHtcbiAgICAgICAgY2VudGVyIDogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygzNSwgLTEyMSksXG4gICAgICAgIHpvb206IDUsXG4gICAgICAgIG1hcFR5cGVJZCA6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG4gICAgICB9KTtcblxuICAgICAgdmFyIGRlZmF1bHRTdHlsZSA9IHtcbiAgICAgICAgICAgIHBvbHlnb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yICAgOiBcIiMwMDAwRkZcIixcbiAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eSA6IDAuNSxcbiAgICAgICAgICAgICAgZmlsbENvbG9yICAgICA6ICcjRkVGRUZFJyxcbiAgICAgICAgICAgICAgZmlsbE9wYWNpdHkgICA6IDAuMlxuICAgICAgICAgICAgfSxcbiAgICAgIH07XG5cblxuICAgICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBzZWxlY3Q6ICdib3VuZGFyeScsXG4gICAgICAgICAgICBmcm9tOiAnMWhWOXZRRzNTYzBKTFBkdUZwV0p6dGZMSy1leDZjY3lNZ19wdEVfcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0eWxlczogW2RlZmF1bHRTdHlsZV0sXG4gICAgICAgICAgc3VwcHJlc3NJbmZvV2luZG93cyA6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIHZhciBmdXNpb25MYXllciA9IG5ldyBnb29nbGUubWFwcy5GdXNpb25UYWJsZXNMYXllcihkZWZhdWx0T3B0aW9ucyk7XG4gICAgICBmdXNpb25MYXllci5vcGFjaXR5ID0gLjg7XG4gICAgICBmdXNpb25MYXllci5zZXRNYXAobWFwKTtcblxuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBhbGVydCgnWW91IG11c3QgY2xpY2sgb24gYSBnZW9tZXRyeSB0byBjYWNoZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZnVzaW9uTGF5ZXIsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIG9mZmxpbmUuY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gc2V0dXAgaW5wdXQgZm9yIGNsZWFyaW5nIGNhY2hlXG4gICAgICAgICAgJCgnI2NsZWFyLWNhY2hlZC10aWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIG9mZmxpbmUuY2xlYXJDYWNoZSgpO1xuICAgICAgICAgICAgICBvZmZsaW5lLnJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICBvZmZsaW5lLnJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuXG4gICAgfSw1MDApO1xuICB9IGVsc2Uge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcblxuICAgIC8vIHdlIHNlZW0gdG8gYmUgaGFuZ2luZyBzb21ldGltZXMuLi4uXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsIFwicmVzaXplXCIpO1xuICAgIH0sIDUwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dldExvY2F0aW9uKCkge1xuICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzaG93UG9zaXRpb24pO1xuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5hZGRDbGFzcyhcImJ0bi13YXJuaW5nXCIpO1xuICB9IGVsc2V7XG4gICAgd2luZG93LmFsZXJ0KFwiR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXIuXCIpO1xuICB9XG4gIGZ1bmN0aW9uIHNob3dQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5yZW1vdmVDbGFzcyhcImJ0bi13YXJuXCIpLmFkZENsYXNzKFwiYnRuLXN1Y2Nlc3NcIik7XG4gICAgbWFwLnNldFpvb20oMTApO1xuICAgIG1hcC5zZXRDZW50ZXIobmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpKTtcbiAgICAvL19xdWVyeVdlYXRoZXJEYXRhKHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlSW5wdXRzKGksIHR5cGUsIHByZWZpeCwgbmFtZSwgYXR0cnMpIHtcbiAgdmFyIGlkID0gcHJlZml4Lmxlbmd0aCA+IDAgPyBwcmVmaXgrJy0nK25hbWUgOiAnaW5wdXQtJytuYW1lO1xuICB2YXIgaW5wdXQgPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cIm1hcmdpbi1sZWZ0OicrKGkqMjApKydweDttYXJnaW4tdG9wOjBweDttYXJnaW4tcmlnaHQ6NXB4XCI+JztcblxuICB2YXIgdHJlZWJvZHkgPSBcIlwiO1xuXG4gIGlmKCAhKGkgPT0gMSkgKSB7XG4gICAgICBpZiggaSAhPSAwICkgaW5wdXQgKz0gJzxsYWJlbCBmb3I9XCInK2lkKydcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj4nK25hbWUgKyc8L2xhYmVsPic7XG4gICAgICBpbnB1dCArPSAnPGRpdj4nO1xuICB9XG5cblxuICAgICAgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgJiYgaSA9PSAxICApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG4gICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIHRyZWVib2R5ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICkge1xuICAgICAgaWYoIGF0dHJzLmRlc2NyaXB0aW9uICkgaW5wdXQgKz0gJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPicrYXR0cnMuZGVzY3JpcHRpb24rJzwvcD4nO1xuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgaW5wdXQgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCAodHlwZW9mIGF0dHJzLnZhbHVlID09ICdudW1iZXInIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJykgJiYgaSA9PSAxICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcblxuICAgICAgdHJlZWJvZHkgKz1cbiAgICAgICAgICAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJytcbiAgICAgICAgICAodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrJ1wiIGlkPVwiJytcbiAgICAgICAgICBpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICAgICAgKyhhdHRycy51bml0cyA/IGF0dHJzLnVuaXRzIDogJycpKyc8L2Rpdj4nO1xuXG4gIH0gZWxzZSBpZiAoICB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdudW1iZXInICkge1xuXG4gICAgaW5wdXQgKz0gJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICdcbiAgICAgICAgICArKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlK1xuICAgICAgICAgICAnXCIgaWQ9XCInK2lkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgKyhhdHRycy51bml0cyA/IGF0dHJzLnVuaXRzIDogJycpKyc8L2Rpdj4nO1xuXG4gICAgaWYoIGF0dHJzLmRlc2NyaXB0aW9uICkgaW5wdXQgKz0gJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPicrYXR0cnMuZGVzY3JpcHRpb24rJzwvcD4nO1xuICB9XG5cbiAgaWYoICEoaSA9PSAxIC8qJiYgdHlwZSA9PSAndHJlZScqLykgKSB7XG4gICAgICBpbnB1dCArPSAnPC9kaXY+PC9kaXY+JztcbiAgfSBlbHNlIHtcbiAgICAgIGlucHV0ICs9IFRSRUVfUEFORUxfVEVNUExBVEVcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97e2lkfX0vZyxpZClcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e3RpdGxlfX0nLG5hbWUrXCIgPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODg7Zm9udC1zaXplOjEycHgnPiAtIFwiK2F0dHJzLmRlc2NyaXB0aW9uK1wiPC9zcGFuPlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7Ym9keX19Jyx0cmVlYm9keSkrJzwvZGl2PidcbiAgfVxuXG4gIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKGVsZSkge1xuICB3ZWF0aGVyRmlsZVJlYWRlci5pbml0KGFwcCk7XG4gIHZhciBtb2RlbCwgbSwgYXR0ciwgY29uZmlnO1xuXG4gIHZhciBpbnB1dHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkpO1xuXG4gIGlucHV0c1snc2V0dXAnXSA9IHt9O1xuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBtID0gaW5wdXRzW21vZGVsXTtcbiAgICBmb3IoIGF0dHIgaW4gbSApIHtcbiAgICAgIGNvbmZpZyA9IG1bYXR0cl07XG5cbiAgICAgIGlmKCB0eXBlb2YgY29uZmlnID09ICdvYmplY3QnICkge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyLFxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogY29uZmlnLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHZhbHVlICAgICAgIDogY29uZmlnLnZhbHVlLFxuICAgICAgICAgIHVuaXRzICAgICAgIDogY29uZmlnLnVuaXRzXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0clxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIGlmKCBtb2RlbCA9PSBcInBsYW50YXRpb25fc3RhdGVcIiApIGNvbnRpbnVlO1xuXG4gICAgdGFiSGVhZGVyICs9ICc8bGk+PGEgaHJlZj1cIiNpbnB1dHNfJyttb2RlbCsnXCIgaWQ9XCJ0YWJfaW5wdXRzXycrbW9kZWwrJ1wiIGRhdGEtdG9nZ2xlPVwicGlsbFwiPidcbiAgICAgICAgICAgICAgICArbW9kZWwuc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKSttb2RlbC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSsnPC9hPjwvbGk+JztcbiAgICB2YXIgYXR0cmlidXRlcyA9IGlucHV0c1ttb2RlbF07XG5cbiAgICBjb250ZW50ICs9ICcgPGRpdiBjbGFzcz1cInRhYi1wYW5lIGZhZGVcIiBpZD1cImlucHV0c18nK21vZGVsKydcIj4nO1xuXG4gICAgdmFyIHJvdzEgPSBcIlwiO1xuICAgIHZhciByb3cyID0gXCI8ZGl2IGNsYXNzPSdjb2wtbGctNj5cIjtcblxuICAgIGlmKCBtb2RlbCA9PSAnd2VhdGhlcicgKSB7XG4gICAgICBjb250ZW50ICs9IF9jcmVhdGVXZWF0aGVySW5wdXRzKCk7XG4gICAgfSBlbHNlIGlmKCBtb2RlbCA9PSAnc2V0dXAnICkge1xuICAgICAgY29udGVudCArPSBTRVRVUF9URU1QTEFURTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ICs9IHRyZWVIZWFkZXI7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBnb29nbGUgZHJpdmUgYnRuIGZyb20gdHJlZXNcbiAgICAgICAgaWYoIG1vZGVsID09J3RyZWUnICkge1xuICAgICAgICAgIGNvbnRlbnQgKz0gX2NyZWF0ZVRyZWVJbnB1dChtb2RlbCwgaW5wdXRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJycsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKTtcbiAgICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICAgIH1cblxuXG4gICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgfVxuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICB0YWJIZWFkZXIgKz0gXCI8L3VsPlwiO1xuXG4gIGVsZS5odG1sKHRhYkhlYWRlcitcIjxkaXYgY2xhc3M9J2Zvcm0taG9yaXpvbnRhbCc+XCIrY29udGVudCtcIjwvZGl2PlwiKTtcblxuICAvLyBydW4gdGhlIG1vZGVsIHdoZW5ldmVyIHNvbWUgaGl0cyAnZW50ZXInXG4gIGVsZS5maW5kKCdpbnB1dCcpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSl7XG4gICAgaWYoIGUud2hpY2ggPT0gMTMgKSBhcHAucnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIGxvYWRpbmcgYSB0cmVlXG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtbG9hZFwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93TG9hZFRyZWVQYW5lbCgpO1xuICB9KTtcbiAgZWxlLmZpbmQoXCIjZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2RyaXZlLnNob3dTYXZlVHJlZVBhbmVsKCk7XG4gIH0pO1xuXG4gIC8vIHNldCB0cmVlIGlucHV0IGhhbmRsZXJzXG4gICQoXCIjY29tcGFyZS10cmVlc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGlmKCAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgJChcIiNzaW5nbGUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjY29tcGFyZS10cmVlLWNvbnRlbnRcIikuc2hvdygpO1xuICAgICAgJChcIiN0cmVlLXN1Yi1tZW51XCIpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNzaW5nbGUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjY29tcGFyZS10cmVlLWNvbnRlbnRcIikuaGlkZSgpO1xuICAgICAgJChcIiN0cmVlLXN1Yi1tZW51XCIpLnNob3coKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNldCBwaWxsIGNsaWNrIGhhbmRsZXJzXG4gICQoJyNpbnB1dF9waWxscyBhJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgJCh0aGlzKS50YWIoJ3Nob3cnKVxuICB9KTtcbiAgJCgnI3RhYl9pbnB1dHNfd2VhdGhlcicpLnRhYignc2hvdycpO1xuXG4gICQoJy5zZWxlY3Qtd2VhdGhlci1sb2NhdGlvbicpLm9uKCdjbGljaycsIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24pO1xuXG5cbiAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuICAkKCcjbG9hZC13ZWF0aGVyLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAkKFwiI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0bi5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICBpZiggJCh0aGlzKS5odG1sKCkgPT0gJ0F2ZXJhZ2VzJyApIHtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdlYXRoZXIuc2V0KGFwcC5nZXRNb2RlbCgpKTtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgaWYoIHdlYXRoZXJBdmVyYWdlQ2hhcnQgKXtcbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSB3ZWF0aGVyQ2hhcnQuY3JlYXRlKCQoJyNhdmVyYWdlLXdlYXRoZXItY2hhcnQnKVswXSwgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEpO1xuICAgIH1cbiAgfSk7XG5cbiAgX3NldFdlYXRoZXJEYXRhKCk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cykge1xuICB2YXIgY29udGVudCA9IFwiXCI7XG4gIGNvbnRlbnQgKz0gR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJzaW5nbGUtdHJlZS1jb250ZW50XCI+JztcbiAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG5cbiAgY29udGVudCArPSAnPGRpdiBpZD1cImNvbXBhcmUtdHJlZS1jb250ZW50XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAnPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCI+JytcbiAgICAgICAgICAnPGxpIGNsYXNzPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiN0cmVlMVwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAxPC9hPjwvbGk+JytcbiAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIiN0cmVlMlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VHJlZSAyPC9hPjwvbGk+JytcbiAgICAgICAgJzwvdWw+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidHJlZTFcIj4nK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MTBweFwiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MScsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUyXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIiA+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkN1c3RvbTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IFRyZWU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgIF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJ3QyJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAnPC9kaXY+JztcblxuICByZXR1cm4gY29udGVudDtcbn1cblxuXG5yZXR1cm4ge1xuICBjcmVhdGUgOiBjcmVhdGUsXG4gIHVwZGF0ZUF2ZXJhZ2VDaGFydDogdXBkYXRlQXZlcmFnZUNoYXJ0XG59O1xuXG59O1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG52YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLy8gU3BlY2lhbCBTYXVjZS4uLlxuLy8gYmFzaWNhbGx5IHRoZSBjb2RlIGxvYWRlZCBmcm9tIEdpdEh1YiBleHBlY3RzIHRoZSBmb2xsb3dpbmcgdG8gZXhpc3RzIGluIHRoZSB3aW5kb3cgc2NvcGVcbi8vICAgbTNQR0lPXG4vLyAgICAgLSByZWFkQWxsQ29udGFudHNcbi8vICAgICAtIHJlYWRXZWF0aGVyXG4vLyAgICAgLSBkdW1wXG4vLyAgICAgLSByZWFkRnJvbUlucHV0c1xuLy8gU28gd2UgaW5qZWN0IGZ1bmN0aW9ucyB0aGF0IGludGVyYWN0IHcvIG91ciBVSSwgbW9kZWwgaW4gbm8gd2F5IGNhcmVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgbW9kZWwuZGVidWcgPSB0cnVlO1xuXG4gICAgaWYoICFtb2RlbC5wbGFudGF0aW9uICkgbW9kZWwucGxhbnRhdGlvbiA9IHt9O1xuICAgIHRoaXMucmVhZEFsbENvbnN0YW50cyhtb2RlbC5wbGFudGF0aW9uKTtcblxuICAgIGlmKCAhbW9kZWwud2VhdGhlciApIG1vZGVsLndlYXRoZXIgPSB7fTtcbiAgICBpZiggIW1vZGVsLm1hbmFnZSApIG1vZGVsLm1hbmFnZSA9IHt9O1xuICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gICAgdGhpcy5yZWFkV2VhdGhlcihtb2RlbC53ZWF0aGVyLCBtb2RlbC5tYW5hZ2UsIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcblxuICAgIGRlbGV0ZSB0aGlzLm1vZGVsLm1hbmFnZS5jb3BwaWNlRGF0ZXM7XG4gIH0sXG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnBsYW50YXRpb24pIHtcbiAgICAgIC8vICAgIHBsYW50YXRpb25ba2V5XSA9IHRoaXMubW9kZWwucGxhbnRhdGlvbltrZXldO1xuICAgICAgLy99XG5cbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gdGhpcy5tb2RlbC50cmVlO1xuXG4gICAgICAvLyBzZXR1cCBzZWVkbGluZyBUcmVlXG4gICAgICAvLyBUT0RPOiBoYXJkY29kZWQgZm9yIG5vdywgdGhpcyBzaG91bGRuJ3QgYmVcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMubW9kZWwudHJlZSk7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5zdGVtc1BlclN0dW1wID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnBmcy5zdGVtQ250ID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnJvb3RQID0ge1xuICAgICAgICAgIExBSVRhcmdldCA6IDEwLFxuICAgICAgICAgIGVmZmljaWVuY3kgOiAwLjYsXG4gICAgICAgICAgZnJhYyA6IDAuMDFcbiAgICAgIH07XG4gIH0sXG5cbiAgcmVhZFdlYXRoZXIgOiBmdW5jdGlvbih3ZWF0aGVyTWFwLCBtYW5hZ2UsIGN1c3RvbVdlYXRoZXJNYXApIHtcbiAgICAgIHZhciBkYXRlUGxhbnRlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVQbGFudGVkICYmIGRhdGVQbGFudGVkICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hbmFnZS5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlQ29wcGljZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZUNvcHBpY2VkICYmIGRhdGVDb3BwaWNlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVDb3BwaWNlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVDb3BwaWNlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIERhdGVGaW5hbEhhcnZlc3QgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICAgICAgaWYgKERhdGVGaW5hbEhhcnZlc3QgJiYgRGF0ZUZpbmFsSGFydmVzdCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLkRhdGVGaW5hbEhhcnZlc3QgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgeWVhcnNQZXJDb3BwaWNlID0gJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpO1xuICAgICAgaWYgKHllYXJzUGVyQ29wcGljZSAmJiB5ZWFyc1BlckNvcHBpY2UgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgPSBwYXJzZUludCgkKFwiI2lucHV0LW1hbmFnZS1jb3BwaWNlSW50ZXJ2YWxcIikudmFsKCkpO1xuICAgICAgfVxuXG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgbW9udGggOiAoaSArIDEpXG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgICAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGNvbmZpZy5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICB2YXIgYyA9IGNvbmZpZy5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICAgICAgaXRlbVtjXSA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgbSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLm5yZWwgPSBpdGVtLnJhZCAvIDAuMDAzNjtcblxuICAgICAgICAgIHdlYXRoZXJNYXBbbV0gPSBpdGVtO1xuICAgICAgfVxuXG4gICAgICBpZiggdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBmb3IoIHZhciBkYXRlIGluIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ubnJlbCA9IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ucmFkIC8gMC4wMDM2O1xuICAgICAgICAgICAgICAvL2N1c3RvbVdlYXRoZXJNYXBbZGF0ZV0gPSBjdXN0b21fd2VhdGhlcltkYXRlXTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2VhdGhlck1hcDtcbiAgfSxcblxuICAvLyByZWFkIGEgdmFsdWUgZnJvbSB0aGUgaW5wdXRcbiAgLy8gaXQgaGFzIGEgJywnIGlzIHNldCBmb3IgdmFyaWF0aW9uXG4gIF9yZWFkVmFsIDogZnVuY3Rpb24oZWxlKSB7XG4gICAgICB2YXIgdmFsID0gZWxlLnZhbCgpO1xuICAgICAgaWYoIHZhbC5tYXRjaCgvXFxkKi1cXGQqLVxcZCokLykgKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH0gZWxzZSBpZiggdmFsLm1hdGNoKC8uKiwuKi8pICkge1xuICAgICAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHMvZywnJykuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIHZhciBpZCA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZSgvXmlucHV0LS8sJycpLnJlcGxhY2UoLy0vZywnLicpO1xuICAgICAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF0gPSBbXTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXS5wdXNoKHBhcnNlRmxvYXQodmFsW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKTtcbiAgfSxcblxuICBkdW1wIDogZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBpbiBhcHBcbiAgfSxcblxuICByZWFkRnJvbUlucHV0cyA6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmVhZCBzb2lsXG4gICAgICB0aGlzLm1vZGVsLnNvaWwgPSB7fTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5tYXhBV1MgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1tYXhBV1NcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3cG93ZXIgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd3Bvd2VyXCIpKTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5zd2NvbnN0ID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3djb25zdFwiKSk7XG5cbiAgICAgIHRoaXMubW9kZWwuc2V0dXAgPSB7XG4gICAgICAgIGRheXNfaW5faW50ZXJ2YWwgOiB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc2V0dXAtZGF5c19pbl9pbnRlcnZhbFwiKSlcbiAgICAgIH07XG5cbiAgICAgIC8vIHJlYWQgbWFuYWdlXG4gICAgICB0aGlzLm1vZGVsLm1hbmFnZSA9IHtcbiAgICAgICAgICBjb3BwaWNlIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgZWxlcyA9ICQoXCIubWFuYWdlXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwubWFuYWdlW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LW1hbmFnZS1cIiwgXCJcIildID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb25cbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uID0ge307XG4gICAgICBlbGVzID0gJChcIi5wbGFudGF0aW9uXCIpO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKGVsZXNbaV0pO1xuICAgICAgICAgIHRoaXMubW9kZWwucGxhbnRhdGlvbltlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1wbGFudGF0aW9uLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgdHJlZVxuICAgICAgdmFyIHRyZWVJbnB1dHMgPSAkKFwiLnRyZWVcIik7XG4gICAgICB0aGlzLm1vZGVsLnRyZWUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRyZWVJbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJCh0cmVlSW5wdXRzW2ldKTtcblxuICAgICAgICAgIHZhciBwYXJ0cyA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXRyZWUtXCIsIFwiXCIpLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0pXG4gICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0ge307XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV1bcGFydHNbMV1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uIHN0YXRlXG4gICAgICBpZiggIXRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSApIHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLmdldERhdGFNb2RlbCgpLnBsYW50YXRpb25fc3RhdGUudmFsdWUgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlW2tleV0gPSAtMTtcbiAgICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgaXMgdGhlIHNuYXBzaG90IHdlIHNhdmUgdG8gZ29vZ2xlIGRyaXZlXG4gIGV4cG9ydFNldHVwIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcbiAgICAgIHRoaXMucmVhZFdlYXRoZXIoW10sIHt9LCB7fSk7XG5cbiAgICAgIHZhciBleCA9IHtcbiAgICAgICAgICB3ZWF0aGVyIDogdGhpcy5tb2RlbC53ZWF0aGVyLFxuICAgICAgICAgIGN1c3RvbV93ZWF0aGVyIDogdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcixcbiAgICAgICAgICBzZXR1cCA6IHRoaXMubW9kZWwuc2V0dXAsXG4gICAgICAgICAgdHJlZSA6IHRoaXMubW9kZWwudHJlZSxcbiAgICAgICAgICBwbGFudGF0aW9uIDogdGhpcy5tb2RlbC5wbGFudGF0aW9uLFxuICAgICAgICAgIG1hbmFnZSA6IHRoaXMubW9kZWwubWFuYWdlLFxuICAgICAgICAgIHNvaWwgOiB0aGlzLm1vZGVsLnNvaWwsXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgcGxhbnRhdGlvbl9zdGF0ZSA6IHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSxcbiAgICAgICAgICBjb25maWcgOiB7XG4gICAgICAgICAgICAgIGNoYXJ0VHlwZUlucHV0IDogJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgICAgZGF5c1RvUnVuIDogdGhpcy5hcHAuZGF5c1RvUnVuKCksXG4gICAgICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbiA6ICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKCksXG4gICAgICAgICAgICAgIGxvYWRlZFRyZWUgOiAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbCgpLFxuICAgICAgICAgICAgICB2ZXJzaW9uIDogdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpID8gdGhpcy5hcHAucXMoXCJ2ZXJzaW9uXCIpIDogXCJtYXN0ZXJcIlxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYnkgZGVmYXVsdCB0aGUgcmVhZCBmdW5jdGlvbiBzZXQgdGhlIHZhcmlhdGlvbnMgdmFyaWFibGVzIGJ1dCBvbmx5XG4gICAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCwgc2V0IHRoZSB2YXJpYXRpb24gcGFyYW1zIHRvIHRoZWlyIGNvcnJlY3QgdmFsdWVzXG4gICAgICBmb3IoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgIHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgICAgICAgdmFyIHBhcmFtID0gZXg7XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGgtMTsgaSsrICkge1xuICAgICAgICAgICAgICBwYXJhbSA9IHBhcmFtW3BhcnRzW2ldXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyYW1bcGFydHNbcGFydHMubGVuZ3RoLTFdXSA9IHRoaXMubW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV4O1xuICB9LFxuICBsb2FkVHJlZSA6IGZ1bmN0aW9uKHRyZWUpIHtcbiAgICAgIGZvciAoIHZhciByb290S2V5IGluIHRyZWUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRyZWVbcm9vdEtleV0gIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSkudmFsKHRyZWVbcm9vdEtleV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAoIHZhciBjaGlsZEtleSBpbiB0cmVlW3Jvb3RLZXldKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5ICsgXCItXCIgKyBjaGlsZEtleSkudmFsKHRyZWVbcm9vdEtleV1bY2hpbGRLZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfSxcbiAgbG9hZFNldHVwIDogZnVuY3Rpb24oZmlsZWlkLCBzZXR1cCwgaXNSdCkge1xuXG4gICAgICAvLyBsb2FkIGNvbmZpZ1xuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dCkge1xuICAgICAgICAgIHRoaXMuY2hhcnRzLnVuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2hhcnRzLnNlbGVjdChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbik7XG4gICAgICB9XG4gICAgICBpZiggc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUpLnBhcmVudCgpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLnNldHVwICYmIHNldHVwLnNldHVwLmRheXNfaW5faW50ZXJ2YWwgKSB7XG4gICAgICAgICQoJyNpbnB1dC1zZXR1cC1kYXlzX2luX2ludGVydmFsJykudmFsKHNldHVwLnNldHVwLmRheXNfaW5faW50ZXJ2YWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBsb2FkIHdlYXRoZXJcbiAgICAgIGlmKCBBcnJheS5pc0FycmF5KHNldHVwLndlYXRoZXIpICkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC53ZWF0aGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpbmNJbmRleCA9IGZhbHNlLCBpbmRleDtcbiAgICAgICAgaWYoIHNldHVwLndlYXRoZXJbMF0gIT09IHVuZGVmaW5lZCB8fCBzZXR1cC53ZWF0aGVyWycwJ10gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICBpbmNJbmRleCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBzZXR1cC53ZWF0aGVyICkge1xuICAgICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbW9udGgnKSBjb250aW51ZTtcblxuXG4gICAgICAgICAgICAgICAgaWYoIGluY0luZGV4ICkgaW5kZXggPSAocGFyc2VJbnQoaSkrMSkrJyc7XG4gICAgICAgICAgICAgICAgZWxzZSBpbmRleCA9IGkrJyc7XG5cbiAgICAgICAgICAgICAgICBpZiggaW5kZXgubGVuZ3RoID09PSAxICkgaW5kZXggPSAnMCcraW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaW5kZXgpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpbmRleCkudmFsKFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiggc2V0dXAuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHNldHVwLmN1c3RvbV93ZWF0aGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgY2hhcnRcbiAgICAgIHRoaXMuaW5wdXRGb3JtLnVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuXG4gICAgICAvLyBsb2FkIHRyZWVcbiAgICAgIHRoaXMubG9hZFRyZWUoc2V0dXAudHJlZSk7XG5cbiAgICAgIC8vIGxvYWQgcGxhbnRpbmcgcGFyYW1zXG4gICAgICAvLyBOb3cgcGFydCBvZiBtYW5hZ2UuLi4uXG4gICAgICAvLyBmb1xuICAgICAgaWYgKHNldHVwLm1hbmFnZSkge1xuICAgICAgICAgIHZhciBtYXAgPSB7XG4gICAgICAgICAgICAgIFwiZGF0ZVBsYW50ZWRcIiA6IFwiRGF0ZVBsYW50ZWRcIixcbiAgICAgICAgICAgICAgXCJkYXRlQ29wcGljZWRcIiA6IFwiRGF0ZUNvcHBpY2VkXCIsXG4gICAgICAgICAgICAgIFwieWVhcnNQZXJDb3BwaWNlXCIgOiBcIkNvcHBpY2VJbnRlcnZhbFwiXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC5tYW5hZ2UpIHtcbiAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IGtleTtcbiAgICAgICAgICAgICAgaWYoIG1hcFtrZXldICkgbmV3S2V5ID0gbWFwW2tleV07XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR1cC5tYW5hZ2Vba2V5XSA9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAubWFuYWdlW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtXCIgKyBuZXdLZXkpLnZhbChzZXR1cC5tYW5hZ2Vba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0aGlzIHZhbHVlIGlzIGRlcHJlY2F0ZWQsIHNldCB0byBuZXcgaW5wdXRcbiAgICAgIGlmKCBzZXR1cC5jb25maWcuZGF5c1RvUnVuICkge1xuICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2V0dXAubWFuYWdlLmRhdGVQbGFudGVkIHx8IHNldHVwLm1hbmFnZS5EYXRlUGxhbnRlZCk7XG4gICAgICAgICAgZCA9IG5ldyBEYXRlKG5ldyBEYXRlKGQpLnNldE1vbnRoKGQuZ2V0TW9udGgoKStwYXJzZUludChzZXR1cC5jb25maWcuZGF5c1RvUnVuKSkpO1xuICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKGQudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgfVxuXG5cbiAgICAgIC8vIGxvYWQgcmVzdFxuICAgICAgdmFyIGlucHV0cyA9IFsgXCJwbGFudGF0aW9uXCIsIFwic29pbFwiLCBcIm1hbmFnZVwiIF07XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwW2lucHV0c1tpXV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbWF4QVdTJykge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1zb2lsLW1heEFXU1wiKS52YWwoc2V0dXAuc29pbC5tYXhBV1MpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygc2V0dXBbaW5wdXRzW2ldXVtrZXldID09ICdzdHJpbmcnICYmIHNldHVwW2lucHV0c1tpXV1ba2V5XS5tYXRjaCgvLipULipaJC8pICkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5hcHAucnVuTW9kZWwoaXNSdCk7XG4gIH1cbn07XG4iLCJcbiAgLy8gbXVzdCBpbnN0YWxsIHRoaXMgZm9yIG5hdGl2ZSBwaG9uZWdhcCBzdXBwb3J0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvbmVnYXAtYnVpbGQvQ2hpbGRCcm93c2VyXG5cbnZhciB3aW4gPSBudWxsO1xuXG4vKiB0aGUga2V5IGZvciByZWZyZXNoIFRva2VuIGluIGxvY2FsIFN0b3JhZ2UgKi9cbnZhciB0b2tlbktleSA9ICdyZWZyZXNoX3Rva2VuJztcblxuLyogc3RvcmVzIHRoZSBhY2Nlc3NUb2tlbiBhZnRlciByZXRyaWV2YWwgZnJvbSBnb29nbGUgc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW4gPSBudWxsO1xuXG4vKiBzdG9yZXMgdGhlIFRpbWUgd2hlbiBhY2Nlc3MgdG9rZW4gd2FzIGxhc3QgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlblRpbWUgPSBudWxsO1xuXG4vKiBzdG9yZXMgYWNjZXNzIFRva2VuJ3MgRXhwaXJ5IExpbWl0LiBVc2VzIDU4IG1pbi4gaW5zdGVhZCBvZiA2MCBtaW4uICovXG52YXIgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCA9IDU4ICogNjAgKiAxMDAwO1xuXG4vKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSBzdG9yaW5nIGNhbGxiYWNrIGZ1bmN0aW9uICovXG52YXIgY2FsbGJhY2tGdW5jID0gZmFsc2U7XG5cbi8vIGFyZSB3ZSBydW5uaW5nIG5hdGl2ZSBvciBicm93c2VyIG1vZGU/XG52YXIgaXNOYXRpdmUgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvXmZpbGUuKi8pID8gdHJ1ZSA6IGZhbHNlO1xuXG52YXIgQ0xJRU5UX0lEID0gaXNOYXRpdmUgP1xuICAgICAgICBcIjM0NDE5MDcxMzQ2NS1kaWltdGZlcmg0dGpiMDMxNjlia2w5bWtvcXZxMnJ1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiIDpcbiAgICAgICAgIFwiMzQ0MTkwNzEzNDY1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCI7XG5cbnZhciBBUFBfSUQgPSBcIjM0NDE5MDcxMzQ2NVwiO1xuXG52YXIgT0FVVEhfU0NPUEVTID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZSAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuaW5zdGFsbCAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSc7XG5cbi8qIGNvbmZpZyB2YWx1ZXMgZm9yIEdvb2dsZSBBUEkgKGdhcGkpICovXG52YXIgZ2FwaUNvbmZpZyA9IHtcbiAgZW5kcG9pbnQ6IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGhcIixcbiAgZW5kdG9rZW46IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuXCIsIC8vIHRva2VuIGVuZHBvaW50XG4gIHJlZGlyZWN0X3VyaSA6IFwiaHR0cDovL2xvY2FsaG9zdFwiLFxuICBjbGllbnRfc2VjcmV0IDogJzZyT1E5bDBmeW5oMTM3TVJYR0stR19aZycsXG4gIHJlc3BvbnNlX3R5cGUgOiBcImNvZGVcIixcbiAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICBzdGF0ZSA6IFwiZ2RyaXZlaW5pdFwiLFxuICBhY2Nlc3NfdHlwZSA6IFwib2ZmbGluZVwiLFxuICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcblxuICAvKiBBcyBkZWZpbmVkIGluIHRoZSBPQXV0aCAyLjAgc3BlY2lmaWNhdGlvbiwgdGhpcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWx1ZVxuICAgICAqIG9mIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIgb3IgXCJyZWZyZXNoX3Rva2VuXCIgKi9cbiAgICBncmFudFR5cGVzOiB7IEFVVEhPUklaRTogXCJhdXRob3JpemF0aW9uX2NvZGVcIiwgUkVGUkVTSDogXCJyZWZyZXNoX3Rva2VuXCIgfSxcbiB9O1xuXG4vKipcbiAqIEVudW0gZm9yIFN0YXR1cyB2YWx1ZXNcbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICpcbiAqIFNVQ0NFU1MgLSBTdWNjZXNzZnVsbHkgZGF0YSByZWNlaXZlZCBmcm9tIHNlcnZlclxuICogRVJST1IgLSBFcnJvciBvY2N1cnJlZCB3aGVuIHRyeWluZyB0byByZWNlaXZlIGZyb20gc2VydmVyXG4gKiBOT1RfREVURVJNSU5FRCAtIHVuZGV0ZXJtaW5lZFxuICovXG52YXIgc3RhdHVzID0ge1xuICAgICAgICBTVUNFU1M6IDEsXG4gICAgICAgIEVSUk9SOiAtMSxcbiAgICAgICAgTk9UX0RFVEVSTUlORUQ6IDBcbn1cblxucmVxdWVzdFN0YXR1cyA9IDA7XG5cbi8qIHN0b3JlcyB0aGUgYXV0aG9yaXphdGlvbiBDb2RlIGludGVybmFsbHkgKi9cbmF1dGhDb2RlID0gZmFsc2U7XG5cbi8qIHN0b3JlcyB0aGUgZXJyb3IgbWVzc2FnZSB3aGVuIGFuIGVycm9yIGhhcHBlbnMgZnJvbSBnb29nbGUgc2VydmVyICovXG5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcblxudmFyIGxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBjb25zb2xlLmxvZyhcIioqKk9BVVRIKioqOiBcIittc2cpO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIGF1dGhvcml6ZSB1c2VyIHVzaW5nIE9BdXRoXG4gKiBPcGVucyB1cCBBbm90aGVyIHdpbmRvdyB3aGVyZSB1c2VyIGFsbG93cyBhY2Nlc3Mgb3IgZGVuaWVzIGl0LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxCYWNrICAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBpbnZva2VkXG4gKi9cbnZhciBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsQmFjaykge1xuICBsb2coXCJhdHRlbXB0aW5nIHRvIGF1dGhvcml6ZVwiKTtcblxuICAgIHZhciBhdXRoVXJpID0gZ2FwaUNvbmZpZy5lbmRwb2ludCArICc/J1xuICAgICsgJ3Njb3BlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zY29wZSlcbiAgICArICcmJyArICdyZWRpcmVjdF91cmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSlcbiAgICArICcmJyArICdyZXNwb25zZV90eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZXNwb25zZV90eXBlKVxuICAgICsgJyYnICsgJ2NsaWVudF9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuY2xpZW50X2lkKTtcbiAgICAvLysgJyYnICsgJ3N0YXRlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zdGF0ZSlcbiAgICAvLysgJyYnICsgJ2FjY2Vzc190eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5hY2Nlc3NfdHlwZSlcbiAgICAvLysgJyYnICsgJ2FwcHJvdmFsX3Byb21wdD1mb3JjZSc7IC8vIEBUT0RPIC0gY2hlY2sgaWYgd2UgcmVhbGx5IG5lZWQgdGhpcyBwYXJhbVxuXG4gICAgY2FsbGJhY2tGdW5jID0gY2FsbEJhY2s7XG4gICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcblxuXG5cblxuICAgIGxvZyhcIm9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuXG4gICAgdHJ5IHtcblxuICAgICAgLy8gTm93IG9wZW4gbmV3IGJyb3dzZXJcbiAgICAgIHdpbiA9IHdpbmRvdy5vcGVuKGF1dGhVcmksICdfYmxhbmsnLCAnbG9jYXRpb249bm8sdG9vbGJhcj1ubycpO1xuXG4gICAgICAkKHdpbikub24oJ2xvYWRzdGFydCcsZnVuY3Rpb24oZSl7XG4gICAgICAgIGxvZyhcIkluQXBwQnJvd3NlciBsb2Fkc3RhcnRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgICBvbkF1dGhVcmxDaGFuZ2UoZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICB9KTtcblxuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIuc2hvd1dlYlBhZ2UoYXV0aFVyaSwge3Nob3dMb2NhdGlvbkJhciA6IHRydWV9KTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uQ2xvc2UgPSBvbkF1dGhDbG9zZTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uTG9jYXRpb25DaGFuZ2UgPSBvbkF1dGhVcmxDaGFuZ2U7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBsb2coXCJFcnJvciBvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcbiAgICAgIGxvZyhlKTtcbiAgICB9XG5cbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbW1lZGlhdGUpIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IGltbWVkaWF0ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBhdXRoQ29kZSA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGNhbGxiYWNrKGF1dGhDb2RlKTtcbiAgfSk7XG5cbiAgfVxufVxuXG4vKiBBdXRoIFdpbmRvdyBjbG9zZWQgKi9cbnZhciBvbkF1dGhDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQXV0aCB3aW5kb3cgY2xvc2VkXCIpO1xufTtcblxuLyogT0F1dGggU3VjY2Vzc2Z1bGx5IGRvbmUgKi9cbnZhciBvbkF1dGhTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0F1dGggU3VjY2Vzcz8nKTtcbn07XG5cbi8qKlxuICogR2V0cyBJbnZva2VkIHdoZW4gdGhlIFVSTCBjaGFuZ2VzIG9uIE9BdXRoIGF1dGhvcml6YXRpb24gcHJvY2Vzc1xuICpcbiAqIFN1Y2Nlc3MgVVJMIFBhdHRlcm46XG4gKiBcInJlZGlyZWN0X3VyaVwiICsgXCI/Y29kZT1cIiBbc2VjcmV0IGNvZGUgdmFsXVxuICpcbiAqIFN1Y2Nlc3MgU2FtcGxlIFVSTDpcbiAqIGh0dHA6Ly9sb2NhbGhvc3QvP2NvZGU9NC9XT3BSTFFmdnZoSEUwdHVNVUREcW5uNzZsQ1RULjhuWEM0SWViTUVBVXVKSlZuTDQ5Q2M4QVFHcjhjUUlcbiAqXG4gKiBEZW5pZWQgQWNjZXNzIFVSTCBQYXR0ZXJuOiBcInJlZGlyZWN0X3VyaVwiICsgP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqIERlbmllZCBBY2Nlc3MgU2FtcGxlOiBodHRwOi8vbG9jYWxob3N0Lz9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaUxvY2F0aW9uIFRoZSBVUkkgTG9jYXRpb25cbiAqL1xudmFyIG9uQXV0aFVybENoYW5nZSA9IGZ1bmN0aW9uKHVyaUxvY2F0aW9uKSB7XG4gICAgY29uc29sZS5sb2coXCJJbkFwcEJyb3dzZXIgdXJsIGNoYW5nZWQgXCIrdXJpTG9jYXRpb24pO1xuICAgIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJjb2RlPVwiKSAhPSAtMSkge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLlNVQ0NFU1M7XG5cbiAgICAgICAgLyogU3RvcmUgdGhlIGF1dGhDb2RlIHRlbXBvcmFyaWx5ICovXG4gICAgICAgIGF1dGhDb2RlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiY29kZVwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGxvZyhcIkZvdW5kIGF1dGggY29kZTogXCIrYXV0aENvZGUpO1xuXG4gICAgICAgIGdldFJlZnJlc2hUb2tlbihjYWxsYmFja0Z1bmMpO1xuXG4gICAgICAgIC8vIGNsb3NlIHRoZSBjaGlsZEJyb3dzZXJcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJlcnJvcj1cIikgIT0gLTEpICB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuRVJST1I7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImVycm9yXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgY2FsbGJhY2tGdW5jKCk7XG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG4gICAgICAgIC8vY2FsbGJhY2tGdW5jKCk7XG4gICAgfVxufTtcblxuXG4vKipcbiogR2V0cyB0aGUgUmVmcmVzaCBmcm9tIEFjY2VzcyBUb2tlbi4gVGhpcyBtZXRob2QgaXMgb25seSBjYWxsZWQgaW50ZXJuYWxseSxcbiogYW5kIG9uY2UsIG9ubHkgYWZ0ZXIgd2hlbiBhdXRob3JpemF0aW9uIG9mIEFwcGxpY2F0aW9uIGhhcHBlbnMuXG4qXG4qIEBwYXJhbSBwYXJhbU9iaiBBbiBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHBhcmFtT2JqLmF1dGhfY29kZSBUaGUgQXV0aG9yaXphdGlvbiBDb2RlIGZvciBnZXR0aW5nIFJlZnJlc2ggVG9rZW5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsIHJldHJpZXZhbCBvZiBkYXRhIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qL1xudmFyIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGNvbnNvbGUubG9nKFwiYWNjZXNzIHJlZnJlc2ggdG9rZW5cIik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgIGNvZGUgICAgICAgICA6IGF1dGhDb2RlLFxuICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaSA6IGdhcGlDb25maWcucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5BVVRIT1JJWkVcbiAgICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgZ2V0dGluZyByZWZyZXNoIHRva2VuXCIpO1xuXG4gICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgIGFjY2Vzc1Rva2VuICAgICA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgIC8qIHNldCB0aGUgZXJyb3Igb2YgZGF0YSB0byBmYWxzZSwgYXMgaXQgd2FzIHN1Y2Nlc3NmdWwgKi9cbiAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcblxuICAgICAgICAvKiBub3cgaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICBjYWxsYmFjayh7YWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbn0pO1xuICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBzaG91bGQgT05MWSBiZSBjYWxsZWQgbG9jYWxseSBmcm9tIHdpdGhpbiB0aGlzIGNsYXNzLlxuKiBSZXR1cm5zIHRoZSBSZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlLlxuKlxuKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZWZyZXNoIFRva2VuXG4qXG4qL1xudmFyIGdldFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG59O1xuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGV4dGVybmFsbHkuIEl0IHJldHJpZXZlcyB0aGUgQWNjZXNzIFRva2VuIGJ5IGF0IGZpcnN0XG4qIGNoZWNraW5nIGlmIGN1cnJlbnQgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkIG9yIG5vdC4gSWYgaXRzIG5vdCBleHBpcmVkLCBpdFxuKiBzaW1wbHkgcmV0dXJucyB0aGF0LCBvdGhlcndpc2UsIGl0IGdldHMgdGhlIHJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2VcbiogKGJ5IGludm9raW5nIGdldFRva2VuKSBhbmQgdGhlbiBjb25uZWN0aW5nIHdpdGggR29vZ2xlJ3MgU2VydmVyICh1c2luZyBPQXV0aClcbiogdG8gZ2V0IHRoZSBBY2Nlc3MgVG9rZW4uXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgQSBjYWxsQmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIGlzIHJldHJpZXZlZCBmcm9tIHRoZSBnb29nbGUncyBzZXJ2ZXIuIFRoZSBkYXRhXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGdvb2dsZSBzZXJ2ZXIgaXMgcGFzc2VkIHRvIGNhbGxiYWNrIGFzIGFyZ3MuXG4qXG4qL1xudmFyIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBhY2Nlc3MgdG9rZW5cIik7XG5cbiAgIC8qIGNoZWNrIGlmIGN1cnJlbnQgVG9rZW4gaGFzIG5vdCBleHBpcmVkIChzdGlsbCB2YWxpZCkgKi9cbiAgIGlmIChhY2Nlc3NUb2tlbiAmJiBhY2Nlc3NUb2tlbiAhPSBmYWxzZSAmJlxuICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICBjYWxsYmFjayh7IGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4gfSk7XG5cbiAgICAgICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zb2xlLmxvZyhcIkFDQ0VTUyBUT0tFTiBQQVJBTVM6IFwiK2FjY2Vzc1Rva2VuK1wiIFwiK2FjY2Vzc1Rva2VuVGltZStcIiBcIithY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KTtcblxuICAgLyogZWxzZSwgZ2V0IHRoZSByZWZyZXNoVG9rZW4gZnJvbSBsb2NhbCBzdG9yYWdlIGFuZCBnZXQgYSBuZXcgYWNjZXNzIFRva2VuICovXG4gICB2YXIgcmVmcmVzaFRva2VuID0gZ2V0VG9rZW4oKTtcblxuICAgLy8gICBjb25zb2xlLmxvZyhcIlJlZnJlc2ggVG9rZW4gPj4gXCIgKyByZWZyZXNoVG9rZW4pO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuUkVGUkVTSCxcbiAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgICAgIC8qIHNldCB0aGUgZXJyb3IgdG8gZmFsc2UgKi9cbiAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGVycm9yID8/ID4+XCIgKyB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHsgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgaWYgKGFjY2Vzc1Rva2VuICYmXG4gICAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhhY2Nlc3NUb2tlbik7XG5cbiAgICAgICAgICAgICByZXR1cm47XG4gICAgIH1cblxuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgYWNjZXNzVG9rZW4gPSB0b2tlbjtcbiAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKlxuKiBTYXZlcyB0aGUgUmVmcmVzaCBUb2tlbiBpbiBhIGxvY2FsIGRhdGFiYXNlIG9yIGxvY2FsU3RvcmFnZVxuKiBUaGlzIG1ldGhvZCBzaGFsbCBiZSBpbnZva2VkIGZyb20gZXh0ZXJuYWxseSBvbmx5IDxiPm9uY2U8L2I+IGFmdGVyIGFuXG4qIGF1dGhvcml6YXRpb24gY29kZSBpcyByZWNlaXZlZCBmcm9tIGdvb2dsZSdzIHNlcnZlci4gVGhpcyBtZXRob2RcbiogY2FsbHMgdGhlIG90aGVyIG1ldGhvZCAoZ2V0UmVmcmVzaFRva2VuKSB0byBnZXQgdGhlIHJlZnJlc2ggVG9rZW4gYW5kXG4qIHRoZW4gc2F2ZXMgaXQgbG9jYWxseSBvbiBkYXRhYmFzZSBhbmQgaW52b2tlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4qXG4qIEBwYXJhbSB0b2tlbk9iaiBBIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0ge1N0cmluZ30gdG9rZW5PYmouYXV0aF9jb2RlIFRoZSBhdXRob3JpemF0aW9uIGNvZGUgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2l0aCBwYXJhbWV0ZXJzXG4qL1xudmFyIHNhdmVSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbih0b2tlbk9iaiwgY2FsbGJhY2spIHtcbiAgICAgZ2V0UmVmcmVzaFRva2VuKHRva2VuT2JqLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAvKiBpZiB0aGVyZSdzIG5vIGVycm9yICovXG4gICAgICAgICAgICAgaWYgKCFkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEBUT0RPOiBtYWtlIGFub3RoZXIgbWV0aG9kIHNhdmVUb2tlbiB0byBhYnN0cmFjdCB0aGUgc3RvcmluZyBvZiB0b2tlblxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgIH0pO1xufTtcblxuXG5cbi8qKlxuKiBDaGVja3MgaWYgdXNlciBoYXMgYXV0aG9yaXplZCB0aGUgQXBwIG9yIG5vdFxuKiBJdCBkb2VzIHNvIGJ5IGNoZWNraW5nIGlmIHRoZXJlJ3MgYSByZWZyZXNoX3Rva2VuXG4qIGF2YWlsYWJsZSBvbiB0aGUgY3VycmVudCBkYXRhYmFzZSB0YWJsZS5cbipcbiogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBhdXRob3JpemVkLCBmYWxzZSBvdGhlcndpc2VcbiovXG52YXIgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHZhciB0b2tlblZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcblxuICAgICAgY2FsbGJhY2soKCh0b2tlblZhbHVlICE9PSBudWxsKSAmJiAodHlwZW9mIHRva2VuVmFsdWUgIT09ICd1bmRlZmluZWQnKSkpO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogRXh0cmFjdHMgdGhlIGNvZGUgZnJvbSB0aGUgdXJsLiBDb3BpZWQgZnJvbSBvbmxpbmVcbiogQFRPRE8gbmVlZHMgdG8gYmUgc2ltcGxpZmllZC5cbipcbiogQHBhcmFtIG5hbWUgVGhlIHBhcmFtZXRlciB3aG9zZSB2YWx1ZSBpcyB0byBiZSBncmFiYmVkIGZyb20gdXJsXG4qIEBwYXJhbSB1cmwgIFRoZSB1cmwgdG8gYmUgZ3JhYmJlZCBmcm9tLlxuKlxuKiBAcmV0dXJuIFJldHVybnMgdGhlIFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5hbWUgcGFzc2VkXG4qL1xudmFyIGdldFBhcmFtZXRlckJ5TmFtZSA9IGZ1bmN0aW9uKG5hbWUsIHVybCkge1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXFxcXVwiKTtcbiAgdmFyIHJlZ2V4UyA9IFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiO1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4Uyk7XG4gIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuXG4gIGlmKHJlc3VsdHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBlbHNlXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aG9yaXplIDogYXV0aG9yaXplLFxuICBpc0F1dGhvcml6ZWQgOiBpc0F1dGhvcml6ZWQsXG4gIGdldEFjY2Vzc1Rva2VuIDogZ2V0QWNjZXNzVG9rZW4sXG4gIEFQUF9JRCA6IEFQUF9JRFxufTtcbiIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG52YXIgY2FjaGVkVGlsZVN0eWxlID0ge1xuICB3aGVyZTogXCJwaWQgaW4gKClcIixcbiAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICBmaWxsQ29sb3I6IFwiIzAwMDAwMFwiLFxuICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwMDBcIixcbiAgICBzdHJva2VXZWlnaHQ6IDNcbiAgfVxufVxuXG52YXIgY2FjaGVkVGlsZXMgPSBbXTtcbnZhciBjYWNoZWRUaWxlc0xvYWRlZCA9IGZhbHNlO1xudmFyIGNhY2hlZFRpbGVQcmVmaXggPSAnY2FjaGVkX3RpdGxlXyc7XG52YXIgY2FjaGluZyA9IGZhbHNlO1xudmFyIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSBmYWxzZTtcbnZhciBjTWFwRGF0YSA9IHt9O1xuXG52YXIgY29scyA9IFtdO1xudmFyIGFwcCA9IG51bGw7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIF9sb2FkRnJvbUNhY2hlKCk7XG4gIF9sb2FkQ2FjaGVkVGlsZXMoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgaWYoICFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgYWxsIHRpbGUgZGF0YSBmcm9tIHRoZSBjYWNoZT8nKSApIHJldHVybjtcblxuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlcyA9IFtdO1xufVxuXG4vLyBlIGlzIHRoZSBldmVudCBvYmplY3QgZnJvbSBnb29nbGUgbWFwc1xuZnVuY3Rpb24gY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhc2F2ZUNhY2hlT25DbGlja1NldCApIHtcbiAgICBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gdHJ1ZTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIF9zYXZlVGlsZSgpO1xuICAgIH0pO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaXMoJ2NoZWNrZWQnKSApICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmKCBjYWNoaW5nICkgcmV0dXJuO1xuICBjYWNoaW5nID0gdHJ1ZTtcblxuICBjTWFwRGF0YSA9IHtcbiAgICBmdXNpb25MYXllciA6IGZ1c2lvbkxheWVyLFxuICAgIGRlZmF1bHRPcHRpb25zIDogZGVmYXVsdE9wdGlvbnMsXG4gICAgZGVmYXVsdFN0eWxlIDogZGVmYXVsdFN0eWxlLFxuICAgIHBpZCA6ICBlLnJvdy5waWQudmFsdWVcbiAgfVxuXG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCcnKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5zaG93KCk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcblxuICBfbG9hZFRpbGUoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbihkYXRhKXtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5zaG93KCk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5oaWRlKCk7XG5cbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGlkJykuaHRtbChjTWFwRGF0YS5waWQpO1xuICAgIGNNYXBEYXRhLmRhdGEgPSBkYXRhO1xuICAgIGNhY2hpbmcgPSBmYWxzZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICBfY3JlYXRlTmF2TWVudSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdCB0cmVlIGJ1dHRvblxuICAkKCcjdHJlZS1zdWItbWVudScpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3RvciBmb3IgdXBsb2FkaW5nIHdlYXRoZXIgZGF0YSBmcm9tIGEgZ29vZ2xlIHNwcmVhZHNoZWV0XG4gICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIHNob3cgdGhlIGNhY2hlIHZlcnNpb24gb2YgdGhlIGxvY2F0aW9uIHNlbGVjdG9yXG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb25saW5lJykuaGlkZSgpO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUnKS5zaG93KCk7XG5cbiAgLy8gc2V0IHRoZSBsb2NhdGlvbiBzZWxlY3RvciB1aSBsaXN0IGJhc2VkIG9uIGNhY2hlZCB0aWxlc1xuICBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFjYWNoZWRUaWxlc0xvYWRlZCApIF9sb2FkQ2FjaGVkVGlsZXMoKTtcblxuICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMgPSBbZGVmYXVsdFN0eWxlXTtcblxuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID4gMCApIHtcbiAgICBjYWNoZWRUaWxlU3R5bGUud2hlcmUgPSAncGlkIGluICgnK2NhY2hlZFRpbGVzLmpvaW4oJywnKSsnKSc7XG4gICAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzLnB1c2goY2FjaGVkVGlsZVN0eWxlKTtcbiAgfVxuXG4gIGZ1c2lvbkxheWVyLnNldE9wdGlvbnMoZGVmYXVsdE9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfc2F2ZVRpbGUoKSB7XG4gIHZhciBuYW1lID0gJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSByZXR1cm4gYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgbmFtZScpO1xuXG4gIGNNYXBEYXRhLmRhdGEubmFtZSA9IG5hbWU7XG5cbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY01hcERhdGEucGlkLCBKU09OLnN0cmluZ2lmeShjTWFwRGF0YS5kYXRhKSk7XG5cbiAgY2FjaGVkVGlsZXMucHVzaChjTWFwRGF0YS5waWQpO1xuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGNNYXBEYXRhLmZ1c2lvbkxheWVyLCBjTWFwRGF0YS5kZWZhdWx0T3B0aW9ucywgY01hcERhdGEuZGVmYXVsdFN0eWxlKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xufVxuXG5mdW5jdGlvbiBfbG9hZFRpbGUobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3RpbGUtZGF0YS1jYWNoZScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuICB2YXIgd2VhdGhlclRhYmxlID0ge307XG4gIHZhciBzb2lsVGFibGUgPSB7fTtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjayh7d2VhdGhlcjp3ZWF0aGVyVGFibGUsIHNvaWw6c29pbFRhYmxlfSk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHdlYXRoZXJUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBzb2lsVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKSB7XG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPT0gMCApIHtcbiAgICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpLnNob3coKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbGlzdEVsZSA9ICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1saXN0JykuaHRtbCgnPGRpdj5TZWxlY3QgQ2FjaGVkIFRpbGU8L2Rpdj4nKSwgZWxlO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNhY2hlZFRpbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaV0pO1xuICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgZWxlID0gJCgnPGRpdj48YSBjYWNoZWlkPVwiJytpKydcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+JytjYWNoZWRUaWxlc1tpXSsnOiAnK2pzb24ubmFtZSsnPC9hPjwvZGl2PicpO1xuICAgIGVsZS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfcnVuQ2FjaGVkVGlsZShwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2NhY2hlaWQnKSkpO1xuICAgIH0pO1xuICAgIGxpc3RFbGUuYXBwZW5kKGVsZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfcnVuQ2FjaGVkVGlsZShpbmRleCkge1xuICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2luZGV4XSk7XG4gIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi53ZWF0aGVyLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG0gPSBpKycnO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwganNvbi53ZWF0aGVyLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwoanNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXSA/IGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLnNvaWwuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZigganNvbi5zb2lsLnJvd3NbMF0gPT0gbnVsbCApIGNvbnRpbnVlO1xuICAgICQoXCIjaW5wdXQtc29pbC1cIitqc29uLnNvaWwuY29sc1tpXS5pZCkudmFsKGpzb24uc29pbC5yb3dzWzBdLmNbaV0udik7XG4gIH1cblxuICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGFwcC5ydW5Nb2RlbCgpO1xuICB9LCA1MDApO1xufVxuXG5mdW5jdGlvbiBfbG9hZENhY2hlZFRpbGVzKCkge1xuICBjYWNoZWRUaWxlcyA9IFtdO1xuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIGNhY2hlZFRpbGVzLnB1c2goa2V5LnJlcGxhY2UoY2FjaGVkVGlsZVByZWZpeCwnJykpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlc0xvYWRlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVOYXZNZW51KCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiPk9GRkxJTkUgTU9ERTxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbmZ1bmN0aW9uIF9sb2FkRnJvbUNhY2hlKCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnY2FjaGUvanNhcGknLFxuICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvY2hhcnQuY3NzJykgKTtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2Fubm90YXRlZHRpbWVsaW5lLmNzcycpICk7XG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJ2NhY2hlL2NoYXJ0LmpzJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2hhcnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYoIGNoYXJ0c0NhbGxiYWNrICkgY2hhcnRzQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgcmVuZGVyIDogcmVuZGVyLFxuICBjYWNoZVRpbGUgOiBjYWNoZVRpbGUsXG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAgOiByZW5kZXJDYWNoZWRUaWxlc09uTWFwLFxuICBjbGVhckNhY2hlIDogY2xlYXJDYWNoZVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiTWVhbiBWYXBvciBQcmVzc3VyZSBEZWZpY2l0XCIsXG4gICAgICB1bml0cyA6IFwia1BBXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwidGhlIGRpZmZlcmVuY2UgKGRlZmljaXQpIGJldHdlZW4gdGhlIGFtb3VudCBvZiBtb2lzdHVyZSBpbiB0aGUgYWlyIGFuZCBob3cgbXVjaCBcIiArXG4gICAgICBcdFx0XCJtb2lzdHVyZSB0aGUgYWlyIGNhbiBob2xkIHdoZW4gaXQgaXMgc2F0dXJhdGVkXCJcbiAgfSxcbiAgZlZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZUIDoge1xuICAgICAgbGFiZWwgOiBcIlRlbXBlcmF0dXJlIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZGcm9zdCA6IHtcbiAgICAgIGxhYmVsIDogXCJGcm9zdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIGZyb3N0IGRheXMgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUEFSIDoge1xuICAgICAgbGFiZWwgOiBcIk1vbnRobHkgUGhvdG9zeW50aGV0aWNhbGx5IEFjdGl2ZSBSYWRpYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtb2xzIC8gbV4yIG1vbnRoXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVzaWduYXRlcyB0aGUgc3BlY3RyYWwgcmFuZ2UgKHdhdmUgYmFuZCkgb2Ygc29sYXIgcmFkaWF0aW9uIGZyb20gNDAwIHRvIDcwMCBuYW5vbWV0ZXJzIFwiICtcbiAgICAgIFx0XHRcInRoYXQgcGhvdG9zeW50aGV0aWMgb3JnYW5pc21zIGFyZSBhYmxlIHRvIHVzZSBpbiB0aGUgcHJvY2VzcyBvZiBwaG90b3N5bnRoZXNpc1wiXG4gIH0sXG4gIHhQUCA6IHtcbiAgICAgIGxhYmVsIDogXCJNYXhpbXVtIFBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZXRyaWMgVG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSW50Y3B0biA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgUmFpbmZhbGwgSW50ZXJjZXB0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUHJlY2lwaXRhdGlvbiB0aGF0IGRvZXMgbm90IHJlYWNoIHRoZSBzb2lsLCBidXQgaXMgaW5zdGVhZCBpbnRlcmNlcHRlZCBieSB0aGUgbGVhdmVzIGFuZCBicmFuY2hlcyBvZiBwbGFudHMgYW5kIHRoZSBmb3Jlc3QgZmxvb3IuXCJcbiAgfSxcbiAgQVNXIDoge1xuICAgICAgbGFiZWwgOiBcIkF2YWlsYWJsZSBTb2lsIFdhdGVyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBDdW1JcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJDdW11bGF0aXZlIFJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgU3RhbmRBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgQWdlXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgTEFJIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQXJlYSBJbmRleFwiLFxuICAgICAgdW5pdHMgOiBcIm0yIC8gbTJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJUaGUgb25lLXNpZGVkIGdyZWVuIGxlYWYgYXJlYSBwZXIgdW5pdCBncm91bmQgc3VyZmFjZSBhcmVhXCJcbiAgfSxcbiAgQ2FuQ29uZCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgQ29uZHVjdGFuY2VcIixcbiAgICAgIHVuaXRzIDogXCJnYyxtL3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBUcmFuc3AgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIldhdGVyIG1vdmVtZW50IHRocm91Z2ggYSBwbGFudCBhbmQgaXRzIGV2YXBvcmF0aW9uIGZyb20gYWVyaWFsIHBhcnRzXCJcbiAgfSxcbiAgRVRyIDoge1xuICAgICAgbGFiZWwgOiBcIkVUclwiLFxuICAgICAgdW5pdHMgOiBcIm1tXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUmVmZXJlbmNlIGV2YXBvdHJhbnNwaXJhdGlvbiBmb3IgQWxmYWxmYVwiXG4gIH0sXG4gIEtjIDoge1xuICAgICAgbGFiZWwgOiBcIktjXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQ3JvcCBjb2VmZmljaWVudHNcIlxuICB9LFxuICBmU1cgOiB7XG4gICAgICBsYWJlbCA6IFwiU29pbCBXYXRlciBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmQWdlIDoge1xuICAgICAgbGFiZWwgOiBcIlN0YW5kIGFnZVwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBQaHlzTW9kIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBDYW5vcHkgQ29uZHVjdGFuY2VcIlxuICB9LFxuICBwUiA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWFsIHBhcmFtZXRlciwgc3BlY2lmaWVzIHRoZSBhbW91bnQgb2YgbmV3IGdyb3d0aCBhbGxvY2F0ZWQgdG8gdGhlIHJvb3Qgc3lzdGVtLCBhbmQgdGhlIHR1cm5vdmVyIHJhdGUuXCJcbiAgfSxcbiAgcFMgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlXCJcbiAgfSxcbiAgbGl0dGVyZmFsbCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXRpb24gOiBcIlwiLFxuICAgICAgYWx0Rm5OYW1lIDogXCJ0ZHBcIlxuICB9LFxuICBOUFAgOiB7XG4gICAgICBsYWJlbCA6IFwiTmV0IENhbm9weSBQcm9kdWN0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBXRiA6IHtcbiAgICAgIGxhYmVsIDogXCJMZWFmIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmVfV0YsIGN1cl9kVywgY3VyX3BGLCBjdXJfbGl0dGVyZmFsbCwgcHJldl9XRikge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dGICsgY3VyX2RXICogY3VyX3BGIC0gY3VyX2xpdHRlcmZhbGwgKiBwcmV2X1dGXG4gICAgICB9XG4gIH0sXG4gIFdSIDoge1xuICAgICAgbGFiZWwgOiBcIlJvb3QgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1IsIGN1cl9kVywgY3VyX3BSLCB0dXJub3ZlciwgcHJldl9XUiwgY3VyX1Jvb3RQKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV1IgKyBjdXJfZFcgKiBjdXJfcFIgLSB0cmVlLnBSLnR1cm5vdmVyICogcHJldl9XUiAtIGN1cl9Sb290UDtcbiAgICAgIH1cbiAgfSxcbiAgV1MgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RlbSBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUywgY3VyX2RXLCBjdXJfcFMpIHsgcmV0dXJuIHByZXZfV1MgKyBjdXJfZFcgKiBjdXJfcFMgfVxuICB9LFxuICBXIDoge1xuICAgICAgbGFiZWwgOiBcIlRvdGFsIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihjdXJfV0YsIGN1cl9XUiwgY3VyX1dTKSB7IHJldHVybiBjdXJfV0YrY3VyX1dSK2N1cl9XUyB9XG4gIH1cbn1cbiIsInZhciBtb2RlbElPID0gcmVxdWlyZSgnLi4vbW9kZWxSdW5IYW5kbGVyJyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG52YXIgYXBwO1xuXG52YXIgc2hvdyA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgdmFyIGksIHo7XG5cbiAgLy8gc2VsZWN0ZWQgaW4gdGhlIGNoYXJ0cyBvdXRwdXRcbiAgdmFyIHZhcnMgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpO1xuXG4gIC8vIGZpbmQgdGhlIHJvd3Mgd2UgY2FyZSBhYm91dFxuICB2YXIgY2hhcnRSb3dzID0ge307XG4gIGZvciggaSA9IDA7IGkgPCByZXN1bHRzWzBdLmhlYWRlci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB2YXJzLmluZGV4T2YocmVzdWx0c1swXS5oZWFkZXJbaV0pID4gLTEgKSBjaGFydFJvd3NbcmVzdWx0c1swXS5oZWFkZXJbaV1dID0gaTtcbiAgfVxuXG4gIHZhciB0YWJzID0gJCgnPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIGlkPVwicmF3T3V0cHV0VGFic1wiICBkYXRhLXRhYnM9XCJwaWxsXCI+PC91bD4nKTtcbiAgdmFyIGNvbnRlbnRzID0gJCgnPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCIgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21hcmdpbi10b3A6MTVweFwiPjwvZGl2PicpO1xuXG4gIGZvciggaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YWJzLmFwcGVuZCgkKCc8bGkgJysoaSA9PT0gMCA/ICdjbGFzcz1cImFjdGl2ZVwiJyA6IFwiXCIpKyc+PGEgaHJlZj1cIiNyYXdvdXQnXG4gICAgICAgICAgK3ZhcnNbaV0rJ1wiIGRhdGEtdG9nZ2xlPVwidGFiXCI+Jyt2YXJzW2ldKyc8L2E+PC9saT4nKSk7XG5cbiAgICAgIGNvbnRlbnRzLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgJyArIChpID09PSAwID8gJ2FjdGl2ZScgOiBcIlwiKVxuICAgICAgICAgICsgJ1wiIGlkPVwicmF3b3V0JyArIHZhcnNbaV0gKyAnXCI+PC9kaXY+JykpO1xuICB9XG5cbiAgJChcIiNvdXRwdXQtY29udGVudFwiKS5odG1sKFwiXCIpLmFwcGVuZCh0YWJzKS5hcHBlbmQoY29udGVudHMpO1xuICAkKFwiI3Jhd091dHB1dFRhYnNcIikudGFiKCk7XG5cbiAgY3N2UmVzdWx0cyA9IHtcbiAgICAgIGNvbmZpZyA6IG1vZGVsSU8uZXhwb3J0U2V0dXAoKSxcbiAgICAgIGlucHV0cyA6IFtdLFxuICAgICAgaGVhZGVyIDogcmVzdWx0c1swXS5oZWFkZXIsXG4gICAgICBkYXRhIDoge31cbiAgfTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgIGNzdlJlc3VsdHMuaW5wdXRzLnB1c2gocmVzdWx0c1tpXS5pbnB1dHMpO1xuICB9XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciB0YWJsZSwgcm93O1xuICBmb3IoIHZhciBrZXkgaW4gY2hhcnRSb3dzICkge1xuICAgICAgdGFibGUgPSBcIjx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtc3RyaXBlZCc+XCI7XG5cbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldID0gW107XG5cblxuICAgICAgLy8gc2V0IGhlYWRlciByb3dcbiAgICAgIHZhciBjdXJyZW50Um93ID0gW107XG4gICAgICBjdXJyZW50Um93LnB1c2goJ2RhdGUnKTtcbiAgICAgIC8vY3VycmVudFJvdy5wdXNoKCdzdGVwJyk7XG5cbiAgICAgIHRhYmxlICs9IFwiPHRyPjx0aD5EYXRlPC90aD48dGg+U3RlcDwvdGg+XCI7XG5cbiAgICAgIGZvciggeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgIHRhYmxlICs9IFwiPHRoPlwiO1xuICAgICAgICAgIHZhciB0bXAgPSBbXTtcblxuICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIHJlc3VsdHNbel0uaW5wdXRzICkge1xuICAgICAgICAgICAgICB0bXAucHVzaChtVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0pO1xuICAgICAgICAgICAgICB0YWJsZSArPSBcIjxkaXY+XCIrbVR5cGUrXCI9XCIrcmVzdWx0c1t6XS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIHRtcC5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaChrZXkpO1xuICAgICAgICAgICAgICB0YWJsZSArPSBrZXk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY3VycmVudFJvdy5wdXNoKHRtcC5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhYmxlICs9IFwiPC90aD5cIjtcbiAgICAgIH1cbiAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldLnB1c2goY3VycmVudFJvdyk7XG4gICAgICB2YXIgYyA9IDA7XG5cbiAgICAgIGZvciggdmFyIGRhdGUgaW4gcmVzdWx0c1swXS5vdXRwdXQgKSB7XG4gICAgICAgIGMrKztcbiAgICAgICAgY3VycmVudFJvdyA9IFtdO1xuXG4gICAgICAgIHRhYmxlICs9IFwiPHRyPjx0ZD5cIitkYXRlK1wiPC90ZD48dGQ+XCIrYytcIjwvdGQ+XCI7XG5cbiAgICAgICAgY3VycmVudFJvdy5wdXNoKGRhdGUpO1xuICAgICAgICAvL2N1cnJlbnRSb3cucHVzaChjKTtcblxuICAgICAgICB2YXIgdjtcbiAgICAgICAgZm9yKCB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgaWYoICFyZXN1bHRzW3pdLm91dHB1dFtkYXRlXSApIHtcbiAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkPjwvdGQ+XCI7XG4gICAgICAgICAgICBjdXJyZW50Um93LnB1c2gobnVsbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHYgPSByZXN1bHRzW3pdLm91dHB1dFtkYXRlXVtjaGFydFJvd3Nba2V5XV07XG4gICAgICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIit2K1wiPC90ZD5cIjtcbiAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaCh2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldLnB1c2goY3VycmVudFJvdyk7XG4gICAgICB9XG4gICAgICAkKFwiI3Jhd291dFwiICsga2V5KS5odG1sKHRhYmxlK1wiPC90YWJsZT5cIik7XG4gIH1cblxuICBhcHAuc2V0Q3N2UmVzdWx0cyhjc3ZSZXN1bHRzKTtcblxuICAvLyBtYWtlIHN1cmUgd2UgY2FuIHNlZSB0aGUgZXhwb3J0IGJ0blxuICBpZiggIW9mZmxpbmVNb2RlICkgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikuc2hvdygpO1xuXG4gIHJldHVybiBjc3ZSZXN1bHRzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNob3cgOiBzaG93LFxuICBpbml0IDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH1cbn07XG4iLCJmdW5jdGlvbiBxcyhrZXkpIHtcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1sqKz9eJC5cXFtcXF17fSgpfFxcXFxcXC9dL2csIFwiXFxcXCQmXCIpO1xuICB2YXIgbWF0Y2ggPSBsb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cChcIls/Jl1cIiArIGtleSArIFwiPShbXiZdKykoJnwkKVwiKSk7XG4gIHJldHVybiBtYXRjaCAmJiBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBxcyA6IHFzXG59O1xuIiwidmFyIG9wdGlvbnMgPSB7XG4gIHRpdGxlIDogJ1dlYXRoZXInLFxuICBoZWlnaHQgOiAzMDAsXG4gIHZBeGVzOiBbe1xuICAgICAgICAgIHRpdGxlOiBcIlJhZGlhdGlvbiAoTUovZGF5KTsgVGVtcGVyYXR1cmUgKF5DKTsgRGV3IFBvaW50ICheQyk7IERheWxpZ2h0IChoKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUsXG4gICAgICAgICAgbWF4VmFsdWUgOiAzNVxuICAgICAgICB9LHtcbiAgICAgICAgICB0aXRsZTogXCJQcmVjaXBpdGF0aW9uIChtbSlcIixcbiAgICAgICAgICBtaW5WYWx1ZSA6IC01MCxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1MFxuICAgICAgICB9XSxcbiAgaEF4aXM6IHt0aXRsZTogXCJNb250aFwifSxcbiAgc2VyaWVzVHlwZTogXCJiYXJzXCIsXG4gIHNlcmllczoge1xuICAgICAgMDoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAxOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDI6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMzoge3R5cGU6IFwiYXJlYVwiLCB0YXJnZXRBeGlzSW5kZXg6MX0sXG4gICAgICA0OiB7dGFyZ2V0QXhpc0luZGV4OjB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZShyb290LCBkYXRhKSB7XG4gICQocm9vdCkuaHRtbCgnJyk7XG5cbiAgdmFyIGR0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuICBkdC5hZGRDb2x1bW4oJ3N0cmluZycsICdNb250aCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNaW4gVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTWF4IFRlbXBlcmF0dXJlJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RldyBQb2ludCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdQcmVjaXBpdGF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1JhZGlhdGlvbicpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdEYXlsaWdodCcpO1xuXG4gIHZhciByb3dzID0gW107XG4gIGZvciggdmFyIGRhdGUgaW4gZGF0YSApIHtcbiAgICAgIHZhciBvYmogPSBkYXRhW2RhdGVdO1xuICAgICAgcm93cy5wdXNoKFtcbiAgICAgICAgICBwYXJzZUludChkYXRlLnJlcGxhY2UoLy0vZywgJycpKSxcbiAgICAgICAgICBkYXRlKycnLFxuICAgICAgICAgIG9iai50bWluIHx8IDAsXG4gICAgICAgICAgb2JqLnRtYXggfHwgMCxcbiAgICAgICAgICBvYmoudGRtZWFuIHx8IDAsXG4gICAgICAgICAgb2JqLnBwdCB8fCAwLFxuICAgICAgICAgIG9iai5yYWQgfHwgMCxcbiAgICAgICAgICBvYmouZGF5bGlnaHQgfHwgMFxuICAgICAgXSk7XG4gIH1cblxuICByb3dzLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgaWYoIGFbMF0gPiBiWzBdICkgcmV0dXJuIDE7XG4gICAgaWYoIGFbMF0gPCBiWzBdICkgcmV0dXJuIC0xO1xuICAgIHJldHVybiAwO1xuICB9KTtcbiAgLy8gcmVtb3ZlIHNvcnQgdmFsdWVcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrICkge1xuICAgIHJvd3NbaV0uc3BsaWNlKDAsIDEpO1xuICB9XG5cbiAgZHQuYWRkUm93cyhyb3dzKTtcblxuICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ29tYm9DaGFydChyb290KTtcbiAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGNoYXJ0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlIDogY3JlYXRlXG59O1xuIiwidmFyIHdlYXRoZXIgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgYXBwO1xuXG4vLyBhZGQgc3ByZWFkc2hlZXQgdml6IHNvdXJjZVxuLy8gaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS90cT90cT1zZWxlY3QlMjAqJmtleT0wQXY3Y1VWLW8yUVFZZEhaRllXSk5OV3BSUzFoSVZXaEdRVGhsTFdad1pXYyZ1c3A9ZHJpdmVfd2ViI2dpZD0wXG5cbmZ1bmN0aW9uIGluaXQoYSkge1xuICBhcHAgPSBhO1xuXG4gIHZhciBkcm9wWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wX3pvbmUnKTtcbiAgZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBfaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbiAgZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0Jykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLndoaWNoID09IDEzICkgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0LXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1kcml2ZS1maWxlJywgMSk7XG5cbiAgICB2YXIgdmFsID0gJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoKTtcbiAgICBpZiggdmFsLmxlbmd0aCA9PSAwICkgcmV0dXJuO1xuXG4gICAgaWYoICF2YWwubWF0Y2goL15odHRwLiovICkgKSB2YWwgPSAnaHR0cHM6Ly8nK3ZhbDtcblxuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICAgIGZpbGVQYW5lbC5pbml0RnJvbVVybCh2YWwsIHJvb3QpO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCcnKTtcbn1cblxuZnVuY3Rpb24gX2hhbmRsZUZpbGVTZWxlY3QoZXZ0KSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWxvY2FsLWZpbGUnLCAxKTtcblxuICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHZhciBmaWxlcyA9IGV2dC5kYXRhVHJhbnNmZXIgPyBldnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZ0LnRhcmdldC5maWxlczsgLy8gRmlsZUxpc3Qgb2JqZWN0LlxuXG4gIC8vIGZpbGVzIGlzIGEgRmlsZUxpc3Qgb2YgRmlsZSBvYmplY3RzLiBMaXN0IHNvbWUgcHJvcGVydGllcy5cbiAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGY7IGYgPSBmaWxlc1tpXTsgaSsrKSB7XG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIGZpbGVQYW5lbC5pbml0KGYsIHJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVEcmFnT3ZlcihldnQpIHtcbmV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbmV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknOyAvLyBFeHBsaWNpdGx5IHNob3cgdGhpcyBpcyBhIGNvcHkuXG59XG5cbi8vIG9uIGFkZCwgaWYgdGhlIGxpc3QgaXMgZW1wdHksIGxldCdzIGNsb3NlIHRoZSBwb3B1cFxuZnVuY3Rpb24gX29uQ29tcGxldGUoKSB7XG4gICAgaWYoICQoXCIjZmlsZV9saXN0XCIpLmNoaWxkcmVuKCkubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG59XG5cbnZhciBXZWF0aGVyRmlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgZGF0ZSAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdEYXRlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0RhdGUnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWluICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01pbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1heCAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNYXggVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRkbWVhbiAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWVhbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcHB0ICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdQcmVjaXBpdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdtbScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHJhZCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUmFkaWF0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ01KIG0tMiBkYXktMScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIGRheWxpZ2h0IDoge1xuICAgICAgICAgICAgbGFuZWwgOiAnRGF5bGlnaHQgSG91cnMnLFxuICAgICAgICAgICAgdW5pdHMgOiAnaG91cnMnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gIHZhciBlbGUgPSAkKCc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdFwiPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L2J1dHRvbj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJmaWxlbmFtZVwiPjwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIjBcIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIndpZHRoOiAwJTtcIj4nK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+MCUgQ29tcGxldGU8L3NwYW4+JytcbiAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0dXNcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGFcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2PjxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIHByZXZpZXctZGF0YS1idG5cIj5QcmV2aWV3IERhdGE8L2E+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGEtdGFibGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtc3RhdHVzXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjUwcHhcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgbWFwLWRhdGEtYnRuXCI+TWFwIENTViBDb2x1bW5zPC9hPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBkaXNhYmxlZCBwdWxsLXJpZ2h0XCI+QWRkIERhdGE8L2E+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nKTtcblxuICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBjc3ZUYWJsZSA9IFtdO1xuXG4gICAgLy8gb25seSBhdXRvIGhpZGUgdGhlIGZpcnN0IHRpbWVcbiAgICB2YXIgYXV0b0hpZGUgPSB0cnVlO1xuXG4gIC8vIHRoZSBmaWxlIHJlYWRlciBvYmplY3QgYW5kIHRoZSBlbGVtZW50XG4gIGZ1bmN0aW9uIGluaXQoZmlsZSwgcm9vdEVsZSkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgIHJlYWRlci5vbnByb2dyZXNzID0gdXBkYXRlUHJvZ3Jlc3M7XG4gICAgcmVhZGVyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oZSkge307XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgICAgIHBhcnNlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpXG5cbiAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbChnZXROYW1lKGZpbGUpKTtcbiAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RnJvbVVybCh1cmwsIHJvb3RFbGUpIHtcbiAgICAgICAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLmh0bWwoJ1F1ZXJ5aW5nIHNwcmVhZHNoZWV0Li4uJyk7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldEtleSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbCgnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnK1xuICAgICAgICAgICAgJ0dvb2dsZSBTcHJlYWRzaGVldCcrKGtleS5sZW5ndGggPiAwID8gJzxiciAvPjxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTRweFwiPicra2V5Kyc8L3NwYW4+JyA6ICcnKSsnPC9oMz4nKTtcblxuICAgICAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gICAgICAgIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRXJyb3IgaW4gcXVlcnk6ICcgKyByZXNwb25zZS5nZXRNZXNzYWdlKCkgKyAnICcgKyByZXNwb25zZS5nZXREZXRhaWxlZE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJzZShkdFRvQ3N2KHJlc3BvbnNlLmdldERhdGFUYWJsZSgpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zZXRIYW5kbGVycygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5tYXAtZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB3ZWF0aGVyLnNldChhcHAuZ2V0TW9kZWwoKSwgZGF0YSk7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBfb25Db21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdFRvQ3N2KGR0KSB7XG4gICAgICAgIHZhciBhcnIgPSBbW11dO1xuXG4gICAgICAgIGR0ID0gSlNPTi5wYXJzZShkdC50b0pTT04oKSk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyclswXS5wdXNoKGR0LmNvbHNbaV0ubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkdC5yb3dzW2ldLmMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoICFkdC5yb3dzW2ldLmNbal0gKSBhcnJbaSsxXS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICBlbHNlIGFycltpKzFdLnB1c2goZHQucm93c1tpXS5jW2pdLnYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNzdiA9ICcnO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGNzdiArPSBhcnJbaV0uam9pbignLCcpKydcXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNzdjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRLZXkodXJsKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHVybC5zcGxpdCgnPycpO1xuICAgICAgICBpZiggcGFydHMubGVuZ3RoID09IDEgKSByZXR1cm4gJyc7XG5cbiAgICAgICAgcGFydHMgPSBwYXJ0c1sxXS5zcGxpdCgnJicpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIHBhcnRzW2ldLnNwbGl0KCc9JylbMF0gPT0gJ2tleScgKSByZXR1cm4gcGFydHNbaV0uc3BsaXQoJz0nKVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWUoZikge1xuICAgIHJldHVybiBbJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJywgZi5uYW1lLFxuICAgICAgICAgICAgICAgICcgPHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNnB4XCI+KCcsIGYudHlwZSB8fCAnbi9hJyxcbiAgICAgICAgICAgICAgICAnKTwvc3Bhbj4gLSA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxNnB4XCI+JywgZi5zaXplLCAnIGJ5dGVzPC9zcGFuPicsICc8L2gzPiddLmpvaW4oJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHMqXFxuL2csJycpLnNwbGl0KCdcXG4nKTtcblxuICAgIHZhciB0YWJsZSA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHRhYmxlLnB1c2goZGF0YVtpXS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICAgICAgaWYoIHRhYmxlLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNldEVycm9yKCdGaWxlIGRpZCBub3QgY29udGFpbiBhbnkgaW5mb3JtYXRpb24uJyk7XG4gICAgICAgIGNzdlRhYmxlID0gdGFibGU7XG5cbiAgICAgICAgcGFyc2VIZWFkZXIodGFibGVbMF0pO1xuICAgICAgICBnZXREYXRlUmFuZ2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlUmFuZ2UoKSB7XG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJycpO1xuICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA9PSAtMSApIHJldHVybiBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCdEYXRlIGNvbHVtbiBuZWVkcyB0byBiZSBtYXRjaGVkLicpO1xuICAgICAgICBpZiggdHlwZW9mIGhlYWRlcnMuZGF0ZS5jb2wgPT0gJ3N0cmluZycgKSBoZWFkZXJzLmRhdGUuY29sID0gcGFyc2VJbnQoaGVhZGVycy5kYXRlLmNvbCk7XG5cbiAgICAgICAgdmFyIGRhdGVzID0ge307XG4gICAgICAgIHZhciBkaXNwbGF5RGF0ZXMgPSBbXTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sIDwgY3N2VGFibGVbaV0ubGVuZ3RoICYmIGNzdlRhYmxlW2ldLmxlbmd0aCA+PSA3ICnCoHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgICAgICBpZiggcC5sZW5ndGggIT0gMyAmJiBwLmxlbmd0aCAhPSAyICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgbm90IGEgdmFsaWQgZm9ybWF0ICh5eXl5LW1tLWRkIG9yIHl5eXktbW0pXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYoICFkYXRlc1twWzBdXSApIGRhdGVzW3BbMF1dID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG1tZGQgPSBwWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYoIGRhdGVzW3BbMF1dLmluZGV4T2YobW1kZCkgIT0gLTEgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBpbiBkYXRhc2V0IHR3aWNlXCIpO1xuICAgICAgICAgICAgICAgIGRhdGVzW3BbMF1dLnB1c2gobW1kZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciB5ZWFyIGluIGRhdGVzICkge1xuICAgICAgICAgICAgaWYoIGRhdGVzW3llYXJdLmxlbmd0aCA9PSAxMikge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKycgWycrZGF0ZXNbeWVhcl0uam9pbignLCAnKSsnXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnPGI+RGF0ZSBSYW5nZTo8L2I+ICcrZGlzcGxheURhdGVzLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSGVhZGVyKGhlYWRlclJvdykge1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IFtdO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj4nO1xuICAgICAgICBodG1sICs9ICc8dHI+PHRoPktleTwvdGg+PHRoPkNvbHVtbiAjPC90aD48L3RyPic7XG5cbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVyUm93LmluZGV4T2Yoa2V5KSAhPSAtMSApIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW2tleV0uY29sID0gaGVhZGVyUm93LmluZGV4T2Yoa2V5KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLXN1Y2Nlc3NcIj4nK2hlYWRlcnNba2V5XS5jb2wrJyA8aSBjbGFzcz1cImljb24tb2tcIj48L2k+PC9zcGFuPjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c2VsZWN0IGNsYXNzPVwic2VsZWN0LScra2V5KydcIlwiPjwvc2VsZWN0PjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmh0bWwoaHRtbCsnPC90YWJsZT4nKTtcblxuXG4gICAgICAgIGlmKCBtYXRjaGVkLmxlbmd0aCAhPSA3ICkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNlbGVjdCBlbGVtZW50IGZvciBtaXNzaW5nIGNvbCdzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIlwiPltTZWxlY3QgQ29sdW1uXTwvb3B0aW9uPicpKTtcblxuICAgICAgICAgICAgLy8gaWYgaXQncyByYWRpYXRpb24sIGFkZCBvcHRpb24gZm9yIGNhbGN1bGF0aW5nXG4gICAgICAgICAgICAvLyBUT0RPXG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCBtaXNzaW5nIGNvbHNcbiAgICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVyUm93Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGlmKCBtYXRjaGVkLmluZGV4T2YoaGVhZGVyUm93W2ldKSA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCInK2krJ1wiPicraSsnIC0gJytoZWFkZXJSb3dbaV0rJzwvb3B0aW9uPicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgY2hhbmdlIGhhbmRsZXJzIGZvciB0aGUgc2VsZWN0b3JzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cigndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBpZiggdmFsICE9ICcnICkgaGVhZGVyc1t0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKC9zZWxlY3QtLywnJyldLmNvbCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBjb2x1bW5zIGFyZSBzZXQsIHJlbW92ZSBkaXNhYmxlZCBmcm9tIGJ0blxuICAgICAgICAgICAgICAgIHZhciByZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBoZWFkZXJzW2tleV0uY29sID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIHJlYWR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYXV0b0hpZGUgKSBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5oaWRlKCdzbG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgdGhlIHRhYmxlXG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5zaG93KCdzbG93Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBhdXRvSGlkZSA9IGZhbHNlO1xuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNldERhdGEoKTtcbiAgICAgICAgc2V0UHJldmlldygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByZXZpZXcoKSB7XG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuc2hvdygpO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+PHRoPmRhdGU8L3RoPic7XG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaHRtbCArPSAnPHRoPicra2V5Kyc8L3RoPic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYyA9IDA7XG4gICAgICAgIGZvciggdmFyIGRhdGUgaW4gZGF0YSApe1xuICAgICAgICAgICAgaWYoIGMgPT0gMTAgKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZCBjb2xzcGFuPVwiN1wiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj4uLi48L3RkPjwvdHI+JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2RhdGUrJzwvdGQ+JztcbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JytkYXRhW2RhdGVdW2tleV0rJzwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuICAgICAgICAgICAgYysrO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS5odG1sKGh0bWwpO1xuICAgIH1cblxuICAvLyBzZXQgdGhlIG1hcCBvZiBjc3YgaGVhZGVyc1xuICBmdW5jdGlvbiBzZXREYXRhKCkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggY3N2VGFibGVbaV0ubGVuZ3RoIDwgNyApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIHZhciBkYXRlID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF07XG5cbiAgICAgICAgICAgIGlmKCAhZGF0ZSApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIGlmKCBkYXRlLnNwbGl0KCctJykubGVuZ3RoID09IDMgKSBkYXRlID0gZGF0ZS5zcGxpdChcIi1cIikuc3BsaWNlKDAsMikuam9pbihcIi1cIik7XG4gICAgICAgICAgICBkYXRhW2RhdGVdID0ge307XG5cbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBkYXRhW2RhdGVdW2tleV0gPSBwYXJzZUZsb2F0KGNzdlRhYmxlW2ldW2hlYWRlcnNba2V5XS5jb2xdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MoZXZ0KSB7XG4gICAgLy8gZXZ0IGlzIGFuIFByb2dyZXNzRXZlbnQuXG4gICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgIHZhciBwZXJjZW50TG9hZGVkID0gTWF0aC5yb3VuZCgoZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCkgKiAxMDApO1xuICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzLWJhcicpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLHBlcmNlbnRMb2FkZWQpLndpZHRoKHBlcmNlbnRMb2FkZWQrXCIlXCIpO1xuICAgICAgICBlbGUuZmluZCgnLnNyLW9ubHknKS5odG1sKE1hdGguY2VpbChwZXJjZW50TG9hZGVkKSsnJSBDb21wbGV0ZScpO1xuICAgIH1cbn1cblxuICBmdW5jdGlvbiBlcnJvckhhbmRsZXIoZXZ0KSB7XG4gICAgc3dpdGNoKGV2dC50YXJnZXQuZXJyb3IuY29kZSkge1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9GT1VORF9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIE5vdCBGb3VuZCEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX1JFQURBQkxFX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgaXMgbm90IHJlYWRhYmxlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLkFCT1JUX0VSUjpcbiAgICAgICAgYnJlYWs7IC8vIG5vb3BcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNldEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCByZWFkaW5nIHRoaXMgZmlsZS4nKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RXJyb3IobXNnKSB7XG4gICAgICBlbGUuZmluZCgnLnN0YXR1cycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nK21zZysnPC9kaXY+Jyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQgOiBpbml0LFxuICAgIGluaXRGcm9tVXJsIDogaW5pdEZyb21VcmxcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0XG59O1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xudmFyIGNoYXJ0ID0gcmVxdWlyZSgnLi9jaGFydCcpO1xuXG4vLyBtYWtlIHN1cmUgYWxsIHRoZSB3ZWF0aGVyIGlzIHNldC4gICMxIHRoaW5nIHBlb3BsZSB3aWxsIG1lc3MgdXBcbmZ1bmN0aW9uIGNoZWNrKG1vZGVsKSB7XG5cbiAgLy8gZmlyc3QgZ2V0IGN1cnJlbnQgbW9udGhzIHdlIGFyZSBnb2luZyB0byBydW4sXG4gIHZhciBzdGFydCA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpO1xuXG4gIHZhciBlbmQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpLnNwbGl0KFwiLVwiKTtcbiAgdmFyIGVNb250aCA9IHBhcnNlSW50KGVuZFsxXSk7XG4gIHZhciBlWWVhciA9IHBhcnNlSW50KGVuZFswXSk7XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gIC8vIG5vdyBzZWUgaWYgd2UgaGF2ZSBjdXN0b20gd2VhdGhlciBjb3ZlcmFnZVxuICB2YXIgaGFzQ292ZXJhZ2UgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuICB3aGlsZSggY291bnQgPCAxMDAwMCApIHtcbiAgICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIG0gPSAoY0RhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIHZhciB5ID0gY0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBpZiggY0RhdGUuZ2V0TW9udGgoKSsxID09IGVNb250aCAmJiB5ID09IGVZZWFyICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXJbeSsnLScrbV0gKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY0RhdGUuc2V0TW9udGgoY0RhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgIGNvdW50Kys7XG4gIH1cblxuICBpZiggaGFzQ292ZXJhZ2UgKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBpZiBub3QgbWFrZSBzdXJlIHdlIGhhdmUgYXZlcmFnZXMgc2VsZWN0ZWRcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgIHZhciBtID0gKGkrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGNvbmZpZy5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjID0gY29uZmlnLmlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIG0pLnZhbCgpKTtcbiAgICAgICAgICBpZiggIXZhbCAmJiB2YWwgIT09IDAgKSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiTWlzc2luZyB3ZWF0aGVyIGRhdGE6IFwiK2MrXCIgZm9yIG1vbnRoIFwiK20rXCJcXG5cXG5cIitcbiAgICAgICAgICAgICAgICAgICAgXCJEaWQgeW91IHNlbGVjdCBhIGxvY2F0aW9uIChTZXR1cCkgYW5kL29yIGFyZSBhbGwgd2VhdGhlci9zb2lsIGZpZWxkcyBmaWxsZWQgb3V0P1wiKTtcbiAgICAgICAgICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0KG1vZGVsLCBkYXRhKSB7XG4gIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSBtb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gIGlmKCBkYXRhICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSB7XG5cbiAgICAgICAgICAvLyBjbGVhbiB1cCBkYXRlIGZvcm1hdFxuICAgICAgICAgIHZhciBkYXRlID0ga2V5LnJlcGxhY2UoL1teXFxkLV0vLCcnKTtcbiAgICAgICAgICB2YXIgcGFydHMgPSBkYXRlLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICBpZiggcGFydHMubGVuZ3RoIDwgMiApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdJbnZhbGlkIERhdGUgRm9ybWF0LiAgRGF0ZXMgc2hvdWxkIGJlIGluIFlZWVktTU0gZm9ybWF0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggcGFydHNbMV0ubGVuZ3RoICE9IDIgKSB7XG4gICAgICAgICAgICAgIGRhdGUgPSBwYXJ0c1swXStcIi0wXCIrcGFydHNbMV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gIH1cblxuICAvLyBjcmVhdGUgYXJyYXkgc28gd2UgY2FuIHNvcnRcbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgaGVhZGVycyA9IFsnZGF0ZSddO1xuICBmb3IoIHZhciBkYXRlIGluIG1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuXG4gICAgICB2YXIgdCA9IFtkYXRlXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXSApIHtcbiAgICAgICAgICBpZigga2V5ID09ICducmVsJyApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKCBhcnIubGVuZ3RoID09PSAwICkgaGVhZGVycy5wdXNoKGtleSk7XG4gICAgICAgICAgdC5wdXNoKG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaCh0KTtcbiAgfVxuXG4gIGlmKCBhcnIubGVuZ3RoID09PSAwICkge1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChcIk5vIHdlYXRoZXIgZGF0YSBoYXMgYmVlbiB1cGxvYWRlZC5cIik7XG4gICAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaHRtbCA9ICc8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6YXV0bzttYXgtaGVpZ2h0OjYwMHB4XCI+PHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj4nO1xuXG4gIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgdmFyIGQxID0gbmV3IERhdGUoYVswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG4gICAgICB2YXIgZDIgPSBuZXcgRGF0ZShiWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcblxuICAgICAgaWYoIGQxIDwgZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2UgaWYoIGQxID4gZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRoPicraGVhZGVyc1tpXSsnPC90aD4nO1xuICB9XG4gIGh0bWwgKz0gJzwvdHI+JztcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JythcnJbaV0uam9pbignPC90ZD48dGQ+JykrJzwvdGQ+PC90cj4nO1xuICB9XG5cbiAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChodG1sKyc8L3RhYmxlPjwvZGl2PjxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1jaGFydFwiPjwvZGl2PicpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0LmNyZWF0ZSgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICB9LCAxMDAwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldCA6IHNldCxcbiAgY2hlY2sgOiBjaGVja1xufTtcbiJdfQ==
