@playlists.each do |playlist|
  json.set! playlist.id do
    json.extract! playlist, :id, :title, :author_id
    json.author playlist.author.username

    json.song_ids playlist.songs.pluck(:id)

    if playlist.songs[0]
      json.photoUrl url_for(playlist.songs[0].album.photo);
    else
      json.photoUrl image_path("face.jpg")
    end
  end
end
