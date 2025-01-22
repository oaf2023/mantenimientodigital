export const SidebarFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-auto p-4 text-center text-sm text-muted-foreground border-t">
      <p>© {currentYear} Manejadatos - Argentina</p>
      <p>Todos los derechos reservados ®</p>
    </div>
  );
};