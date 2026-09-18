const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/components/ui');
const files = [
  'RecurringDonationPopup.tsx', 'AutoEmail.tsx', 'PeerToPeerPopup.tsx',
  'MemberdashPopup.tsx', 'AnnualReceiptPopup.tsx', 'TributesPopup.tsx',
  'CurrencySwitcherPopup.tsx', 'DonationUpsellPopup.tsx', 'StripePopup.tsx',
  'JovviePopup.tsx', 'ProductBasedDonation.tsx', 'DonorErpPopup.tsx',
  'CampaignPopup.tsx', 'CustomInputPopup.tsx', 'PaymentGatewayPopup.tsx',
  'DonorDashboardPopup.tsx'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log("File not found:", file);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  const regex = /\{\/\* Right Column - Image Section \*\/\}[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\*\s*✅ Only show local GoogleForm)/;
  
  const replacement = `{/* Right Column - Image Section */}
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
                <div className="rounded-2xl sm:rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl shadow-xl h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center overflow-hidden">
                  <img
                    src={\`https://picsum.photos/800/600?random=\${Math.floor(Math.random() * 1000)}\`}
                    alt="Random feature image"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>`;

  if (content.match(regex)) {
    content = content.replace(regex, replacement);
  } else {
    console.log("Regex didn't match in:", file);
  }

  // Also fix top margin on the mainCardRef by adding mt-16 lg:mt-0 to the wrapper
  // The outer wrapper is:
  // <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-5">
  // If we change it to:
  // <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-5 pt-20 sm:pt-24 overflow-y-auto">
  // That will push the popup down slightly if it's too tall, or add a mt-16 to mainCardRef.
  
  const outerWrapperRegex = /className="\s*fixed inset-0 z-50 bg-black\/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-5\s*"/g;
  content = content.replace(outerWrapperRegex, `className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-5 pt-20 sm:pt-24 overflow-y-auto"`);
  
  // Actually, "fixed Top margin in each component which those are rendered in @[src/components/NgoServicesSection.tsx]"
  // Could they mean `src/components/NgoServicesSection.tsx` itself? The `FeatureCard` margin?
  // I will also add `mt-16 sm:mt-24` to mainCardRef just in case.
  const cardRegex = /(className="[^"]*relative w-full max-w-6xl[^"]*)"/g;
  content = content.replace(cardRegex, '$1 mt-16 lg:mt-0"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Processed', file);
}
