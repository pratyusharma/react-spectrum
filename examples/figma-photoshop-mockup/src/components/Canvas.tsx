import psIcon from 'figma:asset/0ec7736798cdeaba12a5f917ef5b17917b13ad77.png';

export function Canvas() {
  return (
    <div className="flex-1 bg-[#2A2A2A] p-8 relative">
      {/* Rulers */}
      <div className="absolute top-0 left-8 right-8 h-4 bg-[#323232] border-b border-[#444]"></div>
      <div className="absolute left-0 top-8 bottom-0 w-4 bg-[#323232] border-r border-[#444]"></div>
      
      {/* Canvas Content */}
      <div className="w-full h-full bg-[#1A1A1A] border border-[#444] flex items-center justify-center relative">
        {/* Canvas Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #444 25%, transparent 25%),
              linear-gradient(-45deg, #444 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #444 75%),
              linear-gradient(-45deg, transparent 75%, #444 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        ></div>
        
        {/* Image on Canvas */}
        <div className="w-96 h-64 bg-white rounded-lg shadow-lg overflow-hidden border border-[#666]">
          <img 
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc1ODgzNTY2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Golden Gate Bridge" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}