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
      coppiceDates : coppiceDates,
      days_in_interval : (this.dailyStep)?1:30.4
    };

    return this.runSetup(setup);
}

function runSetup(setup){
    var i, key, currentWeather, step, t;

    if( this.debug ) {
      t = new Date().getTime();
      console.log('days_in_interval: '+setup.days_in_interval);
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
      this.currentDate.setDate(this.manage.datePlanted.getDate() + step*setup.days_in_interval); // add a day to current date
//      this.currentDate.setDate(this.manage.datePlanted.getDate() + step*setup.days_in_interval); // add a day to current date

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
      nextStepResults = singleStep(this.plantation, this.soil, currentWeather, 
                                   this.manage, currentStepResults,setup.days_in_interval);
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
  c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean);
  c.fVPD = fn.fVPD(tree.kG, c.VPD);

  c.fSW = fn.fSW(p.ASW, soil.maxAWS, soil.swconst, soil.swpower);
  c.fAge = fn.tdp(p.StandAge, tree.fAge);

  // fFrost is a cumulative Normal distribution, that approixmates the number of days (or parts of days) that
  // will be below 0, given a minimum temperature
  c.fFrost = fn.fFrost(weather.tmin);

  c.PAR = fn.PAR(weather.rad,days_in_interval); //  PAR in mols

  c.fT = fn.fT((weather.tmin + weather.tmax)/2, tree.fT);

  c.PhysMod = fn.PhysMod(c.fVPD, c.fSW, c.fAge);
  c.fNutr = fn.fNutr(tree.fN0, manage.fertility);
  c.xPP = fn.xPP(tree.y, c.PAR); // maximum potential Primary Production per month
  c.NPP = fn.NPP(p.coppiceAge, tree.fullCanAge, c.xPP, tree.k, p.LAI, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);

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

  c.Transp = fn.Transp(weather.rad, days_in_interval,weather.daylight, c.VPD, tree.BLcond, c.CanCond);
  c.ETr = fn.ETr(weather.rad,weather.tmin,weather.tmax,weather.tdmean,days_in_interval);
  c.Kc = c.Transp/c.ETr;
  

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

function shouldCoppice(model, setup) {
  var next;
  var coppice_on;
  // do we have specific coppice dates set?
  if( setup.coppiceDates ) {
    for( var i = 0; i < setup.coppiceDates.length; i++ ) {
      var d = setup.coppiceDates[i];

      if (model.currentDate < d) {
        next = model.currentDate;
        next.setDate(next.getDate + setup.days_in_interval);
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

    if (model.currentDate < coppice_on) {
      next=new Date(model.currentDate);
      next.setDate(model.currentDate.getDate() + setup.days_in_interval);
      if ( coppice_on < next) {
        setup.yearToCoppice = setup.yearToCoppice+setup.coppiceInterval;
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
var outputs = ["VPD","fVPD","fT","fFrost","PAR","Intcptn","ASW","CumIrrig",
               "Irrig","StandAge","LAI","CanCond","Transp","ETr","Kc","fSW","fAge",
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

          try {
            model.run(months);
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

  try {
    model.run(months);
  } catch(e) {
    debugger;
    alert(e);
  }

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2NvbnN0YW50cy9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvcGxhbnRhdGlvbi9pbmRleC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9wbGFudGF0aW9uX3N0YXRlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9jb25kdWN0YW5jZS5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2ZhZ2UuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2luZGV4LmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvaW50Y3B0bi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wZnMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9wci5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvc2xhLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3dlYXRoZXIvaW5kZXguanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIi4uL3BvcGxhci0zcGctbW9kZWwvbGliL2lvLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvcnVuLmpzIiwiLi4vcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiLCIuLi9wb3BsYXItM3BnLW1vZGVsL2xpYi92YWxpZGF0ZS5qcyIsImpzbGliL2FwcC5qcyIsImpzbGliL2NoYXJ0cy5qcyIsImpzbGliL2V4cG9ydC5qcyIsImpzbGliL2ZsYXNoYmxvY2stZGV0ZWN0b3IuanMiLCJqc2xpYi9nZHJpdmUuanMiLCJqc2xpYi9nZHJpdmVSVC5qcyIsImpzbGliL2lucHV0Rm9ybS5qcyIsImpzbGliL21vZGVsSU8uanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi9vdXRwdXREZWZpbml0aW9ucy5qcyIsImpzbGliL3dlYXRoZXJGaWxlUmVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2dCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3orQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ppQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaW8gPSByZXF1aXJlKCcuL2xpYi9pbycpO1xudmFyIHJ1biA9IHJlcXVpcmUoJy4vbGliL3J1bicpKGlvKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIGFyZSBjb25zdGFudHMuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgYXNjZV9ldHJfd2luZHNwZWVkIDoge1xuICAgICAgICAgICAgdmFsdWU6IDIsXG4gICAgICAgICAgICB1bml0czogXCJtL3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlZmF1bHQgV2luZCBTcGVlZCB1c2VkIHRvIGNhbGN1bGF0ZSBFVHIgKGFuZCByZXN1bHRhbnQgS2MpIGZvciBNb2RlbC5cIlxuICAgICAgICB9LFxuICAgICAgICBkYXlzX3Blcl9tb250aDoge1xuICAgICAgICAgICAgdmFsdWU6IDMwLjQsXG4gICAgICAgICAgICB1bml0czogXCJkYXlzL21vXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZTIwOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4yLFxuICAgICAgICAgICAgdW5pdHM6IFwidnAvdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICAgICAgICB9LFxuICAgICAgICByaG9BaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAxLjIsXG4gICAgICAgICAgICB1bml0czogXCJrZy9tXjNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlbnNpdHkgb2YgYWlyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFtYmRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQ2MDAwMCxcbiAgICAgICAgICAgIHVuaXRzOiBcIkova2dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEY29udjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNjIyLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtOTAsXG4gICAgICAgICAgICB1bml0czogXCJXL21eMlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBRYjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBnRE1fbW9sOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQsXG4gICAgICAgICAgICB1bml0czogXCJnL21vbChDKVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbW9sUEFSX01KOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4zLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9sKEMpL01KXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmVlIDogcmVxdWlyZSgnLi90cmVlJyksXG4gIHBsYW50YXRpb24gOiByZXF1aXJlKCcuL3BsYW50YXRpb24nKSxcbiAgcGxhbnRhdGlvbl9zdGF0ZSA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbl9zdGF0ZScpLFxuICBzb2lsIDogcmVxdWlyZSgnLi9zb2lsJyksXG4gIHdlYXRoZXIgOiByZXF1aXJlKCcuL3dlYXRoZXInKSxcbiAgbWFuYWdlIDogcmVxdWlyZSgnLi9tYW5hZ2UnKSxcbiAgY29uc3RhdHMgOiByZXF1aXJlKCcuL2NvbnN0YW50cycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc2NyaXB0aW9uIDogXCJDcm9wIE1hbmFnZW1lbnQgUGFyYW1ldGVyc1wiLFxuICB2YWx1ZSA6IHtcbiAgICBpcnJpZ0ZyYWMgOiB7XG4gICAgICB2YWx1ZSA6IDEsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiSXJyaWdhdGlvbiBmcmFjdGlvbjogMSA9IGZ1bGx5IGlycmlnYXRlZCwgMCA9IG5vIGlycmlnYXRpb24uIEFueSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGFyZSBhY2NlcHRhYmxlXCJcbiAgICB9LFxuICAgIGZlcnRpbGl0eSA6IHtcbiAgICAgIHZhbHVlIDogMC43LFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlNvaWwgZmVydGlsaXR5XCJcbiAgICB9LFxuICAgIGRhdGVQbGFudGVkIDoge1xuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHRoZSBjcm9wIHdhcyBwbGFudGVkXCJcbiAgICB9LFxuICAgIGRhdGVDb3BwaWNlZCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSBvZiB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBjb3BwaWNlSW50ZXJ2YWwgOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsXG4gICAgICAgIHZhbHVlIDogMyxcbiAgICAgICAgdW5pdHMgOiBcIlllYXJzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgY29wcGljZURhdGVzIDoge1xuICAgICAgICByZXF1aXJlZCA6IGZhbHNlLFxuICAgICAgICB2YWx1ZSA6IFwiXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgZGF0ZUZpbmFsSGFydmVzdCA6IHtcbiAgICAgICAgcmVxdWlyZWQgOiBmYWxzZSxcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB3aGVuIHRoZSBjcm9wIGlzIGNvbXBsZXRlbHkgaGFydmVzdGVkXCJcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJHcmVlbndvb2QgUEcgVmFsdWVzIChkZWZhdWx0KVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICByZXF1aXJlZCA6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFN0b2NraW5nRGVuc2l0eToge1xuICAgICAgICAgICAgdmFsdWU6IDM1ODcsXG4gICAgICAgICAgICB1bml0czogXCJUcmVlcy9oZWN0YXJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB0cmVlcyBwbGFudGVkIHBlciBoZWN0YXJcIlxuICAgICAgICB9LFxuICAgICAgICBTZWVkbGluZ01hc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDQsXG4gICAgICAgICAgICB1bml0czogXCJrR1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFzcyBvZiB0aGUgc2VlZGxpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBzdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIGZvbGlhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byByb290XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQbGFudGF0aW9uIHN0YXRlIGNsYXNzLCBjb250YWluaW5nIGFsbCBpbnRlbWVkaWF0ZSB2YWx1ZXMgYXQgZXZlcnkgdGltZXN0ZXAgb2YgdGhlIG1vZGVsXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZmVlZHN0b2NrSGFydmVzdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQ291bnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0cmVlIGF0IHRoZSB0aW1lIG9mIGNvcHBpY2VcIlxuICAgICAgICB9LFxuICAgICAgICBWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwia1BBXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpXCJcbiAgICAgICAgfSxcbiAgICAgICAgZlQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVGVtcGVyYXR1cmUgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmRnJvc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZOdXRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk51dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnRcIlxuICAgICAgICB9LFxuICAgICAgICBmU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29pbCB3YXRlciBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgUEFSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcIm1vbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIHhQUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSW50Y3B0bjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSByYWluZmFsbCBpbnRlcmNlcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBBU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIEN1bUlycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3VtdWxhdGl2ZSBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVxdWlyZWQgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0YW5kQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRoZSB0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgTEFJOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgYXJlYSBpbmRleFwiXG4gICAgICAgIH0sXG4gICAgICAgIENhbkNvbmQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGNvbmR1Y3RhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVHJhbnNwOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBtb250aGx5IHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBFVHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZWZlcmVuY2UgKEFsZmFsZmEpIHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBLYzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDcm9wIENvZWZmaWNpZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAgUGh5c01vZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1XCJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhdGlvIG9mIGZvbGlhZ2UgdG8gc3RlbSBwYXJ0aXRpb25pbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBsaXR0ZXJmYWxsOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIE5QUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTmV0IFByaW1hcnkgUHJvZHVjdGl2aXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgUm9vdFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCBwcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBkVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBXRjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJGb2xpYWdlIHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1I6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm9vdCB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFdTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0ZW0geWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRvdGFsIHlpZWxkOiByb290ICsgc3RlbSArIGZvbGlhZ2VcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNvaWwgaW5mb3JtYXRpb24gYmFzZWQgb24gY3VycmVudCBsb2NhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1heEFXUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIGF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3dwb3dlcjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3dlciBwYXJhbWV0ZXIgYmFzZWQgb24gY2xheSBjb250ZW50IG9mIHNvaWxcIlxuICAgICAgICB9LFxuICAgICAgICBzd2NvbnN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImNvbnN0YW50IHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW2djIG0vc10/XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2ljYWwgbW9kaWZlciwgc3BlY2lmaWVzIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UuICBVc2VkIGluIGNhbGN1bGF0aW9uIG9mIHRyYW5zcGlyYXRpb25cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAwMVxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB2YWx1ZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDJcbiAgICAgICAgfSxcbiAgICAgICAgbGFpOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgQXJlYSBJbmRleCB3aGVyZSBwYXJhbWV0ZXIgcmVhY2hlcyBhIG1heGltdW0gdmFsdWUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi42XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGdyb3d0aCBsaW1pdGVyIGFzIGEgZnVuY3Rpb24gb2YgdGhlIHRyZWUgYWdlLiAgVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW5jeSBwYXJhbWV0ZXIuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3dhMHEyaWgxOGhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiA0Ny41XG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAzLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIHBhcmFtZXRlcnMgYWZmZWN0aW5nIHRlbXBlcmF0dXJlIG1vZGlmaWVyLCBmVC4gQSBncmFwaCBvZiBob3cgdGhlc2UgcGFyYW1ldGVycyBhZmZlY3QgdGhlIHRlbXBlcmF0dXJlIG1vZGlmaWVyIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82OWl3cXRubDI4XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtaW5pbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBvcHQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBvcHRpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMjBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltDXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtYXhpbXVtIHRlbXBlcmF0dXJlIG9mIHJlc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogNTBcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBzcGVjaWZ5IGdyb3d0aCBwYXJhbWV0ZXJzIHNwZWNpZmljIHRvIHRoZSBzcGVjaWVzIG9mIHRyZWUuXCIsXG4gICAgdmFsdWUgOiB7XG4gICAgICAgIGs6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYWRpYXRpb24gRXh0aW5jdGlvbiBDb2VmZmljaWVudC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgZnVsbENhbkFnZToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJZZWFyIHdoZXJlIHRyZWUgcmVhY2hlcyBmdWxsIENhbm9weSBDb3Zlci5cIixcbiAgICAgICAgICAgIHZhbHVlOiAxLjVcbiAgICAgICAgfSxcbiAgICAgICAga0c6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltrUEFeLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXRlcm1pbmVzIHRoZSByZXNwb25zZSBvZiB0aGUgY2Fub3B5IGNvbmR1Y3RhbmNlIHRvIHRoZSB2YXBvciBwcmVzc3VyZSBkZWZpY2l0LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBhbHBoYToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tnL21vbCA/XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHF1YW50dW0gZWZmaWNpZW5jeS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjA4XG4gICAgICAgIH0sXG4gICAgICAgIGZUIDogcmVxdWlyZSgnLi9mdCcpLFxuICAgICAgICBCTGNvbmQ6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgYm91bmRhcnkgbGF5ZXIgY29uZHVjdGFuY2UuIFVzZWQgaW4gdGhlIGNhbGN1YXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDRcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZTogcmVxdWlyZSgnLi9mYWdlJyksXG4gICAgICAgIGZOMDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIHRoZSBudXRyaXRpb25hbCBtb2RpZmllcixmTnV0ci4gIGZOdXRyIHJhbmdlcyBmcm9tIFtmTk8sMSkgYmFzZWQgb24gdGhlIGZlcnRpbGl0eSBpbmRleCB3aGljaCByYW5nZXMgZnJvbSAwIHRvIDEuICBXaGVuIGZOMD0xIGluZGljYXRlcyBmTnV0ciBpcyAxXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNlxuICAgICAgICB9LFxuICAgICAgICBTTEE6IHJlcXVpcmUoJy4vc2xhJyksXG4gICAgICAgIC8vQ2hlY2tVbml0c0NoYW5nZXRvbGluZWFyRnVuY3Rpb25cbiAgICAgICAgQ29uZHVjdGFuY2U6IHJlcXVpcmUoJy4vY29uZHVjdGFuY2UnKSxcbiAgICAgICAgSW50Y3B0bjogcmVxdWlyZSgnLi9pbnRjcHRuJyksXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFzc2ltaWxhdGlvbiB1c2UgZWZmaWNpZW5jeS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdGhlIE5QUC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjQ3XG4gICAgICAgIH0sXG4gICAgICAgIHBmczogcmVxdWlyZSgnLi9wZnMnKSxcbiAgICAgICAgcFI6IHJlcXVpcmUoJy4vcHInKSxcbiAgICAgICAgcm9vdFA6IHJlcXVpcmUoJy4vcm9vdHAnKSxcbiAgICAgICAgbGl0dGVyZmFsbDogcmVxdWlyZSgnLi9saXR0ZXJmYWxsJylcbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSYWluZmFsbCBpbnRlcmNlcHRpb24gZnJhY3Rpb24uICBBIGxpbmVhciBmdW5jdGlvbiB3LnIudC4gTEFJXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdmFsdWUsIHdoZW4gbGFpPTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4yNFxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiA3LjNcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZnJhY3Rpb25hbCBtb250aGx5IGxvc3Mgb2YgZm9saWFnZS4gVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW55IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvNmlxOXBwZHFzN1wiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMTVcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAzXG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi41XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGlzIGRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZS4gVGhpcyBpcyBjYWxjdWxhdGVkIHdpdGggYSBwYWlyIG9mIGFsbG9tZXRyaWMgcG93ZXIgZXF1YXRpb25zLiAgVGhlIGZpcnN0IHJlbGF0ZXMgYmFzYWwgZGlhbWV0ZXIsIChET0IpIHRvIHRvdGFsIHdvb2R5IGJpb21hc3MsIHdoaWxlIHRoZSBzZWNvbmQgcmVsYXRlcyBET0IgdG8gcGZzLiAgVGhlIHBhcmFtZXRlcml6YXRpb24gb2YgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIERPQiBhbmQgd29vZHkgYmlvbWFzcyBpcyBpbnZlcnRlZCB0byBkZXRlcm1pbmUgdGhlIERPQiBmcm9tIHRoZSBtb2RlbGVkIHdvb2R5IGZyYWN0aW9uLiAgVGhpcyByZWxhdGlvbiBpcyBwbG90dGVkIGF0OiAuICBUaGUgbW9kZWwgYWxsb2NhdGVzIHRoZSBhcHByb3ByaWF0ZSBmcmFjdGlvbiBvZiB3b29kIGJhc2VkIG9uIHRoZSBTdG9ja2luZyBkZW5zaXR5IG9mIHRoZSBwbGFudGF0aW9uLiBET0IgcmF0aGVyIHRoYW4gREJIIGlzIHVzZWQgZm9yIGNvbXBhcmlzb24gb2YgdHJlZXMgd2l0aCBhIGhpZ2ggc3RlbUNudCBhbmQgcmFwaWQgY29wcGljaW5nIHZhbHVlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHN0ZW1DbnQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2ZXJhZ2UgbnVtYmVyIG9mIHN0ZW1zIHBlciBzdHVtcFwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuOFxuICAgICAgICB9LFxuICAgICAgICBzdGVtQzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2NtXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29uc3RhbnQgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHdvb2R5IGJpb21hc3NcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjE4XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1QOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzcy5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjRcbiAgICAgICAgfSxcbiAgICAgICAgcGZzTXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gcG9zc2libGUgcGZzIHZhbHVlIGFsbG93ZWRcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIHBmc1A6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERCTyB0byBwZnNcIixcbiAgICAgICAgICAgIHZhbHVlOiAtMC43NzJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzQzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2NtXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29uc3RhbnQgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHBmcy5cIixcbiAgICAgICAgICAgIHZhbHVlOiAxLjNcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSBhbGxvY2F0aW9uIHRvIHRoZSByb290LCB3aGVuIHRoZSBwaHlzaW9sb2dhbCBwYXJhbWV0ZXIgaXMgMS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjE3XG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gbTAuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC43XG4gICAgICAgIH0sXG4gICAgICAgIG0wOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXBlbmRhbmNlIG9uIHRoZSBmZXJ0aWxpdHkgaW5kZXguIDAgaW5kaWNhdGVzIGZ1bGwgZGVwZW5kYW5jZSBvbiBmZXJ0aWxpdHksIDEgaW5kaWNhdGVzIGEgY29uc3RhbnQgYWxsb2NhdGlvbiwgaW5kZXBlbmRhbnQgb2YgZmVydGlsaXR5XCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIHR1cm5vdmVyOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbW9udGheLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1vbnRobHkgcm9vdCB0dXJub3ZlciByYXRlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJUaGVzZSBwYXJhbWV0ZXJzIHNwZWNpZnkgcm9vdCBhbGxvY2F0aW9uIHRvIGdyb3d0aCBhZnRlciBjb3BwaWNpbmcuXCIsXG4gICAgdmFsdWUgOiB7XG4gICAgICBmcmFjOiB7XG4gICAgICAgICAgdW5pdHM6IFwiW21vbnRoXjFdXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIGFtb3VudCBvZiByb290IGJpb21hc3MgdGhhdCBleGNlZWRzIHRoZSBhYm92ZWdyb3VuZCByZXF1aXJlbWVudHMgdGhhdCBjYW4gYmUgc3VwcGxpZWQgaW4gYSBnaXZlbiBtb250aC5cIixcbiAgICAgICAgICB2YWx1ZTogMC4yXG4gICAgICB9LFxuICAgICAgTEFJVGFyZ2V0OiB7XG4gICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIGEgdGFyZ2V0IExBSSByYXRlLiAgVGhlIFRhcmdldCBMQUkgaXMgaW5jbHVkZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIGEgdGFyZ2V0IE5QUCwgYmFzZWQgb24gd2VhdGhlciBwYXJhbWF0ZXJzLiAgQmVsb3cgdGhpcyB0YXJnZXQsIHRoZSByb290cyB3aWxsIGNvbnRyaWJ1dGUgYmlvbWFzcyBpZiB0aGUgYmVsb3cgZ3JvdW5kIHJvb3QgbWFzcyBleGNlZWRzIHRoZSByZXF1aXJlbWVudHMgb2YgdGhlIGFib3ZlZ3JvdW5kIGJpb21hc3MuIFRoZSB0YXJnZXQgaXMgc3BlY2lmaWVkIGluIExBSSB0byB0aW1lIHJvb3QgY29udHJpYnV0aW9ucyB0byBwZXJpb2RzIG9mIGdyb3d0aFwiLFxuICAgICAgICAgIHZhbHVlOiAxMFxuICAgICAgfSxcbiAgICAgIGVmZmljaWVuY3k6IHtcbiAgICAgICAgICB1bml0czogXCJba2cva2ddXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBlZmZpY2llbmN5IGluIGNvbnZlcnRpbmcgcm9vdCBiaW9tYXNzIGludG8gYWJvdmVncm91bmQgYmlvbWFzcy5cIixcbiAgICAgICAgICB2YWx1ZTogMC43XG4gICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcIlttXjIva2ddXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBTcGVjaWZpYyBMZWFmIEFyZWEgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFVzZWQgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIExBSS4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxOVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDEwLjhcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiA1XG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9udGg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbW9udGggbnVtYmVyIHNpbmNlIHBsYW50aW5nXCJcbiAgICB9LFxuICAgIHRtaW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0bWF4OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHRlbXBlcmF0dXJlIGZvciBncm93dGhcIlxuICAgIH0sXG4gICAgdGRtZWFuOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXcgcG9pbnQgdGVtcGVyYXR1cmVcIlxuICAgIH0sXG4gICAgcHB0OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlByZWNpcGl0YXRpb25cIlxuICAgIH0sXG4gICAgcmFkOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbGFyIHJhZGlhdGlvblwiXG4gICAgfSxcbiAgICBucmVsOiB7XG4gICAgICAgIHJlcXVpcmVkIDogZmFsc2UsIC8vIGNhbGN1YXRlZFxuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH0sXG4gICAgZGF5bGlnaHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG5AbW9kdWxlIDNQRyBNb2R1bGVcbioqL1xuXG5cbi8qKlxuQ2xhc3MgZm9yIGFsbCB0aGUgZnVuY3Rpb25zIHRoYXQgcnVuIGluIGEgc2luZ2xlIHN0ZXAgb2YgdGhlIG1vZGVsXG5cbkBjbGFzcyBtb2R1bGUuZXhwb3J0c1xuKiovXG5cblxuLyoqXG5saXN0IG9mIGNvbnN0YW50cyB1c2VkIGZvciBjb21wdXRhdGlvbnNcblxuQGF0dHJpYnV0ZSBjb25zdGFudFxuKiovXG52YXIgY29uc3RhbnRzID0ge1xuICBhc2NlX2V0cl9lbGV2YXRpb246IHtcbiAgICB2YWx1ZTo1MDAsXG4gICAgdW5pdHM6J20vcycsXG4gICAgZGVzY3JpcHRpb246J0VzdGltYXRlZCBFbGV2YXRpb24gb2YgY2FsY3VsYXRpb24gb2YgRVRyIChhbmQgS2MpJ1xuICB9LFxuICBhc2NlX2V0cl93aW5kc3BlZWQ6IHtcbiAgICB2YWx1ZToyLFxuICAgIHVuaXRzOidtL3MnLFxuICAgIGRlc2NyaXB0aW9uOidDb25zdGFudCB3aW5kIHNwZWVkIGZvciBjYWxjdWxhdGlvbiBvZiBFVHIgKGFuZCBLYyknXG4gIH0sXG4gIGUyMDp7XG4gICAgICB2YWx1ZToyLjIsXG4gICAgICB1bml0czondnAvdCcsXG4gICAgICBkZXNjcmlwdGlvbjonUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMEMnXG4gIH0sXG4gIHJob0Fpcjp7XG4gICAgICB2YWx1ZToxLjIsXG4gICAgICB1bml0czona2cvbV4zJyxcbiAgICAgIGRlc2NyaXB0aW9uOidEZW5zaXR5IG9mIGFpcidcbiAgfSxcbiAgbGFtYmRhOntcbiAgICAgIHZhbHVlOjI0NjAwMDAsXG4gICAgICB1bml0czonSi9rZycsXG4gICAgICBkZXNjcmlwdGlvbjonTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm8nXG4gIH0sXG4gIFZQRGNvbnY6e1xuICAgICAgdmFsdWU6MC4wMDA2MjIsXG4gICAgICB1bml0czonPycsXG4gICAgICBkZXNjcmlwdGlvbjonQ29udmVydCBWUEQgdG8gc2F0dXJhdGlvbiBkZWZpY2l0ID0gMTgvMjkvMTAwMCdcbiAgfSxcbiAgUWE6e1xuICAgICAgdmFsdWU6LTkwLFxuICAgICAgdW5pdHM6J1cvbV4yJyxcbiAgICAgIGRlc2NyaXB0aW9uOidJbnRlcmNlcHQgb2YgbmV0IHJhZGlhdGlvbiB2ZXJzdXMgc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcCdcbiAgfSxcbiAgUWI6e1xuICAgICAgdmFsdWU6MC44LFxuICAgICAgdW5pdHM6J3VuaXRsZXNzJyxcbiAgICAgIGRlc2NyaXB0aW9uOidzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXAnXG4gIH0sXG4gIGdETV9tb2w6e1xuICAgICAgdmFsdWU6MjQsXG4gICAgICB1bml0czonZy9tb2woQyknLFxuICAgICAgZGVzY3JpcHRpb246J01vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlcidcbiAgfSxcbiAgbW9sUEFSX01KOntcbiAgICAgIHZhbHVlOjIuMyxcbiAgICAgIHVuaXRzOidtb2woQykvTUonLFxuICAgICAgZGVzY3JpcHRpb246J0NvbnZlcnNpb24gb2Ygc29sYXIgcmFkaWF0aW9uIHRvIFBBUidcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuY29uc3RhbnQgPSBjb25zdGFudDtcbmZ1bmN0aW9uIGNvbnN0YW50KGMpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzW2NdLnZhbHVlO1xufVxuXG4vKipcblRpbWUgRGVwZW5kYW50IEF0dHJpYnV0ZSxcbnVuaXRzPSd2YXJpb3VzJyxcbmRlc2NyaXB0aW9uPSdUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSB0aW1lIGRlcGVuZGFudCBmdW5jdGlvbiB0aGF0IGRlY2F5c1xuKG9yIHJpc2VzIGZyb20gZjAgdG8gZjEuICBUaGUgdmFsdWUgKGYwK2YxKS8yIGlzIHJlYWNoZWQgYXQgdG0sXG5hbmQgdGhlIHNsb3BlIG9mIHRoZSBsaW5lIGF0IHRtIGlzIGdpdmVuIGJ5IHAuXG5AbWV0aG9kIHRkcFxuQHBhcmFtIHhcbkBwYXJhbSBmXG4qKi9cbm1vZHVsZS5leHBvcnRzLnRkcCA9IGZ1bmN0aW9uKHgsZikge1xuICB2YXIgcD1mLmYxICsgKGYuZjAtZi5mMSkqTWF0aC5leHAoLU1hdGgubG9nKDIpKk1hdGgucG93KCh4L2YudG0pLGYubikpO1xuICByZXR1cm4gcDtcbn07XG5cbi8qKlxuQG1ldGhvZCBsaW5cbkBwYXJhbSB4XG5AcGFyYW0gcFxuKi9cbm1vZHVsZS5leHBvcnRzLmxpbiA9IGZ1bmN0aW9uKHgsIHApe1xuICBpZiggeCA8IDAgKSB7XG4gICAgcmV0dXJuIHAubW47XG4gIH1cbiAgaWYoIHggPiBwLnhtYXggKSB7XG4gICAgcmV0dXJuIHAueG1heDtcbiAgfVxuICByZXR1cm4gcC5tbiArIChwLm14LXAubW4pKih4L3AueG1heCk7XG59O1xuXG4vKipcbnVuaXRzPSd1bml0bGVzcycsXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IFJhaW5mYWxsIGludGVyY2VwdGlvbidcbkBtZXRob2QgSW50Y3B0blxuQHBhcmFtIGN1cl9MQUlcbkBwYXJhbSBjXG4qL1xubW9kdWxlLmV4cG9ydHMuSW50Y3B0biA9IGZ1bmN0aW9uKGN1cl9MQUksIGMpe1xuICByZXR1cm4gTWF0aC5tYXgoYy5tbixjLm1uICsgKGMubXggLSBjLm1uKSAqIE1hdGgubWluKDEgLCBjdXJfTEFJIC8gYy5sYWkpKTtcbn07XG5cbi8qKlxudW5pdHM9J21tJyxcbmRlc2NyaXB0aW9uPSdBdmFpbGFibGUgU29pbCBXYXRlcidcbkBtZXRob2QgQVNXXG5AcGFyYW0gbWF4QVNXXG5AcGFyYW0gcHJldl9BU1dcbkBwYXJhbSBkYXRlX3BwdFxuQHBhcmFtIGN1cl9UcmFuc3BcbkBwYXJhbSBjdXJfSW50Y3B0blxuQHBhcmFtIGN1cl9JcnJpZ1xuKi9cbm1vZHVsZS5leHBvcnRzLkFTVyA9IGZ1bmN0aW9uKG1heEFTVywgcHJldl9BU1csIGRhdGVfcHB0LCBjdXJfVHJhbnNwLCBjdXJfSW50Y3B0biwgY3VyX0lycmlnKXtcbiAgcmV0dXJuIE1hdGgubWluKG1heEFTVyoxMCwgTWF0aC5tYXgocHJldl9BU1cgKyBkYXRlX3BwdCAtIChjdXJfVHJhbnNwICsgY3VyX0ludGNwdG4gKiBkYXRlX3BwdCkgKyBjdXJfSXJyaWcsIDApKTtcbn07XG5cbi8vVE9ETzogZG91YmxlIGNoZWNrIHRoZSBhcHByb3ByaWF0ZSB1c2Ugb2YgdGRtZWFuIChkZXcgcG9pbnQgdGVtcClcbi8vVE9ETzogdGFrZSBjb25zdGFudHMgb3V0XG4vKipcbnVuaXRzPSdrUEEnLFxuZGVzY3JpcHRpb249J01lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdCdcbkBtZXRob2QgVlBEXG5AcGFyYW0gZGF0ZV90bWluXG5AcGFyYW0gZGF0ZV90bWF4XG5AcGFyYW0gZGF0ZV90ZG1lYW5cbiovXG5tb2R1bGUuZXhwb3J0cy5WUEQgPSBmdW5jdGlvbihkYXRlX3RtaW4sIGRhdGVfdG1heCwgZGF0ZV90ZG1lYW4pe1xuICByZXR1cm4gKDAuNjEwOCAvIDIgKiAoTWF0aC5leHAoZGF0ZV90bWluICogMTcuMjcgLyAoZGF0ZV90bWluICsgMjM3LjMpICkgKyBNYXRoLmV4cChkYXRlX3RtYXggKiAxNy4yNyAvIChkYXRlX3RtYXggKyAyMzcuMykgKSApICkgLSAoMC42MTA4ICogTWF0aC5leHAoZGF0ZV90ZG1lYW4gKiAxNy4yNyAvIChkYXRlX3RkbWVhbiArIDIzNy4zKSApICk7XG59O1xuXG5cbi8qKlxudW5pdHMgPSB1bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpJ1xuQG1ldGhvZCBmVlBEXG5AcGFyYW0ga0dcbkBwYXJhbSBjdXJfVlBEXG4qL1xubW9kdWxlLmV4cG9ydHMuZlZQRCA9IGZ1bmN0aW9uKGtHLCBjdXJfVlBEKXtcbiAgcmV0dXJuIE1hdGguZXhwKC0xICoga0cgKiBjdXJfVlBEKTtcbn07XG5cbi8vVE9ETzogdGFrZSBjb25zdGFudHMgb3V0XG4vLyBtYWtlIGEgbWVhbmluZ2Z1bCB0ZW1wdmFyIG5hbWVcbi8qKlxudW5pdHMgPSB1bml0bGVzcyxcbmRlc2NyaXB0aW9uID0gJ051bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllcidcbkBtZXRob2QgZkZyb3N0XG5AcGFyYW0gZGF0ZV90bWluXG4qL1xubW9kdWxlLmV4cG9ydHMuZkZyb3N0ID0gZnVuY3Rpb24oZGF0ZV90bWluKSB7XG4gIHZhciB0ZW1wVmFyID0gLTEuMDtcblxuICBpZiggZGF0ZV90bWluID49IDAgKXtcbiAgICB0ZW1wVmFyID0gMS4wO1xuICB9IC8vZWxzZSAtMS4wXG5cbiAgcmV0dXJuIDAuNSAqICgxLjAgKyB0ZW1wVmFyICogTWF0aC5zcXJ0KDEgLSBNYXRoLmV4cCgtMSAqIE1hdGgucG93KCgwLjE3ICogZGF0ZV90bWluKSAsIDIpICogKDQgLyAzLjE0MTU5ICsgMC4xNCAqIE1hdGgucG93KCAoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApIC8gKDEgKyAwLjE0ICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKSApICkgKTtcbn07XG5cbi8vVE9ETyAtIGJldHRlciBuYW1pbmc/OiB0bWluLCB0bWF4ID0gd2VhdGhlciBUb3B0LCBUbWF4LCBUbWluID0gdHJlZSBwYXJhbXNcbi8qKlxudW5pdHM9dW5pdGxlc3MsXG5kZXNjcmlwdGlvbj0nVGVtcGVyYXR1cmUgbW9kaWZpZXInXG5AbWV0aG9kIGZUXG5AcGFyYW0gdGF2Z1xuQHBhcmFtIGZUXG4qL1xubW9kdWxlLmV4cG9ydHMuZlQgPSBmdW5jdGlvbih0YXZnLCBmVCl7XG4gIHZhciBmO1xuICBpZih0YXZnIDw9IGZULm1uIHx8IHRhdmcgPj0gZlQubXgpe1xuICAgIGYgPSAwO1xuICB9IGVsc2Uge1xuICAgIGYgPSAoICh0YXZnIC0gZlQubW4pIC8gKGZULm9wdCAtIGZULm1uKSApICAqXG4gICAgICAgICAgIE1hdGgucG93ICggKCAoZlQubXggLSB0YXZnKSAvIChmVC5teCAtIGZULm9wdCkgKSxcbiAgICAgICAgICAgICAgICAgICAgICAoIChmVC5teCAtIGZULm9wdCkgLyAoZlQub3B0IC0gZlQubW4pIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgfVxuICByZXR1cm4oZik7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nLFxuZGVzY3JpcHRpb249J1JlcXVpcmVkIElycmlnYXRpb24nXG5AbWV0aG9kIElycmlnXG5AcGFyYW0gaXJyaWdGcmFjXG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gZGF0ZV9wcHRcbiovXG5tb2R1bGUuZXhwb3J0cy5JcnJpZyA9IGZ1bmN0aW9uKGlycmlnRnJhYywgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGRhdGVfcHB0KXtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgaXJyaWdGcmFjICogKGN1cl9UcmFuc3AgLSAoMSAtIGN1cl9JbnRjcHRuKSAqIGRhdGVfcHB0KSApO1xufTtcblxuLy9UT0RPOiBnZXQgdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgZlNXXG5AcGFyYW0gQVNXXG5AcGFyYW0gbWF4QVdTXG5AcGFyYW0gc3djb25zdFxuQHBhcmFtIHN3cG93ZXJcbiovXG5tb2R1bGUuZXhwb3J0cy5mU1cgPSBmdW5jdGlvbihBU1csIG1heEFXUywgc3djb25zdCwgc3dwb3dlcikge1xuICB2YXIgZlNXO1xuICBpZiggc3djb25zdCA9PT0gMCB8fCBtYXhBV1MgPT09IDAgKSB7XG4gICAgZlNXID0gMDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgb21yID0gMSAtIChBU1cvMTApIC8gbWF4QVdTOyAvLyBPbmUgTWludXMgUmF0aW9cblxuICAgIGlmKG9tciA8IDAuMDAxKSB7XG4gICAgICBmU1cgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBmU1cgPSAoMS1NYXRoLnBvdyhvbXIsc3dwb3dlcikpLygxK01hdGgucG93KG9tci9zd2NvbnN0LHN3cG93ZXIpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZTVztcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdOdXRyaXRpb25hbCBGcmFjdGlvbiwgbWlnaHQgYmUgYmFzZWQgb24gc29pbCBhbmQgZmVydGlsaXplciBhdCBzb21lIHBvaW50J1xuQG1ldGhvZCBmTnV0clxuQHBhcmFtIGZOMFxuQHBhcmFtIEZSXG4qL1xubW9kdWxlLmV4cG9ydHMuZk51dHIgPSBmdW5jdGlvbihmTjAsIEZSKXtcbiAgcmV0dXJuIGZOMCArICgxIC0gZk4wKSAqIEZSO1xufTtcblxuLyoqXG5UT0RPOiB3aHkgJDMgaW4gbWFrZWZpbGUgLSBhc2sgYWJvdXQgaXRcbnVuaXRzPXVuaXRsZXNzXG5kZXNjcmlwdGlvbj0nUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnUnXG5AbWV0aG9kIFBoeXNNb2RcbkBwYXJhbSBjdXJfZlZQRFxuQHBhcmFtIGN1cl9mU1dcbkBwYXJhbSBjdXJfZkFnZVxuKi9cbm1vZHVsZS5leHBvcnRzLlBoeXNNb2QgPSBmdW5jdGlvbihjdXJfZlZQRCwgY3VyX2ZTVywgY3VyX2ZBZ2Upe1xuICAgcmV0dXJuIE1hdGgubWluKGN1cl9mVlBEICwgY3VyX2ZTVykgKiBjdXJfZkFnZTtcbn07XG5cbi8qKlxudW5pdHM9J2djLG0vcycsXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IENvbmR1Y3RhbmNlJ1xuQG1ldGhvZCBDYW5Db25kXG5AcGFyYW0gUGh5c01vZFxuQHBhcmFtIExBSVxuQHBhcmFtIGNvbmRcbiovXG5tb2R1bGUuZXhwb3J0cy5DYW5Db25kID0gZnVuY3Rpb24oUGh5c01vZCwgTEFJLCBjb25kKXtcbiAgIHJldHVybiBNYXRoLm1heChjb25kLm1uICwgY29uZC5teCAqIFBoeXNNb2QgKiBNYXRoLm1pbigxICwgTEFJIC8gY29uZC5sYWkpICk7XG59O1xuXG4vKipcbnVuaXRzPSdtbS9tb24nIHdoaWNoIGlzIGFsc28ga2cvbTIvbW9uXG5kZXNjcmlwdGlvbj0nQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvbidcbkBtZXRob2QgVHJhbnNwXG5AcGFyYW0gZGF0ZV9ucmVsXG5AcGFyYW0gZGF5c1xuQHBhcmFtIGRhdGVfZGF5bGlnaHRcbkBwYXJhbSBjdXJfVlBEXG5AcGFyYW0gQkxjb25kXG5AcGFyYW0gY3VyX0NhbkNvbmRcbiovXG5tb2R1bGUuZXhwb3J0cy5UcmFuc3AgPSBmdW5jdGlvbihkYXRlX25yZWwsIGRheXMsIGRhdGVfZGF5bGlnaHQsIGN1cl9WUEQsIEJMY29uZCwgY3VyX0NhbkNvbmQpe1xuICB2YXIgVlBEY29udiA9IGNvbnN0YW50KCdWUERjb252Jyk7XG4gIHZhciBsYW1iZGEgPSBjb25zdGFudCgnbGFtYmRhJyk7XG4gIHZhciByaG9BaXIgPSBjb25zdGFudCgncmhvQWlyJyk7XG4gIHZhciBlMjAgPSBjb25zdGFudCgnZTIwJyk7XG4gIHZhciBRYSA9IGNvbnN0YW50KCdRYScpO1xuICB2YXIgUWIgPSBjb25zdGFudCgnUWInKTtcblxuICAvLyBkYXRlX2RheWxpZ2h0ID0gaG91cnNcbiAgLy8gbnJlbCBpcyBpbiBNSi9tXjIvZGF5IGNvbnZlcnQgdG8gV2gvbV4yL2RheVxuICB2YXIgbmV0UmFkID0gUWEgKyBRYiAqICgoZGF0ZV9ucmVsICogMjc3Ljc3OCkgLyBkYXRlX2RheWxpZ2h0KTtcbiAgdmFyIGRlZlRlcm0gPSByaG9BaXIgKiBsYW1iZGEgKiBWUERjb252ICogY3VyX1ZQRCAqIEJMY29uZDtcbiAgdmFyIGRpdiA9IDEgKyBlMjAgKyBCTGNvbmQgLyBjdXJfQ2FuQ29uZDtcblxuICAvLyBDb252ZXJ0IGRheWxpZ2h0IHRvIHNlY3MuXG4gIHJldHVybiBkYXlzICogKCAoZTIwICogbmV0UmFkICsgZGVmVGVybSApIC8gZGl2ICkgKiBkYXRlX2RheWxpZ2h0ICogMzYwMCAvIGxhbWJkYTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdFVHInXG5AbWV0aG9kIEVUclxuQHBhcmFtIFJzIChNSi9tMi9kYXkpXG5AcGFyYW0gZGF5c1xuQHBhcmFtIFRtICh0bWluK3RtYXgpLzJcbkBwYXJhbSBjdXJfVlBEID0gKGVzLWVhKVxuQHBhcmFtIGVsZXZhdGlvbiAobSlcbkBwYXJhbSB3aW5kX3NwZWVkIChtL3MpXG4qL1xuXG5tb2R1bGUuZXhwb3J0cy5FVHIgPSBmdW5jdGlvbihScyx0bWluLHRtYXgsdGRtZWFuLGRheXMsWix1Mil7XG4gIHUyID0gdHlwZW9mIHUyICE9PSAndW5kZWZpbmVkJyA/IHUyIDogY29uc3RhbnQoJ2FzY2VfZXRyX3dpbmRzcGVlZCcpO1xuICBaID0gdHlwZW9mIFogIT09ICd1bmRlZmluZWQnID8gWiA6IGNvbnN0YW50KCdhc2NlX2V0cl9lbGV2YXRpb24nKTtcblxuICAvLyBGQU8gNTYgQ3JvcCBFdmFwb3JhdGlvblxuICB2YXIgcHN5Y2hyb21ldHJpY19jb25zdGFudCA9IGZ1bmN0aW9uKHopIHtcbiAgICB2YXIgUD0xMDEuMyAqIE1hdGgucG93KCgyOTMgLSAoMC4wMDY1KSp6KS8yOTMsNS4yNik7XG4gICAgZyA9IDAuNjY1KiBNYXRoLnBvdygxMCwtMykqUDtcbiAgICByZXR1cm4gZztcbiAgfTtcblxuICB2YXIgc2xvcGVfb2Zfc2F0dXJhdGlvbl92YXBvcl9wcmVzc3VyZT0gZnVuY3Rpb24oVG0pIHtcbiAgICByZXR1cm4gNDA5OC4xNyAqIDAuNjEwOCAqIE1hdGguZXhwKFRtICogMTcuMjcgLyAoVG0gKyAyMzcuMykpIC8gTWF0aC5wb3coKFRtICsyMzcuMyksMilcbiAgfTtcblxuICB2YXIgdnAgPSBmdW5jdGlvbihUKSB7XG4gICAgcmV0dXJuIDAuNjEwOCAqIE1hdGguZXhwKFQgKiAxNy4yNyAvIChUICsgMjM3LjMpKTsgXG4gIH07XG5cbiAgdmFyIFJubCA9IGZ1bmN0aW9uKHRtaW4sdG1heCx0ZG1lYW4sSykge1xuICAgIHJldHVybiAtKDEuMzUgKiBLIC0gMC4zNSkgKiAoMC4zNCAtIDAuMTQgKiBNYXRoLnNxcnQodnAodGRtZWFuKSkpICogTWF0aC5wb3coNC45MywtMDkpICogKChNYXRoLnBvdyh0bWluICsyNzMuMTYsNCkgKyBNYXRoLnBvdyh0bWF4ICsgMjczLjE2LDQpKSAvIDIpO1xuICB9XG4gIC8vMC40MDggKiBkZWx0YSAqICggUm4gLSBHKSArIHBzeWNoICogKENuIC8gKFQgKyAyNzMpKSAqIHUyICogKGVzIC1lYSApIC8gKGRlbHRhICsgcHN5Y2ggKiAoMSArIENkICogdTIgKSlcbiAgLy8gRVRyOntDbjoxNjAwLENkOjAuMzh9LEVUbzp7Q246OTAwLENkPTAuMzR9XG4gIC8vUm4gPSBNSiAvIG0yIGRheSA9PiBkYXRlX25yZWwgKE1KL21eMi9kYXkpXG4gIC8vRz0wXG4gIC8vdTIgPSBtL3NcbiAgLy8gVCA9IG1lYW4gVCAoQylcbiAgLy8gKGVzLWVhKSA9IHNhdHVyYXRpb24gVmFwb3IgUHJlc3N1cmUgKEtwYSkgPT4gY3VyX1ZQRFxuICB2YXIgVG09KHRtaW4rdG1heCkvMjtcbiAgdmFyIENuPTE2MDA7XG4gIHZhciBDZD0wLjM4O1xuICB2YXIgVlBEID0gKCh2cCh0bWluKSt2cCh0bWF4KSkvMiktdnAodGRtZWFuKTtcbiAgdmFyIGcgPSBwc3ljaHJvbWV0cmljX2NvbnN0YW50KFopO1xuICB2YXIgRCA9IHNsb3BlX29mX3NhdHVyYXRpb25fdmFwb3JfcHJlc3N1cmUoVG0pO1xuICB2YXIgUm5sID0gUm5sKHRtaW4sdG1heCx0ZG1lYW4sMS4wKTtcbiAgUm5sID0tOTAgLyAyNzcuMDtcbiAgdmFyIHJhZCA9IDAuNDA4ICogRCAqIChScyAqICgxIC0gMC4yMykgKyBSbmwpOyBcbiAgdmFyIGRlZiA9IGcgKiAoQ24vKFRtKzI3MykpICogdTIgKiBWUEQ7XG4gIHZhciBkaXYgPSBEICsgZyAqICgxICsgQ2QqdTIpO1xuICB2YXIgRVRyID0gKHJhZCtkZWYpL2RpdjtcbiAvLyBjb25zb2xlLmxvZyh7VG06VG0sRDpELFJubDpSbmwsUnM6UnMsRVRyOkVUcn0pXG4gIC8vIENvbnZlcnQgZGF5bGlnaHQgdG8gc2Vjcy5cbiAgcmV0dXJuIGRheXMgKiBFVHI7XG59O1xuXG4vL1RPRE86IGRlc2NyaXB0aW9uXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbkBtZXRob2QgTlBQXG5AcGFyYW0gcHJldl9TdGFuZEFnZVxuQHBhcmFtIGZ1bGxDYW5BZ2VcbkBwYXJhbSB4UFBcbkBwYXJhbSBrXG5AcGFyYW0gcHJldl9MQUlcbkBwYXJhbSBmVlBEXG5AcGFyYW0gZlNXXG5AcGFyYW0gZkFnZVxuQHBhcmFtIGFscGhhXG5AcGFyYW0gZk51dHJcbkBwYXJhbSBmVFxuQHBhcmFtIGZGcm9zdFxuKi9cbm1vZHVsZS5leHBvcnRzLk5QUCA9IGZ1bmN0aW9uKHByZXZfU3RhbmRBZ2UsIGZ1bGxDYW5BZ2UsIHhQUCwgaywgcHJldl9MQUksIGZWUEQsIGZTVywgZkFnZSwgYWxwaGEsIGZOdXRyLCBmVCwgZkZyb3N0KXtcbiAgdmFyIENhbkNvdmVyID0gMTtcbiAgaWYoIHByZXZfU3RhbmRBZ2UgPCBmdWxsQ2FuQWdlICl7XG4gICAgQ2FuQ292ZXIgPSBwcmV2X1N0YW5kQWdlIC8gZnVsbENhbkFnZTtcbiAgfVxuXG4gIHJldHVybiB4UFAgKiAoMSAtIChNYXRoLmV4cCgtayAqIHByZXZfTEFJKSApICkgKiBDYW5Db3ZlciAqIE1hdGgubWluKGZWUEQgLCBmU1cpICogZkFnZSAqIGFscGhhICogZk51dHIgKiBmVCAqIGZGcm9zdDtcbn07XG5cbi8vVE9ETzogdW5pdHMgYW5kIGRlc2NyaXB0aW9uXG4vKipcbkBtZXRob2QgcFJcbkBwYXJhbSBjdXJfUGh5c01vZFxuQHBhcmFtIGN1cl9wUlxuQHBhcmFtIEZSXG5AcGFyYW0gcFJcbiovXG5tb2R1bGUuZXhwb3J0cy5wUiA9IGZ1bmN0aW9uKGN1cl9QaHlzTW9kLCBjdXJfcFIsRlIscFIpe1xuICB2YXIgcCA9KHBSLm14ICogcFIubW4pIC9cbiAgICAgICAgIChwUi5tbiArIChwUi5teCAtIHBSLm1uKSAqIGN1cl9QaHlzTW9kICogKHBSLm0wICsgKDEgLSBwUi5tMCkgKiBGUikgKTtcblxuICAvLyBUaGlzIHdhcyBhZGRlZCBieSBxdWlubiB0byBsaW1pdCByb290IGdyb3d0aC5cbiAgcmV0dXJuIHAgKiBNYXRoLnBvdyhwL2N1cl9wUiwyKTtcbn07XG5cblxuLy9UT0RPOiBtb2xzIG9yIG1vbHMgcGVyIG1eMj9cbi8qKlxudW5pdHM9bW9sc1xuZGVzY3JpcHRpb249J01vbnRobHkgUEFSIGluIG1vbHMgLyBtXjIgbW9udGgnXG5tb2xQQVJfTUogW21vbC9NSl0gaXMgYSBjb25zdGFudCBDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcbkBtZXRob2QgUEFSXG5AcGFyYW0gZGF0ZV9yYWRcbkBwYXJhbSBtb2xQQVJfTUpcbiovXG5tb2R1bGUuZXhwb3J0cy5QQVIgPSBmdW5jdGlvbihkYXRlX3JhZCwgZGF5cywgbW9sUEFSX01KKSB7XG4gIGlmKCBtb2xQQVJfTUogPT09IG51bGwgfHwgbW9sUEFSX01KID09PSB1bmRlZmluZWQgKSB7XG4gICAgbW9sUEFSX01KID0gY29uc3RhbnQoJ21vbFBBUl9NSicpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVfcmFkICogbW9sUEFSX01KICogZGF5cztcbn07XG5cbi8qKlxudW5pdHM9J21ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGEnLFxuZGVzY3JpcHRpb249J21heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBbdERNIC8gaGEgbW9udGhdLFxuTk9URTogMTAwMDAvMTBeNiBbaGEvbTJdW3REbS9nRE1dXG5nR01fbW9sIFtnL21vbF0gaXMgdGhlIG1vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlclxuQG1ldGhvZCB4UFBcbkBwYXJhbSB5XG5AcGFyYW0gY3VyX1BBUlxuQHBhcmFtIGdETV9tb2xcbiovXG5tb2R1bGUuZXhwb3J0cy54UFAgPSBmdW5jdGlvbih5LCBjdXJfUEFSLCBnRE1fbW9sKXtcbiAgICBpZiggZ0RNX21vbCA9PT0gbnVsbCB8fCBnRE1fbW9sID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBnRE1fbW9sID0gY29uc3RhbnQoJ2dETV9tb2wnKTtcbiAgICB9XG5cbiAgICByZXR1cm4geSAqIGN1cl9QQVIgKiBnRE1fbW9sIC8gMTAwO1xufTtcblxuLyoqKiBGVU5DVElPTlMgRk9SIENPUFBJQ0lORyAqL1xuLyoqXG5jb3BwaWNlIHJlbGF0ZWQgZnVuY3Rpb25zXG5AbWV0aG9kIGNvcHBpY2VcbiovXG5tb2R1bGUuZXhwb3J0cy5jb3BwaWNlID0ge1xuICAvLyBDb3BwaWNlIEZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gRGlhbWV0ZXIgb24gU3R1bXAsIE5PVCBEQkguXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiB0aGUgc3RlbSB3ZWlnaHQgaW4gS0dcbiAgcGZzIDogZnVuY3Rpb24oc3RlbSwgcCkge1xuICAgIHZhciBhdkRPQiA9IE1hdGgucG93KCAoIHN0ZW0gLyBwLnN0ZW1DbnQgLyBwLnN0ZW1DKSAsICgxIC8gcC5zdGVtUCkgKTtcbiAgICB2YXIgcHBmcz0gcC5wZnNDICogTWF0aC5wb3coYXZET0IgLCBwLnBmc1ApO1xuXG4gICAgcmV0dXJuIE1hdGgubWluKHAucGZzTXgscHBmcyk7XG4gIH0sXG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHN0ZW0gd2l0aCBpbiBHLiAgVXNlcyB2b2x1bWUgSW5kZXggYXMgZ3VpZGVcbiAgcGZzX3ZpYV9WSSA6IGZ1bmN0aW9uIChzdGVtRywgd3NWSSwgbGFWSSwgU0xBKSB7XG4gICAgaWYgKHN0ZW1HIDwgMTApIHtcbiAgICAgIHN0ZW1HID0gMTA7XG4gICAgfVxuICAgIHZhciBWSSA9IE1hdGgucG93KCAoc3RlbUcgLyB3c1ZJLnN0ZW1zX3Blcl9zdHVtcCAvIHdzVkkuY29uc3RhbnQpLCgxIC8gd3NWSS5wb3dlcikgKTtcblxuICAgIC8vIEFkZCB1cCBmb3IgYWxsIHN0ZW1zXG4gICAgdmFyIGxhID0gbGFWSS5jb25zdGFudCAqIE1hdGgucG93KFZJLGxhVkkucG93ZXIpICogd3NWSS5zdGVtc19wZXJfc3R1bXA7XG4gICAgdmFyIHdmID0gMTAwMCAqIChsYSAvIFNMQSk7ICAvLyBGb2lsYWdlIFdlaWdodCBpbiBnO1xuICAgIHZhciBwZnMgPSB3Zi9zdGVtRztcbiAgICByZXR1cm4gcGZzO1xuICB9LFxuXG4gIFJvb3RQIDogZnVuY3Rpb24oY3VyX25wcCwgY3VyX25wcFRhcmdldCwgV1IsVyxwUngsZnJhYykge1xuICAgIHZhciBucHBSZXMgPSBjdXJfbnBwVGFyZ2V0IC0gY3VyX25wcDtcbiAgICB2YXIgcm9vdFBQO1xuICAgIGlmKCBucHBSZXMgPiAwICYmIFdSL1cgPiBwUnggKSB7XG4gICAgICAgIHJvb3RQUCA9IE1hdGgubWluKG5wcFJlcywgV1IqKFdSL1cgLSBwUngpKmZyYWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb290UFAgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiByb290UFA7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVhZCA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICAgIC8vIFlvdSBuZWVkIHRvIHNldCB5b3VyIElPIGhlcmUgYW5kIG1ha2Ugc3VyZSBhbGwgcGFyYW1ldGVycyBmb3IgbW9kZWwgYXJlIGNvcnJlY3RseSBzZXRcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE8gOiBpbXBsZW1lbnRcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuID0gcmVxdWlyZSgnLi9mbicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL3ZhbGlkYXRlJyk7XG5cbmZ1bmN0aW9uIHJ1bihsZW5ndGhPZkdyb3d0aCkge1xuXG4gICAgdmFyIHllYXJUb0NvcHBpY2U7IC8veWVhciBvZiB0aGUgZmlyc3Qgb3Igc3Vic2VxdWVudCBoYXJ2ZXN0c1xuICAgIHZhciBjb3BwaWNlSW50ZXJ2YWw7IC8vdGhlICMgb2YgbW9udGhzIGluIGEgc2luZ2xlIGNvcHBpY2UgY3ljbGVcbiAgICB2YXIgbW9udGhUb0NvcHBpY2U7IC8vYXQgd2hpY2ggbW9udGggdGhlIGhhcnZlc3QgaXMgdG8gYmUgcGVyZm9ybWVkIDo6IGN1cnJlbnRseSB0aGUgdHJlZSB3aWxsIGJlIGN1dCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoYXQgbW9udGhcbiAgICB2YXIgY29wcGljZURhdGVzO1xuXG4gICAgLy8gaGVscGVyLCBub3QgcmVxdWlyZWQuICB5b3UgY2FuIHJlZ2lzdGVyIGNhbGxiYWNrIHRvIHNldCBwYXJhbWV0ZXJzIHdoZW5ldmVyIHJ1biBpcyBjYWxsZWRcbiAgICB0aGlzLmlvLnJlYWQodGhpcyk7XG5cbiAgICAvLyBtYWtlIHN1cmUgbW9kZWwgaW5wdXRzIGFyZSB2YWxpZCBiZWZvcmUgd2UgcHJvY2VlZCBhbnkgZnVydGhlclxuICAgIHZhbGlkYXRlKHRoaXMpO1xuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAvL3ZhciBwbGFudGVkTW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgLy92YXIgY3VycmVudE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuXG4gICAgLy9UT0RPOiB0ZXN0IG5vIGRhdGVjb3BwaWNlIGFzIGlucHV0XG4gICAgaWYgKCB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQgIT09IHVuZGVmaW5lZCApe1xuICAgICAgeWVhclRvQ29wcGljZSA9IHRoaXMubWFuYWdlLmRhdGVDb3BwaWNlZC5nZXRGdWxsWWVhcigpO1xuICAgICAgbW9udGhUb0NvcHBpY2UgPSB0aGlzLm1hbmFnZS5kYXRlQ29wcGljZWQuZ2V0TW9udGgoKTtcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA9IHRoaXMubWFuYWdlLnllYXJzUGVyQ29wcGljZTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5tYW5hZ2UuY29wcGljZURhdGVzICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICBjb3BwaWNlRGF0ZXMgPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0aGlzLm1hbmFnZS5jb3BwaWNlRGF0ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHRoaXMubWFuYWdlLmNvcHBpY2VEYXRlc1tpXS5zcGxpdCgnLScpO1xuXG4gICAgICAgIHZhciBkID0gMTU7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPiAyICkge1xuICAgICAgICAgIGQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb3BwaWNlRGF0ZXMucHVzaChuZXcgRGF0ZShwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKS0xLCBkKSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBpbml0IG1hbmFnZSBuc1xuICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgdmFyIHNldHVwID0ge1xuICAgICAgbGVuZ3RoT2ZHcm93dGggOiBsZW5ndGhPZkdyb3d0aCxcbiAgICAgIHllYXJUb0NvcHBpY2UgOiB5ZWFyVG9Db3BwaWNlLFxuICAgICAgbW9udGhUb0NvcHBpY2UgOiBtb250aFRvQ29wcGljZSxcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA6IGNvcHBpY2VJbnRlcnZhbCxcbiAgICAgIGNvcHBpY2VEYXRlcyA6IGNvcHBpY2VEYXRlcyxcbiAgICAgIGRheXNfaW5faW50ZXJ2YWwgOiAodGhpcy5kYWlseVN0ZXApPzE6MzAuNFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5ydW5TZXR1cChzZXR1cCk7XG59XG5cbmZ1bmN0aW9uIHJ1blNldHVwKHNldHVwKXtcbiAgICB2YXIgaSwga2V5LCBjdXJyZW50V2VhdGhlciwgc3RlcCwgdDtcblxuICAgIGlmKCB0aGlzLmRlYnVnICkge1xuICAgICAgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgY29uc29sZS5sb2coJ2RheXNfaW5faW50ZXJ2YWw6ICcrc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSAodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIG0gPSAnMCcrbTtcbiAgICB9XG5cbiAgICB2YXIgZCA9ICh0aGlzLmN1cnJlbnREYXRlLmdldERhdGUoKSkrJyc7XG4gICAgaWYoIGQubGVuZ3RoID09PSAxICkge1xuICAgICAgZCA9ICcwJytkO1xuICAgIH1cblxuICAgIC8vdmFyIGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlcih0aGlzLCBzZXR1cCwgbSwgZCk7XG4gICAgdmFyIGZpcnN0U3RlcFJlc3VsdHMgPSBpbml0KHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsKTtcblxuICAgIHZhciBrZXlzSW5PcmRlciA9IFtdO1xuICAgIHZhciBoZWFkZXIgPSBbJ2RhdGUnXTtcbiAgICBmb3IoIGtleSBpbiBkYXRhTW9kZWwucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgIGtleXNJbk9yZGVyLnB1c2goa2V5KTtcbiAgICAgIGhlYWRlci5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgZmlyc3RTdGVwUmVzdWx0cy5EYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttKyctJytkO1xuXG4gICAgdmFyIHJvd3MgPSBbXTsgLy90aGVzZSB3aWxsIGJlY29tZSByb3dzXG4gICAgcm93cy5wdXNoKGhlYWRlcik7XG5cbiAgICB2YXIgZmlyc3RSb3cgPSBbZmlyc3RTdGVwUmVzdWx0cy5EYXRlXTtcbiAgICBmb3IoIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICBmaXJzdFJvdy5wdXNoKGZpcnN0U3RlcFJlc3VsdHNba2V5XSk7XG4gICAgfVxuICAgIHJvd3MucHVzaChmaXJzdFJvdyk7XG5cbiAgICB2YXIgY3VycmVudFN0ZXBSZXN1bHRzID0gZmlyc3RTdGVwUmVzdWx0cztcbiAgICB2YXIgbmV4dFN0ZXBSZXN1bHRzO1xuXG4gICAgZm9yKHN0ZXAgPSAxOyBzdGVwIDwgc2V0dXAubGVuZ3RoT2ZHcm93dGg7IHN0ZXArKykge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZC5nZXREYXRlKCkgKyBzdGVwKnNldHVwLmRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG4vLyAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RGF0ZSh0aGlzLm1hbmFnZS5kYXRlUGxhbnRlZC5nZXREYXRlKCkgKyBzdGVwKnNldHVwLmRheXNfaW5faW50ZXJ2YWwpOyAvLyBhZGQgYSBkYXkgdG8gY3VycmVudCBkYXRlXG5cbiAgICAgIGlmKCBzaG91bGRDb3BwaWNlKHRoaXMsIHNldHVwKSApIHtcbiAgICAgICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RpbWUgdG8gQ29wcGljZSEnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBtID0gKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgbSA9ICcwJyttO1xuICAgICAgfVxuXG4gICAgICBkID0gdGhpcy5jdXJyZW50RGF0ZS5nZXREYXRlKCkrJyc7XG4gICAgICBpZiggZC5sZW5ndGggPT09IDEgKSB7XG4gICAgICAgIGQgPSAnMCcrZDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyKHRoaXMsIHNldHVwLCBtLCBkKTtcblxuICAgICAgLy9UT0RPOiBzd2l0Y2ggdXAgdHJlZXMgaGVyZSB3aGVuIGFmdGVyIHRoZSBmaXJzdCBoYXJ2ZXN0XG4gICAgICBuZXh0U3RlcFJlc3VsdHMgPSBzaW5nbGVTdGVwKHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsLCBjdXJyZW50V2VhdGhlciwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlLCBjdXJyZW50U3RlcFJlc3VsdHMsc2V0dXAuZGF5c19pbl9pbnRlcnZhbCk7XG4gICAgICBuZXh0U3RlcFJlc3VsdHMuRGF0ZSA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSsnLScrZDtcblxuICAgICAgdmFyIHRoaXNSb3cgPSBbbmV4dFN0ZXBSZXN1bHRzLkRhdGVdO1xuICAgICAgZm9yKCBpID0gMDsgaSA8IGtleXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgICB0aGlzUm93LnB1c2gobmV4dFN0ZXBSZXN1bHRzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RlcFJlc3VsdHMgPSBuZXh0U3RlcFJlc3VsdHM7XG4gICAgICByb3dzLnB1c2godGhpc1Jvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5pby5kdW1wKHJvd3MpO1xuXG4gICAgaWYoIHRoaXMuZGVidWcgKSB7XG4gICAgICBjb25zb2xlLmxvZyhzdGVwKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgY29uc29sZS5sb2coKG5ldyBEYXRlKCkuZ2V0VGltZSgpLXQpKydtcycpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVTdGVwKHBsYW50YXRpb24sIHNvaWwsIHdlYXRoZXIsIG1hbmFnZSwgcCwgZGF5c19pbl9pbnRlcnZhbCkgeyAvL3AgPSBwcmV2aW91cyBzdGF0ZVxuICB2YXIgYyA9IHt9OyAvL2N1cnJlbnQgc3RhdGVcblxuICBpZiggbWFuYWdlLmNvcHBpY2UgPT09IHRydWUgKSB7IC8vY2hhbmdlIHRoaXMgZ3V5IGZvciB0aGUgbW9udGggd2hlbiBjb3BwaWNlXG4gICAgLy8gQWRkIGluIGEgc3R1bXAgbWFyZ2luLi4uLlxuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdCArIHAuV1M7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudCArIDE7XG4gICAgYy5jb3BwaWNlQWdlID0gMDtcbiAgICBwLkxBSSA9IDA7XG4gICAgcC5XUyA9IDA7XG4gICAgcC5XRiA9IDA7XG4gICAgcC5XID0gcC5XUjtcbiAgfSBlbHNlIHtcbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3Q7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudDtcbiAgICBjLmNvcHBpY2VBZ2UgPSBwLmNvcHBpY2VBZ2UgKyBkYXlzX2luX2ludGVydmFsLzM2NS4wO1xuICB9XG5cbiAgdmFyIHRyZWU7IC8vdHJlZVxuICBpZiggYy5jb3BwaWNlQ291bnQgPT09IDAgKSB7IC8vVE9ETzogY2hlY2sgdGhlIGNhc2Ugd2hlcmUgd2Ugc3RhcnQgd2l0aCBhIGNvcHBpY2VkIG11bHRpIHN0dW1wIHRyZWVcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcbiAgfSBlbHNlIHtcbiAgICAgIHRyZWUgPSBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZTtcbiAgfVxuXG4gIGMuU3RhbmRBZ2UgPSBwLlN0YW5kQWdlICsgZGF5c19pbl9pbnRlcnZhbC8zNjUuMDtcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLlNMQSk7XG4gIGMuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuICBjLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4pO1xuICBjLmZWUEQgPSBmbi5mVlBEKHRyZWUua0csIGMuVlBEKTtcblxuICBjLmZTVyA9IGZuLmZTVyhwLkFTVywgc29pbC5tYXhBV1MsIHNvaWwuc3djb25zdCwgc29pbC5zd3Bvd2VyKTtcbiAgYy5mQWdlID0gZm4udGRwKHAuU3RhbmRBZ2UsIHRyZWUuZkFnZSk7XG5cbiAgLy8gZkZyb3N0IGlzIGEgY3VtdWxhdGl2ZSBOb3JtYWwgZGlzdHJpYnV0aW9uLCB0aGF0IGFwcHJvaXhtYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgKG9yIHBhcnRzIG9mIGRheXMpIHRoYXRcbiAgLy8gd2lsbCBiZSBiZWxvdyAwLCBnaXZlbiBhIG1pbmltdW0gdGVtcGVyYXR1cmVcbiAgYy5mRnJvc3QgPSBmbi5mRnJvc3Qod2VhdGhlci50bWluKTtcblxuICBjLlBBUiA9IGZuLlBBUih3ZWF0aGVyLnJhZCxkYXlzX2luX2ludGVydmFsKTsgLy8gIFBBUiBpbiBtb2xzXG5cbiAgYy5mVCA9IGZuLmZUKCh3ZWF0aGVyLnRtaW4gKyB3ZWF0aGVyLnRtYXgpLzIsIHRyZWUuZlQpO1xuXG4gIGMuUGh5c01vZCA9IGZuLlBoeXNNb2QoYy5mVlBELCBjLmZTVywgYy5mQWdlKTtcbiAgYy5mTnV0ciA9IGZuLmZOdXRyKHRyZWUuZk4wLCBtYW5hZ2UuZmVydGlsaXR5KTtcbiAgYy54UFAgPSBmbi54UFAodHJlZS55LCBjLlBBUik7IC8vIG1heGltdW0gcG90ZW50aWFsIFByaW1hcnkgUHJvZHVjdGlvbiBwZXIgbW9udGhcbiAgYy5OUFAgPSBmbi5OUFAocC5jb3BwaWNlQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHAuTEFJLCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcblxuICB2YXIgTlBQX3RhcmdldCA9IGZuLk5QUCh0cmVlLmZ1bGxDYW5BZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgdHJlZS5yb290UC5MQUlUYXJnZXQsIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuICBjLlJvb3RQID0gZm4uY29wcGljZS5Sb290UChjLk5QUCwgTlBQX3RhcmdldCwgcC5XUiwgcC5XLCB0cmVlLnBSLm14LCB0cmVlLnJvb3RQLmZyYWMpO1xuXG4gIGlmICh0cmVlLmxhVkkgJiYgdHJlZS5sYVZJLmNvbnN0YW50ICkgeyAvLyBUZXN0IGZvciB0aGF0IGZ1bmN0aW9uXG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmc192aWFfVkkocC5XUyoxMDAwMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLndzVkksdHJlZS5sYVZJLHNsYSk7XG4gIH0gZWxzZSB7XG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmcyhwLldTKjEwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUucGZzKTtcbiAgfVxuXG4gIGMuZFcgPSBjLk5QUCArIHRyZWUucm9vdFAuZWZmaWNpZW5jeSAqIGMuUm9vdFA7XG5cbiAgYy5JbnRjcHRuID0gZm4uSW50Y3B0bihjLkxBSSwgdHJlZS5JbnRjcHRuKTtcbiAgYy5DYW5Db25kID0gZm4uQ2FuQ29uZChjLlBoeXNNb2QsIGMuTEFJLCB0cmVlLkNvbmR1Y3RhbmNlKTtcblxuICBjLnBSID0gZm4ucFIoYy5QaHlzTW9kLCBwLldSL3AuVywgbWFuYWdlLmZlcnRpbGl0eSwgdHJlZS5wUik7XG4gIGMubGl0dGVyZmFsbCA9IGZuLnRkcChwLlN0YW5kQWdlLCB0cmVlLmxpdHRlcmZhbGwpO1xuXG4gIGMuVHJhbnNwID0gZm4uVHJhbnNwKHdlYXRoZXIucmFkLCBkYXlzX2luX2ludGVydmFsLHdlYXRoZXIuZGF5bGlnaHQsIGMuVlBELCB0cmVlLkJMY29uZCwgYy5DYW5Db25kKTtcbiAgYy5FVHIgPSBmbi5FVHIod2VhdGhlci5yYWQsd2VhdGhlci50bWluLHdlYXRoZXIudG1heCx3ZWF0aGVyLnRkbWVhbixkYXlzX2luX2ludGVydmFsKTtcbiAgYy5LYyA9IGMuVHJhbnNwL2MuRVRyO1xuICBcblxuICAvLyBDYWxjdWxhdGVkIGZyb20gcGZzXG4gIGMucFMgPSAoMSAtIGMucFIpIC8gKDEgKyBjLnBmcyApO1xuICBjLnBGID0gKDEgLSBjLnBSKSAvICgxICsgMS9jLnBmcyApO1xuXG4gIGMuSXJyaWcgPSBmbi5JcnJpZyhtYW5hZ2UuaXJyaWdGcmFjLCBjLlRyYW5zcCwgYy5JbnRjcHRuLCB3ZWF0aGVyLnBwdCk7XG4gIGMuQ3VtSXJyaWcgPSBwLkN1bUlycmlnICsgYy5JcnJpZztcblxuICBjLkFTVyA9IGZuLkFTVyhzb2lsLm1heEFXUywgcC5BU1csIHdlYXRoZXIucHB0LCBjLlRyYW5zcCwgYy5JbnRjcHRuLCBjLklycmlnKTsgLy9mb3Igc29tZSByZWFzb24gc3BlbGxlZCBtYXhBV1NcblxuICBjLldGID0gcC5XRiArIGMuZFcgKiBjLnBGIC0gYy5saXR0ZXJmYWxsICogcC5XRjtcbiAgLy8gSW5jbHVkZSBjb250cmlidXRpb24gb2YgUm9vdFAgLy8gRXJyb3IgaW4gb2xkIGNvZGUgIVxuICBjLldSID0gcC5XUiArIGMuZFcgKiBjLnBSIC0gdHJlZS5wUi50dXJub3ZlciAqIHAuV1IgLSBjLlJvb3RQO1xuICBjLldTID0gcC5XUyArIGMuZFcgKiBjLnBTO1xuICBjLlcgPSBjLldGK2MuV1IrYy5XUztcblxuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gaW5pdChwbGFudGF0aW9uLCBzb2lsKSB7XG4gIHZhciBwID0ge307XG4gIHZhciB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7IC8vVE9ETzogZGVjaWRlIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCB0cmVlP1xuXG4gIHAuZmVlZHN0b2NrSGFydmVzdD0wO1xuICBwLmNvcHBpY2VDb3VudD0wO1xuICBwLmNvcHBpY2VBZ2UgPSAwO1xuXG4gIHAuQ3VtSXJyaWcgPSAwO1xuICBwLmRXID0gMDtcbiAgcC5XID0gcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHkgKiBwbGFudGF0aW9uLlNlZWRsaW5nTWFzcztcbiAgcC5XRiA9IHBsYW50YXRpb24ucEYgKiBwLlc7XG4gIHAuV1MgPSBwbGFudGF0aW9uLnBTICogcC5XO1xuICBwLldSID0gcGxhbnRhdGlvbi5wUiAqIHAuVztcbiAgcC5BU1cgPSAwLjggKiAxMCAqIHNvaWwubWF4QVdTOyAvLyBUaGUgMTAgaXMgYmVjYXVzZSBtYXhBV1MgaXMgaW4gY20gYW5kIEFTVyBpbiBtbSAoPykgV2h5ICg/KVxuICBwLlN0YW5kQWdlID0gMDtcblxuICB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7XG5cbiAgLy8gc2xhID0gU3BlY2lmaWMgTGVhZiBBcmVhXG4gIHZhciBzbGEgPSBmbi50ZHAocC5TdGFuZEFnZSx0cmVlLlNMQSk7XG5cbiAgcC5MQUkgPSBwLldGICogMC4xICogc2xhOyAvLyBMYW5kc2J1cmcgZXEgOS41XG5cbiAgLy8gVGhlc2UgYXJlbid0IHVzZWQgc28gY2FuIGJlIHNldCB0byBhbnl0aGluZzsgIFRoZXkgYXJlIHNldCB0byBtYXRjaCB0aGUgcG9zdGdyZXMgdHlwZVxuICBwLlZQRCAgICAgICAgPSAwO1xuICBwLmZWUEQgICAgICAgPSAwO1xuICBwLmZUICAgICAgICAgPSAwO1xuICBwLmZGcm9zdCAgICAgPSAwO1xuICBwLmZOdXRyICAgICAgPSAwO1xuICBwLmZTVyAgICAgICAgPSAwO1xuICBwLmZBZ2UgICAgICAgPSAwO1xuICBwLlBBUiAgICAgICAgPSAwO1xuICBwLnhQUCAgICAgICAgPSAwO1xuICBwLkludGNwdG4gICAgPSAwO1xuICBwLklycmlnICAgICAgPSAwO1xuICBwLkNhbkNvbmQgICAgPSAwO1xuICBwLlRyYW5zcCAgICAgPSAwO1xuICBwLlBoeXNNb2QgICAgPSAwO1xuICBwLnBmcyAgICAgICAgPSAwO1xuICBwLnBSICAgICAgICAgPSAwO1xuICBwLnBTICAgICAgICAgPSAwO1xuICBwLnBGICAgICAgICAgPSAwO1xuICBwLmxpdHRlcmZhbGwgPSAwO1xuICBwLk5QUCAgICAgICAgPSAwO1xuICBwLlJvb3RQICAgICAgPSAwO1xuXG4gIHJldHVybiBwO1xufVxuXG4vLyBUaGlzIGFjdHVhbGx5IG5lZWQgdG8gd29yayBiZXR0ZXIuICBJZiB0aGUgd2VhdGhlciBkb2Vzbid0IG1hdGNoXG4vLyB0aGUgc3RlcHMsIHdlIG5lZWQgdG8gZmluZCB0aGUgY2xvc2VzdCB2YWx1ZSB0byB3aGF0IHdlIGFyZSBsb29raW5nIGZvclxuZnVuY3Rpb24gZ2V0V2VhdGhlcihtb2RlbCwgc2V0dXAsIG1vbnRoLCBkYXkpIHtcblxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBtb2RlbGxlZCBkYWlseVxuICAgIGlmKCBtb2RlbC53ZWF0aGVyW21vbnRoKyctJytkYXldICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aCsnLScrZGF5XTtcbiAgICB9XG5cbiAgICAvLyBhY3R1YWxcbiAgICBpZiggbW9kZWwud2VhdGhlclttb2RlbC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBtb2RlbC53ZWF0aGVyW21vZGVsLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21vbnRoXTtcbiAgICB9XG5cbiAgLy8gbW9kZWxsZWQgTW9udGhseVxuICBpZiggbW9kZWwud2VhdGhlclttb250aF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gbW9kZWwud2VhdGhlclttb250aF07XG4gIH1cblxuICB0aHJvdyAnUnVudGltZSBFcnJvcjogbm8gd2VhdGhlciBmb3VuZCBmb3IgbW9udGg6ICcrbW9udGg7XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvcHBpY2UobW9kZWwsIHNldHVwKSB7XG4gIHZhciBuZXh0O1xuICB2YXIgY29wcGljZV9vbjtcbiAgLy8gZG8gd2UgaGF2ZSBzcGVjaWZpYyBjb3BwaWNlIGRhdGVzIHNldD9cbiAgaWYoIHNldHVwLmNvcHBpY2VEYXRlcyApIHtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNldHVwLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBkID0gc2V0dXAuY29wcGljZURhdGVzW2ldO1xuXG4gICAgICBpZiAobW9kZWwuY3VycmVudERhdGUgPCBkKSB7XG4gICAgICAgIG5leHQgPSBtb2RlbC5jdXJyZW50RGF0ZTtcbiAgICAgICAgbmV4dC5zZXREYXRlKG5leHQuZ2V0RGF0ZSArIHNldHVwLmRheXNfaW5faW50ZXJ2YWwpO1xuICAgICAgICBpZiAoIGQgPCBuZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29wcGljZV9vbiA9IG5ldyBEYXRlKCk7XG4gICAgY29wcGljZV9vbi5zZXRZZWFyKHNldHVwLnllYXJUb0NvcHBpY2UpO1xuICAgIGNvcHBpY2Vfb24uc2V0TW9udGgoc2V0dXAubW9udGhUb0NvcHBpY2UpO1xuICAgIGNvcHBpY2Vfb24uc2V0RGF0ZSgxNSk7XG5cbiAgICBpZiAobW9kZWwuY3VycmVudERhdGUgPCBjb3BwaWNlX29uKSB7XG4gICAgICBuZXh0PW5ldyBEYXRlKG1vZGVsLmN1cnJlbnREYXRlKTtcbiAgICAgIG5leHQuc2V0RGF0ZShtb2RlbC5jdXJyZW50RGF0ZS5nZXREYXRlKCkgKyBzZXR1cC5kYXlzX2luX2ludGVydmFsKTtcbiAgICAgIGlmICggY29wcGljZV9vbiA8IG5leHQpIHtcbiAgICAgICAgc2V0dXAueWVhclRvQ29wcGljZSA9IHNldHVwLnllYXJUb0NvcHBpY2Urc2V0dXAuY29wcGljZUludGVydmFsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbihuYW1lKSB7XG4gIGlmKCBmbltuYW1lXSApIHtcbiAgICByZXR1cm4gZm5bbmFtZV07XG4gIH0gZWxzZSBpZiggZm4uY29wcGljZVtuYW1lXSApIHtcbiAgICByZXR1cm4gZm4uY29wcGljZVtuYW1lXTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbykge1xuICByZXR1cm4ge1xuICAgIGlvIDogaW8sXG4gICAgcnVuIDogcnVuLFxuICAgIHNpbmdsZVN0ZXAgOiBzaW5nbGVTdGVwLFxuICAgIHJ1blNldHVwIDogcnVuU2V0dXAsXG4gICAgaW5pdCA6IGluaXQsXG4gICAgZ2V0RnVuY3Rpb24gOiBnZXRGdW5jdGlvbixcbiAgICBzZXRJTyA6IGZ1bmN0aW9uKGlvKSB7XG4gICAgICB0aGlzLmlvID0gaW87XG4gICAgfSxcbiAgICBnZXREYXRhTW9kZWwgOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkYXRhTW9kZWw7XG4gICAgfVxuICB9O1xufTtcbiIsImZ1bmN0aW9uIGVudigpIHtcbiAgaWYoIHR5cGVvZiBwbHY4ICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcInBsdjhcIjtcbiAgaWYoIHR5cGVvZiBMb2dnZXIgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIFwiYXBwc2NyaXB0XCI7XG4gIGlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgcmV0dXJuIFwibm9kZVwiO1xufVxuXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gIHZhciBlID0gZW52KCk7XG4gIGlmKCBlID09IFwicGx2OFwiICkgcGx2OC5lbG9nKE5PVElDRSwgJ25vdGljZScsIG1zZyk7XG4gIGVsc2UgaWYoIGUgPT0gXCJhcHBzY3JpcHRcIiApIExvZ2dlci5sb2cobXNnKTtcbiAgZWxzZSBjb25zb2xlLmxvZyhtc2cpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iaikgcmV0dXJuIG9iajtcbiAgdmFyIGNvcHkgPSBvYmouY29uc3RydWN0b3IoKTtcbiAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gb2JqW2F0dHJdO1xuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW52IDogZW52LFxuICBsb2cgOiBsb2csXG4gIGNsb25lIDogY2xvbmVcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIFZhbGlkYXRlIGEgbW9kZWwgcnVuIHNldHVwLiAgdGhyb3cgZXJyb3IgaXMgYmFkbmVzcy5cbiAqL1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG52YXIgcGFyYW1FcnJvciA9ICdWYWxpZGF0aW9uIEVycm9yOiAnO1xuXG52YXIgdmFsaWRXZWF0aGVyS2V5cyA9IFtcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkJC8sIC8vIHNwZWNpZmljIHdlYXRoZXIgWVlZWS1NTSBmb3IgbW9udGhseSB0aW1lc3RlcFxuICAvXlxcZFxcZCQvLCAvLyBtb2RlbGxlZCBvciBhdmVyYWdlIHdlYXRoZXIgTU0gZm9yIG1vbnRobHkgdGltZXN0ZXBcbiAgL15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZCQvLCAvLyBzcGVjaWZpYyB3ZWF0aGVyIFlZWVktTU0tREQgZm9yIGRhaWx5IHRpbWVzdGVwXG4gIC9eXFxkXFxkLVxcZFxcZCQvIC8vIG1vZGVsbGVkIG9yIGF2ZXJhZ2Ugd2VhdGhlciBNTS1ERCBmb3IgZGFpbHkgdGltZXN0ZXBcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFsaWRhdGVQbGFudGF0aW9uKG1vZGVsKTtcbiAgdmFsaWRhdGVNYW5hZ2UobW9kZWwpO1xuICB2YWxpZGF0ZVdlYXRoZXIobW9kZWwpO1xuICB2YWxpZGF0ZVNvaWwobW9kZWwpO1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVNYW5hZ2UobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5tYW5hZ2UgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnbWFuYWdlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cblxuICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC5tYW5hZ2UsIG1vZGVsLm1hbmFnZSwgJ21hbmFnZScpO1xuXG4gIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzICkge1xuICAgIGlmKCAhQXJyYXkuaXNBcnJheShtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzKSApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJ21hbmFnZS5jb3BwaWNlRGF0ZXMgc2hvdWxkIGJlIGFuIGFycmF5IG9mIGRhdGUgc3RyaW5ncy4nO1xuICAgIH1cblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZCQnKSB8fCBtb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzW2ldLm1hdGNoKCdeXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGQkJykgKSB7XG4gICAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIG1hbmFnZS5jb3BwaWNlRGF0ZXMgZm9ybWF0ICcrbW9kZWwubWFuYWdlLmNvcHBpY2VEYXRlc1tpXSsnLiBzaG91bGQgYmUgWVlZWS1NTSBmb3JtYXQuJztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG5cbiAgICBpZiggbW9kZWwubWFuYWdlLmRhdGVDb3BwaWNlZCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS5kYXRlQ29wcGljZWQgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cbiAgICBpZiggbW9kZWwubWFuYWdlLnllYXJzUGVyQ29wcGljZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgcGFyYW1FcnJvcisnIG1hbmFnZS55ZWFyc1BlckNvcHBpY2UgcmVxdWlyZWQgaWYgbWFuYWdlLmNvcHBpY2VEYXRlcyBub3QgcHJvdmlkZWQnO1xuICAgIH1cblxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlV2VhdGhlcihtb2RlbCkge1xuICBpZiggIW1vZGVsLndlYXRoZXIgKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisnTm8gd2VhdGhlciBkZWZpbmVkJztcbiAgfVxuXG4gIGZvciggdmFyIGtleSBpbiBtb2RlbC53ZWF0aGVyICkge1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsaWRXZWF0aGVyS2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBrZXkubWF0Y2godmFsaWRXZWF0aGVyS2V5c1tpXSkgKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICFmb3VuZCApIHtcbiAgICAgIHRocm93IHBhcmFtRXJyb3IrJyBpbnZhbGlkIHdlYXRoZXIga2V5OiAnK2tleTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbC53ZWF0aGVyLCBtb2RlbC53ZWF0aGVyW2tleV0sICd3ZWF0aGVyJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNvaWwobW9kZWwpIHtcbiAgaWYoICFtb2RlbC5zb2lsICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3NvaWwgaXMgbm90IGRlZmluaWVkJztcbiAgfVxuXG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnNvaWwsIG1vZGVsLnNvaWwsICdzb2lsJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGxhbnRhdGlvbihtb2RlbCkge1xuICBpZiggIW1vZGVsLnBsYW50YXRpb24gKSB7XG4gICAgdGhyb3cgcGFyYW1FcnJvcisncGxhbnRhdGlvbiBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnBsYW50YXRpb24sIG1vZGVsLnBsYW50YXRpb24sICdwbGFudGF0aW9uJyk7XG5cbiAgaWYoICFtb2RlbC5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZSApIHtcbiAgICB0aHJvdyBwYXJhbUVycm9yKydwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSBpcyBub3QgZGVmaW5pZWQnO1xuICB9XG4gIHZhbGlkYXRlTW9kZWwoZGF0YU1vZGVsLnRyZWUsIG1vZGVsLnBsYW50YXRpb24uc2VlZGxpbmdUcmVlLCAncGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUnKTtcblxuICBpZiggIW1vZGVsLnBsYW50YXRpb24uY29wcGljZWRUcmVlICkge1xuICAgIHRocm93IHBhcmFtRXJyb3IrJ3BsYW50YXRpb24uY29wcGljZWRUcmVlIGlzIG5vdCBkZWZpbmllZCc7XG4gIH1cbiAgdmFsaWRhdGVNb2RlbChkYXRhTW9kZWwudHJlZSwgbW9kZWwucGxhbnRhdGlvbi5jb3BwaWNlZFRyZWUsICdwbGFudGF0aW9uLmNvcHBpY2VkVHJlZScpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKGRhdGFNb2RlbCwgbW9kZWwsIG5hbWUpIHtcbiAgdmFyIGtleSwgaXRlbTtcblxuICBmb3IoIGtleSBpbiBkYXRhTW9kZWwudmFsdWUgKSB7XG4gICAgaXRlbSA9IGRhdGFNb2RlbC52YWx1ZVtrZXldO1xuICAgIGlmKCBpdGVtLnJlcXVpcmVkID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKCBtb2RlbFtrZXldID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBwYXJhbUVycm9yK25hbWUrJy4nK2tleSsnIGlzIG1pc3NpbmcgJytcbiAgICAgICAgICAgIChpdGVtLmRlc2NyaXB0aW9uID8gJygnK2l0ZW0uZGVzY3JpcHRpb24rJyknIDogJycpO1xuICAgIH1cblxuICAgIGlmKCB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICB2YWxpZGF0ZU1vZGVsKGl0ZW0sIG1vZGVsW2tleV0sIG5hbWUrJy4nK2tleSk7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcbnZhciBjaGFydHM7XG52YXIgaW5wdXRGb3JtO1xudmFyIGV4cG9ydGVyID0gcmVxdWlyZSgnLi9leHBvcnQnKTtcbnZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG5cbi8vIGltcG9ydCBtb2RlbCBzdHVmZlxudmFyIG1vZGVsID0gcmVxdWlyZSgnLi4vLi4vcG9wbGFyLTNwZy1tb2RlbCcpO1xudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuL21vZGVsSU8nKTtcbm1vZGVsLnNldElPKG1vZGVsSU8pO1xuXG52YXIgZGFpbHkgPSBmYWxzZTtcblxudmFyIHJ1bkNhbGxiYWNrID0gbnVsbDtcbnZhciBfM3BnTW9kZWwgPSBudWxsO1xuXG52YXIgaW5wdXRzID0ge1xuICB3ZWF0aGVyIDogW1wibW9udGhcIixcInRtaW5cIixcInRtYXhcIixcInRkbWVhblwiLFwicHB0XCIsXCJyYWRcIixcImRheWxpZ2h0XCJdXG59O1xudmFyIG91dHB1dHMgPSBbXCJWUERcIixcImZWUERcIixcImZUXCIsXCJmRnJvc3RcIixcIlBBUlwiLFwiSW50Y3B0blwiLFwiQVNXXCIsXCJDdW1JcnJpZ1wiLFxuICAgICAgICAgICAgICAgXCJJcnJpZ1wiLFwiU3RhbmRBZ2VcIixcIkxBSVwiLFwiQ2FuQ29uZFwiLFwiVHJhbnNwXCIsXCJFVHJcIixcIktjXCIsXCJmU1dcIixcImZBZ2VcIixcbiAgICAgICAgICAgICAgIFwiUGh5c01vZFwiLFwicFJcIixcInBTXCIsXCJsaXR0ZXJmYWxsXCIsXCJOUFBcIixcIldGXCIsXCJXUlwiLFwiV1NcIixcIldcIl07XG52YXIgZGVidWcgPSBmYWxzZTtcbnZhciBkZXZtb2RlID0gZmFsc2U7XG5cbnZhciB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSBudWxsO1xuXG4vLyByb3cgcmF3IGRhdGEgZG9lcyBhIGxvdCBvZiBwcm9jZXNzaW5nIG9mIHRoZSByZXN1bHRzIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBvZiB3aGF0J3Ncbi8vIGJlaW5nIGRpc3BsYXllZC4gIEdvIGFoZWFkIGFuIHNldHVwIHRoZSBjc3YgZGF0YSBhdCB0aGlzIHBvaW50LCB0aGVuIGlmIHRoZSB1c2VyXG4vLyBkZWNpZGVzIHRvIGV4cG9ydCwgd2UgYXJlIGFsbCBzZXQgdG8gdG87XG52YXIgY3N2UmVzdWx0cyA9IG51bGw7XG5cbnZhciBnZXRNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbW9kZWw7XG59XG5cbnZhciBnZXRPdXRwdXRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBvdXRwdXRzO1xufVxuXG5cblxudmFyIG91dHB1dERlZmluaXRpb25zID0gcmVxdWlyZSgnLi9vdXRwdXREZWZpbml0aW9ucycpO1xuXG5cbmZ1bmN0aW9uIHFzKGtleSkge1xuICBrZXkgPSBrZXkucmVwbGFjZSgvWyorP14kLlxcW1xcXXt9KCl8XFxcXFxcL10vZywgXCJcXFxcJCZcIik7XG4gIHZhciBtYXRjaCA9IGxvY2F0aW9uLnNlYXJjaC5tYXRjaChuZXcgUmVnRXhwKFwiWz8mXVwiICsga2V5ICsgXCI9KFteJl0rKSgmfCQpXCIpKTtcbiAgcmV0dXJuIG1hdGNoICYmIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBpbnB1dEZvcm0gPSByZXF1aXJlKCcuL2lucHV0Rm9ybScpKHRoaXMpO1xuICBjaGFydHMgPSByZXF1aXJlKCcuL2NoYXJ0cycpO1xuICBjaGFydHMuc2V0QXBwKHRoaXMpO1xuXG4gIG1vZGVsSU8uYXBwID0gdGhpcztcbiAgbW9kZWxJTy5tb2RlbCA9IG1vZGVsO1xuICBtb2RlbElPLmNoYXJ0cyA9IGNoYXJ0cztcbiAgbW9kZWxJTy5pbnB1dEZvcm0gPSBpbnB1dEZvcm07XG5cbiAgLy8gY2hlY2sgaWYgZmxhc2ggaXMgaW5zdGFsbGVkLiAgSWYgbm90LCBoaWRlIHRoZSBjaGFydCB0eXBlIHRvZ2dsZS5cbiAgcmVxdWlyZSgnLi9mbGFzaGJsb2NrLWRldGVjdG9yJykoZnVuY3Rpb24odmFsKXtcbiAgICAgIGlmKCB2YWwgPiAwICkgJChcIiNjaGFydC10eXBlLWJ0bi1ncm91cFwiKS5oaWRlKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGV4cG9ydCBtb2RhbFxuICBleHBvcnRlci5pbml0KCk7XG4gICQoXCIjZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZXhwb3J0ZXIuZXhwb3J0Q3N2KGNzdlJlc3VsdHMpO1xuICB9KTtcblxuICB2YXIgZWxlID0gJChcIiNpbnB1dHMtY29udGVudFwiKTtcbiAgaW5wdXRGb3JtLmNyZWF0ZShlbGUpO1xuXG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgY2hhcnRzXG4gIGNoYXJ0cy5pbml0KCk7XG5cbiAgLy8gc2V0IGRlZmF1bHQgY29uZmlnXG4gICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoyKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMTAqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG5cbiAgLy8gc2V0dXAgbmljZSBzY3JvbGxpbmdcbiAgJCgnLmFwcC1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoaXMuaGFzaCkub2Zmc2V0KCkudG9wLTU1XG4gICAgICAgfSwgNzAwKTtcbiB9KTtcblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICBjaGFydHMucmVzaXplKCk7XG5cbiAgICAgIGlmKCB3ZWF0aGVyQ3VzdG9tQ2hhcnQgKSB7XG4gICAgICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICAgICAgfVxuICB9KTtcblxuICBjYWxsYmFjaygpO1xufVxuXG5cbnZhciBydW5Db21wbGV0ZSA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgaWYgKCBydW5DYWxsYmFjayApIHJ1bkNhbGxiYWNrKHJvd3MpO1xuICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIHJ1bkNhbGxiYWNrID0gbnVsbDtcbn07XG5cbnZhciBtb250aHNUb1J1biA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZDEgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcbiAgaWYgKGQxICYmIGQxICE9PSBcIlwiKSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLWRhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQxID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBkMiA9ICQoXCIjaW5wdXQtbWFuYWdlLWRhdGVGaW5hbEhhcnZlc3RcIikudmFsKCk7XG4gIGlmIChkMiAmJiBkMiAhPT0gXCJcIikge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQyID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBtb250aHM7XG4gIG1vbnRocyA9IChkMi5nZXRGdWxsWWVhcigpIC0gZDEuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgbW9udGhzIC09IGQxLmdldE1vbnRoKCkgKyAxO1xuICBtb250aHMgKz0gZDIuZ2V0TW9udGgoKTtcbiAgcmV0dXJuIG1vbnRocyA8PSAwID8gMSA6IG1vbnRocysxO1xufVxuXG5cbnZhciBydW5Nb2RlbCA9IGZ1bmN0aW9uKGlzUnQpIHtcblxuICBpZiAoJChcIiNydW5idG4sICNydW5idG4tc21cIikuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkgcmV0dXJuO1xuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJSdW5uaW5nLi4uXCIpO1xuXG4gIGlmKCAhY2hlY2tXZWF0aGVyKCkgKSByZXR1cm47XG5cbiAgLy8gbGV0IFVJIHByb2Nlc3MgZm9yIGEgc2VjIGJlZm9yZSB3ZSB0YW5rIGl0XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHByZWZvcm1lZCB3LyBhIHdlYndvcmtlclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuJywgMSk7XG5cbiAgICAgIC8vIHJlYWQgZXZlcnl0aGluZyBzbyB0aGUgdmFyaWF0aW9ucyBhcmUgc2V0XG4gICAgICBtb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICBtb2RlbElPLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgb25seSBzZXR0aW5nIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnNcbiAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkgcGFyYW1zLnB1c2goa2V5KTtcbiAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIGEgbGltaXQgb2YgMiB2YXJpYXRpb24gcGFyYW1ldGVycyBwZXIgcnVuLiAgQ3VycmVudGx5IHlvdSBhcmUgdmFyeWluZyBcIitcbiAgICAgICAgICAgICAgICBcInRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcXG5cXG4gLVwiK3BhcmFtcy5qb2luKFwiXFxuIC1cIikpO1xuICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICBpZiggIWlzUnQgKSBnZHJpdmUucnVuTW9kZWxSdCgpO1xuXG4gICAgICAvLyBzaG93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICAkKFwiI3ZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCIpLmh0bWwoXCI8Yj5cIisocGFyYW1zLmxlbmd0aCA9PSAwID8gXCJOb25lXCIgOiBwYXJhbXMuam9pbihcIiwgXCIpKStcIjwvYj5cIik7XG5cbiAgICAgIC8vIHdlIGFyZSBvbmx5IHJ1bm5pbmcgb25jZVxuICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID09PSAwICkge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi1zaW5nbGVQYXJhbScsIDEpO1xuXG4gICAgICAgICAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICAgICAgICAgIHNob3dSZXN1bHRzKHJvd3MpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBtb2RlbC5kYWlseVN0ZXAgPSBkYWlseTtcbiAgICAgICAgICB2YXIgbW9udGhzID0gbW9udGhzVG9SdW4oKTtcbiAgICAgICAgICBpZiggZGFpbHkgKSBtb250aHMgPSBtb250aHMgKiAzMDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtb2RlbC5ydW4obW9udGhzKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgYWxlcnQoZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXZhcmlhdGlvbicsIDEpO1xuXG4gICAgICAgICAgLy8gc2V0IHZhcmlhdGlvbiBvcmRlclxuICAgICAgICAgIHZhciBydW5zID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICAgICAgICAgIG91dHB1dCA6IG51bGxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgb2JqLmlucHV0c1twYXJhbXNbMF1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMF1dW2ldO1xuICAgICAgICAgICAgICBpZiggcGFyYW1zLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzFdXS5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgICAgICAgICAgIHQuaW5wdXRzW3BhcmFtc1sxXV0gPSBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcnVucy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBydW5WYXJpYXRpb24oMCwgcnVucyk7XG4gICAgICB9XG4gIH0sIDI1MCk7XG59XG5cbnZhciBydW5WYXJpYXRpb24gPSBmdW5jdGlvbihpbmRleCwgcnVucykge1xuICAvLyBzZXQgaW5wdXQgdmFyaWFibGVzIGZvciBydW5cbiAgdmFyIHJ1biA9IHJ1bnNbaW5kZXhdO1xuICBmb3IoIHZhciBrZXkgaW4gcnVuLmlucHV0cyApIHtcbiAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwocnVuLmlucHV0c1trZXldKTtcbiAgfVxuXG4gIHJ1bkNhbGxiYWNrID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcnVuc1tpbmRleF0ub3V0cHV0ID0gZGF0YTtcbiAgICAgIGluZGV4Kys7XG5cblxuICAgICAgaWYgKHJ1bnMubGVuZ3RoID09IGluZGV4KSB7XG4gICAgICAgICAgLy8gcmVzZXQgdGhlIGNvbnN0YW50IHRvIHRoZSBmaXJzdCB2YWx1ZVxuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKG1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93UmVzdWx0cyhydW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnVuVmFyaWF0aW9uKGluZGV4LCBydW5zKTtcbiAgICAgIH1cbiAgfTtcblxuICB2YXIgbW9udGhzID0gbW9udGhzVG9SdW4oKTtcbiAgaWYoIGRhaWx5ICkgbW9udGhzID0gbW9udGhzICogMzA7XG5cbiAgdHJ5IHtcbiAgICBtb2RlbC5ydW4obW9udGhzKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZGVidWdnZXI7XG4gICAgYWxlcnQoZSk7XG4gIH1cblxufTtcblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgdmFyIGN1cnJlbnRSZXN1bHRzO1xuICBpZiggcmVzdWx0WzBdIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICBjdXJyZW50UmVzdWx0cyA9IFt7XG4gICAgICAgICAgc2luZ2xlUnVuIDogdHJ1ZSxcbiAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICBvdXRwdXQgOiByZXN1bHRcbiAgICAgIH1dXG4gIH0gZWxzZSB7XG4gICAgY3VycmVudFJlc3VsdHMgPSByZXN1bHQ7XG4gIH1cblxuXG4gIHNob3dSYXdPdXRwdXQoY3VycmVudFJlc3VsdHMpO1xuICBjaGFydHMudXBkYXRlQ2hhcnRzKGN1cnJlbnRSZXN1bHRzLCB0cnVlKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJChcIiNydW5idG4sICNydW5idG4tc21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiPGkgY2xhc3M9J2ljb24tcGxheSc+PC9pPiBSdW5cIik7XG4gIH0sIDI1MCk7XG5cbn1cblxuLy8gbWFrZSBzdXJlIGFsbCB0aGUgd2VhdGhlciBpcyBzZXQuICAjMSB0aGluZyBwZW9wbGUgd2lsbCBtZXNzIHVwXG52YXIgY2hlY2tXZWF0aGVyID0gZnVuY3Rpb24oKSB7XG4gIC8vIGZpcnN0IGdldCBjdXJyZW50IG1vbnRocyB3ZSBhcmUgZ29pbmcgdG8gcnVuLFxuICB2YXIgc3RhcnQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcblxuICB2YXIgZW5kID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKS5zcGxpdChcIi1cIik7XG4gIHZhciBlTW9udGggPSBwYXJzZUludChlbmRbMV0pO1xuICB2YXIgZVllYXIgPSBwYXJzZUludChlbmRbMF0pO1xuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcblxuICAvLyBub3cgc2VlIGlmIHdlIGhhdmUgY3VzdG9tIHdlYXRoZXIgY292ZXJhZ2VcbiAgdmFyIGhhc0NvdmVyYWdlID0gdHJ1ZTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgd2hpbGUoIGNvdW50IDwgMTAwMDAgKSB7XG4gICAgICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBtID0gKGNEYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICB2YXIgeSA9IGNEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgaWYoIGNEYXRlLmdldE1vbnRoKCkrMSA9PSBlTW9udGggJiYgeSA9PSBlWWVhciApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyW3krJy0nK21dICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNEYXRlLnNldE1vbnRoKGNEYXRlLmdldE1vbnRoKCkrMSk7XG4gICAgICBjb3VudCsrO1xuICB9XG5cbiAgaWYoIGhhc0NvdmVyYWdlICkgcmV0dXJuIHRydWU7XG5cbiAgLy8gaWYgbm90IG1ha2Ugc3VyZSB3ZSBoYXZlIGF2ZXJhZ2VzIHNlbGVjdGVkXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBpbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjID0gaW5wdXRzLndlYXRoZXJbal07XG4gICAgICAgICAgdmFyIHZhbCA9IHBhcnNlRmxvYXQoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgbSkudmFsKCkpO1xuICAgICAgICAgIGlmKCAhdmFsICYmIHZhbCAhPSAwICkge1xuICAgICAgICAgICAgICBhbGVydChcIk1pc3Npbmcgd2VhdGhlciBkYXRhOiBcIitjK1wiIGZvciBtb250aCBcIittK1wiXFxuXFxuXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiRGlkIHlvdSBzZWxlY3QgYSBsb2NhdGlvbiAoU2V0dXApIGFuZC9vciBhcmUgYWxsIHdlYXRoZXIvc29pbCBmaWVsZHMgZmlsbGVkIG91dD9cIik7XG4gICAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBzZXRXZWF0aGVyID0gZnVuY3Rpb24oZGF0YSkge1xuICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICBpZiggZGF0YSApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBkYXRhICkge1xuXG4gICAgICAgICAgLy8gY2xlYW4gdXAgZGF0ZSBmb3JtYXRcbiAgICAgICAgICB2YXIgZGF0ZSA9IGtleS5yZXBsYWNlKC9bXlxcZC1dLywnJyk7XG4gICAgICAgICAgdmFyIHBhcnRzID0gZGF0ZS5zcGxpdCgnLScpO1xuXG4gICAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA8IDIgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhbGVydCgnSW52YWxpZCBEYXRlIEZvcm1hdC4gIERhdGVzIHNob3VsZCBiZSBpbiBZWVlZLU1NIGZvcm1hdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHBhcnRzWzFdLmxlbmd0aCAhPSAyICkge1xuICAgICAgICAgICAgICBkYXRlID0gcGFydHNbMF0rXCItMFwiK3BhcnRzWzFdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdID0gZGF0YVtrZXldO1xuICAgICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGFycmF5IHNvIHdlIGNhbiBzb3J0XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhlYWRlcnMgPSBbJ2RhdGUnXTtcbiAgZm9yKCB2YXIgZGF0ZSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlciApIHtcblxuICAgICAgdmFyIHQgPSBbZGF0ZV07XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gKSB7XG4gICAgICAgICAgaWYoIGtleSA9PSAnbnJlbCcgKSBjb250aW51ZTtcbiAgICAgICAgICBpZiggYXJyLmxlbmd0aCA9PSAwICkgaGVhZGVycy5wdXNoKGtleSk7XG4gICAgICAgICAgdC5wdXNoKG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaCh0KTtcbiAgfVxuXG4gIGlmKCBhcnIubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKFwiTm8gd2VhdGhlciBkYXRhIGhhcyBiZWVuIHVwbG9hZGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBodG1sID0gJzxkaXYgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21heC1oZWlnaHQ6NjAwcHhcIj48dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPic7XG5cbiAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICB2YXIgZDEgPSBuZXcgRGF0ZShhWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcbiAgICAgIHZhciBkMiA9IG5ldyBEYXRlKGJbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuXG4gICAgICBpZiggZDEgPCBkMiApIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSBpZiggZDEgPiBkMiApIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICB9KTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dGg+JytoZWFkZXJzW2ldKyc8L3RoPic7XG4gIH1cbiAgaHRtbCArPSAnPC90cj4nO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2FycltpXS5qb2luKCc8L3RkPjx0ZD4nKSsnPC90ZD48L3RyPic7XG4gIH1cblxuICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKGh0bWwrJzwvdGFibGU+PC9kaXY+PGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+Jyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICB9LCAxMDAwKTtcblxufTtcblxudmFyIHNob3dSYXdPdXRwdXQgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG5cbiAgLy8gc2VsZWN0ZWQgaW4gdGhlIGNoYXJ0cyBvdXRwdXRcbiAgdmFyIHZhcnMgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpO1xuXG4gIC8vIGZpbmQgdGhlIHJvd3Mgd2UgY2FyZSBhYm91dFxuICB2YXIgY2hhcnRSb3dzID0ge307XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcmVzdWx0c1swXS5vdXRwdXRbMF0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdmFycy5pbmRleE9mKHJlc3VsdHNbMF0ub3V0cHV0WzBdW2ldKSA+IC0xICkgY2hhcnRSb3dzW3Jlc3VsdHNbMF0ub3V0cHV0WzBdW2ldXSA9IGk7XG4gIH1cblxuICB2YXIgdGFicyA9ICQoJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cInJhd091dHB1dFRhYnNcIiAgZGF0YS10YWJzPVwicGlsbFwiPjwvdWw+Jyk7XG4gIHZhciBjb250ZW50cyA9ICQoJzxkaXYgY2xhc3M9XCJwaWxsLWNvbnRlbnRcIiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWFyZ2luLXRvcDoxNXB4XCI+PC9kaXY+Jyk7XG5cbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFicy5hcHBlbmQoJCgnPGxpICcrKGkgPT0gMCA/ICdjbGFzcz1cImFjdGl2ZVwiJyA6IFwiXCIpKyc+PGEgaHJlZj1cIiNyYXdvdXQnXG4gICAgICAgICAgK3ZhcnNbaV0rJ1wiIGRhdGEtdG9nZ2xlPVwidGFiXCI+Jyt2YXJzW2ldKyc8L2E+PC9saT4nKSk7XG5cbiAgICAgIGNvbnRlbnRzLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwicGlsbC1wYW5lICcgKyAoaSA9PSAwID8gJ2FjdGl2ZScgOiBcIlwiKVxuICAgICAgICAgICsgJ1wiIGlkPVwicmF3b3V0JyArIHZhcnNbaV0gKyAnXCI+PC9kaXY+JykpO1xuICB9XG5cbiAgJChcIiNvdXRwdXQtY29udGVudFwiKS5odG1sKFwiXCIpLmFwcGVuZCh0YWJzKS5hcHBlbmQoY29udGVudHMpO1xuICAkKFwiI3Jhd091dHB1dFRhYnNcIikudGFiKCk7XG5cbiAgY3N2UmVzdWx0cyA9IHtcbiAgICAgIGNvbmZpZyA6IG1vZGVsSU8uZXhwb3J0U2V0dXAoKSxcbiAgICAgIGRhdGEgOiB7fVxuICB9O1xuXG4gIC8vIHNvbWUgcm93cyBoYXZlIHN0cmluZ3MsIHdlIGRvbid0IHdhbnQgdGhlc2VcbiAgLy8gaWdub3JlIHN0cmluZyByb3dzXG4gIC8qZm9yKCB2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIGNsZWFuID0gW3Jlc3VsdHNbaV0ub3V0cHV0WzBdXTtcbiAgICAgIGZvciggdmFyIGogPSAxOyBqIDwgcmVzdWx0c1tpXS5vdXRwdXQubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgaWYoIHR5cGVvZiByZXN1bHRzW2ldLm91dHB1dFtqXVswXSAhPSAnc3RyaW5nJyApIGNsZWFuLnB1c2gocmVzdWx0c1tpXS5vdXRwdXRbal0pO1xuICAgICAgfVxuICAgICAgcmVzdWx0c1tpXS5vdXRwdXQgPSBjbGVhbjtcbiAgfSovXG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciB0YWJsZSwgcm93O1xuICBmb3IoIHZhciBrZXkgaW4gY2hhcnRSb3dzICkge1xuICAgICAgdGFibGUgPSBcIjx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtc3RyaXBlZCc+XCI7XG5cbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldID0gW107XG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgcmVzdWx0c1swXS5vdXRwdXQubGVuZ3RoOyBqKysgKXtcbiAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXSA9IFtdO1xuXG4gICAgICAgICAgLy8gc2V0IGhlYWRlciByb3dcbiAgICAgICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKCdtb250aCcpO1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKCdkYXRlJyk7XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRoPlN0ZXA8L3RoPjx0aD5EYXRlPC90aD5cIjtcbiAgICAgICAgICAgICAgZm9yKCB2YXIgeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGg+XCI7XG4gICAgICAgICAgICAgICAgICB2YXIgdG1wID0gW107XG5cbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIHJlc3VsdHNbel0uaW5wdXRzICkge1xuICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKG1UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8ZGl2PlwiK21UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiggdG1wLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBrZXk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2godG1wLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90aD5cIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvL3ZhciBkYXRlID0gbmV3IERhdGUoY0RhdGUuZ2V0WWVhcigpKzE5MDAsIGNEYXRlLmdldE1vbnRoKCkraiwgY0RhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgLy92YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSsxO1xuICAgICAgICAgICAgICAvL2lmKCBtIDwgMTAgKSBtID0gJzAnK207XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRkPlwiK2orXCI8L3RkPjx0ZD5cIityZXN1bHRzWzBdLm91dHB1dFtqXVswXSsnPC90ZD4nO1xuXG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goaik7XG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2gocmVzdWx0c1swXS5vdXRwdXRbal1bMF0pO1xuXG4gICAgICAgICAgICAgIHZhciB2O1xuICAgICAgICAgICAgICBmb3IoIHZhciB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgICAgICAgICB2ID0gcmVzdWx0c1t6XS5vdXRwdXRbal1bY2hhcnRSb3dzW2tleV1dO1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrditcIjwvdGQ+XCI7XG4gICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgICQoXCIjcmF3b3V0XCIgKyBrZXkpLmh0bWwodGFibGUrXCI8L3RhYmxlPlwiKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gc2VlIHRoZSBleHBvcnQgYnRuXG4gIGlmKCAhb2ZmbGluZU1vZGUgKSAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5zaG93KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIG91dHB1dHMgOiBvdXRwdXRzLFxuICBpbnB1dHMgOiBpbnB1dHMsXG4gIGdldE1vZGVsIDogZ2V0TW9kZWwsXG4gIHJ1bk1vZGVsIDogcnVuTW9kZWwsXG4gIHNob3dSYXdPdXRwdXQgOiBzaG93UmF3T3V0cHV0LFxuICBtb250aHNUb1J1biA6IG1vbnRoc1RvUnVuLFxuICBvdXRwdXREZWZpbml0aW9ucyA6IG91dHB1dERlZmluaXRpb25zLFxuICBxcyA6IHFzLFxuICBzZXRXZWF0aGVyIDogc2V0V2VhdGhlcixcbiAgZ2RyaXZlIDogZ2RyaXZlLFxuICBydW5Db21wbGV0ZSA6IHJ1bkNvbXBsZXRlLFxuICBnZXRNb2RlbElPIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZGVsSU87XG4gIH1cbn07XG4iLCJ2YXIgYXBwO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG52YXIgY1dpZHRoID0gMDtcblxuLy8gdGhlcmUgaXMgbm8gd2F5IHRvIGdldCB0aGUgY29sb3JzIGZvciB0aGUgbGVnZW5kcyAodG8gbWFrZSB5b3VyIG93bilcbi8vIHRoaXMgcG9zdDpcbi8vIGdpdmVzIHRoZXNlIHZhbHVlcy4gIFRoaXMgaXMgYSBIQUNLLCBpZiB0aGV5IGV2ZXIgY2hhbmdlLCB3ZSBuZWVkIHRvIHVwZGF0ZVxudmFyIGdvb2dsZUNoYXJ0Q29sb3JzID0gW1wiIzMzNjZjY1wiLFwiI2RjMzkxMlwiLFwiI2ZmOTkwMFwiLFwiIzEwOTYxOFwiLFwiIzk5MDA5OVwiLFwiIzAwOTljNlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiI2RkNDQ3N1wiLFwiIzY2YWEwMFwiLFwiI2I4MmUyZVwiLFwiIzMxNjM5NVwiLFwiIzk5NDQ5OVwiLFwiIzIyYWE5OVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiI2FhYWExMVwiLFwiIzY2MzNjY1wiLFwiI2U2NzMwMFwiLFwiIzhiMDcwN1wiLFwiIzY1MTA2N1wiLFwiIzMyOTI2MlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiIzU1NzRhNlwiLFwiIzNiM2VhY1wiLFwiI2I3NzMyMlwiLFwiIzE2ZDYyMFwiLFwiI2I5MTM4M1wiLFwiI2Y0MzU5ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiIzljNTkzNVwiLFwiI2E5YzQxM1wiLFwiIzJhNzc4ZFwiLFwiIzY2OGQxY1wiLFwiI2JlYTQxM1wiLFwiIzBjNTkyMlwiXG4gICAgICAgICAgICAgICAgICAgICAgLFwiIzc0MzQxMVwiXTtcblxudmFyIHdlYXRoZXJDaGFydE9wdGlvbnMgPSB7XG4gIHRpdGxlIDogJ1dlYXRoZXInLFxuICBoZWlnaHQgOiAzMDAsXG4gIHZBeGVzOiBbe1xuICAgICAgICAgIHRpdGxlOiBcIlJhZGlhdGlvbiAoTUovZGF5KTsgVGVtcGVyYXR1cmUgKF5DKTsgRGV3IFBvaW50ICheQyk7IERheWxpZ2h0IChoKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUsXG4gICAgICAgICAgbWF4VmFsdWUgOiAzNVxuICAgICAgICB9LHtcbiAgICAgICAgICB0aXRsZTogXCJQcmVjaXBpdGF0aW9uIChtbSlcIixcbiAgICAgICAgICBtaW5WYWx1ZSA6IC01MCxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1MFxuICAgICAgICB9XSxcbiAgaEF4aXM6IHt0aXRsZTogXCJNb250aFwifSxcbiAgc2VyaWVzVHlwZTogXCJiYXJzXCIsXG4gIHNlcmllczoge1xuICAgICAgMDoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAxOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDI6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMzoge3R5cGU6IFwiYXJlYVwiLCB0YXJnZXRBeGlzSW5kZXg6MX0sXG4gICAgICA0OiB7dGFyZ2V0QXhpc0luZGV4OjB9XG4gIH1cbn1cblxuLy8gdGVtcGxhdGUgZm9yIHRoZSBwb3B1cFxudmFyIHNsaWRlclBvcHVwID0gJChcbiAgICAgIFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAnPlwiICtcbiAgICAgICAgICBcIjxpIGNsYXNzPSdpY29uLXJlbW92ZS1jaXJjbGUgcHVsbC1yaWdodCBzbGlkZS1wb3B1cC1jbG9zZSc+PC9pPlwiK1xuICAgICAgICAgIFwiPGRpdiBpZD0nY2Fyb3VzZWwnIGNsYXNzPSdvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lJyBzdHlsZT0nbWFyZ2luLXRvcDoxNXB4Jz48L2Rpdj5cIiArXG5cdFwiPC9kaXY+XCIpO1xuXG52YXIgc2xpZGVyUG9wdXBCZyA9ICQoXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cC1iZyc+Jm5ic3A7PC9kaXY+XCIpO1xuXG4vLyBvbmx5IGRyYXcgY2hhcnRzIGlmIHNvbWVvbmUgaGFzIGNsaWNrIGEgY2hlY2tib3hcbnZhciBjaGFuZ2VzID0gZmFsc2U7XG5cbi8vIHdoZW4gc2l6aW5nLCB3YWl0IGEgfjMwMG1zIGJlZm9yZSB0cmlnZ2VyaW5nIHJlZHJhd1xudmFyIHJlc2l6ZVRpbWVyID0gLTE7XG5cbnZhciBjaGFydFR5cGVTZWxlY3RvciwgY2hhcnRDaGVja2JveGVzLCBjRGF0YTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgICBzaG93UG9wdXAoKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgY2hhcnQgc2VsZWN0b3JzXG4gICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoe3Nob3c6ZmFsc2V9KTtcblxuICAvLyBzZXQgcG9wdXAgY2xpY2sgaGFuZGxlcnNcbiAgJChcIiNjaGFydFR5cGUtc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsc2VsZWN0QWxsKTtcbiAgJChcIiNjaGFydFR5cGUtdW5zZWxlY3RBbGxcIikub24oJ2NsaWNrJyx1bnNlbGVjdEFsbCk7XG5cbiAgY2hhcnRUeXBlU2VsZWN0b3IgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpO1xuICBjaGFydENoZWNrYm94ZXMgPSAkKFwiI2NoYXJ0U2VsZWN0aW9uc1wiKTtcblxuICB2YXIgYzEgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMVwiKTtcbiAgdmFyIGMyID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzJcIik7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXBwLm91dHB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWwgPSBhcHAub3V0cHV0c1tpXTtcbiAgICAgIGNoYXJ0VHlwZVNlbGVjdG9yLmFwcGVuZCgkKFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyB2YWwgKyBcIicgXCJcbiAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICAgICAgICsgXCI+XCIgKyB2YWwgKyBcIjwvb3B0aW9uPlwiKSk7XG5cbiAgICAgIGlmKCBpICUgMiA9PSAwICkge1xuICAgICAgICAgIGMxLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjMi5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH1cbiAgfVxuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiLmZuLXRvZ2dsZVwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI1wiKyQodGhpcykuYXR0cihcImRhdGF0YXJnZXRcIikpLnRvZ2dsZSgnc2xvdycpO1xuICB9KTtcblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSApIHNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gICAgICBlbHNlIHVuc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgfSk7XG5cbiAgJChcIiNzZWxlY3QtY2hhcnRzLWJ0biwgI3NlbGVjdC1jaGFydHMtdGl0bGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgICBjaGFuZ2VzID0gZmFsc2U7XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtbW9kYWwtY2xvc2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIGlmKCBjaGFuZ2VzICYmIGNEYXRhICkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gICAgICAgICAgICAgIC8vIHVwZGF0ZSByYXcgZGF0YSBhcyB3ZWxsXG4gICAgICAgICAgICAgIGFwcC5zaG93UmF3T3V0cHV0KGNEYXRhKTtcbiAgICAgICAgICB9LDQwMCk7XG5cbiAgICAgIH1cbiAgfSk7XG5cbiAgJChcIi5jaGFydC10eXBlLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICkge1xuICAgICAgICAgICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gICAgICB9XG4gIH0pO1xufVxuXG4vLyBtYWtlIHN1cmUgYW5kIGVuZCBsYWJlbCB0YWdcbmZ1bmN0aW9uIF9jcmVhdGVEZXNjcmlwdGlvbih2YWwpIHtcbiAgaWYoICFhcHAub3V0cHV0RGVmaW5pdGlvbnNbdmFsXSApIHJldHVybiBcIjxiPlwiK3ZhbCtcIjwvYj48L2xhYmVsPlwiO1xuXG4gIHZhciBkZXNjID0gYXBwLm91dHB1dERlZmluaXRpb25zW3ZhbF07XG4gIHZhciBsYWJlbCA9IGRlc2MubGFiZWwgJiYgZGVzYy5sYWJlbC5sZW5ndGggPiAwID8gXCIgLSBcIitkZXNjLmxhYmVsIDogXCJcIjtcbiAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG5cbiAgdmFyIGxhYmVsID0gXCI8Yj5cIit2YWwrXCI8L2I+PHNwYW4gc3R5bGU9J2ZvbnQtc2l6ZToxMnB4Jz5cIitsYWJlbCt1bml0cytcIjwvc3Bhbj48L2xhYmVsPlwiO1xuICB2YXIgaGFzRGVzYyA9IGRlc2MuZGVzY3JpcHRpb24gJiYgZGVzYy5kZXNjcmlwdGlvbi5sZW5ndGggPiAwO1xuICBpZiggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPGRpdiBzdHlsZT0nZm9udC1zaXplOjExcHg7Y29sb3I6Izg4ODtmb250LXN0eWxlOml0YWxpYyc+XCIrZGVzYy5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHZhciBmTmFtZSA9IGRlc2MuYWx0Rm5OYW1lIHx8IHZhbDtcbiAgdmFyIGZuID0gYXBwLmdldE1vZGVsKCkuZ2V0RnVuY3Rpb24oZk5hbWUpO1xuXG4gIGlmKCBmbiB8fCBkZXNjLmZuICkge1xuICAgICAgaWYoICFoYXNEZXNjICkgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweCc+XCI7XG4gICAgICBsYWJlbCArPSBcIiA8YSBzdHlsZT0nZm9udC1zdHlsZTpub3JtYWw7Y3Vyc29yOnBvaW50ZXInIGRhdGF0YXJnZXQ9J2ZuLWRlc2MtXCIrdmFsK1wiJyBjbGFzcz0nZm4tdG9nZ2xlJz5mbigpPC9hPjwvZGl2PlwiO1xuXG4gICAgICBsYWJlbCArPSBcIjxkaXYgaWQ9J2ZuLWRlc2MtXCIrdmFsK1wiJyBzdHlsZT0nZGlzcGxheTpub25lO2ZvbnQtc2l6ZToxMXB4O292ZXJmbG93OmF1dG8nIGNsYXNzPSd3ZWxsIHdlbGwtc20nPlwiK1xuICAgICAgICAgICAgICAgICAgKGZufHxkZXNjLmZuKS50b1N0cmluZygpLnJlcGxhY2UoLyAvZywnJm5ic3A7JykucmVwbGFjZSgvXFxuL2csJzxiciAvPicpK1wiPC9kaXY+XCI7XG4gIH0gZWxzZSBpZiAoIGhhc0Rlc2MgKSB7XG4gICAgICBsYWJlbCArPSBcIjwvZGl2PlwiO1xuICB9XG5cbiAgLy8gVE9ETzogYWRkIGZuIHdlbGxcbiAgcmV0dXJuIGxhYmVsK1wiPGJyIC8+XCI7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLmF0dHIoXCJzZWxlY3RlZFwiLFwic2VsZWN0ZWRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdmFsdWU9XCIrdmFsK1wiXVwiKS5wcm9wKFwiY2hlY2tlZFwiLHRydWUpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdW5zZWxlY3QodmFsKSB7XG4gIGNoYXJ0VHlwZVNlbGVjdG9yLmZpbmQoXCJvcHRpb25bdmFsdWU9XCIrdmFsK1wiXVwiKS5yZW1vdmVBdHRyKFwic2VsZWN0ZWRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdmFsdWU9XCIrdmFsK1wiXVwiKS5wcm9wKFwiY2hlY2tlZFwiLGZhbHNlKTtcbiAgY2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykgc2VsZWN0KGFwcC5vdXRwdXRzW2ldKTtcbn1cblxuZnVuY3Rpb24gdW5zZWxlY3RBbGwoKSB7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXBwLm91dHB1dHMubGVuZ3RoOyBpKyspIHVuc2VsZWN0KGFwcC5vdXRwdXRzW2ldKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGVsZSkge1xuICBlbGUucGFyZW50KCkuaGlkZSgnc2xvdycsIGZ1bmN0aW9uKCl7XG4gICAgICBlbGUucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICB1bnNlbGVjdChlbGUuYXR0cigndHlwZScpKTtcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcHJpbnQoY2hhcnRDb250YWluZXIpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAncHJpbnQtY2hhcnQnLCAxKTtcblxuXG52YXIgZGlzcF9zZXR0aW5nPVwidG9vbGJhcj15ZXMsbG9jYXRpb249bm8sZGlyZWN0b3JpZXM9eWVzLG1lbnViYXI9eWVzLFwiO1xuICBkaXNwX3NldHRpbmcrPVwic2Nyb2xsYmFycz15ZXMsd2lkdGg9ODAwLCBoZWlnaHQ9NjAwLCBsZWZ0PTI1LCB0b3A9MjVcIjtcblxuICB2YXIgc3ZnID0gY2hhcnRDb250YWluZXIuZmluZChcInN2Z1wiKTtcbiAgdmFyIGh0bWwgPSBjaGFydENvbnRhaW5lci5maW5kKFwiZGl2XCIpLmh0bWwoKTtcblxuICB2YXIgZG9jcHJpbnQ9d2luZG93Lm9wZW4oXCJcIixcIlwiLGRpc3Bfc2V0dGluZyk7XG4gIGRvY3ByaW50LmRvY3VtZW50Lm9wZW4oKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzxodG1sPjxoZWFkPjx0aXRsZT48L3RpdGxlPicpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9oZWFkPjxib2R5IG1hcmdpbndpZHRoPVwiMFwiIG1hcmdpbmhlaWdodD1cIjBcIiBvbkxvYWQ9XCJzZWxmLnByaW50KClcIj48Y2VudGVyPicpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZShodG1sKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzwvY2VudGVyPjwvYm9keT48L2h0bWw+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LmNsb3NlKCk7XG4gIGRvY3ByaW50LmZvY3VzKCk7XG5cbn1cblxuXG5mdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgY0RhdGEgPSBkYXRhO1xufVxuXG4vLyBiYXNpY2FsbHkgcmVkcmF3IGV2ZXJ5dGhpbmdcbmZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgLy8gcmVxdWlyZSBtb3JlIHRoYW4gYSAzMCBwaXhlbCB3aWR0aCBjaGFuZ2UgKHNvIHdlIGRvbid0IHJlZHJhdyB3LyBzY3JvbGwgYmFycyBhZGRlZClcbiAgdmFyIHdpbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gIGlmKCBjV2lkdGggPiB3aW5XaWR0aCAtIDE1ICYmIGNXaWR0aCA8IHdpbldpZHRoICsgMTUgKSByZXR1cm47XG4gIGNXaWR0aCA9IHdpbldpZHRoO1xuXG4gIGlmKCByZXNpemVUaW1lciAhPSAtMSApIGNsZWFyVGltZW91dChyZXNpemVUaW1lcik7XG4gIHJlc2l6ZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHJlc2l6ZVRpbWVyID0gLTE7XG4gICAgICB1cGRhdGVDaGFydHMoKTtcbiAgfSwzMDApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGFydHMocmVzdWx0cywgYW5pbWF0ZSkge1xuICBpZiggcmVzdWx0cyApIHNldERhdGEocmVzdWx0cyk7XG4gIGlmKCAhY0RhdGEgKSByZXR1cm47XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5zaG93KCk7XG5cbiAgLy8gY3JlYXRlIGEgbGVnZW5kIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgcnVuXG4gIHZhciBsZWdlbmQgPSBcIlwiO1xuICBpZiggIWNEYXRhWzBdLnNpbmdsZVJ1biApIHtcbiAgICAgIHZhciBjMSA9IFwiXCI7XG4gICAgICB2YXIgYzIgPSBcIlwiO1xuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjRGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgZWxlID0gXCI8ZGl2IHN0eWxlPSdtaW4taGVpZ2h0OjQwcHg7bWFyZ2luLWJvdHRvbToxMHB4Jz48ZGl2IGNsYXNzPSdsZWdlbmQtc3F1YXJlJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpcIitnb29nbGVDaGFydENvbG9yc1tpXStcIic+Jm5ic3A7PC9kaXY+XCI7XG4gICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gY0RhdGFbaV0uaW5wdXRzICkge1xuICAgICAgICAgICAgICBlbGUgKz0gXCI8ZGl2IGNsYXNzPSdsZWdlbmQtdGV4dCc+XCIrbVR5cGUrXCI9XCIrY0RhdGFbaV0uaW5wdXRzW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpICUgMiA9PSAwICkgYzEgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgICAgIGVsc2UgYzIgKz0gZWxlICsgXCI8L2Rpdj5cIlxuICAgICAgfVxuICAgICAgbGVnZW5kID0gXCI8ZGl2PjxhIGlkPSdsZWdlbmQtcGFuZWwtdG9nZ2xlJyBzdHlsZT0nbWFyZ2luLWxlZnQ6NXB4O2N1cnNvcjpwb2ludGVyJz5MZWdlbmQ8L2E+PC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZy1ib3R0b206NXB4O21hcmdpbi1ib3R0b206MTVweCc+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3JvdycgaWQ9J2xlZ2VuZC1wYW5lbCc+PGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MxK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMitcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8L2Rpdj48L2Rpdj5cIjtcbiAgfVxuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuaHRtbChsZWdlbmQpO1xuICAkKFwiI2xlZ2VuZC1wYW5lbC10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjbGVnZW5kLXBhbmVsXCIpLnRvZ2dsZShcInNsb3dcIik7XG4gIH0pO1xuXG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd01haW5DaGFydCh0eXBlc1tpXSwgYW5pbWF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzaG93LWNoYXJ0LXBvcHVwJywgMSk7XG5cblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5odG1sKFwiXCIpO1xuICAkKCdib2R5Jykuc2Nyb2xsVG9wKDApLmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKS5hcHBlbmQoc2xpZGVyUG9wdXBCZykuYXBwZW5kKHNsaWRlclBvcHVwKTtcblxuICAvLyB0aGlzIGNvdWxkIGNhc2UgYmFkbmVzcy4uLi4gIHdoeSBkb2Vzbid0IGl0IGxpdmUgd2hlbiByZW1vdmVkIGZyb20gRE9NP1xuICBzbGlkZXJQb3B1cC5maW5kKCcuc2xpZGUtcG9wdXAtY2xvc2UnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICBoaWRlUG9wdXAoKTtcbiAgfSk7XG5cbiAgdmFyIHR5cGVzID0gY2hhcnRUeXBlU2VsZWN0b3IudmFsKCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfc2hvd1BvcHVwQ2hhcnQodHlwZXNbaV0pO1xuICB9XG5cbiAgJCgnI2Nhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgbmF2aWdhdGlvbiA6IHRydWUsIC8vIFNob3cgbmV4dCBhbmQgcHJldiBidXR0b25zXG4gICAgICBzbGlkZVNwZWVkIDogMzAwLFxuICAgICAgcGFnaW5hdGlvblNwZWVkIDogNDAwLFxuICAgICAgc2luZ2xlSXRlbTp0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaWRlUG9wdXAoKSB7XG4gIHNsaWRlclBvcHVwQmcucmVtb3ZlKCk7XG4gIHNsaWRlclBvcHVwLnJlbW92ZSgpO1xuICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsJ2F1dG8nKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dNYWluQ2hhcnQodHlwZSwgYW5pbWF0ZSkge1xuICB2YXIgY2hhcnRUeXBlID0gJChcIi5jaGFydC10eXBlLXRvZ2dsZS5hY3RpdmVcIikuYXR0cihcInZhbHVlXCIpO1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiAvPlwiKTtcbiAgdmFyIG91dGVyUGFuZWwgPSAkKFwiPGRpdj5cIitcbiAgXHRcIjxhIGNsYXNzPSdidG4gYnRuLXhzIGJ0bi1kZWZhdWx0JyBzdHlsZT0nXCIrKGNoYXJ0VHlwZSAhPSBcInRpbWVsaW5lXCIgPyBcInBvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTA7bWFyZ2luOjAgMCAtMjBweCAyMHB4XCIgOiBcIm1hcmdpbi1ib3R0b206NXB4XCIpK1xuICAgICAgXCInIHR5cGU9J1wiK3R5cGUrXCInPlwiICtcbiAgXHRcIjxpIGNsYXNzPSdpY29uLXJlbW92ZSc+PC9pPiBcIit0eXBlK1wiPC9hPjwvZGl2PlwiKTtcbiAgb3V0ZXJQYW5lbC5maW5kKFwiYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHJlbW92ZSgkKHRoaXMpKTtcbiAgfSk7XG4gIGlmKCBjaGFydFR5cGUgPT0gXCJ0aW1lbGluZVwiICkgb3V0ZXJQYW5lbC5jc3MoXCJtYXJnaW4tYm90dG9tXCIsXCIyMHB4XCIpO1xuICAkKFwiI2NoYXJ0LWNvbnRlbnRcIikuYXBwZW5kKG91dGVyUGFuZWwuYXBwZW5kKHBhbmVsKSk7XG4gIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBmYWxzZSwgbnVsbCwgYW5pbWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9zaG93UG9wdXBDaGFydCh0eXBlKSB7XG4gIHZhciBwYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdpdGVtJz48L2Rpdj5cIik7XG5cbiAgdmFyIHByaW50QnRuID0gJChcIjxhIGNsYXNzPSdidG4gYnRuLXNtIGJ0bi1kZWZhdWx0JyBzdHlsZT0nbWFyZ2luLWxlZnQ6MTZweCc+PGkgY2xhc3M9J2ljb24tcHJpbnQnPjwvaT4gUHJpbnQ8L2E+XCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgcHJpbnQoY2hhcnRQYW5lbCk7XG4gIH0pO1xuICBwYW5lbC5hcHBlbmQocHJpbnRCdG4pO1xuXG4gIHZhciBjaGFydFBhbmVsID0gJChcIjxkaXY+PC9kaXY+XCIpO1xuICBwYW5lbC5hcHBlbmQoY2hhcnRQYW5lbCk7XG5cbiAgc2xpZGVyUG9wdXAuZmluZChcIi5vd2wtdGhlbWVcIikuYXBwZW5kKHBhbmVsKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsICdsaW5lJywgY2hhcnRQYW5lbCwgdHJ1ZSwgW01hdGgucm91bmQoJCh3aW5kb3cpLndpZHRoKCkqLjg4KSwgTWF0aC5yb3VuZCgoJCh3aW5kb3cpLmhlaWdodCgpKi45MCktMTI1KV0pO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2hhcnQodHlwZSwgY2hhcnRUeXBlLCBwYW5lbCwgc2hvd0xlZ2VuZCwgc2l6ZSwgYW5pbWF0ZSkge1xuICB2YXIgY29sID0gMDtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG5cbiAgaWYoIGNoYXJ0VHlwZSA9PSAndGltZWxpbmUnICkge1xuICAgICAgZHQuYWRkQ29sdW1uKCdkYXRlJywgJ01vbnRoJyk7XG4gIH0gZWxzZSB7XG4gICAgICAvL2R0LmFkZENvbHVtbignbnVtYmVyJywgJ01vbnRoJyk7XG4gICAgICBkdC5hZGRDb2x1bW4oJ3N0cmluZycsICdNb250aCcpO1xuICB9XG5cbiAgLy8gc2V0IHRoZSBmaXJzdCBjb2x1bW5cbiAgaWYoICFjRGF0YVswXS5zaW5nbGVSdW4gKSB7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBsYWJlbCA9IFwiXCI7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGNEYXRhW2ldLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgbGFiZWwgKz0ga2V5LnJlcGxhY2UoLy4qXFwuLywnJykrXCI9XCIrY0RhdGFbaV0uaW5wdXRzW2tleV0rXCIgXFxuXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhYmVsID0gbGFiZWwucmVwbGFjZSgvLFxccyQvLCcnKTtcbiAgICAgICAgICBkdC5hZGRDb2x1bW4oJ251bWJlcicsIGxhYmVsKTtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgdHlwZSk7XG4gIH1cblxuICAvLyBmaW5kIHRoZSBjb2x1bW4gd2Ugd2FudCB0byBjaGFydFxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBjRGF0YVswXS5vdXRwdXRbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjRGF0YVswXS5vdXRwdXRbMF1baV0gPT0gdHlwZSkge1xuICAgICAgICAgIGNvbCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKSk7XG5cbiAgdmFyIGRhdGEgPSBbXTtcbiAgdmFyIG1heCA9IDA7XG4gIC8vIGNyZWF0ZSB0aGUgW11bXSBhcnJheSBmb3IgdGhlIGdvb2dsZSBjaGFydFxuICBmb3IgKCB2YXIgaSA9IDE7IGkgPCBjRGF0YVswXS5vdXRwdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vaWYgKHR5cGVvZiBjRGF0YVswXS5vdXRwdXRbaV1bY29sXSA9PT0gJ3N0cmluZycpIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgcm93ID0gW107XG5cbiAgICAgIC8vdmFyIGRhdGUgPSBuZXcgRGF0ZShjRGF0ZS5nZXRZZWFyKCkrMTkwMCwgY0RhdGUuZ2V0TW9udGgoKStpLCBjRGF0ZS5nZXREYXRlKCkpO1xuICAgICAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSB7XG4gICAgICAgICAgLy8gYWRkIG9uIG1vbnRoXG4gICAgICAgICAgcm93LnB1c2gobmV3IERhdGUoY0RhdGFbMF0ub3V0cHV0W2ldWzBdKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5wdXNoKGNEYXRhWzBdLm91dHB1dFtpXVswXSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoIHZhciBqID0gMDsgaiA8IGNEYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYoIGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdID4gbWF4ICkgbWF4ID0gY0RhdGFbal0ub3V0cHV0W2ldW2NvbF07XG4gICAgICAgICAgcm93LnB1c2goY0RhdGFbal0ub3V0cHV0W2ldW2NvbF0pO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnB1c2gocm93KTtcbiAgfVxuXG4gIGR0LmFkZFJvd3MoZGF0YSk7XG5cbiAgaWYoIGFwcC5vdXRwdXREZWZpbml0aW9uc1t0eXBlXSApIHtcbiAgICAgIHZhciBkZXNjID0gYXBwLm91dHB1dERlZmluaXRpb25zW3R5cGVdO1xuICAgICAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICAgICAgdmFyIHVuaXRzID0gZGVzYy51bml0cyAmJiBkZXNjLnVuaXRzLmxlbmd0aCA+IDAgPyBcIiBbXCIrZGVzYy51bml0cytcIl1cIiA6IFwiXCI7XG4gICAgICB0eXBlID0gdHlwZStsYWJlbCt1bml0cztcbiAgfVxuXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgdkF4aXMgOiB7XG4gICAgICAgICAgICAgIHRpdGxlIDogdHlwZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaEF4aXMgOiB7XG4gICAgICAgICAgICAgIHRpdGxlIDogXCJNb250aFwiXG4gICAgICAgICAgfVxuICB9XG4gIGlmKCAhc2hvd0xlZ2VuZCApIG9wdGlvbnMubGVnZW5kID0ge3Bvc2l0aW9uOlwibm9uZVwifTtcblxuICBpZiggc2l6ZSApIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSBzaXplWzBdO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBzaXplWzFdO1xuICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHBhbmVsLndpZHRoKCk7XG4gICAgICBvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMud2lkdGgqLjQ7XG4gIH1cbiAgcGFuZWwud2lkdGgob3B0aW9ucy53aWR0aCkuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBvcHRpb25zLmRpc3BsYXlBbm5vdGF0aW9ucyA9IHRydWU7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQW5ub3RhdGVkVGltZUxpbmUocGFuZWxbMF0pO1xuICAgICAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdlYXRoZXJDaGFydChyb290LCBkYXRhKSB7XG4gICQocm9vdCkuaHRtbCgnJyk7XG5cbiAgdmFyIGR0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuICBkdC5hZGRDb2x1bW4oJ3N0cmluZycsICdNb250aCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNaW4gVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTWF4IFRlbXBlcmF0dXJlJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RldyBQb2ludCcpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdQcmVjaXBpdGF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1JhZGlhdGlvbicpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdEYXlsaWdodCcpO1xuXG4gIGZvciggdmFyIGRhdGUgaW4gZGF0YSApIHtcbiAgICAgIHZhciBvYmogPSBkYXRhW2RhdGVdO1xuICAgICAgZHQuYWRkUm93KFtcbiAgICAgICAgICBkYXRlKycnLFxuICAgICAgICAgIG9iai50bWluIHx8IDAsXG4gICAgICAgICAgb2JqLnRtYXggfHwgMCxcbiAgICAgICAgICBvYmoudGRtZWFuIHx8IDAsXG4gICAgICAgICAgb2JqLnBwdCB8fCAwLFxuICAgICAgICAgIG9iai5yYWQgfHwgMCxcbiAgICAgICAgICBvYmouZGF5bGlnaHQgfHwgMFxuICAgICAgXSk7XG4gIH1cblxuICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ29tYm9DaGFydChyb290KTtcbiAgY2hhcnQuZHJhdyhkdCwgd2VhdGhlckNoYXJ0T3B0aW9ucyk7XG5cbiAgcmV0dXJuIGNoYXJ0O1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXRBcHAgOiBmdW5jdGlvbihhKSB7XG4gICAgYXBwID0gYTtcbiAgfSxcbiAgICBpbml0IDogaW5pdCxcbiAgICBzZXREYXRhIDogc2V0RGF0YSxcbiAgICBzZWxlY3QgOiBzZWxlY3QsXG4gICAgdW5zZWxlY3QgOiB1bnNlbGVjdCxcbiAgICBzZWxlY3RBbGwgOiBzZWxlY3RBbGwsXG4gICAgdW5zZWxlY3RBbGwgOiB1bnNlbGVjdEFsbCxcbiAgICB1cGRhdGVDaGFydHMgOiB1cGRhdGVDaGFydHMsXG4gICAgcmVtb3ZlIDogcmVtb3ZlLFxuICAgIHNob3dQb3B1cDogc2hvd1BvcHVwLFxuICAgIGhpZGVQb3B1cDogaGlkZVBvcHVwLFxuICAgIHJlc2l6ZSA6IHJlc2l6ZSxcbiAgICBjcmVhdGVXZWF0aGVyQ2hhcnQgOiBjcmVhdGVXZWF0aGVyQ2hhcnRcbn1cbiIsInZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dkcml2ZScpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgICAgICAgc2hvdyA6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX3NldE1lc3NhZ2UobnVsbCk7XG5cbiAgICAgICAgJChcIiNleHBvcnQtbmFtZVwiKS52YWwoXCIzUEcgTW9kZWwgUmVzdWx0cyAoXCIrbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QvLCcgJykucmVwbGFjZSgvXFwuXFxkKlovLCcnKStcIilcIik7XG4gICAgICAgICAgJChcIiNleHBvcnQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TWVzc2FnZShtc2csIHR5cGUsIHByb2dyZXNzKSB7XG4gIGlmKCAhbXNnICkge1xuICAgIHJldHVybiAkKFwiI2V4cG9ydC1tc2dcIikuaGlkZSgpO1xuICB9XG4gICQoXCIjZXhwb3J0LW1zZ1wiKS5zaG93KCk7XG5cbiAgaWYoIHByb2dyZXNzICkge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLmhpZGUoKTtcbiAgfVxuXG4gICQoJyNleHBvcnQtbXNnJykuYXR0cihcImNsYXNzXCIsJ2FsZXJ0IGFsZXJ0LScrdHlwZSk7XG4gICQoJyNleHBvcnQtbXNnLXRleHQnKS5odG1sKG1zZyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVQcm9ncmVzcyhpbmRleCwgdG90YWwpIHtcbiAgcGVyY2VudCA9IDEwMCAqICggaW5kZXggLyB0b3RhbCApO1xuICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3MtYmFyXCIpLmF0dHIoXCJhcmlhLXZhbHVlbm93XCIsIHBlcmNlbnQpLmNzcyhcIndpZHRoXCIscGVyY2VudCtcIiVcIik7XG59XG5cbi8vIHNlZSBpZiBhbiBlcnJvciBleGlzdHMsIGlmIHNvLCBzZXQgc3RhdGVcbmZ1bmN0aW9uIF9jaGVja0Vycm9yKGZpbGUpIHtcbiAgdmFyIGVycm9yTWVzc2FnZSA9IG51bGw7XG4gIGlmKCAhZmlsZSApIGVycm9yTWVzc2FnZSA9IFwiRXJyb3IgY3JlYXRpbmcgZmlsZSBvbiBHb29nbGUgRHJpdmUgOihcIjtcbiAgaWYoIGZpbGUuZXJyb3IgKSBlcnJvck1lc3NhZ2UgPSBmaWxlLm1lc3NhZ2U7XG5cbiAgaWYoIGVycm9yTWVzc2FnZSApIHtcbiAgICBfc2V0TWVzc2FnZShlcnJvck1lc3NhZ2UsIFwiZGFuZ2VyXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4gIC8vIGV4cG9ydCBhcyBjc3ZcbmZ1bmN0aW9uIGV4cG9ydENzdihyZXN1bHRzKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2V4cG9ydC1kcml2ZS1jc3YnLCAxKTtcblxuICAkKFwiI2V4cG9ydC1jc3ZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0aW5nLi4uXCIpO1xuXG4gIHZhciBuYW1lID0gJChcIiNleHBvcnQtbmFtZVwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSB7XG4gICAgX3NldE1lc3NhZ2UoXCJQbGVhc2UgcHJvdmlkZSBhIGZvbGRlciBuYW1lXCIsIFwiZGFuZ2VyXCIpXG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YSA9IHJlc3VsdHMuZGF0YTtcblxuICAvLyBjcmVhdGUgYSBsaXN0IHNvIHdlIGNhbiByZWN1cnNpdmVseSBpdGVyYXRlXG4gIHZhciBrZXlzID0gW107XG4gIGZvciggdmFyIGtleSBpbiBkYXRhICkga2V5cy5wdXNoKGtleSk7XG5cbiAgLy8gY3JlYXRlIGZvbGRlclxuICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGV4cG9ydCBmb2xkZXIuLi5cIiwgXCJpbmZvXCIsIHRydWUpO1xuICBfdXBkYXRlUHJvZ3Jlc3MoMSwga2V5cy5sZW5ndGgrMik7XG4gIGdkcml2ZS5zYXZlRmlsZShuYW1lLFwiQUhCIDNQRyBNb2RlbCBSZXN1bHRzXCIsXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyXCIsXCJcIixmdW5jdGlvbihmaWxlKXtcbiAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgdmFyIHBhcmVudCA9IGZpbGUuaWQ7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDIsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgLy8gY3JlYXRlIGEgbmljZSBmaWxlIGRlc2NyaWJpbmcgdGhlIGN1cnJlbnQgZXhwb3J0XG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBjb25maWcgZmlsZS4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZGVsZXRlIHJlc3VsdHMuY29uZmlnLnBsYW50YXRpb25fc3RhdGU7XG4gICAgdmFyIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdHMuY29uZmlnLG51bGwsXCIgIFwiKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoXCJjb25maWcudHh0XCIsXCJBSEIgM1BHIE1vZGVsIC0gUnVuIENvbmZpZ3VyYXRpb25cIixcInRleHQvcGxhaW5cIixjb25maWcsZnVuY3Rpb24oZmlsZSl7XG4gICAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoMywga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIF9jcmVhdGVFeHBvcnQoMCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtwYXJlbnQ6IHBhcmVudH0pXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpIHtcblxuICAvLyB3ZSBhcmUgYWxsIGRvbmUgOilcbiAgaWYoIGluZGV4ID09IGtleXMubGVuZ3RoICkge1xuICAgIF91cGRhdGVQcm9ncmVzcygxLCAxKTtcbiAgICBfc2V0TWVzc2FnZShcIkV4cG9ydCBTdWNjZXNzZnVsLjxiciAvPjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS8jZm9sZGVycy9cIiArIHBhcmVudCArXG4gICAgICAgICAgXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1leHRlcm5hbC1saW5rLXNpZ24nPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+XCIsIFwic3VjY2Vzc1wiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICB9IGVsc2Uge1xuXG4gICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgIHZhciBjc3YgPSBcIlwiO1xuXG4gICAgLy8gVE9ETzogYWRkIG1vbnRoIGFuZCBkYXRlXG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGFba2V5XS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBkYXRhW2tleV1baV0ubGVuZ3RoID09IDAgKSBjb250aW51ZTsgLy8gaWdub3JlIHRoZSBibGFuayByb3dzXG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZGF0YVtrZXldW2ldLmxlbmd0aDsgaisrICkgY3N2ICs9IGRhdGFba2V5XVtpXVtqXStcIixcIjtcbiAgICAgIGNzdiA9IGNzdi5yZXBsYWNlKC8sJC8sJycpK1wiXFxuXCI7XG4gICAgfVxuXG4gICAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBcIitrZXlzW2luZGV4XStcIi5jc3YuLi4gXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBnZHJpdmUuc2F2ZUZpbGUoa2V5c1tpbmRleF0rXCIuY3N2XCIsXCJcIixcInRleHQvY3N2XCIsY3N2LGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuXG4gICAgICBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgrNCwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAgIGluZGV4Kys7XG4gICAgICBfY3JlYXRlRXhwb3J0KGluZGV4LCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se2NvbnZlcnQ6IHRydWUsIHBhcmVudDogcGFyZW50fSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHBvcnRDc3YgOiBleHBvcnRDc3YsXG4gIGluaXQgICAgICA6IGluaXRcbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vYnJvd3NlcnN0YWNrL2ZsYXNoYmxvY2stZGV0ZWN0b3JcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjYWxsYmFja01ldGhvZCl7XG4gICAgdmFyIHJldHVybl92YWx1ZSA9IDA7XG5cbiAgICBpZihuYXZpZ2F0b3IucGx1Z2luc1tcIlNob2Nrd2F2ZSBGbGFzaFwiXSkge1xuICAgICAgICAgIGVtYmVkX2xlbmd0aCA9ICQoJ2VtYmVkJykubGVuZ3RoO1xuICAgICAgICAgIG9iamVjdF9sZW5ndGggPSAkKCdvYmplY3QnKS5sZW5ndGg7XG5cbiAgICAgICAgICBpZigoZW1iZWRfbGVuZ3RoID4gMCkgfHwgKG9iamVjdF9sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAvKiBNYWMgLyBDaHJvbWUgdXNpbmcgRmxhc2hCbG9jayArIE1hYyAvIFNhZmFyaSB1c2luZyBBZEJsb2NrICovXG4gICAgICAgICAgICAgICQoJ29iamVjdCwgZW1iZWQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvKiBNYWMgLyBGaXJlZm94IHVzaW5nIEZsYXNoQmxvY2sgKi9cbiAgICAgICAgICAgICAgaWYoICQoJ2RpdltiZ2luYWN0aXZlXScpLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICB9IGVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgPiAtMSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG5ldyBBY3RpdmVYT2JqZWN0KCdTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaCcpO1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIElmIGZsYXNoIGlzIG5vdCBpbnN0YWxsZWQgKi9cbiAgICAgICAgICByZXR1cm5fdmFsdWUgPSAxO1xuICAgIH1cblxuICAgIGlmKGNhbGxiYWNrTWV0aG9kICYmIHR5cGVvZihjYWxsYmFja01ldGhvZCkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNhbGxiYWNrTWV0aG9kKHJldHVybl92YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuX3ZhbHVlO1xuICAgIH1cbn07XG4iLCJ2YXIgT2F1dGggPSByZXF1aXJlKCcuL29hdXRoJyk7XG52YXIgZ2RyaXZlUlQgPSByZXF1aXJlKCcuL2dkcml2ZVJUJyk7XG52YXIgYXBwO1xuXG5cbnZhciBNSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnJ1blwiO1xudmFyIFRSRUVfTUlNRV9UWVBFID0gXCJhcHBsaWNhdGlvbi92bmQuYWhiLTNwZy50cmVlXCI7XG52YXIgRFJJVkVfQVBJX1ZFUlNJT04gPSBcInYyXCI7XG5cbi8vIGdvb2dsZSBvYXV0aCBhY2Nlc3MgdG9rZW5cbnZhciB0b2tlbiA9IFwiXCI7XG5cbi8vIGN1cnJlbnRseSBsb2FkZWQgZ2RyaXZlIGZpbGUgaWRcbnZhciBsb2FkZWRGaWxlID0gbnVsbDtcbi8vIGxpc3Qgb2YgY3VycmVudGx5IGxvYWRlZCBmaWxlcyAobWV0YWRhdGEpXG52YXIgZmlsZUxpc3QgPSBbXTtcbi8vIGdvb2dsZSBkcml2ZSBzaGFyZSBjbGllbnRcbnZhciBjbGllbnQgPSBudWxsO1xuXG4vLyBsb2FkZWQgdHJlZSBhbmQgbWFuYWdlbWVudFxudmFyIGxvYWRlZFRyZWUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIHRyZWUgZmlsZXMgKG1ldGFkYXRhKVxudmFyIHRyZWVMaXN0ID0gW107XG5cbi8vIGN1cnJlbnQgTUlNRSBUWVBFIHdlIGFyZSBzYXZpbmdcbnZhciBzYXZlTWltZVR5cGUgPSBcIlwiO1xuXG4vKioqXG4gKiAgSW5pdGlhbGl6ZSBnb29nbGUgZHJpdmUgcGFuZWxzLCBidG5zIGFuZCBsb2dpblxuICoqKi9cbmZ1bmN0aW9uIGluaXQoYXBwbGljYXRpb24sIGNhbGxiYWNrKSB7XG4gIGFwcCA9IGFwcGxpY2F0aW9uO1xuICBnZHJpdmVSVC5zZXRBcHAoYXBwKTtcblxuICAvLyBpbml0IGJvb3RzdHJhcCBtb2RhbFxuICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyBpbml0IGJvb3RzdHJhcCBtb2RhbFxuICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICQoXCIjaGVscC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHNldCB0aGUgJ3VwZGF0ZScgYnRuIGNsaWNrIGhhbmRsZXJcbiAgJChcIiNzYXZlLXVwZGF0ZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgX3VwZGF0ZUN1cnJlbnRGaWxlKCk7XG4gIH0pO1xuXG4gIC8vIHNldCB0aGUgJ25ldycgYnRuIGNsaWNrIGhhbmRsZXJcbiAgJChcIiNzYXZlLW5ldy1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgX3NhdmVOZXdGaWxlKCk7XG4gIH0pO1xuXG4gIC8vIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAgX2NyZWF0ZUxvZ2luQnRuKCk7XG5cbiAgLy8gbG9hZCB0aGUgZ29vZ2xlIGF1dGggYW5kIGRyaXZlIGFwaSdzXG4gIF9sb2FkQXBpKGZ1bmN0aW9uKCkge1xuICAgIC8vIGlmIHRoZSB1c2VyIGlzIGF1dGhvcml6ZWQgZ3JhYiB0aGUgcmVmcmVzaCB0b2tlblxuICAgIE9hdXRoLmlzQXV0aG9yaXplZChmdW5jdGlvbihyZWZyZXNoVG9rZW4pe1xuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gcmVmcmVzaCB0b2tlbiwgbGVhdmUsIHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgaWYoICFyZWZyZXNoVG9rZW4gKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgLy8gaWYgd2UgaGF2ZSBhIHJlZmVzaCB0b2tlbiwgdGhlbiB1c2VyIGlzIGFsbCBzZXQsXG4gICAgICAvLyBnZXQgYSBuZXcgYWNjZXNzIHRva2VuIHNvIHdlIGNhbiBzdGFydCB1c2luZyB0aGUgYXBpJ3NcbiAgICAgIC8vIGdyYWIgdGhlaXIgaW5mb3JtYXRpb24gYW5kIGRpc3BsYXlcbiAgICAgIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpe1xuICAgICAgICB0b2tlbiA9IHQ7XG4gICAgICAgIGlmKCB0b2tlbiApIF9zZXRVc2VySW5mbygpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWRcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIF9jaGVja1Rva2VuKCk7XG4gICAgfSwgMTAwMCAqIDUgKiA2MCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIHRoZSB0cmVlICdzaGFyZScgYnRuXG4gICQoXCIjc2hhcmUtdHJlZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAvLyBzZWUgaWYgd2UgaGF2ZSBhIHNoYXJlIGNsaWVudFxuICAgIGlmKCBjbGllbnQgPT0gbnVsbCApIHtcbiAgICAgIC8vIG5vIGNsaWVudCwgbG9hZCBhcGlcbiAgICAgIGdhcGkubG9hZCgnZHJpdmUtc2hhcmUnLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBvbiBsb2FkLCBzaG93IHRoZSBzaGFyZSBwb3B1cCB3aXRoIHRoZSBjdXJyZW50IHRyZWVcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZFRyZWVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2UgaGF2ZSBhIGNsaWVudCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCBjdXJyZW50IHRyZWVcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxuLyoqKlxuICogU2F2ZSB0aGUgY3VycmVudCBtb2RlbCBhcyBhIG5ldyBnb29nbGUgZHJpdmUgZmlsZVxuICoqKi9cbmZ1bmN0aW9uIF9zYXZlTmV3RmlsZSgpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnc2F2ZS1kcml2ZS1maWxlJywgMSk7XG5cbiAgLy8gZ3JhYiB0aGUgbmFtZSBvZiB0aGUgbmV3IGZpbGVcbiAgdmFyIG5hbWUgPSAkKFwiI3NhdmUtbmFtZS1pbnB1dFwiKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSB7IC8vIHdlIGFsd2F5cyB3YW50IGEgbmFtZSwgYWxlcnQgYW5kIHF1aXRcbiAgICBfc2V0U2F2ZU1lc3NhZ2UoJ1BsZWFzZSBwcm92aWRlIGEgZmlsZW5hbWUuJywnaW5mbycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNlZSB3aGF0IGtpbmQgb2YgZmlsZSB3ZSBhcmUgY3JlYXRpbmcgYmFzZWQgb24gdGhlIHNhdmVNaW1lVHlwZSB2YXJcbiAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKTtcbiAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgIGRhdGEgPSBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCkudHJlZTtcbiAgfSBlbHNlIHsgLy8gYmFkbmVzc1xuICAgIGFsZXJ0KFwiVW5rbm93biBNSU1FX1RZUEU6IFwiK3NhdmVNaW1lVHlwZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2V0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgX3NldFNhdmVNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IFNhdmluZyBGaWxlLi4uJywnaW5mbycpO1xuXG4gIC8vIHNhdmUgdGhlIGZpbGVcbiAgc2F2ZUZpbGUobmFtZSxcbiAgICAgICQoXCIjc2F2ZS1kZXNjcmlwdGlvbi1pbnB1dFwiKS52YWwoKSxcbiAgICAgIHNhdmVNaW1lVHlwZSxcbiAgICAgIGRhdGEsXG4gICAgICBmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgaGFwcGVuZWRcbiAgICAgICAgaWYoIHJlc3AuZXJyb3IgKSByZXR1cm4gX3NldFNhdmVNZXNzYWdlKCdGYWlsZWQgdG8gc2F2ZSB0byBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1N1Y2Vzc2Z1bGx5IHNhdmVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayB0byBoaWRlIHRoZSBwb3B1cCwgc28gdXNlciBzZWVzIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIH0sMTUwMCk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXcgZmlsZSwgdXBkYXRlIG91ciBsaXN0XG4gICAgICAgICAgX3VwZGF0ZUZpbGVMaXN0KCk7XG5cbiAgICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5zXG4gICAgICAgICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK3Jlc3AuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgICAgICBsb2FkZWRGaWxlID0gcmVzcC5pZDtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXcgdHJlZSwgdXBkYXRlIHRoZSBsaXN0XG4gICAgICAgICAgX3VwZGF0ZVRyZWVMaXN0KCk7XG5cbiAgICAgICAgICAvLyBzaG93IHRoZSB0cmVlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChuYW1lKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlc1xuICAgICAgICAgIGxvYWRlZFRyZWUgPSByZXNwLmlkO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgY3VycmVudGx5IGxvYWRlZCBnb29nbGUgZHJpdmUgZmlsZVxuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVDdXJyZW50RmlsZSgpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXBkYXRlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gVXBkYXRpbmcuLi4nLCdpbmZvJyk7XG5cbiAgdmFyIGZpbGUgPSB7fTtcbiAgdmFyIGRhdGEgPSB7fTtcblxuICAvLyBncmFiIHRoZSBjb3JyZW50IGRhdGEgYW5kIGZpbGVpZCBiYXNlZCBvbiBtaW1lVHlwZVxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkRmlsZTtcbiAgICBkYXRhID0gYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZmlsZSA9IGxvYWRlZFRyZWU7XG4gICAgZGF0YSA9IGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIGdvb2dsZSBkcml2ZSBmaWxlXG4gIHVwZGF0ZUZpbGUoZmlsZSxcbiAgICAgIGRhdGEsXG4gICAgICBmdW5jdGlvbihyZXNwKXtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byB1cGRhdGUgb24gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgIGVsc2UgX3NldFNhdmVNZXNzYWdlKCdVcGRhdGUgU3VjY2Vzc2Z1bC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdGhlIHVzZXIga25vd3MgdXBkYXRlIHdhcyBzdWNjZXNzXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGxpc3QgZm9yIHdoYXRldmVyIHR5cGUgd2FzIHVwZGF0ZWRcbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICApO1xufVxuXG4vKioqXG4gKiBzZXQgYSBtZXNzYWdlIGZvciB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXAuXG4gKiAgdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0TG9hZE1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtZmlsZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnc2F2ZSB0byBkcml2ZScgcG9wdXBcbiAqIHR5cGUgLSBib29zdHJhcCBhbGVydCB0eXBlXG4gKioqL1xuZnVuY3Rpb24gX3NldFNhdmVNZXNzYWdlKG1zZywgdHlwZSkge1xuICBpZiggIW1zZyApIHJldHVybiAkKFwiI2dkcml2ZS1zYXZlLW1zZ1wiKS5odG1sKFwiXCIpO1xuICAkKCcjZ2RyaXZlLXNhdmUtbXNnJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LScrdHlwZSsnXCI+Jyttc2crJzwvZGl2PicpO1xufVxuXG4vKioqXG4gKiBjcmVhdGUgdGhlIHRvcCByaWdodCBtZW51LiBUaGlzIG1lbnUgaXMgZm9yIHdoZW4gdGhlIHVzZXIgaXMgbm90IGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dpbkJ0bigpIHtcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+TG9naW48YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nXG4gICAgICArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImxvZ2luLXdpdGgtZ29vZ2xlXCI+PGkgY2xhc3M9XCJpY29uLXNpZ25pblwiPjwvaT4gTG9naW4gd2l0aCBHb29nbGU8L2E+PC9saT4nXG4gICAgICArICc8L3VsPjwvbGk+Jyk7XG5cbiAgLy8gc2V0IGNsaWNrIGhhbmRsZXJzIGZvciBwb3B1cFxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gYWJvdXQgY2xpY2sgaGFuZGxlclxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBsb2dpbiBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjbG9naW4td2l0aC1nb29nbGUnKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VzZXItbG9naW4nLCAxKTtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaWduSW4oZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgIF9zZXRVc2VySW5mbygpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBhZGQgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuLyoqKlxuICogQ3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudSBmb3Igd2hlbiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAqKiovXG5mdW5jdGlvbiBfY3JlYXRlTG9nb3V0QnRuKHVzZXJkYXRhKSB7XG4gIC8vIHNldCBidG4gaHRtbFxuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJvdW5kZWRcIiBzcmM9XCInK3VzZXJkYXRhLnBpY3R1cmVcbiAgICAgICsgJ1wiIHN0eWxlPVwibWFyZ2luOi01cHggNXB4IC01cHggMDt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O2JvcmRlcjoxcHggc29saWQgd2hpdGVcIiAvPiAnICsgdXNlcmRhdGEubmFtZVxuICAgICAgKyAnPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+JyArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwic2F2ZVwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC11cGxvYWRcIj48L2k+IFNhdmUgTW9kZWw8L2E+PC9saT4nXG4gICAgICArICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cInNoYXJlLWJ0blwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgTW9kZWw8L2E+PC9saT4nXG4gICAgICArICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cIm9wZW4taW4tZHJpdmVcIiB0YXJnZXQ9XCJfYmxhbmtcIj48aSBjbGFzcz1cImljb24tZXh0ZXJuYWwtbGluay1zaWduXCI+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgTW9kZWw8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9nb3V0XCI+PGkgY2xhc3M9XCJpY29uLXNpZ25vdXRcIj48L2k+IExvZ291dDwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciB0byBzaG93IG1lbnVcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIHNob3cgdGhlIHNhdmUgcG9wdXBcbiAgYnRuLmZpbmQoJyNzYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gc2V0IHRoZSBjdXJyZW50IHNhdmUgbWltZVR5cGVcbiAgICBzYXZlTWltZVR5cGUgPSBNSU1FX1RZUEU7XG5cbiAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHR5cCB0aGV5IGFyZSBzYXZpbmdcbiAgICAkKFwiI2dkcml2ZS1zYXZlLXN1YmhlYWRlclwiKS5odG1sKFwiPGg1PlNhdmUgTW9kZWw8L2g1PlwiKTtcblxuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgLy8gaWYgdGhlIGZpbGUgaXMgbG9hZGVkLCBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICBpZiggbG9hZGVkRmlsZSAhPSBudWxsKSB7XG4gICAgICAvLyBncmFiIHRoZSBjdXJyZW50IGZpbGVzIG1ldGFkYXRhXG4gICAgICB2YXIgZmlsZSA9IHt9O1xuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYoIGZpbGVMaXN0W2ldLmlkID09IGxvYWRlZEZpbGUpIHtcbiAgICAgICAgICBmaWxlID0gZmlsZUxpc3RbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgICAgLy8gcmVuZGVyIHRoZSBmaWxlcyBtZXRhZGF0YSBpbiB0aGUgdXBkYXRlIHBhbmVsXG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKGZpbGUubW9kaWZpZWREYXRlKTtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK2ZpbGUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPlwiK2ZpbGUuZGVzY3JpcHRpb24rXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7Jz5MYXN0IE1vZGlmaWVkOiBcIiArXG4gICAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2ZpbGUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC9cIitmaWxlLmlkK1wiJycgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT4gXCIgK1xuICAgICAgICAgIFwiTGluayB0byBTaGFyZTwvYT4gPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPihtdXN0IGhhdmUgcGVybWlzc2lvbik8L3NwYW4+PGJyIC8+PGJyIC8+XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBjbGVhciBhbnkgbWVzc2FnZVxuICAgIF9zZXRTYXZlTWVzc2FnZShudWxsKTtcblxuICAgIC8vIHNob3cgdGhlIHNhdmUgcG9wdXBcbiAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gY2xpY2sgaGFuZGxlciBmb3Igc2hhcmUgYnRuXG4gIGJ0bi5maW5kKFwiI3NoYXJlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ29wZW4tZHJpdmUtc2hhcmUnLCAxKTtcblxuICAgIC8vIGhhcyB0aGUgc2hhcmUgY2xpZW50IGJlZW4gbG9hZGVkXG4gICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgLy8gbG9hZCB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGdhcGkubG9hZCgnZHJpdmUtc2hhcmUnLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBjcmVhdGUgYW5kIHNob3cgdGhlIHNoYXJlIHBvcHVwXG4gICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNob3cgdGhlIHNoYXJlIHBvcHVwXG4gICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNob3cgYWJvdXQgcGFuZWxcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcGFuZWxcbiAgYnRuLmZpbmQoJyNsb2FkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBoaWRlIGFueSBleGlzdGluZyBtZXNzYWdlXG4gICAgX3NldExvYWRNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gcmVuZGVyIHRoZSBtb2RlbCBmaWxlcyBpbiB0aGUgcG9wdXAgZmlsZXNcbiAgICBfc2hvd0RyaXZlRmlsZXMoKTtcblxuICAgIC8vIHNob3cgdGhlIG1vZGFsXG4gICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIC8vIGxvYWQgdGhlIHVzZXIgb3V0XG4gIGJ0bi5maW5kKCcjbG9nb3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dvdXQnLCAxKTtcblxuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgLy8ga2lsbCB0aGUgYWNjZXNzIHRva2VuXG4gICAgdG9rZW4gPSBudWxsO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBtZW51IHBhbmVsXG4gICAgX2NyZWF0ZUxvZ2luQnRuKCk7XG4gIH0pO1xuXG4gIC8vIGF0dGFjaCB0aGUgbWVudVxuICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xufTtcblxuLyoqKlxuICogIFJlcXVlc3QgdGhlIHVzZXIncyBpbmZvcm1hdGlvbi4gIFdoZW4gbG9hZGVkLCB1cGRhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gKioqL1xuZnVuY3Rpb24gX3NldFVzZXJJbmZvKCkge1xuICAvLyBsb2FkIHVzZXIgbmFtZVxuICAkLmFqYXgoe1xuICAgIHVybCA6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL3VzZXJpbmZvXCIsXG4gICAgYmVmb3JlU2VuZCA6IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgIC8vIGFsd2F5cyBzZXQgeW91ciBhY2Nlc3Mgc3Rva2VuXG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgIH0sXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cyx4aHIpIHtcbiAgICAgIC8vIHBhcnNlIHlvdXIganNvbiByZXNwb25zZVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAvLyB1cGRhdGUgdG9wIHJpZ2h0IG1lbnVcbiAgICAgIF9jcmVhdGVMb2dvdXRCdG4oZGF0YSk7XG5cbiAgICAgIC8vIHNldCB0byB3aW5kb3cgc2NvcGVcbiAgICAgIHdpbmRvdy51c2VyaW5mbyA9IGRhdGE7XG4gICAgfSxcbiAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gVE9ETzogc2hvdWxkIHdlIGFsZXJ0IHRoaXM/XG4gICAgfVxuICB9KTtcblxuICAvLyBsb2FkIHVzZXIgZmlsZXMsIHRyZWVzXG4gIF91cGRhdGVGaWxlTGlzdCgpO1xuICBfdXBkYXRlVHJlZUxpc3QoKTtcbn1cblxuLyoqKlxuICogIFNlYXJjaCBmb3IgdGhlIHVzZXJzIG1vZGVsc1xuICpcbiAqIFRPRE86IGFkZCBzZWFyY2ggdG8gdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMsXG4gKiAgbGltaXQgdG8gMTAgcmVzdWx0c1xuICoqKi9cbmZ1bmN0aW9uIF91cGRhdGVGaWxlTGlzdCgpIHtcbiAgbGlzdEZpbGVzKFwibWltZVR5cGUgPSAnXCIrTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICBmaWxlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFNlYXJjaCBmb3IgdGhlIHVzZXJzIHRyZWVzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZVRyZWVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitUUkVFX01JTUVfVFlQRStcIidcIiwgZnVuY3Rpb24ocmVzcCl7XG4gICAgdHJlZUxpc3QgPSByZXNwLnJlc3VsdC5pdGVtcztcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgbW9kZWxzIG9udG8gdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gX3Nob3dEcml2ZUZpbGVzKCkge1xuICAvLyBpZiB0aGV5IGhhdmUgbm8gZmlsZXMsIHNheSBzbyBhbmQgZ2V0IG91dCBvZiBoZXJlXG4gIGlmKCAhZmlsZUxpc3QgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcbiAgaWYoIGZpbGVMaXN0Lmxlbmd0aCA9PSAwICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGxpPk5vIEZpbGVzPC9saT5cIik7XG5cbiAgLy8gc2hvdyBhIHRpdGxlLCB0aGVyZSBhcmUgbXVsdGlwbGUgdHlwZXMgdGhhdCBjYW4gYmUgbG9hZGVkIGZyb20gZHJpdmVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8aDQ+U2VsZWN0IEZpbGU8L2g0PlwiKTtcblxuICAvLyBjcmVhdGUgdGhlIGxpc3QgZWxlbWVudHMgZm9yIGVhY2ggZmlsZXMgbWV0YWRhdGFcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IGZpbGVMaXN0W2ldO1xuICAgIHZhciBkID0gbmV3IERhdGUoaXRlbS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoXG4gICAgICAkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxhIGlkPSdcIitpdGVtLmlkK1wiJyB1cmw9J1wiK2l0ZW0uZG93bmxvYWRVcmwrXCInIHN0eWxlPSdjdXJzb3I6cG9pbnRlcic+PGkgY2xhc3M9J2ljb24tZmlsZSc+PC9pPiBcIitpdGVtLnRpdGxlK1wiPC9hPlwiICtcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdjb2xvcjojODg4O3BhZGRpbmc6IDVweCAwIDAgMTBweCc+XCIraXRlbS5kZXNjcmlwdGlvbitcIjwvZGl2PlwiK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4O3BhZGRpbmctbGVmdDoxMHB4Jz5MYXN0IE1vZGlmaWVkOiBcIitkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIraXRlbS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8ZGl2PjwvbGk+XCJcbiAgICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgZWFjaCBmaWxlXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdCBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC1kcml2ZS1tb2RlbCcsIDEpO1xuXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG5cbiAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgIF9zZXRMb2FkTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBMb2FkaW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgICAvLyBncmFiIHRoZSBmaXZlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB0aGUgdXNlciBrbm93XG4gICAgICBpZiggIWZpbGUgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgaWYoIGZpbGUuZXJyb3IgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuXG4gICAgICAvLyBoaWRlIGFueSBsb2FkZWQgdHJlZXMsXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLmhpZGUoKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKFwiXCIpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgIGxvYWRlZFRyZWUgPSBudWxsO1xuXG4gICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3ZSBhcmUgYWxsIGdvb2RcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnRmlsZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIGlkXG4gICAgICBsb2FkZWRGaWxlID0gaWQ7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgbmFtZVxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYoIGlkID09IGZpbGVMaXN0W2ldLmlkICkge1xuICAgICAgICAgICQoXCIjbG9hZGVkLW1vZGVsLXRpdGxlXCIpLmh0bWwoXCI8c3BhbiBzdHlsZT0nY29sb3I6IzMzMyc+TG9hZGVkIE1vZGVsIDwvc3Bhbj4gXCIrZmlsZUxpc3RbaV0udGl0bGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIraWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gc2V0dXAgbW9kZWxcbiAgICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFNldHVwKGlkLCBmaWxlKTtcblxuICAgICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgICBnZHJpdmVSVC5pbml0UnRBcGkobG9hZGVkRmlsZSk7XG5cbiAgICAgIC8vIHdhaXQgYSB0aWNrIHNvIHVzZXIgY2FuIHNlZSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gaGlkZSB0aGUgbW9kYWxcbiAgICAgICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9LDE1MDApO1xuXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgUmVuZGVyIHRoZSB1c2VycyBjdXJyZW50IHRyZWVzIG9udG8gdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gX3Nob3dUcmVlRmlsZXMoKSB7XG4gIC8vIHVwZGF0ZSB0aGUgbGlzdCBoZWFkZXIsIGxldCB1c2VyIGtub3cgd2hhdCB0aGV5IGFyZSBzZWxlY3RpbmdcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCJcIik7XG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48aDU+U2VsZWN0IFRyZWU8L2g1PjwvbGk+XCIpKTtcblxuICAvLyBpZiB0aGVyZSBhcmUgbm8gdHJlZXMsIHNheSBzbyBhbmQgZ2V0IG91dCBvZiBoZXJlXG4gIGlmKCAhdHJlZUxpc3QgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcbiAgaWYoIHRyZWVMaXN0Lmxlbmd0aCA9PSAwICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz5ObyBUcmVlcyBBdmFpbGFibGU8L2xpPlwiKSk7XG5cbiAgLy8gY3JlYXRlIHRoZSB0cmVlIGxpc3QgZWxlbWVudHNcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0cmVlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IHRyZWVMaXN0W2ldO1xuICAgIHZhciBkID0gbmV3IERhdGUoaXRlbS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoXG4gICAgICAkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxhIGlkPSdcIitpdGVtLmlkK1wiJyBuYW1lPSdcIitpdGVtLnRpdGxlK1wiJyB1cmw9J1wiK2l0ZW0uZG93bmxvYWRVcmwrXCInIHN0eWxlPSdjdXJzb3I6cG9pbnRlcic+PGkgY2xhc3M9J2ljb24tbGVhZic+PC9pPiBcIitpdGVtLnRpdGxlK1wiPC9hPlwiICtcbiAgICAgICAgXCI8ZGl2IHN0eWxlPSdjb2xvcjojODg4O3BhZGRpbmc6IDVweCAwIDAgMTBweCc+XCIraXRlbS5kZXNjcmlwdGlvbitcIjwvZGl2PlwiK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4O3BhZGRpbmctbGVmdDoxMHB4Jz5MYXN0IE1vZGlmaWVkOiBcIitkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIraXRlbS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8ZGl2PjwvbGk+XCJcbiAgICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgdGl0bGVzXG4gICQoXCIjZ2RyaXZlLWZpbGUtbGlzdCBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC1kcml2ZS10cmVlJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cihcIm5hbWVcIik7XG5cbiAgICAvLyB0ZWxsIHRoZSB1c2VyIHdlIGFyZSBsb2FkaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgVHJlZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGxvYWQgZmlsZSBmcm9tIGRyaXZlXG4gICAgZ2V0RmlsZShpZCwgJCh0aGlzKS5hdHRyKFwidXJsXCIpLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAvLyBpZiBiYWRuZXNzLCBsZXQgdXNlciBrbm93XG4gICAgICBpZiggIWZpbGUgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgdHJlZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgaWYoIGZpbGUuZXJyb3IgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgdHJlZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuXG4gICAgICAvLyBzaG93IHRoZSB0cmVlIHNoYXJpbmcgYnRuc1xuICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChuYW1lKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBzdWNjZXNmdWxsXG4gICAgICBfc2V0TG9hZE1lc3NhZ2UoJ1RyZWUgTG9hZGVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZSBpZFxuICAgICAgbG9hZGVkVHJlZSA9IGlkO1xuXG4gICAgICAvLyBsb2FkZWQgdHJlZSBpbnRvIG1vZGVsIC8gVUlcbiAgICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAgIC8vIHdhaXQgYSBzZWMgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBsb2FkIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93TG9hZFRyZWVQYW5lbCgpIHtcbiAgLy8gcmVuZGVyIHRoZSB0cmVlcyBpbnRvIHRoZSBwb3B1cCBsaXN0XG4gIF9zaG93VHJlZUZpbGVzKCk7XG4gIC8vIGNsZWFyIGFueSBtZXNzYWdlc1xuICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiAgc2hvdyB0aGUgdXNlciB0aGUgc2F2ZSB0cmVlIHBvcHVwXG4gKioqL1xuZnVuY3Rpb24gc2hvd1NhdmVUcmVlUGFuZWwoKSB7XG4gIC8vIHNldCB0aGUgY3VycmVudCBtaW1lVHlwZSB3ZSBhcmUgc2F2aW5nXG4gIHNhdmVNaW1lVHlwZSA9IFRSRUVfTUlNRV9UWVBFO1xuXG4gIC8vIHNldCB0aGUgaGVhZGVyIHNvIHVzZXIga25vd3Mgd2hhdCB0eXBlIHRoZXkgYXJlIHNhdmluZ1xuICAkKFwiI2dkcml2ZS1zYXZlLXN1YmhlYWRlclwiKS5odG1sKFwiPGg1PlNhdmUgVHJlZTwvaDU+XCIpO1xuXG4gIC8vIGlmIHRoZXJlIGlzIGEgY3VycmVudCB0cmVlLCBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgaWYoIGxvYWRlZFRyZWUgIT0gbnVsbCkge1xuICAgIC8vIGZpbmQgdGhlIGN1cnJlbnQgdHJlZSBiYXNlZCBvbiBpZFxuICAgIHZhciB0cmVlID0ge307XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0cmVlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0cmVlTGlzdFtpXS5pZCA9PSBsb2FkZWRUcmVlKSB7XG4gICAgICAgIHRyZWUgPSB0cmVlTGlzdFtpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2hvdyB0aGUgdXBkYXRlIHBhbmVsXG4gICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5zaG93KCk7XG5cbiAgICAvLyByZW5kZXIgdHJlZSBtZXRhZGF0YSBvbiB1cGRhdGUgcGFuZWxcbiAgICB2YXIgZCA9IG5ldyBEYXRlKHRyZWUubW9kaWZpZWREYXRlKTtcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsLWlubmVyXCIpLmh0bWwoXCI8Yj5cIit0cmVlLnRpdGxlK1wiPC9iPjxiciAvPlwiICtcbiAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrdHJlZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgXCI8c3BhbiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7Jz5MYXN0IE1vZGlmaWVkOiBcIiArXG4gICAgICAgIGQudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIit0cmVlLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK3RyZWUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIik7XG4gIH0gZWxzZSB7XG4gICAgLy8gZG9uJ3Qgc2hvdyB0aGUgdXBkYXRlIHBhbmVsLCB0aGlzIGlzIGEgbmV3IHRyZWVcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLmhpZGUoKTtcbiAgfVxuXG4gIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gIF9zZXRTYXZlTWVzc2FnZShudWxsKTtcblxuICAvLyBzaG93IHRoZSBwb3B1cFxuICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbn1cblxuLyoqKlxuICogTG9hZCBhIG1vZGVsIGJhc2VkIG9uIHBhc3NlZCBpZC4gIFRoaXMgZnVuY3Rpb24gaXMgcmVhbGx5IG9ubHkgZm9yIGxvYWRpbmcgbW9kZWwgb24gc3RhcnQsIHdoZW4gYSBmaWxlIGlkXG4gKiBoYXMgYmVlbiBwYXNzZWQgaW4gdGhlIHVybCBlaXRoZXIgZnJvbSBnb29nbGUgZHJpdmUgb3IgZnJvbSB0aGUgP2ZpbGU9aWQgdXJsLlxuICoqKi9cbnZhciBsb2dpbk1vZGFsSW5pdCA9IGZhbHNlO1xuZnVuY3Rpb24gbG9hZChpZCwgbG9hZEZuKSB7XG4gIC8vIGlmIHdlIGRvbid0IGhhdmUgYW4gYWNjZXNzIHRva2VuLCB3ZSBuZWVkIHRvIHNpZ24gaW4gZmlyc3RcbiAgLy8gVE9ETzogaWYgdGhpcyBpcyBhIHB1YmxpYyBmaWxlLCB0aGVyZSBpcyBubyByZWFzb24gdG8gc2lnbiBpbi4uLiBzb2x1dGlvbj9cbiAgaWYoICF0b2tlbiApIHtcblxuICAgIGlmKCAhbG9naW5Nb2RhbEluaXQgKSB7XG4gICAgICAkKCcjZ29vZ2xlLW1vZGFsLWxvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gc2lnbiB0aGUgdXNlciBpbiAoZm9yY2Ugb2F1dGggcG9wdXApXG4gICAgICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24gaW4gdG9wIGxlZnRcbiAgICAgICAgICBfc2V0VXNlckluZm8oKTtcblxuICAgICAgICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgICAgICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgpO1xuICAgICAgbG9naW5Nb2RhbEluaXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKioqXG4gKiBJbml0aWFsaXplIFVJIC8gbW9kZWwgd2hlbiBhIGZpbGUgaXMgbG9hZGVkIGF0IHN0YXJ0XG4gKioqL1xuZnVuY3Rpb24gX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsIGZpbGUpIHtcbiAgLy8gYmFkZG5lc3MsIGxldCB0aGUgdXNlciBrbm93XG4gIGlmKCAhZmlsZSApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiRmFpbGVkIHRvIGxvYWQgZnJvbSBHb29nbGUgRHJpdmUgOi9cIik7XG4gIH1cblxuICAvLyBtZXRhZGF0YSBmYWlsZWQgdG8gbG9hZCwgbW9yZSBiYWRuZXNzXG4gIGlmKCBtZXRhZGF0YS5jb2RlID09IDQwNCApIHtcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgcmV0dXJuIGFsZXJ0KFwiR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5tZXNzYWdlKTtcbiAgfVxuXG4gIC8vIHdlIGxvYWRlZCBhIG1vZGVsLCBzZXR1cCBhbmQgcnVuXG4gIGlmKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgLy8gc2V0IHRoZSBjdXJyZW50bHkgbG9hZGVkIGZpbGUgaWRcbiAgICBsb2FkZWRGaWxlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrbWV0YWRhdGEuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgIC8vIHNob3cgdGl0bGVcbiAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK21ldGFkYXRhLnRpdGxlKTtcblxuICAgIC8vIHNldHVwIG1vZGVsXG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAobWV0YWRhdGEuaWQsIGZpbGUpO1xuXG4gICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuICB9IGVsc2UgaWYgKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHsgLy8gd2UgbG9hZGVkIGEgdHJlZVxuICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICBsb2FkZWRUcmVlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChtZXRhZGF0YS50aXRsZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZVxuICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAvLyBoaWRlIHRoZSBsb2FkaW5nIHBvcHVwXG4gICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiTG9hZGVkIHVua25vd24gZmlsZSB0eXBlIGZyb20gR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5taW1lVHlwZSk7XG4gIH1cbn1cblxuLyoqKlxuICogdG9rZW5zIGV4cGlyZSwgZXZlcnkgb25jZSBpbiBhd2hpbGUgY2hlY2sgdGhlIGN1cnJlbnQgdG9rZW4gaGFzbid0XG4gKiBpZiBpdCBoYXMsIHRoZW4gdXBkYXRlXG4gKioqL1xuZnVuY3Rpb24gX2NoZWNrVG9rZW4oKSB7XG4gIC8vIGlnbm9yZSBpZiB0aGVyZSBpcyBubyB0b2tlblxuICBpZiAoIXRva2VuKSByZXR1cm47XG5cbiAgLy8gb3RoZXJ3aXNlLCBsb29rIHRvIHVwZGF0ZSB0aGUgYWNjZXNzIHRva2VuXG4gIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpIHtcbiAgICBpZiggdCAhPSBudWxsICkgdG9rZW4gPSB0O1xuICB9KTtcbn07XG5cbi8qKipcbiAqIGlzIHRoZSBjdXJyZW50IHVzZXIgc2lnbmVkIGluP1xuICoqKi9cbmZ1bmN0aW9uIGNoZWNrU2lnbmVkSW4oY2FsbGJhY2spIHtcbiAgLy8gaWYgaXNBdXRoZXJpemVkIHJldHVybnMgYSB0b2tlbiwgdXNlciBpcyBsb2dnZWQgaW5cbiAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHRva2VuKXtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkgY2FsbGJhY2sodHJ1ZSk7XG4gICAgZWxzZSBjYWxsYmFjayhmYWxzZSk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogU2lnbiBhIHVzZXIgaW4gdXNpbmcgdGhlIE9hdXRoIGNsYXNzXG4gKioqL1xuZnVuY3Rpb24gc2lnbkluKGNhbGxiYWNrKSB7XG4gIE9hdXRoLmF1dGhvcml6ZShmdW5jdGlvbih0KXtcbiAgICB0b2tlbiA9IHQ7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgIGlmKCB0LmVycm9yICkgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuICB9KVxufTtcblxuLyoqKlxuICogQWNjZXNzIG1ldGhvZCBmb3IgdG9rZW5cbiAqKiovXG5mdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgcmV0dXJuIHRva2VuO1xufTtcblxuLyoqKlxuICogTG9hZCB0aGUgZ29vZ2xlIGRyaXZlIGFwaSBjb2RlXG4gKioqL1xuZnVuY3Rpb24gX2xvYWRBcGkoY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQubG9hZChcImRyaXZlXCIsIERSSVZFX0FQSV9WRVJTSU9OLCBmdW5jdGlvbigpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIGxpc3Qgb2YgZmlsZSBtZXRhZGF0YSBmcm9tIGdvb2dsZSBkcml2ZSBiYXNlZCBvbiBxdWVyeVxuICoqKi9cbmZ1bmN0aW9uIGxpc3RGaWxlcyhxdWVyeSwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMubGlzdCh7XG4gICAgcSA6IHF1ZXJ5ICsgXCIgYW5kIHRyYXNoZWQgPSBmYWxzZVwiXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIEdldCBhIHNpbmdsZSBmaWxlcyBtZXRhZGF0YSBiYXNlZCBvbiBpZFxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGVNZXRhZGF0YShpZCwgY2FsbGJhY2spIHtcbiAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMuZ2V0KHtcbiAgICAnZmlsZUlkJyA6IGlkXG4gIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGNhbGxiYWNrKHJlc3ApO1xuICB9KTtcbn07XG5cbi8qKipcbiAqICBBY3R1YWxseSBsb2FkIGEgZmlsZXMgZGF0YS4gIFRoZSB1cmwgdG8gZG8gdGhpcyBpcyBwcm92aWRlZCBpbiBhIGZpbGVzIG1ldGFkYXRhLlxuICoqKi9cbmZ1bmN0aW9uIGdldEZpbGUoaWQsIGRvd25sb2FkVXJsLCBjYWxsYmFjaykge1xuICAkLmFqYXgoe1xuICAgIHVybCA6IGRvd25sb2FkVXJsLFxuICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAvLyBzZXQgYWNjZXNzIHRva2VuIGluIGhlYWRlclxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCAnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgIC8vIHBhcnNlIHRoZSByZXNwb25zZSAod2Ugb25seSBzdG9yZSBqc29uIGluIHRoZSBnb29nbGUgZHJpdmUpXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGNhbGxiYWNrKGRhdGEsIGlkKTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZVwiXG4gICAgICB9KTtcblxuICAgIH1cbiAgfSk7XG59O1xuXG4vKioqXG4gKiBTYXZlIGpzb24gdG8gZ29vZ2xlIGRyaXZlXG4gKioqL1xuZnVuY3Rpb24gc2F2ZUZpbGUobmFtZSwgZGVzY3JpcHRpb24sIG1pbWVUeXBlLCBqc29uLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICBpZiggIW9wdGlvbnMgKSBvcHRpb25zID0ge31cblxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gIHZhciBtZXRhZGF0YSA9IHtcbiAgICAndGl0bGUnIDogbmFtZSxcbiAgICAnZGVzY3JpcHRpb24nIDogZGVzY3JpcHRpb24sXG4gICAgJ21pbWVUeXBlJyA6IG1pbWVUeXBlXG4gIH07XG5cbiAgLy8gaWYgd2Ugd2FudCB0byBzYXZlIHRoZSBmaWxlIHRvIGEgc3BlY2lmaWVkIGZvbGRlclxuICBpZiggb3B0aW9ucy5wYXJlbnQgKSB7XG4gICAgbWV0YWRhdGEucGFyZW50cyA9IFt7aWQ6IG9wdGlvbnMucGFyZW50fV07XG4gIH1cblxuICAvLyBpZiB0aGUganNvbiBpcyByZWFsbHkgYW4gb2JqZWN0LCB0dXJuIGl0IHRvIGEgc3RyaW5nXG4gIGlmICh0eXBlb2YganNvbiA9PSAnb2JqZWN0JykganNvbiA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gIC8vIGRhdGEgbmVlZHMgdG8gYmUgYmFzZTY0IGVuY29kZWQgZm9yIHRoZSBQT1NUXG4gIHZhciBiYXNlNjREYXRhID0gYnRvYShqc29uKTtcblxuICAvLyBjcmVhdGUgb3VyIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID0gZGVsaW1pdGVyXG4gICAgICArICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nXG4gICAgICArIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKTtcblxuICBpZigganNvbi5sZW5ndGggPiAwICkge1xuICAgIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGRlbGltaXRlciArICdDb250ZW50LVR5cGU6ICdcbiAgICAgICsgbWltZVR5cGUgKyAnXFxyXFxuJyArICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nXG4gICAgICArICdcXHJcXG4nICsgYmFzZTY0RGF0YTtcbiAgfVxuICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBjbG9zZV9kZWxpbTtcblxuICAgICAvLyBzZXR1cCBQT1NUIHJlcXVlc3RcbiAgICAgLy8gaWYgdGhlIG9wdGlvbnMuY29udmVyPXRydWUgZmxhZyBpcyBzZXQsIGdvb2dsZSBhdHRlbXB0cyB0byBjb252ZXJ0IHRoZSBmaWxlIHRvXG4gICAgIC8vIGEgZ29vZ2xlIGRvYyBmaWxlLiAgTW9zdGx5LCB3ZSB1c2UgdGhpcyBmb3IgZXhwb3J0aW5nIGNzdiAtPiBHb29nbGUgU3ByZWFkc2hlZXRzXG4gIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgJ3BhdGgnIDogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMnICsgKCBvcHRpb25zLmNvbnZlcnQgPyAnP2NvbnZlcnQ9dHJ1ZScgOiAnJyksXG4gICAgJ21ldGhvZCcgOiAnUE9TVCcsXG4gICAgJ3BhcmFtcycgOiB7XG4gICAgICAndXBsb2FkVHlwZScgOiAnbXVsdGlwYXJ0J1xuICAgIH0sXG4gICAgJ2hlYWRlcnMnIDoge1xuICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICB9LFxuICAgICdib2R5JyA6IG11bHRpcGFydFJlcXVlc3RCb2R5XG4gIH0pO1xuXG4gIC8vIHNlbmQgdGhlIHJlcXVlc3RcbiAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICBpZiAocmVzcC5pZClcbiAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgIGVsc2VcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gc2F2ZVwiXG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBVcGRhdGUgYSBmaWxlIGJhc2VkIG9uIGlkIGFuZCBnaXZlbiBqc29uIGRhdGFcbiAqKiovXG5mdW5jdGlvbiB1cGRhdGVGaWxlKGZpbGVJZCwganNvbiwgY2FsbGJhY2spIHtcbiAgLy8gc3RhcnQgY3JlYXRpbmcgdGhlIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICB2YXIgbWV0YWRhdGEgPSB7fTtcblxuICAvLyBzdHJpbmlmeSB0aGVuIGJhc2U2NCBlbmNvZGUgdGhlbiBvYmplY3RcbiAgICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoSlNPTi5zdHJpbmdpZnkoanNvbikpO1xuXG4gICAgLy8gc2V0IHVwIHRoZSBQT1NUIGJvZHlcbiAgICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPVxuICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxcclxcblxcclxcbicgK1xuICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSkgK1xuICAgICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAnQ29udGVudC1UeXBlOiAnICsgTUlNRV9UWVBFICsgJ1xcclxcbicgK1xuICAgICAgICAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJyArXG4gICAgICAgICdcXHJcXG4nICtcbiAgICAgICAgYmFzZTY0RGF0YSArXG4gICAgICAgIGNsb3NlX2RlbGltO1xuXG4gIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgICAgICdwYXRoJzogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMvJytmaWxlSWQsXG4gICAgICAgICdtZXRob2QnOiAnUFVUJyxcbiAgICAgICAgJ3BhcmFtcyc6IHsndXBsb2FkVHlwZSc6ICdtdWx0aXBhcnQnfSxcbiAgICAgICAgJ2hlYWRlcnMnOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgICAgICB9LFxuICAgICAgICAnYm9keSc6IG11bHRpcGFydFJlcXVlc3RCb2R5fSk7XG5cbiAgICAvLyBzZXQgcmVxdWVzdFxuICAgIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKXtcbiAgICAgIGlmKCByZXNwLmlkICkge1xuICAgICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gdXBkYXRlXCJcbiAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3J1bi1tb2RlbC1yZW1vdGUnLCAxKTtcbiAgZ2RyaXZlUlQucnVuTW9kZWxSdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIGNoZWNrU2lnbmVkSW4gOiBjaGVja1NpZ25lZEluLFxuICBzaWduSW4gOiBzaWduSW4sXG4gIGdldFRva2VuIDogZ2V0VG9rZW4sXG4gIGxpc3RGaWxlcyA6IGxpc3RGaWxlcyxcbiAgZ2V0RmlsZU1ldGFkYXRhIDogZ2V0RmlsZU1ldGFkYXRhLFxuICBsb2FkIDogbG9hZCxcbiAgc2F2ZUZpbGU6IHNhdmVGaWxlLFxuICBzaG93TG9hZFRyZWVQYW5lbCA6IHNob3dMb2FkVHJlZVBhbmVsLFxuICBzaG93U2F2ZVRyZWVQYW5lbCA6IHNob3dTYXZlVHJlZVBhbmVsLFxuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcblxuICBNSU1FX1RZUEUgOiBNSU1FX1RZUEVcbn1cbiIsIi8vIFJFQUxUSU1FIChydCkgT2JqZWN0c1xuLy8gcnQganNvbiBmaWVsZCwgdXNlZCB0byBzZW5kIHVwZGF0ZXMgdG8gcGVlcnNcbnZhciBydEpzb24gPSBudWxsO1xuLy8gcnQgZG9jdW1lbnRcbnZhciBydERvYyA9IG51bGw7XG4vLyBoYXMgdGhlIHJ0IGFwaSBiZWVuIGxvYWRlZD9cbnZhciBfcnRMb2FkZWQgPSBmYWxzZTtcbi8vIHRpbWVyIHRvIGJ1ZmZlciB0aGUgZmlyaW5nIG9mIHVwZGF0ZXMgZnJvbSBydCBldmVudHNcbnZhciBfcnRUaW1lciA9IC0xO1xuXG4vLyBsaXN0IG9mIGN1cnJlbnQgcnQgZWRpdHMgdG8gaW5wdXQgZmlsZXNcbnZhciBydEVkaXRzID0ge307XG4vLyBnb29nbGUgZHJpdmUgcnQgbW9kZWwgLSBtYXBcbnZhciBsaXZlRWRpdHMgPSBudWxsO1xuLy8gbG9jYWwgbG9jayBvbiBhbiBlbGVtZW50XG52YXIgbG9jayA9IHt9O1xuXG52YXIgYXBwO1xuXG4vLyBsb2FkZWQgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGU7XG5cbi8qKipcbiAqIFNldHVwIHRoZSBydCBhcGkgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGlzIHdpbGwgYWN0dWFsbHkgbG9hZCB0aGUgYXBpIGlmIG5lZWRlZFxuICoqKi9cbmZ1bmN0aW9uIGluaXRSdEFwaShmaWxlKSB7XG4gIHJ0SnNvbiA9IG51bGw7IC8vIGtpbGwgb2ZmIGFueSBvbGQgbGlzdG5lcnNcbiAgbG9hZGVkRmlsZSA9IGZpbGU7XG5cbiAgLy8gY2xvc2UgYW55IG9sZCBjb25uZWN0aW9uXG4gIGlmKCBydERvYyApIHJ0RG9jLmNsb3NlKCk7XG5cbiAgLy8gZ2V0IG91dCBvZiBoZXJlIGlmIHdlIGRvbid0IGhhdmUgYSBsb2FkZWQgZmlsZVxuICBpZiggbG9hZGVkRmlsZSA9PSBudWxsICkgcmV0dXJuO1xuXG4gIC8vIGxvYWQgYXBpIGlmIG5lZWRlZFxuICBpZiggIV9ydExvYWRlZCApIHtcbiAgICBnYXBpLmxvYWQoJ2RyaXZlLXJlYWx0aW1lJywgZnVuY3Rpb24oKXtcbiAgICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgICBfcnRMb2FkZWQgPSB0cnVlO1xuICAgICAgX2xvYWRSdEZpbGUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzZXR1cCBydCBob29rc1xuICAgIF9sb2FkUnRGaWxlKCk7XG4gIH1cblxuICAvLyBzZXR1cCBpbnB1dCBoYW5kbGVyc1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2ZvY3VzJyxmdW5jdGlvbihlKXtcbiAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgX3NldExvY2FsTG9jayh7XG4gICAgICBpZCAgICAgICAgOiBlbGUuYXR0cihcImlkXCIpLFxuICAgICAgdmFsdWUgICAgIDogZWxlLnZhbCgpLFxuICAgICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gICAgfSk7XG4gIH0pO1xuICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2JsdXInLGZ1bmN0aW9uKGUpe1xuICAgIF9yZW1vdmVMb2NhbExvY2soJChlLnRhcmdldCkuYXR0cihcImlkXCIpKTtcbiAgfSk7XG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgcmV0dXJuO1xuICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICBfdXBkYXRlTG9jYWxMb2NrKGVsZS5hdHRyKFwiaWRcIiksIGVsZS52YWwoKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfc2V0TG9jYWxMb2NrKGxvY2spIHtcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgbWFyayB0aGUgY3VycmVudCBsb2NrXG4gIGlmKCBsaXZlRWRpdHMuaGFzW2xvY2suaWRdICkgcmV0dXJuO1xuICBsaXZlRWRpdHMuc2V0KGxvY2suaWQsIGxvY2spO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jYWxMb2NrKGlkLCB2YWwpIHtcbiAgdmFyIGxvY2sgPSB7XG4gICAgaWQgOiBpZCxcbiAgICB2YWx1ZSA6IHZhbCxcbiAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gIH1cblxuICBsaXZlRWRpdHMuc2V0KGlkLCBsb2NrKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZUxvY2FsTG9jayhpZCkge1xuICBsaXZlRWRpdHMuZGVsZXRlKGlkKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZVJlbW90ZUxvY2sobG9jaykge1xuICAkKFwiI1wiK2xvY2suaWQpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikucmVtb3ZlKCk7XG4gIGRlbGV0ZSBydEVkaXRzW2xvY2suaWRdO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlTG9jayhsb2NrKSB7XG4gICQoXCIjXCIrbG9jay5pZCkudmFsKGxvY2sudmFsdWUpLmF0dHIoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gIGlmKCAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5sZW5ndGggPT0gMCApIHtcbiAgICAkKFwiI1wiK2xvY2suaWQpLnBhcmVudCgpLmFmdGVyKFwiPHNwYW4gaWQ9J1wiK2xvY2suaWQrXCItZWRpdGluZycgY2xhc3M9J2xhYmVsIGxhYmVsLXdhcm5pbmcnPjwvc3Bhbj5cIik7XG4gIH1cbiAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikuaHRtbChsb2NrLnVzZXIpO1xuICBydEVkaXRzW2xvY2suaWRdID0gbG9jaztcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBsaXN0IG9mIHJlYWx0aW1lIGVkaXRzIGFzIHdlbGwgYXMgdGhlIGlucHV0IFVJIGJhc2VkIG9uIHRoZSBydERvYyBldmVudFxuICogVE9ETzogdGhpcyBpcyBhIGJpdCBuYXN0eSByaWdodCBub3dcbiAqKi9cbmZ1bmN0aW9uIF91cGRhdGVSdEVkaXRzKGUpIHtcbiAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcblxuICB2YXIga2V5cyA9IGxpdmVFZGl0cy5rZXlzKCk7XG5cbiAgLy8gcmVtb3ZlIG9sZCB0aW1lc3RhbXBzIFRPRE9cbiAgLypmb3IoIHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggbm93IC0gdmFsdWVzW2ldLnRpbWVzdGFtcCA+IDEwMDAgKiA2MCApIHtcbiAgICAgIF9yZW1vdmVMb2NrKHZhbHVlc1tpXSk7IC8vIGRvZXMgdGhpcyBmaXJlIHVwZGF0ZXM/XG4gICAgfVxuICB9Ki9cblxuXG4gIC8vIHNldCBuZXcgZWRpdHNcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrICkge1xuICAgIF91cGRhdGVMb2NrKGxpdmVFZGl0cy5nZXQoa2V5c1tpXSkpO1xuICB9XG5cbiAgLy8gcmVtb3ZlIG9sZCBlZGl0c1xuICBmb3IoIHZhciBrZXkgaW4gcnRFZGl0cyApIHtcbiAgICBpZigga2V5cy5pbmRleE9mKGtleSkgPT0gLTEgKSB7XG4gICAgICBfcmVtb3ZlUmVtb3RlTG9jayhydEVkaXRzW2tleV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKioqXG4gKiAgU2V0dXAgdGhlIHJ0IGhvb2tzIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhlIGFwaSBuZWVkcyB0byBhbHJlYWR5IGJlIGxvYWRlZFxuICoqKi9cbmZ1bmN0aW9uIF9sb2FkUnRGaWxlKCkge1xuICAvLyBnZXQgdGhlIHJ0IGRvY1xuICBnYXBpLmRyaXZlLnJlYWx0aW1lLmxvYWQobG9hZGVkRmlsZSxcbiAgICAvLyBydCBkb2MgbG9hZGVkXG4gICAgZnVuY3Rpb24oZmlsZSl7XG4gICAgICBydERvYyA9IGZpbGU7XG5cbiAgICAgIC8vIGdldCBvdXIgcnQgYXR0cmlidXRlLiAgVHJpZ2dlcmluZyBjaGFuZ2VzIG9uIHJ0SnNvbiB3aWxsIHB1c2ggZXZlbnRzXG4gICAgICAvLyB0byBhbGwgbGlzdGVuaW5nIGNsaWVudHNcbiAgICAgIHZhciBqc29uID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGpzb24gYXR0ciwgd2UgbmVlZCB0byBpbml0aWFsaXplIHRoZSBtb2RlbFxuICAgICAgaWYoIGpzb24gPT0gbnVsbCB8fCBsaXZlRWRpdHMgPT0gbnVsbCkge1xuICAgICAgICAvLyBpbml0aWFsaXplIG91ciBydCBtb2RlbFxuICAgICAgICBfb25SdE1vZGVsTG9hZChmaWxlLmdldE1vZGVsKCkpO1xuICAgICAgICAvLyBncmFiIHJ0IGpzb24gYXR0ciBub3cgdGhhdCB3ZSBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgICAganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWQgOihcbiAgICAgIGlmKCAhanNvbiApIHJldHVybiBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBjb25uZWN0IHRvIHJ0IGpzb25cIik7XG4gICAgICAvLyBzZXQgdGhhdCBhdHRyIGdsb2JhbCB0byBjbGFzc1xuICAgICAgcnRKc29uID0ganNvbjtcblxuICAgICAgLy8gZ2V0IGN1cnJlbnQgbGlzdCBvZiB1c2Vyc1xuICAgICAgdmFyIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdoZW4gcGVvcGxlIGNvbWUgYW5kIGdvXG4gICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0pPSU5FRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcbiAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfTEVGVCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHJ0SnNvbiBvYmplY3RcbiAgICAgIC8vIHdoZW4gdGhpcyB1cGRhdGVzLCB3ZSB3YW50IHRvIHJlLXJ1biB0aGUgbW9kZWxcbiAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0lOU0VSVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0RFTEVURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGl2ZSBlZGl0IHVwZGF0ZXNcbiAgICAgICAgICAgICAgbGl2ZUVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVkFMVUVfQ0hBTkdFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgX3VwZGF0ZVJ0RWRpdHMoZSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNob3cgd2hvIGlzIGxpc3RlbmluZ1xuICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuXG4gICAgICAgIC8vIHNldCBpbnB1dCBoYW5kbGVycyBmb3IgcnQgZXZlbnRzXG4gICAgfSxcbiAgICAvLyBtb2RlbCBsb2FkZWRcbiAgICBmdW5jdGlvbihtb2RlbCl7XG4gICAgICBfb25SdE1vZGVsTG9hZChtb2RlbCk7XG4gICAgfSxcbiAgICAvLyBlcnJvcnNcbiAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUlQgRVJST1JTOiBcIik7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbiAgKTtcbn1cblxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGRpc3BsYXkgb2YgYWN0aXZlIHVzZXJzIGZvciB0aGUgbW9kZWwuXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKSB7XG4gIC8vIGlmIGl0J3MganVzdCB1cywgZG9uJ3Qgc2hvdyBhbnl0aGluZ1xuICBpZiggIXVzZXJzICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG4gIGlmKCB1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gIC8vIHdlIG9ubHkgd2FudCB1bmlxdWUgdXNlcnNcbiAgdmFyIHVuaXF1ZSA9IFtdO1xuICB2YXIgdXVzZXJzID0gW107XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHVuaXF1ZS5pbmRleE9mKHVzZXJzW2ldLnVzZXJJZCkgPT0gLTEgKSB7XG4gICAgICB1bmlxdWUucHVzaCh1c2Vyc1tpXS51c2VySWQpO1xuICAgICAgdXVzZXJzLnB1c2godXNlcnNbaV0pO1xuICAgIH1cbiAgfVxuICBpZiggdXVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgLy8gYWRkIHBpYyBvZiB1c2VyIHRvIGRpc3BsYXkgcGFuZWxcbiAgdmFyIGh0bWwgPSBcIkFjdGl2ZSBVc2VycyBcIjtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1dXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIHV1c2Vyc1tpXS5waG90b1VybCApIHtcbiAgICAgIGh0bWwgKz0gXCI8aW1nIHNyYz0nXCIrdXVzZXJzW2ldLnBob3RvVXJsK1wiJyB0aXRsZT0nXCIrdXVzZXJzW2ldLmRpc3BsYXlOYW1lK1wiJyBzdHlsZT0nbWFyZ2luOjAgNXB4O3dpZHRoOjMycHg7aGVpZ2h0OjMycHgnIGNsYXNzPSdpbWctcm91bmRlZCcgLz4gXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGh0bWwgKz0gXCI8c3BhbiBzdHlsZT0nd2lkdGg6MzJweDtoZWlnaHQ6MzJweDttYXJnaW46MCA1cHg7YmFja2dyb3VuZC1jb2xvcjpcIit1dXNlcnNbaV0uY29sb3IrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInID48L3NwYW4+IFwiO1xuICAgIH1cbiAgfVxuICAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKGh0bWwpO1xufVxuXG4vKioqXG4gICAqICBSZS1ydW4gdGhlIG1vZGVsLiAgRXZlbnRzIGNhbiBjb21lIGluIHF1aWNrbHkgaW4gbWFueSBwYXJ0cy4gIEJ1ZmZlciB0aGUgZXZlbnRzIHNvIHdlIGRvbid0IHJlLXJ1biB0aGUgbW9kZWwgdG9vIG1hbnkgdGltZXMuXG4gICAqKiovXG5mdW5jdGlvbiBfcmVydW5SdCh1c2VycywgdXNlcklkKSB7XG4gIC8vIHRoaXMgaXMgYmFkbmVzc1xuICBpZiggIXJ0SnNvbiApIHJldHVybjtcblxuICAvLyBjbGVhciBhbnkgcXVldWVkIHJ1blxuICBpZiggX3J0VGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQoX3J0VGltZXIpO1xuXG4gIC8vIHF1ZXVlIHVwIGEgcnVuIGFuZCB3YWl0IHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gdXBkYXRlc1xuICBfcnRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBfcnRUaW1lciA9IC0xO1xuXG4gICAgLy8gZmluZCB0aGUgdXNlciB3aG8gaXMgcnVubmluZyB0aGUgbW9kZWwgYW5kIGRpcGxheSBwb3B1cCBvZiB0aGF0IHVzZXJzIGluZm9ybWF0aW9uXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB1c2Vyc1tpXS51c2VySWQgPT0gdXNlcklkICkge1xuICAgICAgICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nLW91dGVyJyA+PGRpdiBjbGFzcz0naW5pdC1sb2FkaW5nJyBzdHlsZT0nd2lkdGg6NDAwcHgnPiBcIitcbiAgICAgICAgICAgICAgICAodXNlcnNbaV0ucGhvdG9VcmwgPyBcIjxpbWcgc3JjPSdcIit1c2Vyc1tpXS5waG90b1VybCtcIicgLz4gXCIgOiBcIlwiKSt1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIiBpcyB1cGRhdGluZyB0aGUgbW9kZWwuLi48L2Rpdj48L2Rpdj5cIik7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hcHBlbmQocGFuZWwpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHBhbmVsLmNzcyhcIm9wYWNpdHlcIixcIi45XCIpO1xuICAgICAgICAgICAgfSw1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAzNTAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnNlIHRoZSBuZXcgbW9kZWwgZGF0YSBhbmQgbG9hZCBpdCBhcyBvdXIgY3VycmVudCBzZXR1cFxuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShydEpzb24uZ2V0VGV4dCgpKTtcbiAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRTZXR1cChsb2FkZWRGaWxlLCBkYXRhLCB0cnVlKTtcbiAgfSwgMzAwKTtcbn1cblxuLyoqKlxuICogaW5pdGlhbGl6ZSBhIG5ldyBydCBtb2RlbFxuICoqKi9cbmZ1bmN0aW9uIF9vblJ0TW9kZWxMb2FkKG1vZGVsKSB7XG4gIC8vIGN1cnJlbnRseSB3ZSBqdXN0IHdhbnQgdG8gdXNlIHRoaXMgc2luZ2xlIGF0dHJpYnV0ZSB0byBicm9hZGNhc3QgZXZlbnRzXG4gIHZhciBqc29uID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gIGlmKCBqc29uID09IG51bGwgKSB7XG4gICAgdmFyIHN0cmluZyA9IG1vZGVsLmNyZWF0ZVN0cmluZyhcInt9XCIpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJqc29uXCIsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgbGl2ZUVkaXRzID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgaWYoIGxpdmVFZGl0cyA9PSBudWxsICkge1xuICAgIHZhciBmaWVsZCA9IG1vZGVsLmNyZWF0ZU1hcCgpO1xuICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJsaXZlRWRpdHNcIiwgZmllbGQpO1xuICB9XG5cbn1cblxuLyoqKlxuICogbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nIDopXG4gKiBUaGlzIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBhIGxvY2FsIHVzZXIgcnVucyB0aGUgbW9kZWwuICBJdCB1cGRhdGVzIHRoZSAnanNvbidcbiAqIGF0dHJpYnV0ZSB3aGljaCBpcyB0aGVuIGJyb2FkY2FzdCB0byBhbGwgbGlzdGVuaW5nIHBhcnRpZXNcbiAqKiovXG5mdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICBpZiggcnRKc29uICkgcnRKc29uLnNldFRleHQoSlNPTi5zdHJpbmdpZnkoIGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKSApKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuICBpbml0UnRBcGkgIDogaW5pdFJ0QXBpLFxuICBzZXRBcHAgOiBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgIGFwcCA9IGFwcGxpY2F0aW9uO1xuICB9XG59O1xuIiwidmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcbnZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dkcml2ZScpO1xudmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG52YXIgd2VhdGhlckZpbGVSZWFkZXIgPSByZXF1aXJlKCcuL3dlYXRoZXJGaWxlUmVhZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cbnZhciB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gbnVsbDtcbnZhciB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG52YXIgU0VUVVBfVEVNUExBVEUgPVxuICAnPGRpdj4nK1xuICAnPGg0PkNoYXJ0IE9wdGlvbnM8L2g0PicrXG4gICc8ZGl2PicrXG4gICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGVcIj4nK1xuICAgICAgICAgICc8dHI+JytcbiAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cIndpZHRoOjUwJVwiPk91dHB1dCB2YXJpYWJsZShzKSB0byBjaGFydCA8L3RkPicrXG4gICAgICAgICAgICAgICc8dGQ+IDxhIGlkPVwic2VsZWN0LWNoYXJ0cy1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBDaGFydHM8L2E+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+VmFyaWF0aW9uIGFuYWx5c2lzIHBhcmFtZXRlcihzKSA8L3RkPicrXG4gICAgICAgICAgICAgICc8dGQ+PGRpdiBpZD1cInZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCI+Tm9uZTwvZGl2PjwvdGQ+JytcbiAgICAgICAgICAnPC90cj4nK1xuICAgICAgJzwvdGFibGU+JytcbiAgJzwvZGl2PicrXG4gICc8aDQ+TG9jYXRpb248L2g0PicrXG4gICAnPGRpdiBzdHlsZT1cImJvcmRlci10b3A6MXB4IHNvbGlkICNkZGQ7cGFkZGluZzo4cHg7aGVpZ2h0OjYwcHhcIj4nK1xuICAgICAnPHNwYW4gaWQ9XCJjdXJyZW50LWxvY2F0aW9uXCIgc3R5bGU9XCJjb2xvcjojODg4XCI+PC9zcGFuPicrXG4gICAgICc8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0IHNlbGVjdC13ZWF0aGVyLWxvY2F0aW9uXCI+PGkgY2xhc3M9XCJpY29uLW1hcC1tYXJrZXJcIj48L2k+IFNlbGVjdCBMb2NhdGlvbjwvYT4nK1xuICAgICAnPC9kaXY+JytcbiAgICAgJzxkaXY+JztcblxudmFyIEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURSA9XG4gICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxNXB4IDAgNXB4IDA7bWFyZ2luLWJvdHRvbTo1cHg7aGVpZ2h0OiA1MHB4XCI+JytcbiAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBwdWxsLXJpZ2h0XCIgaWQ9XCJ0cmVlLXN1Yi1tZW51XCI+JytcbiAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+JytcbiAgICAgICAgJzxzcGFuIGlkPVwibG9hZGVkLXRyZWUtbmFtZVwiPkRlZmF1bHQgVHJlZTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj4nK1xuICAgICAgJzwvYnV0dG9uPicrXG4gICAgICAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+JytcbiAgICAgICAgJzxsaT48YSBpZD1cImdkcml2ZS10cmVlcGFuZWwtbG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaT48YSBpZD1cImdkcml2ZS10cmVlcGFuZWwtc2F2ZVwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC11cGxvYWRcIj48L2k+IFNhdmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cInNoYXJlLXRyZWUtYnRuXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tbGVmdDoxMHB4XCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICc8L3VsPicrXG4gICc8L2Rpdj4nK1xuICAnPGRpdiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNvbXBhcmUtdHJlZXNcIiAvPiBDb21wYXJlIFRyZWVzPC9kaXY+Jytcbic8L2Rpdj4nO1xuXG52YXIgSU5QVVRfVEVNUExBVEUgPVxuICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICc8bGFiZWwgZm9yPVwie3tpZH19XCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+e3tsYWJlbH19PC9sYWJlbD4nK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj4nK1xuICAgICAgJzxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwie3tpZH19XCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwie3t2YWx1ZX19XCI+Jm5ic3A7Jm5ic3A7e3t1bml0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj4nO1xuXG52YXIgQVJSQVlfSU5QVVRfVEVNUExBVEUgPVxuICAnPGRpdiBjbGFzcz1cImNvbC1sZy02XCI+PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICc8bGFiZWwgZm9yPVwie3tpZH19XCIgY2xhc3M9XCJjb2wtbGctNCBjb250cm9sLWxhYmVsXCI+e3tsYWJlbH19PC9sYWJlbD4nK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj4nK1xuICAgICAgJ3t7aW5wdXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2PjwvZGl2Pic7XG5cbnZhciB0YWJIZWFkZXIgPSAnPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIGlkPVwiaW5wdXRfcGlsbHNcIj4nO1xudmFyIGNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+JztcblxudmFyIHRyZWVIZWFkZXIgPSAnPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCIgaWQ9XCJ0cmVlLWFjY29yZGlvblwiPic7XG52YXIgVFJFRV9QQU5FTF9URU1QTEFURSA9ICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPicrXG4gICAgICAgICAgICAnPGg0IGNsYXNzPVwicGFuZWwtdGl0bGVcIj4nK1xuICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFjY29yZGlvbi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9XCIjdHJlZS1hY2NvcmRpb25cIiBocmVmPVwiI2NvbGxhcHNle3tpZH19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJ3t7dGl0bGV9fScrXG4gICAgICAgICAgICAgICAgJzwvYT4nK1xuICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY29sbGFwc2V7e2lkfX1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPnt7Ym9keX19PC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICc8L2Rpdj4nO1xuXG52YXIgaW5wdXRzID0ge307XG5cbi8vIGZvciB3ZWF0aGVyIGRhdGFcbnZhciBjb2xzID0gW107XG5cbnZhciBtYXAgPSBudWxsO1xuXG4vKipcbiAqIE9wdGlvbnMgOlxuICogICBtb2RlbCAtIHR5cGUgb2YgbW9kZWwgdG8gYXBwZW5kIHRvXG4gKiAgIGxhYmVsIC0gYXR0cmlidXRlIGxhYmVsXG4gKiAgIHZhbHVlIC0gZGVmYXVsdCB2YWx1ZVxuICogICBkZXNjcmlwdGlvbiAtIGRlc2NyaXB0aW9uIG9mIGF0dHJpYnV0ZVxuICogICB1bml0cyAtIGF0dHJpYnV0ZSB1bml0c1xuICovXG5mdW5jdGlvbiBfYWRkSW5wdXQob3B0aW9ucykge1xuICBpZiggIWlucHV0c1tvcHRpb25zLm1vZGVsXSApIGlucHV0c1tvcHRpb25zLm1vZGVsXSA9IFtdO1xuICBpbnB1dHNbb3B0aW9ucy5tb2RlbF0ucHVzaChvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIHZhciB0YWJsZSA9ICc8ZGl2IHN0eWxlPVwicGFkZGluZy10b3A6MjVweFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHRcIiBpZD1cImxvYWQtd2VhdGhlci1idG5cIj48aSBjbGFzcz1cImljb24tdXBsb2FkLWFsdFwiPjwvaT4gVXBsb2FkPC9hPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgaWQ9XCJ3ZWF0aGVyLWlucHV0LXRvZ2dsZVwiPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkF2ZXJhZ2VzPC9idXR0b24+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5BY3R1YWw8L2J1dHRvbj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItcGFuZWxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tdG9wOjIwcHhcIj48L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1wYW5lbFwiPicrXG4gICAgICAgICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxMHB4O2NvbG9yOiM4ODhcIj5TZWxlY3QgbG9jYXRpb24gdG8gc2V0IHRoZSBhdmVyYWdlIHdlYXRoZXIgZGF0YTwvZGl2PicrXG4gICAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZCB3ZWF0aGVyLXRhYmxlXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjIwcHhcIj4nO1xuXG4gIHRhYmxlICs9IFwiPHRyPlwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdGFibGUgKz0gXCI8dGQ+XCIrY29sc1tpXStcIjwvdGQ+XCI7XG4gIH1cbiAgdGFibGUgKz0gXCI8L3RyPlwiO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgdGFibGUgKz0gXCI8dHI+XCI7XG4gICAgZm9yKCB2YXIgaiA9IDA7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgaWYoIGogPT0gMCApIHtcbiAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrKGkrMSkrXCI8L3RkPlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFibGUgKz0gXCI8dGQ+PGlucHV0IGNsYXNzPSdmb3JtLWNvbnRyb2wnIGlkPSdpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbStcIicgdHlwZT0ndGV4dCcgLz48L3RkPlwiO1xuICAgICAgfVxuICAgIH1cbiAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gIH1cbiAgcmV0dXJuIHRhYmxlKyc8L3RhYmxlPjxkaXYgaWQ9XCJhdmVyYWdlLXdlYXRoZXItY2hhcnRcIj48L2Rpdj48L2Rpdj4nO1xuXG59XG5cbmZ1bmN0aW9uIF9zZXRXZWF0aGVyRGF0YSgpIHtcbiAgdmFyIGxsID0gYXBwLnFzKFwibGxcIik7XG4gIGlmKCBsbCApIHtcbiAgICBsbCA9IGxsLnNwbGl0KFwiLFwiKTtcbiAgICBfcXVlcnlXZWF0aGVyRGF0YShsbFswXSwgbGxbMV0sIGZ1bmN0aW9uKCkge1xuICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChcIk5vdCBTZXRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3F1ZXJ5V2VhdGhlckRhdGEobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3dlYXRoZXItZGF0YS1xdWVyeScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIHJlc3BzKys7XG4gICAgICBpZiggcmVzcHMgPT0gMiAmJiBjYWxsYmFjayApIGNhbGxiYWNrKCk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciB0YWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgICAgZm9yKCB2YXIgaiA9IDE7IGogPCB0YWJsZS5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIittKS52YWwodGFibGUucm93c1tpXS5jW2pdID8gdGFibGUucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVBdmVyYWdlQ2hhcnQoKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIGVycm9yID0gZmFsc2U7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRhYmxlLnJvd3NbMF0gPT0gbnVsbCApIHtcbiAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICBhbGVydChcIkludmFsaWQgbG9jYXRpb24gc2VsZWN0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIga2V5ID0gdGFibGUuY29sc1tpXS5pZDtcbiAgICAgIGlmKCBrZXkgPT09ICdtYXhhd3MnICkga2V5ID0gJ21heEFXUyc7XG5cbiAgICAgICQoXCIjaW5wdXQtc29pbC1cIitrZXkpLnZhbCh0YWJsZS5yb3dzWzBdLmNbaV0udik7XG4gICAgfVxuXG4gICAgaWYoICFlcnJvciApIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChsbmcrXCIsIFwiK2xhdCtcIiA8YSBocmVmPSdcIit3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jLiovLCcnKStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiP2xsPVwiK2xuZytcIixcIitsYXQrXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+PC9hPlwiKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXZlcmFnZUNoYXJ0KCkge1xuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB2YXIgbSA9IChpKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV0gPSB7fTtcbiAgICBmb3IoIHZhciBqID0gMTsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICB2YXIgdmFsID0gJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIrbSkudmFsKCk7XG4gICAgICBpZiggdmFsICYmIHZhbC5sZW5ndGggPiAwICkgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbbV1bY29sc1tqXV0gPSBwYXJzZUludCh2YWwpO1xuICAgICAgZWxzZSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXVtjb2xzW2pdXSA9IDA7XG4gICAgfVxuICB9XG4gIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBjaGFydHMuY3JlYXRlV2VhdGhlckNoYXJ0KCQoJyNhdmVyYWdlLXdlYXRoZXItY2hhcnQnKVswXSwgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEpO1xufVxuXG5mdW5jdGlvbiBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKCkge1xuICBpZiggIW1hcCApIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKHt9KTtcblxuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5vbignY2xpY2snLCBfZ2V0TG9jYXRpb24pO1xuXG5cbiAgICAvLyB3YWl0IGZvciB0aGUgbW9kYWwgdG8gaW5pdFxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBvZmZsaW5lTW9kZSApIHJldHVybjtcblxuICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCgkKFwiI2dtYXBcIilbMF0sIHtcbiAgICAgICAgY2VudGVyIDogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygzNSwgLTEyMSksXG4gICAgICAgIHpvb206IDUsXG4gICAgICAgIG1hcFR5cGVJZCA6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG4gICAgICB9KTtcblxuICAgICAgdmFyIGRlZmF1bHRTdHlsZSA9IHtcbiAgICAgICAgICAgIHBvbHlnb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yICAgOiBcIiMwMDAwRkZcIixcbiAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eSA6IDAuNSxcbiAgICAgICAgICAgICAgZmlsbENvbG9yICAgICA6ICcjRkVGRUZFJyxcbiAgICAgICAgICAgICAgZmlsbE9wYWNpdHkgICA6IDAuMlxuICAgICAgICAgICAgfSxcbiAgICAgIH07XG5cblxuICAgICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBzZWxlY3Q6ICdib3VuZGFyeScsXG4gICAgICAgICAgICBmcm9tOiAnMWhWOXZRRzNTYzBKTFBkdUZwV0p6dGZMSy1leDZjY3lNZ19wdEVfcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0eWxlczogW2RlZmF1bHRTdHlsZV0sXG4gICAgICAgICAgc3VwcHJlc3NJbmZvV2luZG93cyA6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIHZhciBmdXNpb25MYXllciA9IG5ldyBnb29nbGUubWFwcy5GdXNpb25UYWJsZXNMYXllcihkZWZhdWx0T3B0aW9ucyk7XG4gICAgICBmdXNpb25MYXllci5vcGFjaXR5ID0gLjg7XG4gICAgICBmdXNpb25MYXllci5zZXRNYXAobWFwKTtcblxuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBhbGVydCgnWW91IG11c3QgY2xpY2sgb24gYSBnZW9tZXRyeSB0byBjYWNoZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZnVzaW9uTGF5ZXIsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIG9mZmxpbmUuY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gc2V0dXAgaW5wdXQgZm9yIGNsZWFyaW5nIGNhY2hlXG4gICAgICAgICAgJCgnI2NsZWFyLWNhY2hlZC10aWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIG9mZmxpbmUuY2xlYXJDYWNoZSgpO1xuICAgICAgICAgICAgICBvZmZsaW5lLnJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICBvZmZsaW5lLnJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuXG4gICAgfSw1MDApO1xuICB9IGVsc2Uge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcblxuICAgIC8vIHdlIHNlZW0gdG8gYmUgaGFuZ2luZyBzb21ldGltZXMuLi4uXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsIFwicmVzaXplXCIpO1xuICAgIH0sIDUwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dldExvY2F0aW9uKCkge1xuICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzaG93UG9zaXRpb24pO1xuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5hZGRDbGFzcyhcImJ0bi13YXJuaW5nXCIpO1xuICB9IGVsc2V7XG4gICAgd2luZG93LmFsZXJ0KFwiR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXIuXCIpO1xuICB9XG4gIGZ1bmN0aW9uIHNob3dQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICQoXCIjbG9jYXRlLWJ1dHRvblwiKS5yZW1vdmVDbGFzcyhcImJ0bi13YXJuXCIpLmFkZENsYXNzKFwiYnRuLXN1Y2Nlc3NcIik7XG4gICAgbWFwLnNldFpvb20oMTApO1xuICAgIG1hcC5zZXRDZW50ZXIobmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpKTtcbiAgICAvL19xdWVyeVdlYXRoZXJEYXRhKHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlSW5wdXRzKGksIHR5cGUsIHByZWZpeCwgbmFtZSwgYXR0cnMpIHtcbiAgdmFyIGlkID0gcHJlZml4Lmxlbmd0aCA+IDAgPyBwcmVmaXgrJy0nK25hbWUgOiAnaW5wdXQtJytuYW1lO1xuICB2YXIgaW5wdXQgPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cIm1hcmdpbi1sZWZ0OicrKGkqMjApKydweDttYXJnaW4tdG9wOjBweDttYXJnaW4tcmlnaHQ6NXB4XCI+JztcblxuICB2YXIgdHJlZWJvZHkgPSBcIlwiO1xuXG4gIGlmKCAhKGkgPT0gMSkgKSB7XG4gICAgICBpZiggaSAhPSAwICkgaW5wdXQgKz0gJzxsYWJlbCBmb3I9XCInK2lkKydcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj4nK25hbWUgKyc8L2xhYmVsPic7XG4gICAgICBpbnB1dCArPSAnPGRpdj4nO1xuICB9XG5cblxuICAgICAgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgJiYgaSA9PSAxICApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG4gICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIHRyZWVib2R5ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICkge1xuICAgICAgaWYoIGF0dHJzLmRlc2NyaXB0aW9uICkgaW5wdXQgKz0gJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPicrYXR0cnMuZGVzY3JpcHRpb24rJzwvcD4nO1xuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgaW5wdXQgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCAodHlwZW9mIGF0dHJzLnZhbHVlID09ICdudW1iZXInIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJykgJiYgaSA9PSAxICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcblxuICAgICAgdHJlZWJvZHkgKz1cbiAgICAgICAgICAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJytcbiAgICAgICAgICAodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrJ1wiIGlkPVwiJytcbiAgICAgICAgICBpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICAgICAgKyhhdHRycy51bml0cyA/IGF0dHJzLnVuaXRzIDogJycpKyc8L2Rpdj4nO1xuXG4gIH0gZWxzZSBpZiAoICB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdudW1iZXInICkge1xuXG4gICAgaW5wdXQgKz0gJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICdcbiAgICAgICAgICArKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlK1xuICAgICAgICAgICAnXCIgaWQ9XCInK2lkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgKyhhdHRycy51bml0cyA/IGF0dHJzLnVuaXRzIDogJycpKyc8L2Rpdj4nO1xuXG4gICAgaWYoIGF0dHJzLmRlc2NyaXB0aW9uICkgaW5wdXQgKz0gJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPicrYXR0cnMuZGVzY3JpcHRpb24rJzwvcD4nO1xuICB9XG5cbiAgaWYoICEoaSA9PSAxIC8qJiYgdHlwZSA9PSAndHJlZScqLykgKSB7XG4gICAgICBpbnB1dCArPSAnPC9kaXY+PC9kaXY+JztcbiAgfSBlbHNlIHtcbiAgICAgIGlucHV0ICs9IFRSRUVfUEFORUxfVEVNUExBVEVcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97e2lkfX0vZyxpZClcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e3RpdGxlfX0nLG5hbWUrXCIgPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODg7Zm9udC1zaXplOjEycHgnPiAtIFwiK2F0dHJzLmRlc2NyaXB0aW9uK1wiPC9zcGFuPlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7Ym9keX19Jyx0cmVlYm9keSkrJzwvZGl2PidcbiAgfVxuXG4gIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKGVsZSkge1xuICB3ZWF0aGVyRmlsZVJlYWRlci5pbml0KCk7XG4gIHZhciBtb2RlbCwgbSwgYXR0ciwgY29uZmlnO1xuXG4gIHZhciBpbnB1dHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkpO1xuXG4gIGlucHV0c1snc2V0dXAnXSA9IHt9O1xuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBtID0gaW5wdXRzW21vZGVsXTtcbiAgICBmb3IoIGF0dHIgaW4gbSApIHtcbiAgICAgIGNvbmZpZyA9IG1bYXR0cl07XG5cbiAgICAgIGlmKCB0eXBlb2YgY29uZmlnID09ICdvYmplY3QnICkge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyLFxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogY29uZmlnLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHZhbHVlICAgICAgIDogY29uZmlnLnZhbHVlLFxuICAgICAgICAgIHVuaXRzICAgICAgIDogY29uZmlnLnVuaXRzXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0clxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIGlmKCBtb2RlbCA9PSBcInBsYW50YXRpb25fc3RhdGVcIiApIGNvbnRpbnVlO1xuXG4gICAgdGFiSGVhZGVyICs9ICc8bGk+PGEgaHJlZj1cIiNpbnB1dHNfJyttb2RlbCsnXCIgaWQ9XCJ0YWJfaW5wdXRzXycrbW9kZWwrJ1wiIGRhdGEtdG9nZ2xlPVwicGlsbFwiPidcbiAgICAgICAgICAgICAgICArbW9kZWwuc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKSttb2RlbC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSsnPC9hPjwvbGk+JztcbiAgICB2YXIgYXR0cmlidXRlcyA9IGlucHV0c1ttb2RlbF07XG5cbiAgICBjb250ZW50ICs9ICcgPGRpdiBjbGFzcz1cInRhYi1wYW5lIGZhZGVcIiBpZD1cImlucHV0c18nK21vZGVsKydcIj4nO1xuXG4gICAgdmFyIHJvdzEgPSBcIlwiO1xuICAgIHZhciByb3cyID0gXCI8ZGl2IGNsYXNzPSdjb2wtbGctNj5cIjtcblxuICAgIGlmKCBtb2RlbCA9PSAnd2VhdGhlcicgKSB7XG4gICAgICBjb250ZW50ICs9IF9jcmVhdGVXZWF0aGVySW5wdXRzKCk7XG4gICAgfSBlbHNlIGlmKCBtb2RlbCA9PSAnc2V0dXAnICkge1xuICAgICAgY29udGVudCArPSBTRVRVUF9URU1QTEFURTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ICs9IHRyZWVIZWFkZXI7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBnb29nbGUgZHJpdmUgYnRuIGZyb20gdHJlZXNcbiAgICAgICAgaWYoIG1vZGVsID09J3RyZWUnICkge1xuICAgICAgICAgIGNvbnRlbnQgKz0gX2NyZWF0ZVRyZWVJbnB1dChtb2RlbCwgaW5wdXRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJycsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKTtcbiAgICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICAgIH1cblxuXG4gICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgfVxuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICB0YWJIZWFkZXIgKz0gXCI8L3VsPlwiO1xuXG4gIGVsZS5odG1sKHRhYkhlYWRlcitcIjxkaXYgY2xhc3M9J2Zvcm0taG9yaXpvbnRhbCc+XCIrY29udGVudCtcIjwvZGl2PlwiKTtcblxuICAvLyBydW4gdGhlIG1vZGVsIHdoZW5ldmVyIHNvbWUgaGl0cyAnZW50ZXInXG4gIGVsZS5maW5kKCdpbnB1dCcpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSl7XG4gICAgaWYoIGUud2hpY2ggPT0gMTMgKSBhcHAucnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIGxvYWRpbmcgYSB0cmVlXG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtbG9hZFwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93TG9hZFRyZWVQYW5lbCgpO1xuICB9KTtcbiAgZWxlLmZpbmQoXCIjZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2RyaXZlLnNob3dTYXZlVHJlZVBhbmVsKCk7XG4gIH0pO1xuXG4gIC8vIHNldCB0cmVlIGlucHV0IGhhbmRsZXJzXG4gICQoXCIjY29tcGFyZS10cmVlc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGlmKCAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgJChcIiNzaW5nbGUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjY29tcGFyZS10cmVlLWNvbnRlbnRcIikuc2hvdygpO1xuICAgICAgJChcIiN0cmVlLXN1Yi1tZW51XCIpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNzaW5nbGUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjY29tcGFyZS10cmVlLWNvbnRlbnRcIikuaGlkZSgpO1xuICAgICAgJChcIiN0cmVlLXN1Yi1tZW51XCIpLnNob3coKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNldCBwaWxsIGNsaWNrIGhhbmRsZXJzXG4gICQoJyNpbnB1dF9waWxscyBhJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgJCh0aGlzKS50YWIoJ3Nob3cnKVxuICB9KTtcbiAgJCgnI3RhYl9pbnB1dHNfd2VhdGhlcicpLnRhYignc2hvdycpO1xuXG4gICQoJy5zZWxlY3Qtd2VhdGhlci1sb2NhdGlvbicpLm9uKCdjbGljaycsIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24pO1xuXG5cbiAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuICAkKCcjbG9hZC13ZWF0aGVyLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAkKFwiI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0bi5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICBpZiggJCh0aGlzKS5odG1sKCkgPT0gJ0F2ZXJhZ2VzJyApIHtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5zZXRXZWF0aGVyKCk7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmKCB3ZWF0aGVyQXZlcmFnZUNoYXJ0ICl7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIF9zZXRXZWF0aGVyRGF0YSgpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpIHtcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURTtcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwic2luZ2xlLXRyZWUtY29udGVudFwiPic7XG4gIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJjb21wYXJlLXRyZWUtY29udGVudFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgJzx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiPicrXG4gICAgICAgICAgJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjdHJlZTFcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMTwvYT48L2xpPicrXG4gICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCIjdHJlZTJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMjwvYT48L2xpPicrXG4gICAgICAgICc8L3VsPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUxXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDEnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMlwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCIgPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MicsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgJzwvZGl2Pic7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cblxucmV0dXJuIHtcbiAgY3JlYXRlIDogY3JlYXRlLFxuICB1cGRhdGVBdmVyYWdlQ2hhcnQ6IHVwZGF0ZUF2ZXJhZ2VDaGFydFxufTtcblxufTtcbiIsIi8vIFNwZWNpYWwgU2F1Y2UuLi5cbi8vIGJhc2ljYWxseSB0aGUgY29kZSBsb2FkZWQgZnJvbSBHaXRIdWIgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHRvIGV4aXN0cyBpbiB0aGUgd2luZG93IHNjb3BlXG4vLyAgIG0zUEdJT1xuLy8gICAgIC0gcmVhZEFsbENvbnRhbnRzXG4vLyAgICAgLSByZWFkV2VhdGhlclxuLy8gICAgIC0gZHVtcFxuLy8gICAgIC0gcmVhZEZyb21JbnB1dHNcbi8vIFNvIHdlIGluamVjdCBmdW5jdGlvbnMgdGhhdCBpbnRlcmFjdCB3LyBvdXIgVUksIG1vZGVsIGluIG5vIHdheSBjYXJlc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIG1vZGVsLmRlYnVnID0gdHJ1ZTtcblxuICAgIGlmKCAhbW9kZWwucGxhbnRhdGlvbiApIG1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICB0aGlzLnJlYWRBbGxDb25zdGFudHMobW9kZWwucGxhbnRhdGlvbik7XG5cbiAgICBpZiggIW1vZGVsLndlYXRoZXIgKSBtb2RlbC53ZWF0aGVyID0ge307XG4gICAgaWYoICFtb2RlbC5tYW5hZ2UgKSBtb2RlbC5tYW5hZ2UgPSB7fTtcbiAgICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICAgIHRoaXMucmVhZFdlYXRoZXIobW9kZWwud2VhdGhlciwgbW9kZWwubWFuYWdlLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG5cbiAgICBkZWxldGUgdGhpcy5tb2RlbC5tYW5hZ2UuY29wcGljZURhdGVzO1xuICB9LFxuICByZWFkQWxsQ29uc3RhbnRzIDogZnVuY3Rpb24ocGxhbnRhdGlvbikge1xuICAgICAgdGhpcy5yZWFkRnJvbUlucHV0cygpO1xuXG4gICAgICAvL2ZvciAoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC5wbGFudGF0aW9uKSB7XG4gICAgICAvLyAgICBwbGFudGF0aW9uW2tleV0gPSB0aGlzLm1vZGVsLnBsYW50YXRpb25ba2V5XTtcbiAgICAgIC8vfVxuXG4gICAgICBwbGFudGF0aW9uLmNvcHBpY2VkVHJlZSA9IHRoaXMubW9kZWwudHJlZTtcblxuICAgICAgLy8gc2V0dXAgc2VlZGxpbmcgVHJlZVxuICAgICAgLy8gVE9ETzogaGFyZGNvZGVkIGZvciBub3csIHRoaXMgc2hvdWxkbid0IGJlXG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZSA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLm1vZGVsLnRyZWUpO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUuc3RlbXNQZXJTdHVtcCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5wZnMuc3RlbUNudCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5yb290UCA9IHtcbiAgICAgICAgICBMQUlUYXJnZXQgOiAxMCxcbiAgICAgICAgICBlZmZpY2llbmN5IDogMC42LFxuICAgICAgICAgIGZyYWMgOiAwLjAxXG4gICAgICB9O1xuICB9LFxuXG4gIHJlYWRXZWF0aGVyIDogZnVuY3Rpb24od2VhdGhlck1hcCwgbWFuYWdlLCBjdXN0b21XZWF0aGVyTWFwKSB7XG4gICAgICB2YXIgZGF0ZVBsYW50ZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1kYXRlUGxhbnRlZFwiKS52YWwoKTtcbiAgICAgIGlmIChkYXRlUGxhbnRlZCAmJiBkYXRlUGxhbnRlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgbWFuYWdlLmRhdGVQbGFudGVkID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYW5hZ2UuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0ZUNvcHBpY2VkID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUNvcHBpY2VkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVDb3BwaWNlZCAmJiBkYXRlQ29wcGljZWQgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5kYXRlQ29wcGljZWQgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1kYXRlQ29wcGljZWRcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIHNldCBlcnJvciBjb25kaXRpb24gOiBUT0RPXG4gICAgICB9XG5cbiAgICAgIHZhciBEYXRlRmluYWxIYXJ2ZXN0ID0gJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKTtcbiAgICAgIGlmIChEYXRlRmluYWxIYXJ2ZXN0ICYmIERhdGVGaW5hbEhhcnZlc3QgIT0gXCJcIikge1xuICAgICAgICAgIG1hbmFnZS5EYXRlRmluYWxIYXJ2ZXN0ID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtZGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIHllYXJzUGVyQ29wcGljZSA9ICQoXCIjaW5wdXQtbWFuYWdlLWNvcHBpY2VJbnRlcnZhbFwiKS52YWwoKTtcbiAgICAgIGlmICh5ZWFyc1BlckNvcHBpY2UgJiYgeWVhcnNQZXJDb3BwaWNlICE9IFwiXCIpIHtcbiAgICAgICAgICBtYW5hZ2UueWVhcnNQZXJDb3BwaWNlID0gcGFyc2VJbnQoJChcIiNpbnB1dC1tYW5hZ2UtY29wcGljZUludGVydmFsXCIpLnZhbCgpKTtcbiAgICAgIH1cblxuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgIG1vbnRoIDogKGkgKyAxKVxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIG0gPSAoaSsxKSsnJztcbiAgICAgICAgICBpZiggbS5sZW5ndGggPT09IDEgKSBtID0gJzAnK207XG5cbiAgICAgICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCB0aGlzLmFwcC5pbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICB2YXIgYyA9IHRoaXMuYXBwLmlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgICAgICBpdGVtW2NdID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBjICsgXCItXCIgKyBtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW0ubnJlbCA9IGl0ZW0ucmFkIC8gMC4wMDM2O1xuXG4gICAgICAgICAgd2VhdGhlck1hcFttXSA9IGl0ZW07XG4gICAgICB9XG5cbiAgICAgIGlmKCB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGZvciggdmFyIGRhdGUgaW4gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5ucmVsID0gdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXS5yYWQgLyAwLjAwMzY7XG4gICAgICAgICAgICAgIC8vY3VzdG9tV2VhdGhlck1hcFtkYXRlXSA9IGN1c3RvbV93ZWF0aGVyW2RhdGVdO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3ZWF0aGVyTWFwO1xuICB9LFxuICBkdW1wIDogZnVuY3Rpb24ocm93cywgc2hlZXQpIHtcbiAgICAgIC8vIHNldCB0aGUgcmF3IG91dHB1dFxuICAgICAgdGhpcy5hcHAucnVuQ29tcGxldGUocm93cyk7XG4gIH0sXG5cbiAgLy8gcmVhZCBhIHZhbHVlIGZyb20gdGhlIGlucHV0XG4gIC8vIGl0IGhhcyBhICcsJyBpcyBzZXQgZm9yIHZhcmlhdGlvblxuICBfcmVhZFZhbCA6IGZ1bmN0aW9uKGVsZSkge1xuICAgICAgdmFyIHZhbCA9IGVsZS52YWwoKTtcbiAgICAgIGlmKCB2YWwubWF0Y2goL1xcZCotXFxkKi1cXGQqJC8pICkge1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9IGVsc2UgaWYoIHZhbC5tYXRjaCgvLiosLiovKSApIHtcbiAgICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxzL2csJycpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICB2YXIgaWQgPSBlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoL15pbnB1dC0vLCcnKS5yZXBsYWNlKC8tL2csJy4nKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF0ucHVzaChwYXJzZUZsb2F0KHZhbFtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCk7XG4gIH0sXG5cbiAgcmVhZEZyb21JbnB1dHMgOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJlYWQgc29pbFxuICAgICAgdGhpcy5tb2RlbC5zb2lsID0ge307XG4gICAgICB0aGlzLm1vZGVsLnNvaWwubWF4QVdTID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtbWF4QVdTXCIpKTtcbiAgICAgIHRoaXMubW9kZWwuc29pbC5zd3Bvd2VyID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3dwb3dlclwiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3djb25zdCA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3Y29uc3RcIikpO1xuXG4gICAgICAvLyByZWFkIG1hbmFnZVxuICAgICAgdGhpcy5tb2RlbC5tYW5hZ2UgPSB7XG4gICAgICAgICAgY29wcGljZSA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIGVsZXMgPSAkKFwiLm1hbmFnZVwiKTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJChlbGVzW2ldKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLm1hbmFnZVtlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1tYW5hZ2UtXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uXG4gICAgICBpZiggIXRoaXMubW9kZWwucGxhbnRhdGlvbiApIHRoaXMubW9kZWwucGxhbnRhdGlvbiA9IHt9O1xuICAgICAgZWxlcyA9ICQoXCIucGxhbnRhdGlvblwiKTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJChlbGVzW2ldKTtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25bZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtcGxhbnRhdGlvbi1cIiwgXCJcIildID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHRyZWVcbiAgICAgIHZhciB0cmVlSW5wdXRzID0gJChcIi50cmVlXCIpO1xuICAgICAgdGhpcy5tb2RlbC50cmVlID0ge307XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0cmVlSW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQodHJlZUlucHV0c1tpXSk7XG5cbiAgICAgICAgICB2YXIgcGFydHMgPSBlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC10cmVlLVwiLCBcIlwiKS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dKVxuICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSA9IHt9O1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dW3BhcnRzWzFdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvbiBzdGF0ZVxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUgKSB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBrZXkgaW4gdGhpcy5tb2RlbC5nZXREYXRhTW9kZWwoKS5wbGFudGF0aW9uX3N0YXRlLnZhbHVlICkge1xuICAgICAgICAgIHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZVtrZXldID0gLTE7XG4gICAgICB9XG5cbiAgfSxcbiAgZXhwb3J0U2V0dXAgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubW9kZWwudmFyaWF0aW9ucyA9IHt9O1xuICAgICAgdGhpcy5yZWFkRnJvbUlucHV0cygpO1xuICAgICAgdGhpcy5yZWFkV2VhdGhlcihbXSwge30sIHt9KTtcblxuICAgICAgdmFyIGV4ID0ge1xuICAgICAgICAgIHdlYXRoZXIgOiB0aGlzLm1vZGVsLndlYXRoZXIsXG4gICAgICAgICAgY3VzdG9tX3dlYXRoZXIgOiB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyLFxuICAgICAgICAgIHRyZWUgOiB0aGlzLm1vZGVsLnRyZWUsXG4gICAgICAgICAgcGxhbnRhdGlvbiA6IHRoaXMubW9kZWwucGxhbnRhdGlvbixcbiAgICAgICAgICBtYW5hZ2UgOiB0aGlzLm1vZGVsLm1hbmFnZSxcbiAgICAgICAgICBzb2lsIDogdGhpcy5tb2RlbC5zb2lsLFxuICAgICAgICAgIG1hbmFnZSA6IHRoaXMubW9kZWwubWFuYWdlLFxuICAgICAgICAgIHBsYW50YXRpb25fc3RhdGUgOiB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGUsXG4gICAgICAgICAgY29uZmlnIDoge1xuICAgICAgICAgICAgICBjaGFydFR5cGVJbnB1dCA6ICQoXCIjY2hhcnRUeXBlSW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICAgIG1vbnRoc1RvUnVuIDogdGhpcy5hcHAubW9udGhzVG9SdW4oKSxcbiAgICAgICAgICAgICAgY3VycmVudExvY2F0aW9uIDogJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgbG9hZGVkVHJlZSA6ICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKCksXG4gICAgICAgICAgICAgIHZlcnNpb24gOiB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgPyB0aGlzLmFwcC5xcyhcInZlcnNpb25cIikgOiBcIm1hc3RlclwiXG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBieSBkZWZhdWx0IHRoZSByZWFkIGZ1bmN0aW9uIHNldCB0aGUgdmFyaWF0aW9ucyB2YXJpYWJsZXMgYnV0IG9ubHlcbiAgICAgIC8vIHJldHVybnMgdGhlIGZpcnN0LCBzZXQgdGhlIHZhcmlhdGlvbiBwYXJhbXMgdG8gdGhlaXIgY29ycmVjdCB2YWx1ZXNcbiAgICAgIGZvciggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICB2YXIgcGFyYW0gPSBleDtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aC0xOyBpKysgKSB7XG4gICAgICAgICAgICAgIHBhcmFtID0gcGFyYW1bcGFydHNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbVtwYXJ0c1twYXJ0cy5sZW5ndGgtMV1dID0gdGhpcy5tb2RlbC52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXg7XG4gIH0sXG4gIGxvYWRUcmVlIDogZnVuY3Rpb24odHJlZSkge1xuICAgICAgZm9yICggdmFyIHJvb3RLZXkgaW4gdHJlZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdHJlZVtyb290S2V5XSAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LXRyZWUtXCIgKyByb290S2V5KS52YWwodHJlZVtyb290S2V5XSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9yICggdmFyIGNoaWxkS2V5IGluIHRyZWVbcm9vdEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkgKyBcIi1cIiArIGNoaWxkS2V5KS52YWwodHJlZVtyb290S2V5XVtjaGlsZEtleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9LFxuICBsb2FkU2V0dXAgOiBmdW5jdGlvbihmaWxlaWQsIHNldHVwLCBpc1J0KSB7XG5cbiAgICAgIC8vIGxvYWQgY29uZmlnXG4gICAgICBpZiAoc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0KSB7XG4gICAgICAgICAgdGhpcy5jaGFydHMudW5zZWxlY3RBbGwoKTtcbiAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5jaGFydHMuc2VsZWN0KHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNldHVwLmNvbmZpZy5jdXJyZW50TG9jYXRpb24pIHtcbiAgICAgICAgICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmKCBzZXR1cC5jb25maWcubG9hZGVkVHJlZSApIHtcbiAgICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChzZXR1cC5jb25maWcubG9hZGVkVHJlZSkucGFyZW50KCkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBsb2FkIHdlYXRoZXJcbiAgICAgIGlmKCBBcnJheS5pc0FycmF5KHNldHVwLndlYXRoZXIpICkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC53ZWF0aGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoIHZhciBpIGluIHNldHVwLndlYXRoZXIgKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLndlYXRoZXJbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtb250aCcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzZXR1cC53ZWF0aGVyW2ldW2tleV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoc2V0dXAud2VhdGhlcltpXVtrZXldKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiICsga2V5ICsgXCItXCIgKyBpKS52YWwoXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSBzZXR1cC5jdXN0b21fd2VhdGhlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIGNoYXJ0XG4gICAgICB0aGlzLmlucHV0Rm9ybS51cGRhdGVBdmVyYWdlQ2hhcnQoKTtcblxuICAgICAgLy8gbG9hZCB0cmVlXG4gICAgICB0aGlzLmxvYWRUcmVlKHNldHVwLnRyZWUpO1xuXG4gICAgICAvLyBsb2FkIHBsYW50aW5nIHBhcmFtc1xuICAgICAgLy8gTm93IHBhcnQgb2YgbWFuYWdlLi4uLlxuICAgICAgLy8gZm9cbiAgICAgIGlmIChzZXR1cC5tYW5hZ2UpIHtcbiAgICAgICAgICB2YXIgbWFwID0ge1xuICAgICAgICAgICAgICBcImRhdGVQbGFudGVkXCIgOiBcIkRhdGVQbGFudGVkXCIsXG4gICAgICAgICAgICAgIFwiZGF0ZUNvcHBpY2VkXCIgOiBcIkRhdGVDb3BwaWNlZFwiLFxuICAgICAgICAgICAgICBcInllYXJzUGVyQ29wcGljZVwiIDogXCJDb3BwaWNlSW50ZXJ2YWxcIlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAubWFuYWdlKSB7XG4gICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGlmKCBtYXBba2V5XSApIG5ld0tleSA9IG1hcFtrZXldO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dXAubWFuYWdlW2tleV0gPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLm1hbmFnZVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAubWFuYWdlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyB2YWx1ZSBpcyBkZXByZWNhdGVkLCBzZXQgdG8gbmV3IGlucHV0XG4gICAgICBpZiggc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuICkge1xuICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2V0dXAubWFuYWdlLmRhdGVQbGFudGVkKTtcbiAgICAgICAgICBkID0gbmV3IERhdGUobmV3IERhdGUoZCkuc2V0TW9udGgoZC5nZXRNb250aCgpK3BhcnNlSW50KHNldHVwLmNvbmZpZy5tb250aHNUb1J1bikpKTtcbiAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1kYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChkLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBsb2FkIHJlc3RcbiAgICAgIHZhciBpbnB1dHMgPSBbIFwicGxhbnRhdGlvblwiLCBcInNvaWxcIiwgXCJtYW5hZ2VcIiBdO1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cFtpbnB1dHNbaV1dKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21heEFXUycpIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtc29pbC1tYXhBV1NcIikudmFsKHNldHVwLnNvaWwubWF4QVdTKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHNldHVwW2lucHV0c1tpXV1ba2V5XSA9PSAnc3RyaW5nJyAmJiBzZXR1cFtpbnB1dHNbaV1dW2tleV0ubWF0Y2goLy4qVC4qWiQvKSApIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnJ1bk1vZGVsKGlzUnQpO1xuICB9XG59O1xuIiwiXG4gIC8vIG11c3QgaW5zdGFsbCB0aGlzIGZvciBuYXRpdmUgcGhvbmVnYXAgc3VwcG9ydDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bob25lZ2FwLWJ1aWxkL0NoaWxkQnJvd3NlclxuXG52YXIgd2luID0gbnVsbDtcblxuLyogdGhlIGtleSBmb3IgcmVmcmVzaCBUb2tlbiBpbiBsb2NhbCBTdG9yYWdlICovXG52YXIgdG9rZW5LZXkgPSAncmVmcmVzaF90b2tlbic7XG5cbi8qIHN0b3JlcyB0aGUgYWNjZXNzVG9rZW4gYWZ0ZXIgcmV0cmlldmFsIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuID0gbnVsbDtcblxuLyogc3RvcmVzIHRoZSBUaW1lIHdoZW4gYWNjZXNzIHRva2VuIHdhcyBsYXN0IHJlY2VpdmVkIGZyb20gc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW5UaW1lID0gbnVsbDtcblxuLyogc3RvcmVzIGFjY2VzcyBUb2tlbidzIEV4cGlyeSBMaW1pdC4gVXNlcyA1OCBtaW4uIGluc3RlYWQgb2YgNjAgbWluLiAqL1xudmFyIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQgPSA1OCAqIDYwICogMTAwMDtcblxuLyogQSB0ZW1wb3JhcnkgdmFyaWFibGUgc3RvcmluZyBjYWxsYmFjayBmdW5jdGlvbiAqL1xudmFyIGNhbGxiYWNrRnVuYyA9IGZhbHNlO1xuXG4vLyBhcmUgd2UgcnVubmluZyBuYXRpdmUgb3IgYnJvd3NlciBtb2RlP1xudmFyIGlzTmF0aXZlID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goL15maWxlLiovKSA/IHRydWUgOiBmYWxzZTtcblxudmFyIENMSUVOVF9JRCA9IGlzTmF0aXZlID9cbiAgICAgICAgXCIzNDQxOTA3MTM0NjUtZGlpbXRmZXJoNHRqYjAzMTY5YmtsOW1rb3F2cTJydTkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIiA6XG4gICAgICAgICBcIjM0NDE5MDcxMzQ2NS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiO1xuXG52YXIgQVBQX0lEID0gXCIzNDQxOTA3MTM0NjVcIjtcblxudmFyIE9BVVRIX1NDT1BFUyA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmZpbGUgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmluc3RhbGwgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnO1xuXG4vKiBjb25maWcgdmFsdWVzIGZvciBHb29nbGUgQVBJIChnYXBpKSAqL1xudmFyIGdhcGlDb25maWcgPSB7XG4gIGVuZHBvaW50OiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoXCIsXG4gIGVuZHRva2VuOiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi90b2tlblwiLCAvLyB0b2tlbiBlbmRwb2ludFxuICByZWRpcmVjdF91cmkgOiBcImh0dHA6Ly9sb2NhbGhvc3RcIixcbiAgY2xpZW50X3NlY3JldCA6ICc2ck9ROWwwZnluaDEzN01SWEdLLUdfWmcnLFxuICByZXNwb25zZV90eXBlIDogXCJjb2RlXCIsXG4gIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgc3RhdGUgOiBcImdkcml2ZWluaXRcIixcbiAgYWNjZXNzX3R5cGUgOiBcIm9mZmxpbmVcIixcbiAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG5cbiAgLyogQXMgZGVmaW5lZCBpbiB0aGUgT0F1dGggMi4wIHNwZWNpZmljYXRpb24sIHRoaXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsdWVcbiAgICAgKiBvZiBcImF1dGhvcml6YXRpb25fY29kZVwiIG9yIFwicmVmcmVzaF90b2tlblwiICovXG4gICAgZ3JhbnRUeXBlczogeyBBVVRIT1JJWkU6IFwiYXV0aG9yaXphdGlvbl9jb2RlXCIsIFJFRlJFU0g6IFwicmVmcmVzaF90b2tlblwiIH0sXG4gfTtcblxuLyoqXG4gKiBFbnVtIGZvciBTdGF0dXMgdmFsdWVzXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqXG4gKiBTVUNDRVNTIC0gU3VjY2Vzc2Z1bGx5IGRhdGEgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXJcbiAqIEVSUk9SIC0gRXJyb3Igb2NjdXJyZWQgd2hlbiB0cnlpbmcgdG8gcmVjZWl2ZSBmcm9tIHNlcnZlclxuICogTk9UX0RFVEVSTUlORUQgLSB1bmRldGVybWluZWRcbiAqL1xudmFyIHN0YXR1cyA9IHtcbiAgICAgICAgU1VDRVNTOiAxLFxuICAgICAgICBFUlJPUjogLTEsXG4gICAgICAgIE5PVF9ERVRFUk1JTkVEOiAwXG59XG5cbnJlcXVlc3RTdGF0dXMgPSAwO1xuXG4vKiBzdG9yZXMgdGhlIGF1dGhvcml6YXRpb24gQ29kZSBpbnRlcm5hbGx5ICovXG5hdXRoQ29kZSA9IGZhbHNlO1xuXG4vKiBzdG9yZXMgdGhlIGVycm9yIG1lc3NhZ2Ugd2hlbiBhbiBlcnJvciBoYXBwZW5zIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xuZXJyb3JNZXNzYWdlID0gZmFsc2U7XG5cbnZhciBsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgY29uc29sZS5sb2coXCIqKipPQVVUSCoqKjogXCIrbXNnKTtcbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBhdXRob3JpemUgdXNlciB1c2luZyBPQXV0aFxuICogT3BlbnMgdXAgQW5vdGhlciB3aW5kb3cgd2hlcmUgdXNlciBhbGxvd3MgYWNjZXNzIG9yIGRlbmllcyBpdC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsQmFjayAgIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgaW52b2tlZFxuICovXG52YXIgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbEJhY2spIHtcbiAgbG9nKFwiYXR0ZW1wdGluZyB0byBhdXRob3JpemVcIik7XG5cbiAgICB2YXIgYXV0aFVyaSA9IGdhcGlDb25maWcuZW5kcG9pbnQgKyAnPydcbiAgICArICdzY29wZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc2NvcGUpXG4gICAgKyAnJicgKyAncmVkaXJlY3RfdXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmkpXG4gICAgKyAnJicgKyAncmVzcG9uc2VfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVzcG9uc2VfdHlwZSlcbiAgICArICcmJyArICdjbGllbnRfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmNsaWVudF9pZCk7XG4gICAgLy8rICcmJyArICdzdGF0ZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc3RhdGUpXG4gICAgLy8rICcmJyArICdhY2Nlc3NfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuYWNjZXNzX3R5cGUpXG4gICAgLy8rICcmJyArICdhcHByb3ZhbF9wcm9tcHQ9Zm9yY2UnOyAvLyBAVE9ETyAtIGNoZWNrIGlmIHdlIHJlYWxseSBuZWVkIHRoaXMgcGFyYW1cblxuICAgIGNhbGxiYWNrRnVuYyA9IGNhbGxCYWNrO1xuICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG5cblxuXG5cbiAgICBsb2coXCJvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcblxuICAgIHRyeSB7XG5cbiAgICAgIC8vIE5vdyBvcGVuIG5ldyBicm93c2VyXG4gICAgICB3aW4gPSB3aW5kb3cub3BlbihhdXRoVXJpLCAnX2JsYW5rJywgJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8nKTtcblxuICAgICAgJCh3aW4pLm9uKCdsb2Fkc3RhcnQnLGZ1bmN0aW9uKGUpe1xuICAgICAgICBsb2coXCJJbkFwcEJyb3dzZXIgbG9hZHN0YXJ0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgICAgb25BdXRoVXJsQ2hhbmdlKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLnNob3dXZWJQYWdlKGF1dGhVcmksIHtzaG93TG9jYXRpb25CYXIgOiB0cnVlfSk7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkNsb3NlID0gb25BdXRoQ2xvc2U7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkxvY2F0aW9uQ2hhbmdlID0gb25BdXRoVXJsQ2hhbmdlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbG9nKFwiRXJyb3Igb3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG4gICAgICBsb2coZSk7XG4gICAgfVxuXG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsYmFjaywgaW1tZWRpYXRlKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiBpbW1lZGlhdGVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgYXV0aENvZGUgPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBjYWxsYmFjayhhdXRoQ29kZSk7XG4gIH0pO1xuXG4gIH1cbn1cblxuLyogQXV0aCBXaW5kb3cgY2xvc2VkICovXG52YXIgb25BdXRoQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkF1dGggd2luZG93IGNsb3NlZFwiKTtcbn07XG5cbi8qIE9BdXRoIFN1Y2Nlc3NmdWxseSBkb25lICovXG52YXIgb25BdXRoU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdBdXRoIFN1Y2Nlc3M/Jyk7XG59O1xuXG4vKipcbiAqIEdldHMgSW52b2tlZCB3aGVuIHRoZSBVUkwgY2hhbmdlcyBvbiBPQXV0aCBhdXRob3JpemF0aW9uIHByb2Nlc3NcbiAqXG4gKiBTdWNjZXNzIFVSTCBQYXR0ZXJuOlxuICogXCJyZWRpcmVjdF91cmlcIiArIFwiP2NvZGU9XCIgW3NlY3JldCBjb2RlIHZhbF1cbiAqXG4gKiBTdWNjZXNzIFNhbXBsZSBVUkw6XG4gKiBodHRwOi8vbG9jYWxob3N0Lz9jb2RlPTQvV09wUkxRZnZ2aEhFMHR1TVVERHFubjc2bENUVC44blhDNEllYk1FQVV1SkpWbkw0OUNjOEFRR3I4Y1FJXG4gKlxuICogRGVuaWVkIEFjY2VzcyBVUkwgUGF0dGVybjogXCJyZWRpcmVjdF91cmlcIiArID9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKiBEZW5pZWQgQWNjZXNzIFNhbXBsZTogaHR0cDovL2xvY2FsaG9zdC8/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmlMb2NhdGlvbiBUaGUgVVJJIExvY2F0aW9uXG4gKi9cbnZhciBvbkF1dGhVcmxDaGFuZ2UgPSBmdW5jdGlvbih1cmlMb2NhdGlvbikge1xuICAgIGNvbnNvbGUubG9nKFwiSW5BcHBCcm93c2VyIHVybCBjaGFuZ2VkIFwiK3VyaUxvY2F0aW9uKTtcbiAgICBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiY29kZT1cIikgIT0gLTEpIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5TVUNDRVNTO1xuXG4gICAgICAgIC8qIFN0b3JlIHRoZSBhdXRoQ29kZSB0ZW1wb3JhcmlseSAqL1xuICAgICAgICBhdXRoQ29kZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImNvZGVcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBsb2coXCJGb3VuZCBhdXRoIGNvZGU6IFwiK2F1dGhDb2RlKTtcblxuICAgICAgICBnZXRSZWZyZXNoVG9rZW4oY2FsbGJhY2tGdW5jKTtcblxuICAgICAgICAvLyBjbG9zZSB0aGUgY2hpbGRCcm93c2VyXG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiZXJyb3I9XCIpICE9IC0xKSAge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLkVSUk9SO1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJlcnJvclwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGNhbGxiYWNrRnVuYygpO1xuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuICAgICAgICAvL2NhbGxiYWNrRnVuYygpO1xuICAgIH1cbn07XG5cblxuLyoqXG4qIEdldHMgdGhlIFJlZnJlc2ggZnJvbSBBY2Nlc3MgVG9rZW4uIFRoaXMgbWV0aG9kIGlzIG9ubHkgY2FsbGVkIGludGVybmFsbHksXG4qIGFuZCBvbmNlLCBvbmx5IGFmdGVyIHdoZW4gYXV0aG9yaXphdGlvbiBvZiBBcHBsaWNhdGlvbiBoYXBwZW5zLlxuKlxuKiBAcGFyYW0gcGFyYW1PYmogQW4gT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSBwYXJhbU9iai5hdXRoX2NvZGUgVGhlIEF1dGhvcml6YXRpb24gQ29kZSBmb3IgZ2V0dGluZyBSZWZyZXNoIFRva2VuXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bCByZXRyaWV2YWwgb2YgZGF0YSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKi9cbnZhciBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBjb25zb2xlLmxvZyhcImFjY2VzcyByZWZyZXNoIHRva2VuXCIpO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgICBjb2RlICAgICAgICAgOiBhdXRoQ29kZSxcbiAgICAgICAgICAgICAgICAgICByZWRpcmVjdF91cmkgOiBnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSxcbiAgICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuQVVUSE9SSVpFXG4gICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzIGdldHRpbmcgcmVmcmVzaCB0b2tlblwiKTtcblxuICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICBhY2Nlc3NUb2tlbiAgICAgPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAvKiBzZXQgdGhlIGVycm9yIG9mIGRhdGEgdG8gZmFsc2UsIGFzIGl0IHdhcyBzdWNjZXNzZnVsICovXG4gICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcblxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG5cbiAgICAgICAgLyogbm93IGludm9rZSB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgY2FsbGJhY2soe2FjY2Vzc190b2tlbjogYWNjZXNzVG9rZW59KTtcbiAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogVGhpcyBtZXRob2Qgc2hvdWxkIE9OTFkgYmUgY2FsbGVkIGxvY2FsbHkgZnJvbSB3aXRoaW4gdGhpcyBjbGFzcy5cbiogUmV0dXJucyB0aGUgUmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZS5cbipcbiogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVmcmVzaCBUb2tlblxuKlxuKi9cbnZhciBnZXRUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xufTtcblxuXG4vKipcbiogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBleHRlcm5hbGx5LiBJdCByZXRyaWV2ZXMgdGhlIEFjY2VzcyBUb2tlbiBieSBhdCBmaXJzdFxuKiBjaGVja2luZyBpZiBjdXJyZW50IGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZCBvciBub3QuIElmIGl0cyBub3QgZXhwaXJlZCwgaXRcbiogc2ltcGx5IHJldHVybnMgdGhhdCwgb3RoZXJ3aXNlLCBpdCBnZXRzIHRoZSByZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlXG4qIChieSBpbnZva2luZyBnZXRUb2tlbikgYW5kIHRoZW4gY29ubmVjdGluZyB3aXRoIEdvb2dsZSdzIFNlcnZlciAodXNpbmcgT0F1dGgpXG4qIHRvIGdldCB0aGUgQWNjZXNzIFRva2VuLlxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgIEEgY2FsbEJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSBpcyByZXRyaWV2ZWQgZnJvbSB0aGUgZ29vZ2xlJ3Mgc2VydmVyLiBUaGUgZGF0YVxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBnb29nbGUgc2VydmVyIGlzIHBhc3NlZCB0byBjYWxsYmFjayBhcyBhcmdzLlxuKlxuKi9cbnZhciBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICBjb25zb2xlLmxvZyhcImdldHRpbmcgYWNjZXNzIHRva2VuXCIpO1xuXG4gICAvKiBjaGVjayBpZiBjdXJyZW50IFRva2VuIGhhcyBub3QgZXhwaXJlZCAoc3RpbGwgdmFsaWQpICovXG4gICBpZiAoYWNjZXNzVG9rZW4gJiYgYWNjZXNzVG9rZW4gIT0gZmFsc2UgJiZcbiAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgY2FsbGJhY2soeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pO1xuXG4gICAgICAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc29sZS5sb2coXCJBQ0NFU1MgVE9LRU4gUEFSQU1TOiBcIithY2Nlc3NUb2tlbitcIiBcIithY2Nlc3NUb2tlblRpbWUrXCIgXCIrYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCk7XG5cbiAgIC8qIGVsc2UsIGdldCB0aGUgcmVmcmVzaFRva2VuIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgZ2V0IGEgbmV3IGFjY2VzcyBUb2tlbiAqL1xuICAgdmFyIHJlZnJlc2hUb2tlbiA9IGdldFRva2VuKCk7XG5cbiAgIC8vICAgY29uc29sZS5sb2coXCJSZWZyZXNoIFRva2VuID4+IFwiICsgcmVmcmVzaFRva2VuKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLlJFRlJFU0gsXG4gICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgICAgICAvKiBzZXQgdGhlIGVycm9yIHRvIGZhbHNlICovXG4gICAgICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBlcnJvciA/PyA+PlwiICsgeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7IC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgIGlmIChhY2Nlc3NUb2tlbiAmJlxuICAgICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgICAgY2FsbGJhY2soYWNjZXNzVG9rZW4pO1xuXG4gICAgICAgICAgICAgcmV0dXJuO1xuICAgICB9XG5cbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGFjY2Vzc1Rva2VuID0gdG9rZW47XG4gICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuXG4vKipcbiogU2F2ZXMgdGhlIFJlZnJlc2ggVG9rZW4gaW4gYSBsb2NhbCBkYXRhYmFzZSBvciBsb2NhbFN0b3JhZ2VcbiogVGhpcyBtZXRob2Qgc2hhbGwgYmUgaW52b2tlZCBmcm9tIGV4dGVybmFsbHkgb25seSA8Yj5vbmNlPC9iPiBhZnRlciBhblxuKiBhdXRob3JpemF0aW9uIGNvZGUgaXMgcmVjZWl2ZWQgZnJvbSBnb29nbGUncyBzZXJ2ZXIuIFRoaXMgbWV0aG9kXG4qIGNhbGxzIHRoZSBvdGhlciBtZXRob2QgKGdldFJlZnJlc2hUb2tlbikgdG8gZ2V0IHRoZSByZWZyZXNoIFRva2VuIGFuZFxuKiB0aGVuIHNhdmVzIGl0IGxvY2FsbHkgb24gZGF0YWJhc2UgYW5kIGludm9rZXMgYSBjYWxsYmFjayBmdW5jdGlvblxuKlxuKiBAcGFyYW0gdG9rZW5PYmogQSBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHtTdHJpbmd9IHRva2VuT2JqLmF1dGhfY29kZSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdpdGggcGFyYW1ldGVyc1xuKi9cbnZhciBzYXZlUmVmcmVzaFRva2VuID0gZnVuY3Rpb24odG9rZW5PYmosIGNhbGxiYWNrKSB7XG4gICAgIGdldFJlZnJlc2hUb2tlbih0b2tlbk9iaiwgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgLyogaWYgdGhlcmUncyBubyBlcnJvciAqL1xuICAgICAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAVE9ETzogbWFrZSBhbm90aGVyIG1ldGhvZCBzYXZlVG9rZW4gdG8gYWJzdHJhY3QgdGhlIHN0b3Jpbmcgb2YgdG9rZW5cbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICB9KTtcbn07XG5cblxuXG4vKipcbiogQ2hlY2tzIGlmIHVzZXIgaGFzIGF1dGhvcml6ZWQgdGhlIEFwcCBvciBub3RcbiogSXQgZG9lcyBzbyBieSBjaGVja2luZyBpZiB0aGVyZSdzIGEgcmVmcmVzaF90b2tlblxuKiBhdmFpbGFibGUgb24gdGhlIGN1cnJlbnQgZGF0YWJhc2UgdGFibGUuXG4qXG4qIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYXV0aG9yaXplZCwgZmFsc2Ugb3RoZXJ3aXNlXG4qL1xudmFyIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdG9rZW5WYWx1ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG5cbiAgICAgIGNhbGxiYWNrKCgodG9rZW5WYWx1ZSAhPT0gbnVsbCkgJiYgKHR5cGVvZiB0b2tlblZhbHVlICE9PSAndW5kZWZpbmVkJykpKTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIEV4dHJhY3RzIHRoZSBjb2RlIGZyb20gdGhlIHVybC4gQ29waWVkIGZyb20gb25saW5lXG4qIEBUT0RPIG5lZWRzIHRvIGJlIHNpbXBsaWZpZWQuXG4qXG4qIEBwYXJhbSBuYW1lIFRoZSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWUgaXMgdG8gYmUgZ3JhYmJlZCBmcm9tIHVybFxuKiBAcGFyYW0gdXJsICBUaGUgdXJsIHRvIGJlIGdyYWJiZWQgZnJvbS5cbipcbiogQHJldHVybiBSZXR1cm5zIHRoZSBWYWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBuYW1lIHBhc3NlZFxuKi9cbnZhciBnZXRQYXJhbWV0ZXJCeU5hbWUgPSBmdW5jdGlvbihuYW1lLCB1cmwpIHtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCBcIlxcXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLCBcIlxcXFxcXF1cIik7XG4gIHZhciByZWdleFMgPSBcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIjtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleFMpO1xuICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcblxuICBpZihyZXN1bHRzID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZWxzZVxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhvcml6ZSA6IGF1dGhvcml6ZSxcbiAgaXNBdXRob3JpemVkIDogaXNBdXRob3JpemVkLFxuICBnZXRBY2Nlc3NUb2tlbiA6IGdldEFjY2Vzc1Rva2VuLFxuICBBUFBfSUQgOiBBUFBfSURcbn07XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxudmFyIGNhY2hlZFRpbGVTdHlsZSA9IHtcbiAgd2hlcmU6IFwicGlkIGluICgpXCIsXG4gIHBvbHlnb25PcHRpb25zOiB7XG4gICAgZmlsbENvbG9yOiBcIiMwMDAwMDBcIixcbiAgICBzdHJva2VDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgc3Ryb2tlV2VpZ2h0OiAzXG4gIH1cbn1cblxudmFyIGNhY2hlZFRpbGVzID0gW107XG52YXIgY2FjaGVkVGlsZXNMb2FkZWQgPSBmYWxzZTtcbnZhciBjYWNoZWRUaWxlUHJlZml4ID0gJ2NhY2hlZF90aXRsZV8nO1xudmFyIGNhY2hpbmcgPSBmYWxzZTtcbnZhciBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gZmFsc2U7XG52YXIgY01hcERhdGEgPSB7fTtcblxudmFyIGNvbHMgPSBbXTtcbnZhciBhcHAgPSBudWxsO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBfbG9hZEZyb21DYWNoZSgpO1xuICBfbG9hZENhY2hlZFRpbGVzKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIGlmKCAhY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIGFsbCB0aWxlIGRhdGEgZnJvbSB0aGUgY2FjaGU/JykgKSByZXR1cm47XG5cbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXMgPSBbXTtcbn1cblxuLy8gZSBpcyB0aGUgZXZlbnQgb2JqZWN0IGZyb20gZ29vZ2xlIG1hcHNcbmZ1bmN0aW9uIGNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIXNhdmVDYWNoZU9uQ2xpY2tTZXQgKSB7XG4gICAgc2F2ZUNhY2hlT25DbGlja1NldCA9IHRydWU7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBfc2F2ZVRpbGUoKTtcbiAgICB9KTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmlzKCdjaGVja2VkJykgKSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiggY2FjaGluZyApIHJldHVybjtcbiAgY2FjaGluZyA9IHRydWU7XG5cbiAgY01hcERhdGEgPSB7XG4gICAgZnVzaW9uTGF5ZXIgOiBmdXNpb25MYXllcixcbiAgICBkZWZhdWx0T3B0aW9ucyA6IGRlZmF1bHRPcHRpb25zLFxuICAgIGRlZmF1bHRTdHlsZSA6IGRlZmF1bHRTdHlsZSxcbiAgICBwaWQgOiAgZS5yb3cucGlkLnZhbHVlXG4gIH1cblxuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgnJyk7XG4gICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuc2hvdygpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG5cbiAgX2xvYWRUaWxlKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuc2hvdygpO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuaGlkZSgpO1xuXG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBpZCcpLmh0bWwoY01hcERhdGEucGlkKTtcbiAgICBjTWFwRGF0YS5kYXRhID0gZGF0YTtcbiAgICBjYWNoaW5nID0gZmFsc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgX2NyZWF0ZU5hdk1lbnUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3QgdHJlZSBidXR0b25cbiAgJCgnI3RyZWUtc3ViLW1lbnUnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0b3IgZm9yIHVwbG9hZGluZyB3ZWF0aGVyIGRhdGEgZnJvbSBhIGdvb2dsZSBzcHJlYWRzaGVldFxuICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBzaG93IHRoZSBjYWNoZSB2ZXJzaW9uIG9mIHRoZSBsb2NhdGlvbiBzZWxlY3RvclxuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9ubGluZScpLmhpZGUoKTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lJykuc2hvdygpO1xuXG4gIC8vIHNldCB0aGUgbG9jYXRpb24gc2VsZWN0b3IgdWkgbGlzdCBiYXNlZCBvbiBjYWNoZWQgdGlsZXNcbiAgX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhY2FjaGVkVGlsZXNMb2FkZWQgKSBfbG9hZENhY2hlZFRpbGVzKCk7XG5cbiAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzID0gW2RlZmF1bHRTdHlsZV07XG5cbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA+IDAgKSB7XG4gICAgY2FjaGVkVGlsZVN0eWxlLndoZXJlID0gJ3BpZCBpbiAoJytjYWNoZWRUaWxlcy5qb2luKCcsJykrJyknO1xuICAgIGRlZmF1bHRPcHRpb25zLnN0eWxlcy5wdXNoKGNhY2hlZFRpbGVTdHlsZSk7XG4gIH1cblxuICBmdXNpb25MYXllci5zZXRPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX3NhdmVUaWxlKCkge1xuICB2YXIgbmFtZSA9ICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgcmV0dXJuIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIG5hbWUnKTtcblxuICBjTWFwRGF0YS5kYXRhLm5hbWUgPSBuYW1lO1xuXG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NNYXBEYXRhLnBpZCwgSlNPTi5zdHJpbmdpZnkoY01hcERhdGEuZGF0YSkpO1xuXG4gIGNhY2hlZFRpbGVzLnB1c2goY01hcERhdGEucGlkKTtcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChjTWFwRGF0YS5mdXNpb25MYXllciwgY01hcERhdGEuZGVmYXVsdE9wdGlvbnMsIGNNYXBEYXRhLmRlZmF1bHRTdHlsZSk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRUaWxlKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd0aWxlLWRhdGEtY2FjaGUnLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcbiAgdmFyIHdlYXRoZXJUYWJsZSA9IHt9O1xuICB2YXIgc29pbFRhYmxlID0ge307XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soe3dlYXRoZXI6d2VhdGhlclRhYmxlLCBzb2lsOnNvaWxUYWJsZX0pO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB3ZWF0aGVyVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgc29pbFRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCkge1xuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID09IDAgKSB7XG4gICAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKS5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGxpc3RFbGUgPSAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbGlzdCcpLmh0bWwoJzxkaXY+U2VsZWN0IENhY2hlZCBUaWxlPC9kaXY+JyksIGVsZTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjYWNoZWRUaWxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2ldKTtcbiAgICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICAgIGVsZSA9ICQoJzxkaXY+PGEgY2FjaGVpZD1cIicraSsnXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPicrY2FjaGVkVGlsZXNbaV0rJzogJytqc29uLm5hbWUrJzwvYT48L2Rpdj4nKTtcbiAgICBlbGUuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3J1bkNhY2hlZFRpbGUocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdjYWNoZWlkJykpKTtcbiAgICB9KTtcbiAgICBsaXN0RWxlLmFwcGVuZChlbGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3J1bkNhY2hlZFRpbGUoaW5kZXgpIHtcbiAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpbmRleF0pO1xuICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24ud2VhdGhlci5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBtID0gaSsnJztcbiAgICBmb3IoIHZhciBqID0gMTsgaiA8IGpzb24ud2VhdGhlci5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIraSkudmFsKGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0gPyBqc29uLndlYXRoZXIucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICB9XG4gIH1cblxuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi5zb2lsLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIGpzb24uc29pbC5yb3dzWzBdID09IG51bGwgKSBjb250aW51ZTtcbiAgICAkKFwiI2lucHV0LXNvaWwtXCIranNvbi5zb2lsLmNvbHNbaV0uaWQpLnZhbChqc29uLnNvaWwucm93c1swXS5jW2ldLnYpO1xuICB9XG5cbiAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBhcHAucnVuTW9kZWwoKTtcbiAgfSwgNTAwKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRDYWNoZWRUaWxlcygpIHtcbiAgY2FjaGVkVGlsZXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICBjYWNoZWRUaWxlcy5wdXNoKGtleS5yZXBsYWNlKGNhY2hlZFRpbGVQcmVmaXgsJycpKTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXNMb2FkZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlTmF2TWVudSgpIHtcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIj5PRkZMSU5FIE1PREU8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nXG4gICAgICArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG5mdW5jdGlvbiBfbG9hZEZyb21DYWNoZSgpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2NhY2hlL2pzYXBpJyxcbiAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2NoYXJ0LmNzcycpICk7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9hbm5vdGF0ZWR0aW1lbGluZS5jc3MnKSApO1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICdjYWNoZS9jaGFydC5qcycsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNoYXJ0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGlmKCBjaGFydHNDYWxsYmFjayApIGNoYXJ0c0NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIHJlbmRlciA6IHJlbmRlcixcbiAgY2FjaGVUaWxlIDogY2FjaGVUaWxlLFxuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwIDogcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCxcbiAgY2xlYXJDYWNoZSA6IGNsZWFyQ2FjaGVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIk1lYW4gVmFwb3IgUHJlc3N1cmUgRGVmaWNpdFwiLFxuICAgICAgdW5pdHMgOiBcImtQQVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcInRoZSBkaWZmZXJlbmNlIChkZWZpY2l0KSBiZXR3ZWVuIHRoZSBhbW91bnQgb2YgbW9pc3R1cmUgaW4gdGhlIGFpciBhbmQgaG93IG11Y2ggXCIgK1xuICAgICAgXHRcdFwibW9pc3R1cmUgdGhlIGFpciBjYW4gaG9sZCB3aGVuIGl0IGlzIHNhdHVyYXRlZFwiXG4gIH0sXG4gIGZWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmVCA6IHtcbiAgICAgIGxhYmVsIDogXCJUZW1wZXJhdHVyZSBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmRnJvc3QgOiB7XG4gICAgICBsYWJlbCA6IFwiRnJvc3QgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBmcm9zdCBkYXlzIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBBUiA6IHtcbiAgICAgIGxhYmVsIDogXCJNb250aGx5IFBob3Rvc3ludGhldGljYWxseSBBY3RpdmUgUmFkaWF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW9scyAvIG1eMiBtb250aFwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlc2lnbmF0ZXMgdGhlIHNwZWN0cmFsIHJhbmdlICh3YXZlIGJhbmQpIG9mIHNvbGFyIHJhZGlhdGlvbiBmcm9tIDQwMCB0byA3MDAgbmFub21ldGVycyBcIiArXG4gICAgICBcdFx0XCJ0aGF0IHBob3Rvc3ludGhldGljIG9yZ2FuaXNtcyBhcmUgYWJsZSB0byB1c2UgaW4gdGhlIHByb2Nlc3Mgb2YgcGhvdG9zeW50aGVzaXNcIlxuICB9LFxuICB4UFAgOiB7XG4gICAgICBsYWJlbCA6IFwiTWF4aW11bSBQb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiTWV0cmljIFRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEludGNwdG4gOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IFJhaW5mYWxsIEludGVyY2VwdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlByZWNpcGl0YXRpb24gdGhhdCBkb2VzIG5vdCByZWFjaCB0aGUgc29pbCwgYnV0IGlzIGluc3RlYWQgaW50ZXJjZXB0ZWQgYnkgdGhlIGxlYXZlcyBhbmQgYnJhbmNoZXMgb2YgcGxhbnRzIGFuZCB0aGUgZm9yZXN0IGZsb29yLlwiXG4gIH0sXG4gIEFTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJBdmFpbGFibGUgU29pbCBXYXRlclwiLFxuICAgICAgdW5pdHMgOiBcIm1tXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgQ3VtSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiQ3VtdWxhdGl2ZSBSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFN0YW5kQWdlIDoge1xuICAgICAgbGFiZWwgOiBcIlN0YW5kIEFnZVwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIExBSSA6IHtcbiAgICAgIGxhYmVsIDogXCJMZWFmIEFyZWEgSW5kZXhcIixcbiAgICAgIHVuaXRzIDogXCJtMiAvIG0yXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiVGhlIG9uZS1zaWRlZCBncmVlbiBsZWFmIGFyZWEgcGVyIHVuaXQgZ3JvdW5kIHN1cmZhY2UgYXJlYVwiXG4gIH0sXG4gIENhbkNvbmQgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IENvbmR1Y3RhbmNlXCIsXG4gICAgICB1bml0cyA6IFwiZ2MsbS9zXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgVHJhbnNwIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJXYXRlciBtb3ZlbWVudCB0aHJvdWdoIGEgcGxhbnQgYW5kIGl0cyBldmFwb3JhdGlvbiBmcm9tIGFlcmlhbCBwYXJ0c1wiXG4gIH0sXG4gIEVUciA6IHtcbiAgICAgIGxhYmVsIDogXCJFVHJcIixcbiAgICAgIHVuaXRzIDogXCJtbVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlJlZmVyZW5jZSBldmFwb3RyYW5zcGlyYXRpb24gZm9yIEFsZmFsZmFcIlxuICB9LFxuICBLYyA6IHtcbiAgICAgIGxhYmVsIDogXCJLY1wiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkNyb3AgY29lZmZpY2llbnRzXCJcbiAgfSxcbiAgZlNXIDoge1xuICAgICAgbGFiZWwgOiBcIlNvaWwgV2F0ZXIgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBhZ2VcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUGh5c01vZCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gQ2Fub3B5IENvbmR1Y3RhbmNlXCJcbiAgfSxcbiAgcFIgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiXG4gIH0sXG4gIHBTIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZVwiXG4gIH0sXG4gIGxpdHRlcmZhbGwgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcml0aW9uIDogXCJcIixcbiAgICAgIGFsdEZuTmFtZSA6IFwidGRwXCJcbiAgfSxcbiAgTlBQIDoge1xuICAgICAgbGFiZWwgOiBcIk5ldCBDYW5vcHkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgV0YgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJlX1dGLCBjdXJfZFcsIGN1cl9wRiwgY3VyX2xpdHRlcmZhbGwsIHByZXZfV0YpIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XRiArIGN1cl9kVyAqIGN1cl9wRiAtIGN1cl9saXR0ZXJmYWxsICogcHJldl9XRlxuICAgICAgfVxuICB9LFxuICBXUiA6IHtcbiAgICAgIGxhYmVsIDogXCJSb290IEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dSLCBjdXJfZFcsIGN1cl9wUiwgdHVybm92ZXIsIHByZXZfV1IsIGN1cl9Sb290UCkge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dSICsgY3VyX2RXICogY3VyX3BSIC0gdHJlZS5wUi50dXJub3ZlciAqIHByZXZfV1IgLSBjdXJfUm9vdFA7XG4gICAgICB9XG4gIH0sXG4gIFdTIDoge1xuICAgICAgbGFiZWwgOiBcIlN0ZW0gQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1MsIGN1cl9kVywgY3VyX3BTKSB7IHJldHVybiBwcmV2X1dTICsgY3VyX2RXICogY3VyX3BTIH1cbiAgfSxcbiAgVyA6IHtcbiAgICAgIGxhYmVsIDogXCJUb3RhbCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24oY3VyX1dGLCBjdXJfV1IsIGN1cl9XUykgeyByZXR1cm4gY3VyX1dGK2N1cl9XUitjdXJfV1MgfVxuICB9XG59XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLy8gYWRkIHNwcmVhZHNoZWV0IHZpeiBzb3VyY2Vcbi8vIGh0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vdHE/dHE9c2VsZWN0JTIwKiZrZXk9MEF2N2NVVi1vMlFRWWRIWkZZV0pOTldwUlMxaElWV2hHUVRobExXWndaV2MmdXNwPWRyaXZlX3dlYiNnaWQ9MFxuXG5mdW5jdGlvbiBpbml0KCkge1xudmFyIGRyb3Bab25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Ryb3Bfem9uZScpO1xuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBfaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbmRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS5vbigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoIGUud2hpY2ggPT0gMTMgKSBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcblxuICAgICQoJyN3ZWF0aGVyUmVhZGVyLWxvY2FsZmlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLWxvY2FsZmlsZS1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWRyaXZlLWZpbGUnLCAxKTtcblxuICAgIHZhciB2YWwgPSAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgpO1xuICAgIGlmKCB2YWwubGVuZ3RoID09IDAgKSByZXR1cm47XG5cbiAgICBpZiggIXZhbC5tYXRjaCgvXmh0dHAuKi8gKSApIHZhbCA9ICdodHRwczovLycrdmFsO1xuXG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gICAgZmlsZVBhbmVsLmluaXRGcm9tVXJsKHZhbCwgcm9vdCk7XG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoJycpO1xufVxuXG5mdW5jdGlvbiBfaGFuZGxlRmlsZVNlbGVjdChldnQpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItbG9jYWwtZmlsZScsIDEpO1xuXG4gIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyIGZpbGVzID0gZXZ0LmRhdGFUcmFuc2ZlciA/IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXMgOiBldnQudGFyZ2V0LmZpbGVzOyAvLyBGaWxlTGlzdCBvYmplY3QuXG5cbiAgLy8gZmlsZXMgaXMgYSBGaWxlTGlzdCBvZiBGaWxlIG9iamVjdHMuIExpc3Qgc29tZSBwcm9wZXJ0aWVzLlxuICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICBmb3IgKHZhciBpID0gMCwgZjsgZiA9IGZpbGVzW2ldOyBpKyspIHtcbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgZmlsZVBhbmVsLmluaXQoZiwgcm9vdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2hhbmRsZURyYWdPdmVyKGV2dCkge1xuZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5ldnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7IC8vIEV4cGxpY2l0bHkgc2hvdyB0aGlzIGlzIGEgY29weS5cbn1cblxuLy8gb24gYWRkLCBpZiB0aGUgbGlzdCBpcyBlbXB0eSwgbGV0J3MgY2xvc2UgdGhlIHBvcHVwXG5mdW5jdGlvbiBfb25Db21wbGV0ZSgpIHtcbiAgICBpZiggJChcIiNmaWxlX2xpc3RcIikuY2hpbGRyZW4oKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgIH1cbn1cblxudmFyIFdlYXRoZXJGaWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBoZWFkZXJzID0ge1xuICAgICAgICBkYXRlICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ0RhdGUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnRGF0ZScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtaW4gICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWluIFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWF4ICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01heCBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdGRtZWFuICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNZWFuIFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBwcHQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1ByZWNpcGl0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ21tJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcmFkICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdSYWRpYXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnTUogbS0yIGRheS0xJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgZGF5bGlnaHQgOiB7XG4gICAgICAgICAgICBsYW5lbCA6ICdEYXlsaWdodCBIb3VycycsXG4gICAgICAgICAgICB1bml0cyA6ICdob3VycycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgdmFyIGVsZSA9ICQoJzxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBsZWZ0XCI+JytcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPicrXG4gICAgICAnPGRpdiBjbGFzcz1cImZpbGVuYW1lXCI+PC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwiMFwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiIHN0eWxlPVwid2lkdGg6IDAlO1wiPicrXG4gICAgICAgICc8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4wJSBDb21wbGV0ZTwvc3Bhbj4nK1xuICAgICAgJzwvZGl2PicrXG4gICAgJzwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInN0YXR1c1wiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlLXJhbmdlXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByZXZpZXctZGF0YVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXY+PGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgcHJldmlldy1kYXRhLWJ0blwiPlByZXZpZXcgRGF0YTwvYT48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByZXZpZXctZGF0YS10YWJsZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1zdGF0dXNcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6NTBweFwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tbGluayBtYXAtZGF0YS1idG5cIj5NYXAgQ1NWIENvbHVtbnM8L2E+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGRpc2FibGVkIHB1bGwtcmlnaHRcIj5BZGQgRGF0YTwvYT4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgJzwvZGl2PicpO1xuXG4gIHZhciBkYXRhID0ge307XG4gICAgdmFyIGNzdlRhYmxlID0gW107XG5cbiAgICAvLyBvbmx5IGF1dG8gaGlkZSB0aGUgZmlyc3QgdGltZVxuICAgIHZhciBhdXRvSGlkZSA9IHRydWU7XG5cbiAgLy8gdGhlIGZpbGUgcmVhZGVyIG9iamVjdCBhbmQgdGhlIGVsZW1lbnRcbiAgZnVuY3Rpb24gaW5pdChmaWxlLCByb290RWxlKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBlcnJvckhhbmRsZXI7XG4gICAgcmVhZGVyLm9ucHJvZ3Jlc3MgPSB1cGRhdGVQcm9ncmVzcztcbiAgICByZWFkZXIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbihlKSB7fTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLnJlbW92ZSgpO1xuICAgICAgcGFyc2UoZS50YXJnZXQucmVzdWx0KTtcbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSlcblxuICAgIGVsZS5maW5kKCcuZmlsZW5hbWUnKS5odG1sKGdldE5hbWUoZmlsZSkpO1xuICAgIHJvb3RFbGUuYXBwZW5kKGVsZSk7XG5cbiAgICAgICAgX3NldEhhbmRsZXJzKCk7XG4gIH1cblxuICAgIGZ1bmN0aW9uIGluaXRGcm9tVXJsKHVybCwgcm9vdEVsZSkge1xuICAgICAgICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykuaHRtbCgnUXVlcnlpbmcgc3ByZWFkc2hlZXQuLi4nKTtcblxuICAgICAgICB2YXIga2V5ID0gZ2V0S2V5KHVybCk7XG4gICAgICAgIGVsZS5maW5kKCcuZmlsZW5hbWUnKS5odG1sKCc8aDMgc3R5bGU9XCJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmc6MTVweCAwIDRweCAwXCI+PGkgY2xhc3M9XCJpY29uLXRpbnRcIj48L2k+ICcrXG4gICAgICAgICAgICAnR29vZ2xlIFNwcmVhZHNoZWV0Jysoa2V5Lmxlbmd0aCA+IDAgPyAnPGJyIC8+PHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNHB4XCI+JytrZXkrJzwvc3Bhbj4nIDogJycpKyc8L2gzPicpO1xuXG4gICAgICAgIHJvb3RFbGUuYXBwZW5kKGVsZSk7XG5cbiAgICAgICAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgICAgICAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgIHNldEVycm9yKCdFcnJvciBpbiBxdWVyeTogJyArIHJlc3BvbnNlLmdldE1lc3NhZ2UoKSArICcgJyArIHJlc3BvbnNlLmdldERldGFpbGVkTWVzc2FnZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcnNlKGR0VG9Dc3YocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3NldEhhbmRsZXJzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3NldEhhbmRsZXJzKCkge1xuICAgICAgICBlbGUuZmluZCgnLm1hcC1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLXRhYmxlJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGFwcC5zZXRXZWF0aGVyKGRhdGEpO1xuICAgICAgICAgICAgZWxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgX29uQ29tcGxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHRUb0NzdihkdCkge1xuICAgICAgICB2YXIgYXJyID0gW1tdXTtcblxuICAgICAgICBkdCA9IEpTT04ucGFyc2UoZHQudG9KU09OKCkpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnJbMF0ucHVzaChkdC5jb2xzW2ldLmxhYmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyci5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZHQucm93c1tpXS5jLmxlbmd0aDsgaisrICkge1xuICAgICAgICAgICAgICAgIGlmKCAhZHQucm93c1tpXS5jW2pdICkgYXJyW2krMV0ucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBhcnJbaSsxXS5wdXNoKGR0LnJvd3NbaV0uY1tqXS52KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjc3YgPSAnJztcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBjc3YgKz0gYXJyW2ldLmpvaW4oJywnKSsnXFxuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjc3Y7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0S2V5KHVybCkge1xuICAgICAgICB2YXIgcGFydHMgPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA9PSAxICkgcmV0dXJuICcnO1xuXG4gICAgICAgIHBhcnRzID0gcGFydHNbMV0uc3BsaXQoJyYnKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBwYXJ0c1tpXS5zcGxpdCgnPScpWzBdID09ICdrZXknICkgcmV0dXJuIHBhcnRzW2ldLnNwbGl0KCc9JylbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICBmdW5jdGlvbiBnZXROYW1lKGYpIHtcbiAgICByZXR1cm4gWyc8aDMgc3R5bGU9XCJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmc6MTVweCAwIDRweCAwXCI+PGkgY2xhc3M9XCJpY29uLXRpbnRcIj48L2k+ICcsIGYubmFtZSxcbiAgICAgICAgICAgICAgICAnIDxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTZweFwiPignLCBmLnR5cGUgfHwgJ24vYScsXG4gICAgICAgICAgICAgICAgJyk8L3NwYW4+IC0gPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTZweFwiPicsIGYuc2l6ZSwgJyBieXRlczwvc3Bhbj4nLCAnPC9oMz4nXS5qb2luKCcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcbiAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9eXFxzKlxcbi9nLCcnKS5zcGxpdCgnXFxuJyk7XG5cbiAgICB2YXIgdGFibGUgPSBbXTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICB0YWJsZS5wdXNoKGRhdGFbaV0uc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgICAgIGlmKCB0YWJsZS5sZW5ndGggPT0gMCApIHJldHVybiBzZXRFcnJvcignRmlsZSBkaWQgbm90IGNvbnRhaW4gYW55IGluZm9ybWF0aW9uLicpO1xuICAgICAgICBjc3ZUYWJsZSA9IHRhYmxlO1xuXG4gICAgICAgIHBhcnNlSGVhZGVyKHRhYmxlWzBdKTtcbiAgICAgICAgZ2V0RGF0ZVJhbmdlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVJhbmdlKCkge1xuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCcnKTtcbiAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPT0gLTEgKSByZXR1cm4gZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnRGF0ZSBjb2x1bW4gbmVlZHMgdG8gYmUgbWF0Y2hlZC4nKTtcbiAgICAgICAgaWYoIHR5cGVvZiBoZWFkZXJzLmRhdGUuY29sID09ICdzdHJpbmcnICkgaGVhZGVycy5kYXRlLmNvbCA9IHBhcnNlSW50KGhlYWRlcnMuZGF0ZS5jb2wpO1xuXG4gICAgICAgIHZhciBkYXRlcyA9IHt9O1xuICAgICAgICB2YXIgZGlzcGxheURhdGVzID0gW107XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA8IGNzdlRhYmxlW2ldLmxlbmd0aCAmJiBjc3ZUYWJsZVtpXS5sZW5ndGggPj0gNyApwqB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgaWYoIHAubGVuZ3RoICE9IDMgJiYgcC5sZW5ndGggIT0gMiApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIG5vdCBhIHZhbGlkIGZvcm1hdCAoeXl5eS1tbS1kZCBvciB5eXl5LW1tKVwiKTtcblxuICAgICAgICAgICAgICAgIGlmKCAhZGF0ZXNbcFswXV0gKSBkYXRlc1twWzBdXSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBtbWRkID0gcFsxXTtcblxuICAgICAgICAgICAgICAgIGlmKCBkYXRlc1twWzBdXS5pbmRleE9mKG1tZGQpICE9IC0xICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgaW4gZGF0YXNldCB0d2ljZVwiKTtcbiAgICAgICAgICAgICAgICBkYXRlc1twWzBdXS5wdXNoKG1tZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgeWVhciBpbiBkYXRlcyApIHtcbiAgICAgICAgICAgIGlmKCBkYXRlc1t5ZWFyXS5sZW5ndGggPT0gMTIpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcisnIFsnK2RhdGVzW3llYXJdLmpvaW4oJywgJykrJ10nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJzxiPkRhdGUgUmFuZ2U6PC9iPiAnK2Rpc3BsYXlEYXRlcy5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUhlYWRlcihoZWFkZXJSb3cpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBbXTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+JztcbiAgICAgICAgaHRtbCArPSAnPHRyPjx0aD5LZXk8L3RoPjx0aD5Db2x1bW4gIzwvdGg+PC90cj4nO1xuXG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlclJvdy5pbmRleE9mKGtleSkgIT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1trZXldLmNvbCA9IGhlYWRlclJvdy5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNwYW4gY2xhc3M9XCJsYWJlbCBsYWJlbC1zdWNjZXNzXCI+JytoZWFkZXJzW2tleV0uY29sKycgPGkgY2xhc3M9XCJpY29uLW9rXCI+PC9pPjwvc3Bhbj48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNlbGVjdCBjbGFzcz1cInNlbGVjdC0nK2tleSsnXCJcIj48L3NlbGVjdD48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5odG1sKGh0bWwrJzwvdGFibGU+Jyk7XG5cblxuICAgICAgICBpZiggbWF0Y2hlZC5sZW5ndGggIT0gNyApIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzZWxlY3QgZWxlbWVudCBmb3IgbWlzc2luZyBjb2wnc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCJcIj5bU2VsZWN0IENvbHVtbl08L29wdGlvbj4nKSk7XG5cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgcmFkaWF0aW9uLCBhZGQgb3B0aW9uIGZvciBjYWxjdWxhdGluZ1xuICAgICAgICAgICAgLy8gVE9ET1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgbWlzc2luZyBjb2xzXG4gICAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlclJvdy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBpZiggbWF0Y2hlZC5pbmRleE9mKGhlYWRlclJvd1tpXSkgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiJytpKydcIj4nK2krJyAtICcraGVhZGVyUm93W2ldKyc8L29wdGlvbj4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGNoYW5nZSBoYW5kbGVycyBmb3IgdGhlIHNlbGVjdG9yc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgaWYoIHZhbCAhPSAnJyApIGhlYWRlcnNbdGhpcy5jbGFzc05hbWUucmVwbGFjZSgvc2VsZWN0LS8sJycpXS5jb2wgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgY29sdW1ucyBhcmUgc2V0LCByZW1vdmUgZGlzYWJsZWQgZnJvbSBidG5cbiAgICAgICAgICAgICAgICB2YXIgcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggaGVhZGVyc1trZXldLmNvbCA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCByZWFkeSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGF1dG9IaWRlICkgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaGlkZSgnc2xvdycpO1xuICAgICAgICAgICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzaG93IHRoZSB0YWJsZVxuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuc2hvdygnc2xvdycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgYXV0b0hpZGUgPSBmYWxzZTtcbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBzZXREYXRhKCk7XG4gICAgICAgIHNldFByZXZpZXcoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQcmV2aWV3KCkge1xuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLnNob3coKTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPjx0aD5kYXRlPC90aD4nO1xuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0aD4nK2tleSsnPC90aD4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGMgPSAwO1xuICAgICAgICBmb3IoIHZhciBkYXRlIGluIGRhdGEgKXtcbiAgICAgICAgICAgIGlmKCBjID09IDEwICkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQgY29sc3Bhbj1cIjdcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+Li4uPC90ZD48L3RyPic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytkYXRlKyc8L3RkPic7XG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPicrZGF0YVtkYXRlXVtrZXldKyc8L3RkPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cbiAgICAgICAgICAgIGMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLXRhYmxlJykuaHRtbChodG1sKTtcbiAgICB9XG5cbiAgLy8gc2V0IHRoZSBtYXAgb2YgY3N2IGhlYWRlcnNcbiAgZnVuY3Rpb24gc2V0RGF0YSgpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGNzdlRhYmxlW2ldLmxlbmd0aCA8IDcgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdO1xuXG4gICAgICAgICAgICBpZiggIWRhdGUgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICBpZiggZGF0ZS5zcGxpdCgnLScpLmxlbmd0aCA9PSAzICkgZGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnNwbGljZSgwLDIpLmpvaW4oXCItXCIpO1xuICAgICAgICAgICAgZGF0YVtkYXRlXSA9IHt9O1xuXG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgZGF0YVtkYXRlXVtrZXldID0gcGFyc2VGbG9hdChjc3ZUYWJsZVtpXVtoZWFkZXJzW2tleV0uY29sXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzKGV2dCkge1xuICAgIC8vIGV2dCBpcyBhbiBQcm9ncmVzc0V2ZW50LlxuICAgIGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICB2YXIgcGVyY2VudExvYWRlZCA9IE1hdGgucm91bmQoKGV2dC5sb2FkZWQgLyBldnQudG90YWwpICogMTAwKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcy1iYXInKS5hdHRyKCdhcmlhLXZhbHVlbm93JyxwZXJjZW50TG9hZGVkKS53aWR0aChwZXJjZW50TG9hZGVkK1wiJVwiKTtcbiAgICAgICAgZWxlLmZpbmQoJy5zci1vbmx5JykuaHRtbChNYXRoLmNlaWwocGVyY2VudExvYWRlZCkrJyUgQ29tcGxldGUnKTtcbiAgICB9XG59XG5cbiAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGV2dCkge1xuICAgIHN3aXRjaChldnQudGFyZ2V0LmVycm9yLmNvZGUpIHtcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfRk9VTkRfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBOb3QgRm91bmQhJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9SRUFEQUJMRV9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIGlzIG5vdCByZWFkYWJsZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5BQk9SVF9FUlI6XG4gICAgICAgIGJyZWFrOyAvLyBub29wXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzZXRFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgcmVhZGluZyB0aGlzIGZpbGUuJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEVycm9yKG1zZykge1xuICAgICAgZWxlLmZpbmQoJy5zdGF0dXMnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+Jyttc2crJzwvZGl2PicpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0IDogaW5pdCxcbiAgICBpbml0RnJvbVVybCA6IGluaXRGcm9tVXJsXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdFxufTtcbiJdfQ==
