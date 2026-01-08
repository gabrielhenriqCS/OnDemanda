export default function NavBar() {
  return (
      <nav className="flex items-center px-6 py-3 bg-blue-300 text-[27px] font-semibold">
      <div className="flex-2 text-left">OnComanda</div>
      <ul className="flex flex-row list-none gap-14 justify-center w-1/3">
        <li>
          <a href="/comanda">Comanda</a>
        </li>
        <li>
          <a href="/pedidos">Pedidos</a>
        </li>
        <li>
          <a href="/cozinha">Cozinha</a>
        </li>
          </ul>
          <div className="w-1/3"></div>
    </nav>
  );
}
