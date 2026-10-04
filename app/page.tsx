import ScriptsLoader from "./ScriptsLoader";

export default function Home() {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="i-out" viewBox="0 0 14 14">
          <path
            d="M3.5 10.5L10.5 3.5M5 3.5h5.5V9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </symbol>
      </svg>

      <a className="skip" href="#menu">
        Skip to the menu
      </a>

      <header className="nav">
        <a className="brand" href="#top" aria-label="The Swiss Waffle Co., back to top">
          <svg viewBox="154 135 918 616" aria-hidden="true">
            <path d="M489.1 743.3C486.1 740.8 485.5 731.3 483.7 661.2C482.3 604.1 483.9 609.6 468.1 608.5C454.9 607.6 453.8 606.5 453.2 594.4C452.5 581.0 454.5 579.0 468.6 579.0C480.1 579.0 482.4 577.0 483.4 566.0C485.2 547.5 488.8 539.1 499.3 529.4C507.5 521.9 512.5 519.7 528.8 517.0C561.9 511.3 567.3 513.6 565.6 532.3C564.5 544.4 561.7 547.0 550.2 547.0C542.9 547.0 531.7 549.7 527.6 552.4C521.5 556.3 519.1 567.3 523.2 572.5C525.3 575.2 525.3 575.2 537.4 574.6C557.1 573.5 559.5 575.2 559.5 590.6C559.5 604.4 559.0 604.7 540.0 605.5C519.4 606.2 521.5 600.9 521.6 652.3C521.6 675.5 522.2 703.5 522.9 714.6C524.7 743.6 524.5 743.9 504.1 744.7C492.7 745.2 491.3 745.1 489.1 743.3ZM608.4 743.6C606.7 742.9 604.9 741.4 604.5 740.4C604.0 739.3 603.2 711.5 602.8 678.5C601.9 613.0 601.9 613.4 598.9 609.6C597.0 607.1 596.4 607.0 587.8 607.0C572.8 607.0 569.0 603.6 569.0 590.2C569.0 579.3 569.9 578.6 584.9 578.0C600.9 577.3 601.0 577.2 602.2 561.8C603.6 543.7 608.3 533.4 618.7 525.4C627.3 518.9 644.5 514.1 662.0 513.3C677.9 512.7 681.9 513.8 683.8 519.3C686.1 526.5 682.0 542.3 677.1 545.0C676.0 545.5 671.2 546.0 666.3 546.0C650.6 546.1 646.1 547.8 640.6 555.9C637.2 561.0 636.2 567.6 638.3 570.5C639.6 572.2 641.1 572.4 654.6 572.5C671.0 572.7 673.2 573.3 675.0 578.4C676.3 582.2 676.3 591.9 674.9 595.9C673.3 600.5 671.3 601.1 656.7 601.6C635.1 602.3 635.5 601.8 637.6 624.5C639.8 649.3 641.2 687.1 640.8 712.2C640.5 738.2 640.1 739.6 633.7 742.8C629.6 744.8 612.2 745.4 608.4 743.6ZM407.6 734.2C404.0 728.4 402.8 728.0 390.4 728.7C365.6 730.0 352.2 719.3 346.5 693.5C341.0 669.0 350.0 647.5 369.8 637.2C379.8 632.0 383.6 631.0 396.7 630.6C402.6 630.4 408.3 629.9 409.3 629.5C416.5 626.6 406.3 608.3 396.5 606.4C391.7 605.5 382.1 606.6 375.2 608.7C370.4 610.2 369.6 610.3 367.2 608.9C364.5 607.4 364.5 607.4 364.5 595.5C364.5 574.8 365.8 573.7 389.7 573.2C411.9 572.7 424.3 576.6 432.5 586.6C437.2 592.3 444.7 608.1 446.0 614.9C447.1 621.0 447.2 675.4 446.1 706.1C445.2 732.9 445.4 732.6 429.4 735.5C411.4 738.9 410.5 738.8 407.6 734.2ZM231.6 729.4C230.7 728.6 229.8 726.9 229.5 725.7C228.5 721.0 226.0 704.9 224.5 693.5C223.7 686.9 222.1 677.5 221.0 672.5C220.0 667.5 218.2 655.9 217.0 646.5C215.8 637.1 214.0 624.3 212.9 618.0C211.9 611.7 209.7 597.3 208.0 586.0C206.3 574.7 204.2 561.0 203.3 555.5C200.3 536.9 200.4 531.5 203.5 528.4C206.1 525.8 206.5 525.7 214.8 526.2C225.7 526.9 230.6 528.8 232.4 533.2C234.4 537.8 244.7 589.7 246.1 601.6C246.7 607.0 248.3 616.0 249.5 621.5C250.8 627.0 252.1 633.3 252.5 635.5C254.6 647.5 257.0 644.5 266.4 618.0C270.2 607.1 272.3 604.0 275.9 604.0C280.7 604.0 283.0 607.4 292.0 627.9C301.2 649.0 303.8 648.4 307.9 624.5C309.0 617.9 310.6 608.9 311.4 604.5C313.2 594.6 316.6 572.3 318.0 561.0C318.6 556.3 320.2 548.1 321.6 542.7C326.0 524.8 328.0 523.0 344.0 523.0C362.5 523.0 363.7 525.2 359.0 551.0C356.0 567.4 351.0 592.0 347.9 606.0C344.7 620.1 343.2 627.2 340.7 640.5C339.8 644.9 338.0 653.5 336.6 659.5C335.1 665.5 333.1 675.2 332.0 681.0C331.0 686.8 329.4 694.9 328.6 699.0C327.8 703.1 326.7 709.4 326.1 713.0C323.9 726.2 321.3 731.0 316.5 731.0C312.7 731.0 308.0 726.1 296.3 710.2C272.2 677.2 271.6 676.8 264.6 690.1C256.3 705.9 254.1 710.0 249.6 717.7C242.6 729.8 236.2 734.0 231.6 729.4ZM708.6 725.8C704.8 722.6 704.4 717.8 703.0 664.2C701.4 600.3 700.1 564.5 698.9 555.0C697.0 539.1 697.2 520.8 699.3 517.6C702.0 513.5 706.7 512.0 716.2 512.1C730.6 512.2 735.5 515.8 734.7 526.0C734.5 528.5 734.9 572.4 735.6 623.5C736.8 725.2 737.0 721.8 731.2 725.6C729.3 726.9 725.9 727.5 719.9 727.8C712.0 728.2 711.2 728.0 708.6 725.8ZM796.8 724.0C780.1 719.8 766.5 707.1 756.8 686.3C751.5 675.0 750.7 669.0 751.2 641.7C751.8 612.4 754.0 604.8 767.5 585.5C780.4 567.1 810.9 557.8 829.8 566.5C851.0 576.2 861.7 595.4 859.0 619.0C856.5 641.0 841.4 650.9 805.1 654.5C793.8 655.6 789.1 656.5 787.8 657.7C784.8 660.4 785.5 666.4 789.7 674.7C798.2 691.8 808.5 694.6 833.9 687.0C852.1 681.5 852.4 681.7 854.6 698.5C856.9 715.9 856.7 716.4 844.5 721.2C836.7 724.2 836.0 724.3 818.5 724.6C808.6 724.8 798.8 724.5 796.8 724.0ZM925.3 723.0C915.8 718.2 912.1 708.0 911.3 684.5C910.1 648.9 914.1 636.3 928.4 629.9C936.7 626.3 947.9 628.9 952.0 635.4C954.4 639.4 957.0 651.3 957.0 658.6C957.0 665.6 954.1 669.0 948.2 669.0C942.4 669.0 940.6 666.5 940.3 657.7C939.9 649.5 938.2 646.0 934.4 646.0C929.6 646.0 926.4 662.7 927.2 682.9C927.8 698.9 932.4 705.6 943.6 706.7C951.3 707.4 953.0 709.0 953.0 715.0C953.0 723.1 951.1 724.4 939.3 724.8C930.9 725.1 928.9 724.8 925.3 723.0ZM986.2 723.9C977.5 721.3 972.1 711.4 969.0 692.6C967.4 682.6 971.5 662.1 976.4 655.7C981.7 648.8 984.9 647.5 997.2 647.5C1010.6 647.5 1011.8 648.3 1018.0 660.6C1022.5 669.5 1022.5 669.5 1022.5 680.5C1022.5 699.3 1014.7 717.0 1003.9 722.6C1000.2 724.5 990.4 725.2 986.2 723.9ZM1033.2 722.8C1030.5 720.1 1033.0 713.0 1036.8 713.0C1038.7 713.0 1041.0 716.0 1041.0 718.5C1041.0 722.9 1036.0 725.6 1033.2 722.8ZM1001.5 705.6C1006.0 698.8 1007.2 680.2 1004.0 669.6C1001.2 660.6 997.0 658.6 991.2 663.5C981.2 671.9 980.6 697.1 990.1 705.7C994.2 709.4 999.1 709.3 1001.5 705.6ZM404.8 694.3C408.8 692.4 413.0 685.6 413.0 680.8C413.0 676.5 407.7 665.7 404.3 663.0C395.6 656.2 377.6 668.9 377.6 681.8C377.6 694.1 391.6 700.5 404.8 694.3ZM816.4 620.9C823.7 618.9 827.4 612.2 824.6 605.6C820.1 594.8 805.1 595.9 793.6 607.9C787.2 614.6 786.2 618.6 790.2 621.5C792.7 623.3 808.5 622.9 816.4 620.9ZM1004.6 616.0C999.5 611.5 998.0 608.1 997.9 600.8C997.7 582.0 995.9 579.0 985.3 579.0C978.2 579.0 979.1 578.4 969.2 589.8C963.0 596.9 956.0 595.9 950.3 587.0C945.0 578.6 945.1 578.7 935.4 578.1C924.2 577.4 920.2 575.3 918.0 569.2C915.1 560.7 922.4 553.0 933.5 553.0C944.7 553.0 948.0 550.7 948.0 543.0C948.0 535.7 945.2 534.0 932.8 533.9C796.7 532.5 798.5 532.6 795.7 530.7C787.3 525.2 787.1 514.6 795.4 510.6C798.5 509.1 806.0 509.0 870.5 509.0C951.0 509.1 945.3 509.7 949.1 501.5C952.2 494.9 956.1 492.0 961.9 492.0C968.1 492.0 970.6 494.0 974.0 501.5C977.1 508.5 978.0 509.0 985.5 509.0C993.1 509.0 995.4 507.6 999.0 500.9C1003.2 493.0 1006.3 490.7 1011.9 491.3C1017.8 492.0 1021.1 494.7 1023.5 501.1C1025.8 507.0 1028.4 509.0 1033.8 509.0C1040.8 509.0 1046.0 513.1 1047.4 519.7C1048.9 526.3 1042.2 533.3 1033.3 534.5C1026.6 535.4 1024.5 537.6 1024.5 544.1C1024.5 551.8 1025.7 552.4 1041.3 553.0C1056.6 553.7 1058.9 554.6 1061.6 561.6C1066.3 574.0 1058.6 580.8 1040.8 579.8C1025.8 578.9 1024.4 580.2 1023.6 596.4C1022.7 612.3 1019.9 617.7 1012.2 618.7C1008.9 619.1 1007.8 618.8 1004.6 616.0ZM994.1 551.1C997.2 548.6 997.5 540.3 994.7 537.2C992.5 534.8 982.9 533.4 979.7 535.1C974.6 537.9 973.2 545.5 977.1 550.4C979.8 553.8 990.2 554.3 994.1 551.1ZM426.0 518.2C423.7 517.1 421.7 515.0 420.2 511.9C418.0 507.4 418.0 507.4 417.9 445.4C417.9 408.3 417.5 382.0 416.9 379.7C415.3 373.6 412.2 372.8 392.3 373.2C370.6 373.6 372.0 371.9 372.0 397.0C372.0 419.5 372.3 420.3 381.4 421.3C398.5 423.0 398.6 441.4 381.5 444.5C373.2 446.0 372.3 447.7 371.7 463.7C371.2 476.1 370.2 478.7 364.7 482.0C360.5 484.6 356.4 484.5 352.4 481.8C346.9 478.0 345.7 474.9 344.9 461.6C344.0 447.3 344.5 449.5 341.8 447.0C339.8 445.1 338.4 445.0 321.9 445.0C312.1 445.0 303.4 445.3 302.5 445.6C299.2 446.9 297.8 452.0 297.1 465.3C296.4 478.3 296.4 478.3 293.2 481.1C289.3 484.6 284.9 484.9 280.3 482.0C275.2 478.9 274.0 475.3 273.3 461.9C272.5 446.0 272.3 445.8 259.8 444.9C244.7 443.8 239.0 439.8 240.4 431.2C241.5 423.9 247.0 421.0 259.5 421.0C273.1 421.0 273.4 420.3 273.9 389.0C274.1 380.3 272.0 375.0 268.0 373.9C266.6 373.5 258.0 373.2 248.9 373.1C226.4 373.0 227.7 371.5 226.9 397.5C226.1 419.0 225.2 422.5 219.5 426.0C213.6 429.7 206.8 427.6 201.6 420.7C199.7 418.1 199.5 416.3 199.2 399.7C198.8 372.3 199.2 373.0 183.0 373.0C167.0 373.0 160.9 369.4 160.6 360.0C160.4 351.0 167.4 346.8 183.7 346.2C199.1 345.6 198.4 346.6 198.8 324.2C199.0 314.6 198.9 305.6 198.5 304.3C197.6 300.7 192.5 299.0 182.3 299.0C166.1 298.9 161.0 296.3 161.0 287.9C161.0 278.6 165.9 276.1 183.6 276.0C197.5 276.0 198.3 275.3 199.0 263.3C200.2 244.7 213.0 236.3 223.0 247.6C224.6 249.5 226.0 251.2 226.1 251.3C226.1 251.4 226.5 256.1 226.9 261.7C227.9 276.6 227.0 276.0 249.7 276.0C268.2 276.0 268.2 276.0 271.1 273.1C273.9 270.2 274.0 269.9 273.9 260.3C273.7 231.6 272.6 229.0 261.6 229.0C245.7 229.0 236.5 220.4 241.7 210.4C244.6 204.8 248.8 203.0 259.3 203.0C272.0 203.0 272.5 202.4 273.4 185.4C274.4 167.8 277.1 162.8 285.4 162.8C294.5 162.8 297.1 167.3 297.5 184.0C298.0 203.4 297.5 203.0 322.5 203.0C345.7 203.0 345.0 203.5 345.0 185.4C345.0 171.2 346.1 167.9 352.4 164.1C356.6 161.5 358.3 161.5 363.6 164.0C370.3 167.3 371.1 169.3 371.9 185.1C372.7 202.3 372.5 202.0 385.1 202.9C395.3 203.7 397.7 204.6 400.9 208.6C403.5 211.9 403.6 216.9 401.1 221.8C398.3 227.1 395.8 228.2 385.2 228.9C371.5 229.8 371.8 229.2 372.2 253.8C372.5 271.6 372.7 273.3 374.4 274.6C376.8 276.3 407.9 276.6 412.7 275.0C416.8 273.5 418.0 270.3 418.0 260.4C418.0 249.7 419.5 246.6 425.7 243.8C436.2 239.2 443.0 245.9 443.0 260.8C443.0 268.9 444.1 273.8 446.3 275.2C447.0 275.6 453.2 276.0 460.1 276.0C474.7 276.0 478.2 276.9 481.0 281.5C483.9 286.3 483.6 291.3 480.1 295.2C477.2 298.5 477.2 298.5 462.7 298.8C443.0 299.3 444.2 297.8 443.8 322.1C443.5 346.0 443.2 345.4 456.1 346.3C461.2 346.7 467.3 347.0 469.8 347.0C473.7 347.0 474.8 347.5 478.6 351.4C484.7 357.4 484.8 362.2 479.1 368.3C475.1 372.5 475.1 372.5 461.5 373.0C448.8 373.5 447.7 373.7 446.0 375.8C444.3 377.9 444.1 381.9 443.8 443.3C443.5 508.5 443.5 508.5 441.2 512.7C437.6 519.5 432.4 521.4 426.0 518.2ZM730.0 466.7C722.3 463.9 712.9 455.0 708.0 445.8C706.2 442.5 704.2 439.6 703.4 439.3C701.5 438.6 698.3 441.5 696.0 446.0C691.1 455.6 675.2 465.0 663.9 465.0C649.1 465.0 634.6 454.6 628.1 439.4C623.0 427.4 622.5 420.7 622.8 364.7C623.0 310.3 623.1 308.6 628.1 306.0C631.5 304.1 646.5 305.3 652.2 307.8C660.9 311.6 660.5 308.9 660.3 363.5C660.0 406.9 660.2 412.0 661.8 416.4C665.9 428.0 673.0 427.5 678.8 415.1C682.4 407.6 682.4 407.6 683.3 374.6C683.8 356.4 684.6 340.5 685.1 339.2C686.4 335.7 690.4 334.8 703.2 335.2C720.8 335.7 719.4 332.1 720.1 375.8C720.7 411.5 720.7 411.5 724.0 420.8C727.8 431.8 730.3 434.3 734.6 431.5C742.7 426.2 745.3 402.6 743.8 347.7C742.7 305.0 742.2 306.0 763.0 306.0C776.4 306.0 780.4 307.4 783.2 313.0C787.7 322.0 783.3 413.6 777.6 429.6C770.5 449.8 757.3 463.7 742.2 466.9C735.7 468.3 734.4 468.2 730.0 466.7ZM890.9 466.6C878.6 463.2 866.7 453.5 864.1 444.9C861.9 437.7 861.5 427.0 863.3 422.8C865.5 417.6 868.3 416.1 878.1 415.4C892.8 414.3 897.2 417.1 899.4 428.9C900.9 436.7 903.0 440.0 906.5 440.0C913.9 440.0 916.1 430.7 911.1 420.6C908.0 414.2 905.7 411.8 894.0 402.5C867.8 381.7 862.5 373.8 861.3 354.0C859.9 329.7 867.7 314.0 885.5 305.0C892.5 301.5 892.5 301.5 908.9 301.2C929.5 300.7 934.1 302.1 943.5 311.5C952.8 320.9 953.5 322.8 953.4 340.0C953.4 356.6 952.2 361.8 948.0 365.4C941.9 370.5 925.3 369.7 919.6 364.0C916.6 361.1 916.5 360.6 915.9 349.7C915.3 337.1 914.8 335.2 911.5 334.4C905.3 332.9 900.8 337.0 899.5 345.6C898.0 355.6 900.5 361.7 908.7 368.8C911.9 371.6 919.5 378.2 925.7 383.5C939.4 395.2 944.6 402.0 949.5 414.2C957.7 434.7 951.9 454.6 935.4 462.1C923.7 467.4 901.9 469.6 890.9 466.6ZM997.2 466.9C988.5 465.8 982.5 462.7 975.6 455.7C967.8 447.7 965.7 442.7 965.6 432.5C965.5 419.8 969.1 416.4 983.5 415.3C996.4 414.3 1002.0 418.5 1004.0 430.7C1005.7 440.8 1010.8 443.0 1016.0 435.8C1017.6 433.6 1019.0 430.5 1019.0 429.0C1019.0 424.8 1012.1 414.7 1004.9 408.3C1001.3 405.1 993.7 398.5 988.1 393.6C976.8 383.7 968.5 373.3 966.4 366.3C964.5 360.1 964.6 342.3 966.5 334.1C969.4 321.9 979.5 309.5 990.6 304.4C1003.1 298.6 1026.9 299.2 1039.1 305.6C1055.3 314.1 1061.1 327.7 1058.1 349.8C1056.0 365.8 1052.5 369.1 1038.5 368.3C1023.4 367.4 1021.5 365.3 1020.4 348.4C1019.6 336.1 1019.1 334.5 1015.5 333.6C1007.5 331.6 1000.5 343.8 1003.3 354.7C1005.2 361.8 1008.7 365.8 1024.7 379.2C1040.5 392.4 1047.2 400.2 1052.4 410.9C1065.7 438.8 1052.6 463.5 1022.5 467.0C1012.3 468.1 1006.3 468.1 997.2 466.9ZM810.8 463.3C807.3 462.8 803.4 458.7 802.6 454.9C801.7 450.1 801.9 354.9 803.0 334.0C804.4 305.0 805.7 303.5 826.3 308.0C839.2 310.9 839.0 310.8 840.6 314.5C841.7 317.3 841.8 321.8 841.0 341.2C840.5 354.0 840.0 384.9 840.0 409.8C840.0 458.0 839.8 460.4 835.2 462.9C833.3 463.9 816.7 464.2 810.8 463.3ZM543.2 462.0C520.6 459.6 507.0 442.3 507.0 415.9C507.0 400.3 510.5 397.3 527.6 398.3C542.5 399.2 544.3 400.9 545.4 416.0C546.1 425.3 548.0 428.4 553.7 428.8C560.9 429.3 565.0 422.6 563.0 413.3C560.7 403.3 556.5 397.8 541.4 385.4C511.1 360.5 505.7 348.0 509.0 311.0C511.9 279.4 518.0 268.3 537.2 260.4C546.4 256.6 546.6 256.6 560.0 256.5C573.5 256.5 573.5 256.5 581.4 260.5C591.9 265.9 597.6 272.1 601.4 282.6C604.2 290.1 604.4 291.5 604.8 309.5C605.4 338.6 604.8 339.5 584.5 339.1C567.9 338.8 567.1 337.8 567.0 316.2C567.0 304.5 565.8 299.9 562.5 298.6C556.7 296.4 549.3 300.2 547.2 306.5C544.7 313.8 546.0 335.4 549.2 341.6C553.3 349.4 561.1 357.3 573.9 366.3C591.8 379.0 596.8 384.4 601.3 396.2C606.0 408.7 606.3 416.8 602.4 429.2C597.9 443.5 595.7 446.5 584.9 454.0C573.7 461.7 562.1 463.9 543.2 462.0ZM342.1 418.0C343.7 415.8 344.0 413.1 344.2 396.2C344.5 376.8 344.5 376.8 342.0 374.8C339.9 373.1 338.8 372.9 334.5 373.6C331.8 374.1 323.5 374.4 316.2 374.2C297.2 373.9 297.8 373.1 298.2 397.6C298.6 422.4 297.3 421.1 322.2 420.8C340.2 420.5 340.3 420.5 342.1 418.0ZM309.0 402.4C307.0 397.2 307.8 387.1 310.4 384.5C315.1 379.8 324.9 380.4 325.8 385.4C326.2 387.2 319.9 397.1 315.2 402.2C312.0 405.7 310.2 405.7 309.0 402.4ZM269.2 344.9C272.8 343.0 273.4 340.0 273.2 322.6C273.1 313.3 272.8 304.9 272.5 303.9C271.2 299.7 267.5 299.1 248.7 299.7C225.7 300.5 227.5 298.5 227.5 323.2C227.5 348.6 226.5 347.5 250.4 346.5C259.8 346.1 268.3 345.4 269.2 344.9ZM342.5 343.9C344.4 342.1 344.5 340.6 344.5 323.0C344.5 297.7 346.2 299.4 321.3 299.7C296.6 299.9 298.5 298.0 298.5 323.1C298.5 348.4 296.9 346.8 322.1 346.2C338.6 345.8 340.7 345.6 342.5 343.9ZM413.7 344.5C417.1 342.1 418.0 336.9 418.0 320.3C418.0 298.6 418.9 299.4 394.8 299.8C370.6 300.1 372.5 298.2 372.5 323.0C372.6 347.9 370.9 346.0 393.9 346.0C408.1 346.0 412.0 345.7 413.7 344.5ZM379.5 333.1C379.2 332.6 378.9 328.3 378.7 323.6C378.5 316.0 378.7 314.8 380.7 312.9C383.2 310.4 390.0 309.5 397.0 310.7C404.4 312.1 403.8 314.4 393.2 325.0C384.7 333.4 381.1 335.6 379.5 333.1ZM236.0 331.1C235.5 330.0 235.0 325.9 235.0 322.0C235.0 311.0 239.2 308.1 251.4 310.9C259.0 312.7 258.7 313.8 247.8 325.3C240.2 333.2 237.8 334.4 236.0 331.1ZM309.0 330.4C307.7 327.2 307.7 317.9 308.9 314.7C310.3 311.2 315.0 309.6 321.7 310.4C331.7 311.6 332.3 314.0 324.8 321.4C321.9 324.2 318.3 328.0 316.7 329.8C313.4 333.7 310.3 334.0 309.0 330.4ZM821.3 292.9C817.0 291.6 812.0 285.5 809.1 278.0C806.6 271.8 806.6 271.7 808.4 266.6C815.7 245.7 832.7 244.0 841.6 263.4C844.8 270.4 844.5 275.6 840.2 284.0C836.0 292.4 829.6 295.5 821.3 292.9ZM342.1 273.1C345.0 270.2 345.0 270.2 345.0 253.7C345.0 231.3 343.3 227.8 333.5 230.0C331.5 230.5 323.3 230.7 315.4 230.4C296.9 229.9 298.0 228.6 298.0 251.7C298.0 269.7 298.6 273.0 302.4 274.8C303.6 275.4 312.1 275.9 321.8 275.9C339.2 276.0 339.2 276.0 342.1 273.1ZM309.0 259.1C307.3 255.8 307.8 242.2 309.7 238.9C311.9 235.3 313.5 234.8 323.0 235.2C330.5 235.5 330.5 235.5 330.8 238.7C331.1 241.6 330.2 243.0 323.9 249.7C312.7 261.7 311.0 262.8 309.0 259.1ZM509.7 226.8C507.3 224.4 507.3 224.4 506.6 187.4C506.2 167.1 506.2 149.6 506.6 148.5C508.5 143.3 513.4 141.4 517.4 144.3C519.5 145.8 520.9 152.1 521.0 160.1C521.0 167.7 522.9 169.4 530.2 168.5C536.5 167.7 542.0 169.5 544.3 173.2C551.0 183.7 553.6 220.5 548.1 226.4C544.3 230.5 539.0 229.8 536.5 224.9C535.3 222.8 535.0 218.1 535.0 205.1C535.0 187.0 534.5 185.0 529.9 185.0C522.8 185.0 521.0 189.8 521.0 209.3C521.0 226.2 520.6 227.6 515.3 228.6C512.8 229.1 511.6 228.7 509.7 226.8ZM579.7 228.0C567.9 226.0 558.0 211.5 558.0 196.2C558.0 169.9 581.7 153.3 596.6 169.2C603.8 176.7 604.8 183.7 600.1 191.2C596.4 197.0 594.6 198.0 585.1 199.2C573.7 200.6 570.7 205.3 576.9 212.2C579.7 215.4 580.1 215.5 587.7 215.6C598.1 215.7 597.9 215.6 599.0 218.5C602.0 226.3 593.8 230.3 579.7 228.0ZM469.8 223.8C468.8 222.1 468.4 213.8 468.2 192.3C467.9 163.1 467.9 163.1 464.7 160.6C458.5 155.7 458.0 155.0 458.0 151.5C458.0 144.6 460.0 143.8 477.2 144.2C492.2 144.5 492.2 144.5 494.6 147.3C499.2 152.7 496.9 158.3 489.6 159.4C481.4 160.7 481.4 160.8 481.1 191.9C480.9 218.1 480.4 223.5 477.7 225.2C475.2 226.8 471.1 226.0 469.8 223.8ZM587.0 184.0C589.2 181.8 588.5 178.8 585.5 177.6C583.2 176.8 579.3 178.6 578.5 181.0C577.0 185.6 583.2 187.8 587.0 184.0Z" />
          </svg>
        </a>
        <nav className="links" aria-label="Sections">
          <a href="#inside">Inside a Swaffle</a>
          <a href="#menu">Menu</a>
          <a href="#hours">Hours</a>
          <a href="#about">About</a>
          <a href="#find">Outlets</a>
          <a className="go" href="#order">
            Order
          </a>
        </nav>
        <button
          className="burger"
          type="button"
          aria-expanded="false"
          aria-controls="sheet"
          aria-label="Open navigation"
        >
          <i />
          <i />
        </button>
      </header>

      <div className="sheet" id="sheet" hidden>
        <ol>
          <li>
            <a href="#inside">Inside</a>
          </li>
          <li>
            <a href="#menu">Menu</a>
          </li>
          <li>
            <a href="#hours">Hours</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#find">Outlets</a>
          </li>
          <li>
            <a href="#order">Order</a>
          </li>
        </ol>
        <p>Open every day, 11:00 to 02:00. Aliganj, Indira Nagar and Gomti Nagar, Lucknow.</p>
      </div>

      <canvas id="gl" aria-hidden="true" />

      <div className="callouts" aria-hidden="true">
        <svg className="leaders">
          <g>
            <path pathLength={1} />
            <circle r="0" />
          </g>
          <g>
            <path pathLength={1} />
            <circle r="0" />
          </g>
          <g>
            <path pathLength={1} />
            <circle r="0" />
          </g>
          <g>
            <path pathLength={1} />
            <circle r="0" />
          </g>
        </svg>
        <article className="callout" data-i="0">
          <h3>
            The lid <span>Layer 1 of 3</span>
          </h3>
          <p>Golden and crisp on the ridges, soft in the pockets.</p>
        </article>
        <article className="callout" data-i="1">
          <h3>
            The filling <span>Layer 2 of 3</span>
          </h3>
          <p>
            Chocolate, Nutella, KitKat, brownie fudge, berry or cream cheese, depending on the
            Swaffle. It is served warm, so it stretches when the halves come apart.
          </p>
        </article>
        <article className="callout" data-i="2">
          <h3>
            The base <span>Layer 3 of 3</span>
          </h3>
          <p>The same batter as the lid. It holds the filling in place.</p>
        </article>
        <article className="callout" data-i="3">
          <h3>The finish</h3>
          <p>A drizzle, icing sugar or chocolate vermicelli, depending on the flavour.</p>
        </article>
      </div>

      <main>
        {/* 1 · hero */}
        <section id="top" className="sec hero is-red">
          <div id="slot-hero" className="slot">
            <img
              className="gl-fallback"
              src="/assets/img/social1.webp"
              alt="A Swaffle wedge with molten chocolate running out of the middle"
            />
          </div>
          <div className="hero-main">
            <h1 className="hero-title" aria-label="Layered Swissfully">
              <span className="ln" aria-hidden="true">
                Layered
              </span>
              <span className="ln" aria-hidden="true">
                Swissfully
              </span>
            </h1>
            <div className="hero-body">
              <p className="lede">
                A Swaffle is two crisp waffle halves with a molten filling pressed between them, cut
                into a wedge and served warm. 100% veg, eggless batter, open in Lucknow until
                2&nbsp;a.m.
              </p>
              <div className="ctas">
                <a
                  className="btn btn-solid"
                  href="https://zomato.onelink.me/xqzv/4qlgu1bo"
                  target="_blank"
                  rel="noopener"
                >
                  Order on Zomato
                  <svg aria-hidden="true">
                    <use href="#i-out" />
                  </svg>
                </a>
                <a
                  className="btn btn-line"
                  href="https://www.swiggy.com/menu/1275124?source=sharing"
                  target="_blank"
                  rel="noopener"
                >
                  Order on Swiggy
                  <svg aria-hidden="true">
                    <use href="#i-out" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <ul className="hero-meta">
            <li>
              <span className="k">Outlets</span>
              <span className="v">Aliganj, Indira Nagar, Gomti Nagar</span>
            </li>
            <li>
              <span className="k">Hours</span>
              <span className="v">Every day, 11:00 to 02:00</span>
            </li>
          </ul>
        </section>

        {/* 2 · the word */}
        <section id="word" className="sec is-red" aria-labelledby="word-h">
          <h2 id="word-h" className="sr">
            Swiss plus waffle makes Swaffle
          </h2>
          <div className="word-stage">
            <div className="word-wrap" aria-hidden="true">
              <span className="wk">S</span>
              <span className="wk">W</span>
              <span className="wk">A</span>
              <span className="wk">F</span>
              <span className="wk">F</span>
              <span className="wk">L</span>
              <span className="wk">E</span>
              <span className="wx">I</span>
              <span className="wx">S</span>
              <span className="wx">S</span>
              <span className="wx">W</span>
              <span className="wplus">
                <i />
                <i />
              </span>
            </div>
            <aside className="dict">
              <p className="dict-head">
                <b>swaffle</b> <i>noun</i> <span>plural swaffles</span>
              </p>
              <p>
                A layered waffle: two crisp halves with a molten filling, cut into a quarter-round
                wedge and served warm.
              </p>
              <p className="ety">
                From Swiss and waffle. The house name at The Swiss Waffle Co., Lucknow.
              </p>
            </aside>
          </div>
        </section>

        {/* 3 · the grid */}
        <section id="grid" className="sec is-red" aria-labelledby="grid-h">
          <div className="grid-stage">
            <div className="grid-copy">
              <h2 id="grid-h" className="h2">
                The pockets hold the sauce.
              </h2>
              <p className="body">
                The cross from the Swiss flag, stretched into a waffle grid. The iron presses that
                grid into the batter, and when the chocolate goes on, each square pocket catches
                some of it.
              </p>
              <ol className="steps">
                <li className="on">Swiss cross</li>
                <li>Waffle grid</li>
                <li>Filled pockets</li>
              </ol>
            </div>
            <div className="grid-art">
              <svg
                viewBox="0 0 500 500"
                role="img"
                aria-label="The Swiss cross stretching into a waffle grid whose pockets fill with chocolate"
              >
                <defs>
                  <linearGradient id="sauce" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#6A3318" />
                    <stop offset=".5" stopColor="#2A1209" />
                    <stop offset="1" stopColor="#170803" />
                  </linearGradient>
                </defs>
                <g className="g-pockets" fill="rgba(42,18,9,.2)">
                  <rect x="80" y="80" width="64" height="64" rx="16" />
                  <rect x="172" y="80" width="64" height="64" rx="16" />
                  <rect x="264" y="80" width="64" height="64" rx="16" />
                  <rect x="356" y="80" width="64" height="64" rx="16" />
                  <rect x="80" y="172" width="64" height="64" rx="16" />
                  <rect x="172" y="172" width="64" height="64" rx="16" />
                  <rect x="264" y="172" width="64" height="64" rx="16" />
                  <rect x="356" y="172" width="64" height="64" rx="16" />
                  <rect x="80" y="264" width="64" height="64" rx="16" />
                  <rect x="172" y="264" width="64" height="64" rx="16" />
                  <rect x="264" y="264" width="64" height="64" rx="16" />
                  <rect x="356" y="264" width="64" height="64" rx="16" />
                  <rect x="80" y="356" width="64" height="64" rx="16" />
                  <rect x="172" y="356" width="64" height="64" rx="16" />
                  <rect x="264" y="356" width="64" height="64" rx="16" />
                  <rect x="356" y="356" width="64" height="64" rx="16" />
                </g>
                <g className="g-sauce" fill="url(#sauce)">
                  <rect x="84" y="84" width="56" height="56" rx="13" />
                  <rect x="176" y="84" width="56" height="56" rx="13" />
                  <rect x="268" y="84" width="56" height="56" rx="13" />
                  <rect x="360" y="84" width="56" height="56" rx="13" />
                  <rect x="84" y="176" width="56" height="56" rx="13" />
                  <rect x="176" y="176" width="56" height="56" rx="13" />
                  <rect x="268" y="176" width="56" height="56" rx="13" />
                  <rect x="360" y="176" width="56" height="56" rx="13" />
                  <rect x="84" y="268" width="56" height="56" rx="13" />
                  <rect x="176" y="268" width="56" height="56" rx="13" />
                  <rect x="268" y="268" width="56" height="56" rx="13" />
                  <rect x="360" y="268" width="56" height="56" rx="13" />
                  <rect x="84" y="360" width="56" height="56" rx="13" />
                  <rect x="176" y="360" width="56" height="56" rx="13" />
                  <rect x="268" y="360" width="56" height="56" rx="13" />
                  <rect x="360" y="360" width="56" height="56" rx="13" />
                </g>
                <g className="g-lines" stroke="#fff" strokeWidth="14" strokeLinecap="round">
                  <line x1="20" y1="158" x2="480" y2="158" />
                  <line x1="20" y1="342" x2="480" y2="342" />
                  <line x1="158" y1="20" x2="158" y2="480" />
                  <line x1="342" y1="20" x2="342" y2="480" />
                  <line x1="20" y1="66" x2="480" y2="66" />
                  <line x1="20" y1="434" x2="480" y2="434" />
                  <line x1="66" y1="20" x2="66" y2="480" />
                  <line x1="434" y1="20" x2="434" y2="480" />
                </g>
                <rect className="hbar" x="90" y="202" width="320" height="96" fill="#fff" />
                <rect className="vbar" x="202" y="90" width="96" height="320" fill="#fff" />
              </svg>
            </div>
          </div>
        </section>

        {/* 4 · inside (pinned scene) */}
        <section id="inside" className="sec inside is-sugar on-sugar" aria-labelledby="inside-h">
          <div className="inside-stage">
            <div id="slot-center" className="slot">
              <img
                className="gl-fallback"
                src="/assets/img/social2.webp"
                alt="A Swaffle cut open to show its layers"
              />
            </div>
            <div id="slot-left" className="slot" />

            <header className="inside-head">
              <h2 id="inside-h" className="press-type">
                Three layers, taken apart.
              </h2>
              <div className="meter" aria-hidden="true">
                <div className="meter-row">
                  <span>Iron</span>
                  <b className="meter-state">Golden</b>
                </div>
                <div className="meter-bar">
                  <i />
                </div>
              </div>
            </header>

            <p className="pull-note">Pull a warm one apart and the filling comes with it.</p>

            <dl className="spec">
              <dt>Cut</dt>
              <dd>Quarter round</dd>
              <dt>Layers</dt>
              <dd>Lid, filling, base</dd>
              <dt>Batter</dt>
              <dd>Eggless</dd>
              <dt>Served</dt>
              <dd>Warm</dd>
            </dl>

            <div className="flv">
              <h2 className="h2">Pick your filling.</h2>
              <p className="flv-intro">
                Six of the fillings on the menu. Keep scrolling to go through them, or tap one.
              </p>
              <div className="chips" role="group" aria-label="Fillings">
                <button className="chip" type="button" data-f="0" aria-pressed="true">
                  Choco Dark
                </button>
                <button className="chip" type="button" data-f="1" aria-pressed="false">
                  Nutella
                </button>
                <button className="chip" type="button" data-f="2" aria-pressed="false">
                  KitKat
                </button>
                <button className="chip" type="button" data-f="3" aria-pressed="false">
                  Red Bliss
                </button>
                <button className="chip" type="button" data-f="4" aria-pressed="false">
                  Berry Bliss
                </button>
                <button className="chip" type="button" data-f="5" aria-pressed="false">
                  Aqua Oreo
                </button>
              </div>
              <div className="flv-card" aria-live="polite">
                <div className="flv-text">
                  <p className="flv-count">
                    <span className="flv-n">1</span> of 6
                  </p>
                  <h3 className="flv-name">Swiss Choco Dark</h3>
                  <p className="flv-desc">
                    Stuffed with dark chocolate. The one to pick if you like it bitter and intense.
                  </p>
                  <dl className="flv-meta">
                    <dt>Filling</dt>
                    <dd className="flv-in">Dark chocolate</dd>
                    <dt>Batter</dt>
                    <dd className="flv-bat">Classic golden</dd>
                  </dl>
                </div>
                <figure className="flv-photo">
                  <img
                    className="flv-img"
                    src="/assets/img/CA802417.webp"
                    alt="Swiss Choco Dark Swaffle on a white plate"
                  />
                  <figcaption>As it comes to the table</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · menu */}
        <section id="menu" className="sec menu is-sugar on-sugar" aria-labelledby="menu-h">
          <header className="menu-head">
            <h2 id="menu-h" className="h2">
              The full menu.
            </h2>
            <div className="menu-note">
              <p className="veg">
                <span className="veg-mark" aria-hidden="true" />
                100% veg, 56 items
              </p>
              <p>
                Seven sections. Items with a dot have a photo; point at one or tap it to put it on
                the plate. Prices are on Zomato and Swiggy.
              </p>
            </div>
          </header>
          <div className="mstage" id="mreel">
            <div className="mtrack">
              {/* Card 01 */}
              <article className="mcard t-gold" data-i="0" aria-labelledby="mc0-h">
                <div className="mc-text">
                  <p className="mc-num">
                    <span>01</span> / 07
                  </p>
                  <h3 id="mc0-h" className="mc-title">
                    Stuffed
                  </h3>
                  <p className="mc-line">
                    A filling sealed inside every one, from dark chocolate to Nutella and KitKat.
                    Plus the plain classic with honey or maple butter.
                  </p>
                  <div className="mc-groups">
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Surprise Stuffed Swaffles</span>
                        <span className="n">8</span>
                      </h4>
                      <ul className="mc-items">
                        <li>
                          <span className="mci">Swiss Choco Milk</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802417.webp"
                            data-desc="Stuffed with dark chocolate."
                          >
                            <span>Swiss Choco Dark</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802449.webp"
                            data-desc="Real KitKat pieces in a chocolate filling."
                          >
                            <span>Crispy KitKat Treat</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Butterscotch Crunch Pop</span>
                        </li>
                        <li>
                          <span className="mci">Swiss Mocha Rush</span>
                        </li>
                        <li>
                          <span className="mci">Fluffy Candy Cloud</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802515.webp"
                            data-desc="Filled with Nutella and cocoa."
                          >
                            <span>Choco Nutella Indulgence</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Berry Cream Cheese Bliss</span>
                        </li>
                      </ul>
                    </section>
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Classic Butter Swaffles</span>
                        <span className="n">1</span>
                      </h4>
                      <ul className="mc-items one">
                        <li>
                          <span className="mci">Golden Honey / Maple Butter</span>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <figure className="mc-plate">
                  <div className="plate">
                    <img
                      src="/assets/img/CA802449.webp"
                      alt="Crispy KitKat Treat"
                      data-default="1"
                    />
                  </div>
                  <figcaption>
                    <b className="pc-name">Crispy KitKat Treat</b>
                    <span className="pc-desc">Real KitKat pieces in a chocolate filling.</span>
                  </figcaption>
                </figure>
              </article>

              {/* Card 02 */}
              <article className="mcard t-cocoa" data-i="1" aria-labelledby="mc1-h">
                <div className="mc-text">
                  <p className="mc-num">
                    <span>02</span> / 07
                  </p>
                  <h3 id="mc1-h" className="mc-title">
                    Choco
                  </h3>
                  <p className="mc-line">
                    Chocolate on chocolate, with brownie fudge, nuts and Ferrero Rocher.
                  </p>
                  <div className="mc-groups">
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Choco Indulgence Swaffles</span>
                        <span className="n">7</span>
                      </h4>
                      <ul className="mc-items">
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802759.webp"
                            data-desc="Two premium chocolates melted together."
                          >
                            <span>Duo Choco Melt</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Milk Choco Overload</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802941.webp"
                            data-desc="Dark chocolate in every layer."
                          >
                            <span>Dark Choco Overload</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802867.webp"
                            data-desc="Brownie fudge with toasted almonds on top."
                          >
                            <span>Almond Brownie Fudge</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802799.webp"
                            data-desc="Milk, dark and white chocolate."
                          >
                            <span>Triple Choco Delight</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802832.webp"
                            data-desc="Brownie fudge with crunchy walnuts."
                          >
                            <span>Walnut Brownie Fudge</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Ferrero Rocher Temptation</span>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <figure className="mc-plate">
                  <div className="plate">
                    <img
                      src="/assets/img/social2.webp"
                      alt="Almond Brownie Fudge"
                      data-default="1"
                    />
                  </div>
                  <figcaption>
                    <b className="pc-name">Almond Brownie Fudge</b>
                    <span className="pc-desc">Brownie fudge with toasted almonds on top.</span>
                  </figcaption>
                </figure>
              </article>

              {/* Card 03 */}
              <article className="mcard t-red" data-i="2" aria-labelledby="mc2-h">
                <div className="mc-text">
                  <p className="mc-num">
                    <span>03</span> / 07
                  </p>
                  <h3 id="mc2-h" className="mc-title">
                    Red &amp; dark
                  </h3>
                  <p className="mc-line">
                    Red velvet-style batters, and a dark cocoa range with Oreo, Lotus Biscoff and
                    kunafa pistachio.
                  </p>
                  <div className="mc-groups">
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Swissfully Red Swaffles</span>
                        <span className="n">2</span>
                      </h4>
                      <ul className="mc-items one">
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802616.webp"
                            data-desc="Red velvet-style batter with a white cream filling."
                          >
                            <span>Swiss Red Bliss</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA802633.webp"
                            data-desc="Mixed berry flavour in a red batter."
                          >
                            <span>Swiss Berry Bliss</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                      </ul>
                    </section>
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Dark Obsession Swaffles</span>
                        <span className="n">3</span>
                      </h4>
                      <ul className="mc-items one">
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/oreo_waffle.webp"
                            data-desc="Cocoa batter with Oreo crunch and aqua cream swirls."
                          >
                            <span>Aqua Oreo Delight</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Lotus Biscoff Delight</span>
                        </li>
                        <li>
                          <span className="mci">Kunafa Pistachio Royale</span>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <figure className="mc-plate">
                  <div className="plate">
                    <img
                      src="/assets/img/social3.webp"
                      alt="Swiss Red Bliss"
                      data-default="1"
                    />
                  </div>
                  <figcaption>
                    <b className="pc-name">Swiss Red Bliss</b>
                    <span className="pc-desc">
                      Red velvet-style batter with a white cream filling.
                    </span>
                  </figcaption>
                </figure>
              </article>

              {/* Card 04 */}
              <article className="mcard t-cream" data-i="3" aria-labelledby="mc3-h">
                <div className="mc-text">
                  <p className="mc-num">
                    <span>04</span> / 07
                  </p>
                  <h3 id="mc3-h" className="mc-title">
                    Ice cream
                  </h3>
                  <p className="mc-line">
                    Swaffles served with ice cream, and sundaes built on warm Swaffle pieces.
                  </p>
                  <div className="mc-groups">
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Ice Cream Swaffles</span>
                        <span className="n">4</span>
                      </h4>
                      <ul className="mc-items">
                        <li>
                          <span className="mci">Fudge Fantasy Choco</span>
                        </li>
                        <li>
                          <span className="mci">Swiss Velvet Fantasy</span>
                        </li>
                        <li>
                          <span className="mci">Choco Mania</span>
                        </li>
                        <li>
                          <span className="mci">Snowy Vanilla Dream</span>
                        </li>
                      </ul>
                    </section>
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Swaffle Sundaes</span>
                        <span className="n">5</span>
                      </h4>
                      <ul className="mc-items">
                        <li>
                          <span className="mci">Choco Indulgence Sundae</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA803228.webp"
                            data-desc="Berry ice cream over warm, crisp Swaffle pieces."
                          >
                            <span>Swiss Berry Sundae</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Biscoff Banana Sundae</span>
                        </li>
                        <li>
                          <span className="mci">Tropical Mango Sundae</span>
                        </li>
                        <li>
                          <span className="mci">Berrylicious Burst Sundae</span>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <figure className="mc-plate">
                  <div className="plate">
                    <img
                      src="/assets/img/CA803228.webp"
                      alt="Swiss Berry Sundae"
                      data-default="1"
                    />
                  </div>
                  <figcaption>
                    <b className="pc-name">Swiss Berry Sundae</b>
                    <span className="pc-desc">
                      Berry ice cream over warm, crisp Swaffle pieces.
                    </span>
                  </figcaption>
                </figure>
              </article>

              {/* Card 05 */}
              <article className="mcard t-butter" data-i="4" aria-labelledby="mc4-h">
                <div className="mc-text">
                  <p className="mc-num">
                    <span>05</span> / 07
                  </p>
                  <h3 id="mc4-h" className="mc-title">
                    Pancake bites
                  </h3>
                  <p className="mc-line">The Swaffle flavours as soft, golden pancake bites.</p>
                  <div className="mc-groups">
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Pancake Bites</span>
                        <span className="n">11</span>
                      </h4>
                      <ul className="mc-items">
                        <li>
                          <span className="mci">Swiss Choco Milk</span>
                        </li>
                        <li>
                          <span className="mci">Swiss Choco Dark</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA803169.webp"
                            data-desc="Pancake bites under Nutella and cocoa."
                          >
                            <span>Choco Nutella Indulgence</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Butterscotch Crunch Pop</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA803090.webp"
                            data-desc="Pancake bites stuffed with KitKat crunch."
                          >
                            <span>Crispy KitKat Treat</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA803118.webp"
                            data-desc="Milk chocolate through every bite."
                          >
                            <span>Milk Choco Overload</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">Dark Choco Overload</span>
                        </li>
                        <li>
                          <span className="mci">Triple Choco Delight</span>
                        </li>
                        <li>
                          <span className="mci">Swiss Red Bliss</span>
                        </li>
                        <li>
                          <span className="mci">Aqua Oreo Delight</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/CA803037.webp"
                            data-desc="Cream cheese and berries in golden pancake bites."
                          >
                            <span>Berry Cream Cheese Bliss</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <figure className="mc-plate">
                  <div className="plate">
                    <img
                      src="/assets/img/CA803169.webp"
                      alt="Choco Nutella Indulgence"
                      data-default="1"
                    />
                  </div>
                  <figcaption>
                    <b className="pc-name">Choco Nutella Indulgence</b>
                    <span className="pc-desc">Pancake bites under Nutella and cocoa.</span>
                  </figcaption>
                </figure>
              </article>

              {/* Card 06 */}
              <article className="mcard t-night" data-i="5" aria-labelledby="mc5-h">
                <div className="mc-text">
                  <p className="mc-num">
                    <span>06</span> / 07
                  </p>
                  <h3 id="mc5-h" className="mc-title">
                    Cakes &amp; drinks
                  </h3>
                  <p className="mc-line">
                    Round Swaffle cakes to share, plus shakes, iced teas and cold coffee.
                  </p>
                  <div className="mc-groups">
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Swaffle Cakes</span>
                        <span className="n">4</span>
                      </h4>
                      <ul className="mc-items">
                        <li>
                          <span className="mci">Trio Cocoa Dream</span>
                        </li>
                        <li>
                          <span className="mci">Swiss Berry Bliss</span>
                        </li>
                        <li>
                          <span className="mci">Almond Crunch Indulgence</span>
                        </li>
                        <li>
                          <span className="mci">Aqua Oreo Delight</span>
                        </li>
                      </ul>
                    </section>
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Beverages</span>
                        <span className="n">8</span>
                      </h4>
                      <ul className="mc-items">
                        <li>
                          <span className="mci">Zesty Lemon Iced Tea</span>
                        </li>
                        <li>
                          <span className="mci">Peachy Paradise Iced Tea</span>
                        </li>
                        <li>
                          <span className="mci">Iced Mocha Bliss (Cold Coffee)</span>
                        </li>
                        <li>
                          <span className="mci">Oreo Crunch Shake</span>
                        </li>
                        <li>
                          <span className="mci">Swiss Choco Indulgence Shake</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/Chocolate_shake.webp"
                            data-desc="A thick shake made with Nutella."
                          >
                            <span>Nutella Indulgence Shake</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <span className="mci">KitKat Crunch Shake</span>
                        </li>
                        <li>
                          <span className="mci">Berry Blast Shake</span>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <figure className="mc-plate">
                  <div className="plate">
                    <img
                      src="/assets/img/Chocolate_shake.webp"
                      alt="Nutella Indulgence Shake"
                      data-default="1"
                    />
                  </div>
                  <figcaption>
                    <b className="pc-name">Nutella Indulgence Shake</b>
                    <span className="pc-desc">A thick shake made with Nutella.</span>
                  </figcaption>
                </figure>
              </article>

              {/* Card 07 */}
              <article className="mcard t-red" data-i="6" aria-labelledby="mc6-h">
                <div className="mc-text">
                  <p className="mc-num">
                    <span>07</span> / 07
                  </p>
                  <h3 id="mc6-h" className="mc-title">
                    Fab 4 boxes
                  </h3>
                  <p className="mc-line">
                    Four mini Swaffles in one box, for sharing or for trying a few flavours at once.
                  </p>
                  <div className="mc-groups">
                    <section className="mc-group">
                      <h4 className="mc-gh">
                        <span className="tag">Combo Treats</span>
                        <span className="n">3</span>
                      </h4>
                      <p className="mc-note">Each box holds 4 mini Swaffles.</p>
                      <ul className="mc-items one">
                        <li>
                          <span className="mci">Assorted Delights (Fab 4)</span>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/box_of_4_3.webp"
                            data-desc="Four chocolate mini Swaffles in one box."
                          >
                            <span>Choco Fiesta (Fab 4)</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                        <li>
                          <button
                            className="mci has-img"
                            type="button"
                            data-img="/assets/img/box_of_4_4.webp"
                            data-desc="Four premium mini Swaffles, each with a different filling."
                          >
                            <span>Assorted Premium Delights (Fab 4)</span>
                            <i aria-hidden="true" />
                          </button>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <figure className="mc-plate">
                  <div className="plate">
                    <img
                      src="/assets/img/box_of_4_4.webp"
                      alt="Assorted Premium Delights (Fab 4)"
                      data-default="1"
                    />
                  </div>
                  <figcaption>
                    <b className="pc-name">Assorted Premium Delights (Fab 4)</b>
                    <span className="pc-desc">
                      Four premium mini Swaffles, each with a different filling.
                    </span>
                  </figcaption>
                </figure>
              </article>
            </div>
            <nav className="midx" aria-label="Menu sections">
              <button type="button" data-i="0" aria-current="true">
                <span>01</span>Stuffed
              </button>
              <button type="button" data-i="1">
                <span>02</span>Choco
              </button>
              <button type="button" data-i="2">
                <span>03</span>Red &amp; dark
              </button>
              <button type="button" data-i="3">
                <span>04</span>Ice cream
              </button>
              <button type="button" data-i="4">
                <span>05</span>Pancake bites
              </button>
              <button type="button" data-i="5">
                <span>06</span>Cakes &amp; drinks
              </button>
              <button type="button" data-i="6">
                <span>07</span>Fab 4 boxes
              </button>
              <i className="midx-bar" aria-hidden="true">
                <b />
              </i>
            </nav>
          </div>
          <div className="menu-foot">
            <p>Order any of these for delivery, or pick them up warm.</p>
            <div className="ctas">
              <a
                className="btn btn-solid"
                href="https://zomato.onelink.me/xqzv/4qlgu1bo"
                target="_blank"
                rel="noopener"
              >
                Order on Zomato
                <svg aria-hidden="true">
                  <use href="#i-out" />
                </svg>
              </a>
              <a
                className="btn btn-line"
                href="https://www.swiggy.com/menu/1275124?source=sharing"
                target="_blank"
                rel="noopener"
              >
                Order on Swiggy
                <svg aria-hidden="true">
                  <use href="#i-out" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 6 · hours (pinned) */}
        <section id="hours" className="sec night" aria-labelledby="hours-h">
          <div className="night-stage">
            <div className="night-copy">
              <h2 id="hours-h" className="h2">
                Open till 2&nbsp;a.m.
              </h2>
              <p className="body">
                The Swiss Waffle Co. started with a late-night dessert craving, so the irons stay
                on until 2&nbsp;a.m. every day, at all three outlets.
              </p>
              <dl className="hours-dl">
                <div>
                  <dt>Opens</dt>
                  <dd>11:00</dd>
                </div>
                <div>
                  <dt>Closes</dt>
                  <dd>02:00</dd>
                </div>
                <div>
                  <dt>Days</dt>
                  <dd>All seven</dd>
                </div>
              </dl>
            </div>
            <figure className="dial">
              <svg className="dial-svg" viewBox="-228 -228 456 456" aria-hidden="true" />
              <p className="readout" aria-hidden="true">
                <span className="ro-h">11</span>:<span className="ro-m">00</span>
              </p>
              <figcaption>
                The day as a round waffle, midnight at the top. The missing slice is when the
                outlets are shut.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 7 · founders / about */}
        <section id="about" className="sec founders is-night" aria-labelledby="f-h">
          <div id="founders" style={{ position: "absolute", top: 0, left: 0 }} aria-hidden="true" />
          <header className="f-head">
            <h2 id="f-h" className="h2 f-names">
              Ankit Agarwal &amp; Paridhi Bathwal
            </h2>
            <p className="f-role">Founders and Chief Swaffle Officers</p>
          </header>

          <figure className="pquote">
            <blockquote>
              <p className="pq">
                “We didn’t just want to make waffles.<br className="br-desk" />
                We wanted to make people smile -<br className="br-desk" />
                One golden, crispy bite at a time.”
              </p>
            </blockquote>
            <figcaption>Ankit and Paridhi, on why they started</figcaption>
          </figure>

          <div className="f-grid">
            <div className="f-copy">
              <p className="body">
                The Swiss Waffle Co. began with their own late-night dessert cravings in Lucknow.
                They wanted an outlet that took texture seriously, used real fillings and kept prices
                within reach.
              </p>
              <div className="label" role="group" aria-labelledby="label-h">
                <div className="label-top">
                  <h3 id="label-h">In every Swaffle</h3>
                  <p className="veg">
                    <span className="veg-mark" aria-hidden="true" />
                    100% veg
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Batter</dt>
                    <dd>Eggless</dd>
                  </div>
                  <div>
                    <dt>Made</dt>
                    <dd>Fresh, on the iron</dd>
                  </div>
                  <div>
                    <dt>Fillings</dt>
                    <dd>
                      Nutella, KitKat, Oreo, Lotus Biscoff, Ferrero Rocher, kunafa pistachio,
                      butterscotch, brownie fudge, berries, cream cheese
                    </dd>
                  </div>
                  <div>
                    <dt>Ingredients</dt>
                    <dd>Premium, sourced globally</dd>
                  </div>
                  <div>
                    <dt>Portions</dt>
                    <dd>Indulgent</dd>
                  </div>
                  <div>
                    <dt>Served</dt>
                    <dd>Warm</dd>
                  </div>
                </dl>
                <p className="label-foot">Layered Swissfully. The Swiss Waffle Co., Lucknow</p>
              </div>
            </div>
            <div className="f-photos">
              <figure className="fp fp1">
                <img
                  loading="lazy"
                  data-speed="1"
                  src="/assets/img/social1.webp"
                  alt="A golden Swaffle wedge with chocolate running from the middle"
                />
              </figure>
              <figure className="fp fp2">
                <img
                  loading="lazy"
                  data-speed="1.6"
                  src="/assets/img/social3.webp"
                  alt="Swiss Red Bliss, red velvet with a white cream filling"
                />
              </figure>
              <figure className="fp fp3">
                <img
                  loading="lazy"
                  data-speed="0.7"
                  src="/assets/img/social2.webp"
                  alt="Almond Brownie Fudge Swaffle with toasted almonds"
                />
              </figure>
              <p className="fp-cap">
                <a href="https://www.instagram.com/TheSwissWaffleCo" target="_blank" rel="noopener">
                  More on Instagram, @TheSwissWaffleCo
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* 8 · find */}
        <section id="find" className="sec find is-sugar on-sugar" aria-labelledby="find-h">
          <header className="find-head">
            <h2 id="find-h" className="h2">
              Three outlets. One line.
            </h2>
            <p>All three are open every day from 11:00 to 02:00. Tap a stop for directions.</p>
          </header>
          <div className="transit">
            <svg aria-hidden="true">
              <path className="tl-base" />
              <path className="tl-draw" />
            </svg>
            <ol className="stations">
              <li className="st">
                <span className="st-mark" aria-hidden="true" />
                <h3>Aliganj</h3>
                <p>
                  Plot 332, Sitapur Road Yojna, Sector A, Jankipuram, opposite KFC and Pizza Hut.
                  Lucknow 226024
                </p>
                <a
                  href="https://maps.app.goo.gl/Q9oa2MU2okQ8333R6"
                  target="_blank"
                  rel="noopener"
                >
                  Get directions
                  <svg aria-hidden="true">
                    <use href="#i-out" />
                  </svg>
                </a>
              </li>
              <li className="st">
                <span className="st-mark" aria-hidden="true" />
                <h3>Indira Nagar</h3>
                <p>
                  Ground floor, B-1080, Indira Nagar Main Road, B Block. Lucknow 226016
                </p>
                <a
                  href="https://maps.app.goo.gl/XtjjFkZgGGm2B4LK6"
                  target="_blank"
                  rel="noopener"
                >
                  Get directions
                  <svg aria-hidden="true">
                    <use href="#i-out" />
                  </svg>
                </a>
              </li>
              <li className="st">
                <span className="st-mark" aria-hidden="true" />
                <h3>Gomti Nagar</h3>
                <p>
                  1/703 Silver Estate, near Gomti Nagar Bypass Road, Vishal Khand 1. Lucknow 226010
                </p>
                <a
                  href="https://maps.app.goo.gl/VSh3QwdxeF2WDnBL7"
                  target="_blank"
                  rel="noopener"
                >
                  Get directions
                  <svg aria-hidden="true">
                    <use href="#i-out" />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </section>
      </main>

      {/* 9 · order */}
      <footer id="order" className="sec order is-red" aria-labelledby="order-h">
        <div id="slot-order" className="slot">
          <img className="gl-fallback" src="/assets/img/social1.webp" alt="" />
        </div>
        <div className="order-grid">
          <div className="order-main">
            <h2 id="order-h" className="h2 order-title">
              Order a Swaffle.
            </h2>
            <p className="lede">
              On Zomato or Swiggy, or pick one up warm at any of the three outlets.
            </p>
            <div className="ctas">
              <a
                className="btn btn-solid"
                href="https://zomato.onelink.me/xqzv/4qlgu1bo"
                target="_blank"
                rel="noopener"
              >
                Order on Zomato
                <svg aria-hidden="true">
                  <use href="#i-out" />
                </svg>
              </a>
              <a
                className="btn btn-line"
                href="https://www.swiggy.com/menu/1275124?source=sharing"
                target="_blank"
                rel="noopener"
              >
                Order on Swiggy
                <svg aria-hidden="true">
                  <use href="#i-out" />
                </svg>
              </a>
            </div>
          </div>
          <div className="contact">
            <div>
              <span className="k">Call</span>
              <span className="v" id="c-phone">
                +91 95111 50371
              </span>
              <button className="copy" type="button" data-copy="c-phone">
                Copy
              </button>
            </div>
            <div>
              <span className="k">Email</span>
              <span className="v" id="c-mail">
                info@theswisswaffle.co
              </span>
              <button className="copy" type="button" data-copy="c-mail">
                Copy
              </button>
            </div>
            <div>
              <span className="k">Instagram</span>
              <a
                className="v"
                href="https://www.instagram.com/TheSwissWaffleCo"
                target="_blank"
                rel="noopener"
              >
                @TheSwissWaffleCo
              </a>
              <span />
            </div>
            <div>
              <span className="k">Hours</span>
              <span className="v">Every day, 11:00 to 02:00</span>
              <span />
            </div>
          </div>
        </div>
        <p className="mega" aria-hidden="true">
          Swaffle
        </p>
        <div className="base-bar">
          <span>© 2026 The Swiss Waffle Co.</span>
          <span>Layered Swissfully, in Lucknow</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      <ScriptsLoader />
    </>
  );
}
