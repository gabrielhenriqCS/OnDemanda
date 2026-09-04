export default function NavBar() {
  return (
      <div className="flex items-center py-2 gap-8  text-[23px] font-semibold">
      <span className="font-bold text-2xl ml-2">OnComanda</span>
      <nav className="hidden md:flex gap-6 ">

          <a href="/dashboard" className="font-medium hover:border-b-2 pb-1">Dashboard</a>
        
          <a href="/comanda" className="font-medium hover:border-b-2 pb-1">Comanda</a>
        
        
          <a href="/pedidos" className="font-medium hover:border-b-2 pb-1">Pedidos</a>
        
          <a href="/cozinha" className="font-medium hover:border-b-2 pb-1">Cozinha</a>
        
          </nav>
    </div>
  );
}
