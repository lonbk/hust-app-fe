/* Libs */
import React from 'react';
import { theme } from '../../theme';

interface Props {
  isActive: boolean;
}

export const StatsIcon: React.FC<Props> = ({ isActive }) => {
  return !isActive ? (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <rect width='24' height='24' fill='url(#pattern0)' />
      <defs>
        <pattern
          id='pattern0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use xlinkHref='#image0_13_2' transform='scale(0.0416667)' />
        </pattern>
        <image
          id='image0_13_2'
          width='24'
          height='24'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAYAAACw5+G7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAAAB3RJTUUH5gUMBzkst+yVKwAABZpJREFUWMPNlntQlFUYxp/z7S6wyGWYQImLiVxEhYAiRYkUSEUlUJcuBDg6OIMCcTMEDEfIQnCFBXEFoSVFycBIF9AxJZEUituAd4nbIEkI4RUBYfc7/eMuDnSxcGZ5/vnmnHnf9zy/73vPOR/BS5IwP2vZ93umT+dlsLXcE8nJ9CwCSNvq1fiSFNDjlNJ11B2mZWXcL+QDXFlcXNiZsDOrrPr6JrsuM9kCB7MPZh/M5vF4UewAd5lUSv2RhLiNG+ELGxBNTazCIHK0tEgdXHEtMFDuzCmRZUilO+lOWkG5XJUDDDXJNxjmr1xJP4M/upyckIJXcOvSJZn/oKb6dENDWfeTXI0rM2bAhOTBpaoKWsjFikWL9G4ZLHi828ND5QBUE6+S3VZWyon55BgGioqi10evX371yRPFE9kwgaiwUJmXy7TC2dpa9QDx1J1EjrUCTcRN8sbo6IS4cfPj8/6vJl3gZSvNKbPn5Me2towe4TN6sbE0jplFjllZYTt1pwva2pj3iRsTKhSGhwcHe3o2NEwZgIytWcvK/G1sWGv2IXu4poYOoBin+Hw00C/oCgACAHB0ZF3oh+zPAoHILvO+9M7SpZNuoZcldhtry1qmpmIA5TjF55MBqkt6d+zgfUMPyaP19WkYBLQrIgKV+BYLuVxyhykjvXv3ThkAcDFCxPb20MK7WD00dD++z68+MCkptC60bm1zf38UJ8TQOyQjA+txk2zq7aVB2IpLDg5TByAHybRWTQ1/wBhdT58mkkSSSFh2QlwGmkAHB6GPu3hNXX3CHtjnsc/j9K86OnQ+T85+PnPmiN1AgNrljg7lcTjFxBQVFRUVFXE4Iir2KU1NT5cncQpkh/v7WRN2DfvB1atcT82I4dP37qUdOxArvbZrF6WUUkqIqo0rAX7j9a7VkMbEIB2u1DI8HHKsgc2DB3CDHEdKS6EHN+I9NER6qClpj48XVWXNKZMGBanauBKA2JA9kGzejCX4CDUyGdyJL6O9cGGkXUiY13EvLzaPPQfhkiWKBCKkHtRiyxZVG1cCwA1HEWpiglTMhGV3d+Sj4GBPz/Z2RcDWwE8evud++TJuwgE/PXqECujjB1NTVRsfA4hCKLwIgTkcSPRf7HqFzPA6QlkWcYiCYArtAaRhP0ooRRsaqZD5+2O1A1ewn2GwG2koplQxTVwRwJaOgRN9dh+7aiLg+Pnxecq6sdhA1v3DC1L4fOabgRWewqi1FZ1YiXnGxiKaRU/QWbMU8amSTN3SH+3sMBeNeEdHB21IRGVLi7JgKKyh3dqqHF8kZhh2dp6wcCZpJ3ddXBRDyqfNnKXP1bGCBsxbW5EOV5qgq6v4J1Kmb8rcVBJiZqbwiUYU4nxLC0PayafQlUgggCt6OBysZTs5gtpaERU3lfScPMn0Mneo+YULyoXMSSa6JBLFkFMsD+f1lJejHttw7/ZtDKCcXPDzS3sojigVVFWJdolHSkKqq2EBikZfX0TADAc6O0cP8ancoLxcCZROviLIy1N+oRtMDvNmZaXChyyIacbbtbVKn+7ooBclEqK4B7pr+5bzk1NS6GI0oTsyEp24TnMYBvXoIwmjoziKnWxDUlIEguGFxERCCCFkrJVEVOxzysfeHmooZSsKCrAHafTrefPGwGEF7vXrbB/rQ9T9/JSHgwLg2f0iui2+UZqbkEC2k+MkOy4OjjCgCTweilEBQ7kcIWhGi0hkzDHYMcyLjZ3Qaym3JCnSxdraanOG67hG5uayI4NevOaWlv96E6c5iX2k1RYWinHULyHfeS9+rtX+RcJ8Yf5Z22nTuAGaJaNzLC1HmjXeknW3tcVYB8Z4Vz9+/KJ1pryI6HfxYMn5wkKcQwyOOjqq2tALqwZzkVhTw4UDSlBvZIQYWGPN7Nmq9vXCWofDJKq9/U8edH9dl0mWZgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wNS0xMlQwNzo1Nzo0NCswMDowMIK9V2IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDUtMTJUMDc6NTc6NDQrMDA6MDDz4O/eAAAAAElFTkSuQmCC'
        />
      </defs>
    </svg>
  ) : (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <rect width='24' height='24' fill='url(#pattern0)' />
      <defs>
        <pattern
          id='pattern0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use xlinkHref='#image0_13_2' transform='scale(0.0416667)' />
        </pattern>
        <image
          id='image0_13_2'
          width='24'
          height='24'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};
