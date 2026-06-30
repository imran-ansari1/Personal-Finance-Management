import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import ConnectBankButton from "./components/ConnectbankButton";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#08111F]">
     

      <div className="flex flex-1 flex-col">
     
        <ConnectBankButton />

        <main className="p-8">
          {/* Dashboard Content */}
        </main>
      </div>
    </div>
  );
}
