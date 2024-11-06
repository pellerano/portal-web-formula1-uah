'use client';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  return (
    <>
      <Banner title="Brazil 2024" desc="Nov. 1 - 3" />
      <div className="flex justify-between w-full px-4 py-8 mx-auto md:px-6 lg:px-8">
        <div className="w-1/2 p-10 ml-4 ">
          <h1 className="mb-4 text-xl font-bold">Ultimas Votaciones</h1>
          <div className="flex flex-col gap-6 ">
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
            <Tile
              title="Votacion"
              desc="Fecha Limite: 5 Nov. 2024"
              sx="hover:bg-red-700 hover:text-white"
              redirectUrl={`/polls/${uuidv4()}`}
            />
          </div>
        </div>
        <div className="w-1/2 p-10 ml-4 bg-red-700 rounded drop-shadow-lg">
          <h1 className="mb-4 text-xl font-bold text-white">
            Ultimas Noticias
          </h1>
          <div className="flex flex-col gap-6">
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
            <Tile
              title="Noticia"
              desc="31 Oct. 2024"
              redirectUrl={`/blogs/${uuidv4()}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const Banner = ({ title, desc, track }) => {
  const TimeSegment = ({ time, segment }) => {
    return (
      <div className="text-center">
        <h1 className="text-6xl font-bold">{time}</h1>
        <p className="font-light">{segment}</p>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-8 mx-auto bg-red-700 md:px-6 lg:px-8">
      <div>
        <p className="pb-2 italic font-bold">Proxima Carrera</p>
        <div className="flex gap-2">
          <div className="flex items-center justify-center p-8 bg-white rounded">
            C
          </div>
          <div className="text-white">
            <h1 className="text-6xl font-bold ">{title}</h1>
            <p>{desc}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-around gap-6 p-10 bg-white rounded drop-shadow-lg">
          <TimeSegment time="00" segment="HORAS" />
          <TimeSegment time="00" segment="MINUTOS" />
          <TimeSegment time="00" segment="SEGUNDOS" />
        </div>
      </div>
    </div>
  );
};

const Tile = ({ title, desc, imgUrl, redirectUrl, sx }) => {
  return (
    <a
      className={`flex p-3 bg-white rounded cursor-pointer drop-shadow-md ${sx}`}
      href={redirectUrl}
    >
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p>{desc}</p>
      </div>
    </a>
  );
};
