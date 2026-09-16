export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-2xl font-black text-white">About Apex Tech</h1>
      <p className="text-sm text-textMuted leading-relaxed">
        Apex Tech is a South African online retailer specialising in monitors, laptops,
        graphics cards, pre-built PCs and gaming accessories. We source components from
        trusted brands and back every purchase with local warranty support.
      </p>
      <p className="text-sm text-textMuted leading-relaxed">
        This storefront was built as part of the SEN371 Software Engineering project,
        demonstrating a full MERN-style stack (React, Node/Express, MySQL) with real
        authentication, cart, wishlist and order flows.
      </p>
    </div>
  );
}
