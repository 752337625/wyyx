
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url, aliaName}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.aliaName = aliaName
    // this.duration = duration
    this.image = image
    // this.url = url
  }
}

function singerName (arr) {
  let name = []
  name = arr.map((item) => {
    // console.log(arr)
    return item.name
  })

  return name.join('/')
}


export function createRecommendListSong (music) {
   return new Song({
    id: music.id,
    singer: singerName(music.artists),
    name: music.name,
    // aliaName: music.song.alias.join('-'),
    album: music.album.name,
    image: music.album.picUrl
  }) 
}

