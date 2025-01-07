import CategoryCard from "../components/CategoryCard";

const Master = () => {
  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="flex justify-center items-center gap-6">
        <CategoryCard
          title="Kontak"
          subtitle="Data untuk kontak users"
          link="/master/kontak"
        />
        <CategoryCard
          title="Akun"
          subtitle="Data untuk akun-akun anda"
          link="/master/akun"
        />
      </div>
    </div>
  );
};

export default Master;
