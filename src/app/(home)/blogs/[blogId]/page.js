import moment from 'moment';

export default function Blogs({ params }) {
  // Blog ID:
  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <h1 className="text-4xl font-bold text-red-700">{params.blogId}</h1>
      <p className="font-light">{moment().format('LLL')}</p>
      <div className="w-1/2 mt-10 text-justify">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan
          malesuada turpis, quis molestie risus placerat vitae. Fusce id magna
          dui. Sed in velit sit amet nisi sollicitudin condimentum. Quisque
          ultrices metus magna, id hendrerit enim commodo a. Pellentesque
          sodales lectus orci, et feugiat augue rhoncus vel. Nunc est quam,
          tempor vitae mollis quis, lacinia vitae lectus. Morbi molestie a lacus
          ac tincidunt. Morbi aliquam non tellus at rhoncus. Duis sit amet nibh
          vitae nunc accumsan lacinia. Mauris et augue id nisl mollis tincidunt
          sed a sapien. In gravida nibh in tincidunt pharetra. Mauris ultricies,
          turpis quis sagittis luctus, eros odio ultrices magna, sed vehicula
          elit urna et urna. Maecenas nec lobortis purus. Aliquam ornare tortor
          ut ipsum rutrum, vitae ultricies lorem lobortis. Quisque sollicitudin
          eget turpis sit amet eleifend. Quisque tempus augue non felis
          molestie, et viverra felis iaculis. Aenean placerat nisi id elit
          eleifend tristique ut sed eros. Integer est elit, euismod a tincidunt
          quis, mollis sit amet dolor. Phasellus semper, lorem id malesuada
          congue, est justo venenatis sapien, a suscipit risus nisi eget ante.
          Morbi consectetur aliquet enim, nec viverra velit convallis ac. Mauris
          pharetra arcu quis enim tincidunt, ut ornare neque fringilla. Aenean
          vitae libero non elit hendrerit luctus ut sit amet leo. Maecenas ut
          velit tellus. Integer at nunc ligula. In hac habitasse platea
          dictumst. Nunc molestie, nisi non varius suscipit, nulla sem suscipit
          eros, quis faucibus mauris enim at ligula. Fusce in eros lobortis,
          tempor nisi et, mollis mi. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Etiam in tincidunt dui, quis viverra purus.
          Suspendisse dolor erat, efficitur in dui fringilla, luctus porta
          libero. Cras euismod orci nec eleifend finibus. Nunc lobortis molestie
          lectus ac mollis. Fusce vitae lectus placerat, scelerisque quam ac,
          aliquam orci. Sed vehicula quis leo vitae mattis. Quisque pellentesque
          pellentesque congue. Fusce suscipit felis nec velit blandit varius.
          Nunc iaculis sapien sit amet velit imperdiet, nec malesuada neque
          rhoncus. Donec semper urna libero, at ullamcorper felis aliquam et.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Duis aliquam vulputate vestibulum. Proin cursus
          eros et nulla pellentesque, sit amet malesuada sapien ultrices.
          Pellentesque laoreet velit eget varius imperdiet. Nam dictum dui nec
          pharetra dictum. Aliquam erat volutpat. Aliquam diam diam, vulputate
          at consectetur ut, blandit a quam. Morbi rutrum, turpis nec commodo
          accumsan, augue nunc consequat nunc, mattis ultrices ligula erat eget
          lorem. Pellentesque tincidunt, mi in placerat malesuada, augue erat
          congue ipsum, ut molestie elit arcu non justo. Quisque id feugiat
          elit, nec sollicitudin nibh. Sed nisi enim, semper ornare dui non,
          feugiat convallis dolor. Maecenas placerat libero vitae justo molestie
          viverra. Nunc ut bibendum libero. Maecenas in sollicitudin magna. Nam
          eget urna molestie, pellentesque nisl condimentum, ultrices magna.
          Morbi et condimentum nulla. Ut vitae quam ac ante efficitur suscipit.
          Integer in blandit dolor. Etiam vel odio interdum libero ultrices
          mollis. Nunc quis ex convallis, cursus risus non, commodo odio.
        </p>
      </div>
    </div>
  );
}
