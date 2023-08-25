import Specialpin from './specialpin.js';

export const HARDCODEDSPECIALPINS = [
  new Specialpin(
    'sp01',
    'Lohijoki',
    'Kiiminkijoki',
    {
      latitude: 65.1906,
      longitude: 25.3281,
    },
    'Kiiminkijoki on tunnettu lohijoki, johon lohet nousevat kutemaan vuosi toisensa jälkeen.',
    '',
    require('../assets/markers/lohijoki.png'),
  ),

  new Specialpin(
    'sp02',
    'Puolanka',
    'Puolanka',
    {
      latitude: 64.8679,
      longitude: 27.6735,
    },
    `Puolangalla on metsästysalueita, joiden riistalajeina ovat kanalinnut, vesilinnut, pienpedot, jänis ja majava. Mitään varsinaista nähtävää Puolangalla ei kuitenkaan ole, joten mitäpä se hyvejää Puolangalle lähteä. Myös ruoka Puolangalla on pahaa, joten Puolangalle erehtyneen matkailijan on syytä pysytellä omissa eväissä. 
      
Puolanka järjestää maankuulut pessimismipäivät joka vuosi 1.1-31.12.`,
    '',
    require('../assets/markers/puolanka.png'),
  ),
]
