
const paddocks = [
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 1200 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 4, harvestYear: 2019, area: 500 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 20000 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 3, harvestYear: 2021, area: 8401},
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2020, area: 2877 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 2, harvestYear: 2017, area: 15902 },
  { paddockManagerId: 3, farmId: 3, paddockTypeId: 2, harvestYear: 2018, area: 1736 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2020, area: 2965 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 4, harvestYear: 2018, area: 1651 },
  { paddockManagerId: 5, farmId: 1, paddockTypeId: 1, harvestYear: 2018, area: 700 },
  { paddockManagerId: 1, farmId: 2, paddockTypeId: 1, harvestYear: 2019, area: 7956 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 3745 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 3, harvestYear: 2021, area: 11362 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2021, area: 300 },
  { paddockManagerId: 3, farmId: 2, paddockTypeId: 2, harvestYear: 2020, area: 19188 },
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 17137 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 100 },
  { paddockManagerId: 2, farmId: 1, paddockTypeId: 3, harvestYear: 2019, area: 11845 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 1, harvestYear: 2018, area: 15969 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 1, harvestYear: 2029, area: 10420 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 3, harvestYear: 2010, area: 3200 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 2, harvestYear: 2012, area: 10587 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 2, harvestYear: 2018, area: 16750 }
];


const paddockType = [
  { id: 1, name: 'PALTOS' },
  { id: 2, name: 'AVELLANOS' },
  { id: 3, name: 'CEREZAS' },
  { id: 4, name: 'NOGALES' },
]

const paddockManagers = [
  { id: 1, taxNumber: '132254524', name: 'JUAN TAPIA BURGOS'},
  { id: 2, taxNumber: '143618668', name: 'EFRAIN SOTO VERA'},
  { id: 3, taxNumber: '78903228', name: 'CARLOS PEREZ GONZALEZ'},
  { id: 4, taxNumber: '176812737', name: 'ANDRES VIÑALES CIENFUEGOS'},
  { id: 5, taxNumber: '216352696', name: 'OSCAR PEREZ ZUÑIGA'},
  { id: 6, taxNumber: '78684747', name: 'JOAQUIN ANDRADE SANDOVAL' }
];
  
const farms = [
  { id: 1, name: 'AGRICOLA SANTA ANA' },
  { id: 2, name: 'VINA SANTA PAULA' },
  { id: 3, name: 'FORESTAL Y AGRICOLA LO ENCINA' }
];

//////////////////////////////////////////////////////////

function compare(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}


let Total = areaPaddocks => areaPaddocks.reduce((acum, num) => {
    return acum + num;
}, 0);

///////////////////////////////////////////////////////////

const a0 = () => {
return paddockManagers.map(paddockManager => paddockManager.id);
}  

const a1 = () => {
const ordeRutsByName = paddockManagers
      .sort(compare('name'))
      .map(manager => {
        return manager.taxNumber 
      });
return ordeRutsByName;      
};

const a2 = () => {

const indexAllByKey = (arr, key) => arr.reduce((acc, el) => {
  if (!acc[el[key]]) {
    acc[el[key]] = el.area;
  } else {
    acc[el[key]] = acc[el[key]] + el.area;
  }
  return acc;
}, {});
const paddocksByArea =  indexAllByKey(paddocks, 'paddockTypeId');

return res = paddockType.map(paddock => ({
  totalArea: paddocksByArea[paddock.id],
  name: paddock.name,
})).sort(compare('totalArea'));

}

const a3 = () => {

const indexAllByKey = (arr, key) => arr.reduce((acc, el) => {
  if (!acc[el[key]]) {
    acc[el[key]] = el.area;
  } else {
    acc[el[key]] = acc[el[key]] + el.area;
  }
  return acc;
}, {});
const paddocksByArea =  indexAllByKey(paddocks, 'paddockManagerId');

return paddockManagers.map(manager => ({
  name: manager.name,
  totalArea: paddocksByArea[manager.id],
})).sort(compare('totalArea'));

}

const a4 = () => {

  const res = [];
  paddocks.filter(paddock => farms.some(farm => paddockManagers.some(manager => {
    if ( farm.id === paddock.farmId && manager.id === paddock.paddockManagerId ){
      res.push({
        farm: farm.name,
        rut: manager.taxNumber
      })
    }
  })));

  const reduceGroupByFarm = (arr, key) => arr.reduce((acc, el) => {
    if(!acc[el[key]]){
      acc[el[key]] = [];
      acc[el[key]].push(el.rut);
    }else{
      acc[el[key]].push(el.rut);
    }
    return acc;
  }, {});

  return reduceGroupByFarm(res.sort(compare('farm')), 'farm');
}

// 5 Arreglo ordenado decrecientemente con los m2 totales de cada campo que tengan más de 2 hectáreas en Paltos
const a5 = () => {

  const farmsm2 = paddocks.filter(paddock => paddockType.some(type => {
    return ( paddock.paddockTypeId === type.id && type.name === "PALTOS" )
  })).reduce((acc, el) => {
    if (!acc[el.farmId]) {
      acc[el.farmId] = el.area;
    } else {
      acc[el.farmId] = acc[el.farmId] + el.area;
    }
    return acc;
  }, {});
  const res = [];
  Object.keys(farmsm2).filter(pos =>{
      if (farmsm2[pos] > 20000){
        res.push({[pos]: farmsm2[pos]}); 
      }
      return res;
  });

  return res;

}



// 6 Arreglo con nombres de los administradores de la FORESTAL Y AGRÍCOLA LO ENCINA, ordenados por nombre, que trabajen más de 1000 m2 de Cerezas
const a6 = () => {
  const res = [];
  // paddocks.filter(paddock => paddockType.some(type => farms.some(farm => paddockManagers.some(manager => {
  //   if( paddock.farmId === farm.id && 
  //       farm.name === 'FORESTAL Y AGRICOLA LO ENCINA' && 
  //       paddock.paddockTypeId === type.id && 
  //       type.name === 'CEREZAS' && 
  //       paddock.paddockManagerId === manager.id &&
  //       paddock.area > 1000 ) {
  //         res.push({
  //           name: manager.name,
  //           area: paddock.area
  //         });
  //   }
  // }))));

  paddocks.filter(paddock => {
    return paddock.area > 1000;
  }).filter(resultPaddock => paddockType.some(type => farms.some(farm => paddockManagers.some(manager => {
      if( resultPaddock.farmId === farm.id && 
          farm.name === 'FORESTAL Y AGRICOLA LO ENCINA' && 
          resultPaddock.paddockTypeId === type.id && 
          type.name === 'CEREZAS' && 
          resultPaddock.paddockManagerId === manager.id ) {
            res.push({
              name: manager.name,
              area: resultPaddock.area
            });
      }
  }))));

  return res;
}

// 7 Objeto en el cual las claves sean el nombre del administrador y el valor un arreglo con los nombres de los campos que administra, ordenados alfabéticamente
const a7 = () => {
  const infoPaddocks = [];
  paddocks.filter(paddock => paddockManagers.some(manager => farms.some(farm => {
    if ( paddock.farmId === farm.id && paddock.paddockManagerId === manager.id ){
      infoPaddocks.push({
        name: manager.name,
        farm: farm.name
      });
    }
  })));

  return infoPaddocks.sort(compare('farm')).reduce((acc, el) => {
    if ( !acc[el.name] ){
      acc[el.name] = [];
      acc[el.name].push(el.farm);
    }else{
      acc[el.name].push(el.farm);
    }
    return acc;
  }, {}) ;
}


// 8 Objeto en que las claves sean el tipo de cultivo concatenado con su año de plantación (la concatenación tiene un separador de guión ‘-’, por ejemplo AVELLANOS-2020) y el valor otro objeto en el cual la clave sea el id del administrador y el valor el nombre del administrador
const a8 = () => {
  const res = [];
  paddocks.filter(paddock => paddockType.some(type => paddockManagers.some(manager => {
    if( paddock.paddockTypeId === type.id && paddock.paddockManagerId === manager.id ){
      res.push({
        type_year: `${type.name} - ${paddock.harvestYear}`,
        managerId: manager.id,
        managerName: manager.name
      });   
    }
  })));

  return res.reduce((acc, el) => {
    if ( !acc[el.type_year] ){
      acc[el.type_year] = [];
      acc[el.type_year].push({
        [el.managerId]: el.managerName
      });
    }else{
      acc[el.type_year].push({
        [el.managerId]: el.managerName
      });
    }
    return acc;
  }, {});
}
console.time();
console.log(a8());
console.timeEnd();


/*

https://www.freecodecamp.org/news/reduce-f47a7da511a9/
*/